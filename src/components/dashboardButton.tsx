// HomeButton component
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const HomeButton = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const handleSesssion = async () => {
    router.push('/dashboard');
  };

  // Render button only if session exists
  if (session) {
    return (
      <button
        onClick={handleSesssion}
        style={{
          color: 'white',
          marginRight:"3rem",
          backgroundColor: 'rgba(0,0,0,0.2)',
          padding: '10px 20px',
          border: 'none',

          fontSize: '1.5rem',
          display: 'flex',
          justifyContent: 'center',
          width: '200px',
          borderRadius: '10px',
        }}
        onMouseEnter={(e) => {
          const target = e.target as HTMLButtonElement;
          target.style.backgroundColor = 'rgba(0,0,0,0.6)';
        }}
        onMouseLeave={(e) => {
          const target = e.target as HTMLButtonElement;
          target.style.backgroundColor = 'rgba(0,0,0,0.2)';
          target.style.padding = '10px 20px';
        }}
      >
        Dashboard
      </button>
    );
  }

  // Render nothing if session doesn't exist
  return null;
};

export default HomeButton;
