import { Ionicons } from '@expo/vector-icons';
import React, { useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { CONTACT_INFO, ScreenName } from '../data/content';
import { useBreakpoint } from '../hooks/useBreakpoint';
import { useHover } from '../hooks/useHover';
import { useTheme } from '../hooks/useTheme';
import { openExternalUrl } from '../utils/links';
import { fonts, fontSizes, fontWeights, layout, lineHeights, spacing } from '../theme';
import Button from './Button';
import Section from './Section';

interface CtaRibbonProps {
  onNavigate: (screen: ScreenName) => void;
  background?: 'alt' | 'blush';
  /** En mobile, oculta el link "Ver catálogo" (útil cuando la página ya lo ofrece más arriba). */
  showMobileCatalogLink?: boolean;
}

/**
 * Cinta de llamada a la acción compartida por todas las páginas:
 * contactar por WhatsApp o ir al catálogo.
 */
export default function CtaRibbon({
  onNavigate,
  background = 'blush',
  showMobileCatalogLink = true,
}: CtaRibbonProps) {
  const { isMobile } = useBreakpoint();
  const faqHover = useHover();
  const catalogHover = useHover();
  const { colors } = useTheme();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        section: {
          paddingVertical: spacing.lg,
        },
        sectionMobile: {
          paddingVertical: spacing.md,
        },
        cta: {
          alignItems: 'center',
          alignSelf: 'center',
          width: '100%',
          maxWidth: layout.textMaxWidth,
        },
        title: {
          color: colors.accent,
          fontFamily: fonts.heading,
          fontSize: fontSizes.title,
          lineHeight: lineHeights.title,
          textAlign: 'center',
          marginBottom: spacing.xs,
        },
        titleMobile: {
          fontSize: fontSizes.titleSmall,
          lineHeight: lineHeights.titleSmall,
        },
        text: {
          color: colors.textMuted,
          fontSize: fontSizes.body,
          lineHeight: lineHeights.body,
          textAlign: 'center',
          marginBottom: spacing.md,
        },
        buttons: {
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: spacing.md,
          justifyContent: 'center',
        },
        buttonsMobile: {
          width: '100%',
          gap: spacing.sm,
        },
        buttonMobile: {
          width: '100%',
          alignSelf: 'stretch',
        },
        catalogLink: {
          minHeight: layout.minTouchTarget,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: spacing.sm,
          alignSelf: 'center',
          paddingHorizontal: spacing.md,
        },
        catalogLinkText: {
          color: colors.primary,
          fontSize: fontSizes.body,
          fontWeight: fontWeights.semibold,
        },
        catalogLinkTextHovered: {
          color: colors.primaryEmphasis,
        },
        faqLink: {
          minHeight: layout.minTouchTarget,
          justifyContent: 'center',
          marginTop: spacing.sm,
          paddingHorizontal: spacing.md,
        },
        faqLinkText: {
          color: colors.textMuted,
          fontSize: fontSizes.small,
          fontWeight: fontWeights.medium,
          textAlign: 'center',
          textDecorationLine: 'underline',
        },
        faqLinkTextHovered: {
          color: colors.primary,
        },
      }),
    [colors],
  );

  return (
    <Section
      background={background}
      style={[styles.section, isMobile && styles.sectionMobile]}
    >
      <View style={styles.cta}>
        <Text
          accessibilityRole="header"
          style={[styles.title, isMobile && styles.titleMobile]}
        >
          ¿A quién quieres sorprender hoy?
        </Text>
        <Text style={styles.text}>
          {isMobile
            ? 'Te ayudamos a elegir el arreglo perfecto.'
            : 'Escríbenos por WhatsApp y te ayudamos a elegir el arreglo perfecto, o explora el catálogo a tu ritmo.'}
        </Text>
        <View style={[styles.buttons, isMobile && styles.buttonsMobile]}>
          <Button
            label="Contáctanos"
            onPress={() => openExternalUrl(CONTACT_INFO.whatsappUrl)}
            style={isMobile && styles.buttonMobile}
          />
          {isMobile ? (
            showMobileCatalogLink ? (
              <Pressable
                onPress={() => onNavigate('Shop')}
                {...catalogHover.hoverProps}
                accessibilityRole="button"
                accessibilityLabel="Ver catálogo"
                style={styles.catalogLink}
              >
                <Text
                  style={[
                    styles.catalogLinkText,
                    catalogHover.hovered && styles.catalogLinkTextHovered,
                  ]}
                >
                  Ver catálogo
                </Text>
                <Ionicons
                  name="arrow-forward"
                  size={18}
                  color={catalogHover.hovered ? colors.primaryEmphasis : colors.primary}
                  accessibilityElementsHidden
                  importantForAccessibility="no"
                />
              </Pressable>
            ) : null
          ) : (
            <Button
              label="Ver catálogo"
              variant="outline"
              onPress={() => onNavigate('Shop')}
            />
          )}
        </View>
        {!isMobile ? (
          <Pressable
            onPress={() => onNavigate('FAQ')}
            accessibilityRole="button"
            accessibilityLabel="Ver preguntas frecuentes"
            {...faqHover.hoverProps}
            style={styles.faqLink}
          >
            <Text style={[styles.faqLinkText, faqHover.hovered && styles.faqLinkTextHovered]}>
              ¿Tienes dudas? Consulta las preguntas frecuentes
            </Text>
          </Pressable>
        ) : null}
      </View>
    </Section>
  );
}
