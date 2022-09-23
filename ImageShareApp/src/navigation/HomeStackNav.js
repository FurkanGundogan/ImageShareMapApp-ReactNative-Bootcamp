import { StyleSheet} from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ImageDisplayScreen from '../screens/ImageDisplayScreen';
import Home from '../screens/Home';

const Stack = createNativeStackNavigator();

const HomeStackNav = () => {
    return (
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="ImageDisplayScreen" component={ImageDisplayScreen} 
          options={{title:"Upload Image"}}
          />
        </Stack.Navigator>
      )
}

export default HomeStackNav

const styles = StyleSheet.create({})