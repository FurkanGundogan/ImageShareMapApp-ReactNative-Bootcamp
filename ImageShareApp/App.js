import 'react-native-gesture-handler';

import {StatusBar} from 'expo-status-bar';
import {NativeBaseProvider} from 'native-base';
import {Provider} from 'react-redux';

import {store} from './src/utils/store';

import {NavigationContainer} from '@react-navigation/native';

import Auth from './src/screens/Auth';

export default function App() {
  return (
    <Provider store={store}>

        <NativeBaseProvider>
          <NavigationContainer>
            <StatusBar style="auto" />
            <Auth/>
          </NavigationContainer>
        </NativeBaseProvider>
     
    </Provider>
  );
}