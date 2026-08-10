import React, { useRef, useEffect } from 'react';
import { Sparkles, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PlaceOption } from '../types';
import { sound } from '../utils/audio';

interface PlaceSelectorProps {
  selectedPlace: PlaceOption;
  customPlace: string;
  onSelectPlace: (place: PlaceOption) => void;
  onChangeCustomPlace: (value: string) => void;
}

const QUICK_SUGGESTIONS = [
  '☕ Cafe / Coffee Shop',
  '🍽️ Resto Favorit',
  '🍕 Pizza Place',
  '🍦 Gelato & Dessert',
  '🌳 Taman / Rooftop',
];

export const PlaceSelector: React.FC<PlaceSelectorProps> = ({
  selectedPlace,
  customPlace,
  onSelectPlace,
  onChangeCustomPlace,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSelect = (place: PlaceOption) => {
    sound.playSelect();
    onSelectPlace(place);
  };

  useEffect(() => {
    if (selectedPlace === 'tempat_lain' && inputRef.current) {
      inputRef.current.focus();
    }
  }, [selectedPlace]);

  return (
    <section className="space-y-3">
      <p className="font-bold text-xs sm:text-sm uppercase tracking-wide text-gray-400">
        2. Pilih Lokasi
      </p>

      <div className="space-y-3">
        {/* Option 1: Rumah kamu */}
        <label
          id="place-option-rumah"
          onClick={() => handleSelect('rumah')}
          className={`flex items-center p-4 rounded-xl cursor-pointer border transition-all ${
            selectedPlace === 'rumah'
              ? 'bg-pink-50/70 border-pink-300 ring-1 ring-pink-200 text-gray-900'
              : 'bg-gray-50/90 border-transparent hover:border-pink-200 text-gray-700'
          }`}
        >
          <input
            type="radio"
            name="loc"
            checked={selectedPlace === 'rumah'}
            onChange={() => handleSelect('rumah')}
            className="w-4 h-4 text-pink-500 accent-pink-500 cursor-pointer"
          />
          <span className="ml-3 font-medium text-sm sm:text-base">
            🏠 Rumah kamu
          </span>
        </label>

        {/* Option 2: Tempat lain */}
        <label
          id="place-option-tempat-lain"
          onClick={() => handleSelect('tempat_lain')}
          className={`flex items-center p-4 rounded-xl cursor-pointer border transition-all ${
            selectedPlace === 'tempat_lain'
              ? 'bg-pink-50/70 border-pink-300 ring-1 ring-pink-200 text-gray-900'
              : 'bg-gray-50/90 border-transparent hover:border-pink-200 text-gray-700'
          }`}
        >
          <input
            type="radio"
            name="loc"
            checked={selectedPlace === 'tempat_lain'}
            onChange={() => handleSelect('tempat_lain')}
            className="w-4 h-4 text-pink-500 accent-pink-500 cursor-pointer"
          />
          <span className="ml-3 font-medium text-sm sm:text-base">
            📍 Tempat lain
          </span>
        </label>

        {/* Input Box [ ____________________ ] */}
        <AnimatePresence>
          {selectedPlace === 'tempat_lain' && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -4 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className="space-y-2 pt-1"
            >
              <div className="relative">
                <input
                  ref={inputRef}
                  id="custom-place-input"
                  type="text"
                  value={customPlace}
                  onChange={(e) => onChangeCustomPlace(e.target.value)}
                  placeholder="Masukkan nama tempat..."
                  className="w-full p-4 border border-gray-100 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-pink-200 transition-all text-sm font-medium text-gray-800 placeholder:text-gray-400"
                />

                {customPlace && (
                  <button
                    type="button"
                    onClick={() => onChangeCustomPlace('')}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Quick suggestions */}
              <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                <span className="text-[11px] font-semibold text-gray-400 flex items-center gap-1 mr-1">
                  <Sparkles className="w-3 h-3 text-pink-400" />
                  Pilihan:
                </span>
                {QUICK_SUGGESTIONS.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => {
                      sound.playSelect();
                      onChangeCustomPlace(suggestion);
                    }}
                    className="px-2.5 py-1 text-xs rounded-lg bg-pink-50/60 hover:bg-pink-100 text-pink-700 font-medium transition-colors cursor-pointer border border-pink-100"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

