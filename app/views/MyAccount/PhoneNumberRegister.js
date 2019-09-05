import React, { Component } from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { Image, Button, SocialIcon, Divider } from "react-native-elements";
import { PhoneNumberRegisterStruct, PhoneNumberRegisterOptions } from "./../../forms/phoneNumberRegisterForm";

import t from "tcomb-form-native";
const Form = t.form.Form;
import * as firebase from "firebase";


export default class PhoneNumberRegister extends Component {
    constructor() {
        super();

        this.state = {
            formData: {
                phoneNumber: "",
                verificationCode: ""
            },
            formErrorMessage: "",
            phoneAuth: {
                user: null,
                message: 'asasasas',
                codeInput: '4545',
                phoneNumber: '+56981446868',
                confirmResult: null,
            }
        }
    }

    componentDidMount() {
        this.signIn();
    }

    onChangeFormRegister = (formValue) => {
        this.setState({ formData: formValue })

    }

    verify = () => {
        const { phoneNumber } = this.state;
        firebase.auth().signInWithPhoneNumber(phoneNumber)
            .then(confirmResult => {
                console.log(confirmResult)
            })
            .catch(error => {
                console.log(error)
            });
    }

    signIn = () => {
        const { phoneNumber } = this.state.phoneAuth;
        this.setState({ message: 'Sending code ...' });

        firebase.auth().signInWithPhoneNumber(phoneNumber)
            .then(confirmResult => this.setState({ confirmResult, message: 'Code has been sent!' }))
            .catch(error => this.setState({ message: `Sign In With Phone Number Error: ${error.message}` }));
            console.log(this.state);
    };

    render() {
        console.log(this.state);

        return (
            <View>
                <Form
                    ref="phoneNumberRegisterForm"
                    type={PhoneNumberRegisterStruct}
                    options={PhoneNumberRegisterOptions}
                    value={this.state.formData}
                    onChange={v => this.onChangeFormRegister(v)}
                />
                <Button title="Ingresar" onPress={this.signIn} />
            </View>
        );
    }
}

