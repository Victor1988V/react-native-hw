import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TouchableOpacity, View } from "react-native";

import { GoBackButton } from "../components/GoBackButton";
import { LogoutButton } from "../components/LogoutButton";
import { PlusTabSvg } from "../assets/svg/PlusTabSvg";
import { PostTabSvg } from "../assets/svg/PostTabSvg";
import { ProfileTabSvg } from "../assets/svg/ProfileTabSvg";

import { DeleteButton } from "../components/DeleteButton";
import PostsScreen from "../screens/posts/PostsScreen";
import CreatePostsScreen from "../screens/posts/CreatePostsScreen";
import ProfileScreen from "../screens/posts/ProfileScreen";

const PostsTab = createBottomTabNavigator();

const PostsTabNavigation = () => {
  return (
    <PostsTab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: [
          {
            display: "flex",
          },
          null,
        ],
      }}
    >
      <PostsTab.Screen
        name="Публикации"
        component={PostsScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => <PostTabSvg />,
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 17,
            fontWeight: 500,
          },
          headerRight: () => <LogoutButton />,
        }}
      />
      <PostsTab.Screen
        name="Создать публикацию"
        component={CreatePostsTabNavigation}
        options={({ navigation }) => ({
          tabBarIcon: ({ focused, color, size }) => (
            <View style={{ alignItems: "center" }}>
              <View
                style={{
                  backgroundColor: "#FF6C00",
                  width: 70,
                  height: 40,
                  borderRadius: 20,
                  position: "absolute",
                  bottom: -13,
                }}
              />
              <PlusTabSvg />
            </View>
          ),
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 17,
            fontWeight: 500,
          },
          headerLeft: () => <GoBackButton navigation={navigation} />,
          tabBarStyle: { display: "none" },
        })}
      />

      <PostsTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => <ProfileTabSvg />,
        }}
      />
    </PostsTab.Navigator>
  );
};

const CreatePostsTab = createBottomTabNavigator();

const CreatePostsTabNavigation = () => {
  const handleDeletePost = () => {};

  return (
    <CreatePostsTab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: [
          {
            display: "flex",
          },
          null,
        ],
      }}
    >
      <CreatePostsTab.Screen
        name="Новая публикация"
        component={CreatePostsScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TouchableOpacity style={{ alignItems: "center" }}>
              <View
                style={{
                  backgroundColor: "#F6F6F6",
                  width: 70,
                  height: 40,
                  borderRadius: 20,
                  position: "absolute",
                  bottom: -9,
                }}
              />
              <DeleteButton onPress={handleDeletePost} />
            </TouchableOpacity>
          ),
          headerShown: false,
        }}
      />
    </CreatePostsTab.Navigator>
  );
};

export { PostsTabNavigation, CreatePostsTabNavigation };
