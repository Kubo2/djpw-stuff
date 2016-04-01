/**
 * Vylep¹enie protivy»ahovacej zábrany v kategórii Práce a zakázky o kontaktné tlaèítko.
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

		var zabrana = {};
		zabrana.nadpis = "Úèelem této diskusní kategorie je zprostøedkování prvního kontaktu mezi lidmi, kteøí shánìjí èi nabízejí práci.";

		if(param.qsmoderator) { // for TESTING!!! in production replace with param.moderator
			zabrana.text = "Kliknìte na tlaèítko &bdquo;Odpovìdìt na inzerát&ldquo; pro pøíme kontaktovaní inzerenta.";
		} else {
			zabrana.text = "Zaujal-li vás inzerát, vyu¾ijte uvedený kontakt nebo kliknìte na &bdquo;Odpovìdìt na inzerát&ldquo;, <b>nepi¹te</b> do diskuse. I pokud vás na inzerátu nìco zarazilo, pobavilo èi rozèílilo, není ¾ádoucí to sem psát.";
		}



		var f = document.postMsg;
		if(!f) return false;

		var d = document.createElement("div");
		d.innerHTML = "<div class=\"backg closed\">\
			<strong>" + zabrana.nadpis + "</strong>\
		</div>\
		<p style=\"margin: 4px 0\">" + zabrana.text + "\
		<div class=\"center\">\
			<button type=button id=contactDirectlyButton style='margin: 0 0 4px'>Odpovìdìt na inzerát</button>\
			<br>(Kliknutím vyu¾ijete první uvedený kontakt ke kontaktovaní inzerenta.)<br>\
			<button type=\"button\" id=\"postMsgButton\" style=\"margin: 0 0 4px\">Chci psát zprávu</button>\
			<br>Bìda vám, jestli to bude blábol.\
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
