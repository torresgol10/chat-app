export default function checkPageStatus(message, user) {
    console.log(user !== localStorage.getItem("userName"))
    console.log(user)
    console.log(localStorage.getItem("userName"))
    if (user !== localStorage.getItem("userName")) {
        if (!("Notification" in window)) {
            alert("This browser does not support system notifications!")
        } else if (Notification.permission === "granted") {
            sendNotification(message, user)
        } else if (Notification.permission !== "denied") {
            Notification.requestPermission((permission) => {
                if (permission === "granted") {
                    sendNotification(message, user)
                }
            })
        }
    }
}


/*
title - New message from Open Chat
icon - image URL from Flaticon
body - main content of the notification
*/
function sendNotification(message, user) {
    document.onvisibilitychange = () => {
        if (document.hidden) {
            const notification = new Notification("New message from Open Chat", {
                icon: "https://cdn-icons-png.flaticon.com/512/733/733585.png",
                body: `@${user}: ${message}`
            })
            notification.onclick = () => function () {
                window.open("http://localhost:3000/chat")
            }
        }
    }
}