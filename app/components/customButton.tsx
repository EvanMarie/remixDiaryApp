import { Button, ButtonProps } from "@chakra-ui/react";
import { radius, shadow } from "~/styles/customTheme";
import { Link } from "@remix-run/react";

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
  const button = (
    <Button
      bg="teal.300"
      color="gray.900"
      fontSize="1.3rem"
      onClick={onClick}
      fontWeight="600"
      h="33px"
      rounded={radius}
      shadow={shadow}
      _hover={{
        bg: "purple.200",
      }}
      transition="all 0.3s ease-in-out"
      {...props}
    >
      {children}
    </Button>
  );

  if (to) {
    return <Link to={to}>{button}</Link>;
  }

  return button;
}
