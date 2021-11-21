import { ChatMessage } from '~src/types';

const COLORS = [
  '--color-sweet-corn',
  '--color-electric-violet',
  '--color-water-leaf',
  '--color-viking'
];
const BOT_ID = '__bot__';

function modulo(number: number, base: number) {
  return ((number % base) + base) % base;
}

function hashCode(str: string) {
  return str.split('').reduce(function (acc, char: string) {
    acc = (acc << 5) - acc + char.charCodeAt(0);
    return acc & acc;
  }, 0);
}

export function getColor(str: string) {
  const x = COLORS[modulo(hashCode(str), COLORS.length - 1)];
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

export function isMessageBot(message: ChatMessage) {
  return message.userUID === BOT_ID;
}
