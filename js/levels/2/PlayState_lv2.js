
//// Pastaboss game Playstate script


class PlayState_lv2 extends Phaser.Scene {
  constructor() {
    super("PlayState_lv2");
  }


////create
  
create() {

	
//	doughAvailable = 0;

	//pipelines
		this.customPipeline = game.renderer.addPipeline('Custom', new CustomPipeline(game));
		this.customPipeline.setFloat2('uResolution', game.config.width, game.config.height);
		//wavy render
		this.customPipeline2 = game.renderer.addPipeline('Custom2', new CustomPipeline2(game));
		this.customPipeline2.setFloat2('resolution', this.game.config.width, game.config.height);
		//color change render
		this.customPipeline3 = game.renderer.addPipeline('Custom3', new CustomPipeline3(game));
		this.customPipeline3.setFloat2('resolution', game.config.width, game.config.height);
		this.customPipeline4 = game.renderer.addPipeline('Custom4', new CustomPipeline4(game));
		this.customPipeline4.setFloat2('resolution', game.config.width, game.config.height);
		this.pipelineTime = 0;
		this.socket = io();
		this.socket.emit('delete');		
		//cursors and keys 'WASD'
		cursors = this.input.keyboard.createCursorKeys();	
		this.WKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
		this.AKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
		this.SKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
		this.DKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);


		//warp sound
		this.warp = this.sound.add('warp');
		this.warp.play();

		//background
		this.bkgnd = 
		this.add.image(0, 50, 'pixel').setScale(1100);
		this.rect = new Phaser.Geom.Rectangle(100, 1300, 3000, 5000);
		this.graphics = this.add.graphics({fillStyle: {color: 0x000000}});
		this.graphics.fillRectShape(this.rect);
		//music
		this.ring = this.sound.add('ring');
		this.ring.play();
		this.mainTheme = this.sound.add('level1');
		this.mainTheme.play();
		this.mainTheme.setLoop(this.loop);	
		// load the map 
		let map = this.add.tilemap('map');
		this.load.image('map',  'assets/map.png');
		// tiles for the ground layer, background image
		//clouds

		this.add.image(500, 600, 'clouds').setScale(3);
		this.add.image(900, 650, 'clouds').setScale(3);
		this.add.image(1300, 600, 'clouds').setScale(3);
		this.add.image(1700, 650, 'clouds').setScale(3);
		this.add.image(2000, 600, 'clouds').setScale(3);
		this.add.image(2500, 650, 'clouds').setScale(3);
		this.add.image(3000, 600, 'clouds').setScale(3);
		this.add.image(3500, 650, 'clouds').setScale(3);
		this.add.image(4000, 600, 'clouds').setScale(3);
		this.add.image(4500, 650, 'clouds').setScale(3);
		this.add.image(5000, 600, 'clouds').setScale(3);
		this.add.image(5500, 650, 'clouds').setScale(3);
		this.add.image(6000, 650, 'clouds').setScale(3);
		this.add.image(6500, 650, 'clouds').setScale(3);
		this.add.image(7000, 650, 'clouds').setScale(3);
		this.add.image(5000, 1200, 'clouds').setScale(3);
		this.add.image(6500, 1200, 'clouds').setScale(3);
		this.add.image(6000, 1200, 'clouds').setScale(3);
		this.add.image(7500, 1200, 'clouds').setScale(3);
		this.backdropTiles = map.addTilesetImage('tiles2');
		this.backdrop = map.createStaticLayer('bkgnd', this.backdropTiles, 0, 0);
		let backdropTiles2 = map.addTilesetImage('tiles3');
		this.backdropUnderground = map.createStaticLayer('bkgnd2', backdropTiles2, 0, 0);
		let groundTiles = map.addTilesetImage('tiles');
		let groundTiles2 = map.addTilesetImage('tiles3');
		let groundLayer = [ 
			 map.createStaticLayer('World', groundTiles, 0, 0).setCollisionByExclusion([-1]),
			 map.createStaticLayer('World2', groundTiles2, 0, 0).setCollisionByExclusion([-1])
		];
		let macaroniItemTiles = map.addTilesetImage('coin');   
		macaroniPickupLayer = map.createDynamicLayer('Coins', macaroniItemTiles, 0, 0);
		//world parameters
		this.physics.world.bounds.width = groundLayer.width;   
		this.physics.world.bounds.height = groundLayer.height; 
			// enemy movement groups 
			this.enemyStatic = this.physics.add.staticGroup();
			this.enemyMoving = this.physics.add.group();
			this.bossFire = this.physics.add.group();
			this.enemies = [
				this.enemyStatic, this.enemyMoving, this.bossFire
			];	
		// game instruction text
		this.gameInstructionText = this.add.text(300, 750, 'CARB UP!', {font: "35px Bangers", fill: '#FFFF00'}).setStroke("#ff0000", 4).setShadow(2, 2, '#000000', true, false);
		this.input.keyboard.on('keydown', ()=>{
			this.tweens.add({
				targets: this.gameInstructionText, alpha: {value: 0, duration: 3000, ease:'Power1'}, duration: 3000,
				onComplete: function(){
				//	this.gameInstructionTxt.destroy();
				},
				onCompleteScope: this
			}, this);	
		});
		this.input.on('pointerdown',  ()=>{	
			this.tweens.add({
				targets: this.gameInstructionText, alpha: {value: 0, duration: 3000, ease:'Power1'}, duration: 3000,
				onComplete: function(){
				//	this.gameInstructionTxt.destroy();
				},
				onCompleteScope: this
			}, this);	
		});
	//	this.monkfish = this.enemyStatic.create(800, 800, 'monkfish');
		//cheese pits
		this.cheese_pit1 = this.enemyStatic.create(910, 1015, 'cheese_pit1').play('cheese_pit_anims').setOffset(0, 40).setScale(0.65, 0.7);
		this.cheese_pit2 = this.enemyStatic.create(2520, 1015, 'cheese_pit1').play('cheese_pit_anims').setOffset(0, 40).setScale(0.65, 0.7);
		this.cheese_pit3 = this.enemyStatic.create(3360, 1046, 'cheese_pit1').play('cheese_pit_anims').setScale(1.3);	
		this.cheese_pit4 = this.enemyStatic.create(6640, 1555, 'cheese_pit1').play('cheese_pit_anims').setScale(1.23);
		this.cheese_pit5 = this.enemyStatic.create(6902, 1555, 'cheese_pit1').play('cheese_pit_anims').setScale(1.23);
		this.cheese_pit6 = this.enemyStatic.create(7165, 1555, 'cheese_pit1').play('cheese_pit_anims').setScale(1.23);
		this.cheese_pit7 = this.enemyStatic.create(7428, 1555, 'cheese_pit1').play('cheese_pit_anims').setScale(1.23);

		////////// health, ammo, and lives text  ///////////////////////////////////////////////////////
		// health text
		this.playerInterface = this.add.image(150, 60, 'player_interface').setScrollFactor(0);
		this.health1TextBase = this.text = this.add.text(20, 20,  '\u2764', { 	
		fontSize: '30px', fill: '#ff0000'
		}).setScrollFactor(0).setShadow(2, 2, '#000000', true, false);
		this.health1TextMiddle = this.text = this.add.text(20, 20,  '\u2764', { 	
		fontSize: '30px', fill: '#ffffff'
		}).setScrollFactor(0).setShadow(2, 2, '#000000', true, false);
		//low health tween
	 	 this.tweens.add({
		targets: this.health1TextMiddle, alpha: {value: 0.2, duration: 1000, ease: 'Power1'},repeat: -1,	yoyo: true
		});
		this.health1TextTop = this.text = this.add.text(20, 20,  '\u2764', { 	
		fontSize: '30px', fill: '#ffffff'
		}).setScrollFactor(0).setShadow(2, 2, '#000000', true, false);
		this.text2 = this.add.text(25, 60,  '3', {
		fontSize: '20px', fontFamily: 'Digitizer', fill: '#ffffff'
		}).setScrollFactor(0).setShadow(2, 2, '#000000', true, false);
		// macaroni available
		this.macaroniText = this.add.text(110, 15, 'Macaroni :', {
			fontSize: '25px', fontFamily: 'Bangers', fill: '#ffffff'
		}).setScrollFactor(0).setShadow(2, 2, '#000000', true, false);
		this.macaroniText2 = this.add.text(130, 60, '25', {
			fontSize: '20px', fontFamily: 'Digitizer', fill: '#ffffff'
		}).setScrollFactor(0).setShadow(2, 2, '#000000', true, false);	
		// lives available
		this.lives = this.add.image(260, 30, 'lives').setScrollFactor(0);
		livesText = this.add.text(245, 60, '3', {
			fontSize: '20px', fontFamily: 'Digitizer', fill: '#ffffff'
		}).setScrollFactor(0).setShadow(2, 2, '#000000', true, false);
		//low health
		this.text3 = this.add.text(10, 80,  'Low health!', {
		fontSize: '15px', fontFamily: 'Bangers', fill: '#ff0000'
		}).setScrollFactor(0).setShadow(2, 2, '#000000', true, false);
		this.tweens.add({
			targets: this.text3, scale: 1.2, ease: 'Linear', duration: 1000, repeat: -1,	yoyo: true
		});
	////items interface
	this.itemsInterface = this.add.image(650, 60, 'items_interface').setScrollFactor(0);
	//powerup
	this.add.text(530, 20, 'Power-Ups', {
		fontSize: '20px', fontFamily: 'Bangers', fill: '#ffffff'
	}).setScrollFactor(0).setShadow(2, 2, '#000000', true, false);
	//items
	 this.itemBase = this.add.text(640, 20, 'Item', {
		fontSize: '20px', fontFamily: 'Bangers', fill: '#ffff00'
	}).setScrollFactor(0).setShadow(2, 2, '#000000', true, false);
	 this.itemMiddle = this.add.text(640, 20, 'Item', {
		fontSize: '20px', fontFamily: 'Bangers', fill: '#ffffff'
	}).setScrollFactor(0).setShadow(2, 2, '#000000', true, false);
	this.itemTweenMiddle = this.tweens.add({
		targets: this.itemMiddle, alpha: {value:0.2, duration: 1000,	ease: 'Power1'}, duration: 1000,	repeat: -1,	yoyo: true
	});
	this.itemTop = this.add.text(640, 20, 'Item', {
		fontSize: '20px', fontFamily: 'Bangers', fill: '#ffffff'
	}).setScrollFactor(0).setShadow(2, 2, '#000000', true, false);
	//dough
	this.add.text(720, 20, 'Dough', {
		fontSize: '20px', fontFamily: 'Bangers', fill: '#ffffff'
	}).setScrollFactor(0).setShadow(2, 2, '#000000', true, false);
	//dough quantity
	this.doughQuantity = this.add.text(740, 60, doughAvailable, {
		fontSize: '25px', fontFamily: 'Digitizer', fill: '#ffffff'
	}).setScrollFactor(0).setShadow(2, 2, '#000000', true, false);
	this.doughQuantity.setText(doughAvailable);
/////////////////////////////////////////////////////////////////////////


	//pizza oven
		this.pizzaOven = this.add.sprite(450, 1600, 'pizza_oven_fr1');
		this.ovenOn = false;  
	//exit
		let doorLv1 = this.physics.add.staticGroup();
		doorLv1.create(145, 1685, 'exit');	
	// player sprite    
		player =  this.physics.add.sprite(200, 940, 'player'),	
		player.setBounce(0.2); // our player will bounce from items
		player.setCollideWorldBounds(true); // don't go out of the map    
		player.body.setSize(player.width, player.height-8);
		player.setFriction(1000, 100);
		player.body.accelGround = 1000,
		player.body.accelAir = 600;
		player.body.jumpSpeed = 500;
		this.drunkBubbles = this.add.sprite(0, 0, 'bubble_fr1').setScale(1.5).play('bubble_anims').setVisible(false);
		//////////////////////////////////////////////////////////////////////////////////////////////////////////////
		//////cameras 
		this.cameras.main.clearRenderToTexture();
		this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
		this.cameras.main.startFollow(player); 
///////////////////////////	

//macaroni cut off zones
this.zoneFront = this.add.zone(player.x, player.y).setSize(50, 1500);
this.physics.world.enable(this.zoneFront);
this.zoneFront.body.setAllowGravity(false).setImmovable(false);
this.zoneBack = this.add.zone(player.x, player.y).setSize(50, 1500);
this.physics.world.enable(this.zoneBack);
this.zoneBack.body.setAllowGravity(false).setImmovable(false);




////player weapons

	//rolling pin
	this.rollingPinWeapon = this.physics.add.staticGroup();
	//macaroni
		// Get bullet from bullets group
		this.macaronis = this.physics.add.group();

///////////////////

