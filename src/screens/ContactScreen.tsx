import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import Card from '../components/Card';
import CardGrid from '../components/CardGrid';
import CtaRibbon from '../components/CtaRibbon';
import FaqAccordion from '../components/FaqAccordion';
import FeatureCard from '../components/FeatureCard';
import Section from '../components/Section';
import SectionTitle from '../components/SectionTitle';
import { CONTACT_INFO, ScreenName } from '../data/content';
import { useBreakpoint } from '../hooks/useBreakpoint';
import { openExternalUrl } from '../utils/links';
import {
  borderWidth,
  colors,
  fontSizes,
  fontWeights,
  layout,
  letterSpacing,
  lineHeights,
  radius,
  shadows,
  spacing,
} from '../theme';

const BRANCHES = [
  {
    id: 'centro',
    name: 'Sucursal Centro',
    tag: 'Principal',
    addressLines: ['5 de Mayo 59,', 'Col. Centro, Cocula, Jal., México', 'C.P. 48500'],
    mapsUrl: CONTACT_INFO.mapsUrl,
    mapEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3751.4567824529895!2d-103.9995!3d20.4591!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x842f5c3c5c3c5c3d%3A0x2b2b2b2b2b2b2b2b!2s5%20de%20Mayo%2059%2C%20Centro%2C%2048500%20Cocula%2C%20Jal.!5e0!3m2!1ses!2smx!4v1700000000001!5m2!1ses!2smx',
  },
  {
    id: 'ocampo',
    name: 'Sucursal Ocampo',
    tag: 'Sucursal',
    addressLines: ['Ocampo 35,', 'Col. Centro, Cocula, Jal., México', 'C.P. 48500'],
    mapsUrl: CONTACT_INFO.mapsUrlOcampo,
    mapEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3751.4567824529895!2d-103.99892938507397!3d20.458925086378775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x842f5c3c5c3c5c3d%3A0x1a1a1a1a1a1a1a1a!2sOcampo%2035%2C%20Centro%2C%2048500%20Cocula%2C%20Jal.!5e0!3m2!1ses!2smx!4v1700000000000!5m2!1ses!2smx',
  },
];

const INFO_CARDS = [
  {
    icon: 'car-outline',
    title: 'Envío a Domicilio',
    text: 'Entregamos en todo el municipio de Cocula con el cuidado que tus flores merecen. Horarios de entrega: Lun – Dom, 9:00 AM – 6:00 PM. Costo adicional por envío.',
  },
  {
    icon: 'card-outline',
    title: 'Métodos de Pago',
    text: 'Aceptamos efectivo y transferencias bancarias. Expedimos factura si la requieres.',
  },
  {
    icon: 'chatbubbles-outline',
    title: 'Atención Personalizada',
    text: 'Nuestro equipo te ayudará a crear el arreglo perfecto para cada ocasión especial.',
  },
] as const;

/** Card de contacto rápido: icono, título y uno o más enlaces. */
function QuickCard({
  icon,
  title,
  children,
}: {
  icon: React.ComponentProps<typeof Ionicons>['name'];
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Card flexBasis={300} maxWidth={420} style={styles.quickCard}>
      <View style={styles.quickIcon}>
        <Ionicons name={icon} size={26} color={colors.primary} />
      </View>
      <Text accessibilityRole="header" style={styles.quickTitle}>
        {title}
      </Text>
      {children}
    </Card>
  );
}

interface ContactScreenProps {
  onNavigate: (screen: ScreenName) => void;
  onFaqLayout?: (y: number) => void;
}

function MapEmbed({
  src,
  title,
  compact = false,
}: {
  src: string;
  title: string;
  compact?: boolean;
}) {
  if (Platform.OS !== 'web') {
    return null;
  }

  return React.createElement('iframe', {
    src,
    title,
    style: StyleSheet.flatten([styles.mapIframe, compact && styles.mapIframeMobile]),
    loading: 'lazy',
    allowFullScreen: true,
    referrerPolicy: 'no-referrer-when-downgrade',
  });
}

