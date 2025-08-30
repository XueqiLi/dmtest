import { describe, expect, test } from "@jest/globals";
import { HalfInteger, addHalfIntegerVectors } from "./math";

describe("HalfInteger", () => {
  describe("constructor", () => {
    test("rounds 1.2 to 1.0", () => {
      const h = new HalfInteger(1.2);
      expect(h.print()).toBe("1/1");
    });

    test("rounds 1.4 to 1.5", () => {
      const h = new HalfInteger(1.4);
      expect(h.print()).toBe("3/2");
    });

    test("rounds 1.7 to 1.5", () => {
      const h = new HalfInteger(1.7);
      expect(h.print()).toBe("3/2");
    });

    test("rounds 1.9 to 2.0", () => {
      const h = new HalfInteger(1.9);
      expect(h.print()).toBe("2/1");
    });

    test("handles exact integers", () => {
      const h = new HalfInteger(2.0);
      expect(h.print()).toBe("2/1");
    });

    test("handles exact half-integers", () => {
      const h = new HalfInteger(2.5);
      expect(h.print()).toBe("5/2");
    });
  });

  describe("print", () => {
    test("prints 0 as 0/1", () => {
      const h = new HalfInteger(0);
      expect(h.print()).toBe("0/1");
    });

    test("prints 1 as 1/1", () => {
      const h = new HalfInteger(1);
      expect(h.print()).toBe("1/1");
    });

    test("prints 1.5 as 3/2", () => {
      const h = new HalfInteger(1.5);
      expect(h.print()).toBe("3/2");
    });

    test("prints -0.5 as -1/2", () => {
      const h = new HalfInteger(-0.5);
      expect(h.print()).toBe("-1/2");
    });

    test("prints 2.5 as 5/2", () => {
      const h = new HalfInteger(2.5);
      expect(h.print()).toBe("5/2");
    });

    test("prints negative integers correctly", () => {
      const h = new HalfInteger(-2);
      expect(h.print()).toBe("-2/1");
    });
  });

  describe("add", () => {
    test("adds 1 + 1.5 = 2.5", () => {
      const h1 = new HalfInteger(1);
      const h2 = new HalfInteger(1.5);
      const sum = h1.add(h2);
      expect(sum.print()).toBe("5/2");
    });

    test("adds 0.5 + 0.5 = 1", () => {
      const h1 = new HalfInteger(0.5);
      const h2 = new HalfInteger(0.5);
      const sum = h1.add(h2);
      expect(sum.print()).toBe("1/1");
    });

    test("adds negative values correctly", () => {
      const h1 = new HalfInteger(-1);
      const h2 = new HalfInteger(1.5);
      const sum = h1.add(h2);
      expect(sum.print()).toBe("1/2");
    });

    test("adds to zero correctly", () => {
      const h1 = new HalfInteger(0);
      const h2 = new HalfInteger(1.5);
      const sum = h1.add(h2);
      expect(sum.print()).toBe("3/2");
    });
  });
});

describe("addHalfIntegerVectors", () => {
  test("adds two vectors element-wise", () => {
    const vec1 = [new HalfInteger(1), new HalfInteger(1.5)];
    const vec2 = [new HalfInteger(0.5), new HalfInteger(2)];
    const result = addHalfIntegerVectors(vec1, vec2);

    expect(result).toHaveLength(2);
    expect(result[0].print()).toBe("3/2");
    expect(result[1].print()).toBe("7/2");
  });

  test("handles empty vectors", () => {
    const result = addHalfIntegerVectors([], []);
    expect(result).toHaveLength(0);
  });

  test("throws error for different length vectors", () => {
    const vec1 = [new HalfInteger(1)];
    const vec2 = [new HalfInteger(1), new HalfInteger(2)];

    expect(() => addHalfIntegerVectors(vec1, vec2)).toThrow(
      "Vectors must have the same length",
    );
  });

  test("handles single element vectors", () => {
    const vec1 = [new HalfInteger(2.5)];
    const vec2 = [new HalfInteger(1)];
    const result = addHalfIntegerVectors(vec1, vec2);

    expect(result).toHaveLength(1);
    expect(result[0].print()).toBe("7/2");
  });
});
