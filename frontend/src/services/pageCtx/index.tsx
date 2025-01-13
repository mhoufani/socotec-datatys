import { createContext, useContext, useMemo, ReactElement, ComponentType } from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
export const PageCtx = createContext({});

export function pageCtx(Wrapped: ComponentType) {
  function WrappedPageCtx(props: Record<string, unknown>) {
    return (
      <PageCtx.Provider value={props}>
        <Wrapped {...props} />
      </PageCtx.Provider>
    );
  }
  return hoistNonReactStatics(WrappedPageCtx, Wrapped);
}

export function usePageCtx<T>(selector: (x: T ) => T = x => x) {
  const pageProps = useContext(PageCtx);
  return useMemo(() => selector(pageProps as T), [pageProps, selector]);
}

export default pageCtx;
