'use strict';

// node core modules

// 3rd party modules

// internal modules

const skips = [];
const names = [];

function enableDebugNamespaces(namespaces = '') {
  const split = namespaces.split(/[\s,]+/);

  split.filter(item => item).forEach((item) => {
    const namespace = item.replace(/[\\^$+?.()|[\]{}]/g, '\\$&').replace(/\*/g, '.*?');
    if (namespace[0] === '-') {
      skips.push(new RegExp(`^${namespace.substr(1)}$`));
    } else {
      names.push(new RegExp(`^${namespace}$`));
    }
  });
}

function debugEnabled(name) {
  if (skips.some(rule => rule.test(name))) {
    return false;
  }

  if (names.some(rule => rule.test(name))) {
    return true;
  }

  return false;
}

module.exports = {
  debugEnabled,
  enableDebugNamespaces,
};
