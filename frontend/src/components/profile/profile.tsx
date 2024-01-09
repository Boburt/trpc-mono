import React, { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { BsBuildings } from "react-icons/bs";
import ProfileUser from "./profileUser";
import { ProfileDoc } from "./profileDoc";
import { ProfileRew } from "./ProfileRew";
import { MdOutlineSettingsApplications } from "react-icons/md";
import { ProfileCol } from "./ProfileCol";
import { string } from "zod/lib";
import { ProfileForms } from "./ProfileForms";
import { FaWpforms } from "react-icons/fa";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("formi");

  const liClassActiv = "rounded-md text-purple-700 bg-indigo-200 ";
  return (
    <div className="flex">
      <nav className="mt-3">
        <ul className="menu bg-base-200 w-80 p-8 rounded-box bg-slate-200 text-lg text-purple-500 dark:bg-slate-500 dark:text-purple-200">
          <li
            onClick={() => setActiveTab("profile")}
            className={`hover:bg-indigo-300 rounded-md ${
              activeTab === "profile" ? liClassActiv : null
            }`}
          >
            <div className="flex">
              <FaRegUserCircle />
              <span className="">Профиль</span>
            </div>
          </li>
          <li
            onClick={() => setActiveTab("documents")}
            className={`hover:bg-indigo-300 rounded-md ${
              activeTab === "documents" ? liClassActiv : null
            }`}
          >
            <div>
              <MdOutlineSettingsApplications />
              <span>Мои Заявки</span>
            </div>
          </li>
          <li
            onClick={() => setActiveTab("reviews")}
            className={`hover:bg-indigo-300 rounded-md ${
              activeTab === "reviews" ? liClassActiv : null
            }`}
          >
            <div>
              <BsBuildings />
              <span>Моя Компания</span>
            </div>
          </li>
          <li
            onClick={() => setActiveTab("colleagues")}
            className={`hover:bg-indigo-300 rounded-md ${
              activeTab === "colleagues" ? liClassActiv : null
            }`}
          >
            <div>
              <FaUsers />
              <span>Мои Коллеги</span>
            </div>
          </li>
          <li
            onClick={() => setActiveTab("formi")}
            className={`hover:bg-indigo-300 rounded-md ${
              activeTab === "formi" ? liClassActiv : null
            }`}
          >
            <div>
              <FaWpforms />
              <span>Formi</span>
            </div>
          </li>
        </ul>
      </nav>
      <div className="card w-full mt-3 rounded-box bg-slate-200 ml-3 dark:bg-slate-500">
        <div className="card-body">
          {activeTab === "profile" && <ProfileUser />}
          {activeTab === "documents" && <ProfileDoc />}
          {activeTab === "reviews" && <ProfileRew />}
          {activeTab === "colleagues" && <ProfileCol />}
          {activeTab === "formi" && <ProfileForms />}
        </div>
      </div>
    </div>
  );
};

export default Profile;
