import {View, Text, Image, Input, Button} from 'native-base';
import React, {useEffect, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';

import {ref, getDownloadURL, uploadBytes} from 'firebase/storage';
import uuid from 'react-native-uuid';

import * as ImagePicker from 'expo-image-picker';
import {db, storage} from '../utils/firebase';
import {addDoc, collection, doc, updateDoc} from 'firebase/firestore';
import {useDispatch, useSelector} from 'react-redux';
import {logOut, updateUser} from '../utils/store';
import {useNavigation} from '@react-navigation/native';
import { StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ProfileScreen = () => {
  const user = useSelector(state => state.auth.user);
  const {goBack} = useNavigation();
  const {control, handleSubmit} = useForm({
    defaultValues: {
      ...user,
    },
  });
  const dispatch = useDispatch();
  const [image, setImage] = useState(user.photoURL);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      const photoURL = await uploadImageAsync(result.uri);
      setImage(photoURL);
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
        console.log(e);
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });
    //console.log(blob);

    const fileRef = ref(storage, uuid.v4());
    const result = await uploadBytes(fileRef, blob);
    console.log("")
    // We're done with the blob, close and release it
    // blob.close();

    return await getDownloadURL(fileRef);
  }

  const handleSubmitProfile = async data => {
    console.log("submit",data)
    const docRef = doc(db, 'user', user.id);
    await updateDoc(docRef, {
      ...data,
      photoURL: image,
    }).then(response => {
      dispatch(updateUser({...data, photoURL: image}));
      alert('Update Successfull')
    });
  };

  const logout = async () => {
    dispatch(logOut());
    await AsyncStorage.removeItem("@user");
  };

  return (
    <View
    backgroundColor={"white"}
      p={4}
      height={"100%"}
      display="flex"
      flexDir={'column'}
      justifyContent="center"
      alignItems={'center'}>
      <Button onPress={pickImage} variant="ghost">
        <Image
          width={90}
          height={90}
          alt="photo"
          backgroundColor="gray.200"
          rounded={'full'}
          source={{uri: image}}
        />
      </Button>
      <Controller
        control={control}
        name="firstName"
        render={({field}) => {
          return (
            <Input
              placeholder="First Name"
              {...field}
              my={2}
              onChangeText={field.onChange}
            />
          );
        }}
      />
      <Controller
        control={control}
        name="lastName"
        render={({field}) => (
          <Input
            placeholder="Last Name"
            {...field}
            my={2}
            onChangeText={field.onChange}
          />
        )}
      />

      <Button my={2} backgroundColor={'#0c5f9c'} onPress={handleSubmit(handleSubmitProfile)}>
        <Text color={'white'}>Update Profile</Text>
      </Button>
      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutText}>LOGOUT</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
 logoutButton:{
  position:"absolute",
  backgroundColor:"red",
  padding:16,
  paddingTop:8,
  paddingBottom:8,
  borderRadius:8,
  bottom:16
 },
 logoutText:{
  color:"white",
  fontWeight:"600"
 }
})