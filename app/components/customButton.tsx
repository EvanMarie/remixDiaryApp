import { Button, ButtonProps } from "@chakra-ui/react";
import { radius, shadow } from "~/styles/customTheme";
import { NavLink, useLocation } from "@remix-run/react";

interface CustomButtonProps extends ButtonProps {
  children: React.ReactNode;
  to?: string;
  onClick?: () => void;
}

export default function CustomButton({
  children,
  to,
  onClick,
  ...props
}: CustomButtonProps) {
  const location = useLocation();
  const isActive = location.pathname === to;

  const button = (
    <Button
      bg={isActive ? "purple.200" : "teal.300"}
      color="gray.900"
      fontSize={{ base: "1.1rem", md: "1.3rem", lg: "1.4rem" }}
      p={{ base: 2, sm: 3, md: 4 }}
      onClick={onClick}
      fontWeight="600"
      h="33px"
      rounded={radius}
      shadow={shadow}
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
