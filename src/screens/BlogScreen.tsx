import React, { useMemo } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Card from '../components/Card';
import CardGrid from '../components/CardGrid';
import Section from '../components/Section';
import SectionTitle from '../components/SectionTitle';
import { BLOG_POSTS } from '../data/content';
import { useTheme } from '../hooks/useTheme';
import { fontSizes, fontWeights, letterSpacing, lineHeights, spacing } from '../theme';

export default function BlogScreen() {
  const { colors } = useTheme();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        image: {
          width: '100%',
          height: 200,
          backgroundColor: colors.surfaceMuted,
        },
        body: {
          padding: spacing.lg,
        },
        date: {
          color: colors.gold,
          fontSize: fontSizes.caption,
          fontWeight: fontWeights.bold,
          letterSpacing: letterSpacing.wider,
          textTransform: 'uppercase',
          marginBottom: spacing.xs,
        },
        title: {
          color: colors.accent,
          fontSize: fontSizes.bodyLarge,
          fontWeight: fontWeights.bold,
          lineHeight: lineHeights.bodyLarge,
          marginBottom: spacing.sm,
        },
        excerpt: {
          color: colors.textMuted,
          fontSize: fontSizes.body,
          lineHeight: lineHeights.body,
        },
      }),
    [colors],
  );
  return (
    <Section>
      <SectionTitle
        kicker="Blog"
        title="Desde la florería"
        subtitle="Consejos, guías de temporada e historias de nuestras diseñadoras."
      />
      <CardGrid>
        {BLOG_POSTS.map((post) => (
          <Card key={post.id} padded={false} flexBasis={300} maxWidth={440}>
            <Image
              source={{ uri: post.image }}
              style={styles.image}
              resizeMode="cover"
              accessible
              accessibilityLabel={`Imagen del artículo: ${post.title}`}
            />
            <View style={styles.body}>
              <Text style={styles.date}>{post.date}</Text>
              <Text accessibilityRole="header" style={styles.title}>
                {post.title}
              </Text>
              <Text style={styles.excerpt}>{post.excerpt}</Text>
            </View>
          </Card>
        ))}
      </CardGrid>
    </Section>
  );
}
