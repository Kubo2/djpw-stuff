/**
 * Loads the extensions.
 */

writeStyle('djpw-purified');
//writeScript('foo');

function formatHtml(name, type) {
  type = type.toLowerCase();
  function getUrl() {
    return 'https://rawgit.com/Kubo2/djpw-stuff/master/' + name + '.' + type;
  }
  
  switch(type) {
    case 'js': return '<script src="' + getUrl() + '"></script>';
    case 'css': return '<style>@import "' + getUrl() + '";</style>';
    default: throw new TypeError();
  }
}

function writeScript(name) {
  document.write(formatHtml(name, 'js'));
}

function writeStyle(name) {
  document.write(formatHtml(name, 'css'));
}
