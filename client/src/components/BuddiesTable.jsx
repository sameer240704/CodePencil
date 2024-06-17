import React from "react";
import { SearchBar } from "../components";

const BuddiesTable = ({ title }) => {
  return (
    <div className="rounded-lg shadow-md border-2 overflow-hidden">
      <div className="h-16 flex items-center justify-between px-5">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <SearchBar />
      </div>
      <div className="grid grid-cols-[2.5fr_2fr_0.5fr] text-xl px-8 py-4 gap-4 bg-[#666666] mb-4 text-white font-bold">
        <div>Coder</div>
        <div>Title</div>
        <div>Points</div>
      </div>
    </div>
  );
};

export default BuddiesTable;
