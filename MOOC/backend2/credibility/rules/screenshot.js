module.exports = function checkScreenshots(events, testDurationMinutes = 30) {
    const screenshots = events.filter(e => e.type === 'screenshot');
    const rate = screenshots.length / testDurationMinutes;
  
    const suspicious = rate > 1; // more than 1 screenshot per minute
    return {
      rule: 'Multiple Screenshots',
      count: screenshots.length,
      suspicious,
      detail: `${screenshots.length} screenshots in ${testDurationMinutes} mins`,
    };
  };
  