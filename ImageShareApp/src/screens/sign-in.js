import React from 'react';

import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth, db} from '../utils/firebase';
import {useDispatch} from 'react-redux';
import {signIn} from '../utils/store';

import {useNavigation} from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form';
import {Button, Input, Text, View, useToast} from 'native-base';
import {doc, getDoc} from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet } from 'react-native';
import { Entypo } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
export const SignInScreen = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: 'furkangundogan1414@gmail.com',
      password: '123123',
    },
  });
  const {show} = useToast();
  const {navigate} = useNavigation();
  const dispatch = useDispatch();

  const handleSignIn = data => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then(async response => {
        const userDoc = doc(db, 'user', response.user.uid);
        const userRef = await getDoc(userDoc);
        if (userRef.exists()) {
          dispatch(signIn(userRef.data()));
          submitUserToLocal({email:data.email,password:data.password})
        }
      })
      .catch(err => {
        show({
          description: err.message,
        });
      });
  };

  const submitUserToLocal = async (data) => {
    const backupinfo = { ...data };
    const jsonValue = JSON.stringify(backupinfo);
    console.log("locale atanan:",jsonValue)
    await AsyncStorage.setItem("@user", jsonValue);
    
  }; 
  return (
    <View p={4} style={styles.container}>
      <View style={styles.titleWrapper}>
      <MaterialIcons name="insert-photo"  size={48} style={styles.galleryIcon} color="#0c5f9c" />
        <Text style={styles.titleText}>IMAGE SHARE APP</Text>
      </View>
      <Controller
        name="email"
        control={control}
        rules={{
          required: {value: true, message: 'Email is required'},
          minLength: {value: 10, message: 'Email can be at least 10 chars. '},
        }}
        render={({field}) => {
          return (
            <Input
              placeholder="E-mail"
              autoCapitalize="none"
              my={2}
              {...field}
              onChangeText={field.onChange}
            />
          );
        }}
      />
      {errors.email ? (
        <Text style={{color: 'red'}}>{errors.email.message}</Text>
      ) : null}

      <Controller
        name="password"
        control={control}
        render={({field}) => {
          return (
            <Input
              secureTextEntry
              placeholder="Password"
              my={2}
              {...field}
              onChangeText={field.onChange}
            />
          );
        }}
      />

      <Button onPress={handleSubmit(handleSignIn)} style={{marginVertical: 16,backgroundColor:'#0c5f9c'}}>
        <Text color={'white'}>Sign In</Text>
      </Button>

      <Button
        variant={'outline'}
        onPress={() => {
          navigate('SignUp');
        }}>
        <Text>Go to Sign Up</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    backgroundColor:"white",flex:1
  },
  titleWrapper:{
    marginTop:32,
    padding:8,
    borderRadius:2,
    justifyContent:"center",
    alignItems:"center"
  },
  titleText:{
    color:"#0c5f9c",
    textAlign:"center",
    fontWeight:"800",
    fontSize:18
  }
})