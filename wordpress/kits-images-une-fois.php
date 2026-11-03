<?php
/**
 * Plugin Name: VESTIGE – Images des kits (à usage unique)
 * Description: Relie chaque kit de la catégorie « Kits Traitement » à son image de la Médiathèque (kit-diabete-….jpg).
 *
 * 1. Copier ce fichier dans wp-content/mu-plugins/
 * 2. Ouvrir n'importe quelle page de l'administration : un message indique le nombre de kits reliés
 * 3. SUPPRIMER ce fichier ensuite
 */

if (!defined('ABSPATH')) {
    exit;
}

add_action('admin_init', function () {
    if (!current_user_can('manage_woocommerce') || get_transient('vestige_kits_images_v2')) {
        return;
    }

    // Images « kit-*.jpg » de la Médiathèque, par nom sans extension ni suffixe « -1 » (l'original passe en premier)
    $images = [];
    $attachments = get_posts([
        'post_type'      => 'attachment',
        'post_mime_type' => 'image',
        'posts_per_page' => -1,
        'orderby'        => 'ID',
        'order'          => 'ASC',
        'fields'         => 'ids',
    ]);
    foreach ($attachments as $id) {
        $name = pathinfo((string) get_post_meta($id, '_wp_attached_file', true), PATHINFO_FILENAME);
        if (strpos($name, 'kit-') !== 0) {
            continue;
        }
        $name = preg_replace('/-\d+$/', '', $name);
        $images[$name] = $images[$name] ?? $id;
    }

    // Kits sans image valide : même nom que leur slug (kit-diabete-type-1-et-2 → kit-diabete-type-1-et-2.jpg)
    $kits = get_posts([
        'post_type'      => 'product',
        'posts_per_page' => -1,
        'tax_query'      => [['taxonomy' => 'product_cat', 'field' => 'slug', 'terms' => 'kits-traitement']],
    ]);
    $linked = 0;
    $missing = [];
    foreach ($kits as $kit) {
        // Image valide déjà en place : on n'y touche pas (l'import XML a laissé des références vers des images inexistantes)
        if (wp_get_attachment_image_src((int) get_post_thumbnail_id($kit))) {
            continue;
        }
        if (isset($images[$kit->post_name])) {
            set_post_thumbnail($kit, $images[$kit->post_name]);
            wp_update_post(['ID' => $images[$kit->post_name], 'post_parent' => $kit->ID]);
            $linked++;
        } else {
            $missing[] = $kit->post_name;
        }
    }

    set_transient('vestige_kits_images_v2', compact('linked', 'missing'), DAY_IN_SECONDS);
});

add_action('admin_notices', function () {
    $result = get_transient('vestige_kits_images_v2');
    if (!$result) {
        return;
    }
    $missing = $result['missing'] ? ' Sans image trouvée : ' . esc_html(implode(', ', $result['missing'])) . '.' : '';
    printf(
        '<div class="notice notice-success"><p><strong>Kits VESTIGE :</strong> %d image(s) reliée(s).%s Vous pouvez supprimer le fichier kits-images-une-fois.php.</p></div>',
        (int) $result['linked'],
        $missing
    );
});
