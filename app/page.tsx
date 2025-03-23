"use client"; // ✅ Add this line

import React, { useCallback, useState } from "react";
import { Inter } from "next/font/google";
import Image from "next/image";
import { useCurrentUser } from "@/hooks/user";
import { useCreateTweet } from "@/hooks/tweet";
import Twitterlayout from "@/components/Layout/TwitterLayout";
import { BiImageAlt } from "react-icons/bi";
import FeedCard from "@/components/FeedCard";
import { Tweet } from "@/gql/graphql";
import { graphqlClient } from "@/clients/api";
import { getAllTweetsQuery } from "@/graphql/query/tweet";

const inter = Inter({ subsets: ["latin"] });

// ✅ Fetch Tweets in a Client Component
async function getTweets(): Promise<Tweet[]> {
  const allTweets = await graphqlClient.request(getAllTweetsQuery);
  return allTweets.getAllTweets as Tweet[];
}

export default function Home() {
  const { user } = useCurrentUser();
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [content, setContent] = useState("");

  const { mutate } = useCreateTweet();

  // ✅ Fetch tweets on the client side
  React.useEffect(() => {
    getTweets().then(setTweets);
  }, []);

  const handleSelectImage = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
  }, []);

  const handleCreateTweet = useCallback(() => {
    mutate({
      content,
    });
  }, [content, mutate]);

  return (
    <div className={inter.className}>
      <Twitterlayout>
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
                    width={50}
                  />
                )}
              </div>
              <div className="col-span-11">
                <textarea
                  className="w-full bg-transparent text-xl px-3 border-slate-700"
                  placeholder="What's happening?"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={4}
                />
                <div className="mt-2 flex justify-between items-center">
                  <BiImageAlt onClick={handleSelectImage} className="text-xl" />
                  <button
                    onClick={handleCreateTweet}
                    className="bg-[#1d9bf0] font-semibold text-sm py-2 px-4 rounded-full"
                  >
                    Tweet
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ✅ Render tweets */}
        {tweets?.map((tweet) =>
          tweet ? <FeedCard key={tweet?.id} data={tweet as Tweet} /> : null
        )}
      </Twitterlayout>
    </div>
  );
}
