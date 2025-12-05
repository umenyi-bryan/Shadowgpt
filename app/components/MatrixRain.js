'use client';

export default function MatrixRain() {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10 opacity-5">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-900/10 to-transparent animate-pulse"></div>
    </div>
  );
}
