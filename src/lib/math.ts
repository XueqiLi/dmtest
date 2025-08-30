/**
 * Represents a half-integer value from the set Z ∪ (Z + 1/2)
 * Half-integers include all integers and all integers plus 0.5
 *
 * @example
 * ```typescript
 * const h1 = new HalfInteger(1.2); // Creates HalfInteger with value 1
 * const h2 = new HalfInteger(1.4); // Creates HalfInteger with value 1.5
 * const h3 = new HalfInteger(1.7); // Creates HalfInteger with value 1.5
 * const h4 = new HalfInteger(2.0); // Creates HalfInteger with value 2
 * ```
 */
export class HalfInteger {
  private value: number;

  /**
   * Creates a HalfInteger by rounding to the nearest half-integer
   * @param input - The number to round to nearest half-integer
   * @example
   * ```typescript
   * new HalfInteger(1.2) // value = 1.0
   * new HalfInteger(1.4) // value = 1.5
   * new HalfInteger(1.7) // value = 1.5
   * new HalfInteger(1.9) // value = 2.0
   * ```
   */
  constructor(input: number) {
    // Round to nearest 0.5
    this.value = Math.round(input * 2) / 2;
  }

  /**
   * Returns the half-integer as a fraction string
   * @returns Fraction representation as "numerator/denominator"
   * @example
   * ```typescript
   * new HalfInteger(0).print() // "0/1"
   * new HalfInteger(1).print() // "1/1"
   * new HalfInteger(1.5).print() // "3/2"
   * new HalfInteger(-0.5).print() // "-1/2"
   * new HalfInteger(2.5).print() // "5/2"
   * ```
   */
  print(): string {
    // Special case for zero
    if (this.value === 0) {
      return "0/1";
    }

    // Check if it's an integer
    if (Number.isInteger(this.value)) {
      return `${this.value}/1`;
    }

    // It's a half-integer (x.5)
    const numerator = this.value * 2;
    return `${numerator}/2`;
  }

  /**
   * Adds this HalfInteger to another HalfInteger
   * @param other - The HalfInteger to add to this one
   * @returns A new HalfInteger representing the sum
   * @example
   * ```typescript
   * const h1 = new HalfInteger(1); // value = 1
   * const h2 = new HalfInteger(1.5); // value = 1.5
   * const sum = h1.add(h2); // sum.value = 2.5
   * sum.print(); // "5/2"
   * ```
   */
  add(other: HalfInteger): HalfInteger {
    return new HalfInteger(this.value + other.value);
  }
}

/**
 * Adds two vectors of HalfIntegers element-wise
 * @param vec1 - First vector of HalfIntegers
 * @param vec2 - Second vector of HalfIntegers (must be same length as vec1)
 * @returns New vector of HalfIntegers representing element-wise sum
 * @throws Error if vectors have different lengths
 * @example
 * ```typescript
 * const vec1 = [new HalfInteger(1), new HalfInteger(1.5)];
 * const vec2 = [new HalfInteger(0.5), new HalfInteger(2)];
 * const result = addHalfIntegerVectors(vec1, vec2);
 * // result[0].value = 1.5, result[1].value = 3.5
 * ```
 */
export function addHalfIntegerVectors(
  vec1: HalfInteger[],
  vec2: HalfInteger[],
): HalfInteger[] {
  if (vec1.length !== vec2.length) {
    throw new Error("Vectors must have the same length");
  }

  return vec1.map((h1, index) => h1.add(vec2[index]));
}