		// level pick ups
		let pickups = this.physics.add.group();
        this.healthPickup = pickups.create(5630, 400, 'ikura');
		this.healthPickup2 = pickups.create(2350, 1550, 'salmon');
		this.healthPickup3 = pickups.create(1230, 400, 'ikura');
		this.healthPickup4 = pickups.create(4980, 800, 'ikura');
	    this.healthPickup5 = pickups.create(2400, 1550, 'salmon');
		this.healthPickup6 = pickups.create(3900, 800, 'salmon');
	    this.healthPickup7 = pickups.create(6666, 50, 'ikura');
		this.healthPickup8 = pickups.create(2450, 1550, 'salmon');
		//power up
		this.coffee1 = pickups.create(1000, 300, 'coffee_fr1').play('coffee_anims');
		this.coffee2 = pickups.create(7500, 200, 'coffee_fr1').play('coffee_anims');
		this.beer1 =  pickups.create(4380, 1200, 'beer');
		//items
		this.spatula = pickups.create(7575, 800, 'spatula');
		//dough
		this.dough1 = pickups.create(1450, 895, 'dough').setVisible(false);
		this.dough1.body.setAllowGravity(false);
		this.dough2 = pickups.create(3000, 895, 'dough').setVisible(false);
		this.dough2.body.setAllowGravity(false);
		this.dough3 = pickups.create(6260, 1390, 'dough').setVisible(false);
		this.dough3.body.setAllowGravity(false);
		//
		this.dough5 = pickups.create(400, 1720, 'dough').setVisible(false);
		this.dough5.body.setAllowGravity(false);
		this.dough6 = pickups.create(420, 1720, 'dough').setVisible(false);
		this.dough6.body.setAllowGravity(false);
		this.dough7 = pickups.create(440, 1720, 'dough').setVisible(false);
		this.dough7.body.setAllowGravity(false);
		this.dough8 = pickups.create(460, 1720, 'dough').setVisible(false);
		this.dough8.body.setAllowGravity(false);
		this.dough9 = pickups.create(480, 1720, 'dough').setVisible(false);
		this.dough9.body.setAllowGravity(false);
		this.dough10 = pickups.create(500, 1720, 'dough').setVisible(false);
		this.dough10.body.setAllowGravity(false);
		//
		
		
		
	//// pick up items	     		 
//macaroni (coin) tile collision
		macaroniPickupLayer.setTileIndexCallback(17, collectmacaroni, this);   
		this.physics.add.overlap(player, macaroniPickupLayer);
		function collectmacaroni(player, tile) {                 
		macaroniPickupLayer.removeTileAt(tile.x, tile.y);  
		this.macaroniRing = this.sound.add('macaroni_ring');
		this.macaroniRing.play();
		macaroniAvailable++; 
		this.macaroniText2.setText(macaroniAvailable); 
		return false;
		}
////player picks up items for health
			this.physics.add.collider(player, this.healthPickup, ()=>{	
			this.healthPickup.disableBody(true, true);
			this.healthPickup.destroy();
			healthScore++;
			this.text2.setText(healthScore);
			this.healthRing = this.sound.add('health_ring');
			this.healthRing.play();
			});
			this.physics.add.collider(player, this.healthPickup2, ()=>{
			this.healthPickup2.disableBody(true, true);
			this.healthPickup2.destroy();
			healthScore++;
			this.text2.setText(healthScore);
			this.healthRing = this.sound.add('health_ring');
			this.healthRing.play();
			});
			this.physics.add.collider(player, this.healthPickup3, ()=>{
			this.healthPickup3.disableBody(true, true);
			this.healthPickup3.destroy();
			healthScore++;
			this.text2.setText(healthScore);
			this.healthRing = this.sound.add('health_ring');
			this.healthRing.play();
			});
			this.physics.add.collider(player, this.healthPickup4, ()=>{
			this.healthPickup4.disableBody(true, true);
			this.healthPickup4.destroy();
			healthScore++;
			this.text2.setText(healthScore);
			this.healthRing = this.sound.add('health_ring');
			this.healthRing.play();
			});
			this.physics.add.collider(player, this.healthPickup5, ()=>{
			this.healthPickup5.disableBody(true, true);
			this.healthPickup5.destroy();
			healthScore++;
			this.text2.setText(healthScore);
			this.healthRing = this.sound.add('health_ring');
			this.healthRing.play();
			});
			this.physics.add.collider(player, this.healthPickup6, ()=>{
			this.healthPickup6.disableBody(true, true);
			this.healthPickup6.destroy();
			healthScore++;
			this.text2.setText(healthScore);
			this.healthRing = this.sound.add('health_ring');
			this.healthRing.play();
			});
			this.physics.add.collider(player, this.healthPickup7, ()=>{
			this.healthPickup7.disableBody(true, true);
			this.healthPickup7.destroy();
			healthScore++;
			this.text2.setText(healthScore);
			this.healthRing = this.sound.add('health_ring');
			this.healthRing.play();
			});
			this.physics.add.collider(player, this.healthPickup8, ()=>{
			this.healthPickup8.disableBody(true, true);
			this.healthPickup8.destroy();
			healthScore++;
			this.text2.setText(healthScore);
			this.healthRing = this.sound.add('health_ring');
			this.healthRing.play();
			});	
		////
		// dough
			this.physics.add.collider(player, this.dough1, ()=>{
				this.dough1.destroy();
				doughAvailable++;
				this.doughQuantity.setText(doughAvailable);
				this.healthRing = this.sound.add('dough_sound');
				this.healthRing.play();
				});	
			this.physics.add.collider(player, this.dough2, ()=>{
				this.dough2.destroy();
				doughAvailable++;
				this.doughQuantity.setText(doughAvailable);
				this.healthRing = this.sound.add('dough_sound');
				this.healthRing.play();
				});
			this.physics.add.collider(player, this.dough3, ()=>{
				this.dough3.destroy();
				doughAvailable++;
				this.doughQuantity.setText(doughAvailable);
				this.healthRing = this.sound.add('dough_sound');
				this.healthRing.play();
				});
				this.physics.add.collider(player, this.dough5, ()=>{
					this.dough5.destroy();
					doughAvailable++;
					this.doughQuantity.setText(doughAvailable);
					this.healthRing = this.sound.add('dough_sound');
					this.healthRing.play();
					});
				this.physics.add.collider(player, this.dough6, ()=>{
					this.dough6.destroy();
					doughAvailable++;
					this.doughQuantity.setText(doughAvailable);
					this.healthRing = this.sound.add('dough_sound');
					this.healthRing.play();
					});	
				this.physics.add.collider(player, this.dough7, ()=>{
					this.dough7.destroy();
					doughAvailable++;
					this.doughQuantity.setText(doughAvailable);
					this.healthRing = this.sound.add('dough_sound');
					this.healthRing.play();
					});
				this.physics.add.collider(player, this.dough8, ()=>{
					this.dough8.destroy();
					doughAvailable++;
					this.doughQuantity.setText(doughAvailable);
					this.healthRing = this.sound.add('dough_sound');
					this.healthRing.play();
					});
				this.physics.add.collider(player, this.dough9, ()=>{
					this.dough9.destroy();
					doughAvailable++;
					this.doughQuantity.setText(doughAvailable);
					this.healthRing = this.sound.add('dough_sound');
					this.healthRing.play();
					});
				this.physics.add.collider(player, this.dough10, ()=>{
					this.dough10.destroy();
					doughAvailable++;
					this.doughQuantity.setText(doughAvailable);
					this.healthRing = this.sound.add('dough_sound');
					this.healthRing.play();
					});
				
////////////////////////////////////////////////////////////////////////////////////////

////power up collisions
	
	

//coffee
	 this.coffeeSelected = false;
	this.playerSpeedBoost = false;
			this.physics.add.collider(player, this.coffee1, ()=>{
				this.sick = this.sound.add('sick');
				this.sick.play();
				this.coffee1.destroy();
				coffees = 1;
					this.coffeeSelected = true;
					this.beerSelected = false;
					this.shroomSelected = false;
					this.specialItemSelected = false;			
	});

//coffee 2
		this.physics.add.collider(player, this.coffee2, ()=>{
			this.sick = this.sound.add('sick');
			this.sick.play();
			this.coffee2.destroy();
			coffees = 1;
				this.coffeeSelected = true;
				this.beerSelected = false;
				this.shroomSelected = false;
				this.specialItemSelected = false;
			
});
////////////////////////////////////////////////////////////////////
////beer
 this.beerSelected = false;
this.playerInvincible = false;
 this.physics.add.collider(player, this.beer1, ()=>{
		this.sick = this.sound.add('sick');
		this.sick.play();
		this.beer1.destroy();
		beers = 1;
			this.beerSelected = true;
			this.coffeeSelected = false;
			this.shroomSelected = false;
			this.specialItemSelected = false;
	});
			//bass item
			/*	 this.physics.add.collider(player, this.bass, ()=>{
					this.bass.destroy();
					this.bassItemsInterface = this.add.sprite(640, 70, 'the_shredder').setScrollFactor(0).setScale(0.7).setInteractive();
					if (this.bassItemsInterface)
					{
						this.bassItemsInterface.on('pointerdown', ()=>{	
							this.bassItemsButton = this.add.sprite(640, 450, 'the_shredder').setScrollFactor(0).setInteractive().setScale(0.8); 
						});
						this.input.keyboard.on('keydown-' + 'D', ()=>{
							this.bassItemsButton = this.add.sprite(640, 450, 'the_shredder').setScrollFactor(0).setInteractive().setScale(0.8); 
						});
						// if bass item button exists
						if (this.bassItemsButton)
						{	
							this.bassItemsButton.on('pointerover', ()=>{	
								this.bassItemsButton.tint = 0x08511B;
							});
							this.bassItemsButton.on('pointerout', ()=>{	
								this.bassItemsButton.tint = 0xffffff;
							});
						}	
				}
			});*/

 ////spatula
 this.specialItemSelected = false;
 this.physics.add.collider(player, this.spatula, ()=>{
		this.sick = this.sound.add('sick');
		this.sick.play();
		this.spatula.destroy();
		items = 1;
			this.beerSelected = false;
			this.coffeeSelected = false;
			this.shroomSelected = false;
			this.specialItemSelected = true;	
 	});

 
/////////////////////////////////////////////////////////////   LEVEL 1 COMPLETE! (collision with weed)  ///////////////////////////
				this.physics.add.overlap(player, doorLv1, ()=>{
			this.cameras.main.fade(300, 0, 0, 0, false, function(camera, progress){
				if(progress > .9){
					this.socket.emit('level1_complete');
					this.mainTheme.stop();
					this.scene.stop('PlayState_lv2');
					this.scene.start('PreloadState_lv3');	
					miniGame1Won = false;
					game.renderer.removePipeline('Custom');
					game.renderer.removePipeline('Custom2');
					game.renderer.removePipeline('Custom3');
					game.renderer.removePipeline('Custom4');
				}
			});	
    	});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////		
		
		//	let x = (player.x < 0) ? Phaser.Math.Between(2200, 3200 ) : Phaser.Math.Between(2200, 3200); 
		
	///////////////enemy spawns	
		
			 //chili facing left
			this.chili = this.enemyStatic.create(1450, 940, 'chili_fr1').play('chili_loop');	 
			this.chili2 = this.enemyStatic.create(3000, 940, 'chili_fr1').play('chili_loop');
			this.chili3 = this.enemyStatic.create(6260, 1430, 'chili_fr1').play('chili_loop');
			// chili fireballs
			this.fireBall1 = this.enemyMoving.create(1450, 930, 'fire_fr1').play('fireball_anims').setScale(0.4);
			this.fireBall1.angle = 90;
			this.fireBall1.body.setAllowGravity(false);
			this.fireBall1Tween = this.tweens.add({
				targets: this.fireBall1, x: 1350, y: 920, ease: 'Linear', duration: 1000, repeat: -1, yoyo: false
			});
			this.fireBall2 = this.enemyMoving.create(3000, 940, 'fire_fr1').play('fireball_anims').setScale(0.4);
			this.fireBall2.angle = 90;
			this.fireBall2.body.setAllowGravity(false);
			this.fireBall2Tween = this.tweens.add({
				targets: this.fireBall2, x: 2900, y: 930, ease: 'Linear', duration: 1000, repeat: -1, yoyo: false
			});
			this.fireBall3 = this.enemyMoving.create(6260, 1430, 'fire_fr1').play('fireball_anims').setScale(0.4);
			this.fireBall3.angle = 90;
			this.fireBall3.body.setAllowGravity(false);
			this.fireBall3Tween = this.tweens.add({
				targets: this.fireBall3, x: 6160, y: 1430, ease: 'Linear', duration: 1000, repeat: -1, yoyo: false
			});
				
			// chili health points
			this.chiliHealth = 3;
			this.chili2Health = 3;
			this.chili3Health = 3;
			
