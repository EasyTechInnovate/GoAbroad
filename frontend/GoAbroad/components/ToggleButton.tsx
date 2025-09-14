import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface ToggleButtonProps {
  options: string[];
  onSelect: (value: string) => void;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ options, onSelect }) => {
  const [selected, setSelected] = useState(options[0]);

  const handleSelect = (option: string) => {
    setSelected(option);
    onSelect(option);
  };

  return (
    <View style={styles.container}>
      {options.map((option) => (
        <TouchableOpacity
          key={option}
          style={[
            styles.button,
            selected === option && styles.selectedButton,
          ]}
          onPress={() => handleSelect(option)}
        >
          <Text
            style={[
              styles.text,
              selected === option && styles.selectedText,
            ]}
          >
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    // backgroundColor: "#EAEAEA",
    borderRadius: 25,
    padding: 4,
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 25,
    alignItems: "center",
  },
  selectedButton: {
    backgroundColor: "#145044",
  },
  text: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
  selectedText: {
    color: "#fff",
  },
});

export default ToggleButton;
