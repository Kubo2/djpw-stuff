/**
 * Vylepšenie protivyťahovacej zábrany v kategórii „Práce a zakázky“ o kontaktné tlačítko.
 */
inits.push((function(protivytahovaciZabrana) {
	var originalZabrana = protivytahovaciZabrana;
	var initsZabrana;
	for(var i = 0, len = inits.length; i < len; i++)	{
		if(inits[i] === originalZabrana) {
			inits[i] = function() {};
			break;
		}
	}

	return function(param) {
		if(!param.qstopic || param.qsforum != 26) {
			return originalZabrana(param);
		}
		
		var kontakt;
		var prispevky = document.getElementById('prispevky');
		if(prispevky) {
			for(var i = 0, aktualny, len = prispevky.rows.length; i < len; i++) {
				if((aktualny = prispevky.rows[i]).id.indexOf('post-') === 0) {
					// narazili sme na zakladajuci prispevok, teraz z neho len vydolovat kontakt
					var m = aktualny.innerText.match(/[a-z0-9._-]+@[a-z0-9._-]+/i); // este treba upravit, 4:30 AM na to nie je vhodna doba
					if(m) kontakt = m[0];
					break;
				}
			}
		} 

		if(!prispevky || !kontakt) {
			return originalZabrana(param);
		}

		var zabrana = {
			nadpis: "Účelem této diskusní kategorie je zprostředkování prvního kontaktu mezi lidmi, kteří shánějí či nabízejí práci.",
			text: "Zaujal-li vás inzerát, využijte uvedený kontakt nebo klikněte na „Odpovědět na inzerát“, <b>nepište</b> do diskuse. \
				I pokud vás na inzerátu něco zarazilo, pobavilo či rozčílilo, není žádoucí to sem psát."
		};

		var f = document.postMsg;
		if(!f) return false;

		var d = document.createElement("div");
		d.innerHTML = "<div class=\"backg closed\">\
			<strong>" + zabrana.nadpis + "</strong>\
		</div>\
		<p style=\"margin: 4px 0\">" + zabrana.text + "\
		<div class=\"center\">\
			<button type=button id=contactDirectlyButton style='margin: 0 0 4px'>Odpovědět na inzerát</button>\
			<br>(Kliknutím využijete první uvedený kontakt ke <span class=help title='na kontakt uvedený v inzerátu'>přímému</span> kontaktování inzerenta.)<br>\
			<button type=\"button\" id=\"postMsgButton\" style=\"margin: 0 0 4px\">Chci psát zprávu</button>\
			<br>Běda vám, jestli to bude blábol.\
		</div>";

		f.style.display = "none";
		f.parentNode.insertBefore(d, f);

		document.getElementById('contactDirectlyButton').onclick = function() {
			log('[' + param.qstopic + ']', 'paz-bariera-kontakt-button');
			
			// https://mathiasbynens.github.io/rel-noopener/
			window.open('mailto:' + kontakt).opener = null;
		};

		document.getElementById("postMsgButton").onclick = function() {
			f.style.display = "";
			d.style.display = "none";
			log("[" + param.qstopic + "]", "zabrana");
			if(zabrana.alert) alert(zabrana.alert);
		};
	};
})(protivytahovaciZabrana));
