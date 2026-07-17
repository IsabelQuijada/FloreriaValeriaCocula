import React from 'react';
import { Image, Linking, StyleSheet, Text, View } from 'react-native';
import Button from '../components/Button';
import Card from '../components/Card';
import CardGrid from '../components/CardGrid';
import Section from '../components/Section';
import SectionTitle from '../components/SectionTitle';
import { CONTACT_INFO, ScreenName } from '../data/content';
import { useBreakpoint } from '../hooks/useBreakpoint';
import {
  colors,
  fonts,
  fontSizes,
  fontWeights,
  layout,
  lineHeights,
  radius,
  shadows,
  spacing,
} from '../theme';

interface AboutScreenProps {
  onNavigate: (screen: ScreenName) => void;
}

const STORY_INTRO =
  'En el corazón de Cocula, Jalisco, nuestra historia comenzó en el año 2000, movida por el cariño a las flores y a nuestra gente. Aideé Camacho, con el apoyo de su familia y muchas ganas de compartir belleza, abrió las puertas de Florería Valeria.';

const STORY_PARAGRAPHS = [
  'Empezamos en un pequeño local del centro, donde cada arreglo se hacía con dedicación y mucho amor. Pronto, nuestros clientes se volvieron amigos, y sus historias y celebraciones también fueron parte de la nuestra.',
  'Con el tiempo, la florería fue creciendo, pero nunca perdimos ese trato cercano y familiar. Cada ramo y cada arreglo lleva un pedacito de nosotros, acompañando bodas, quinceañeras, aniversarios, despedidas y muchos momentos importantes de la vida.',
  'Hoy, más de 20 años después, Florería Valeria sigue siendo un negocio familiar y parte de la comunidad. Seguimos trabajando con el mismo cariño y compromiso, agradecidos de ser parte de tantos recuerdos y celebraciones.',
];

const VALUES = [
  {
    id: 'pasion',
    title: 'Pasión',
    text: 'Cada arreglo floral es creado con amor y dedicación, reflejando la pasión que sentimos por nuestro arte.',
    image: require('../../assets/valor-pasion.png'),
  },
  {
    id: 'calidad',
    title: 'Calidad',
    text: 'Seleccionamos cuidadosamente las mejores flores para garantizar la frescura y belleza de cada creación.',
    image: require('../../assets/valor-calidad.png'),
  },
  {
    id: 'confianza',
    title: 'Confianza',
    text: 'Más de 20 años de experiencia nos respaldan como la florería de confianza en Cocula y sus alrededores.',
    image: require('../../assets/valor-confianza.png'),
  },
  {
    id: 'tradicion',
    title: 'Tradición',
    text: 'Honramos las tradiciones florales mexicanas mientras incorporamos técnicas y estilos contemporáneos.',
    image: require('../../assets/valor-tradicion.png'),
  },
];

const TEAM_MEMBERS = [
  {
    id: 'aidee',
    name: 'Aideé Camacho',
    role: 'Fundadora y Diseñadora Principal',
    description:
      'Con más de 20 años de experiencia, Aideé sigue siendo el corazón creativo de la florería.',
    image: require('../../assets/equipo-aidee.png'),
  },
  {
    id: 'alberto',
    name: 'Alberto Anguiano',
    role: 'Artistas Florales',
    description:
      'Un equipo comprometido con la excelencia y la atención personalizada en cada proyecto.',
    image: require('../../assets/equipo-alberto.png'),
  },
];

export default function AboutScreen({ onNavigate: _onNavigate }: AboutScreenProps) {
  const { isMobile } = useBreakpoint();

  return (
    <View>
      {/* Historia */}
      <Section>
        <SectionTitle
          kicker="Nosotros"
          title="Nuestra historia"
          subtitle="Más de dos décadas creando momentos inolvidables."
        />

        <View style={[styles.storyRow, isMobile && styles.storyRowMobile]}>
          <View style={[styles.storyBody, isMobile && styles.storyBodyMobile]}>
            <Text accessibilityRole="header" style={styles.storyTitle}>
              La Historia de Florería Valeria
            </Text>
            <Text style={styles.storyIntro}>{STORY_INTRO}</Text>
            {STORY_PARAGRAPHS.map((paragraph) => (
              <Text key={paragraph} style={styles.storyText}>
                {paragraph}
              </Text>
            ))}
          </View>
          <Image
            source={require('../../assets/nosotros-fundadora.jpeg')}
            style={[styles.storyImage, isMobile && styles.storyImageMobile]}
            resizeMode="cover"
            accessible
            accessibilityLabel="Aideé Camacho, fundadora de Florería Valeria, con un ramo de rosas"
          />
        </View>
      </Section>

      {/* Valores */}
      <Section background="alt">
        <SectionTitle kicker="Lo que nos define" title="Nuestros Valores" />
        <CardGrid>
          {VALUES.map((value) => (
            <Card key={value.id} padded={false} flexBasis={240} maxWidth={320} shadow="md">
              <View style={styles.valueAccentBar} />
              <View style={styles.valueBody}>
                <View style={styles.valueImageWrap}>
                  <Image
                    source={value.image}
                    style={styles.valueImage}
                    resizeMode="cover"
                    accessible
                    accessibilityLabel={`Flores que representan ${value.title.toLowerCase()}`}
                  />
                </View>
                <Text accessibilityRole="header" style={styles.valueTitle}>
                  {value.title}
                </Text>
                <Text style={styles.valueText}>{value.text}</Text>
              </View>
            </Card>
          ))}
        </CardGrid>
      </Section>

      {/* Equipo */}
      <Section background="blush">
        <SectionTitle
          kicker="Quiénes somos"
          title="Nuestro Equipo"
          subtitle="Detrás de cada arreglo floral hay un equipo de artistas apasionados por su trabajo, comprometidos con brindar la mejor experiencia a nuestros clientes."
        />
        <CardGrid>
          {TEAM_MEMBERS.map((member) => (
            <Card key={member.id} flexBasis={320} maxWidth={520} style={styles.teamCard}>
              <View style={styles.teamImageWrap}>
                <Image
                  source={member.image}
                  style={styles.teamImage}
                  resizeMode="cover"
                  accessible
                  accessibilityLabel={`Foto de ${member.name}`}
                />
              </View>
              <Text accessibilityRole="header" style={styles.teamName}>
                {member.name}
              </Text>
              <Text style={styles.teamRole}>{member.role}</Text>
              <Text style={styles.teamDescription}>{member.description}</Text>
            </Card>
          ))}
        </CardGrid>
      </Section>

      {/* Cinta de cierre */}
      <Section background="dark">
        <View style={styles.ribbon}>
          <Text accessibilityRole="header" style={styles.ribbonTitle}>
            Tu cómplice floral
          </Text>
          <Text style={styles.ribbonText}>
            Flores frescas, diseños únicos y entregas a tiempo, siempre con amor.
          </Text>
          <Button
            label="Contáctanos"
            variant="soft"
            onPress={() => Linking.openURL(CONTACT_INFO.whatsappUrl)}
            style={isMobile && styles.mobileButton}
          />
        </View>
      </Section>
    </View>
  );
}

