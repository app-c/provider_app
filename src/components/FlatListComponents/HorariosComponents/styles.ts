import { RFValue } from "react-native-responsive-fontsize";

import styled from "styled-components/native";

interface Props {
   container: "1" | "2";
}

export const Container = styled.View`
   width: 100%;
   background-color: ${(props) => props.theme.cores.background};

   justify-content: center;
   align-items: center;
   padding: ${RFValue(20)}px;
   margin-top: 20px;
   border-radius: 10px;
`;

export const Title = styled.Text`
   font-size: ${RFValue(18)}px;
   font-family: ${({ theme }) => theme.fonts.doka};
   color: ${({ theme }) => theme.cores.secundary};
`;

export const Avatar = styled.Image`
   width: ${RFValue(80)}px;
   height: ${RFValue(80)}px;
   background-color: ${(props) => props.theme.cores.shape};
   border-radius: 16px;
`;

export const Elements = styled.View<Props>`
   width: 100%;
   background-color: ${({ theme, container }) =>
      container === "1" ? theme.cores.secundary : theme.cores.light};

   flex-direction: row;
   align-items: center;
   padding: 5px 25px;
   border-radius: 10px;
`;

export const Description = styled.View`
   margin-left: 20px;
`;

export const TextName = styled.Text<Props>`
   font-size: ${RFValue(18)}px;
   font-family: ${({ theme }) => theme.fonts.bold};
   margin-bottom: 5px;
   color: ${({ theme, container }) =>
      container === "1" ? theme.cores.shape : theme.cores.text};
`;

export const TextDescription = styled.Text<Props>`
   font-size: ${RFValue(14)}px;
   color: ${({ theme, container }) =>
      container === "1" ? theme.cores.shape : theme.cores.text};
`;
