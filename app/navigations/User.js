import React, { Component } from 'react'

import {
    createStackNavigator,
    createAppContainer,
    createBottomTabNavigator
} from "react-navigation";

import HomeScreen from "../views/Home";
import TopFiveScreen from "../views/TopFive";
import SearchScreen from "../views/Search";
import MyAccountScreen from "../views/MyAccount/MyAccount";
import RegisterScreen from "../views/MyAccount/Register";

import { Icon } from 'react-native-elements';


const homeScreenStack = createStackNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: ({ navigation }) => ({
            title: "Home"
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
    }
})

const RootStack = createBottomTabNavigator(
    {
        Home: {
            screen: homeScreenStack,
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
        initialRouteName: "MyAccount",
        order: ["Home", "TopFive", "Search","MyAccount"],
        tabBarOptions: {
            inactiveTintColor: "#656565",
            activeTintColor: "#00A680"
        }
    }
);

export default createAppContainer(RootStack);