// Témoignages vidéo (MP4 hébergés par systeme.io, repris de la page topvestigeci)
// topic : sujet affiché sur la carte · to : kit ou produit concerné
export interface Testimonial {
  id: string
  topic: string
  to: string
  video: string
}

const cdn = 'https://d1yei2z3i6k35z.cloudfront.net/3181935/'

const groups: [topic: string, to: string, files: string[]][] = [
  ['Diabète', '/p/kit-diabete-type-1-et-2', ['658728ef0763d_Diabete_4_FullHD1080p_MEDIUM_FR30.mp4', '65872a0f64236_diabete_2_SD360p_MEDIUM_FR30.mp4', '65872a78ac7bd_diabete_1_SD360p_MEDIUM_FR30.mp4', '65872df5bb021_diabete_3_FullHD1080p_MEDIUM_FR30.mp4', '66757a78b019a_VID-20240609-WA0047.mp4', '66814693c7b1e_Projet_05-22_SD360p_MEDIUM_FR30_1.mp4', '668146faef74d_Projet_06-291_SD360p_MEDIUM_FR30.mp4', '6681475901e53_Projet_06-21_FullHD1080p_MEDIUM_FR30.mp4', '668148e99c487_Projet_05-222_SD360p_MEDIUM_FR30.mp4', '67e0163d90518_Projet_03-23_HD720p_MEDIUM_FR30.mp4']],
  ['Hypertension', '/p/kit-tension-arterielle', ['6746614d77e93_Projet_11-24_HD720p_MEDIUM_FR30.mp4']],
  ['Arthrite', '/p/kit-arthrite', ['65874af9dac8a_art_SD360p_MEDIUM_FR30.mp4', '65874b6376e25_arthrite_3_SD360p_MEDIUM_FR30.mp4', '65874bdef11c7_arthrite_1_SD360p_MEDIUM_FR30.mp4', '67e0176ba0fd6_Projet_03-232_HD720p_MEDIUM_FR30.mp4']],
  ['Cancer', '/c/kits-traitement', ['65874e34d821a_CANCER_2_SD360p_MEDIUM_FR30.mp4', '65874e9c6616a_cancer_4_SD360p_MEDIUM_FR30.mp4', '65874f33248e3_Projet_12-235_SD360p_MEDIUM_FR30.mp4', '6587500b26e4e_CANCER_1_SD360p_MEDIUM_FR30.mp4', '674664c4a011f_Cancer_Sein__HD720p_MEDIUM_FR30.mp4', '674666438f0aa_Projet_09-15_SD360p_MEDIUM_FR30.mp4', '67e01a335762e_Projet_03-19_HD720p_MEDIUM_FR30.mp4', '67e063a544217_Projet_03-239_HD720p_MEDIUM_FR30.mp4']],
  ['Prostatite', '/p/kit-prostatite', ['658750a5a93f8_Projet_12-2328_SD360p_MEDIUM_FR30.mp4', '658750f778bf5_Prostate_1_SD360p_MEDIUM_FR30.mp4', '66814a806dcf5_Projet_06-308_SD360p_MEDIUM_FR30.mp4', '6746627400bf1_Prostate__FullHD1080p_MEDIUM_FR30.mp4']],
  ['AVC et paralysie', '/p/kit-paralysie-et-avc', ['658751689a9f8_AVC2__SD360p_MEDIUM_FR30.mp4', '658751ba55b78_AVC1_SD360p_MEDIUM_FR30.mp4', '65875232282a0_AVC3_FullHD1080p_MEDIUM_FR30.mp4']],
  ['Problèmes cardiaques', '/p/kit-tension-arterielle', ['65875379cab6b_Projet_12-2312_SD360p_MEDIUM_FR30.mp4', '658753ab46012_Projet_12-2311_SD360p_MEDIUM_FR30.mp4']],
  ['Colopathie', '/p/kit-colopathie', ['6587542d32093_Colopathie__SD360p_MEDIUM_FR30.mp4']],
  ['Anémie', '/p/kit-anemie', ['658754b41a1a6_Projet_12-2314_SD360p_MEDIUM_FR30.mp4', '658754f217e95_Anemie_SD360p_MEDIUM_FR30.mp4']],
  ['Perte de poids', '/p/kit-perte-de-poids', ['6587554921227_poids__SD360p_MEDIUM_FR30.mp4', '658755770edfa_poids_SD360p_MEDIUM_FR30.mp4', '658758bf197bd_Projet_12-2334_SD360p_MEDIUM_FR30.mp4']],
  ['Kyste et fibrome', '/p/kit-kyste-fibrome-et-myome', ['6587590f37074_Projet_12-2318_SD360p_MEDIUM_FR30.mp4', '67e06d4945ca3_Projet_03-236_HD720p_MEDIUM_FR30.mp4']],
  ['Infertilité', '/c/kits-traitement', ['65875955055d9_Infertilit__SD360p_MEDIUM_FR30.mp4', '67e06abed6d80_Projet_03-238_HD720p_MEDIUM_FR30.mp4']],
  ['Goutte', '/p/kit-goutte-et-acide-urique', ['658759b431efa_Projet_12-2320_SD360p_MEDIUM_FR30.mp4']],
  ['Plaie', '/p/kit-plaie', ['65875a300522c_Plaie__SD360p_MEDIUM_FR30.mp4']],
  ['Yeux', '/p/kit-yeux', ['65875a9a30b8b_Projet_12-2322_SD360p_MEDIUM_FR30.mp4']],
  ['Hémorroïdes', '/p/kit-hemorroides', ['65875acd7e814_Projet_12-2323_SD360p_MEDIUM_FR30.mp4', '67466416aaca2_hemorpide_HD720p_MEDIUM_FR30.mp4']],
  ['Asthme', '/p/kit-asthme', ['65875b1ae9418_ASTME_SD360p_MEDIUM_FR30.mp4', '66814ae19285d_Projet_06-307_SD360p_MEDIUM_FR30.mp4']],
  ['Ulcère', '/p/kit-ulcere', ['65875b489bac9_Projet_12-2325_SD360p_MEDIUM_FR30.mp4', '66757c93c559f_VID-20240609-WA0049.mp4', '67e02f27e0574_Projet_03-231_HD720p_MEDIUM_FR30.mp4']],
  ['Hernie discale', '/p/kit-hernie-discale', ['65875bb6b74ad_discale_SD360p_MEDIUM_FR30.mp4', '67e06ef55d486_Projet_03-237_HD720p_MEDIUM_FR30.mp4']],
  ['Embolie pulmonaire', '/p/kit-infection-pulmonaire', ['66814cc7bb569_Projet_06-02_SD360p_MEDIUM_FR30.mp4']],
  ['Vergetures', '/c/soins-visage-corps', ['65875cb0da420_Projet_12-2327_SD360p_MEDIUM_FR30.mp4']],
  ['Dentifrice Ganoderma', '/p/vestige-dentifrice-au-ganoderma', ['65875cf7d5d79_dent_assure_SD360p_MEDIUM_FR30.mp4']],
  ['Savon Assure', '/p/vestige-savon-assure', ['65876006edef4_Projet_12-2330_SD360p_MEDIUM_FR30.mp4']],
  ['Ultra Guard', '/p/vestige-nettoyant-wc-hyvest-ultra-guard', ['6587605b1d66b_guard_SD360p_MEDIUM_FR30.mp4']],
  ['Ultra Wash', '/p/vestige-lessive-liquide-ultra-wash', ['658765ac63712_wash_SD360p_MEDIUM_FR30.mp4']],
  ['Ultra Scrub', '/p/vestige-liquide-vaisselle-hyvest-ultra-scrub', ['66814b73f32c9_Projet_06-304_SD360p_MEDIUM_FR30.mp4']],
  ['Crème hydratante', '/p/vestige-creme-hydratante-quotidienne', ['658766d0ad57b_Projet_12-2333_SD360p_MEDIUM_FR30.mp4']],
]

export const testimonials: Testimonial[] = groups.flatMap(([topic, to, files]) =>
  files.map(file => ({ id: file.slice(0, 13), topic, to, video: cdn + file })),
)

// Sujets dans l'ordre de la page, pour les filtres
export const testimonialTopics = groups.map(([topic]) => topic)
