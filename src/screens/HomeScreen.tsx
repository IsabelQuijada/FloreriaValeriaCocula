import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ImageBackground, Linking, StyleSheet, Text, View } from 'react-native';
import Button from '../components/Button';
import CardGrid from '../components/CardGrid';
import FeatureCard from '../components/FeatureCard';
import OccasionsGallery from '../components/OccasionsGallery';
import ProductCarousel from '../components/ProductCarousel';
import Section from '../components/Section';
import SectionTitle from '../components/SectionTitle';
import {
  CONTACT_INFO,
  HERO,
  ScreenName,
  SERVICES,
  whatsappProductUrl,
} from '../data/content';
import { FAVORITE_PRODUCTS } from '../data/favorites';
import { useBreakpoint } from '../hooks/useBreakpoint';
import {
  colors,
  fonts,
  fontSizes,
  fontWeights,
  layout,
  letterSpacing,
  lineHeights,
  shadows,
  spacing,
} from '../theme';

interface HomeScreenProps {
  onNavigate: (screen: ScreenName) => void;
  /** Abre la página de la categoría elegida en el catálogo. */
  onSelectCategory: (categorySlug: string) => void;
  /** Reporta la posición vertical de la sección de catálogo para el scroll del navbar. */
  onCatalogLayout: (y: number) => void;
  /** Reporta la posición vertical de la sección de favoritas para el scroll del navbar. */
  onFavoritesLayout: (y: number) => void;
}

