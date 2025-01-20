"use client";

import { GoogleLogin } from '@react-oauth/google';
import { useCallback } from 'react';

export default function GoogleAuth() {

  const handleLoginWithGoogle = useCallback((cred) => {
    // Handle the login logic here
    console.log('Google credential:', cred);
  }, []);

  return (
    <GoogleLogin
      onSuccess={(cred) => console.log('Login successful:', cred)}
      onError={() => console.error('Login failed')}
    />
  );
}
