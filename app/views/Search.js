import React, { Component } from 'react';
import { StyleSheet, View, Text } from "react-native";
import { SearchBar, ListItem, Icon } from 'react-native-elements';

import { firebaseApp } from "./../utils/Firebase";
import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);
import { FireSQL } from "firesql";
const fireSQL = new FireSQL(firebase.firestore(), { includeId: 'id' });


export default class Search extends Component {
    constructor() {
        super();

        this.state = {
            search: "",
            restaurants: null
        }
    }

    searchRestaurants = async (value) => {
        this.setState({ search: value })
        console.log(value)

        let resultRestaurants = null;

        const restaurants = fireSQL.query(
            `SELECT * FROM restaurants 
            WHERE name LIKE '${value}%'
            `);

        await restaurants.then(response => {
            resultRestaurants = response;
            console.log(resultRestaurants);

        }).catch(error => {
            //console.log(error);
        })
        this.setState({ restaurants: resultRestaurants })
    }

    clickRestaurant = (restaurant) => {
        this.props.navigation.navigate("Restaurant", { restaurant })
    }

    renderListRestaurants = restaurants => {
        if (restaurants) {
            return (
                <View>
                    {restaurants.map((restaurant, index) => {
                        let restaurantClick = {
                            item: {
                                restaurant: null
                            }
                        }
                        restaurantClick.item.restaurant = restaurant;

                        return (
                            <ListItem
                                onPress={() => this.clickRestaurant(restaurantClick)}
                                key={index}
                                title={restaurant.name}
                                leftAvatar={{ source: { uri: restaurant.image } }}
                                rightIcon={<Icon type="material-community"
                                    name="chevron-right" />}
                            />
                        )
                    })}
                </View>
            )
        } else {
            return (
                <Text style={styles.notFoundText}>Busca tus restaurantes</Text>
            )
        }
    }

    render() {
        const { restaurants, search } = this.state;
        return (
            <View style={styles.viewBody}>
                <SearchBar
                    placeholder="Buscar restaurantes..."
                    onChangeText={this.searchRestaurants}
                    value={search}
                    containerStyle={styles.searchBar}
                />
                {this.renderListRestaurants(restaurants)}
            </View>
        )
    }
}


const styles = StyleSheet.create({
    viewBody: {
        flex: 1,
    },
    searchBar: {
        marginBottom: 20
    },
    notFoundText: {
        textAlign: "center"
    }
})