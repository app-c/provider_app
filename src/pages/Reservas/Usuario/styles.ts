import { FlatList } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";

import styled from "styled-components/native";

import { cores } from "../../../utils/ferramentas";
import { IResposta, Response } from "./index";

interface Props {
   pres: boolean;
}

export const Container = styled.View`
   background-color: ${cores.rosa};
   flex: 1;
   padding: 25px;
`;

export const TextTitle = styled.Text`
   margin-left: 20px;
   font-size: ${RFValue(16)}px;
   font-family: ${({ theme: h }) => h.fonts.bold};
   color: ${({ theme: h }) => h.cores.shape};
`;

export const ContainerInput = styled(
   FlatList as new () => FlatList<IResposta>
)``;

export const ContainerFlatList = styled.View`
   height: ${RFValue(250)}px;
   margin-top: 30px;
   margin-bottom: 30px;
`;

export const ContainerUser = styled.TouchableOpacity<Props>`
   flex-direction: row;
   align-items: center;
   padding: 10px;
   border-radius: 10px;
   background-color: ${(props) => (props.pres ? `${cores.roxo}` : "#fff")};
   opacity: 0.8;
   margin-top: 10px;
`;

export const ContainerAvatar = styled.View``;

export const ImageAvatar = styled.Image`
   width: ${RFValue(70)}px;
   height: ${RFValue(70)}px;
   background-color: ${({ theme: h }) => h.cores.shape};
   border-radius: 20px;
`;

export const InputContainer = styled.View`
   background-color: ${({ theme: h }) => h.cores.secundary};
   width: 100%;
   height: ${RFValue(60)}px;
   padding: 3px 10px;

   justify-content: center;

   border-radius: 10px;
   margin-top: 30px;
`;

export const InpuTextPesquisa = styled.TextInput`
   flex: 1;
   color: ${cores.branco};
`;

export const ContainerService = styled.View``;

export const ServiceContainer = styled(
   FlatList as new () => FlatList<Response>
)``;

export const BoxContainer = styled(RectButton)<Props>`
   margin-left: 10px;
   background-color: ${({ pres, theme }) =>
      pres ? theme.cores.secundary : theme.cores.light};
   border-radius: 15px;
   align-items: center;
   justify-content: center;
   padding: 5px;
`;

export const ServiceText = styled.Text<Props>`
   font-size: ${RFValue(16)}px;
   font-family: ${({ theme: h }) => h.fonts.doka};
   color: ${({ theme: h, pres }) => (pres ? h.cores.shape : h.cores.secundary)};
`;
