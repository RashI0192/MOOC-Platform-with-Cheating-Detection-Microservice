// backend2/credibility/evaluateCredibility.js

const checkCopy = require('./rules/checkCopy');
const checkPaste = require('./rules/checkPaste');
const checkTabSwitch = require('./rules/checkTabSwitch');
const checkPacing = require('./rules/checkPacing');
const checkScreenshots = require('./rules/checkScreenshots'); // <-- this line was broken

module.exports = function evaluateCredibility(data) {
  const violations = [
    ...checkScreenshots(data),
    ...checkCopy(data),
    ...checkPaste(data),
    ...checkTabSwitch(data),
    ...checkPacing(data)
  ];

  const trustScore = Math.max(0, 100 - violations.length * 15);

  return { trustScore, violations };
};

