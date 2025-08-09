const fadeIn = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  }

  // Animation variants for staggered links
const staggerAnimation = {
    hidden: { opacity: 0, y: -10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 +i * 0.1,
        duration: 0.5,
      },
    }),
  };

  const staggerAnimationHorizontal = {
    hidden: { opacity: 0, x: -10 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.1 +i * 0.2,
        duration: 0.5,
      },
    }),
  };

  const tagsStaggerAnimation = {
    hidden: { opacity: 0, x: 10 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.05 +i * 0.01,
        duration: 0.5,
      },
    }),
  };

  export { fadeIn, staggerAnimation, tagsStaggerAnimation, staggerAnimationHorizontal }