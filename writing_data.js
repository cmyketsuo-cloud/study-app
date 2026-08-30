/**
 * わくわく学習アプリ - 全学年 漢字書き取りデータセット (writing_data.js)
 * 文部科学省 小学校学習指導要領 準拠 (1〜6年生対応)
 * 手書きキャンバス用: 単漢字（1文字）および二字熟語（2文字縦並び）対応
 */

const WRITING_DATA = {
  // =============================================
  //  1年生 配当漢字 (40問収録) - 主に単漢字
  // =============================================
  1: [
    { q: "青い【そら】を見上げる", kanji: "空", reading: "そら", hint: "くもがうかぶ大空", stroke: "8" },
    { q: "【あめ】がふってきた", kanji: "雨", reading: "あめ", hint: "雲からふる水滴", stroke: "8" },
    { q: "【やま】に登る", kanji: "山", reading: "やま", hint: "高くそびえる山", stroke: "3" },
    { q: "【かわ】で魚をつる", kanji: "川", reading: "かわ", hint: "水が流れる川", stroke: "3" },
    { q: "【き】を植える", kanji: "木", reading: "き", hint: "森に生える木", stroke: "4" },
    { q: "きれいな【はな】が咲く", kanji: "花", reading: "はな", hint: "色とりどりの花", stroke: "7" },
    { q: "【みぎ】手をあげる", kanji: "右", reading: "みぎ", hint: "おはしを持つほうの手", stroke: "5" },
    { q: "【ひだり】を向く", kanji: "左", reading: "ひだり", hint: "おちゃわんを持つほう", stroke: "5" },
    { q: "【うえ】を見る", kanji: "上", reading: "うえ", hint: "高いほう・上空", stroke: "3" },
    { q: "階段を【した】に降りる", kanji: "下", reading: "した", hint: "低いほう・地面のほう", stroke: "3" },
    { q: "【なか】に入る", kanji: "中", reading: "なか", hint: "内側・真ん中", stroke: "4" },
    { q: "【おお】きな声であいさつ", kanji: "大", reading: "おお", hint: "サイズが大きい", stroke: "3" },
    { q: "【ちい】さな虫をみつける", kanji: "小", reading: "ちい", hint: "サイズが小さい", stroke: "3" },
    { q: "【いぬ】が走る", kanji: "犬", reading: "いぬ", hint: "ワンと鳴くどうぶつ", stroke: "4" },
    { q: "【ほん】を読む", kanji: "本", reading: "ほん", hint: "読書する本", stroke: "5" },
    { q: "【て】を洗う", kanji: "手", reading: "て", hint: "手首から先の部分", stroke: "4" },
    { q: "【め】をあける", kanji: "目", reading: "め", hint: "ものを見る器官", stroke: "5" },
    { q: "【みみ】をすます", kanji: "耳", reading: "みみ", hint: "音をきく器官", stroke: "6" },
    { q: "【くち】をあける", kanji: "口", reading: "くち", hint: "ごはんを食べる口", stroke: "3" },
    { q: "【あし】がはやい", kanji: "足", reading: "あし", hint: "歩く・走る足", stroke: "7" },
    { q: "【くるま】に乗る", kanji: "車", reading: "くるま", hint: "タイヤで走る乗り物", stroke: "7" },
    { q: "【つき】がかがやく", kanji: "月", reading: "つき", hint: "夜空にうかぶ三日月", stroke: "4" },
    { q: "【ひ】が沈む", kanji: "日", reading: "ひ", hint: "お日さま・太陽", stroke: "4" },
    { q: "【みず】を飲む", kanji: "水", reading: "みず", hint: "とうめいな水", stroke: "4" },
    { q: "【ひ】を燃やす", kanji: "火", reading: "ひ", hint: "あたたかい炎", stroke: "4" },
    { q: "【つち】を掘る", kanji: "土", reading: "つち", hint: "地面のつち", stroke: "3" },
    { q: "【もり】の中を歩く", kanji: "森", reading: "もり", hint: "木がたくさん集まった場所", stroke: "12" },
    { q: "【まち】へ買い物に行く", kanji: "町", reading: "まち", hint: "人が集まり住む所", stroke: "7" },
    { q: "【むら】のお祭り", kanji: "村", reading: "むら", hint: "自然豊かな集落", stroke: "7" },
    { q: "【た】んぼでお米を作る", kanji: "田", reading: "た", hint: "水田・田んぼ", stroke: "5" },
    { q: "【はや】く起きる", kanji: "早", reading: "はや", hint: "時間がはやい", stroke: "6" },
    { q: "【しろ】い雲", kanji: "白", reading: "しろ", hint: "雪のような色", stroke: "5" },
    { q: "【あか】いリンゴ", kanji: "赤", reading: "あか", hint: "トマトのような色", stroke: "7" },
    { q: "【あお】い海", kanji: "青", reading: "あお", hint: "空や海の色", stroke: "8" },
    { q: "【こ】どもが遊ぶ", kanji: "子", reading: "こ", hint: "子ども・男の子・女の子", stroke: "3" },
    { q: "【おんな】の人", kanji: "女", reading: "おんな", hint: "女性・女の子", stroke: "3" },
    { q: "【おとこ】の子", kanji: "男", reading: "おとこ", hint: "男性・男の子", stroke: "7" },
    { q: "【がっこう】へ通う", kanji: "学校", reading: "がっこう", hint: "勉強する場所", stroke: "8・10" },
    { q: "【せんせい】のお話", kanji: "先生", reading: "せんせい", hint: "学校の先生", stroke: "6・5" },
    { q: "【ゆう】ひがきれい", kanji: "夕", reading: "ゆう", hint: "夕暮れ・夕方", stroke: "3" }
  ],

  // =============================================
  //  2年生 配当漢字 (26問収録) - 単漢字＆基本二字熟語
  // =============================================
  2: [
    { q: "【あさ】ごはんを食べる", kanji: "朝", reading: "あさ", hint: "日がのぼる時間", stroke: "12" },
    { q: "【ひる】休みに遊ぶ", kanji: "昼", reading: "ひる", hint: "正午・お昼の時間", stroke: "9" },
    { q: "【よる】星空を見る", kanji: "夜", reading: "よる", hint: "日が沈んだあとの時間", stroke: "8" },
    { q: "【はる】の花が咲く", kanji: "春", reading: "はる", hint: "あたたかい季節", stroke: "9" },
    { q: "【なつ】休みの計画", kanji: "夏", reading: "なつ", hint: "あつい季節", stroke: "10" },
    { q: "【あき】の紅葉", kanji: "秋", reading: "あき", hint: "すずしい実りの季節", stroke: "9" },
    { q: "【ふゆ】の雪景色", kanji: "冬", reading: "ふゆ", hint: "さむい季節", stroke: "5" },
    { q: "【あに】と弟", kanji: "兄", reading: "あに", hint: "年上の男のきょうだい", stroke: "5" },
    { q: "【あね】と妹", kanji: "姉", reading: "あね", hint: "年上の女のきょうだい", stroke: "8" },
    { q: "【おとうと】と遊ぶ", kanji: "弟", reading: "おとうと", hint: "年下の男のきょうだい", stroke: "7" },
    { q: "【いもうと】の世話", kanji: "妹", reading: "いもうと", hint: "年下の女のきょうだい", stroke: "8" },
    { q: "【いえ】に帰る", kanji: "家", reading: "いえ", hint: "住まい・家族", stroke: "10" },
    { q: "【ともだち】と仲良くする", kanji: "友達", reading: "ともだち", hint: "親しいなかま", stroke: "4・12" },
    { q: "【こころ】が温まる", kanji: "心", reading: "こころ", hint: "気持ち・思い", stroke: "4" },
    { q: "【かお】を洗う", kanji: "顔", reading: "かお", hint: "目や鼻がある部分", stroke: "18" },
    { q: "【くび】をかしげる", kanji: "首", reading: "くび", hint: "頭と胴の間", stroke: "9" },
    { q: "【こえ】を出して読む", kanji: "声", reading: "こえ", hint: "口から出す音", stroke: "7" },
    { q: "【あたま】を使う", kanji: "頭", reading: "あたま", hint: "首から上の部分・思考", stroke: "16" },
    { q: "【うみ】で泳ぐ", kanji: "海", reading: "うみ", hint: "広い塩水の世界", stroke: "9" },
    { q: "【いけ】のコイ", kanji: "池", reading: "いけ", hint: "水がたまった場所", stroke: "6" },
    { q: "【にわ】の花壇", kanji: "庭", reading: "にわ", hint: "家のまわりの土地", stroke: "10" },
    { q: "【もん】をくぐる", kanji: "門", reading: "もん", hint: "出入り口のとびら", stroke: "8" },
    { q: "【みち】を案内する", kanji: "道", reading: "みち", hint: "道路・進むコース", stroke: "12" },
    { q: "【えき】で電車に乗る", kanji: "駅", reading: "えき", hint: "列車が止まる場所", stroke: "14" },
    { q: "【でんしゃ】に乗る", kanji: "電車", reading: "でんしゃ", hint: "電気で動く列車", stroke: "13・7" },
    { q: "【じかん】を守る", kanji: "時間", reading: "じかん", hint: "時・タイム", stroke: "10・12" }
  ],

  // =============================================
  //  3年生 配当漢字 (22問収録) - 二字熟語＆重要単漢字
  // =============================================
  3: [
    { q: "【せかい】を旅する", kanji: "世界", reading: "せかい", hint: "地球上のすべての国", stroke: "5・9" },
    { q: "【あんぜん】第一", kanji: "安全", reading: "あんぜん", hint: "危険がないこと", stroke: "6・6" },
    { q: "【きけん】な場所", kanji: "危険", reading: "きけん", hint: "あぶないこと", stroke: "6・11" },
    { q: "【べんきょう】する", kanji: "勉強", reading: "べんきょう", hint: "学問やスキルを身につける", stroke: "10・11" },
    { q: "【ゆうき】を出す", kanji: "勇気", reading: "ゆうき", hint: "物事を恐れない強い心", stroke: "9・6" },
    { q: "【びょういん】へ行く", kanji: "病院", reading: "びょういん", hint: "病気を治す施設", stroke: "10・10" },
    { q: "【しょうらい】の夢", kanji: "将来", reading: "しょうらい", hint: "これから先のこと", stroke: "10・7" },
    { q: "【しぜん】の恵み", kanji: "自然", reading: "しぜん", hint: "山や川、動植物などの環境", stroke: "6・12" },
    { q: "テストで【まんてん】をとる", kanji: "満点", reading: "まんてん", hint: "最高得点・100点", stroke: "12・9" },
    { q: "【うんどう】場を走る", kanji: "運動", reading: "うんどう", hint: "体をうごかすこと", stroke: "12・11" },
    { q: "【あつ】いお湯", kanji: "温", reading: "おん", hint: "あたたかい・温度", stroke: "12" },
    { q: "【さむ】さを感じる", kanji: "寒", reading: "さむ", hint: "気温がひくい・寒波", stroke: "12" },
    { q: "【かる】い荷物", kanji: "軽", reading: "かる", hint: "目方がすくない・軽快", stroke: "12" },
    { q: "【おも】いリュック", kanji: "重", reading: "おも", hint: "目方が多い・重要", stroke: "9" },
    { q: "【みじか】い鉛筆", kanji: "短", reading: "みじか", hint: "長さがすくない・短距離", stroke: "12" },
    { q: "【なが】い橋をわたる", kanji: "長", reading: "なが", hint: "距離や時間が長い・校長", stroke: "8" },
    { q: "【たか】い山", kanji: "高", reading: "たか", hint: "高さがある・高級", stroke: "10" },
    { q: "【しら】べる", kanji: "調", reading: "しら", hint: "調査・調べる", stroke: "15" },
    { q: "【ちから】を合わせる", kanji: "力", reading: "ちから", hint: "パワー・努力", stroke: "2" },
    { q: "【かんが】える", kanji: "考", reading: "かんが", hint: "思考・考える", stroke: "6" },
    { q: "【おも】い出す", kanji: "想", reading: "そう", hint: "心におもう・感想", stroke: "13" },
    { q: "【くすり】を飲む", kanji: "薬", reading: "くすり", hint: "病気を治す薬", stroke: "16" }
  ],

  // =============================================
  //  4年生 配当漢字 (22問収録) - 二字熟語＆実践漢字
  // =============================================
  4: [
    { q: "【きょうりょく】して働く", kanji: "協力", reading: "きょうりょく", hint: "力を合わせること", stroke: "8・2" },
    { q: "【かんさつ】日記をつける", kanji: "観察", reading: "かんさつ", hint: "ようすをよく見ること", stroke: "18・14" },
    { q: "【せいこう】をおさめる", kanji: "成功", reading: "せいこう", hint: "うまくいって達成すること", stroke: "6・5" },
    { q: "【ゆうしょう】旗をもらう", kanji: "優勝", reading: "ゆうしょう", hint: "一番で勝つこと", stroke: "17・12" },
    { q: "【はいぼく】から学ぶ", kanji: "敗北", reading: "はいぼく", hint: "勝負に負けること", stroke: "11・5" },
    { q: "【けんこう】な体をつくる", kanji: "健康", reading: "けんこう", hint: "病気がなく元気なこと", stroke: "11・11" },
    { q: "【たいよう】の光をあびる", kanji: "太陽", reading: "たいよう", hint: "地球をてらす恒星", stroke: "4・12" },
    { q: "【きぼう】をもって進む", kanji: "希望", reading: "きぼう", hint: "未来への願いや望み", stroke: "7・11" },
    { q: "【さんか】者をつのる", kanji: "参加", reading: "さんか", hint: "仲間や行事に加わること", stroke: "8・5" },
    { q: "【せいり】整頓をする", kanji: "整理", reading: "せいり", hint: "きちんと整えること", stroke: "16・11" },
    { q: "【れんしゅう】を重ねる", kanji: "練習", reading: "れんしゅう", hint: "くり返し学んで身につける", stroke: "14・11" },
    { q: "【じゅんび】をととのえる", kanji: "準備", reading: "じゅんび", hint: "前もって用意すること", stroke: "13・12" },
    { q: "【けっか】を発表する", kanji: "結果", reading: "けっか", hint: "ある行為から生じた状態", stroke: "12・8" },
    { q: "【へいわ】な世界を願う", kanji: "平和", reading: "へいわ", hint: "争いがなく穏やかなこと", stroke: "5・8" },
    { q: "【ひつよう】な道具をそろえる", kanji: "必要", reading: "ひつよう", hint: "欠かせないこと", stroke: "5・9" },
    { q: "【じゅうよう】なポイント", kanji: "重要", reading: "じゅうよう", hint: "とても大切なこと", stroke: "9・9" },
    { q: "【かこ】を振り返る", kanji: "過去", reading: "かこ", hint: "すでに過ぎ去った時間", stroke: "4・12" },
    { q: "【しんよう】を大切にする", kanji: "信用", reading: "しんよう", hint: "信じてたよりにすること", stroke: "9・5" },
    { q: "【とくべつ】な日をお祝いする", kanji: "特別", reading: "とくべつ", hint: "ふつうと違って格別なこと", stroke: "10・7" },
    { q: "【努力】が【みの】る", kanji: "実", reading: "みの", hint: "果実・実現する", stroke: "8" },
    { q: "【えら】ぶ", kanji: "選", reading: "えら", hint: "選びぬく・選手", stroke: "15" },
    { q: "【わら】い声", kanji: "笑", reading: "わら", hint: "えがお・笑顔", stroke: "10" }
  ],

  // =============================================
  //  5年生 配当漢字 (22問収録) - 現代二字熟語＆高度漢字
  // =============================================
  5: [
    { q: "【そうぞう】力をふくらませる", kanji: "創造", reading: "そうぞう", hint: "新しく作り出すこと", stroke: "12・10" },
    { q: "人口が【ぞうか】する", kanji: "増加", reading: "ぞうか", hint: "数や量がふえること", stroke: "14・5" },
    { q: "ゴミを【げんしょう】させる", kanji: "減少", reading: "げんしょう", hint: "数や量がへること", stroke: "12・4" },
    { q: "自動車を【せいぞう】する", kanji: "製造", reading: "せいぞう", hint: "原料から品物をつくる", stroke: "14・10" },
    { q: "車を海外へ【ゆしゅつ】する", kanji: "輸出", reading: "ゆしゅつ", hint: "外国へ送り出すこと", stroke: "16・5" },
    { q: "【こくさい】交流を深める", kanji: "国際", reading: "こくさい", hint: "国と国との間・グローバル", stroke: "8・14" },
    { q: "地球の【かんきょう】を守る", kanji: "環境", reading: "かんきょう", hint: "取り巻く自然や周囲の状況", stroke: "13・14" },
    { q: "【せきにん】をもって行動する", kanji: "責任", reading: "せきにん", hint: "果たすべき任務やつとめ", stroke: "11・6" },
    { q: "正しい【じょうほう】を集める", kanji: "情報", reading: "じょうほう", hint: "ニュースやお知らせ・データ", stroke: "11・12" },
    { q: "高い目標に【ちょうせん】する", kanji: "挑戦", reading: "ちょうせん", hint: "困難なことにいどむこと", stroke: "9・16" },
    { q: "にがて科目を【こくふく】する", kanji: "克服", reading: "こくふく", hint: "困難やつらさに打ち勝つ", stroke: "7・8" },
    { q: "被災地を【しえん】する", kanji: "支援", reading: "しえん", hint: "力を貸して助けること", stroke: "7・12" },
    { q: "新しいアイデアを【ていあん】する", kanji: "提案", reading: "ていあん", hint: "考えや案を出すこと", stroke: "12・10" },
    { q: "部屋を【せいけつ】に保つ", kanji: "清潔", reading: "せいけつ", hint: "よごれがなくきれいなこと", stroke: "11・15" },
    { q: "【ふくざつ】な仕組みを解く", kanji: "複雑", reading: "ふくざつ", hint: "入り組んでいて難しいこと", stroke: "14・14" },
    { q: "潜在的な【のうりょく】を発揮する", kanji: "能力", reading: "のうりょく", hint: "物事をやりとげる力", stroke: "10・2" },
    { q: "バランスよく【えいよう】をとる", kanji: "栄養", reading: "えいよう", hint: "体を育てる成分", stroke: "9・15" },
    { q: "自分の考えを【ひょうげん】する", kanji: "表現", reading: "ひょうげん", hint: "言葉や絵であらわすこと", stroke: "8・11" },
    { q: "真面目な【たいど】で受ける", kanji: "態度", reading: "たいど", hint: "心構えや身のこなし", stroke: "14・9" },
    { q: "良い【えいきょう】を受ける", kanji: "影響", reading: "えいきょう", hint: "他に働きかけて変化を起こす", stroke: "15・20" },
    { q: "【きそく】正しい生活を送る", kanji: "規則", reading: "きそく", hint: "きまり・ルール", stroke: "11・9" },
    { q: "【ゆた】かな自然", kanji: "豊", reading: "ゆた", hint: "たっぷりある・豊富", stroke: "13" }
  ],

  // =============================================
  //  6年生 配当漢字 (18問収録) - 高度な論理・社会熟語
  // =============================================
  6: [
    { q: "【けんぽう】記念日をお祝いする", kanji: "憲法", reading: "けんぽう", hint: "国の最高法規", stroke: "16・8" },
    { q: "【せんきょ】で一票を投じる", kanji: "選挙", reading: "せんきょ", hint: "代表者を選ぶこと", stroke: "15・10" },
    { q: "的確な【ひはん】を受け止める", kanji: "批判", reading: "ひはん", hint: "良し悪しを正しく判定する", stroke: "7・7" },
    { q: "二国間で【じょうやく】を結ぶ", kanji: "条約", reading: "じょうやく", hint: "国家間の文書による合意", stroke: "7・9" },
    { q: "建物の【こうぞう】を調べる", kanji: "構造", reading: "こうぞう", hint: "各部分の組み立て方", stroke: "14・10" },
    { q: "【そしき】をしっかりまとめる", kanji: "組織", reading: "そしき", hint: "組み立てられた団体や機構", stroke: "8・18" },
    { q: "【ろんり】的に筋道を立てる", kanji: "論理", reading: "ろんり", hint: "考えや議論の筋道", stroke: "15・11" },
    { q: "犯人の足取りを【すいり】する", kanji: "推理", reading: "すいり", hint: "手がかりからおしはかる", stroke: "11・11" },
    { q: "【せいぎ】をつらぬく心", kanji: "正義", reading: "せいぎ", hint: "人の道にかなった正しいこと", stroke: "5・13" },
    { q: "国民の【けんり】を守る", kanji: "権利", reading: "けんり", hint: "法律上認められた資格や力", stroke: "15・7" },
    { q: "大会の開会を【せんげん】する", kanji: "宣言", reading: "せんげん", hint: "広く社会に言明すること", stroke: "9・7" },
    { q: "圧倒的な【そんざい】感がある", kanji: "存在", reading: "そんざい", hint: "現実にそこにいること", stroke: "6・6" },
    { q: "【じゅうなん】に対応する", kanji: "柔軟", reading: "じゅうなん", hint: "やわらかく変化に合わせる", stroke: "9・11" },
    { q: "相手を【かんよう】に受け入れる", kanji: "寛容", reading: "かんよう", hint: "心が広く人を許すこと", stroke: "13・10" },
    { q: "学んだ知識を【かつよう】する", kanji: "活用", reading: "かつよう", hint: "役立つように生かすこと", stroke: "9・5" },
    { q: "白と黒の【たいしょう】的な色", kanji: "対照", reading: "たいしょう", hint: "照らし合わせて比べること", stroke: "7・13" },
    { q: "時間の【たんしゅく】をはかる", kanji: "短縮", reading: "たんしゅく", hint: "短くちぢめること", stroke: "12・17" },
    { q: "山の【ちょうじょう】に立つ", kanji: "頂上", reading: "ちょうじょう", hint: "一番高いいただき", stroke: "11・3" }
  ]
};
