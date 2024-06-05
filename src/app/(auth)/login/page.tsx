'use client';

import React, { useEffect, useState } from 'react';
import SignIn from '@/components/SignIn';
import { getSession } from 'next-auth/react';

export default function Login() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSession() {
      const session = await getSession();
      setSession(session);
      setLoading(false);
    }

    fetchSession();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <SignIn session={session} />
    </main>
  );
}
