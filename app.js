
const tg = window.Telegram.WebApp
tg.expand()

document.getElementById("user").innerText =
"สวัสดี " + (tg.initDataUnsafe.user?.first_name || "สมาชิก")
