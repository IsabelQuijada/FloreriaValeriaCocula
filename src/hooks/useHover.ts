import { useCallback, useMemo, useState } from 'react';

/**
 * Estado hover de un único elemento interactivo (solo tiene efecto en web).
 *
 * Uso: `const { hovered, hoverProps } = useHover();` y esparcir
 * `{...hoverProps}` en el `Pressable`.
 */
export function useHover() {
  const [hovered, setHovered] = useState(false);
  const onHoverIn = useCallback(() => setHovered(true), []);
  const onHoverOut = useCallback(() => setHovered(false), []);
  const hoverProps = useMemo(() => ({ onHoverIn, onHoverOut }), [onHoverIn, onHoverOut]);
  return { hovered, hoverProps };
}

/**
 * Estado hover compartido por una colección de elementos identificados
 * por clave (menús, listas de enlaces). Solo un elemento puede estar
 * en hover a la vez.
 *
 * Uso: `const { isHovered, hoverProps } = useHoverKey();` y en cada
 * elemento `{...hoverProps('mi-clave')}` + `isHovered('mi-clave')`.
 */
export function useHoverKey() {
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const hoverProps = useCallback(
    (key: string) => ({
      onHoverIn: () => setHoveredKey(key),
      onHoverOut: () => setHoveredKey(null),
    }),
    [],
  );
  const isHovered = useCallback((key: string) => hoveredKey === key, [hoveredKey]);
  return { hoveredKey, isHovered, hoverProps };
}
