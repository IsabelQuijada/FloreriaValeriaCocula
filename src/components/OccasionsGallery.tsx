import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  ImageBackground,
  ImageSourcePropType,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useBreakpoint } from '../hooks/useBreakpoint';
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
  mobileWidth: number;
  onSelect: () => void;
}

function OccasionCard({ occasion, isTablet, isDesktop, mobileWidth, onSelect }: OccasionCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${occasion.title}. ${occasion.subtitle}. Ver galería`}
      onPress={onSelect}
      onHoverIn={() => setIsHovered(true)}
      onHoverOut={() => setIsHovered(false)}
      style={({ pressed }) => [
        styles.card,
        !isTablet && { width: mobileWidth },
        isTablet && styles.cardTablet,
        isDesktop && styles.cardDesktop,
        isHovered && styles.cardHovered,
        pressed && styles.cardPressed,
      ]}
    >
      <ImageBackground
        source={occasion.image}
        resizeMode="cover"
        style={[styles.image, isHovered && styles.imageHovered]}
      >
        <View style={[styles.overlay, isHovered && styles.overlayHovered]} />
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{occasion.title}</Text>
          <Text style={styles.cardSubtitle}>{occasion.subtitle}</Text>
          <View style={[styles.cardAction, isHovered && styles.cardActionHovered]}>
            <Text style={[styles.cardActionText, isHovered && styles.cardActionTextHovered]}>
              Ver galería
            </Text>
            <Ionicons
              name="arrow-forward"
              size={16}
              color={isHovered ? colors.white : colors.textOnDark}
              style={[styles.actionIcon, isHovered && styles.actionIconHovered]}
              accessibilityElementsHidden
              importantForAccessibility="no"
            />
          </View>
        </View>
      </ImageBackground>
    </Pressable>
  );
}

export default function OccasionsGallery({ onSelect }: OccasionsGalleryProps) {
  const { width, isTablet, isDesktop } = useBreakpoint();
  const mobileCardWidth = Math.min(300, width - spacing.xl);

  const cards = OCCASIONS.map((occasion) => (
    <OccasionCard
      key={occasion.id}
      occasion={occasion}
      isTablet={isTablet}
      isDesktop={isDesktop}
      mobileWidth={mobileCardWidth}
      onSelect={() => onSelect(occasion.id)}
    />
  ));

  return (
    <Section>
      <SectionTitle
        kicker="Catálogo"
        title="Ocasiones especiales"
        subtitle="Explora el catálogo por ocasión: elige una galería para ver todos sus arreglos."
      />

      {isTablet ? (
        <View style={styles.grid}>{cards}</View>
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          decelerationRate="fast"
          snapToInterval={mobileCardWidth + spacing.md}
          contentContainerStyle={styles.carousel}
          accessibilityLabel="Galería de ocasiones especiales"
        >
          {cards}
        </ScrollView>
      )}
    </Section>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.lg,
  },
  carousel: {
    gap: spacing.md,
    paddingBottom: spacing.md,
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
    maxWidth: (layout.contentMaxWidth - spacing.lg * 3 - layout.gutterWide * 2) / 2,
  },
  cardDesktop: {
    flexBasis: '22%',
    maxWidth: (layout.contentMaxWidth - spacing.lg * 3 - layout.gutterWide * 2) / 4,
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
  },
  imageHovered: {
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
  cardTitle: {
    color: colors.white,
    fontFamily: fonts.heading,
    fontSize: fontSizes.subtitle,
    lineHeight: lineHeights.subtitle,
    fontWeight: fontWeights.bold,
    letterSpacing: letterSpacing.slight,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  cardSubtitle: {
    color: colors.textOnDark,
    fontSize: fontSizes.small,
    lineHeight: lineHeights.small,
    textAlign: 'center',
    marginBottom: spacing.md,
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
  actionIcon: {
    transform: [{ translateX: 0 }],
  },
  actionIconHovered: {
    transform: [{ translateX: 4 }],
  },
});
