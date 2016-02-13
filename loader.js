/**
 * Loads the extensions.
 */

writeStyle('djpw-purified');
//writeScript('foo');

function formatHtml(name, type) {
  type = type.toLowerCase();
  switch(type) {
    case 'js': return '<script src="https://raw.githubusercontent.com/Kubo2/djpw-stuff/master/' + name + '.' + type + '"></script>';
    case 'css': return '<style>@import "https://raw.githubusercontent.com/Kubo2/djpw-stuff/master/' + name + '.' + type + '";</style>';
    default: throw new TypeError();
  }
}

function writeScript(name) {
  document.write(formatHtml(name, 'js'));
}

function writeStyle(name) {
  document.write(formatHtml(name, 'css'));
}
