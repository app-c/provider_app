import { RectButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";

import styled from "styled-components/native";

import theme from "../../Global/theme";
import { cores } from "../../utils/ferramentas";

export const Container = styled(RectButton)`
   width: 100%;
   height: ${RFValue(48)}px;
   background: ${cores.roxo};
   border-radius: 15px;

   align-items: center;
   justify-content: center;
   margin-top: 20px;
`;

export const ButtonText = styled.Text`
   font-size: ${RFValue(18)}px;
   color: #f2f2f2;
   font-family: ${({ theme: h }) => theme.fonts.doka};
`;
