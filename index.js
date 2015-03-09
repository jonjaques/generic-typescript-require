
var fs = require("fs");
var path = require("path");
var installed = false;

function install(options) {
  if (installed) {
    return;
  }

  var ts;
  options = options || {};

  ts = options.compiler ? require(options.compiler) : require('typescript');

  // Generated outputs
  var outputs = [];
  var compilerOptions = {
    target: ts.ScriptTarget.ES5, 
    module: ts.ModuleKind.CommonJS
  };

  var compilerHost = ts.createCompilerHost(compilerOptions);

  compilerHost.writeFile = function(name, text, writeByteOrderMark) {
    outputs.push({ name: name, text: text, writeByteOrderMark: writeByteOrderMark });
  };

  compilerHost.getDefaultLibFilename = function() {
    return path.join(path.dirname(require.resolve('typescript')), 'lib.d.ts')
  };

  require.extensions[options.extension || '.ts'] = function(module, filename) {
    var program = ts.createProgram([filename], compilerOptions, compilerHost);
    var errors = program.getDiagnostics();
    if (!errors.length) {
      var checker = program.getTypeChecker(true);
      errors = checker.getDiagnostics();
      if (typeof checker.emitFiles === 'function') {
        checker.emitFiles();
      }
      else if (typeof program.emitFiles === 'function') {
        program.emitFiles();
      }
    }

    if (errors.length) {
      errors.forEach(function(e) {
        console.log('Error (%s <%s, %s>) MS%s: %s', e.file.filename, e.file.pos, e.file.end, e.code, e.messageText);
      });

      throw new Error("There were errors during compilation.", errors);
    }

    outputs.forEach(function (o) {
      module._compile(o.text, o.name);
    });
  }

  installed = true;
}

module.exports = {
  install: install
};
