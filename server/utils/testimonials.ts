import type { Testimonial } from '#shared/types/pages'

// Témoignages par défaut (MP4 hébergés par systeme.io, repris de la page topvestigeci)
// Utilisés tant que les témoignages ne sont pas importés dans WordPress, ou s'il ne répond pas
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

// Durées relevées sur les fichiers vidéo
const durations: Record<string, number> = {
  '658728ef0763d': 443,
  '65872a0f64236': 91,
  '65872a78ac7bd': 137,
  '65872df5bb021': 156,
  '65874af9dac8a': 159,
  '65874b6376e25': 150,
  '65874bdef11c7': 216,
  '65874e34d821a': 67,
  '65874e9c6616a': 315,
  '65874f33248e3': 66,
  '6587500b26e4e': 230,
  '658750a5a93f8': 137,
  '658750f778bf5': 114,
  '658751689a9f8': 96,
  '658751ba55b78': 180,
  '65875232282a0': 101,
  '65875379cab6b': 28,
  '658753ab46012': 226,
  '6587542d32093': 161,
  '658754b41a1a6': 70,
  '658754f217e95': 171,
  '6587554921227': 75,
  '658755770edfa': 146,
  '658758bf197bd': 99,
  '6587590f37074': 143,
  '65875955055d9': 121,
  '658759b431efa': 19,
  '65875a300522c': 75,
  '65875a9a30b8b': 54,
  '65875acd7e814': 146,
  '65875b1ae9418': 25,
  '65875b489bac9': 108,
  '65875bb6b74ad': 233,
  '65875cb0da420': 57,
  '65875cf7d5d79': 1428,
  '65876006edef4': 105,
  '6587605b1d66b': 334,
  '658765ac63712': 471,
  '658766d0ad57b': 247,
  '66757a78b019a': 64,
  '66757c93c559f': 57,
  '66814693c7b1e': 85,
  '668146faef74d': 182,
  '6681475901e53': 217,
  '668148e99c487': 161,
  '66814a806dcf5': 125,
  '66814ae19285d': 211,
  '66814b73f32c9': 75,
  '66814cc7bb569': 169,
  '6746614d77e93': 106,
  '6746627400bf1': 105,
  '67466416aaca2': 135,
  '674664c4a011f': 309,
  '674666438f0aa': 307,
  '67e0163d90518': 158,
  '67e0176ba0fd6': 132,
  '67e01a335762e': 231,
  '67e02f27e0574': 217,
  '67e063a544217': 249,
  '67e06abed6d80': 161,
  '67e06d4945ca3': 13,
  '67e06ef55d486': 232,
}

// Affiches extraites des vidéos (public/images/temoignages/posters), repérées par l'identifiant du fichier
export const posterIds = new Set(Object.keys(durations))
export const posterFor = (video: string) => {
  const id = video.split('/').pop()?.slice(0, 13) ?? ''
  return posterIds.has(id) ? `/images/temoignages/posters/${id}.jpg` : ''
}

// 137 → « 2:17 »
const clock = (seconds: number) => `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`

export const defaultTestimonials: Testimonial[] = groups.flatMap(([topic, to, files]) =>
  files.map((file) => {
    const id = file.slice(0, 13)
    return {
      id,
      topic,
      video: cdn + file,
      poster: posterFor(file),
      duration: durations[id] ? clock(durations[id]) : '',
      to,
      linkLabel: to.startsWith('/p/kit-') ? 'Voir le kit' : 'Voir',
    }
  }),
)
