/* eslint-disable camelcase */
/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable consistent-return */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/style-prop-object */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import "react-native-gesture-handler";

import React, { useEffect, useState } from "react";
import { Alert, Platform, View } from "react-native";

import AppLoading from "expo-app-loading";
import { StatusBar } from "expo-status-bar";
import * as Updates from "expo-updates";

import {
   FredokaOne_400Regular,
   useFonts,
} from "@expo-google-fonts/fredoka-one";
import {
   QuattrocentoSans_400Regular,
   QuattrocentoSans_700Bold,
} from "@expo-google-fonts/quattrocento-sans";

import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "styled-components";

import theme from "./Global/theme";
import AppProvider from "./hooks";
import Routes from "./routes";

const App: React.FC = () => {
   // useEffect(() => {
   //    async function updateApp() {
   //       const { isAvailable } = await Updates.checkForUpdateAsync();
   //       if (isAvailable) {
   //          await Updates.fetchUpdateAsync();
   //          await Updates.reloadAsync(); // depende da sua estratégia
   //       }
   //    }
   //    updateApp();
   // }, []);

   const [fontsLoaded] = useFonts({
      QuattrocentoSans_400Regular,
      QuattrocentoSans_700Bold,
      FredokaOne_400Regular,
   });

   if (!fontsLoaded) {
      return <AppLoading />;
   }

   return (
      <NavigationContainer>
         <StatusBar style="dark" hidden />
         <AppProvider>
            <ThemeProvider theme={theme}>
               <View style={{ flex: 1 }}>
                  <Routes />
               </View>
            </ThemeProvider>
         </AppProvider>
      </NavigationContainer>
   );
};

export default App;
