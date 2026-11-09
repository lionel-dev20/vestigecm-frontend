<?php
/**
 * Plugin Name: VESTIGE – Nettoyage du catalogue (à usage unique)
 * Description: Supprime les doublons « -2 » (mis à la corbeille), range les produits dans les catégories du menu
 *              et regroupe les compléments dans « Produits ayurvédiques ».
 *
 * 1. Copier ce fichier dans wp-content/mu-plugins/
 * 2. Ouvrir n'importe quelle page de l'administration : un message résume ce qui a été fait
 * 3. SUPPRIMER ce fichier ensuite
 *
 * Les doublons vont dans la corbeille (Produits > Corbeille) : récupérables pendant 30 jours.
 */

if (!defined('ABSPATH')) {
    exit;
}

add_action('admin_init', function () {
    if (!current_user_can('manage_woocommerce') || get_transient('vestige_catalogue_v1')) {
        return;
    }

    // Produit d'origine (slug sans « -2 ») → catégories finales, celles du menu « Santé et beauté » / « Agriculture »
    $ayurveda = ['sante', 'produits-ayurvediques'];
    $catalogue = [
        // Compléments (gélules, comprimés) : Produits ayurvédiques
        'vestige-flax-oil-huile-de-lin' => $ayurveda,
        'vestige-coenzyme-q10'          => $ayurveda,
        'vestige-krill-oil'             => $ayurveda,
        'vestige-l-arginine'            => $ayurveda,
        'vestige-gluco-health'          => $ayurveda,
        'vestige-neem'                  => $ayurveda,
        'vestige-amla'                  => $ayurveda,
        'vestige-noni'                  => $ayurveda,
        'vestige-aloe-vera'             => $ayurveda,
        'vestige-spiruline'             => $ayurveda,
        'vestige-ganoderma'             => $ayurveda,
        'vestige-eye-support'           => $ayurveda,
        'vestige-calcium'               => $ayurveda,
        'vestige-glucosamine'           => $ayurveda,
        'vestige-liver-health'          => $ayurveda,
        'vestige-folic-acid-iron'       => $ayurveda,
        'vestige-combiotics'            => $ayurveda,
        'vestige-prostate-care'         => $ayurveda,
        'vestige-veslim-capsule'        => ['sante', 'produits-ayurvediques', 'minceur'],
        // Minceur
        'vestige-veslim-shake'          => ['sante', 'minceur'],
        'vestige-veslim-tea'            => ['sante', 'minceur'],
        'vestige-foot-detox-patch'      => ['sante'],
        // Soins du visage et du corps
        'vestige-creme-anti-age'                => ['sante', 'soins-visage-corps'],
        'vestige-creme-hydratante-quotidienne'  => ['sante', 'soins-visage-corps'],
        'vestige-demaquillant-tonique'          => ['sante', 'soins-visage-corps'],
        'vestige-gel-douche'                    => ['sante', 'soins-visage-corps'],
        'vestige-gel-mains'                     => ['sante', 'soins-visage-corps'],
        'vestige-gommage-visage'                => ['sante', 'soins-visage-corps'],
        'vestige-nettoyant-visage-clarifiant'   => ['sante', 'soins-visage-corps'],
        'vestige-savon-assure'                  => ['sante', 'soins-visage-corps'],
        'vestige-savon-complexion-bar'          => ['sante', 'soins-visage-corps'],
        // Hygiène, alimentation, maison
        'vestige-dentifrice-au-ganoderma'               => ['sante', 'hygiene-bucco-dentaire'],
        'vestige-huile-de-son-de-riz'                   => ['sante', 'alimentation-saine'],
        'vestige-lessive-liquide-ultra-wash'            => ['sante', 'entretien-maison'],
        'vestige-liquide-vaisselle-hyvest-ultra-scrub'  => ['sante', 'entretien-maison'],
        'vestige-nettoyant-wc-hyvest-ultra-guard'       => ['sante', 'entretien-maison'],
        // Agriculture
        'vestige-agri-82'       => ['agriculture', 'activateurs-croissance'],
        'vestige-agri-humic'    => ['agriculture', 'amendements-sol'],
        'vestige-agri-granule'  => ['agriculture', 'amendements-sol'],
    ];

    // Catégorie « Produits ayurvédiques », sous « Santé et beauté »
    $parent = get_term_by('slug', 'sante', 'product_cat');
    if (!term_exists('produits-ayurvediques', 'product_cat')) {
        wp_insert_term('Produits ayurvédiques', 'product_cat', [
            'slug'        => 'produits-ayurvediques',
            'parent'      => $parent ? $parent->term_id : 0,
            'description' => 'Compléments alimentaires naturels VESTIGE, inspirés de la médecine ayurvédique.',
        ]);
    }

    $sorted = 0;
    $trashed = 0;
    $missing = [];
    foreach ($catalogue as $slug => $categories) {
        $product = get_page_by_path($slug, OBJECT, 'product');
        if (!$product) {
            $missing[] = $slug;
            continue;
        }
        wp_set_object_terms($product->ID, $categories, 'product_cat');
        $sorted++;

        // Doublon créé par le second import : même produit, slug « -2 »
        $duplicate = get_page_by_path($slug . '-2', OBJECT, 'product');
        if ($duplicate && $duplicate->ID !== $product->ID) {
            wp_trash_post($duplicate->ID);
            $trashed++;
        }
        wc_delete_product_transients($product->ID);
    }

    // Anciennes catégories devenues vides (ancien menu et premier import) : supprimées
    // « kit-maladies » en dernier : ses sous-catégories sont déjà supprimées quand on arrive à elle
    $old = [
        'immunite', 'immunite-vitalite', 'detox', 'glycemie', 'cardio-vasculaire', 'os-articulations', 'perte-de-poids',
        'digestion', 'foie', 'sante-feminine', 'cosmetiques', 'bucco-dentaire', 'maison', 'aliments-dietetiques',
        'hypertension-coeur', 'diabete', 'arthrose-articulations', 'sante-du-foie', 'anemie-sante-feminine',
        'troubles-digestifs', 'prostate', 'kit-maladies',
    ];
    $removed = 0;
    foreach ($old as $slug) {
        $term = get_term_by('slug', $slug, 'product_cat');
        if (!$term) {
            continue;
        }
        // Compte réel des produits publiés (le compteur WordPress peut inclure la corbeille)
        $left = get_posts(['post_type' => 'product', 'posts_per_page' => 1, 'fields' => 'ids',
            'tax_query' => [['taxonomy' => 'product_cat', 'field' => 'term_id', 'terms' => $term->term_id, 'include_children' => false]]]);
        if (!$left && !get_term_children($term->term_id, 'product_cat')) {
            wp_delete_term($term->term_id, 'product_cat');
            $removed++;
        }
    }
    set_transient('vestige_catalogue_v1', compact('sorted', 'trashed', 'removed', 'missing'), DAY_IN_SECONDS);
});

add_action('admin_notices', function () {
    $result = get_transient('vestige_catalogue_v1');
    if (!$result) {
        return;
    }
    $missing = $result['missing'] ? ' Introuvables : ' . esc_html(implode(', ', $result['missing'])) . '.' : '';
    printf(
        '<div class="notice notice-success"><p><strong>Catalogue VESTIGE :</strong> %d produit(s) rangé(s), %d doublon(s) mis à la corbeille, %d ancienne(s) catégorie(s) supprimée(s).%s Vous pouvez supprimer le fichier catalogue-une-fois.php.</p></div>',
        (int) $result['sorted'],
        (int) $result['trashed'],
        (int) $result['removed'],
        $missing
    );
});
