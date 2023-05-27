import BottomTab from '@/components/BottomTab';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';

function Home() {
  return (
    <div className="p-4">
      <header className="flex justify-between mb-8">
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

      <BottomTab />
    </div>
  );
}

export default Home;
