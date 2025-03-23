import React from "react";
import Image from "next/image";
import { FaRegComment, FaRetweet, FaRegHeart, FaRegBookmark } from "react-icons/fa";
import { IoMdShareAlt } from "react-icons/io";
import { BsThreeDots } from "react-icons/bs";
import { FiMoreHorizontal, FiMoreVertical } from "react-icons/fi";
import { Tweet } from "@/gql/graphql";
import Link from "next/link";

interface FeedCardProps {
    data: Tweet
}

const FeedCard: React.FC<FeedCardProps> = (props) => {
    const { data } = props
    return (
        <div className="border border-l-0 border-r-0 border-b-0 border-gray-800 p-5 mb-4 w-85">
            <div className="grid grid-cols-12 gap-3 items-start">
                {/* Profile Picture */}
                <div className="col-span-1 flex items-center justify-center">
                    {data.author?.profileImageURL && <Image
                        src={data.author.profileImageURL}
                        alt="user-image"
                        height={50}
                        width={50}
                        className="rounded-full"
                    />}
                </div>

                {/* Content Section */}
                <div className="col-span-11">
                    {/* User Info */}
                    <h5><Link href={`/profile/${data.author?.id}`}>{data.author?.firstName} {data.author?.lastName}</Link></h5>

                    {/* Tweet Content */}
                    <p>{data.content}</p>

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


                    </div>

                </div>
            </div>
        </div>

    );
};

export default FeedCard;
