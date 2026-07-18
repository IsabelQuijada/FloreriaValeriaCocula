import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from '../components/Button';
import CardGrid from '../components/CardGrid';
import FeatureCard from '../components/FeatureCard';
import Section from '../components/Section';
import SectionTitle from '../components/SectionTitle';
import { CONTACT_INFO, ScreenName, SERVICES } from '../data/content';
import { openExternalUrl } from '../utils/links';
import {
  colors,
  fontSizes,
  fontWeights,
  lineHeights,
  radius,
  spacing,
} from '../theme';

interface ServicesScreenProps {
  onNavigate: (screen: ScreenName) => void;
}

export default function ServicesScreen({ onNavigate }: ServicesScreenProps) {
  return (
    <Section>
      <SectionTitle
        kicker="Servicios"
        title="Más que una florería"
        subtitle="De la entrega a domicilio a la decoración completa de tu evento — esto es todo lo que podemos hacer por ti."
      />

      <CardGrid style={styles.grid}>
        {SERVICES.map((service) => (
          <FeatureCard
            key={service.id}
            icon={service.icon}
            title={service.title}
            description={service.description}
          />
        ))}
      </CardGrid>

      <View style={styles.deliveryBox}>
        <Text accessibilityRole="header" style={styles.deliveryTitle}>
          🕐 Horarios de entrega
        </Text>
        <Text style={styles.deliveryText}>
          Entregamos a domicilio en todo el municipio de Cocula,{'\n'}
          todos los días de 9:00 AM a 6:00 PM.
        </Text>
        <Button
          label="Contáctanos"
          variant="soft"
          onPress={() => openExternalUrl(CONTACT_INFO.whatsappUrl)}
        />
      </View>
    </Section>
  );
}

const styles = StyleSheet.create({
  grid: {
    marginBottom: spacing.xxl,
  },
  deliveryBox: {
    backgroundColor: colors.primaryDark,
    borderRadius: radius.lg,
    padding: spacing.xl,
    alignItems: 'center',
    alignSelf: 'center',
    width: '100%',
    maxWidth: 720,
  },
  deliveryTitle: {
    color: colors.textOnDark,
    fontSize: fontSizes.subtitle,
    fontWeight: fontWeights.bold,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  deliveryText: {
    color: colors.textOnDarkMuted,
    fontSize: fontSizes.bodyLarge,
    lineHeight: lineHeights.bodyLarge,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
});
