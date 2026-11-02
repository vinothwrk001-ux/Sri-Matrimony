import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../contexts/AppContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { Sparkles, ArrowRight, Volume2, VolumeX, Heart, CheckCircle2 } from 'lucide-react';

/**
 * Web Audio API Universal Romantic Garden Melody Synthesizer
 * Gentle, acoustic harp & flute pentatonic harmonies over a soft warm pad.
 * Completely universal, romantic, non-religious, and 100% browser-synthesized.
 */
class GardenSoundscape {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.nodes = [];
    this.melodyTimer = null;
  }

  init() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
  }

  start() {
    this.init();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    this.isPlaying = true;

    // 1. Soft Warm Acoustic Pad (D3, A3, F#3 chord)
    const baseFreq = 146.83; // D3
    const freqs = [baseFreq, baseFreq * 1.5, baseFreq * 1.25];
    const masterGain = this.ctx.createGain();
    masterGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
    masterGain.gain.exponentialRampToValueAtTime(0.06, this.ctx.currentTime + 2.5);
    masterGain.connect(this.ctx.destination);
    this.nodes.push(masterGain);

    freqs.forEach((f) => {
      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, this.ctx.currentTime);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.3, this.ctx.currentTime);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(masterGain);

      osc.start();
      this.nodes.push(osc);
    });

    // 2. Gentle Fairy Harp & Flute Melodic Arpeggio (D, E, F#, A, B)
    const scale = [293.66, 329.63, 369.99, 440.0, 493.88, 587.33];
    const playNote = () => {
      if (!this.isPlaying || !this.ctx) return;
      const note = scale[Math.floor(Math.random() * scale.length)];
      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(note, this.ctx.currentTime);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.035, this.ctx.currentTime + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 2.2);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 2.3);

      this.melodyTimer = setTimeout(playNote, 1600 + Math.random() * 2000);
    };

    playNote();
  }

  stop() {
    this.isPlaying = false;
    if (this.melodyTimer) clearTimeout(this.melodyTimer);
    if (this.nodes.length && this.ctx) {
      this.nodes.forEach((n) => {
        try {
          if (n.stop) n.stop();
          if (n.disconnect) n.disconnect();
        } catch (e) {}
      });
      this.nodes = [];
    }
    if (this.ctx && this.ctx.state !== 'closed') {
      try {
        this.ctx.close();
      } catch (e) {}
      this.ctx = null;
    }
  }
}

