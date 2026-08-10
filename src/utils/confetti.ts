import confetti from 'canvas-confetti';

export function fireBirthdayConfetti() {
  // Center burst
  confetti({
    particleCount: 90,
    spread: 80,
    origin: { y: 0.6 },
    colors: ['#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF', '#FF9F45', '#F472B6'],
    disableForReducedMotion: true,
  });

  // Left & Right cannon blasts
  setTimeout(() => {
    confetti({
      particleCount: 45,
      angle: 60,
      spread: 60,
      origin: { x: 0.1, y: 0.7 },
      colors: ['#FF6B6B', '#FFD93D', '#FFA0A0'],
      disableForReducedMotion: true,
    });
    confetti({
      particleCount: 45,
      angle: 120,
      spread: 60,
      origin: { x: 0.9, y: 0.7 },
      colors: ['#4D96FF', '#6BCB77', '#A78BFA'],
      disableForReducedMotion: true,
    });
  }, 250);
}
