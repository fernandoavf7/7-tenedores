import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    ActivityIndicator,

} from "react-native";
import { AirbnbRating, Button, Overlay, Text } from "react-native-elements";
import t from "tcomb-form-native";
const Form = t.form.Form;
import { AddReviewRestaurantStruct, AddReviewRestaurantOptions } from "./../../forms/AddReviewRestaurantForm";
import Toast, { DURATION } from "react-native-easy-toast";
import { firebaseApp } from "./../../utils/Firebase";
import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);


export default class AddReviewRestaurant extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false
        }
    }

    sendReview = () => {

        const user = firebase.auth().currentUser;

        const ratingValue = this.refs.rating.state.position;
        if (ratingValue == 0) {
            this.refs.toast.show("Debe puntear el restaurante", 1500);
        } else {
            const validate = this.refs.addReviewRestaurantForm.getValue();
            if (!validate) {

                this.refs.toast.show("Debe completar el formulario", 1500);

            } else {

                this.setState({ loading: true })

                const user = firebase.auth().currentUser;
                const data = {
                    idUser: user.uid,
                    avatarUser: user.photoURL,
                    idRestaurant: this.props.navigation.state.params.id,
                    title: validate.title,
                    review: validate.review,
                    rating: ratingValue,
                    createdAt: new Date()
                }
                db.collection("reviews").add(data).then(() => {

                    const restaurantRef = db.collection("restaurants").doc(this.props.navigation.state.params.id);
                    restaurantRef.get().then(response => {
                        const restaurantData = response.data();
                        const ratingTotal = restaurantData.ratingTotal + ratingValue;
                        const quantityVoting = restaurantData.quantityVoting + 1;
                        const rating = ratingTotal / quantityVoting;
                        console.log("===========asasaas=========");
                        console.log(ratingTotal);
                        console.log(quantityVoting);
                        console.log(rating);
                        console.log("===========asasaas=========");
                        
                        restaurantRef.update({ ratingTotal, quantityVoting, rating }).then(() => {
                            this.setState({ loading: false });
                            this.refs.toast.show("Review ingresada correctamente", 1500, () => {
                                this.props.navigation.state.params.loadReviews();
                                this.props.navigation.goBack();
                            });
                        })
                    })



                }).catch(error => {
                    this.refs.toast.show("Error inesperado de comunicación, intentelo más tarde", 1500)
                })
            }
        }

    }

    render() {
        const { loading } = this.state;
        return (
            <View style={styles.viewBody}>
                <View style={styles.viewRating}>
                    <AirbnbRating
                        ref="rating"
                        count={5}
                        reviews={[
                            "Pésimo",
                            "Decificente",
                            "Normal",
                            "Muy Bueno",
                            "Excelente"
                        ]}
                        defaultRating={0}
                        size={35}
                    />
                </View>
                <View style={styles.formReview}>
                    <Form
                        ref="addReviewRestaurantForm"
                        type={AddReviewRestaurantStruct}
                        options={AddReviewRestaurantOptions}
                    />
                </View>

                <View style={styles.viewSendReview}>
                    <Button title="Enviar Comentario" buttonStyle={styles.sendBtnReview} onPress={this.sendReview} />
                </View>

                <Overlay overlayStyle={styles.overlayLoading} isVisible={loading} width="auto" height="auto">
                    <View>
                        <Text>Enviando review</Text>
                        <ActivityIndicator size="large" color="#00a680" />
                    </View>
                </Overlay>
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
        );
    }
}

const styles = {
    viewBody: {
        flex: 1
    },
    formReview: {
        marginTop: 20
    },
    viewSendReview: {
        flex: 1,
        justifyConten: "center",
        marginButton: 30,
        marginLeft: 20,
        marginRight: 20
    },
    sendBtnReview: {
        justifyContent: "center"
    },
    overlayLoading: {
        padding: 20
    },
    overlayLoadingText: {
        color: "#00a680",
        fontSize: 20
    }
}