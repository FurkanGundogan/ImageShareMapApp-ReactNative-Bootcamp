import {Image, Text, View} from 'native-base';
import React, {useEffect, useRef, useState} from 'react';
import {Dimensions, StyleSheet, Alert, Button, TouchableOpacity} from 'react-native';

import MapView, {Marker, Polyline} from 'react-native-maps';

import * as Location from 'expo-location';
import {
  doc,
  getDocs,
  query,
  updateDoc,
  collection,
  where,
} from 'firebase/firestore';
import {db} from '../utils/firebase';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const CustomMarker = ({image, lat, long,navigation,email}) => (
  <Marker
  onPress={()=>navigation.navigate('Image',{image:image?.url,lat,long,email})}
    coordinate={{
      latitude: lat,
      longitude: long,
    }}>
    {image.url ? (
      <Image
      alt="marker"
        borderColor="blue.200"
        w={12}
        h={12}
        rounded="full"
        source={{uri: image.url}}
      />
    ) : (
      <View
        backgroundColor="blue.400"
        w={8}
        h={8}
        rounded="full"
        display={'flex'}
        flexDirection="row"
        alignItems={'center'}
        justifyContent="center">
        <Text color={'white'}>{user.firstName?.[0]}</Text>
      </View>
    )}
  </Marker>
);

const MapScreen = () => {

  const {top} = useSafeAreaInsets();
  const user = useSelector(state => state.auth.user);
  const [users, setUsers] = useState([]);
  const [images, setImages] = useState([]);
  const [locations, setLocations] = useState([]);
  const [lastLocation, setLastLocation] = useState(null);
  const mapRef = useRef();

  const navgiation=useNavigation()
  useEffect(() => {
    getUsers();
    getImages()
  }, []);

  useEffect(() => {
    addNewLocation(lastLocation);
  }, [lastLocation]);

  const getUsers = async () => {
    const q = query(collection(db, 'user'), where('id', '!=', user.id));
    await getDocs(q).then(res => {
      const _users = res.docs.map(item => item.data());
      setUsers(_users);
    });
  };

  const getImages = async () => {
    const q = query(collection(db, 'images'));
    await getDocs(q).then(res => {
      const allImages = res.docs.map(item => item.data());
      setImages(allImages);
    });
  };


  const updateUsersCurrentLocation = async location => {
    const docRef = doc(db, 'user', user.id);
    await updateDoc(docRef, {
      currentLocation: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      },
    });
  };

  const addNewLocation = location => {
    if (location?.coords) {
      const newLocations = [...locations];
      newLocations.push({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      updateUsersCurrentLocation(location);
      setLocations(newLocations);
    }
  };

  const getCurrentLocation = async () => {
    let {status} = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission to access location was denied');
      return;
    }

    let location = await Location.watchPositionAsync(
      {
        distanceInterval: 10,
      },
      location => {
        setLastLocation(location);
        mapRef.current.animateToRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      },
    );
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);



  return (
    <View style={{paddingTop: top}}>
      
      <MapView
        showsMyLocationButton
        mapType="satellite"
        showsScale
        showsUserLocation
        ref={mapRef}
        style={styles.map}
        minZoomLevel={15}>
        <Polyline coordinates={locations} strokeWidth={6} strokeColor="black" />
        {images?.map((imageItem,index) => {
          return (
            <CustomMarker
              key={index}
              image={imageItem}
              lat={imageItem?.location?.coords?.latitude}
              long={imageItem?.location?.coords?.longitude}
              navigation={navgiation}
              email={imageItem?.email}
            />
          );
        })}   
      </MapView>
      <TouchableOpacity style={styles.refreshButton} onPress={()=>getImages()} >
        <Text style={styles.refreshButtonText}>REFRESH</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height-50,
  },
  refreshButton:{
    position:"absolute",
    bottom:120,
    justifyContent:"center",
    paddingTop:8,
    paddingBottom:8,
    paddingLeft:16,
    paddingRight:16,
    backgroundColor:"#0c5f9c",
    borderRadius:4,
    alignSelf :"center"
  },
  refreshButtonText:{
    color:"white",textAlign:"center",fontWeight:"800"
  }
});

export default MapScreen;
