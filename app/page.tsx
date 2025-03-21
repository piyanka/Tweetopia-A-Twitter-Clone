"use client";
import React, { useCallback } from "react";
import Image from "next/image";
import { FaBell, FaEarlybirds, FaHome, FaSearch, FaRobot, FaEnvelope, FaUsers, FaUser, FaCrown, FaBuilding, FaEllipsisH } from "react-icons/fa";

import { Inter } from "next/font/google";
import FeedCard from "@/components/FeedCard";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useCurrentUser } from "@/hooks/user";
import toast from "react-hot-toast";
import GoogleAuth from "@/components/GoogleAuth";
import { BiImageAlt } from "react-icons/bi";




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
  const { user } = useCurrentUser();
  
  const handleSelectImage = useCallback(()=> {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
  }, []);

 
  return (
    <div className={inter.className}>
      <div className="border border-gray-800  grid grid-cols-12 h-screen w-screen px-40">
        <div className="col-span-3 ">
          <div className="text-4xl h-fit w-fit hover:bg-gray-800 rounded-full p-2 cursor-pointer transition-all">
            <FaEarlybirds />
          </div>

          <div className="mt-2 text-xl pr-4 font-semibold">
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

            {user && (
              <div className="absolute bottom-5 flex gap-2 items-center bg-slate-800 px-3 py-2 rounded-full">
                {user && user.profileImageURL && (<Image className="rounded-full" src={user?.profileImageURL} alt="user-image" height={50} width={50} />)}
                <div>
                  <h3 className="text-xl">
                    {user.firstName} {user.lastName}
                  </h3>
                </div>
              </div>
            )}

          </div>



        </div>

        <div className="col-span-5 border-r-[0.2px] border-l-[0.2px] h-screen overflow-scroll scrollbar-hide border-gray-800">
          <div>
            <div className="border border-r-0 border-l-0 border-fray-600 p-5 hover:bg-slate-900 transition-all cursor-pointer">
              <div className="grid grid-cols-12 gap-3">
                <div className="col-span-1">
                  {user?.profileImageURL && (
                    <Image
                      className="rounded-full"
                      src={user?.profileImageURL}
                      alt="user-image"
                      height={50}
                      width={50} />
                  )}
                </div>
                <div className="col-span-11">
                  <textarea className="w-full bg-transparent text-xl px-3 border-slate-700"
                    placeholder="What's happening?"
                    rows={4}>
                    </textarea>
                  <div className="mt-2 flex justify-between items-center">
                    <BiImageAlt onClick={handleSelectImage} className="text-xl"/>
                    <button className="bg-[#1d9bf0] font-semibold text-sm py-2 px-4 rounded-full">Tweet</button>
                  </div>
                </div>
              </div>

            </div>
          </div>
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />

        </div>

        <div className="col-span-4">
          {!user && (<div className="p-5 border border-gray-800 rounded-lg flex flex-col items-center justify-center">
            <div className="m-4 text-center">
              <h1 className="my-2 text-2xl">New to My App?</h1>
              <div>
                <GoogleAuth />
              </div>
            </div>
          </div>)}


        </div>

      </div>

    </div>

  );
}
