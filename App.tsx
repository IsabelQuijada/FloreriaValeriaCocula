import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import Footer from './src/components/Footer';
import NavBar from './src/components/NavBar';
import WhatsAppFab from './src/components/WhatsAppFab';
import { ScreenName } from './src/data/content';
import AboutScreen from './src/screens/AboutScreen';
import BlogScreen from './src/screens/BlogScreen';
import CategoryScreen from './src/screens/CategoryScreen';
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

/**
 * Ruta actual: pantallas con nombre, o la página de una categoría del
 * catálogo. 'Shop' no es una pantalla: navega a la sección de catálogo
 * dentro del Home (mismo patrón que "Ocasiones" en el sitio original).
 */
type Route =
  | { name: Exclude<ScreenName, 'Shop' | 'Favorites'> }
  | { name: 'Category'; categorySlug: string };

export default function App() {
  const [route, setRoute] = useState<Route>({ name: 'Home' });
  const scrollRef = useRef<ScrollView>(null);
  /** Posición vertical de la sección de catálogo dentro del Home. */
  const catalogY = useRef(0);

  const favoritesY = useRef(0);

  const scrollToCatalog = () => {
    scrollRef.current?.scrollTo({ y: catalogY.current, animated: true });
  };

  const scrollToFavorites = () => {
    scrollRef.current?.scrollTo({ y: favoritesY.current, animated: true });
  };

  const navigate = (next: ScreenName) => {
    if (next === 'Shop') {
      if (route.name === 'Home') {
        scrollToCatalog();
      } else {
        setRoute({ name: 'Home' });
        setTimeout(scrollToCatalog, 150);
      }
      return;
    }

    if (next === 'Favorites') {
      if (route.name === 'Home') {
        scrollToFavorites();
      } else {
        setRoute({ name: 'Home' });
        setTimeout(scrollToFavorites, 150);
      }
      return;
    }

    setRoute({ name: next });
    scrollRef.current?.scrollTo({ y: 0, animated: false });
  };

  const openCategory = (categorySlug: string) => {
    setRoute({ name: 'Category', categorySlug });
    scrollRef.current?.scrollTo({ y: 0, animated: false });
  };

  const navCurrent: ScreenName = route.name === 'Category' ? 'Shop' : route.name;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <NavBar current={navCurrent} onNavigate={navigate} />
      <ScrollView ref={scrollRef} style={styles.scroll} contentContainerStyle={styles.content}>
        {route.name === 'Home' ? (
          <HomeScreen
            onNavigate={navigate}
            onSelectCategory={openCategory}
            onCatalogLayout={(y) => {
              catalogY.current = y;
            }}
            onFavoritesLayout={(y) => {
              favoritesY.current = y;
            }}
          />
        ) : route.name === 'Category' ? (
          <CategoryScreen
            key={route.categorySlug}
            categorySlug={route.categorySlug}
            onNavigate={navigate}
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
