import { FontAwesome, Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { BRAND, CONTACT_INFO, NAV_ITEMS, ScreenName } from '../data/content';
import { useBreakpoint } from '../hooks/useBreakpoint';
import {
  borderWidth,
  colors,
  fonts,
  fontSizes,
  fontWeights,
  layout,
  letterSpacing,
  radius,
  spacing,
} from '../theme';

const SOCIAL_LINKS = [
  { icon: 'instagram', label: 'Instagram de Florería Valeria', url: CONTACT_INFO.instagramUrl },
  { icon: 'facebook', label: 'Facebook de Florería Valeria', url: CONTACT_INFO.facebookUrl },
  { icon: 'whatsapp', label: 'WhatsApp de Florería Valeria', url: CONTACT_INFO.whatsappUrl },
] as const;

interface NavBarProps {
  current: ScreenName;
  onNavigate: (screen: ScreenName) => void;
}

export default function NavBar({ current, onNavigate }: NavBarProps) {
  const { isMobile, isDesktop } = useBreakpoint();
  const [hovered, setHovered] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = (screen: ScreenName) => {
    setMenuOpen(false);
    onNavigate(screen);
  };

  const brand = (
    <Pressable
      onPress={() => navigate('Home')}
      accessibilityRole="button"
      accessibilityLabel={`${BRAND.name}, ir al inicio`}
      onHoverIn={() => setHovered('brand')}
      onHoverOut={() => setHovered(null)}
      style={[styles.brand, hovered === 'brand' && styles.brandHovered]}
    >
      <Ionicons name="flower-outline" size={26} color={colors.accent} style={styles.brandIcon} />
      <Text style={styles.brandName} numberOfLines={1}>
        {BRAND.name}
      </Text>
    </Pressable>
  );

  const orderButton = (
    <Pressable
      onPress={() => navigate('Shop')}
      accessibilityRole="button"
      accessibilityLabel="Pedir ahora, ir al catálogo"
      onHoverIn={() => setHovered('order')}
      onHoverOut={() => setHovered(null)}
      style={({ pressed }) => [
        styles.orderButton,
        hovered === 'order' && styles.orderButtonHovered,
        pressed && styles.orderButtonPressed,
      ]}
    >
      <Text style={styles.orderLabel}>Pedir Ahora</Text>
    </Pressable>
  );

  const menu = (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.menuScroll}
      contentContainerStyle={[styles.menu, isDesktop && styles.menuDesktop]}
    >
      {NAV_ITEMS.map((item) => {
        const active = item.screen === current;
        return (
          <Pressable
            key={item.screen}
            onPress={() => navigate(item.screen)}
            accessibilityRole="button"
            accessibilityLabel={item.label}
            accessibilityState={{ selected: active }}
            onHoverIn={() => setHovered(`nav-${item.screen}`)}
            onHoverOut={() => setHovered(null)}
            style={styles.item}
          >
            <Text
              style={[
                styles.itemLabel,
                (active || hovered === `nav-${item.screen}`) && styles.itemLabelActive,
              ]}
            >
              {item.label}
            </Text>
            <View
              style={[
                styles.itemUnderline,
                (active || hovered === `nav-${item.screen}`) && styles.itemUnderlineActive,
              ]}
            />
          </Pressable>
        );
      })}
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      {/* Ribbon superior con redes sociales */}
      <View style={styles.ribbon}>
        <View style={styles.ribbonInner}>
          {SOCIAL_LINKS.map((social) => (
            <Pressable
              key={social.icon}
              onPress={() => Linking.openURL(social.url)}
              accessibilityRole="link"
              accessibilityLabel={social.label}
              hitSlop={spacing.sm}
              onHoverIn={() => setHovered(`social-${social.icon}`)}
              onHoverOut={() => setHovered(null)}
              style={[
                styles.socialButton,
                hovered === `social-${social.icon}` && styles.socialButtonHovered,
              ]}
            >
              <FontAwesome
                name={social.icon}
                size={16}
                color={hovered === `social-${social.icon}` ? colors.primaryDark : colors.textOnDark}
              />
            </Pressable>
          ))}
        </View>
      </View>

      {/* Barra principal */}
      {isDesktop ? (
        <View style={[styles.bar, styles.barDesktop]}>
          {brand}
          {menu}
          {orderButton}
        </View>
      ) : isMobile ? (
        <View style={[styles.bar, styles.barMobile]}>
          <View style={styles.barTop}>
            {brand}
            <Pressable
              onPress={() => setMenuOpen((open) => !open)}
              accessibilityRole="button"
              accessibilityLabel={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
              accessibilityState={{ expanded: menuOpen }}
              style={({ pressed }) => [styles.menuButton, pressed && styles.orderButtonPressed]}
            >
              <Ionicons
                name={menuOpen ? 'close' : 'menu'}
                size={28}
                color={colors.primaryDark}
              />
            </Pressable>
          </View>
          {menuOpen ? (
            <View style={styles.mobileMenu}>
              {NAV_ITEMS.map((item) => {
                const active = item.screen === current;
                return (
                  <Pressable
                    key={item.screen}
                    onPress={() => navigate(item.screen)}
                    accessibilityRole="button"
                    accessibilityState={{ selected: active }}
                    style={({ pressed }) => [
                      styles.mobileItem,
                      active && styles.mobileItemActive,
                      pressed && styles.mobileItemPressed,
                    ]}
                  >
                    <Text style={[styles.mobileItemLabel, active && styles.itemLabelActive]}>
                      {item.label}
                    </Text>
                    <Ionicons name="chevron-forward" size={18} color={colors.primary} />
                  </Pressable>
                );
              })}
              <View style={styles.mobileOrder}>{orderButton}</View>
            </View>
          ) : null}
        </View>
      ) : (
        <View style={styles.bar}>
          <View style={styles.barTop}>
            {brand}
            {orderButton}
          </View>
          {menu}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderBottomWidth: borderWidth.thin,
    borderBottomColor: colors.border,
  },
  ribbon: {
    backgroundColor: colors.ribbon,
    paddingHorizontal: layout.gutter,
  },
  ribbonInner: {
    width: '100%',
    maxWidth: layout.navigationMaxWidth,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: spacing.md,
  },
  socialButton: {
    minHeight: 36,
    minWidth: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialButtonHovered: {
    backgroundColor: colors.sand,
    borderRadius: radius.pill,
    transform: [{ translateY: -2 }],
  },
  bar: {
    width: '100%',
    maxWidth: layout.navigationMaxWidth,
    alignSelf: 'center',
    paddingHorizontal: layout.gutter,
    paddingVertical: spacing.sm,
    gap: spacing.sm,
  },
  barMobile: {
    paddingVertical: spacing.xs,
  },
  barDesktop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
    paddingVertical: spacing.md,
  },
  barTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 0,
    minHeight: layout.minTouchTarget,
  },
  brandHovered: {
    opacity: 0.78,
  },
  brandIcon: {
    marginRight: spacing.sm,
  },
  brandName: {
    color: colors.text,
    fontSize: fontSizes.subtitle,
    fontFamily: fonts.heading,
    letterSpacing: letterSpacing.wide,
  },
  menuButton: {
    width: layout.minTouchTarget,
    height: layout.minTouchTarget,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.pill,
  },
  mobileMenu: {
    borderTopWidth: borderWidth.thin,
    borderTopColor: colors.border,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
  },
  mobileItem: {
    minHeight: layout.minTouchTarget,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.sm,
    borderRadius: radius.sm,
  },
  mobileItemActive: {
    backgroundColor: colors.accentSoft,
  },
  mobileItemPressed: {
    backgroundColor: colors.backgroundAlt,
  },
  mobileItemLabel: {
    color: colors.text,
    fontFamily: fonts.heading,
    fontSize: fontSizes.body,
  },
  mobileOrder: {
    marginTop: spacing.sm,
    alignItems: 'stretch',
  },
  menuScroll: {
    flexGrow: 1,
    flexShrink: 1,
  },
  menu: {
    alignItems: 'center',
    gap: spacing.md,
    flexGrow: 1,
  },
  menuDesktop: {
    justifyContent: 'flex-end',
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: layout.minTouchTarget,
  },
  itemLabel: {
    color: colors.text,
    fontSize: fontSizes.small,
    fontFamily: fonts.heading,
    textTransform: 'uppercase',
    letterSpacing: letterSpacing.wide,
  },
  itemLabelActive: {
    color: colors.accent,
  },
  itemUnderline: {
    height: 2,
    alignSelf: 'stretch',
    backgroundColor: 'transparent',
    marginTop: spacing.xxs,
    borderRadius: radius.sm,
  },
  itemUnderlineActive: {
    backgroundColor: colors.accent,
  },
  orderButton: {
    minHeight: layout.minTouchTarget,
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.pill,
  },
  orderButtonPressed: {
    backgroundColor: colors.primaryDark,
  },
  orderButtonHovered: {
    backgroundColor: colors.primaryDark,
    transform: [{ translateY: -2 }],
  },
  orderLabel: {
    color: colors.textOnDark,
    fontSize: fontSizes.small,
    fontWeight: fontWeights.bold,
    textTransform: 'uppercase',
    letterSpacing: letterSpacing.wide,
  },
});
