import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MapScreen from '../screens/map';
import FullSizeImageScreen from '../screens/FullSizeImageScreen';

const MapNav = createStackNavigator();

const MapNavigator = () => {

  return (
    <MapNav.Navigator initialRouteName='Map' screenOptions={{headerShown: false}}>
          <MapNav.Screen name="Map" component={MapScreen} />
          <MapNav.Screen name="Image" component={FullSizeImageScreen} />
    </MapNav.Navigator>
  );
};

export default MapNavigator;
