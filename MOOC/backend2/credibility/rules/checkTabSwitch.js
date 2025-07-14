module.exports = function checkTabSwitch(events) {
    const tabSwitches = events.filter(e => e.type === 'tab-switch');
  
    return {
      rule: 'Switched Tabs',
      count: tabSwitches.length,
      suspicious: tabSwitches.length > 2, // allow 1-2 accidents
      detail: `${tabSwitches.length} tab switches`,
    };
  };
  