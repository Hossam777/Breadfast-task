import { StackNavigationProp } from "@react-navigation/stack";
import React, { useContext, useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MainStackNavigationParams } from "../../navigation/MainStackNavigation";
import Post from "../../models/Post";
import User from "../../models/User";
import { RouteProp } from '@react-navigation/native';
import Theme from "../../models/Theme";
import ThemeContext from "../../theme/ThemeContext";
import PostsHandlerAPI from "../../data/apis/PostsHandlerAPI";
import Comment from "../../models/Comment";

type Props = {
    route: RouteProp<MainStackNavigationParams, 'PostDetailsScreen'>;
    navigation: StackNavigationProp<MainStackNavigationParams, "HomeScreen">;
}

const HomeScreen = (props: Props) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const theme = useContext(ThemeContext);
    const styles = getStyles(theme);
    const user = props.route.params.user;
    const post = props.route.params.post;

    useEffect(() => {
        PostsHandlerAPI.getCommentsByPostId(post.id)
        .then(response => {
            setComments(response);
            console.log(response);
        });
    }, [])

    const PostItem = (comment: Comment) => {
            return (
                <TouchableOpacity style={styles.listItem}>
                    <Text style={styles.eommentUsername}>{comment.name}</Text>
                    <Text style={styles.commentBody}>{comment.body}</Text>
                </TouchableOpacity>
            )
    }

    return(
        <View style={styles.container}>
            <Text style={styles.email}>{user?.email}</Text>
            <Text style={styles.username}>{user?.name}</Text>
            <Text style={styles.postTitle}>{post.title}</Text>
            <Text style={styles.postContent}>{post.body}</Text>
            <Text style={styles.header}>Posts</Text>
                <FlatList
                style={styles.listItem}
                data={comments}
                renderItem={(item) => PostItem(item.item)}
                keyExtractor={(item) => item.id.toString()} 
            />
        </View>
    )
}

const getStyles = (theme: Theme) => StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    header: {
        fontSize: 25,
        color: theme.blackColor,
        textAlign: 'center'
    },
    email: {
        color: theme.blackColor,
        fontSize: 15,
    },
    username: {
        color: theme.blackColor,
        fontSize: 13,
    },
    postTitle: {
        marginVertical: 5,
    },
    postContent: {

    },
    listItem: {
        borderWidth: 2,
        borderColor: theme.whiteColor,
        marginVertical: 5,
        backgroundColor: theme.primaryColor,
        padding: 5,
    },
    eommentUsername: {

    },
    commentBody: {

    },
});

export default HomeScreen;