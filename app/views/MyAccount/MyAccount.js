import React, { Component } from 'react';
import { StyleSheet, View, Text } from "react-native";
import { Button } from "react-native-elements";
import * as firebase from "firebase";
import Toast, { DURATION } from "react-native-easy-toast";
import MyAccountGuest from "./../../components/MyAccountGuest";
import MyAccountUser from "../../components/MyAccountUser/Index";

export default class MyAccount extends Component {

    constructor() {
        super();
        this.state = {
            login: false
        }
    }
    async componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({ login: true })
            } else {
                this.setState({ login: false })
            }
        })
    }

    logout = () => {
        this.refs.toast.show('Ha cerrado sesión correctamente', 250);
        firebase.auth().signOut()

    }

    goToScreen = nameScreen => {
        this.props.navigation.navigate(nameScreen)
    }

    render() {
        const { login } = this.state;
        if (login) {
            return (<View>
                <MyAccountUser />
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
            </View>)
        } else {
            return (
                <View style={styles.container}>
                    <MyAccountGuest goToScreen={this.goToScreen} />
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
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
        justifyContent: "center",
        backgroundColor: "#FFF",
        margin: 20
    },
   
})