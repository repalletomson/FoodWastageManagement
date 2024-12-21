import { Tabs } from "expo-router";
import { Image, View, Text, StyleSheet, ImageSourcePropType } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import React from 'react';
import { icons } from "../../../constans";

const TabIcon = ({
  source,
  focused,
  label,
}: {
  source: ImageSourcePropType;
  focused: boolean;
  label: string;
}) => (
  <View style={styles.iconContainer}>
    <Image
      source={source}
      style={[
        styles.icon,
        { tintColor: focused ? styles.primaryColor.color : styles.secondaryColor.color }
      ]}
      resizeMode="contain"
    />
    <Text 
      style={[
        styles.label,
        { color: focused ? styles.primaryColor.color : styles.secondaryColor.color }
      ]}
    >
      {label}
    </Text>
  </View>
);

const PlusTabIcon = ({ focused }: { focused: boolean }) => (
  <View style={styles.iconContainer}>
    <View
      style={[
        styles.plusIconContainer,
        { backgroundColor: focused ? styles.primaryColor.color : styles.secondaryColor.color }
      ]}
    >
      <Image
        source={require("../../../assets/icons/plus.png")}
        style={styles.icon}
        tintColor="white"
        resizeMode="contain"
      />
    </View>
    <Text 
      style={[
        styles.label,
        { color: focused ? styles.primaryColor.color : styles.secondaryColor.color }
      ]}
    >
      Create
    </Text>
  </View>
);

export default function Layout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#FC8019",
        tabBarInactiveTintColor: "#9CA3AF",
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: 'white',
          height: 60 + insets.bottom,
          paddingBottom: insets.bottom,
          paddingTop: 8,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 3,
          borderTopWidth: 1,
          borderTopColor: '#F3F4F6',
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <TabIcon source={icons.home} focused={focused} label="Home" />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: "Chat",
          tabBarIcon: ({ focused }) => (
            <TabIcon source={icons.chat} focused={focused} label="Chat" />
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: "Create",
          tabBarIcon: ({ focused }) => <PlusTabIcon focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="notification"
        options={{
          title: "Notifications",
          tabBarIcon: ({ focused }) => (
            <TabIcon source={icons.notification} focused={focused} label="Notifications" />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <TabIcon source={icons.profile} focused={focused} label="Profile" />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 24,
    height: 24,
  },
  label: {
    fontSize: 12,
    marginTop: 4,
  },
  plusIconContainer: {
    borderRadius: 24,
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryColor: {
    color: "#FC8019",
  },
  secondaryColor: {
    color: "#9CA3AF",
  },
});