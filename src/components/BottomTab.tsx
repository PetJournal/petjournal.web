import Image from 'next/image';
import { useRouter } from 'next/router';
import homeIcon from '../assets/svg/home.svg';
import petsIcon from '../assets/svg/pets.svg';
import tutorIcon from '../assets/svg/tutor.svg';

function BottomTab() {
  const { pathname, push } = useRouter();

  return (
    <nav className="fixed bottom-0 left-0 right-0 flex justify-between p-2 px-8 bg-custom-purple">
      <button
        onClick={() => push('/')}
        className={`flex flex-col items-center ${
          pathname === '/' ? 'text-custom-blue' : 'text-white'
        }`}
      >
        <Image src={homeIcon} alt="" />
        Home
      </button>
      <button
        className={`flex flex-col items-center ${
          pathname === '/pets' ? 'text-custom-blue' : 'text-white'
        }`}
      >
        <Image src={petsIcon} alt="" />
        Pets
      </button>
      <button
        className={`flex flex-col items-center ${
          pathname === '/tutor' ? 'text-custom-blue' : 'text-white'
        }`}
      >
        <Image src={tutorIcon} alt="" />
        Tutor
      </button>
    </nav>
  );
}

export default BottomTab;
