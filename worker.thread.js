/**
 * react-native-threads
 * example implementation of Worker thread using:
 * @see https://www.npmjs.com/package/react-native-threads
 */

import {self} from 'react-native-threads';
// import './config';

const BENCHMARK_TIMES = 5;

const benchmark = () => {
  // global.performance is not yet installed. I will do that soon.
  // const start = performance.now();
  function p(n) {
    for (var i = 2; i * i <= n; i++) {
      if (n % i === 0) {
        return false;
      }
    }
    return true;
  }

  var sum = 0;
  for (var k = 2; k < 1000000; k++) {
    if (p(k)) {
      sum++;
    }
  }
  return {
    result: sum,
    // duration: end - start,
  };
};

for (let i = 0; i < BENCHMARK_TIMES; i++) {
  const r = benchmark();
  self.postMessage(`Run #${i}: ${r.result} from worker thread!`);
}

let count = 0;

self.onmessage = message => {
  console.log(`THREAD: got message ${message}`);

  count++;

  self.postMessage(`Message #${count} from worker thread!`);
};
