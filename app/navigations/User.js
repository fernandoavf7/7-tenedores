import React, { Component } from 'react'

import {
    createStackNavigator,
    createAppContainer,
    createBottomTabNavigator
} from "react-navigation";


//screens
import TopFiveScreen from "../views/TopFive";
import SearchScreen from "../views/Search";

//MyAccount
import MyAccountScreen from "../views/MyAccount/MyAccount";
import RegisterScreen from "../views/MyAccount/Register";
import LoginScreen from "../views/MyAccount/Login";

import { Icon } from 'react-native-elements';

//retaurants 
import Restaurantscreen from "./../views/restaurants/Restaurants";
import AddRestaurantScreen from "./../views/restaurants/AddRestaurant";

const restaurantsScreenStack = createStackNavigator({
    Restaurants: {
        screen: Restaurantscreen,
        navigationOptions: ({ navigation }) => ({
            title: "Home"
        })
    },
    AddRestaurant: {
        screen: AddRestaurantScreen,
        navigationOptions: ({ navigation }) => ({
            title: "Nuevo restaurante"
        })
    }
})

const TopFiveScreenStack = createStackNavigator({
    TopFive: {
        screen: TopFiveScreen,
        navigationOptions: ({ navigation }) => ({
            title: "Top 5 Restaurantes"
        })
    }
})

const SearchScreenStack = createStackNavigator({
    Search: {
        screen: SearchScreen,
        navigationOptions: ({ navigation }) => ({
            title: "Búsqueda"
        })
    }
})

const MyAccountScreenStack = createStackNavigator({
    MyAccount: {
        screen: MyAccountScreen,
        navigationOptions: ({ navigation }) => ({
            title: "Mi Cuenta"
        })
    },
    Register: {
        screen: RegisterScreen,
        navigationOptions: ({ navigation }) => ({
            title: "Registro"
        })
    },
    Login: {
        screen: LoginScreen,
        navigationOptions: ({ navigation }) => ({
            title: "Ingresar"
        })
    }
})

const RootStack = createBottomTabNavigator(
    {
        Restaurants: {
            screen: restaurantsScreenStack,
            navigationOptions: ({ navigation }) => ({
                tabBarLabel: "Home",
                tabBarIcon: ({ tintColor }) => (
                    <Icon
                        name="compass-outline"
                        type="material-community"
                        size={22}
                        color={tintColor}
                    />
                )
            })
        },
        TopFive: {
            screen: TopFiveScreenStack,
            navigationOptions: ({ navigation }) => ({
                tabBarLabel: "Top 5",
                tabBarIcon: ({ tintColor }) => (
                    <Icon
                        name='trophy'
                        type="material-community"
                        size={22}
                        color={tintColor}
                    />
                )
            })
        },

        Search: {
            screen: SearchScreenStack,
            navigationOptions: ({ navigation }) => ({
                tabBarLabel: "Búsqueda",
                tabBarIcon: ({ tintColor }) => (
                    <Icon
                        name='magnify'
                        type="material-community"
                        size={22}
                        color={tintColor}
                    />
                )
            })
        },
        MyAccount: {
            screen: MyAccountScreenStack,
            navigationOptions: ({ navigation }) => ({
                tabBarLabel: "Mi Cuenta",
                tabBarIcon: ({ tintColor }) => (
                    <Icon
                        name='account-circle'
                        type="material-community"
                        size={22}
                        color={tintColor}
                    />
                )
            })
        }

    }
    , {
        initialRouteName: "Restaurants",
        order: ["Restaurants", "TopFive", "Search","MyAccount"],
        tabBarOptions: {
            inactiveTintColor: "#656565",
            activeTintColor: "#00A680"
        }
    }
);

export default createAppContainer(RootStack);