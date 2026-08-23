import { Ionicons } from '@expo/vector-icons';
import React, { useMemo } from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import Button from '../components/Button';
import CardGrid from '../components/CardGrid';
import CtaRibbon from '../components/CtaRibbon';
import FeatureCard from '../components/FeatureCard';
import FloralServiceIcon from '../components/FloralServiceIcon';
import OccasionsGallery from '../components/OccasionsGallery';
import ProductCarousel from '../components/ProductCarousel';
import ProductModal from '../components/ProductModal';
import Section from '../components/Section';
import SectionTitle from '../components/SectionTitle';
import {
  CONTACT_INFO,
  HERO,
  ScreenName,
  SERVICES,
  whatsappProductUrl,
} from '../data/content';
import { getRandomFavorites } from '../data/favorites';
import { useBreakpoint } from '../hooks/useBreakpoint';
import { useProductQuickView } from '../hooks/useProductQuickView';
import { useTheme } from '../hooks/useTheme';
import { openExternalUrl } from '../utils/links';
import {
  borderWidth,
  fonts,
  fontSizes,
  fontWeights,
  layout,
  letterSpacing,
  lineHeights,
  radius,
  spacing,
  webBerryGradient,
  webGlassBlur,
} from '../theme';

interface HomeScreenProps {
  onNavigate: (screen: ScreenName) => void;
  /** Abre el catálogo filtrado por la categoría elegida. */
  onSelectCategory: (categorySlug: string) => void;
  /** Reporta la posición vertical de la sección de favoritas para el scroll del navbar. */
  onFavoritesLayout: (y: number) => void;
}

