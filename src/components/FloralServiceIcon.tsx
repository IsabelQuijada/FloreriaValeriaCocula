import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { colors, radius } from '../theme';

interface FloralServiceIconProps {
  name: string;
  /** Reduce el medallón para listas informativas compactas. */
  compact?: boolean;
}

const svgProps = {
  width: 48,
  height: 48,
  viewBox: '0 0 64 64',
  fill: 'none',
} as const;

const strokeProps = {
  stroke: colors.primary,
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

function BouquetIcon() {
  return (
    <Svg {...svgProps}>
      <Path d="M22 20c-6-2-8 7-2 9-3 6 7 8 9 2 5 4 10-4 5-8 3-6-7-9-9-3Z" {...strokeProps} />
      <Path d="M38 15c-5-3-9 4-5 8-5 4 1 11 6 7 4 5 11-1 7-6 5-5-2-12-7-7Z" {...strokeProps} />
      <Circle cx="28" cy="25" r="2" fill={colors.primary} />
      <Circle cx="39" cy="23" r="2" fill={colors.primary} />
      <Path d="m26 33 8 19m8-20-8 20M20 35l14 17M47 34 34 52M25 43h18l-4 8H29Z" {...strokeProps} />
      <Path d="m29 51-5 6m15-6 5 6" {...strokeProps} />
    </Svg>
  );
}

function DeliveryIcon() {
  return (
    <Svg {...svgProps}>
      <Path d="M12 30h27v17H12Zm27 6h8l5 7v4H39Z" {...strokeProps} />
      <Circle cx="21" cy="49" r="4" {...strokeProps} />
      <Circle cx="45" cy="49" r="4" {...strokeProps} />
      <Path d="M19 30c-4-5 3-10 7-6 1-7 11-6 11 1 5-2 8 4 4 8" {...strokeProps} />
      <Path d="m25 30 4-7m3 7-1-8m6 8-3-6" {...strokeProps} />
      <Path d="M47 17c0 5-6 10-6 10s-6-5-6-10a6 6 0 1 1 12 0Z" {...strokeProps} />
      <Circle cx="41" cy="17" r="2" fill={colors.primary} />
    </Svg>
  );
}

function FloralArchIcon() {
  return (
    <Svg {...svgProps}>
      <Path d="M14 54V30a18 18 0 0 1 36 0v24M10 54h10m24 0h10" {...strokeProps} />
      <Path d="M17 29c8-5 15-13 18-21m-7 12c7 1 13 5 19 11" {...strokeProps} />
      <Circle cx="18" cy="28" r="5" {...strokeProps} />
      <Circle cx="25" cy="20" r="5" {...strokeProps} />
      <Circle cx="34" cy="14" r="5" {...strokeProps} />
      <Circle cx="43" cy="25" r="5" {...strokeProps} />
      <Circle cx="18" cy="28" r="1.5" fill={colors.primary} />
      <Circle cx="25" cy="20" r="1.5" fill={colors.primary} />
      <Circle cx="34" cy="14" r="1.5" fill={colors.primary} />
      <Circle cx="43" cy="25" r="1.5" fill={colors.primary} />
      <Path d="M27 40c3-4 7-4 10 0-3 5-7 8-10 10-3-2-7-5-10-10 3-4 7-4 10 0Z" {...strokeProps} />
    </Svg>
  );
}

export default function FloralServiceIcon({ name, compact = false }: FloralServiceIconProps) {
  let icon: React.ReactNode;

  if (name === 'bouquet-custom') icon = <BouquetIcon />;
  else if (name === 'delivery-bouquet') icon = <DeliveryIcon />;
  else if (name === 'floral-arch') icon = <FloralArchIcon />;
  else {
    icon = (
      <Ionicons
        name={name as React.ComponentProps<typeof Ionicons>['name']}
        size={40}
        color={colors.primary}
      />
    );
  }

  return (
    <View
      style={[styles.medallion, compact && styles.medallionCompact]}
      accessibilityElementsHidden
      importantForAccessibility="no"
    >
      {icon}
    </View>
  );
}

const styles = StyleSheet.create({
  medallion: {
    width: 72,
    height: 72,
    borderRadius: radius.pill,
    backgroundColor: colors.accentSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  medallionCompact: {
    width: 56,
    height: 56,
  },
});
