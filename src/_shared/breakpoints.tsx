const size = {
  mobile: '320px',
  mobileL: '425px',
  tablet: '768px',
  laptop: '1024px',
  desktop: '1440px',
  ultrawide: '2560px'
};

export const breakpoints = {
  mobile: `(min-width: ${size.mobile})`,
  mobileL: `(min-width: ${size.mobileL})`,
  tablet: `(min-width: ${size.tablet})`,
  laptop: `(min-width: ${size.laptop})`,
  desktop: `(min-width: ${size.desktop})`,
  ultrawide: `(min-width: ${size.ultrawide})`
};