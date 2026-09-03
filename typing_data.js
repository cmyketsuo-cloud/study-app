/**
 * わくわく学習アプリ - タイピング練習エンジン ＆ お題データ (typing_data.js)
 * 3つの選べるワールド（タイピング筋トレ・ちいかわ・スイーツ寿司打）
 * 柔軟なローマ字入力オートマトン（shi/si, tsu/tu, fu/hu, ji/zi, sha/sya, nn/n 対応）
 */

// =============================================
//  ローマ字変換テーブル（かな → 複数入力候補）
// =============================================
const ROMAJI_TABLE = {
  'あ': ['a'], 'い': ['i', 'yi'], 'う': ['u', 'wu', 'whu'], 'え': ['e'], 'お': ['o'],
  'か': ['ka', 'ca'], 'き': ['ki'], 'く': ['ku', 'cu', 'qu'], 'け': ['ke'], 'こ': ['ko', 'co'],
  'さ': ['sa'], 'し': ['si', 'shi', 'ci'], 'す': ['su'], 'せ': ['se', 'ce'], 'そ': ['so'],
  'た': ['ta'], 'ち': ['ti', 'chi'], 'つ': ['tu', 'tsu'], 'て': ['te'], 'と': ['to'],
  'な': ['na'], 'に': ['ni'], 'ぬ': ['nu'], 'ね': ['ne'], 'の': ['no'],
  'は': ['ha'], 'ひ': ['hi'], 'ふ': ['hu', 'fu'], 'へ': ['he'], 'ほ': ['ho'],
  'ま': ['ma'], 'み': ['mi'], 'む': ['mu'], 'め': ['me'], 'も': ['mo'],
  'や': ['ya'], 'ゆ': ['yu'], 'よ': ['yo'],
  'ら': ['ra'], 'り': ['ri'], 'る': ['ru'], 'れ': ['re'], 'ろ': ['ro'],
  'わ': ['wa'], 'を': ['wo'], 'ん': ['nn', 'xn'],
  'が': ['ga'], 'ぎ': ['gi'], 'ぐ': ['gu'], 'げ': ['ge'], 'ご': ['go'],
  'ざ': ['za'], 'じ': ['zi', 'ji'], 'ず': ['zu'], 'ぜ': ['ze'], 'ぞ': ['zo'],
  'だ': ['da'], 'ぢ': ['di'], 'づ': ['du'], 'で': ['de'], 'ど': ['do'],
  'ば': ['ba'], 'び': ['bi'], 'ぶ': ['bu'], 'べ': ['be'], 'ぼ': ['bo'],
  'ぱ': ['pa'], 'ぴ': ['pi'], 'ぷ': ['pu'], 'ぺ': ['pe'], 'ぽ': ['po'],

  // 拗音・特殊音・外来語
  'きゃ': ['kya'], 'きぃ': ['kyi'], 'きゅ': ['kyu'], 'きぇ': ['kye'], 'きょ': ['kyo'],
  'しゃ': ['sya', 'sha'], 'しぃ': ['syi'], 'しゅ': ['syu', 'shu'], 'しぇ': ['sye', 'she', 'sile', 'sixe', 'shile', 'shixe'], 'しょ': ['syo', 'sho'],
  'ちゃ': ['tya', 'cha', 'cya'], 'ちぃ': ['tyi'], 'ちゅ': ['tyu', 'chu', 'cyu'], 'ちぇ': ['tye', 'che', 'cye', 'tile', 'tixe', 'chile', 'chixe'], 'ちょ': ['tyo', 'cho', 'cyo'],
  'にゃ': ['nya'], 'にぃ': ['nyi'], 'にゅ': ['nyu'], 'にぇ': ['nye'], 'にょ': ['nyo'],
  'ひゃ': ['hya'], 'ひぃ': ['hyi'], 'ひゅ': ['hyu'], 'ひぇ': ['hye'], 'ひょ': ['hyo'],
  'みゃ': ['mya'], 'みぃ': ['myi'], 'みゅ': ['myu'], 'みぇ': ['mye'], 'みょ': ['myo'],
  'りゃ': ['rya'], 'りぃ': ['ryi'], 'りゅ': ['ryu'], 'りぇ': ['rye'], 'りょ': ['ryo'],
  'ぎゃ': ['gya'], 'ぎぃ': ['gyi'], 'ぎゅ': ['gyu'], 'ぎぇ': ['gye'], 'ぎょ': ['gyo'],
  'じゃ': ['zya', 'ja', 'jya'], 'じぃ': ['zyi', 'jyi'], 'じゅ': ['zyu', 'ju', 'jyu'], 'じぇ': ['zye', 'je', 'jye', 'zile', 'zixe', 'jile', 'jixe'], 'じょ': ['zyo', 'jo', 'jyo'],
  'ぢゃ': ['dya'], 'ぢぃ': ['dyi'], 'ぢゅ': ['dyu'], 'ぢぇ': ['dye', 'dile', 'dixe'], 'ぢょ': ['dyo'],
  'びゃ': ['bya'], 'びぃ': ['byi'], 'びゅ': ['byu'], 'びぇ': ['bye'], 'びょ': ['byo'],
  'ぴゃ': ['pya'], 'ぴぃ': ['pyi'], 'ぴゅ': ['pyu'], 'ぴぇ': ['pye'], 'ぴょ': ['pyo'],

  // 外来語・合拗音（フェ、ファ、フィ、フォ、ティ、ディ、デュ、ウィ、ウェ、ウォ、ヴァ〜ヴォ等）
  'ふぁ': ['fa', 'fwa', 'hua', 'hula', 'huxa', 'fula', 'fuxa'],
  'ふぃ': ['fi', 'fwi', 'hui', 'huli', 'huxi', 'fuli', 'fuxi'],
  'ふぇ': ['fe', 'fwe', 'hue', 'hule', 'huxe', 'fule', 'fuxe'],
  'ふぉ': ['fo', 'fwo', 'huo', 'hulo', 'huxo', 'fulo', 'fuxo'],
  'てぃ': ['thi', 'ti', 'teli', 'texi'],
  'てゅ': ['thu', 'telyu', 'texyu'],
  'でぃ': ['dhi', 'di', 'deli', 'dexi'],
  'でゅ': ['dhu', 'delyu', 'dexyu'],
  'とぅ': ['twu', 'tolu', 'toxu'],
  'どぅ': ['dwu', 'dolu', 'doxu'],
  'うぃ': ['wi', 'ui', 'uli', 'uxi', 'whi'],
  'うぇ': ['we', 'ue', 'ule', 'uxe', 'whe'],
  'うぉ': ['who', 'ulo', 'uxo'],
  'くぁ': ['qa', 'qwa', 'kula', 'kuxa'],
  'くぃ': ['qi', 'qwi', 'kuli', 'kuxi'],
  'くぇ': ['qe', 'qwe', 'kule', 'kuxe'],
  'くぉ': ['qo', 'qwo', 'kulo', 'kuxo'],
  'ぐぁ': ['gwa', 'gula', 'guxa'],
  'つぁ': ['tsa', 'tula', 'tuxa', 'tsula', 'tsuxa'],
  'つぃ': ['tsi', 'tuli', 'tuxi', 'tsuli', 'tsuxi'],
  'つぇ': ['tse', 'tule', 'tuxe', 'tsule', 'tsuxe'],
  'つぉ': ['tso', 'tulo', 'tuxo', 'tsulo', 'tsuxo'],
  'ヴ': ['vu'],
  'ゔ': ['vu'],
  'ゔぁ': ['va', 'vula', 'vuxa'],
  'ゔぃ': ['vi', 'vuli', 'vuxi'],
  'ゔぇ': ['ve', 'vule', 'vuxe'],
  'ゔぉ': ['vo', 'vulo', 'vuxo'],

  // 小文字単体
  'ぁ': ['la', 'xa'], 'ぃ': ['li', 'xi'], 'ぅ': ['lu', 'xu'], 'ぇ': ['le', 'xe'], 'ぉ': ['lo', 'xo'],
  'ゃ': ['lya', 'xya'], 'ゅ': ['lyu', 'xyu'], 'ょ': ['lyo', 'xyo'],
  'ゎ': ['lwa', 'xwa'],
  'っ': ['ltu', 'xtu', 'ltsu', 'xtsu'],
  'ー': ['-'], '！': ['!'], '？': ['?'], ' ': [' '], '…': ['...']
};

