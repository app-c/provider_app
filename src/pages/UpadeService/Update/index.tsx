import React, { useCallback, useRef, useState } from "react";
import { Alert } from "react-native";

import { useNavigation, useRoute } from "@react-navigation/native";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/mobile";
import * as Yup from "yup";

import Button from "../../../components/Button";
import Input from "../../../components/Input";
import { useAuth } from "../../../hooks/AuthContext";
import { api } from "../../../services/api";
import getValidationErrors from "../../../utils/getValidationsErrors";
import { ContainerUpdate } from "./styles";

export interface IData {
   id: string;
   service: string;
   time: string;
   description: string;
   value: number;
}

interface Res {
   onPres: boolean;
}

const Update: React.FC = () => {
   const [serviceId, setServiceId] = useState("");
   const [response, setResponse] = useState<IData[]>([]);

   const formRef = useRef<FormHandles>(null);
   const { navigate } = useNavigation();
   const { prestador } = useAuth();
   const { params } = useRoute();

   const routeParmans = params as IData;

   const updateService = useCallback(
      async (data: IData) => {
         try {
            formRef.current?.setErrors({});

            const res = await api.patch("/service/service/update", {
               id: data.id,
               service: data.service,
               description: data.description,
               time: data.time,
               value: data.value,
            });

            console.log(res.data);

            const { message } = res.data;
            if (!message) {
               Alert.alert("Serviço atualizado com sucesso");
               navigate("Home");
            } else {
               Alert.alert("Erro", message);
            }

            api.get(`/service${prestador.id}/list`).then((response) => {
               setResponse(response.data);
            });
         } catch (err) {
            if (err instanceof Yup.ValidationError) {
               const errors = getValidationErrors(err);
               formRef.current?.setErrors(errors);

               return;
            }
            Alert.alert("Erro ao cadastrar um novo serviço", err.message);
         }
      },
      [navigate, prestador.id, serviceId]
   );

   return (
      <ContainerUpdate>
         <Form
            initialData={{
               service: routeParmans.service,
               description: routeParmans.description,
               time: routeParmans.time,
               value: routeParmans.value,
            }}
            ref={formRef}
            onSubmit={updateService}
         >
            <Input name="service" icon="" placeholder="Nome do serivço" />

            <Input
               name="description"
               icon=""
               placeholder="Descrição do serviço"
            />

            <Input name="value" icon="" placeholder="Valor do serviço" />

            <Input
               name="time"
               icon=""
               placeholder="Duraçao do service exp: 01:00"
            />

            <Button
               onPress={() => {
                  formRef.current?.submitForm();
               }}
            >
               Atualizar
            </Button>
         </Form>
      </ContainerUpdate>
   );
};

export { Update };
