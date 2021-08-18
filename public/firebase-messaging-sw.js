importScripts('https://www.gstatic.com/firebasejs/8.9.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.9.1/firebase-messaging.js');

// const firebaseConfig = {
//     apiKey: "AIzaSyDqemGHgKb_JUWqC5_T1YhA-xydruFigKQ",
//     authDomain: "kinocms-43f31.firebaseapp.com",
//     projectId: "kinocms-43f31",
//     storageBucket: "gs://kinocms-43f31.appspot.com",
//     messagingSenderId: "476797615031",
//     appId: "1:476797615031:web:62073167c0e88b0ee00632"
// };

firebase.initializeApp({
    apiKey: "AIzaSyDqemGHgKb_JUWqC5_T1YhA-xydruFigKQ",
    authDomain: "kinocms-43f31.firebaseapp.com",
    projectId: "kinocms-43f31",
    storageBucket: "gs://kinocms-43f31.appspot.com",
    messagingSenderId: "476797615031",
    appId: "1:476797615031:web:62073167c0e88b0ee00632"
})

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler((payload) => {
    let obj = JSON.parse(payload)
    let notificationTitle = obj.title;
    const options = {
        body: obj.body,
        icon: obj.icon
    }
    return self.registration.showNotification(notificationTitle, options)
})