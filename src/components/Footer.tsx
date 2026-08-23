import { FontAwesome, Ionicons } from '@expo/vector-icons';
import React, { useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { BRAND, CONTACT_INFO, HERO, ScreenName } from '../data/content';
import { useBreakpoint } from '../hooks/useBreakpoint';
import { useHover, useHoverKey } from '../hooks/useHover';
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
  ThemeColors,
  webBerryGradient,
  webTransition,
} from '../theme';

const SOCIAL_LINKS = [
  { icon: 'instagram', label: 'Instagram', url: CONTACT_INFO.instagramUrl },
  { icon: 'facebook', label: 'Facebook', url: CONTACT_INFO.facebookUrl },
  { icon: 'whatsapp', label: 'WhatsApp', url: CONTACT_INFO.whatsappUrl },
] as const;

const QUICK_LINKS: { icon: React.ComponentProps<typeof Ionicons>['name']; label: string; screen: ScreenName }[] = [
  { icon: 'help-circle-outline', label: 'Preguntas frecuentes', screen: 'FAQ' },
  { icon: 'book-outline', label: 'Blog y consejos', screen: 'Blog' },
  { icon: 'heart-outline', label: 'Nuestra historia', screen: 'About' },
  { icon: 'chatbubble-outline', label: 'Contáctanos', screen: 'Contact' },
];

const MOBILE_INFO_LINKS: { label: string; screen: ScreenName }[] = [
  { label: 'Catálogo', screen: 'Shop' },
  { label: 'Favoritas', screen: 'Favorites' },
  { label: 'Preguntas frecuentes', screen: 'FAQ' },
  { label: 'Blog y consejos', screen: 'Blog' },
];

const MOBILE_ABOUT_LINKS: { label: string; screen: ScreenName }[] = [
  { label: 'Nuestra historia', screen: 'About' },
  { label: 'Contáctanos', screen: 'Contact' },
];

interface FooterProps {
  onNavigate: (screen: ScreenName) => void;
}

interface ContactLinkProps {
  icon: React.ComponentProps<typeof Ionicons>['name'];
  label: string;
  onPress?: () => void;
}

function ContactLink({ icon, label, onPress }: ContactLinkProps) {
  const { hovered, hoverProps } = useHover();
  const { colors } = useTheme();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        contactRow: {
          minHeight: 44,
          flexDirection: 'row',
          alignItems: 'center',
          gap: spacing.md,
        },
        contactText: {
          color: colors.primary,
          fontSize: fontSizes.body,
          lineHeight: lineHeights.body,
          flexShrink: 1,
        },
        contactRowHovered: {
          transform: [{ translateX: 5 }],
        },
        contactTextHovered: {
          color: colors.primaryEmphasis,
        },
        pressed: {
          opacity: 0.6,
        },
      }),
    [colors],
  );
  const content = (
    <>
      <Ionicons name={icon} size={20} color={hovered ? colors.primaryEmphasis : colors.primary} />
      <Text style={[styles.contactText, hovered && styles.contactTextHovered]}>{label}</Text>
    </>
  );

  if (!onPress) return <View style={styles.contactRow}>{content}</View>;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="link"
      accessibilityLabel={label}
      {...hoverProps}
      style={({ pressed }) => [
        styles.contactRow,
        hovered && styles.contactRowHovered,
        pressed && styles.pressed,
      ]}
    >
      {content}
    </Pressable>
  );
}

