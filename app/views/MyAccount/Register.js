import React, { Component } from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import t from "tcomb-form-native";
const Form = t.form.Form;
import { RegisterStruct, RegisterOptions } from "../../forms/RegisterForm";
import { Button, Image } from 'react-native-elements';
import * as firebase from "firebase";
import Toast, { DURATION } from "react-native-easy-toast";

export default class Register extends Component {
    constructor() {
        super();

        this.state = {
            registerStruct: RegisterStruct,
            registerOptions: RegisterOptions,
            formData: {
                user: "",
                email: "",
                password: "",
                passwordConfirmation: ""
            },
            formErrorMessage: ""
        }
    }

    register = () => {

        const { password, passwordConfirmation } = this.state.formData;

        if (password == passwordConfirmation) {
            const validate = this.refs.registerForm.getValue();

            if (validate) {
                this.setState({ formErrorMessage: "" });
                firebase.auth().createUserWithEmailAndPassword(validate.email, validate.password).then(resolve => {
                    console.log(resolve)
                    this.refs.toast.show('Registrado correctamente', 250, () => {
                        this.props.navigation.navigate("MyAccount");
                    });
                }).catch(err => {
                    console.log(err)
                    if (err.toString().indexOf("The email address is already in use") > 0) {
                        this.refs.toast.show('El email ingresado ya está en uso', 250);
                    } else {
                        this.setState({ formErrorMessage: "Ha ocurrido un error inesperado" })
                    }

                })
            }
            else {
                this.setState({ formErrorMessage: "Formulario inválido" })
            }

        } else {
            this.setState({ formErrorMessage: "Las contraseñas no coinciden" })
        }
    }

    onChangeFormRegister = (formValue) => {

        this.setState({ formData: formValue })
    }

    render() {

        const { registerStruct, registerOptions, formErrorMessage } = this.state;
        return (
            <View style={styles.container}>
                <Image
                    source={require("../../../assets/img/5-tenedores-letras-icono-logo.png")}
                    style={styles.logo}
                    PlaceholderContent={<ActivityIndicator />}
                    resizeMode="contain"
                />
                <Form
                    ref="registerForm"
                    type={registerStruct}
                    options={registerOptions}
                    value={this.state.formData}
                    onChange={v => this.onChangeFormRegister(v)}
                />
                <Button title="Registrar" onPress={() => this.register()} />
                <Text style={styles.formErrorMessage}>{formErrorMessage}</Text>
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
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
        justifyContent: "center",
        backgroundColor: "#FFF",
        padding: 20,
    },
    buttonRegisterContainer: {
        backgroundColor: "#00A680",
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10

    },
    formErrorMessage: {
        color: "#F00",
        textAlign: "center",
        marginTop: 30
    },
    logo: {
        justifyContent: "center",
        alignItems: "center",
        width: 200,
        height: 150,
        marginBottom: 20
    },
})