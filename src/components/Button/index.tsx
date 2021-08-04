/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from "react";
import { RectButtonProperties } from "react-native-gesture-handler";

import { Container, ButtonText } from "./styles";

interface ButtonProps extends RectButtonProperties {
   children: string;
   pres?: () => void;
}

const Button: React.FC<ButtonProps> = ({ children, pres, ...rest }) => {
   return (
      <Container onPress={pres} {...rest}>
         <ButtonText>{children}</ButtonText>
      </Container>
   );
};

export default Button;
