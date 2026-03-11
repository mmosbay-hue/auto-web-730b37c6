import React from 'react';
import { motion } from 'framer-motion';

const barVariants = {
  animate: {
    scaleY: [1, 1.5, 1, 0.5, 1.2, 1],
    transition: {
      duration: 0.8,
      repeat: Infinity,
      repeatType: 'mirror',
      ease: 'easeInOut'
    }
  }
};

export default function Waveform() {
  return (
    <div className="flex items-end h-5 space-x-1">
      {[0.1, 0.3, 0, 0.2].map((delay, i) => (
        <motion.div
          key={i}
          className="w-1 bg-indigo-500 rounded-full"
          style={{ height: '100%' }}
          variants={barVariants}
          animate="animate"
          transition={{ ...barVariants.animate.transition, delay: delay }}
        />
      ))}
    </div>
  );
}