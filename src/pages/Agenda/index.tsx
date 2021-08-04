import React, { useEffect, useState } from "react";
import { StyleSheet, Text } from "react-native";

import AppLoading from "expo-app-loading";

import { Fontisto as Icon, Feather } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";
import { format } from "date-fns";

import { HorariosComponents } from "../../components/FlatListComponents/HorariosComponents";
import { api } from "../../services/api";
import { Fonts } from "../utils";
import {
   Container,
   AgendaView,
   List,
   Title,
   ContainerAgenda,
   ContainerElement,
   Avatar,
   ContainerText,
   ContainerAvatart,
   PropsText,
} from "./styles";

export interface Response {
   id: string;
   ano: number;
   mes: number;
   dia: number;
   from: number;
   service: string;
   horaFormatada: string;
   dateFormatada: string;
   user: {
      nome: string;
      avatar: string;
      telefone: string;
   };
}

const Agenda: React.FC = () => {
   const { navigate } = useNavigation();
   const [agenda, setAgenda] = useState<Response[]>([]);

   function formated(ano: number, mes: number, dia: number, min: number) {
      const date = new Date(ano, mes - 1, dia, 0, min);
      const horaFormated = format(date, "HH:mm");
      const dataFormated = format(date, "dd/MM");
      return { horaFormated, dataFormated };
   }

   useEffect(() => {
      async function Load() {
         const res = await api.get("/agendamento/me/prestador");

         setAgenda(
            res.data.map((h: Response) => ({
               ...h,
               horaFormatada: formated(h.ano, h.mes, h.dia, h.from)
                  .horaFormated,
               dateFormatada: formated(h.ano, h.mes, h.dia, h.from)
                  .dataFormated,
            }))
         );
      }

      Load();
   }, []);

   return (
      <>
         <Container>
            <Title style={{ fontFamily: "MontBold" }}>Minha agenda</Title>
            <List
               data={agenda}
               keyExtractor={(h) => h.id}
               renderItem={({ item: h }) => (
                  <HorariosComponents
                     title="Horários marcados"
                     name={h.user.nome}
                     service={h.service}
                     avatar={h.user.avatar}
                     hora={h.horaFormatada}
                     date={h.dateFormatada}
                     container="2"
                  />
               )}
            />
         </Container>
      </>
   );
};

export default Agenda;
