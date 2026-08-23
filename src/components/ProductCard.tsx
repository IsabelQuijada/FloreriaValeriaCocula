import React, { useMemo } from 'react';
import {
  Image,
  ImageStyle,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { ProductCardData } from '../data/catalog';
import { useHover } from '../hooks/useHover';
import { useTheme } from '../hooks/useTheme';
import {
  fontSizes,
  fontWeights,
  letterSpacing,
  lineHeights,
  radius,
  spacing,
  webGlassBlur,
  webTransition,
} from '../theme';
import Button from './Button';
import Card from './Card';

export type { ProductCardData };

interface ProductCardProps {
  product: ProductCardData;
  /** Abre WhatsApp para preguntar por el producto. */
  onContact: (product: ProductCardData) => void;
  /** Si se define, tocar la card abre la vista rápida. */
  onPress?: (product: ProductCardData) => void;
  /** Base flexible dentro del grid (por defecto 280). */
  flexBasis?: number;
  /** Anchura máxima de la card (por defecto 400). */
  maxWidth?: number;
  /** Versión de menor altura para carruseles en teléfono. */
  compactMobile?: boolean;
  /** Versión compacta de dos columnas para el catálogo en teléfono. */
  compactGrid?: boolean;
  style?: StyleProp<ViewStyle>;
}

/** Card de arreglo floral: imagen 4:5 con badge de categoría, nombre, descripción y Contáctanos. */
export default function ProductCard({
  product,
  onContact,
  onPress,
  flexBasis = 280,
  maxWidth = 400,
  compactMobile = false,
  compactGrid = false,
  style,
}: ProductCardProps) {
  const { hovered, hoverProps } = useHover();
  const { colors, textPresets } = useTheme();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        imageWrap: {
          position: 'relative',
          aspectRatio: 4 / 5,
          backgroundColor: colors.surfaceMuted,
          overflow: 'hidden',
        },
        imageWrapCompact: {
          aspectRatio: 4 / 3,
        },
        imageWrapGrid: {
          aspectRatio: 1,
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
          backgroundColor: 'rgba(255, 255, 255, 0.78)',
          borderRadius: radius.pill,
          paddingVertical: spacing.xs,
          paddingHorizontal: spacing.md,
        },
        badgeText: {
          ...textPresets.badge,
        },
        badgeCompact: {
          top: spacing.sm,
          left: spacing.sm,
          paddingVertical: spacing.xxs,
          paddingHorizontal: spacing.sm,
        },
        badgeTextCompact: {
          letterSpacing: letterSpacing.slight,
        },
        badgeTextGrid: {
          fontSize: 10,
          maxWidth: 116,
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
        bodyCompact: {
          padding: spacing.md,
        },
        bodyGrid: {
          padding: spacing.sm,
        },
        name: {
          color: colors.primary,
          fontSize: fontSizes.bodyLarge,
          fontWeight: fontWeights.bold,
          marginBottom: spacing.xs,
        },
        nameCompact: {
          fontSize: fontSizes.body,
        },
        nameGrid: {
          fontSize: fontSizes.small,
          lineHeight: lineHeights.small,
          minHeight: lineHeights.small * 2,
        },
        description: {
          color: colors.textMuted,
          fontSize: fontSizes.small,
          lineHeight: lineHeights.small,
          marginBottom: spacing.md,
          flexGrow: 1,
        },
        descriptionGrid: {
          fontSize: fontSizes.caption,
          lineHeight: lineHeights.caption,
          marginBottom: spacing.sm,
        },
        contactButton: {
          alignSelf: 'stretch',
        },
        contactButtonGrid: {
          paddingHorizontal: spacing.sm,
        },
      }),
    [colors, textPresets],
  );

  return (
    <Card
      padded={false}
      flexBasis={flexBasis}
      maxWidth={maxWidth}
      shadow={hovered ? 'md' : 'sm'}
      style={style}
    >
      <Pressable
        onPress={onPress ? () => onPress(product) : undefined}
        {...hoverProps}
        disabled={!onPress}
        accessibilityRole={onPress ? 'button' : undefined}
        accessibilityLabel={onPress ? `Ver ${product.name} en vista rápida` : undefined}
        style={[
          styles.imageWrap,
          compactMobile && styles.imageWrapCompact,
          compactGrid && styles.imageWrapGrid,
        ]}
      >
        <Image
          source={{ uri: product.image }}
          style={[
            styles.image,
            webTransition as ImageStyle,
            hovered && onPress != null && styles.imageHovered,
          ]}
          resizeMode="contain"
          accessible
          accessibilityLabel={`Foto de ${product.name}`}
        />
        <View
          style={[
            styles.badge,
            webGlassBlur,
            (compactMobile || compactGrid) && styles.badgeCompact,
          ]}
        >
          <Text
            numberOfLines={1}
            style={[
              styles.badgeText,
              (compactMobile || compactGrid) && styles.badgeTextCompact,
              compactGrid && styles.badgeTextGrid,
            ]}
          >
            {product.badge}
          </Text>
        </View>
        {onPress && hovered ? (
          <View style={styles.overlay}>
            <Text style={styles.overlayText}>Ver vista rápida</Text>
          </View>
        ) : null}
      </Pressable>
      <View
        style={[
          styles.body,
          compactMobile && styles.bodyCompact,
          compactGrid && styles.bodyGrid,
        ]}
      >
        <Text
          numberOfLines={compactGrid ? 2 : undefined}
          style={[
            styles.name,
            compactMobile && styles.nameCompact,
            compactGrid && styles.nameGrid,
          ]}
        >
          {product.name}
        </Text>
        <Text
          style={[styles.description, compactGrid && styles.descriptionGrid]}
          numberOfLines={compactMobile || compactGrid ? 2 : 3}
        >
          {product.description}
        </Text>
        <Button
          label={compactGrid ? 'Consultar' : 'Contáctanos'}
          onPress={() => onContact(product)}
          accessibilityHint={`Preguntar por ${product.name} en WhatsApp`}
          style={[styles.contactButton, compactGrid && styles.contactButtonGrid]}
        />
      </View>
    </Card>
  );
}
