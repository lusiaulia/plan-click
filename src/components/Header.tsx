import React from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface HeaderProps {
  recipientName: string;
  onNameChange: (name: string) => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  recipientName,
  onNameChange,
  isMuted,
  onToggleMute,
}) => {
  const [isEditingName, setIsEditingName] = React.useState(false);

  return (
    <header className="space-y-4">
      {/* Top Tag & Sound Control */}
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-pink-100 text-pink-600 rounded-full text-xs font-bold tracking-widest uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Event Planner</span>
        </div>

        <button
          id="sound-toggle-btn"
          type="button"
          onClick={onToggleMute}
          title={isMuted ? 'Nyalakan Suara' : 'Matikan Suara'}
          className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-pink-50 hover:bg-pink-100 text-pink-600 transition-colors shadow-2xs cursor-pointer border border-pink-100"
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>

      {/* Main Display Title */}
      <motion.div
        initial={{ y: -8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#2D3436] tracking-tight font-display">
          🎂 BIRTHDAY PLAN
        </h1>
      </motion.div>

      {/* Subtitle & Editable Name */}
      <div className="text-base sm:text-lg text-gray-500 leading-relaxed font-medium">
        <p>
          Haiii, kita mau rayain ultah {' '}
          {isEditingName ? (
            <input
              id="recipient-name-input"
              type="text"
              value={recipientName}
              onChange={(e) => onNameChange(e.target.value)}
              onBlur={() => setIsEditingName(false)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') setIsEditingName(false);
              }}
              autoFocus
              className="px-2 py-0.5 border border-pink-300 rounded-lg bg-white text-pink-600 font-bold focus:outline-none focus:ring-2 focus:ring-pink-300 max-w-[150px] text-center inline-block"
              placeholder="nama kamu"
            />
          ) : (
            <span
              onClick={() => setIsEditingName(true)}
              title="Klik untuk ubah nama"
              className="cursor-pointer text-pink-600 font-bold hover:underline decoration-pink-300"
            >
              {recipientName || 'Your Name'}
            </span>
          )}
          ! 🥳
        </p>
        <p className="text-sm text-gray-400 mt-0.5">
          Kapan kita berangkat?
        </p>
      </div>
    </header>
  );
};