			//meatballs
			this.meatball = this.enemyMoving.create(4200, 400, 'meatball_fr1').play('meatball_loop').setBounce(1).setCollideWorldBounds(true).setVelocity(Phaser.Math.Between(-200, 200), 20);
			this.dough4 = pickups.create(this.meatball.x, this.meatball.y, 'dough').setVisible(false);
			this.dough4.body.setAllowGravity(false);
			this.physics.add.overlap(player, this.dough4, ()=>{
				this.dough4.destroy();
				doughAvailable++;
				this.doughQuantity.setText(doughAvailable);
				this.healthRing = this.sound.add('dough_sound');
				this.healthRing.play();
			});
			this.meatball2 = this.enemyMoving.create(4400, 700, 'meatball_fr1').play('meatball_loop').setBounce(1).setCollideWorldBounds(true).setVelocity(Phaser.Math.Between(-200, 200), 20);	
			this.dough11 = pickups.create(this.meatball2.x, this.meatball2.y, 'dough').setVisible(false);
			this.dough11.body.setAllowGravity(false);
			this.physics.add.overlap(player, this.dough11, ()=>{
				this.dough11.destroy();
				doughAvailable++;
				this.doughQuantity.setText(doughAvailable);
				this.healthRing = this.sound.add('dough_sound');
				this.healthRing.play();
			});
			this.meatball3 = this.enemyMoving.create(4000, 800, 'meatball_fr1').play('meatball_loop').setBounce(1).setCollideWorldBounds(true).setVelocity(Phaser.Math.Between(-200, 200), 20);
			this.dough12 = pickups.create(this.meatball3.x, this.meatball3.y, 'dough').setVisible(false);
			this.dough12.body.setAllowGravity(false);
			this.physics.add.overlap(player, this.dough12, ()=>{
				this.dough12.destroy();
				doughAvailable++;
				this.doughQuantity.setText(doughAvailable);
				this.healthRing = this.sound.add('dough_sound');
				this.healthRing.play();
			});
			this.meatball3.flipX = true;
			this.meatball4 = this.enemyMoving.create(4200, 900, 'meatball_fr1').play('meatball_loop').setBounce(1).setCollideWorldBounds(true).setVelocity(Phaser.Math.Between(-200, 200), 20);
			this.meatball4.flipX = true;
			this.meatball.allowGravity = true;
			this.meatball2.allowGravity = true;
			this.meatball3.allowGravity = true;
			this.meatball4.allowGravity = true;
			// level 1 boss
			this.levelBoss = this.enemyMoving.create(450, 1720, 'boss1').play('boss_idle').setScale(0.7);
			this.levelBoss.setImmovable(true);
			this.levelBoss.body.setAllowGravity(false);
			this.levelBoss.setSize(300, 350, true);
			//layer2
			this.levelBoss2 = this.add.sprite(450, 1720, 'boss1').play('boss_idle').setScale(0.7);
			this.levelBoss2.tint = 0xff0000;
			this.bossTween = this.tweens.add({
				targets: this.levelBoss2, alpha: {value: 0, duration: 1000, ease: 'Power1'}, yoyo: true, repeat: -1
			});
			//layer 3
			this.levelBoss3 = this.add.sprite(450, 1720, 'boss1').play('boss_idle').setScale(0.7);
			// level 1 boss health points
			this.levelBossHealth = 10;
			this.pizzaDead = false;
			this.bossZone = this.add.zone(420, 1720).setSize(50, 500);
			this.physics.world.enable(this.bossZone);
			this.bossZone.body.setAllowGravity(false).setImmovable(true);
			this.physics.add.collider(player, this.bossZone);
			
///////////////////////////////////////////////////////////////////////////////////
//enemy collisions with weapons

		// chili 1
		this.physics.add.overlap(this.rollingPinWeapon, this.chili, ()=>{	
			this.chiliHealth--;
			this.chili.tint = 0xff0000;
			this.chiliHit = this.sound.add('chili_hit');
			this.time.delayedCall(150, ()=>{
				this.chiliHit.play();
				this.chili.tint = 0xffffff;
			});				
		});
		this.physics.add.overlap(this.macaronis, this.chili, ()=>{
			this.chiliHealth--;
			this.chili.tint = 0xff0000;
			this.chiliHit = this.sound.add('chili_hit');
			this.macaronis.getChildren().map(child => child.destroy());
			this.time.delayedCall(150, ()=>{
				this.chiliHit.play();
				this.chili.tint = 0xffffff;
			});			
		});
		// chili 2
		this.physics.add.overlap(this.rollingPinWeapon, this.chili2, ()=>{	
			this.chili2Health--;
			this.chili2.tint = 0xff0000;
			this.chiliHit = this.sound.add('chili_hit');
			this.time.delayedCall(150, ()=>{
				this.chiliHit.play();
				this.chili2.tint = 0xffffff;
			});				
		});
		this.physics.add.overlap(this.macaronis, this.chili2, ()=>{
			this.chili2Health--;
			this.chili2.tint = 0xff0000;
			this.chiliHit = this.sound.add('chili_hit');
			this.macaronis.getChildren().map(child => child.destroy());
			this.time.delayedCall(150, ()=>{
			this.chiliHit.play();
			this.chili2.tint = 0xffffff;
			});		
		});
		// chili 3
			this.physics.add.overlap(this.rollingPinWeapon, this.chili3, ()=>{	
			this.chili3Health--;
			this.chili3.tint = 0xff0000;
			this.chiliHit = this.sound.add('chili_hit');
			this.time.delayedCall(150, ()=>{
				this.chiliHit.play();
				this.chili3.tint = 0xffffff;
			});				
		});
		this.physics.add.overlap(this.macaronis, this.chili3, ()=>{	
			this.chili3Health--;
			this.chili3.tint = 0xff0000;
			this.chiliHit = this.sound.add('chili_hit');
			this.macaronis.getChildren().map(child => child.destroy());
			this.time.delayedCall(150, ()=>{
				this.chiliHit.play();
				this.chili3.tint = 0xffffff;
			});				
		});	
		//meatball 1
		this.physics.add.overlap(this.rollingPinWeapon, this.meatball, ()=>{
			this.meatball.tint = 0x000000;
			this.meatballHit = this.sound.add('meatball_hit');
			this.time.delayedCall(150, ()=>{
				this.meatballHit.play();
				this.meatball.destroy();
				this.dough4.setVisible(true);
			});
		});
		this.physics.add.overlap(this.macaronis, this.meatball, ()=>{
			this.meatball.tint = 0x000000;
			this.meatballHit = this.sound.add('meatball_hit');
			this.macaronis.getChildren().map(child => child.destroy());
			this.time.delayedCall(150, ()=>{
				this.meatballHit.play();
				this.meatball.destroy();
				this.dough4.setVisible(true);
			});
		});
		//meatball 2
		this.physics.add.overlap(this.rollingPinWeapon, this.meatball2, ()=>{
			this.meatball2.tint = 0x000000;
			this.meatballHit = this.sound.add('meatball_hit');
			this.time.delayedCall(150, ()=>{
				this.meatballHit.play();
				this.meatball2.destroy();
				this.dough4.setVisible(true);
			});
		});
		this.physics.add.overlap(this.macaronis, this.meatball2, ()=>{
			this.meatball2.tint = 0x000000;
			this.meatballHit = this.sound.add('meatball_hit');
			this.macaronis.getChildren().map(child => child.destroy());
		this.time.delayedCall(150, ()=>{
				this.meatballHit.play();
				this.meatball2.destroy();
				this.dough11.setVisible(true);
			});		
		});
		//meatball 3
		this.physics.add.overlap(this.rollingPinWeapon, this.meatball3, ()=>{
			this.meatball.tint = 0x000000;
			this.meatballHit = this.sound.add('meatball_hit');
			this.time.delayedCall(150, ()=>{
				this.meatballHit.play();
				this.meatball.destroy();
				this.dough4.setVisible(true);
			});
		});
		this.physics.add.overlap(this.macaronis, this.meatball3, ()=>{
			this.meatball3.tint = 0x000000;
			this.meatballHit = this.sound.add('meatball_hit');
			this.macaronis.getChildren().map(child => child.destroy());
			this.time.delayedCall(150, ()=>{
				this.meatballHit.play();
				this.meatball3.destroy();
				this.dough12.setVisible(true);
			});
		});
		//meatball 4
		this.physics.add.overlap(this.rollingPinWeapon, this.meatball4, ()=>{
			this.meatball4.tint = 0x000000;
			this.meatballHit = this.sound.add('meatball_hit');
			this.time.delayedCall(150, ()=>{
				this.meatballHit.play();
				this.meatball4.destroy();
				this.dough4.setVisible(true);
			});
		});
		this.physics.add.overlap(this.macaronis, this.meatball4, ()=>{
			this.meatball4.tint = 0x000000;
			this.meatballHit = this.sound.add('meatball_hit');
			this.macaronis.getChildren().map(child => child.destroy());
			this.time.delayedCall(150, ()=>{
				this.meatballHit.play();
				this.meatball4.destroy();
			});
		});	
		//pizza boss
			this.physics.add.overlap(this.rollingPinWeapon, this.levelBoss, ()=>{
				if (!(this.levelBossHealth <= 1)){
					this.levelBossHealth--;
					this.levelBoss.tint3 = 0xff0000;
					this.bossHit = this.sound.add('boss_hit');
					this.levelBoss.anims.play('boss_hit_anim');
					this.levelBoss2.anims.play('boss_hit_anim');
					this.levelBoss3.anims.play('boss_hit_anim');
					this.pepperoni =  this.bossFire.create(this.levelBoss.x + 50, this.levelBoss.y + 80 , 'pepperoni');
					this.pepperoni.setVelocityX(800).setVelocityY(-350);
					this.physics.add.collider(this.pepperoni, player, ()=>{
							this.bossFire.getChildren().map(child => child.destroy());				
					});
					this.physics.add.collider(this.pepperoni, groundLayer, ()=>{
							this.time.delayedCall(200, ()=>{
								this.bossFire.getChildren().map(child => child.destroy());	
							});							
					});
					this.time.delayedCall(500, ()=>{
						if (this.levelBoss.active && !(this.levelBossHealth <= 1))
						{
							this.bossHit.play();
							this.levelBoss.tint3 = 0xffffff;
							this.levelBoss.play('boss_idle', true);
							this.levelBoss2.play('boss_idle', true);
							this.levelBoss3.play('boss_idle', true);
						}
					});
				}
			//levelboss health is low
			if (this.levelBossHealth === 1)
			{
						this.levelBoss.setTexture('boss8');
						this.itemHitboxes = this.physics.add.staticGroup();
						//on collision hitbox
						this.itemHitBox1 = this.add.zone(600, 1850).setSize(75, 75);
						this.physics.world.enable(this.itemHitBox1);
						this.itemHitBox1.body.setAllowGravity(false);
						this.itemHitBox2 = this.add.zone(700, 1700).setSize(75, 140);
						this.physics.world.enable(this.itemHitBox2);
						this.itemHitBox2.body.setAllowGravity(false);
						this.physics.add.overlap(player, this.itemHitBox1, ()=>{
							this.itemTop.visible = false;
						});
						this.physics.add.overlap(this.itemHitBox2, player, ()=>{
						this.itemTop.visible = true;
						});
					}
				});	
		this.physics.add.overlap(this.macaronis, this.levelBoss, ()=>{
			if(!(this.levelBossHealth <= 1))
			{
				this.levelBossHealth--;
				this.levelBoss.tint3 = 0xff0000;
				this.macaronis.getChildren().map(child => child.destroy());
				this.bossHit = this.sound.add('boss_hit');
				this.levelBoss.anims.play('boss_hit_anim');
				this.levelBoss2.anims.play('boss_hit_anim');
				this.levelBoss3.anims.play('boss_hit_anim');
				this.pepperoni =  this.bossFire.create(this.levelBoss.x + 50, this.levelBoss.y + 80 , 'pepperoni');
				this.pepperoni.setVelocityX(800).setVelocityY(-350);
				this.physics.add.collider(this.pepperoni, player, ()=>{
						this.bossFire.getChildren().map(child => child.destroy());				
				});
				this.physics.add.collider(this.pepperoni, groundLayer, ()=>{
						this.time.delayedCall(200, ()=>{
							this.bossFire.getChildren().map(child => child.destroy());	
						});							
				});
				this.time.delayedCall(500, ()=>{
						if (this.levelBoss.active && !(this.levelBossHealth <= 1)){
						this.bossHit.play();
						this.levelBoss3.tint = 0xffffff;
						this.levelBoss.play('boss_idle', true);
						this.levelBoss2.play('boss_idle', true);
						this.levelBoss3.play('boss_idle', true);
						}
					});
				}
				if (this.levelBossHealth === 1 ){ 
							
					this.levelBoss.setTexture('boss8');
					this.itemHitboxes = this.physics.add.staticGroup();
					//on collision hitbox
					this.itemHitBox1 = this.add.zone(600, 1850).setSize(75, 75);
					this.physics.world.enable(this.itemHitBox1);
					this.itemHitBox1.body.setAllowGravity(false);
					this.itemHitBox2 = this.add.zone(700, 1700).setSize(75, 140);
					this.physics.world.enable(this.itemHitBox2);
					this.itemHitBox2.body.setAllowGravity(false);
					this.physics.add.overlap(player, this.itemHitBox1, ()=>{
						this.itemTop.visible = false;
					});
					this.physics.add.overlap(this.itemHitBox2, player, ()=>{
						this.itemTop.visible = true;
					});
				}
			});





		////collisions
		//general collisions 
		this.physics.add.collider(groundLayer, player);
		this.physics.add.collider(this.enemyStatic, groundLayer);
		this.physics.add.collider(this.enemyMoving, groundLayer);
		this.physics.add.collider(this.enemyStatic, this.enemyStatic);
		this.physics.add.collider(this.enemyMoving, this.enemyMoving);
		this.physics.add.collider(this.enemyMoving, this.enemyStatic);
		this.physics.add.collider(doorLv1, groundLayer);
		this.physics.add.collider(pickups, groundLayer);
		this.physics.add.collider(this.macaronis, groundLayer);
		this.physics.add.collider(this.macaronis, player, ()=>{
			this.macaroniRing = this.sound.add('macaroni_ring');
			this.macaroniRing.play();
			macaroniAvailable++;
			this.macaroniText2.setText(macaroniAvailable);
			this.macaronis.getChildren().map(child => child.destroy());
			});	
									   
