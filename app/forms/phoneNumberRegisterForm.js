import React from 'react'
import t from "tcomb-form-native";
import InputTemplate from "./templates/Input";

export const PhoneNumberRegisterStruct = t.struct({
    phoneNumber: t.String,
    verificationCode: t.String

})

export const PhoneNumberRegisterOptions = {
    fields: {

        phoneNumber: {
            template: InputTemplate,
            config: {
                placeholder: "Escribe tu telefono",
                iconType: "material-community",
                iconName: "at"
            }
        },
        verificationCode: {
            template: InputTemplate,
            config: {
                placeholder: "Escribe el código",
                iconType: "material-community",
                iconName: "lock-outline",
            },
        },
    }
}