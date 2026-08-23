import { FontAwesome } from '@expo/vector-icons';
import React, { useEffect, useMemo, useRef } from 'react';
import { Animated, Pressable, StyleSheet } from 'react-native';
import { CONTACT_INFO } from '../data/content';
import { useBreakpoint } from '../hooks/useBreakpoint';
import { useHover } from '../hooks/useHover';
import { useTheme } from '../hooks/useTheme';
import { radius, spacing } from '../theme';
import { openExternalUrl } from '../utils/links';

/**
 * Botón flotante de WhatsApp, siempre visible sobre el contenido.
 * Es el canal de pedido principal de la florería, por eso vive fuera
 * del flujo de scroll. Al cargar la página pulsa dos veces de forma
 * discreta para invitar al contacto sin ser intrusivo.
 */
export default function WhatsAppFab() {
  const { isMobile } = useBreakpoint();
  const { hovered, hoverProps } = useHover();
  const { colors, shadows } = useTheme();
  const pulse = useRef(new Animated.Value(1)).current;
  const styles = useMemo(
    () =>
      StyleSheet.create({
        wrapper: {
          position: 'absolute',
          right: spacing.md,
          bottom: spacing.md,
          zIndex: 10,
        },
        wrapperMobile: {
          right: spacing.sm,
          bottom: spacing.sm,
        },
        fab: {
          width: 56,
          height: 56,
          borderRadius: radius.pill,
          backgroundColor: colors.whatsapp,
          alignItems: 'center',
          justifyContent: 'center',
          ...shadows.lg,
        },
        fabMobile: {
          width: 48,
          height: 48,
        },
        fabHovered: {
          backgroundColor: colors.whatsappDark,
          transform: [{ scale: 1.08 }],
        },
        fabPressed: {
          backgroundColor: colors.whatsappDark,
          transform: [{ scale: 0.96 }],
        },
      }),
    [colors, shadows],
  );

  useEffect(() => {
    const animation = Animated.sequence([
      Animated.delay(1600),
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulse, { toValue: 1.12, duration: 320, useNativeDriver: true }),
          Animated.timing(pulse, { toValue: 1, duration: 320, useNativeDriver: true }),
          Animated.delay(240),
        ]),
        { iterations: 2 },
      ),
    ]);
    animation.start();
    return () => animation.stop();
  }, [pulse]);

  return (
    <Animated.View
      style={[styles.wrapper, isMobile && styles.wrapperMobile, { transform: [{ scale: pulse }] }]}
    >
      <Pressable
        onPress={() => openExternalUrl(CONTACT_INFO.whatsappUrl)}
        accessibilityRole="link"
        accessibilityLabel="Escríbenos por WhatsApp"
        {...hoverProps}
        style={({ pressed }) => [
          styles.fab,
          isMobile && styles.fabMobile,
          hovered && styles.fabHovered,
          pressed && styles.fabPressed,
        ]}
      >
        <FontAwesome name="whatsapp" size={isMobile ? 26 : 30} color={colors.white} />
      </Pressable>
    </Animated.View>
  );
}
