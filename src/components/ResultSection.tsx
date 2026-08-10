import React, { useState } from 'react';
import {
  Share2,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  ArrowLeft,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { motion } from 'motion/react';
import { BirthdayPlanState } from '../types';
import { fireBirthdayConfetti } from '../utils/confetti';
import { sound } from '../utils/audio';

interface ResultSectionProps {
  plan: BirthdayPlanState;
  onConfirm: () => void;
  onBack: () => void;
  onReset: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const ResultSection: React.FC<ResultSectionProps> = ({
  plan,
  onConfirm,
  onBack,
  onReset,
  isMuted,
  onToggleMute,
}) => {
  const [copied, setCopied] = useState(false);

  const getTimeDisplay = () => {
    if (plan.time === 'sore') return 'Sore ini (Jam 16:00 WIB)';
    if (plan.time === 'magrib') return 'Habis Magrib (Jam 18:30 WIB)';
    return '-';
  };

  const getPlaceDisplay = () => {
    if (plan.place === 'rumah') return '🏠 Rumah kamu';
    if (plan.place === 'tempat_lain') {
      return plan.customPlace.trim() ? `📍 ${plan.customPlace.trim()}` : '📍 Tempat lain';
    }
    return '-';
  };

  const handleConfirmPlan = () => {
    sound.playConfirm();
    fireBirthdayConfetti();
    onConfirm();
  };

  const generateShareText = () => {
    const name = plan.recipientName ? `ultah ${plan.recipientName}` : 'ultah kamu';
    return `🎂 *BIRTHDAY PLAN CONFIRMED!* 🥳\n\nKita mau rayain ${name} di:\n📍 *Lokasi:* ${getPlaceDisplay()}\n🕐 *Waktu:* ${getTimeDisplay()}\n\nYeay! Sampai ketemu di sana ya! 🎉✨`;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generateShareText());
      sound.playSelect();
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleWhatsAppShare = () => {
    sound.playSelect();
    const text = encodeURIComponent(generateShareText());
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <motion.div
      key="preview-page"
      initial={{ opacity: 0, x: 25 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -25 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="p-6 sm:p-10 lg:p-12 flex flex-col justify-between space-y-6"
    >
      {/* Top Header Navigation */}
      <div className="flex items-center justify-between">
        <button
          id="btn-back-to-form"
          type="button"
          onClick={() => {
            sound.playSelect();
            onBack();
          }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-pink-50 text-gray-700 hover:text-pink-600 rounded-full text-xs font-bold transition-colors cursor-pointer border border-transparent hover:border-pink-200"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Ubah Pilihan</span>
        </button>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-pink-100 text-pink-600 rounded-full text-xs font-bold tracking-widest uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Preview & Hasil</span>
        </div>

        <button
          id="sound-toggle-preview-btn"
          type="button"
          onClick={onToggleMute}
          title={isMuted ? 'Nyalakan Suara' : 'Matikan Suara'}
          className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-pink-50 hover:bg-pink-100 text-pink-600 transition-colors cursor-pointer border border-pink-100"
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>

      {/* Main Preview Title */}
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#2D3436] tracking-tight font-display">
          🎉 HASIL BIRTHDAY PLAN
        </h1>
        <p className="text-base sm:text-lg text-gray-500 font-medium">
          Jadi kita rayain ultah{' '}
          <span className="text-pink-600 font-bold">
            {plan.recipientName || 'kamu'}
          </span>{' '}
          di:
        </p>
      </div>

      {/* Sleek Preview Info Cards */}
      <div className="space-y-4">
        {/* Lokasi Card */}
        <div className="p-5 rounded-2xl bg-[#FFF0F3] border border-pink-100 flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-white text-pink-600 flex items-center justify-center text-xl shadow-2xs shrink-0">
            {plan.place === 'rumah' ? '🏠' : '📍'}
          </div>
          <div className="flex-1">
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
              Lokasi Perayaan
            </p>
            <p className="text-base sm:text-lg font-extrabold text-gray-800 leading-snug mt-0.5">
              {getPlaceDisplay()}
            </p>
          </div>
        </div>

        {/* Waktu Card */}
        <div className="p-5 rounded-2xl bg-[#FFF0F3] border border-pink-100 flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-white text-pink-600 flex items-center justify-center text-xl shadow-2xs shrink-0">
            {plan.time === 'sore' ? '☀️' : '🌙'}
          </div>
          <div className="flex-1">
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
              Waktu & Jam
            </p>
            <p className="text-base sm:text-lg font-extrabold text-gray-800 leading-snug mt-0.5">
              {getTimeDisplay()}
            </p>
          </div>
        </div>

        {/* Status Indicator */}
        <div className="p-4 rounded-2xl bg-white border border-pink-100 flex items-center justify-between shadow-2xs">
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Status Jadwal
            </p>
            {plan.isConfirmed ? (
              <p className="text-sm font-bold text-pink-600 flex items-center mt-0.5">
                <span className="w-2 h-2 bg-pink-500 rounded-full mr-2 animate-ping" />
                Jadwal Sudah Fix! 🥳
              </p>
            ) : (
              <p className="text-sm font-bold text-emerald-600 flex items-center mt-0.5">
                <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse" />
                Ready to Party — Siap Dikonfirmasi
              </p>
            )}
          </div>

          <span className="text-2xl select-none">
            {plan.isConfirmed ? '🎂' : '✨'}
          </span>
        </div>
      </div>

      {/* Confirmation & Actions */}
      <div className="pt-2 space-y-3">
        {!plan.isConfirmed ? (
          <div className="space-y-2">
            <motion.button
              id="btn-confirm"
              type="button"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={handleConfirmPlan}
              className="w-full py-4 sm:py-5 bg-pink-500 hover:bg-pink-600 text-white rounded-2xl font-bold text-lg shadow-lg shadow-pink-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>CONFIRM</span>
              <span className="text-xl">🎂</span>
            </motion.button>
            <p className="text-center text-xs text-pink-400 font-medium">
              Klik confirm untuk mengunci jadwal perayaan!
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {/* Banner Sukses */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 text-white text-center shadow-md shadow-pink-200">
              <p className="text-base sm:text-lg font-extrabold tracking-wide">
                🎉 YEEAAAY! UDAH FIX YA! 🎉
              </p>
              <p className="text-xs text-pink-100 mt-1">
                Sampai ketemu di hari H! Jangan lupa bawa senyum terlebar! 🥳
              </p>
            </div>

            {/* Share & Copy Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                id="btn-whatsapp-share"
                type="button"
                onClick={handleWhatsAppShare}
                className="py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-sm font-bold flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
                <span>Kirim WA</span>
              </button>

              <button
                id="btn-copy-plan"
                type="button"
                onClick={handleCopy}
                className="py-3.5 px-4 rounded-xl bg-white border border-pink-200 hover:bg-pink-50 text-gray-800 text-sm font-bold flex items-center justify-center gap-2 shadow-2xs transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                    <span className="text-emerald-700 font-bold">Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-gray-600" />
                    <span>Salin Teks</span>
                  </>
                )}
              </button>
            </div>

            {/* Secondary Controls */}
            <div className="flex items-center justify-between pt-1">
              <button
                id="btn-trigger-confetti"
                type="button"
                onClick={() => {
                  sound.playSuccess();
                  fireBirthdayConfetti();
                }}
                className="text-xs font-bold text-pink-600 hover:text-pink-700 flex items-center gap-1.5 cursor-pointer py-1"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Lempar Confetti Lagi! 🎉</span>
              </button>

              <button
                id="btn-reset-plan"
                type="button"
                onClick={() => {
                  sound.playSelect();
                  onReset();
                }}
                className="text-xs font-medium text-gray-400 hover:text-gray-600 flex items-center gap-1.5 cursor-pointer py-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Buat Jadwal Baru</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};


