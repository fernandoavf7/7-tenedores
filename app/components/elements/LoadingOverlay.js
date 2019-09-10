import React, { Component } from 'react'
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { Button, Overlay, Input, Icon } from 'react-native-elements';



export default class OverlayLoading extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props
        }
    }

    componentDidMount() {
        this.setState({
            inputValue: this.state.value
        })
    }

    onChangeInput = inputData => {
        this.setState({
            inputValue: inputData
        })
    }

    update = () => {
        const newValue = this.state.inputValue;
        this.state.updateFunction(newValue);
        this.setState({
            isVisibleOverlay: false
        });
    }

    cancel = () => {
        this.setState({
            isVisibleOverlay: false
        });
        this.state.cancelOverlay();
    }


    render() {
        const { isVisibleOverlay, placeholder, inputValue } = this.state;
        // console.log("render", this.state)
        return (
            <Overlay
                isVisible={isVisibleOverlay}
                overlayBackgroundColor="transparent"
                overlayStyle={styles.overlyStyle}
                fullScreen={true} >

                <View style={styles.viewOverlay}>

                    <Icon
                        containerStyle={styles.buttonCancel}
                        type="material-community"
                        name="close-circle-outline"
                        color="#C2C2C2"
                        size={30}
                        onPress={() => this.cancel()}
                    />

                    <ActivityIndicator size="large" />
                    <Text>Cargando restaurantes</Text>

                </View>
            </Overlay>
        )
    }
}

const styles = StyleSheet.create({
    overlayStyle: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        height: 200
    },
    viewOverlay: {
        width: "100%",
        backgroundColor: "#FFF",
        padding: 20
    },
    inputContainer: {
        marginBottom: 20
    },
    buttonUpdate: {
        backgroundColor: "#00A680"
    },
    buttonCancel: {
        position: "absolute",
        right: 0,
        top: 0
    }
})
