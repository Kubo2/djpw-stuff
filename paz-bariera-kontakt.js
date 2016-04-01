/**
 * Vylep�enie protivy�ahovacej z�brany v kateg�rii Pr�ce a zak�zky o kontaktn� tla��tko.
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
		zabrana.nadpis = "��elem t�to diskusn� kategorie je zprost�edkov�n� prvn�ho kontaktu mezi lidmi, kte�� sh�n�j� �i nab�zej� pr�ci.";

		if(param.qsmoderator) { // for TESTING!!! in production replace with param.moderator
			zabrana.text = "Klikn�te na tla��tko &bdquo;Odpov�d�t na inzer�t&ldquo; pro p��me kontaktovan� inzerenta.";
		} else {
			zabrana.text = "Zaujal-li v�s inzer�t, vyu�ijte uveden� kontakt nebo klikn�te na &bdquo;Odpov�d�t na inzer�t&ldquo;, <b>nepi�te</b> do diskuse. I pokud v�s na inzer�tu n�co zarazilo, pobavilo �i roz��lilo, nen� ��douc� to sem ps�t.";
		}



		var f = document.postMsg;
		if(!f) return false;

		var d = document.createElement("div");
		d.innerHTML = "<div class=\"backg closed\">\
			<strong>" + zabrana.nadpis + "</strong>\
		</div>\
		<p style=\"margin: 4px 0\">" + zabrana.text + "\
		<div class=\"center\">\
			<button type=button id=contactDirectlyButton style='margin: 0 0 4px'>Odpov�d�t na inzer�t</button>\
			<br>(Kliknut�m vyu�ijete prvn� uveden� kontakt ke kontaktovan� inzerenta.)<br>\
			<button type=\"button\" id=\"postMsgButton\" style=\"margin: 0 0 4px\">Chci ps�t zpr�vu</button>\
			<br>B�da v�m, jestli to bude bl�bol.\
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
