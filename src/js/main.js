window.onload = function(e){

	function CardPairGame(params) {
		var points = 0;
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
			$('.flip-container').on('click', '.flipper', function () {
				$(this).addClass('flip');
				var currentCards = $('.flip-container').children('.flip');
				if (currentCards.length === 2) {

					that.cardController(currentCards);
				} 
			});
		}

		this.cardController = function (element) {
			var firstCard = element[0].getAttribute('data-color');
			var secondCard = element[1].getAttribute('data-color');
			
			if (firstCard === secondCard) {
				element[0].classList.add('match');
				element[1].classList.add('match');
				that.pointsCounter(10);
			} else {
				that.pointsCounter(-5);
			}

			setTimeout(function() {
				that.closeAllCards();
			}, 600);
		}

		this.pointsCounter = function (arg) {
			
			points = points + (arg);
			$('.points').html(`Points: ${points}`);
		}
		
		this.makeArrayOfCards();
		this.openAllCardsAtStart();
		this.closeAllCardsAtStart();
	}



	var play = new CardPairGame({
		fieldSize: 12,
		showTimeout: 1
	});

}
