
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
