const { telescopeColors, telescopeFontSize } = require("./src/telescope/tokens/telescope_tailwind_variables.ts");

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontWeight: {
      normal: "var(--font-weight-normal)",
      medium: "var(--font-weight-medium)",
      semibold: "var(--font-weight-semibold)",
      bold: "var(--font-weight-bold)",
    },
    extend: {
      colors: { ...telescopeColors },
      textColor: { ...telescopeColors },
      fontSize: { ...telescopeFontSize },
    },
  },
};
