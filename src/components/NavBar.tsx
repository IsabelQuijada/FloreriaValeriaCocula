import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { BRAND, CONTACT_INFO, NAV_ITEMS, ScreenName } from '../data/content';
import { useBreakpoint } from '../hooks/useBreakpoint';
import { useHoverKey } from '../hooks/useHover';
import { openExternalUrl } from '../utils/links';
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

const CONTACT_LINKS = [
  {
    id: 'phone1',
    label: CONTACT_INFO.phoneDisplay,
    accessibility: `Llamar al ${CONTACT_INFO.phoneDisplay}`,
    url: CONTACT_INFO.phoneHref,
    icon: 'call-outline',
  },
  {
    id: 'phone2',
    label: CONTACT_INFO.phone2Display,
    accessibility: `Llamar al ${CONTACT_INFO.phone2Display}`,
    url: CONTACT_INFO.phone2Href,
    icon: 'call-outline',
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    accessibility: `Escribir por WhatsApp al ${CONTACT_INFO.whatsappDisplay}`,
    url: CONTACT_INFO.whatsappUrl,
    icon: 'logo-whatsapp',
  },
] as const;

interface NavBarProps {
  current: ScreenName;
  onNavigate: (screen: ScreenName) => void;
}

export default function NavBar({ current, onNavigate }: NavBarProps) {
  const { isMobile, isDesktop } = useBreakpoint();
  const { isHovered, hoverProps } = useHoverKey();
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
      {...hoverProps('brand')}
      style={[styles.brand, isHovered('brand') && styles.brandHovered]}
    >
      <Image
        source={require('../../assets/floreria-valeria-logo.png')}
        style={[styles.brandLogo, isDesktop && styles.brandLogoDesktop]}
        resizeMode="contain"
        accessibilityElementsHidden
        importantForAccessibility="no"
      />
      <Text
        style={[styles.brandName, isDesktop && styles.brandNameDesktop]}
        numberOfLines={1}
      >
        {BRAND.name}
      </Text>
    </Pressable>
  );

  const orderButton = (
    <Pressable
      onPress={() => openExternalUrl(CONTACT_INFO.whatsappUrl)}
      accessibilityRole="button"
      accessibilityLabel="Contactarnos por WhatsApp"
      {...hoverProps('order')}
      style={({ pressed }) => [
        styles.orderButton,
        isHovered('order') && styles.orderButtonHovered,
        pressed && styles.orderButtonPressed,
      ]}
    >
      <Text style={styles.orderLabel}>Contáctanos</Text>
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
            {...hoverProps(`nav-${item.screen}`)}
            style={styles.item}
          >
            <Text
              style={[
                styles.itemLabel,
                isDesktop && styles.itemLabelDesktop,
                (active || isHovered(`nav-${item.screen}`)) && styles.itemLabelActive,
              ]}
            >
              {item.label}
            </Text>
            <View
              style={[
                styles.itemUnderline,
                (active || isHovered(`nav-${item.screen}`)) && styles.itemUnderlineActive,
              ]}
            />
          </Pressable>
        );
      })}
    </ScrollView>
  );

  const ribbonLinks = CONTACT_LINKS;

  return (
    <View style={styles.container}>
      {/* Ribbon superior con teléfonos */}
      <View style={styles.ribbon}>
        <View style={[styles.ribbonInner, isMobile && styles.ribbonInnerMobile]}>
          {ribbonLinks.map((link, index) => (
            <React.Fragment key={link.id}>
              <Pressable
                onPress={() => openExternalUrl(link.url)}
                accessibilityRole="link"
                accessibilityLabel={link.accessibility}
                hitSlop={spacing.sm}
                {...hoverProps(link.id)}
                style={[
                  styles.phoneButton,
                  isMobile && styles.phoneButtonMobile,
                  isHovered(link.id) && styles.phoneButtonHovered,
                ]}
              >
                {!(isMobile && link.id === 'phone2') ? (
                  <Ionicons
                    name={link.icon as any}
                    size={isMobile && link.id === 'whatsapp' ? 19 : 14}
                    color={isHovered(link.id) ? colors.primaryDark : colors.textOnDark}
                  />
                ) : null}
                {!(isMobile && link.id === 'whatsapp') ? (
                  <Text
                    style={[
                      styles.phoneLabel,
                      isMobile && styles.phoneLabelMobile,
                      isHovered(link.id) && styles.phoneLabelHovered,
                    ]}
                  >
                    {link.label}
                  </Text>
                ) : null}
              </Pressable>
              {index < ribbonLinks.length - 1 && (
                <Text style={[styles.separator, isMobile && styles.separatorMobile]}>
                  |
                </Text>
              )}
            </React.Fragment>
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
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.md,
  },
  ribbonInnerMobile: {
    gap: 0,
    justifyContent: 'space-between',
  },
  phoneButton: {
    minHeight: 36,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.sm,
  },
  phoneButtonMobile: {
    minHeight: layout.minTouchTarget,
    paddingHorizontal: spacing.xs,
    gap: spacing.xxs,
  },
  phoneButtonHovered: {
    backgroundColor: colors.sand,
    borderRadius: radius.pill,
    transform: [{ translateY: -2 }],
  },
  phoneLabel: {
    color: colors.textOnDark,
    fontSize: fontSizes.caption,
    fontWeight: fontWeights.semibold,
    letterSpacing: letterSpacing.slight,
  },
  phoneLabelHovered: {
    color: colors.primaryDark,
  },
  phoneLabelMobile: {
    fontSize: 12,
    letterSpacing: 0,
  },
  separator: {
    color: colors.textOnDark,
    fontSize: fontSizes.caption,
    marginHorizontal: spacing.xs,
  },
  separatorMobile: {
    marginHorizontal: 0,
    opacity: 0.72,
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
  brandLogo: {
    width: 91,
    height: 48,
    marginRight: spacing.sm,
  },
  brandLogoDesktop: {
    width: 104,
    height: 54,
    marginRight: spacing.md,
  },
  brandName: {
    color: colors.text,
    fontSize: fontSizes.subtitle,
    fontFamily: fonts.heading,
    letterSpacing: letterSpacing.wide,
  },
  brandNameDesktop: {
    fontSize: fontSizes.titleSmall,
    letterSpacing: letterSpacing.slight,
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
    fontSize: fontSizes.bodyLarge,
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
    justifyContent: 'center',
    gap: spacing.xl,
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: layout.minTouchTarget,
  },
  itemLabel: {
    color: colors.text,
    fontSize: fontSizes.bodyLarge,
    fontFamily: fonts.heading,
    letterSpacing: letterSpacing.slight,
  },
  itemLabelDesktop: {
    fontSize: 24,
    letterSpacing: letterSpacing.slight,
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
    fontSize: fontSizes.body,
    fontWeight: fontWeights.semibold,
    letterSpacing: letterSpacing.slight,
  },
});
