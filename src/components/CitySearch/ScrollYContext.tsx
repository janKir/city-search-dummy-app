import React, { PropsWithChildren, useState } from 'react'

type ScrollYContextValue = [
  number,
  React.Dispatch<React.SetStateAction<number>>
]

const defaultValue: ScrollYContextValue = [0, () => {}]

const ScrollYContext = React.createContext<ScrollYContextValue>(defaultValue)

export function ScrollYContextProvider({ children }: PropsWithChildren) {
  const useStateValue = useState(0)

  const value =
    import.meta.env.VITE_GLOBAL_RERENDER_ON_SCROLL === 'true'
      ? useStateValue
      : defaultValue
  return (
    <ScrollYContext.Provider value={value}>{children}</ScrollYContext.Provider>
  )
}

export function useScrollY(): ScrollYContextValue {
  if (import.meta.env.VITE_GLOBAL_RERENDER_ON_SCROLL === 'true') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return React.useContext(ScrollYContext)
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  return React.useState(0)
}
