import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import GoBackButton from "../../components/GoBackButton";
import MapScreen from "../MapScreen";
import Home from "../Home";
import CommentsScreen from "../CommentsScreen";

const PostsStack = createStackNavigator();

const PostsScreen = () => {
  return (
    <PostsStack.Navigator initialRouteName="Home" backBehavior="history">
      <PostsStack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <PostsStack.Screen
        name="Комментарии"
        component={CommentsScreen}
        options={({ navigation }) => ({
          headerLeft: () => <GoBackButton navigation={navigation} />,
        })}
      />
      <PostsStack.Screen
        name="Карта"
        component={MapScreen}
        options={({ navigation }) => ({
          headerLeft: () => <GoBackButton navigation={navigation} />,
        })}
      />
    </PostsStack.Navigator>
  );
};

export default PostsScreen;
