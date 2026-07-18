import { useState } from 'react';

/**
 * Estado de la "vista rápida" de producto (ProductModal) sobre una lista.
 *
 * Centraliza la selección por índice y la navegación anterior/siguiente
 * con sus límites, que antes se duplicaban en Home y Catálogo.
 */
export function useProductQuickView<T>(items: T[]) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const selected = selectedIndex != null ? items[selectedIndex] ?? null : null;
  const canPrev = selectedIndex != null && selectedIndex > 0;
  const canNext = selectedIndex != null && selectedIndex < items.length - 1;

  const open = (index: number) => setSelectedIndex(index);
  const close = () => setSelectedIndex(null);
  const goPrev = () =>
    setSelectedIndex((index) => (index != null && index > 0 ? index - 1 : index));
  const goNext = () =>
    setSelectedIndex((index) =>
      index != null && index < items.length - 1 ? index + 1 : index,
    );

  return { selectedIndex, selected, canPrev, canNext, open, close, goPrev, goNext };
}
