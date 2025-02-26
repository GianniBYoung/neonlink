import { DownloadIcon } from "@heroicons/react/outline";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import { postJSON } from "../../helpers/fetch";

export default function IconInput({ url, icon, setIcon }) {
  const [defaultIconUrl, setDefaultIconUrl] = useState();
  const { id } = useParams();
  async function fetchIcon() {
    const res = await postJSON("/api/utils/urlinfo", { url });
    const json = await res.json();
    setIcon(json.icon);
  }

  useEffect(() => {
    if (icon === undefined || icon === "") {
      setDefaultIconUrl(
        `${
          process.env.NODE_ENV === "production" ? "" : "http://localhost:3333"
        }/api/bookmarks/${id}/icon`
      );
    } else {
      setDefaultIconUrl();
    }
  }, [icon, id]);

  return (
    <div className="flex gap-1 items-center w-full bg-transparent rounded border">
      <div
        style={{ backgroundImage: `url(${defaultIconUrl || icon})` }}
        className="w-6 h-6 bg-cover flex-none m-1"
      ></div>
      <DownloadIcon
        onClick={fetchIcon}
        className="h-8 w-8 p-1 flex-none cursor-pointer rounded hover:bg-black/10 dark:hover:bg-white/10"
      />

      <input
        type={"text"}
        onChange={(e) => setIcon(e.target.value)}
        value={icon}
        className="pr-4 pl-1 py-2 w-full bg-transparent"
      ></input>
    </div>
  );
}
