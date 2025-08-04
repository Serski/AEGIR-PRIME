export class Price {
  constructor(private readonly _value: number) {
    if (_value < 0) throw new Error('Price cannot be negative');
  }

  get value(): number {
    return this._value;
  }
}
