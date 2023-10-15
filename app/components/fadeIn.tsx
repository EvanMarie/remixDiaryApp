import { Fade } from "@chakra-ui/react";
import { useState } from "react";

export default function FadeIn({
  children,
  speed,
  onClick,
}: {
  children?: React.ReactNode;
  speed?: string;
  onClick?: () => void;
}) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [fadeIn, setFadeIn] = useState(true);

  return (
    <Fade
      in={fadeIn}
      onClick={onClick && onClick}
      style={{
        transitionDuration: "1s",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="fade-blur-in">{children}</div>
    </Fade>
  );
}
