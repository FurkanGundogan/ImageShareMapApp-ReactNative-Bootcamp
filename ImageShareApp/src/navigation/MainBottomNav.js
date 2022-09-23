import { StyleSheet } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

//import useTheme from '../hooks/useTheme';
import HomeStackNav from "./HomeStackNav";
import MapNavigator from "./MapNavigator";

const Tab = createBottomTabNavigator();
const MainBottomNav = () => {
  // const {theme} = useTheme();
  const theme = "";
  return (
    <Tab.Navigator
      initialRouteName="HomeStack"
      screenOptions={{
        tabBarStyle: theme?.tabBar,
        tabBarItemStyle: theme?.tabBarItem,
        tabBarInactiveTintColor: theme?.type === "dark" ? "white" : "black",
        tabBarActiveTintColor: theme?.type === "dark" ? "orange" : "#003af7",
      }}
    >
      <Tab.Screen
        name="HomeStackNav"
        component={HomeStackNav}
        options={{
          title: "Home",
          headerShown:false,
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="home"
              size={28}
              style={theme?.tabBarIcon}
            />
          ),
        }}
      />
      <Tab.Screen
        name="MapNavigatior"
        component={MapNavigator}
        options={{
          title: "Map",
          headerShown:false,
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="map"
              size={28}
              style={theme?.tabBarIcon}
            />
          ),
        }}
      />
      {/*
      <Tab.Screen
        name="SearchStackNav"
        
        component={SearchStackNav}
        options={{
          headerShown:false,
          title: "Search",
          tabBarIcon: () => (
            <IconSearch name="search" size={28} style={theme?.tabBarIcon} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileStackNav"
        component={ProfileStackNav}
        options={{
          title: "Profile",
          headerShown:false,
          tabBarIcon: () => (
            <IconSearch name="user" size={28} style={theme?.tabBarIcon} />
          ),
        }}
      />
    */}
    </Tab.Navigator>
  );
};

export default MainBottomNav;

const styles = StyleSheet.create({});