export default function SplashScreen({ onFinish }) {
  const { loadBootstrap } = useApp();
  const { lang } = useLanguage();

  const canvasRef = useRef(null);
  const soundEngineRef = useRef(null);

  const [soundEnabled, setSoundEnabled] = useState(false);
  const [progress, setProgress] = useState(15);
  const [statusText, setStatusText] = useState('Opening the sanctuary of sacred unions...');
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const [isTransitioningOut, setIsTransitioningOut] = useState(false);

  // Asset References
  const imagesRef = useRef({
    bg: null,
    coupleHindu: null,
    processedHindu: null,
    coupleMuslim: null,
    processedMuslim: null,
    coupleChristian: null,
    processedChristian: null,
  });

  // Sound Engine Setup
  useEffect(() => {
    soundEngineRef.current = new GardenSoundscape();
    return () => {
      if (soundEngineRef.current) soundEngineRef.current.stop();
    };
  }, []);

  const toggleSound = () => {
    if (!soundEngineRef.current) return;
    if (soundEnabled) {
      soundEngineRef.current.stop();
      setSoundEnabled(false);
    } else {
      soundEngineRef.current.start();
      setSoundEnabled(true);
    }
  };

  // Helper to remove solid white background on load, discover true character bounds, and create tightly trimmed transparent canvas
  const makeTransparentCanvas = (img) => {
    if (!img || !img.complete || img.naturalWidth === 0) return null;
    const c = document.createElement('canvas');
    c.width = img.naturalWidth;
    c.height = img.naturalHeight;
    const ctx = c.getContext('2d', { willReadFrequently: true });
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, 0, 0);

    try {
      const imgData = ctx.getImageData(0, 0, c.width, c.height);
      const d = imgData.data;
      let minX = c.width;
      let minY = c.height;
      let maxX = 0;
      let maxY = 0;

      // High-precision chroma keying with smooth cubic feathering & color defringing
      for (let y = 0; y < c.height; y++) {
        for (let x = 0; x < c.width; x++) {
          const i = (y * c.width + x) * 4;
          const r = d[i];
          const g = d[i + 1];
          const b = d[i + 2];
          const minRGB = Math.min(r, g, b);
          const maxRGB = Math.max(r, g, b);
          const diff = maxRGB - minRGB;

          // Pure or near-pure white background removal
          if (minRGB > 242 && diff < 22) {
            d[i + 3] = 0;
          } else if (minRGB > 205 && diff < 30) {
            // Cubic feathering
            const factor = (minRGB - 205) / 37;
            const alpha = Math.max(0, Math.min(255, Math.round((1 - factor * factor) * 255)));
            d[i + 3] = alpha;

            // Defringe: strip out the white background glow so edges don't have a white halo
            if (alpha > 15) {
              const a = alpha / 255;
              d[i] = Math.min(255, Math.max(0, Math.round((r - 255 * (1 - a)) / a)));
              d[i + 1] = Math.min(255, Math.max(0, Math.round((g - 255 * (1 - a)) / a)));
              d[i + 2] = Math.min(255, Math.max(0, Math.round((b - 255 * (1 - a)) / a)));
            }
          }

          // Track actual character pixels for exact feet alignment
          if (d[i + 3] > 30) {
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
          }
        }
      }
      ctx.putImageData(imgData, 0, 0);

      // Return tightly trimmed canvas with high quality smoothing
      if (maxX > minX && maxY > minY) {
        const trimW = maxX - minX + 1;
        const trimH = maxY - minY + 1;
        const trimmed = document.createElement('canvas');
        trimmed.width = trimW;
        trimmed.height = trimH;
        const tCtx = trimmed.getContext('2d');
        tCtx.imageSmoothingEnabled = true;
        tCtx.imageSmoothingQuality = 'high';
        tCtx.drawImage(c, minX, minY, trimW, trimH, 0, 0, trimW, trimH);
        return trimmed;
      }
      return c;
    } catch (e) {
      return img;
    }
  };

  // Preload 2D Cartoon Assets (Center Hindu, Left Muslim, Right Christian & New Grand Background)
  useEffect(() => {
    const bg = new Image();
    bg.src = '/assets/splash/matrimony_welcome_hero_bg.jpg';

    const hindu = new Image();
    hindu.src = '/assets/splash/cartoon_couple_walking.jpg';

    const muslim = new Image();
    muslim.src = '/assets/splash/muslim_couple_walking.jpg';

    const christian = new Image();
    christian.src = '/assets/splash/christian_couple_walking.jpg';

    let loaded = 0;
    const checkAll = () => {
      loaded += 1;
      if (loaded >= 4) {
        imagesRef.current.bg = bg;
        imagesRef.current.coupleHindu = hindu;
        imagesRef.current.processedHindu = makeTransparentCanvas(hindu);
        imagesRef.current.coupleMuslim = muslim;
        imagesRef.current.processedMuslim = makeTransparentCanvas(muslim);
        imagesRef.current.coupleChristian = christian;
        imagesRef.current.processedChristian = makeTransparentCanvas(christian);
        setAssetsLoaded(true);
      }
    };

    bg.onload = checkAll;
    bg.onerror = checkAll;
    hindu.onload = checkAll;
    hindu.onerror = checkAll;
    muslim.onload = checkAll;
    muslim.onerror = checkAll;
    christian.onload = checkAll;
    christian.onerror = checkAll;
  }, []);

  // Parallel Background Initialization
  useEffect(() => {
    let isMounted = true;

    const runInit = async () => {
      try {
        setProgress(25);
        setStatusText(lang === 'ta' ? 'புனித வரன் தளம் தயாராகிறது...' : 'Connecting to verified Tamil matrimonial registry...');

        const pTimer1 = setTimeout(() => {
          if (isMounted) {
            setProgress(55);
            setStatusText(lang === 'ta' ? 'இரு மனம் இணையும் இனிய பயணம்...' : 'Two Souls. One Sacred Journey...');
          }
        }, 1800);

        const pTimer2 = setTimeout(() => {
          if (isMounted) {
            setProgress(85);
            setStatusText(lang === 'ta' ? 'நம்பகமான தமிழ் மேட்ரிமோனி...' : 'Sri Matrimony — Somewhere, Your Forever Begins.');
          }
        }, 4000);

        // Concurrent initialization
        await Promise.allSettled([
          loadBootstrap ? loadBootstrap() : Promise.resolve(),
          new Promise((resolve) => setTimeout(resolve, 5200)), // Allow peaceful walking animation to introduce
        ]);

        clearTimeout(pTimer1);
        clearTimeout(pTimer2);

        if (!isMounted) return;
        setProgress(100);
        setStatusText(lang === 'ta' ? 'வரவேற்கிறோம்...' : 'Welcome to Sri Matrimony...');
      } catch (err) {
        if (!isMounted) return;
        setProgress(100);
      }
    };

    runInit();

    return () => {
      isMounted = false;
    };
  }, [lang]);

  // Handle Complete Transition to Homepage
  const handleEnterHomepage = () => {
    setIsTransitioningOut(true);
    if (soundEngineRef.current && soundEnabled) {
      soundEngineRef.current.stop();
    }
    setTimeout(() => {
      onFinish();
    }, 700);
  };

  // 60 FPS Canvas Walking Engine & Dreamy Garden Particle Simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId = null;
    let startTime = performance.now();

    // 1. Dreamy Floating Rose & Peach Petals
    const PETAL_COUNT = 36;
    const petals = [];
    const colors = ['#E8A9AC', '#F4D5C5', '#FFF8EF', '#D9B66F', '#652D35'];

    for (let i = 0; i < PETAL_COUNT; i++) {
      petals.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.6,
        vy: Math.random() * 0.9 + 0.6,
        rot: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.03,
        size: Math.random() * 12 + 8,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.5 + 0.4,
      });
    }

    // 2. Soft Glowing Fireflies & Golden Dust Motes
    const MOTES_COUNT = 45;
    const motes = [];
    for (let j = 0; j < MOTES_COUNT; j++) {
      motes.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -(Math.random() * 0.4 + 0.2),
        radius: Math.random() * 2 + 1,
        alpha: Math.random() * 0.6 + 0.2,
        pulseSpeed: Math.random() * 0.03 + 0.015,
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const render = (now) => {
      const elapsed = (now - startTime) / 1000;
      const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
      const w = window.innerWidth;
      const h = window.innerHeight;

      ctx.save();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); // HiDPI / Retina hardware scaling for crystal-clear render
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      // Clear Canvas with rich Burgundy / Wine Tone
      ctx.fillStyle = '#2A0E13';
      ctx.fillRect(0, 0, w, h);

      // A. DRAW NEW BREATHTAKING FAIRYTALE WEDDING GARDEN BACKGROUND
      const bgImg = imagesRef.current.bg;
      if (bgImg && bgImg.complete && bgImg.naturalWidth > 0) {
        ctx.save();
        // Dynamic aspect-cover scaling (100% static, zero camera shake)
        const bgAspect = bgImg.naturalWidth / bgImg.naturalHeight;
        const bgW = Math.max(w, h * bgAspect);
        const bgH = Math.max(h, w / bgAspect);
        const bgX = (w - bgW) / 2;
        const bgY = (h - bgH) / 2;
        ctx.drawImage(bgImg, bgX, bgY, bgW, bgH);

        // Soft Dreamy Vignette Overlay (Burgundy & Warm Peach Sunset Glow)
        const vignette = ctx.createRadialGradient(w / 2, h * 0.5, w * 0.2, w / 2, h * 0.5, w * 0.75);
        vignette.addColorStop(0, 'rgba(244, 213, 197, 0.02)');
        vignette.addColorStop(0.55, 'rgba(101, 45, 53, 0.22)');
        vignette.addColorStop(1, 'rgba(35, 11, 16, 0.80)');
        ctx.fillStyle = vignette;
        ctx.fillRect(0, 0, w, h);

        // Top subtle luxury vignette for crystal clear text readability against sky
        const topVignette = ctx.createLinearGradient(0, 0, 0, h * 0.34);
        topVignette.addColorStop(0, 'rgba(22, 5, 10, 0.75)');
        topVignette.addColorStop(0.60, 'rgba(30, 8, 14, 0.40)');
        topVignette.addColorStop(1, 'rgba(30, 8, 14, 0)');
        ctx.fillStyle = topVignette;
        ctx.fillRect(0, 0, w, h * 0.34);

        // Bottom grounding vignette for marble floor anchoring & footer contrast
        const bottomVignette = ctx.createLinearGradient(0, h * 0.62, 0, h);
        bottomVignette.addColorStop(0, 'rgba(30, 8, 14, 0)');
        bottomVignette.addColorStop(0.55, 'rgba(24, 6, 11, 0.45)');
        bottomVignette.addColorStop(1, 'rgba(16, 4, 8, 0.85)');
        ctx.fillStyle = bottomVignette;
        ctx.fillRect(0, h * 0.62, w, h * 0.38);

        // Soft Volumetric Golden Sunlight Rays
        ctx.save();
        ctx.globalCompositeOperation = 'screen';
        const sunRayGrad = ctx.createLinearGradient(w * 0.5, 0, w * 0.5, h);
        sunRayGrad.addColorStop(0, 'rgba(255, 248, 239, 0.08)');
        sunRayGrad.addColorStop(0.5, 'rgba(217, 182, 111, 0.04)');
        sunRayGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = sunRayGrad;
        ctx.beginPath();
        ctx.moveTo(w * 0.25, 0);
        ctx.lineTo(w * 0.75, 0);
        ctx.lineTo(w * 0.90, h);
        ctx.lineTo(w * 0.10, h);
        ctx.closePath();
        ctx.fill();
        ctx.restore();

        ctx.restore();
      }

      // B. 100% STATIC 2D THREE TRADITIONS: MOVED UPWARDS ONTO THE MARBLE AISLE (CLEAR OF FOOTER CARD)
      const drawCouple = (asset, cx, feetY, targetH) => {
        if (!asset) return;
        const assetW = asset.width || asset.naturalWidth || 1;
        const assetH = asset.height || asset.naturalHeight || 1;
        const aspect = assetW / assetH;
        const ch = targetH;
        const cw = targetH * aspect;
        const topY = feetY - ch;

        // 1. Deep contact shadow firmly grounding characters on the marble terrace pathway
        const shadowY = feetY - 2;
        const contactGrad = ctx.createRadialGradient(
          cx,
          shadowY,
          2,
          cx,
          shadowY,
          cw * 0.36
        );
        contactGrad.addColorStop(0, 'rgba(15, 3, 7, 0.92)'); // Deep contact core
        contactGrad.addColorStop(0.35, 'rgba(32, 8, 15, 0.65)');
        contactGrad.addColorStop(0.70, 'rgba(52, 14, 24, 0.25)');
        contactGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = contactGrad;
        ctx.beginPath();
        ctx.ellipse(cx, shadowY, cw * 0.34, 10, 0, 0, Math.PI * 2);
        ctx.fill();

        // 2. Secondary soft ambient ground shadow spread
        const ambientGrad = ctx.createRadialGradient(
          cx,
          shadowY,
          cw * 0.15,
          cx,
          shadowY,
          cw * 0.52
        );
        ambientGrad.addColorStop(0, 'rgba(25, 6, 12, 0.35)');
        ambientGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = ambientGrad;
        ctx.beginPath();
        ctx.ellipse(cx, shadowY, cw * 0.48, 15, 0, 0, Math.PI * 2);
        ctx.fill();

        // 3. Draw with high quality smoothing
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(asset, cx - cw / 2, topY, cw, ch);
      };

      // Responsive layout sizing positioned UPWARDS onto the marble walkway (completely above footer card)
      let centerH = Math.min(h * 0.39, 305);
      let sideH = centerH * 0.94;
      let centerX = w / 2;
      let groundY = Math.min(h * 0.74, h - 120);
      let leftX = w * 0.22;
      let rightX = w * 0.78;

      if (w >= 1200) {
        // Desktop widescreen: clean clearance above footer and below top banner
        centerH = Math.min(h * 0.40, 315);
        sideH = centerH * 0.94;
        groundY = Math.min(h * 0.74, h - 130);
        leftX = Math.max(w * 0.22, centerX - centerH * 0.95);
        rightX = Math.min(w * 0.78, centerX + centerH * 0.95);
      } else if (w >= 768) {
        // Tablet / Laptop
        centerH = Math.min(h * 0.38, w * 0.28, 280);
        sideH = centerH * 0.92;
        groundY = Math.min(h * 0.74, h - 120);
        leftX = Math.max(w * 0.18, centerX - centerH * 0.88);
        rightX = Math.min(w * 0.82, centerX + centerH * 0.88);
      } else {
        // Mobile screens: compact side-by-side fit
        centerH = Math.min(h * 0.33, w * 0.33, 205);
        sideH = centerH * 0.90;
        groundY = Math.min(h * 0.73, h - 105);
        leftX = Math.max(w * 0.16, centerX - centerH * 0.80);
        rightX = Math.min(w * 0.84, centerX + centerH * 0.80);
      }

      ctx.save();
      ctx.globalAlpha = 1.0;

      // 1. Left Side: Muslim Bride and Groom
      drawCouple(
        imagesRef.current.processedMuslim || imagesRef.current.coupleMuslim,
        leftX,
        groundY,
        sideH
      );

      // 2. Right Side: Christian Groom and Bride
      drawCouple(
        imagesRef.current.processedChristian || imagesRef.current.coupleChristian,
        rightX,
        groundY,
        sideH
      );

      // 3. Center: Traditional Tamil / Hindu Bride and Groom
      drawCouple(
        imagesRef.current.processedHindu || imagesRef.current.coupleHindu,
        centerX,
        groundY,
        centerH
      );

      ctx.restore();

      // C. DRAW FLOATING ROSE & PEACH FLOWER PETALS (Gentle Romantic Flutter)
      for (let p = 0; p < petals.length; p++) {
        const pt = petals[p];
        pt.rot += pt.rotSpeed;
        pt.y += pt.vy;
        pt.x += pt.vx + Math.sin(elapsed * 1.5 + pt.y * 0.01) * 0.7;

        if (pt.y > h + 20) {
          pt.y = -20;
          pt.x = Math.random() * w;
        }
        if (pt.x > w + 20) pt.x = -20;
        if (pt.x < -20) pt.x = w + 20;

        ctx.save();
        ctx.translate(pt.x, pt.y);
        ctx.rotate(pt.rot);
        ctx.fillStyle = pt.color;
        ctx.globalAlpha = pt.alpha;

        // Curved soft petal geometry
        ctx.beginPath();
        ctx.moveTo(0, -pt.size);
        ctx.bezierCurveTo(pt.size * 0.6, -pt.size * 0.8, pt.size * 0.8, pt.size * 0.5, 0, pt.size);
        ctx.bezierCurveTo(-pt.size * 0.8, pt.size * 0.5, -pt.size * 0.6, -pt.size * 0.8, 0, -pt.size);
        ctx.fill();
        ctx.restore();
      }

      // D. DRAW SOFT GLOWING PARTICLES & FIREFLIES
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      for (let m = 0; m < motes.length; m++) {
        const mt = motes[m];
        mt.y += mt.vy;
        mt.x += mt.vx + Math.sin(elapsed * 2 + mt.y * 0.015) * 0.4;

        if (mt.y < -10) {
          mt.y = h + 10;
          mt.x = Math.random() * w;
        }

        const pulse = Math.sin(elapsed * mt.pulseSpeed * 12 + m) * 0.3 + 0.7;
        ctx.fillStyle = `rgba(255, 248, 239, ${mt.alpha * pulse})`;
        ctx.beginPath();
        ctx.arc(mt.x, mt.y, mt.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore(); // Restore particles context
      ctx.restore(); // Restore outer HiDPI transform

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [assetsLoaded]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed inset-0 z-50 flex flex-col justify-between overflow-hidden bg-[#230B10] text-[#FFF8EF] select-none transition-opacity duration-700 ${
        isTransitioningOut ? 'opacity-0 scale-103 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* 1. Universal 2D Animated Canvas Background & Character Walking Engine */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover pointer-events-none" />

      {/* 2. Top Container: Header Bar & Sacred Headline Section (High-Contrast Luxury Glass Cards) */}
      <div className="relative z-20 w-full flex flex-col items-center">
        {/* Top Navigation & Utility Header */}
        <header className="w-full px-4 pt-3 pb-2 sm:px-10 sm:pt-5 flex items-center justify-between">
          {/* Left: EST. 2026 · SRI MATRIMONY High-Contrast Pill */}
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1A0408]/85 backdrop-blur-md border border-[#D9B66F]/50 shadow-md"
          >
            <span className="w-2 h-2 rounded-full bg-[#FFDF88] animate-pulse" />
            <p className="text-[10px] sm:text-xs tracking-[0.25em] uppercase text-[#FFFDF7] font-semibold">
              EST. 2026 &bull; SRI MATRIMONY
            </p>
          </motion.div>

          {/* Right: Sound Toggle & Quick Skip High-Contrast Pills */}
          <motion.div
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex items-center gap-2.5"
          >
            {/* Garden Melody Toggle */}
            <button
              onClick={toggleSound}
              aria-label="Toggle Romantic Garden Melody"
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#D9B66F]/50 bg-[#1A0408]/85 backdrop-blur-md text-[11px] font-medium tracking-wider text-[#FFFDF7] hover:border-[#FFDF88] hover:bg-[#1A0408] transition-all cursor-pointer shadow-md"
            >
              {soundEnabled ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-[#FFDF88] animate-bounce" />
                  <span className="hidden sm:inline">Garden Melody</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-[#FFDFBA]/80" />
                  <span className="hidden sm:inline">Music: Off</span>
                </>
              )}
            </button>

            {/* Quick Skip Button */}
            <button
              onClick={handleEnterHomepage}
              className="px-4 py-1.5 rounded-full border border-[#D9B66F]/50 bg-[#1A0408]/85 backdrop-blur-md text-[11px] tracking-widest uppercase font-semibold text-[#FFFDF7] hover:border-[#FFDF88] hover:bg-[#1A0408] transition-all cursor-pointer shadow-md"
            >
              Skip to Website &rarr;
            </button>
          </motion.div>
        </header>

        {/* Text Section: Headline in Luxury Frosted Wine Card (Maximum contrast against golden sky) */}
        <div className="flex flex-col items-center text-center px-4 max-w-2xl mx-auto pt-1">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="flex flex-col items-center px-6 sm:px-8 py-3 rounded-2xl bg-[#1A0408]/82 backdrop-blur-md border border-[#D9B66F]/50 shadow-[0_8px_32px_rgba(0,0,0,0.65)] space-y-1.5"
          >
            {/* Sacred Tamil Union Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-[#D9B66F]/60 bg-[#420E18] shadow-sm">
              <Heart className="w-3 h-3 text-[#FFB6C1] fill-[#FFB6C1]" />
              <span className="text-[10px] sm:text-[11px] tracking-[0.2em] text-[#FFFDF7] uppercase font-semibold">
                இரு மனம் இணையும் புனிதப் பயணம்
              </span>
            </div>

            {/* Main Headline in Playfair Display with rich ivory-gold contrast */}
            <h2 className="font-playfair text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal tracking-wide text-[#FFFDF7] drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
              Two Souls. One Sacred Journey.
            </h2>

            {/* Supporting Text in warm champagne peach */}
            <p className="text-[11px] sm:text-xs md:text-sm text-[#FFDFBA] tracking-wider font-normal drop-shadow">
              &ldquo;Where Tradition Meets Modern Love &bull; Uniting Hearts Across All Communities&rdquo;
            </p>
          </motion.div>
        </div>
      </div>

      {/* 3. Middle Area: Open space letting the 2D Bride & Groom stand firmly on the ground */}
      <div className="relative z-10 flex-1 pointer-events-none" aria-hidden="true" />

      {/* 4. Bottom Section: High-Contrast Compact Luxury Brand & Action Card */}
      <footer className="relative z-20 w-full px-4 pb-3 sm:pb-5 flex flex-col items-center text-center max-w-lg mx-auto">
        <div className="w-full bg-[#1A0408]/88 backdrop-blur-md border border-[#D9B66F]/50 rounded-2xl px-5 py-3 shadow-[0_12px_40px_rgba(0,0,0,0.7)] flex flex-col items-center">
          {/* Brand Presentation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="flex items-center gap-2 mb-2"
          >
            <h1 className="font-playfair text-lg sm:text-xl font-bold tracking-[0.16em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#FFDF88] via-[#FFFDF7] to-[#FFDF88] drop-shadow">
              SRI MATRIMONY
            </h1>
            <span className="text-[#D9B66F]">&bull;</span>
            <p className="tamil-text text-[11px] sm:text-xs tracking-[0.20em] uppercase text-[#FFDFBA] font-medium">
              ஸ்ரீ மேட்ரிமோனி
            </p>
          </motion.div>

          {/* Dynamic Action Area: Progress Bar vs "ENTER SRI MATRIMONY →" */}
          <div className="w-full max-w-sm flex flex-col items-center">
            <AnimatePresence mode="wait">
              {progress < 100 ? (
                <motion.div
                  key="loading-bar"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="w-full flex flex-col items-center"
                >
                  {/* Champagne Gold Progress Bar */}
                  <div className="w-60 sm:w-72 h-[3.5px] bg-[#420E18] rounded-full overflow-hidden border border-[#D9B66F]/50 mb-2 relative shadow-inner">
                    <motion.div
                      className="h-full bg-gradient-to-r from-[#D9B66F] via-[#FFFDF7] to-[#FFB6C1]"
                      initial={{ width: '15%' }}
                      animate={{ width: `${progress}%` }}
                      transition={{ ease: 'easeOut', duration: 0.3 }}
                    />
                  </div>

                  {/* Status Indicator in warm peach */}
                  <p className="text-[11px] text-[#FFDFBA] tracking-wider font-medium flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#FFDF88] animate-spin" />
                    <span>{statusText}</span>
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="enter-button"
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center gap-1.5"
                >
                  {/* Main CTA: ENTER SRI MATRIMONY → */}
                  <button
                    onClick={handleEnterHomepage}
                    className="group relative px-7 py-2.5 rounded-full bg-gradient-to-r from-[#D9B66F] via-[#FFEBB8] to-[#D9B66F] text-[#1A0408] text-xs font-bold tracking-[0.2em] uppercase flex items-center gap-2.5 shadow-[0_0_25px_rgba(217,182,111,0.5)] hover:shadow-[0_0_40px_rgba(217,182,111,0.8)] hover:scale-104 active:scale-98 transition-all cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#1A0408]" />
                    <span>Enter Sri Matrimony &bull; நல்வரவு</span>
                    <ArrowRight className="w-4 h-4 text-[#1A0408] group-hover:translate-x-1.5 transition-transform" />
                  </button>
                  <span className="text-[10px] text-[#FFDFBA]/80 tracking-widest uppercase font-normal">
                    A sanctuary uniting hearts across all communities
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </footer>
    </motion.div>
  );
}
