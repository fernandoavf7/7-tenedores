import React, { Component } from 'react';
import { StyleSheet, View, Text } from "react-native";
import {Button} from "react-native-elements";


export default class MyAccount extends Component {

    goToScreen = nameScreen => {
        this.props.navigation.navigate(nameScreen)
    }
    render() {
        return (
            <View>
                <Text>My Account</Text>
                <Button title="Registrar" onPress={()=> this.goToScreen("Register")}/>
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