  	      //collision with enemies
            this.playerCollisionDetection = false;
            this.physics.add.overlap(player,  this.enemies, ()=>{
              if (this.playerInvincible === false)
              {
                  player.setTexture('player_coffee_map');
                  player.tint = 0xff0000;	
                  player.flipX === true ? player.setVelocityX(200).setVelocityY(-300).setBounce(3) : player.setVelocityX(-200).setVelocityY(-300).setBounce(3);
                  this.playerCollisionDetection = true;
                  this.time.delayedCall(1, ()=>{
                      this.playerCollisionDetection = false;
                  });
                  
                  this.time.delayedCall(250, ()=>{
                      player.tint = 0xffffff;
                      player.setBounce(0);
                  });
              }
          });	 
          this.physics.add.collider(player,  this.enemies, ()=>{
              if (this.playerInvincible === false)
              {
                  player.setTexture('player_coffee_map');
                  player.tint = 0xff0000;	
                  player.flipX === true ? player.setVelocityX(200).setVelocityY(-300).setBounce(3) : player.setVelocityX(-200).setVelocityY(-300).setBounce(3);
                  this.playerCollisionDetection = true;
                  this.time.delayedCall(1, ()=>{
                      this.playerCollisionDetection = false;
                  });
                  this.playerHit = this.sound.add('player_hit');
                  this.playerHit.play(); 
                  this.time.delayedCall(250, ()=>{
                      player.tint = 0xffffff;
                      player.setBounce(0);
                  });
              }
          });	

/////////////////////////////////////////////////////

	//shrooms
			this.shroomSelected = false;
			this.shroom1 = pickups.create(2170, 1300, 'shrooms');
			this.physics.add.collider(this.shroom1, groundLayer);
			this.physics.add.collider(this.shroom1, player, ()=>{
				shrooms = 1;
					this.sick = this.sound.add('sick');
					this.sick.play();
					this.shroom1.destroy();
					this.beerSelected = false;
					this.coffeeSelected = false;
					this.coffeeSelected = false;
					this.shroomSelected = true;
					this.specialItemSelected = false;
				});
		

		//macaroni collision with zones
		this.physics.add.overlap(this.macaronis, this.zoneFront, ()=>{
			this.macaronis.getChildren().map(child => child.destroy());
		});
		this.physics.add.overlap(this.macaronis, this.zoneBack, ()=>{
			this.macaronis.getChildren().map(child => child.destroy());
		});



		/////////// game controls  ////////////////////////////////////////////////

//virtual buttons
		this.input.addPointer(1);
		//clear control states
		this.leftButtonState = false;
		this.jumpButtonState = false;
		this.rightButtonState = false;
		this.A_buttonState = false;
		this.B_buttonState = false;
		this.C_buttonState = false;
		this.playerFreeze = false;
		//left button	
		this.leftButton = this.add.image(100, 500, 'left_button').setOrigin(0).setName('left_button').setInteractive();
		this.leftButton.setScrollFactor(0);
		this.leftButton.on('pointerover', ()=>{	
		}, this);
		this.leftButton.on('pointerout', ()=>{
		this.leftButton.tint = 0xffffff;	
		this.leftButtonState = false;
		}, this);
		this.leftButton.on('pointerdown', ()=>{	
		player.flipX = true;
		this.leftButton.tint = 0xff0000;
		this.leftButtonState = true;
		}, this);
		this.leftButton.on('pointerup', ()=>{
		this.leftButtonState = false;
		this.leftButton.tint = 0xffffff;
		}, this);
		// jump button
		this.jumpButton = this.add.image(540, 500, 'jump_button').setOrigin(0).setName('jump_button').setInteractive();
		this.jumpButton.setScrollFactor(0);
		this.jumpButton.on('pointerover', ()=>{
		}, this);
		this.jumpButton.on('pointerout', ()=>{
		this.jumpButton.tint = 0xffffff;	
		this.jumpButtonState = false;
		}, this);
		this.jumpButton.on('pointerdown', ()=>{
		this.jumpButtonState = true;
		this.jumpButton.tint = 0xff0000;
		}, this);
		this.jumpButton.on('pointerup', ()=>{
		this.jumpButton.tint = 0xffffff;
		this.jumpButtonState = false;
		}, this);
		// right button
		this.rightButton = 	this.add.image(200, 500, 'right_button').setOrigin(0).setName('right_button').setInteractive();
		this.rightButton.setScrollFactor(0);
		this.rightButton.on('pointerover', ()=>{
		}, this);
		this.rightButton.on('pointerout', ()=>{
		this.rightButton.tint = 0xffffff;	
		this.rightButtonState = false;
		}, this);
		this.rightButton.on('pointerdown', ()=>{
		this.rightButtonState = true;
		this.rightButton.tint = 0xff0000;
		player.flipX = false;
		}, this);
		this.rightButton.on('pointerup', ()=>{
		this.rightButton.tint = 0xffffff;
		this.rightButtonState = false;
		}, this);
		// A button (rolling pin weapon)
		this.A_button = this.add.image(630, 500, 'A_button').setOrigin(0).setName('A_button').setInteractive();
		this.A_button.setScrollFactor(0);
		this.A_button.on('pointerover', ()=>{
		});
		this.A_button.on('pointerout', ()=>{
			this.A_button.tint = 0xffffff;
			this.A_buttonState = false;
				if (this.A_buttonState === false){
				this.rollingPinWeapon.getChildren().map(child => child.destroy());					
			}
		}, this);
		this.A_button.on('pointerdown', ()=>{	
			this.A_button.tint = 0xff0000;
			this.A_buttonState = true;
			player.anims.play('rolling_pin_loop', true);
					this.huh = this.sound.add('huh');
					this.huh.play();	
					let weaponX = player.flipX === true ? player.x - 50 : player.x + 50;
					this.rollingPin = this.rollingPinWeapon.create(weaponX , player.y, 'rolling_pin_fr1');
					if (player.flipX === true)
					{
						this.rollingPin.flipX = true;
					}
					if(player.body.onFloor())
					{
						if (this.playerSpeedBoost === false && this.playerInvincible === false)
						{
							player.play('rolling_pin_loop', true)
						}
						else if (this.playerSpeedBoost === true && this.playerInvincible === false)
						{
							player.play('rolling_pin_coffee_loop', true);
						}
						else if (this.playerInvincible === true && this.playerSpeedBoost === false)
						{
							player.play('rolling_pin_beer_loop', true);
						}
					}
					this.time.delayedCall(150, ()=>{
						player.anims.play('idle');
						this.rollingPinWeapon.getChildren().map(child => child.destroy());
					});
				 if (player.body.onFloor() === false){
						player.body.velocity.x = 0;
					player.body.velocity.y = 0;
					this.time.delayedCall(250, ()=>{
						this.rollingPinWeapon.getChildren().map(child => child.destroy());
						player.anims.play('fall');
							player.body.velocity.y = 300;
					});	
				 }
			 });
		this.A_button.on('pointerup', ()=>{
			this.A_button.tint = 0xffffff;
			this.A_buttonState = false;
			if (this.A_buttonState === false){
				this.rollingPinWeapon.getChildren().map(child => child.destroy());
			}
		});	

// B button (macaroni weapon)
		this.B_button = this.add.image(700, 450, 'B_button').setOrigin(0).setInteractive();
		this.B_button.setScrollFactor(0);
		this.B_button.on('pointerover',  ()=>{
		});
		this.B_button.on('pointerout', ()=>{
		this.B_button.tint = 0xffffff;	
		this.B_buttonState = false;
		});
		this.B_button.on('pointerdown',  (pointer, time, lastFired)=>{
		this.B_button.tint = 0x0c1ea5;
		this.B_buttonState = true;	
		if (macaroniAvailable >=1)
		{
		player.anims.play('fire_macaroni', true);
		if (player.flipX === true)
		{
			this.macaroni = this.macaronis.create(player.x - 30, player.y, 'macaroni').setVelocityX(-700).setVelocityY(-50).setBounce(0.5);
			this.tweens.add({
				rotation: -360, duration: 20000, targets: this.macaroni, repeat: -1
			});
		} 
		else
		{
			this.macaroni = this.macaronis.create(player.x + 30, player.y, 'macaroni').setBounce(0.5).setVelocityX(700).setVelocityY(-50);
			this.tweens.add({
				rotation: 360, duration: 20000, targets: this.macaroni,	repeat: -1
			});
		} 
		this.huh = this.sound.add('huh');
		this.huh.play();
		macaroniAvailable--;	
		this.macaroniText2.setText(macaroniAvailable);
		// if run out of macaroni shots 
		 if (macaroniAvailable <= 0){
			this.macaroniText2.setText(0);
		}
	}
}, this);
		this.B_button.on('pointerup', ()=>{
		this.B_button.tint = 0xffffff;
		this.B_buttonState = false;
		});
//power ups
	this.C_button = this.add.image(610, 410, 'C_button').setOrigin(0).setInteractive().setScrollFactor(0);	
			this.C_button.on('pointerover', ()=>{
				this.C_button.tint = 0x167019;
			});
			this.C_button.on('pointerout', ()=>{
				this.C_button.tint = 0xffffff;
			});
	//toggle items and powerups
	this.toggleButton = this.add.image(690, 370, 'toggle_button').setOrigin(0).setInteractive().setScrollFactor(0).setScale(0.75);
		this.toggleButton.on('pointerover', ()=>{
			this.toggleButton.tint = 0x4D1166;
		});	
		this.toggleButton.on('pointerout', ()=>{
			this.toggleButton.tint = 0xffffff;
		});
		this.toggleButton.on('pointerdown', ()=>{
					//coffee selected 
					if (this.coffeeSelected === true)
					{
						if (beers >= 1 && shrooms >=1 && items >= 1)
						{
							this.beerSelected = true;
							this.coffeeSelected = false;
							this.shroomSelected = false;
							this.specialItemSelected = false;
						}
						else if (beers >= 1 && shrooms >=1)
						{
							this.beerSelected = true;
							this.coffeeSelected = false;
							this.shroomSelected = false;
							this.specialItemSelected = false;
						}
						else if (beers >= 1 && items >=1)
						{
							this.beerSelected = true;
							this.coffeeSelected = false;
							this.shroomSelected = false;
							this.specialItemSelected = false;
						}
						else if (beers >= 1)
						{
							this.beerSelected = true;
							this.coffeeSelected = false;
							this.shroomSelected = false;
							this.specialItemSelected = false;
						}
						else if (shrooms >= 1)
						{
							this.shroomSelected = true;
							this.coffeeSelected = false;
							this.beerSelected = false;
							this.specialItemSelected = false;
						}	
						else if (items >= 1)
						{
							this.coffeeSelected = false;
							this.beerSelected = false;
							this.shroomSelected = false;
							this.specialItemSelected = true;
						}
					}

				//beer selected 
					else if (this.beerSelected === true)
					{
						if (shrooms >= 1 && coffees >=1 && items >= 1)
						{
							this.beerSelected = false;
							this.coffeeSelected = false;
							this.shroomSelected = true;
							this.specialItemSelected = false;
						}
						else if (shrooms >= 1 && coffees >= 1)
						{
							this.beerSelected = false;
							this.coffeeSelected = false;
							this.shroomSelected = true;
							this.specialItemSelected = false;
						}
						else if (shrooms >= 1)
						{
							this.shroomSelected = true;
							this.coffeeSelected = false;
							this.beerSelected = false;
							this.specialItemSelected = false;
						}
						else if (coffees >= 1 && items >= 1)
						{
							this.coffeeSelected = false;
							this.beerSelected = false;
							this.shroomSelected = false;
							this.specialItemSelected = true;
						}
						else if (shrooms >= 1 && items >= 1)
						{
							this.coffeeSelected = false;
							this.beerSelected = false;
							this.shroomSelected = true;
							this.specialItemSelected = false;
						}
						else if (coffees >= 1)
						{
							this.coffeeSelected = true;
							this.beerSelected = false;
							this.shroomSelected = false;
							this.specialItemSelected = false;
						}
						else if (items >= 1)
						{
							this.coffeeSelected = false;
							this.beerSelected = false;
							this.shroomSelected = false;
							this.specialItemSelected = true;
						}
					
					}
				//shroom selected
					else if (this.shroomSelected === true)
					{
						if (beers >= 1 && coffees >= 1 && items >= 1)
						{
							this.beerSelected = false;
							this.coffeeSelected = false;
							this.shroomSelected = false;
							this.specialItemSelected = true;
						}
						else if (beers >= 1 && items >= 1)
						{
							this.beerSelected = false;
							this.coffeeSelected = false;
							this.shroomSelected = false;
							this.specialItemSelected = true;
						}
						else if (coffees >= 1 && items >= 1)
						{
							this.beerSelected = false;
							this.coffeeSelected = false;
							this.shroomSelected = false;
							this.specialItemSelected = true;
						}
						else if (beers >= 1 && coffees >= 1)
						{
							this.beerSelected = false;
							this.coffeeSelected = true;
							this.shroomSelected = false;
							this.specialItemSelected = false;
						}
						else if (beers >= 1)
						{
							this.beerSelected = true;
							this.coffeeSelected = false;
							this.shroomSelected = false;
							this.specialItemSelected = false;
						}
						else if (coffees >= 1)
						{
							this.coffeeSelected = true;
							this.beerSelected = false;
							this.shroomSelected = false;
							this.specialItemSelected = false;
						}	
						else if (items >= 1)
						{
							this.coffeeSelected = false;
							this.beerSelected = false;
							this.shroomSelected = false;
							this.specialItemSelected = true;
						}	
					}
				//spatula selected
				else if (this.specialItemSelected === true)
				{
					if (beers >= 1 && coffees >=1 && shrooms >= 1)
					{
						this.beerSelected = false;
						this.coffeeSelected = true;
						this.shroomSelected = false;
						this.specialItemSelected = false;
					}
					else if (coffees >= 1 && beers >= 1)
					{
						this.beerSelected = false;
						this.coffeeSelected = true;
						this.shroomSelected = false;
						this.specialItemSelected = false;
					}
					else if (coffees >= 1 && shrooms >= 1)
					{
						this.beerSelected = false;
						this.coffeeSelected = true;
						this.shroomSelected = false;
						this.specialItemSelected = false;
					}
					else if (beers >= 1 && shrooms >= 1)
					{
						this.beerSelected = true;
						this.coffeeSelected = false;
						this.shroomSelected = false;
						this.specialItemSelected = false;
					}
					else if (beers >= 1)
					{
						this.beerSelected = true;
						this.coffeeSelected = false;
						this.shroomSelected = false;
						this.specialItemSelected = false;
					}
					else if (coffees >= 1)
					{
						this.coffeeSelected = true;
						this.beerSelected = false;
						this.shroomSelected = false;
						this.specialItemSelected = false;
					}
					else if (shrooms >= 1)
					{
						this.coffeeSelected = false;
						this.beerSelected = false;
						this.shroomSelected = true;
						this.specialItemSelected = false;
					}		
				}
			});
				
