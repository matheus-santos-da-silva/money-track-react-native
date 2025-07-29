import { FC, useEffect, useState } from "react";
import { Colors } from "../../styles/colors";
import { styles } from "./CurrencyInputStyles";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";

type CurrencyInputWithKeypadProps = {
  value: number;
  onChange: (value: number) => void;
  type: "EXPENSE" | "INCOME";
};

export const CurrencyInputWithKeypad: FC<CurrencyInputWithKeypadProps> = ({
  onChange,
  value,
  type,
}) => {
  const [rawValue, setRawValue] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const MAX_DIGITS = 9;

  useEffect(() => {
    if (value && value > 0) {
      const cents = Math.round(value * 100).toString();
      setRawValue(cents);
    }
  }, [value]);

  const formatCurrency = (value: string) => {
    const cents = value.padStart(3, "0");
    const numericValue = parseInt(cents, 10) / 100;
    return numericValue.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
    });
  };

  const handleKeyPress = (key: string) => {
    if (key === "del") {
      const updated = rawValue.slice(0, -1);
      setRawValue((prev) => prev.slice(0, -1));
      onChange(parseInt(updated.padStart(3, "0"), 10) / 100);
    } else if (rawValue.length < MAX_DIGITS) {
      const updated = rawValue + key;
      setRawValue((prev) => prev + key);
      onChange(parseInt(updated.padStart(3, "0"), 10) / 100);
    }
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.displayBox}
      >
        <Text style={styles.displayText}>{formatCurrency(rawValue)}</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="slide">
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.keypadContainer}>
              {["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"].map((num) => (
                <TouchableOpacity
                  key={num}
                  onPress={() => handleKeyPress(num)}
                  style={styles.key}
                >
                  <Text style={styles.keyText}>{num}</Text>
                </TouchableOpacity>
              ))}

              <TouchableOpacity
                onPress={() => handleKeyPress("del")}
                style={[styles.key, { backgroundColor: "#eee" }]}
              >
                <Text style={[styles.keyText, { fontSize: 18 }]}>⌫</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={[
                  styles.key,
                  {
                    backgroundColor:
                      type === "EXPENSE"
                        ? Colors.expenseRed
                        : Colors.incomeGreen,
                  },
                ]}
              >
                <Text style={[styles.keyText, { color: "#fff" }]}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};
