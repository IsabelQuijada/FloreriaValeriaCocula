import { Ionicons } from '@expo/vector-icons';
import React, { useMemo, useState } from 'react';
import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import CardGrid from '../components/CardGrid';
import Notice from '../components/Notice';
import ProductCard, { ProductCardData } from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import Section from '../components/Section';
import SectionTitle from '../components/SectionTitle';
import { getCategoryBySlug, getSubcategories } from '../data/categories';
import { CONTACT_INFO, ScreenName, whatsappProductUrl } from '../data/content';
import { getProductsBySubcategory, Product } from '../data/productsData';
import {
  colors,
  fontSizes,
  fontWeights,
  layout,
  radius,
  spacing,
} from '../theme';

interface CategoryScreenProps {
  categorySlug: string;
  onNavigate: (screen: ScreenName) => void;
}

function toCardData(product: Product, badge: string): ProductCardData {
  return {
    id: product.id,
    name: product.name,
    image: product.cloudinaryUrl,
    badge,
    description: product.description,
  };
}

/** Página de una categoría del catálogo: solo sus subcategorías como filtros. */
export default function CategoryScreen({ categorySlug, onNavigate }: CategoryScreenProps) {
  const [subcategorySlug, setSubcategorySlug] = useState('all');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [contacted, setContacted] = useState<ProductCardData | null>(null);

  const category = getCategoryBySlug(categorySlug);
  const subcategories = getSubcategories(categorySlug);

  const products = useMemo(
    () => getProductsBySubcategory(categorySlug, subcategorySlug),
    [categorySlug, subcategorySlug],
  );

  if (!category) {
    return (
      <Section>
        <SectionTitle
          kicker="Catálogo"
          title="Categoría no encontrada"
          subtitle="La categoría que buscas no existe. Vuelve al catálogo para explorar nuestras ocasiones."
        />
      </Section>
    );
  }

  const selected = selectedIndex != null ? products[selectedIndex] : null;

  const handleContact = (product: ProductCardData) => {
    setContacted(product);
    setSelectedIndex(null);
    Linking.openURL(whatsappProductUrl(product.name));
  };

  return (
    <Section>
      <Pressable
        onPress={() => onNavigate('Shop')}
        accessibilityRole="button"
        accessibilityLabel="Volver al catálogo"
        style={({ pressed }) => [styles.backLink, pressed && styles.backLinkPressed]}
      >
        <Ionicons name="arrow-back" size={16} color={colors.primary} />
        <Text style={styles.backLabel}>Volver al catálogo</Text>
      </Pressable>

      <SectionTitle kicker="Catálogo" title={category.name} subtitle={category.description} />

      {/* Filtro de subcategorías de esta categoría */}
      {subcategories.length > 1 ? (
        <View style={styles.filters} accessibilityRole="tablist">
          {[{ slug: 'all', name: 'Todos' }, ...subcategories].map((sub) => {
            const active = sub.slug === subcategorySlug;
            return (
              <Pressable
                key={sub.slug}
                onPress={() => {
                  setSubcategorySlug(sub.slug);
                  setSelectedIndex(null);
                }}
                accessibilityRole="tab"
                accessibilityLabel={`Filtrar por ${sub.name}`}
                accessibilityState={{ selected: active }}
                style={[styles.filterChip, active && styles.filterChipActive]}
              >
                <Text style={[styles.filterLabel, active && styles.filterLabelActive]}>
                  {sub.name}
                </Text>
              </Pressable>
            );
          })}
        </View>
      ) : null}

      {contacted ? (
        <Notice variant="success" style={styles.orderNotice}>
          {`Abrimos WhatsApp para preguntar por “${contacted.name}”. ¿No se abrió? Escríbenos al ${CONTACT_INFO.whatsappDisplay} o llámanos al ${CONTACT_INFO.phoneDisplay}.`}
        </Notice>
      ) : null}

      {products.length === 0 ? (
        <Text style={styles.emptyState}>No se encontraron productos para este filtro.</Text>
      ) : (
        <CardGrid>
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={toCardData(product, category.name)}
              onContact={handleContact}
              onPress={() => setSelectedIndex(index)}
            />
          ))}
        </CardGrid>
      )}

      <ProductModal
        product={selected ? toCardData(selected, category.name) : null}
        onClose={() => setSelectedIndex(null)}
        onContact={handleContact}
        onPrev={() => setSelectedIndex((i) => (i != null && i > 0 ? i - 1 : i))}
        onNext={() =>
          setSelectedIndex((i) => (i != null && i < products.length - 1 ? i + 1 : i))
        }
        canPrev={selectedIndex != null && selectedIndex > 0}
        canNext={selectedIndex != null && selectedIndex < products.length - 1}
      />
    </Section>
  );
}

const styles = StyleSheet.create({
  backLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    alignSelf: 'flex-start',
    minHeight: layout.minTouchTarget,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.pill,
    marginBottom: spacing.sm,
  },
  backLinkPressed: {
    backgroundColor: colors.accentSoft,
  },
  backLabel: {
    color: colors.primary,
    fontSize: fontSizes.small,
    fontWeight: fontWeights.semibold,
  },
  filters: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
  filterChip: {
    minHeight: layout.minTouchTarget,
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    borderRadius: radius.pill,
    backgroundColor: colors.accentSoft,
  },
  filterChipActive: {
    backgroundColor: colors.primary,
  },
  filterLabel: {
    color: colors.primary,
    fontSize: fontSizes.small,
    fontWeight: fontWeights.semibold,
  },
  filterLabelActive: {
    color: colors.textOnDark,
  },
  orderNotice: {
    alignSelf: 'center',
    maxWidth: layout.textMaxWidth,
    marginBottom: spacing.lg,
  },
  emptyState: {
    color: colors.textMuted,
    fontSize: fontSizes.body,
    textAlign: 'center',
    paddingVertical: spacing.xl,
  },
});
