"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Code2, AtSign, Link2, Share2, Mail, MapPin, Phone } from "lucide-react";

const footerLinks = {
  "Quick Links": [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/events", label: "Events" },
    { href: "/gallery", label: "Gallery" },
    { href: "/members", label: "Team" },
    //{ href: "/projects", label: "Projects" },
    { href: "/contact", label: "Contact" },
  ],
  "Connect": [
    { href: "mailto:associationofinfinit@gmail.com", label: "associationofinfinit@gmail.com", icon: Mail },
    { href: "tel:+919659496318", label: "+91 9659496318", icon: Phone },
    { href: "https://maps.app.goo.gl/Z8dPzJ3JXWA15yWH7", label: "NH-209,Sathyamangalam Road,Kovilpalayam,Sarkar Samakulam,Coimbatore,Tamil Nadu 641107", icon: MapPin },
  ],
};

export default function Footer() {
  return (

    <footer className="relative mt-24 bg-[#050505] border-t border-[#FFD700]/20">

      <div className="w-full h-24 lg:h-10"></div>

      {/* Gold top border glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FFD700]/50 to-transparent" />

      {/* CHANGED: Expanded width to 92% to match navbar */}
      <div className="w-[99%] mx-auto py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Brand - Pushed Left */}
          <div className="flex flex-col gap-5 items-start">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-12 h-12">
                <Image src="/logo.png" alt="InfiniT Logo" fill className="object-contain" />
              </div>
              <div>
                <div className="font-[family-name:var(--font-inter)] font-black text-2xl tracking-widest gradient-text uppercase">
                  InfiniT
                </div>
                <div className="text-xs text-gray-500 tracking-widest uppercase">
                  IT Dept. Association
                </div>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed font-[family-name:var(--font-roboto)]">
              The official IT Department Association of Info Institute of Engineering, Coimbatore.
              Fostering innovation, collaboration, and excellence in technology.
            </p>
          </div>

          {/* Quick Links - Centered */}
          <div className="flex md:justify-center">
            <div>
              <h3 className="font-[family-name:var(--font-inter)] font-semibold text-white mb-5 text-sm tracking-wider uppercase flex items-center gap-2">
                <span className="w-8 h-px bg-[#E60000]" />
                Quick Links
              </h3>
              <ul className="space-y-3">
                {footerLinks["Quick Links"].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-[#FFD700] text-sm transition-colors duration-300 font-[family-name:var(--font-roboto)] flex items-center gap-2 group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E60000] opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact - Right Aligned */}
          <div className="flex md:justify-end">
            <div className="flex flex-col items-end text-right">
              <h3 className="font-[family-name:var(--font-inter)] font-semibold text-white mb-5 text-sm tracking-wider uppercase flex items-center gap-2 justify-end">
                Get In Touch
                <span className="w-8 h-px bg-[#FFD700]" />
              </h3>
              <ul className="space-y-4">
                {footerLinks["Connect"].map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="text-gray-400 hover:text-[#FFD700] text-sm transition-colors duration-300 font-[family-name:var(--font-roboto)] flex items-start gap-3 justify-end group"
                    >
                      {item.label}
                      <item.icon size={15} className="mt-0.5 text-[#E60000] flex-shrink-0" />
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link href="/contact" className="btn-primary text-sm py-2.5 px-6 inline-block rounded-lg">
                  Contact Us →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-600 font-[family-name:var(--font-roboto)]">
          <p>© {new Date().getFullYear()} InfiniT – Info Institute of Engineering. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <span className="text-[#E60000]">♥</span> by the InfiniT Technical Team
          </p>
        </div>
      </div>
    </footer>
  );
}