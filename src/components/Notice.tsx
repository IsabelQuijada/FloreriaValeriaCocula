import React, { useMemo } from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { borderWidth, fontSizes, lineHeights, radius, spacing } from '../theme';

type NoticeVariant = 'success' | 'error' | 'warning';

interface NoticeProps {
  children: string;
  variant?: NoticeVariant;
  style?: StyleProp<ViewStyle>;
}

/** Aviso de estado (éxito, error, advertencia) anunciado a lectores de pantalla. */
export default function Notice({ children, variant = 'success', style }: NoticeProps) {
  const { colors } = useTheme();

  const { styles, variantStyles } = useMemo(() => {
    const variantStyles: Record<NoticeVariant, { box: ViewStyle; text: { color: string } }> = {
      success: {
        box: { backgroundColor: colors.successBg, borderColor: colors.successBorder },
        text: { color: colors.success },
      },
      error: {
        box: { backgroundColor: colors.errorBg, borderColor: colors.errorBorder },
        text: { color: colors.error },
      },
      warning: {
        box: { backgroundColor: colors.warningBg, borderColor: colors.warningBorder },
        text: { color: colors.warning },
      },
    };

    const styles = StyleSheet.create({
      box: {
        borderRadius: radius.sm,
        borderWidth: borderWidth.thin,
        padding: spacing.md,
      },
      text: {
        fontSize: fontSizes.body,
        lineHeight: lineHeights.body,
      },
    });

    return { styles, variantStyles };
  }, [colors]);

  return (
    <View
      accessibilityRole="alert"
      accessibilityLiveRegion="polite"
      style={[styles.box, variantStyles[variant].box, style]}
    >
      <Text style={[styles.text, variantStyles[variant].text]}>{children}</Text>
    </View>
  );
}
