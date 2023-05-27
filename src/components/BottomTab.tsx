import { useRouter } from 'next/router';

function BottomTab() {
  const { pathname, push } = useRouter();

  return (
    <nav className="fixed bottom-0 left-0 right-0 flex justify-around bg-gray-300">
      <button
        onClick={() => push('/')}
        className={`p-4 text-gray-700 ${
          pathname === '/' && 'font-bold text-gray-900'
        }`}
      >
        Home
      </button>
      <button
        className={`p-4 text-gray-700 ${
          pathname === '/pets' && 'font-bold text-gray-900'
        }`}
      >
        Pets
      </button>
      <button
        className={`p-4 text-gray-700 ${
          pathname === '/tutor' && 'font-bold text-gray-900'
        }`}
      >
        Tutor
      </button>
    </nav>
  );
}

export default BottomTab;
