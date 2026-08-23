import { Ionicons } from '@expo/vector-icons';
import React, { useMemo, useState } from 'react';
import {
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Button from '../components/Button';
import CardGrid from '../components/CardGrid';
import CtaRibbon from '../components/CtaRibbon';
import Notice from '../components/Notice';
import ProductCard, { ProductCardData } from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import Section from '../components/Section';
import SectionTitle from '../components/SectionTitle';
import {
  ALL_CATALOG,
  filterCatalog,
  getCategoryCounts,
  getSubcategoryCounts,
  toProductCardData,
} from '../data/catalog';
import { CATEGORIES, getCategoryBySlug } from '../data/categories';
import { CONTACT_INFO, ScreenName, whatsappProductUrl } from '../data/content';
import { useBreakpoint } from '../hooks/useBreakpoint';
import { useProductQuickView } from '../hooks/useProductQuickView';
import { useTheme } from '../hooks/useTheme';
import { openExternalUrl } from '../utils/links';
import { borderWidth, fontSizes, fontWeights, layout, lineHeights, radius, spacing } from '../theme';

/** Productos que se agregan al grid con cada "Ver más". */
const PAGE_SIZE = 24;

interface CatalogScreenProps {
  onNavigate: (screen: ScreenName) => void;
  initialCategorySlug?: string;
}

export default function CatalogScreen({
  onNavigate,
  initialCategorySlug = 'all',
}: CatalogScreenProps) {
  const { isDesktop, isMobile } = useBreakpoint();
  const { colors, shadows, textPresets } = useTheme();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        desktopLayout: {
          flexDirection: 'row',
          alignItems: 'flex-start',
          gap: spacing.xl,
        },
        sidebar: {
          width: 264,
          flexShrink: 0,
          gap: spacing.xxs,
        },
        sidebarKicker: {
          ...textPresets.kicker,
          marginTop: spacing.md,
          marginBottom: spacing.xs,
        },
        searchBox: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: spacing.sm,
          borderWidth: borderWidth.thin,
          borderColor: colors.border,
          borderRadius: radius.pill,
          backgroundColor: colors.surface,
          paddingHorizontal: spacing.md,
          minHeight: layout.minTouchTarget,
        },
        searchInput: {
          flex: 1,
          color: colors.text,
          fontSize: fontSizes.small,
          paddingVertical: 0,
          ...Platform.select({
            web: {
              outlineStyle: 'none',
            } as object,
          }),
        },
        searchBoxFocused: {
          borderColor: colors.focus,
        },
        filterRow: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: spacing.sm,
          minHeight: 40,
          paddingHorizontal: spacing.sm,
          borderRadius: radius.sm,
        },
        filterRowIndented: {
          paddingLeft: spacing.md,
        },
        filterRowActive: {
          backgroundColor: colors.accentSoft,
        },
        filterRowLabel: {
          color: colors.text,
          fontSize: fontSizes.small,
          flexShrink: 1,
        },
        filterRowLabelActive: {
          color: colors.primary,
          fontWeight: fontWeights.semibold,
        },
        filterRowCount: {
          color: colors.textMuted,
          fontSize: fontSizes.caption,
        },
        filterRowCountActive: {
          color: colors.primary,
        },
        subList: {
          borderLeftWidth: borderWidth.thin,
          borderLeftColor: colors.border,
          marginLeft: spacing.sm,
          marginBottom: spacing.xs,
        },
        chipsBlock: {
          gap: spacing.sm,
          marginBottom: spacing.lg,
        },
        chipsRow: {
          gap: spacing.sm,
          paddingVertical: spacing.xxs,
        },
        chip: {
          minHeight: layout.minTouchTarget,
          justifyContent: 'center',
          paddingHorizontal: spacing.lg,
          borderRadius: radius.pill,
          borderWidth: borderWidth.thin,
          borderColor: colors.primary,
          backgroundColor: colors.surface,
        },
        chipActive: {
          backgroundColor: colors.primary,
        },
        chipLabel: {
          color: colors.primary,
          fontSize: fontSizes.small,
          fontWeight: fontWeights.semibold,
        },
        chipLabelActive: {
          color: colors.textOnDark,
        },
        subChip: {
          minHeight: 40,
          justifyContent: 'center',
          paddingHorizontal: spacing.md,
          borderRadius: radius.pill,
          backgroundColor: colors.accentSoft,
        },
        subChipActive: {
          backgroundColor: colors.primaryDark,
        },
        subChipLabel: {
          color: colors.primary,
          fontSize: fontSizes.caption,
          fontWeight: fontWeights.semibold,
        },
        subChipLabelActive: {
          color: colors.textOnDark,
        },
        mobileFilterBar: {
          gap: spacing.sm,
          marginBottom: spacing.lg,
        },
        filterTrigger: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: spacing.sm,
          minHeight: layout.minTouchTarget,
          paddingHorizontal: spacing.md,
          borderRadius: radius.pill,
          borderWidth: borderWidth.thin,
          borderColor: colors.primary,
          backgroundColor: colors.surface,
        },
        filterTriggerLabel: {
          flex: 1,
          color: colors.primary,
          fontSize: fontSizes.small,
          fontWeight: fontWeights.semibold,
        },
        filterBadge: {
          minWidth: 20,
          height: 20,
          borderRadius: radius.pill,
          backgroundColor: colors.primary,
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: spacing.xxs,
        },
        filterBadgeText: {
          color: colors.textOnDark,
          fontSize: fontSizes.caption,
          fontWeight: fontWeights.bold,
        },
        sheetBackdrop: {
          flex: 1,
          backgroundColor: colors.overlayDark,
          justifyContent: 'flex-end',
        },
        sheetPanel: {
          backgroundColor: colors.surface,
          borderTopLeftRadius: radius.lg,
          borderTopRightRadius: radius.lg,
          maxHeight: '80%',
          paddingTop: spacing.sm,
          paddingHorizontal: spacing.lg,
          paddingBottom: spacing.lg,
          ...shadows.lg,
        },
        sheetHandle: {
          width: 40,
          height: 4,
          borderRadius: radius.pill,
          backgroundColor: colors.border,
          alignSelf: 'center',
          marginBottom: spacing.md,
        },
        sheetHeader: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: spacing.sm,
        },
        sheetTitle: {
          color: colors.text,
          fontSize: fontSizes.bodyLarge,
          fontWeight: fontWeights.semibold,
        },
        sheetListContent: {
          gap: spacing.xxs,
          paddingBottom: spacing.md,
        },
        sheetFooter: {
          paddingTop: spacing.sm,
          borderTopWidth: borderWidth.thin,
          borderTopColor: colors.border,
        },
        sheetApplyButton: {
          alignSelf: 'stretch',
        },
        results: {
          flex: 1,
        },
        mobileGrid: {
          justifyContent: 'space-between',
        },
        mobileCatalogCard: {
          width: '48%',
          maxWidth: '48%',
          flexBasis: '48%',
          flexGrow: 0,
        },
        resultsHeader: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-end',
          marginBottom: spacing.md,
        },
        clearButton: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: spacing.xs,
          minHeight: 36,
          paddingHorizontal: spacing.sm,
          borderRadius: radius.pill,
          backgroundColor: colors.accentSoft,
        },
        clearLabel: {
          color: colors.primary,
          fontSize: fontSizes.caption,
          fontWeight: fontWeights.semibold,
        },
        orderNotice: {
          alignSelf: 'center',
          maxWidth: layout.textMaxWidth,
          marginBottom: spacing.lg,
        },
        emptyState: {
          color: colors.textMuted,
          fontSize: fontSizes.body,
          lineHeight: lineHeights.body,
          textAlign: 'center',
          paddingVertical: spacing.xl,
        },
        loadMore: {
          alignItems: 'center',
          marginTop: spacing.xl,
        },
      }),
    [colors, shadows, textPresets],
  );
  const [categorySlug, setCategorySlug] = useState(
    getCategoryBySlug(initialCategorySlug) ? initialCategorySlug : 'all',
  );
  const [subcategorySlug, setSubcategorySlug] = useState('all');
  const [query, setQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [contacted, setContacted] = useState<ProductCardData | null>(null);
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);

  const categoryCounts = getCategoryCounts();
  const subcategoryCounts = getSubcategoryCounts();

  const filtered = useMemo(
    () => filterCatalog({ categorySlug, subcategorySlug, query }),
    [categorySlug, subcategorySlug, query],
  );

  const visible = filtered.slice(0, visibleCount);
  const quickView = useProductQuickView(visible);
  const activeCategory = categorySlug !== 'all' ? getCategoryBySlug(categorySlug) : undefined;
  const subcategories = activeCategory?.subcategories ?? [];
  const hasActiveFilters = categorySlug !== 'all' || query.trim() !== '';

  const resetResults = () => {
    setVisibleCount(PAGE_SIZE);
    quickView.close();
  };

  const handleSelectCategory = (slug: string) => {
    setCategorySlug(slug);
    setSubcategorySlug('all');
    resetResults();
  };

  const handleSelectSubcategory = (slug: string) => {
    setSubcategorySlug(slug);
    resetResults();
  };

  const handleQuery = (text: string) => {
    setQuery(text);
    resetResults();
  };

  const handleClearFilters = () => {
    setCategorySlug('all');
    setSubcategorySlug('all');
    setQuery('');
    resetResults();
  };

  const handleContact = (product: ProductCardData) => {
    setContacted(product);
    quickView.close();
    openExternalUrl(whatsappProductUrl(product.name));
  };

  const searchBox = (
    <View style={[styles.searchBox, isSearchFocused && styles.searchBoxFocused]}>
      <Ionicons name="search-outline" size={18} color={colors.textMuted} />
      <TextInput
        value={query}
        onChangeText={handleQuery}
        placeholder="Buscar arreglos"
        placeholderTextColor={colors.textMuted}
        accessibilityLabel="Buscar en el catálogo"
        onFocus={() => setIsSearchFocused(true)}
        onBlur={() => setIsSearchFocused(false)}
        style={styles.searchInput}
      />
      {query ? (
        <Pressable
          onPress={() => handleQuery('')}
          accessibilityRole="button"
          accessibilityLabel="Limpiar búsqueda"
          hitSlop={spacing.sm}
        >
          <Ionicons name="close-circle" size={18} color={colors.textMuted} />
        </Pressable>
      ) : null}
    </View>
  );

  /** Fila del filtro lateral: nombre, contador y estado activo. */
  const filterRow = (
    label: string,
    count: number,
    active: boolean,
    onPress: () => void,
    indented = false,
  ) => (
    <Pressable
      key={`${label}-${indented}`}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Filtrar por ${label}`}
      accessibilityState={{ selected: active }}
      style={[styles.filterRow, indented && styles.filterRowIndented, active && styles.filterRowActive]}
    >
      <Text style={[styles.filterRowLabel, active && styles.filterRowLabelActive]} numberOfLines={1}>
        {label}
      </Text>
      <Text style={[styles.filterRowCount, active && styles.filterRowCountActive]}>{count}</Text>
    </Pressable>
  );

  /** Lista de categorías y subcategorías, compartida entre el sidebar desktop y el sheet mobile. */
  const categoryList = (
    <>
      {filterRow('Todos los productos', ALL_CATALOG.length, categorySlug === 'all', () =>
        handleSelectCategory('all'),
      )}
      {CATEGORIES.map((cat) => (
        <View key={cat.slug}>
          {filterRow(
            cat.name,
            categoryCounts.get(cat.slug) ?? 0,
            categorySlug === cat.slug && subcategorySlug === 'all',
            () => handleSelectCategory(cat.slug),
          )}
          {categorySlug === cat.slug && cat.subcategories.length > 1 ? (
            <View style={styles.subList}>
              {cat.subcategories.map((sub) =>
                filterRow(
                  sub.name,
                  subcategoryCounts.get(`${cat.slug}|${sub.slug}`) ?? 0,
                  subcategorySlug === sub.slug,
                  () => handleSelectSubcategory(sub.slug),
                  true,
                ),
              )}
            </View>
          ) : null}
        </View>
      ))}
    </>
  );

  const sidebar = (
    <View style={styles.sidebar}>
      {searchBox}
      <Text style={styles.sidebarKicker}>Categorías</Text>
      {categoryList}
    </View>
  );

  const activeSubcategory =
    subcategorySlug !== 'all' ? subcategories.find((sub) => sub.slug === subcategorySlug) : undefined;
  const filterTriggerLabel = activeSubcategory?.name ?? activeCategory?.name ?? 'Filtrar por categoría';

  const mobileFilterBar = (
    <View style={styles.mobileFilterBar}>
      {searchBox}
      <Pressable
        onPress={() => setIsFilterSheetOpen(true)}
        accessibilityRole="button"
        accessibilityLabel="Abrir filtros de categoría"
        style={styles.filterTrigger}
      >
        <Ionicons name="options-outline" size={18} color={colors.primary} />
        <Text style={styles.filterTriggerLabel} numberOfLines={1}>
          {filterTriggerLabel}
        </Text>
        {hasActiveFilters && categorySlug !== 'all' ? (
          <View style={styles.filterBadge}>
            <Text style={styles.filterBadgeText}>1</Text>
          </View>
        ) : null}
      </Pressable>

      <Modal
        visible={isFilterSheetOpen}
        transparent
        animationType="slide"
        onRequestClose={() => setIsFilterSheetOpen(false)}
      >
        <Pressable
          style={styles.sheetBackdrop}
          onPress={() => setIsFilterSheetOpen(false)}
          accessibilityLabel="Cerrar filtros"
        >
          <Pressable
            style={styles.sheetPanel}
            onPress={(event) => event.stopPropagation()}
            accessibilityViewIsModal
            accessibilityLabel="Filtrar por categoría"
          >
            <View style={styles.sheetHandle} />
            <View style={styles.sheetHeader}>
              <Text accessibilityRole="header" style={styles.sheetTitle}>
                Filtrar por categoría
              </Text>
              <Pressable
                onPress={() => setIsFilterSheetOpen(false)}
                accessibilityRole="button"
                accessibilityLabel="Cerrar"
                hitSlop={spacing.sm}
              >
                <Ionicons name="close" size={22} color={colors.primary} />
              </Pressable>
            </View>
            <ScrollView contentContainerStyle={styles.sheetListContent}>{categoryList}</ScrollView>
            <View style={styles.sheetFooter}>
              <Button
                label={`Ver ${filtered.length} ${filtered.length === 1 ? 'resultado' : 'resultados'}`}
                onPress={() => setIsFilterSheetOpen(false)}
                style={styles.sheetApplyButton}
              />
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );

  const chips = (
    <View style={styles.chipsBlock}>
      {searchBox}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipsRow}
        accessibilityLabel="Filtrar por categoría"
      >
        {[{ slug: 'all', name: 'Todos' }, ...CATEGORIES].map((cat) => {
          const active =
            cat.slug === 'all' ? categorySlug === 'all' : categorySlug === cat.slug;
          return (
            <Pressable
              key={cat.slug}
              onPress={() => handleSelectCategory(cat.slug)}
              accessibilityRole="tab"
              accessibilityLabel={`Ver ${cat.name}`}
              accessibilityState={{ selected: active }}
              style={[styles.chip, active && styles.chipActive]}
            >
              <Text style={[styles.chipLabel, active && styles.chipLabelActive]}>{cat.name}</Text>
            </Pressable>
          );
        })}
      </ScrollView>
      {subcategories.length > 1 ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipsRow}
          accessibilityLabel="Filtrar por subcategoría"
        >
          {[{ slug: 'all', name: 'Todas' }, ...subcategories].map((sub) => {
            const active = sub.slug === subcategorySlug || (sub.slug === 'all' && subcategorySlug === 'all');
            return (
              <Pressable
                key={sub.slug}
                onPress={() => handleSelectSubcategory(sub.slug)}
                accessibilityRole="tab"
                accessibilityLabel={`Filtrar por ${sub.name}`}
                accessibilityState={{ selected: active }}
                style={[styles.subChip, active && styles.subChipActive]}
              >
                <Text style={[styles.subChipLabel, active && styles.subChipLabelActive]}>
                  {sub.name}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      ) : null}
    </View>
  );

  const results = (
    <View style={styles.results}>
      {hasActiveFilters ? (
        <View style={styles.resultsHeader}>
          <Pressable
            onPress={handleClearFilters}
            accessibilityRole="button"
            accessibilityLabel="Limpiar filtros"
            style={styles.clearButton}
          >
            <Ionicons name="close" size={14} color={colors.primary} />
            <Text style={styles.clearLabel}>Limpiar filtros</Text>
          </Pressable>
        </View>
      ) : null}

      {contacted ? (
        <Notice variant="success" style={styles.orderNotice}>
          {`Abrimos WhatsApp para preguntar por “${contacted.name}”. ¿No se abrió? Escríbenos al ${CONTACT_INFO.whatsappDisplay} o llámanos al ${CONTACT_INFO.phoneDisplay}.`}
        </Notice>
      ) : null}

      {filtered.length === 0 ? (
        <Text style={styles.emptyState}>
          No encontramos productos con esos filtros. Intenta con otra búsqueda.
        </Text>
      ) : (
        <>
          <CardGrid
            gap={isMobile ? spacing.sm : spacing.lg}
            style={isMobile ? styles.mobileGrid : undefined}
          >
            {visible.map((product, index) => (
              <ProductCard
                key={product.id}
                product={toProductCardData(product)}
                onContact={handleContact}
                onPress={() => quickView.open(index)}
                flexBasis={280}
                maxWidth={330}
                compactGrid={isMobile}
                style={isMobile ? styles.mobileCatalogCard : undefined}
              />
            ))}
          </CardGrid>
          {filtered.length > visibleCount ? (
            <View style={styles.loadMore}>
              <Button
                label={`Ver más (${filtered.length - visibleCount} restantes)`}
                variant="outline"
                onPress={() => setVisibleCount((count) => count + PAGE_SIZE)}
              />
            </View>
          ) : null}
        </>
      )}
    </View>
  );

  return (
    <View>
      <Section wide>
        <SectionTitle
          kicker="Catálogo"
          title="Todos nuestros arreglos"
          subtitle="Explora nuestros arreglos, encuentra el que hable por ti y escríbenos para hacerlo realidad. Como trabajamos con flor fresca de temporada, precio y disponibilidad los confirmamos juntos, contigo."
        />

        {isDesktop ? (
          <View style={styles.desktopLayout}>
            {sidebar}
            {results}
          </View>
        ) : isMobile ? (
          <View>
            {mobileFilterBar}
            {results}
          </View>
        ) : (
          <View>
            {chips}
            {results}
          </View>
        )}
      </Section>

      <ProductModal
        product={quickView.selected ? toProductCardData(quickView.selected) : null}
        onClose={quickView.close}
        onContact={handleContact}
        onPrev={quickView.goPrev}
        onNext={quickView.goNext}
        canPrev={quickView.canPrev}
        canNext={quickView.canNext}
      />

      <CtaRibbon onNavigate={onNavigate} />
    </View>
  );
}

