import React from 'react'
import t from "tcomb-form-native";
import formValidation from "../utils/Validation";
import InputTemplate from "./templates/Input";
import TextAreaTemplate from "./templates/TextArea";

export const AddReviewRestaurantStruct = t.struct({
    title: t.String,
    review: t.String

})

export const AddReviewRestaurantOptions = {
    fields: {

        title: {
            template: InputTemplate,
            config: {
                placeholder: "Título",
                iconType: "material-community",
                iconName: "silverware"
            }   
        },
        review: {
            template: TextAreaTemplate,
            config: {
                placeholder: "Opinión",
            }, 
        },
    }
}