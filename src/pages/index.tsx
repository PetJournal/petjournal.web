import Image from 'next/image';
import BottomTab from '@/components/BottomTab';
//Images
import firstBanner from '../../public/images/banner-1.png';
import secondBanner from '../../public/images/banner-2.png';
import thirdBanner from '../../public/images/banner-3.png';
import menuIcon from '../../public/images/menu-burger.svg';
import calendarIcon from '../../public/images/calendar.svg';
import searchIcon from '../../public/images/search.svg';
import vaccineIcon from '../../public/images/vaccine.svg';
import medicalDropIcon from '../../public/images/medical-drops.svg';
//Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import 'swiper/css/pagination';
import 'swiper/css';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

function Home() {
  const accessToken = Cookies.get('accessToken');
  const { push } = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined' && !accessToken) {
      push('/register');
    }
  }, [accessToken, push]);

  return (
    <div className="p-4">
      <header className="flex items-center justify-between mb-5">
        <h2>Olá, Camila!</h2>
        <button>
          <Image src={menuIcon} alt="" />
        </button>
      </header>

      <Swiper
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        modules={[Autoplay]}
        slidesPerView={1}
        className="rounded-lg h-42"
      >
        <SwiperSlide className="rounded-lg ">
          <Image src={firstBanner} alt="" />
        </SwiperSlide>
        <SwiperSlide className="rounded-lg ">
          <Image src={secondBanner} alt="" />
        </SwiperSlide>
        <SwiperSlide className="rounded-lg ">
          <Image src={thirdBanner} alt="" />
        </SwiperSlide>
      </Swiper>

      <div className="mt-5">
        <div className="flex items-center justify-between">
          <h3>Serviços</h3>
          <button>ver mais</button>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-2 text-white">
          <button className="flex flex-col gap-3 h-[150px] items-center justify-center p-4 py-5 text-center rounded-lg bg-custom-blue">
            <Image src={calendarIcon} alt="" width={80} height={80} />
            <p className="font-medium">Agenda</p>
          </button>
          <button className="flex flex-col gap-3 h-[150px] items-center justify-center p-4 py-5 text-center rounded-lg bg-custom-purple">
            <Image src={searchIcon} alt="" width={80} height={80} />
            <p className="font-medium">Localizar seviços</p>
          </button>
          <button className="flex flex-col gap-3 h-[150px] items-center justify-center p-4 py-5 text-center rounded-lg bg-custom-cyan">
            <Image src={vaccineIcon} alt="" width={80} height={80} />
            <p className="font-medium">Registro de Vacinas</p>
          </button>
          <button className="flex flex-col gap-[2px] h-[150px] items-center justify-center p-4 py-5 text-center rounded-lg bg-custom-pink">
            <Image src={medicalDropIcon} alt="" width={80} height={80} />
            <p className="font-medium">Registro de Vermifugos</p>
          </button>
        </div>
      </div>

      <BottomTab />
    </div>
  );
}

export default Home;
