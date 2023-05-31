import React, { useContext, useEffect } from "react";
import { Image, StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { MainStackNavigationParams } from "../../navigation/MainStackNavigation";
import { StackNavigationProp } from "@react-navigation/stack";
import ThemeContext from "../../theme/ThemeContext";
import Theme from "../../models/Theme";
import Post from "../../models/Post";
import { connect } from "react-redux";
import { ReduxState } from "../../reduxstore/store";
import { postsActions } from "../../reduxstore/posts/actions";
import PostsHandlerAPI from "../../data/apis/PostsHandlerAPI";
import User from "../../models/User";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {
    navigation: StackNavigationProp<MainStackNavigationParams, "HomeScreen">;
    fetchAllPosts: () => void;
    allPosts: Post[];
    fetchingAllPosts: Boolean;
    fetchAllUsers: () => void;
    allUsers: User[];
    fetchingAllUsers: Boolean;
}

//
//<Text style={styles.itemUserEmail}>{props.allUsers.find(e => e.id == post.user_id)?.email}</Text>
//<Text style={styles.itemUsername}>{props.allUsers.find(e => e.id == post.user_id)?.name}</Text>
//
const HomeScreen = (props: Props) => {
    const theme = useContext(ThemeContext);
    const styles = getStyles(theme);
    useEffect(() => {
        props.fetchAllUsers();
        props.fetchAllPosts();
    }, [])
    const onItemClicked = (post: Post) => {
        //navigate to post screen
    }
    const PostItem = (post: Post) => {
            return (
                <TouchableOpacity style={styles.listItem} onPress={() => onItemClicked(post)}>
                    <Text style={styles.itemUserEmail}>{props.allUsers.find(e => e.id == post.user_id)?.email}</Text>
                    <Text style={styles.itemUsername}>{props.allUsers.find(e => e.id == post.user_id)?.name}</Text>
                    <Text style={styles.itemPostTitle}>{post.title}</Text>
                    <Text style={styles.itemPostContent}>{post.body}</Text>
                </TouchableOpacity>
            )
    }
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>Posts</Text>
                <FlatList
                style={styles.listContentContainer}
                data={props.allPosts}
                renderItem={(item) => PostItem(item.item)}
                keyExtractor={(item) => item.id.toString()} 
            />
        </SafeAreaView>
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
    listContentContainer: {
        flex: 1,
    },
    listItem: {
        borderWidth: 2,
        borderColor: theme.whiteColor,
        marginVertical: 5,
        backgroundColor: theme.primaryColor,
        padding: 5,
    },
    itemUserEmail: {
        color: theme.blackColor,
        fontSize: 15,
    },
    itemUsername: {
        color: theme.blackColor,
        fontSize: 13,
    },
    itemPostTitle: {
        marginVertical: 5,
    },
    itemPostContent: {
        
    }
});

const mapStateToProps = (state: ReduxState) => {
    return {
        fetchingAllPosts: state.postsState.fetchingAllPosts,
        allPosts: state.postsState.posts,
        fetchingAllUsers: state.postsState.fetchingAllUsers,
        allUsers: state.postsState.users,
    };
};

const mapDispatchToProps = {
    fetchAllPosts: postsActions.fetchAllPosts,
    fetchAllUsers: postsActions.fetchAllUsers,
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);