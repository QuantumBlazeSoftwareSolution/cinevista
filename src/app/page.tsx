"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { MOVIES, COMING_SOON } from "@/data/movies";

/* ============================================================
   ASSETS & DATA
============================================================ */
const HERO_POSTER = "https://images.unsplash.com/photo-1517604401119-2b01053c0bc6?auto=format&fit=crop&q=80&w=1920";
const POSTER_1 = "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?auto=format&fit=crop&q=80&w=600&h=900"; 
const POSTER_2 = "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&q=80&w=600&h=900"; 


/* ============================================================
   i18n CONFIG
============================================================ */
const i18nData = {
  en: {
    nav_now_showing: "Now Showing",
    nav_coming_soon: "Coming Soon",
    nav_experiences: "Experiences",
    nav_pricing: "Pricing",
    nav_facilities: "Facilities",
    nav_contact: "Contact",
    btn_book_tickets: "Book Tickets",
    hero_eyebrow: "NOW PLAYING",
    hero_h1_1: "Experience Cinema",
    hero_h1_2: "Like Never Before",
    hero_sub: "Sri Lanka's most immersive theatrical experience. Dolby Atmos. 4K Laser Projection. IMAX-grade comfort.",
    hero_cta_explore: "Explore Now Showing",
    hero_cta_trailer: "Watch Trailer",
    section_now_showing: "Now Showing",
    section_coming_soon: "Coming Soon",
    section_showtimes: "Today's Showtimes",
    section_pricing: "Transparent Pricing",
    section_facilities: "World-Class Facilities",
    section_loyalty: "CineVista Rewards",
    section_contact: "Get in Touch",
    footer_tagline: "Where Every Frame Feels Infinite",
    btn_remind_me: "Remind Me",
    btn_join_free: "Join Free",
    btn_upgrade: "Upgrade Now",
    btn_send: "Send Message",
    toast_remind: "You'll be notified when bookings open!",
    toast_trailer: "Trailer playing functionality coming soon!",
    toast_contact: "We'll get back to you within 24 hours!",
    form_success: "Thank you! We've received your message."
  },
  si: {
    nav_now_showing: "දැන් තිරගත වේ",
    nav_coming_soon: "ළඟදීම පැමිණේ",
    nav_experiences: "අත්දැකීම්",
    nav_pricing: "මිල ගණන්",
    nav_facilities: "පහසුකම්",
    nav_contact: "සම්බන්ධ වන්න",
    btn_book_tickets: "ප්‍රවේශපත්‍ර වෙන්කරවා ගන්න",
    hero_eyebrow: "දැන් තිරගත වේ",
    hero_h1_1: "සිනමාව අත්විඳින්න",
    hero_h1_2: "කවදාවත් නැති විදියට",
    hero_sub: "ශ්‍රී ලංකාවේ වඩාත් ගිලී යන සිනමා අත්දැකීම. ඩොල්බි ඇට්මොස්. 4K ලේසර් ප්‍රක්ෂේපණය.",
    section_now_showing: "දැන් තිරගත වේ"
  },
  ta: {
    nav_now_showing: "இப்போது திரையிடப்படுகிறது",
    btn_book_tickets: "டிக்கெட் முன்பதிவு",
    hero_eyebrow: "இப்போது திரையிடப்படுகிறது"
  },
  hi: {
    nav_now_showing: "अब प्रदर्शित हो रहा है",
    btn_book_tickets: "टिकट बुक करें",
    hero_eyebrow: "अब प्रदर्शित हो रहा है"
  }
};