export default function HomeScreen({
  onNavigate,
  onSelectCategory,
  onFavoritesLayout,
}: HomeScreenProps) {
  const { isMobile, isTablet } = useBreakpoint();
  const { colors, shadows } = useTheme();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        screen: {
          width: '100%',
          alignSelf: 'stretch',
        },
        servicesSectionMobile: {
          paddingVertical: spacing.lg,
        },
        favoritesSectionMobile: {
          paddingVertical: spacing.lg,
        },
        mobileBenefits: {
          width: '100%',
          backgroundColor: colors.surface,
          borderWidth: borderWidth.thin,
          borderColor: colors.border,
          borderRadius: radius.md,
          paddingHorizontal: spacing.md,
          ...shadows.sm,
        },
        mobileBenefitRow: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: spacing.md,
          paddingVertical: spacing.md,
        },
        mobileBenefitRowBorder: {
          borderBottomWidth: borderWidth.hairline,
          borderBottomColor: colors.border,
        },
        mobileBenefitCopy: {
          flex: 1,
        },
        mobileBenefitTitle: {
          color: colors.text,
          fontSize: fontSizes.body,
          fontWeight: fontWeights.bold,
          lineHeight: lineHeights.body,
          marginBottom: spacing.xxs,
        },
        mobileBenefitDescription: {
          color: colors.textMuted,
          fontSize: fontSizes.small,
          lineHeight: lineHeights.small,
        },
        hero: {
          width: '100%',
          alignSelf: 'stretch',
          minHeight: 520,
          overflow: 'hidden',
        },
        heroImage: {
          width: '100%',
          height: '100%',
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
          maxWidth: layout.navigationMaxWidth,
          alignSelf: 'center',
        },
        heroContentCard: {
          width: '100%',
          maxWidth: 600,
          backgroundColor: colors.heroPanel,
          borderRadius: radius.lg,
          borderWidth: borderWidth.thin,
          borderColor: 'rgba(255, 255, 255, 0.65)',
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
          fontFamily: fonts.accentItalic,
          fontSize: fontSizes.subtitle,
          lineHeight: lineHeights.subtitle,
          letterSpacing: letterSpacing.slight,
          marginBottom: spacing.sm,
          textAlign: 'left',
        },
        heroTitle: {
          color: colors.accentStrong,
          fontFamily: fonts.headingBold,
          fontSize: fontSizes.titleLarge,
          lineHeight: lineHeights.titleLarge,
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
        bannerMobile: {
          minHeight: layout.minTouchTarget,
          paddingVertical: spacing.sm,
          paddingHorizontal: spacing.md,
        },
        bannerTextMobile: {
          fontSize: fontSizes.small,
          flexShrink: 1,
        },
      }),
    [colors, shadows],
  );
  const highlights = ['s2', 's1', 's3'].map(
    (serviceId) => SERVICES.find((service) => service.id === serviceId)!,
  );
  const favorites = useMemo(() => getRandomFavorites(15), []);
  const quickView = useProductQuickView(favorites);

  const handleFavoriteContact = (productName: string) => {
    quickView.close();
    openExternalUrl(whatsappProductUrl(productName));
  };

  return (
    <View style={styles.screen}>
      {/* Hero */}
      <ImageBackground
        source={require('../../assets/hero-floral.jpg')}
        style={[styles.hero, isTablet && styles.heroWide]}
        imageStyle={styles.heroImage}
        resizeMode="cover"
        accessible
        accessibilityLabel="Flores frescas de Florería Valeria"
      >
        <View style={[styles.heroOverlay, isMobile && styles.heroOverlayMobile]}>
          <View style={styles.heroContentBoundary}>
            <View
              style={[
                styles.heroContentCard,
                webGlassBlur,
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
                  label="Contáctanos"
                  variant="outline"
                  onPress={() => openExternalUrl(CONTACT_INFO.whatsappUrl)}
                  style={isMobile && styles.heroButtonMobile}
                />
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>

      {/* Banner de entrega a domicilio */}
      <View style={[styles.banner, webBerryGradient, isMobile && styles.bannerMobile]}>
        <Ionicons
          name="car-outline"
          size={isMobile ? 18 : 20}
          color={colors.textOnDark}
          accessibilityElementsHidden
          importantForAccessibility="no"
        />
        <Text
          style={[styles.bannerText, isMobile && styles.bannerTextMobile]}
          numberOfLines={isMobile ? 1 : undefined}
          accessibilityLabel="Entrega a domicilio en Cocula, todos los días de 9:00 AM a 6:00 PM"
        >
          {isMobile
            ? 'Entrega en Cocula · 9 AM–6 PM'
            : 'Entrega a domicilio en Cocula · Todos los días, 9:00 AM–6:00 PM'}
        </Text>
      </View>

      {/* Servicios destacados */}
      <Section wide style={isMobile && styles.servicesSectionMobile}>
        <SectionTitle
          kicker="Nuestros servicios"
          title="Flores para cada ocasión"
          subtitle="Diseñamos cada arreglo a mano y te acompañamos desde la elección de las flores hasta la entrega."
          compact={isMobile}
        />
        {isMobile ? (
          <View style={styles.mobileBenefits} accessibilityLabel="Nuestros servicios destacados">
            {highlights.map((service, index) => (
              <View
                key={service.id}
                style={[
                  styles.mobileBenefitRow,
                  index < highlights.length - 1 && styles.mobileBenefitRowBorder,
                ]}
              >
                <FloralServiceIcon name={service.icon} compact />
                <View style={styles.mobileBenefitCopy}>
                  <Text style={styles.mobileBenefitTitle}>{service.title}</Text>
                  <Text style={styles.mobileBenefitDescription}>{service.description}</Text>
                </View>
              </View>
            ))}
          </View>
        ) : (
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
        )}
      </Section>

      {/* Productos favoritos */}
      <View onLayout={(event) => onFavoritesLayout(event.nativeEvent.layout.y)}>
        <Section background="blush" wide style={isMobile && styles.favoritesSectionMobile}>
          <SectionTitle
            kicker="Los más queridos"
            title="Nuestras favoritas"
            subtitle="Descubre los arreglos, plantas y detalles preferidos de nuestros clientes."
            compact={isMobile}
          />
          <ProductCarousel
            products={favorites}
            onContact={(product) => handleFavoriteContact(product.name)}
            onSelectProduct={(_, index) => quickView.open(index)}
          />
        </Section>
        <ProductModal
          product={quickView.selected}
          onClose={quickView.close}
          onContact={(product) => handleFavoriteContact(product.name)}
          onPrev={quickView.goPrev}
          onNext={quickView.goNext}
          canPrev={quickView.canPrev}
          canNext={quickView.canNext}
        />
      </View>

      {/* Catálogo por ocasiones */}
      <OccasionsGallery onSelect={onSelectCategory} />

      {/* Llamada a la acción final */}
      <CtaRibbon onNavigate={onNavigate} />
    </View>
  );
}
