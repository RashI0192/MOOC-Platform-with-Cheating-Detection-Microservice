module.exports = function checkPaste(events) {
    const pasteEvents = events.filter(e => e.type === 'paste');
  
    return {
      rule: 'Pasted Answers',
      count: pasteEvents.length,
      suspicious: pasteEvents.length > 0,
      detail: `${pasteEvents.length} paste actions`,
    };
  };
  