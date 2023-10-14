import { Stack, StackProps } from "@chakra-ui/react";

interface CollapsibleStackProps extends StackProps {
  children: React.ReactNode;
  expand?: string;
}

export default function CollapsibleStack({
  children,
  expand = "md",
  ...props
}: CollapsibleStackProps) {
  return (
    <Stack
      w="100%"
      direction={{ base: "column", [expand]: "row" }}
      spacing={{ base: 0, [expand]: 4 }}
      justify={{ base: "center", [expand]: "space-between" }}
      align={{ base: "center", [expand]: "flex-start" }}
      transition="all 0.3s ease-in-out"
      {...props}
    >
      {children}
    </Stack>
  );
}
