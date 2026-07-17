import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import Button from '../components/Button';
import Card from '../components/Card';
import CardGrid from '../components/CardGrid';
import FeatureCard from '../components/FeatureCard';
import FormField from '../components/FormField';
import Notice from '../components/Notice';
import Section from '../components/Section';
import SectionTitle from '../components/SectionTitle';
import { CONTACT_INFO, whatsappUrl } from '../data/content';
import { useBreakpoint } from '../hooks/useBreakpoint';
import {
  colors,
  fontSizes,
  fontWeights,
  letterSpacing,
  lineHeights,
  radius,
  spacing,
} from '../theme';

const BRANCHES = [
  {
    id: 'centro',
    name: 'Sucursal Centro',
    tag: 'Principal',
    addressLines: ['5 de Mayo 59,', 'Col. Centro, Cocula, Jal., México', 'C.P. 48500'],
    mapsUrl: CONTACT_INFO.mapsUrl,
  },
  {
    id: 'ocampo',
    name: 'Sucursal Ocampo',
    tag: 'Sucursal',
    addressLines: ['Ocampo 35,', 'Col. Centro, Cocula, Jal., México', 'C.P. 48500'],
    mapsUrl: CONTACT_INFO.mapsUrlOcampo,
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
];

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
    <Card flexBasis={260} maxWidth={360} style={styles.quickCard}>
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

export default function ContactScreen() {
  const { isMobile } = useBreakpoint();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSend = () => {
    if (!name.trim() || !phone.trim() || !message.trim()) {
      setError('Por favor completa todos los campos antes de enviar.');
      return;
    }
    setError(null);
    setSent(true);
    Linking.openURL(
      whatsappUrl(
        `Hola, soy ${name.trim()}. ${message.trim()} — Mi teléfono: ${phone.trim()}`,
      ),
    );
  };

  return (
    <View>
      {/* Contacto rápido */}
      <Section>
        <SectionTitle
          kicker="Contacto"
          title="Contáctanos"
          subtitle="Cuéntanos cómo imaginas tu evento y nosotros lo haremos realidad."
        />

        <CardGrid>
          <QuickCard icon="call-outline" title="Teléfonos">
            <Pressable
              onPress={() => Linking.openURL(CONTACT_INFO.phoneHref)}
              accessibilityRole="link"
              accessibilityLabel={`Llamar al ${CONTACT_INFO.phoneDisplay}`}
              style={styles.linkRow}
            >
              <Text style={styles.quickLink}>{CONTACT_INFO.phoneDisplay}</Text>
            </Pressable>
            <Pressable
              onPress={() => Linking.openURL(CONTACT_INFO.phone2Href)}
              accessibilityRole="link"
              accessibilityLabel={`Llamar al ${CONTACT_INFO.phone2Display}`}
              style={styles.linkRow}
            >
              <Text style={styles.quickLink}>{CONTACT_INFO.phone2Display}</Text>
            </Pressable>
          </QuickCard>

          <QuickCard icon="logo-whatsapp" title="WhatsApp">
            <Pressable
              onPress={() => Linking.openURL(CONTACT_INFO.whatsappUrl)}
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
      </Section>

      {/* Sucursales */}
      <Section background="alt">
        <SectionTitle
          kicker="Visítanos"
          title="Nuestras sucursales"
          subtitle="Te esperamos en el centro de Cocula, Jalisco."
        />
        <CardGrid>
          {BRANCHES.map((branch) => (
            <Card key={branch.id} flexBasis={300} maxWidth={440} style={styles.branchCard}>
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
              <View style={styles.mapBox}>
                <Text style={styles.mapIcon} accessibilityElementsHidden>
                  📍
                </Text>
                <Pressable
                  onPress={() => Linking.openURL(branch.mapsUrl)}
                  accessibilityRole="link"
                  accessibilityLabel={`Ver ${branch.name} en Google Maps`}
                  style={styles.linkRow}
                >
                  <Text style={styles.mapLink}>Ver en Google Maps ›</Text>
                </Pressable>
              </View>
            </Card>
          ))}
        </CardGrid>
      </Section>

      {/* Información útil */}
      <Section>
        <CardGrid>
          {INFO_CARDS.map((card) => (
            <FeatureCard
              key={card.title}
              icon={card.icon}
              title={card.title}
              description={card.text}
              centered
            />
          ))}
        </CardGrid>
      </Section>

      {/* Formulario por WhatsApp */}
      <Section background="blush">
        <View style={styles.formWrap}>
          <Card maxWidth={560} style={[styles.formCard, isMobile && styles.formCardMobile]}>
            <Text accessibilityRole="header" style={styles.formTitle}>
              Envíanos un mensaje
            </Text>

            {sent ? (
              <Notice variant="success" style={styles.formNotice}>
                {`Abrimos WhatsApp con tu mensaje listo para enviar. ¿No se abrió? Escríbenos al ${CONTACT_INFO.whatsappDisplay} o llámanos al ${CONTACT_INFO.phoneDisplay}.`}
              </Notice>
            ) : null}
            {error ? (
              <Notice variant="error" style={styles.formNotice}>
                {error}
              </Notice>
            ) : null}

            <FormField
              label="Nombre"
              value={name}
              onChangeText={setName}
              placeholder="Tu nombre"
              autoComplete="name"
            />
            <FormField
              label="Teléfono"
              value={phone}
              onChangeText={setPhone}
              placeholder="Tu número de contacto"
              keyboardType="phone-pad"
              autoComplete="tel"
            />
            <FormField
              label="Mensaje"
              value={message}
              onChangeText={setMessage}
              placeholder="¿Cómo podemos ayudarte?"
              multiline
              numberOfLines={5}
            />

            <Button label="Enviar por WhatsApp" onPress={handleSend} style={styles.sendButton} />
          </Card>
        </View>
      </Section>
    </View>
  );
}

const styles = StyleSheet.create({
  quickCard: {
    alignItems: 'center',
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
  mapIcon: {
    fontSize: fontSizes.title,
    marginBottom: spacing.xs,
  },
  mapLink: {
    color: colors.primary,
    fontSize: fontSizes.body,
    fontWeight: fontWeights.semibold,
  },
  formWrap: {
    alignItems: 'center',
  },
  formCard: {
    width: '100%',
    padding: spacing.xl,
  },
  formCardMobile: {
    padding: spacing.lg,
  },
  formTitle: {
    color: colors.text,
    fontSize: fontSizes.subtitle,
    fontWeight: fontWeights.bold,
    marginBottom: spacing.lg,
  },
  formNotice: {
    marginBottom: spacing.md,
  },
  sendButton: {
    alignSelf: 'stretch',
    marginTop: spacing.sm,
  },
});
