"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ZoomIn, ArrowLeft, ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay, Navigation } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";

const gridImages = [
  { src: "/Ing25_1.JPG", title: "Assembly", category: "Inaguration 2K25" },
  { src: "/Ing25_2.JPG", title: "Prayer Song", category: "Inaguration 2K25" },
  { src: "/Ing25_3.jpg", title: "Lamp Reveal", category: "Inaguration 2K25" },
  { src: "/Ing25_4.jpg", title: "Lamp Reveal", category: "Inaguration 2K25" },
  { src: "/Ing25_8.1.JPG", title: "President", category: "Inaguration 2K25" },
  { src: "/Ing25_8.2.JPG", title: "Chief Guest", category: "Inaguration 2K25" },
  { src: "/Ing25_8.3.JPG", title: "", category: "Inaguration 2K25" },
  { src: "/Ing25_7.JPG", title: "Banner Reveal", category: "Inaguration 2K25" },
  { src: "/Ing25_8.JPG", title: "Standy Reveal", category: "Inaguration 2K25" },
  { src: "/Ing25_9.JPG", title: "Oath Taking", category: "Inaguration 2K25" },
  { src: "/Ing25_10.JPG", title: "Group Photo", category: "Inaguration 2K25" },
  { src: "/Ing25_11.JPG", title: "Board Members", category: "Inaguration 2K25" },
  { src: "/GenAI_1.JPG", title: "Momento", category: "Workshop" },
  { src: "/GenAI_2.JPG", title: "Stage Members", category: "Workshop" },
  { src: "/GenAI_5.JPG", title: "AI Topics", category: "Workshop" },
  { src: "/Ketch_1.jpeg", title: "Sketch", category: "Workshop" },
  { src: "/Ketch_2.jpeg", title: "Creen", category: "Workshop" },
  { src: "/Ketch_3.jpeg", title: "Working", category: "Workshop" },
  { src: "/Web_1.jpeg", title: "Working", category: "Workshop" },
  { src: "/Web_2.jpeg", title: "Working", category: "Workshop" },
  { src: "/Web_3.jpeg", title: "Working", category: "Workshop" },
];

const categories = ["Inaguration 2K25", "Inaguration 2K26", "Workshop"];

