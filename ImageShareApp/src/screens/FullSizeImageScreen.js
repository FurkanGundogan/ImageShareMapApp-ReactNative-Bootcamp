import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'

const FullSizeImageScreen = () => {
  const route=useRoute()
  const {image,lat,long,email} = route?.params

  return (
    <SafeAreaView>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: image }} />
      </View>
      <Text>Image Details</Text>
      <Text>Owner: {email}</Text>
      <Text>Location: {lat}-{long}</Text>
    </SafeAreaView>
  )
}

export default FullSizeImageScreen

const styles = StyleSheet.create({
  imageContainer: {
    width: "100%",
    height: "90%",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "black",
  },
  image: {
    width: "100%",
    height: "100%",
  },
})