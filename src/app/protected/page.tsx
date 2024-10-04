'use client';

import { useSession, signIn, signOut } from "next-auth/react";
import { useTeams } from "../components/TeamAwareComponent";

export default function ProtectedPage() {
  const { data: session, status } = useSession();
  const { isTeamsContext, context } = useTeams();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return (
      <div className="p-4">
        <p>You must be signed in to view this page</p>
        <button 
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => signIn("azure-ad")}
        >
          Sign in
        </button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Protected Page</h1>
      
      {/* User info from Azure AD */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Azure AD User Info:</h2>
        <p>Email: {session.user?.email}</p>
        <p>Name: {session.user?.name}</p>
        {session.userProfile?.preferred_username && (
          <p>Username: {session.userProfile.preferred_username}</p>
        )}
      </div>

      {/* Teams Context Info */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Context Info:</h2>
        {isTeamsContext ? (
          <>
            <p>Running in Microsoft Teams</p>
            <p>Teams User: {context?.user?.userPrincipalName}</p>
          </>
        ) : (
          <p>Running in browser</p>
        )}
      </div>

      {/* Token Info (for debugging) */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Token Info:</h2>
        <p>Access Token Available: {session.accessToken ? 'Yes' : 'No'}</p>
        <p>ID Token Available: {session.idToken ? 'Yes' : 'No'}</p>
      </div>

      <button 
        className="px-4 py-2 bg-red-500 text-white rounded"
        onClick={() => signOut()}
      >
        Sign out
      </button>
    </div>
  );
}