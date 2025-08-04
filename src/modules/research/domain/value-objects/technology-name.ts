export class TechnologyName {
  constructor(private readonly _value: string) {
    if (!_value) throw new Error('Technology name cannot be empty');
  }

  get value(): string {
    return this._value;
  }
}
