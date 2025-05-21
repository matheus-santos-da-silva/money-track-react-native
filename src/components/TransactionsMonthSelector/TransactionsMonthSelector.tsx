import React, { useEffect, useState } from "react";
import { styles } from "./TransactionsMonthSelectorStyles";
import { months } from "../MonthSelectorModal/MonthSelectorModal";
import { CustomText } from "../CustomText/CustomText";
import { TouchableOpacity, View, Text } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";

import ArrowLeftIcon from "../../assets/images/arrow-left-svg.svg";
import ArrowRightIcon from "../../assets/images/arrow-right-svg.svg";

interface TransactionsMonthSelectorProps {
  monthIndex: number;
  onMonthChange: (newMonthIndex: number) => void;
  filterSelected: string | null;
}

export const TransactionsMonthSelector: React.FC<
  TransactionsMonthSelectorProps
> = ({ monthIndex, onMonthChange, filterSelected }) => {
  const AnimatedText = Animated.createAnimatedComponent(Text);

  const [currentMonthIndex, setCurrentMonthIndex] = useState(monthIndex);

  useEffect(() => {
    setCurrentMonthIndex(monthIndex);
  }, [monthIndex]);

  const previousMonth =
    currentMonthIndex === 0
      ? months[months.length - 1]
      : months[currentMonthIndex - 1];

  const nextMonth =
    currentMonthIndex === months.length - 1
      ? months[0]
      : months[currentMonthIndex + 1];

  const offset = useSharedValue(0);
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }],
    opacity: opacity.value,
  }));

  const handlePrevMonth = () => {
    offset.value = withTiming(-50, {
      duration: 200,
      easing: Easing.inOut(Easing.ease),
    });
    opacity.value = withTiming(0, {
      duration: 200,
      easing: Easing.linear,
    });

    setTimeout(() => {
      const newIndex =
        currentMonthIndex === 0 ? months.length - 1 : currentMonthIndex - 1;
      setCurrentMonthIndex(newIndex);
      onMonthChange(newIndex);

      offset.value = 50;
      offset.value = withTiming(0, {
        duration: 300,
        easing: Easing.out(Easing.ease),
      });
      opacity.value = withTiming(1, {
        duration: 300,
        easing: Easing.linear,
      });
    }, 200);
  };

  const handleNextMonth = () => {
    offset.value = withTiming(50, {
      duration: 200,
      easing: Easing.inOut(Easing.ease),
    });
    opacity.value = withTiming(0, {
      duration: 200,
      easing: Easing.linear,
    });

    setTimeout(() => {
      const newIndex =
        currentMonthIndex === months.length - 1 ? 0 : currentMonthIndex + 1;
      setCurrentMonthIndex(newIndex);
      onMonthChange(newIndex);

      offset.value = -50;
      offset.value = withTiming(0, {
        duration: 300,
        easing: Easing.out(Easing.ease),
      });
      opacity.value = withTiming(1, {
        duration: 300,
        easing: Easing.linear,
      });
    }, 200);
  };

  return (
    <View style={styles.monthModalContainer}>
      <View style={styles.monthModal}>
        <TouchableOpacity
          onPress={handlePrevMonth}
          style={styles.leftArrowContainer}
        >
          <ArrowLeftIcon width={14} height={14} />
        </TouchableOpacity>

        <View style={styles.monthsCenterContent}>
          <CustomText style={styles.monthsOptionsText}>
            {previousMonth}
          </CustomText>

          <View style={styles.monthMarker}>
            <AnimatedText style={[styles.selectedMonth, animatedStyle]}>
              {filterSelected === "today"
                ? "Hoje"
                : filterSelected === "thisYear"
                ? new Date().getFullYear()
                : months[currentMonthIndex]}
            </AnimatedText>
          </View>

          <CustomText style={[styles.monthsOptionsText]}>
            {nextMonth}
          </CustomText>
        </View>

        <TouchableOpacity
          onPress={handleNextMonth}
          style={styles.rightArrowContainer}
        >
          <ArrowRightIcon width={14} height={14} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
