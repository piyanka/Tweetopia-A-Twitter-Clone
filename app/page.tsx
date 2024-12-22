import React from "react";
import Image from "next/image";
import { FaBell, FaEarlybirds, FaHome, FaSearch, FaRobot, FaEnvelope, FaUsers, FaUser, FaCrown, FaBuilding, FaEllipsisH, FaEllipsisV } from "react-icons/fa";
// import {GoHomeFill } from "react-icons/go";
// import {IoSearchOutline, IoNotifications, IoPeopleSharp, IoPerson} from "react-icons/io5";
// import {TiMessages} from "react-icons/ti";
// import {TbMessageChatbot} from "react-icons/tb";
// import {MdWorkspacePremium, MdOutlineManageAccounts} from "react-icons/md";
// import {CgOrganisation, CgMoreO} from "react-icons/cg";
// import {BsPostcardFill} from "react-icons/bs";
import { Inter } from "next/font/google";
// import { FaEllipsis } from "react-icons/fa6";
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
  {
    title: "Verified Orgs",
    icon: <FaBuilding />
  },
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
      <div className="grid grid-cols-12 h-screen w-screen px-40">
        <div className="col-span-3 ">
          <div className="text-4xl h-fit w-fit hover:bg-gray-800 rounded-full p-2 cursor-pointer transition-all">
            <FaEarlybirds />
          </div>

          <div className="mt-2 text-2xl ">
            <ul>
              {sidebarMenuItems.map((item) => (
                <li className="flex justify-start  w-fit items-center gap-6 rounded-full hover:bg-gray-800 p-2 cursor-pointer transition-all" key={item.title}>
                  <span>{item.icon}</span>
                  <span>{item.title}</span>
                </li>


              ))}

            </ul>
            <button className="bg-white text-black font-semibold py-2 px-4  w-60 rounded-full  hover:bg-gray-100 border-gray-300 mt-2">Post</button>

            <div className="flex w-61 items-center justify-between p-2 rounded-full hover:bg-gray-800 cursor-pointer transition-all mt-20">
              {/* Profile Picture */}
              <div className="flex items-center gap-3">
                <img
                  src="https://images.pexels.com/photos/3792581/pexels-photo-3792581.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" // Replace with the user's profile picture URL
                  alt="Profile"
                  className="w-10 h-10 rounded-full"
                />
                <div className="hidden md:block">
                  {/* Username */}
                  <p className="font-semibold text-sm">Priyanka Yadav</p>
                  {/* Handle */}
                  <p className="text-gray-500 text-xs">@Priyank75428296</p>
                </div>
              </div>

              {/* More Options */}
              <FaEllipsisV className="ml-2" />

            </div>

          </div>



        </div>
        <div className="col-span-6 border-r-[0.2px] border-l-[0.2px] border-gray-800"></div>
        <div className="col-span-3 "></div>
      </div>
    </div>

  );
}
