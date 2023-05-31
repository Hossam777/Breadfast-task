import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { SplashScreen, HomeScreen, PostDetailsScreen } from '../screens';
import Post from "../models/Post";
import User from "../models/User";

export type MainStackNavigationParams = {
    SplashScreen: undefined;
    HomeScreen: undefined;
    PostDetailsScreen: {
        post: Post,
        user: User | undefined,
    };
};

const Stack = createStackNavigator<MainStackNavigationParams>();

export default () => {
    return (
        <View style={{ flex: 1 }}>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='SplashScreen'>
                    <Stack.Screen name='SplashScreen' key='SplashScreen' component={SplashScreen} />
                    <Stack.Screen name='HomeScreen' key='HomeScreen' component={HomeScreen} />
                    <Stack.Screen name='PostDetailsScreen' key='PostDetailsScreen' component={PostDetailsScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </View>
    )
}