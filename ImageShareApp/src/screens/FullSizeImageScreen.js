import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'

const FullSizeImageScreen = () => {
  const route=useRoute()
  const {image,lat,long,email} = route?.params

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flexDirection:"row",justifyContent:"center",marginTop:16}}>
      <Text style={styles.from}>From</Text>
      <Text style={styles.email}> {email}</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: image }} />
      </View>
    </SafeAreaView>
  )
}

export default FullSizeImageScreen

const styles = StyleSheet.create({
  container:{
    backgroundColor:"white",
    flex:1
  },
  imageContainer: {
    width: "100%",
    height: "95%",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "black",
  },
  image: {
    width: "100%",
    height: "100%",
  },from:{
    textAlign:"center",
    color:"black",
    fontWeight:"600"
  },
  email:{
    textAlign:"center",
    color:"blue",
    fontWeight:"600"
  }
})