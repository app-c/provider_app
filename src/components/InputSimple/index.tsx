/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { TextInputProps } from "react-native";

import { Container, Title } from "./styles";

type Props = TextInputProps;

export function InputSimple({ ...rest }: Props) {
   return <Container {...rest} />;
}
