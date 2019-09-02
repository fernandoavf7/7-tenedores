import React, { Component } from 'react'
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { ListItem } from 'react-native-elements';
import OverlayOneInput from "./../elements/OverlayOneInput";
import OverlayTwoInputs from "../elements/OverlayTwoInputs";

export default class UpdateUserInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props,
            overlayComponent: null,
            menuItems: [
                {
                    title: "Cambiar nombre y apellido",
                    iconType: "material-community",
                    iconNameLeft: "account-circle",
                    iconColorLeft: "#CCC",
                    iconNameRight: "chevron-right",
                    iconColorRight: "#CCC",
                    onPress: () => this.openOverlay("Nombre y Apellido", this.updateUserDisplayName, this.props.userInfo.displayName)
                },
                {
                    title: "Cambiar email",
                    iconType: "material-community",
                    iconNameLeft: "at",
                    iconColorLeft: "#CCC",
                    iconNameRight: "chevron-right",
                    iconColorRight: "#CCC",
                    onPress: () => this.openOverlayTwoInputs("Email", "Password", props.userInfo.email, props.updateUserEmail)
                },
                {
                    title: "Cambiar contraseña",
                    iconType: "material-community",
                    iconNameLeft: "lock-reset",
                    iconColorLeft: "#CCC",
                    iconNameRight: "chevron-right",
                    iconColorRight: "#CCC",
                    onPress: () =>
                        console.log("ha realizado pass")

                }
            ]
        }


    }




    updateUserDisplayName = async (newDisplayName) => {
        if (newDisplayName) {
            this.state.updateUserDisplayName(newDisplayName);
        }
        this.setState({
            overlayComponent: null
        });
    }

    updateUserEmail = async (newEmail, password) => {
        const emailOld = this.props.userInfo.email;

        if (emailOld != newEmail) {
            this.state.updateUserEmail(newEmail, password);

        } else {
            this.setState({
                overlayComponent: null
            });
        }


    }



    cancelOverlay = async () => {
        this.setState({
            overlayComponent: null
        });
    }

    openOverlay = (placeholder, updateFunction, inputValue) => {

        this.setState({
            overlayComponent: (
                <OverlayOneInput
                    isVisibleOverlay={true}
                    placeholder={placeholder}
                    updateFunction={updateFunction}
                    cancelOverlay={this.cancelOverlay}
                    value={inputValue}
                />

            )
        })
    }

    openOverlayTwoInputs = (placeholderOne, placeholderTwo, inputValueOne, updateFunction) => {
        console.log("openOverlayTwoInputs")
        console.log(this.state)

        this.setState({
            overlayComponent: null
        }, () => {
            this.setState({
                overlayComponent: (
                    <OverlayTwoInputs
                        isVisibleOverlay={true}
                        placeholderOne={placeholderOne}
                        placeholderTwo={placeholderTwo}
                        inputValueOne={inputValueOne}
                        inputValueTwo=""
                        isPassword={true}
                        updateFunction={updateFunction}
                        cancelOverlay={this.cancelOverlay}
                        value={inputValueOne}
                    />

                )
            })
        })


    }


    render() {
        const { menuItems, overlayComponent } = this.state;

        return (
            <View>
                {
                    menuItems.map((item, index) => (
                        <ListItem
                            key={index}
                            title={item.title}
                            leftIcon={{ type: item.iconType, name: item.iconNameLeft, color: item.iconColorLeft }}
                            rightIcon={{ type: item.iconType, name: item.iconNameRight, color: item.iconColorRight }}
                            onPress={item.onPress}
                            containerStyle={styles.containerListItem}
                        />
                    ))
                }
                {overlayComponent}
            </View>
        )
    }
}


const styles = StyleSheet.create({
    containerListItem: {
        borderBottomWidth: 1,
        borderBottomColor: "#CCC"
    }
})