export default function ContactScreen({ onNavigate, onFaqLayout }: ContactScreenProps) {
  const { isMobile } = useBreakpoint();

  return (
    <View>
      {/* Contacto rápido */}
      <Section wide style={[styles.quickSection, isMobile && styles.quickSectionMobile]}>
        <SectionTitle
          kicker={isMobile ? undefined : 'Contacto'}
          title="Contáctanos"
          subtitle={
            isMobile
              ? 'Hacemos realidad el arreglo que imaginas.'
              : 'Cuéntanos cómo imaginas tu evento y nosotros lo haremos realidad.'
          }
          compact
        />

        {isMobile ? (
          <View style={styles.mobileQuickCards}>
            <Card padded={false} style={styles.mobileQuickCard}>
              <View style={styles.mobileQuickIcon}>
                <Ionicons name="call-outline" size={20} color={colors.primary} />
              </View>
              <Text style={styles.mobileQuickTitle}>Teléfonos</Text>
              {[CONTACT_INFO.phoneDisplay, CONTACT_INFO.phone2Display].map((phone, index) => (
                <Pressable
                  key={phone}
                  onPress={() =>
                    openExternalUrl(index === 0 ? CONTACT_INFO.phoneHref : CONTACT_INFO.phone2Href)
                  }
                  accessibilityRole="link"
                  accessibilityLabel={`Llamar al ${phone}`}
                  style={({ pressed }) => [
                    styles.mobileQuickLink,
                    pressed && styles.mobileActionPressed,
                  ]}
                >
                  <Text style={styles.mobileQuickLinkText}>{phone}</Text>
                </Pressable>
              ))}
            </Card>

            <Card padded={false} style={styles.mobileQuickCard}>
              <View style={styles.mobileQuickIcon}>
                <Ionicons name="logo-whatsapp" size={20} color={colors.primary} />
              </View>
              <Text style={styles.mobileQuickTitle}>WhatsApp</Text>
              <Pressable
                onPress={() => openExternalUrl(CONTACT_INFO.whatsappUrl)}
                accessibilityRole="link"
                accessibilityLabel={`Escribir por WhatsApp al ${CONTACT_INFO.whatsappDisplay}`}
                style={({ pressed }) => [
                  styles.mobileQuickLink,
                  pressed && styles.mobileActionPressed,
                ]}
              >
                <Text style={styles.mobileQuickLinkText}>{CONTACT_INFO.whatsappDisplay}</Text>
              </Pressable>
            </Card>

            <Card padded={false} style={styles.mobileQuickCard}>
              <View style={styles.mobileQuickIcon}>
                <Ionicons name="time-outline" size={20} color={colors.primary} />
              </View>
              <Text style={styles.mobileQuickTitle}>Horarios</Text>
              <Text style={styles.mobileQuickText}>{CONTACT_INFO.hours}</Text>
            </Card>
          </View>
        ) : (
          <CardGrid>
            <QuickCard icon="call-outline" title="Teléfonos">
              <Pressable
                onPress={() => openExternalUrl(CONTACT_INFO.phoneHref)}
                accessibilityRole="link"
                accessibilityLabel={`Llamar al ${CONTACT_INFO.phoneDisplay}`}
                style={styles.linkRow}
              >
                <Text style={styles.quickLink}>{CONTACT_INFO.phoneDisplay}</Text>
              </Pressable>
              <Pressable
                onPress={() => openExternalUrl(CONTACT_INFO.phone2Href)}
                accessibilityRole="link"
                accessibilityLabel={`Llamar al ${CONTACT_INFO.phone2Display}`}
                style={styles.linkRow}
              >
                <Text style={styles.quickLink}>{CONTACT_INFO.phone2Display}</Text>
              </Pressable>
            </QuickCard>

            <QuickCard icon="logo-whatsapp" title="WhatsApp">
              <Pressable
                onPress={() => openExternalUrl(CONTACT_INFO.whatsappUrl)}
                accessibilityRole="link"
                accessibilityLabel={`Escribir por WhatsApp al ${CONTACT_INFO.whatsappDisplay}`}
                style={styles.linkRow}
              >
                <Text style={styles.quickLink}>{CONTACT_INFO.whatsappDisplay}</Text>
              </Pressable>
            </QuickCard>

            <QuickCard icon="time-outline" title="Horarios">
              <Text style={styles.quickText}>{CONTACT_INFO.hours}</Text>
            </QuickCard>
          </CardGrid>
        )}
      </Section>

      {/* Sucursales */}
      <Section background="alt" wide style={isMobile ? styles.mobileSection : undefined}>
        <SectionTitle
          kicker="Visítanos"
          title="Nuestras sucursales"
          subtitle="Te esperamos en el centro de Cocula, Jalisco."
        />
        <CardGrid>
          {BRANCHES.map((branch) => (
            <Card
              key={branch.id}
              flexBasis={420}
              maxWidth={640}
              style={[styles.branchCard, isMobile && styles.branchCardMobile]}
            >
              <View style={styles.branchHeader}>
                <Text accessibilityRole="header" style={styles.branchName}>
                  {branch.name}
                </Text>
                <View style={styles.branchTag}>
                  <Text style={styles.branchTagText}>{branch.tag}</Text>
                </View>
              </View>
              {branch.addressLines.map((line) => (
                <Text key={line} style={styles.branchAddress}>
                  {line}
                </Text>
              ))}
              <View style={[styles.mapBox, isMobile && styles.mapBoxMobile]}>
                {Platform.OS === 'web' ? (
                  <>
                    <MapEmbed
                      src={branch.mapEmbedUrl}
                      title={`${branch.name} en Google Maps`}
                      compact={isMobile}
                    />
                    {isMobile ? (
                      <Pressable
                        onPress={() => openExternalUrl(branch.mapsUrl)}
                        accessibilityRole="link"
                        accessibilityLabel={`Cómo llegar a ${branch.name}`}
                        style={styles.mobileMapLink}
                      >
                        <Ionicons name="location-outline" size={18} color={colors.primary} />
                        <Text style={styles.mapLink}>Cómo llegar</Text>
                        <Ionicons name="arrow-forward" size={16} color={colors.primary} />
                      </Pressable>
                    ) : null}
                  </>
                ) : (
                  <Pressable
                    onPress={() => openExternalUrl(branch.mapsUrl)}
                    accessibilityRole="link"
                    accessibilityLabel={`Cómo llegar a ${branch.name}`}
                    style={styles.mobileMapLink}
                  >
                    <Ionicons name="location-outline" size={18} color={colors.primary} />
                    <Text style={styles.mapLink}>Cómo llegar</Text>
                    <Ionicons name="arrow-forward" size={16} color={colors.primary} />
                  </Pressable>
                )}
              </View>
            </Card>
          ))}
        </CardGrid>
      </Section>

      {/* Información útil */}
      <Section wide style={styles.infoSection}>
        {isMobile ? (
          <Card style={styles.mobileInfoPanel}>
            {INFO_CARDS.map((card, index) => (
              <View
                key={card.title}
                style={[styles.mobileInfoRow, index > 0 && styles.mobileInfoRowBorder]}
              >
                <View style={styles.mobileInfoIcon}>
                  <Ionicons name={card.icon} size={20} color={colors.primary} />
                </View>
                <View style={styles.mobileInfoContent}>
                  <Text style={styles.mobileInfoTitle}>{card.title}</Text>
                  <Text style={styles.mobileInfoText}>{card.text}</Text>
                </View>
              </View>
            ))}
          </Card>
        ) : (
          <CardGrid>
            {INFO_CARDS.map((card) => (
              <FeatureCard
                key={card.title}
                icon={card.icon}
                title={card.title}
                description={card.text}
                centered
                compact
              />
            ))}
          </CardGrid>
        )}
      </Section>

      {/* Preguntas frecuentes */}
      <View onLayout={(event) => onFaqLayout?.(event.nativeEvent.layout.y)}>
        <Section background="blush" wide style={isMobile ? styles.mobileSection : undefined}>
          <SectionTitle
            kicker="Preguntas frecuentes"
            title="Resolvemos tus dudas"
            subtitle="Encuentra información sobre pedidos, entregas, formas de pago y atención personalizada."
            compact
          />
          <FaqAccordion compact={isMobile} />
        </Section>
      </View>

      {/* Llamada a la acción final */}
      <CtaRibbon onNavigate={onNavigate} background="alt" showMobileCatalogLink={false} />
    </View>
  );
}

