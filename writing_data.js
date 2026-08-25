/**
 * わくわく学習アプリ - 全学年 漢字書き取りデータセット (writing_data.js)
 * 文部科学省 小学校学習指導要領 準拠 (1〜6年生対応)
 * 手書きキャンバス用: 【ひらがな】の部分を漢字で書く問題
 */

const WRITING_DATA = {
  // =============================================
  //  1年生 配当漢字 (80字)
  // =============================================
  1: [
    { q: "青い【そら】を見上げる", kanji: "空", reading: "そら", hint: "くもがうかぶ大空", stroke: 8 },
    { q: "【あめ】がふってきた", kanji: "雨", reading: "あめ", hint: "雲からふる水滴", stroke: 8 },
    { q: "【やま】に登る", kanji: "山", reading: "やま", hint: "高くそびえる山", stroke: 3 },
    { q: "【かわ】で魚をつる", kanji: "川", reading: "かわ", hint: "水が流れる川", stroke: 3 },
    { q: "【き】を植える", kanji: "木", reading: "き", hint: "森に生える木", stroke: 4 },
    { q: "きれいな【はな】が咲く", kanji: "花", reading: "はな", hint: "色とりどりの花", stroke: 7 },
    { q: "【みぎ】手をあげる", kanji: "右", reading: "みぎ", hint: "おはしを持つほうの手", stroke: 5 },
    { q: "【ひだり】を向く", kanji: "左", reading: "ひだり", hint: "おちゃわんを持つほう", stroke: 5 },
    { q: "【うえ】を見る", kanji: "上", reading: "うえ", hint: "高いほう・上空", stroke: 3 },
    { q: "階段を【した】に降りる", kanji: "下", reading: "した", hint: "低いほう・地面のほう", stroke: 3 },
    { q: "【なか】に入る", kanji: "中", reading: "なか", hint: "内側・真ん中", stroke: 4 },
    { q: "【おお】きな声であいさつ", kanji: "大", reading: "おお", hint: "サイズが大きい", stroke: 3 },
    { q: "【ちい】さな虫をみつける", kanji: "小", reading: "ちい", hint: "サイズが小さい", stroke: 3 },
    { q: "【いぬ】が走る", kanji: "犬", reading: "いぬ", hint: "ワンと鳴くどうぶつ", stroke: 4 },
    { q: "【ほん】を読む", kanji: "本", reading: "ほん", hint: "読書する本", stroke: 5 },
    { q: "【て】を洗う", kanji: "手", reading: "て", hint: "手首から先の部分", stroke: 4 },
    { q: "【め】をあける", kanji: "目", reading: "め", hint: "ものを見る器官", stroke: 5 },
    { q: "【みみ】をすます", kanji: "耳", reading: "みみ", hint: "音をきく器官", stroke: 6 },
    { q: "【くち】をあける", kanji: "口", reading: "くち", hint: "ごはんを食べる口", stroke: 3 },
    { q: "【あし】がはやい", kanji: "足", reading: "あし", hint: "歩く・走る足", stroke: 7 },
    { q: "【くるま】に乗る", kanji: "車", reading: "くるま", hint: "タイヤで走る乗り物", stroke: 7 },
    { q: "【つき】がかがやく", kanji: "月", reading: "つき", hint: "夜空にうかぶ三日月", stroke: 4 },
    { q: "【ひ】が沈む", kanji: "日", reading: "ひ", hint: "お日さま・太陽", stroke: 4 },
    { q: "【みず】を飲む", kanji: "水", reading: "みず", hint: "とうめいな水", stroke: 4 },
    { q: "【ひ】を燃やす", kanji: "火", reading: "火", hint: "あたたかい炎", stroke: 4 },
    { q: "【つち】を掘る", kanji: "土", reading: "つち", hint: "地面のつち", stroke: 3 },
    { q: "【もり】の中を歩く", kanji: "森", reading: "もり", hint: "木がたくさん集まった場所", stroke: 12 },
    { q: "【まち】へ買い物に行く", kanji: "町", reading: "まち", hint: "人が集まり住む所", stroke: 7 },
    { q: "【むら】のお祭り", kanji: "村", reading: "むら", hint: "自然豊かな集落", stroke: 7 },
    { q: "【た】んぼでお米を作る", kanji: "田", reading: "た", hint: "水田・田んぼ", stroke: 5 },
    { q: "【はや】く起きる", kanji: "早", reading: "はや", hint: "時間がはやい", stroke: 6 },
    { q: "【しろ】い雲", kanji: "白", reading: "しろ", hint: "雪のような色", stroke: 5 },
    { q: "【あか】いリンゴ", kanji: "赤", reading: "あか", hint: "トマトのような色", stroke: 7 },
    { q: "【あお】い海", kanji: "青", reading: "あお", hint: "空や海の色", stroke: 8 },
    { q: "【こ】どもが遊ぶ", kanji: "子", reading: "こ", hint: "子ども・男の子・女の子", stroke: 3 },
    { q: "【おんな】の人", kanji: "女", reading: "おんな", hint: "女性・女の子", stroke: 3 },
    { q: "【おとこ】の子", kanji: "男", reading: "おとこ", hint: "男性・男の子", stroke: 7 },
    { q: "【がっこう】へ通う", kanji: "学", reading: "がく", hint: "学ぶ・学校", stroke: 8 },
    { q: "【せんせい】のお話", kanji: "生", reading: "せい", hint: "生きる・生まれる・先生", stroke: 5 },
    { q: "【ゆう】ひがきれい", kanji: "夕", reading: "ゆう", hint: "夕暮れ・夕方", stroke: 3 }
  ],

  // =============================================
  //  2年生 配当漢字 (160字)
  // =============================================
  2: [
    { q: "【あさ】ごはんを食べる", kanji: "朝", reading: "あさ", hint: "日がのぼる時間", stroke: 12 },
    { q: "【ひる】休みに遊ぶ", kanji: "昼", reading: "ひる", hint: "正午・お昼の時間", stroke: 9 },
    { q: "【よる】星空を見る", kanji: "夜", reading: "よる", hint: "日が沈んだあとの時間", stroke: 8 },
    { q: "春・夏・【あき】・冬", kanji: "秋", reading: "あき", hint: "紅葉や実りの季節", stroke: 9 },
    { q: "寒い【ふゆ】が来る", kanji: "冬", reading: "ふゆ", hint: "雪がふる寒い季節", stroke: 5 },
    { q: "あたたかい【はる】", kanji: "春", reading: "はる", hint: "桜がさく季節", stroke: 9 },
    { q: "あつい【なつ】休み", kanji: "夏", reading: "なつ", hint: "海やひまわりの季節", stroke: 10 },
    { q: "【うみ】で泳ぐ", kanji: "海", reading: "うみ", hint: "広くて青い海", stroke: 9 },
    { q: "きれいな【いけ】", kanji: "池", reading: "いけ", hint: "水がたまっている所", stroke: 6 },
    { q: "【かぜ】が吹く", kanji: "風", reading: "かぜ", hint: "空気が動く現象", stroke: 9 },
    { q: "【ゆき】だるまを作る", kanji: "雪", reading: "ゆき", hint: "冬にふる白い結晶", stroke: 11 },
    { q: "【くも】が流れる", kanji: "雲", reading: "くも", hint: "空にうかぶ白いかたまり", stroke: 12 },
    { q: "【こころ】が温まる", kanji: "心", reading: "こころ", hint: "気持ち・ハート", stroke: 4 },
    { q: "【かみ】に文字を書く", kanji: "紙", reading: "かみ", hint: "ノートや折り紙", stroke: 10 },
    { q: "鉛筆で【え】を描く", kanji: "絵", reading: "え", hint: "イラスト・絵画", stroke: 12 },
    { q: "【うた】をうたう", kanji: "歌", reading: "うた", hint: "メロディーにあわせて声を出す", stroke: 14 },
    { q: "【こえ】をかける", kanji: "声", reading: "こえ", hint: "口から出す音", stroke: 7 },
    { q: "【ことば】を覚える", kanji: "言", reading: "こと", hint: "言葉・言う", stroke: 7 },
    { q: "物語を【よ】む", kanji: "読", reading: "よ", hint: "本をよむ・読書", stroke: 14 },
    { q: "手紙を【か】く", kanji: "書", reading: "か", hint: "文字を書く・読書", stroke: 10 },
    { q: "ラジオを【き】く", kanji: "聞", reading: "き", hint: "耳をすませて聞く", stroke: 14 },
    { q: "前に【すす】む", kanji: "進", reading: "すす", hint: "前進する・進歩", stroke: 11 },
    { q: "後ろを【ふ】り返る", kanji: "後", reading: "うし", hint: "後ろ・あと", stroke: 9 },
    { q: "【まえ】に進む", kanji: "前", reading: "まえ", hint: "前進・手前のほう", stroke: 9 },
    { q: "【いえ】に帰る", kanji: "家", reading: "いえ", hint: "家族とくらす建物", stroke: 10 },
    { q: "【にわ】に花を植える", kanji: "庭", reading: "にわ", hint: "家のまわりの土地", stroke: 10 },
    { q: "【とけい】を見る", kanji: "時", reading: "とき", hint: "時間・時刻", stroke: 10 },
    { q: "【とも】だちと遊ぶ", kanji: "友", reading: "とも", hint: "なかま・友人", stroke: 4 },
    { q: "【あたら】しいノート", kanji: "新", reading: "あたら", hint: "新品・最新", stroke: 13 },
    { q: "【ふる】い本", kanji: "古", reading: "ふる", hint: "昔からある", stroke: 5 },
    { q: "【とお】くへ行く", kanji: "遠", reading: "とお", hint: "距離がはなれている", stroke: 13 },
    { q: "【ちか】いお店", kanji: "近", reading: "ちか", hint: "距離が近い", stroke: 7 },
    { q: "【あに】と弟", kanji: "兄", reading: "あに", hint: "年上の男のきょうだい", stroke: 5 },
    { q: "【あね】と妹", kanji: "姉", reading: "あね", hint: "年上の女のきょうだい", stroke: 8 },
    { q: "【おとうと】と遊ぶ", kanji: "弟", reading: "おとうと", hint: "年下の男のきょうだい", stroke: 7 },
    { q: "【いもうと】の世話", kanji: "妹", reading: "いもうと", hint: "年下の女のきょうだい", stroke: 8 }
  ],

  // =============================================
  //  3年生 配当漢字 (200字)
  // =============================================
  3: [
    { q: "【せかい】を旅する", kanji: "界", reading: "かい", hint: "世界・限界", stroke: 9 },
    { q: "【あつ】いお湯", kanji: "温", reading: "おん", hint: "あたたかい・温度", stroke: 12 },
    { q: "【さむ】さを感じる", kanji: "寒", reading: "さむ", hint: "気温がひくい・寒波", stroke: 12 },
    { q: "【かる】い荷物", kanji: "軽", reading: "かる", hint: "目方がすくない・軽快", stroke: 12 },
    { q: "【おも】いリュック", kanji: "重", reading: "おも", hint: "目方が多い・重要", stroke: 9 },
    { q: "【みじか】い鉛筆", kanji: "短", reading: "みじか", hint: "長さがすくない・短距離", stroke: 12 },
    { q: "【なが】い橋をわたる", kanji: "長", reading: "なが", hint: "距離や時間が長い・校長", stroke: 8 },
    { q: "【たか】い山", kanji: "高", reading: "たか", hint: "高さがある・高級", stroke: 10 },
    { q: "【あんぜん】第一", kanji: "安", reading: "あん", hint: "やすらか・安全", stroke: 6 },
    { q: "【きけん】な場所", kanji: "危", reading: "き", hint: "あぶない・危険", stroke: 6 },
    { q: "【しら】べる", kanji: "調", reading: "しら", hint: "調査・調べる", stroke: 15 },
    { q: "テストで【まんてん】をとる", kanji: "満", reading: "まん", hint: "いっぱいになる・満点", stroke: 12 },
    { q: "【ちから】を合わせる", kanji: "力", reading: "ちから", hint: "パワー・努力", stroke: 2 },
    { q: "【べんきょう】する", kanji: "勉", reading: "べん", hint: "力をつくす・勉強", stroke: 10 },
    { q: "【ゆうき】を出す", kanji: "勇", reading: "ゆう", hint: "いさましい・勇気", stroke: 9 },
    { q: "【かんが】える", kanji: "考", reading: "かんが", hint: "思考・考える", stroke: 6 },
    { q: "【おも】い出す", kanji: "想", reading: "そう", hint: "心におもう・感想", stroke: 13 },
    { q: "【はな】す", kanji: "話", reading: "はな", hint: "おしゃべり・会話", stroke: 13 },
    { q: "【あつ】まる", kanji: "集", reading: "あつ", hint: "ひとつの所に集まる・集合", stroke: 12 },
    { q: "【はこ】ぶ", kanji: "運", reading: "はこ", hint: "移動させる・運動", stroke: 12 },
    { q: "【お】きる", kanji: "起", reading: "お", hint: "目を覚ます・起床", stroke: 10 },
    { q: "【ある】く", kanji: "歩", reading: "ある", hint: "一歩ずつ進む・散歩", stroke: 8 },
    { q: "【はし】る", kanji: "走", reading: "はし", hint: "駆ける・疾走", stroke: 7 },
    { q: "【およ】ぐ", kanji: "泳", reading: "およ", hint: "水泳・泳ぐ", stroke: 8 },
    { q: "【まつ】り", kanji: "祭", reading: "まつ", hint: "お祝い・文化祭", stroke: 11 },
    { q: "【し】ぜんの恵み", kanji: "然", reading: "ぜん", hint: "天然・自然", stroke: 12 },
    { q: "【くすり】を飲む", kanji: "薬", reading: "くすり", hint: "病気を治す薬", stroke: 16 },
    { q: "【びょういん】へ行く", kanji: "院", reading: "いん", hint: "病院・大学院", stroke: 10 },
    { q: "【しょうらい】の夢", kanji: "将", reading: "しょう", hint: "これから先・将来", stroke: 10 }
  ],

  // =============================================
  //  4年生 配当漢字 (202字)
  // =============================================
  4: [
    { q: "【きょうりょく】して働く", kanji: "協", reading: "きょう", hint: "力を合わせる・協力", stroke: 8 },
    { q: "【努力】が【みの】る", kanji: "実", reading: "みの", hint: "果実・実現する", stroke: 8 },
    { q: "【かんさつ】日記", kanji: "察", reading: "さつ", hint: "ようすを見る・観察", stroke: 14 },
    { q: "【せいこう】をおさめる", kanji: "功", reading: "こう", hint: "手柄・成功", stroke: 5 },
    { q: "【ゆうしょう】旗をもらう", kanji: "勝", reading: "しょう", hint: "勝ち・勝利", stroke: 12 },
    { q: "【はいぼく】から学ぶ", kanji: "敗", reading: "はい", hint: "まける・敗戦", stroke: 11 },
    { q: "【けんこう】な体", kanji: "健", reading: "けん", hint: "すこやか・健康", stroke: 11 },
    { q: "【たいよう】の光", kanji: "陽", reading: "よう", hint: "ひかり・太陽", stroke: 12 },
    { q: "【きぼう】をもつ", kanji: "希", reading: "き", hint: "ねがい・希望", stroke: 7 },
    { q: "【のぞ】みをかなえる", kanji: "望", reading: "のぞ", hint: "遠くを見る・望む", stroke: 11 },
    { q: "【さんか】者をつのる", kanji: "加", reading: "か", hint: "くわえる・参加", stroke: 5 },
    { q: "【せいり】整頓", kanji: "整", reading: "せい", hint: "ととのえる・整理", stroke: 16 },
    { q: "【くんれん】を受ける", kanji: "練", reading: "れん", hint: "きたえる・練習", stroke: 14 },
    { q: "【じゅんび】をととのえる", kanji: "備", reading: "び", hint: "そなえる・準備", stroke: 12 },
    { q: "【けっか】を発表する", kanji: "果", reading: "か", hint: "くだもの・結果", stroke: 8 },
    { q: "【へいわ】な暮らし", kanji: "和", reading: "わ", hint: "おだやか・平和", stroke: 8 },
    { q: "【ひつよう】な道具", kanji: "要", reading: "よう", hint: "かなめ・必要", stroke: 9 },
    { q: "【じゅうよう】なポイント", kanji: "重", reading: "じゅう", hint: "おもい・重要", stroke: 9 },
    { q: "【かこ】を振り返る", kanji: "過", reading: "か", hint: "すぎる・過去", stroke: 12 },
    { q: "【しんじる】心", kanji: "信", reading: "しん", hint: "まこと・信用", stroke: 9 },
    { q: "【たつ】人", kanji: "達", reading: "たつ", hint: "とどく・友達・達人", stroke: 12 },
    { q: "【えら】ぶ", kanji: "選", reading: "えら", hint: "選びぬく・選手", stroke: 15 },
    { q: "【とくべつ】な日", kanji: "特", reading: "とく", hint: "他とちがう・特別", stroke: 10 },
    { q: "【わら】う", kanji: "笑", reading: "わら", hint: "えがお・笑顔", stroke: 10 },
    { q: "【な】く", kanji: "泣", reading: "な", hint: "涙を流す・号泣", stroke: 8 },
    { q: "【おこ】る", kanji: "怒", reading: "おこ", hint: "いかる・激怒", stroke: 9 },
    { q: "【よろこ】ぶ", kanji: "喜", reading: "よろこ", hint: "うれしい・歓喜", stroke: 12 }
  ],

  // =============================================
  //  5年生 配当漢字 (193字)
  // =============================================
  5: [
    { q: "【ゆた】かな自然", kanji: "豊", reading: "ゆた", hint: "たっぷりある・豊富", stroke: 13 },
    { q: "【そうぞう】力をふくらませる", kanji: "創", reading: "そう", hint: "新しくつくる・創造", stroke: 12 },
    { q: "【ぞうか】する", kanji: "増", reading: "ぞう", hint: "ふえる・増加", stroke: 14 },
    { q: "【げんしょう】する", kanji: "減", reading: "げん", hint: "へる・減少", stroke: 12 },
    { q: "【せいぞう】工場", kanji: "造", reading: "ぞう", hint: "つくる・構造", stroke: 10 },
    { q: "【ゆしゅつ】する", kanji: "輸", reading: "ゆ", hint: "はこぶ・輸出入", stroke: 16 },
    { q: "【こくさい】交流", kanji: "際", reading: "さい", hint: "きわ・交際・国際", stroke: 14 },
    { q: "【かんきょう】を守る", kanji: "境", reading: "きょう", hint: "さかい・環境", stroke: 14 },
    { q: "【せきにん】を果たす", kanji: "任", reading: "にん", hint: "まかせる・任務", stroke: 6 },
    { q: "【せきにん】をもつ", kanji: "責", reading: "せき", hint: "せめる・責任", stroke: 11 },
    { q: "【じょうほう】を集める", kanji: "報", reading: "ほう", hint: "しらせる・情報", stroke: 12 },
    { q: "【ちょうせん】する", kanji: "挑", reading: "ちょう", hint: "いどむ・挑戦", stroke: 9 },
    { q: "【こくふく】する", kanji: "復", reading: "ふく", hint: "かえる・回復・復習", stroke: 12 },
    { q: "【しえん】する", kanji: "援", reading: "えん", hint: "たすける・応援", stroke: 12 },
    { q: "【ぜつぼう】を乗り越える", kanji: "絶", reading: "ぜつ", hint: "たつ・絶対", stroke: 12 },
    { q: "【ていあん】する", kanji: "案", reading: "あん", hint: "かんがえ・案内", stroke: 10 },
    { q: "【せいけつ】に保つ", kanji: "潔", reading: "けつ", hint: "いさぎよい・清潔", stroke: 15 },
    { q: "【えいせい】的", kanji: "衛", reading: "えい", hint: "まもる・衛星・衛生", stroke: 16 },
    { q: "【ふくざつ】な仕組み", kanji: "複", reading: "ふく", hint: "かさなる・複雑", stroke: 14 },
    { q: "【ざっそう】を抜く", kanji: "雑", reading: "ざつ", hint: "まじる・複雑", stroke: 14 },
    { q: "【のうりょく】を発揮する", kanji: "能", reading: "のう", hint: "はたらき・才能", stroke: 10 },
    { q: "【えいよう】をとる", kanji: "養", reading: "よう", hint: "やしなう・栄養", stroke: 15 },
    { q: "【せいいっぱ】い頑張る", kanji: "精", reading: "せい", hint: "こまかい・精神", stroke: 14 },
    { q: "【ひょうげん】する", kanji: "現", reading: "げん", hint: "あらわれる・表現", stroke: 11 },
    { q: "【たいど】を改める", kanji: "態", reading: "たい", hint: "ありさま・態度", stroke: 14 },
    { q: "【えいきょう】を受ける", kanji: "響", reading: "きょう", hint: "ひびく・影響", stroke: 20 },
    { q: "【きそく】正しい生活", kanji: "規", reading: "き", hint: "手本・規則", stroke: 11 }
  ],

  // =============================================
  //  6年生 配当漢字 (191字)
  // =============================================
  6: [
    { q: "【けんぽう】記念日", kanji: "憲", reading: "けん", hint: "国の基本法・憲法", stroke: 16 },
    { q: "【せんきょ】で投票する", kanji: "挙", reading: "きょ", hint: "あげる・選挙", stroke: 10 },
    { q: "【ひはん】を受け止める", kanji: "批", reading: "ひ", hint: "ただす・批判", stroke: 7 },
    { q: "【じょうやく】を結ぶ", kanji: "約", reading: "やく", hint: "ちぎる・条約・約束", stroke: 9 },
    { q: "【こうぞう】を調べる", kanji: "構", reading: "こう", hint: "かまえる・構造", stroke: 14 },
    { q: "【そしき】をまとめる", kanji: "織", reading: "しき", hint: "おる・組織", stroke: 18 },
    { q: "【ろんり】的に考える", kanji: "論", reading: "ろん", hint: "すじみち・論文", stroke: 15 },
    { q: "【すいり】する", kanji: "推", reading: "すい", hint: "おしはかる・推薦", stroke: 11 },
    { q: "【せいぎ】をつらぬく", kanji: "義", reading: "ぎ", hint: "ただしい道・正義", stroke: 13 },
    { q: "【けんり】を守る", kanji: "権", reading: "けん", hint: "いきおい・権利", stroke: 15 },
    { q: "【せんげん】する", kanji: "宣", reading: "せん", hint: "のべる・宣言", stroke: 9 },
    { q: "【そんざい】感がある", kanji: "存", reading: "そん", hint: "ある・存在", stroke: 6 },
    { q: "【じゅうなん】に対応する", kanji: "軟", reading: "なん", hint: "やわらかい・柔軟", stroke: 11 },
    { q: "【かんよう】な心", kanji: "容", reading: "よう", hint: "いれる・寛容", stroke: 10 },
    { q: "【かつよう】する", kanji: "活", reading: "かつ", hint: "いきる・活用", stroke: 9 },
    { q: "【たいしょう】的", kanji: "照", reading: "しょう", hint: "てらす・対照", stroke: 13 },
    { q: "【きょうしゅく】する", kanji: "縮", reading: "しゅく", hint: "ちぢむ・短縮", stroke: 17 },
    { q: "【ちょうじょう】に立つ", kanji: "頂", reading: "ちょう", hint: "いただき・頂上", stroke: 11 }
  ]
};
