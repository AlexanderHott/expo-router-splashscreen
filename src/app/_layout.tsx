import { Stack } from "expo-router";
import { AnimatedBootSplash } from "@/components/AnimatedBootSplash";
import { useState } from "react";

export default function RootLayout() {
  const [splashVisible, setSplashVisible] = useState(true);
  return (
    <AnimatedBootSplash
      animationEnded={!splashVisible}
      onAnimationEnd={() => {
        // setSplashVisible(false);
      }}
    >
      <Stack />
    </AnimatedBootSplash>
  );
}
