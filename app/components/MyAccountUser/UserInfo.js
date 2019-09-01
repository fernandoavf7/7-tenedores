import React, { Component } from 'react'
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { Avatar } from "react-native-elements";
import * as firebase from "firebase";
import UpdateUserInfo from "./UpdateUserInfo";

export default class UserInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ...props,
            userInfo: {}
        }
    }

    componentDidMount = async () => {
        await this.getUserInfo();
    }

    getUserInfo = () => {
        const user = firebase.auth().currentUser;
        user.providerData.forEach(userInfo => {
            this.setState({ userInfo })
        })

    }

    checkUserAvatar = photoUrl => {
        return photoUrl
            ? photoUrl
            : "https://api.adorable.io/avatars/285/abott@adorable.png";
    }

    updateUserDisplayName = newDisplayName => {
        console.log("userInfo" + newDisplayName)
    }

    returnUpdateUserInfoComponent = userInfoData => {
        if (userInfoData.hasOwnProperty("uid")) {
            return (
                <UpdateUserInfo
                    userInfo={this.state.userInfo}
                    updateUserDisplayName={this.state.updateUserDisplayName}
                />
            )
        }

    }

    render() {

        const { displayName, email, photoUrl } = this.state.userInfo;
        return (
            <View>
                <View style={styles.viewUserInfo}>
                    <Avatar
                        rounded
                        size="large"
                        source={{ uri: this.checkUserAvatar(photoUrl) }}
                        containerStyle={styles.userInfoAvatar}
                    />
                    <Text style={styles.displayName}>{displayName}</Text>
                    <Text>{email}</Text>
                </View>
                {this.returnUpdateUserInfoComponent(this.state.userInfo)}
             
            </View>
        )
    }
}


const styles = StyleSheet.create({
    viewUserInfo: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        backgroundColor: "#F2F2F2",
        paddingTop: 30,
        paddingBottom: 30
    },
    userInfoAvatar: {
        marginRight: 20
    },
    displayName: {
        fontWeight: "bold"
    }
})