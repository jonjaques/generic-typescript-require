describe('generic-typescript-require', function() {
  it('should work', function() {
    require('./index').install();
    var test = require('./test');
    expect(test.foo()).toBe('bar');
    expect(test.bar).toBe(42);
  });
});