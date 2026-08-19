"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/events", label: "Events" },
  { href: "/gallery", label: "Gallery" },
  { href: "/members", label: "Team" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
          ? "bg-[#050505]/95 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/50"
          : "bg-transparent"
          }`}
      >
        <div className="w-[99%] px-8 sm:px-12 lg:px-20 xl:px-24">
          <div className="flex items-center justify-between h-16 md:h-20 w-full relative">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group relative z-10">
              <div className="relative w-10 h-10 md:w-12 md:h-12 transition-transform duration-300 group-hover:scale-110">
                <Image src="/logo.png" alt="InfiniT Logo" fill className="object-contain" sizes="48px" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-[family-name:var(--font-inter)] font-black text-lg md:text-xl tracking-widest uppercase gradient-text">
                  InfiniT
                </span>
                <span className="font-[family-name:var(--font-roboto)] text-[10px] text-gray-400 tracking-widest uppercase hidden sm:block">
                  Involve · Inspire · Illuminate
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center justify-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <ul className="flex items-center gap-6 backdrop-blur-md bg-black/50 px-6 py-2.5 rounded-full border border-white/10">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <li key={link.href}>
                      <Link href={link.href} className="relative px-2 py-1.5 group flex items-center">
                        <span
                          className={`font-[family-name:var(--font-inter)] text-sm font-medium tracking-wide transition-all duration-300 ${isActive
                            ? "text-[#FFD700] nav-link-glow"
                            : "text-gray-300 group-hover:text-white"
                            }`}
                        >
                          {link.label}
                        </span>
                        {isActive && (
                          <motion.div
                            layoutId="nav-underline"
                            className="absolute bottom-0 left-2 right-2 h-[2px] bg-gradient-to-r from-[#E60000] to-[#FFD700] rounded-full shadow-[0_0_8px_rgba(255,215,0,0.8)]"
                          />
                        )}
                        <div className="absolute bottom-0 left-2 right-2 h-[2px] bg-gradient-to-r from-[#E60000] to-[#FFD700] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Join Us + Mobile hamburger */}
            <div className="flex items-center justify-end gap-3 relative z-10">
              <Link
                href="/contact"
                className="btn-primary hidden lg:inline-flex items-center text-sm py-2 px-5 rounded-lg whitespace-nowrap"
              >
                Join Us
              </Link>
              <button
                id="nav-mobile-toggle"
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden p-2 text-gray-300 hover:text-[#FFD700] transition-colors"
                aria-label="Toggle menu"
              >
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-40 bg-[#050505]/98 backdrop-blur-2xl flex flex-col px-8"
          >
            {/* BULLETPROOF SPACER: Forces 120px of empty space at the top to clear the logo/header */}
            <div style={{ height: "80px", width: "100%", flexShrink: 0 }}></div>

            <nav className="flex flex-col gap-2 overflow-y-auto pb-10">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    className={`block py-4 text-2xl font-[family-name:var(--font-inter)] font-bold border-b border-white/5 transition-colors duration-300 ${pathname === link.href
                      ? "text-[#FFD700] nav-link-glow"
                      : "text-gray-200 hover:text-[#E60000]"
                      }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-8"
              >
                <Link href="/contact" className="btn-primary block text-center text-lg py-4">
                  Join InfiniT
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}