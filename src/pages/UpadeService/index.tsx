import React, { useCallback, useEffect, useRef, useState } from "react";
import { Alert, RefreshControl } from "react-native";

import AppLoading from "expo-app-loading";

import { useNavigation } from "@react-navigation/native";

import Button from "../../componentesServiço/Button";
import Input from "../../componentesServiço/Input";
import { useAuth } from "../../hooks/AuthContext";
import { api } from "../../services/api";
import getValidationErrors from "../../utils/getValidationsErrors";
import { Fonts } from "../utils";
import {
   Box,
   BoxEdit,
   BoxEditTouth,
   Container,
   ContainerEdid,
   ContainerService,
   List,
   Scroll,
   TextDescription,
   TextElementos,
   TextTitle,
   BoxEditToutB,
} from "./styles";

export interface IData {
   id: string;
   service: string;
   time: string;
   description: string;
   value: number;
}

const UpdateService: React.FC = () => {
   const { navigate, addListener } = useNavigation();
   const fontsL = Fonts();
   const [response, setResponse] = useState<IData[]>([]);
   const { prestador } = useAuth();
   const [serviceId, setServiceId] = useState("");
   const [refleshing, setReflesh] = useState(false);
   const [service, setService] = useState("");
   const [time, setTime] = useState("");
   const [description, setDescripton] = useState("");
   const [id, setId] = useState("");
   const [value, setValue] = useState(0);

   const handleDelete = useCallback(
      async (id: string) => {
         await api.delete(`/service/service/${id}/delet`);

         setResponse(response.filter((h) => h.id !== id));
      },
      [response]
   );

   useEffect(() => {
      const unsubscribe = addListener("focus", () => {
         // Screen was focused
         // Do something
      });

      return unsubscribe;
   }, [addListener]);

   const onRefresh = useCallback(() => {
      function wait(timeout: any) {
         return new Promise((resolve) => {
            setTimeout(resolve, timeout);
         });
      }

      wait(1000).then(() => {
         setServiceId("");
         setReflesh(false);
         api.get(`service/${prestador.id}/list`).then((res) =>
            setResponse(res.data)
         );
      });
   }, [prestador.id]);

   useEffect(() => {
      api.get(`service/${prestador.id}/list`).then((res) =>
         setResponse(res.data)
      );
   }, [prestador.id, refleshing]);

   const handleUpate = useCallback(
      ({ id, service, time, description, value }: IData) => {
         async function up() {
            navigate("Update", {
               id,
               service,
               time,
               description,
               value,
            });
         }
         up();
      },
      [navigate]
   );

   if (!fontsL) {
      return <AppLoading />;
   }

   return (
      <>
         <Container behavior="padding">
            <Scroll
               refreshControl={
                  <RefreshControl
                     refreshing={refleshing}
                     onRefresh={onRefresh}
                  />
               }
            >
               <TextTitle>Atualizar os serviços</TextTitle>

               <ContainerService>
                  <List
                     contentContainerStyle={{
                        paddingBottom: 30,
                     }}
                     data={response}
                     keyExtractor={(res) => res.id}
                     renderItem={({ item: res }) => (
                        <Box>
                           <TextElementos>
                              {" "}
                              Serviço: {}
                              <TextDescription>{res.service}</TextDescription>
                           </TextElementos>

                           <TextElementos>
                              {" "}
                              Descrição: {}
                              <TextDescription>
                                 {res.description}
                              </TextDescription>
                           </TextElementos>

                           <TextElementos>
                              {" "}
                              Valor: R$ {}
                              <TextDescription>{res.value}</TextDescription>
                           </TextElementos>

                           <TextElementos>
                              {" "}
                              Tempo: {}
                              <TextDescription> {res.time}</TextDescription>
                           </TextElementos>
                           <ContainerEdid>
                              {setId(res.id)}
                              {setService(res.service)}
                              {setDescripton(res.description)}
                              {setValue(res.value)}
                              {setTime(res.time)}
                              <BoxEditTouth
                                 onPress={() => {
                                    handleUpate({
                                       id,
                                       service,
                                       description,
                                       value,
                                       time,
                                    });
                                 }}
                              >
                                 <BoxEdit>
                                    <TextDescription>Editar</TextDescription>
                                 </BoxEdit>
                              </BoxEditTouth>

                              <BoxEditToutB
                                 onPress={() => handleDelete(res.id)}
                              >
                                 <BoxEdit>
                                    <TextDescription>Deletar</TextDescription>
                                 </BoxEdit>
                              </BoxEditToutB>
                           </ContainerEdid>
                        </Box>
                     )}
                  />
               </ContainerService>
            </Scroll>
         </Container>
      </>
   );
};

export default UpdateService;
