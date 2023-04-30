import AuthStackNavigation from "./navigation/AuthStackNavigation";
import { PostsTabNavigation } from "./navigation/PostsTabNavigation";

export const useRoute = (isAuth) => {
  if (!isAuth) {
    return <AuthStackNavigation />;
  }
  return <PostsTabNavigation />;
};
