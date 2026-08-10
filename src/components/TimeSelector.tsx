import React from 'react';
import { motion } from 'motion/react';
import { TimeOption } from '../types';
import { sound } from '../utils/audio';

interface TimeSelectorProps {
  selectedTime: TimeOption;
  onSelect: (time: TimeOption) => void;
}

export const TimeSelector: React.FC<TimeSelectorProps> = ({
  selectedTime,
  onSelect,
}) => {
  const handleSelect = (option: TimeOption) => {
    sound.playSelect();
    onSelect(option);
  };

  return (
    <section className="space-y-3">
      <p className="font-bold text-xs sm:text-sm uppercase tracking-wide text-gray-400">
        1. Pilih Waktu
      </p>

      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {/* Option 1: Sore ini */}
        <motion.button
          id="time-option-sore"
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleSelect('sore')}
          className={`group p-5 sm:p-6 rounded-2xl border-2 transition-all text-left relative overflow-hidden cursor-pointer ${
            selectedTime === 'sore'
              ? 'border-pink-500 bg-pink-500 text-white shadow-lg shadow-pink-200'
              : 'border-pink-50 bg-white hover:border-pink-300 hover:bg-pink-50/40 text-gray-800 shadow-2xs'
          }`}
        >
          {/* Watermark Emoji */}
          <div
            className={`absolute -right-2 -top-2 text-4xl select-none transition-opacity ${
              selectedTime === 'sore' ? 'opacity-20' : 'opacity-10 group-hover:opacity-25'
            }`}
          >
            ☀️
          </div>

          <div className="relative z-10">
            <div
              className={`font-bold text-base sm:text-lg ${
                selectedTime === 'sore' ? 'text-white' : 'text-gray-800'
              }`}
            >
              Sore ini
            </div>
            <div
              className={`text-xs mt-1 font-medium ${
                selectedTime === 'sore' ? 'text-white/80' : 'text-gray-400'
              }`}
            >
              Jam 16:00 WIB
            </div>
          </div>
        </motion.button>

        {/* Option 2: Habis Magrib */}
        <motion.button
          id="time-option-magrib"
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleSelect('magrib')}
          className={`group p-5 sm:p-6 rounded-2xl border-2 transition-all text-left relative overflow-hidden cursor-pointer ${
            selectedTime === 'magrib'
              ? 'border-pink-500 bg-pink-500 text-white shadow-lg shadow-pink-200'
              : 'border-pink-50 bg-white hover:border-pink-300 hover:bg-pink-50/40 text-gray-800 shadow-2xs'
          }`}
        >
          {/* Watermark Emoji */}
          <div
            className={`absolute -right-2 -top-2 text-4xl select-none transition-opacity ${
              selectedTime === 'magrib' ? 'opacity-20' : 'opacity-10 group-hover:opacity-25'
            }`}
          >
            🌙
          </div>

          <div className="relative z-10">
            <div
              className={`font-bold text-base sm:text-lg ${
                selectedTime === 'magrib' ? 'text-white' : 'text-gray-800'
              }`}
            >
              Habis Magrib
            </div>
            <div
              className={`text-xs mt-1 font-medium ${
                selectedTime === 'magrib' ? 'text-white/80' : 'text-gray-400'
              }`}
            >
              Jam 18:30 WIB
            </div>
          </div>
        </motion.button>
      </div>
    </section>
  );
};

