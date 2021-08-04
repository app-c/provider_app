import { FlatList } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

import { LinearGradient } from "expo-linear-gradient";

import styled from "styled-components/native";

import { cores } from "../../utils/ferramentas";
import { Request } from "./index";

export const Container = styled(LinearGradient)`
   flex: 1;
`;

export const Header = styled.View`
   width: 105%;

   align-self: center;
   margin-top: -25px;
`;

export const Linear = styled(LinearGradient)`
   flex-direction: row;
   justify-content: space-between;
   align-items: center;
   border-radius: 60px;

   height: 121px;
   overflow: hidden;
   padding: 37.6px 30px;
`;

export const HeaderTitle = styled.Text`
   color: #f3f3f3;
   font-size: 26px;
   line-height: 30px;
   margin-top: 15px;
   margin-left: 20px;
`;

export const UserName = styled.Text`
   color: ${({ theme: h }) => h.cores.secundary};
   font-size: ${RFValue(16)}px;
   font-family: ${({ theme: h }) => h.fonts.doka};
`;

export const ProfileButton = styled.TouchableOpacity``;

export const ContainerAvatar = styled.View`
   flex-direction: row;
   align-items: center;
   padding: 30px;
`;

export const ContainerMail = styled.TouchableOpacity`
   margin-right: 10px;
`;

export const Recivid = styled.View`
   width: ${RFValue(15)}px;
   height: ${RFValue(15)}px;
   background-color: ${cores.branco};
   align-items: center;
   justify-content: center;
   margin-bottom: -5px;
   border-radius: 10px;
`;

export const UserAvatar = styled.Image`
   width: 66px;
   height: 66px;
   border-radius: 36px;
   background: white;
   margin-top: 15px;
`;

export const Flat = styled(FlatList as new () => FlatList<Request>).attrs({})`
   padding: 0 20px;
`;
