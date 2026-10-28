<?php
/**
 * Plugin Name: VESTIGE – API pour le site Nuxt
 * Description: Réactive les menus (même avec un thème bloc) et expose le logo, le favicon et les menus en JSON.
 * Version: 1.0.0
 *
 * Installation recommandée : copier ce fichier dans wp-content/mu-plugins/ (toujours actif, survit aux changements de thème).
 * Sinon : coller le contenu (sans la première ligne « <?php ») à la fin du functions.php du thème.
 *
 * Points d'accès publics (lecture seule) :
 *   GET /wp-json/vestige/v1/branding          → nom, slogan, logo, favicon
 *   GET /wp-json/vestige/v1/menus/primary     → menu de l'emplacement « primary »
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * 1. Menus et logo, indépendamment du thème
 * - register_nav_menus fait apparaître Apparence > Menus, y compris avec un thème bloc (Twenty Twenty-Four…)
 * - custom-logo ajoute le choix du logo dans Apparence > Personnaliser > Identité du site
 */
add_action('after_setup_theme', function () {
    register_nav_menus([
        'primary'    => 'Menu principal (en-tête)',
        'categories' => 'Barre de catégories (sous l\'en-tête)',
        'footer'     => 'Pied de page',
    ]);

    add_theme_support('custom-logo', [
        'flex-width'  => true,
        'flex-height' => true,
    ]);
}, 20);

/**
 * 2. Routes REST publiques
 */
add_action('rest_api_init', function () {
    register_rest_route('vestige/v1', '/branding', [
        'methods'             => 'GET',
        'permission_callback' => '__return_true',
        'callback'            => 'vestige_rest_branding',
    ]);

    register_rest_route('vestige/v1', '/menus/(?P<location>[a-z0-9_-]+)', [
        'methods'             => 'GET',
        'permission_callback' => '__return_true',
        'callback'            => 'vestige_rest_menu',
        'args'                => [
            'location' => ['sanitize_callback' => 'sanitize_key'],
        ],
    ]);
});

/**
 * Logo et favicon
 * Logo : thème classique (Personnaliser > Identité du site) ou thème bloc (Éditeur de site > Logo du site)
 * Favicon : Réglages > Général > Icône du site (ou Personnaliser > Identité du site)
 */
function vestige_rest_branding() {
    $logo_id = (int) (get_theme_mod('custom_logo') ?: get_option('site_logo'));
    $logo    = $logo_id ? wp_get_attachment_image_src($logo_id, 'full') : false;
    $icon_id = (int) get_option('site_icon');

    $response = rest_ensure_response([
        'name'        => get_bloginfo('name'),
        'description' => get_bloginfo('description'),
        'logo'        => $logo ? [
            'url'    => $logo[0],
            'width'  => (int) $logo[1],
            'height' => (int) $logo[2],
            'alt'    => get_post_meta($logo_id, '_wp_attachment_image_alt', true) ?: get_bloginfo('name'),
        ] : null,
        // Tailles usuelles : onglet du navigateur (32), iPhone (180), Android (192, 512)
        'favicon'     => $icon_id ? [
            '32'  => get_site_icon_url(32),
            '180' => get_site_icon_url(180),
            '192' => get_site_icon_url(192),
            '512' => get_site_icon_url(512),
        ] : null,
    ]);

    // Données publiques et peu changeantes : cache de 10 minutes
    $response->header('Cache-Control', 'public, max-age=600');
    return $response;
}

/**
 * Menu d'un emplacement, sous forme d'arbre (liens enfants dans « children »)
 */
function vestige_rest_menu(WP_REST_Request $request) {
    $location  = $request['location'];
    $locations = get_nav_menu_locations();

    if (empty($locations[$location])) {
        return new WP_Error('vestige_menu_not_found', 'Aucun menu assigné à cet emplacement.', ['status' => 404]);
    }

    $items = wp_get_nav_menu_items($locations[$location]) ?: [];
    $links = [];

    foreach ($items as $item) {
        $links[$item->ID] = [
            'id'       => (int) $item->ID,
            'label'    => html_entity_decode($item->title, ENT_QUOTES, 'UTF-8'),
            'to'       => vestige_menu_item_path($item),
            'target'   => $item->target ?: null,
            'parent'   => (int) $item->menu_item_parent,
            'children' => [],
        ];
    }

    // Arbre : chaque lien est rattaché à son parent (menu_order déjà respecté par WordPress)
    $tree = [];
    foreach ($links as $id => &$link) {
        if ($link['parent'] && isset($links[$link['parent']])) {
            $links[$link['parent']]['children'][] = &$link;
        } else {
            $tree[] = &$link;
        }
    }
    unset($link);

    $response = rest_ensure_response(vestige_menu_clean($tree));
    $response->header('Cache-Control', 'public, max-age=600');
    return $response;
}

/**
 * Lien d'un élément de menu, converti en chemin du site Nuxt
 *   Catégorie WooCommerce → /c/{slug}   Produit → /p/{slug}   Page → /{slug}   Lien externe → inchangé
 */
function vestige_menu_item_path($item) {
    switch ($item->object) {
        case 'product_cat':
            $term = get_term((int) $item->object_id, 'product_cat');
            if ($term && !is_wp_error($term)) {
                return '/c/' . $term->slug;
            }
            break;

        case 'product':
            return '/p/' . get_post_field('post_name', (int) $item->object_id);

        case 'page':
            if ((int) $item->object_id === (int) get_option('page_on_front')) {
                return '/';
            }
            return '/' . get_post_field('post_name', (int) $item->object_id);
    }

    // Lien personnalisé : chemin relatif s'il pointe vers ce site, sinon lien externe tel quel
    $site = untrailingslashit(home_url());
    if (strpos($item->url, $site) === 0) {
        return wp_make_link_relative($item->url) ?: '/';
    }
    return $item->url;
}

// Retire les champs internes (parent) de la réponse
function vestige_menu_clean(array $links) {
    return array_map(function ($link) {
        unset($link['parent']);
        $link['children'] = vestige_menu_clean($link['children']);
        return $link;
    }, $links);
}
