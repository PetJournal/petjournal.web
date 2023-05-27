import BottomTab from '@/components/BottomTab';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';

function Home() {
  return (
    <div className="p-4">
      <header className="flex justify-between mb-5">
        <h2>Olá, Camila!</h2>
        <button>menu</button>
      </header>

      <Swiper
        pagination={true}
        autoplay={{ delay: 4000 }}
        modules={[Pagination, Autoplay]}
        className="h-40 rounded-lg"
      >
        <SwiperSlide className="bg-red-800 rounded-lg"></SwiperSlide>
        <SwiperSlide className="bg-green-800 rounded-lg"></SwiperSlide>
        <SwiperSlide className="rounded-lg bg-sky-800"></SwiperSlide>
      </Swiper>

      <div className="mt-5">
        <div className="flex items-center justify-between">
          <h3>Serviços</h3>
          <button>ver mais</button>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-2">
          <button className="flex items-center justify-center p-4 text-center bg-gray-300 rounded-lg h-36">
            {/* image */}
            <p>Agenda</p>
          </button>
          <button className="flex items-center justify-center p-4 text-center bg-gray-300 rounded-lg h-36">
            {/* image */}
            <p>Localizar seviços</p>
          </button>
          <button className="flex items-center justify-center p-4 text-center bg-gray-300 rounded-lg h-36">
            {/* image */}
            <p>Registro de Vacinas</p>
          </button>
          <button className="flex items-center justify-center p-4 text-center bg-gray-300 rounded-lg h-36">
            {/* image */}
            <p>Registro de Vermifugos</p>
          </button>
        </div>
      </div>

      <BottomTab />
    </div>
  );
}

export default Home;
