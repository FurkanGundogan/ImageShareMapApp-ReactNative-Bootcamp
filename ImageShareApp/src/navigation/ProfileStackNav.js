import { StyleSheet} from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProfileScreen } from '../screens/profile';


const Stack = createNativeStackNavigator();

const ProfileStackNav = () => {
    return (
        <Stack.Navigator>
          <Stack.Screen name="Profile" component={ProfileScreen} />
          {/*<Stack.Screen name="ImageDisplayScreen" component={ImageDisplayScreen} 
          options={{title:"Upload Image"}}
    />*/}
        </Stack.Navigator>
      )
}

export default ProfileStackNav

const styles = StyleSheet.create({})