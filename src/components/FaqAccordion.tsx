import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { FAQS } from '../data/content';
import { colors, fontSizes, fontWeights, layout, lineHeights, spacing } from '../theme';
import Card from './Card';

interface FaqAccordionProps {
  compact?: boolean;
}

export default function FaqAccordion({ compact = false }: FaqAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <View style={[styles.list, compact && styles.listCompact]}>
      {FAQS.map((faq) => {
        const open = faq.id === openId;
        return (
          <Card key={faq.id} style={compact ? styles.cardCompact : undefined}>
            <Pressable
              onPress={() => setOpenId(open ? null : faq.id)}
              accessibilityRole="button"
              accessibilityLabel={faq.question}
              accessibilityState={{ expanded: open }}
              accessibilityHint={open ? 'Cierra la respuesta' : 'Muestra la respuesta'}
              style={styles.questionRow}
            >
              <Text style={[styles.question, compact && styles.questionCompact]}>
                {faq.question}
              </Text>
              <Text style={styles.chevron} accessibilityElementsHidden>
                {open ? '−' : '+'}
              </Text>
            </Pressable>
            {open ? (
              <Text style={[styles.answer, compact && styles.answerCompact]}>{faq.answer}</Text>
            ) : null}
          </Card>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    alignSelf: 'center',
    width: '100%',
    maxWidth: 960,
    gap: spacing.md,
  },
  listCompact: {
    gap: spacing.sm,
  },
  cardCompact: {
    padding: spacing.md,
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
  questionCompact: {
    fontSize: fontSizes.small,
    lineHeight: lineHeights.small,
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
  answerCompact: {
    fontSize: fontSizes.small,
    lineHeight: lineHeights.small,
    marginTop: spacing.sm,
  },
});
