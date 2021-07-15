$(document).ready(function () {
	var questionBankMP = new Array;
	var questionBankSP = new Array;
	var questionBank = new Array;
	var wordArray = new Array;
	var previousGuesses = new Array;
	var currentWord;
	var currentClue;
	var wrongAnswerCount;



	questionBankSP = [["biceps", "Muschi scheletic"], ["oxigen", "Gaz"], ["bacalaureat", "Examen"], ["coronavirus", "Provoaca boli"], ["informatica", "Materie scolara"], ["javascript", "Limbaj de programare"], ["atestat", "Lucrare finala"], ["saxofon", "Instrument muzical"], ["biblioteca", "Sunt tinute cartile"], ["schizofrenie", "Boala mentala"], ["ion", "Roman interbelic"], ["bacovia", "Poet roman"], ["medic", "Meserie"], ["madrid", "Capitala unui stat european"], ["jazz", "Gen de muzica"], ["perseverenta", "A nu te da batut"], ["fluture", "Insecta zburatoare"], ["google", "Motor de cautare"]];



	titleScreen();





	function titleScreen() {
		$('#gameContent').append('<div id="startButtonSP" class="button">ÎNCEPEȚI JOCUL SINGLEPLAYER</div> ');
		$('#gameContent').append('<div id="startButtonMP" class="button">ÎNCEPEȚI JOCUL MULTIPLAYER</div> ');
		$('#startButtonSP').on("click", function () {
			$("#gameContent").css("display", "block");
			questionBank = questionBankSP;
			gameScreenSP();
		});
		$('#startButtonMP').on("click", function () {
			gameScreenMP();
		});

	}//display game
	function gameScreenMP() {
		$('#gameContent').empty();
		$("#gameContent").css("display", "grid");
		$('#gameContent').append('<div id="writeWords"><p>Va rugăm sa introduceți cuvântul în căsuța text de mai jos: </p><input type="text" id = "myWord" placeholder="scrie" autocomplete="off"></div><br/>');
		$('#gameContent').append('<div id = "startMP" class ="playMP"> TRIMITE CUVÂNTUL </div> ');

		$('#gameContent').append('<div id= "arrowHolder"> <img id = "arrow" src="back.png"> <p style = "text-align:center"> Înapoi </p> </div>');
		$('#arrow').on("click", function () {
			location.reload();
		});


		$('#startMP').on("click", function () {
		
			
			if ($("#myWord").val().length >= 14) {
				alert("Vă rugăm să introduceți alt cuvânt, deoarece ați depăsit 14 caractere!");
				//jump back to writing the word
				gameScreenMP(); // sterge sirul tastat anterior in input
			}
			else {
				if ($("#myWord").val().length == 0) {
					alert("Vă rugăm să introduceți un cuvânt!");
					//jump back to writing the word
				}
				else {
					var x = document.getElementById('myWord').value;
					var indiciu = "NU PRIMIȚI INDICIU IN ACEST MOD";
					questionBankMP = [[x, indiciu]];
					questionBank = questionBankMP;
					$("#gameContent").css("display", "block");
					gameScreenSP();
				}
			}
			
		});

	}


	function gameScreenSP() {
		$('#gameContent').empty();
		$('#gameContent').append('<div id="pixHolder"><img id="hangman" src="imagine.png"><br/></div>');
		$('#gameContent').append('<div id="wordHolder"></div>');
		$('#gameContent').append('<div id="clueHolder"></div>');
		$('#gameContent').append('<div id="guesses">Litere încercate:</div>');
		$('#gameContent').append('<div id="feedback"></div>');

		$('#gameContent').append('<div id= "arrowHolder"> <img id = "arrow" src="back.png"> <p style = "text-align:center"> Înapoi </p> </div>');
		$('#arrow').on("click", function () {
			location.reload();
		});

		getWord();
		var numberOfTiles = currentWord.length;
		wrongAnswerCount = 0;
		previousGuesses = [];

		for (i = 0; i < numberOfTiles; i++) {
			$('#wordHolder').append('<div class="tile" id=t' + i + '></div>');
		}

		$('#clueHolder').append(' <div id="startButtonSP" class="buttonhelp" style="margin:initial;">Indiciu</div> ');
		$('#startButtonSP').on("click", function () {
			document.getElementById("clueHolder").innerHTML = "Indiciu: " + currentClue;
		})


		$(document).on("keyup", handleKeyUp);
	}//gameScreenSP


	function getWord() {
		var rnd = Math.floor(Math.random() * questionBank.length);
		currentWord = questionBank[rnd][0];
		currentClue = questionBank[rnd][1];
		questionBank.splice(rnd, 1);
		wordArray = currentWord.split("");
	}//getword

	function handleKeyUp(event) {
		if (event.keyCode > 64 && event.keyCode < 91) {
			var found = false;
			var previouslyEntered = false;
			var input = String.fromCharCode(event.keyCode).toLowerCase();

			for (i = 0; i < previousGuesses.length; i++) { if (input == previousGuesses[i]) { previouslyEntered = true; } }

			if (!previouslyEntered) {
				previousGuesses.push(input);

				for (i = 0; i < wordArray.length; i++) {

					if (input == wordArray[i]) { found = true; $('#t' + i).append(input); }

				}//for

				if (found) { checkAnswer(); }
				else { wrongAnswer(input); }
			}//if
		}//if

	}//handlekeyup


	function checkAnswer() {
		var currentAnswer = "";
		for (i = 0; i < currentWord.length; i++) {
			currentAnswer += ($('#t' + i).text());
		}
		if (currentAnswer == currentWord) {
			victoryMessage();
		};
	}//checkanswer

	function wrongAnswer(a) {
		wrongAnswerCount++;
		var pos = (wrongAnswerCount * -75) + "px"
		$('#guesses').append("  " + a);
		$('#hangman').css("left", pos);
		if (wrongAnswerCount == 6) {
			defeatMessage();
		}
	}//wronganswer

	function victoryMessage() {
		$(document).off("keyup", handleKeyUp);
		$('#feedback').append("Ai câştigat!<br><br><div id='replay'  class='button' >CONTINUAȚI</div>");
		$('#replay').on("click", function () {
			console.log(questionBank.length);
			if (questionBank.length > 0) {
				
				gameScreenSP()
			}
			else { finalPage() }
		});
	}

	function defeatMessage() {
		$(document).off("keyup", handleKeyUp);
		$('#feedback').append("Ai murit!<br>(Răspunsul este: " + currentWord + ")<div id='replay' class='button' style='margin-top:20px;'>CONTINUAȚI</div>");
		$('#replay').on("click", function () {
			if (questionBank.length > 0) {
				gameScreenSP();
			}
			else { finalPage() }
		});
	}

	function finalPage() {
		$('#gameContent').empty();
		$('#gameContent').append('<div id="writeWords"><p style = "text-align:center" >Felicitări! Aţi câştigat jocul, ghicind toate cuvintele din joc! </p>');
		$('#gameContent').append('<div id="backToHome" class="button">(RE)ÎNCEPEȚI UN ALT JOC</div>');
		$('#backToHome').on("click", function () {
			location.reload();
		});
		
	}//finalpage

});//doc ready