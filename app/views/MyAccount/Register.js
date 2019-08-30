import React, { Component } from 'react';
import { StyleSheet, View, Text } from "react-native";
import t from "tcomb-form-native";
const Form = t.form.Forms;
import {RegisterStruct, RegisterOptions} from "../../forms/Register";

export default class Register extends Component {
    constructor(){
        super();

        this.state = {
            registerStruct: RegisterStruct,
            registerOptions: RegisterOptions
        }
    }
    render() {

        const { registerStruct, registerOptions} = this.state;
        return (
            <View style={styles.container}>
                <Text>Register</Text>
                <Form 
                ref="registerForm"
                type={registerStruct}
                options={registerOptions}
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
        backgroundColor: "#FFF"
    }
})