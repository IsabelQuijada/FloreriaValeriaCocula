import React from 'react';
import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useBreakpoint } from '../hooks/useBreakpoint';
import { useHover } from '../hooks/useHover';
import {
  borderWidth,
  colors,
  fonts,
  fontSizes,
  fontWeights,
  layout,
  letterSpacing,
  lineHeights,
  radius,
  shadows,
  spacing,
  webPhotoScrim,
  webTransition,
} from '../theme';
import Section from './Section';
import SectionTitle from './SectionTitle';

interface Occasion {
  /** Slug de la categoría en el catálogo (data/categories.ts). */
  id: string;
  title: string;
  subtitle: string;
  image: ImageSourcePropType;
}

const OCCASIONS: Occasion[] = [
  {
    id: 'ramos-elegantes',
    title: 'Ramos elegantes',
    subtitle: 'Elegancia floral exclusiva',
    image: require('../../assets/ocasion-ramos-elegantes.jpeg'),
  },
  {
    id: 'ramos-clasicos',
    title: 'Ramos clásicos',
    subtitle: 'Tradición y belleza atemporal',
    image: require('../../assets/ocasion-ramos-clasicos.avif'),
  },
  {
    id: 'bodas-de-ensueno',
    title: 'Bodas de ensueño',
    subtitle: 'Tu día perfecto merece flores únicas',
    image: require('../../assets/ocasion-bodas.jpeg'),
  },
  {
    id: 'cumpleanos',
    title: 'Cumpleaños',
    subtitle: 'Celebra cada año con flores',
    image: require('../../assets/ocasion-cumpleanos.avif'),
  },
  {
    id: 'quinceanera',
    title: 'Quinceañera',
    subtitle: 'Un momento mágico e inolvidable',
    image: require('../../assets/ocasion-quinceanera.avif'),
  },
  {
    id: 'celebraciones-especiales',
    title: 'Celebraciones especiales',
    subtitle: 'Detalles para momentos únicos',
    image: require('../../assets/ocasion-celebraciones.avif'),
  },
  {
    id: 'eventos-religiosos',
    title: 'Eventos religiosos',
    subtitle: 'Flores con significado espiritual',
    image: require('../../assets/ocasion-eventos-religiosos.avif'),
  },
  {
    id: 'galeria-funeraria',
    title: 'Para recordar y despedir',
    subtitle: 'Un homenaje expresado con flores',
    image: require('../../assets/ocasion-recordar.avif'),
  },
];

interface OccasionsGalleryProps {
  /** Recibe el slug de la categoría elegida. */
  onSelect: (categorySlug: string) => void;
}

interface OccasionCardProps {
  occasion: Occasion;
  isTablet: boolean;
  isDesktop: boolean;
  onSelect: () => void;
}

