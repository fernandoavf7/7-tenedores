import React, { Component } from 'react'
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { ListItem } from 'react-native-elements';
import OverlayOneInput from "./../elements/OverlayOneInput";
import OverlayTwoInputs from "../elements/OverlayTwoInputs";
import OverlayThreeInputs from "../elements/OverlayThreeInputs";
import Toast from "react-native-easy-toast";


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
                    onPress: () => this.openOverlayTwoInputs("Email", "Password", props.userInfo.email, this.updateUserEmail)
                },
                {
                    title: "Cambiar contraseña",
                    iconType: "material-community",
                    iconNameLeft: "lock-reset",
                    iconColorLeft: "#CCC",
                    iconNameRight: "chevron-right",
                    iconColorRight: "#CCC",
                    onPress: () => this.openOverlayThreeInputs("Contraseña actual", "Nueva contraseña", "Repetir nueva contraseña", this.updateUserPassword)

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

        if (emailOld != newEmail && password) {
            this.state.updateUserEmail(newEmail, password);

        } else {
            this.setState({
                overlayComponent: null
            });
        }
    }

    updateUserPassword = async (currentPassword, newPassword, repeatedNewPassword) => {
      // console.log("updateuserpass");
 

       if(currentPassword && newPassword && repeatedNewPassword){
        if(newPassword === repeatedNewPassword){
            if(currentPassword === newPassword){
                this.refs.toast.show("La nueva contraseña no puede ser igual a la contraseña actual",1500)
            }else{
                this.state.updateUserPassword(currentPassword, newPassword);
            }
        }else{
            this.refs.toast.show("Las nuevas contraseñas no coinciden",1500)
        }

       }else{
        this.refs.toast.show("Contraseña no cambiada, se deben rellenar todos los campos",1500)

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


    openOverlayThreeInputs = (placeholderOne, placeholderTwo, placeholderThree, updateFunction) => {


        this.setState({
            overlayComponent: null
        }, () => {
            this.setState({
                overlayComponent: (
                    <OverlayThreeInputs
                        isVisibleOverlay={true}
                        placeholderOne={placeholderOne}
                        placeholderTwo={placeholderTwo}
                        placeholderThree={placeholderThree}
                        inputValueOne=""
                        inputValueTwo=""
                        inputValueThree=""
                        isPassword={true}
                        updateFunction={updateFunction}
                        cancelOverlay={this.cancelOverlay}
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

                <Toast
                    ref="toast"
                    position="center"
                    positionValue={250}
                    fadeInDuration={1000}
                    fadeOutDuration={1000}
                    opacity={0.8}
                    textStyle={{ color: "white" }}
                />
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