import React, { Component } from "react";
import {
    StyleSheet,
    View,
    ScrollView,
    ActivityIndicator,
    FlatList
} from "react-native";
import {
    Image,
    Icon,
    ListItem,
    Button,
    Text,
    Rating,
    Avatar,
} from "react-native-elements";
import Toast, { DURATION } from "react-native-easy-toast";
import { checkUserAvatar, formatDate } from "./../../utils/Functions";

import { firebaseApp } from "./../../utils/Firebase";
import firebase from "firebase/app";
import "firebase/firestore";

const db = firebase.firestore(firebaseApp);

export default class Restaurant extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: null,
            reviewed: null,
            limitReviews: 5,
            reviews: null,
            averageRating: 0,
            startReviews: null
        }
    }

    componentDidMount = async () => {
        const currentUser = await firebase.auth().currentUser;
        if (currentUser) {
            this.setState({ currentUser })
        }
        this.checkAddReviewUser();
        this.loadReviews();

    }

    loadReviews = async () => {
        const { limitReviews } = this.state;
        const { id } = this.props.navigation.state.params.restaurant.item.restaurant;

        let resultReviews = [];
        let arrayRating = [];

        const reviews = db.collection("reviews")
            .where("idRestaurant", "==", id)
           // .orderBy("createdAt", "desc")
            .limit(limitReviews)
           

        return await reviews.get().then(response => {
            this.setState({ startReviews: response.docs[response.docs.length - 1] });


            response.forEach(doc => {
                let review = doc.data();
                resultReviews.push(review);
                arrayRating.push(doc.data().rating)
            })

            let numSum = 0;

            arrayRating.map(value => {
                numSum = numSum + value;
            })

            const countRating = arrayRating.length;
            const averageRating = (numSum / countRating);
            // console.log(averageRating);
            const ResultAverageRating = averageRating ? averageRating : 0;

            this.setState({ reviews: resultReviews, averageRating: ResultAverageRating });
        })
    }

    handleLoadMore = async () => {
        console.log("handleeee more restaurant.js ")
     /*   const { limitReviews, startReviews } = this.state;
        const { id } = this.props.navigation.state.params.restaurant.item.restaurant;

        let resultReviews = [];

        this.state.reviews.forEach(doc => {
            resultReviews.push(doc);
        });

        const reviewesDb = db
            .collection("reviews")
            .where("idRestaurant", "==", id)
           // .orderBy("createdAt", "desc")
            .startAfter(startReviews.data().createdAt)
            .limit(limitReviews);

        await reviewesDb.get().then(response => {
            if (response.docs.length > 0) {
                this.setState({
                    startReviews: response.docs[response.docs.length - 1]
                });
            } else {
                this.setState({
                    isLoading: false
                });
            }

            response.forEach(doc => {
                let review = doc.data();
                review.id = doc.id;
                resultReviews.push({ review });
            });

            this.setState({
                reviews: resultReviews
            });
        });
*/
    }


    checkUserLogin = () => {
        if (this.state.currentUser != null) {
            return true;
        } else {
            return false;
        }
    }

    checkAddReviewUser = () => {
        if (this.state.currentUser != null) {
            const user = this.state.currentUser;
            const idUser = user.uid;
            const idRestaurant = this.props.navigation.state.params.restaurant.item.restaurant.id;
            const reviewsRef = db.collection("reviews");
            const queryRef = reviewsRef
                .where("idUser", "==", idUser)
                .where("idRestaurant", "==", idRestaurant);

            return queryRef.get().then(resolve => {
                const countReview = resolve.size;
                // console.log(countReview);
                if (countReview > 0) {
                    this.setState({ reviewed: true })
                } else {
                    this.setState({ reviewed: false })
                }
            })
        } else {
            this.setState({ reviewed: false })
        }
    }

    loadButtonAddReview = () => {

        // console.log(this.state);

        const { id, name } = this.props.navigation.state.params.restaurant.item.restaurant;
        if (this.checkUserLogin()) {

            if (this.state.reviewed != null) {
                if (this.state.reviewed) {
                    return (
                        <View style={styles.viewBtnAddReview}>
                            <Button
                                title="Modificar comentario"
                                onPress={() => this.props.navigation.navigate("AddReviewRestaurant", { id, name, loadReviews: this.loadReviews })}
                                buttonStyle={styles.btnAddReview} />
                        </View>
                    )
                } else {
                    return (
                        <View style={styles.viewBtnAddReview}>
                            <Button
                                title="Añadir comentario"
                                onPress={() => this.props.navigation.navigate("AddReviewRestaurant", { id, name, loadReviews: this.loadReviews })}
                                buttonStyle={styles.btnAddReview} />
                        </View>
                    )
                }
            } else {
                return null;
            }
        }
        else {
            return (
                <Text onPress={() => this.props.navigation.navigate("Login")} style={styles.textLinkLogin}>Debe iniciar sesión para escribir una reseña</Text>
            )
        }
    }


    renderFlatList = reviews => {
        if (reviews) {
            //  this.setState({noComments: false})
            return (
                <FlatList
                    data={reviews}
                    renderItem={this.renderRow}
                    keyExtractor={(item, index) => index.toString()}
                    onEndReached={this.handleLoadMore}
                    onEndReachedThreshold={0.1}
                />
            )
        } else {
            // this.setState({noComments: true})
            return (
                <View style={styles.startLoadReview}>
                    <ActivityIndicator size="large" />
                    <Text>Cargando reviews...</Text>
                </View>
            )
        }
    }

    renderRow = (reviewData) => {
        const { title, review, rating, idUser, createdAt, avatarUser } = reviewData.item;
        const createdReviewDate = new Date(createdAt.seconds * 1000)
        // console.log(createdReviewDate);

        return (
            <View style={styles.viewReview}>
                <View style={styles.viewImageAvatar}>
                    <Avatar
                        source={{
                            uri: checkUserAvatar(avatarUser)
                        }}
                        size="large"
                        rounded
                        containerStyle={styles.imageAvatarUser}
                    />
                </View>

                <View style={styles.viewInfo}>
                    <Rating
                        readonly
                        imageSize={15}
                        startingValue={rating}
                    />
                    <Text style={styles.reviewTitle}>{title}</Text>
                    <Text style={styles.reviewText}>{review}</Text>
                    <Text style={styles.reviewDate} >{formatDate(createdReviewDate)}</Text>
                </View>
            </View>
        )
    }


    render() {

        console.log(this.state.startReview);

        const { id, name, city, address, description, image } = this.props.navigation.state.params.restaurant.item.restaurant;
        const listExtraInfo = [
            {
                text: `${city}, ${address}`,
                iconName: "map-marker",
                iconType: "material-community",
                action: null
            }
        ];

        const { reviews, averageRating } = this.state;
        let noComments = false;
        if (reviews) {
            if (reviews.length == 0) {
                noComments = true;
            }
        }

        return (
            <ScrollView style={styles.viewBody}>

                <View style={styles.viewImage}>
                    <Image
                        source={{ uri: image }}
                        placeholderContent={<ActivityIndicator />}
                        style={styles.imageRestaurant}
                    />
                </View>

                <View style={styles.viewRestaurantBasicInfo}>
                    <View>
                        <Text style={styles.nameRestaurant}>{name}</Text>
                        <Rating
                            style={{ position: "absolute", right: 0 }}
                            imageSize={20}
                            readonly
                            startingValue={averageRating}
                        />
                    </View>
                    <Text style={styles.descriptionRestaurant}>{description}</Text>
                </View>

                <View style={styles.viewRestaurantExtraInfo}>
                    <Text style={styles.restaurantExtraInfoTitle}>
                        Información sobre el restaurante
                        </Text>
                    {listExtraInfo.map((item, index) => (
                        <ListItem
                            key={index}
                            title={item.text}
                            leftIcon={<Icon name={item.iconName} type={item.iconType} />}
                        />
                    ))}

                </View>

                {this.loadButtonAddReview()}


                <Text style={styles.commentTitle}>{!noComments ? "Comentarios" : "Sin comentarios aún"}</Text>
                {this.renderFlatList(reviews)}


            </ScrollView>
        );
    }
}

