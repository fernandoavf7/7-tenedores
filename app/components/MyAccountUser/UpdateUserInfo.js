import React, { Component } from 'react'
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { ListItem } from 'react-native-elements';
import OverlayOneInput from "./../elements/OverlayOneInput";

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
                    onPress: () =>
                        console.log("ha realizado email")

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
        await this.state.updateUserDisplayName(newDisplayName);
        this.setState({
            overlayComponent: null
        });
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