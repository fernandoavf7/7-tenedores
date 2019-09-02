
import t from "tcomb-form-native";
import InputTemplate from "./templates/Input";
import TextAreaTemplate from "./templates/TextArea";

export const AddRestaurantStruct = t.struct({
    name: t.String,
    city: t.String,
    address: t.String,
    description: t.String

})

export const AddRestaurantOptions = {
    fields: {

        name: {
            template: InputTemplate,
            config: {
                placeholder: "Nombre del restaurante",
                iconType: "material-community",
                iconName: "silverware"
            }
        },
        city: {
            template: InputTemplate,
            config: {
                placeholder: "Ciudad del restaurante",
                iconType: "material-community",
                iconName: "city"
            }
        },
        address: {template: InputTemplate,
            config: {
                placeholder: "Dirección del restaurante",
                iconType: "material-community",
                iconName: "map-marker"
            }   },
        description: {template: TextAreaTemplate,
            config: {
                placeholder: "Nombre del restaurante",
                iconType: "material-community",
                iconName: "silverware"
            }   }
    }
}