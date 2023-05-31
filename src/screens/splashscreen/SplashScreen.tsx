import React, { useContext } from "react";
import { Image, StyleSheet, Text, View } from 'react-native';
import { MainStackNavigationParams } from "../../navigation/MainStackNavigation";
import { StackNavigationProp } from "@react-navigation/stack";
import ThemeContext from "../../theme/ThemeContext";
import Theme from "../../models/Theme";

type Props = {
    navigation: StackNavigationProp<MainStackNavigationParams, "SplashScreen">
}

const SplashScreen = (props: Props) => {
    const theme = useContext(ThemeContext);
    const styles = getStyles(theme);
    setTimeout(() => {
        //go to home screen
        //props.navigation.replace("HomeScreen")
        console.log("navigated")
    }, 2500);
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Breadfast Task</Text>
            <Image
            style={styles.gif}
            source={require('../../assets/images/owl.gif')}
          />
        </View>
    )
}

const getStyles = (theme: Theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.primaryColor,
        flexDirection: 'column',
        alignItems: 'center'
    },
    title: {
        color: theme.blackColor,
        fontSize: 30,
        marginVertical: 50,
    },
    gif: {
        width: '80%',
        height: 200,
        marginTop: 100,
    }
});

export default SplashScreen;