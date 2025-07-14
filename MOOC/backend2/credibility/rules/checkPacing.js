module.exports = function checkPacing(moduleTimes) {
    // moduleTimes = [timeInSecondsForModule1, module2, ...]
    const earlyModules = moduleTimes.slice(0, Math.floor(moduleTimes.length / 2));
    const lateModules = moduleTimes.slice(Math.floor(moduleTimes.length / 2));
  
    const avgEarly = earlyModules.reduce((a, b) => a + b, 0) / earlyModules.length || 1;
    const avgLate = lateModules.reduce((a, b) => a + b, 0) / lateModules.length || 1;
  
    const rushed = avgLate < avgEarly * 0.5;
  
    return {
      rule: 'Pacing Anomaly',
      suspicious: rushed,
      detail: `Early avg: ${avgEarly}s, Late avg: ${avgLate}s`,
    };
  };
  