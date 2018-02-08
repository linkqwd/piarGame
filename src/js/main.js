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
			$('main').empty();
			$('.result').html('0');
			var cardContainer = document.querySelector('main');
			for (var i = 0; i < params.fieldSize; i++) {
				cardContainer.insertAdjacentHTML('beforeEnd', arrayOfCards[i]);
			}
			this.openAllCardsAtStart();
			this.closeAllCardsAtStart();
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

			var matches = $('.match');

			if (matches.length === params.fieldSize) {
				$('.result').html(points + " " + params.difficulty);
				$('.result').trigger('click');
			}

			console.log(matches.length);

			setTimeout(function() {
				that.closeAllCards();
			}, 600);
		}

		this.pointsCounter = function (arg) {
			points = points + (arg);
			$('.result').html(points);
		}
		
		this.makeArrayOfCards();
	}

	function Modal (params) {
		var openButton = document.querySelectorAll(params.openButton);
		var closeButton = document.querySelectorAll(params.closeButton);
		var content = document.querySelector(params.content);
		var modal = document.querySelector('.modal');
		var bg = document.querySelector('.bg');

		var that = this;
		
		this.show = function () {
			modal.classList.remove('display-none');
			content.classList.remove('display-none');
		}
		
		this.close = function () {
			modal.classList.add('display-none');
			content.classList.add('display-none');
		}

		bg.onclick = function () {
			that.close();
		}

		openButton.forEach(function(elem) {
			elem.onclick = function () {
				that.show();
			}
		});
		
		closeButton.forEach(function(elem) {
			elem.onclick = function () {
				that.close();

				if ($(this).html() === 'Close') { 
					return false;
				} else {
					startGame($(this).html());
				}
			}
		});
	}

	function startGame (difficulty) {
		var options = [
			{
				difficulty: 'Easy',
				fieldSize: 12,
				showTimeout: 1
			}, 
			{
				difficulty: 'Normal',
				fieldSize: 24,
				showTimeout: 2
			}, 
			{
				difficulty: 'Expert',
				fieldSize: 36,
				showTimeout: 3},
		];

		if (difficulty === 'Easy') {
			var defaultPlay = new CardPairGame(options[0]);
		} else if (difficulty === 'Normal') {
			var defaultPlay = new CardPairGame(options[1]);
		} else if (difficulty === 'Expert') {
			var defaultPlay = new CardPairGame(options[2]);
		} else {
			var defaultPlay = new CardPairGame(options[0]);
		}

		var modalOptions = new Modal ({
			openButton: '.open-options-button',
			closeButton: '.close-options-btn',
			content: '.options-content'
		});

		var modalResult = new Modal ({
			openButton: '.points',
			closeButton: '.close-options-btn',
			content: '.result-content'
		});
	}
	
	startGame();
}