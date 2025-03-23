"use client";
import FeedCard from "@/components/FeedCard";
import Twitterlayout from "@/components/Layout/TwitterLayout";
import { Tweet } from "@/gql/graphql";
import { useCurrentUser } from "@/hooks/user";
import type { NextPage } from "next";
import Image from "next/image";
import { BsArrowLeftShort } from "react-icons/bs";

const UserProfilePage: NextPage = () => {
    const { user } = useCurrentUser();

    return (
        <div>
            <Twitterlayout>
                <div>
                    <nav className="flex items-center gap-3 py-3 px-3 ">
                        <BsArrowLeftShort  className="texxt-4xl"/>
                        <div>
                            <h1 className="text-2xl font-bold">Priyanka Yadav</h1>
                            <h1 className="text-md font-bold text-slate-500">100 Tweets</h1>
                        </div>
                    </nav>
                    <div className="p-4 border-b border-slate-800">
                        {user?.profileImageURL && (
                            <Image
                                src={user.profileImageURL}
                                alt="user-image"
                                className="rounded-full"
                                width={100}
                                height={100}
                            />
                        )}
                        <h1 className="text-2xl font-bold mt-5">Priyanka Kumari</h1>
                    </div>
                    <div>
                        {user?.tweets?.map(tweet => <FeedCard  data={tweet as Tweet} key={tweet?.id}/>)
                        }
                    </div>

                </div>
            </Twitterlayout>
        </div>
    )
}

export default UserProfilePage