export default function Home() {
  /* ============================================================
     STATE & REFS
  ============================================================ */
  const [lang, setLang] = useState<'en' | 'si' | 'ta' | 'hi'>("en");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [toasts, setToasts] = useState<{ id: number; msg: string; type: string }[]>([]);
  const [seatModalOpen, setSeatModalOpen] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [activeDate, setActiveDate] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [activeHeroIndex, setActiveHeroIndex] = useState(0);
  const [dynamicThemeColor, setDynamicThemeColor] = useState("#C9A84C");
  
  const carouselRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);

  /* ============================================================
     COLOR EXTRACTION
  ============================================================ */
  useEffect(() => {
    import("@/utils/colorExtractor").then(({ getDominantColor }) => {
      getDominantColor(MOVIES[activeHeroIndex].poster).then(color => {
        setDynamicThemeColor(color);
      });
    });
  }, [activeHeroIndex]);

  /* ============================================================
     CALLBACKS
  ============================================================ */
  const t = useCallback((key: keyof typeof i18nData['en']) => {
    return (i18nData[lang] as Record<string, string>)[key] || i18nData['en'][key] || key;
  }, [lang]);

  const addToast = useCallback((msg: string, type = "info") => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, msg, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  }, []);

  const handleCarouselScroll = useCallback((direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 350;
      carouselRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  }, []);

  // Mouse Drag Logic for Carousel
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const onMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2; // scroll-fast
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const stopDragging = () => setIsDragging(false);

  /* ============================================================
     EFFECTS
  ============================================================ */
  useEffect(() => {
    // 1. Initial Loader
    const timer = setTimeout(() => setLoading(false), 2000);

    // 2. Scroll Logic & Parallax
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
      setShowBackToTop(window.scrollY > 400);

      // Hero Parallax (0.4x)
      if (heroContentRef.current) {
        heroContentRef.current.style.transform = `translateY(${window.scrollY * 0.4}px)`;
      }
      if (heroVideoRef.current) {
        heroVideoRef.current.style.transform = `translateY(${window.scrollY * 0.4}px)`;
      }
    };

    // 4. Reveal Animation (Intersection Observer)
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // 5. Keyboard Navigation for Carousel
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handleCarouselScroll('left');
      if (e.key === "ArrowRight") handleCarouselScroll('right');
      if (e.key === "Escape") {
        setSeatModalOpen(false);
        setMobileMenuOpen(false);
      }
    };

    // 6. Carousel Auto-Scroll (Every 5 seconds)
    const carouselAutoScroll = setInterval(() => {
      if (carouselRef.current && !carouselRef.current.matches(':hover') && !isDragging) {
        const isEnd = carouselRef.current.scrollLeft + carouselRef.current.clientWidth >= carouselRef.current.scrollWidth - 10;
        if (isEnd) {
          carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          carouselRef.current.scrollBy({ left: 350, behavior: 'smooth' });
        }
      }
    }, 5000);



    window.addEventListener("scroll", handleScroll);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(timer);
      clearInterval(carouselAutoScroll);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
      observer.disconnect();
    };
  }, [handleCarouselScroll, isDragging]);

  // Dedicated Hero Auto-Scroll with Reset on Interaction
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveHeroIndex(prev => (prev + 1) % MOVIES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [activeHeroIndex]);

  // Update Carousel Index for Dots
  useEffect(() => {
    const handleScrollUpdate = () => {
      if (carouselRef.current) {
        const index = Math.round(carouselRef.current.scrollLeft / 350);
        setCarouselIndex(index);
      }
    };
    const track = carouselRef.current;
    track?.addEventListener('scroll', handleScrollUpdate);
    return () => track?.removeEventListener('scroll', handleScrollUpdate);
  }, []);

  const handleSeatClick = (row: number, col: number, type: string) => {
    if (type === 'unavailable') return;
    const seatId = `${String.fromCharCode(65 + row)}${col + 1}`;
    setSelectedSeats(prev => 
      prev.includes(seatId) ? prev.filter(s => s !== seatId) : [...prev, seatId]
    );
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    addToast(t('toast_contact'), "success");
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MovieTheater",
    "name": "CineVista",
    "url": "https://cinevista.lk",
    "logo": "https://cinevista.lk/assets/logo.png",
    "image": HERO_POSTER,
    "description": "Sri Lanka's most immersive theatrical experience.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "No. 120, Galle Road",
      "addressLocality": "Colombo 03",
      "addressRegion": "Western Province",
      "postalCode": "00300",
      "addressCountry": "LK"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 6.9271,
      "longitude": 79.8612
    },
    "telephone": "+94112345678",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "10:00",
        "closes": "23:30"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Saturday", "Sunday"],
        "opens": "09:00",
        "closes": "00:00"
      }
    ]
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* SVG Filters */}
      <svg style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }}>
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
        </filter>
      </svg>

      {/* ============================================================
          BASE UI COMPONENTS
      ============================================================ */}
      
      {/* Loading Screen */}
      <div id="loader" className={!loading ? "exit" : ""} role="alert" aria-busy={loading}>
        <div className="relative">
          <svg className="loader-reel" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" fill="none" stroke="#C9A84C" strokeWidth="2" />
            <circle cx="50" cy="50" r="15" fill="none" stroke="#00D4FF" strokeWidth="1" />
          </svg>
        </div>
        <div className="loader-text">CINEVISTA</div>
      </div>


      {/* Toast System */}
      <div className="fixed top-8 right-8 z-[10001] flex flex-col gap-4 pointer-events-none" aria-live="polite">
        {toasts.map(toast => (
          <div key={toast.id} className="toast pointer-events-auto">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            {toast.msg}
          </div>
        ))}
      </div>

      {/* Back to Top */}
      <button 
        className={`back-to-top ${showBackToTop ? 'visible' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to Top"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
          <path d="M18 15l-6-6-6 6"/>
        </svg>
      </button>

      {/* ============================================================
          NAVIGATION
      ============================================================ */}
      <header className={`nav-bar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="max-w-[1400px] mx-auto px-6 flex justify-between items-center h-full">
          <a href="#" className="flex items-center gap-3 no-underline group" aria-label="CineVista Home">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2" className="group-hover:rotate-45 transition-transform duration-500" aria-hidden="true">
              <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><path d="M12 2v4m0 12v4M2 12h4m12 0h4"/>
            </svg>
            <span className="font-display text-[#C9A84C] text-2xl font-bold tracking-tight">CineVista</span>
          </a>

          <nav className="hidden lg:flex gap-8">
            <a href="#now-showing" className="nav-link" data-i18n="nav_now_showing">{t('nav_now_showing')}</a>
            <a href="#coming-soon" className="nav-link" data-i18n="nav_coming_soon">{t('nav_coming_soon')}</a>
            <a href="#facilities" className="nav-link" data-i18n="nav_experiences">{t('nav_experiences')}</a>
            <a href="#pricing" className="nav-link" data-i18n="nav_pricing">{t('nav_pricing')}</a>
            <a href="#facilities" className="nav-link" data-i18n="nav_facilities">{t('nav_facilities')}</a>
            <a href="#contact" className="nav-link" data-i18n="nav_contact">{t('nav_contact')}</a>
          </nav>

          <div className="hidden lg:flex items-center gap-6">
            <div className="relative group/lang">
              <select className="bg-transparent text-white border-none focus:ring-0 text-sm font-accent cursor-pointer" value={lang} onChange={(e) => setLang(e.target.value as 'en' | 'si' | 'ta' | 'hi')}>
                <option value="en" className="text-black">EN</option>
                <option value="si" className="text-black">සිං</option>
                <option value="ta" className="text-black">தமிழ்</option>
                <option value="hi" className="text-black">हिं</option>
              </select>
              <svg className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
            </div>
            <a href="#showtimes" className="btn-primary" data-i18n="btn_book_tickets">{t('btn_book_tickets')}</a>
          </div>

          <button className="lg:hidden text-white" onClick={() => setMobileMenuOpen(true)} aria-label="Open Menu" aria-expanded={mobileMenuOpen}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12h18M3 6h18M3 18h18"/>
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`} aria-hidden={!mobileMenuOpen}>
        <button className="absolute top-8 right-8 text-white" onClick={() => setMobileMenuOpen(false)} aria-label="Close Menu">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
        <a href="#now-showing" onClick={() => setMobileMenuOpen(false)}>{t('nav_now_showing')}</a>
        <a href="#coming-soon" onClick={() => setMobileMenuOpen(false)}>{t('nav_coming_soon')}</a>
        <a href="#facilities" onClick={() => setMobileMenuOpen(false)}>{t('nav_experiences')}</a>
        <a href="#pricing" onClick={() => setMobileMenuOpen(false)}>{t('nav_pricing')}</a>
        <a href="#contact" onClick={() => setMobileMenuOpen(false)}>{t('nav_contact')}</a>
        <div className="mt-auto">
          <a href="#showtimes" className="btn-primary w-full justify-center py-5 text-xl" onClick={() => setMobileMenuOpen(false)}>{t('btn_book_tickets')}</a>
        </div>
      </div>

      <main>
        {/* ============================================================
            SECTION 4: HERO SECTION
        ============================================================ */}
        <section className="relative h-[100svh] min-h-[700px] flex items-center overflow-hidden bg-[#0A0A0B]">
          {/* Background Images with Crossfade */}
          {MOVIES.map((movie, idx) => (
            <div 
              key={idx} 
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${activeHeroIndex === idx ? 'opacity-100 z-0' : 'opacity-0 z-[-1]'}`}
              aria-hidden="true"
            >
              <Image src={movie.poster} alt="" fill className="object-cover scale-[1.02] filter blur-sm brightness-50" unoptimized />
              
              {/* Dynamic Atmosphere Glow */}
              <div 
                className="absolute left-[-10%] top-[20%] w-[60%] h-[60%] rounded-full opacity-30 blur-[120px] transition-all duration-1000"
                style={{ backgroundColor: dynamicThemeColor }}
              ></div>
              
              <div 
                className="absolute inset-0 transition-all duration-1000"
                style={{ 
                  background: `linear-gradient(to right, #0A0A0B 0%, #0A0A0B 5%, transparent 100%)` 
                }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-transparent to-transparent"></div>
            </div>
          ))}
          
          <div className="hero-grain" aria-hidden="true"></div>

          <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-20">
            
            {/* Left Content */}
            <div className="lg:col-span-7 flex flex-col items-start text-left h-[300px] justify-center">
              {MOVIES.map((movie, idx) => (
                 activeHeroIndex === idx && (
                   <div key={`content-${idx}`} className="animate-fade-in-up w-full">
                     <div className="flex flex-wrap gap-3 mb-6">
                       <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full font-accent text-sm tracking-widest text-[#C9A84C] border border-[#C9A84C]/30">
                        {movie.format}
                       </span>
                       <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full font-accent text-sm tracking-widest text-white border border-white/10">{movie.lang}</span>
                       <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full font-accent text-sm tracking-widest text-white border border-white/10">{movie.rating} ★</span>
                     </div>
                     
                     <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-4 leading-[1.1] drop-shadow-2xl">
                       {movie.title}
                     </h1>
                     
                     <div className="flex items-center gap-4 text-[#9E9E9E] mb-10 text-sm sm:text-base font-sans">
                        <span>{movie.genre}</span>
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: dynamicThemeColor }}></span>
                        <span>{movie.runtime}</span>
                     </div>
                     
                     <div className="flex flex-wrap gap-5">
                       <Link href={`/movie/${movie.id}`} className="btn-primary group">
                         Book Tickets
                         <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                       </Link>
                       <button 
                        className="btn-ghost-dark group border-[#00D4FF] hover:border-[#00D4FF]/50 transition-all duration-500" 
                        onClick={() => addToast(t('toast_trailer'))}
                       >
                         <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:scale-110 transition-transform"><circle cx="12" cy="12" r="10"/><path d="M10 8l6 4-6 4V8z"/></svg>
                         Watch Trailer
                       </button>
                     </div>
                   </div>
                 )
              ))}
            </div>

            {/* Right Mini Carousel */}
            <div className="hidden lg:flex lg:col-span-5 flex-col items-center justify-center h-[500px]">
              <div className="relative w-full h-[400px] flex items-center justify-center" style={{ perspective: '1200px' }}>
                {MOVIES.map((movie, idx) => {
                  let offset = idx - activeHeroIndex;
                  if (offset < -Math.floor(MOVIES.length / 2)) offset += MOVIES.length;
                  if (offset > Math.floor(MOVIES.length / 2)) offset -= MOVIES.length;
                  
                  const zIndex = 10 - Math.abs(offset);
                  const scale = offset === 0 ? 1 : Math.max(0.6, 1 - Math.abs(offset) * 0.15);
                  const translateX = offset * 80;
                  const rotateY = offset * -25;
                  const opacity = Math.abs(offset) > 2 ? 0 : 1 - Math.abs(offset) * 0.3;
                  
                  return (
                    <div 
                      key={`poster-${idx}`} 
                      className="absolute w-[260px] h-[390px] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-700 ease-out cursor-pointer border border-white/5 hover:border-[#C9A84C]/50"
                      style={{
                        transform: `translateX(${translateX}px) scale(${scale}) translateZ(${-Math.abs(offset) * 100}px) rotateY(${rotateY}deg)`,
                        zIndex,
                        opacity,
                      }}
                      onClick={() => setActiveHeroIndex(idx)}
                    >
                      <Image src={movie.poster} alt={movie.title} fill className="object-cover" unoptimized />
                      <div className={`absolute inset-0 bg-black/50 transition-opacity duration-500 ${activeHeroIndex === idx ? 'opacity-0' : 'opacity-100'}`}></div>
                    </div>
                  );
                })}
              </div>

              {/* Manual Controls */}
              <div className="flex gap-4 mt-8">
                <button 
                  onClick={() => setActiveHeroIndex((prev) => (prev - 1 + MOVIES.length) % MOVIES.length)}
                  className="w-12 h-12 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-white flex items-center justify-center hover:bg-[#C9A84C] hover:border-[#C9A84C] hover:text-black transition-all group shadow-xl"
                  aria-label="Previous Movie"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="group-active:scale-90 transition-transform"><path d="M15 18l-6-6 6-6"/></svg>
                </button>
                <button 
                  onClick={() => setActiveHeroIndex((prev) => (prev + 1) % MOVIES.length)}
                  className="w-12 h-12 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-white flex items-center justify-center hover:bg-[#C9A84C] hover:border-[#C9A84C] hover:text-black transition-all group shadow-xl"
                  aria-label="Next Movie"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="group-active:scale-90 transition-transform"><path d="M9 18l6-6-6-6"/></svg>
                </button>
              </div>
            </div>
            
          </div>
          
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 scroll-indicator z-20">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2.5" aria-hidden="true"><path d="M7 13l5 5 5-5M7 6l5 5 5-5"/></svg>
          </div>
        </section>

        {/* ============================================================
            SECTION 5: NOW SHOWING
        ============================================================ */ }
        <section id="now-showing" className="py-24 bg-[#F9F9FB]">
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="flex justify-between items-end mb-12">
              <div className="reveal">
                <h2 className="section-heading" data-i18n="section_now_showing">{t('section_now_showing')}</h2>
                <div className="gold-rule"></div>
              </div>
              <div className="hidden sm:flex gap-3 reveal">
                <button 
                  className="w-12 h-12 rounded-full border border-[#C9A84C] text-[#C9A84C] flex items-center justify-center hover:bg-[#C9A84C] hover:text-black transition-all" 
                  onClick={() => handleCarouselScroll('left')}
                  aria-label="Previous Movies"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg>
                </button>
                <button 
                  className="w-12 h-12 rounded-full border border-[#C9A84C] text-[#C9A84C] flex items-center justify-center hover:bg-[#C9A84C] hover:text-black transition-all" 
                  onClick={() => handleCarouselScroll('right')}
                  aria-label="Next Movies"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M9 18l6-6-6-6"/></svg>
                </button>
              </div>
            </div>

            <div className="relative reveal reveal-delay-1 group/carousel">
              <div 
                className={`carousel-track ${isDragging ? 'cursor-grabbing select-none' : 'cursor-grab'}`}
                ref={carouselRef} 
                tabIndex={0} 
                aria-label="Movies Now Showing"
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseLeave={stopDragging}
                onMouseUp={stopDragging}
              >
                {MOVIES.map((movie, idx) => (
                  <Link href={`/movie/${movie.id}`} key={idx} className={`movie-card block group reveal reveal-delay-${(idx % 4) + 1}`}>
                    <span className="movie-card__badge-lang" style={{ background: movie.color }}>{movie.lang}</span>
                    <span className="movie-card__badge-format">{movie.format}</span>
                    <Image src={movie.poster} alt={movie.title} width={300} height={450} unoptimized />
                    <div className="movie-card__overlay">
                      <h3 className="font-display text-xl mb-2">{movie.title}</h3>
                      <div className="flex gap-2 mb-3">
                        <span className="text-[10px] px-2 py-0.5 border border-[#C9A84C] rounded-full text-[#C9A84C]">{movie.genre}</span>
                        <span className="font-accent text-xs tracking-wider opacity-70">{movie.runtime}</span>
                      </div>
                      <div className="flex text-[#C9A84C] text-sm mb-5">
                        {"★".repeat(Math.floor(movie.rating))}
                        <span className="text-white ml-2 opacity-60">{movie.rating}</span>
                      </div>
                      <div className="btn-primary w-full justify-center py-2.5 text-xs pointer-events-none">View Details</div>
                    </div>
                  </Link>
                ))}
              </div>
              
              {/* Carousel Dots */}
              <div className="flex justify-center gap-2 mt-10">
                {Array.from({ length: Math.ceil(MOVIES.length / 2) }).map((_, i) => (
                  <button 
                    key={i} 
                    onClick={() => carouselRef.current?.scrollTo({ left: i * 700, behavior: 'smooth' })}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${carouselIndex === i ? 'w-8 bg-[#C9A84C]' : 'bg-[#D1D1D8] hover:bg-[#9E9E9E]'}`}
                    aria-label={`Go to movie slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            SECTION 6: COMING SOON
        ============================================================ */}
        <section id="coming-soon" className="py-24 bg-[#0A0A0B] text-white">
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="reveal mb-12 text-center sm:text-left flex flex-col sm:flex-row justify-between items-end gap-6">
              <div>
                <h2 className="section-heading" data-i18n="section_coming_soon">{t('section_coming_soon')}</h2>
                <div className="gold-rule mx-auto sm:mx-0"></div>
              </div>
              {/* Subtle Countdown Placeholder */}
              <div className="text-[#C9A84C] font-accent text-2xl tracking-[0.2em] flex gap-4">
                 <div>12 <span className="text-[10px] block opacity-50">DAYS</span></div>
                 <div className="opacity-30">:</div>
                 <div>08 <span className="text-[10px] block opacity-50">HOURS</span></div>
                 <div className="opacity-30">:</div>
                 <div>45 <span className="text-[10px] block opacity-50">MINS</span></div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 reveal reveal-delay-1">
                {COMING_SOON.map((movie, idx) => (
                <Link href={`/movie/${movie.id}`} key={idx} className={`coming-card block group reveal reveal-delay-${idx + 1}`}>
                  <Image src={movie.poster} alt={movie.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:brightness-50" unoptimized />
                  <span className="absolute top-4 left-4 bg-[#C9A84C] text-black px-3 py-1 rounded-full font-accent text-sm tracking-wider">COMING {movie.releaseDate.split(' ')[0].toUpperCase()}</span>
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex flex-col justify-end p-6">
                    <h3 className="font-display text-2xl mb-1">{movie.title}</h3>
                    <p className="text-[#9E9E9E] text-sm mb-4">{movie.releaseDate}</p>
                    <button className="btn-ghost-dark py-2 px-4 text-xs group/btn relative z-10" onClick={(e) => { e.preventDefault(); addToast(t('toast_remind')); }} data-i18n="btn_remind_me">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover/btn:rotate-12" aria-hidden="true"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
                      {t('btn_remind_me')}
                    </button>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
            SECTION 7: SHOWTIMES
        ============================================================ */}
        <section id="showtimes" className="py-24 bg-white">
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="reveal mb-8">
              <h2 className="section-heading" data-i18n="section_showtimes">{t('section_showtimes')}</h2>
            </div>

            {/* Date Selector Bar */}
            <div className="flex gap-3 overflow-x-auto pb-4 mb-10 scrollbar-none reveal reveal-delay-1" role="tablist" aria-label="Select Date">
              {["Today", "Sat 31", "Sun 1", "Mon 2", "Tue 3", "Wed 4", "Thu 5"].map((date, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveDate(idx)}
                  role="tab"
                  aria-selected={activeDate === idx}
                  className={`flex-none px-8 py-3 rounded-full font-semibold transition-all duration-300 ${activeDate === idx ? 'bg-gold text-black glow-gold shadow-lg' : 'bg-[#E5E5EB] text-[#5A5A5A] hover:bg-[#D1D1D8]'}`}
                >
                  {date}
                </button>
              ))}
            </div>

            {/* Movie Filter Tabs */}
            <div className="flex gap-8 border-b border-[#E5E5EB] mb-12 reveal reveal-delay-2" role="tablist" aria-label="Filter Movies">
              {["All", "English", "Sinhala", "Tamil", "Hindi"].map((tab, idx) => (
                <button key={idx} role="tab" className={`pb-4 font-semibold text-sm transition-all relative ${idx === 0 ? 'text-[#C9A84C]' : 'text-[#9E9E9E] hover:text-[#1A1A1A]'}`}>
                  {tab}
                  {idx === 0 && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#C9A84C]"></div>}
                </button>
              ))}
            </div>

            {/* Movie Rows */}
            <div className="flex flex-col gap-6 reveal reveal-delay-3">
              {[
                { title: "Avengers: Doomsday", lang: "EN", format: "IMAX", img: POSTER_1, times: ["10:30 AM", "1:45 PM", "4:00 PM", "7:15 PM", "10:00 PM"], status: [0, 1, 2, 0, 0] },
                { title: "Aakasame Nuvvu (ආකාශමේ)", lang: "සිං", format: "2D", img: POSTER_2, times: ["11:00 AM", "2:30 PM", "6:00 PM", "9:30 PM"], status: [0, 0, 1, 0] }
              ].map((movie, idx) => (
                <div key={idx} className="flex flex-col lg:flex-row lg:items-center gap-8 p-6 rounded-2xl bg-[#F9F9FB] border border-[#E5E5EB] hover:border-[#C9A84C] transition-all">
                  <div className="flex items-center gap-6 lg:w-1/3">
                    <div className="w-20 h-30 relative rounded-lg overflow-hidden flex-none shadow-md">
                      <Image src={movie.img} alt={movie.title} fill className="object-cover" unoptimized />
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-bold mb-2">{movie.title}</h3>
                      <div className="flex gap-2">
                        <span className="text-[10px] px-2 py-0.5 bg-[#E5E5EB] rounded font-bold">{movie.lang}</span>
                        <span className="text-[10px] px-2 py-0.5 bg-[#1A1A1F] text-white rounded font-bold">{movie.format}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 flex-1">
                    {movie.times.map((time, tIdx) => {
                      const status = movie.status[tIdx]; // 0: Avail, 1: Almost, 2: Sold
                      return (
                        <div key={tIdx} className="flex flex-col gap-2">
                          <button 
                            disabled={status === 2}
                            onClick={() => setSeatModalOpen(true)}
                            className={`px-5 py-3 rounded-md font-accent text-lg tracking-widest transition-all ${
                              status === 2 
                                ? 'bg-[#1A1A1F] text-[#5A5A5A] line-through cursor-not-allowed opacity-50' 
                                : status === 1 
                                  ? 'bg-[#FFB74D] text-black hover:scale-105' 
                                  : 'bg-white border border-[#E5E5EB] text-[#1A1A1A] hover:border-[#C9A84C] hover:text-[#C9A84C] hover:scale-105 shadow-sm'
                            }`}
                          >
                            {time}
                          </button>
                          {status === 1 && <span className="text-[10px] text-[#E65100] font-bold text-center">ALMOST FULL</span>}
                          {status === 2 && <span className="text-[10px] text-[#FF3B3B] font-bold text-center uppercase">Sold Out</span>}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
            SECTION 8: PRICING
        ============================================================ */}
        <section id="pricing" className="py-24 bg-[#0A0A0B] text-white">
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="reveal text-center mb-16">
              <h2 className="section-heading" data-i18n="section_pricing">{t('section_pricing')}</h2>
              <div className="gold-rule mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-stretch reveal reveal-delay-1">
              {/* Standard Tier */}
              <div className="pricing-card bg-[#111114] border border-[#1A1A1F] text-left">
                <h3 className="font-accent text-2xl tracking-[0.2em] mb-4 text-[#9E9E9E]">STANDARD</h3>
                <div className="mb-8">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-sm opacity-60">Weekday</span>
                    <span className="text-2xl font-bold font-accent tracking-wider text-[#C9A84C]">LKR 650</span>
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="text-sm opacity-60">Weekend</span>
                    <span className="text-2xl font-bold font-accent tracking-wider text-[#C9A84C]">LKR 750</span>
                  </div>
                </div>
                <ul className="flex flex-col gap-4 mb-10 text-sm opacity-80">
                  <li className="flex gap-3"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00E676" strokeWidth="2.5" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg> Standard Seating</li>
                  <li className="flex gap-3"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00E676" strokeWidth="2.5" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg> Air Conditioned</li>
                  <li className="flex gap-3"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00E676" strokeWidth="2.5" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg> Dolby Digital Sound</li>
                </ul>
                <button className="btn-ghost-dark w-full justify-center border-white/20">Select Standard</button>
              </div>

              {/* Premium Tier (Featured) */}
              <div className="pricing-card pricing-card--featured text-left shadow-2xl">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold text-black px-4 py-1.5 rounded-full font-accent text-sm tracking-widest font-bold">MOST POPULAR ★</div>
                <h3 className="font-accent text-2xl tracking-[0.2em] mb-4 text-[#C9A84C]">PREMIUM</h3>
                <div className="mb-8">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-sm opacity-60">Weekday</span>
                    <span className="text-2xl font-bold font-accent tracking-wider text-[#C9A84C]">LKR 1,200</span>
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="text-sm opacity-60">Weekend</span>
                    <span className="text-2xl font-bold font-accent tracking-wider text-[#C9A84C]">LKR 1,400</span>
                  </div>
                </div>
                <ul className="flex flex-col gap-4 mb-10 text-sm opacity-90">
                  <li className="flex gap-3"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2.5" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg> Dolby Atmos / IMAX / 4K</li>
                  <li className="flex gap-3"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2.5" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg> Priority Boarding</li>
                  <li className="flex gap-3"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2.5" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg> Concession Discount</li>
                </ul>
                <button className="btn-primary w-full justify-center">Select Premium</button>
              </div>

              {/* VIP Tier */}
              <div className="pricing-card bg-[#111114] border border-[#1A1A1F] text-left">
                <h3 className="font-accent text-2xl tracking-[0.2em] mb-4 text-[#9E9E9E]">VIP RECLINER</h3>
                <div className="mb-8">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-sm opacity-60">Flat Rate</span>
                    <span className="text-2xl font-bold font-accent tracking-wider text-[#C9A84C]">LKR 3,500</span>
                  </div>
                  <p className="text-[10px] opacity-40 mt-1">* PER PERSON / ANY DAY</p>
                </div>
                <ul className="flex flex-col gap-4 mb-10 text-sm opacity-80">
                  <li className="flex gap-3"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00E676" strokeWidth="2.5" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg> Electric Recliners</li>
                  <li className="flex gap-3"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00E676" strokeWidth="2.5" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg> In-seat Dining Service</li>
                  <li className="flex gap-3"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00E676" strokeWidth="2.5" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg> Valet Parking Inc.</li>
                </ul>
                <button className="btn-ghost-dark w-full justify-center border-white/20 text-[#C9A84C]">Select VIP</button>
              </div>
            </div>

            {/* Tuesday Discount Banner */}
            <div className="mt-16 py-6 bg-gold rounded-xl text-black flex flex-col md:flex-row items-center justify-center gap-4 text-center reveal reveal-delay-2 overflow-hidden relative group">
              <div className="absolute inset-0 pointer-events-none opacity-20">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                  <circle cx="10" cy="10" r="2" fill="white" className="animate-ping"/>
                  <circle cx="90" cy="80" r="1.5" fill="white" className="animate-ping delay-700"/>
                  <circle cx="50" cy="20" r="1" fill="white" className="animate-ping delay-300"/>
                </svg>
              </div>
              <span className="font-accent text-2xl tracking-widest">MEMBERS GET 20% OFF EVERY TUESDAY</span>
              <div className="h-4 w-px bg-black/20 hidden md:block"></div>
              <span className="font-medium text-sm">Terms & Conditions apply</span>
            </div>

            {/* Payment Methods */}
            <div className="mt-20 text-center reveal reveal-delay-3">
              <p className="font-sans text-[#5A5A5A] text-xs uppercase tracking-[0.2em] mb-8">Accepted Payment Methods</p>
              <div className="flex flex-wrap justify-center gap-4">
                {["Visa / Mastercard", "iPay Gateway (LK)", "Genie by HNB", "FriMi Digital Wallet", "Sampath Vishwa", "Cash at Box Office"].map((m, i) => (
                  <div key={i} className="px-5 py-3 glass-dark border border-white/10 rounded-md text-xs font-semibold tracking-wide hover:border-[#C9A84C] transition-colors">
                    {m}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            SECTION 9: FACILITIES
        ============================================================ */}
        <section id="facilities" className="py-24 bg-[#F9F9FB]">
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="reveal mb-16">
              <h2 className="section-heading text-[#1A1A1A]" data-i18n="section_facilities">{t('section_facilities')}</h2>
              <div className="gold-rule"></div>
            </div>

            <div className="bento-grid reveal reveal-delay-1">
              {/* Featured Large Card: Dolby Atmos */}
              <div className="bento-large bg-[#111114] text-white p-10 rounded-2xl relative overflow-hidden group">
                <div className="absolute -bottom-20 -right-20 opacity-10 group-hover:opacity-20 transition-opacity duration-700" aria-hidden="true">
                  <svg width="400" height="400" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1"><path d="M2 12h4l2-9 4 18 2-9h6"/></svg>
                </div>
                <div className="relative z-10 h-full flex flex-col justify-end">
                  <div className="w-16 h-16 bg-gold rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" aria-hidden="true"><path d="M2 12h4l2-9 4 18 2-9h6"/></svg>
                  </div>
                  <h3 className="font-display text-4xl mb-4 text-[#C9A84C]">DOLBY ATMOS SOUND</h3>
                  <p className="text-[#9E9E9E] text-lg leading-relaxed max-w-[500px]">
                    360° spatial audio with 64 speaker channels. Feel every whisper and every explosion exactly as the director intended.
                  </p>
                </div>
              </div>

                {[{ t: "IMAX Laser Projection", d: "12K resolution at 120fps with laser precision brightness.", icon: "video" },
                { t: "4DX Motion Seating", d: "Motion-synchronized seats with wind, scent, and water effects.", icon: "wind" },
                { t: "VIP Recliner Lounge", d: "Fully electric leather recliners with personal dining trays.", icon: "coffee" },
                { t: "Premium Food Court", d: "From kottu roti to gourmet nachos. Sri Lankan favourites & global bites.", icon: "utensils" },
                { t: "Ample Parking", d: "500+ covered parking bays with EV charging stations.", icon: "truck" },
                { t: "Accessibility-First", d: "Wheelchair accessible seating, audio description, and captioning.", icon: "user" },
                { t: "Cinema Café", d: "Specialty coffee, freshly baked pastries, and artisan gelato.", icon: "coffee" },
                { t: "Private Screening", d: "Hire a full screen for corporate events and premieres.", icon: "monitor" }
              ].map((f, i) => (
                <div key={i} className={`bg-white border border-[#E5E5EB] p-8 rounded-2xl group hover:-translate-y-1 hover:border-[#C9A84C] hover:shadow-xl transition-all duration-300 reveal reveal-delay-${(i % 4) + 1}`}>
                  <div className="text-[#C9A84C] mb-4 group-hover:scale-110 transition-transform" aria-hidden="true">
                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><path d="M9 3v18m6-18v18M3 9h18M3 15h18"/></svg>
                  </div>
                  <h4 className="font-display text-xl mb-2 font-bold">{f.t}</h4>
                  <p className="text-[#5A5A5A] text-sm leading-relaxed">{f.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
            SECTION 10: LOYALTY
        ============================================================ */}
        <section className="py-24 bg-gradient-to-br from-[#111114] to-[#0A0A0B] text-white">
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="reveal text-center mb-16">
              <h2 className="section-heading" data-i18n="section_loyalty">{t('section_loyalty')}</h2>
              <div className="gold-rule mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 reveal reveal-delay-1">
              {[
                { name: "CineClub", price: "Free", points: "1 point per LKR 10", color: "from-[#444] to-[#222]", accent: "#9E9E9E", btn: t('btn_join_free') },
                { name: "CineGold", price: "LKR 1,500/yr", points: "2x points everywhere", color: "from-[#C9A84C] via-[#E8D5A3] to-[#C9A84C]", accent: "#000", btn: t('btn_upgrade'), dark: true },
                { name: "CinePlatinum", price: "LKR 5,000/yr", points: "3x points + free VIP", color: "from-[#00D4FF] via-[#00a3cc] to-[#00D4FF]", accent: "#000", btn: t('btn_upgrade'), dark: true }
              ].map((tier, idx) => (
                <div key={idx} className="bg-[#1A1A1F] border border-white/5 rounded-2xl p-8 hover:scale-[1.02] transition-all duration-300 shadow-xl group">
                  <div className={`w-full aspect-[1.6/1] bg-gradient-to-br ${tier.color} rounded-xl mb-8 p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl`}>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" aria-hidden="true"></div>
                    <div className="flex justify-between items-start">
                      <span className={`font-accent text-2xl tracking-widest ${tier.dark ? 'text-black' : 'text-white'}`}>{tier.name}</span>
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={tier.dark ? 'black' : 'white'} strokeWidth="1.5" aria-hidden="true"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/></svg>
                    </div>
                    <div className={`${tier.dark ? 'text-black' : 'text-white'}`}>
                      <p className="text-[10px] opacity-60 uppercase tracking-widest mb-1">Membership ID</p>
                      <p className="font-mono text-sm tracking-wider">4021 **** **** 8892</p>
                    </div>
                  </div>
                  <h4 className="text-xl font-display font-bold mb-2">{tier.price}</h4>
                  <p className="text-[#9E9E9E] text-sm mb-8">{tier.points}</p>
                  <button className={`w-full py-4 rounded-md font-bold uppercase tracking-widest text-xs transition-all ${tier.dark ? 'bg-white text-black hover:bg-[#C9A84C]' : 'border border-white/10 hover:border-[#C9A84C] text-[#C9A84C]'}`}>
                    {tier.btn}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
            SECTION 11: CONTACT
        ============================================================ */}
        <section id="contact" className="py-24 bg-[#F9F9FB]">
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
              <div className="reveal">
                <h2 className="section-heading mb-10 text-[#1A1A1A]" data-i18n="section_contact">{t('section_contact')}</h2>
                
                <div className="flex flex-col gap-8 mb-12">
                  <div className="flex gap-5">
                    <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-[#C9A84C] flex-none">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-[#1A1A1A] mb-1 uppercase tracking-wider text-xs">Location</h4>
                      <p className="text-[#5A5A5A] text-sm">No. 120, Galle Road, Colombo 03, Sri Lanka</p>
                    </div>
                  </div>

                  <div className="flex gap-5">
                    <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-[#C9A84C] flex-none">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-[#1A1A1A] mb-1 uppercase tracking-wider text-xs">Call Us</h4>
                      <p className="text-[#5A5A5A] text-sm">+94 11 234 5678</p>
                    </div>
                  </div>

                  <div className="flex gap-5">
                    <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-[#C9A84C] flex-none">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><path d="M8 21h8m-4-4v4"/></svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-[#1A1A1A] mb-1 uppercase tracking-wider text-xs">Box Office Hours</h4>
                      <p className="text-[#5A5A5A] text-sm">Mon-Fri: 10:00 AM – 11:30 PM</p>
                      <p className="text-[#5A5A5A] text-sm">Sat-Sun: 9:00 AM – 12:00 AM</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  {[
                    { n: "Instagram", icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" },
                    { n: "Facebook", icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" },
                    { n: "Youtube", icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" },
                    { n: "Twitter", icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" }
                  ].map((s, i) => (
                    <a key={i} href="#" className="w-10 h-10 rounded-full border border-[#E5E5EB] flex items-center justify-center text-[#C9A84C] hover:border-[#00D4FF] hover:text-[#00D4FF] hover:glow-cyan transition-all" aria-label={s.n}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d={s.icon}/></svg>
                    </a>
                  ))}
                  <a href="#" className="w-10 h-10 rounded-full border border-[#E5E5EB] flex items-center justify-center text-[#C9A84C] hover:border-[#00D4FF] transition-all" aria-label="WhatsApp">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-11.2h.5"></path></svg>
                  </a>
                </div>
                
                <div className="mt-10">
                  <a href="https://maps.google.com" className="btn-ghost-light border-[#C9A84C] text-[#C9A84C]" target="_blank" rel="noopener noreferrer">Get Directions</a>
                </div>
              </div>

              <div className="relative reveal reveal-delay-1">
                <div className="absolute inset-0 bg-[#E5E5EB] rounded-2xl overflow-hidden shadow-2xl" aria-hidden="true">
                   <iframe 
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.8358434863033!2d79.8512!3d6.9271!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwNTUnMzcuNiJOIDc5wrA1MScwNC4zIkU!5e0!3m2!1sen!2slk!4v1614589254884!5m2!1sen!2slk" 
                      width="100%" height="100%" style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(0.85) contrast(1.1)' }} allowFullScreen loading="lazy"
                   ></iframe>
                </div>
                <div className="relative mt-[300px] lg:mt-[400px] bg-white p-10 rounded-2xl shadow-xl border border-[#E5E5EB]">
                  {formSubmitted ? (
                    <div className="py-10 text-center animate-fade-in">
                       <div className="w-16 h-16 bg-[#00E676] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg animate-bounce">
                         <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                       </div>
                       <h3 className="text-2xl font-display font-bold text-[#1A1A1A] mb-2">Success!</h3>
                       <p className="text-[#5A5A5A]">{t('form_success')}</p>
                    </div>
                  ) : (
                    <form onSubmit={handleFormSubmit}>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                        <input type="text" placeholder="Full Name" required className="bg-[#F9F9FB] border border-[#E5E5EB] p-4 rounded-md outline-none focus:border-[#C9A84C] focus:glow-gold transition-all" />
                        <input type="email" placeholder="Email Address" required className="bg-[#F9F9FB] border border-[#E5E5EB] p-4 rounded-md outline-none focus:border-[#C9A84C] focus:glow-gold transition-all" />
                      </div>
                      <select className="w-full bg-[#F9F9FB] border border-[#E5E5EB] p-4 rounded-md outline-none mb-6 focus:border-[#C9A84C] transition-all" required>
                        <option value="">Select Subject</option>
                        <option>Booking Inquiry</option>
                        <option>Feedback</option>
                        <option>Corporate Hire</option>
                        <option>Private Screening</option>
                        <option>Other</option>
                      </select>
                      <textarea placeholder="Your Message" rows={4} className="w-full bg-[#F9F9FB] border border-[#E5E5EB] p-4 rounded-md outline-none mb-8 focus:border-[#C9A84C] transition-all" required></textarea>
                      <button type="submit" className="btn-primary w-full justify-center">{t('btn_send')}</button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ============================================================
          FOOTER
      ============================================================ */}
      <footer className="bg-[#080809] pt-24 text-white">
        <div className="max-w-[1400px] mx-auto px-6">
          
          {/* Newsletter Stripe */}
          <div className="mb-20 py-10 bg-[#111114] border-y border-white/5 flex flex-col lg:flex-row items-center justify-between gap-10 px-10 rounded-2xl">
            <div className="text-center lg:text-left">
              <h3 className="font-display text-3xl mb-2 text-[#C9A84C]">Get Early Access to Tickets</h3>
              <p className="text-[#9E9E9E] text-sm">No spam. Just blockbusters. Unsubscribe anytime.</p>
            </div>
            <form className="flex w-full lg:w-auto gap-4" onSubmit={(e) => { e.preventDefault(); addToast("Subscription successful!"); }}>
              <input type="email" placeholder="Enter your email" className="bg-black border border-white/10 rounded-md px-6 py-4 outline-none focus:border-[#C9A84C] w-full sm:w-80" required aria-label="Email for Newsletter" />
              <button className="btn-primary">Subscribe</button>
            </form>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
            {/* Column 1: Brand */}
            <div className="col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/></svg>
                <span className="font-display text-[#C9A84C] text-2xl font-bold">CineVista</span>
              </div>
              <p className="text-[#9E9E9E] italic mb-6 leading-relaxed font-sans text-lg">&quot;I didn&apos;t just watch a movie; I experienced it. CineVista&apos;s premium service is unmatched in the country.&quot;</p>
              <div className="flex gap-4">
                {["IG", "FB", "YT", "TT"].map((s, i) => (
                  <a key={i} href="#" className="w-10 h-10 rounded-full glass-light border border-white/10 flex items-center justify-center text-white hover:text-[#C9A84C] transition-all" aria-label={s}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="12" cy="12" r="10"/></svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h4 className="font-accent text-lg tracking-[0.2em] mb-8 text-[#C9A84C]">Quick Links</h4>
              <ul className="flex flex-col gap-4 text-sm text-[#9E9E9E]">
                <li><a href="#now-showing" className="hover:text-white transition-colors">Now Showing</a></li>
                <li><a href="#coming-soon" className="hover:text-white transition-colors">Coming Soon</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Book Tickets</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Gift Cards</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Corporate Hire</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Private Screening</a></li>
              </ul>
            </div>

            {/* Column 3: Experiences */}
            <div>
              <h4 className="font-accent text-lg tracking-[0.2em] mb-8 text-[#C9A84C]">Experiences</h4>
              <ul className="flex flex-col gap-4 text-sm text-[#9E9E9E]">
                <li><a href="#" className="hover:text-white transition-colors">Dolby Atmos</a></li>
                <li><a href="#" className="hover:text-white transition-colors">IMAX Laser</a></li>
                <li><a href="#" className="hover:text-white transition-colors">4DX Experience</a></li>
                <li><a href="#" className="hover:text-white transition-colors">VIP Recliners</a></li>
                <li><a href="#" className="hover:text-white transition-colors">CineClub Membership</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Accessibility Services</a></li>
              </ul>
            </div>

            {/* Column 4: Info */}
            <div>
              <h4 className="font-accent text-lg tracking-[0.2em] mb-8 text-[#C9A84C]">Information</h4>
              <ul className="flex flex-col gap-4 text-sm text-[#9E9E9E]">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press & Media</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms & Conditions</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Refund Policy</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="bg-[#040405] py-10 border-t border-white/5">
          <div className="max-w-[1400px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-xs text-[#5A5A5A]">© 2025 CineVista (Pvt) Ltd. All Rights Reserved. | Designed with ♦ for Sri Lanka&apos;s cinema lovers.</p>
            <div className="flex gap-6 text-[10px] font-bold tracking-[0.3em] uppercase text-[#5A5A5A]">
              <button onClick={() => setLang('en')} className={`hover:text-white transition-colors ${lang === 'en' ? 'text-[#C9A84C]' : ''}`}>EN</button>
              <button onClick={() => setLang('si')} className={`hover:text-white transition-colors ${lang === 'si' ? 'text-[#C9A84C]' : ''}`}>සිං</button>
              <button onClick={() => setLang('ta')} className={`hover:text-white transition-colors ${lang === 'ta' ? 'text-[#C9A84C]' : ''}`}>தமிழ்</button>
              <button onClick={() => setLang('hi')} className={`hover:text-white transition-colors ${lang === 'hi' ? 'text-[#C9A84C]' : ''}`}>हिं</button>
            </div>
          </div>
        </div>
      </footer>

      {/* ============================================================
          SEAT SELECTION MODAL
      ============================================================ */}
      {seatModalOpen && (
        <div className="fixed inset-0 z-[10002] flex items-center justify-center p-6 sm:p-10" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-[#0A0A0B]/98 backdrop-blur-xl" onClick={() => setSeatModalOpen(false)}></div>
          <div className="relative w-full max-w-5xl bg-[#111114] rounded-2xl overflow-hidden border border-white/10 shadow-3xl flex flex-col max-h-full">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-white/5 flex justify-between items-center">
              <div>
                <h2 className="font-display text-2xl text-white">Select Your Seats</h2>
                <p className="text-xs text-[#9E9E9E] mt-1">Screen 01 | Avengers: Doomsday (IMAX)</p>
              </div>
              <button onClick={() => setSeatModalOpen(false)} className="w-10 h-10 rounded-full glass-light flex items-center justify-center text-white hover:text-[#C9A84C] transition-colors" aria-label="Close Modal">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-auto p-10 flex flex-col items-center">
              
              {/* Screen Indicator */}
              <div className="w-full max-w-[700px] mb-20 relative">
                <div className="h-1.5 w-full bg-white rounded-full shadow-[0_0_30px_rgba(255,255,255,0.6)]"></div>
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] font-bold tracking-[0.4em] text-white/40 uppercase">Screen This Way</div>
              </div>

              {/* Seat Grid */}
              <div className="flex flex-col gap-3 min-w-[600px] px-4">
                {Array.from({ length: 10 }).map((_, r) => {
                   const isPremium = r >= 4 && r <= 6;
                   const isVIP = r >= 7;
                   const rowLetter = String.fromCharCode(65 + r);
                   
                   return (
                     <div key={r} className="flex gap-3 items-center">
                       <span className="w-6 font-accent text-white/30 text-lg">{rowLetter}</span>
                       <div className="flex gap-3" role="group" aria-label={`Row ${rowLetter}`}>
                         {Array.from({ length: 12 }).map((_, c) => {
                            const isUnavail = (r === 2 && (c === 4 || c === 5)) || (r === 5 && c === 8);
                            const type = isUnavail ? 'unavailable' : isVIP ? 'vip' : isPremium ? 'premium' : 'regular';
                            const id = `${rowLetter}${c + 1}`;
                            const isSelected = selectedSeats.includes(id);

                            return (
                              <button 
                                key={c}
                                disabled={isUnavail}
                                onClick={() => handleSeatClick(r, c, type)}
                                title={`${id} (${type.toUpperCase()})`}
                                aria-label={`Seat ${id} - ${type}`}
                                aria-pressed={isSelected}
                                className={`seat-btn ${type} ${isSelected ? 'selected' : ''} ${c === 2 || c === 9 ? 'mr-6' : ''} w-6 h-6 sm:w-8 sm:h-8`}
                              >
                                {isSelected && <div className="w-1.5 h-1.5 bg-black rounded-full mx-auto" aria-hidden="true"></div>}
                              </button>
                            );
                         })}
                       </div>
                       <span className="w-6 font-accent text-white/30 text-lg text-right">{rowLetter}</span>
                     </div>
                   );
                })}
              </div>

              {/* Legend */}
              <div className="mt-16 flex flex-wrap justify-center gap-8 text-[10px] font-bold tracking-widest text-white/50 uppercase">
                 <div className="flex items-center gap-3"><div className="w-4 h-4 rounded bg-[#2C2C2C]"></div> Regular</div>
                 <div className="flex items-center gap-3"><div className="w-4 h-4 rounded bg-[#1C2333]"></div> Premium</div>
                 <div className="flex items-center gap-3"><div className="w-4 h-4 rounded bg-[#2A1520]"></div> VIP</div>
                 <div className="flex items-center gap-3"><div className="w-4 h-4 rounded bg-[#141414] opacity-40"></div> Unavailable</div>
                 <div className="flex items-center gap-3"><div className="w-4 h-4 rounded bg-[#C9A84C] glow-gold"></div> Selected</div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-6 bg-black/40">
              <div className="text-center sm:text-left">
                <p className="text-sm text-white/60 mb-1" aria-live="polite">Seats Selected: <span className="text-white font-bold">{selectedSeats.join(', ') || 'None'}</span></p>
                <p className="text-3xl font-accent tracking-wider text-[#C9A84C]">LKR {(selectedSeats.length * 1200).toLocaleString()}</p>
              </div>
              <div className="flex gap-4 w-full sm:w-auto">
                <button className="btn-ghost-dark flex-1 sm:flex-none border-white/10" onClick={() => setSelectedSeats([])}>Clear All</button>
                <button 
                  disabled={selectedSeats.length === 0}
                  onClick={() => { setSeatModalOpen(false); addToast("Proceeding to payment..."); }}
                  className={`btn-primary flex-1 sm:flex-none justify-center ${selectedSeats.length === 0 ? 'opacity-30 cursor-not-allowed' : ''}`}
                >
                  Proceed to Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* NoScript Fallback */}
      <noscript>
        <div className="fixed inset-0 z-[99999] bg-black text-white flex items-center justify-center p-10 text-center">
          <p>This premium cinematic experience requires JavaScript. Please enable it in your browser settings.</p>
        </div>
      </noscript>
    </>
  );
}