function OccasionCard({ occasion, isTablet, isDesktop, onSelect }: OccasionCardProps) {
  const { hovered: isHovered, hoverProps } = useHover();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${occasion.title}. ${occasion.subtitle}. Ver productos en el catálogo`}
      onPress={onSelect}
      {...hoverProps}
      style={({ pressed }) => [
        styles.card,
        webTransition,
        !isTablet && styles.cardMobile,
        isTablet && styles.cardTablet,
        isDesktop && styles.cardDesktop,
        isHovered && styles.cardHovered,
        pressed && styles.cardPressed,
      ]}
    >
      <View style={styles.image}>
        <Image
          source={occasion.image}
          resizeMode="cover"
          style={[
            styles.imageAsset,
            webTransition as ImageStyle,
            isHovered && styles.imageAssetHovered,
          ]}
          accessible
          accessibilityLabel={`Arreglo floral para ${occasion.title.toLowerCase()}`}
        />
        <View style={[styles.overlay, webPhotoScrim, isHovered && styles.overlayHovered]} />
        <View style={[styles.cardContent, !isTablet && styles.cardContentMobile]}>
          <Text style={[styles.cardTitle, !isTablet && styles.cardTitleMobile]}>
            {occasion.title}
          </Text>
          <Text style={[styles.cardSubtitle, !isTablet && styles.cardSubtitleMobile]}>
            {occasion.subtitle}
          </Text>
          <View
            style={[
              styles.cardAction,
              !isTablet && styles.cardActionMobile,
              isHovered && styles.cardActionHovered,
            ]}
          >
            <Text
              style={[
                styles.cardActionText,
                !isTablet && styles.cardActionTextMobile,
                isHovered && styles.cardActionTextHovered,
              ]}
            >
              Ver catálogo
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

export default function OccasionsGallery({ onSelect }: OccasionsGalleryProps) {
  const { isTablet, isDesktop } = useBreakpoint();

  const cards = OCCASIONS.map((occasion) => (
    <OccasionCard
      key={occasion.id}
      occasion={occasion}
      isTablet={isTablet}
      isDesktop={isDesktop}
      onSelect={() => onSelect(occasion.id)}
    />
  ));

  return (
    <Section wide style={!isTablet && styles.sectionMobile}>
      <SectionTitle
        kicker="Catálogo"
        title="Ocasiones especiales"
        subtitle="Explora el catálogo por ocasión y descubre todos sus arreglos."
        compact={!isTablet}
      />

      <View style={[styles.grid, !isTablet && styles.gridMobile]}>{cards}</View>
    </Section>
  );
}

const styles = StyleSheet.create({
  sectionMobile: {
    paddingVertical: spacing.lg,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.lg,
  },
  gridMobile: {
    gap: spacing.sm,
  },
  card: {
    width: 280,
    aspectRatio: 3 / 4,
    borderRadius: radius.md,
    overflow: 'hidden',
    backgroundColor: colors.primaryDark,
    ...shadows.md,
  },
  cardTablet: {
    width: undefined,
    flexBasis: '47%',
    flexGrow: 1,
  },
  cardMobile: {
    width: undefined,
    flexBasis: '47%',
    flexGrow: 1,
    aspectRatio: 4 / 5,
    borderRadius: radius.sm,
  },
  cardDesktop: {
    flexBasis: '22%',
  },
  cardPressed: {
    opacity: 0.92,
    transform: [{ scale: 0.99 }],
  },
  cardHovered: {
    transform: [{ translateY: -6 }],
    shadowOpacity: 0.18,
    shadowRadius: 18,
    elevation: 7,
  },
  image: {
    flex: 1,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  imageAsset: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  imageAssetHovered: {
    transform: [{ scale: 1.025 }],
  },
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: colors.overlayNeutral,
  },
  overlayHovered: {
    opacity: 0.9,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: spacing.lg,
  },
  cardContentMobile: {
    alignItems: 'center',
    padding: spacing.sm,
  },
  cardTitle: {
    color: colors.white,
    fontFamily: fonts.heading,
    fontSize: fontSizes.subtitle,
    lineHeight: lineHeights.subtitle,
    letterSpacing: letterSpacing.slight,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  cardTitleMobile: {
    fontSize: fontSizes.bodyLarge,
    lineHeight: lineHeights.bodyLarge,
    textAlign: 'center',
    marginBottom: spacing.xxs,
  },
  cardSubtitle: {
    color: colors.textOnDark,
    fontSize: fontSizes.small,
    lineHeight: lineHeights.small,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  cardSubtitleMobile: {
    fontSize: fontSizes.caption,
    lineHeight: lineHeights.caption,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  cardAction: {
    minHeight: layout.minTouchTarget,
    minWidth: 160,
    borderWidth: borderWidth.thin,
    borderColor: colors.white,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    flexDirection: 'row',
    gap: spacing.sm,
  },
  cardActionHovered: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  cardActionMobile: {
    width: '100%',
    minWidth: 0,
    minHeight: 40,
    paddingHorizontal: spacing.sm,
  },
  cardActionText: {
    color: colors.white,
    fontSize: fontSizes.caption,
    fontWeight: fontWeights.bold,
    letterSpacing: letterSpacing.wider,
    textTransform: 'uppercase',
  },
  cardActionTextHovered: {
    color: colors.white,
  },
  cardActionTextMobile: {
    fontSize: 10,
    letterSpacing: letterSpacing.wide,
  },
});
