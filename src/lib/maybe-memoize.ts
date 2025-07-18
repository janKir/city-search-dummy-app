import React, { DependencyList } from 'react'

export function maybeMemo<P extends object>(
  Component: React.FunctionComponent<P>,
  propsAreEqual?: (prevProps: Readonly<P>, nextProps: Readonly<P>) => boolean
) {
  if (import.meta.env.VITE_DISABLE_MEMOIZATION === 'true') {
    return Component
  }

  return React.memo(Component, propsAreEqual)
}

export function useMaybeMemo<T>(factory: () => T, deps: DependencyList) {
  if (import.meta.env.VITE_DISABLE_MEMOIZATION === 'true') {
    return factory()
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks, react-hooks/exhaustive-deps
  return React.useMemo(factory, deps)
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function useMaybeCallback<T extends Function>(
  callback: T,
  deps: DependencyList
) {
  if (import.meta.env.VITE_DISABLE_MEMOIZATION === 'true') {
    return callback
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks, react-hooks/exhaustive-deps
  return React.useCallback(callback, deps)
}
