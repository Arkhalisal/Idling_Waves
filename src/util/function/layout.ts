export const calculateInventoryLayout = (containerWidth: number, row: number) => {
  const itemsPerRow = Math.floor(containerWidth / 60)

  return itemsPerRow * row
}
