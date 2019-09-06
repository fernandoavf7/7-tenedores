export const checkUserAvatar = photoUrl => {
    return photoUrl
        ? photoUrl
        : "https://api.adorable.io/avatars/285/abott@adorable.png";
}


export const formatDate = (date) => {
    const formatedDate = ((date.getDate() < 9) ? "0" + (date.getDate()) : (date.getDate()))
        + "/" + ((date.getMonth() < 9) ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1))
        + "/" + date.getFullYear();
    const formatedTime = ((date.getHours() < 9) ? "0" + (date.getHours()) : (date.getHours()))
        + ":" + ((date.getMinutes() < 9) ? "0" + (date.getMinutes()) : (date.getMinutes()));
    return formatedDate + " - " + formatedTime;
}