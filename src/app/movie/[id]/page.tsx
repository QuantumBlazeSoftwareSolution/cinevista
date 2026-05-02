"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { MOVIES } from "@/data/movies";

export default function MovieDetail({ params }: { params: { id: string } }) {
  const movie = MOVIES.find(m => m.id === params.id) || MOVIES[0];
  const [activeTab, setActiveTab] = useState<'details' | 'booking'>('details');
  const [selectedDate, setSelectedDate] = useState(0);
  const [selectedTime, setSelectedTime] = useState<number | null>(null);

  const dates = [
    { day: "January 26", active: false },
    { day: "January 27", active: true },
    { day: "January 28", active: false },
  ];

  const times = [
    { time: "11:00 AM", price: "LKR 1,200" },
    { time: "12:00 PM", price: "LKR 1,200" },
    { time: "1:00 PM", price: "LKR 1,200" },
    { time: "2:30 PM", price: "LKR 1,200" },
    { time: "4:00 PM", price: "LKR 1,200" },
    { time: "7:30 PM", price: "LKR 1,400" },
    { time: "9:00 PM", price: "LKR 1,400" },
    { time: "11:30 PM", price: "LKR 1,400" },
  ];

  return (
    <div className="min-h-screen bg-[#111114] text-white font-sans selection:bg-[#C9A84C] selection:text-black pb-24">
      {/* Top Background & Header */}
      <div className="relative h-[400px] w-full">
        <Image src={movie.bg} alt="Background" fill className="object-cover opacity-60" unoptimized />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#111114]/80 to-[#111114]"></div>
        
        {/* Navbar */}
        <div className="absolute top-0 w-full p-6 flex justify-between items-center z-30">
          <Link href="/" className="w-10 h-10 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-md">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          </Link>
          <div className="flex gap-4">
            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-md">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13"/></svg>
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-md text-[#C9A84C]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            </button>
          </div>
        </div>

        {/* Play Button / Trailer */}
        <div 
          onClick={() => window.open(`https://www.youtube.com/results?search_query=${movie.title}+trailer`, '_blank')}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border-2 border-white/30 bg-white/10 backdrop-blur-sm flex items-center justify-center cursor-pointer hover:scale-110 hover:bg-white/20 transition-all z-20"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white" className="ml-1"><path d="M5 3l14 9-14 9V3z"/></svg>
        </div>
      </div>

      <div className="max-w-[800px] mx-auto px-6 relative z-20 -mt-20">
        
        {/* Title & Tags */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-display font-bold mb-4 flex items-center justify-center gap-3">
            {movie.title} <span className="text-2xl font-normal text-[#9E9E9E]">({movie.year})</span>
          </h1>
          <div className="flex justify-center gap-3 mt-4">
            {movie.genre.split('/').map(tag => (
              <span key={tag} className="px-4 py-1.5 border border-white/20 rounded-full text-xs tracking-widest text-[#9E9E9E] font-accent">{tag.trim().toUpperCase()}</span>
            ))}
          </div>
        </div>

        {activeTab === 'details' ? (
          <div className="animate-fade-in-up pb-32">
            {/* Ratings */}
            <div className="flex justify-between items-center py-8 border-y border-white/10 mb-12">
              <div className="text-center">
                <p className="text-3xl font-bold text-[#00E676]">{movie.rating * 20}</p>
                <p className="text-xs text-[#9E9E9E] mt-1 tracking-widest">METASCORE</p>
              </div>
              <div className="w-px h-12 bg-white/10"></div>
              <div className="text-center">
                <p className="text-3xl font-bold flex items-center justify-center gap-2">
                  <span className="text-[#FF3B3B]">★</span> {movie.rating}<span className="text-sm text-[#9E9E9E]">/5</span>
                </p>
                <p className="text-xs text-[#9E9E9E] mt-1 tracking-widest">USER SCORE</p>
              </div>
              <div className="w-px h-12 bg-white/10"></div>
              <div className="text-center cursor-pointer hover:text-[#C9A84C] transition-colors group">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mx-auto mb-1 group-hover:scale-110 transition-transform"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                <p className="text-xs mt-1 tracking-widest">RATE THIS</p>
              </div>
            </div>

            {/* Poster & Info Grid */}
            <div className="flex flex-col sm:flex-row gap-8 mb-12">
              <div className="w-[180px] h-[270px] mx-auto sm:mx-0 flex-none relative rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/5">
                <Image src={movie.poster} alt={movie.title} fill className="object-cover" unoptimized />
              </div>
              <div className="flex flex-col justify-center gap-4 text-sm sm:text-base">
                <p className="flex justify-between sm:justify-start sm:gap-4 border-b border-white/5 pb-2">
                  <span className="text-[#9E9E9E] min-w-[120px]">Running Time:</span> 
                  <span className="text-white font-medium">{movie.runtime}</span>
                </p>
                <p className="flex justify-between sm:justify-start sm:gap-4 border-b border-white/5 pb-2">
                  <span className="text-[#9E9E9E] min-w-[120px]">Release Date:</span> 
                  <span className="text-white font-medium">{movie.releaseDate}</span>
                </p>
                <p className="flex justify-between sm:justify-start sm:gap-4 border-b border-white/5 pb-2">
                  <span className="text-[#9E9E9E] min-w-[120px]">Director:</span> 
                  <span className="text-white font-medium">{movie.director}</span>
                </p>
                <p className="flex justify-between sm:justify-start sm:gap-4 border-b border-white/5 pb-2">
                  <span className="text-[#9E9E9E] min-w-[120px]">Writer:</span> 
                  <span className="text-white font-medium">{movie.writer}</span>
                </p>
              </div>
            </div>

            {/* Storyline */}
            <div className="mb-12">
              <h3 className="text-xl font-bold mb-4 font-display tracking-wide">STORYLINE</h3>
              <p className="text-[#9E9E9E] text-base leading-relaxed font-sans">{movie.storyline}</p>
            </div>

            {/* Cast & Crew */}
            <div className="mb-12">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold font-display tracking-wide">CAST & CREW</h3>
                <span className="text-xs text-[#C9A84C] tracking-[0.2em] cursor-pointer hover:text-white transition-colors">SEE ALL</span>
              </div>
              <div className="flex gap-6 overflow-x-auto scrollbar-none pb-4">
                {movie.cast.map((actor, idx) => (
                  <div key={idx} className="flex-none w-[110px] group cursor-pointer">
                    <div className="w-[110px] h-[110px] rounded-2xl overflow-hidden relative mb-3 border border-white/5 group-hover:border-[#C9A84C]/50 transition-colors">
                      <Image src={actor.img} alt={actor.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" unoptimized />
                    </div>
                    <p className="text-sm font-bold text-white mb-1">{actor.name}</p>
                    <p className="text-xs text-[#9E9E9E]">{actor.character}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Buy Ticket Button */}
            <div className="fixed bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-[#111114] via-[#111114] to-transparent z-50">
              <button 
                onClick={() => setActiveTab('booking')}
                className="w-full max-w-[800px] mx-auto block py-5 rounded-2xl text-white font-bold tracking-[0.2em] text-sm bg-gradient-to-r from-[#FF512F] to-[#DD2476] shadow-[0_15px_35px_rgba(221,36,118,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                BUY TICKETS
              </button>
            </div>
          </div>
        ) : (
          <div className="animate-fade-in-up pb-32">
            {/* Date Selector */}
            <div className="flex justify-between items-center mb-10 border-b border-white/10 pb-6">
              {dates.map((d, idx) => (
                <div 
                  key={idx} 
                  onClick={() => setSelectedDate(idx)}
                  className={`cursor-pointer transition-all duration-300 ${selectedDate === idx ? 'text-white scale-110' : 'text-[#5A5A5A] hover:text-[#9E9E9E]'}`}
                >
                  <p className={`font-bold tracking-wider ${selectedDate === idx ? 'text-xl' : 'text-sm'}`}>{d.day}</p>
                  {selectedDate === idx && <div className="w-1/2 h-1 bg-gradient-to-r from-[#FF512F] to-[#DD2476] mx-auto mt-3 rounded-full"></div>}
                </div>
              ))}
            </div>

            {/* Screening Type */}
            <div className="mb-8">
              <p className="text-xs text-[#9E9E9E] mb-3 tracking-widest">SCREENING TYPE</p>
              <div className="relative">
                <select className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-[#C9A84C]/50 appearance-none font-accent">
                  <option value="2d" className="bg-[#111114]">2D EXPERIENCE</option>
                  <option value="3d" className="bg-[#111114]">3D EXPERIENCE</option>
                  <option value="imax" className="bg-[#111114]">IMAX EXPERIENCE</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#9E9E9E]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
                </div>
              </div>
            </div>

            {/* Time Grid */}
            <div className="grid grid-cols-2 gap-4 mb-24">
              {times.map((t, idx) => (
                <div 
                  key={idx} 
                  onClick={() => setSelectedTime(idx)}
                  className={`border rounded-2xl p-5 text-center cursor-pointer transition-all duration-300 ${selectedTime === idx ? 'border-white bg-white/10 shadow-[0_10px_30px_rgba(255,255,255,0.1)] scale-[1.02]' : 'border-white/10 hover:border-white/30 hover:bg-white/5'}`}
                >
                  <p className="font-bold text-xl mb-1 font-accent">{t.time}</p>
                  <p className="text-xs text-[#C9A84C] tracking-widest">{t.price}</p>
                </div>
              ))}
            </div>

            {/* Choose Seats Button */}
            <div className="fixed bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-[#111114] via-[#111114] to-transparent z-50">
              <button 
                onClick={() => {
                  if (selectedTime === null) alert("Please select a showtime.");
                  else alert("Proceeding to seat selection for " + movie.title);
                }}
                className="w-full max-w-[800px] mx-auto flex justify-center items-center gap-3 py-5 rounded-2xl text-white font-bold tracking-[0.2em] text-sm bg-gradient-to-r from-[#FF512F] to-[#DD2476] shadow-[0_15px_35px_rgba(221,36,118,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                CHOOSE SEATS
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="animate-pulse"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
