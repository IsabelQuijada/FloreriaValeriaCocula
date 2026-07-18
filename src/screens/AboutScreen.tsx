import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Card from '../components/Card';
import CardGrid from '../components/CardGrid';
import CtaRibbon from '../components/CtaRibbon';
import Section from '../components/Section';
import SectionTitle from '../components/SectionTitle';
import TrustStrip from '../components/TrustStrip';
import { ScreenName } from '../data/content';
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

export default function AboutScreen({ onNavigate }: AboutScreenProps) {
  const { isMobile } = useBreakpoint();
  const storyImage = (
    <Image
      source={require('../../assets/nosotros-fundadora.jpeg')}
      style={[styles.storyImage, isMobile && styles.storyImageMobile]}
      resizeMode="cover"
      accessible
      accessibilityLabel="Aideé Camacho, fundadora de Florería Valeria, con un ramo de rosas"
    />
  );

  return (
    <View>
      {/* Cifras de confianza */}
      <TrustStrip />

      {/* Historia */}
      <Section wide>
        <SectionTitle
          kicker="Nosotros"
          title="Nuestra historia"
          subtitle="Más de dos décadas creando momentos inolvidables."
        />

        <View style={[styles.storyRow, isMobile && styles.storyRowMobile]}>
          {isMobile ? storyImage : null}
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
          {!isMobile ? storyImage : null}
        </View>
      </Section>

      {/* Valores */}
      <Section background="alt" wide>
        <SectionTitle kicker="Lo que nos define" title="Nuestros Valores" />
        <CardGrid
          gap={isMobile ? spacing.sm : spacing.lg}
          style={isMobile ? styles.valuesGridMobile : undefined}
        >
          {VALUES.map((value) => (
            <Card
              key={value.id}
              padded={false}
              flexBasis={240}
              maxWidth={320}
              shadow="md"
              style={isMobile ? styles.valueCardMobile : undefined}
            >
              <View style={styles.valueAccentBar} />
              <View style={[styles.valueBody, isMobile && styles.valueBodyMobile]}>
                <View style={[styles.valueImageWrap, isMobile && styles.valueImageWrapMobile]}>
                  <Image
                    source={value.image}
                    style={styles.valueImage}
                    resizeMode="cover"
                    accessible
                    accessibilityLabel={`Flores que representan ${value.title.toLowerCase()}`}
                  />
                </View>
                <Text
                  accessibilityRole="header"
                  style={[styles.valueTitle, isMobile && styles.valueTitleMobile]}
                >
                  {value.title}
                </Text>
                <Text
                  style={[styles.valueText, isMobile && styles.valueTextMobile]}
                >
                  {value.text}
                </Text>
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
        <CardGrid gap={isMobile ? spacing.sm : spacing.lg}>
          {TEAM_MEMBERS.map((member) => (
            <Card
              key={member.id}
              flexBasis={320}
              maxWidth={520}
              style={[styles.teamCard, isMobile && styles.teamCardMobile]}
            >
              <View style={[styles.teamImageWrap, isMobile && styles.teamImageWrapMobile]}>
                <Image
                  source={member.image}
                  style={styles.teamImage}
                  resizeMode="cover"
                  accessible
                  accessibilityLabel={`Foto de ${member.name}`}
                />
              </View>
              <View style={[styles.teamInfo, isMobile && styles.teamInfoMobile]}>
                <Text
                  accessibilityRole="header"
                  style={[styles.teamName, isMobile && styles.teamTextMobile]}
                >
                  {member.name}
                </Text>
                <Text style={[styles.teamRole, isMobile && styles.teamTextMobile]}>
                  {member.role}
                </Text>
                <Text
                  style={[styles.teamDescription, isMobile && styles.teamDescriptionMobile]}
                >
                  {member.description}
                </Text>
              </View>
            </Card>
          ))}
        </CardGrid>
      </Section>

      {/* Llamada a la acción final */}
      <CtaRibbon onNavigate={onNavigate} background="alt" />
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
    flexBasis: 420,
    maxWidth: 720,
    justifyContent: 'center',
  },
  storyBodyMobile: {
    width: '100%',
    flexBasis: 'auto',
  },
  storyImage: {
    flexGrow: 1,
    flexBasis: 380,
    maxWidth: 560,
    height: 500,
    alignSelf: 'center',
    borderRadius: radius.lg,
    backgroundColor: colors.surfaceMuted,
    ...shadows.md,
  },
  storyImageMobile: {
    width: '100%',
    flexBasis: 'auto',
    maxWidth: 420,
    height: undefined,
    aspectRatio: 1,
  },
  storyTitle: {
    color: colors.accent,
    fontFamily: fonts.heading,
    fontSize: fontSizes.title,
    lineHeight: lineHeights.title,
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
  valuesGridMobile: {
    justifyContent: 'space-between',
  },
  valueCardMobile: {
    width: '48%',
    maxWidth: '48%',
    flexBasis: '48%',
    flexGrow: 0,
  },
  valueBody: {
    padding: spacing.lg,
    alignItems: 'center',
  },
  valueBodyMobile: {
    padding: spacing.sm,
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
  valueImageWrapMobile: {
    width: 64,
    height: 64,
    marginBottom: spacing.sm,
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
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  valueTitleMobile: {
    fontSize: fontSizes.bodyLarge,
    lineHeight: lineHeights.bodyLarge,
    marginBottom: spacing.xs,
  },
  valueText: {
    color: colors.textMuted,
    fontSize: fontSizes.body,
    lineHeight: lineHeights.body,
    textAlign: 'center',
  },
  valueTextMobile: {
    fontSize: fontSizes.caption,
    lineHeight: lineHeights.caption,
  },
  teamCard: {
    alignItems: 'center',
    padding: spacing.xl,
  },
  teamCardMobile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
  },
  teamImageWrap: {
    width: 220,
    height: 220,
    borderRadius: radius.pill,
    overflow: 'hidden',
    backgroundColor: colors.surfaceMuted,
    marginBottom: spacing.md,
  },
  teamImageWrapMobile: {
    width: 88,
    height: 88,
    marginBottom: 0,
    flexShrink: 0,
  },
  teamImage: {
    width: '100%',
    height: '100%',
  },
  teamInfo: {
    alignItems: 'center',
  },
  teamInfoMobile: {
    flex: 1,
    alignItems: 'flex-start',
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
  teamTextMobile: {
    textAlign: 'left',
  },
  teamDescription: {
    color: colors.textMuted,
    fontSize: fontSizes.body,
    lineHeight: lineHeights.body,
    textAlign: 'center',
  },
  teamDescriptionMobile: {
    fontSize: fontSizes.small,
    lineHeight: lineHeights.small,
    textAlign: 'left',
  },
});
