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

//import { firebaseApp } from "../../utils/FireBase";
//import firebase from "firebase/app";
//import "firebase/firestore";
//const db = firebase.firestore(firebaseApp);

export default class Restaurant extends Component {
    render() {
        const { name, city, address, description, image } = this.props.navigation.state.params.restaurant.item.restaurant;
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
    }
}