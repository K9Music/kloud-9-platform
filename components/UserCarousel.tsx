"use client";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

interface Creator {
  id: string;
  name: string;
  displayName: string;
  artType: string;
  img: string;
  username: string;
}

const UserCarousel: React.FC = () => {
  const [creators, setCreators] = useState<Creator[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const response = await fetch('/api/creators/carousel');
        if (!response.ok) {
          throw new Error('Failed to fetch creators');
        }
        const data = await response.json();
        setCreators(data);
      } catch (err) {
        console.error('Error fetching creators:', err);
        setError('Failed to load creators');
      } finally {
        setLoading(false);
      }
    };

    fetchCreators();
  }, []);

  // Don't render carousel if no creators or loading
  if (loading) {
    return (
      <div className="py-16">
        <h2 className="text-2xl font-bold text-white text-center mb-6">Meet Some of Our Creators</h2>
        <div className="text-center text-cyan-200">Loading creators...</div>
      </div>
    );
  }

  if (error || creators.length === 0) {
    return (
      <div className="py-16">
        <h2 className="text-2xl font-bold text-white text-center mb-6">Meet Some of Our Creators</h2>
        <div className="text-center text-cyan-200">
          {error || 'No creators available yet. Be the first to join!'}
        </div>
      </div>
    );
  }

  // Function to format art type for display
  const formatArtType = (artType: string) => {
    return artType
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="py-16">
      <h2 className="text-2xl font-bold text-white text-center mb-6">Meet Some of Our Creators</h2>
      <Swiper
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={creators.length >= 3 ? 3 : creators.length}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop={creators.length > 3}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="max-w-5xl mx-auto"
        style={{ paddingBottom: "40px", paddingTop: "20px", paddingLeft: "40px", paddingRight: "40px", overflow: "visible" }}
      >
        {creators.map((creator) => (
          <SwiperSlide key={creator.id}>
            <div className="relative">
              <img
                src={creator.img}
                alt={creator.name}
                className="rounded-lg border-4 border-cyan-400 shadow-lg bg-white w-full h-full"
                style={{ objectFit: "contain", padding: "8px" }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/default-avatar.png';
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-4 rounded-b-lg">
                <h3 className="text-white font-bold text-base drop-shadow-lg" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                  {creator.displayName}
                </h3>
                <p className="text-cyan-200 text-xs drop-shadow-lg font-medium" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.8)' }}>
                  {formatArtType(creator.artType)}
                </p>
                <p className="text-gray-200 text-xs drop-shadow-lg" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                  @{creator.username}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default UserCarousel; 