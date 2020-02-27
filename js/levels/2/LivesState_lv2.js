////pastaboss lives state
class LivesState_lv2 extends Phaser.Scene{
  constructor(){
    super("LivesState_lv2");
  }
  create(){
	  
	 
	//audio (music)
	this.dead = this.sound.add('dead');
			this.dead.play();
	//text
	this.oof = this.add.text(320, 400, "OOF!", {font: "45px Bangers", fill: '#ffff00'});
	this.livesLeftText = this.add.text(480, 280, "3", {font: "45px Bangers", fill: '#ffffff'});
	livesLeft--;
	this.livesLeftText.setText(livesLeft);
	// start game buttons
	this.face = this.add.sprite(350, 280, 'lives2');
	this.face.setInteractive();
	// if player lives score is 0 you lose
	if (livesAvailable <= 0){	
	this.dead.stop();
			this.scene.start('RetryState');
			this.gameOver = this.sound.add('game_over');
			this.gameOver.play();
		
	}
	this.timedEvent = this.time.addEvent({
		delay: 2000,
		callback: onEvent,
		callbackScope: this
		});	
		function onEvent(){
				if (livesAvailable >= 1){
				this.input.keyboard.on('keydown', ()=>{
					this.dead.stop();
					this.ring = this.sound.add('ring');	
					this.ring.play();
					this.scene.start('PlayState_lv2');
				}, this);
				this.face.on('pointerdown', ()=>{
				this.dead.stop();
				this.ring = this.sound.add('ring');
				this.ring.play();
				this.scene.start('PlayState_lv2');	
				}, this);
		  }
		}
  }// end create function

  //update
  update()
  {
	
	
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
////////////
}