/**
 * 异步计数器
 */
export default class AsyncCounter {
  private count: number;
  private lock: boolean;
  private queue: (() => void)[];

  constructor() {
    this.count = 0;
    this.lock = false;
    this.queue = [];
  }

  async increment(addNum: number): Promise<void> {
    if (this.lock) {
      // 如果有其他操作正在进行，将此操作加入队列
      return new Promise<void>((resolve) => {
        this.queue.push(() => {
          this.count += addNum;
          resolve();
        });
      });
    } else {
      // 没有其他操作正在进行，直接增加计数器
      this.count += addNum;
      this.lock = true;
      await this.processQueue();
    }
  }

  private async processQueue(): Promise<void> {
    // 依次执行队列中的操作
    while (this.queue.length > 0) {
      const task = this.queue.shift();
      if (task) {
        await new Promise<void>((resolve) => {
          task();
          resolve();
        });
      }
    }
    this.lock = false;
  }

  getCount(): number {
    return this.count;
  }
}
