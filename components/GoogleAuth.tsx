"use client";
import { GoogleLogin } from '@react-oauth/google';
import { useCallback } from 'react';
import { toast } from "react-hot-toast";
import { verifyUserGoogleTokenQuery } from "@/graphql/query/user";

import { graphqlClient } from "../clients/api";
// import { useQueryClient } from '@tanstack/react-query';

export default function GoogleAuth() {
  // const queryClient = useQueryClient();

  const handleLoginWithGoogle = useCallback(async (cred:any) => {
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

    // await queryClient.invalidateQueries({ queryKey: ['current-user'] });

  }, []);

  return (
    <GoogleLogin
      onSuccess={handleLoginWithGoogle}
      onError={() => console.error('Login failed')}
    />
    
  );
}
