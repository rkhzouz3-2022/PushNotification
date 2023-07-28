import React from "react";
import messaging from "@react-native-firebase/messaging";

export const getFCMToken = async () => {
    try {
        const newFCMToken = await messaging().getToken();
        console.log(newFCMToken);
        return newFCMToken;
    }
    catch (error) {
        console.log(error);
        return null;
    }
}

export const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled = 
        authStatus === messaging.AuthorizationStatus.AUTHORIZED || 
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        console.log("Authorization Status: ", authStatus);
    }
}

export const notificationListener = () => {

    // Background
    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log("Notification caused app to open from background state: ", remoteMessage.notification);
    });

    // Quit
    messaging()
        .getInitialNotification()
        .then(remoteMessage => {
            if (remoteMessage) {
                console.log("Notification caused app to open from quit state: ", remoteMessage.notification)
            }
        })
        .catch(error => console.log("failed", error));

    // TODO: Foreground
    messaging().onMessage(remoteMessage => {
        console.log("foreground", remoteMessage);
    })
}