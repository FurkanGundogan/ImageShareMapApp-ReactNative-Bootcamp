import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { signInWithEmailAndPassword } from 'firebase/auth';
import AuthNavigation from '../navigation/authNavigation';
import LoadingForLoginScreen from './LoadingForLoginScreen';
import MainBottomNav from '../navigation/MainBottomNav';
import { auth } from '../utils/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { signIn } from '../utils/store';
const Auth = () => {
    const dispatch = useDispatch();
    const [loading, setloading] = useState(false);
  
    const myauth = useSelector((state) => state.auth);
    //console.log("redux user:", myauth);
    
  const getUserFromLocal = async () => {
    const value = await AsyncStorage.getItem("@user");
    
    console.log("local val:", value);
    if (value !== null) {
      let myval = JSON.parse(value);
      const { email, password } = myval;
      console.log("local email:", email);
      console.log("password:", password);

      signInWithEmailAndPassword(auth, email, password).then((response) => {
        //console.log("response:", response);
        dispatch(
          signIn({
            email: email,
            password: password,
          })
        );
        //console.log("Local User Sign In Complete reduxa yazildi");
        setloading(false);
      });
      
    } else {
      setloading(false);
    }
  };

  useEffect(() => {
    setloading(true);
    getUserFromLocal();
  }, []);

  return (
    <>
      {myauth.user ? (
        <MainBottomNav />
      ) : loading ? (
        <LoadingForLoginScreen />
      ) : (
        <AuthNavigation />
      )}
    </>
  )
}

export default Auth

const styles = StyleSheet.create({})