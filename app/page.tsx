"use client"; 

import React, { useCallback, useState } from "react";
import { Inter } from "next/font/google";
import Image from "next/image";
import { useCurrentUser } from "@/hooks/user";
import { useCreateTweet, useGetAllTweets } from "@/hooks/tweet";
import Twitterlayout from "@/components/Layout/TwitterLayout";
import { BiImageAlt } from "react-icons/bi";
import FeedCard from "@/components/FeedCard";
import { Tweet } from "@/gql/graphql";
import { graphqlClient } from "@/clients/api";
import { getAllTweetsQuery, getSignedURLForTweetQuery } from "@/graphql/query/tweet";
import axios from "axios";
import toast from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

interface HomeProps {
  tweets?: Tweet[];
}
async function getTweets(): Promise<Tweet[]> {
  const allTweets = await graphqlClient.request(getAllTweetsQuery);
  return allTweets.getAllTweets as Tweet[];
}

export default function Home(props: HomeProps) {
  const { user } = useCurrentUser();

  // const [tweets, setTweets] = useState<Tweet[]>([]);
  const {tweets = props.tweets as Tweet[]} = useGetAllTweets()
  const [content, setContent] = useState("");
  const [imageURL, setImageURL] = useState("");

  const { mutateAsync } = useCreateTweet();


  // React.useEffect(() => {
  //   getTweets().then(setTweets);
  // }, []);

  const handleInputChangeFile = useCallback((input: HTMLInputElement)=>{
    return  async (event: Event) => {
      event.preventDefault();
      const file: File | null | undefined = input.files?.item(0);

      if (!file) return;

      const {getSignedURLForTweet} = await graphqlClient.request(getSignedURLForTweetQuery, {
        imageName: file.name,
        imageType: file.type
      })

      if (getSignedURLForTweet){
        toast.loading('Uploading...', { id: '2'})
        await axios.put(getSignedURLForTweet, file, {
          headers: {
            'Content-Type': file.type
          }
        })
        toast.success('Upload completed', { id: '2'})
        const url = new URL(getSignedURLForTweet);
        const myFilePath = `${url.origin}${url.pathname}`
        setImageURL(myFilePath);

      }
    }; 
  }, []);



  const handleSelectImage = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");

    const handlerFn = handleInputChangeFile(input);

    input.addEventListener("change", handlerFn);
    input.click();

   
  }, [handleInputChangeFile]);


  const handleCreateTweet = useCallback( async () => {
    mutateAsync({
      content,
      imageURL,
    });
    setContent("");
    setImageURL("");
  }, [content, mutateAsync, imageURL]);

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
                ></textarea>
                {
                  imageURL && (
                    <Image
                      src={imageURL}
                      alt="tweet-image"
                      width={300}
                      height={300}
                    />
                  )
                }
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

       
        {tweets?.map((tweet) =>
          tweet ? <FeedCard key={tweet?.id} data={tweet as Tweet} /> : null
        )}
      </Twitterlayout>
    </div>
  );
}
