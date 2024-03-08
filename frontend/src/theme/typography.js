import { fontFamily } from '@mui/system';

// ----------------------------------------------------------------------

function pxToRem(value) {
  return `${value / 16}rem`;
}

function responsiveFontSizes({ xs, sm, md, lg }) {
  return {
    '@media (min-width:0px)': {
      fontSize: pxToRem(xs),
    },
    '@media (min-width:600px)': {
      fontSize: pxToRem(sm),
    },
    '@media (min-width:900px)': {
      fontSize: pxToRem(md),
    },
    '@media (min-width:1200px)': {
      fontSize: pxToRem(lg),
    },
  };
}

const FONT_PRIMARY = 'Inter'

const typography = {
  fontFamily: FONT_PRIMARY,
  fontWeightRegular: 400,
  fontWeightMedium: 600,
  fontWeightBold: 700,
  h1: {
    fontWeight: 700,
    lineHeight: 80 / 64,
    fontSize: pxToRem(40),
    ...responsiveFontSizes({ sm: 52, md: 58, lg: 64 }),
  },
  h2: {
    fontWeight: 700,
    lineHeight: 64 / 48,
    fontSize: pxToRem(32),
    ...responsiveFontSizes({ sm: 40, md: 44, lg: 48 }),
  },
  h3: {
    fontWeight: 500,
    lineHeight: 1.5,
    fontSize: pxToRem(28),
  },
  h4: {
    fontWeight: 500,
    lineHeight: 1.5,
    fontSize: pxToRem(22),
    ...responsiveFontSizes({ sm: 20, md: 24, lg: 24 }),
  },
  h5: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(18),
    ...responsiveFontSizes({ sm: 19, md: 20, lg: 20 }),
  },
  h6: {
    fontWeight: 700,
    lineHeight: 28 / 18,
    fontSize: pxToRem(17),
    ...responsiveFontSizes({ sm: 18, md: 18, lg: 18 }),
  },
  heroTitle: {
    fontWeight: 400,
    lineHeight: 1.1,
    letterSpacing: '-2px',
    fontSize: pxToRem(52),
    ...responsiveFontSizes({ xs: 52, sm: 52, md: 52, lg: 52 }),
  },
  heroSubText: {
    fontWeight: 400,
    lineHeight: 1.6,
    fontSize: pxToRem(16),
    ...responsiveFontSizes({ xs: 14, sm: 16, md: 16, lg: 16 }),
  },
  subtitle1: {
    color: "#B0B0B0",
    fontWeight: 300,
    lineHeight: 1.5,
    fontSize: pxToRem(16),
  },
  subtitle2: {
    fontWeight: 600,
    lineHeight: 22 / 14,
    fontSize: pxToRem(14),
  },
  body1: {
    lineHeight: 1.5,
    fontSize: pxToRem(18),
  },
  body2: {
    lineHeight: 1.5,
    fontSize: pxToRem(14),
  },
  button: {
    fontWeight: 700,
    lineHeight: 24 / 14,
    fontSize: pxToRem(14),
    textTransform: 'capitalize'
  },
  profilePageTitle: {
    color: "rgb(5, 12, 38)",
    fontWeight: 500,
    fontSize: pxToRem(16),
    ...responsiveFontSizes({ xs: 16, sm: 16, md: 16, lg: 16 }),
  },
  profilePageSubText: {
    color: "rgb(113, 117, 132)",
    fontSize: pxToRem(14),
    ...responsiveFontSizes({ xs: 12, sm: 12, md: 14, lg: 14 }),
  },
  companyTitle: {
    color: "rgb(5, 12, 38)",
    fontWeight: 500,
    lineHeight: "30px",
    fontSize: pxToRem(24),
    ...responsiveFontSizes({ xs: 24, sm: 24, md: 24, lg: 24 }),
  },
  companySubText: {
    color: "rgb(97, 97, 97)",
    fontWeight: 400,
    lineHeight: "20px",
    fontSize: pxToRem(16),
    ...responsiveFontSizes({ xs: 14, sm: 14, md: 16, lg: 16 }),
  },
  orderDetailsText: {
    color: "rgb(97, 97, 97)",
    fontWeight: 400,
    // lineHeight: "20px",
    fontSize: pxToRem(12),
    ...responsiveFontSizes({ xs: 12, sm: 12, md: 12, lg: 12 }),
  },
  orderDetailsSUbText: {
    color: "rgb(5, 12, 38)",
    fontWeight: 500,
    // lineHeight: "30px",
    fontSize: pxToRem(16),
    ...responsiveFontSizes({ xs: 14, sm: 14, md: 16, lg: 16 }),
  },
  TabMainTitle: {
    color: "rgb(54, 148, 205)",
    fontWeight: 600,
    fontSize: pxToRem(16),
    ...responsiveFontSizes({ xs: 14, sm: 14, md: 16, lg: 16 }),
  }

};

export default typography;
