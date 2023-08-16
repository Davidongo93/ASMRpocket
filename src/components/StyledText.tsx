import React, { ReactNode } from 'react';
import { Text, StyleSheet } from 'react-native';
import theme from '../theme';

interface StyledTextProps {
  align?: 'center';
  children: ReactNode;
  color?: 'primary' | 'secondary';
  fontSize?: 'subheading';
  fontWeight?: 'bold' | 'normal' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
  style?: object; // Cambia esto al tipo correcto si StyledText acepta un tipo específico para style
}

const StyledText = ({
  align,
  children,
  color,
  fontSize,
  fontWeight,
  style,
  ...resOfProps
}: StyledTextProps) => {
  const textStyles = [
    styles.text,
    align === 'center' && styles.textAlignCenter,
    color === 'primary' && styles.colorPrimary,
    color === 'secondary' && styles.colorSecondary,
    fontSize === 'subheading' && styles.subheading,
    fontWeight === 'bold' && styles.bold,
    style,
  ];
  return <Text style={textStyles}>{children}</Text>;
};

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.normal,
  },
  colorPrimary: {
    color: theme.colors.primary,
  },
  colorSecondary: {
    color: theme.colors.textSecondary,
  },
  bold: {
    fontWeight: 'bold', // Cambia los valores de fontWeight a 'bold'
  },
  subheading: {
    fontSize: theme.fontSizes.subheading,
  },
  textAlignCenter: {
    textAlign: 'center',
  },
});

export default StyledText;
