import React, { useState } from "react";
import { Dopalnitel } from "./user/Dopolnitel";
import { Osnavnoy } from "./user/Osnavnoy";
import { DiFsharp } from "react-icons/di";
import { DiBrackets } from "react-icons/di";

const ProfileUser = () => {
  const [activeTab, SetActiveTab] = useState("osnavnoy");

  const liButton =
    "flex w-64 rounded-t-lg border hover:border-indigo-500/50 cursor-pointer bg-slate-500 p-2";
  return (
    <div>
      <h1>ProfileUSER</h1>
      <div>
        <nav>
          <ul className="flex ">
            <li
              className={`${liButton} ${
                activeTab === "osnavnoy" ? "bg-blue-500" : null
              }`}
              onClick={() => SetActiveTab("osnavnoy")}
            >
              <DiFsharp className="my-2" />
              <span className="m-1">Osnavnoy</span>
            </li>
            <li
              className={`${liButton} ${
                activeTab === "dopolnitel" ? "bg-blue-500" : null
              }`}
              onClick={() => SetActiveTab("dopolnitel")}
            >
              <DiBrackets className="my-2" />
              <span className="m-1">Dopalnitel</span>
            </li>
          </ul>
        </nav>
        <div>
          {activeTab === "osnavnoy" && <Osnavnoy />}
          {activeTab === "dopolnitel" && <Dopalnitel />}
        </div>
      </div>
    </div>
  );
};

export default ProfileUser;
