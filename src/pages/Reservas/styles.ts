import { RectButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";

import styled from "styled-components/native";

import { cores } from "../../utils/ferramentas";

export const Container = styled.View`
   flex: 1;
   background-color: ${cores.rosa};
   padding: 30px;
`;

export const ContainerCards = styled.View`
   align-items: center;
   justify-content: space-between;
   flex-direction: row;
   margin-top: 15px;
`;

export const Cards = styled(RectButton)`
   width: 46%;
   height: ${RFValue(100)}px;
   background-color: ${({ theme: h }) => h.cores.shape};

   align-items: center;
   justify-content: center;
   padding: 10px;
   border-radius: 10px;
`;

export const TextTitle = styled.Text`
   font-size: ${RFValue(14)}px;
   font-family: ${({ theme: h }) => h.fonts.regular};
   color: ${({ theme: h }) => h.cores.secundary};
`;
