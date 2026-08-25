/**
 * わくわく学習アプリ - 算数クエスト 問題生成エンジン (math_data.js)
 * 小学校1〜6年生の算数学習指導要領 準拠
 * 計算問題自動生成 ＆ 文章題
 */

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * 1年生の問題生成
 */
function genG1Problem() {
  const types = ['add10', 'sub10', 'add20', 'sub20'];
  const type = types[getRandomInt(0, types.length - 1)];

  if (type === 'add10') {
    const a = getRandomInt(1, 9);
    const b = getRandomInt(1, 10 - a);
    return {
      expr: `${a} + ${b}`,
      ans: (a + b).toString(),
      text: `${a} + ${b} は？`,
      hint: "あわせて いくつになるかな？",
      points: 1,
      genre: "基本のたし算"
    };
  } else if (type === 'sub10') {
    const a = getRandomInt(2, 10);
    const b = getRandomInt(1, a);
    return {
      expr: `${a} - ${b}`,
      ans: (a - b).toString(),
      text: `${a} - ${b} は？`,
      hint: "のこりは いくつになるかな？",
      points: 1,
      genre: "基本のひき算"
    };
  } else if (type === 'add20') {
    // 繰り上がりあり
    const a = getRandomInt(5, 9);
    const b = getRandomInt(11 - a, 9);
    return {
      expr: `${a} + ${b}`,
      ans: (a + b).toString(),
      text: `${a} + ${b} は？`,
      hint: "10のまとまりを作ってみよう！",
      points: 2,
      genre: "くり上がりのたし算"
    };
  } else {
    // 繰り下がりあり
    const a = getRandomInt(11, 18);
    const b = getRandomInt(a - 9, 9);
    return {
      expr: `${a} - ${b}`,
      ans: (a - b).toString(),
      text: `${a} - ${b} は？`,
      hint: "10からひいてから たしてみよう！",
      points: 2,
      genre: "くり下がりのひき算"
    };
  }
}

/**
 * 2年生の問題生成（2桁計算・九九）
 */
function genG2Problem(subType) {
  const types = subType ? [subType] : ['kuku', 'add2digit', 'sub2digit'];
  const type = types[getRandomInt(0, types.length - 1)];

  if (type === 'kuku') {
    const a = getRandomInt(2, 9);
    const b = getRandomInt(1, 9);
    return {
      expr: `${a} × ${b}`,
      ans: (a * b).toString(),
      text: `${a} × ${b} は？`,
      hint: `${a}のだんの九九を思い出そう！`,
      points: 1,
      genre: "九九（かけ算）"
    };
  } else if (type === 'add2digit') {
    const a = getRandomInt(15, 69);
    const b = getRandomInt(12, 89 - a);
    return {
      expr: `${a} + ${b}`,
      ans: (a + b).toString(),
      text: `${a} + ${b} は？`,
      hint: "一の位、十の位を順番に足そう！",
      points: 2,
      genre: "2けたのたし算"
    };
  } else {
    const a = getRandomInt(30, 99);
    const b = getRandomInt(11, a - 10);
    return {
      expr: `${a} - ${b}`,
      ans: (a - b).toString(),
      text: `${a} - ${b} は？`,
      hint: "一の位から落ち着いて引こう！",
      points: 2,
      genre: "2けたのひき算"
    };
  }
}

/**
 * 3年生の問題生成（わり算・かけ算・3桁計算）
 */
