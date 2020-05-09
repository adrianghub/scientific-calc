var test = require('tape')
var classes = require('./')

test('css selector classes', function(t) {
  t.plan(9)

  t.deepEquals(classes('.wat'), ['wat'])

  var c
  c = classes('.wat > .yo')
  t.notEqual(c.indexOf('wat'), -1, 'should return correct classes')
  t.notEqual(c.indexOf('yo'), -1, 'should return correct classes')

  c = classes('div > .yo    body[hacks=true]         .lol div, span:hover .phat')
  t.notEqual(c.indexOf('phat'), -1, 'should return correct classes')
  t.notEqual(c.indexOf('lol'), -1, 'should return correct classes')
  t.notEqual(c.indexOf('yo'), -1, 'should return correct classes')

  t.deepEqual(classes('.purple article span.purple div.purple.purple.purple'), ['purple'], 'should not create duplicates')

  t.deepEqual(classes('div:not(.hahaha)'), ['hahaha'], 'should support nested classes')

  t.throws(function() {
    classes('5')
  })
})
