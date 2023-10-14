import { IconButton, IconButtonProps } from "@chakra-ui/react";
import { radius, shadow } from "~/styles/customTheme";
import { NavLink, useLocation } from "@remix-run/react";

interface CustomIconButtonProps extends IconButtonProps {
  addLink?: boolean;
  to?: string;
  onClick?: () => void;
}

export default function CustomIconButton({
  to,
  onClick,
  ...props
}: CustomIconButtonProps) {
  const location = useLocation();
  const isActive = location.pathname === to;
  const iconButton = (
    <IconButton
      bg={isActive ? "purple.200" : "teal.300"}
      color="gray.900"
      fontSize="1.7rem"
      fontWeight="600"
      rounded={radius}
      shadow={shadow}
      onClick={onClick}
      _hover={{
        bg: "purple.200",
      }}
      transition="all 0.3s ease-in-out"
      {...props}
    />
  );

  if (to) {
    return <NavLink to={to}>{iconButton}</NavLink>;
  }

  return iconButton;
}
