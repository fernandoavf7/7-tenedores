import * as firebase from "firebase";

export const UploadImage = async (uri, nameImage, folder) => {

    await fetch(uri).then(async resul => {
        const ref = firebase
            .storage()
            .ref()
            .child(`${folder}/${nameImage}`);
        await ref.put(resul._bodyBlob);
    });

    return await firebase
        .storage()
        .ref(`${folder}/${nameImage}`)
        .getDownloadURL()
        .then(result => {
            return result;
        })
        .catch(error => {
            console.log("uploadImage.js", error);
        });
};
