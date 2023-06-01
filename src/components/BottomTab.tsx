import Image from 'next/image';
import { useRouter } from 'next/router';
import homeIcon from '../assets/svg/home.svg';
import petsIcon from '../assets/svg/pets.svg';
import tutorIcon from '../assets/svg/tutor.svg';
import activeHomeIcon from '../assets/svg/home-active.svg';
import activePetsIcon from '../assets/svg/pets-active.svg';
import activeTutorIcon from '../assets/svg/tutor-active.svg';

function BottomTab() {
  const { pathname, push } = useRouter();

  const homePage = pathname === '/';
  const petsPage = pathname === '/pets';
  const tutorPage = pathname === '/tutor';

  return (
    <nav className="fixed bottom-0 left-0 right-0 flex justify-between p-2 px-8 bg-custom-purple">
      <button
        onClick={() => push('/')}
        className={`flex flex-col items-center ${
          homePage ? 'text-custom-blue' : 'text-white'
        }`}
      >
        {homePage ? (
          <Image src={activeHomeIcon} alt="" />
        ) : (
          <Image src={homeIcon} alt="" />
        )}
        Home
      </button>
      <button
        onClick={() => push('/pets')}
        className={`flex flex-col items-center ${
          petsPage ? 'text-custom-blue' : 'text-white'
        }`}
      >
        {petsPage ? (
          <Image src={activePetsIcon} alt="" />
        ) : (
          <Image src={petsIcon} alt="" />
        )}
        Pets
      </button>
      <button
        onClick={() => push('/tutor')}
        className={`flex flex-col items-center ${
          tutorPage ? 'text-custom-blue' : 'text-white'
        }`}
      >
        {tutorPage ? (
          <Image src={activeTutorIcon} alt="" />
        ) : (
          <Image src={tutorIcon} alt="" />
        )}
        Tutor
      </button>
    </nav>
  );
}

export default BottomTab;
