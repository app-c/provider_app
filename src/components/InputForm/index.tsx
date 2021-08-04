/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { Controller, Control } from "react-hook-form";
import { TextInputProps } from "react-native";

import { InputSimple } from "../InputSimple";
import { Container } from "./styles";

interface Props extends TextInputProps {
   name: string;
   controler: Control;
}

export function Inputs({ name, controler, ...rest }: Props) {
   return (
      <Container>
         <Controller
            control={controler}
            render={({ field: { onChange, value } }) => (
               <InputSimple onChangeText={onChange} value={value} {...rest} />
            )}
            name={name}
         />
      </Container>
   );
}
