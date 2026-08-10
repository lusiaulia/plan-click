/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Header } from './components/Header';
import { TimeSelector } from './components/TimeSelector';
import { PlaceSelector } from './components/PlaceSelector';
import { ResultSection } from './components/ResultSection';
import { BirthdayPlanState, TimeOption, PlaceOption } from './types';
import { sound } from './utils/audio';

export default function App() {
  const [plan, setPlan] = useState<BirthdayPlanState>({
    recipientName: '',
    time: null,
    customTime: '',
    place: null,
    customPlace: '',
    isConfirmed: false,
    step: 'plan',
  });

  const [currentView, setCurrentView] = useState<'form' | 'preview'>('form');
  const [isMuted, setIsMuted] = useState<boolean>(sound.getMuted());
  const [formError, setFormError] = useState<string | null>(null);

  const handleTimeSelect = (time: TimeOption) => {
    setPlan((prev) => ({ ...prev, time }));
    if (formError) setFormError(null);
  };

  const handlePlaceSelect = (place: PlaceOption) => {
    setPlan((prev) => ({ ...prev, place }));
    if (formError) setFormError(null);
  };

  const handleCustomPlaceChange = (customPlace: string) => {
    setPlan((prev) => ({ ...prev, customPlace }));
    if (formError) setFormError(null);
  };

  const handleNameChange = (recipientName: string) => {
    setPlan((prev) => ({ ...prev, recipientName }));
  };

  const isFormComplete = Boolean(
    plan.time &&
    (plan.place === 'rumah' || (plan.place === 'tempat_lain' && plan.customPlace.trim().length > 0))
  );

  const handleLanjut = () => {
    if (!plan.time && !plan.place) {
      sound.playSelect();
      setFormError('Silakan pilih waktu dan lokasi perayaan terlebih dahulu ya! 🎂');
      return;
    }
    if (!plan.time) {
      sound.playSelect();
      setFormError('Silakan pilih waktu perayaan (Sore / Habis Magrib)! ☀️🌙');
      return;
    }
    if (!plan.place || (plan.place === 'tempat_lain' && !plan.customPlace.trim())) {
      sound.playSelect();
      setFormError('Silakan pilih lokasi atau ketik nama tempatnya ya! 📍');
      return;
    }

    sound.playSuccess();
    setFormError(null);
    setCurrentView('preview');
  };

  const handleBackToForm = () => {
    sound.playSelect();
    setCurrentView('form');
  };

  const handleConfirm = () => {
    setPlan((prev) => ({ ...prev, isConfirmed: true, step: 'confirmed' }));
  };

  const handleReset = () => {
    sound.playSelect();
    setPlan({
      recipientName: '',
      time: null,
      customTime: '',
      place: null,
      customPlace: '',
      isConfirmed: false,
      step: 'plan',
    });
    setFormError(null);
    setCurrentView('form');
  };

  const handleToggleMute = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
    if (!muted) sound.playSelect();
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-3 sm:p-6 lg:p-10 font-sans text-[#4A4A4A]">
      {/* Central App Card */}
      <motion.div
        initial={{ opacity: 0, y: 15, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.35 }}
        className="w-full max-w-xl bg-white rounded-[32px] sm:rounded-[40px] sleek-card-shadow border border-pink-50 overflow-hidden my-auto"
      >
        <AnimatePresence mode="wait">
          {currentView === 'form' ? (
            /* Halaman 1: Form Planner */
            <motion.div
              key="form-page"
              initial={{ opacity: 0, x: -25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 25 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="p-6 sm:p-10 lg:p-12 flex flex-col justify-between space-y-6 sm:space-y-8"
            >
              <div className="space-y-6 sm:space-y-8">
                {/* Header */}
                <Header
                  recipientName={plan.recipientName}
                  onNameChange={handleNameChange}
                  isMuted={isMuted}
                  onToggleMute={handleToggleMute}
                />

                {/* Step 1: Pilih Waktu */}
                <TimeSelector
                  selectedTime={plan.time}
                  onSelect={handleTimeSelect}
                />

                {/* Step 2: Pilih Lokasi */}
                <PlaceSelector
                  selectedPlace={plan.place}
                  customPlace={plan.customPlace}
                  onSelectPlace={handlePlaceSelect}
                  onChangeCustomPlace={handleCustomPlaceChange}
                />

                {/* Error Notice if unselected */}
                {formError && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-pink-50 border border-pink-200 rounded-xl text-center text-xs font-bold text-pink-600"
                  >
                    {formError}
                  </motion.div>
                )}
              </div>

              {/* LANJUT Action Button */}
              <div className="pt-2">
                <motion.button
                  id="btn-lanjut"
                  type="button"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={handleLanjut}
                  className={`w-full py-4 sm:py-5 rounded-2xl font-bold text-base sm:text-lg transition-all flex items-center justify-center space-x-2 shadow-md cursor-pointer ${
                    isFormComplete
                      ? 'bg-pink-500 hover:bg-pink-600 text-white shadow-pink-200'
                      : 'bg-[#2D3436] hover:bg-stone-900 text-white shadow-gray-200'
                  }`}
                >
                  <span>LANJUT KE PREVIEW</span>
                  <span className="text-xl">→</span>
                </motion.button>
              </div>
            </motion.div>
          ) : (
            /* Halaman 2: Preview & Hasil */
            <ResultSection
              plan={plan}
              onConfirm={handleConfirm}
              onBack={handleBackToForm}
              onReset={handleReset}
              isMuted={isMuted}
              onToggleMute={handleToggleMute}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </main>
  );
}


