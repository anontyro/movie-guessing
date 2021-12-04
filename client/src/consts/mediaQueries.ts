const XL = 1600;
const LG = 1200;
const MD = 992;
const SM = 768;
const XS = 576;

const mq = (breakpoint: number) => `@media (min-width: ${breakpoint}px)`;

const mediaQueries = {
  xl: mq(XL),
  lg: mq(LG),
  md: mq(MD),
  sm: mq(SM),
  xs: mq(XS),
};

export default mediaQueries;
