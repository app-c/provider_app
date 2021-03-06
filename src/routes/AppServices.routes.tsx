import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import { UpdaServiceConponents } from "../components/UpdateServiceConponents";
import AgendamentoCliente from "../pages/AgendamentoCliente";
import Bloqueio from "../pages/Bloqueio";
import Usuario from "../pages/Reservas";
import ReservaDiaria from "../pages/Reservas/ReservaMes";
import ReservaCliente from "../pages/Reservas/Usuario";
import UpdateService from "../pages/UpadeService";

const Auth = createStackNavigator();

const AppService: React.FC = () => {
   return (
      <Auth.Navigator
         screenOptions={{
            headerShown: false,
         }}
      >
         <Auth.Screen name="reserva" component={Usuario} />
         <Auth.Screen name="reserva diaria" component={ReservaDiaria} />
         <Auth.Screen name="ReservaCliente" component={ReservaCliente} />
         <Auth.Screen name="agendar user" component={AgendamentoCliente} />
         <Auth.Screen name="Bloqueio" component={Bloqueio} />
         <Auth.Screen name="Atualizar serviço" component={UpdateService} />
         <Auth.Screen name="Update" component={UpdaServiceConponents} />
      </Auth.Navigator>
   );
};

export default AppService;
