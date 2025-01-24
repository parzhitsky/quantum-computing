export interface Cartesian {
  readonly re: number
  readonly im: number
}

export interface Polar {
  readonly magnitude: number
  readonly angle: number
}

export class ComplexFormConverter {
  calculateAngleFromCartesian({ re, im }: Cartesian): number {
    return Math.atan2(im, re)
  }

  calculateMagnitudeFromCartesian({ re, im }: Cartesian): number {
    return Math.sqrt(re ** 2 + im ** 2)
  }

  convertCartesianToPolar(cartesian: Cartesian): Polar {
    const magnitude = this.calculateMagnitudeFromCartesian(cartesian)
    const angle = this.calculateAngleFromCartesian(cartesian)

    return {
      magnitude,
      angle,
    }
  }

  calculateReFromPolar({ magnitude, angle }: Polar): number {
    return magnitude * Math.cos(angle)
  }

  calculateImFromPolar({ magnitude, angle }: Polar): number {
    return magnitude * Math.sin(angle)
  }

  convertPolarToCartesian(polar: Polar): Cartesian {
    const re = this.calculateReFromPolar(polar)
    const im = this.calculateImFromPolar(polar)

    return {
      re,
      im,
    }
  }
}