export default function GalleryPage() {
  const [filter, setFilter] = useState("Inaguration 2K25");
  const [lightbox, setLightbox] = useState<{ src: string; title: string } | null>(null);

  const filtered = gridImages.filter((img) => img.category === filter);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full self-stretch"
      style={{ width: "100%", alignSelf: "stretch" }}
    >
      {/* Header */}
      <section style={{ width: "100%", maxWidth: "80rem", margin: "0 auto", padding: "1rem 2rem", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div className="absolute inset-0 bg-gradient-to-b from-[#E60000]/5 to-transparent pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10"
        >
          <span className="text-xs font-[family-name:var(--font-inter)] font-semibold tracking-[0.3em] text-[#E60000] uppercase">
            Memories & Moments
          </span>
          <h1 className="font-[family-name:var(--font-inter)] font-black text-5xl sm:text-7xl mt-4 mb-6 text-white">
            Our <span className="gradient-text">Gallery</span>
          </h1>
          <p className="font-[family-name:var(--font-roboto)] text-gray-400 max-w-xl mx-auto">
            A visual journey through our events, achievements, and the brilliant minds behind InfiniT.
          </p>
        </motion.div>
      </section>


      {/* ─── FILTER TABS ─── */}
      {/* 🚀 CHANGED: Changed mb-10 to mb-16 to add significant breathing room above the images */}
      <section style={{ width: "100%", maxWidth: "80rem", margin: "0 auto", padding: "1rem 2rem", display: "flex", flexDirection: "column", justifyContent: "center", position: "relative" }}>
        <div className="flex flex-wrap items-center gap-4 justify-center">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(cat)}
              className={`flex items-center justify-center px-8 py-3.5 sm:px-12 sm:py-4 min-w-[150px] sm:min-w-[150px] rounded-full font-[family-name:var(--font-inter)] font-medium text-sm transition-all duration-300 border ${filter === cat
                ? "bg-[#E60000] border-[#E60000] text-white shadow-[0_0_15px_rgba(230,0,0,0.4)]"
                : "bg-white/5 backdrop-blur-md border-white/20 text-gray-300 hover:border-white/60 hover:text-white"
                }`}
            >
              {cat}
            </motion.button>
          ))}

          {/*<motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => console.log("Navigate to all galleries")}
            className="flex items-center justify-center gap-2 px-8 py-3.5 sm:px-12 sm:py-4 min-w-[140px] sm:min-w-[180px] rounded-full font-[family-name:var(--font-inter)] font-medium text-sm transition-all duration-300 border bg-white/5 backdrop-blur-md border-white/20 text-gray-300 hover:border-[#FFD700] hover:text-[#FFD700]"
          >
            View More <span>&rarr;</span>
          </motion.button>*/}
        </div>
      </section>

      {/* ─── CATEGORY CAROUSEL ─── */}
      <section className="w-full flex-grow relative overflow-hidden flex flex-col items-center pb-20">
        <div className="w-full max-w-[100vw] px-4">
          <Swiper
            key={filter}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView="auto"
            loop={filtered.length > 3}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            coverflowEffect={{
              rotate: 0,
              stretch: 10,
              depth: 300,
              modifier: 1.2,
              slideShadows: true,
            }}
            navigation={{
              prevEl: '.gallery-prev',
              nextEl: '.gallery-next',
            }}
            modules={[EffectCoverflow, Autoplay, Navigation]}
            className="w-full py-10"
          >
            {filtered.map((img, i) => (
              <SwiperSlide key={`${img.title}-${i}`} className="!w-[280px] sm:!w-[400px] lg:!w-[580px]">
                <div
                  className="relative w-full aspect-video rounded-2xl sm:rounded-3xl overflow-hidden group shadow-2xl cursor-pointer"
                  onClick={() => setLightbox({ src: img.src, title: img.title })}
                >
                  <Image
                    src={img.src}
                    alt={img.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 550px"
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                    <div className="transform translate-y-6 group-hover:translate-y-0 transition-transform duration-300">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 mb-3 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                        <ZoomIn size={16} className="text-white" />
                      </div>
                      <h3 className="font-[family-name:var(--font-inter)] font-black text-white text-lg sm:text-xl mb-1">
                        {img.title}
                      </h3>
                      <p className="text-[#FFD700] text-xs sm:text-sm font-medium tracking-wide uppercase">
                        {img.category}
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Custom Navigation Arrows */}
        <div className="flex gap-6 mt-4 z-10">
          <button className="gallery-prev w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 hover:border-[#FFD700] hover:text-[#FFD700] transition-all duration-300 backdrop-blur-md">
            <ArrowLeft size={20} className="sm:w-6 sm:h-6" />
          </button>
          <button className="gallery-next w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 hover:border-[#FFD700] hover:text-[#FFD700] transition-all duration-300 backdrop-blur-md">
            <ArrowRight size={20} className="sm:w-6 sm:h-6" />
          </button>
        </div>
      </section>

      {/* ─── FULLSCREEN LIGHTBOX ─── */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#050505]/95 backdrop-blur-xl flex flex-col items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-6 right-6 lg:top-10 lg:right-10 w-10 h-10 lg:w-12 lg:h-12 bg-white/10 border border-white/20 rounded-full flex items-center justify-center hover:bg-[#E60000] hover:border-[#E60000] transition-colors z-50"
            >
              <X size={20} className="text-white" />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative max-w-6xl w-full h-[60vh] lg:h-[80vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={lightbox.src}
                alt={lightbox.title}
                fill
                className="object-contain drop-shadow-2xl"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mt-6"
            >
              <h3 className="font-[family-name:var(--font-inter)] font-bold text-white text-xl lg:text-2xl tracking-wide">
                {lightbox.title}
              </h3>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}