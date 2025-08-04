export class Currency {
  constructor(private readonly _value: number) {
    if (_value < 0) throw new Error('Currency cannot be negative');
  }

  get value(): number {
    return this._value;
  }
}
