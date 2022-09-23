import { Button, Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { db, storage } from "../utils/firebase";
import uuid from "react-native-uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import * as Location from 'expo-location';
import { useSelector } from "react-redux";
const ImageDisplayScreen = () => {
  const myauth = useSelector((state) => state.auth);
  const [mylocation,setMyLocation]=useState()
  const route = useRoute();
  var img = route?.params?.image ? route?.params?.image : "";
  const {goBack} = useNavigation();
  const sendImage = async () => {
    const photoURL = await uploadImageAsync(img);

    if (photoURL) {
      await setDoc(doc(db, `images`, uuid.v4()), {
        url: photoURL,
        location:mylocation,
        email:myauth?.email  
      }).then((response) => {
        alert("File Uploaded");
        goBack()
      });
    } else {
      alert("Please pick an image");
    }
  };

  async function uploadImageAsync(uri) {
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log("hata", e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    const fileRef = ref(storage, uuid.v4());
    const result = await uploadBytes(fileRef, blob);

    // We're done with the blob, close and release it
    // blob.close();

    return await getDownloadURL(fileRef);
  }


  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setMyLocation(location);
    })();
  }, []);


  return (
    <View>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: img }} />
      </View>
      <View style={styles.button}>
        <Button title="Send Image" onPress={sendImage}></Button>
      </View>
    </View>
  );
};

export default ImageDisplayScreen;

const styles = StyleSheet.create({
  imageContainer: {
    width: "100%",
    height: "90%",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "black",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  button: {
    marginTop: 16,
  },
});
