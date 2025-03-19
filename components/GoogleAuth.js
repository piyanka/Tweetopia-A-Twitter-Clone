"use client";
import { GoogleLogin } from '@react-oauth/google';
import { useCallback } from 'react';
import { toast } from "react-hot-toast";
import { verifyUserGoogleTokenQuery } from "@/graphql/query/user";

import { graphqlClient } from "../clients/api";

export default function GoogleAuth() {
  const handleLoginWithGoogle = useCallback(async (cred) => {
    if (!cred.credential) return toast.error(`Google token not found`);

    const googleToken = cred.credential;


    const { verifyGoogleToken } = await graphqlClient.request(
      verifyUserGoogleTokenQuery,
      { token: googleToken }
    );

    toast.success('Verified success');
    console.log(verifyGoogleToken);

    if (verifyGoogleToken)
      window.localStorage.setItem("__twitter_token", verifyGoogleToken);


  }, []);

  return (
    <GoogleLogin
      onSuccess={handleLoginWithGoogle}
      onError={() => console.error('Login failed')}
    />
  );
}
