var naslov = $("h1");
var body = $("body");


naslov.text("LOTO");
naslov.addClass("naslov");

var lotoList = $("<div></div>");
lotoList.addClass("lotoList");


for (var c = 1; c <= 10; c++) {

	var pogodjeni =$ ("<div></div>");
	pogodjeni.addClass("pogodjeni " + ("pogodjeni"+c));

	var blocks = $("<div></div>");
	blocks.addClass("kuca");
	lotoList.append(blocks);

	var kolona = $("<div></div>");
	kolona.text(c);
	kolona.addClass("brojKolone");

	var sekcija1 = $("<div></div>")
	sekcija1.addClass("section");

	for (var i = 1; i < 10; i++) {
		var s1 = $("<div></div>");
		s1.text(i);
		s1.addClass("kucica");
		s1.click(numberClicked);

		sekcija1.append(s1);
	}

	var sekcija2 = $("<div></div>")
	sekcija2.addClass("section");

	for (var i = 10; i < 19; i++) {
		var s2 = $("<div></div>");
		s2.text(i);
		s2.addClass("kucica");
		s2.click(numberClicked);

		sekcija2.append(s2);
	}

	var sekcija3 = $("<div></div>")
	sekcija3.addClass("section");

	for (var i = 19; i < 28; i++) {
		var s3 = $("<div></div>");
		s3.text(i);
		s3.addClass("kucica");
		s3.click(numberClicked);

		sekcija3.append(s3);
	}

	var sekcija4 = $("<div></div>")
	sekcija4.addClass("section");

	for (var i = 28; i < 40; i++) {
		var s4 = $("<div></div>");
		s4.text(i);
		s4.addClass("kucica");
		s4.click(numberClicked);

		sekcija4.append(s4);
	}

	blocks.append(kolona, sekcija1, sekcija2, sekcija3, sekcija4, pogodjeni);
}

body.append(lotoList);


var kombinacije = [
	[],
	[],
	[],
	[],
	[],
	[],
	[],
	[],
	[],
	[]
];

function numberClicked(e) {
	if (chekGame === true) {
		return;
	}
	var kolona = Number($(e.target).closest(".kuca").children()[0].textContent) - 1;
	var kombinacija = kombinacije[kolona];
	if (kombinacija.length <= 6) {

		var selektovani = Number(e.target.textContent);
		var nadjeno = false;
		for (i = 0; i < kombinacija.length; i++) {
			if (kombinacija[i] === selektovani) {
				nadjeno = true;
				break;
			}

		}
		if (!nadjeno) {
			kombinacija[kombinacija.length] = selektovani;
			$(e.target).addClass("cross " + ("clicked" + i));
		}
		if (kombinacija.length === 7) {
			izvlacenje();
		}
	} else {
		return;
	}
}
var prikaz = false;

function izvlacenje() {
	if (prikaz) {
		return;
	}
	var izborBox = $("<div></div>");

	for (var a = 1; a < 8; a++) {
		var brojBox = $("<div></div>");
		brojBox.addClass("brojBox " + ("izv" + a));
		izborBox.append(brojBox);

	}

	var btn = $("<button>Igraj</button>");
	btn.addClass("startBtn");
	btn.click(generator);
	body.append(izborBox, btn);
	prikaz = true;
}


var lotoNiz = [];

function generator() {
	if (chekGame === true) {
		return;
	}

	while (lotoNiz.length < 7) {
		var random = Math.floor(Math.random() * 39 + 1);
		var found = false;
		for (i = 0; i < lotoNiz.length; i++) {
			if (lotoNiz[i] === random) {
				found = true;
				break;
			}
		}
		if (!found) {
			lotoNiz[lotoNiz.length] = random;
		}
	}

	setTimeout(function(){
		var box1 = $(".izv1");
		box1.text(lotoNiz[0]);
	}, 1000);

	setTimeout(function(){
		var box2 = $(".izv2");
		box2.text(lotoNiz[1]);
	}, 2000);

	setTimeout(function(){
		var box3 = $(".izv3");
		box3.text(lotoNiz[2]);
	}, 3000);

	setTimeout(function(){
		var box4 = $(".izv4");
		box4.text(lotoNiz[3]);
	}, 4000);

	setTimeout(function(){
		var box5 = $(".izv5");
		box5.text(lotoNiz[4]);
	}, 5000);

	setTimeout(function(){
		var box6 = $(".izv6");
		box6.text(lotoNiz[5]);
	}, 6000);

	setTimeout(function(){
		var box7 = $(".izv7");
		box7.text(lotoNiz[6]);
	}, 7000);

	
	provera();
	setTimeout(function(){
		rezultat(pogoci);
		}, 8500);
	chekGame=true;
}


var pogoci = [];

function provera() {
	
	for (var c = 0; c < kombinacije.length; c++) {
		var kombinacija = kombinacije[c];
		var pogodak = 0;
		if (kombinacija.length === 7) {
			for (var i = 0; i < lotoNiz.length; i++) {
				for (var b = 0; b < kombinacija.length; b++) {
					if (lotoNiz[i] === kombinacija[b]) {
						pogodak++;
						
						break;
					}
				}
			}

		}
		pogoci[c] = pogodak;
	}
}
function rezultat(rez) {
  
  for (var i=0; i<rez.length; i++) {
    var rez2 = $(".pogodjeni"+(i+1));
    rez2.text(rez[i]);
  }

}


var chekGame = false;
