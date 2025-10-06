import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Carousel() {
  const sliders = [
    {
      src: "https://ik.imagekit.io/44y3v51cp/kisankonnect/Images/BannerImage/20241210112748Hurda%20Combo%20Story%20Web.jpg?tr=f-webp",
      alt: "Fresh Farm Products",
      title: "Farm Fresh Products",
      description: "Direct from farmers to your doorstep"
    },
    {
      src: "https://ik.imagekit.io/44y3v51cp/kisankonnect/Images/BannerImage/20241219162537Story%20Banner%20Web%20%201920px%20%20600px.png?tr=f-webp",
      alt: "Organic Vegetables",
      title: "100% Organic",
      description: "Naturally grown vegetables for your family"
    },
    {
      src: "https://ik.imagekit.io/44y3v51cp/kisankonnect/Images/BannerImage/20250120092249Story Banner_1920_600 (1).png?tr=f-webp",
      alt: "Premium Quality",
      title: "Premium Quality",
      description: "Handpicked for the best quality"
    },
  ];

  const [slide, setSlide] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);

  useEffect(() => {
    let interval;
    if (isAutoplay) {
      interval = setInterval(() => {
        setSlide((prevSlide) => (prevSlide + 1) % sliders.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoplay, sliders.length]);

  const nextSlide = () => {
    setSlide((prevSlide) => (prevSlide + 1) % sliders.length);
  };

  const prevSlide = () => {
    setSlide((prevSlide) => (prevSlide - 1 + sliders.length) % sliders.length);
  };

  return (
    <div className="mt-3 relative w-full h-[460px] overflow-hidden rounded-3xl bg-gray-900">
      {/* Main Carousel Container */}
      <div className="relative w-full h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            {/* Image */}
            <img
              src={sliders[slide].src}
              alt={sliders[slide].alt}
              className="w-full h-full object-cover"
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            
            {/* Content */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="absolute bottom-0 left-0 right-0 p-12 text-white"
            >
              <h2 className="text-5xl font-bold mb-3 drop-shadow-lg">{sliders[slide].title}</h2>
              <p className="text-2xl drop-shadow-md">{sliders[slide].description}</p>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        <button
          onClick={prevSlide}
          className="absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-full 
                   bg-white/20 hover:bg-white/30 backdrop-blur-sm 
                   transition-all duration-200 group"
        >
          <svg className="w-7 h-7 text-white group-hover:scale-110 transition-transform" 
               fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-full 
                   bg-white/20 hover:bg-white/30 backdrop-blur-sm 
                   transition-all duration-200 group"
        >
          <svg className="w-7 h-7 text-white group-hover:scale-110 transition-transform" 
               fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {sliders.map((_, index) => (
            <button
              key={index}
              onClick={() => setSlide(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                slide === index ? 'bg-white w-8' : 'bg-white/50'
              }`}
            />
          ))}
        </div>

        {/* Autoplay Toggle */}
        <button
          onClick={() => setIsAutoplay(!isAutoplay)}
          className="absolute top-6 right-6 p-3 rounded-full 
                   bg-white/20 hover:bg-white/30 backdrop-blur-sm 
                   transition-all duration-200"
          title={isAutoplay ? "Pause slideshow" : "Play slideshow"}
        >
          {isAutoplay ? (
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} 
                    d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ) : (
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} 
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} 
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}

export default Carousel;