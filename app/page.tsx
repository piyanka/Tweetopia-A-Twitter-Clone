import React from "react";
import Image from "next/image";
import { FaBell, FaEarlybirds, FaHome, FaSearch, FaRobot, FaEnvelope, FaUsers, FaUser, FaCrown, FaBuilding, FaEllipsisH } from "react-icons/fa";

import { Inter } from "next/font/google";
import FeedCard from "@/components/FeedCard";
import { GoogleOAuthProvider } from "@react-oauth/google";
import LoginPage from "./loginPage";




const inter = Inter({ subsets: ["latin"] });

interface TweetopiaSidebarButton {
  title: string;
  icon: React.ReactNode;

}

const sidebarMenuItems: TweetopiaSidebarButton[] = [
  {
    title: "Home",
    icon: <FaHome />
  },
  {
    title: "Explore",
    icon: <FaSearch />
  },
  {
    title: "Notifications",
    icon: <FaBell />
  },
  {
    title: "Messages",
    icon: <FaEnvelope />
  },
  {
    title: "Flutter",
    icon: <FaRobot />
  },
  {
    title: "Communities",
    icon: <FaUsers />
  },
  {
    title: "Premium",
    icon: <FaCrown />
  },
  // {
  //   title: "Verified Orgs",
  //   icon: <FaBuilding />
  // },
  {
    title: "Profile",
    icon: <FaUser />
  },
  {
    title: "More",
    icon: <FaEllipsisH />
  },

]

export default function Home() {
  return (
    <div className={inter.className}>
      <div className="border border-gray-800  grid grid-cols-12 h-screen w-screen px-40">
        <div className="col-span-3 ">
          <div className="text-4xl h-fit w-fit hover:bg-gray-800 rounded-full p-2 cursor-pointer transition-all">
            <FaEarlybirds />
          </div>

          <div className="mt-2 text-2xl pr-4 font-semibold">
            <ul>
              {sidebarMenuItems.map((item) => (
                <li className="flex justify-start  w-fit items-center gap-6 rounded-full hover:bg-gray-800 p-2 cursor-pointer transition-all" key={item.title}>
                  <span>{item.icon}</span>
                  <span>{item.title}</span>
                </li>


              ))}

            </ul>
            <div className="mt-3">
              <button className="bg-white text-black font-semibold py-2 px-4  w-60 rounded-full  hover:bg-gray-100 border-gray-300">Post</button>
            </div>

            <div className="flex w-full items-center justify-between p-2 rounded-full hover:bg-gray-800 cursor-pointer transition-all mt-24">

              <div className="flex items-center gap-3">
                <img
                  src="https://images.pexels.com/photos/3792581/pexels-photo-3792581.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Profile"
                  className="w-10 h-10 rounded-full"
                />
                <div className="hidden md:block">
                  <p className="font-semibold text-sm">Priyanka Yadav</p>
                  <p className="text-gray-500 text-xs">@Priyank75428296</p>
                </div>
              </div>


              <FaEllipsisH className="ml-2 mr-3" />

            </div>

          </div>



        </div>

        <div className="col-span-5 border-r-[0.2px] border-l-[0.2px] h-screen overflow-scroll scrollbar-hide border-gray-800">
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />

        </div>

        <div className="col-span-5">
          <GoogleOAuthProvider clientId="1020024037932-siad11cpc4qg9lgmg6a8m77rm1ho5mva.apps.googleusercontent.com">
            <div>
              <h1>Welcome to My App</h1>
              <LoginPage />
            </div>
          </GoogleOAuthProvider>
        </div>

      </div>

    </div>

  );
}
