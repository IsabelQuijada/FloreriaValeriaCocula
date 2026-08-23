import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BRAND } from '../data/content';
import { useBreakpoint } from '../hooks/useBreakpoint';
import { useTheme } from '../hooks/useTheme';
import { fonts, fontSizes, fontWeights, letterSpacing, lineHeights, spacing } from '../theme';
import Section from './Section';

const YEARS = new Date().getFullYear() - BRAND.foundedYear;

const STATS = [
  {
    id: 'years',
    figure: `${YEARS}`,
    label: 'años creando recuerdos',
    mobileLabel: 'años creando',
  },
  {
    id: 'branches',
    figure: '2',
    label: 'sucursales en el centro de Cocula',
    mobileLabel: 'sucursales',
  },
  {
    id: 'days',
    figure: '7',
    label: 'días a la semana con entrega a domicilio',
    mobileLabel: 'días con entrega',
  },
];

/**
 * Franja de cifras de confianza: datos reales del negocio en lugar de
 * testimonios. Refuerza la trayectoria sin interrumpir el flujo de compra.
 */
export default function TrustStrip() {
  const { isMobile } = useBreakpoint();
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
        row: {
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'stretch',
          gap: spacing.xl,
        },
        rowMobile: {
          flexDirection: 'row',
          alignItems: 'stretch',
          gap: spacing.sm,
        },
        stat: {
          alignItems: 'center',
          maxWidth: 220,
        },
        statMobile: {
          flex: 1,
          maxWidth: undefined,
          justifyContent: 'center',
        },
        separator: {
          width: 1,
          backgroundColor: colors.borderStrong,
          alignSelf: 'stretch',
        },
        separatorMobile: {
          width: 1,
          height: 'auto',
          alignSelf: 'stretch',
          backgroundColor: colors.borderStrong,
        },
        figure: {
          color: colors.accent,
          fontFamily: fonts.heading,
          fontSize: fontSizes.titleLarge,
          lineHeight: lineHeights.titleLarge,
        },
        figureMobile: {
          fontSize: fontSizes.titleSmall,
          lineHeight: lineHeights.titleSmall,
        },
        label: {
          color: colors.textMuted,
          fontSize: fontSizes.small,
          lineHeight: lineHeights.small,
          fontWeight: fontWeights.medium,
          letterSpacing: letterSpacing.slight,
          textAlign: 'center',
        },
        labelMobile: {
          fontSize: fontSizes.caption,
          lineHeight: lineHeights.caption,
          letterSpacing: letterSpacing.normal,
        },
      }),
    [colors],
  );

  return (
    <Section
      background="alt"
      style={[styles.section, isMobile && styles.sectionMobile]}
    >
      <View style={[styles.row, isMobile && styles.rowMobile]}>
        {STATS.map((stat, index) => (
          <React.Fragment key={stat.id}>
            {index > 0 ? (
              <View style={[styles.separator, isMobile && styles.separatorMobile]} />
            ) : null}
            <View style={[styles.stat, isMobile && styles.statMobile]}>
              <Text style={[styles.figure, isMobile && styles.figureMobile]}>{stat.figure}</Text>
              <Text
                accessibilityLabel={`${stat.figure} ${stat.label}`}
                style={[styles.label, isMobile && styles.labelMobile]}
              >
                {isMobile ? stat.mobileLabel : stat.label}
              </Text>
            </View>
          </React.Fragment>
        ))}
      </View>
    </Section>
  );
}
