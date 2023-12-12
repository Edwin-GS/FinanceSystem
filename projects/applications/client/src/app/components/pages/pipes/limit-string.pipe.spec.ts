import { LimitStringPipe } from './limit-string.pipe';

describe('LimitStringPipe', () => {
  it('create an instance', () => {
    const pipe = new LimitStringPipe();
    expect(pipe).toBeTruthy();
  });
});
