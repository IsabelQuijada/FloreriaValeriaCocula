import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Card from '../components/Card';
import CardGrid from '../components/CardGrid';
import Section from '../components/Section';
import SectionTitle from '../components/SectionTitle';
import { GALLERY_IMAGES } from '../data/content';
import { colors, fontSizes, spacing } from '../theme';

export default function GalleryScreen() {
  return (
    <Section>
      <SectionTitle
        kicker="Galería"
        title="Nuestro trabajo reciente"
        subtitle="Una muestra de los arreglos que salen de la florería cada día. Síguenos en redes para ver más."
      />
      <CardGrid gap={spacing.md}>
        {GALLERY_IMAGES.map((item) => (
          <Card key={item.id} padded={false} flexBasis={260} maxWidth={360}>
            <Image
              source={{ uri: item.uri }}
              style={styles.image}
              resizeMode="cover"
              accessible
              accessibilityLabel={item.caption}
            />
            <View style={styles.captionBar}>
              <Text style={styles.caption}>{item.caption}</Text>
            </View>
          </Card>
        ))}
      </CardGrid>
    </Section>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 260,
    backgroundColor: colors.surfaceMuted,
  },
  captionBar: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  caption: {
    color: colors.textMuted,
    fontSize: fontSizes.body,
    fontStyle: 'italic',
  },
});