// =============================================
//  3つの選べるワールド お題データセット
// =============================================
const TYPING_WORLDS = {
  // 💪 ワールドA: タイピング筋トレ
  kintore: {
    id: 'kintore',
    name: 'タイピング筋トレ',
    emoji: '💪',
    badge: 'きそトレーニング',
    themeClass: 'world-kintore',
    bgGradient: 'linear-gradient(135deg,#f8fafc 0%,#e2e8f0 55%,#cbd5e1 100%)',
    primaryColor: '#0ea5e9',
    desc: 'ゆびの きそトレーニング。1もじずつ、ぜんぶの ゆびで うてるように なろう！',
    sounds: { success: 'ナイス！', streak: 'いい ちょうし！', finish: 'トレーニング しゅうりょう！' },
    isKintore: true,
    menu: [
      {
        id: 'yubitatefuse',
        label: 'ゆびたてふせ',
        emoji: '🖐️',
        desc: 'ぼいん5つ。ぜんぶの ゆびの ばしょを おぼえよう',
        guide: true,
        timePerChar: 0,
        pointPerQ: 0.1,
        questions: [
          { kanji: 'あ', kana: 'あ', hint: 'a ／ ひだりての こゆび' },
          { kanji: 'い', kana: 'い', hint: 'i ／ みぎての なかゆび' },
          { kanji: 'う', kana: 'う', hint: 'u ／ みぎての ひとさしゆび' },
          { kanji: 'え', kana: 'え', hint: 'e ／ ひだりての なかゆび' },
          { kanji: 'お', kana: 'お', hint: 'o ／ みぎての くすりゆび' }
        ]
      },
      {
        id: 'calf',
        label: 'カーフレイズ',
        emoji: '🦵',
        desc: 'K は みぎての なかゆび',
        guide: true,
        timePerChar: 0,
        pointPerQ: 0.1,
        questions: [
          { kanji: 'か', kana: 'か', hint: 'ka ／ さいごは ひだりての こゆび' },
          { kanji: 'き', kana: 'き', hint: 'ki ／ さいごは みぎての なかゆび' },
          { kanji: 'く', kana: 'く', hint: 'ku ／ さいごは みぎての ひとさしゆび' },
          { kanji: 'け', kana: 'け', hint: 'ke ／ さいごは ひだりての なかゆび' },
          { kanji: 'こ', kana: 'こ', hint: 'ko ／ さいごは みぎての くすりゆび' }
        ]
      },
      {
        id: 'sidebend',
        label: 'サイドベンド',
        emoji: '🤸',
        desc: 'S は ひだりての くすりゆび',
        guide: true,
        timePerChar: 0,
        pointPerQ: 0.1,
        questions: [
          { kanji: 'さ', kana: 'さ', hint: 'sa ／ さいごは ひだりての こゆび' },
          { kanji: 'し', kana: 'し', hint: 'si ／ さいごは みぎての なかゆび' },
          { kanji: 'す', kana: 'す', hint: 'su ／ さいごは みぎての ひとさしゆび' },
          { kanji: 'せ', kana: 'せ', hint: 'se ／ さいごは ひだりての なかゆび' },
          { kanji: 'そ', kana: 'そ', hint: 'so ／ さいごは みぎての くすりゆび' }
        ]
      },
      {
        id: 'turkish',
        label: 'ターキッシュゲットアップ',
        emoji: '🏋️',
        desc: 'T は ひだりての ひとさしゆび',
        guide: true,
        timePerChar: 0,
        pointPerQ: 0.1,
        questions: [
          { kanji: 'た', kana: 'た', hint: 'ta ／ さいごは ひだりての こゆび' },
          { kanji: 'ち', kana: 'ち', hint: 'ti ／ さいごは みぎての なかゆび' },
          { kanji: 'つ', kana: 'つ', hint: 'tu ／ さいごは みぎての ひとさしゆび' },
          { kanji: 'て', kana: 'て', hint: 'te ／ さいごは ひだりての なかゆび' },
          { kanji: 'と', kana: 'と', hint: 'to ／ さいごは みぎての くすりゆび' }
        ]
      },
      {
        id: 'narrowpush',
        label: 'ナロープッシュアップ',
        emoji: '💪',
        desc: 'N は みぎての ひとさしゆび',
        guide: true,
        timePerChar: 0,
        pointPerQ: 0.1,
        questions: [
          { kanji: 'な', kana: 'な', hint: 'na ／ さいごは ひだりての こゆび' },
          { kanji: 'に', kana: 'に', hint: 'ni ／ さいごは みぎての なかゆび' },
          { kanji: 'ぬ', kana: 'ぬ', hint: 'nu ／ さいごは みぎての ひとさしゆび' },
          { kanji: 'ね', kana: 'ね', hint: 'ne ／ さいごは ひだりての なかゆび' },
          { kanji: 'の', kana: 'の', hint: 'no ／ さいごは みぎての くすりゆび' }
        ]
      },
      {
        id: 'halfsquat',
        label: 'ハーフスクワット',
        emoji: '🦿',
        desc: 'H は みぎての ひとさしゆび',
        guide: true,
        timePerChar: 0,
        pointPerQ: 0.1,
        questions: [
          { kanji: 'は', kana: 'は', hint: 'ha ／ さいごは ひだりての こゆび' },
          { kanji: 'ひ', kana: 'ひ', hint: 'hi ／ さいごは みぎての なかゆび' },
          { kanji: 'ふ', kana: 'ふ', hint: 'hu ／ さいごは みぎての ひとさしゆび' },
          { kanji: 'へ', kana: 'へ', hint: 'he ／ さいごは ひだりての なかゆび' },
          { kanji: 'ほ', kana: 'ほ', hint: 'ho ／ さいごは みぎての くすりゆび' }
        ]
      },
      {
        id: 'mountain',
        label: 'マウンテンクライマー',
        emoji: '⛰️',
        desc: 'M は みぎての なかゆび',
        guide: true,
        timePerChar: 0,
        pointPerQ: 0.1,
        questions: [
          { kanji: 'ま', kana: 'ま', hint: 'ma ／ さいごは ひだりての こゆび' },
          { kanji: 'み', kana: 'み', hint: 'mi ／ さいごは みぎての なかゆび' },
          { kanji: 'む', kana: 'む', hint: 'mu ／ さいごは みぎての ひとさしゆび' },
          { kanji: 'め', kana: 'め', hint: 'me ／ さいごは ひだりての なかゆび' },
          { kanji: 'も', kana: 'も', hint: 'mo ／ さいごは みぎての くすりゆび' }
        ]
      },
      {
        id: 'yarddash',
        label: 'ヤードダッシュ',
        emoji: '🏃',
        desc: 'Y は みぎての ひとさしゆび',
        guide: true,
        timePerChar: 0,
        pointPerQ: 0.1,
        questions: [
          { kanji: 'や', kana: 'や', hint: 'ya ／ さいごは ひだりての こゆび' },
          { kanji: 'ゆ', kana: 'ゆ', hint: 'yu ／ さいごは みぎての ひとさしゆび' },
          { kanji: 'よ', kana: 'よ', hint: 'yo ／ さいごは みぎての くすりゆび' }
        ]
      },
      {
        id: 'lunge',
        label: 'ランジ',
        emoji: '🚶',
        desc: 'R は ひだりての ひとさしゆび',
        guide: true,
        timePerChar: 0,
        pointPerQ: 0.1,
        questions: [
          { kanji: 'ら', kana: 'ら', hint: 'ra ／ さいごは ひだりての こゆび' },
          { kanji: 'り', kana: 'り', hint: 'ri ／ さいごは みぎての なかゆび' },
          { kanji: 'る', kana: 'る', hint: 'ru ／ さいごは みぎての ひとさしゆび' },
          { kanji: 'れ', kana: 'れ', hint: 're ／ さいごは ひだりての なかゆび' },
          { kanji: 'ろ', kana: 'ろ', hint: 'ro ／ さいごは みぎての くすりゆび' }
        ]
      },
      {
        id: 'widesquat',
        label: 'ワイドスクワット',
        emoji: '🧎',
        desc: 'W は ひだりての くすりゆび',
        guide: true,
        timePerChar: 0,
        pointPerQ: 0.1,
        questions: [
          { kanji: 'わ', kana: 'わ', hint: 'wa ／ さいごは ひだりての こゆび' },
          { kanji: 'を', kana: 'を', hint: 'wo ／ さいごは みぎての くすりゆび' },
          { kanji: 'ん', kana: 'ん', hint: 'nn ／ N を 2かい' }
        ]
      }
    ]
  },

  // 🧁 ワールドB: ちいかわ おやつ集め
  chiikawa: {
    id: 'chiikawa',
    name: 'ちいかわ おやつ集め',
    emoji: '🧁',
    badge: 'ちいかわ風',
    themeClass: 'world-chiikawa',
    bgGradient: 'linear-gradient(135deg, #fff1f2 0%, #fdf2f8 50%, #fef3c7 100%)',
    primaryColor: '#f43f5e',
    desc: 'お菓子やセリフをタイプ！おやつをあつめて「わァ…！」と喜ばせよう！',
    sounds: { success: 'わァ…！', streak: 'なんとかなれーッ！', finish: 'むちゃうま〜！' },
    courses: {
      easy: [
        { kanji: 'ちいかわ', kana: 'ちいかわ', hint: '小さくてかわいいやつ' },
        { kanji: 'プリン', kana: 'ぷりん', hint: 'むちゃうまな黄色いおやつ' },
        { kanji: 'ホットケーキ', kana: 'ほっとけーき', hint: 'バターとシロップたっぷり' },
        { kanji: 'クッキー', kana: 'くっきー', hint: 'サクサクおいしい焼き菓子' },
        { kanji: 'おにぎり', kana: 'おにぎり', hint: 'しゃけやうめぼし入り' },
        { kanji: 'さすまた', kana: 'さすまた', hint: 'ピンクと水色の武器' },
        { kanji: 'パフェ', kana: 'ぱふぇ', hint: 'アイスとフルーツのデザート' },
        { kanji: 'ラムネ', kana: 'らむね', hint: 'シュワッとさわやかなお菓子' },
      ],
      normal: [
        { kanji: 'なんとかなれーッ！', kana: 'なんとかなれーっ！', hint: 'ピンチのときの決めゼリフ！' },
        { kanji: 'むちゃうまプリン', kana: 'むちゃうまぷりん', hint: 'とろけるおいしさのプリン' },
        { kanji: 'あさごはんのパン', kana: 'あさごはんのぱん', hint: 'こんがり焼きたてトースト' },
        { kanji: 'くさむしりけんてい', kana: 'くさむしりけんてい', hint: '合格めざして猛勉強！' },
        { kanji: 'わァ…びっくりした', kana: 'わぁ…びっくりした', hint: 'おどろいた時のリアクション' },
        { kanji: 'あまいホットココア', kana: 'あまいほっとここあ', hint: '心もからだも温まる飲み物' },
        { kanji: 'おともだちといっしょ', kana: 'おともだちといっしょ', hint: 'みんなで仲良くあそぼう' },
      ],
      hard: [
        { kanji: 'むちゃうまフェスでおなかいっぱい', kana: 'むちゃうまふぇすでおなかいっぱい', hint: '美味しいものをたくさん食べたよ' },
        { kanji: 'ちいさなゆうきでピンチをのりこえる', kana: 'ちいさなゆうきでぴんちをのりこえる', hint: 'あきらめずに立ち向かう心' },
        { kanji: 'きょうもいちにちがんばったね', kana: 'きょうもいちにちがんばったね', hint: '自分へのごほうびスイーツ' },
        { kanji: 'ほしがながれるよるのおさんぽ', kana: 'ほしがながれるよるのおさんぽ', hint: '夜空を見上げてお願いごと' },
      ],
      insane: [
        { kanji: 'むちゃうまフェスでおなかいっぱい', kana: 'むちゃうまふぇすでおなかいっぱい', hint: '美味しいものをたくさん食べたよ' },
        { kanji: 'ちいさなゆうきでピンチをのりこえる', kana: 'ちいさなゆうきでぴんちをのりこえる', hint: 'あきらめずに立ち向かう心' },
        { kanji: 'きょうもいちにちがんばったね', kana: 'きょうもいちにちがんばったね', hint: '自分へのごほうびスイーツ' },
        { kanji: 'ほしがながれるよるのおさんぽ', kana: 'ほしがながれるよるのおさんぽ', hint: '夜空を見上げてお願いごと' },
      ]
    }
  },

  // 🍣 ワールドB: スイーツ寿司打パフェ
  sweets: {
    id: 'sweets',
    name: 'スイーツ寿司打パフェ',
    emoji: '🍣',
    badge: '早打ちスコア',
    themeClass: 'world-sweets',
    bgGradient: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 50%, #fed7aa 100%)',
    primaryColor: '#059669',
    desc: '流れてくるお寿司やパフェ具材を素早くタイプ！巨大パフェを完成させよう！',
    sounds: { success: 'いただき！', streak: 'ナイス早打ち！', finish: 'パフェかんせい！' },
    courses: {
      easy: [
        { kanji: 'サーモン', kana: 'さーもん', hint: '大人気のオレンジ色のお寿司' },
        { kanji: 'マグロ', kana: 'まぐろ', hint: '王道の赤身のお寿司' },
        { kanji: 'たまご', kana: 'たまご', hint: '甘くておいしい黄色いお寿司' },
        { kanji: 'いちご', kana: 'いちご', hint: 'あま酸っぱいパフェの主役' },
        { kanji: 'バニラ', kana: 'ばにら', hint: '濃厚な甘いアイスクリーム' },
        { kanji: 'チョコ', kana: 'ちょこ', hint: 'とろけるカカオのスイーツ' },
        { kanji: 'メロン', kana: 'めろん', hint: 'ジューシーな高級フルーツ' },
      ],
      normal: [
        { kanji: 'いくら軍艦巻き', kana: 'いくらぐんかんまき', hint: 'プチプチ弾ける海の宝石' },
        { kanji: '特製フルーツパフェ', kana: 'とくせいふるーつぱふぇ', hint: '季節のフルーツ山盛り' },
        { kanji: '抹茶アイスパフェ', kana: 'まっちゃあいすぱふぇ', hint: '和風でおしゃれなスイーツ' },
        { kanji: '炙りサーモンチーズ', kana: 'あぶりさーもんちーず', hint: '香ばしくてコクがある寿司' },
        { kanji: 'プリンアラモード', kana: 'ぷりんあらもーど', hint: 'プリンと果物の贅沢プレート' },
      ],
      hard: [
        { kanji: '回転レーンからお皿をサクサク早打ち', kana: 'かいてんれーんからおさらをさくさくはやうち', hint: 'スピードに乗ってコンボを繋げよう' },
        { kanji: '巨大パフェにトッピングをぜんぶ乗せ', kana: 'きょだいぱふぇにとっぴんぐをぜんぶのせ', hint: '夢のメガ盛りスイーツ完成' },
        { kanji: 'お腹いっぱいおいしいお寿司を食べよう', kana: 'おなかいっぱいおいしいおすしをたべよう', hint: 'ごちそうさまで大満足' },
      ],
      insane: [
        { kanji: '回転レーンからお皿をサクサク早打ち', kana: 'かいてんれーんからおさらをさくさくはやうち', hint: 'スピードに乗ってコンボを繋げよう' },
        { kanji: '巨大パフェにトッピングをぜんぶ乗せ', kana: 'きょだいぱふぇにとっぴんぐをぜんぶのせ', hint: '夢のメガ盛りスイーツ完成' },
        { kanji: 'お腹いっぱいおいしいお寿司を食べよう', kana: 'おなかいっぱいおいしいおすしをたべよう', hint: 'ごちそうさまで大満足' },
      ]
    }
  }
};

