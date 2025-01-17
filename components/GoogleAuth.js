"use client";

import { GoogleLogin } from '@react-oauth/google';

export default function GoogleAuth() {
  return (
    <GoogleLogin
      onSuccess={(response) => console.log('Login successful:', response)}
      onError={() => console.error('Login failed')}
    />
  );
}
