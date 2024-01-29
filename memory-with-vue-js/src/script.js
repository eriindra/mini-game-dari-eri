// List of font awesome codes used as illustrations, can be modified
const icons = [
	'fa-kiwi-bird',
  'fa-chess',
  'fa-frog',
  'fa-camera-retro',
  'fa-plug',
  'fa-anchor',
  'fa-birthday-cake',
  'fa-cube',
  'fa-dice',
  'fa-bug',
  'fa-cut',
  'fa-gem'
];

// Duplicate elements of an array
const duplicate = (arr) => {
	return arr.concat(arr).sort()
};

// Check if two cards are a match
const checkMatch = (icons) => {
	if (icons[0] === icons[1]) {
  	console.log("it's a match");
  	return true;
  }
};

new Vue({
  el: "#app",
  data: {
    cards: _.range(0, icons.length * 2),
    runing: false
  },
  methods: {
  	// Create cards array based on icons, shuffle them
  	cardsShuffle() {
    	// prep objects
    	this.cards.forEach((card, index) => {
      	this.cards[index] = {
        	icon: '',
          down: true,
          matched: false
        }
      });
      // input every icon two times
    	icons.forEach((icon, index) => {
        this.cards[index].icon = icon;
        this.cards[index + icons.length].icon = icon;
      });
      this.cards = _.shuffle(this.cards);
    },
    handleClick(cardClicked) {
    	if (!this.runing) {
      	// turn card up
      	if (!cardClicked.matched && this.cardCount.cardsUp < 2) {
     	 		cardClicked.down = false;
     	 	}
        // when two cards are up, check if they match or turn them down
        if (this.cardCount.cardsUp === 2) {
        	this.runing = true;
          setTimeout(() => {
     	 			let match = checkMatch(this.cardCount.icons);
     	 			this.cards.forEach((card) => {
     	 				if (match && !card.down && !card.matched) {
     	 					card.matched = true;
     	 				} else {
     	 	 				card.down = true;
     	 	 			}
     	 			});
         		this.runing = false;
     	 		}, 1500);
        }
      }
    }
  },
  mounted() {
  	this.cardsShuffle();
  },
  computed: {
  	// make a count of cards up and cards matched, keep icons of cards to check in array
  	cardCount: function() {
    	let cardUpCount = 0;
      let cardMatchedCount = 0;
      let icons = [];
    	this.cards.forEach((card) => {
      	if (!card.down && !card.matched) {
        	cardUpCount++;
          icons.push(card.icon);
        }
        if (card.matched) {
        	cardMatchedCount++;
        }
      });
      return {
      	cardsUp: cardUpCount, 
        cardsMatched: cardMatchedCount,
        icons: icons}
    },
    // update victory state
    victory: function() {
    	if (this.cardCount.cardsMatched === this.cards.length) {
      	return true;
      }
    }
  }
})