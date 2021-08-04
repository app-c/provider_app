/* eslint-disable react/jsx-props-no-spreading */

import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";

import { useNavigation, useRoute } from "@react-navigation/native";

import { api } from "../../services/api";
import Button from "../Button";
import { Inputs } from "../InputForm";
import { Body, BodyInputs, Title } from "./styles";

interface Props {
   id: string;
   service: string;
   description: string;
   value: string;
   time: string;
}

export function UpdaServiceConponents() {
   const route = useRoute();
   const { handleSubmit, control, reset } = useForm();
   const { id, description, service, value, time } = route.params as Props;
   const { navigate } = useNavigation();

   const handleUpdate = useCallback(
      async (form: Props) => {
         await api.patch("/service/service/update", {
            id,
            service: form.service,
            description: form.description,
            value: form.value,
            time: form.time,
         });

         reset();
         navigate("Atualizar", { res: "ok" });
      },
      [id, navigate, reset]
   );

   return (
      <Body>
         <Title>Atualizar</Title>

         <BodyInputs>
            <Inputs
               placeholder="Serviço"
               defaultValue={service}
               name="service"
               controler={control}
            />
            <Inputs
               placeholder="Descrição do serviço"
               defaultValue={description}
               name="description"
               controler={control}
               multiline
            />
            <Inputs
               placeholder="Valor do serviço"
               defaultValue={value}
               name="value"
               controler={control}
            />
            <Inputs
               placeholder="Duração do serviço"
               defaultValue={time}
               name="time"
               controler={control}
            />
         </BodyInputs>

         <Button onPress={handleSubmit(handleUpdate)}>Atualizar</Button>
      </Body>
   );
}
