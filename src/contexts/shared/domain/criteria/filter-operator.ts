import { EnumValueObject } from '@/shared/domain/value-objects/enum-value-object.ts'

export enum Operator {
  EQUALS = '=',
  NOT_EQUALS = '!=',
  GT = '>',
  LT = '<',
  GTE = '>=',
  LTE = '<=',
  CONTAINS = 'contains',
  NOT_CONTAINS = 'not_contains',
}

export class FilterOperator extends EnumValueObject<Operator> {
  constructor(readonly value: Operator) {
    super(value, Object.values(Operator))
  }

  static fromValue(value: string): FilterOperator {
    for (const operatorValue of Object.values(Operator)) {
      if (operatorValue === value.toString()) {
        return new FilterOperator(operatorValue)
      }
    }

    throw new Error(`The filter operator ${value} is not valid`)
  }

  static equals(): FilterOperator {
    return this.fromValue(Operator.EQUALS)
  }

  protected throwErrorForInvalidValue(value: Operator): void {
    throw new Error(`The filter operator ${value} is not valid`)
  }
}