const styles = StyleSheet.create({
  quickSection: {
    paddingVertical: spacing.lg,
  },
  quickSectionMobile: {
    paddingVertical: spacing.md,
  },
  mobileSection: {
    paddingVertical: spacing.lg,
  },
  mobileQuickCards: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  mobileQuickCard: {
    flex: 1,
    minWidth: 0,
    minHeight: 132,
    alignItems: 'center',
    paddingHorizontal: spacing.xs,
    paddingVertical: spacing.sm,
  },
  mobileQuickIcon: {
    width: 32,
    height: 32,
    borderRadius: radius.pill,
    backgroundColor: colors.accentSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
  },
  mobileQuickTitle: {
    color: colors.text,
    fontSize: fontSizes.caption,
    fontWeight: fontWeights.bold,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  mobileQuickLink: {
    minHeight: 32,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mobileQuickLinkText: {
    color: colors.primary,
    fontSize: 11,
    lineHeight: 15,
    fontWeight: fontWeights.semibold,
    textAlign: 'center',
  },
  mobileQuickText: {
    color: colors.textMuted,
    fontSize: 11,
    lineHeight: 16,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
  mobileActionPressed: {
    opacity: 0.82,
  },
  infoSection: {
    paddingVertical: spacing.md,
  },
  quickCard: {
    alignItems: 'center',
    padding: spacing.md,
  },
  quickIcon: {
    width: 56,
    height: 56,
    borderRadius: radius.pill,
    backgroundColor: colors.accentSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  quickTitle: {
    color: colors.text,
    fontSize: fontSizes.bodyLarge,
    fontWeight: fontWeights.bold,
    marginBottom: spacing.sm,
  },
  quickText: {
    color: colors.textMuted,
    fontSize: fontSizes.body,
    lineHeight: lineHeights.body,
    textAlign: 'center',
  },
  quickLink: {
    color: colors.primary,
    fontSize: fontSizes.body,
    fontWeight: fontWeights.semibold,
  },
  linkRow: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 44,
  },
  branchCard: {
    padding: spacing.xl,
  },
  branchCardMobile: {
    padding: spacing.md,
  },
  branchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  branchName: {
    color: colors.primary,
    fontSize: fontSizes.subtitle,
    fontWeight: fontWeights.bold,
    flexShrink: 1,
  },
  branchTag: {
    backgroundColor: colors.accentSoft,
    borderRadius: radius.pill,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
  },
  branchTagText: {
    color: colors.primary,
    fontSize: fontSizes.caption,
    fontWeight: fontWeights.bold,
    letterSpacing: letterSpacing.wide,
    textTransform: 'uppercase',
  },
  branchAddress: {
    color: colors.textMuted,
    fontSize: fontSizes.body,
    lineHeight: lineHeights.body,
  },
  mapBox: {
    backgroundColor: colors.surfaceMuted,
    borderRadius: radius.md,
    padding: spacing.lg,
    alignItems: 'center',
    marginTop: spacing.md,
  },
  mapBoxMobile: {
    padding: 0,
    alignItems: 'stretch',
    overflow: 'hidden',
  },
  mapIcon: {
    fontSize: fontSizes.title,
    marginBottom: spacing.xs,
  },
  mapIframe: {
    width: '100%',
    height: 220,
    borderWidth: 0,
    borderRadius: radius.md,
    overflow: 'hidden',
    minHeight: 220,
  },
  mapIframeMobile: {
    height: 150,
    minHeight: 150,
    borderRadius: 0,
    pointerEvents: 'none',
  },
  mapLink: {
    color: colors.primary,
    fontSize: fontSizes.small,
    fontWeight: fontWeights.semibold,
  },
  mobileMapLink: {
    minHeight: layout.minTouchTarget,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  mobileInfoPanel: {
    padding: spacing.md,
  },
  mobileInfoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
    paddingVertical: spacing.sm,
  },
  mobileInfoRowBorder: {
    borderTopWidth: borderWidth.thin,
    borderTopColor: colors.border,
    paddingTop: spacing.md,
    marginTop: spacing.xs,
  },
  mobileInfoIcon: {
    width: 40,
    height: 40,
    borderRadius: radius.pill,
    backgroundColor: colors.accentSoft,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    ...shadows.sm,
  },
  mobileInfoContent: {
    flex: 1,
  },
  mobileInfoTitle: {
    color: colors.text,
    fontSize: fontSizes.small,
    lineHeight: lineHeights.small,
    fontWeight: fontWeights.bold,
    marginBottom: spacing.xs,
  },
  mobileInfoText: {
    color: colors.textMuted,
    fontSize: fontSizes.caption,
    lineHeight: lineHeights.caption,
  },
});
