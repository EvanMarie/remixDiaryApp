import { Button, ButtonProps } from "@chakra-ui/react";
import {
  lightPurpleGrad,
  lightTealGrad,
  radius,
  shadow,
} from "~/styles/customTheme";
import { NavLink, useLocation } from "@remix-run/react";

interface CustomButtonProps extends ButtonProps {
  children: React.ReactNode;
  to?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset" | undefined;
}

export default function CustomButton({
  children,
  to,
  onClick,
  type = "button",
  ...props
}: CustomButtonProps) {
  const location = useLocation();
  const isActive = location.pathname === to;

  const button = (
    <Button
      bgGradient={isActive ? lightPurpleGrad : lightTealGrad}
      color="gray.900"
      fontSize={{ base: "1.2rem", md: "1.3rem", lg: "1.4rem" }}
      py={{ base: 2, sm: 3, md: 4 }}
      px={{ base: 3, sm: 5, md: 6, lg: 7 }}
      onClick={onClick}
      fontWeight="600"
      h="33px"
      rounded={radius}
      shadow={shadow}
      type={type}
      _hover={{
        bg: "purple.200",
        color: "gray.900",
      }}
      transition="all 0.3s ease-in-out"
      {...props}
    >
      {children}
    </Button>
  );

  if (to) {
    return <NavLink to={to}>{button}</NavLink>;
  }

  return button;
}
