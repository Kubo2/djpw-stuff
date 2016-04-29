
/**
 * Create a checkbox for #dark styles in header
 */
(function() {
	var html = (function(){/*
<label>
	<input type="checkbox" onclick="document.documentElement.id = this.checked ? 'dark' : ''; document.cookies.write('night', +this.checked)"
	style='vertical-align: middle'>
	Zhasnuté styly
</label>
	*/}).toString().slice(14, -3);

	var parent = document.createElement('kubo2'),
		menu = document.getElementById('menu');
	parent.innerHTML = html;
	parent.getElementsByTagName('input')[0].checked = (document.documentElement.id == 'dark');
	menu.insertBefore(parent, menu.lastChild);
})();


/**
 * Switch the [tabindex] of #nahled-tlacitko & #submitbtn
 * to <kbd>Tab</kbd> be first focusing on the #nahled-tlacitko
 */
inits.push(function() {
	var tmp, nahledTlacitko = document.getElementById('nahled-tlacitko'),
		submitBtn = document.getElementById('submitbtn');
	
	if(nahledTlacitko && submitBtn) {
		// kto to kedy sakra vymyslel, že [tabindex] sa v JS zapisuje .tabIndex
		tmp = nahledTlacitko.tabIndex;
		nahledTlacitko.tabIndex = submitBtn.tabIndex;
		submitBtn.tabIndex = tmp;
	}
});
