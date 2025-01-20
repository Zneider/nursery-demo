import { useChildren } from "../hooks/child-hooks";
import { ChildItem } from "./ChildItem";
import { useCallback, useMemo, useState } from "react";

export const ChildrenOverview = () => {
  const { data, isFetching } = useChildren();
  const [limit, setLimit] = useState(10);

  const showButton = useMemo(() => {
    if (!data?.children) {
      return false;
    }
    const len = data.children.length;

    return len === 0 ? false : len > limit + 1;
  }, [limit, data?.children]);

  const loadMoreHandler = useCallback(() => {
    if (data?.children.length) {
      setLimit((limit) =>
        limit + 10 <= data.children.length
          ? limit + 10
          : data.children.length - 1
      );
    }
  }, [data?.children, limit]);

  const visibleItems = useMemo(() => {
    if (data?.children && data.children.length > limit) {
      return data.children.slice(0, limit);
    }
    return [];
  }, [data?.children, limit, isFetching]); // isFetching is added to trigger rerun after query invalidation

  if (!data?.children.length) {
    return null;
  }

  return (
    <>
      <h1 className="text-3xl font-extrabold mb-8">Child overview</h1>
      <ul className="flex flex-col gap-y-4">
        {visibleItems.map((child) => (
          <ChildItem key={child.childId} child={child} />
        ))}
      </ul>
      {showButton && (
        <button
          className="border-solid border-gray-500 border-2 bg-gray-300 shadow-sm px-4 py-2 mt-4 rounded-md"
          onClick={loadMoreHandler}
        >
          Load More
        </button>
      )}
    </>
  );
};
