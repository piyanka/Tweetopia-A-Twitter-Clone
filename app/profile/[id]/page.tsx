"use client";

import { useState, useEffect, use } from "react";
import { notFound } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { BsArrowLeftShort } from "react-icons/bs";
import Image from "next/image";

import FeedCard from "@/components/FeedCard";
import Twitterlayout from "@/components/Layout/TwitterLayout";
import { Tweet } from "@/gql/graphql";
import { graphqlClient } from "@/clients/api";
import { getUserByIdQuery } from "@/graphql/query/user";
import { followUserMutation, unfollowUserMutation } from "@/graphql/mutation/user";
import { useCurrentUser } from "@/hooks/user";

interface Props {
  params: Promise<{ id: string }>;
}

export default function UserProfilePage({ params }: Props) {
  const unwrappedParams = use(params);
  const userId = unwrappedParams.id;

  const { user: currentUser, isLoading, error } = useCurrentUser();
  const router = useRouter();
  const queryClient = useQueryClient();

  // Fetch user profile data
  const { data: userInfo, isLoading: isUserLoading } = useQuery({
    queryKey: ["user-profile", userId],
    queryFn: () => graphqlClient.request(getUserByIdQuery, { id: userId }),
    enabled: !!userId,
  });

  const profileUser = userInfo?.getUserById;

  // ✅ Check if current user is following
  const amIFollowing = profileUser?.followers?.some((el) => el?.id === currentUser?.id) ?? false;

  // ✅ Follow User Function
  const handleFollowUser = async () => {
    if (!profileUser?.id) return;
    await graphqlClient.request(followUserMutation, { to: profileUser.id });
    await queryClient.invalidateQueries({ queryKey: ["current-user"] });
    await queryClient.invalidateQueries({ queryKey: ["user-profile", userId] });
  };

  // ✅ Unfollow User Function
  const handleUnfollowUser = async () => {
    if (!profileUser?.id) return;
    await graphqlClient.request(unfollowUserMutation, { to: profileUser.id });
    await queryClient.invalidateQueries({ queryKey: ["current-user"] });
    await queryClient.invalidateQueries({ queryKey: ["user-profile", userId] });
  };

  if (isLoading || isUserLoading) {
    return (
      <Twitterlayout>
        <div className="flex items-center justify-center h-screen">
          <p>Loading...</p>
        </div>
      </Twitterlayout>
    );
  }

  if (error || !profileUser) {
    return notFound();
  }

  return (
    <Twitterlayout>
      <div>
        <nav className="flex items-center gap-3 py-3 px-3">
          <BsArrowLeftShort className="text-4xl cursor-pointer" onClick={() => router.back()} />
          <div>
            <h1 className="text-2xl font-bold">
              {profileUser.firstName} {profileUser.lastName}
            </h1>
            <h1 className="text-md font-bold text-slate-500">
              {profileUser.tweets?.length} Tweets
            </h1>
          </div>
        </nav>
        <div className="p-4 border-b border-slate-800">
          {profileUser.profileImageURL && (
            <Image
              src={profileUser.profileImageURL}
              alt="user-image"
              className="rounded-full"
              width={100}
              height={100}
            />
          )}
          <h1 className="text-2xl font-bold mt-5">
            {profileUser.firstName} {profileUser.lastName}
          </h1>
          <div className="flex justify-between items-center">
            <div className="flex gap-3">
              <span>{profileUser.followers?.length} followers</span>
              <span>{profileUser.following?.length} following</span>
            </div>
            {currentUser?.id !== profileUser.id && (
              <>
                {amIFollowing ? (
                  <button
                    onClick={handleUnfollowUser}
                    className="bg-white text-black px-3 py-1 rounded-full text-sm"
                  >
                    Unfollow
                  </button>
                ) : (
                  <button
                    onClick={handleFollowUser}
                    className="bg-white text-black px-3 py-1 rounded-full text-sm"
                  >
                    Follow
                  </button>
                )}
              </>
            )}
          </div>
        </div>
        <div>
          {profileUser.tweets?.map((tweet) => (
            <FeedCard data={tweet as Tweet} key={tweet?.id} />
          ))}
        </div>
      </div>
    </Twitterlayout>
  );
}
