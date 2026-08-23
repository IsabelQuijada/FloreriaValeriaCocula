import React, { useEffect, useMemo, useState } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { COOKIE_NOTICE } from '../data/content';
import { useBreakpoint } from '../hooks/useBreakpoint';
import { useTheme } from '../hooks/useTheme';
import { borderWidth, fontSizes, layout, lineHeights, spacing } from '../theme';
import Button from './Button';

const STORAGE_KEY = 'fv-cookie-notice-dismissed';

/**
 * Aviso simple de recolección de datos (LFPDPPP): no bloquea la navegación
 * ni el arranque de la analítica, solo informa. Solo corre en web, que es
 * donde vive la analítica y donde existe `localStorage` para recordar que
 * el visitante ya lo cerró.
 */
export default function CookieNotice() {
  const { isMobile } = useBreakpoint();
  const { colors, shadows } = useTheme();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (Platform.OS !== 'web') return;
    try {
      if (!window.localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        bar: {
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 5,
          backgroundColor: colors.surface,
          borderTopWidth: borderWidth.thin,
          borderTopColor: colors.border,
          paddingVertical: spacing.md,
          paddingHorizontal: layout.gutter,
          ...shadows.lg,
        },
        inner: {
          width: '100%',
          maxWidth: layout.navigationMaxWidth,
          alignSelf: 'center',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'flex-start' : 'center',
          justifyContent: 'center',
          gap: spacing.md,
        },
        message: {
          flexShrink: 1,
          textAlign: isMobile ? 'left' : 'center',
          color: colors.text,
          fontSize: fontSizes.small,
          lineHeight: lineHeights.small,
        },
        button: {
          flexShrink: 0,
        },
      }),
    [colors, shadows, isMobile],
  );

  if (Platform.OS !== 'web' || !visible) return null;

  const dismiss = () => {
    setVisible(false);
    try {
      window.localStorage.setItem(STORAGE_KEY, '1');
    } catch {
      // Si localStorage no está disponible, el aviso simplemente vuelve a salir la próxima visita.
    }
  };

  return (
    <View style={styles.bar} accessibilityRole="alert">
      <View style={styles.inner}>
        <Text style={styles.message}>{COOKIE_NOTICE.message}</Text>
        <Button label={COOKIE_NOTICE.acceptLabel} onPress={dismiss} style={styles.button} />
      </View>
    </View>
  );
}
