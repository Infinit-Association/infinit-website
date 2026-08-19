"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ZoomIn } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

const carouselImages = [
  { src: "/Ing25_9.JPG", title: "TECHNOVA 2024", caption: "Annual State-Level Symposium" },
  { src: "/Ing25_10.JPG", title: "HackInfiniT", caption: "48-Hour Coding Marathon" },
  { src: "/Ing25_11.JPG", title: "Board Members", category: "Inaguration 2K25" },
  { src: "/GenAI_2.JPG", title: "ML Workshop", caption: "Industry Expert Sessions" },
  { src: "/GenAI_5.JPG", title: "Awards Night", caption: "Celebrating Excellence" },
  { src: "/Ketch_1.jpeg", title: "Project Expo", caption: "Student Innovations" },
  { src: "/Web_1.jpeg", title: "Code Sprint", caption: "Competitive Programming" },
];

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
  //{ src: "/GenAI_3.jpg", title: "Explaination", category: "Workshop" },
  //{ src: "/GenAI_4.jpg", title: "Seminar", category: "Workshop" },
  { src: "/GenAI_5.JPG", title: "AI Topics", category: "Workshop" },
  { src: "/Ketch_1.jpeg", title: "Sketch", category: "Workshop" },
  { src: "/Ketch_2.jpeg", title: "Creen", category: "Workshop" },
  { src: "/Ketch_3.jpeg", title: "Working", category: "Workshop" },
  { src: "/Web_1.jpeg", title: "Working", category: "Workshop" },
  { src: "/Web_2.jpeg", title: "Working", category: "Workshop" },
  { src: "/Web_3.jpeg", title: "Working", category: "Workshop" },
];

const categories = ["All", "Inaguration 2K25", "Inaguration 2K26", "Workshop"];

export default function GalleryPage() {
  const [filter, setFilter] = useState("All");
  const [lightbox, setLightbox] = useState<{ src: string; title: string } | null>(null);

  const filtered = filter === "All" ? gridImages : gridImages.filter((img) => img.category === filter);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full self-stretch"
      style={{ width: "100%", alignSelf: "stretch" }}
    >
      {/* Header */}
      <section style={{ width: "100%", maxWidth: "80rem", margin: "0 auto", padding: "5rem 2rem", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", position: "relative", overflow: "hidden" }}>
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

      {/* 3D Coverflow Carousel – tightly contained */}
      <section style={{ width: "100%", maxWidth: "80rem", margin: "0 auto", padding: "3rem 2rem", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-[family-name:var(--font-inter)] font-bold text-2xl text-center text-white mb-8"
        >
          <span className="text-[#FFD700]">Featured</span> Events
        </motion.h2>
        {/* Constrained container with red glow shadow */}
        <div style={{ width: "100%", borderRadius: "1.5rem", overflow: "hidden", boxShadow: "0 0 40px rgba(230,0,0,0.1)", padding: "0 1rem" }}>
          <Swiper
            effect="coverflow"
            grabCursor
            centeredSlides
            slidesPerView="auto"
            loop
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            coverflowEffect={{
              rotate: 30,
              stretch: 0,
              depth: 200,
              modifier: 1.2,
              slideShadows: false,
            }}
            pagination={{ clickable: true }}
            navigation
            modules={[EffectCoverflow, Pagination, Autoplay, Navigation]}
            className="gallery-swiper"
            style={{ paddingBottom: "3rem" }}
          >
            {carouselImages.map((img, i) => (
              <SwiperSlide key={i} style={{ width: "340px" }}>
                <div className="relative rounded-2xl overflow-hidden group cursor-pointer" style={{ height: "220px" }}>
                  <Image src={img.src} alt={img.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="font-[family-name:var(--font-inter)] font-bold text-white text-lg">{img.title}</h3>
                    <p className="text-gray-300 text-sm">{img.caption}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Filter + Masonry Grid */}
      <section style={{ width: "100%", maxWidth: "80rem", margin: "0 auto", padding: "3rem 2rem", display: "flex", flexDirection: "column", justifyContent: "center", position: "relative" }}>
        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-3 justify-center mb-10">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(cat)}
              id={`gallery-filter-${cat.toLowerCase()}`}
              className={`px-5 py-2 rounded-full font-[family-name:var(--font-inter)] font-medium text-sm transition-all duration-300 border ${filter === cat
                ? "bg-[#E60000] border-[#E60000] text-white shadow-lg shadow-[#E60000]/30"
                : "bg-white/5 backdrop-blur-lg border-white/10 text-gray-400 hover:border-[#FFD700]/40 hover:text-[#FFD700]"
                }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Masonry Grid */}
        <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((img, i) => (
              <motion.div
                key={`${img.title}-${i}`}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="relative break-inside-avoid overflow-hidden rounded-2xl group cursor-pointer"
                style={{ height: i % 3 === 0 ? "280px" : i % 3 === 1 ? "220px" : "250px" }}
                onClick={() => setLightbox({ src: img.src, title: img.title })}
              >
                <Image src={img.src} alt={img.title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                {/* Red/Gold overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#E60000]/0 to-[#FFD700]/0 group-hover:from-[#E60000]/40 group-hover:to-[#FFD700]/20 transition-all duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ZoomIn size={32} className="text-white drop-shadow-lg" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/80 to-transparent">
                  <h4 className="font-[family-name:var(--font-inter)] font-bold text-white text-sm">{img.title}</h4>
                  <span className="text-xs text-[#FFD700]">{img.category}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl max-h-[80vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-[60vh] rounded-2xl overflow-hidden">
                <Image src={lightbox.src} alt={lightbox.title} fill className="object-contain" />
              </div>
              <div className="text-center mt-4">
                <h3 className="font-[family-name:var(--font-inter)] font-bold text-white text-xl">{lightbox.title}</h3>
              </div>
              <button
                onClick={() => setLightbox(null)}
                className="absolute top-2 right-2 w-10 h-10 bg-[#E60000] rounded-full flex items-center justify-center hover:bg-[#FF1A1A] transition-colors"
              >
                <X size={18} className="text-white" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
