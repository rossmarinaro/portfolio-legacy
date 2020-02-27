////////////////////////////////////////////pastaboss game menu screen////////////////
class MenuState extends Phaser.Scene{
  constructor(){
    super("MenuState");
  }   

create(){

		//music 
		this.introMusic = this.sound.add('intro_track');	
		musicIsPlaying === true ? this.introMusic.stop() : this.introMusic.play();
		// trippy background
			//timer
			this.time.delayedCall(2000, ()=>{	
			this.frames = ['', '', '', '', ''];
				for (var r = 0; r < this.frames.length; ++r){
					tilesprites[r] = this.add.tileSprite(r * 160, 0, 160, 600, 'bkgnd', this.frames[r]);
					tilesprites[r].setOrigin(0);
					tilesprites[r].setTint(0xff0ff, 0xffff00, 0x0000ff, 0xff0000);	
				}
				this.frames2 = ['', '', '', '', ''];
				for (var z = 0; z < this.frames2.length; ++z){
					tilesprites2[z] = this.add.tileSprite(z * 160, 0, 160, 600, 'bkgnd2', this.frames2[z]);
					tilesprites2[z].setOrigin(0);
					tilesprites2[z].setTint(0xff0ff, 0xffff00, 0x0000ff, 0xff0000);	
					tilesprites2[z].setAlpha(0);
					this.tweens.add({
						targets: tilesprites2[z], alpha: {value: 1, duration: 5000, ease: 'Power1'}, yoyo: true, repeat: -1
					});
				}
				this.frames3 = ['', '', '', '', ''];
				for (var z = 0; z < this.frames3.length; ++z){
					tilesprites3[z] = this.add.tileSprite(z * 160, 0, 160, 600, 'supreme_leader_cropped_fr1', this.frames3[z]);
					tilesprites3[z].setOrigin(0);
					tilesprites3[z].setTint(0xff0ff, 0xffff00, 0x0000ff, 0xff0000);	
					tilesprites3[z].setAlpha(0);
					this.tweens.add({
						targets: tilesprites3[z], alpha: {value: 1, duration: 5000, ease: 'Power1'}, yoyo: true, repeat: -1
					});
				}
			});
	///////////////////////////////////////////////////////////////////////////
	   //animated characters
		this.blocks = this.add.group({ key:'player', repeat: 300 });
		Phaser.Actions.GridAlign(this.blocks.getChildren(), {
				width: 16, cellWidth: 50, cellHeight: 50, x: 15, y: 0
			});
		let _this = this;
			let i = 0;
			this.blocks.children.iterate(function (child) {
				_this.tweens.add({
					targets: child, scaleX: 0, scaleY: 0, alpha: 0, y: '+=64', angle: 180, ease: 'Power3', duration: 1000, delay: 1000 + (i * 100)
				});							
				i++;
				if(i % 16 === 0){
					i = 0;
				}
				});
	this.time.delayedCall(2000, ()=>{
		this.startBool = false;
	////start game
	this.input.keyboard.once('keydown', ()=>{
		this.scene.start('PlayState_lv1');
		this.startBool = true;
		this.sound.stopAll();
	}, this);
	this.input.once('pointerdown', ()=>{
		this.scene.start('PlayState_lv1');
		this.startBool = true;
		this.sound.stopAll();
	}, this);
	////menu content
		this.pastabossText = this.add.image(385, 50, 'pastaboss_text').setScale(0.35);
		this.logoImage = this.add.image(385, 300, 'logo').setScale(0.8);
		this.add.text(330, 120, "Start game", {font: "25px Bangers", fill: '#ffff00'}).setStroke('#ff0000', 4).setShadow(2, 2, '#000000', true, false); 
		this.add.text(170, 500, `You are some sort of spaghetti monster humanoid hybrid!`, {font: "15px Digitizer", fill: "#ffff00"}).setStroke('#ff0000', 4).setShadow(2, 2, '#000000', true, false);
		this.add.text(215, 520, `Go on and frolic about, the world is your oyster...`, {font: "15px Digitizer", fill: "#ffff00"}).setStroke('#ff0000', 4).setShadow(2, 2, '#000000', true, false);
		this.add.text(50, 540, `use arrow keys, "W,A,S,D" and spacebar on desktop, or on-screen controls for mobile.`, {font: "15px Digitizer", fill: "#ffff00"}).setStroke('#ff0000', 4).setShadow(2, 2, '#000000', true, false);
		this.add.text(240, 570, `Developed by Ross Marinaro \u00a9REMAREMYINITIALS`, {font: "11px Digitizer", fill: "#ffff00"}).setStroke('#ff0000', 2).setShadow(2, 2, '#000000', true, false);
		player = this.add.sprite(250, 460, 'player').anims.play('walk').setInteractive();
		this.tweens.add({
			targets: player, x: 550, ease: 'Linear', duration: 5000, repeat: -1, yoyo: true, onYoyo: function(){
			player.flipX = true;
			player.anims.play('walk');
		this.time.delayedCall(5000, ()=>{
				player.flipX = false;
				player.anims.play('walk');
			});
			}, onYoyoScope: this, onYoyoParams: [], yoyoDelay: 0
		}); 
	////animated pastaboss
				//pastaboss animated
				this.anims.create({
					key: 'pastaboss_bass_anims',
					frames: [
						{key: 'pbb_fr1'},
							{key: 'pbb_fr2'},
								{key: 'pbb_fr3'},
									{key: 'pbb_fr4'},	
										{key: 'pbb_fr5'},
											{key: 'pbb_fr6'},
												{key: 'pbb_fr7'},
													{key: 'pbb_fr8'},
														{key: 'pbb_fr9'},
															{key: 'pbb_fr10'},
																{key: 'pbb_fr11'},
																	{key: 'pbb_fr12'},
																{key: 'pbb_fr11'},
															{key: 'pbb_fr10'},
														{key: 'pbb_fr9'},
													{key: 'pbb_fr8'},
												{key: 'pbb_fr7'},
											{key: 'pbb_fr6'},
										{key: 'pbb_fr5'},
									{key: 'pbb_fr4'},
								{key: 'pbb_fr3'},
							{key: 'pbb_fr2'},
						{key: 'pbb_fr1', duration: 80}
					],
					 frameRate: 24,
					 repeat: -1
				});
	this.pastaBass1 = this.add.sprite(100, 390, 'pbb_fr1').play('pastaboss_bass_anims', true).setScale(0.15);
	this.pastaBass2 = this.add.sprite(700, 390, 'pbb_fr1').play('pastaboss_bass_anims', true).setScale(0.15);
	this.pastaBass2.flipX = true;
	});
  } // end create method
  
  update(){

    
	  //tile sprites of players
	  var x = 1;
	  for (var i = 0; i < tilesprites.length; ++i){
		  tilesprites[i].tilePositionX += x;
		  tilesprites[i].tilePositionY += x;
		  x *= -1;
	  }
	  for (var i = 0; i < tilesprites2.length; ++i){
		tilesprites2[i].tilePositionX += x;
		tilesprites2[i].tilePositionY += x;
		x *= -1;
	}
	for (var i = 0; i < tilesprites3.length; ++i){
		tilesprites3[i].tilePositionX += x;
		tilesprites3[i].tilePositionY += x;
		x *= -1;
	}
	  iter += 0.01;


/////////////////////////////////////////////////////

	miniGame1Won = false;
	livesAvailable = 3;
	livesLeft = 3;
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
	this.playerSpeedBoost = false;
	this.playerInvincible = false;
	this.leftButtonState = false;
	this.jumpButtonState = false;
	this.rightButtonState = false;
	this.A_buttonState = false;
	this.B_buttonState = false;
	this.C_buttonState = false;
	this.playerFreeze = false;
    this.scorpTween1State = false;
  }


////////////
}