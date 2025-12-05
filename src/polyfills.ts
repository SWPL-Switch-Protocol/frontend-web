// Minimal Node.js-style process.nextTick polyfill for browser
// Some Web3Auth / Torus internals expect process.nextTick to exist.
if (typeof globalThis.process !== 'undefined') {
  const p: any = globalThis.process;
  if (typeof p.nextTick !== 'function') {
    p.nextTick = (cb: (...args: any[]) => void, ...args: any[]) => {
      Promise.resolve().then(() => cb(...args));
    };
  }
}


