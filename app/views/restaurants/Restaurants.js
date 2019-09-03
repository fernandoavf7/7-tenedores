import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList, ActivityIndicator } from "react-native";
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import { Image } from "react-native-elements";
import { firebaseApp } from "../../utils/Firebase";
import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

export default class Restaurants extends Component {
    constructor() {
        super();

        this.state = {
            login: false,
            restaurants: null,
            startRestaurants: null,
            limitRestaurants: 8,
            isLoading: true
        }
    }

    componentDidMount() {
        this.isLogged();
        this.loadRestaurants();
    }

    isLogged = () => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({ login: true })
            } else {
                this.setState({ login: false })
            }
        })
    }

    showActionButton = () => {
        const { login } = this.state;

        if (login) {
            return (<ActionButton
                buttonColor="#00A680"
                onPress={() => { this.goToScreen("AddRestaurant") }}
            />)
        }
        return null;
    }

    goToScreen = nameScreen => {
        console.log(nameScreen)
        this.props.navigation.navigate(nameScreen);
    }


    loadRestaurants = async () => {
        const { limitRestaurants } = this.state;
        let resultRestaurants = [];

        const restaurants = db
            .collection("restaurants")
            .orderBy("createAt", "asc")
            .limit(limitRestaurants);

        await restaurants.get().then(response => {
            this.setState({ startRestaurants: response.docs[response.docs.lenght - 1] })


            response.forEach(doc => {
                let restaurant = doc.data();
                restaurant.id = doc.id;
                resultRestaurants.push({ restaurant })
            })

            this.setState({ restaurants: resultRestaurants })

        })
       // console.log(this.state.restaurants)
    }


    renderRow = (restaurants) => {
        const {
            name,
            city,
            address,
            description,
            image
        } = restaurants.item.restaurant;

        return (
            <View style={styles.viewRestaurant}>
                <View style={styles.viewRestaurantImage}>
                    <Image
                        resizeMode="cover"
                        source={{ uri: image }}
                        style={styles.imageRestaurant}
                    />
                </View>
                <View>
                    <Text style={styles.flatListRestaurantName}>{name}</Text>
                    <Text style={styles.flatListRestaurantAddress}>{city}, {address}</Text>

                    <Text style={styles.flatListRestaurantDescription}>{description.substr(0, 100)}...</Text>
                </View>

            </View>
        )
    }

    renderFlatlist = restaurants => {
        if (restaurants) {
            return (
                <FlatList

                    data={this.state.restaurants}
                    renderItem={this.renderRow}
                    keyExtractor={(item, index) => index.toString()}
                />
            )
        } else {
            return (
                <View style={styles.startLoadRestaurants}>
                    <ActivityIndicator size="large" />
                    <Text>Cargando...</Text>
                </View>
            )
        }
    }

    render() {
        const { restaurants } = this.state;
        return (
            <View style={styles.viewBody}>
                {this.showActionButton()}
                {this.renderFlatlist(restaurants)}
            </View>
        )
    }
}


const styles = StyleSheet.create({
    viewBody: {
        flex: 1,
    },
    startLoadRestaurants: {
        marginTop: 20,
        alignItems: "center"
    },
    viewRestaurant: {
        flexDirection: "row",
        margin: 10
    },
    viewRestaurantImage: {
        marginRight: 15
    },
    imageRestaurant: {
        width: 80,
        height: 80
    },
    flatListRestaurantName: {
        fontWeight: "bold"
    },
    flatListRestaurantAddress: {
        paddingTop: 2,
        color: "grey"
    },
    flatListRestaurantDescription: {
        paddingTop: 2,
        color: "grey",
        width: 300
    }
})