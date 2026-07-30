import {
  CormorantGaramond_500Medium_Italic,
  CormorantGaramond_600SemiBold,
  CormorantGaramond_700Bold,
  useFonts,
} from '@expo-google-fonts/cormorant-garamond';
import { StatusBar } from 'expo-status-bar';
import React, { useRef } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import Footer from './src/components/Footer';
import NavBar from './src/components/NavBar';
import WhatsAppFab from './src/components/WhatsAppFab';
import { ScreenName } from './src/navigation/routes';
import { useHashNavigation } from './src/navigation/useHashNavigation';
import AboutScreen from './src/screens/AboutScreen';
import BlogScreen from './src/screens/BlogScreen';
import CatalogScreen from './src/screens/CatalogScreen';
import ContactScreen from './src/screens/ContactScreen';
import FaqScreen from './src/screens/FaqScreen';
import HomeScreen from './src/screens/HomeScreen';
import { colors } from './src/theme';

interface ScreenProps {
  onNavigate: (screen: ScreenName) => void;
}

const SCREENS: Record<Exclude<ScreenName, 'Home' | 'Shop' | 'Favorites'>, React.ComponentType<ScreenProps>> = {
  About: AboutScreen,
  Blog: BlogScreen,
  FAQ: FaqScreen,
  Contact: ContactScreen,
};

export default function App() {
  useFonts({
    CormorantGaramond_500Medium_Italic,
    CormorantGaramond_600SemiBold,
    CormorantGaramond_700Bold,
  });
  const scrollRef = useRef<ScrollView>(null);
  const { route, navigate, openCategory, registerScrollTarget } =
    useHashNavigation(scrollRef);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <NavBar current={route.name} onNavigate={navigate} />
      <ScrollView ref={scrollRef} style={styles.scroll} contentContainerStyle={styles.content}>
        {route.name === 'Home' ? (
          <HomeScreen
            onNavigate={navigate}
            onSelectCategory={openCategory}
            onFavoritesLayout={(y) => registerScrollTarget('favorites', y)}
          />
        ) : route.name === 'Shop' ? (
          <CatalogScreen
            key={route.categorySlug ?? 'all'}
            initialCategorySlug={route.categorySlug}
            onNavigate={navigate}
          />
        ) : route.name === 'Contact' ? (
          <ContactScreen
            onNavigate={navigate}
            onFaqLayout={(y) => registerScrollTarget('faq', y)}
          />
        ) : (
          React.createElement(SCREENS[route.name], { onNavigate: navigate })
        )}
        <Footer onNavigate={navigate} />
      </ScrollView>
      <WhatsAppFab />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  scroll: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flexGrow: 1,
  },
});
