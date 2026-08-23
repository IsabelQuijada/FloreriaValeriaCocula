import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ProductCardData } from './ProductCard';
import Button from './Button';
import { useBreakpoint } from '../hooks/useBreakpoint';
import {
  colors,
  fontSizes,
  fontWeights,
  layout,
  lineHeights,
  radius,
  shadows,
  spacing,
  textPresets,
} from '../theme';

interface ProductModalProps {
  /** Producto a mostrar; null cierra el modal. */
  product: ProductCardData | null;
  onClose: () => void;
  onContact: (product: ProductCardData) => void;
  onPrev: () => void;
  onNext: () => void;
  canPrev: boolean;
  canNext: boolean;
}

/** Vista rápida de producto: imagen grande, descripción completa y navegación entre productos. */
export default function ProductModal({
  product,
  onClose,
  onContact,
  onPrev,
  onNext,
  canPrev,
  canNext,
}: ProductModalProps) {
  const { isMobile } = useBreakpoint();

  if (!product) return null;

  return (
    <Modal visible transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose} accessibilityLabel="Cerrar vista rápida">
        <Pressable
          style={[styles.modal, isMobile && styles.modalMobile]}
          onPress={(event) => event.stopPropagation()}
          accessibilityViewIsModal
          accessibilityLabel={product.name}
        >
          <Pressable
            onPress={onClose}
            accessibilityRole="button"
            accessibilityLabel="Cerrar"
            style={({ pressed }) => [styles.closeButton, pressed && styles.navButtonPressed]}
          >
            <Ionicons name="close" size={22} color={colors.primary} />
          </Pressable>

          <ScrollView contentContainerStyle={!isMobile && styles.rowContent}>
            <View style={[styles.imagePanel, isMobile && styles.imagePanelMobile]}>
              <Image
                source={{ uri: product.image }}
                style={styles.image}
                resizeMode="contain"
                accessible
                accessibilityLabel={`Foto de ${product.name}`}
              />
            </View>
            <View style={styles.infoPanel}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{product.badge}</Text>
              </View>
              <Text accessibilityRole="header" style={styles.name}>
                {product.name}
              </Text>
              <Text style={styles.description}>{product.description}</Text>
              <Button
                label="Contáctanos"
                onPress={() => onContact(product)}
                accessibilityHint={`Preguntar por ${product.name} en WhatsApp`}
                style={styles.contactButton}
              />
            </View>
          </ScrollView>

          <Pressable
            onPress={onPrev}
            disabled={!canPrev}
            accessibilityRole="button"
            accessibilityLabel="Producto anterior"
            accessibilityState={{ disabled: !canPrev }}
            style={({ pressed }) => [
              styles.navButton,
              styles.navButtonLeft,
              pressed && canPrev && styles.navButtonPressed,
              !canPrev && styles.navButtonDisabled,
            ]}
          >
            <Ionicons
              name="chevron-back"
              size={24}
              color={canPrev ? colors.primary : colors.disabledText}
            />
          </Pressable>
          <Pressable
            onPress={onNext}
            disabled={!canNext}
            accessibilityRole="button"
            accessibilityLabel="Producto siguiente"
            accessibilityState={{ disabled: !canNext }}
            style={({ pressed }) => [
              styles.navButton,
              styles.navButtonRight,
              pressed && canNext && styles.navButtonPressed,
              !canNext && styles.navButtonDisabled,
            ]}
          >
            <Ionicons
              name="chevron-forward"
              size={24}
              color={canNext ? colors.primary : colors.disabledText}
            />
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: colors.overlayDark,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.md,
  },
  modal: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    overflow: 'hidden',
    width: '100%',
    maxWidth: 860,
    maxHeight: '90%',
    ...shadows.lg,
  },
  modalMobile: {
    maxWidth: 420,
  },
  rowContent: {
    flexDirection: 'row',
  },
  imagePanel: {
    flex: 1,
    aspectRatio: 4 / 5,
    backgroundColor: colors.surfaceMuted,
  },
  imagePanelMobile: {
    aspectRatio: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  infoPanel: {
    flex: 1,
    padding: spacing.lg,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  badge: {
    backgroundColor: colors.accentSoft,
    borderRadius: radius.pill,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.sm,
  },
  badgeText: {
    ...textPresets.badge,
  },
  name: {
    color: colors.primary,
    fontSize: fontSizes.subtitle,
    lineHeight: lineHeights.subtitle,
    fontWeight: fontWeights.bold,
    marginBottom: spacing.sm,
  },
  description: {
    color: colors.textMuted,
    fontSize: fontSizes.body,
    lineHeight: lineHeights.body,
    marginBottom: spacing.lg,
  },
  contactButton: {
    alignSelf: 'stretch',
  },
  closeButton: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    zIndex: 2,
    width: layout.minTouchTarget,
    height: layout.minTouchTarget,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.md,
  },
  navButton: {
    position: 'absolute',
    top: '50%',
    transform: [{ translateY: -layout.minTouchTarget / 2 }],
    width: layout.minTouchTarget,
    height: layout.minTouchTarget,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.secondaryButton,
    zIndex: 3,
    ...shadows.sm,
  },
  navButtonLeft: {
    left: spacing.sm,
  },
  navButtonRight: {
    right: spacing.sm,
  },
  navButtonPressed: {
    backgroundColor: colors.heroPanel,
  },
  navButtonDisabled: {
    borderColor: colors.borderStrong,
    backgroundColor: colors.heroPanel,
    opacity: 0.55,
  },
});
