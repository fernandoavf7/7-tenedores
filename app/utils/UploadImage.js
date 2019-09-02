import * as firebase from "./Firebase";


export const UploadImage = async (uri, nameImage, folder) => {
    await fetch(uri).then(async resul => {
      const ref = firebase
        .storage()
        .ref()
        .child(`${folder}/${nameImage}`);
      await ref.put(resul._bodyBlob);
      console.log("imagen Agregada");
    });
   
    return await firebase
      .storage()
      .ref(`${folder}/${nameImage}`)
      .getDownloadURL()
      .then(resul => {
        return resul;
      })
      .catch(error => {
        console.log("imagen NO Agregada");
      });
  };
   