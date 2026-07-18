import React, { ReactNode } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { useBreakpoint } from '../hooks/useBreakpoint';
import { borderWidth, colors, radius, shadows, spacing, webTransition } from '../theme';

interface CardProps {
  children: ReactNode;
  /** Padding interno uniforme (desactivar para cards con imagen a sangre). */
  padded?: boolean;
  /** Nivel de elevación. */
  shadow?: 'none' | 'sm' | 'md';
  /** Al usarse dentro de CardGrid: base flexible del item. */
  flexBasis?: number;
  /** Anchura máxima del card dentro del grid. */
  maxWidth?: number;
  style?: StyleProp<ViewStyle>;
}

/** Superficie base para cards de producto, servicios, testimonios y formularios. */
export default function Card({
  children,
  padded = true,
  shadow = 'sm',
  flexBasis,
  maxWidth,
  style,
}: CardProps) {
  const { isMobile } = useBreakpoint();
  return (
    <View
      style={[
        styles.card,
        webTransition,
        padded && styles.padded,
        shadow !== 'none' && shadows[shadow],
        flexBasis != null && { flexGrow: 1, flexBasis },
        isMobile && flexBasis != null && styles.mobileGridCard,
        maxWidth != null && { maxWidth },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: borderWidth.thin,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  padded: {
    padding: spacing.lg,
  },
  mobileGridCard: {
    width: '100%',
    maxWidth: '100%',
    flexBasis: 'auto',
  },
});
