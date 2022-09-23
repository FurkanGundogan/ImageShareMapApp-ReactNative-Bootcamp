import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useDispatch } from 'react-redux';
import { logOut } from '../utils/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
const HomeStackNav = () => {
    const dispatch = useDispatch();
    const logout = async () => {
      dispatch(logOut());
      await AsyncStorage.removeItem("@user");
    };
  return (
    <View>
      <Text>HomeStackNav</Text>
      <TouchableOpacity
        style={{ ...styles.btn, ...styles.btnLogout }}
        onPress={logout}
      >
        <Text style={styles.buttonText}>LOGOUT</Text>
      </TouchableOpacity>
    </View>
  )
}

export default HomeStackNav

const styles = StyleSheet.create({})