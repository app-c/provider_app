import { RectButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";

import styled from "styled-components/native";

import { cores } from "../../../utils/ferramentas";

export const Container = styled.View`
   padding: 25px;
   background-color: ${cores.rosa};

   flex: 1;
`;

export const Title = styled.Text`
   font-size: ${RFValue(18)}px;
   font-family: ${({ theme }) => theme.fonts.bold};
   color: ${({ theme }) => theme.cores.shape};
`;

export const ContainerForm = styled.View`
   margin-top: 20px;
   width: 100%;
   background-color: ${({ theme: h }) => h.cores.background};
   border-radius: 15px;

   padding: 10px;
`;
