"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

const demoUsers = [
  { id: 1, name: "Alice Johnson", artType: "Musician", location: "Lagos, Nigeria", img: "https://randomuser.me/api/portraits/women/44.jpg" },
  { id: 2, name: "Bob Smith", artType: "Producer", location: "Nairobi, Kenya", img: "https://randomuser.me/api/portraits/men/45.jpg" },
  { id: 3, name: "Carol Davis", artType: "Designer", location: "Accra, Ghana", img: "https://randomuser.me/api/portraits/women/46.jpg" },
  { id: 4, name: "Dave Wilson", artType: "Director", location: "Cape Town, SA", img: "https://randomuser.me/api/portraits/men/47.jpg" },
  { id: 5, name: "Eve Brown", artType: "Artist", location: "Addis Ababa, Ethiopia", img: "https://randomuser.me/api/portraits/women/48.jpg" },
  { id: 6, name: "Frank Miller", artType: "Photographer", location: "Dar es Salaam, Tanzania", img: "https://randomuser.me/api/portraits/men/49.jpg" },
  { id: 7, name: "Grace Taylor", artType: "Content Creator", location: "Kampala, Uganda", img: "https://randomuser.me/api/portraits/women/50.jpg" },
];

const UserCarousel: React.FC = () => {
  return (
    <div className="py-16">
      <h2 className="text-2xl font-bold text-white text-center mb-6">Meet Some of Our Creators</h2>
      <Swiper
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={3}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop={true}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="max-w-5xl mx-auto"
        style={{ paddingBottom: "40px", paddingTop: "20px", paddingLeft: "40px", paddingRight: "40px", overflow: "visible" }}
      >
        {demoUsers.map((user) => (
          <SwiperSlide key={user.id}>
            <div className="relative">
              <img
                src={user.img}
                alt={user.name}
                className="rounded-lg border-4 border-cyan-400 shadow-lg bg-white w-full h-full"
                style={{ objectFit: "contain", padding: "8px" }}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-4 rounded-b-lg">
                <h3 className="text-white font-bold text-base drop-shadow-lg" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>{user.name}</h3>
                <p className="text-cyan-200 text-xs drop-shadow-lg font-medium" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.8)' }}>{user.artType}</p>
                <p className="text-gray-200 text-xs drop-shadow-lg" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>{user.location}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default UserCarousel; 