module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  purge: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      kanit: ["Kanit"],
    },
    extend: {
      rotate: {
        270: "270deg",
      },

      gridTemplateColumns: {
        515: "repeat(5, 1fr) 70px repeat(5, 1fr)",
      },
      gridColumn: {
        all: "col-span-4 md:col-span-8 xl:col-span-12",
      },
      colors: {
        "golemblue": "#0C14D4",
        "primary": "#181EA9",
        "neutral-grey-300": "#404B63",
        "neutral-grey-200": "#A2A3B9",
        "lightblue-50": "#F6F8FC",
        "lightblue-100": "#E8EBF6",
        "lightblue-200": "#C6CCED",
        "lightblue-border": "A4A6DD",
        "blue-300": "#A4ADDE",
        "blue-400": "#5F6ABF",
        "darkblue-500": "#181EA9",
        "darkblue-600": "#0E137C",
        "darkblue-700": "#0C0E55",
        "dangerred-200": "#A71919",
        //TODO add whole color palette with names
        "success-50": "#E8F6E8",
        "success-100": "#5BC281",
        "success-200": "#367946",
        // golemblue: '#0c14d4',
        // primary: '#181ea9',
        // secondary: '#f6f8fc',
      },
      transitionDuration: {
        5000: "5000ms",
      },
      minHeight: {
        "screen-without-footer-and-header": "calc(100vh - 14rem)",
      },
      width: {
        "90p": "90%",
        "golem-grid-desktop": "1232px",
      },
      borderWidth: {
        1: "1px",
        1.5: "1.5px",
      },
      height: {
        "line-1": "1em",
        "line-1.5": "1.5em",
        "line-2": "2em",
        "line-3": "3em",
      },
      maxWidth: {
        "1/2": "50%",
      },
      fontSize: {
        "h7": [
          "1.125rem",
          {
            /* Headers/Header 7 | Kanit Regular 18px */
            fontSize: "18px",
            fontStyle: "normal",
            fontWeight: 600,
            lineHeight: "130%" /* 24px */,
            letterSpacing: "-0.18px",
          },
        ],
        "h6": [
          "1.25rem",
          {
            /* Headers/Header 6 | Kanit Regular 20px */
            fontSize: "20px",
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "120%" /* 24px */,
            letterSpacing: "-0.2px",
          },
        ],
        "h1": [
          "3.5rem",
          {
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "110%",
            /* 38.4px */
            letterSpacing: "-0.96px",
          },
        ],
        "h2": [
          "3rem",
          {
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "110%",
            /* 38.4px */
            letterSpacing: "-0.96px",
          },
        ],
        "h3": [
          "2rem",
          {
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "120%",
            /* 38.4px */
            letterSpacing: "-0.64px",
          },
        ],
        "h4": [
          "1.5rem",
          {
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "120%",
            /* 38.4px */
            letterSpacing: "-0.48px",
          },
        ],
        "caption-normal": [
          "12px",
          {
            fontStyle: "normal",
            fontWeight: "300",
            lineHeight: "140%",
          },
        ],
        "button-large": [
          "1rem",
          {
            fontSize: "16px",
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "100%",
          },
        ],
        "body-small-light": [
          "0.9rem",
          {
            fontStyle: "normal",
            fontWeight: 300,
            lineHeight: "140%",
          },
        ],
        "body-small": [
          "0.9rem",
          {
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "140%",
          },
        ],
        "body-normal": [
          "1rem",
          {
            fontStyle: "normal",
            fontWeight: 300,
            lineHeight: "140%",
          },
        ],
        "body-medium": [
          "1rem",
          {
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "140%",
          },
        ],
        "body-extra-large": [
          "1.375rem",
          {
            fontSize: "22px",
            fontStyle: "normal",
            fontWeight: 300,
            lineHeight: "130%",
            letterSpacing: "-0.22px",
          },
        ],
        //TODO refactor from c-n to caption-normal and so on
        "c-xs": [
          "0.6rem",
          {
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "140%",
          },
        ],
        "c-n": [
          "0.75rem",
          {
            fontStyle: "normal",
            fontWeight: 300,
            lineHeight: "140%",
          },
        ],
        "mini": ".65rem",
        "3.5xl": [
          "32px",
          {
            lineHeight: "38.4px",
            letterSpacing: "-0.64px",
          },
        ],
      },
      spacing: {
        "golem-logo": "5.76rem",
        "30": "120px",
      },
      scale: {
        10: "0.10",
        25: "0.25",
        30: "0.30",
        33: "0.33",
        35: "0.35",
        38: "0.38",
        40: "0.40",
        45: "0.45",
        75: "0.75",
        85: "0.85",
      },
    },
  },
};
