import { getCurrentUser } from "./getCurrentUser";
import { getUserData } from "./getUserData";

export const getCurrentUserData = async () => {
  const currentUser = getCurrentUser();
  if (!currentUser) return null;
  return await getUserData(currentUser.id);
};