function genG3Problem() {
  const types = ['div_simple', 'mult2digit', 'add3digit', 'sub3digit'];
  const type = types[getRandomInt(0, types.length - 1)];

  if (type === 'div_simple') {
    const b = getRandomInt(2, 9);
    const ans = getRandomInt(2, 9);
    const a = b * ans;
    return {
      expr: `${a} ÷ ${b}`,
      ans: ans.toString(),
      text: `${a} ÷ ${b} は？`,
      hint: `${b}のだんの九九で ${a} になるものをさがそう！`,
      points: 2,
      genre: "わり算の基礎"
    };
  } else if (type === 'mult2digit') {
    const a = getRandomInt(12, 45);
    const b = getRandomInt(2, 8);
    return {
      expr: `${a} × ${b}`,
      ans: (a * b).toString(),
      text: `${a} × ${b} は？`,
      hint: "筆算で計算してみよう！",
      points: 2,
      genre: "かけ算の筆算"
    };
  } else if (type === 'add3digit') {
    const a = getRandomInt(120, 580);
    const b = getRandomInt(110, 400);
    return {
      expr: `${a} + ${b}`,
      ans: (a + b).toString(),
      text: `${a} + ${b} は？`,
      hint: "位をそろえて計算しよう！",
      points: 2,
      genre: "3けたのたし算"
    };
  } else {
    const a = getRandomInt(350, 950);
    const b = getRandomInt(120, a - 100);
    return {
      expr: `${a} - ${b}`,
      ans: (a - b).toString(),
      text: `${a} - ${b} は？`,
      hint: "くり下がりに気をつけて引こう！",
      points: 2,
      genre: "3けたのひき算"
    };
  }
}

/**
 * 4年生の問題生成（わり算筆算・小数計算）
 */
function genG4Problem() {
  const types = ['div_hard', 'dec_add', 'dec_sub', 'mult_2by2'];
  const type = types[getRandomInt(0, types.length - 1)];

  if (type === 'div_hard') {
    const b = getRandomInt(11, 25);
    const ans = getRandomInt(4, 15);
    const a = b * ans;
    return {
      expr: `${a} ÷ ${b}`,
      ans: ans.toString(),
      text: `${a} ÷ ${b} は？`,
      hint: "商を立てて筆算で計算しよう！",
      points: 3,
      genre: "2けたのわり算"
    };
  } else if (type === 'dec_add') {
    const a = (getRandomInt(11, 58) / 10).toFixed(1);
    const b = (getRandomInt(11, 38) / 10).toFixed(1);
    const ans = (parseFloat(a) + parseFloat(b)).toFixed(1);
    return {
      expr: `${a} + ${b}`,
      ans: ans.replace(/\.0$/, ''),
      text: `${a} + ${b} は？`,
      hint: "小数点の位置をそろえて足そう！",
      points: 2,
      genre: "小数のたし算"
    };
  } else if (type === 'dec_sub') {
    const a = (getRandomInt(45, 95) / 10).toFixed(1);
    const b = (getRandomInt(11, 35) / 10).toFixed(1);
    const ans = (parseFloat(a) - parseFloat(b)).toFixed(1);
    return {
      expr: `${a} - ${b}`,
      ans: ans.replace(/\.0$/, ''),
      text: `${a} - ${b} は？`,
      hint: "小数点をそろえて引き算しよう！",
      points: 2,
      genre: "小数のひき算"
    };
  } else {
    const a = getRandomInt(15, 35);
    const b = getRandomInt(12, 28);
    return {
      expr: `${a} × ${b}`,
      ans: (a * b).toString(),
      text: `${a} × ${b} は？`,
      hint: "2けた×2けたの筆算で解こう！",
      points: 3,
      genre: "かけ算の筆算"
    };
  }
}

/**
 * 5年生の問題生成（小数かけわり・割合基礎・平均）
 */
function genG5Problem() {
  const types = ['dec_mult', 'dec_div', 'average', 'percentage'];
  const type = types[getRandomInt(0, types.length - 1)];

  if (type === 'dec_mult') {
    const a = (getRandomInt(12, 45) / 10).toFixed(1);
    const b = getRandomInt(2, 6);
    const ans = (parseFloat(a) * b).toFixed(1);
    return {
      expr: `${a} × ${b}`,
      ans: ans.replace(/\.0$/, ''),
      text: `${a} × ${b} は？`,
      hint: "小数点の位置に注意して計算しよう！",
      points: 2,
      genre: "小数のかけ算"
    };
  } else if (type === 'dec_div') {
    const b = getRandomInt(2, 5);
    const ansInt = getRandomInt(12, 35);
    const a = ((ansInt * b) / 10).toFixed(1);
    const ans = (ansInt / 10).toFixed(1);
    return {
      expr: `${a} ÷ ${b}`,
      ans: ans.replace(/\.0$/, ''),
      text: `${a} ÷ ${b} は？`,
      hint: "小数点をそのまま上に打とう！",
      points: 3,
      genre: "小数のわり算"
    };
  } else if (type === 'average') {
    const base = getRandomInt(60, 85);
    const d1 = getRandomInt(-8, 8);
    const d2 = getRandomInt(-8, 8);
    const d3 = -(d1 + d2);
    const a = base + d1;
    const b = base + d2;
    const c = base + d3;
    return {
      expr: `平均(${a}, ${b}, ${c})`,
      ans: base.toString(),
      text: `3つのテストの点数「${a}点, ${b}点, ${c}点」の平均は何点？`,
      hint: "全部足してから 3 で割ろう！",
      points: 3,
      genre: "平均の計算"
    };
  } else {
    const base = getRandomInt(2, 9) * 100;
    const pct = getRandomInt(1, 5) * 10;
    const ans = (base * (pct / 100)).toString();
    return {
      expr: `${base}円の ${pct}%`,
      ans: ans,
      text: `${base}円の ${pct}% は何円？`,
      hint: `${pct}% = ${(pct / 100).toFixed(1)} をかけ算しよう！`,
      points: 3,
      genre: "割合の基礎"
    };
  }
}

