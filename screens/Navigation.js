import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import { View, Text } from 'react-native'
import HomeScreen from './HomeScreen';
import LoginScreen from './LoginScreen';
import NewPostScreen from './NewPostScreen';
import SignUpScreen from './SignUpScreen';

const Stack = createNativeStackNavigator()

const screenOptions = {
    headerShown : false
}

export const SignedInStack = () => (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="HomeScreen" screenOptions={screenOptions}>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="NewPostScreen" component={NewPostScreen} />
        </Stack.Navigator>
    </NavigationContainer>
)

export const SignedOutStack = () => (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="LoginScreen" screenOptions={screenOptions}>
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="RegisterScreen" component={SignUpScreen} />
        </Stack.Navigator>
    </NavigationContainer>
)

