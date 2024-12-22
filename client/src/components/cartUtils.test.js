import { calculateTotal } from "./Cart";

describe('Cart Utility Functions', () => {
  it('calculates the correct total', () => {
    const items = [
      { price: 10, quantity: 2 },
      { price: 5, quantity: 3 },
    ];
    expect(calculateTotal(items)).toBe('35.00');
  });

  it('returns 0 for an empty cart', () => {
    const items = [];
    expect(calculateTotal(items)).toBe('0.00');
  });

  it('handles edge cases with invalid data gracefully', () => {
    const items = [
      { price: 10, quantity: 2 },
      { price: null, quantity: 3 },
    ];
    expect(calculateTotal(items)).toBe('20.00'); // Skips invalid entries
  });
});