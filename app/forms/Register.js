import React from 'react';
import t from "tcomb-form-native";
import formValidation from "../utils/Validation";

export const RegisterStruct = t.struct({
   name: t.String,
    //email: t.String,
    //password: formValidation.password,
   // passwordConfirm: formValidation.password

})

export const RegisterOptions = {
    fields: {
        name: {
            label: "Nombre (*)"
        }
    }
}