// Utility function to calculate Fibonacci number
// This module follows a memoized approach for efficient calculation.

class FibonacciCalculator {
  private memo: Record<number, number>;

  constructor() {
    this.memo = {};
  }

  public calculate(n: number): number {
    if (n <= 1) {
      return n;
    }
    if (this.memo[n]) {
      return this.memo[n];
    }
    this.memo[n] = this.calculate(n - 1) + this.calculate(n - 2);
    return this.memo[n];
  }
}

export const fibonacci = new FibonacciCalculator();
