// MIT License © 2025 auieo-dayo

import { questions } from "./mondai.js";

// 変数
// 入力
let text
// ボタン
let btn
// 問題表示場所
let mondai
// 正解不正解
let seikaifuseikai
// 答えを見るボタン
let openanserbtn
// 問題の番号
let questionnumber

// 次の問題
let nextq
// 正解した数
let seikai=0
//問題数
let mondaisu
// 読み込み時
document.addEventListener("DOMContentLoaded",ev=>{
// 変数設定
text = document.getElementById("text")
btn = document.getElementById("chkbtn")
mondai = document.getElementById("mondai")
seikaifuseikai = document.getElementById("seikaifuseikai")
openanserbtn = document.getElementById("openanserbtn")
nextq = document.getElementById("nextq")
mondaisu = document.getElementById("mondaisu")
seikai = CookieManager.get("seikai")
//問題数
mondaisu.textContent = questions.length
// 入力値が変わったとき
text.addEventListener("input",ev=>{
    // 中身が空なら
    if (ev.target.value === "") {
        // ボタンをクリック不可にする
        btn.disabled = true
        // それ以外なら
    } else {
        // ボタンをクリック可にする
        btn.disabled = false
        // 答えを見るボタンを不可にする
        openanserbtn.disabled = true
    }
})
// 確認ボタンが押された時
btn.addEventListener("click",ev=>btnclick(ev))
// 答えを見るボタンが押されたとき
openanserbtn.addEventListener("click",ev=>{
    alert(`「${questions[questionnumber].Q}」の答え:「${questions[questionnumber].A}」`)
})
// 問題を変えるボタン
nextq.addEventListener("click",ev=>{
    question(ev)
})
// 初回正解数表示
document.querySelector("#seikaisu").textContent = seikai
// データリセットボタンが押されたとき
document.querySelector("#datareset").addEventListener("click",ev=>{
    if (confirm(`すべてのデータをリセットしていいですか？`)) {
    datareset()
    }
})
// 読みを表示が押されたとき
document.querySelector("#yomi").addEventListener("click",ev=>{Yomi()})
// 初回問題の設定
question()

})

// cookie
const CookieManager = {
    set: (name, value, days = 7) => {
      let expires = "";
      if (days) {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = `; expires=${date.toUTCString()}`;
      }
      document.cookie = `${name}=${encodeURIComponent(value)}${expires}; path=/`;
    },
  
    get: (name) => {
      const nameEQ = `${name}=`;
      const cookies = document.cookie.split('; ');
      for (let cookie of cookies) {
        if (cookie.startsWith(nameEQ)) {
          return decodeURIComponent(cookie.substring(nameEQ.length));
        }
      }
      return null;
    },
    delete: (name) => {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
    }
  }

//データリセット
function datareset() {
    CookieManager.set("seikai",0,0)
    location.href = location.href
}

// 問題設定
function question(ev) { 
questionnumber=randomint(0,questions.length-1)
mondai.textContent = `${questions[questionnumber].Q}`
text.disabled = false
text.value = ""
}

// ボタンが押されたとき
function btnclick(ev) {
// 回答を変数に格納
let kaito = text.value

// 内容がない場合
if (kaito === "") {
alert("入力してください")

// あっている場合
} else if (kaito.toLowerCase() === questions[questionnumber].A.toLowerCase()) {
    seikaifuseikai.textContent = "正解！"
    btn.disabled = true
    seikai++
    CookieManager.set("seikai",seikai,100)
    setTimeout(question,3000)
    // 正解数表示
    document.querySelector("#seikaisu").textContent = seikai
} else {
    seikaifuseikai.textContent = "不正解"
    openanserbtn.disabled = false
}
}
// 読みを表示
function Yomi() {
    if (questions[questionnumber].Q === "") {
        console.error(`[Yomi]エラー${questions[questionnumber]}`)
        return;
    }
    alert(`${questions[questionnumber].Q}の読みは「${questions[questionnumber].yomi}」`)
}
// 乱数
function randomint(a,b){
    return Math.floor(Math.random() * (b - a + 1)) + a;
}