import React, { Component } from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { Image, Button, SocialIcon, Divider } from "react-native-elements";
import { LoginStruct, LoginOptions } from "../../forms/LoginForm";
import t from "tcomb-form-native";
const Form = t.form.Form;
import * as firebase from "firebase";

import Toast, { DURATION } from "react-native-easy-toast";
import { FacebookApi } from "../../utils/Social"
import Expo from 'expo';
import * as Facebook from 'expo-facebook';


export default class Login extends Component {
    constructor() {
        super();

        this.state = {
            formData: {
                email: "",
                password: "",
            },
            formErrorMessage: ""
        }
    }

    login = () => {

        const { password, email } = this.state.formData;


        const validate = this.refs.loginForm.getValue();

        if (validate) {
            this.setState({ formErrorMessage: "" });
            firebase.auth()
                .signInWithEmailAndPassword(validate.email, validate.password)
                .then(resolve => {
                    //console.log(resolve)
                    this.refs.toast.show('Ha ingresado correctamente', 250, () => {
                        this.props.navigation.navigate("MyAccount");
                    });
                }).catch(err => {
                    //console.log(err)
                    if (err.toString().indexOf("The password is invalid or the user does not have a password") > 0) {
                        this.refs.toast.show('La contraseña es incorrecta', 250);
                    } else if (err.toString().indexOf("There is no user record corresponding to this identifier") > 0) {
                        this.refs.toast.show('No existe un usuario registrado con este correo', 250);
                    }
                    else {
                        this.setState({ formErrorMessage: "Ha ocurrido un error inesperado" })
                    }

                })
        }
        else {
            this.setState({ formErrorMessage: "Formulario inválido" })
        }


    }

    loginFacebook = async () => {
        const { type, token } = await Facebook.logInWithReadPermissionsAsync(FacebookApi.application_id
            , { permissions: FacebookApi.permissions });
        if (type == "success") {
            const credential = firebase.auth.FacebookAuthProvider.credential(token);
            firebase.auth().signInWithCredential(credential).then(resolve => {
                this.refs.toast.show('Ha iniciado sesión', 250);
                this.props.navigation.goBack();
            }).catch(error => {
                this.refs.toast.show('Ha ocurrido un error, intentelo más tarde', 250);
            })
        } else if (type == "cancel") {
            this.refs.toast.show('Inicio de sesión cancelado', 250);
        } else {
            this.refs.toast.show('Ha ocurrido un error, intentelo más tarde', 250);
        }
    }

    onChangeFormRegister = (formValue) => {
        this.setState({ formData: formValue })
    }

    render() {
        return (
            <View style={styles.viewBody}>
                <Image
                    source={require("../../../assets/img/5-tenedores-letras-icono-logo.png")}
                    style={styles.logo}
                    PlaceholderContent={<ActivityIndicator />}
                    resizeMode="contain"
                />
                <Form
                    ref="loginForm"
                    type={LoginStruct}
                    options={LoginOptions}
                    value={this.state.formData}
                    onChange={v => this.onChangeFormRegister(v)}
                />
                <Button title="Ingresar" onPress={() => this.login()} />
                <Text style={styles.textRegister}>¿Aún no tienes una cuenta?{" "}
                <Text style={styles.buttonRegister} onPress={()=> this.props.navigation.navigate("PhoneNumberRegister")}>Regístrate</Text>
                </Text>


                <Text style={styles.formErrorMessage}>{this.state.formErrorMessage}</Text>
                <Toast
                    ref="toast"
                    style={{ backgroundColor: 'black' }}
                    position='bottom'
                    positionValue={200}
                    fadeInDuration={750}
                    fadeOutDuration={1000}
                    opacity={0.8}
                    textStyle={{ color: 'white' }}
                />

                <Divider style={styles.divider} />
                <SocialIcon
                    title='Ingresa con Facebook'
                    button
                    type='facebook'
                    onPress={() => this.loginFacebook()}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    viewBody: {
        flex: 1,
        // justifyContent: "center",
        //alignItems: "center",
        marginTop: 40,
        marginLeft: 40,
        marginRight: 40
    },
    logo: {
        justifyContent: "center",
        alignItems: "center",
        width: 200,
        height: 150,
        marginBottom: 20
    },
    formErrorMessage: {
        color: "#F00",
        textAlign: "center",
        marginTop: 30
    },
    divider: {
        backgroundColor: "#00A680",
        marginBottom: 20

    },
    textRegister: {
        marginTop: 15,
        marginLeft: 10,
        marginRight: 10
    },
    buttonRegister: {
        color: "#00A680",
        fontWeight: "bold",

    }
})
