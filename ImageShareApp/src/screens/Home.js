import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useDispatch } from 'react-redux';
import { logOut } from '../utils/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
    const dispatch = useDispatch();
    const navigation=useNavigation()
    const logout = async () => {
      dispatch(logOut());
      await AsyncStorage.removeItem("@user");
    };
  return (
    <View>
      <Text>Home</Text>
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
    btn:{
        marginBottom:16
    }
})