// =============================================
//  ローマ字ツリー・入力パーサー
// =============================================

/**
 * かな文字列を「入力可能なローマ字パターンの木構造」に展開
 */
function buildRomajiPattern(kana) {
  let pos = 0;
  const nodes = [];

  while (pos < kana.length) {
    // 2文字（拗音など）の判定
    if (pos + 1 < kana.length) {
      const two = kana.substr(pos, 2);
      if (ROMAJI_TABLE[two]) {
        nodes.push({ kana: two, options: ROMAJI_TABLE[two] });
        pos += 2;
        continue;
      }
      // 促音「っ」＋次の子音の判定（例: "って" -> "tte", "tu te" など）
      if (two[0] === 'っ') {
        const nextChar = two[1];
        const nextOpts = ROMAJI_TABLE[nextChar] || [];
        const doubleConsonants = [];
        nextOpts.forEach(opt => {
          if (opt && opt[0] && opt[0].match(/[a-z]/i) && !'aiueo'.includes(opt[0])) {
            doubleConsonants.push(opt[0]);
          }
        });
        const xtuOptions = ['ltu', 'xtu', 'ltsu', 'xtsu'];
        nodes.push({ kana: 'っ', options: Array.from(new Set([...doubleConsonants, ...xtuOptions])), isSokuon: true });
        pos += 1;
        continue;
      }
    }

    // 1文字の判定
    const one = kana[pos];
    if (one === 'ん') {
      // 次の文字が母音や「な行」「や行」でない場合は 'n' 単体も許可
      const nextChar = pos + 1 < kana.length ? kana[pos + 1] : '';
      const isSpecialNext = 'あいうえおなにぬねのやゆよ'.includes(nextChar);
      const nOptions = isSpecialNext ? ['nn', 'xn'] : ['nn', 'n', 'xn'];
      nodes.push({ kana: 'ん', options: nOptions });
      pos += 1;
      continue;
    }

    if (ROMAJI_TABLE[one]) {
      nodes.push({ kana: one, options: ROMAJI_TABLE[one] });
    } else {
      nodes.push({ kana: one, options: [one.toLowerCase()] });
    }
    pos += 1;
  }

  return nodes;
}

if (typeof window !== 'undefined') {
  window.TYPING_WORLDS = TYPING_WORLDS;
  window.buildRomajiPattern = buildRomajiPattern;
  window.ROMAJI_TABLE = ROMAJI_TABLE;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { TYPING_WORLDS, buildRomajiPattern, ROMAJI_TABLE };
}
