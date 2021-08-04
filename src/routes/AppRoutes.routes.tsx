/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable import/extensions */
import React, { useEffect, useState } from "react";
import { Alert, Platform } from "react-native";

import Constants from "expo-constants";
import * as Notifications from "expo-notifications";

import { createDrawerNavigator } from "@react-navigation/drawer";

import { useAuth } from "../hooks/AuthContext";
import Agenda from "../pages/Agenda";
import DashBoard from "../pages/DashBoard";
import { Notification } from "../pages/Notification";
import Profile from "../pages/Profile";
import Serviço from "../pages/Serviço";
import UpdateService from "../pages/UpadeService";
import { api } from "../services/api";
import AppService from "./AppServices.routes";
import AppUpdate from "./AppUpdate.routes";

const Drawer = createDrawerNavigator();

const AppRoutes: React.FC = () => {
   const [expoPushToken, setExpoPushToken] = useState<string | undefined>("");
   const { prestador } = useAuth();

   useEffect(() => {
      async function Register() {
         await RegistroDeToken().then((token) => setExpoPushToken(token));
      }

      async function ApiRest() {
         if (!expoPushToken) return;

         const response = await api.put("/prestador/updateToken", {
            token: expoPushToken,
         });

         return response.data;
      }
      Register();
      ApiRest();
   }, [expoPushToken, prestador.id]);

   async function RegistroDeToken() {
      let token;
      if (Constants.isDevice) {
         const { status: existingStatus } =
            await Notifications.getPermissionsAsync();
         let finalStatus = existingStatus;
         if (existingStatus !== "granted") {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
         }
         if (finalStatus !== "granted") {
            alert("Failed to get push token for push notification!");
            return;
         }
         token = (await Notifications.getExpoPushTokenAsync()).data;
         // console.log(token);
      } else {
         alert("Must use physical device for Push Notifications");
      }

      if (Platform.OS === "android") {
         Notifications.setNotificationChannelAsync("default", {
            name: "default",
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: "#FF231F7C",
         });
      }

      return token;
   }

   return (
      <Drawer.Navigator initialRouteName="Home">
         <Drawer.Screen name="Home" component={DashBoard} />
         <Drawer.Screen name="Agenda" component={Agenda} />
         <Drawer.Screen name="Profile" component={Profile} />
         <Drawer.Screen name="Serviço" component={Serviço} />
         <Drawer.Screen name="Atualizar serviço" component={AppUpdate} />
         <Drawer.Screen name="Reserva de horários" component={AppService} />
         <Drawer.Screen name="notification" component={Notification} />
      </Drawer.Navigator>
   );
};

export default AppRoutes;
