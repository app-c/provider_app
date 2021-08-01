/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable global-require */
import React from "react";

import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";

export function Fonts() {
   const [fontsLoads] = useFonts({
      MontBlack: require("../../../assets/fonts/MontserratAlternates-Black.ttf"),
      MontRegular: require("../../../assets/fonts/MontserratAlternates-Regular.ttf"),
      MontBold: require("../../../assets/fonts/MontserratAlternates-Bold.ttf"),
   });

   return fontsLoads;
}

export const Colors = {
   rosa: "#cd6a96",
};

export function convertHours(time: string) {
   const [hour, minutes] = time.split(":").map(Number);
   const timeInMinutes = hour * 60 + minutes;
   return timeInMinutes;
}
