import React, { Component } from 'react'
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { Button, Overlay, Input } from 'react-native-elements';



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
       // console.log(this.state);

    }

    update = () => {
        const newValue = this.state.inputValue;
        //console.log(this.state);
        this.state.updateFunction(newValue);
        this.setState({
            isVisibleOverlay: false
        });
    }

    render() {
        const { isVisibleOverlay, placeholder, inputValue } = this.state;
        return (
            <Overlay
                isVisible={isVisibleOverlay}
                overlayBackgroundColor="transparent"
                overlayStyle={styles.overlyStyle} >
                <View style={styles.viewOverlay}>

                    <Input
                        placeholder={placeholder}
                        containerStyle={styles.inputContainer}
                        onChangeText={value => this.onChangeInput(value)}
                        value={inputValue} />
                    <Button
                        buttonStyle={styles.buttonUpdate}
                        title="Actualizar"
                        onPress={() => this.update()} />
                </View>
            </Overlay>
        )
    }
}

const styles = StyleSheet.create({
    overlayStyle: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
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
    }
})