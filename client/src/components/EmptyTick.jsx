import React from "react";

const EmptyTickIcon = () => {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="tick"
        width="24"
        height="24"
        viewBox="0 0 24 24">
        <path d="M16 0v2h-8v-2h8zm-16 16h2v-8h-2v8zm16 8v-2h-8v2h8zm2-22h1c1.654 0 3 1.346 3 3v1h2v-1c0-2.761-2.238-5-5-5h-1v2zm-12 20h-1c-1.654 0-3-1.346-3-3v-1h-2v1c0 2.761 2.238 5 5 5h1v-2zm16-4v1c0 1.654-1.346 3-3 3h-1v2h1c2.762 0 5-2.239 5-5v-1h-2zm2-10h-2v8h2v-8zm-22-2v-1c0-1.654 1.346-3 3-3h1v-2h-1c-2.762 0-5 2.239-5 5v1h2z" />
      </svg>
    </div>
  );
};

export default EmptyTickIcon;
