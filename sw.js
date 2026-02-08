importScripts('https://www.gstatic.com/firebasejs/9.17.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.17.1/firebase-messaging-compat.js');

// AS MESMAS CONFIGURAÇÕES DO FIREBASE AQUI
firebase.initializeApp({
    apiKey: "SUA_API_KEY",
    projectId: "SEU_PROJETO",
    messagingSenderId: "SEU_SENDER_ID",
    appId: "SEU_APP_ID"
});

const messaging = firebase.messaging();

// Gerencia a notificação quando o app está em segundo plano (background)
messaging.onBackgroundMessage((payload) => {
    console.log('[sw.js] Notificação recebida em background: ', payload);

    const notificationTitle = payload.notification.title || "Nova Mensagem!";
    const notificationOptions = {
        body: payload.notification.body || "Você tem uma nova atualização no app.",
        icon: 'https://cdn-icons-png.flaticon.com/512/2589/2589175.png', // Seu ícone
        badge: 'https://cdn-icons-png.flaticon.com/512/2589/2589175.png', // Ícone pequeno na barra
        vibrate: [200, 100, 200], // Faz o celular vibrar
        data: {
            url: 'index.html' // Abre o app ao clicar
        }
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});

// Faz o app abrir quando você clica na notificação
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.openWindow('index.html')
    );
});
