import { BasisStates } from './basis-states.js'
import { sumSquaredMagnitudes } from './sum-squared-magnitudes.js'

const OPERATIONS_STREAK = 1024 // increase to allow more consecutive operations per run on average
const TOLERANCE = Number.EPSILON * Math.log2(OPERATIONS_STREAK)
const EXPECTED_MAGNITUDE = 1

export function assertUnitMagnitude(basisStates: BasisStates): void {
  const magnitude = sumSquaredMagnitudes(basisStates)
  const difference = Math.abs(EXPECTED_MAGNITUDE - magnitude)

  if (difference > TOLERANCE) {
    throw new Error(`Expected squared sum of magnitudes to equal ${EXPECTED_MAGNITUDE} (within the tolerance of ${TOLERANCE}), instead got sum ${magnitude}`)
  }
}
