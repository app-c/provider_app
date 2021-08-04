import { TextInput } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

import styled from "styled-components/native";

export const Container = styled(TextInput)`
   width: 100%;
   min-height: ${RFValue(30)}px;
   background-color: ${({ theme: h }) => h.cores.light};
   font-size: ${RFValue(16)}px;
   padding: 0 20px;
   border-radius: 10px;
`;

export const Title = styled.Text``;
