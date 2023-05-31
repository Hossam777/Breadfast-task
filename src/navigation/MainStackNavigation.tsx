import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { SplashScreen, HomeScreen } from '../screens';

export type MainStackNavigationParams = {
    SplashScreen: undefined;
    HomeScreen: undefined;
};

const Stack = createStackNavigator<MainStackNavigationParams>();

export default () => {
    return (
        <View style={{ flex: 1 }}>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='SplashScreen'>
                    <Stack.Screen name='SplashScreen' key='SplashScreen' component={SplashScreen} />
                    <Stack.Screen name='HomeScreen' key='HomeScreen' component={HomeScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </View>
    )
}