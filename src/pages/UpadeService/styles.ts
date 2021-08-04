import { FlatList } from "react-native";
import { RectButton } from "react-native-gesture-handler";

import styled from "styled-components/native";

import { IData } from "./index";

export const Container = styled.KeyboardAvoidingView`
   flex: 1;
   justify-content: center;
   padding: 25px;
`;

export const TextTitle = styled.Text`
   font-size: 20px;
   color: black;
   margin-top: 30px;
`;

export const List = styled(FlatList as new () => FlatList<IData>)``;

export const ContainerTexInpu = styled.View`
   width: 100%;
   height: 100px;
   border-width: 2px;
   border-color: #909090;

   margin-top: 10px;

   background: #f2f2f2;
   border-radius: 12px;
   padding: 0 15px;
`;

export const Caixa = styled(RectButton)`
   background-color: red;
   width: 200px;
   height: 30px;
`;
