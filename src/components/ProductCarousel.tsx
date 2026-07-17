import { Ionicons } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useBreakpoint } from '../hooks/useBreakpoint';
import { colors, layout, radius, shadows, spacing } from '../theme';
import ProductCard, { ProductCardData } from './ProductCard';

interface ProductCarouselProps {
  products: ProductCardData[];
  onContact: (product: ProductCardData) => void;
}

export default function ProductCarousel({ products, onContact }: ProductCarouselProps) {
  const scrollRef = useRef<ScrollView>(null);
  const scrollX = useRef(0);
  const [hoveredArrow, setHoveredArrow] = useState<-1 | 1 | null>(null);
  const { width, isMobile, isTablet } = useBreakpoint();
  const cardWidth = isTablet ? 272 : Math.min(280, width - spacing.xl);
  const scrollStep = (cardWidth + spacing.lg) * (isTablet ? 2 : 1);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    scrollX.current = event.nativeEvent.contentOffset.x;
  };

  const move = (direction: -1 | 1) => {
    scrollRef.current?.scrollTo({
      x: Math.max(0, scrollX.current + direction * scrollStep),
      animated: true,
    });
  };

  return (
    <View style={styles.shell}>
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        snapToInterval={cardWidth + spacing.lg}
        decelerationRate="fast"
        contentContainerStyle={[styles.content, isMobile && styles.contentMobile]}
        accessibilityLabel="Productos favoritos"
      >
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onContact={onContact}
            style={{ width: cardWidth, minHeight: isTablet ? 510 : 480 }}
          />
        ))}
      </ScrollView>

      {!isMobile ? <Pressable
        onPress={() => move(-1)}
        onHoverIn={() => setHoveredArrow(-1)}
        onHoverOut={() => setHoveredArrow(null)}
        accessibilityRole="button"
        accessibilityLabel="Ver productos anteriores"
        style={({ pressed }) => [
          styles.arrow,
          styles.arrowLeft,
          hoveredArrow === -1 && styles.arrowHovered,
          pressed && styles.arrowPressed,
        ]}
      >
        <Ionicons
          name="chevron-back"
          size={24}
          color={hoveredArrow === -1 ? colors.white : colors.primary}
        />
      </Pressable> : null}
      {!isMobile ? <Pressable
        onPress={() => move(1)}
        onHoverIn={() => setHoveredArrow(1)}
        onHoverOut={() => setHoveredArrow(null)}
        accessibilityRole="button"
        accessibilityLabel="Ver productos siguientes"
        style={({ pressed }) => [
          styles.arrow,
          styles.arrowRight,
          hoveredArrow === 1 && styles.arrowHovered,
          pressed && styles.arrowPressed,
        ]}
      >
        <Ionicons
          name="chevron-forward"
          size={24}
          color={hoveredArrow === 1 ? colors.white : colors.primary}
        />
      </Pressable> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  shell: {
    position: 'relative',
    marginHorizontal: -layout.gutter,
  },
  content: {
    gap: spacing.lg,
    paddingHorizontal: spacing.xxl,
    paddingBottom: spacing.md,
    alignItems: 'stretch',
  },
  contentMobile: {
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  arrow: {
    position: 'absolute',
    top: 220,
    width: layout.minTouchTarget,
    height: layout.minTouchTarget,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
    ...shadows.md,
  },
  arrowLeft: {
    left: spacing.sm,
  },
  arrowRight: {
    right: spacing.sm,
  },
  arrowPressed: {
    backgroundColor: colors.accentSoft,
  },
  arrowHovered: {
    backgroundColor: colors.primary,
    transform: [{ scale: 1.06 }],
    ...shadows.lg,
  },
});
