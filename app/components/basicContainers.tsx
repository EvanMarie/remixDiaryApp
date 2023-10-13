import { Box, BoxProps, Flex, FlexProps } from "@chakra-ui/react";
import { radius, shadow } from "~/styles/customTheme";

interface CustomFlexProps extends FlexProps {
  children?: React.ReactNode;
}

export function DarkGrayFlex({ children, ...props }: CustomFlexProps) {
  return (
    <Flex bg="gray.700" rounded={radius} shadow={shadow} {...props}>
      {children}
    </Flex>
  );
}

export function DarkPurpleFlex({ children, ...props }: CustomFlexProps) {
  return (
    <Flex bg="purple.900" rounded={radius} shadow={shadow} {...props}>
      {children}
    </Flex>
  );
}

export function DarkPinkFlex({ children, ...props }: CustomFlexProps) {
  return (
    <Flex bg="pink.900" rounded={radius} shadow={shadow} {...props}>
      {children}
    </Flex>
  );
}

export function DarkTealFlex({ children, ...props }: CustomFlexProps) {
  return (
    <Flex bg="teal.800" rounded={radius} shadow={shadow} {...props}>
      {children}
    </Flex>
  );
}

export function LightPurpleFlex({ children, ...props }: CustomFlexProps) {
  return (
    <Flex
      bg="purple.200"
      rounded={radius}
      shadow={shadow}
      {...props}
      color="gray.900"
    >
      {children}
    </Flex>
  );
}

export function LightTealFlex({ children, ...props }: CustomFlexProps) {
  return (
    <Flex
      bg="teal.300"
      rounded={radius}
      shadow={shadow}
      {...props}
      color="gray.900"
    >
      {children}
    </Flex>
  );
}

/* -------------------------------------------------------------------------- */

interface CustomBoxProps extends BoxProps {
  children?: React.ReactNode;
}

export function DarkGrayBox({ children, ...props }: CustomBoxProps) {
  return (
    <Box bg="gray.700" rounded={radius} shadow={shadow} {...props}>
      {children}
    </Box>
  );
}

export function DarkPurpleBox({ children, ...props }: CustomBoxProps) {
  return (
    <Box bg="purple.900" rounded={radius} shadow={shadow} {...props}>
      {children}
    </Box>
  );
}

export function DarkPinkBox({ children, ...props }: CustomBoxProps) {
  return (
    <Box bg="pink.900" rounded={radius} shadow={shadow} {...props}>
      {children}
    </Box>
  );
}

export function DarkTealBox({ children, ...props }: CustomBoxProps) {
  return (
    <Box bg="teal.800" rounded={radius} shadow={shadow} {...props}>
      {children}
    </Box>
  );
}

export function LightPurpleBox({ children, ...props }: CustomBoxProps) {
  return (
    <Box bg="purple.200" rounded={radius} shadow={shadow} {...props}>
      {children}
    </Box>
  );
}

export function LightTealBox({ children, ...props }: CustomBoxProps) {
  return (
    <Box bg="teal.300" rounded={radius} shadow={shadow} {...props}>
      {children}
    </Box>
  );
}
