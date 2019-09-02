import React, { Component } from 'react'
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { Avatar } from "react-native-elements";
import * as firebase from "firebase";
import UpdateUserInfo from "./UpdateUserInfo";
import Toast from "react-native-easy-toast";
import * as  ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import './../elements/FixTimerAndroidBug';

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
        //console.log(this.state);

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

    logout = (message, time) => {
        this.refs.toast.show(message, time, () => {
            firebase.auth().signOut();
        });
    }

    updateUserPassword = async (currentPassword, newPassword) => {
        this.reauthenticate(currentPassword).then(() => {
            const user = firebase.auth().currentUser;

            user.updatePassword(newPassword)
                .then(() => {
                    this.refs.toast.show("Contraseña cambiada, vuelva  ainiciar sesión", 1500, () => {
                        firebase.auth().signOut();
                    })

                }).catch(error => {
                    this.refs.toast.show(error, 1500)
                })
        }).catch(error => {
            this.refs.toast.show("La contraseña actual ingresada es incorrecta", 1500)
        })
    }

    updateUserPhotoUri = async photoUri => {
        const update = {
            photoURL: photoUri,
            phoneNumber: "12345678"

        }
        await firebase.auth().currentUser.updateProfile(update);
        this.getUserInfo();
    }

    returnUpdateUserInfoComponent = userInfoData => {
        if (userInfoData.hasOwnProperty("uid")) {
            return (
                <UpdateUserInfo
                    userInfo={this.state.userInfo}
                    updateUserDisplayName={this.updateUserDisplayName}
                    updateUserEmail={this.updateUserEmail}
                    updateUserPassword={this.updateUserPassword}
                />
            )
        }
    }


    changeAvatarUser = async () => {

        const resultPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        if (resultPermission.status === "denied") {
            this.refs.toast.show("Es necesario conceder permisos de acceso para cambiar la imagen", 1500)
        } else {
            const result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [1, 1]
            });

            if (result.cancelled) {
                this.refs.toast.show("Se ha cancelado el cambio de imagen", 1500);
            } else {
                const { uid } = this.state.userInfo;
                this.uploadImage(result.uri, uid).then(resolve => {
                    firebase.storage().ref("avatars/" + uid).getDownloadURL().then(resolve => {

                        this.updateUserPhotoUri(resolve);
                    }).catch(error => {
                        this.refs.toast.show("Error al intentar cargar la imagen, inténtalo nuevamente.", 1500);
                    })
                })
            }
        }
    }


    uploadImage = async (uri, nameImage) => {

        await fetch(uri)
            .then(async result => {
                firebaseStorage = firebase
                    .storage()
                    .ref()
                    .child("avatars/" + nameImage);
                await firebaseStorage.put(result._bodyBlob);

                this.refs.toast.show("Imagen cambiada correctamente", 1500);
            })
            .catch(error => {
                this.refs.toast.show("Ocurrio un error, inténtalo nuevamente.", 1500);
            });


    }

    render() {

        const { displayName, email, photoURL } = this.state.userInfo;
        //console.log(photoURL);

        return (
            <View>
                <View style={styles.viewUserInfo}>
                    <Avatar
                        rounded
                        size="large"
                        source={{ uri: this.checkUserAvatar(photoURL) }}
                        containerStyle={styles.userInfoAvatar}
                        showEditButton
                        onEditPress={() => this.changeAvatarUser()}
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
                 <View style={styles.viewLogoutText}>
                     <Text style={styles.textLogout} onPress={()=> this.logout("Cerrando sesión...", 1000)}>Cerrar Sesión</Text>
                 </View>
                 
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
    viewLogoutText: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        paddingTop: 30,
        paddingBottom: 30
    },
    userInfoAvatar: {
        marginRight: 20
    },
    displayName: {
        fontWeight: "bold"
    },
    textLogout: {
        alignItems: "center",
        justifyContent: "center",
        color: "#C2C2C2",
        fontWeight: "bold",

    }
})