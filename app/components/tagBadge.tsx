import { Badge, BadgeProps } from "@chakra-ui/react";
import { lightPurpleGrad, shadow } from "~/styles/customTheme";
interface TagBadgeProps extends BadgeProps {
  children?: React.ReactNode;
  props?: any;
}

export default function TagBadge({ children, ...props }: TagBadgeProps) {
  return (
    <Badge
      bgGradient={lightPurpleGrad}
      fontSize="1.2rem"
      fontWeight="600"
      borderRadius="lg"
      px={2}
      textTransform="lowercase"
      shadow={shadow}
      {...props}
    >
      {children}
    </Badge>
  );
}
