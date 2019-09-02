import React, { Component } from 'react';
import { StyleSheet, View, Text } from "react-native";

export default class TopFive extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Top Five</Text>
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