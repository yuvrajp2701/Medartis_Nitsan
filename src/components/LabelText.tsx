import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { responsiveFontSize, responsiveHeight } from '../utils/responsive';

interface LabelTextProps {
  text: string;
}

const LabelText: React.FC<LabelTextProps> = ({ text }) => {
  return <Text style={styles.label}>{text}</Text>;
};

const styles = StyleSheet.create({
  label: {
    fontSize: responsiveFontSize(14),
    color: '#767272ff',
    marginBottom: responsiveHeight(0.5),
  },
});

export default LabelText;
