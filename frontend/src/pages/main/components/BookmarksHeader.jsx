import React, { useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";
import { useBookMarkList } from "../../../context/bookmarkList";

export default function BookmarksHeader() {
  const [query, setQuery] = useState("");

  const delayedQuery = useCallback(debounce(updateBookmarkList, 800), [query]);

  const { fetchBookmarks } = useBookMarkList();

  useEffect(() => {
    if (query !== "") delayedQuery();
    return delayedQuery.cancel;
  }, [delayedQuery, query]);

  function updateBookmarkList() {
    fetchBookmarks(0, 10, query);
  }

  function inputHandler(e) {
    setQuery(e.target.value);
  }

  return (
    <div className="flex gap-3">
      <input
        className="py-2 px-4 flex-1 border rounded focus:outline-none focus:ring-cyan-600 focus:ring bg-transparent dark:text-white"
        type={"search"}
        placeholder={"Search"}
        value={query}
        onChange={inputHandler}
      ></input>
    </div>
  );
}
