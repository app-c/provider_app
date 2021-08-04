import React, { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, Modal, RefreshControl } from "react-native";

import { useNavigation, useRoute } from "@react-navigation/native";

import { ServicosComponents } from "../../components/FlatListComponents/ServicosComponens";
import { UpdaServiceConponents } from "../../components/UpdateServiceConponents";
import { useAuth } from "../../hooks/AuthContext";
import { api } from "../../services/api";
import { Fonts } from "../utils";
import { Container, List, TextTitle } from "./styles";

export interface IData {
   id: string;
   service: string;
   time: string;
   description: string;
   value: string;
}

interface Res {
   res: string;
}

const UpdateService: React.FC = () => {
   const { navigate, addListener } = useNavigation();
   const route = useRoute();
   const res = route.params as Res;

   const [response, setResponse] = useState<IData[]>([]);
   const [at, setAt] = useState({ res: "clear" });
   const { prestador } = useAuth();
   const [serviceId, setServiceId] = useState("");
   const [refleshing, setReflesh] = useState(false);
   const [service, setService] = useState("");
   const [time, setTime] = useState("");
   const [description, setDescripton] = useState("");
   const [id, setId] = useState("");
   const [value, setValue] = useState("");

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
   }, [prestador.id, refleshing, res]);

   const handleUpate = useCallback(
      (
         id: string,
         service: string,
         time: string,
         description: string,
         value: string
      ) => {
         setId(id);
         setService(service);
         setTime(time);
         setDescripton(description);
         setValue(value);

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
         setAt({ res: "clear" });
      },
      [navigate]
   );

   return (
      <Container>
         <TextTitle>Atualizar os serviços</TextTitle>

         <List
            showsVerticalScrollIndicator={false}
            refreshControl={
               <RefreshControl refreshing={refleshing} onRefresh={onRefresh} />
            }
            data={response}
            keyExtractor={(item) => item.id}
            renderItem={({ item: h }) => (
               <ServicosComponents
                  update={() => {
                     handleUpate(
                        h.id,
                        h.service,
                        h.time,
                        h.description,
                        h.value
                     );
                  }}
                  deletar={() => handleDelete(h.id)}
                  service={h.service}
                  time={h.time}
                  description={h.description}
                  value={h.value}
               />
            )}
         />
      </Container>
   );
};

export default UpdateService;
