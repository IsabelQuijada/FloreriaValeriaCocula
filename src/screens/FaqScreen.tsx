import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Card from '../components/Card';
import Section from '../components/Section';
import SectionTitle from '../components/SectionTitle';
import { CONTACT_INFO, FAQS } from '../data/content';
import { colors, fontSizes, fontWeights, layout, lineHeights, spacing } from '../theme';

export default function FaqScreen() {
  const [openId, setOpenId] = useState<string | null>(FAQS[0]?.id ?? null);

  return (
    <Section>
      <SectionTitle
        kicker="Preguntas Frecuentes"
        title="¿En qué te ayudamos?"
        subtitle={`¿No encuentras tu respuesta? Llámanos al ${CONTACT_INFO.phoneDisplay} — con gusto te atendemos.`}
      />
      <View style={styles.list}>
        {FAQS.map((faq) => {
          const open = faq.id === openId;
          return (
            <Card key={faq.id}>
              <Pressable
                onPress={() => setOpenId(open ? null : faq.id)}
                accessibilityRole="button"
                accessibilityLabel={faq.question}
                accessibilityState={{ expanded: open }}
                accessibilityHint={open ? 'Cierra la respuesta' : 'Muestra la respuesta'}
                style={styles.questionRow}
              >
                <Text style={styles.question}>{faq.question}</Text>
                <Text style={styles.chevron} accessibilityElementsHidden>
                  {open ? '−' : '+'}
                </Text>
              </Pressable>
              {open ? <Text style={styles.answer}>{faq.answer}</Text> : null}
            </Card>
          );
        })}
      </View>
    </Section>
  );
}

const styles = StyleSheet.create({
  list: {
    alignSelf: 'center',
    width: '100%',
    maxWidth: 720,
    gap: spacing.md,
  },
  questionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
    minHeight: layout.minTouchTarget,
  },
  question: {
    color: colors.text,
    fontSize: fontSizes.bodyLarge,
    fontWeight: fontWeights.bold,
    lineHeight: lineHeights.bodyLarge,
    flexShrink: 1,
  },
  chevron: {
    color: colors.accent,
    fontSize: fontSizes.title,
    fontWeight: fontWeights.bold,
    lineHeight: lineHeights.title,
  },
  answer: {
    color: colors.textMuted,
    fontSize: fontSizes.body,
    lineHeight: lineHeights.body,
    marginTop: spacing.md,
  },
});
