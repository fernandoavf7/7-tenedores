import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import UserNavigation from "./app/navigations/User";
import firebaseConfig from "./app/utils/Firebase";
import * as firebase from "firebase";
import { firebaseApp} from "./app/utils/Firebase";

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>

        <UserNavigation />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