const styles = {
    viewBody: {
        flex: 1
    },
    viewImage: {
        width: "100%"
    },
    imageRestaurant: {
        width: "100%"
    },
    imageRestaurant: {
        width: "100%",
        height: 200,
        resizeMode: "cover"
    },
    viewRestaurantBasicInfo: {
        margin: 15
    },
    nameRestaurant: {
        fontSize: 20,
        fontWeight: "bold"
    },
    descriptionRestaurant: {
        marginTop: 5,
        color: "gray",
    },
    viewRestaurantExtraInfo: {
        margin: 15,
        marginTop: 25
    },
    restaurantExtraInfoTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10
    },
    viewBtnAddReview: {
        margin: 20
    },
    btnAddReview: {
        backgroundColor: "#00a680"
    },
    textLinkLogin: {
        color: "#00a680",
        fontWeight: "bold"
    },
    startLoadReview: {
        marginTop: 20,
        alignItems: "center"
    },
    viewReview: {
        flexDirection: "row",
        margin: 10,
        paddingBottom: 20,
        borderBottomColor: "#e3e3e3",
        borderBottomWidth: 1
    },
    viewImageAvatar: {
        marginRight: 15
    },
    imageAvatarUser: {
        width: 50,
        height: 50
    },
    viewInfo: {
        flex: 1,
        alignItems: "flex-start"
    },
    reviewTitle: {
        fontWeight: "bold"
    },
    reviewText: {
        paddingTop: 2,
        color: "grey",
        marginBottom: 5
    },
    reviewDate: {
        marginTop: 5,
        color: "grey",
        fontSize: 12
    },
    commentTitle: {
        fontSize: 20,
        textAlign: "center",
        marginTop: 20,
        marginBottom: 10,
        fontWeight: "bold"
    }
}