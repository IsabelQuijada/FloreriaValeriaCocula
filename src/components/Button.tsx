import React from 'react';
import { Pressable, StyleProp, StyleSheet, Text, ViewStyle } from 'react-native';
import { useHover } from '../hooks/useHover';
import {
  borderWidth,
  colors,
  fontSizes,
  fontWeights,
  layout,
  letterSpacing,
  radius,
  shadows,
  spacing,
} from '../theme';

type ButtonVariant = 'primary' | 'outline' | 'soft';

interface ButtonProps {
  label: string;
  onPress: () => void;
  /** primary: acción principal · outline: secundaria · soft: sobre fondos oscuros. */
  variant?: ButtonVariant;
  disabled?: boolean;
  /** Descripción para lectores de pantalla cuando el label no es suficiente. */
  accessibilityHint?: string;
  style?: StyleProp<ViewStyle>;
}

export default function Button({
  label,
  onPress,
  variant = 'primary',
  disabled = false,
  accessibilityHint,
  style,
}: ButtonProps) {
  const { hovered, hoverProps } = useHover();

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled }}
      {...hoverProps}
      style={({ pressed }) => [
        styles.base,
        variantStyles[variant],
        hovered && !disabled && hoverStyles[variant],
        pressed && pressedStyles[variant],
        disabled && styles.disabled,
        style,
      ]}
    >
      <Text
        style={[
          styles.label,
          labelStyles[variant],
          hovered && !disabled && hoverLabelStyles[variant],
          disabled && styles.labelDisabled,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const variantStyles: Record<ButtonVariant, ViewStyle> = {
  primary: { backgroundColor: colors.primary },
  outline: {
    borderWidth: borderWidth.thick,
    borderColor: colors.primary,
    backgroundColor: colors.secondaryButton,
  },
  soft: { backgroundColor: colors.sand },
};

const pressedStyles: Record<ButtonVariant, ViewStyle> = {
  primary: { backgroundColor: colors.primaryDark },
  outline: { backgroundColor: colors.backgroundAlt },
  soft: { opacity: 0.85 },
};

const hoverStyles: Record<ButtonVariant, ViewStyle> = {
  primary: {
    backgroundColor: colors.primaryDark,
    transform: [{ translateY: -2 }],
    ...shadows.md,
  },
  outline: {
    backgroundColor: colors.primary,
    transform: [{ translateY: -2 }],
    ...shadows.sm,
  },
  soft: {
    backgroundColor: colors.backgroundAlt,
    transform: [{ translateY: -2 }],
    ...shadows.sm,
  },
};

const styles = StyleSheet.create({
  base: {
    minHeight: layout.minTouchTarget,
    paddingVertical: spacing.sm + spacing.xs,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
  disabled: {
    backgroundColor: colors.disabledBg,
    borderColor: colors.disabledBg,
  },
  label: {
    fontSize: fontSizes.body,
    fontWeight: fontWeights.semibold,
    letterSpacing: letterSpacing.slight,
  },
  labelDisabled: {
    color: colors.disabledText,
  },
});

const labelStyles = StyleSheet.create({
  primary: { color: colors.textOnDark },
  outline: { color: colors.primary },
  soft: { color: colors.text },
});

const hoverLabelStyles = StyleSheet.create({
  primary: { color: colors.white },
  outline: { color: colors.white },
  soft: { color: colors.primary },
});
