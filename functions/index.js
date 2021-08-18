const functions = require("firebase-functions");
const admin = require("firebase-admin")

admin.initializeApp(functions.config().firebase)



// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.sendNotifications = functions.database.ref('/notifications/{notificationId}').onWrite((event) => {
    if (event.database.previous.val()) {
        return
    }
    if (!event.database.exists()) {
        return
    }

    const notificationSnapshot = event.database;
    const payload = {
        notification: {
            title: "New notification",
            body: notificationSnapshot.val().message,
            // icons: notificationSnapshot.val().icon
        }
    }

    console.info(payload)
})