import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface AlertModalProps {
  isOpen: boolean;
  message: string | null;
  onClose: () => void;
  title?: string;
}

export default function AlertModal({ isOpen, message, onClose, title = "Attention" }: AlertModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isOpen || !message || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[10005] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm" role="dialog" aria-modal="true">
      <div className="bg-[#111114] border border-[#C9A84C]/30 rounded-2xl p-8 max-w-sm w-full min-w-[320px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] animate-fade-in-up">
        <div className="w-12 h-12 rounded-full bg-[#FF3B3B]/10 flex items-center justify-center mb-6 border border-[#FF3B3B]/30 mx-auto">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF3B3B" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
        </div>
        <h3 className="text-xl font-display font-bold text-center mb-2">{title}</h3>
        <p className="text-[#9E9E9E] text-center mb-8 text-sm">{message}</p>
        <button 
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-white/10 hover:bg-[#C9A84C] hover:text-black transition-colors font-bold tracking-widest text-xs cursor-none"
        >
          OKAY
        </button>
      </div>
    </div>,
    document.body
  );
}
