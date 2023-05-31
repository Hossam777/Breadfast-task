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
import User from "../../models/User";
import { SafeAreaView } from "react-native-safe-area-context";
import { Avatar } from 'react-native-elements';

type Props = {
    navigation: StackNavigationProp<MainStackNavigationParams, "HomeScreen">;
    fetchAllPosts: () => void;
    allPosts: Post[];
    fetchingAllPosts: Boolean;
    fetchAllUsers: () => void;
    allUsers: User[];
    fetchingAllUsers: Boolean;
}

const HomeScreen = (props: Props) => {
    const theme = useContext(ThemeContext);
    const styles = getStyles(theme);
    useEffect(() => {
        props.fetchAllUsers();
        props.fetchAllPosts();
    }, [])
    const onItemClicked = (post: Post, user: User | undefined) => {
        props.navigation.navigate('PostDetailsScreen', { "post": post, "user": user });
    }
    const PostItem = (post: Post) => {
        var user = props.allUsers.find(e => e.id == post.user_id)
        var avatarTitle = ":D";
        if(user) avatarTitle = user?.name.split(" ")[0].charAt(0) + user?.name.split(" ")[1].charAt(0);
            return (
                <TouchableOpacity style={styles.listItem} onPress={() => onItemClicked(post, user)}>
                    <View style={styles.horizontalView}>
                        <Avatar containerStyle={styles.avatar} size="large" rounded title={avatarTitle} />
                        <Text style={styles.itemUsername}>{!!user? user.name : "Incognito User"}</Text>
                    </View>
                    <Text style={styles.itemPostTitle}>{post.title}</Text>
                    <Text style={styles.itemPostContent}>{post.body}</Text>
                </TouchableOpacity>
            )
    }
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>Posts</Text>
                {
                    (!!props.allPosts.length)? (
                        <FlatList
                            style={styles.listContentContainer}
                            data={props.allPosts}
                            renderItem={(item) => PostItem(item.item)}
                            keyExtractor={(item) => item.id.toString()} 
                        />
                    ) : (
                        <Text>No Posts Found</Text>
                    )
                }
        </SafeAreaView>
    )
}

const getStyles = (theme: Theme) => StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: theme.primaryColor,
    },
    horizontalView: {
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
    listContentContainer: {
        flex: 1,
        paddingHorizontal: 5,
    },
    listItem: {
        borderWidth: 2,
        borderRadius: 15,
        borderColor: theme.whiteColor,
        marginVertical: 5,
        backgroundColor: theme.surfaceColor,
        padding: 5,
        paddingVertical: 10,
    },
    itemUsername: {
        color: theme.secondaryColor,
        fontSize: 20,
        marginLeft: 10,
    },
    itemPostTitle: {
        marginVertical: 5,
        color: theme.secondaryColor,
    },
    itemPostContent: {
        color: theme.blackColor
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