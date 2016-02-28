
window.Kubo2 = window.Kubo2 || {};

/**
 * Loads the extensions.
 */
(function(k) {
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
	
	k.linkScript = function(name) {
		document.write(formatHtml(name, 'js'));
	};
	
	k.linkStyle = function(name) {
		document.write(formatHtml(name, 'css'));
	};
})(window.Kubo2);
