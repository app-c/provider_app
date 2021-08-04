import React, { useCallback, useRef, useState } from "react";
import { Alert, Image, ScrollView, StyleSheet } from "react-native";

import AppLoading from "expo-app-loading";

import { AntDesign as Icon } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/mobile";
import * as Yup from "yup";

import Logo from "../../assets/Logo.png";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { useAuth } from "../../hooks/AuthContext";
import { api } from "../../services/api";
import getValidationErrors from "../../utils/getValidationsErrors";
import {
   Container,
   Linear,
   Title,
   CreateAccountContainer,
   AccountText,
} from "./styles";

interface SignInFormData {
   email: string;
   senha: string;
}

const SingIn: React.FC = () => {
   const formRef = useRef<FormHandles>(null);

   const naivgation = useNavigation();
   const { signIn } = useAuth();

   const handleSingUp = useCallback(async () => {
      naivgation.navigate("SignUp");
   }, [naivgation]);

   const handleSignIn = useCallback(
      async (data: SignInFormData) => {
         try {
            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
               email: Yup.string()
                  .required("E-mail obrigatório")
                  .email("E-mail invalido"),
               senha: Yup.string().min(6, "Senha no minimo 6 digitos"),
            });

            await schema.validate(data, {
               abortEarly: false,
            });
            const response = await api.post("/prestador/session", {
               email: data.email,
               senha: data.senha,
            });

            const { message } = response.data;

            if (message) {
               Alert.alert("Erro", message);
            }

            await signIn({
               email: data.email,
               senha: data.senha,
            });
         } catch (err) {
            if (err instanceof Yup.ValidationError) {
               const errors = getValidationErrors(err);
               formRef.current?.setErrors(errors);
            }

            Alert.alert(
               "Erro na autenticação",
               "Ocorreu um erro ao fazer login"
            );
         }
      },
      [signIn]
   );

   const styles = StyleSheet.create({
      title: {
         marginBottom: 15,
         fontSize: 16,
      },
   });

   return (
      <Linear
         colors={["#E4C6D5", "#EAEAEA"]}
         start={{ x: 0, y: 0 }}
         end={{ x: 0, y: 1 }}
      >
         <ScrollView contentContainerStyle={{ flex: 1 }}>
            <Container behavior="padding">
               <Image source={Logo} />
               <Title style={styles.title}>Entrar com uma conta</Title>

               <Form ref={formRef} onSubmit={handleSignIn}>
                  <Input
                     name="email"
                     icon="mail"
                     placeholder="E-mail"
                     keyboardType="email-address"
                     autoCapitalize="none"
                  />
                  <Input
                     name="senha"
                     icon="lock"
                     placeholder="Senha"
                     secureTextEntry
                  />
               </Form>
               <Button
                  onPress={() => {
                     formRef.current?.submitForm();
                  }}
               >
                  Entrar
               </Button>
            </Container>
         </ScrollView>
         <CreateAccountContainer onPress={handleSingUp}>
            <Icon name="right" color="#999999" size={20} />
            <AccountText>Criar uma conta</AccountText>
         </CreateAccountContainer>
      </Linear>
   );
};

export default SingIn;
