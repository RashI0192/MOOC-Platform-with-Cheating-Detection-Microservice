const evaluateCredibility = require('./credibility/evaluateCredibility');

const testData = {
  events: [
    { type: 'screenshot' },
    { type: 'screenshot' },
    { type: 'copy' },
    { type: 'paste' },
    { type: 'tab-switch' },
    { type: 'tab-switch' },
    { type: 'tab-switch' },
  ],
  moduleTimes: [300, 320, 90, 80, 60] // seconds
};

console.log('\n Credibility Report\n------------------------');
const result = evaluateCredibility(testData);

console.log('Violations:');
result.violations.forEach((v, i) => console.log(`${i + 1}. ${v}`));
console.log('\nTrust Score:', result.trustScore, '/ 100\n');
