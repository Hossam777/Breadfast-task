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
import { Avatar } from 'react-native-elements';

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
    var avatarTitle = ":D";
    if(user) avatarTitle = user?.name.split(" ")[0].charAt(0) + user?.name.split(" ")[1].charAt(0);
        

    useEffect(() => {
        PostsHandlerAPI.getCommentsByPostId(post.id)
        .then(response => {
            setComments(response);
            console.log(response);
        }).catch(err => {
            
        });
    }, [])

    const PostItem = (comment: Comment) => {
        var commentAvatarTitle = comment.name.split(" ")[0].charAt(0) + comment.name.split(" ")[1].charAt(0);
            return (
                <TouchableOpacity style={styles.listItem}>
                    <View style={styles.horizontalView}>
                        <Avatar containerStyle={styles.avatar} size="small" rounded title={commentAvatarTitle} />
                        <Text style={styles.commentUsername}>{comment.name}</Text>
                    </View>
                    <Text style={styles.commentBody}>{comment.body}</Text>
                </TouchableOpacity>
            )
    }

    return(
        <View style={styles.container}>
            <View style={styles.horizontalView}>
                <Avatar containerStyle={styles.avatar} size="large" rounded title={avatarTitle} />
                <Text style={styles.username}>{!!user? user.name : "Incognito User"}</Text>
            </View>
            <Text style={styles.postTitle}>{post.title}</Text>
            <Text style={styles.postContent}>{post.body}</Text>
            <Text style={styles.header}>Posts</Text>
            <FlatList
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
        paddingHorizontal: 5,
        backgroundColor: theme.primaryColor,
    },
    horizontalView: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    avatar: {
        backgroundColor: theme.secondaryColor,
    },
    header: {
        fontSize: 25,
        color: theme.whiteColor,
        textAlign: 'center'
    },
    username: {
        color: theme.secondaryColor,
        fontSize: 20,
        marginLeft: 10,
    },
    postTitle: {
        color: theme.secondaryColor,
        marginVertical: 5,
    },
    postContent: {
        color: theme.blackColor,
    },
    listItem: {
        borderWidth: 2,
        borderRadius: 15,
        borderColor: theme.whiteColor,
        backgroundColor: theme.surfaceColor,
        marginVertical: 5,
        padding: 10,
    },
    commentUsername: {
        marginLeft: 10,
        color: theme.blackColor,
    },
    commentBody: {
        marginTop: 15,
        color: theme.blackColor,
    },
});

export default HomeScreen;