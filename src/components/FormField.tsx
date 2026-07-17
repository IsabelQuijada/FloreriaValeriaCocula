import React from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';
import {
  borderWidth,
  colors,
  fontSizes,
  fontWeights,
  layout,
  radius,
  spacing,
} from '../theme';

interface FormFieldProps extends Omit<TextInputProps, 'style'> {
  label: string;
}

/** Campo de formulario con label visible y asociado para lectores de pantalla. */
export default function FormField({ label, multiline, ...inputProps }: FormFieldProps) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        accessibilityLabel={label}
        placeholderTextColor={colors.textMuted}
        multiline={multiline}
        style={[styles.input, multiline && styles.textArea]}
        {...inputProps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    marginBottom: spacing.md,
  },
  label: {
    color: colors.text,
    fontSize: fontSizes.body,
    fontWeight: fontWeights.semibold,
    marginBottom: spacing.xs,
  },
  input: {
    minHeight: layout.minTouchTarget,
    borderWidth: borderWidth.thin,
    borderColor: colors.borderStrong,
    borderRadius: radius.sm,
    backgroundColor: colors.background,
    paddingVertical: spacing.sm + spacing.xxs,
    paddingHorizontal: spacing.md,
    fontSize: fontSizes.body,
    color: colors.text,
  },
  textArea: {
    minHeight: 120,
    textAlignVertical: 'top',
  },
});
