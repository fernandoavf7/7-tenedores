import React, { Component } from 'react'
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { Button, Overlay, Input, Icon } from 'react-native-elements';



export default class OverlayTwoInputs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props
        }
    }

    componentDidMount() {
        this.setState({
            inputValueOne: this.state.value
        })
    }

    onChangeInputOne = inputData => {
        this.setState({
            inputValueOne: inputData
        })
    }

    onChangeInputTwo = inputData => {
        this.setState({
            inputValueTwo: inputData
        })
    }

    update = () => {
        const newValueOne = this.state.inputValueOne;
        const newValueTwo = this.state.inputValueTwo;
        this.state.updateFunction(newValueOne, newValueTwo);

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
        const { isVisibleOverlay, placeholderOne, placeholderTwo, inputValueOne, inputValueTwo, isPassword } = this.state;
        //console.log("render", this.state)
        return (
            <Overlay
                isVisible={isVisibleOverlay}
                overlayBackgroundColor="transparent"
                overlayStyle={styles.overlyStyle} >

                <View style={styles.viewOverlay}>

                    <Input
                        containerStyle={styles.inputContainer}
                        placeholder={placeholderOne}
                        onChangeText={v => this.onChangeInputOne(v)}
                        value={inputValueOne}
                    />

                    <Input
                        containerStyle={styles.inputContainer}
                        placeholder={placeholderTwo}
                        onChangeText={v => this.onChangeInputTwo(v)}
                        value={inputValueTwo}
                        password={isPassword}
                        secureTextEntry={isPassword}
                    />


                    <Button
                        buttonStyle={styles.buttonUpdate}
                        title="Actualizar"
                        onPress={() => this.update()}
                    />
                    <Icon
                        containerStyle={styles.buttonCancel}
                        type="material-community"
                        name="close-circle-outline"
                        color="#C2C2C2"
                        size={30}
                        onPress={() => this.cancel()}
                    />

                </View>
            </Overlay>
        )
    }
}

const styles = StyleSheet.create({
    overlayStyle: {
        //flex: 1,
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