import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { logOut } from '../utils/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons'; 
const Home = () => {
    const dispatch = useDispatch();
    const navigation=useNavigation()

  const [image, setImage] = useState();
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [2,3],
      quality: 1,
    });

    if (!result.cancelled) {
      

      navigation.navigate('ImageDisplayScreen',{image:result?.uri})
    }
  };

  return (
    <View>
        <TouchableOpacity  style={styles.btnWrapper} onPress={pickImage}>
        <Entypo name="image-inverted"  size={48} style={styles.galleryIcon} color="white" />
        <Text style={styles.btntext}>SELECT PHOTO</Text>
      </TouchableOpacity>
      <TouchableOpacity  style={{...styles.btnWrapper,backgroundColor:"#588b54"}} onPress={()=>alert('Sorry, this is a future work')}>
      <Entypo name="camera"  size={48} style={styles.galleryIcon} color="white" />
        <Text style={styles.btntext}>OPEN CAMERA</Text>
      </TouchableOpacity>

    </View>
  )
}

export default Home

const styles = StyleSheet.create({
    btnWrapper:{
        marginTop:64,
        height:200,
        width:150,
        padding:16,
        backgroundColor:"#ff5e00",
        justifyContent:"center",
        borderRadius:8,
        alignSelf:"center",
    },
    btntext:{
        color:"white",
        textAlign:"center",
        fontSize:24,
        fontWeight:"800",
        letterSpacing:1,
        marginTop:16
    },
    galleryIcon:{
        alignSelf:"center",

    }
})