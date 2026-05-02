"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Mock Data
const movieData = {
  id: "avengers-doomsday",
  title: "Avengers: Doomsday",
  year: "2026",
  tags: ["ACTION", "SCI-FI", "IMAX"],
  metascore: 9.8,
  rating: "9.2",
  reviews: "45K Reviews",
  runtime: "2h 45min",
  releaseDate: "01.05.2026",
  director: "Anthony & Joe Russo",
  writer: "Stephen McFeely",
  storyline: "The Avengers face their greatest threat yet as Victor von Doom emerges from the multiverse to reshape reality in his own image. A cosmic battle that spans dimensions and tests the limits of every hero.",
  cast: [
    { name: "Robert Downey Jr.", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&fit=crop" },
    { name: "Tom Holland", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&fit=crop" },
    { name: "Benedict Cumberbatch", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&fit=crop" },
    { name: "Chris Hemsworth", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&fit=crop" }
  ],
  poster: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=600&fit=crop",
  bg: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=1200&fit=crop"
};

export default function MovieDetail({ params }: { params: { id: string } }) {
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
      <div className="relative h-[300px] w-full">
        <Image src={movieData.bg} alt="Background" fill className="object-cover opacity-60" unoptimized />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#111114]/80 to-[#111114]"></div>
        
        {/* Navbar */}
        <div className="absolute top-0 w-full p-6 flex justify-between items-center z-10">
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

        {/* Play Button */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border-2 border-white/30 bg-white/10 backdrop-blur-sm flex items-center justify-center cursor-pointer hover:scale-110 hover:bg-white/20 transition-all z-10">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white" className="ml-1"><path d="M5 3l14 9-14 9V3z"/></svg>
        </div>
      </div>

      <div className="max-w-[800px] mx-auto px-6 relative z-20 -mt-10">
        
        {/* Title & Tags */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-display font-bold mb-2 flex items-center justify-center gap-3">
            {movieData.title} <span className="text-xl font-normal text-[#9E9E9E]">({movieData.year})</span>
          </h1>
          <div className="flex justify-center gap-3 mt-4">
            {movieData.tags.map(tag => (
              <span key={tag} className="px-3 py-1 border border-white/20 rounded-full text-[10px] tracking-widest text-[#9E9E9E]">{tag}</span>
            ))}
          </div>
        </div>

        {activeTab === 'details' ? (
          <div className="animate-fade-in-up pb-32">
            {/* Ratings */}
            <div className="flex justify-between items-center py-6 border-y border-white/10 mb-8">
              <div className="text-center">
                <p className="text-2xl font-bold text-[#00E676]">{movieData.metascore}</p>
                <p className="text-xs text-[#9E9E9E] mt-1">Metascore</p>
              </div>
              <div className="w-px h-10 bg-white/10"></div>
              <div className="text-center">
                <p className="text-2xl font-bold flex items-center justify-center gap-1">
                  <span className="text-[#FF3B3B]">★</span> {movieData.rating}<span className="text-sm text-[#9E9E9E]">/10</span>
                </p>
                <p className="text-xs text-[#9E9E9E] mt-1">{movieData.reviews}</p>
              </div>
              <div className="w-px h-10 bg-white/10"></div>
              <div className="text-center cursor-pointer hover:text-[#C9A84C] transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mx-auto mb-1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                <p className="text-xs mt-1">Rate This</p>
              </div>
            </div>

            {/* Poster & Info Grid */}
            <div className="flex gap-6 mb-10">
              <div className="w-[120px] h-[180px] flex-none relative rounded-xl overflow-hidden shadow-2xl">
                <Image src={movieData.poster} alt={movieData.title} fill className="object-cover" unoptimized />
              </div>
              <div className="flex flex-col justify-center gap-2 text-sm">
                <p><span className="text-[#9E9E9E]">Title:</span> {movieData.title}</p>
                <p><span className="text-[#9E9E9E]">Running Time:</span> {movieData.runtime}</p>
                <p><span className="text-[#9E9E9E]">Release Date:</span> {movieData.releaseDate}</p>
                <p><span className="text-[#9E9E9E]">Director:</span> {movieData.director}</p>
                <p><span className="text-[#9E9E9E]">Writer:</span> {movieData.writer}</p>
              </div>
            </div>

            {/* Storyline */}
            <div className="mb-10">
              <h3 className="text-lg font-bold mb-3">Storyline</h3>
              <p className="text-[#9E9E9E] text-sm leading-relaxed">{movieData.storyline}</p>
            </div>

            {/* Cast & Crew */}
            <div className="mb-10">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">Full Cast & Crew</h3>
                <span className="text-xs text-[#9E9E9E] tracking-widest cursor-pointer hover:text-white">SEE ALL</span>
              </div>
              <div className="flex gap-4 overflow-x-auto scrollbar-none pb-4">
                {movieData.cast.map((actor, idx) => (
                  <div key={idx} className="flex-none w-[90px]">
                    <div className="w-[90px] h-[90px] rounded-xl overflow-hidden relative mb-2">
                      <Image src={actor.img} alt={actor.name} fill className="object-cover" unoptimized />
                    </div>
                    <p className="text-xs text-center text-[#9E9E9E]">{actor.name}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Buy Ticket Button */}
            <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#111114] via-[#111114] to-transparent z-50">
              <button 
                onClick={() => setActiveTab('booking')}
                className="w-full max-w-[800px] mx-auto block py-4 rounded-xl text-white font-bold tracking-widest text-sm bg-gradient-to-r from-[#FF512F] to-[#DD2476] shadow-[0_10px_30px_rgba(221,36,118,0.3)] hover:scale-[1.02] transition-transform"
              >
                BUY TICKET
              </button>
            </div>
          </div>
        ) : (
          <div className="animate-fade-in-up">
            {/* Date Selector */}
            <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
              {dates.map((d, idx) => (
                <div 
                  key={idx} 
                  onClick={() => setSelectedDate(idx)}
                  className={`cursor-pointer transition-colors ${selectedDate === idx ? 'text-white' : 'text-[#5A5A5A]'}`}
                >
                  <p className={`font-bold ${selectedDate === idx ? 'text-lg' : 'text-sm'}`}>{d.day}</p>
                  {selectedDate === idx && <div className="w-1/2 h-1 bg-gradient-to-r from-[#FF512F] to-[#DD2476] mx-auto mt-2 rounded-full"></div>}
                </div>
              ))}
            </div>

            {/* Screening Type */}
            <div className="mb-6">
              <p className="text-xs text-[#9E9E9E] mb-2">Screening Type</p>
              <select className="w-full bg-transparent border border-white/20 rounded-lg p-3 text-white focus:outline-none focus:border-white appearance-none">
                <option value="2d" className="bg-[#111114]">2D</option>
                <option value="3d" className="bg-[#111114]">3D</option>
                <option value="imax" className="bg-[#111114]">IMAX</option>
              </select>
            </div>

            {/* Time Grid */}
            <div className="grid grid-cols-2 gap-4 mb-24">
              {times.map((t, idx) => (
                <div 
                  key={idx} 
                  onClick={() => setSelectedTime(idx)}
                  className={`border rounded-xl p-4 text-center cursor-pointer transition-all ${selectedTime === idx ? 'border-white bg-white/5 shadow-lg' : 'border-white/10 hover:border-white/30'}`}
                >
                  <p className="font-bold text-lg mb-1">{t.time}</p>
                  <p className="text-xs text-[#9E9E9E]">{t.price}</p>
                </div>
              ))}
            </div>

            {/* Choose Seats Button */}
            <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#111114] via-[#111114] to-transparent z-50">
              <button 
                onClick={() => {
                  if (selectedTime === null) alert("Please select a time.");
                  else alert("Proceeding to seat selection...");
                }}
                className="w-full max-w-[800px] mx-auto flex justify-center items-center gap-2 py-4 rounded-xl text-white font-bold tracking-widest text-sm bg-gradient-to-r from-[#FF512F] to-[#DD2476] shadow-[0_10px_30px_rgba(221,36,118,0.3)] hover:scale-[1.02] transition-transform"
              >
                CHOOSE SEATS
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
