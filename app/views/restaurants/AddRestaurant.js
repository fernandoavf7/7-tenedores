import React, { Component } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, KeyboardAvoidingView } from "react-native";
import t from "tcomb-form-native";
const Form = t.form.Form;
import { AddRestaurantOptions, AddRestaurantStruct } from "../../forms/AddRestaurantForm";
import { Icon, Image, Button, Overlay } from "react-native-elements";

import Toast from "react-native-easy-toast";
import { ScrollView } from 'react-native-gesture-handler';
//necessary for request permisisons in android and iphone
import * as  ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
//necesary for android timer bug
import '../../components/elements/FixTimerAndroidBug';

import { UploadImage } from "../../utils/UploadImage";
import { firebaseApp } from "../../utils/Firebase";
import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);


export default class AddRestaurant extends Component {
    constructor(props) {
        super(props);

        console.log(this.props.navigation.state.params)
        this.state = {
            loading: false,
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
        const { name, city, address, description } = this.state.formData;

        if (imageUriRestaurant && name && city && address && description) {
            this.setState({ loading: true })
            const data = {
                name,
                city,
                address,
                description,
                image: "",
                createdAt: new Date()
            }

            db.collection("restaurants").add(data).then(resolve => {
                //get id document from recent document created in firestore
                const restaurantId = resolve.id;
                //upload the image to storage in firebase
                UploadImage(imageUriRestaurant, restaurantId, "restaurants")
                    .then(resolve => {
                        //when image is uploaded we got the url of it, we have to get now the
                        //register by id and do an update with the url of the image
                        const restaurantRef = db.collection("restaurants").doc(restaurantId);
                        restaurantRef.update({ image: resolve }).then(() => {
                            this.setState({ loading: false })
                            this.refs.toast.show("Restaurante creado correctamente", 1500, () => {
                                this.props.navigation.state.params.loadRestaurants();
                                this.props.navigation.goBack();
                            })
                        }).catch(error => {
                            this.setState({ loading: false })
                            this.refs.toast.show("Error de servidor, intentelo más tarde", 1500)
                        })
                    }).catch(error => {
                        this.setState({ loading: false })
                        this.refs.toast.show("Error de servidor, intentelo más tarde", 1500)
                    })
            }).catch(error => {
                this.setState({ loading: false })
                this.refs.toast.show("Error de servidor, intentelo más tarde", 1500)
            })
        } else {
            this.setState({ loading: false })
            this.refs.toast.show("Se deben rellenar todos los campos", 1500)
        }
    }

    render() {

        //console.log(this.state)
        const { imageUriRestaurant } = this.state;
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                <ScrollView>
                    <View style={styles.containerView}>
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

                        <Overlay
                            overlayStyle={styles.overlayLoading}
                            isVisible={this.state.loading}
                            width="auto"
                            height="auto"
                        >

                            <View>
                                <Text style={styles.overlayLoadingText}>Creando restaurante</Text>
                                <ActivityIndicator size="large" color="#00a680" />
                            </View>
                        </Overlay>

                        <Toast
                            ref="toast"
                            position="bottom"
                            positionValue={250}
                            fadeInDuration={250}
                            fadeOutDuration={250}
                            opacity={0.8}
                            textStyle={{ color: "white" }}
                        />


                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

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
    containerView: {
        flex: 1,
        backgroundColor: "#FFF",
        justifyContent: "center",
        backgroundColor: "#FFF",
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
    },
    overlayLoading: {
        padding: 20
    },
    overlayLoadingText: {
        color: "#00a680",
        marginBottom: 20,
        fontSize: 20
    }
})