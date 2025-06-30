// Animation presets for Framer Motion

export const fadeIn = (direction, type, delay, duration) => ({
  hidden: {
    x: direction === 'left' ? 80 : direction === 'right' ? -80 : 0,
    y: direction === 'up' ? 80 : direction === 'down' ? -80 : 0,
    opacity: 0,
  },
  show: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      type,
      delay,
      duration,
      ease: 'easeOut',
    },
  },
});

export const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

// Simple fade in animation
export const simpleFadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.5 }
};

export const slideFromBottom = {
  initial: { y: 50, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: 50, opacity: 0 },
  transition: { duration: 0.5 }
};

export const slideFromTop = {
  initial: { y: -50, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: -50, opacity: 0 },
  transition: { duration: 0.5 }
};

export const slideFromLeft = {
  initial: { x: -50, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: -50, opacity: 0 },
  transition: { duration: 0.5 }
};

export const slideFromRight = {
  initial: { x: 50, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: 50, opacity: 0 },
  transition: { duration: 0.5 }
};

export const scaleIn = {
  initial: { scale: 0.95, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.95, opacity: 0 },
  transition: { duration: 0.5 }
};

// For use with staggerContainer
export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

// Page transition animation
export const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.3 }
};

// Hover effects
export const hoverScale = {
  scale: 1.05,
  transition: { duration: 0.3 }
};

export const hoverGlow = {
  boxShadow: '0 0 15px rgba(255, 106, 0, 0.6)',
  transition: { duration: 0.3 }
};

// Card hover animation
export const cardHover = {
  whileHover: {
    y: -5,
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
    transition: { duration: 0.3 }
  }
};

// Button animation
export const buttonAnimation = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.98 },
  transition: { duration: 0.2 }
};

// Image hover zoom
export const imageZoom = {
  whileHover: { 
    scale: 1.05,
    transition: { duration: 0.5 }
  }
};

// Modal animations
export const modalBackdrop = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.2 }
};

export const modalContent = {
  initial: { opacity: 0, y: -20, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 20, scale: 0.98 },
  transition: { duration: 0.3, ease: "easeOut" }
};

// Form field focus animation
export const formFieldFocus = {
  scale: 1.02,
  borderColor: "#FF6A00",
  transition: { duration: 0.2 }
};

// List item animations
export const listAnimation = (delay = 0) => ({
  initial: { opacity: 0, x: -20 },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.3,
      delay: delay
    }
  },
  exit: { opacity: 0, x: -20 }
});

// Scroll-triggered animations (for use with Framer Motion's useInView)
export const scrollReveal = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7 }
};

// Pulse animation for notifications or attention-grabbing elements
export const pulse = {
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      repeatType: "loop"
    }
  }
};

// Navigation underline animation
export const navUnderline = {
  initial: { width: 0 },
  whileHover: { 
    width: "100%",
    transition: { duration: 0.2 }
  },
  exit: { width: 0 }
};

// Text reveal animation
export const textReveal = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: { 
      type: "tween", 
      ease: "easeOut", 
      duration: 0.8 
    } 
  }
};

// Stagger container for text with character animation
export const textContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

// Character animation for text containers
export const textChar = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "tween",
      ease: "easeOut",
    },
  },
};

// Fire orange accent color animation
export const fireAccent = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { 
    opacity: 1, 
    scale: 1,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 100,
    }
  }
};

// Scale with fire shadow effect
export const fireButton = {
  whileHover: { 
    scale: 1.05,
    boxShadow: '0 0 15px rgba(255, 106, 0, 0.6)',
    transition: { duration: 0.3 }
  },
  whileTap: { 
    scale: 0.98,
    boxShadow: '0 0 5px rgba(255, 106, 0, 0.4)',
  }
};

// Grid item entrance animation for staggered grids
export const gridItemAnimation = (index) => ({
  hidden: { opacity: 0, y: 30 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "tween",
      duration: 0.6,
      delay: index * 0.1,
      ease: "easeOut"
    } 
  }
});

// Rotating shape animation
export const rotateAnimation = {
  animate: {
    rotate: 360,
    transition: {
      duration: 10,
      repeat: Infinity,
      repeatType: "loop",
      ease: "linear"
    }
  }
};
