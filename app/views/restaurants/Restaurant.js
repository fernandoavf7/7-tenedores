import React, { Component } from "react";
import {
    StyleSheet,
    View,
    ScrollView,
    ActivityIndicator,
    FlatList
} from "react-native";
import {
    Image,
    Icon,
    ListItem,
    Button,
    Text,
    Rating,
    Avatar
} from "react-native-elements";
import Toast, { DURATION } from "react-native-easy-toast";

import { firebaseApp } from "./../../utils/Firebase";
import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

export default class Restaurant extends Component {
    constructor(props) {
        super(props);

    }

    checkUserLogin = () => {
        const user = firebase.auth().currentUser;
        if (user) {
            return true;
        } else {
            return false;
        }
    }

    loadButtonAddReview = () => {
        const { id, name } = this.props.navigation.state.params.restaurant.item.restaurant;
        if (this.checkUserLogin()) {
            return (
                <View style={styles.viewBtnAddReview}>
                    <Button
                        title="Añadir comentario"
                        onPress={() => this.props.navigation.navigate("AddReviewRestaurant", { id, name })}
                        buttonStyle={styles.btnAddReview} />
                </View>
            )
        }
        else {
            return (
                <Text onPress={() => this.props.navigation.navigate("Login")} style={styles.textLinkLogin}>Debe iniciar sesión para escribir una reseña</Text>
            )
        }
    }

    render() {
        const { id, name, city, address, description, image } = this.props.navigation.state.params.restaurant.item.restaurant;
        const listExtraInfo = [
            {
                text: `${city}, ${address}`,
                iconName: "map-marker",
                iconType: "material-community",
                action: null
            }
        ];

        return (
            <View style={styles.viewBody}>
                <View style={styles.viewImage}>
                    <Image
                        source={{ uri: image }}
                        placeholderContent={<ActivityIndicator />}
                        style={styles.imageRestaurant}
                    />
                </View>

                <View style={styles.viewRestaurantBasicInfo}>
                    <Text style={styles.nameRestaurant}>{name}</Text>
                    <Text style={styles.descriptionRestaurant}>{description}</Text>
                    <Text style={styles.descriptionRestaurant}>{listExtraInfo[0].text}</Text>
                    <Text style={styles.descriptionRestaurant}>{city}</Text>
                </View>

                <View style={styles.viewRestaurantExtraInfo}>
                    <Text style={styles.restaurantExtraInfoTitle}>
                        Información sobre el restaurante
                        </Text>
                    {listExtraInfo.map((item, index) => (
                        <ListItem
                            key={index}
                            title={item.text}
                            leftIcon={<Icon name={item.iconName} type={item.iconType} />}
                        />
                    ))}

                </View>

                {this.loadButtonAddReview()}

            </View>
        );
    }
}

const styles = {
    viewBody: {
        flex: 1
    },
    imageRestaurant: {
        width: "100%"
    },
    imageRestaurant: {
        width: "100%",
        height: 200,
        resizeMode: "cover"
    },
    viewRestaurantBasicInfo: {
        margin: 15
    },
    nameRestaurant: {
        fontSize: 20,
        fontWeight: "bold"
    },
    descriptionRestaurant: {
        marginTop: 5,
        color: "gray",
    },
    viewRestaurantExtraInfo: {
        margin: 15,
        marginTop: 25
    },
    restaurantExtraInfoTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10
    },
    viewBtnAddReview: {
        margin: 20
    },
    btnAddReview: {
        backgroundColor: "#00a680"
    },
    textLinkLogin: {
        color: "#00a680",
        fontSize: "bold"
    }
}