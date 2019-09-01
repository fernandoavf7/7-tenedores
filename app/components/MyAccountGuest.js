import React, { Component } from 'react'
import { StyleSheet, View, ScrollView, Text, ActivityIndicator } from "react-native";
import { Button, Image } from "react-native-elements";

export default class MyAccountGuest extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { goToScreen } = this.props;
        return (
            <ScrollView >
                <View style={styles.viewBody}>
                    <Image
                        source={require("../../assets/img/image-my-account-guest-01.jpg")}
                        style={styles.img}
                        PlaceholderContent={<ActivityIndicator />}
                        resizeMode="contain"
                    />
                    <Text style={styles.title}>Consulta tu perfil de 7 Tenedores</Text>
                    <Text style={styles.description}>¿Cómo describirías tu mejor restaurante?
                    Busca y visualiza los mejores restaurantes de una forma sencilla,
               vota cúal te ha gustado más y comenta como ha sido tu experiencia</Text>
                    <Button buttonStyle={styles.btnViewProfile} title="Ver Perfil" onPress={() => goToScreen("Login")} />

                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    viewBody: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: 30,
        paddingRight: 30
    },
    img: {
        height: 300,
        marginBottom: 40
    },
    title: {
        fontWeight: "bold",
        fontSize: 19,
        marginBottom: 10
    },
    description: {
        textAlign: "center",
        marginBottom: 20,
    },
    btnViewProfile: {
        //width: "100%",
        backgroundColor: "#00A680"
    }
})
