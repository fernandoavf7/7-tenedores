import React, { Component } from 'react';
import { StyleSheet, View, Text } from "react-native";
import t from "tcomb-form-native";
const Form = t.form.Form;
import { AddRestaurantOptions, AddRestaurantStruct } from "../../forms/AddRestaurantForm";
import { Icon, Image, Button } from "react-native-elements";

import Toast from "react-native-easy-toast";
import { ScrollView } from 'react-native-gesture-handler';
//necessary for request permisisons in android and iphone
import * as  ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
//necesary for android timer bug
import './../elements/FixTimerAndroidBug';

import { UploadImage } from "./../../utils/UploadImage";
import { firebaseApp } from "../../utils/Firebase";
import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);


export default class AddRestaurant extends Component {
    constructor(props) {
        super(props);

        this.state = {
            imageUriRestaurant: "",
            formData: {
                name: "",
                city: "",
                address: "",
                description: ""
            }
        }
    }

    isImageRestaurant = image => {
        return image
            ? <Image source={{ uri: image }} style={{ width: 500, height: 200 }} resize="contain" />
            : <Image source={require("../../../assets/img/noimage.png")} style={{ width: 500, height: 200 }} resize="contain" />
    }

    uploadImageToState = async () => {
        const resultPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        if (resultPermission.status === "denied") {
            this.refs.toast.show("Es necesario conceder permisos de acceso para cambiar la imagen", 1500)
        } else {
            const result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [16, 9]
            });

            if (result.cancelled) {
                this.refs.toast.show("Se ha cancelado el cambio de imagen", 1500);
            } else {
                this.setState({
                    imageUriRestaurant: result.uri
                })

            }
        }
    }

    onChangeFormAddRestaurant = (formValue) => {
        this.setState({
            formData: formValue
        })
    }

    addRestaurant = () => {
        const { imageUriRestaurant, } = this.state;
        const { name, city, addres, description } = this.state.formData;

        UploadImage(imageUriRestaurant, "example01", "restaurants").then(() => {
            console.log("todo ok");

        }).catch(error => {
            console.log(error);

        })
    }

    render() {
        console.log(this.state)
        const { imageUriRestaurant } = this.state;
        return (
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.viewPhoto}>
                        {this.isImageRestaurant(imageUriRestaurant)}
                    </View>
                    <Form
                        refs="addRestaurantForm"
                        type={AddRestaurantStruct}
                        options={AddRestaurantOptions}
                        value={this.state.formData}
                        onChange={formValue => this.onChangeFormAddRestaurant(formValue)}
                    />
                    <View style={styles.viewIconUpload}>
                        <Icon
                            iconStyle={styles.addPhotoIcon}
                            name="camera"
                            type="material-community"
                            color="#7A7A7A"
                            onPress={() => this.uploadImageToState()}
                        />
                    </View>

                    <View style={styles.viewButtonAdd}>
                        <Button
                            buttonStyle={styles.btnAddRestaurant}
                            title="Crear restaurante"
                            onPress={() => this.addRestaurant()}

                        />
                    </View>

                    <Toast
                        ref="toast"
                        position="bottom"
                        positionValue={320}
                        fadeInDuration={1000}
                        fadeOutDuration={1000}
                        opacity={0.8}
                        textStyle={{ color: "white" }}
                    />
                </View>
            </ScrollView>
        )
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
    viewPhoto: {
        alignItems: "center",
        height: 200,
        marginBottom: 20
    },
    viewIconUpload: {
        flex: 1,
        alignItems: "flex-start",
        marginLeft: 12,

    },
    addPhotoIcon: {
        backgroundColor: "#e3e3e3",
        padding: 17,
        paddingBottom: 14,
        margin: 0
    },
    viewButtonAdd: {
        flex: 1,
        justifyContent: "flex-end"
    },
    btnAddRestaurant: {
        backgroundColor: "#00A680",
        marginTop: 20
    }
})