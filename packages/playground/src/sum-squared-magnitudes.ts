import { type Amp, type BasisStates } from './basis-states.js'

function addMagnitudeSquared(sum: number, amplitude: Amp): number {
  return sum + amplitude.magnitude ** 2
}

export function sumSquaredMagnitudes(basisStates: BasisStates): number {
  return basisStates.reduce(addMagnitudeSquared, 0);
}
