import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { logOut } from '../utils/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

const Home = () => {
    const dispatch = useDispatch();
    const navigation=useNavigation()
    const logout = async () => {
      dispatch(logOut());
      await AsyncStorage.removeItem("@user");
    };
  const [image, setImage] = useState();
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      

      navigation.navigate('ImageDisplayScreen',{image:result?.uri})
    }
  };

  return (
    <View>
        <View  style={styles.btnWrapper}></View>
      <Button title="Select Image" onPress={pickImage}/>

      <TouchableOpacity
        style={{ ...styles.btn, ...styles.btnLogout }}
        onPress={()=>navigation.navigate('ImageDisplayScreen')}
      >
        <Text style={styles.buttonText}>Go Image Detail</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ ...styles.btn, ...styles.btnLogout }}
        onPress={logout}
      >
        <Text style={styles.buttonText}>LOGOUT</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
    btnWrapper:{
        marginTop:16
    }
})