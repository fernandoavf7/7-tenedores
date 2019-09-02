import React, { Component } from 'react';
import { StyleSheet, View, Text } from "react-native";
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

export default class Restaurants extends Component {

goToScreen = nameScreen => {
    this.props.navigation.navigate(nameScreen);
}

    render() {
        return (
            <View style={styles.container}>
                <Text>Restaurants Screen</Text>
                <ActionButton
                    buttonColor="#00A680"
                    onPress={() => { this.goToScreen("AddRestaurant") }}
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
        alignItems: "center",
        backgroundColor: "#FFF"
    }
})