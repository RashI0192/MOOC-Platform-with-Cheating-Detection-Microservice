module.exports = function checkCopy(events) {
    const copyEvents = events.filter(e => e.type === 'copy');
  
    return {
      rule: 'Copied Text',
      count: copyEvents.length,
      suspicious: copyEvents.length > 0,
      detail: `${copyEvents.length} copy actions`,
    };
  };
  