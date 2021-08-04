/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint-disable block-scoped-var */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-expressions */
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { RefreshControl, ScrollView, Text } from "react-native";

import * as Notificatons from "expo-notifications";
import { hide } from "expo-splash-screen";

import { Feather, Ionicons } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";
import prBr, {
   differenceInSeconds,
   format,
   getDate,
   getHours,
   isToday,
} from "date-fns";
import { isAfter } from "date-fns/esm";

import { HorariosComponents } from "../../components/FlatListComponents/HorariosComponents";
import { useAuth } from "../../hooks/AuthContext";
import { api, socket } from "../../services/api";
import { convertHours } from "../utils";
import {
   Container,
   Header,
   HeaderTitle,
   Linear,
   ProfileButton,
   UserAvatar,
   UserName,
   ContainerAvatar,
   ContainerMail,
   Recivid,
   Flat,
} from "./styles";

export interface Request {
   ano: number;
   mes: number;
   dia: number;
   from: number;
   service: string;
   id: string;
   user: {
      nome: string;
      avatar: string;
   };
   horaFormatada: string;
   dataFormatada: string;
}

export interface Response {
   from: number;
}

interface AgProps {
   name: string;
   avatar: string;
   date: string;
   hora: string;
   service: string;
}

interface Message {
   message: {
      content: string;
   };
}

const DashBoard: React.FC = () => {
   const { prestador } = useAuth();
   const { navigate } = useNavigation();

   const [appointment, setAppoitment] = useState<Request[]>([]);
   const [agendas, seAgendas] = useState<Response[]>([{ from: 0 }]);
   const [refleshing, setReflesh] = useState(false);
   const [recived, setRecived] = useState(0);
   const [message, setMessage] = useState<any[]>([]);

   function formated(ano: number, mes: number, dia: number, min: number) {
      const date = new Date(ano, mes - 1, dia, 0, min);
      const horaFormated = format(date, "HH:mm");
      const dataFormated = format(date, "dd/MM");
      return { horaFormated, dataFormated };
   }

   const handleMessage = useCallback(() => {
      setRecived(0);
      navigate("message");
   }, [navigate]);

   const mess = useCallback(() => {
      setRecived(recived + 1);
      return setMessage;
   }, [recived]);

   const navigateToProfile = useCallback(() => {
      navigate("Profile");
   }, [navigate]);

   useEffect(() => {
      try {
         socket.on("hora", (newAgenda: Response) => {
            seAgendas([...agendas, newAgenda]);
         });
      } catch (error) {
         console.log(error);
      }

      try {
         socket.on("delet", (del: string) => {
            const de = appointment.filter((h) => {
               return h.id !== del;
            });

            setAppoitment(de);
         });
      } catch (error) {
         console.log(error);
      }
   }, [agendas, appointment]);

   useEffect(() => {
      async function Load() {
         try {
            const response = await api.get("/agendamento/me/prestador");

            setAppoitment(
               response.data.map((h: Request) => ({
                  ...h,
                  horaFormatada: formated(h.ano, h.mes, h.dia, h.from)
                     .horaFormated,
                  dataFormatada: formated(h.ano, h.mes, h.dia, h.from)
                     .dataFormated,
               }))
            );
         } catch (error) {
            console.log(error);
         }
      }
      Load();
   }, [agendas]);

   const ag = useMemo(() => {
      const res = appointment.find((h) => {
         const dia = getDate(new Date(Date.now()));
         const horaN = new Date(Date.now());
         const horformated = format(horaN, "HH:mm");
         const convetH = convertHours(horformated);
         const hora = new Date(0, 0, 0, 0, h.from, 0).getHours();

         const compare = isAfter(
            new Date(h.ano, h.mes, h.dia, 0, h.from),
            new Date(Date.now())
         );

         if (compare) {
            return h;
         }
      });

      return res;
   }, [appointment]);

   const afterAgendamento = useMemo(() => {
      return appointment.filter((h) => {
         if (!ag) return;
         const compare = isAfter(
            new Date(h.ano, h.mes, h.dia, 0, h.from),
            new Date(ag?.ano, ag?.mes, ag?.dia, 0, ag?.from)
         );
         if (compare) {
            return h;
         }
      });
   }, [ag, appointment]);

   const onRefresh = useCallback(() => {
      function wait(timeout: any) {
         return new Promise((resolve) => {
            setTimeout(resolve, timeout);
         });
      }

      wait(2000).then(() => {
         setReflesh(false);
         api.get("/agendamento/me/prestador").then((res) =>
            setAppoitment(res.data)
         );
      });
   }, []);

   useEffect(() => {
      async function Not() {
         return appointment.map(async (h) => {
            const seconds = differenceInSeconds(
               new Date(h.ano, h.mes, h.dia, 0, h.from - 60, 0),
               new Date(Date.now())
            );

            await Notificatons.scheduleNotificationAsync({
               content: {
                  title: "Meu agendamento",
                  body: `Você tem um horario agendado pra ${h.horaFormatada} do dia ${h.dataFormatada} `,
                  sound: true,
                  priority: Notificatons.AndroidNotificationPriority.HIGH,
               },
               trigger: { seconds },
            });
         });
      }
      Not();
   }, [ag, appointment]);

   const urlAvatar = "https://dai-nails.s3.us-east-2.amazonaws.com/";

   return (
      <Container
         start={{ x: 0, y: 0 }}
         end={{ x: 1, y: 0 }}
         locations={[0.2, 1]}
         colors={["#E4C6D5", "#EAEAEA"]}
      >
         <Header>
            <Linear
               start={{ x: 1, y: 1 }}
               end={{ x: 0, y: 1 }}
               colors={["#f4b7b7", "#ecc8db"]}
            >
               <HeaderTitle>
                  Ola..., {"\n"}
                  <UserName>{prestador.nome}</UserName>
               </HeaderTitle>

               <ProfileButton onPress={navigateToProfile}>
                  <ContainerAvatar>
                     <ContainerMail onPress={handleMessage}>
                        <Recivid>
                           <Text>{recived}</Text>
                        </Recivid>
                        <Ionicons name="mail-outline" size={30} />
                     </ContainerMail>
                     <UserAvatar
                        source={{
                           uri: `${urlAvatar}${prestador.avatar}`,
                        }}
                     />
                  </ContainerAvatar>
               </ProfileButton>
            </Linear>
         </Header>

         {ag && (
            <HorariosComponents
               container="1"
               title="Próximo atendimento"
               name={ag.user.nome}
               avatar={`${urlAvatar}${ag.user.avatar}`}
               service={ag.service}
               date={ag.dataFormatada}
               hora={ag.horaFormatada}
            />
         )}

         <Flat
            contentContainerStyle={{
               paddingVertical: 20,
            }}
            data={afterAgendamento}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
               <HorariosComponents
                  container="2"
                  title="Horários agendados"
                  name={item.user.nome}
                  service={item.service}
                  avatar={`${urlAvatar}${item.user.avatar}`}
                  date={
                     formated(item.ano, item.mes, item.dia, item.from)
                        .dataFormated
                  }
                  hora={
                     formated(item.ano, item.mes, item.dia, item.from)
                        .horaFormated
                  }
               />
            )}
         />
      </Container>
   );
};

export default DashBoard;
