import { FilterField } from '@/shared/domain/criteria/filter-field.ts'
import {
  FilterOperator,
  Operator,
} from '@/shared/domain/criteria/filter-operator.ts'
import { FilterValue } from '@/shared/domain/criteria/filter-value.ts'

export type FilterPrimitives = {
  field: string
  value: string
  operator: Operator
}

export class Filter {
  constructor(
    readonly field: FilterField,
    readonly operator: FilterOperator,
    readonly value: FilterValue,
  ) {}

  static fromValues({ field, operator, value }: FilterPrimitives): Filter {
    return new Filter(
      new FilterField(field),
      FilterOperator.fromValue(operator),
      new FilterValue(value),
    )
  }
}
