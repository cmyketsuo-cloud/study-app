/**
 * わくわく学習アプリ - タイピング練習エンジン ＆ お題データ (typing_data.js)
 * 3つの選べるワールド（ちいかわ・RPGモンスター討伐・スイーツ寿司打）
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

  // 拗音
  'きゃ': ['kya'], 'きぃ': ['kyi'], 'きゅ': ['kyu'], 'きぇ': ['kye'], 'きょ': ['kyo'],
  'しゃ': ['sya', 'sha'], 'しぃ': ['syi'], 'しゅ': ['syu', 'shu'], 'しぇ': ['sye', 'she'], 'しょ': ['syo', 'sho'],
  'ちゃ': ['tya', 'cha', 'cya'], 'ちぃ': ['tyi'], 'ちゅ': ['tyu', 'chu', 'cyu'], 'ちぇ': ['tye', 'che', 'cye'], 'ちょ': ['tyo', 'cho', 'cyo'],
  'にゃ': ['nya'], 'にぃ': ['nyi'], 'にゅ': ['nyu'], 'にぇ': ['nye'], 'にょ': ['nyo'],
  'ひゃ': ['hya'], 'ひぃ': ['hyi'], 'ひゅ': ['hyu'], 'ひぇ': ['hye'], 'ひょ': ['hyo'],
  'みゃ': ['mya'], 'みぃ': ['myi'], 'みゅ': ['myu'], 'みぇ': ['mye'], 'みょ': ['myo'],
  'りゃ': ['rya'], 'りぃ': ['ryi'], 'りゅ': ['ryu'], 'りぇ': ['rye'], 'りょ': ['ryo'],
  'ぎゃ': ['gya'], 'ぎぃ': ['gyi'], 'ぎゅ': ['gyu'], 'ぎぇ': ['gye'], 'ぎょ': ['gyo'],
  'じゃ': ['zya', 'ja', 'jya'], 'じぃ': ['zyi', 'jyi'], 'じゅ': ['zyu', 'ju', 'jyu'], 'じぇ': ['zye', 'je', 'jye'], 'じょ': ['zyo', 'jo', 'jyo'],
  'ぢゃ': ['dya'], 'ぢぃ': ['dyi'], 'ぢゅ': ['dyu'], 'ぢぇ': ['dye'], 'ぢょ': ['dyo'],
  'びゃ': ['bya'], 'びぃ': ['byi'], 'びゅ': ['byu'], 'びぇ': ['bye'], 'びょ': ['byo'],
  'ぴゃ': ['pya'], 'ぴぃ': ['pyi'], 'ぴゅ': ['pyu'], 'ぴぇ': ['pye'], 'ぴょ': ['pyo'],

  // 小文字単体
  'ぁ': ['la', 'xa'], 'ぃ': ['li', 'xi'], 'ぅ': ['lu', 'xu'], 'ぇ': ['le', 'xe'], 'ぉ': ['lo', 'xo'],
  'ゃ': ['lya', 'xya'], 'ゅ': ['lyu', 'xyu'], 'ょ': ['lyo', 'xyo'],
  'ゎ': ['lwa', 'xwa'],
  'っ': ['ltu', 'xtu', 'ltsu', 'xtsu'],
  'ー': ['-'], '！': ['!'], '？': ['?'], ' ': [' ']
};

// =============================================
//  3つの選べるワールド お題データセット
// =============================================
const TYPING_WORLDS = {
  // 🧁 ワールドA: ちいかわ おやつ集め
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
      ]
    }
  },

  // ⚔️ ワールドB: RPGモンスター討伐
  rpg: {
    id: 'rpg',
    name: 'RPGモンスター討伐',
    emoji: '⚔️',
    badge: 'バトルRPG',
    themeClass: 'world-rpg',
    bgGradient: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%)',
    primaryColor: '#6366f1',
    desc: 'タイプしてモンスターを攻撃！漢字ドリル連動の言葉で大ダメージ！',
    sounds: { success: 'こうげき！', streak: 'クリティカルヒット！', finish: 'クエストクリア！' },
    courses: {
      easy: [
        { kanji: '勇気', kana: 'ゆうき', hint: '立ち向かう強い心' },
        { kanji: '魔法', kana: 'まほう', hint: '不思議な力' },
        { kanji: '剣士', kana: 'けんし', hint: '剣でたたかう戦士' },
        { kanji: '宝箱', kana: 'たからばこ', hint: 'お宝がねむる箱' },
        { kanji: '炎', kana: 'ほのお', hint: 'あつく燃える火' },
        { kanji: '盾', kana: 'たて', hint: '攻撃をふせぐ防具' },
        { kanji: '冒険', kana: 'ぼうけん', hint: '未知の世界への旅' },
      ],
      normal: [
        { kanji: '世界遺産', kana: 'せかいいさん', hint: '人類共通の宝物' },
        { kanji: '地球の環境', kana: 'ちきゅうのかんきょう', hint: '自然を大切に守る' },
        { kanji: 'ほのおのつるぎ', kana: 'ほのおのつるぎ', hint: '赤く燃え盛る伝説の武器' },
        { kanji: 'ひかりのまほう', kana: 'ひかりのまほう', hint: '闇を照らす聖なるチカラ' },
        { kanji: '冷静沈着に対処', kana: 'れいせいちんちゃくにていしょ', hint: 'ピンチでも落ち着く' },
        { kanji: '日進月歩の進化', kana: 'にっしんげっぽのしんか', hint: 'めざましい成長と発展' },
      ],
      hard: [
        { kanji: 'ドラゴンをたおしてへいわをとりもどす', kana: 'どらごんをたおしてへいわをとりもどす', hint: '勇者の大冒険クライマックス' },
        { kanji: 'いっしょうけんめい努力してレベルアップ', kana: 'いっしょうけんめいどりょくしてれべるあっぷ', hint: '日々の積み重ねが力になる' },
        { kanji: '仲間と力をあわせて最強のボスにいどむ', kana: 'なかまとちからをあわせてさいきょうのぼすにいどむ', hint: 'チームワークで勝利をつかめ' },
      ]
    }
  },

  // 🍣 ワールドC: スイーツ寿司打パフェ
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
