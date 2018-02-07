window.onload = function(e){

	function CardPairGame(params) {

		var that = this;

		this.makeArrayOfCards = function () {
			var arrayOfCards = [], color, cardHTML,
			    colorsForCards = ['#e980a0','#5880b5','#a8804b','#0080ff','#dc8057','#008000','#ff7019','#ca2b2c','#edf906','#26f906','#f906b5','#ffffff','#2f1e3b','#c700ff','#0bd5cb','#ff0700','#2800ff','#88b5a5']
			
			for (var i = 0; i < params.fieldSize / 2; i++) {
				color = colorsForCards[i];
				cardHTML = '<div class="pair-item"><div class="card flip-container"><div class="flipper" data-color="'+color+'"><div class="front"></div><div class="back" style="background: '+color+'"></div></div></div></div>';
				arrayOfCards.push(cardHTML);
				arrayOfCards.push(cardHTML);
			}
			this.shuffleCards(arrayOfCards);
		}

		this.shuffleCards = function (arrayOfCards) {
			arrayOfCards.sort (function() { 
				return 0.5 - Math.random() 
			});
			this.makeField(arrayOfCards);
		}
	
		this.makeField = function (arrayOfCards) {
			var cardContainer = document.querySelector("main")
			for (var i = 0; i < params.fieldSize; i++) {
				cardContainer.insertAdjacentHTML('beforeEnd', arrayOfCards[i]);
			}
		}

		this.openAllCardsAtStart = function () {
			setTimeout(function() {
				$('.flipper').addClass('flip');
			}, 500);
		}

		this.closeAllCardsAtStart = function () {
			setTimeout(function() {
				$('.flipper').removeClass('flip');
				that.flipCard();
			}, (params.showTimeout * 1000) + 500);
		}

		this.closeAllCards = function () {
			$('.flipper').removeClass('flip');
		}

		this.flipCard = function () {
			var clickCounter = 0;
			var $selector = $('.flip-container');

			$selector.on('click', '.flipper', function () {

				if (clickCounter === 2) {
					clickCounter = 1;
					that.closeAllCards();
				} else {
					clickCounter++;
				}

				/*var currentCard = $('.flip-container').children('.flip');
				.not(currentCard)*/

				$(this).addClass('flip');
				that.cardController($(this));
				
			});
		}

		this.cardController = function (element) {
			var temp = element.attr('data-color');
			
			if (temp === element.attr('data-color')) {
				alert('msg');
			}
		}
		


		this.makeArrayOfCards();
		this.openAllCardsAtStart();
		this.closeAllCardsAtStart();
	}


	var play = new CardPairGame({
		fieldSize: 36,
		showTimeout: 0
	});

}

/*	var testArray = [1,2,3,4,5]

	testArray.sort(function() { return 0.5 - Math.random() });

	console.log(testArray);
	console.log(1);*/