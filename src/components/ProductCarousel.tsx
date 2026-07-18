import { Ionicons } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { useBreakpoint } from '../hooks/useBreakpoint';
import { borderWidth, colors, layout, radius, shadows, spacing } from '../theme';
import ProductCard, { ProductCardData } from './ProductCard';

interface ProductCarouselProps {
  products: ProductCardData[];
  onContact: (product: ProductCardData) => void;
  onSelectProduct?: (product: ProductCardData, index: number) => void;
}

export default function ProductCarousel({
  products,
  onContact,
  onSelectProduct,
}: ProductCarouselProps) {
  const scrollRef = useRef<ScrollView>(null);
  const scrollX = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredArrow, setHoveredArrow] = useState<-1 | 1 | null>(null);
  const { width, isMobile, isTablet, isDesktop } = useBreakpoint();
  const cardWidth = isDesktop ? 240 : isTablet ? 272 : Math.min(320, width * 0.82);
  const visibleCardsPerStep = isDesktop ? 5 : isTablet ? 2 : 1;
  const scrollStep = (cardWidth + spacing.lg) * visibleCardsPerStep;

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    scrollX.current = event.nativeEvent.contentOffset.x;
    if (isMobile) {
      const index = Math.round(scrollX.current / (cardWidth + spacing.md));
      setActiveIndex(Math.min(Math.max(index, 0), products.length - 1));
    }
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
        {products.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            onContact={onContact}
            onPress={onSelectProduct ? () => onSelectProduct(product, index) : undefined}
            compactMobile={isMobile}
            style={{ width: cardWidth, minHeight: isTablet ? 434 : undefined }}
          />
        ))}
      </ScrollView>

      {isMobile ? (
        <View
          pointerEvents="box-none"
          style={[styles.mobileControls, { top: cardWidth * (3 / 8) - layout.minTouchTarget / 2 }]}
          accessibilityLabel="Controles del carrusel"
        >
          <Pressable
            onPress={() => move(-1)}
            disabled={activeIndex === 0}
            accessibilityRole="button"
            accessibilityLabel="Ver producto anterior"
            accessibilityState={{ disabled: activeIndex === 0 }}
            style={({ pressed }) => [
              styles.mobileArrow,
              activeIndex === 0 && styles.mobileArrowDisabled,
              pressed && activeIndex > 0 && styles.mobileArrowPressed,
            ]}
          >
            <Ionicons
              name="arrow-back"
              size={20}
              color={activeIndex === 0 ? colors.disabledText : colors.primary}
            />
          </Pressable>
          <Pressable
            onPress={() => move(1)}
            disabled={activeIndex >= products.length - 1}
            accessibilityRole="button"
            accessibilityLabel="Ver producto siguiente"
            accessibilityState={{ disabled: activeIndex >= products.length - 1 }}
            style={({ pressed }) => [
              styles.mobileArrow,
              activeIndex >= products.length - 1 && styles.mobileArrowDisabled,
              pressed && activeIndex < products.length - 1 && styles.mobileArrowPressed,
            ]}
          >
            <Ionicons
              name="arrow-forward"
              size={20}
              color={
                activeIndex >= products.length - 1 ? colors.disabledText : colors.primary
              }
            />
          </Pressable>
        </View>
      ) : null}

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
  mobileControls: {
    position: 'absolute',
    left: spacing.sm,
    right: spacing.sm,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 3,
  },
  mobileArrow: {
    width: layout.minTouchTarget,
    height: layout.minTouchTarget,
    borderWidth: borderWidth.thin,
    borderColor: colors.primary,
    borderRadius: radius.pill,
    backgroundColor: colors.secondaryButton,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.sm,
  },
  mobileArrowDisabled: {
    borderColor: colors.borderStrong,
    backgroundColor: colors.heroPanel,
    opacity: 0.55,
  },
  mobileArrowPressed: {
    backgroundColor: colors.heroPanel,
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
