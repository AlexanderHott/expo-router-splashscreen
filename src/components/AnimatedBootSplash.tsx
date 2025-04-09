import BootSplash from "react-native-bootsplash";
import type { Manifest } from "react-native-bootsplash";
import MaskedView from "@react-native-masked-view/masked-view";
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { StyleSheet, View } from "react-native";
import { useState } from "react";
import type { ReactNode } from "react";

const MAX_SCALE = 10;

// eslint-disable-next-line @typescript-eslint/no-require-imports
const manifest = require("@/assets/bootsplash/manifest.json") as Manifest;

const styles = StyleSheet.create({
  mask: {
    backgroundColor: "black",
    borderRadius: manifest.logo.width,
    width: manifest.logo.width,
    height: manifest.logo.height,
  },
  transparent: {
    backgroundColor: "transparent",
  },
});

type Props = {
  animationEnded: boolean;
  children: ReactNode;
  onAnimationEnd: () => void;
  disabled?: boolean;
};

export const AnimatedBootSplash = ({
  animationEnded,
  children,
  onAnimationEnd,
}: Props) => {
  const [ready, setReady] = useState(false);

  const opacity = useSharedValue(1);
  const scale = useSharedValue(animationEnded ? MAX_SCALE : 1);

  const opacityStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const scaleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const { container, logo, brand } = BootSplash.useHideAnimation({
    manifest,
    ready,

    // eslint-disable-next-line @typescript-eslint/no-require-imports
    logo: require("@/assets/bootsplash/logo.png") as number,
    // brand: require("@/assets/bootsplash/brand.png") as number,

    // statusBarTranslucent: true,
    // navigationBarTranslucent: false,

    animate: () => {
      opacity.value = withTiming(0, {
        duration: 250,
        easing: Easing.out(Easing.ease),
      });

      scale.value = withTiming(
        MAX_SCALE,
        {
          duration: 350,
          easing: Easing.back(0.75),
        },
        () => {
          runOnJS(onAnimationEnd)();
        },
      );
    },
  });

  return (
    <>
      {/* Apply background color under the mask */}
      {!animationEnded && <View style={container.style} />}

      <MaskedView
        style={StyleSheet.absoluteFill}
        maskElement={
          // Transparent background because mask is based off alpha channel
          <View style={[container.style, styles.transparent]}>
            <Animated.View
              style={[styles.mask, scaleStyle]}
              onLayout={() => {
                setReady(true);
              }}
            />
          </View>
        }
      >
        {children}
      </MaskedView>

      {!animationEnded && (
        // Don't apply background color above the mask
        <View {...container} style={[container.style, styles.transparent]}>
          <Animated.Image
            {...logo}
            style={[logo.style, opacityStyle, scaleStyle]}
          />

          <Animated.Image {...brand} style={[brand.style, opacityStyle]} />
        </View>
      )}
    </>
  );
}
