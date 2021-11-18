const COLORS = ['--color-sweet-corn', '--color-water-leaf', '--color-viking', '--color-anzac'];

function modulo(number: number, base: number) {
  return ((number % base) + base) % base;
}

function randomIntFromInterval(min = 0, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function getColor() {
  const x = COLORS[randomIntFromInterval(0, COLORS.length - 1)];
  return x;
}

export function throttle(func: Function, timeFrame: number) {
  let lastTime = 0;
  return function (...args: any) {
    const now = Date.now();
    if (now - lastTime >= timeFrame) {
      func(...args);
      lastTime = now;
    }
  };
}
