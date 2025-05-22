import * as R from 'ramda'
import { createContext, Provider, useContext } from 'react'

export const createStrictContext = <T>(name: string, optionalDefault?: T) => {
  const Context = createContext<T | undefined>(optionalDefault)

  Context.displayName = `${name}Context` // for DevTools

  const useStrictContext = () => {
    const context = useContext(Context)

    if (context === undefined && R.isNil(optionalDefault)) {
      throw `use${name}Context has to be inside ${name}Provider`
    }

    return context
  }

  return [Context.Provider, useStrictContext] as [Provider<T>, () => T]
}