export default function HomeScreen({
  onNavigate,
  onSelectCategory,
  onCatalogLayout,
  onFavoritesLayout,
}: HomeScreenProps) {
  const { isMobile, isTablet } = useBreakpoint();
  const highlights = ['s2', 's1', 's3'].map(
    (serviceId) => SERVICES.find((service) => service.id === serviceId)!,
  );

  return (
    <View>
      {/* Hero */}
      <ImageBackground
        source={require('../../assets/hero-floral.jpg')}
        style={[styles.hero, isTablet && styles.heroWide]}
        resizeMode="cover"
        accessible
        accessibilityLabel="Flores frescas de Florería Valeria"
      >
        <View style={[styles.heroOverlay, isMobile && styles.heroOverlayMobile]}>
          <View style={styles.heroContentBoundary}>
            <View
              style={[
                styles.heroContentCard,
                isMobile && styles.heroContentCardMobile,
                isTablet && styles.heroContentCardWide,
              ]}
            >
              <Text style={styles.heroKicker}>{HERO.tagline}</Text>
              <Text
                accessibilityRole="header"
                style={[styles.heroTitle, isTablet && styles.heroTitleWide]}
              >
                {HERO.title}
              </Text>
              <Text style={styles.heroSubtitle}>{HERO.subtitle}</Text>
              <View style={[styles.heroButtons, isMobile && styles.heroButtonsMobile]}>
                <Button
                  label="Ver Catálogo"
                  onPress={() => onNavigate('Shop')}
                  style={isMobile && styles.heroButtonMobile}
                />
                <Button
                  label="Visítanos"
                  variant="outline"
                  onPress={() => onNavigate('Contact')}
                  style={isMobile && styles.heroButtonMobile}
                />
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>

      {/* Banner de entrega a domicilio */}
      <View style={styles.banner}>
        <Ionicons
          name="car-outline"
          size={20}
          color={colors.textOnDark}
          accessibilityElementsHidden
          importantForAccessibility="no"
        />
        <Text style={styles.bannerText}>
          Entrega a domicilio en Cocula · Todos los días, 9:00 AM–6:00 PM
        </Text>
      </View>

      {/* Servicios destacados */}
      <Section>
        <SectionTitle
          kicker="Nuestros servicios"
          title="Flores para cada ocasión"
          subtitle="Diseñamos cada arreglo a mano y te acompañamos desde la elección de las flores hasta la entrega."
        />
        <CardGrid>
          {highlights.map((service) => (
            <FeatureCard
              key={service.id}
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          ))}
        </CardGrid>
      </Section>

      {/* Productos favoritos */}
      <View onLayout={(event) => onFavoritesLayout(event.nativeEvent.layout.y)}>
        <Section background="blush">
          <SectionTitle
            kicker="Los más queridos"
            title="Nuestras favoritas"
            subtitle="Descubre los arreglos, plantas y detalles preferidos de nuestros clientes."
          />
          <ProductCarousel
            products={FAVORITE_PRODUCTS}
            onContact={(product) => Linking.openURL(whatsappProductUrl(product.name))}
          />
        </Section>
      </View>

      {/* Catálogo por ocasiones */}
      <View onLayout={(event) => onCatalogLayout(event.nativeEvent.layout.y)}>
        <OccasionsGallery onSelect={onSelectCategory} />
      </View>

      {/* Llamada a la acción final */}
      <Section background="blush">
        <View style={styles.cta}>
          <Text accessibilityRole="header" style={styles.ctaTitle}>
            ¿A quién quieres sorprender hoy?
          </Text>
          <Text style={styles.ctaText}>
            Escríbenos por WhatsApp y te ayudamos a elegir el arreglo perfecto, o explora el
            catálogo a tu ritmo.
          </Text>
          <View style={[styles.heroButtons, styles.ctaButtons, isMobile && styles.heroButtonsMobile]}>
            <Button
              label="Pedir por WhatsApp"
              onPress={() => Linking.openURL(CONTACT_INFO.whatsappUrl)}
              style={isMobile && styles.heroButtonMobile}
            />
            <Button
              label="Ver catálogo"
              variant="outline"
              onPress={() => onNavigate('Shop')}
              style={isMobile && styles.heroButtonMobile}
            />
          </View>
        </View>
      </Section>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    minHeight: 520,
  },
  heroWide: {
    minHeight: 650,
  },
  heroOverlay: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: layout.gutter,
    paddingVertical: spacing.xxl,
  },
  heroOverlayMobile: {
    justifyContent: 'flex-end',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.lg,
  },
  heroContentBoundary: {
    width: '100%',
    maxWidth: layout.contentMaxWidth,
    alignSelf: 'center',
  },
  heroContentCard: {
    width: '100%',
    maxWidth: 600,
    backgroundColor: colors.heroPanel,
    padding: spacing.lg,
    alignItems: 'flex-start',
    ...shadows.lg,
  },
  heroContentCardWide: {
    padding: spacing.xl,
  },
  heroContentCardMobile: {
    padding: spacing.md,
  },
  heroKicker: {
    color: colors.primary,
    fontSize: fontSizes.small,
    fontWeight: fontWeights.bold,
    letterSpacing: letterSpacing.widest,
    marginBottom: spacing.sm,
    textAlign: 'left',
  },
  heroTitle: {
    color: colors.primaryDark,
    fontFamily: fonts.heading,
    fontSize: fontSizes.titleLarge,
    lineHeight: lineHeights.titleLarge,
    fontWeight: fontWeights.bold,
    textAlign: 'left',
    marginBottom: spacing.md,
  },
  heroTitleWide: {
    fontSize: fontSizes.hero,
    lineHeight: lineHeights.hero,
  },
  heroSubtitle: {
    color: colors.textMuted,
    fontSize: fontSizes.bodyLarge,
    textAlign: 'left',
    lineHeight: lineHeights.bodyLarge,
    maxWidth: layout.heroTextMaxWidth,
    marginBottom: spacing.lg,
  },
  heroButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    justifyContent: 'flex-start',
  },
  heroButtonsMobile: {
    width: '100%',
    gap: spacing.sm,
  },
  heroButtonMobile: {
    width: '100%',
    alignSelf: 'stretch',
  },
  banner: {
    backgroundColor: colors.accent,
    paddingVertical: spacing.md,
    paddingHorizontal: layout.gutter,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.sm,
  },
  bannerText: {
    color: colors.textOnDark,
    fontSize: fontSizes.small,
    fontWeight: fontWeights.bold,
    letterSpacing: letterSpacing.slight,
    textAlign: 'center',
  },
  cta: {
    alignItems: 'center',
    alignSelf: 'center',
    width: '100%',
    maxWidth: layout.textMaxWidth,
  },
  ctaTitle: {
    color: colors.accent,
    fontFamily: fonts.heading,
    fontSize: fontSizes.title,
    lineHeight: lineHeights.title,
    fontWeight: fontWeights.bold,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  ctaText: {
    color: colors.textMuted,
    fontSize: fontSizes.bodyLarge,
    lineHeight: lineHeights.bodyLarge,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  ctaButtons: {
    justifyContent: 'center',
  },
});
