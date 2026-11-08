<?php
/**
 * Plugin Name: VESTIGE – Images des produits importés (à usage unique)
 * Description: Relie chaque produit importé sans image (Kits traitement, Kits d'adhésion) à l'image de la Médiathèque qui porte son slug (kit-adhesion-a.jpg…).
 *
 * 1. Copier ce fichier dans wp-content/mu-plugins/
 * 2. Ouvrir n'importe quelle page de l'administration : un message indique le nombre de produits reliés
 * 3. SUPPRIMER ce fichier ensuite
 */

if (!defined('ABSPATH')) {
    exit;
}

add_action('admin_init', function () {
    if (!current_user_can('manage_woocommerce') || get_transient('vestige_product_images_v4')) {
        return;
    }

    // Images de la Médiathèque, par nom sans extension ni suffixe « -1 » (l'original passe en premier)
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
        $name = preg_replace('/-\d+$/', '', $name); 
        $images[$name] = $images[$name] ?? $id;
    }

    // Produits importés sans image valide : même nom que leur slug (kit-adhesion-a → kit-adhesion-a.jpg)
    $kits = get_posts([
        'post_type'      => 'product',
        'posts_per_page' => -1,
        // « future » : produits importés avec une date à venir (statut « Planifié »)
        'post_status'    => ['publish', 'future'],
        'tax_query'      => [['taxonomy' => 'product_cat', 'field' => 'slug', 'terms' => ['kits-traitement', 'kits-adhesion']]],
    ]);
    $linked = 0;
    $missing = [];
    foreach ($kits as $kit) {
        // Planifié → publié tout de suite, sinon le produit reste invisible sur le site
        if ($kit->post_status === 'future') {
            wp_publish_post($kit->ID);
        }
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

    set_transient('vestige_product_images_v4', compact('linked', 'missing'), DAY_IN_SECONDS);
});

add_action('admin_notices', function () {
    $result = get_transient('vestige_product_images_v4');
    if (!$result) {
        return;
    }
    $missing = $result['missing'] ? ' Sans image trouvée : ' . esc_html(implode(', ', $result['missing'])) . '.' : '';
    printf(
        '<div class="notice notice-success"><p><strong>Produits VESTIGE :</strong> %d image(s) reliée(s).%s Vous pouvez supprimer le fichier images-produits-une-fois.php.</p></div>',
        (int) $result['linked'],
        $missing
    );
});
