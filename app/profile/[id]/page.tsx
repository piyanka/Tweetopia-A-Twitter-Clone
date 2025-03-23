import { notFound } from "next/navigation";
import FeedCard from "@/components/FeedCard";
import Twitterlayout from "@/components/Layout/TwitterLayout";
import { Tweet, User } from "@/gql/graphql";
import Image from "next/image";
import { BsArrowLeftShort } from "react-icons/bs";
import { graphqlClient } from "@/clients/api";
import { getUserByIdQuery } from "@/graphql/query/user";

interface Props {
  params: { id: string };
}

// ✅ Fetch data inside a Server Component
export default async function UserProfilePage({ params }: Props) {
  const id =  params.id;

  if (!id) {
    notFound();
  }

  const userInfo = await graphqlClient.request(getUserByIdQuery, { id });

  if (!userInfo?.getUserById) {
    notFound();
  }

  return (
    <Twitterlayout>
      <div>
        <nav className="flex items-center gap-3 py-3 px-3">
          <BsArrowLeftShort className="text-4xl" />
          <div>
            <h1 className="text-2xl font-bold">Priyanka Kumari</h1>
            <h1 className="text-md font-bold text-slate-500">
              {userInfo.getUserById?.tweets?.length} Tweets
            </h1>
          </div>
        </nav>
        <div className="p-4 border-b border-slate-800">
          {userInfo.getUserById?.profileImageURL && (
            <Image
              src={userInfo.getUserById?.profileImageURL}
              alt="user-image"
              className="rounded-full"
              width={100}
              height={100}
            />
          )}
          <h1 className="text-2xl font-bold mt-5">Priyanka Kumari</h1>
        </div>
        <div>
          {userInfo.getUserById?.tweets?.map((tweet) => (
            <FeedCard data={tweet as Tweet} key={tweet?.id} />
          ))}
        </div>
      </div>
    </Twitterlayout>
  );
}
