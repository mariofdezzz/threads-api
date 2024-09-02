import { Filter, FilterPrimitives } from '@/shared/domain/criteria/filter.ts'

export class Filters {
  constructor(readonly filters: Filter[]) {}

  static fromValues(filters: FilterPrimitives[]): Filters {
    return new Filters(filters.map(Filter.fromValues))
  }

  static empty(): Filters {
    return new Filters([])
  }
}
