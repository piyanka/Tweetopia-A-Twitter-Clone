"use client";
import React, { useMemo } from "react";
import { FaBell, FaCrown, FaEarlybirds, FaEllipsisH, FaEnvelope, FaHome, FaSearch, FaUser, FaUsers } from "react-icons/fa";
import { FaRobot } from "react-icons/fa6";
import Image from "next/image";

import { useCurrentUser } from "@/hooks/user";
import GoogleAuth from "../GoogleAuth";
import Link from "next/link";

interface TwitterlayoutProps {
    children: React.ReactNode;
}
interface TweetopiaSidebarButton {
    title: string;
    icon: React.ReactNode;
    link: string

}

const Twitterlayout: React.FC<TwitterlayoutProps> = (props) => {
    const { user } = useCurrentUser();

    const sidebarMenuItems: TweetopiaSidebarButton[] = useMemo(() => [
        {
            title: "Home",
            icon: <FaHome />,
            link: `/`
        },
        {
            title: "Explore",
            icon: <FaSearch />,
            link: `/`
        },
        {
            title: "Notifications",
            icon: <FaBell />,
            link: `/`
        },
        {
            title: "Messages",
            icon: <FaEnvelope />,
            link: `/`
        },
        {
            title: "Flutter",
            icon: <FaRobot />,
            link: `/`
        },
        {
            title: "Communities",
            icon: <FaUsers />,
            link: `/`
        },
        {
            title: "Premium",
            icon: <FaCrown />,
            link: `/`
        },

        {
            title: "Profile",
            icon: <FaUser />,
            link: `/profile/${user?.id}`
        },
        {
            title: "More",
            icon: <FaEllipsisH />,
            link: `/`
        },

    ], [user?.id]);

    return (
        <div>
            <div className="border border-gray-800  grid grid-cols-12 h-screen w-screen px-40">
                <div className="col-span-3 pr-1 flex justify-end relative ">
                    <div>
                        <div className="text-4xl h-fit w-fit hover:bg-gray-800 rounded-full p-2 cursor-pointer transition-all">
                            <FaEarlybirds />
                        </div>

                        <div className="mt-2 text-xl pr-4 font-semibold">
                            <ul>
                                {sidebarMenuItems.map((item) => (
                                    <li key={item.title}>
                                        <Link className="flex justify-start  w-fit items-center gap-6 rounded-full hover:bg-gray-800 p-2 cursor-pointer transition-all" href={item.link}>
                                            <span>{item.icon}</span>
                                            <span>{item.title}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-3">
                                <button className="bg-white text-black font-semibold py-2 px-4  w-60 rounded-full  hover:bg-gray-100 border-gray-300">Post</button>
                            </div>
                        </div>
                    </div>
                    {user && (
                        <div className="absolute bottom-5 flex gap-2 items-center bg-slate-800 px-3 py-2 rounded-full">
                            {user && user.profileImageURL && (
                                <Image
                                    className="rounded-full"
                                    src={user?.profileImageURL}
                                    alt="user-image"
                                    height={50}
                                    width={50}
                                />)}
                            <div>
                                <h3 className="text-xl">
                                    {user.firstName} {user.lastName}
                                </h3>
                            </div>
                        </div>
                    )}

                </div>

                <div className="col-span-5 border-r-[0.2px] border-l-[0.2px] h-screen overflow-scroll scrollbar-hide border-gray-800">
                    {props.children}
                </div>

                <div className="col-span-4">
                    {!user ? (<div className="p-5 border border-gray-800 rounded-lg flex flex-col items-center justify-center">
                        <div className="m-4 text-center">
                            <h1 className="my-2 text-2xl">New to My App?</h1>
                            <div>
                                <GoogleAuth />
                            </div>
                        </div>
                    </div>
                    ) : (
                        <div className="px-4 py-3 bg-slate-800 rounded-lg">
                            <h1 className="my-2 text-2xl mb-5">Users you may know</h1>
                            {
                                user?.recommendedUsers?.map((el) => (
                                    <div className="flex items-center gap-3 mt-2" key={el?.id}>
                                        {el?.profileImageURL && (
                                            <Image
                                                src={el.profileImageURL}
                                                alt="user-image"
                                                className="rounded-full"
                                                width={60}
                                                height={60}
                                            />
                                        )}
                                        <div>
                                            <div className="text-lg ">
                                                {el?.firstName} {el?.lastName}
                                            </div>
                                            <Link href={`/profile/${el?.id}`} className="bg-white text-black text-sm px-5 py-1 rounded-lg ">View</Link>
                                        </div>
                                    </div>
                                ))}


                        </div>
                    )




                    }</div>
            </div>
        </div>


    )
};

export default Twitterlayout;