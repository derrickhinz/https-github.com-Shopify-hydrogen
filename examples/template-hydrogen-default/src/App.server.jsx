import renderHydrogen from '@shopify/hydrogen/entry-server';
import {
  Router,
  /*Route, */ DefaultRoutes,
  ShopifyProvider,
} from '@shopify/hydrogen';
import {Suspense} from 'react';
import shopifyConfig from '../shopify.config';
import DefaultSeo from './components/DefaultSeo.server';
import NotFound from './components/NotFound.server';
import LoadingFallback from './components/LoadingFallback';
import CartProvider from './components/CartProvider.client';
// import Index from './routes/index.server';

function App({routes, ...serverState}) {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ShopifyProvider shopifyConfig={shopifyConfig}>
        <CartProvider>
          <DefaultSeo />
          <Router fallback={<NotFound />} serverState={serverState}>
            <DefaultRoutes routes={routes} />
            {/* <Route path="/" page={<Index />} /> */}
          </Router>
        </CartProvider>
      </ShopifyProvider>
    </Suspense>
  );
}

const routes = import.meta.globEager('./routes/**/*.server.[jt](s|sx)');

export default renderHydrogen(App, {routes});
