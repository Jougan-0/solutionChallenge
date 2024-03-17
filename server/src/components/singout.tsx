// SignOutButton component
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const SignOutButton: React.FC = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const handleSignOut = async () => {
    await signOut({ redirect: false, callbackUrl: '/' });
    router.push('/'); // Redirect to the home page after signing out
  };

  if (!session) {
    return (
      <button
        onClick={() => router.push('/signIn')}
        className="text-xl text-white"
        style={{
          color: 'white',
          backgroundColor: 'rgba(0,0,0,0.2)',
          padding: '10px 20px',
          border: 'none',
          fontSize: "1.5rem",
          display: 'flex',
          justifyContent: 'center',
          width: '200px',
          borderRadius: '10px', 
        }}
        onMouseEnter={(e) => {
          const target = e.target as HTMLButtonElement;
          target.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
        }}
        onMouseLeave={(e) => {
          const target = e.target as HTMLButtonElement;
          target.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
          target.style.padding = '10px 20px';
        }}
      >
        Sign In
      </button>
    );
  }

  return (
    <button
      onClick={handleSignOut}
      className="text-xl text-white"
      style={{
        color: 'white',
        backgroundColor: 'rgba(0,0,0,0.2)',
        padding: '10px 20px',
        border: 'none',
        fontSize: "1.5rem",
        display: 'flex',
        justifyContent: 'center',
        width: '200px',
        borderRadius: '10px', 
      }}
      onMouseEnter={(e) => {
        const target = e.target as HTMLButtonElement;
        target.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
      }}
      onMouseLeave={(e) => {
        const target = e.target as HTMLButtonElement;
        target.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
        target.style.padding = '10px 20px';
      }}
    >
      Sign Out
    </button>
  );
};

export default SignOutButton;
