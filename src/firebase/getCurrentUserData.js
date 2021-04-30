import { getCurrentUser } from "./getCurrentUser";
import { getUserInfo } from "./getUserData";

export const getCurrentUserData = async () => {
  const currentUser = getCurrentUser();
  if (!currentUser) return null;
  return await getUserInfo(currentUser.id);
};
