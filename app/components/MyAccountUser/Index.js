import React, { Component } from 'react'
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import UserInfo from './UserInfo';
import { Button } from 'react-native-elements';

export default class MyAccountUser extends Component {
    constructor() {
        super();

    }
    render() {
        return (
            <View>
                <UserInfo/>
              
            </View>
        )
    }
}


const styles = StyleSheet.create({})