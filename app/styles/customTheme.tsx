import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react";

export const radius = "sm";
export const shadow = "0px 0px 10px rgba(0,0,0,0.7)";
export const largeShadow = "0px 0px 20px rgba(0,0,0,0.7)";

const CustomTheme = extendTheme(
  withDefaultColorScheme({
    colorScheme: "teal",
  }),
  {
    config: {
      initialColorMode: "dark",
      useSystemColorMode: false,
    },

    breakpoints: {
      base: "0em", // 0px
      sm: "37em", // ~600px
      md: "53em", // 848px
      lg: "75em", // 1200px
      xl: "80em", // 1280px);
    },
    fontSizes: {
      xxs: "0.75rem", // 12px
      xs: "0.9rem",
      sm: "1.1rem",
      md: "1.3rem",
      lg: "1.5rem",
      xl: "1.75rem",
      "2xl": "2rem",
      "3xl": "2.25rem",
      "4xl": "2.5rem",
      "5xl": "2.75rem",
      "6xl": "3rem",
      "7xl": "3.5rem",
      "8xl": "4rem",
      "9xl": "4.5rem",
    },
    styles: {
      global: {
        html: {
          scrollBehavior: "smooth",
          overflowX: "hidden",
          scrollbarWidth: "thin",
          overflowY: "hidden",
        },
        body: {
          overflowX: "hidden",
          overflowY: "hidden",
          fontFamily: "'Alegreya Sans', sans-serif;",
          bg: "gray.800",
          color: "gray.100",
          fontSize: "1.3rem",
        },
        a: {
          color: "teal.300",
          _hover: {
            color: "purple.200",
          },
          fontWeight: "600",
        },
      },

      components: {
        Input: {
          variants: {
            filled: {
              field: {
                bg: "gray.900",
                color: "white",
                shadow: "0px 0px 10px rgba(0,0,0,0.7)",
                fontWeight: "500",
                _focus: {
                  borderColor: "aiArt.400",
                  bg: "aiArt.900",
                  color: "aiArt.100",
                },
                _hover: {
                  borderColor: "aiArt.400",
                  bg: "aiArt.900",
                  color: "aiArt.100",
                },
              },
            },
          },
        },
      },
    },
  }
);

export default CustomTheme;

export const scrollBarStyles = {
  // For Chrome, Safari, and newer versions of Edge
  "&::-webkit-scrollbar": {
    width: "7px",
    height: "7px",
    backgroundColor: "gray.700",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "teal.300",
    borderRadius: "7px",
    minHeight: "50px",
    maxHeight: "150px",
    transition: "all 0.3s ease-in-out",
  },
  "&:hover::-webkit-scrollbar-thumb": {
    backgroundColor: "teal.300",
    transition: "all 0.3s ease-in-out",
  },
};

export const InputStyles = {
  variant: "filled",
  rounded: radius,
  bg: "gray.900",
  w: { base: "375px", sm: "450px", md: "700px" },
  color: "gray.50",
  border: "1px solid",
  shadow: shadow,
  borderColor: "gray.600",
  borderRadius: "md",
  focusBorderColor: "gray.600",
  _hover: {
    bg: "gray.800",
    borderColor: "gray.600",
    shadow: largeShadow,
  },
  _focus: {
    bg: "gray.800",
    borderColor: "gray.600",
  },
  transition: "all 0.3s ease-in-out",
};
