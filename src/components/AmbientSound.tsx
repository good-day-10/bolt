import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

/**
 * Ambient sound toggle.
 *
 * Uses the Web Audio API to synthesize a gentle ambient soundscape
 * (low drone + filtered noise resembling water/wind) so no external
 * audio file is required. A real field recording can be swapped in later
 * by replacing the AudioContext logic with an <audio> element source.
 */
export default function AmbientSound() {
  const [on, setOn] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<{ stop: () => void } | null>(null);

  const start = () => {
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AC();
    ctxRef.current = ctx;

    // Low warm drone
    const drone = ctx.createOscillator();
    drone.type = 'sine';
    drone.frequency.value = 110;
    const droneGain = ctx.createGain();
    droneGain.gain.value = 0.04;
    drone.connect(droneGain).connect(ctx.destination);
    drone.start();

    // Slow LFO for gentle wave-like volume swell
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.12;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 0.02;
    lfo.connect(lfoGain).connect(droneGain.gain);
    lfo.start();

    // Filtered noise = water / wind texture
    const bufferSize = 2 * ctx.sampleRate;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.5;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;
    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = 'lowpass';
    noiseFilter.frequency.value = 500;
    noiseFilter.Q.value = 0.7;
    const noiseGain = ctx.createGain();
    noiseGain.gain.value = 0.025;
    noise.connect(noiseFilter).connect(noiseGain).connect(ctx.destination);
    noise.start();

    nodesRef.current = {
      stop: () => {
        drone.stop();
        lfo.stop();
        noise.stop();
        ctx.close();
      },
    };
  };

  const stop = () => {
    nodesRef.current?.stop();
    nodesRef.current = null;
    ctxRef.current = null;
  };

  const toggle = () => {
    if (on) {
      stop();
      setOn(false);
    } else {
      start();
      setOn(true);
    }
  };

  useEffect(() => {
    return () => stop();
  }, []);

  return (
    <button
      onClick={toggle}
      aria-label={on ? '關閉環境音效' : '開啟環境音效'}
      title={on ? '關閉環境音效' : '開啟環境音效'}
      className={`fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-all duration-300 ${
        on
          ? 'bg-stream-400 text-paper-50 hover:bg-stream-500'
          : 'bg-paper-50/90 text-earth-500 hover:bg-paper-100 hover:text-stream-400 backdrop-blur-sm'
      }`}
    >
      {on ? (
        <Volume2 className="h-5 w-5" />
      ) : (
        <VolumeX className="h-5 w-5" />
      )}
      {on && (
        <span className="absolute inset-0 animate-ping rounded-full bg-stream-400/40" />
      )}
    </button>
  );
}
