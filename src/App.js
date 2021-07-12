// routes
import Router from './routes';
// theme
import ThemeConfig from './theme';
// components
import ScrollToTop from './components/ScrollToTop';
import Apollo from './config/Apollo';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <Apollo>
      <ThemeConfig>
        <ScrollToTop />
        <Router />
      </ThemeConfig>
    </Apollo>
  );
}
