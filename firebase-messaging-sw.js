importScripts('https://www.gstatic.com/firebasejs/7.2.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.2.1/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyChAE_VOfhBViNd-3MvR41c2sGs8z7V7Qc",
    authDomain: "web-zalfa.firebaseapp.com",
    projectId: "web-zalfa",
    storageBucket: "web-zalfa.firebasestorage.app",
    messagingSenderId: "393323117445",
    appId: "1:393323117445:web:1ea185dfcf55aecb6622ec"
});

const messaging = firebase.messaging();

// Menggunakan setBackgroundMessageHandler untuk menerima pesan latar belakang
messaging.setBackgroundMessageHandler((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: 'images/icon-pwa-192x192.png'
    };

    return self.registration.showNotification(notificationTitle, notificationOptions);
});