const styles = StyleSheet.create({
  storyRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xl,
    justifyContent: 'center',
  },
  storyRowMobile: {
    gap: spacing.lg,
  },
  storyBody: {
    flexGrow: 1,
    flexBasis: 300,
    maxWidth: 560,
    justifyContent: 'center',
  },
  storyBodyMobile: {
    width: '100%',
    flexBasis: 'auto',
  },
  storyImage: {
    flexGrow: 1,
    flexBasis: 300,
    maxWidth: 420,
    height: 560,
    alignSelf: 'center',
    borderRadius: radius.lg,
    backgroundColor: colors.surfaceMuted,
    ...shadows.md,
  },
  storyImageMobile: {
    width: '100%',
    flexBasis: 'auto',
    maxWidth: 420,
    height: 480,
  },
  storyTitle: {
    color: colors.accent,
    fontFamily: fonts.heading,
    fontSize: fontSizes.title,
    lineHeight: lineHeights.title,
    fontWeight: fontWeights.bold,
    marginBottom: spacing.md,
  },
  storyIntro: {
    color: colors.primary,
    fontSize: fontSizes.bodyLarge,
    lineHeight: lineHeights.bodyLarge + 4,
    fontWeight: fontWeights.medium,
    marginBottom: spacing.md,
  },
  storyText: {
    color: colors.textMuted,
    fontSize: fontSizes.body,
    lineHeight: lineHeights.body + 2,
    marginBottom: spacing.md,
  },
  valueAccentBar: {
    height: 4,
    backgroundColor: colors.primaryLight,
  },
  valueBody: {
    padding: spacing.lg,
    alignItems: 'center',
  },
  valueImageWrap: {
    width: 120,
    height: 120,
    borderRadius: radius.pill,
    overflow: 'hidden',
    backgroundColor: colors.accentSoft,
    marginBottom: spacing.md,
    ...shadows.md,
  },
  valueImage: {
    width: '100%',
    height: '100%',
  },
  valueTitle: {
    color: colors.accent,
    fontFamily: fonts.heading,
    fontSize: fontSizes.subtitle,
    lineHeight: lineHeights.subtitle,
    fontWeight: fontWeights.bold,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  valueText: {
    color: colors.textMuted,
    fontSize: fontSizes.body,
    lineHeight: lineHeights.body,
    textAlign: 'center',
  },
  teamCard: {
    alignItems: 'center',
    padding: spacing.xl,
  },
  teamImageWrap: {
    width: 220,
    height: 220,
    borderRadius: radius.pill,
    overflow: 'hidden',
    backgroundColor: colors.surfaceMuted,
    marginBottom: spacing.md,
  },
  teamImage: {
    width: '100%',
    height: '100%',
  },
  teamName: {
    color: colors.primary,
    fontSize: fontSizes.bodyLarge,
    fontWeight: fontWeights.bold,
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  teamRole: {
    color: colors.primary,
    fontSize: fontSizes.small,
    fontWeight: fontWeights.semibold,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  teamDescription: {
    color: colors.textMuted,
    fontSize: fontSizes.body,
    lineHeight: lineHeights.body,
    textAlign: 'center',
  },
  mobileButton: {
    alignSelf: 'stretch',
  },
  ribbon: {
    alignItems: 'center',
    alignSelf: 'center',
    width: '100%',
    maxWidth: layout.textMaxWidth,
  },
  ribbonTitle: {
    color: colors.champagne,
    fontFamily: fonts.heading,
    fontSize: fontSizes.title,
    lineHeight: lineHeights.title,
    fontWeight: fontWeights.bold,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  ribbonText: {
    color: colors.textOnDark,
    fontSize: fontSizes.bodyLarge,
    lineHeight: lineHeights.bodyLarge,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
});