export default function Footer({ onNavigate }: FooterProps) {
  const { isMobile, isDesktop } = useBreakpoint();
  const { isHovered, hoverProps } = useHoverKey();
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  if (isMobile) {
    return (
      <View style={styles.mobileContainer}>
        <View style={styles.mobileFooter}>
          <View style={styles.mobileGrid}>
            <View style={styles.mobileGridSection}>
              <Text style={styles.mobileSectionTitle}>Información</Text>
              <View style={styles.mobileTitleAccent} />
              {MOBILE_INFO_LINKS.map((item) => (
                <Pressable
                  key={item.screen}
                  onPress={() => onNavigate(item.screen)}
                  accessibilityRole="button"
                  accessibilityLabel={item.label}
                  style={({ pressed }) => [styles.mobileTextLink, pressed && styles.pressed]}
                >
                  <Text style={styles.mobileQuickLinkText}>{item.label}</Text>
                </Pressable>
              ))}
            </View>

            <View style={styles.mobileGridSection}>
              <Text style={styles.mobileSectionTitle}>Nosotros</Text>
              <View style={styles.mobileTitleAccent} />
              {MOBILE_ABOUT_LINKS.map((item) => (
                <Pressable
                  key={item.screen}
                  onPress={() => onNavigate(item.screen)}
                  accessibilityRole="button"
                  accessibilityLabel={item.label}
                  style={({ pressed }) => [styles.mobileTextLink, pressed && styles.pressed]}
                >
                  <Text style={styles.mobileQuickLinkText}>{item.label}</Text>
                </Pressable>
              ))}
            </View>

            <View style={styles.mobileGridSection}>
              <Text style={styles.mobileSectionTitle}>Contacto</Text>
              <View style={styles.mobileTitleAccent} />
              {[
                { label: CONTACT_INFO.phoneDisplay, href: CONTACT_INFO.phoneHref },
                { label: CONTACT_INFO.phone2Display, href: CONTACT_INFO.phone2Href },
              ].map((phone) => (
                <Pressable
                  key={phone.href}
                  onPress={() => openExternalUrl(phone.href)}
                  accessibilityRole="link"
                  accessibilityLabel={`Llamar al ${phone.label}`}
                  style={({ pressed }) => [styles.mobileContactLink, pressed && styles.pressed]}
                >
                  <Ionicons name="call" size={17} color={colors.primary} />
                  <Text style={styles.mobileQuickLinkText}>{phone.label}</Text>
                </Pressable>
              ))}
            </View>

            <View style={styles.mobileGridSection}>
              <Text style={styles.mobileSectionTitle}>Síguenos</Text>
              <View style={styles.mobileTitleAccent} />
              <View style={styles.mobileSocials}>
                {SOCIAL_LINKS.filter((social) => social.label !== 'WhatsApp').map((social) => (
                  <Pressable
                    key={social.label}
                    onPress={() => openExternalUrl(social.url)}
                    accessibilityRole="link"
                    accessibilityLabel={`${social.label} de ${BRAND.name}`}
                    style={({ pressed }) => [
                      styles.mobileSocialButton,
                      pressed && styles.pressed,
                    ]}
                  >
                    <FontAwesome name={social.icon} size={19} color={colors.primary} />
                  </Pressable>
                ))}
              </View>
            </View>
          </View>
        </View>

        <Text style={styles.mobileCopyright}>
          © {new Date().getFullYear()} {BRAND.name} · {BRAND.location}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={[styles.footerContent, isMobile && styles.footerContentMobile]}>
        <View
          style={[
            styles.panel,
            styles.brandPanel,
            isMobile && styles.panelMobile,
            isDesktop && styles.panelDesktop,
            isDesktop && styles.borderedPanelDesktop,
          ]}
        >
          <View style={styles.brandRow}>
            <Ionicons
              name="flower-outline"
              size={24}
              color={colors.primary}
              accessibilityElementsHidden
              importantForAccessibility="no"
            />
            <Text style={styles.brandName}>{BRAND.name}</Text>
          </View>
          <Text style={styles.brandTagline}>{HERO.tagline}</Text>
          <Text style={styles.brandDescription}>{BRAND.description}</Text>
        </View>

        <View
          style={[
            styles.panel,
            styles.separatedPanel,
            isMobile && styles.panelMobile,
            isDesktop && styles.panelDesktop,
            isDesktop && styles.borderedPanelDesktop,
          ]}
        >
          <ContactLink
            icon="home-outline"
            label={CONTACT_INFO.addressMain}
            onPress={() => openExternalUrl(CONTACT_INFO.mapsUrl)}
          />
          <ContactLink
            icon="call-outline"
            label={CONTACT_INFO.phoneDisplay}
            onPress={() => openExternalUrl(CONTACT_INFO.phoneHref)}
          />
          <ContactLink
            icon="logo-whatsapp"
            label={CONTACT_INFO.whatsappDisplay}
            onPress={() => openExternalUrl(CONTACT_INFO.whatsappUrl)}
          />
          <ContactLink icon="time-outline" label={CONTACT_INFO.hours} />
        </View>

        <View
          style={[
            styles.panel,
            styles.separatedPanel,
            styles.socialPanel,
            isMobile && styles.panelMobile,
            isDesktop && styles.panelDesktop,
            isDesktop && styles.borderedPanelDesktop,
          ]}
        >
          <Text style={styles.eyebrow}>Síguenos</Text>
          <View style={styles.socialRow}>
            {SOCIAL_LINKS.map((social) => (
              <Pressable
                key={social.label}
                onPress={() => openExternalUrl(social.url)}
                accessibilityRole="link"
                accessibilityLabel={`${social.label} de ${BRAND.name}`}
                {...hoverProps(`social-${social.label}`)}
                style={({ pressed }) => [
                  styles.socialButton,
                  webTransition,
                  isHovered(`social-${social.label}`) && styles.socialButtonHovered,
                  pressed && styles.pressed,
                ]}
              >
                <FontAwesome
                  name={social.icon}
                  size={20}
                  color={isHovered(`social-${social.label}`) ? colors.white : colors.primary}
                />
              </Pressable>
            ))}
          </View>
        </View>

        <View
          style={[
            styles.panel,
            styles.separatedPanel,
            isMobile && styles.panelMobile,
            isDesktop && styles.panelDesktop,
            isDesktop && styles.linksPanelDesktop,
          ]}
        >
          {QUICK_LINKS.map((item) => (
            <Pressable
              key={item.screen}
              onPress={() => onNavigate(item.screen)}
              accessibilityRole="button"
              accessibilityLabel={item.label}
              {...hoverProps(`link-${item.screen}`)}
              style={({ pressed }) => [
                styles.quickLink,
                isHovered(`link-${item.screen}`) && styles.quickLinkHovered,
                pressed && styles.pressed,
              ]}
            >
              <Ionicons
                name={item.icon}
                size={20}
                color={isHovered(`link-${item.screen}`) ? colors.primary : colors.accentStrong}
              />
              <Text
                style={[
                  styles.quickLinkText,
                  isHovered(`link-${item.screen}`) && styles.quickLinkTextHovered,
                ]}
              >
                {item.label}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={[styles.bottomBar, webBerryGradient]}>
        <Text style={styles.copyright}>
          © {new Date().getFullYear()} {BRAND.name} · {BRAND.location}
        </Text>
      </View>
    </View>
  );
}

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    container: {
      backgroundColor: colors.footerBg,
    },
    mobileContainer: {
      backgroundColor: colors.footerBg,
    },
    mobileFooter: {
      backgroundColor: colors.footerBg,
      borderTopLeftRadius: radius.lg,
      borderTopRightRadius: radius.lg,
      borderTopWidth: borderWidth.thin,
      borderTopColor: colors.champagne,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.xl,
      overflow: 'hidden',
    },
    mobileGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      columnGap: spacing.lg,
      rowGap: spacing.xl,
    },
    mobileGridSection: {
      flexBasis: '46%',
      flexGrow: 1,
    },
    mobileSectionTitle: {
      color: colors.primary,
      fontFamily: fonts.heading,
      fontSize: fontSizes.subtitle,
      lineHeight: lineHeights.subtitle,
      letterSpacing: letterSpacing.slight,
    },
    mobileTitleAccent: {
      width: spacing.lg,
      height: borderWidth.thin,
      backgroundColor: colors.champagne,
      marginTop: spacing.xxs,
      marginBottom: spacing.sm,
    },
    mobileTextLink: {
      minHeight: layout.minTouchTarget,
      justifyContent: 'center',
    },
    mobileContactLink: {
      minHeight: layout.minTouchTarget,
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
    },
    mobileSocials: {
      flexDirection: 'row',
      gap: spacing.sm,
    },
    mobileSocialButton: {
      width: layout.minTouchTarget,
      height: layout.minTouchTarget,
      borderWidth: borderWidth.thin,
      borderColor: colors.champagne,
      borderRadius: radius.pill,
      backgroundColor: colors.secondaryButton,
      alignItems: 'center',
      justifyContent: 'center',
    },
    mobileCopyright: {
      color: colors.textOnDark,
      backgroundColor: colors.primary,
      fontSize: fontSizes.caption,
      lineHeight: lineHeights.caption,
      textAlign: 'center',
      paddingVertical: spacing.sm,
      paddingHorizontal: layout.gutter,
    },
    mobileQuickLinkText: {
      color: colors.textMuted,
      fontSize: fontSizes.small,
      lineHeight: lineHeights.small,
      flexShrink: 1,
    },
    footerContent: {
      width: '100%',
      maxWidth: layout.navigationMaxWidth,
      alignSelf: 'center',
      flexDirection: 'row',
      flexWrap: 'wrap',
      paddingHorizontal: layout.gutterWide,
      paddingVertical: spacing.xl,
    },
    footerContentMobile: {
      paddingHorizontal: layout.gutter,
      paddingVertical: spacing.lg,
    },
    panel: {
      flexGrow: 1,
      flexBasis: 280,
      minHeight: 190,
      paddingHorizontal: 0,
      paddingVertical: spacing.md,
      justifyContent: 'center',
    },
    panelDesktop: {
      paddingHorizontal: spacing.xl,
    },
    panelMobile: {
      flexBasis: '100%',
      minHeight: 0,
      paddingVertical: spacing.lg,
    },
    separatedPanel: {
      borderTopWidth: borderWidth.thin,
      borderTopColor: colors.borderStrong,
    },
    borderedPanelDesktop: {
      borderTopWidth: 0,
      borderRightWidth: borderWidth.thin,
      borderRightColor: colors.borderStrong,
    },
    socialPanel: {
      alignItems: 'center',
    },
    linksPanelDesktop: {
      borderTopWidth: 0,
    },
    brandPanel: {
      justifyContent: 'flex-start',
    },
    brandRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
      marginBottom: spacing.xs,
    },
    brandName: {
      color: colors.text,
      fontFamily: fonts.heading,
      fontSize: fontSizes.subtitle,
      letterSpacing: letterSpacing.wide,
    },
    brandTagline: {
      color: colors.primary,
      fontFamily: fonts.accentItalic,
      fontSize: fontSizes.bodyLarge,
      lineHeight: lineHeights.bodyLarge,
      marginBottom: spacing.sm,
    },
    brandDescription: {
      color: colors.textMuted,
      fontSize: fontSizes.small,
      lineHeight: lineHeights.small,
    },
    eyebrow: {
      color: colors.accentStrong,
      fontSize: fontSizes.small,
      fontWeight: fontWeights.bold,
      letterSpacing: letterSpacing.wider,
      textTransform: 'uppercase',
      marginBottom: spacing.sm,
    },
    socialRow: {
      flexDirection: 'row',
      gap: spacing.md,
      marginBottom: spacing.md,
    },
    socialButton: {
      width: layout.minTouchTarget,
      height: layout.minTouchTarget,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: borderWidth.thin,
      borderColor: colors.primary,
      borderRadius: radius.pill,
    },
    socialButtonHovered: {
      backgroundColor: colors.primary,
      transform: [{ translateY: -3 }],
    },
    quickLink: {
      minHeight: 44,
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.md,
    },
    quickLinkText: {
      color: colors.text,
      fontSize: fontSizes.body,
      lineHeight: lineHeights.body,
    },
    quickLinkHovered: {
      transform: [{ translateX: 5 }],
    },
    quickLinkTextHovered: {
      color: colors.primary,
    },
    pressed: {
      opacity: 0.6,
    },
    bottomBar: {
      backgroundColor: colors.primary,
      paddingVertical: spacing.md,
      paddingHorizontal: layout.gutter,
      alignItems: 'center',
    },
    copyright: {
      color: colors.textOnDark,
      fontSize: fontSizes.caption,
      lineHeight: lineHeights.caption,
      textAlign: 'center',
    },
  });
}
