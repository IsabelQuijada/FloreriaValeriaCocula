import { FontAwesome, Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import { BRAND, CONTACT_INFO, HERO, ScreenName } from '../data/content';
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
  spacing,
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

interface FooterProps {
  onNavigate: (screen: ScreenName) => void;
}

interface ContactLinkProps {
  icon: React.ComponentProps<typeof Ionicons>['name'];
  label: string;
  onPress?: () => void;
}

function ContactLink({ icon, label, onPress }: ContactLinkProps) {
  const [hovered, setHovered] = useState(false);
  const content = (
    <>
      <Ionicons name={icon} size={20} color={hovered ? colors.primaryDark : colors.primary} />
      <Text style={[styles.contactText, hovered && styles.contactTextHovered]}>{label}</Text>
    </>
  );

  if (!onPress) return <View style={styles.contactRow}>{content}</View>;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="link"
      accessibilityLabel={label}
      onHoverIn={() => setHovered(true)}
      onHoverOut={() => setHovered(false)}
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
  const [hovered, setHovered] = useState<string | null>(null);

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
            onPress={() => Linking.openURL(CONTACT_INFO.mapsUrl)}
          />
          <ContactLink
            icon="call-outline"
            label={CONTACT_INFO.phoneDisplay}
            onPress={() => Linking.openURL(CONTACT_INFO.phoneHref)}
          />
          <ContactLink
            icon="logo-whatsapp"
            label={CONTACT_INFO.whatsappDisplay}
            onPress={() => Linking.openURL(CONTACT_INFO.whatsappUrl)}
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
                onPress={() => Linking.openURL(social.url)}
                accessibilityRole="link"
                accessibilityLabel={`${social.label} de ${BRAND.name}`}
                onHoverIn={() => setHovered(`social-${social.label}`)}
                onHoverOut={() => setHovered(null)}
                style={({ pressed }) => [
                  styles.socialButton,
                  hovered === `social-${social.label}` && styles.socialButtonHovered,
                  pressed && styles.pressed,
                ]}
              >
                <FontAwesome
                  name={social.icon}
                  size={20}
                  color={hovered === `social-${social.label}` ? colors.white : colors.primary}
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
              onHoverIn={() => setHovered(`link-${item.screen}`)}
              onHoverOut={() => setHovered(null)}
              style={({ pressed }) => [
                styles.quickLink,
                hovered === `link-${item.screen}` && styles.quickLinkHovered,
                pressed && styles.pressed,
              ]}
            >
              <Ionicons
                name={item.icon}
                size={20}
                color={hovered === `link-${item.screen}` ? colors.primary : colors.primaryDark}
              />
              <Text
                style={[
                  styles.quickLinkText,
                  hovered === `link-${item.screen}` && styles.quickLinkTextHovered,
                ]}
              >
                {item.label}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.bottomBar}>
        <Text style={styles.copyright}>
          © {new Date().getFullYear()} {BRAND.name} · {BRAND.location}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.sand,
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
    fontSize: fontSizes.small,
    fontWeight: fontWeights.semibold,
    fontStyle: 'italic',
    marginBottom: spacing.sm,
  },
  brandDescription: {
    color: colors.textMuted,
    fontSize: fontSizes.small,
    lineHeight: lineHeights.small,
  },
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
    color: colors.primaryDark,
  },
  eyebrow: {
    color: colors.primaryDark,
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
  galleryButton: {
    minHeight: 42,
    backgroundColor: colors.primary,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.lg,
    justifyContent: 'center',
  },
  galleryPressed: {
    backgroundColor: colors.primaryDark,
  },
  galleryHovered: {
    backgroundColor: colors.primaryDark,
    transform: [{ translateY: -2 }],
  },
  galleryLabel: {
    color: colors.textOnDark,
    fontSize: fontSizes.small,
    fontWeight: fontWeights.bold,
    letterSpacing: letterSpacing.wide,
    textTransform: 'uppercase',
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
