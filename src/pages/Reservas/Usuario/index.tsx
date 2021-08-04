/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable camelcase */
import React, { useCallback, useState, useMemo, useEffect } from "react";
import { Alert, RefreshControl, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { useNavigation } from "@react-navigation/native";

import Button from "../../../components/Button";
import { useAuth } from "../../../hooks/AuthContext";
import { api } from "../../../services/api";
import {
   Container,
   ContainerAvatar,
   ContainerFlatList,
   ContainerInput,
   ContainerUser,
   ImageAvatar,
   InputContainer,
   InpuTextPesquisa,
   TextTitle,
   ServiceContainer,
   BoxContainer,
   ServiceText,
} from "./styles";

export interface IResposta {
   id: string;
   nome: string;
   avatar: string;
}

export interface IResponse {
   services: [{ id: string; service: string }];
}

export interface Response {
   id: string;
   service: string;
}

const ReservaCliente: React.FC = () => {
   const { navigate } = useNavigation();
   const { prestador } = useAuth();

   const [use, setUse] = useState<IResposta[]>([]);
   const [value, onChangeText] = useState<string>();
   const [selectId, setSelectId] = useState("a");
   const [selectService, setSelectService] = useState("a");
   const [response, setResponse] = useState<IResponse>();
   const [service, setService] = useState<Response[] | undefined>([]);

   const navigateCreateAgendamento = useCallback(
      (user_id: string, service: string) => {
         navigate("agendar user", { user_id, service });
      },
      [navigate]
   );

   useEffect(() => {
      async function load() {
         try {
            const user = await api.get("/find", {
               params: {
                  nome: value,
               },
            });
            const { message } = user.data;

            if (message) {
               Alert.alert("Sorry", message);
            }
            setUse(user.data);
         } catch (error) {
            Alert.alert("sorry");
         }
      }

      load();
   }, [value]);

   useMemo(() => {
      if (!response) return;
      const ser = response.services.map((h) => {
         return {
            id: h.id,
            service: h.service,
         };
      });
      setService(ser);
   }, [response]);

   const hansleService = useCallback((servico: string) => {
      setSelectService(servico);
   }, []);

   const handlePres = useCallback((id: string) => {
      setSelectId(id);
   }, []);

   useEffect(() => {
      async function load() {
         const res = await api.get("/prestador/profile", {
            params: { provider_id: prestador.id },
         });

         setResponse(res.data);
      }
      load();
   }, []);

   console.log(response);

   const urlAvatar = "https://dai-nails.s3.us-east-2.amazonaws.com/";

   return (
      <Container>
         <TextTitle>
            Escolha um cliente e um serviço para realizar o agendamento
         </TextTitle>
         <InputContainer>
            <TextTitle>Pesquisar por um usuário</TextTitle>
            <InpuTextPesquisa
               onChangeText={(text) => onChangeText(text)}
               value={value}
            />
         </InputContainer>

         <ContainerFlatList>
            <ContainerInput
               contentContainerStyle={{
                  paddingBottom: 0,
               }}
               data={use}
               keyExtractor={(res) => res.id}
               renderItem={({ item: res }) => (
                  <ContainerUser
                     onPress={() => handlePres(res.id)}
                     pres={selectId === res.id}
                  >
                     <ContainerAvatar>
                        <ImageAvatar
                           source={{ uri: `${urlAvatar}${res.avatar}` }}
                        />
                     </ContainerAvatar>
                     <TextTitle>{res.nome}</TextTitle>
                  </ContainerUser>
               )}
            />
         </ContainerFlatList>

         <View
            style={{
               height: 50,
               alignItems: "center",
               justifyContent: "center",
            }}
         >
            <ServiceContainer
               showsHorizontalScrollIndicator={false}
               horizontal
               data={service}
               keyExtractor={(service) => service.id}
               renderItem={({ item: service }) => (
                  <BoxContainer
                     pres={selectService === service.service}
                     onPress={() => {
                        hansleService(service.service);
                     }}
                  >
                     <ServiceText pres={selectService === service.service}>
                        {service.service}
                     </ServiceText>
                  </BoxContainer>
               )}
            />
         </View>

         <Button
            pres={() => {
               navigateCreateAgendamento(selectId, selectService);
            }}
         >
            Proximo
         </Button>
      </Container>
   );
};

export default ReservaCliente;
