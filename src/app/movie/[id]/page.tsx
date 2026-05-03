"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import AlertModal from "@/components/AlertModal";
import { MOVIES } from "@/data/movies";

export default function MovieDetail({ params }: { params: { id: string } }) {
  const movie = MOVIES.find((m) => m.id === params.id) || MOVIES[0];
  const [activeTab, setActiveTab] = useState<"details" | "booking">("details");
  const [bookingStep, setBookingStep] = useState<1 | 2 | 3>(1); // 1: Date/Time, 2: Seat Map, 3: Checkout
  const [ticketCount, setTicketCount] = useState(2);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState(0);
  const [selectedTime, setSelectedTime] = useState<number | null>(null);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const mockSoldSeats = [
    "K5",
    "K6",
    "L10",
    "L11",
    "C12",
    "C13",
    "C14",
    "N1",
    "N2",
    "E5",
    "E6",
    "E7",
  ];

  const seatLayout = [
    {
      name: "BOX",
      price: "LKR 600.00",
      rows: [
        { id: "N", left: [1, 2, 3, 4, 5, 6], right: [7, 8, 9, 10, 11, 12] },
        { id: "O", left: [1, 2, 3, 4, 5, 6], right: [7, 8, 9, 10, 11, 12] },
        { id: "P", left: [1, 2, 3, 4, 5, 6], right: [7, 8, 9, 10, 11, 12] },
      ],
    },
    {
      name: "BALCONY",
      price: "LKR 550.00",
      rows: [
        {
          id: "K",
          left: [1, 2, 3, 4, 5, 6, 7],
          right: [8, 9, 10, 11, 12, 13, 14],
        },
        {
          id: "L",
          left: [1, 2, 3, 4, 5, 6, 7, 8],
          right: [9, 10, 11, 12, 13, 14, 15],
        },
        {
          id: "M",
          left: [1, 2, 3, 4, 5, 6, 7, 8],
          right: [9, 10, 11, 12, 13, 14, 15],
        },
      ],
    },
    {
      name: "ODC",
      price: "LKR 500.00",
      rows: [
        {
          id: "A",
          left: [1, 2, 3, 4, 5, 6, 7, 8],
          right: [9, 10, 11, 12, 13, 14, 15, 16],
        },
        {
          id: "B",
          left: [1, 2, 3, 4, 5, 6, 7],
          right: [8, 9, 10, 11, 12, 13, 14, 15],
        },
        {
          id: "C",
          left: [1, 2, 3, 4, 5, 6, 7, 8],
          right: [9, 10, 11, 12, 13, 14, 15, 16],
        },
        {
          id: "D",
          left: [1, 2, 3, 4, 5, 6, 7, 8],
          right: [9, 10, 11, 12, 13, 14, 15, 16],
        },
        {
          id: "E",
          left: [1, 2, 3, 4, 5, 6, 7, 8, 9],
          right: [10, 11, 12, 13, 14, 15, 16, 17],
        },
        {
          id: "F",
          left: [1, 2, 3, 4, 5, 6, 7, 8, 9],
          right: [10, 11, 12, 13, 14, 15, 16, 17],
        },
        {
          id: "G",
          left: [1, 2, 3, 4, 5, 6, 7, 8, 9],
          right: [10, 11, 12, 13, 14, 15, 16, 17],
        },
        {
          id: "H",
          left: [1, 2, 3, 4, 5, 6, 7, 8, 9],
          right: [10, 11, 12, 13, 14, 15, 16, 17],
        },
        {
          id: "I",
          left: [1, 2, 3, 4, 5, 6, 7, 8, 9],
          right: [10, 11, 12, 13, 14, 15, 16, 17],
        },
        {
          id: "J",
          left: [1, 2, 3, 4, 5, 6, 7, 8, 9],
          right: [10, 11, 12, 13, 14, 15, 16, 17],
        },
      ],
    },
  ];

  const handleSeatClick = (seatId: string) => {
    if (mockSoldSeats.includes(seatId)) return;

    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((id) => id !== seatId));
    } else {
      if (selectedSeats.length < ticketCount) {
        setSelectedSeats([...selectedSeats, seatId]);
      } else {
        setAlertMessage(`You can only select ${ticketCount} seats.`);
      }
    }
  };

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
        <Image
          src={movie.bg}
          alt="Background"
          fill
          className="object-cover opacity-60"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#111114]/80 to-[#111114]"></div>

        {/* Navbar */}
        <div className="absolute top-0 w-full p-6 flex justify-between items-center z-30">
          <button
            onClick={() => {
              if (activeTab === "booking" && bookingStep > 1) {
                setBookingStep((prev) => (prev - 1) as any);
              } else if (activeTab === "booking") {
                setActiveTab("details");
              } else {
                window.history.back();
              }
            }}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-md hover:bg-white/20 transition-all"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex gap-4">
            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-md">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13" />
              </svg>
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-md text-[#C9A84C]">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Play Button / Trailer */}
        <div
          onClick={() =>
            window.open(
              `https://www.youtube.com/results?search_query=${movie.title}+trailer`,
              "_blank",
            )
          }
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border-2 border-white/30 bg-white/10 backdrop-blur-sm flex items-center justify-center cursor-pointer hover:scale-110 hover:bg-white/20 transition-all z-20"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="white"
            className="ml-1"
          >
            <path d="M5 3l14 9-14 9V3z" />
          </svg>
        </div>
      </div>

      <div className="w-full max-w-6xl mx-auto px-6 xl:px-0 relative z-20 -mt-20">
        {/* Title & Tags */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-display font-bold mb-4 flex items-center justify-center gap-3">
            {movie.title}{" "}
            <span className="text-2xl font-normal text-[#9E9E9E]">
              ({movie.year})
            </span>
          </h1>
          <div className="flex justify-center gap-3 mt-4">
            {movie.genre.split("/").map((tag) => (
              <span
                key={tag}
                className="px-4 py-1.5 border border-white/20 rounded-full text-xs tracking-widest text-[#9E9E9E] font-accent"
              >
                {tag.trim().toUpperCase()}
              </span>
            ))}
          </div>
        </div>

        {activeTab === "details" ? (
          <div className="animate-fade-in-up pb-32">
            {/* Ratings */}
            <div className="flex justify-between items-center py-8 border-y border-white/10 mb-12">
              <div className="text-center">
                <p className="text-3xl font-bold text-[#00E676]">
                  {movie.rating * 20}
                </p>
                <p className="text-xs text-[#9E9E9E] mt-1 tracking-widest">
                  METASCORE
                </p>
              </div>
              <div className="w-px h-12 bg-white/10"></div>
              <div className="text-center">
                <p className="text-3xl font-bold flex items-center justify-center gap-2">
                  <span className="text-[#FF3B3B]">★</span> {movie.rating}
                  <span className="text-sm text-[#9E9E9E]">/5</span>
                </p>
                <p className="text-xs text-[#9E9E9E] mt-1 tracking-widest">
                  USER SCORE
                </p>
              </div>
              <div className="w-px h-12 bg-white/10"></div>
              <div className="text-center cursor-pointer hover:text-[#C9A84C] transition-colors group">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="mx-auto mb-1 group-hover:scale-110 transition-transform"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                <p className="text-xs mt-1 tracking-widest">RATE THIS</p>
              </div>
            </div>

            {/* Poster & Info Grid */}
            <div className="flex flex-col sm:flex-row gap-8 mb-12">
              <div className="w-[180px] h-[270px] mx-auto sm:mx-0 flex-none relative rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/5">
                <Image
                  src={movie.poster}
                  alt={movie.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div className="flex flex-col justify-center gap-4 text-sm sm:text-base">
                <p className="flex justify-between sm:justify-start sm:gap-4 border-b border-white/5 pb-2">
                  <span className="text-[#9E9E9E] min-w-[120px]">
                    Running Time:
                  </span>
                  <span className="text-white font-medium">
                    {movie.runtime}
                  </span>
                </p>
                <p className="flex justify-between sm:justify-start sm:gap-4 border-b border-white/5 pb-2">
                  <span className="text-[#9E9E9E] min-w-[120px]">
                    Release Date:
                  </span>
                  <span className="text-white font-medium">
                    {movie.releaseDate}
                  </span>
                </p>
                <p className="flex justify-between sm:justify-start sm:gap-4 border-b border-white/5 pb-2">
                  <span className="text-[#9E9E9E] min-w-[120px]">
                    Director:
                  </span>
                  <span className="text-white font-medium">
                    {movie.director}
                  </span>
                </p>
                <p className="flex justify-between sm:justify-start sm:gap-4 border-b border-white/5 pb-2">
                  <span className="text-[#9E9E9E] min-w-[120px]">Writer:</span>
                  <span className="text-white font-medium">{movie.writer}</span>
                </p>
              </div>
            </div>

            {/* Storyline */}
            <div className="mb-12">
              <h3 className="text-xl font-bold mb-4 font-display tracking-wide">
                STORYLINE
              </h3>
              <p className="text-[#9E9E9E] text-base leading-relaxed font-sans">
                {movie.storyline}
              </p>
            </div>

            {/* Cast & Crew */}
            <div className="mb-16">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold font-display tracking-wide">
                  CAST & CREW
                </h3>
                <span className="text-xs text-[#C9A84C] tracking-[0.2em] cursor-pointer hover:text-white transition-colors">
                  SEE ALL
                </span>
              </div>
              <div className="flex gap-6 overflow-x-auto scrollbar-none pb-4">
                {movie.cast.map((actor, idx) => (
                  <div
                    key={idx}
                    className="flex-none w-[110px] group cursor-pointer"
                  >
                    <div className="w-[110px] h-[110px] rounded-2xl overflow-hidden relative mb-3 border border-white/5 group-hover:border-[#C9A84C]/50 transition-colors">
                      <Image
                        src={actor.img}
                        alt={actor.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        unoptimized
                      />
                    </div>
                    <p className="text-sm font-bold text-white mb-1">
                      {actor.name}
                    </p>
                    <p className="text-xs text-[#9E9E9E]">{actor.character}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Audience Reviews */}
            <div className="mb-12">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-bold font-display tracking-wide">
                  AUDIENCE REVIEWS
                </h3>
                <button className="text-xs border border-white/20 px-4 py-2 rounded-lg tracking-widest hover:bg-white hover:text-black transition-all">
                  WRITE A REVIEW
                </button>
              </div>

              <div className="space-y-6">
                {movie.reviewsData?.map((review, idx) => (
                  <div
                    key={idx}
                    className="bg-white/5 border border-white/5 p-6 rounded-2xl hover:border-white/10 transition-all"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF512F] to-[#DD2476] flex items-center justify-center font-bold text-sm">
                          {review.user.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-bold text-sm flex items-center gap-2">
                            {review.user}
                            {review.isVerified && (
                              <span className="flex items-center gap-1 text-[9px] bg-[#00E676]/20 text-[#00E676] px-1.5 py-0.5 rounded-full tracking-tighter uppercase font-bold">
                                <svg
                                  width="8"
                                  height="8"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                >
                                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                                </svg>
                                Verified
                              </span>
                            )}
                          </h4>
                          <p className="text-[10px] text-[#9E9E9E] mt-0.5 uppercase tracking-widest font-accent">
                            {review.date}
                          </p>
                        </div>
                      </div>
                      <div className="flex text-[#FF3B3B] text-xs">
                        {"★".repeat(review.rating)}
                        {"☆".repeat(5 - review.rating)}
                      </div>
                    </div>
                    <p className="text-[#9E9E9E] text-sm leading-relaxed italic">
                      &quot;{review.comment}&quot;
                    </p>
                    <div className="mt-4 flex gap-4">
                      <button className="text-[10px] text-[#C9A84C] flex items-center gap-1 hover:underline">
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                        </svg>
                        Helpful
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Buy Ticket Button */}
            <div className="fixed bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-[#111114] via-[#111114] to-transparent z-50">
              <button
                onClick={() => setActiveTab("booking")}
                className="w-full max-w-6xl mx-auto block py-5 rounded-2xl text-white font-bold tracking-[0.2em] text-sm bg-gradient-to-r from-[#FF512F] to-[#DD2476] shadow-[0_15px_35px_rgba(221,36,118,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                BUY TICKETS
              </button>
            </div>
          </div>
        ) : bookingStep === 1 ? (
          <div className="animate-fade-in-up pb-32">
            {/* Date Selector */}
            <div className="flex justify-between items-center mb-10 border-b border-white/10 pb-6">
              {dates.map((d, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedDate(idx)}
                  className={`cursor-pointer transition-all duration-300 ${selectedDate === idx ? "text-white scale-110" : "text-[#5A5A5A] hover:text-[#9E9E9E]"}`}
                >
                  <p
                    className={`font-bold tracking-wider ${selectedDate === idx ? "text-xl" : "text-sm"}`}
                  >
                    {d.day}
                  </p>
                  {selectedDate === idx && (
                    <div className="w-1/2 h-1 bg-gradient-to-r from-[#FF512F] to-[#DD2476] mx-auto mt-3 rounded-full"></div>
                  )}
                </div>
              ))}
            </div>

            {/* Screening Type */}
            <div className="mb-8">
              <p className="text-xs text-[#9E9E9E] mb-3 tracking-widest">
                SCREENING TYPE
              </p>
              <div className="relative">
                <select className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-[#C9A84C]/50 appearance-none font-accent">
                  <option value="2d" className="bg-[#111114]">
                    2D EXPERIENCE
                  </option>
                  <option value="3d" className="bg-[#111114]">
                    3D EXPERIENCE
                  </option>
                  <option value="imax" className="bg-[#111114]">
                    IMAX EXPERIENCE
                  </option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#9E9E9E]">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Time Grid */}
            <div className="grid grid-cols-2 gap-4 mb-24">
              {times.map((t, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedTime(idx)}
                  className={`border rounded-2xl p-5 text-center cursor-pointer transition-all duration-300 ${selectedTime === idx ? "border-white bg-white/10 shadow-[0_10px_30px_rgba(255,255,255,0.1)] scale-[1.02]" : "border-white/10 hover:border-white/30 hover:bg-white/5"}`}
                >
                  <p className="font-bold text-xl mb-1 font-accent">{t.time}</p>
                  <p className="text-xs text-[#C9A84C] tracking-widest">
                    {t.price}
                  </p>
                </div>
              ))}
            </div>

            {/* Next Button */}
            <div className="fixed bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-[#111114] via-[#111114] to-transparent z-50">
              <button
                onClick={() => {
                  if (selectedTime === null)
                    setAlertMessage("Please select a showtime.");
                  else setBookingStep(2);
                }}
                className="w-full max-w-6xl mx-auto flex justify-center items-center gap-3 py-5 rounded-2xl text-white font-bold tracking-[0.2em] text-sm bg-gradient-to-r from-[#FF512F] to-[#DD2476] shadow-[0_15px_35px_rgba(221,36,118,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                SELECT SEATS
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  className="animate-pulse"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        ) : bookingStep === 2 ? (
          <div className="animate-fade-in-up pb-32">
            {/* Ticket Count Selector */}
            <div className="mb-12 text-center">
              <h3 className="text-xl font-bold font-display tracking-wide mb-6">
                HOW MANY TICKETS?
              </h3>
              <div className="flex items-center justify-center gap-6">
                <button
                  onClick={() => setTicketCount(Math.max(1, ticketCount - 1))}
                  className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14" />
                  </svg>
                </button>
                <span className="text-5xl font-display font-bold w-16 text-center">
                  {ticketCount}
                </span>
                <button
                  onClick={() => setTicketCount(Math.min(10, ticketCount + 1))}
                  className="w-12 h-12 rounded-full border border-[#C9A84C] text-[#C9A84C] flex items-center justify-center hover:bg-[#C9A84C] hover:text-black transition-colors"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Screen Curve */}
            <div className="mb-16 mt-8">
              <div className="h-2 w-3/4 mx-auto bg-gradient-to-r from-transparent via-[#FF512F] to-transparent rounded-[100%] shadow-[0_10px_30px_rgba(255,81,47,0.5)]"></div>
              <p className="text-center text-[#9E9E9E] text-xs tracking-[0.3em] mt-4">
                SCREEN
              </p>
            </div>

            {/* Seat Map */}
            <div className="overflow-x-auto pb-8 scrollbar-none">
              <div className="w-max min-w-full mx-auto flex flex-col items-center gap-10 px-8">
                {seatLayout.map((section, sIdx) => (
                  <div key={sIdx} className="w-full">
                    <p className="text-[#5A5A5A] text-xs tracking-widest mb-4 text-center uppercase">
                      {section.name}{" "}
                      <span className="text-[#9E9E9E] ml-2 font-accent">
                        ({section.price})
                      </span>
                    </p>
                    <div className="flex flex-col gap-3 items-center">
                      {section.rows.map((row) => (
                        <div key={row.id} className="flex items-center gap-6">
                          <span className="text-[#5A5A5A] font-bold w-4 text-center">
                            {row.id}
                          </span>
                          <div className="flex gap-2">
                            {row.left.map((num) => {
                              const seatId = `${row.id}${num}`;
                              const isSold = mockSoldSeats.includes(seatId);
                              const isSelected = selectedSeats.includes(seatId);
                              return (
                                <button
                                  key={seatId}
                                  disabled={isSold}
                                  onClick={() => handleSeatClick(seatId)}
                                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-t-lg rounded-b-sm text-[10px] font-bold flex items-center justify-center transition-all
                                    ${
                                      isSold
                                        ? "bg-white/10 text-white/20 cursor-not-allowed"
                                        : isSelected
                                          ? "bg-[#C9A84C] text-black scale-110 shadow-[0_0_15px_rgba(201,168,76,0.6)]"
                                          : "border border-white/20 text-[#9E9E9E] hover:border-[#C9A84C] hover:text-white cursor-pointer"
                                    }`}
                                >
                                  {num}
                                </button>
                              );
                            })}
                          </div>
                          <div className="w-8 sm:w-16"></div> {/* Aisle */}
                          <div className="flex gap-2">
                            {row.right.map((num) => {
                              const seatId = `${row.id}${num}`;
                              const isSold = mockSoldSeats.includes(seatId);
                              const isSelected = selectedSeats.includes(seatId);
                              return (
                                <button
                                  key={seatId}
                                  disabled={isSold}
                                  onClick={() => handleSeatClick(seatId)}
                                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-t-lg rounded-b-sm text-[10px] font-bold flex items-center justify-center transition-all
                                    ${
                                      isSold
                                        ? "bg-white/10 text-white/20 cursor-not-allowed"
                                        : isSelected
                                          ? "bg-[#C9A84C] text-black scale-110 shadow-[0_0_15px_rgba(201,168,76,0.6)]"
                                          : "border border-white/20 text-[#9E9E9E] hover:border-[#C9A84C] hover:text-white cursor-pointer"
                                    }`}
                                >
                                  {num}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className="flex justify-center gap-8 mt-4 mb-24 border-t border-white/10 pt-6">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-t border border-white/20"></div>
                <span className="text-xs text-[#9E9E9E]">Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-t bg-[#C9A84C]"></div>
                <span className="text-xs text-[#9E9E9E]">Selected</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-t bg-white/10"></div>
                <span className="text-xs text-[#9E9E9E]">Sold</span>
              </div>
            </div>

            {/* Pay Button */}
            <div className="fixed bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-[#111114] via-[#111114] to-transparent z-50">
              <button
                onClick={() => {
                  if (selectedSeats.length !== ticketCount) {
                    setAlertMessage(`Please select ${ticketCount} seats.`);
                  } else {
                    setBookingStep(3);
                  }
                }}
                className={`w-full max-w-6xl mx-auto flex justify-center items-center gap-3 py-5 rounded-2xl font-bold tracking-[0.2em] text-sm transition-all shadow-[0_15px_35px_rgba(221,36,118,0.4)]
                  ${selectedSeats.length === ticketCount ? "bg-gradient-to-r from-[#FF512F] to-[#DD2476] text-white hover:scale-[1.02] active:scale-[0.98]" : "bg-white/10 text-white/50 cursor-not-allowed shadow-none"}`}
              >
                PAY LKR{" "}
                {selectedSeats.length > 0
                  ? selectedSeats.length * 500 + ".00"
                  : "0.00"}
              </button>
            </div>
          </div>
        ) : (
          <div className="animate-fade-in-up py-20 text-center">
            <div className="w-24 h-24 bg-[#00E676]/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-[#00E676]/30">
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#00E676"
                strokeWidth="2"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4L12 14.01l-3-3" />
              </svg>
            </div>
            <h2 className="text-3xl font-display font-bold mb-4">
              Tickets Confirmed!
            </h2>
            <p className="text-[#9E9E9E] mb-12 max-w-md mx-auto">
              Your digital tickets for {movie.title} have been sent to your
              email. See you at the movies!
            </p>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-left max-w-sm mx-auto mb-12">
              <p className="text-xs text-[#9E9E9E] tracking-widest mb-1">
                BOOKING ID
              </p>
              <p className="font-bold mb-4 font-accent text-lg">
                CINE-{Math.floor(Math.random() * 1000000)}
              </p>
              <p className="text-xs text-[#9E9E9E] tracking-widest mb-1">
                SEATS
              </p>
              <p className="font-bold text-[#C9A84C]">
                {selectedSeats.join(", ")}
              </p>
            </div>

            <button
              onClick={() => {
                setBookingStep(1);
                setActiveTab("details");
                setSelectedSeats([]);
              }}
              className="text-xs border border-white/20 px-8 py-3 rounded-full tracking-widest hover:bg-white hover:text-black transition-all"
            >
              BACK TO HOME
            </button>
          </div>
        )}
      </div>

      {/* Custom Premium Alert Modal */}
      <AlertModal
        isOpen={!!alertMessage}
        message={alertMessage}
        onClose={() => setAlertMessage(null)}
      />
    </div>
  );
}
