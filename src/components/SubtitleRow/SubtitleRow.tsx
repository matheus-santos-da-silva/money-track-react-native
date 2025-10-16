import { FC } from "react";
import { styles } from "./SubtitleRowStyles";
import { Colors } from "../../styles/colors";
import { Text, View } from "react-native";

interface SubtitleRowProps {
  title: string;
  color: string;
  percent: number;
}

export const SubtitleRow: FC<SubtitleRowProps> = ({
  title,
  color,
  percent,
}) => {
  return (
    <View style={styles.subtitleRow}>
      <Text
        style={{
          fontSize: 8,
          color: Colors.primaryGray,
          width: 35,
          textAlign: "right",
          fontFamily: "Poppins-Regular",
        }}
      >
        {percent.toFixed(2)}%
      </Text>
      <View style={{ width: 10, height: 10, backgroundColor: color }}></View>

      <Text
        style={{
          fontSize: 10,
          color: Colors.primaryGray,
          lineHeight: 12,
          fontFamily: "Poppins-Regular",
        }}
      >
        {title}
      </Text>
    </View>
  );
};
