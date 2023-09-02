import React from "react";
import { UserIcon } from "@heroicons/react/solid";

function Comment(props) {
  let { email, comment } = props;
  return (
    <div className="mx-auto w-[100%] md:w-fit-content  max-w-md rounded-2xl bg-white p-2 mb-7">
      <div className="flex md:w-[400px] w-[100%] items-center gap-4 rounded-lg bg-emerald-400 text-left  pl-3 py-2 md:text-lg text-sm font-medium text-zinc-900 focus:outline-none focus-visible:ring  focus-visible:ring-opacity-75">
        <UserIcon className="h-6" />
        <p>{email}</p>
      </div>
      <div className="px-4 pt-4 pb-2 text-sm text-gray-500">{comment}</div>
    </div>
  );
}

export default Comment;
