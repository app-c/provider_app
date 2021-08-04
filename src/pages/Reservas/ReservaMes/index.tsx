/* eslint-disable consistent-return */
import React, { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { Alert } from "react-native";

import { useNavigation } from "@react-navigation/native";

import Button from "../../../components/Button";
import { Inputs } from "../../../components/InputForm";
import { api } from "../../../services/api";
import { Title, Container, ContainerForm } from "./styles";

interface Props {
   mes: number;
   from: string;
   at: string;
}

const ReservaDiaria: React.FC = () => {
   const { control, handleSubmit, reset } = useForm();
   const { navigate } = useNavigation();

   const handleReserva = useCallback(
      async (form: Props) => {
         try {
            if (!form.mes) return Alert.alert("Prencha o campo o mês");
            if (!form.from) return Alert.alert("Prencha o campo hora inicial");
            if (!form.at) return Alert.alert("Prencha o campo hora final");

            const res = await api.post("/prestador/reserva", {
               mes: Number(form.mes),
               from: form.from,
               at: form.at,
            });
            const { message } = res.data;

            if (!message) {
               Alert.alert("Reserva criada com sucesso");
               navigate("Home");
               reset();
            } else {
               Alert.alert("Erro", message);
            }
         } catch (error) {
            console.log(error);
         }
      },
      [navigate, reset]
   );

   return (
      <Container>
         <Title>Aqui vocẽ pode reservar um horário para o mes todo</Title>

         <ContainerForm>
            <Inputs
               name="mes"
               controler={control}
               placeholder="Mês"
               keyboardType="numeric"
            />
            <Inputs
               name="from"
               controler={control}
               placeholder="Hora inicial da sua reserva"
            />
            <Inputs
               name="at"
               controler={control}
               placeholder="Hora final da sua reserva"
            />
         </ContainerForm>
         <Button pres={handleSubmit(handleReserva)}>Reservarr</Button>
      </Container>
   );
};

export default ReservaDiaria;
