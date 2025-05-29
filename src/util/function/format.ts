import Decimal from 'break_infinity.js'
import * as R from 'ramda'

export const formatDecimal = (decimal: Decimal, precision: number = 1): string => {
  if (R.isNil(decimal) || R.isNil(precision)) {
    return 'NaN'
  }

  if (decimal.lt(1e5)) {
    return decimal.toFixed(precision)
  }

  const scienceNotation = decimal.toExponential(precision).replace(/e\+/, 'e')

  return scienceNotation
}
