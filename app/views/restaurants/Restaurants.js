import React, { Component } from 'react';
import { StyleSheet, View, Text } from "react-native";
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import * as firebase from "firebase";

export default class Restaurants extends Component {
    constructor() {
        super();

        this.state = {
            login: false
        }
    }

    componentDidMount() {
        this.isLogged();
    }

    isLogged = () => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({ login: true })
            } else {
                this.setState({ login: false })
            }
        })
    }

    showActionButton = () => {
        const { login } = this.state;

        if (login) {
            return (<ActionButton
                buttonColor="#00A680"
                onPress={() => { this.goToScreen("AddRestaurant") }}
            />)
        }
        return null;
    }

    goToScreen = nameScreen => {
        this.props.navigation.navigate(nameScreen);
    }

    render() {
        console.log(this.state);
        
        return (
            <View style={styles.container}>
                <Text>Restaurants Screen</Text>
                {this.showActionButton()}
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFF"
    }
})