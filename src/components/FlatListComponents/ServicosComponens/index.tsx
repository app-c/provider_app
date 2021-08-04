import React from "react";

import {
   Butoens,
   Container,
   Containerhandle,
   TextButoens,
   TextContainer,
   TextElements,
   Title,
} from "./styles";

interface IData {
   service: string;
   time: string;
   description: string;
   value: string;
   deletar: () => void;
   update: () => void;
}

export function ServicosComponents({
   service,
   time,
   description,
   value,
   deletar,
   update,
}: IData) {
   return (
      <Container>
         <Title>{service}</Title>
         <TextContainer>
            <TextElements>{description}</TextElements>
            <TextElements>{time}</TextElements>
            <TextElements>{value}</TextElements>
         </TextContainer>

         <Butoens>
            <Containerhandle onPress={update}>
               <TextButoens>Atualizar</TextButoens>
            </Containerhandle>
            <Containerhandle onPress={deletar}>
               <TextButoens>Deletar</TextButoens>
            </Containerhandle>
         </Butoens>
      </Container>
   );
}
