import React from "react";

import {
   Avatar,
   Container,
   Description,
   Elements,
   TextDescription,
   TextName,
   Title,
} from "./styles";

interface Props {
   avatar: string;
   title: string;
   name: string;
   service: string;
   date: string;
   hora: string;
   container: "1" | "2";
}

export function HorariosComponents({
   avatar,
   title,
   name,
   service,
   date,
   hora,
   container,
}: Props) {
   return (
      <Container>
         <Title>{title}</Title>

         <Elements container={container}>
            <Avatar source={{ uri: `${avatar}` }} />
            <Description>
               <TextName container={container}>{name}</TextName>
               <TextDescription container={container}>
                  {service}
               </TextDescription>
               <TextDescription container={container}>{date}</TextDescription>
               <TextDescription container={container}>{hora}</TextDescription>
            </Description>
         </Elements>
      </Container>
   );
}
