import { useRouter } from 'next/router';

function BottomTab() {
  const { pathname, push } = useRouter();

  return (
    <nav className="fixed bottom-0 left-0 right-0 flex justify-around bg-custom-purple">
      <button
        onClick={() => push('/')}
        className={`p-4 ${
          pathname === '/' ? 'text-custom-blue' : 'text-white'
        }`}
      >
        Home
      </button>
      <button
        className={`p-4 ${
          pathname === '/pets' ? 'text-custom-blue' : 'text-white'
        }`}
      >
        Pets
      </button>
      <button
        className={`p-4 ${
          pathname === '/tutor' ? 'text-custom-blue' : 'text-white'
        }`}
      >
        Tutor
      </button>
    </nav>
  );
}

export default BottomTab;
