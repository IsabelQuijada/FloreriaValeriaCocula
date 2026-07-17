import React, { ReactNode } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { spacing } from '../theme';

interface CardGridProps {
  children: ReactNode;
  /** Separación entre cards. */
  gap?: number;
  style?: StyleProp<ViewStyle>;
}

/**
 * Grid fluido de cards: los hijos definen su flexBasis/maxWidth (vía Card)
 * y el grid los acomoda en filas según el ancho disponible.
 */
export default function CardGrid({ children, gap = spacing.lg, style }: CardGridProps) {
  return <View style={[styles.grid, { gap }, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});
