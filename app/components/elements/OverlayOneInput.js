import React, { Component } from 'react'
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { Button, Overlay, Input, Divider } from 'react-native-elements';



export default class OverlayOneInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props
        }
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
        const { isVisibleOverlay, placeholder, value } = this.state;
        console.log("render",this.state)
        return (
            <Overlay
                isVisible={isVisibleOverlay}
                overlayBackgroundColor="transparent"
                overlayStyle={styles.overlyStyle} >

                <View style={styles.viewOverlay}>

                    <Input
                        containerStyle={styles.inputContainer}
                        placeholder={placeholder}
                        onChangeText={value => this.onChangeInput(value)}
                        value={value} />
                    <View>
                        <Button
                            buttonStyle={styles.buttonCancel}
                            title="Cancelar"
                            onPress={() => this.cancel()}
                        />
                        
                        <Button
                            buttonStyle={styles.buttonUpdate}
                            title="Actualizar"
                            onPress={() => this.update()}
                        />
                    </View>
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
        backgroundColor: "#C2C2C2"
    }
})