/**
 * 6年生の問題生成（比・速さ・分数文章題）
 */
function genG6Problem() {
  const types = ['speed', 'distance', 'time', 'ratio', 'frac_calc'];
  const type = types[getRandomInt(0, types.length - 1)];

  if (type === 'speed') {
    const speed = getRandomInt(30, 70);
    const time = getRandomInt(2, 4);
    const dist = speed * time;
    return {
      expr: `速さ = ${dist}km ÷ ${time}時間`,
      ans: speed.toString(),
      text: `${dist}kmの道のりを ${time}時間で進む自動車の「時速」は何km？`,
      hint: "速さ ＝ 道のり ÷ 時間",
      points: 3,
      genre: "速さの計算"
    };
  } else if (type === 'distance') {
    const speed = getRandomInt(40, 80);
    const time = getRandomInt(2, 5);
    const dist = speed * time;
    return {
      expr: `道のり = 時速${speed}km × ${time}時間`,
      ans: dist.toString(),
      text: `時速${speed}kmで走る電車が ${time}時間進むと、何km進む？`,
      hint: "道のり ＝ 速さ × 時間",
      points: 3,
      genre: "道のりの計算"
    };
  } else if (type === 'ratio') {
    const a = getRandomInt(2, 5);
    const b = getRandomInt(3, 7);
    const k = getRandomInt(2, 6);
    const known = a * k;
    const ans = (b * k).toString();
    return {
      expr: `${a} : ${b} = ${known} : □`,
      ans: ans,
      text: `${a} : ${b} ＝ ${known} : □ のとき、□に入る数は？`,
      hint: `比の左側が何倍になっているか考えよう！(${known} ÷ ${a} = ${k}倍)`,
      points: 3,
      genre: "比の計算"
    };
  } else {
    // 逆数・簡単な分数計算
    const a = getRandomInt(2, 8);
    const b = getRandomInt(2, 6);
    return {
      expr: `${a * b} × (1/${b})`,
      ans: a.toString(),
      text: `${a * b} の ${b}分の1 はいくつ？`,
      hint: `${a * b} ÷ ${b} と同じだよ！`,
      points: 2,
      genre: "分数の計算"
    };
  }
}

/**
 * 学年に合わせた問題リストを生成
 */
function generateMathQuiz(grade = 5, count = 10, mode = 'normal') {
  const g = parseInt(grade) || 5;
  const problems = [];

  for (let i = 0; i < count; i++) {
    let p;
    if (g === 1) p = genG1Problem();
    else if (g === 2) p = genG2Problem(mode === 'kuku' ? 'kuku' : null);
    else if (g === 3) p = genG3Problem();
    else if (g === 4) p = genG4Problem();
    else if (g === 5) p = genG5Problem();
    else p = genG6Problem();

    p.id = `math_${Date.now()}_${i}_${Math.random().toString(36).substring(2, 6)}`;
    p.grade = g;
    problems.push(p);
  }

  return problems;
}

if (typeof window !== 'undefined') {
  window.generateMathQuiz = generateMathQuiz;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { generateMathQuiz };
}
