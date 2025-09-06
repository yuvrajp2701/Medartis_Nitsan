import React, { useRef } from 'react';
import { View, TextInput, StyleProp, TextStyle } from 'react-native';
import styles from '../styles/resetVerificationStyles';

interface OtpInputBoxesProps {
  code: string[];
  setCode: (code: string[]) => void;
  numberOfDigits?: number;
  boxStyle?: StyleProp<TextStyle>;
}

const OtpInputBoxes: React.FC<OtpInputBoxesProps> = ({
  code,
  setCode,
  numberOfDigits = 4,
  boxStyle,
}) => {
  const inputRefs = useRef<Array<TextInput | null>>([]);

  const handleChange = (text: string, index: number) => {
    const updatedCode = [...code];
    updatedCode[index] = text.slice(-1);
    setCode(updatedCode);

    if (text && index < numberOfDigits - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={styles.codeContainer}>
      {Array(numberOfDigits)
        .fill(0)
        .map((_, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputRefs.current[index] = ref)}
            style={[styles.codeBox, boxStyle]}
            keyboardType="numeric"
            maxLength={1}
            value={code[index]}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            returnKeyType="next"
            autoFocus={index === 0}
          />
        ))}
    </View>
  );
};

export default OtpInputBoxes;
