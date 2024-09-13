export class MockRepository {
  [x: string]: () => unknown

  static on<T>(func: string, returnValue: unknown): T {
    const repository = new MockRepository()

    repository[func] = () => returnValue

    return repository as T
  }
}
