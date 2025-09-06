import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { isTablet, responsiveFontSize, responsiveHeight } from '../utils/responsive';

interface TitleProps {
  text: string;
}

const Title: React.FC<TitleProps> = ({ text }) => {
  return <Text style={styles.title}>{text}</Text>;
};

const styles = StyleSheet.create({
  title: {
    fontSize: isTablet ? responsiveFontSize(20) : responsiveFontSize(24),
    fontWeight: '400',
    textAlign: 'center',
    marginBottom: responsiveHeight(3.5),
    color: '#000',
    alignSelf: 'center',
  },
});

export default Title;
