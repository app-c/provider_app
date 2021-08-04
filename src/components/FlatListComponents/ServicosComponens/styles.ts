import { RectButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";

import styled from "styled-components/native";

export const Container = styled.View`
   width: 100%;
   background-color: ${({ theme: h }) => h.cores.background};
   margin-top: 15px;
   padding: 24px;

   border-radius: 16px;
   align-items: center;
`;

export const Title = styled.Text`
   color: ${({ theme: h }) => h.cores.text};
   font-family: ${({ theme: h }) => h.fonts.doka};
   font-size: ${RFValue(18)}px;
   margin-bottom: 5px;
`;

export const TextContainer = styled.View`
   align-self: flex-start;
`;

export const TextElements = styled.Text`
   color: ${({ theme: h }) => h.cores.text};
   font-family: ${({ theme: h }) => h.fonts.regular};
   font-size: ${RFValue(16)}px;
   margin-bottom: 10px;
`;

export const Butoens = styled.View`
   flex-direction: row;
   align-items: center;
   justify-content: space-between;

   width: 100%;

   margin-top: 20px;
`;

export const Containerhandle = styled.TouchableOpacity`
   background-color: ${({ theme: h }) => h.cores.secundary};
   width: ${RFValue(85)}px;
   height: ${RFValue(35)}px;
   border-radius: 13px;
   align-items: center;
   justify-content: center;
`;

export const TextButoens = styled.Text`
   color: ${({ theme: h }) => h.cores.shape};
   font-family: ${({ theme: h }) => h.fonts.doka};
   font-size: ${RFValue(14)}px;
`;
