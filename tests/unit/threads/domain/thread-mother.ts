import { Thread } from '@/threads/domain/thread.ts'

export class ThreadMother {
  static random(): Thread {
    return Thread.fromPrimitives({
      id: randomInt(100),
      likes: randomInt(100),
      replies: randomInt(3),
      text: 'text',
      userId: randomInt(100),
      timestamp: new Date(),
      // repliedTo: undefined,
    })
  }
}

function randomInt(ceil: number): number {
  return Math.floor(Math.random() * ceil)
}
