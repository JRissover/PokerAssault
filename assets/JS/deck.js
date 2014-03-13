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
				//hand.push(this.cards[i +26  +10])
			}
			//console.log(hand);

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

		this.cards.push(new Card(1, "Red"));
		this.cards.push(new Card(2, "Red"));
		this.cards.push(new Card(3, "Red"));
		this.cards.push(new Card(4, "Red"));
		this.cards.push(new Card(5, "Red"));
		this.cards.push(new Card(6, "Red"));
		this.cards.push(new Card(7, "Red"));
		this.cards.push(new Card(8, "Red"));
		this.cards.push(new Card(9, "Red"));
		this.cards.push(new Card(10,"Red"));
		this.cards.push(new Card(11,"Red"));
		this.cards.push(new Card(12,"Red"));
		this.cards.push(new Card(13,"Red"));

		this.cards.push(new Card(1, "Green"));
		this.cards.push(new Card(2, "Green"));
		this.cards.push(new Card(3, "Green"));
		this.cards.push(new Card(4, "Green"));
		this.cards.push(new Card(5, "Green"));
		this.cards.push(new Card(6, "Green"));
		this.cards.push(new Card(7, "Green"));
		this.cards.push(new Card(8, "Green"));
		this.cards.push(new Card(9, "Green"));
		this.cards.push(new Card(10,"Green"));
		this.cards.push(new Card(11,"Green"));
		this.cards.push(new Card(12,"Green"));
		this.cards.push(new Card(13,"Green"));

		this.cards.push(new Card(1, "Blue"));
		this.cards.push(new Card(2, "Blue"));
		this.cards.push(new Card(3, "Blue"));
		this.cards.push(new Card(4, "Blue"));
		this.cards.push(new Card(5, "Blue"));
		this.cards.push(new Card(6, "Blue"));
		this.cards.push(new Card(7, "Blue"));
		this.cards.push(new Card(8, "Blue"));
		this.cards.push(new Card(9, "Blue"));
		this.cards.push(new Card(10,"Blue"))
		this.cards.push(new Card(11,"Blue"));
		this.cards.push(new Card(12,"Blue"));
		this.cards.push(new Card(13,"Blue"));

		this.cards.push(new Card(1, "Black"));
		this.cards.push(new Card(2, "Black"));
		this.cards.push(new Card(3, "Black"));
		this.cards.push(new Card(4, "Black"));
		this.cards.push(new Card(5, "Black"));
		this.cards.push(new Card(6, "Black"));
		this.cards.push(new Card(7, "Black"));
		this.cards.push(new Card(8, "Black"));
		this.cards.push(new Card(9, "Black"));
		this.cards.push(new Card(10,"Black"));
		this.cards.push(new Card(11,"Black"));
		this.cards.push(new Card(12,"Black"));
		this.cards.push(new Card(13,"Black"));

		

		
	},
}