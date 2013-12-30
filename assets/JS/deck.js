/*
 * @author Jason Rissover
 *
 */


Deck = function() {

	this.cards = new Array();

	this.innitializeDefaultDeck();

	this.order = new Array();
	for(var i = 0; i < this.cards.length; i++){
		this.order.push(i);
	}

	

}

Deck.prototype = {

	constructor: Deck,

	draw: function(amount){

		if(this.order.length < amount){

			this.shuffle();
		}

		if(amount == 1){

			return this.cards[this.order.pop()];

		}
		else{

			var hand = new Array();

			for(var i = 0; i < amount; i++){

				hand.push(this.cards[this.order.pop()])

			}
			//console.log(hand[0]);

			return hand;
		}

		

	},

	shuffle: function(){

		if(this.cards.length != this.order.length){
			this.order = new Array();
			for(var i = 0; i < this.cards.length; i++){
				this.order.push(i);
			}
		}

		var tempDeck = new Array();

		while(this.order.length > 0){
			var i = Math.floor(Math.random() * this.order.length);

			tempDeck.push(this.order.splice(i,1)[0]);
		}

		this.order = tempDeck;

	},

	innitializeDefaultDeck: function(){

		this.cards = new Array();

		this.cards.push(new Card(1, "Clubs"));
		this.cards.push(new Card(2, "Clubs"));
		this.cards.push(new Card(3, "Clubs"));
		this.cards.push(new Card(4, "Clubs"));
		this.cards.push(new Card(5, "Clubs"));
		this.cards.push(new Card(6, "Clubs"));
		this.cards.push(new Card(7, "Clubs"));
		this.cards.push(new Card(8, "Clubs"));
		this.cards.push(new Card(9, "Clubs"));
		this.cards.push(new Card(10,"Clubs"));
		this.cards.push(new Card(11,"Clubs"));
		this.cards.push(new Card(12,"Clubs"));
		this.cards.push(new Card(13,"Clubs"));

		this.cards.push(new Card(1, "Spades"));
		this.cards.push(new Card(2, "Spades"));
		this.cards.push(new Card(3, "Spades"));
		this.cards.push(new Card(4, "Spades"));
		this.cards.push(new Card(5, "Spades"));
		this.cards.push(new Card(6, "Spades"));
		this.cards.push(new Card(7, "Spades"));
		this.cards.push(new Card(8, "Spades"));
		this.cards.push(new Card(9, "Spades"));
		this.cards.push(new Card(10,"Spades"));
		this.cards.push(new Card(11,"Spades"));
		this.cards.push(new Card(12,"Spades"));
		this.cards.push(new Card(13,"Spades"));

		this.cards.push(new Card(1, "Hearts"));
		this.cards.push(new Card(2, "Hearts"));
		this.cards.push(new Card(3, "Hearts"));
		this.cards.push(new Card(4, "Hearts"));
		this.cards.push(new Card(5, "Hearts"));
		this.cards.push(new Card(6, "Hearts"));
		this.cards.push(new Card(7, "Hearts"));
		this.cards.push(new Card(8, "Hearts"));
		this.cards.push(new Card(9, "Hearts"));
		this.cards.push(new Card(10,"Hearts"))
		this.cards.push(new Card(11,"Hearts"));
		this.cards.push(new Card(12,"Hearts"));
		this.cards.push(new Card(13,"Hearts"));

		this.cards.push(new Card(1, "Diamonds"));
		this.cards.push(new Card(2, "Diamonds"));
		this.cards.push(new Card(3, "Diamonds"));
		this.cards.push(new Card(4, "Diamonds"));
		this.cards.push(new Card(5, "Diamonds"));
		this.cards.push(new Card(6, "Diamonds"));
		this.cards.push(new Card(7, "Diamonds"));
		this.cards.push(new Card(8, "Diamonds"));
		this.cards.push(new Card(9, "Diamonds"));
		this.cards.push(new Card(10,"Diamonds"));
		this.cards.push(new Card(11,"Diamonds"));
		this.cards.push(new Card(12,"Diamonds"));
		this.cards.push(new Card(13,"Diamonds"));

		

		
	},
}