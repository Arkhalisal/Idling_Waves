import Decimal from 'break_infinity.js'

/**
 *
 * @param num - The num to calculate the reminder
 * @returns num % 10
 */
export const reminder = (num: Decimal) => {
  return num.sub(num.div(10).floor().mul(10))
}
