import { useEffect, useState } from "react";
import { getCurrentUserData } from "../firebase/getCurrentUserData";

export function useCurrentUser(triggerUpdate) {
  const [userData, setUserData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      const currentUserData = await getCurrentUserData();
      setUserData(currentUserData);
      setIsLoading(false);
    };

    loadUserData();
  }, [triggerUpdate]);

  return [userData, isLoading];
}
