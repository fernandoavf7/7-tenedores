import React, { Component } from 'react'
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { Avatar } from "react-native-elements";
import * as firebase from "firebase";
import UpdateUserInfo from "./UpdateUserInfo";
import Toast from "react-native-easy-toast";


export default class UserInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ...props,
            userInfo: {}
        };
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

    reauthenticate = currentPassword => {
        const user = firebase.auth().currentUser;
        const credential = firebase.auth.EmailAuthProvider.credential(
            user.email,
            currentPassword
        );
        return user.reauthenticateWithCredential(credential)
    }

    checkUserAvatar = photoUrl => {
        return photoUrl
            ? photoUrl
            : "https://api.adorable.io/avatars/285/abott@adorable.png";
    }

    updateUserDisplayName = async newDisplayName => {
        const update = {
            displayName: newDisplayName,

        }
        await firebase.auth().currentUser.updateProfile(update);
        this.getUserInfo();
    }

    updateUserEmail = async (newEmail, password) => {
        this.reauthenticate(password).then(() => {
            const user = firebase.auth().currentUser;

            user.updateEmail(newEmail)
                .then(() => {
                    this.refs.toast.show("Email actualizado, vuelva  ainiciar sesión", 1500, () => {
                        firebase.auth().signOut();
                    })

                }).catch(error => {
                    this.refs.toast.show(error, 1500)
                })
        }).catch(error => {
            this.refs.toast.show("Tu contraseña es incorrecta", 1500)
        })
    }

    returnUpdateUserInfoComponent = userInfoData => {
        if (userInfoData.hasOwnProperty("uid")) {
            return (
                <UpdateUserInfo
                    userInfo={this.state.userInfo}
                    updateUserDisplayName={this.updateUserDisplayName}
                    updateUserEmail={this.updateUserEmail}
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
                    <View>
                        <Text style={styles.displayName}>{displayName}</Text>
                        <Text>{email}</Text>
                    </View>
                </View>
                {this.returnUpdateUserInfoComponent(this.state.userInfo)}
                <Toast
                    ref="toast"
                    position="bottom"
                    positionValue={250}
                    fadeInDuration={1000}
                    fadeOutDuration={1000}
                    opacity={0.8}
                    textStyle={{ color: "white" }}
                />
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