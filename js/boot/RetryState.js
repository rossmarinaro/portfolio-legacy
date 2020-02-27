////Retry Preez lmao Pastaboss game

class RetryState extends Phaser.Scene{
  constructor(){
    super("RetryState");
  }
  create(){
	 
	this.add.image(420, 600, "ulooked");
	this.add.text(230, 250, "Retry Preez Lmao", {font: "25px Arial", fill: "#ffff00"}); 
	this.continue_button = this.add.image(320, 110, 'continue');
			this.continue_button.setInteractive();
			this.continue_button.setScrollFactor(0);
			this.continue_button.setScale(0.25);
	this.losing_text = this.add.text( 150, 10, 'STOP SUCKING',
			{fontSize:'50px', fontFamily: 'Courier', fill:'#ffff00'});   
	this.losing_text.setScrollFactor(0);
	this.retry_text = this.add.text( 159, 45, 'RETRY PREEZ',
			{fontSize:'50px', fontFamily: 'Courier', fill: '#ffff00'});		
	this.ring = this.sound.add('ring');
	this.timedEvent = this.time.addEvent({
		delay: 2000,
		callback: onEvent,
		callbackScope: this
		});	
	function onEvent(){
	this.continue_button.on('pointerdown', function(){
	this.ring.play();
	this.scene.start('MenuState');        
	}, this);	
	this.input.keyboard.on('keydown', ()=>{	
				this.ring.play();
				this.scene.start('MenuState');
			}, this);
	}
	//check music	
	musicIsPlaying = false;
////end create
  }
  
  update(time, delta){
	  
		miniGame1Won = false;
		healthScore = 3;
		macaroniAvailable = 25; 
		beers = 0;
		coffees = 0;
		shrooms = 0;
		items = 0;
		this.coffeeSelected = false;
		this.beerSelected = false;
		this.shroomSelected = false;
		this.specialItemSelected = false;
		this.A_buttonState = false;
		this.B_buttonState = false;
		this.playerSpeedBoost = false;
		this.playerInvincible = false;
		this.leftButtonState = false;
		this.jumpButtonState = false;
		this.rightButtonState = false;
		this.playerFreeze = false;
	  
  }
}


