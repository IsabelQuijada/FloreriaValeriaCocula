import { FontAwesome } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Linking, Pressable, StyleSheet } from 'react-native';
import { CONTACT_INFO } from '../data/content';
import { colors, radius, shadows, spacing } from '../theme';

/**
 * Botón flotante de WhatsApp, siempre visible sobre el contenido.
 * Es el canal de pedido principal de la florería, por eso vive fuera
 * del flujo de scroll.
 */
export default function WhatsAppFab() {
  const [hovered, setHovered] = useState(false);

  return (
    <Pressable
      onPress={() => Linking.openURL(CONTACT_INFO.whatsappUrl)}
      accessibilityRole="link"
      accessibilityLabel="Escríbenos por WhatsApp"
      onHoverIn={() => setHovered(true)}
      onHoverOut={() => setHovered(false)}
      style={({ pressed }) => [
        styles.fab,
        hovered && styles.fabHovered,
        pressed && styles.fabPressed,
      ]}
    >
      <FontAwesome name="whatsapp" size={30} color={colors.white} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: spacing.md,
    bottom: spacing.md,
    width: 56,
    height: 56,
    borderRadius: radius.pill,
    backgroundColor: colors.whatsapp,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    ...shadows.lg,
  },
  fabHovered: {
    backgroundColor: colors.whatsappDark,
    transform: [{ scale: 1.08 }],
  },
  fabPressed: {
    backgroundColor: colors.whatsappDark,
    transform: [{ scale: 0.96 }],
  },
});
