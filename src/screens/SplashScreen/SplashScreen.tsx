import Animated, {
  Easing,
  SharedValue,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { styles } from "./SplashScreenStyles";
import { Colors } from "../../styles/colors";
import { scheduleOnRN } from "react-native-worklets";
import { FC, useEffect, useRef, useState } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

import LogoM from "../../assets/images/logo-mt-m.svg";
import LogoT from "../../assets/images/logo-mt-t.svg";

const EASE = Easing.bezier(0.2, 0.8, 0.2, 1);
const PANEL_EASE = Easing.bezier(0.3, 0.7, 0.1, 1);

const RING_MS = 300;
const INNER_RING_DELAY_MS = 80;
const PIECES_DELAY_MS = 270;
const PIECES_MS = 610;
const NAME_DELAY_MS = 880;
const NAME_MS = 420;
const INDICATOR_FADE_MS = 200;
const SLIDE_HALF_MS = 550;
const EXIT_MS = 350;
const REDUCED_EXIT_MS = 200;
const MAX_WAIT_MS = 8000;

const PIECE_TRAVEL = 70;
const NAME_TRAVEL = 12;
const EXIT_TRAVEL = 120;
const PANEL_TOP = 300;

const OUTER_RING = 520;
const INNER_RING = 360;
const MONOGRAM = { width: 88, height: 127 };
const TRACK_WIDTH = 80;

const useRingStyle = (ring: SharedValue<number>, exit: SharedValue<number>) =>
  useAnimatedStyle(() => ({
    opacity: ring.value * (1 - exit.value),
    transform: [{ scale: 0.55 + 0.45 * ring.value }],
  }));

const usePieceStyle = (
  pieces: SharedValue<number>,
  exit: SharedValue<number>,
  direction: 1 | -1
) =>
  useAnimatedStyle(() => ({
    opacity: pieces.value * (1 - exit.value),
    transform: [
      {
        translateY:
          direction * PIECE_TRAVEL * (1 - pieces.value) -
          EXIT_TRAVEL * exit.value,
      },
    ],
  }));

interface SplashScreenProps {
  isReady: boolean;
  exitWithPanel: boolean;
  onFinish: () => void;
}

export const SplashScreen: FC<SplashScreenProps> = ({
  isReady,
  exitWithPanel,
  onFinish,
}) => {
  const { width, height } = useWindowDimensions();
  const isReducedMotion = useReducedMotion();

  const [hasEntered, setHasEntered] = useState(isReducedMotion);
  const [hasTimedOut, setHasTimedOut] = useState(false);
  const hasStartedExit = useRef(false);

  const initial = isReducedMotion ? 1 : 0;
  const outerRing = useSharedValue(initial);
  const innerRing = useSharedValue(initial);
  const pieces = useSharedValue(initial);
  const name = useSharedValue(initial);
  const indicator = useSharedValue(0);
  const slide = useSharedValue(-26);
  const exit = useSharedValue(0);
  const panel = useSharedValue(0);
  const fadeAll = useSharedValue(0);

  useEffect(() => {
    const timer = setTimeout(() => setHasTimedOut(true), MAX_WAIT_MS);

    if (!isReducedMotion) {
      const timing = (duration: number) => ({ duration, easing: EASE });

      outerRing.value = withTiming(1, timing(RING_MS));
      innerRing.value = withDelay(
        INNER_RING_DELAY_MS,
        withTiming(1, timing(RING_MS))
      );
      pieces.value = withDelay(
        PIECES_DELAY_MS,
        withTiming(1, timing(PIECES_MS))
      );
      name.value = withDelay(
        NAME_DELAY_MS,
        withTiming(1, timing(NAME_MS), (finished) => {
          if (finished) scheduleOnRN(setHasEntered, true);
        })
      );
    }

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!hasEntered || hasStartedExit.current) return;

    if (!isReady && !hasTimedOut) {
      indicator.value = withTiming(1, { duration: INDICATOR_FADE_MS });
      if (!isReducedMotion) {
        slide.value = withRepeat(
          withSequence(
            withTiming(66, {
              duration: SLIDE_HALF_MS,
              easing: Easing.inOut(Easing.sin),
            }),
            withTiming(-26, {
              duration: SLIDE_HALF_MS,
              easing: Easing.inOut(Easing.sin),
            })
          ),
          -1
        );
      }
      return;
    }

    hasStartedExit.current = true;

    const finish = (finished?: boolean) => {
      "worklet";
      if (finished) scheduleOnRN(onFinish);
    };

    if (isReducedMotion) {
      fadeAll.value = withTiming(1, { duration: REDUCED_EXIT_MS }, finish);
      return;
    }

    exit.value = withTiming(1, { duration: EXIT_MS, easing: EASE }, finish);
    if (exitWithPanel) {
      panel.value = withTiming(1, { duration: EXIT_MS, easing: PANEL_EASE });
    } else {
      fadeAll.value = withTiming(1, { duration: EXIT_MS, easing: EASE });
    }
  }, [hasEntered, isReady, hasTimedOut]);

  const centerX = width / 2;
  const centerY = height / 2;
  const panelHeight = height - PANEL_TOP;

  const containerStyle = useAnimatedStyle(() => ({
    opacity: 1 - fadeAll.value,
  }));

  const outerRingStyle = useRingStyle(outerRing, exit);
  const innerRingStyle = useRingStyle(innerRing, exit);
  const topPieceStyle = usePieceStyle(pieces, exit, -1);
  const bottomPieceStyle = usePieceStyle(pieces, exit, 1);

  const nameStyle = useAnimatedStyle(() => ({
    opacity: name.value * (1 - exit.value),
    transform: [
      {
        translateY: NAME_TRAVEL * (1 - name.value) - EXIT_TRAVEL * exit.value,
      },
    ],
  }));

  const indicatorStyle = useAnimatedStyle(() => ({
    opacity: indicator.value * (1 - exit.value),
    transform: [{ translateY: -EXIT_TRAVEL * exit.value }],
  }));

  const slideStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: slide.value }],
  }));

  const panelStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: (1 - panel.value) * panelHeight }],
  }));

  const ring = (size: number) => ({
    width: size,
    height: size,
    borderRadius: size / 2,
    left: centerX - size / 2,
    top: centerY - size / 2,
  });

  return (
    <Animated.View
      style={[StyleSheet.absoluteFill, styles.container, containerStyle]}
      accessible
      accessibilityLabel="Money Track carregando"
    >
      <StatusBar barStyle="light-content" backgroundColor={Colors.brandBlue} />

      <Animated.View
        style={[styles.ringOuter, ring(OUTER_RING), outerRingStyle]}
      />
      <Animated.View
        style={[styles.ringInner, ring(INNER_RING), innerRingStyle]}
      />

      <View
        style={[
          styles.monogram,
          {
            ...MONOGRAM,
            left: centerX - MONOGRAM.width / 2,
            top: centerY - 104,
          },
        ]}
      >
        <Animated.View style={[StyleSheet.absoluteFill, bottomPieceStyle]}>
          <LogoM width={MONOGRAM.width} height={MONOGRAM.height} />
        </Animated.View>
        <Animated.View style={[StyleSheet.absoluteFill, topPieceStyle]}>
          <LogoT width={MONOGRAM.width} height={MONOGRAM.height} />
        </Animated.View>
      </View>

      <Animated.View style={[styles.nameRow, { top: centerY + 48 }, nameStyle]}>
        <Text style={styles.name}>Money Track</Text>
      </Animated.View>

      <Animated.View
        style={[
          styles.track,
          {
            width: TRACK_WIDTH,
            left: centerX - TRACK_WIDTH / 2,
            top: centerY + 102,
          },
          indicatorStyle,
        ]}
      >
        <Animated.View style={[styles.dash, slideStyle]} />
      </Animated.View>

      {exitWithPanel && (
        <Animated.View style={[styles.panel, { top: PANEL_TOP }, panelStyle]} />
      )}
    </Animated.View>
  );
};
