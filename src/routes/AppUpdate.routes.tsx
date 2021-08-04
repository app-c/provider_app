import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import { UpdaServiceConponents } from "../components/UpdateServiceConponents";
import AgendamentoCliente from "../pages/AgendamentoCliente";
import Bloqueio from "../pages/Bloqueio";
import Usuario from "../pages/Reservas";
import ReservaDiaria from "../pages/Reservas/ReservaDiaria";
import ReservaCliente from "../pages/Reservas/Usuario";
import UpdateService from "../pages/UpadeService";

const Auth = createStackNavigator();

const AppUpdate: React.FC = () => {
   return (
      <Auth.Navigator
         screenOptions={{
            headerShown: false,
         }}
      >
         <Auth.Screen name="Atualizar" component={UpdateService} />
         <Auth.Screen name="Update" component={UpdaServiceConponents} />
      </Auth.Navigator>
   );
};

export default AppUpdate;
