export const noForwardProps = {
  shouldForwardProp: (prop: string) => !prop.startsWith('__')
}