	this.toggleButton.on('pointerup', ()=>{
			this.toggleButton.tint = 0xffffff;
		});
	//////////////
//weapon keyboard (macaroni)	
	this.input.keyboard.on('keydown_D', ()=>{				
		if (macaroniAvailable >=1)
		{
		player.anims.play('fire_macaroni', true);
		if (player.flipX === true)
		{
			this.macaroni = this.macaronis.create(player.x - 30, player.y, 'macaroni').setVelocityX(-700).setVelocityY(-50).setBounce(0.5);
			this.tweens.add({
				rotation: -360,	duration: 20000, targets: this.macaroni, repeat: -1
			});
		} 
		else
		{
			this.macaroni = this.macaronis.create(player.x + 30, player.y, 'macaroni').setBounce(0.5).setVelocityX(700).setVelocityY(-50);
			this.tweens.add({
				rotation: 360, duration: 20000, targets: this.macaroni, repeat: -1
			});
		} 
		this.huh = this.sound.add('huh');
		this.huh.play();
		macaroniAvailable--;	
		this.macaroniText2.setText(macaroniAvailable);
		// if run out of macaroni shots 
		 if (macaroniAvailable <= 0){
			this.macaroniText2.setText(0);
		}
	}		
});	
		//weapon keyboard (rolling pin)
		this.input.keyboard.on('keydown_W', ()=>{
					player.anims.play('rolling_pin_loop', true);
					this.huh = this.sound.add('huh');
					this.huh.play();	
					let weaponX = player.flipX === true ? player.x - 50 : player.x + 50;
					this.rollingPin = this.rollingPinWeapon.create(weaponX , player.y - 12, 'rolling_pin_fr1');
					if (player.flipX === true)
					{
						this.rollingPin.flipX = true;
					}
					if(player.body.onFloor())
					{
						if (this.playerSpeedBoost === false && this.playerInvincible === false)
						{
							player.play('rolling_pin_loop', true)
						}
						else if (this.playerSpeedBoost === true && this.playerInvincible === false)
						{
							player.play('rolling_pin_coffee_loop', true);
						}
						else if (this.playerInvincible === true && this.playerSpeedBoost === false)
						{
							player.play('rolling_pin_beer_loop', true);
						}
					}
					this.time.delayedCall(150, ()=>{
							this.huh.stop();
							this.rollingPinWeapon.getChildren().map(child => child.destroy());
							if (player.body.onFloor() === false)
							{
								if (this.playerSpeedBoost === false && this.playerInvincible === false)
								{
									player.play('fall', true)
								}
								else if (this.playerSpeedBoost === true)
								{
									player.play('speed_fall', true);
								}
								else if (this.playerInvincible === true)
								{
									player.play('drunk_fall', true);
								}
							}
							this.time.delayedCall(100, ()=>{
								{
									player.anims.play('idle', true);
								}
							});				
					});
					// weapon collision with player because apparently I have no idea how to really make it disappear =[
					this.physics.add.collider(this.rollingPin, player, ()=>{
						this.time.delayedCall(150, ()=>{
							this.rollingPin.destroy();
						});
					});
				  });

/////////////////////	

//use power ups/items
this.input.keyboard.on('keydown_S', ()=>{
	//coffee
	if (coffees >= 1 && this.coffeeSelected === true)
	{
		coffees--;
		this.playerInvincible = false;
		this.playerSpeedBoost = true;
		player.setVisible(false);
		this.playerFreeze = true;
		this.playerDrinking = this.add.sprite(player.x, player.y, 'player_drinking_coffee_fr3');
		player.flipX === true ? this.playerDrinking.flipX = true : this.playerDrinking.flipX = false;
		this.gulp = this.sound.add('gulp');
		this.gulp.play();
		this.time.delayedCall(500, ()=>{
			this.playerFreeze = false;
			this.frigYeah = this.sound.add('frigyeah');
			this.frigYeah.play();
			this.playerDrinking.destroy();
			player.setVisible(true);
		});
			this.time.delayedCall(10000, ()=>{
			this.playerSpeedBoost = false;
			});
		if (coffees <= 0)
		{
		
			if (beers >= 1 && shrooms >=1)
			{
				this.coffeeSelected = false;
				this.beerSelected = true;
				this.shroomSelected = false;
				this.specialItemSelected = false;
			}
			else if (beers >= 1)
			{
				this.beerSelected = true;
				this.shroomSelected = false;
				this.coffeeSelected = false;
				this.specialItemSelected = false;
			}
			else if (shrooms >= 1)
			{
				this.shroomSelected = true;
				this.coffeeSelected = false;
				this.beerSelected = false;
				this.specialItemSelected = false;
			}
			else if (items >= 1)
			{
				this.shroomSelected = false;
				this.coffeeSelected = false;
				this.beerSelected = false;
				this.specialItemSelected = true;
			}
		}
	} 
	//beer
	else if (beers >= 1 && this.beerSelected === true)
	{
		beers--;
		this.playerInvincible = true;
		this.playerSpeedBoost = false;
		player.setVisible(false);
		this.playerFreeze = true;
		this.playerDrinking = this.add.sprite(player.x, player.y, 'player_drinking_beer');
		player.flipX === true ? this.playerDrinking.flipX = true : this.playerDrinking.flipX = false;
		this.gulp = this.sound.add('gulp');
		this.gulp.play();
		this.time.delayedCall(500, ()=>{
			this.playerFreeze = false;
			this.frigYeah = this.sound.add('frigyeah');
			this.frigYeah.play();
			this.playerDrinking.destroy();
			player.setVisible(true);
		});
		this.time.delayedCall(10000, ()=>{
			this.playerInvincible = false;
		});
		if (beers <= 0)
		{

			if (shrooms >= 1)
			{
				this.shroomSelected = true;
				this.coffeeSelected = false;
				this.beerSelected = false;
				this.specialItemSelected = false;
			}		
			else if (coffees >= 1)
			{
				this.coffeeSelected = true;
				this.beerSelected = false;
				this.shroomSelected = false;
				this.specialItemSelected = false;
			}
			else if (items >= 1)
			{
				this.coffeeSelected = false;
				this.beerSelected = false;
				this.shroomSelected = false;
				this.specialItemSelected = true;
			}
	}		
}
	//shrooms
	else if (shrooms >= 1 && this.shroomSelected === true)
		{
				shrooms--;
				this.cameras.main.setRenderToTexture(this.customPipeline3);
				this.rect = this.add.sprite(0, 0, 'pixel').setScale(120000).setAlpha(0.8);							
				this.rect.setPipeline('Custom');
				this.playerSpeedBoost = false;
				this.playerInvincible = false;
//trippin balls	
	this.dummyPlayer = this.physics.add.sprite(player.x, player.y , 'player').play('player_trippin', true);
	this.physics.add.collider(this.dummyPlayer, groundLayer);
		

		if (this.chili.active)
			{
				this.fireBall1Tween.stop();
			}
		if (this.chili2.active)
			{
				this.fireBall2Tween.stop();
			}

		if (this.meatball.active)
			{
				this.meatball.setVelocity(0);
				this.meatball.body.setAllowGravity(false).setImmovable(true);
			}
		if (this.meatball2.active)
			{
				this.meatball2.setVelocity(0);
				this.meatball2.body.setAllowGravity(false).setImmovable(true);
			}
		if (this.meatball3.active)
			{
				this.meatball3.setVelocity(0);
				this.meatball3.body.setAllowGravity(false).setImmovable(true);
			}
		if (this.meatball4.active)
			{
				this.meatball4.setVelocity(0);
				this.meatball4.body.setAllowGravity(false).setImmovable(true);
			}
		//shroom state reset
		this.time.delayedCall(10000, ()=>{
				this.cameras.main.clearRenderToTexture();
				this.tweens.add({
					targets: this.rect,	alpha: {value: 0, duration: 2000, ease: 'Power1'}	
				}, this);
			this.dummyPlayer.destroy();
			this.playerTrippin = false;
			if (this.meatball.active)
				{
					this.meatball.setBounce(1).setCollideWorldBounds(true).setVelocity(Phaser.Math.Between(-200, 200), 20);
					this.meatball.body.setAllowGravity(true).setImmovable(false);
				}
			if (this.meatball2.active)
				{
					this.meatball2.setBounce(1).setCollideWorldBounds(true).setVelocity(Phaser.Math.Between(-200, 200), 20);
					this.meatball2.body.setAllowGravity(true).setImmovable(false);
				}
			if (this.meatball3.active)
				{
					this.meatball3.setBounce(1).setCollideWorldBounds(true).setVelocity(Phaser.Math.Between(-200, 200), 20);
					this.meatball3.body.setAllowGravity(true).setImmovable(false);
				}
			if (this.meatball4.active)
				{
					this.meatball4.setBounce(1).setCollideWorldBounds(true).setVelocity(Phaser.Math.Between(-200, 200), 20);
					this.meatball4.body.setAllowGravity(true).setImmovable(false);
				}	
			if (this.chili.active)
				{
					this.fireBall1Tween.play();
				}
			if (this.chili2.active)
				{
					this.fireBall2Tween.play();
				}
		});	

				if (shrooms <= 0)
				{
					
					if (items >= 1)
					{
						this.specialItemSelected = true;
						this.coffeeSelected = false;
						this.beerSelected = false;
						this.shroomSelected = false;
					}
					else if (coffees >= 1)
					{
						this.coffeeSelected = true;
						this.specialItemSelected = false;
						this.beerSelected = false;
						this.shroomSelected = false;
					}
					else if (beers >= 1)
					{
						this.beerSelected = true;
						this.specialItemSelected = false;
						this.coffeeSelected = false;
						this.shroomSelected = false;	
					}	
				}
	}
	//spatula
	else if (items >= 1 && this.specialItemSelected === true && this.playerInvincible === false && this.playerSpeedBoost === false )
	{
		// use special item			
					this.C_buttonState = true;
					this.specialItemSelected = true;
					player.anims.play('rolling_pin_loop', true);
					this.huh = this.sound.add('huh');
					this.huh.play();	
					let weaponX = player.flipX === true ? player.x - 50 : player.x + 50;
					this.spatula = this.rollingPinWeapon.create(weaponX , player.y - 12, 'spatula');
					if (player.flipX === true)
					{
						this.spatula.angle = 315;
						this.spatula.flipX = true;
					}
					else{
						this.spatula.angle = 45;
					}
					this.time.delayedCall(200, ()=>{
						this.rollingPinWeapon.getChildren().map(child => child.destroy());
					});
					if(player.body.onFloor())
					{
						if (this.playerSpeedBoost === false && this.playerInvincible === false)
						{
							player.play('rolling_pin_loop', true)
						}
						else if (this.playerSpeedBoost === true && this.playerInvincible === false)
						{
							player.play('rolling_pin_coffee_loop', true);
						}
						else if (this.playerInvincible === true && this.playerSpeedBoost === false)
						{
							player.play('rolling_pin_beer_loop', true);
						}
					}
					this.time.delayedCall(150, ()=>{
						player.anims.play('idle');
						this.rollingPinWeapon.getChildren().map(child => child.destroy());
					});
						
				 if (player.body.onFloor() === false){
						player.body.velocity.x = 0;
					player.body.velocity.y = 100;
					this.time.delayedCall(250, ()=>{
							this.rollingPinWeapon.getChildren().map(child => child.destroy());
							player.anims.play('fall');
							player.body.velocity.y = 300;
					});
				}
			//collision with pizza boss
			this.physics.add.collider(this.spatula, this.levelBoss, ()=>{
				this.bossHit = this.sound.add('boss_hit');
				this.bossHit.play();
				this.time.delayedCall(150, ()=>{
					this.bossHit.stop();
				});
			if (this.levelBossHealth >= 2)
			{	
					player.tint = 0xff0000;	
					player.setBounce(1);
					healthScore--;
					this.text2.setText(healthScore);
					this.playerHit = this.sound.add('player_hit');
					this.playerHit.play();   
					this.time.delayedCall(250, ()=>{
						player.tint = 0xffffff;
						player.setBounce(0);
					});
			}
			if (this.levelBossHealth === 1)
			{
				this.levelBoss2.destroy();
				this.levelBoss3.destroy();
				this.levelBoss.setVelocityY(-50).play('boss_hit', true);
				this.levelBoss.anims.play('boss_hit_anim');
				this.time.delayedCall(1000, ()=>{
					this.levelBossHealth = 0;
					this.levelBoss.tint = 0x000000;
					this.pizzaOven.anims.play('oven_anims');
				});	
			}
		});
	}
 });	
  this.input.keyboard.on('keyup_S', ()=>{
	 this.C_buttonState = false;
	 this.rollingPinWeapon.getChildren().map(child => child.destroy());
 });

//////////////////////////////////////////////

