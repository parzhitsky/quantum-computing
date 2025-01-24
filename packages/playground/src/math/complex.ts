import { ComplexFormConverter, type Polar, type Cartesian } from './complex-form-converter.js'

const π = Math.PI
const τ = 2 * π

function normalizeAngle(angle: number): number {
  return (angle % τ + τ) % τ
}

const DEFAULT_ANGLE = 0

const notEnumerable = { enumerable: false } as const

export type MaybeComplex = number | Complex

export function isMaybeComplex(value: unknown): value is MaybeComplex {
  return value instanceof Complex || typeof value === 'number'
}

export class Complex implements Polar {
  protected static readonly converter = new ComplexFormConverter()

  static isComplex(value: unknown): value is Complex {
    return value instanceof Complex
  }

  static from(value: MaybeComplex | Cartesian): Complex {
    if (value instanceof Complex) {
      return value
    }

    const cartesian = value instanceof Object ? value : { re: value, im: 0 }

    const { magnitude, angle } = this.converter.convertCartesianToPolar(cartesian)

    return new Complex(magnitude, angle)
  }

  protected readonly converter: ComplexFormConverter

  constructor(
    public readonly magnitude: number,
    public readonly angle = DEFAULT_ANGLE,
  ) {
    this.magnitude ||= 0 // ensure magnitude is not -0

    if (this.magnitude === 0) {
      this.angle = DEFAULT_ANGLE
    } else if (this.magnitude < 0) {
      this.magnitude *= -1
      this.angle += π
    }

    this.angle = normalizeAngle(this.angle)
    this.converter = new.target.converter

    Object.defineProperty(this, 'converter', notEnumerable) // hide it from console.log
  }

  getMagnitudeSquared(): Complex {
    return new Complex(this.magnitude ** 2)
  }

  add(that: Complex): Complex {
    const a = this.converter.convertPolarToCartesian(this)
    const b = this.converter.convertPolarToCartesian(that)

    const { magnitude, angle } = this.converter.convertCartesianToPolar({
      re: a.re + b.re,
      im: a.im + b.im,
    })

    return new Complex(magnitude, angle)
  }

  multiplyBy(that: Complex): Complex {
    return new Complex(this.magnitude * that.magnitude, this.angle + that.angle)
  }
}
