/* eslint-disable camelcase */
import React, { useCallback, useRef } from "react";
import { useForm } from "react-hook-form";
import { Alert } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/mobile";
import { getMonth } from "date-fns";
import { getDate } from "date-fns/esm";

import Button from "../../components/Button";
import Input from "../../components/Input";
import { Inputs } from "../../components/InputForm";
import { useAuth } from "../../hooks/AuthContext";
import { api } from "../../services/api";
import { Container, ContainerInputs, TextTitle } from "./styles";

interface DataBloqueio {
   provider_id: string;
   from: string;
   at: string;
   dia: number;
   mes: number;
}

const Bloqueio: React.FC = () => {
   const formRef = useRef<FormHandles>(null);
   const { prestador } = useAuth();
   const { goBack } = useNavigation();
   const { handleSubmit, reset, control } = useForm();

   const handleBloqueio = useCallback(async (data: DataBloqueio) => {
      formRef.current?.setErrors({});

      const diaN = getDate(new Date(2021, 1, data.dia));
      const mesN = getMonth(new Date(2021, data.mes, 1));
      console.log(mesN);

      const response = await api.post("/service/bloqueio", {
         from: data.from,
         at: data.at,
         dia: diaN,
         mes: mesN,
      });

      const { message } = response.data;
      if (!message) {
         Alert.alert("Reserva realizada com suceso!");
         goBack();
      } else {
         Alert.alert("Erro", message);
      }
   }, []);

   return (
      <Container>
         <TextTitle>Bloqueio</TextTitle>

         <ContainerInputs>
            <Inputs
               name="from"
               controler={control}
               placeholder="Início da hora para bloquear"
            />

            <Inputs
               name="at"
               controler={control}
               placeholder="Fim da hora do bloqueio"
            />

            <Inputs
               name="dia"
               controler={control}
               placeholder="Dia do bloqueio"
            />

            <Inputs
               name="mes"
               controler={control}
               placeholder="Mês do bloqueio"
            />
         </ContainerInputs>

         <Button pres={handleSubmit(handleBloqueio)}>Bloquer</Button>
      </Container>
   );
};

export default Bloqueio;
