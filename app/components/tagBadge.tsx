import { Badge, BadgeProps } from "@chakra-ui/react";
import { shadow } from "~/styles/customTheme";
interface TagBadgeProps extends BadgeProps {
  children?: React.ReactNode;
  props?: any;
}

export default function TagBadge({ children, ...props }: TagBadgeProps) {
  return (
    <Badge
      bg="purple.200"
      fontSize="1.2rem"
      fontWeight="600"
      borderRadius="lg"
      px={1}
      pl={2}
      textTransform="lowercase"
      shadow={shadow}
      {...props}
    >
      {children}
    </Badge>
  );
}
