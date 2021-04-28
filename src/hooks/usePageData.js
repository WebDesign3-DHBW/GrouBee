import { getActiveGroupData } from "../firebase/getActiveGroupData";
import { useRecoilValue } from "recoil";
import { activeGroupsState } from "../utils/recoil";
import { useEffect, useState } from "react";

function usePageData(pageName) {
  const activeGroups = useRecoilValue(activeGroupsState);
  const [result, setResult] = useState();
  const [loading, setLoading] = useState(true);

  const activeGroupIDs = activeGroups.map((groupArr) => groupArr[0]);

  useEffect(() => {
    async function fetchData() {
      try {
        if (pageName) {
          const pageData = await getActiveGroupData(activeGroupIDs, pageName);
          console.log("pageData fetched", pageData);
          setResult(pageData);
        } else if (pageName === "Calendar") {
          const calendar = await getActiveGroupData(activeGroupIDs, pageName);
          const todos = await getActiveGroupData(activeGroupIDs, "ToDo");
          console.log("calendar fetched", calendar);
          console.log("todos fetched", todos);
          setResult([calendar, todos]);
        } else {
          setResult([]);
        }
        setLoading(false);
      } catch (e) {
        console.log("oh fuck...", e);
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
