import React from "react";
import Image from "next/image";
import { FaRegComment, FaRetweet, FaRegHeart, FaRegBookmark } from "react-icons/fa";
import { IoMdShareAlt } from "react-icons/io";
import { BsThreeDots } from "react-icons/bs";
import { FiMoreHorizontal, FiMoreVertical } from "react-icons/fi";

const FeedCard: React.FC = () => {
    return (
        <div className="border border-l-0 border-r-0 border-b-0 border-gray-800 p-5 mb-4 w-85">
            <div className="grid grid-cols-12 gap-3 items-start">
                {/* Profile Picture */}
                <div className="col-span-1 flex items-center justify-center">
                    <Image
                        src="https://avatars.githubusercontent.com/u/112321667?v=4"
                        alt="user-image"
                        height={50}
                        width={50}
                        className="rounded-full"
                    />
                </div>

                {/* Content Section */}
                <div className="col-span-11">
                    {/* User Info */}
                    <div className="flex items-center gap-2">
                        <span className="font-bold text-white-800">Priyanka Yadav</span>
                        <span className="text-sm text-gray-500">@Priyank75428296</span>
                        <span className="text-sm text-gray-400">· 2h</span>
                        
                        
                        {/* More Icon */}
                        <FiMoreVertical className="text-gray-500 hover:text-gray-800 cursor-pointer  ml-24" />
                        {/* Dropdown for "More" */}
                        {/* <div className="absolute hidden group-hover:block top-6 right-0 bg-white border border-gray-300 shadow-lg rounded-lg py-2 w-48 z-10">
                            <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-gray-700">
                                Mute User
                            </button>
                            <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-gray-700">
                                Report Post
                            </button>
                            <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-gray-700">
                                Block User
                            </button>
                        </div> */}
                    </div>

                    {/* Tweet Content */}
                    <p className="mt-2 text-white-500">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident expedita iure consectetur id fugiat possimus nemo aliquid laborum, inventore atque natus quibusdam in nobis minus quasi. Numquam, nobis! Corporis, est.
                    </p>
                    {/* Action Buttons */}
                    <div className="flex justify-between mt-4 text-gray-500 text-sm">
                        {/* Reply */}
                        <button className="flex items-center space-x-1 hover:text-blue-500 cursor-pointer transition-all">
                            <FaRegComment />
                            <span>15k</span>
                        </button>

                        {/* Repost */}
                        <button className="flex items-center space-x-1 hover:text-green-500 cursor-pointer transition-all">
                            <FaRetweet />
                            <span>30k</span>
                        </button>

                        {/* Like */}
                        <button className="flex items-center space-x-1 hover:text-red-500 cursor-pointer transition-all">
                            <FaRegHeart />
                            <span>1.1M</span>
                        </button>

                        {/* Views */}
                        <button className="flex items-center space-x-1 hover:text-gray-700 cursor-pointer transition-all">
                            <span>1.2K</span>
                        </button>

                        {/* Bookmark */}
                        <button className="flex items-center hover:text-yellow-500 cursor-pointer transition-all" aria-label="Open menu">
                            <FaRegBookmark />
                            {/* <span>Bookmark</span> */}
                        </button>

                        {/* Share */}
                        <button className="flex items-center  hover:text-gray-700 cursor-pointer transition-all" aria-label="Open menu">
                            <IoMdShareAlt />
                            {/* <span>Share</span> */}
                        </button>

                        {/* More
                        <button className="flex items-center space-x-1 hover:text-gray-700 cursor-pointer transition-all">
                            <BsThreeDots />
                            <span>More</span>
                        </button> */}
                    </div>
                </div>
            </div>
        </div>

    );
};

export default FeedCard;
