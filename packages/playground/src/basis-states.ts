import { type Complex } from './math/complex.js'

export type ProbabilityAmplitude = Complex

export { ProbabilityAmplitude as Amp } // short alias

export type BasisStates = Readonly<ProbabilityAmplitude[]>
