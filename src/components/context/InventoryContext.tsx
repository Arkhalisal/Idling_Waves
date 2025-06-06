import { useState } from 'react'

import { createStrictContext } from '@/util/context/createStrictContext'

const [ContextProvider, useInventoryContext] =
  createStrictContext<InventoryContextProps>('InventoryContext')

export { useInventoryContext }

const InventoryProvider = ({ children }: InventoryProviderProps) => {
  const [inventoryItem, setInventoryItem] = useState(null)

  return <ContextProvider value={{}}>{children}</ContextProvider>
}

type InventoryContextProps = {}

type InventoryProviderProps = {
  children: React.ReactNode
}

export default InventoryProvider
