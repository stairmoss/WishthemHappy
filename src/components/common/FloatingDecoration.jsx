import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Star, Compass, Disc, Coffee, Gift, Ribbon, Music, Moon, Sun, Feather, Cloud } from 'lucide-react';

const ASSET_MAP = {
  // Flowers
  rose: '/assets/flowers/rose.png',
  daisy: '/assets/flowers/daisy.png',
  lavender: '/assets/flowers/lavender.png',
  sunflower: '/assets/flowers/sunflower.png',
  sakura_petals: '/assets/flowers/sakura.png',
  wildflower: '/assets/flowers/wildflower.png',
  babys_breath: '/assets/flowers/babys_breath.png',

  // Leaves
  green_leaf: '/assets/leaves/green_leaf.png',
  autumn_leaf: '/assets/leaves/autumn_leaf.png',
  vine: '/assets/leaves/vine.png',
  fern: '/assets/leaves/fern.png',
  eucalyptus: '/assets/leaves/eucalyptus.png',

  // Butterflies
  gold_butterfly: '/assets/butterflies/gold_butterfly.png',
  butterfly: '/assets/butterflies/gold_butterfly.png',
  minimal_butterfly: '/assets/butterflies/minimal_butterfly.png',
  watercolor_butterfly: '/assets/butterflies/watercolor_butterfly.png',
  vintage_butterfly: '/assets/butterflies/vintage_butterfly.png',
  white_butterfly: '/assets/butterflies/white_butterfly.png',

  // Decorations
  sparkle: '/assets/decorations/sparkle.png',
  sparkles: '/assets/decorations/sparkle.png',
  sparkle_overlay: '/assets/decorations/sparkle.png',
  star: '/assets/decorations/star.png',
  heart: '/assets/decorations/heart.png',
  cloud: '/assets/decorations/cloud.png',
  moon: '/assets/decorations/moon.png',
  sun: '/assets/decorations/sun.png',
  feather: '/assets/decorations/feather.png',
  ribbon: '/assets/decorations/ribbon.png',
  bow: '/assets/decorations/bow.png',
  pearl: '/assets/decorations/pearl.png',

  // Scrapbook
  washi_tape: '/assets/scrapbook/washi_tape.png',
  torn_paper: '/assets/scrapbook/torn_paper.png',
  coffee_stains: '/assets/scrapbook/coffee_stain.png',
  ink_splash: '/assets/scrapbook/ink_splash.png',
  wax_seal: '/assets/scrapbook/wax_seal.png',
  paper_clip: '/assets/scrapbook/paper_clip.png',
  binder_clip: '/assets/scrapbook/binder_clip.png',
  thumb_pin: '/assets/scrapbook/thumb_pin.png',
  vintage_stamp: '/assets/scrapbook/vintage_stamp.png',
  postage_stamp: '/assets/scrapbook/postage_stamp.png',

  // Birthday & Nature & Objects
  cake: '/assets/birthday/cake.png',
  candle: '/assets/birthday/candle.png',
  balloon: '/assets/birthday/balloon.png',
  gift_box: '/assets/birthday/gift_box.png',
  camera: '/assets/objects/camera.png',
  vinyl_record: '/assets/objects/vinyl_record.png',
  cassette: '/assets/objects/cassette.png',
  clock: '/assets/objects/clock.png'
};

export function FloatingDecoration({
  type = 'star',
  top = '10%',
  left,
  right,
  bottom,
  size = 32,
  delay = 0,
  rotate = 0
}) {
  const assetUrl = ASSET_MAP[type];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 0 }}
      animate={{
        opacity: [0.7, 1, 0.7],
        scale: [0.95, 1.05, 0.95],
        y: [0, -10, 0]
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: delay
      }}
      style={{
        position: 'absolute',
        top,
        left,
        right,
        bottom,
        pointerEvents: 'none',
        zIndex: 5,
        transform: `rotate(${rotate}deg)`
      }}
    >
      {assetUrl ? (
        <img
          src={assetUrl}
          alt={type}
          style={{
            width: `${size}px`,
            height: 'auto',
            maxHeight: `${size * 1.5}px`,
            objectFit: 'contain',
            filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.12))'
          }}
        />
      ) : (
        <Star size={size} fill="var(--accent-gold)" color="var(--accent-gold)" />
      )}
    </motion.div>
  );
}