 //toggle power ups/items 

 this.input.keyboard.on('keydown_A', ()=>{
			//coffee
			if (this.coffeeSelected === true)
			{
				this.coffeeSelected = false;
				if (beers >= 1 && shrooms >=1 && items >= 1)
				{
					this.beerSelected = true;
					this.coffeeSelected = false;
					this.shroomSelected = false;
					this.specialItemSelected = false;
				}
				else if (beers >= 1 && shrooms >=1)
				{
					this.beerSelected = true;
					this.coffeeSelected = false;
					this.shroomSelected = false;
					this.specialItemSelected = false;
				}
				else if (beers >= 1 && items >=1)
				{
					this.beerSelected = true;
					this.coffeeSelected = false;
					this.shroomSelected = false;
					this.specialItemSelected = false;
				}
				else if (beers >= 1)
				{
					this.beerSelected = true;
					this.coffeeSelected = false;
					this.shroomSelected = false;
					this.specialItemSelected = false;
				}
				else if (shrooms >= 1)
				{
					this.shroomSelected = true;
					this.coffeeSelected = false;
					this.beerSelected = false;
					this.specialItemSelected = false;
				}	
				else if (items >= 1)
				{
					this.coffeeSelected = false;
					this.beerSelected = false;
					this.shroomSelected = false;
					this.specialItemSelected = true;
				}
			}

		//beer selected 
			else if (this.beerSelected === true)
			{
				if (shrooms >= 1 && coffees >=1 && items >= 1)
				{
					this.beerSelected = false;
					this.coffeeSelected = false;
					this.shroomSelected = true;
					this.specialItemSelected = false;
				}
				else if (shrooms >= 1 && coffees >= 1)
				{
					this.beerSelected = false;
					this.coffeeSelected = false;
					this.shroomSelected = true;
					this.specialItemSelected = false;
				}
				else if (shrooms >= 1)
				{
					this.shroomSelected = true;
					this.coffeeSelected = false;
					this.beerSelected = false;
					this.specialItemSelected = false;
				}
				else if (coffees >= 1 && items >= 1)
				{
					this.coffeeSelected = false;
					this.beerSelected = false;
					this.shroomSelected = false;
					this.specialItemSelected = true;
				}
				else if (coffees >= 1)
				{
					this.coffeeSelected = true;
					this.beerSelected = false;
					this.shroomSelected = false;
					this.specialItemSelected = false;
				}
				else if (items >= 1)
				{
					this.coffeeSelected = false;
					this.beerSelected = false;
					this.shroomSelected = false;
					this.specialItemSelected = true;
				}
			
			}
		//shroom selected
			else if (this.shroomSelected === true)
			{
				if (beers >= 1 && coffees >= 1 && items >= 1)
				{
					this.beerSelected = false;
					this.coffeeSelected = false;
					this.shroomSelected = false;
					this.specialItemSelected = true;
				}
				else if (beers >= 1 && items >= 1)
				{
					this.beerSelected = false;
					this.coffeeSelected = false;
					this.shroomSelected = false;
					this.specialItemSelected = true;
				}
				else if (coffees >= 1 && items >= 1)
				{
					this.beerSelected = false;
					this.coffeeSelected = false;
					this.shroomSelected = false;
					this.specialItemSelected = true;
				}
				else if (beers >= 1 && coffees >= 1)
				{
					this.beerSelected = false;
					this.coffeeSelected = true;
					this.shroomSelected = false;
					this.specialItemSelected = false;
				}
				else if (beers >= 1)
				{
					this.beerSelected = true;
					this.coffeeSelected = false;
					this.shroomSelected = false;
					this.specialItemSelected = false;
				}
				else if (coffees >= 1)
				{
					this.coffeeSelected = true;
					this.beerSelected = false;
					this.shroomSelected = false;
					this.specialItemSelected = false;
				}	
				else if (items >= 1)
				{
					this.coffeeSelected = false;
					this.beerSelected = false;
					this.shroomSelected = false;
					this.specialItemSelected = true;
				}	
			}
		//spatula selected
		else if (this.specialItemSelected === true)
		{
			if (beers >= 1 && coffees >=1 && shrooms >= 1)
			{
				this.beerSelected = false;
				this.coffeeSelected = true;
				this.shroomSelected = false;
				this.specialItemSelected = false;
			}
			else if (coffees >= 1 && beers >= 1)
			{
				this.beerSelected = false;
				this.coffeeSelected = true;
				this.shroomSelected = false;
				this.specialItemSelected = false;
			}
			else if (coffees >= 1 && shrooms >= 1)
			{
				this.beerSelected = false;
				this.coffeeSelected = true;
				this.shroomSelected = false;
				this.specialItemSelected = false;
			}
			else if (beers >= 1 && shrooms >= 1)
			{
				this.beerSelected = true;
				this.coffeeSelected = false;
				this.shroomSelected = false;
				this.specialItemSelected = false;
			}
			else if (beers >= 1)
			{
				this.beerSelected = true;
				this.coffeeSelected = false;
				this.shroomSelected = false;
				this.specialItemSelected = false;
			}
			else if (coffees >= 1)
			{
				this.coffeeSelected = true;
				this.beerSelected = false;
				this.shroomSelected = false;
				this.specialItemSelected = false;
			}
			else if (shrooms >= 1)
			{
				this.coffeeSelected = false;
				this.beerSelected = false;
				this.shroomSelected = true;
				this.specialItemSelected = false;
			}		
		}
	});

/////////////////////	
this.timer = false;
this.usePowerup = false;

	

