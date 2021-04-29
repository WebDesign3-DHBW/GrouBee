import { getActiveGroupData } from "../firebase/getActiveGroupData";
import { useRecoilValue } from "recoil";
import { activeGroupsState } from "../utils/recoil";
import { useEffect, useState } from "react";

function usePageData(pageName) {
  const activeGroups = useRecoilValue(activeGroupsState);
  const [result, setResult] = useState();
  const [loading, setLoading] = useState(true);

  const activeGroupIDs = activeGroups.map((groupArr) => groupArr[0]);
  console.log("activeGroupIDs", activeGroupIDs);
  useEffect(() => {
    async function fetchData() {
      try {
        if (pageName === "Calendar") {
          const calendar = await getActiveGroupData(activeGroupIDs, pageName);
          const todos = await getActiveGroupData(activeGroupIDs, "ToDo");

          setResult([calendar, todos]);
        } else if (pageName) {
          const pageData = await getActiveGroupData(activeGroupIDs, pageName);
          setResult(pageData);
        } else {
          setResult([]);
        }
        setLoading(false);
      } catch (e) {
        console.error("oh fuck...", e);
        setResult([]);
        setLoading(false);
      }
    }

    fetchData();
    // eslint-disable-next-line
  }, [activeGroups, pageName]);

  return [result, loading];
}

export default usePageData;
