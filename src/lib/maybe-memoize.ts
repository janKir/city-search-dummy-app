import React, { DependencyList } from 'react'

export function maybeMemo<P extends object>(
  Component: React.FunctionComponent<P>,
  propsAreEqual?: (prevProps: Readonly<P>, nextProps: Readonly<P>) => boolean
) {
  if (import.meta.env.VITE_DISABLE_MEMOIZATION === 'true') {
    return React.memo(Component, propsAreEqual)
  }

  return Component
}

export function useMaybeMemo<T>(factory: () => T, deps: DependencyList) {
  if (import.meta.env.VITE_DISABLE_MEMOIZATION === 'true') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return React.useMemo(factory, deps)
  }

  return factory()
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function useMaybeCallback<T extends Function>(
  callback: T,
  deps: DependencyList
) {
  if (import.meta.env.VITE_DISABLE_MEMOIZATION === 'true') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return React.useCallback(callback, deps)
  }

  return callback
}