	////interfaces
		//coffee
		this.coffeeItemsInterface = this.add.sprite(540, 70, 'coffee_fr1').setScrollFactor(0).setScale(0.5).setInteractive();
		this.coffeeItemsInterface2 = this.add.sprite(540, 70, 'coffee_fr1').setScrollFactor(0).setScale(0.5).setInteractive();
		this.tweens.add({
				targets: this.coffeeItemsInterface2, alpha: {value: 0, ease: 'Power1', duration: 1000}, repeat: -1, yoyo: true
			});
		//beer
		this.beerItemsInterface = this.add.sprite(570, 70, 'beer').setScrollFactor(0).setScale(0.5).setInteractive();
		this.beerItemsInterface2 = this.add.sprite(570, 70, 'beer').setScrollFactor(0).setScale(0.5).setInteractive();
		this.tweens.add({
			targets: this.beerItemsInterface2, alpha: {value: 0, ease: 'Power1', duration: 1000}, repeat: -1, yoyo: true
		});
		//shrooms
		this.shroomItemsInterface = this.add.sprite(600, 70, 'shrooms').setScale(0.5).setScrollFactor(0).setInteractive();
		this.shroomItemsInterface2 = this.add.sprite(600, 70, 'shrooms').setScale(0.5).setScrollFactor(0).setInteractive();
		this.tweens.add({
			targets: this.shroomItemsInterface2, alpha: {value: 0, ease: 'Power1', duration: 1000}, repeat: -1,	yoyo: true
		});
		//spatula
		this.spatulaItemsInterface = this.add.sprite(655, 70, 'spatula').setScale(0.3).setScrollFactor(0).setInteractive();
		this.spatulaItemsInterface2 = this.add.sprite(655, 70, 'spatula').setScale(0.3).setScrollFactor(0).setInteractive();
		this.tweens.add({
			targets: this.spatulaItemsInterface2, alpha: {value: 0, ease: 'Power1', duration: 1000}, repeat: -1,	yoyo: true
		});
	////buttons
		//coffee
		this.coffeeItemsButton = this.add.sprite(645, 445, 'coffee_fr1').play('coffee_anims').setScrollFactor(0).setInteractive().setScale(0.8);		
		//beer
		this.beerItemsButton = this.add.sprite(650, 450, 'beer').setScrollFactor(0).setInteractive().setScale(0.8);	
		//shroom items buttons
		this.shroomItemsButton = this.add.sprite(650, 450, 'shrooms').setScrollFactor(0).setInteractive();				
		//spatula
		this.spatulaItemsButton = this.add.sprite(650, 450, 'spatula').setScrollFactor(0).setInteractive().setScale(0.5);


		
	//virtual use power ups functionality
		this.coffeeItemsButton.on('pointerdown', ()=>{

				if (coffees >= 1 && this.coffeeSelected === true)
					{
						coffees--;
						this.playerInvincible = false;
						this.playerSpeedBoost = true;
						player.setVisible(false);
						this.playerFreeze = true;
						this.playerDrinking = this.add.sprite(player.x, player.y, 'player_drinking_coffee_fr3');
						player.flipX === true ? this.playerDrinking.flipX = true : this.playerDrinking.flipX = false;
						this.gulp = this.sound.add('gulp');
						this.gulp.play();
						this.time.delayedCall(500, ()=>{
							this.playerFreeze = false;
							this.frigYeah = this.sound.add('frigyeah');
							this.frigYeah.play();
							this.playerDrinking.destroy();
							player.setVisible(true);
						});
							this.time.delayedCall(10000, ()=>{
							this.playerSpeedBoost = false;
							});
						if (coffees <= 0)
						{
							if (beers >= 1 && shrooms >=1)
							{
								this.coffeeSelected = false;
								this.beerSelected = true;
								this.shroomSelected = false;
							}
							else if (beers >= 1)
							{
								this.beerSelected = true;
								this.shroomSelected = false;
								this.coffeeSelected = false;
								this.specialItemSelected = false;
							}
							else if (shrooms >= 1)
							{
								this.shroomSelected = true;
								this.coffeeSelected = false;
								this.beerSelected = false;
								this.specialItemSelected = false;
							}
							else if (items >= 1)
							{
								this.shroomSelected = false;
								this.coffeeSelected = false;
								this.beerSelected = false;
								this.specialItemSelected = true;
							}
						}
				}
			});
			//beer		
				this.beerItemsButton.on('pointerdown', ()=>{
				 if ( beers >= 1 && this.beerSelected === true)
					{
						beers--;
						this.playerInvincible = true;
						this.playerSpeedBoost = false;
						player.setVisible(false);
						this.playerFreeze = true;
						this.playerDrinking = this.add.sprite(player.x, player.y, 'player_drinking_beer');
						player.flipX === true ? this.playerDrinking.flipX = true : this.playerDrinking.flipX = false;
						this.gulp = this.sound.add('gulp');
						this.gulp.play();
						this.time.delayedCall(500, ()=>{
							this.playerFreeze = false;
							this.frigYeah = this.sound.add('frigyeah');
							this.frigYeah.play();
							this.playerDrinking.destroy();
							player.setVisible(true);
						});
						this.time.delayedCall(10000, ()=>{
							this.playerInvincible = false;
						});
						if (beers <= 0)
							{
								if (shrooms >= 1)
								{
									this.shroomSelected = true;
									this.coffeeSelected = false;
									this.beerSelected = false;
									this.specialItemSelected = false;
								}		
								else if (coffees >= 1)
								{
									this.coffeeSelected = true;
									this.beerSelected = false;
									this.shroomSelected = false;
									this.specialItemSelected = false;
								}
								else if (items >= 1)
								{
									this.coffeeSelected = false;
									this.beerSelected = false;
									this.shroomSelected = false;
									this.specialItemSelected = true;
								}
						}	
				}
			});	
			//shrooms
				this.shroomItemsButton.on('pointerdown', ()=>{
					if (shrooms >= 1 && this.shroomSelected === true)
					{
						shrooms--;
						this.cameras.main.setRenderToTexture(this.customPipeline3);
						this.rect = this.add.sprite(0, 0, 'pixel').setScale(120000).setAlpha(0.8);							
						this.rect.setPipeline('Custom');
						this.time.delayedCall(10000, ()=>{
								this.cameras.main.clearRenderToTexture();
								this.tweens.add({
									targets: this.rect,	alpha: {value: 0, duration: 2000, ease: 'Power1'}	
								}, this);
						});
				//trippin balls	
			this.dummyPlayer = this.physics.add.sprite(player.x, player.y , 'player').play('player_trippin', true);
			this.physics.add.collider(this.dummyPlayer, groundLayer);
				

				if (this.chili.active)
					{
						this.fireBall1Tween.stop();
					}
				if (this.chili2.active)
					{
						this.fireBall2Tween.stop();
					}
				if (this.meatball.active)
					{
						this.meatball.setVelocity(0);
						this.meatball.body.setAllowGravity(false).setImmovable(true);
					}
				if (this.meatball2.active)
					{
						this.meatball2.setVelocity(0);
						this.meatball2.body.setAllowGravity(false).setImmovable(true);
					}
				if (this.meatball3.active)
					{
						this.meatball3.setVelocity(0);
						this.meatball3.body.setAllowGravity(false).setImmovable(true);
					}
				if (this.meatball4.active)
					{
						this.meatball4.setVelocity(0);
						this.meatball4.body.setAllowGravity(false).setImmovable(true);
					}
				//shroom state reset
				this.time.delayedCall(10000, ()=>{
						this.cameras.main.clearRenderToTexture();
						this.tweens.add({
							targets: this.rect, alpha: {value: 0, duration: 2000, ease: 'Power1'}	
						}, this);
						this.dummyPlayer.destroy();
					if (this.meatball.active)
						{
							this.meatball.setBounce(1).setCollideWorldBounds(true).setVelocity(Phaser.Math.Between(-200, 200), 20);
							this.meatball.body.setAllowGravity(true).setImmovable(false);
						}
					if (this.meatball2.active)
						{
							this.meatball2.setBounce(1).setCollideWorldBounds(true).setVelocity(Phaser.Math.Between(-200, 200), 20);
							this.meatball2.body.setAllowGravity(true).setImmovable(false);
						}
					if (this.meatball3.active)
						{
							this.meatball3.setBounce(1).setCollideWorldBounds(true).setVelocity(Phaser.Math.Between(-200, 200), 20);
							this.meatball3.body.setAllowGravity(true).setImmovable(false);
						}
					if (this.meatball4.active)
						{
							this.meatball4.setBounce(1).setCollideWorldBounds(true).setVelocity(Phaser.Math.Between(-200, 200), 20);
							this.meatball4.body.setAllowGravity(true).setImmovable(false);
						}
						
					});
						if (shrooms <= 0)
						{			
								if (items >= 1)
								{
									this.specialItemSelected = true;
									this.coffeeSelected = false;
									this.beerSelected = false;
									this.shroomSelected = false;
								}
								else if (coffees >= 1)
								{
									this.coffeeSelected = true;
									this.specialItemSelected = false;
									this.beerSelected = false;
									this.shroomSelected = false;
								}
								else if (beers >= 1)
								{
									this.beerSelected = true;
									this.specialItemSelected = false;
									this.coffeeSelected = false;
									this.shroomSelected = false;	
								}
						}
					}
				});
			//spatula
					// use special item	
						this.spatulaItemsButton.on('pointerdown', ()=>{	
							if (this.SKey.isUp)
							{
									// use special item	
									this.C_buttonState = true;	
									this.specialItemSelected = true;
									player.anims.play('rolling_pin_loop', true);
									player.setVelocityX(0);
									this.huh = this.sound.add('huh');
									this.huh.play();	
									let weaponX = player.flipX === true ? player.x - 50 : player.x + 50;
									this.spatula = this.rollingPinWeapon.create(weaponX , player.y, 'spatula');
									if (player.flipX === true)
									{
										this.spatula.angle = 315;
										this.spatula.flipX = true;
									}
									else{
										this.spatula.angle = 45;
									}
									if(player.body.onFloor())
									{
										if (this.playerSpeedBoost === false && this.playerInvincible === false)
										{
											player.play('rolling_pin_loop', true)
										}
										else if (this.playerSpeedBoost === true && this.playerInvincible === false)
										{
											player.play('rolling_pin_coffee_loop', true);
										}
										else if (this.playerInvincible === true && this.playerSpeedBoost === false)
										{
											player.play('rolling_pin_beer_loop', true);
										}
									}
									this.time.delayedCall(150, ()=>{
										player.setTexture('idle1');
										this.rollingPinWeapon.getChildren().map(child => child.destroy());
									});
										
								 if (player.body.onFloor() === false){
										player.body.velocity.x = 0;
									player.body.velocity.y = 0;
									this.time.delayedCall(250, ()=>{
											this.rollingPinWeapon.getChildren().map(child => child.destroy());
											player.anims.play('fall');
											player.body.velocity.y = 300;
									});
								}
								this.physics.add.collider(this.spatula, this.levelBoss, ()=>{
											this.bossHit = this.sound.add('boss_hit');
											this.bossHit.play();
											this.time.delayedCall(150, ()=>{
												this.bossHit.stop();
											});
										if (this.levelBossHealth >= 2)
										{	
												player.tint = 0xff0000;	
												player.setBounce(1);
												healthScore--;
												this.text2.setText(healthScore);
												this.playerHit = this.sound.add('player_hit');
												this.playerHit.play();   
												this.time.delayedCall(250, ()=>{
													player.tint = 0xffffff;
													player.setBounce(0);
												});
										}
										if (this.levelBossHealth === 1)
										{
											this.levelBoss2.destroy();
											this.levelBoss3.destroy();
											this.levelBoss.setVelocityY(-50).play('boss_hit', true);
											this.levelBoss.anims.play('boss_hit_anim');
											this.time.delayedCall(1000, ()=>{
												this.levelBossHealth = 0;
												this.levelBoss.tint = 0x000000;
												this.pizzaOven.anims.play('oven_anims');
											});	
										}
								});
							}
						});	
						this.spatulaItemsButton.on('pointerup', ()=>{
							this.C_buttonState = false;
						});
			
}//end create function
//////////////////////////////////////////////////////////////////////////////////////////// update/////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

 update(time, delta) {



			// if (this.coffeeSelected)
			// {
			// 	console.log('coffee');
				
			// }
			// if (this.beerSelected)
			// {
			// 	console.log('beer');
			// }
			// if (this.shroomSelected)
			// {
			// 	console.log('shroom');
			// }
			// if (this.specialItemSelected)
			// {
			// 	console.log('spatula');
			// }


	//set selected to false if any quantity is 0
			if (coffees <= 0)
			{
				this.coffeeSelected = false;
				this.coffeeItemsButton.setActive(false).setVisible(false);		
				this.coffeeItemsInterface.setActive(false).setVisible(false);		
				this.coffeeItemsInterface2.setActive(false).setVisible(false);		
			
			}
			if (beers <= 0)
			{
				this.beerSelected = false;
				this.beerItemsButton.setActive(false).setVisible(false);	
				this.beerItemsInterface.setActive(false).setVisible(false);		
				this.beerItemsInterface2.setActive(false).setVisible(false);		
			
			}
			if (shrooms <= 0)
			{
				this.shroomSelected = false;
				this.shroomItemsButton.setActive(false).setVisible(false);		
				this.shroomItemsInterface.setActive(false).setVisible(false);		
				this.shroomItemsInterface2.setActive(false).setVisible(false);		
			
			}
			if (items <= 0)
			{
				this.specialItemSelected = false;
				this.spatulaItemsButton.setActive(false).setVisible(false);			
				this.spatulaItemsInterface.setActive(false).setVisible(false);		
				this.spatulaItemsInterface2.setActive(false).setVisible(false);		
			
			}

	

/////power ups and items	 
	
	//toggle/use power ups

	
	// coffee
	if (this.coffeeSelected === true )
	{
			this.coffeeItemsButton.setActive(true).setVisible(true);
			this.coffeeItemsInterface.setActive(true).setVisible(true);		
			this.coffeeItemsInterface2.setActive(true).setVisible(true).setTint(0xffff00);
			this.beerSelected = false;
			this.shroomSelected = false;
			this.specialItemSelected = false;
		if (beers >= 1 )
			{
				this.beerItemsInterface2.setTint(0xffffff);
				this.beerItemsButton.setActive(false).setVisible(false);
			}
		 if (shrooms >= 1 )
			{
				this.shroomItemsInterface2.setTint(0xffffff);
				this.shroomItemsButton.setActive(false).setVisible(false);
			}
		if (items >= 1 )
			{
				this.spatulaItemsInterface2.setTint(0xffffff);
				this.spatulaItemsButton.setActive(false).setVisible(false);
			}
		}
	//beer
	else if (this.beerSelected === true )
	{
		this.beerItemsButton.setActive(true).setVisible(true);
		this.beerItemsInterface.setActive(true).setVisible(true);		
		this.beerItemsInterface2.setActive(true).setVisible(true).setTint(0xffff00);
		this.coffeeSelected = false;
		this.shroomSelected = false;
		this.specialItemSelected = false;
		if (coffees >= 1)
			{
				this.coffeeItemsInterface2.setTint(0xffffff);
				this.coffeeItemsButton.setActive(false).setVisible(false);
			}
		 if (shrooms >= 1 )
			{
				this.shroomItemsInterface2.setTint(0xffffff);
				this.shroomItemsButton.setActive(false).setVisible(false);
			}
		if (items >= 1 )
			{
				this.spatulaItemsInterface2.setTint(0xffffff);
				this.spatulaItemsButton.setActive(false).setVisible(false);
			}			
	}

	//shrooms	
	else if (this.shroomSelected === true )
	{
			this.shroomItemsButton.setActive(true).setVisible(true);
			this.shroomItemsInterface.setActive(true).setVisible(true);		
			this.shroomItemsInterface2.setActive(true).setVisible(true).setTint(0xffff00);
			this.coffeeSelected = false;
			this.beerSelected = false;
			this.specialItemSelected = false;
		if (beers >= 1)
			{
				this.beerItemsInterface2.setTint(0xffffff);
				this.beerItemsButton.setActive(false).setVisible(false);
			}
		if (coffees >= 1)
			{
				this.coffeeItemsInterface2.setTint(0xffffff);
				this.coffeeItemsButton.setActive(false).setVisible(false);
			}
		if (items >= 1 )
			{
				this.spatulaItemsInterface2.setTint(0xffffff);
				this.spatulaItemsButton.setActive(false).setVisible(false);
			}
		}

	//special item (spatula)
	else if (this.specialItemSelected === true)
	{
			this.spatulaItemsButton.setActive(true).setVisible(true);
			this.spatulaItemsInterface.setActive(true).setVisible(true);		
			this.spatulaItemsInterface2.setActive(true).setVisible(true).setTint(0xffff00);
			this.coffeeSelected = false;
			this.beerSelected = false;
			this.shroomSelected = false;
		if (beers >= 1)
			{
				this.beerItemsInterface2.setTint(0xffffff);
				this.beerItemsButton.setActive(false).setVisible(false);
			}
		if (coffees >= 1)
			{
				this.coffeeItemsInterface2.setTint(0xffffff);
				this.coffeeItemsButton.setActive(false).setVisible(false);
			}
		if (shrooms >= 1)
			{
				this.shroomItemsInterface2.setTint(0xffffff);
				this.shroomItemsButton.setActive(false).setVisible(false);
			}
		}

		
////////////////////////////////////////////////////


	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	

	//idle
	if (player.body.onFloor() && cursors.up.isUp && cursors.right.isUp && cursors.left.isUp
	&& this.rightButtonState === false && this.jumpButtonState === false && this.leftButtonState === false
	&& this.WKey.isUp && this.A_buttonState === false && this.C_buttonState === false )
	{
			player.setVelocityX(0);
			player.anims.play('idle', true);
	}


	//beer	
		if (this.playerInvincible === false)
		{	
			this.drunkBubbles.visible = false;		
		}
		else{
			this.drunkBubbles.visible = true;
		}
		if (this.playerInvincible === true && this.leftButtonState === false 
			&& this.rightButtonState === false && this.jumpButtonState === false 
			&& cursors.left.isUp && cursors.right.isUp && cursors.up.isUp && player.body.onFloor() && 
			!(this.A_buttonState === true || this.WKey.isDown))
		{
			 player.setTexture('player_drunk_idle_fr1', true);
		}
		//bubbles follow player
		this.drunkBubbles.x = player.x;
		this.drunkBubbles.y = player.y - 50;

	//coffee
		if (this.playerSpeedBoost === true && this.leftButtonState === false 
			&& this.rightButtonState === false && this.jumpButtonState === false 
			&& cursors.left.isUp && cursors.right.isUp && cursors.up.isUp && player.body.onFloor() && 
			!(this.A_buttonState === true || this.WKey.isDown))
			{
				player.setTexture('player_coffee_idle_fr1');
			}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////player movements



if (this.DKey.isDown || this.B_buttonState === true)
{
	if (this.rightButtonState === false && this.leftButtonState === false && cursors.left.isUp && cursors.right.isUp)
	{
		player.setTexture('player_weapon_fr1', true);
	}	
}


if (this.C_buttonState === true)
{
	player.body.velocity.x = 0;
}

 //move left
  if (this.playerFreeze === false && this.leftButtonState === true || cursors.left.isDown && this.WKey.isUp && this.C_buttonState === false)
  {
	  player.flipX = true;
	  //ground
	  if (player.body.onFloor())
	  {
		  //normal
		  if (this.playerSpeedBoost === false && this.playerInvincible === false)
		  {
			  player.anims.play('walk', true).setVelocityX(-250);
		  }	
		  //x2 speed
		  else if (this.playerSpeedBoost === true )
		  {
			  player.anims.play('speed_walk', true).setVelocityX(-500);
		  }
		  //invincible
		  else if ( this.playerInvincible === true)
		  {
			  player.anims.play('drunk_walk', true).setVelocityX(-150);
		  }
		  //trippin
		   //invincible
		   else if ( this.playerTrippin === true)
		   {
			   player.anims.play('drunk_walk', true).setVelocityX(-250);
		   }
	  }
	  //air
	  else if (player.body.touching.none)
	  {
		  //normal
		  if (this.playerSpeedBoost === false && this.playerInvincible === false)
		  {
			  player.anims.play('fall', true).setVelocityX(-250);
		  }	
		  //x2 speed
		  else if (this.playerSpeedBoost === true)
		  {
			  player.anims.play('speed_fall', true).setVelocityX(-500);
		  }
		  //invincible
		  else if (this.playerInvincible === true)
		  {
			  player.anims.play('drunk_fall', true).setVelocityX(-150);
		  }
	  }
  }
 //move right
	if (this.playerFreeze === false && this.rightButtonState === true || cursors.right.isDown && this.WKey.isUp && this.C_buttonState === false)
	{
		player.flipX = false;
		//ground
		if (player.body.onFloor())
		{
			//normal
			if (this.playerSpeedBoost === false && this.playerInvincible === false)
			{
				player.anims.play('walk', true).setVelocityX(250);
			}
			//x2 speed	
			else if (this.playerSpeedBoost === true )
			{
				player.anims.play('speed_walk', true).setVelocityX(500);
			}
			//invincible
			else if ( this.playerInvincible === true)
			{
				player.anims.play('drunk_walk', true).setVelocityX(150);
			}
		}
		//air
		else if (player.body.touching.none && !(player.body.onFloor()))
		{
			//normal
			if (this.playerSpeedBoost === false && this.playerInvincible === false)
			{
				player.anims.play('fall', true).setVelocityX(250);
			}	
			//x2 speed
			else if (this.playerSpeedBoost === true)
			{
				player.anims.play('speed_fall', true).setVelocityX(500);
			}
			//invincible
			else if (this.playerInvincible === true)
			{
				player.anims.play('drunk_fall', true).setVelocityX(150);
			}
		}
	}
//jump
	//virtual
	if (this.jumpButtonState === true && cursors.up.isUp && player.body.onFloor()){

			this.huh = this.sound.add('huh');
			this.huh.play();
			//normal
			if (this.playerSpeedBoost === false && this.playerInvincible === false)
			{
				player.anims.play('fall', true).setVelocityY(-490);
			}	
			//x2 speed
			else if (this.playerSpeedBoost === true)
			{
				player.anims.play('speed_fall', true).setVelocityY(-700);
			}
			//invincible
			else if ( this.playerInvincible === true)
			{
				player.anims.play('drunk_fall', true).setVelocityY(-400);
			}
	}
	//keyboard
	if (cursors.up.isDown && this.jumpButtonState === false && player.body.onFloor())
	{

			this.huh = this.sound.add('huh');
			this.huh.play();
			this.huh = this.sound.add('huh');
			this.huh.play();
			//normal
			if (this.playerSpeedBoost === false && this.playerInvincible === false)
			{
				player.anims.play('fall', true).setVelocityY(-490);
			}	
			//x2 speed
			else if (this.playerSpeedBoost === true)
			{
				player.anims.play('speed_fall', true).setVelocityY(-700);
			}
			//invincible
			else if (this.playerInvincible === true)
			{
				player.anims.play('drunk_fall', true).setVelocityY(-400);
			}
	}



	//player is in a frozen state (drinking something)
	if (this.playerFreeze === true)
	{
		player.setVelocity(0);
	}

	/////////////////////////////////////////////////////////////////////////////
	if (this.B_buttonState === true && macaroniAvailable === true){
		player.anims.play('walk', true);
	}

	if (player.body.onFloor() && this.WKey.isDown){
		
		player.setVelocityX(0);		
	}
	if (player.body.onFloor() && this.A_buttonState === true && this.rightButtonState === true){
			player.setVelocityX(0);
	}
	if (player.body.onFloor() && this.A_buttonState === true && this.leftButtonState === true){
			player.setVelocityX(0);
	}
	if (player.body.onFloor() && this.A_buttonState === true && cursors.right.isDown){
			player.setVelocityX(0);
	}
	if (player.body.onFloor() && this.A_buttonState === true && cursors.left.isDown){
			player.setVelocityX(0);
	}	

// if rolling pin
	if (this.rollingPin)
	{	
		player.flipX === true ? this.rollingPin.x = player.x - 45 : this.rollingPin.x = player.x + 45;
		this.rollingPin.y = player.y;	
	}

// //if spatula item
	if (this.playerSpeedBoost === false && this.playerInvincible === false && this.specialItemSelected === true  
		&& this.spatulaItemsButton && items >= 1 && this.SKey.isDown && this.spatulaItemsButton.isUp)
	{
			player.flipX === true ? this.spatula.x = player.x - 45  : this.spatula.x = player.x + 45;
			this.spatula.y = player.y;	
			player.setVelocityX(0).setVelocityY(250);
			if(player.flipX === true && this.rightButtonState === true || cursors.right.isDown)
			{
				player.flipX = false;
			}
			else if(player.flipX === false && this.leftButtonState === true || cursors.left.isDown)
			{
				player.flipX = true;
			}
			if (player.flipX === true)
			{
				this.spatula.angle = 315;
				this.spatula.flipX = true;
			}
			else{
				this.spatula.angle = 45;
			}
	}

///////////////////////////////////////////////////////////////////////////////////
//macaroni cut off zones
this.zoneFront.body.x = player.body.x + 600;
this.zoneFront.body.y = player.body.y - 300;
this.zoneBack.body.x = player.body.x - 600;
this.zoneBack.body.y = player.body.y - 300;
	
///////////////////////////////////////////////////////////////////////////////////////////

	//pipeline update	

	this.customPipeline3.setFloat1('time', this.pipelineTime);
	this.pipelineTime += 0.005;


////////////////////////////////////////////////////////////////////////////////////////////////////////	
///////////////////////////////////////////////////////////////////////////////////////////////

//player health 
if (this.playerCollisionDetection === true)
{
    healthScore --;
    this.text2.setText(healthScore); 
}

if (healthScore === 1){
	this.text3.visible = true;
	this.health1TextTop.visible = false;
}	
else if (healthScore >= 2){
	this.text3.visible = false;
	this.health1TextTop.visible = true;
}
else if (healthScore <= 0){
			this.mainTheme.stop()	
			this.scene.stop('PlayState_lv2');
			this.scene.start('LivesState_lv2');
			livesAvailable--;
			livesText.setText(livesAvailable);
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
			if (this.beerItemsInterface )
			{
				this.beerItemsInterface.destroy();
				this.beerSelected = false;
				this.coffeeSelected = false;
			}
			else if (this.coffeeItemsInterface){
				this.coffeeItemsInterface.destroy();
				this.coffeeSelected = false;
				this.beerSelected = false;
			}
			game.renderer.removePipeline('Custom');
			game.renderer.removePipeline('Custom2');
			game.renderer.removePipeline('Custom3');
			game.renderer.removePipeline('Custom4');
	}
		if (livesAvailable <= 2){
		livesText.setText(livesAvailable);
		}		

///////////////////// enemy health update 	

//chili1
if (this.chiliHealth <= 0){
	this.chili.tint = 0x000000;
	 this.fireBall1Tween.stop();
	 this.fireBall1.destroy();
	 this.time.delayedCall(150, ()=>{
		this.chili.destroy();
		if(this.dough1)
		{
		  this.dough1.setVisible(true);
		}
	 });
		
}

//chili2
if (this.chili2Health <= 0){
	this.chili2.tint = 0x000000;
	 this.fireBall2Tween.stop();
	 this.fireBall2.destroy();
	 this.time.delayedCall(150, ()=>{
		this.chili2.destroy();
		if(this.dough2)
		{
		  this.dough2.setVisible(true);
		}
	 });	
	}

//chili3
	if (this.chili3Health <= 0){
		this.chili3.tint = 0x000000;
		this.fireBall3Tween.stop();
		this.fireBall3.destroy();
		this.time.delayedCall(150, ()=>{
			this.chili3.destroy();
			if(this.dough3)
			{
			  this.dough3.setVisible(true);
			}
		});		
	}

// level boss
if (this.levelBossHealth === 1)
{
		this.levelBoss3.setVisible(false);
} 
if (this.levelBossHealth >= 2)
	{
		this.levelBoss3.setVisible(true);
	}
if (this.levelBossHealth === 0 )
{
	if (this.dough5 && this.dough6 && this.dough7 && this.dough8 && this.dough9 && this.dough10)
	{
	    this.levelBoss.destroy();
	    this.itemHitBox1.destroy();
	    this.itemHitBox2.destroy();
	    this.dough5.setVisible(true);
		this.dough6.setVisible(true);
		this.dough7.setVisible(true);
		this.dough8.setVisible(true);
		this.dough9.setVisible(true);
		this.dough10.setVisible(true);
	}
}

if (this.levelBossHealth <= 0){
	if(this.itemHitBox1 && this.itemHitBox2)
		{
			this.itemHitBox1.destroy();
			this.itemHitBox2.destroy();
			this.itemTop.visible = true;
			this.bossZone.destroy();
		}	
}

	
///////////////////// enemy health update 	

//chili1
if (this.chiliHealth <= 0){
	this.chili.tint = 0x000000;
	 this.fireBall1Tween.stop();
	 this.fireBall1.destroy();
	 this.time.delayedCall(150, ()=>{
		this.chili.destroy();
		if(this.dough1)
		{
		  this.dough1.setVisible(true);
		}
	 });
		
}

//chili2
if (this.chili2Health <= 0){
	this.chili2.tint = 0x000000;
	 this.fireBall2Tween.stop();
	 this.fireBall2.destroy();
	 this.time.delayedCall(150, ()=>{
		this.chili2.destroy();
		if(this.dough2)
		{
		  this.dough2.setVisible(true);
		}
	 });	
	}

//chili3
	if (this.chili3Health <= 0){
		this.chili3.tint = 0x000000;
		this.fireBall3Tween.stop();
		this.fireBall3.destroy();
		this.time.delayedCall(150, ()=>{
			this.chili3.destroy();
			if(this.dough3)
			{
			  this.dough3.setVisible(true);
			}
		});		
	}


// level boss
if (this.levelBossHealth === 1)
{
	if (this.pepperoni)
		{
			this.pepperoni.destroy();
		}
		this.levelBoss3.setVisible(false);
		} 
		if (this.levelBossHealth >= 2)
		{
			this.levelBoss3.setVisible(true);
		}
if (this.levelBossHealth === 0 )
{
	if (this.dough5 && this.dough6 && this.dough7 && this.dough8 && this.dough9 && this.dough10)
	{
	    this.levelBoss.destroy();
	    this.itemHitBox1.destroy();
	    this.itemHitBox2.destroy();
	    this.dough5.setVisible(true);
		this.dough6.setVisible(true);
		this.dough7.setVisible(true);
		this.dough8.setVisible(true);
		this.dough9.setVisible(true);
		this.dough10.setVisible(true);
	}
}

if (this.levelBossHealth <= 0){
	if(this.itemHitBox1 && this.itemHitBox2)
		{
			this.itemHitBox1.destroy();
			this.itemHitBox2.destroy();
			this.itemTop.visible = true;
		}
		if (this.pepperoni)
		{
			this.pepperoni.destroy();
		}
}


	//annoying fucking dough update because either I, Phaser3, or both of us are too fucking stupod to make "allowSetGravity" to work on a defined variable
	if(this.dough1.visible === true && this.dough1.active === true)
	{
		this.dough1.body.setAllowGravity(true);
	}
	if(this.dough2.visible === true && this.dough2.active === true)
	{
		this.dough2.body.setAllowGravity(true);
	}
	if(this.dough3.visible === true && this.dough3.active === true)
	{
		this.dough3.body.setAllowGravity(true);
	}
	if(this.dough4.visible === true && this.dough4.active === true)
	{
		this.dough4.body.setAllowGravity(true);
	}
	if(this.dough5.visible === true && this.dough5.active === true)
	{
		this.dough5.body.setAllowGravity(true);
	}
	if(this.dough6.visible === true && this.dough6.active === true)
	{
		this.dough6.body.setAllowGravity(true);
	}
	if(this.dough7.visible === true && this.dough7.active === true)
	{
		this.dough7.body.setAllowGravity(true);
	}
	if(this.dough8.visible === true && this.dough8.active === true)
	{
		this.dough8.body.setAllowGravity(true);
	}
	if(this.dough9.visible === true && this.dough9.active === true)
	{
		this.dough9.body.setAllowGravity(true);
	}
	if(this.dough10.visible === true && this.dough10.active === true)
	{
		this.dough10.body.setAllowGravity(true);
	}
	if(this.dough11.visible === true && this.dough11.active === true)
	{
		this.dough11.body.setAllowGravity(true);
	}
	if(this.dough12.visible === true && this.dough12.active === true)
	{
		this.dough12.body.setAllowGravity(true);
	}
//meatballs
if (this.dough4)
	{
		if (this.dough4.visible === false && this.meatball)
		{
			this.dough4.x = this.meatball.x;
			this.dough4.y = this.meatball.y;
		} 
	}


if (this.dough11)
	{
		if (this.dough11.visible === false && this.meatball2)
		{
			this.dough11.x = this.meatball2.x;
			this.dough11.y = this.meatball2.y;
		} 
	}

if (this.dough12)
{
	if (this.dough12.visible === false && this.meatball3)
	{
		this.dough12.x = this.meatball3.x;
		this.dough12.y = this.meatball3.y;
	} 
}
	
 }//end update method
   
}//////////////////////////////////////////////////////////////////////end state





























	