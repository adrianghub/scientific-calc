'use strict';

var uniq = require('array-uniq')

var CssSelectorParser = require('css-selector-parser').CssSelectorParser
var cssSelector = new CssSelectorParser()

cssSelector.registerSelectorPseudos('not')
cssSelector.registerNestingOperators('>', '+', '~');
cssSelector.registerAttrEqualityMods('^', '$', '*', '~');

module.exports = getCssSelectorClasses

/**
 * Return all the classes in a CSS selector.
 *
 * @param {String} selector A CSS selector
 * @return {String[]} An array of every class present in the CSS selector
 */
function getCssSelectorClasses(selector) {
  var list = []
  var ast = cssSelector.parse(selector)
  visitRules(ast, function(ruleSet) {
    if (ruleSet.classNames) {
      list = list.concat(ruleSet.classNames)
    }
  })
  return uniq(list)
}

function visitRules(node, fn) {
  if (node.rule) {
    visitRules(node.rule, fn)
  }
  if (node.selectors) {
    node.selectors.forEach(function(node) {
      visitRules(node, fn)
    })
  }
  if (node.pseudos) {
    node.pseudos.forEach(function(pseudo) {
      if (pseudo.valueType === 'selector') {
        visitRules(pseudo.value, fn)
      }
    })
  }
  if (node.type === 'rule') {
    fn(node)
  }
}
