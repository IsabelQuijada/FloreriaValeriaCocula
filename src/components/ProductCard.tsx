import React, { useState } from 'react';
import { Image, Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import {
  colors,
  fontSizes,
  fontWeights,
  letterSpacing,
  lineHeights,
  radius,
  spacing,
} from '../theme';
import Button from './Button';
import Card from './Card';

/** Datos mínimos que la card necesita para pintarse, independientes de la fuente. */
export interface ProductCardData {
  id: string | number;
  name: string;
  image: string;
  badge: string;
  description: string;
}

interface ProductCardProps {
  product: ProductCardData;
  /** Abre WhatsApp para preguntar por el producto. */
  onContact: (product: ProductCardData) => void;
  /** Si se define, tocar la card abre la vista rápida. */
  onPress?: (product: ProductCardData) => void;
  style?: StyleProp<ViewStyle>;
}

/** Card de arreglo floral: imagen 4:5 con badge de categoría, nombre, descripción y Contáctanos. */
export default function ProductCard({ product, onContact, onPress, style }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <Card padded={false} flexBasis={280} maxWidth={400} shadow={hovered ? 'md' : 'sm'} style={style}>
      <Pressable
        onPress={onPress ? () => onPress(product) : undefined}
        onHoverIn={() => setHovered(true)}
        onHoverOut={() => setHovered(false)}
        disabled={!onPress}
        accessibilityRole={onPress ? 'button' : undefined}
        accessibilityLabel={onPress ? `Ver ${product.name} en vista rápida` : undefined}
        style={styles.imageWrap}
      >
        <Image
          source={{ uri: product.image }}
          style={[styles.image, hovered && onPress != null && styles.imageHovered]}
          resizeMode="cover"
          accessible
          accessibilityLabel={`Foto de ${product.name}`}
        />
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{product.badge}</Text>
        </View>
        {onPress && hovered ? (
          <View style={styles.overlay}>
            <Text style={styles.overlayText}>Ver vista rápida</Text>
          </View>
        ) : null}
      </Pressable>
      <View style={styles.body}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.description} numberOfLines={3}>
          {product.description}
        </Text>
        <Button
          label="Contáctanos"
          onPress={() => onContact(product)}
          accessibilityHint={`Preguntar por ${product.name} en WhatsApp`}
          style={styles.contactButton}
        />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  imageWrap: {
    position: 'relative',
    aspectRatio: 4 / 5,
    backgroundColor: colors.surfaceMuted,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageHovered: {
    transform: [{ scale: 1.05 }],
  },
  badge: {
    position: 'absolute',
    top: spacing.md,
    left: spacing.md,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: radius.pill,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
  },
  badgeText: {
    color: colors.primary,
    fontSize: fontSizes.caption,
    fontWeight: fontWeights.bold,
    letterSpacing: letterSpacing.wide,
    textTransform: 'uppercase',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.overlayNeutral,
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlayText: {
    color: colors.white,
    fontSize: fontSizes.caption,
    fontWeight: fontWeights.bold,
    letterSpacing: letterSpacing.wider,
    textTransform: 'uppercase',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.65)',
    borderRadius: radius.pill,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    overflow: 'hidden',
  },
  body: {
    padding: spacing.md,
    flexGrow: 1,
  },
  name: {
    color: colors.primary,
    fontSize: fontSizes.bodyLarge,
    fontWeight: fontWeights.bold,
    marginBottom: spacing.xs,
  },
  description: {
    color: colors.textMuted,
    fontSize: fontSizes.small,
    lineHeight: lineHeights.small,
    marginBottom: spacing.md,
    flexGrow: 1,
  },
  contactButton: {
    alignSelf: 'stretch',
  },
});
