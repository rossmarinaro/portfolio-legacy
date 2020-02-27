//// Pastaboss game Playstate script

class PlayState_lv3 extends Phaser.Scene {
  constructor() {
    super("PlayState_lv3");
  }


////create
  
create() {


		//health score and macaroni available
		healthScore = 3;
		macaroniAvailable = 25;
		
		this.socket = io();
		this.socket.emit('points', macaroniAvailable);
	
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
		this.bkgnd2 = 
		this.cameras.main.setBackgroundColor('#6B6B6B');
		//music
			this.mainTheme = this.sound.add('lv2ext');
			this.mainTheme.play();
			this.mainTheme.setLoop(this.loop);
		// map
	    let map2 = this.add.tilemap('map2');
		// tiles for the ground layer, background images
		let backdropTiles = map2.addTilesetImage('tiles3');
		this.backdrop = map2.createStaticLayer('bkgnd', backdropTiles, 0, 0);
		let backdropTiles2 = map2.addTilesetImage('tiles4');
		this.backdropUnderground = map2.createStaticLayer('bkgnd2', backdropTiles2, 0, 0);
		let backdropTiles3 = map2.addTilesetImage('tiles4');
		this.backdropUnderground2 = map2.createStaticLayer('bkgnd3', backdropTiles3, 0, 0);
			this.add.sprite(100, 400, 'cloud2_fr1').setScale(1.3).play('cloud2_anims', true);
			this.add.sprite(300, 800, 'cloud2_fr1').setScale(1.3).play('cloud2_anims', true);
			this.add.sprite(200, 1130, 'cloud2_fr1').setScale(1.3).play('cloud2_anims', true);
			this.add.sprite(400, 1500, 'cloud2_fr1').setScale(1.3).play('cloud2_anims', true);
			this.add.sprite(400, 2000, 'cloud2_fr1').setScale(1.3).play('cloud2_anims', true);
			this.add.sprite(600, 2500, 'cloud2_fr1').setScale(1.3).play('cloud2_anims', true);
			this.add.sprite(1100, 400, 'cloud2_fr1').setScale(1.3).play('cloud2_anims', true);
			this.add.sprite(2000, 800, 'cloud2_fr1').setScale(1.3).play('cloud2_anims', true);
			this.add.sprite(900, 1130, 'cloud2_fr1').setScale(1.3).play('cloud2_anims', true);
			this.add.sprite(600, 1500, 'cloud2_fr1').setScale(1.3).play('cloud2_anims', true);
			this.add.sprite(1300, 2000, 'cloud2_fr1').setScale(1.3).play('cloud2_anims', true);
			this.add.sprite(3000, 2500, 'cloud2_fr1').setScale(1.3).play('cloud2_anims', true);
			this.add.sprite(500, 2500, 'cloud2_fr1').setScale(1.3).play('cloud2_anims', true);
			this.add.sprite(1200, 2500, 'cloud2_fr1').setScale(1.3).play('cloud2_anims', true);
			this.add.sprite(1400, 2500, 'cloud2_fr1').setScale(1.3).play('cloud2_anims', true);
			this.add.sprite(200, 2500, 'cloud2_fr1').setScale(1.3).play('cloud2_anims', true);
			this.add.sprite(4000, 400, 'cloud2_fr1').setScale(1.3).play('cloud2_anims', true);
			this.add.sprite(2500, 800, 'cloud2_fr1').setScale(1.3).play('cloud2_anims', true);
			this.add.sprite(3400, 1130, 'cloud2_fr1').setScale(1.3).play('cloud2_anims', true);
			this.add.sprite(700, 1500, 'cloud2_fr1').setScale(1.3).play('cloud2_anims', true);
			this.add.sprite(1700, 2000, 'cloud2_fr1').setScale(1.3).play('cloud2_anims', true);
			this.add.sprite(2200, 2500, 'cloud2_fr1').setScale(1.3).play('cloud2_anims', true);
		let groundTiles = map2.addTilesetImage('tiles4');
		let groundLayer = map2.createStaticLayer('World', groundTiles, 0, 0);
		groundLayer.setCollisionByExclusion([-1]);
		let macaroniItemTiles = map2.addTilesetImage('coin');   
		macaroniPickupLayer = map2.createDynamicLayer('Coins', macaroniItemTiles, 0, 0);
		//world parameters
		this.physics.world.bounds.width = groundLayer.width;   
		this.physics.world.bounds.height = groundLayer.height; 
	//obstacles
		this.obstacleMoving= this.physics.add.group();
		this.obstacleStatic = this.physics.add.staticGroup();
		// enemy movement groups 
		this.enemyStatic = this.physics.add.staticGroup();
		this.enemyMoving = this.physics.add.group();
		this.enemies = [
			this.enemyStatic, this.enemyMoving			
		];
///////////////enemy spawns	
		//cheese pits
		this.cheese_pit = this.enemyStatic.create(1155, 2735, 'cheese_pit1').play('cheese_pit_anims').setScale(1.66).setSize(350, 230).setOffset(-60, -11);
		this.cheese_pit2 = this.enemyStatic.create(1857, 2735, 'cheese_pit1').play('cheese_pit_anims').setScale(1.66).setSize(350, 230).setOffset(-60, -11);
		this.cheese_pit3 = this.enemyStatic.create(2557, 2735, 'cheese_pit1').play('cheese_pit_anims').setScale(1.66).setSize(350, 230).setOffset(-60, -11);
		this.cheese_pit4 = this.enemyStatic.create(3327, 2735, 'cheese_pit1').play('cheese_pit_anims').setScale(1.66).setSize(350, 230).setOffset(-60, -11);


	//rolling pin
	this.rollingPinWeapon = this.physics.add.staticGroup();
	//macaroni
		this.macaronis = this.physics.add.group();

		// level pick ups
		let pickups = this.physics.add.group();
		this.healthPickup = pickups.create(3160, 1400, 'ikura');
		this.healthPickup2 = pickups.create(1075, 400, 'salmon');
		this.healthPickup3 = pickups.create(1150, 400, 'ikura');
		this.healthPickup4 = pickups.create(1340, 900, 'salmon');
		this.healthPickup5 = pickups.create(3060, 1000, 'ikura');
		this.healthPickup6 = pickups.create(1400, 900, 'salmon');
		this.healthPickup7 = pickups.create(1500, 1400, 'ikura');
		this.healthPickup8 = pickups.create(1460, 900, 'salmon');
		this.healthPickup9 = pickups.create(6600, 200, 'ikura');
		this.healthPickup10 = pickups.create(3100, 1400, 'salmon');
		// extra life
		this.extraLife = pickups.create(840, 285, 'lives2').setScale(0.25);
		//power ups
		this.coffee1 = pickups.create(3750, 1500, 'coffee_fr1').play('coffee_anims');
		this.beer1 =  pickups.create(1250, 1200, 'beer');
		this.shroom1 = pickups.create(2730, 985, 'shrooms');
		
	//sauce lava
	this.sauceLava = this.enemyStatic.create(1085, 2205, 'sauce_lava1').play('sauce_lava_anims');	
	//chili peppers
	this.chili = this.enemyStatic.create(1750, 2125, 'chili_fr1').play('chili_loop');
	this.chili.flipX = true;
	this.chili2 = this.enemyStatic.create(200, 2125, 'chili_fr1').play('chili_loop');
	this.chili2.flipX = true;
	//chili health 
	this.chiliHealth = 3;
	this.chili2Health = 3;
	//fire from chilis
	this.fireBall1 = this.enemyMoving.create(1750, 2120, 'fire_fr1').play('fireball_anims').setScale(0.4);
	this.fireBall1.flipY = true;
	this.fireBall1.angle = 90;
	this.fireBall1.body.setAllowGravity(false);
	this.fireBall1Tween = this.tweens.add({
		targets: this.fireBall1, x: 2000, y: 2110, ease: 'Linear', duration: 1000, repeat: -1, yoyo: false
	});
	this.fireBall2 = this.enemyMoving.create(200, 2120, 'fire_fr1').play('fireball_anims').setScale(0.4);
	this.fireBall2.flipY = true;
	this.fireBall2.angle = 90;
	this.fireBall2.body.setAllowGravity(false);
	this.fireBall2Tween = this.tweens.add({
		targets: this.fireBall2, x: 500, y: 2110, ease: 'Linear', duration: 1000, repeat: -1, yoyo: false
	});
	//meatballs
	this.meatball = this.enemyMoving.create(4800, 400, 'meatball_fr1').play('meatball_loop');
	this.meatball2 = this.enemyMoving.create(3000, 700, 'meatball_fr1').play('meatball_loop');
	this.meatball3 = this.enemyMoving.create(4500, 800, 'meatball_fr1').play('meatball_loop');
	this.meatball4 = this.enemyMoving.create(3800, 600, 'meatball_fr1').play('meatball_loop');
	this.meatball2.flipX = true;
	// meatballs health points
	this.meatballHealth = 2;
	this.meatball2Health = 2;
	this.meatball3Health = 2;
	this.meatball4Health = 2;		
	// 
	this.meatball.setBounce(1);
	this.meatball.setCollideWorldBounds(true);
	this.meatball.setVelocity(Phaser.Math.Between(-200, 200), 20);
	this.meatball.allowGravity = true;
	//
	this.meatball2.setBounce(1);
	this.meatball2.setCollideWorldBounds(true);
	this.meatball2.setVelocity(Phaser.Math.Between(-200, 200), 20);
	this.meatball2.allowGravity = true;
	//
	this.meatball3.setBounce(1);
	this.meatball3.setCollideWorldBounds(true);
	this.meatball3.setVelocity(Phaser.Math.Between(-200, 200), 20);
	this.meatball3.allowGravity = true;
	//
	this.meatball4.setBounce(1);
	this.meatball4.setCollideWorldBounds(true);
	this.meatball4.setVelocity(Phaser.Math.Between(-200, 200), 20);
	this.meatball4.allowGravity = true;
	//
	//cheese
	this.cheese1 = this.enemyMoving.create(2550, 2000, 'cheese_fr1').play('cheese_loop', true);
	this.cheese2 = this.enemyMoving.create(4800, 1700, 'cheese_fr1').play('cheese_loop', true);
	this.cheese3 = this.enemyMoving.create(500, 1450, 'cheese_fr1').play('cheese_loop', true);
	this.cheese4 = this.enemyMoving.create(2400, 1000, 'cheese_fr1').play('cheese_loop', true); 
	//cheese tweens
	this.cheese1Tween = this.tweens.add({
		targets: this.cheese1, x: 2900, ease: 'Linear', duration: 3000, repeat: -1, yoyo: true, onRepeat: ()=>{
	this.cheese1.flipX = true;
	this.time.delayedCall(3000, ()=>{
			this.cheese1.flipX = false;
			});
		}, onRepeatScope: this, onRepeatParams: [], repeatDelay: 0
	}); 
	this.cheese2Tween = this.tweens.add({
		targets: this.cheese2, x: 5200, ease: 'Linear', duration: 3000, repeat: -1, yoyo: true, onRepeat: ()=>{
	this.cheese2.flipX = true;
	this.time.delayedCall(3000, ()=>{
			this.cheese2.flipX = false;
		});
		}, onRepeatScope: this, onRepeatParams: [], repeatDelay: 0
	});
	this.cheese3Tween = this.tweens.add({
		targets: this.cheese3, x: 800, ease: 'Linear', duration: 3000, repeat: -1, yoyo: true, onRepeat: ()=>{
	this.cheese3.flipX = true;
	this.time.delayedCall(3000, ()=>{
			this.cheese3.flipX = false;
		});
		}, onRepeatScope: this, onRepeatParams: [], repeatDelay: 0
	});
	this.cheese4Tween = this.tweens.add({
		targets: this.cheese4, x: 2800, ease: 'Linear', duration: 3000, repeat: -1, yoyo: true, onRepeat: ()=>{
	this.cheese4.flipX = true;
	this.time.delayedCall(3000, ()=>{
			this.cheese4.flipX = false;
		});
		}, onRepeatScope: this, onRepeatParams: [], repeatDelay: 0
	});
	//cheese
	this.cheese1Health = 3;
	this.cheese2Health = 3;
	this.cheese3Health = 3;
	this.cheese4Health = 3;
	
	//hotdog boss
	this.hotdog = this.enemyMoving.create(2300, 300, 'boss_fr1').play('boss_loop', true).setScale(0.9);
	this.hotdogHealth = 15;
	this.hotdogTween = this.tweens.add({
				targets: this.hotdog, x: 2000, ease: 'Linear', duration: 1000, repeat: -1, yoyo: true, onYoyo: ()=>{
				this.time.delayedCall(1500, ()=>{
					this.hotdog.anims.remove('boss_loop');
					this.hotdog.anims.play('boss_attack_loop', true);
				});
				}, onYoyoScope: this, onYoyoParams: [], yoyoDelay: 0, onRepeat: ()=>{
					this.time.delayedCall(1000, ()=>{
					this.hotdog.anims.play('boss_loop', true);
				});		
			}, onRepeatScope: this, onRepeatParams: [], repeatDelay: 0
		 });
	this.hotdogTween.pause();
	this.hotdogTween2 = this.tweens.add({
				targets: this.hotdog, x: 2000, ease: 'Linear', duration: 500, repeat: -1, yoyo: true, onYoyo: ()=>{
				this.time.delayedCall(10, ()=>{
					this.hotdog.anims.play('boss_attack_loop', true);
				});
				}, onYoyoScope: this, onYoyoParams: [], yoyoDelay: 0, onRepeat: ()=>{
					this.time.delayedCall(10, ()=>{
					this.hotdog.anims.play('boss_loop', true);
				});
			}, onRepeatScope: this, onRepeatParams: [], repeatDelay: 0
		});
	this.hotdogTween2.pause();


	//brick obstacle and hidden door to mini game
	// mini game doors
	this.miniGameDoors = this.physics.add.staticGroup();
	this.miniGameDoorOpen = this.miniGameDoors.create(90, 1125, 'minigame_door_open').setScale(0.9);
	this.miniGameDoorClosed = this.miniGameDoors.create(90, 1125, 'minigame_door_closed').setScale(0.9).setAlpha(0);

//level complete door
	let exit = this.physics.add.staticGroup();
	exit.create(4235, 490, 'exit');
//player spawn///
	// player sprite spawns at different parts depending on if minigame has been played
	if (onBegin === true){
		player = this.physics.add.sprite(200, 2570, 'player'); 
		//block hiding swanky velvet mini game
		this.breakableBrick = this.obstacleStatic.create(70, 1120, 'breakable_brick');
	   }else{
		   player = this.physics.add.sprite(250, 1125, 'player');
		   this.miniGameDoorClosed.setAlpha(1);
		   this.miniGameDoorOpen.destroy();
	   }
	   //blocks hiding doors
		this.breakableBrick2 = this.obstacleStatic.create(840, 280, 'breakable_brick');
		this.breakableBrick3 = this.obstacleStatic.create(2730, 980, 'breakable_brick');

		player.setBounce(0.2); // our player will bounce from items
		player.setCollideWorldBounds(true); // don't go out of the map    
		player.body.setSize(player.width, player.height-8);
		this.drunkBubbles = this.add.sprite(0, 0, 'bubble_fr1').setScale(1.5).play('bubble_anims').setVisible(false);
	   this.playerInvincible = false;
	   this.physics.add.collider(player, groundLayer);		
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////	

//macaroni cut off zones
this.zoneFront = this.add.zone(player.x, player.y).setSize(50, 1500);
this.physics.world.enable(this.zoneFront);
this.zoneFront.body.setAllowGravity(false).setImmovable(false);
this.zoneBack = this.add.zone(player.x, player.y).setSize(50, 1500);
this.physics.world.enable(this.zoneBack);
this.zoneBack.body.setAllowGravity(false).setImmovable(false);





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
		this.physics.add.collider(player, this.healthPickup9, ()=>{
		this.healthPickup9.disableBody(true, true);
		this.healthPickup9.destroy();
		healthScore++;
		this.text2.setText(healthScore);
		this.healthRing = this.sound.add('health_ring');
		this.healthRing.play();
		});
		this.physics.add.collider(player, this.healthPickup10, ()=>{
		this.healthPickup10.disableBody(true, true);
		this.healthPickup10.destroy();
		healthScore++;
		this.text2.setText(healthScore);
		this.healthRing = this.sound.add('health_ring');
		this.healthRing.play();
		});
	// extra life pickups
		this.physics.add.collider(player, this.extraLife, ()=>{
			this.extraLifeSound = this.sound.add('extra_life_sound');
			this.extraLifeSound.play();
			this.extraLife.disableBody(true, true);
			this.extraLife.destroy();
			livesAvailable++;	
			livesText.setText(livesAvailable);
			livesLeft++;
		});	
	//dough
		this.dough1 = pickups.create(1750, 2125, 'dough').setVisible(false);
		this.dough1.body.setAllowGravity(false);
		this.dough2 = pickups.create(200, 2125, 'dough').setVisible(false);
		this.dough2.body.setAllowGravity(false);
		this.physics.add.collider(player, this.dough1, ()=>{
			this.dough1.destroy();
			doughAvailable++;
			this.doughQuantity.setText(doughAvailable);
			this.doughSound = this.sound.add('dough_sound');
			this.doughSound.play();
			});
			this.physics.add.collider(player, this.dough2, ()=>{
			this.dough2.destroy();
			doughAvailable++;
			this.doughQuantity.setText(doughAvailable);
			this.doughSound = this.sound.add('dough_sound');
			this.doughSound.play();
			});
		// boss's dough
	this.dough5 = pickups.create(2300, 400, 'dough').setVisible(false);
	this.dough5.body.setAllowGravity(false);
			this.physics.add.collider(player, this.dough5, ()=>{
				this.dough5.destroy();
				doughAvailable++;
				this.doughQuantity.setText(doughAvailable);
				this.healthRing = this.sound.add('dough_sound');
				this.healthRing.play();
				});	
				this.dough6 = pickups.create(2320, 400, 'dough').setVisible(false);
				this.dough6.body.setAllowGravity(false);
				this.physics.add.collider(player, this.dough6, ()=>{
					this.dough6.destroy();
					doughAvailable++;
					this.doughQuantity.setText(doughAvailable);
					this.healthRing = this.sound.add('dough_sound');
					this.healthRing.play();
					});	
					this.dough7 = pickups.create(2340, 400, 'dough').setVisible(false);
					this.dough7.body.setAllowGravity(false);
					this.physics.add.collider(player, this.dough7, ()=>{
						this.dough7.destroy();
						doughAvailable++;
						this.doughQuantity.setText(doughAvailable);
						this.healthRing = this.sound.add('dough_sound');
						this.healthRing.play();
						});	
						this.dough8 = pickups.create(2360, 400, 'dough').setVisible(false);
						this.dough8.body.setAllowGravity(false);
						this.physics.add.collider(player, this.dough8, ()=>{
							this.dough8.destroy();
							doughAvailable++;
							this.doughQuantity.setText(doughAvailable);
							this.healthRing = this.sound.add('dough_sound');
							this.healthRing.play();
							});	
							this.dough9 = pickups.create(2380, 400, 'dough').setVisible(false);
							this.dough9.body.setAllowGravity(false);
							this.physics.add.collider(player, this.dough9, ()=>{
								this.dough9.destroy();
								doughAvailable++;
								this.doughQuantity.setText(doughAvailable);
								this.healthRing = this.sound.add('dough_sound');
								this.healthRing.play();
								});	
								this.dough10 = pickups.create(2400, 400, 'dough').setVisible(false);
								this.dough10.body.setAllowGravity(false);
								this.physics.add.collider(player, this.dough10, ()=>{
									this.dough10.destroy();
									doughAvailable++;
									this.doughQuantity.setText(doughAvailable);
									this.healthRing = this.sound.add('dough_sound');
									this.healthRing.play();
									});	
								//cheese dough
									this.dough11 = pickups.create(this.cheese1.x, this.cheese1.y, 'dough').setVisible(false);
									this.dough11.body.setAllowGravity(false);
									this.physics.add.overlap(player, this.dough11, ()=>{
										if (this.cheese1Health <= 0)
										{
											this.dough11.destroy();
											doughAvailable++;
											this.doughQuantity.setText(doughAvailable);
											this.healthRing = this.sound.add('dough_sound');
											this.healthRing.play();
										}
										});	
										this.dough12 = pickups.create(this.cheese3.x,this.cheese3.y, 'dough').setVisible(false);
										this.dough12.body.setAllowGravity(false);
										this.physics.add.overlap(player, this.dough12, ()=>{
											if (this.cheese3Health <= 0)
											{
												this.dough12.destroy();
												doughAvailable++;
												this.doughQuantity.setText(doughAvailable);
												this.healthRing = this.sound.add('dough_sound');
												this.healthRing.play();
											}
											});	
										//meatball dough
											this.dough13 = pickups.create(this.meatball2.x, this.meatball2.y, 'dough').setVisible(false);
											this.dough13.body.setAllowGravity(false);
											
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


	//shrooms
	this.shroomSelected = false;
	this.useShroom = false;
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
		
/////////////////////////////////////////////////////////////   LEVEL COMPLETE!  ///////////////////////////
this.physics.add.overlap(player, exit, ()=>{
	this.cameras.main.fade(300, 0, 0, 0, false, function(camera, progress){
		if(progress > .9){
			this.socket.emit('level2_complete');
			this.mainTheme.stop();
			this.scene.stop('PlayState_lv3');
			this.scene.start('PreloadState_lv4');
			game.renderer.removePipeline('Custom');
			game.renderer.removePipeline('Custom2');
			game.renderer.removePipeline('Custom3');
			game.renderer.removePipeline('Custom4');
		}
	});	
});
// exit to mini games
this.physics.add.overlap(player, this.miniGameDoorOpen, ()=>{
	this.cameras.main.fade(300, 0, 0, 0, false, function(camera, progress){
		if(progress > .9){
			this.mainTheme.stop();
			this.scene.stop('PlayState_lv3');
			this.scene.start('PreloadState_MiniGame1');	
			game.renderer.removePipeline('Custom');
			game.renderer.removePipeline('Custom2');
			game.renderer.removePipeline('Custom3');
			game.renderer.removePipeline('Custom4');
		}
	});	
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

		this.platform = this.obstacleMoving.create(600, 2000, 'platform');
		// platform tween
		this.platformTween = this.tweens.add({
			targets: this.platform, x: 1530, ease: 'Linear', duration: 4000, repeat: -1, yoyo: true, onRepeat: ()=>{
		this.time.delayedCall(4000, ()=>{
			});
			}, onRepeatScope: this, onRepeatParams: [], repeatDelay: 0
		});


////enemy collisions with weapons
			//chili 1
			this.physics.add.overlap(this.rollingPinWeapon, this.chili, ()=>{
				this.chili.tint = 0xff0000;
				this.chiliHealth--;
				this.chiliHit = this.sound.add('chili_hit');
					this.time.delayedCall(50, ()=>{
						this.chiliHit.play();
					});
				});
				this.physics.add.overlap(this.macaronis, this.chili, ()=>{
					this.macaronis.getChildren().map(child => child.destroy());
					this.chili.tint = 0xff0000;
					this.chiliHealth--;
					this.chiliHit = this.sound.add('chili_hit');
						this.time.delayedCall(50, ()=>{
							this.chiliHit.play();
						});
					});
	//chili 2
			this.physics.add.overlap(this.rollingPinWeapon, this.chili2, ()=>{
				this.chili2.tint = 0xff0000;
				this.chili2Health--;
				this.chiliHit = this.sound.add('chili_hit');
					this.time.delayedCall(50, ()=>{
						this.chiliHit.play();
					});
				});
				this.physics.add.overlap(this.macaronis, this.chili2, ()=>{
				this.chili2.tint = 0xff0000;
				this.chili2Health--;
				this.macaronis.getChildren().map(child => child.destroy());
				this.chiliHit = this.sound.add('chili_hit');
					this.time.delayedCall(50, ()=>{
						this.chiliHit.play();
					});
				});
//meatball 1
			this.physics.add.overlap(this.rollingPinWeapon, this.meatball, ()=>{
					this.meatball.tint = 0x000000;
					this.meatballHit = this.sound.add('meatball_hit');
					this.time.delayedCall(50, ()=>{
					this.meatballHit.play();
					this.meatball.destroy();
				});
			});
			this.physics.add.overlap(this.macaronis, this.meatball, ()=>{
				this.macaronis.getChildren().map(child => child.destroy());
				this.meatball.tint = 0x000000;
				this.meatballHit = this.sound.add('meatball_hit');
				this.time.delayedCall(50, ()=>{
				this.meatballHit.play();
				this.meatball.destroy();
			});
		});
// meatball 2
			this.physics.add.overlap(this.rollingPinWeapon, this.meatball2, ()=>{
					this.meatball2.tint = 0x000000;	
					 this.meatballHit = this.sound.add('meatball_hit');
					this.time.delayedCall(50, ()=>{
					this.meatballHit.play();
					this.meatball2.destroy();
					this.dough13.setVisible(true);
				});
			});
			this.physics.add.overlap(this.macaronis, this.meatball2, ()=>{
				this.macaronis.getChildren().map(child => child.destroy());
				this.meatball2.tint = 0x000000;	
				 this.meatballHit = this.sound.add('meatball_hit');
				this.time.delayedCall(50, ()=>{
				this.meatballHit.play();
				this.meatball2.destroy();
				this.dough13.setVisible(true);
			});
		});
// meatball 3
			this.physics.add.overlap(this.rollingPinWeapon, this.meatball3, ()=>{
					this.meatball3.tint = 0x000000;
					this.meatballHit = this.sound.add('meatball_hit');
					this.time.delayedCall(50, ()=>{
					this.meatballHit.play();
					this.meatball3.destroy();
				});	
			});
			this.physics.add.overlap(this.macaronis, this.meatball3, ()=>{
				this.macaronis.getChildren().map(child => child.destroy());
				this.meatball3.tint = 0x000000;
				this.meatballHit = this.sound.add('meatball_hit');
				this.time.delayedCall(50, ()=>{
				this.meatballHit.play();
				this.meatball3.destroy();
			});	
		});
// meatball 4
			this.physics.add.overlap(this.rollingPinWeapon, this.meatball4, ()=>{
					this.meatball4.tint = 0x000000;	
					this.meatballHit = this.sound.add('meatball_hit');
					this.time.delayedCall(50, ()=>{
					this.meatballHit.play();
					this.meatball4.destroy();
				});
			});
			this.physics.add.overlap(this.macaronis, this.meatball4, ()=>{
				this.macaronis.getChildren().map(child => child.destroy());
				this.meatball4.tint = 0x000000;	
				this.meatballHit = this.sound.add('meatball_hit');
				this.time.delayedCall(50, ()=>{
				this.meatballHit.play();
				this.meatball4.destroy();
			});
		});
		
// cheese 1
			this.physics.add.overlap(this.rollingPinWeapon, this.cheese1, ()=>{
				this.cheese1.tint = 0xff0000;
				this.cheese1Health--;
				this.time.delayedCall(50, ()=>{
				this.cheese1.tint = 0xffffff;
				this.enemyOw2 = this.sound.add('enemy_ow2');
				this.enemyOw2.play();
				});
			});
			this.physics.add.overlap(this.macaronis, this.cheese1, ()=>{
				this.macaronis.getChildren().map(child => child.destroy());
				this.cheese1.tint = 0xff0000;
				this.cheese1Health--;
				this.time.delayedCall(50, ()=>{
				this.cheese1.tint = 0xffffff;
				this.enemyOw2 = this.sound.add('enemy_ow2');
				this.enemyOw2.play();
				});
			});
// cheese 2
			this.physics.add.overlap(this.rollingPinWeapon, this.cheese2, ()=>{
				this.cheese2.tint = 0xff0000;
				this.cheese2Health--;
				this.time.delayedCall(50, ()=>{
					this.cheese2.tint = 0xffffff;
					this.enemyOw2 = this.sound.add('enemy_ow2');
					this.enemyOw2.play();
				});
			});	
			this.physics.add.overlap(this.macaronis, this.cheese2, ()=>{
				this.macaronis.getChildren().map(child => child.destroy());
				this.cheese2.tint = 0xff0000;
				this.cheese2Health--;
				this.time.delayedCall(50, ()=>{
					this.cheese2.tint = 0xffffff;
					this.enemyOw2 = this.sound.add('enemy_ow2');
					this.enemyOw2.play();
				});
			});		 
// cheese 3
			this.physics.add.overlap(this.rollingPinWeapon, this.cheese3, ()=>{
				this.cheese3.tint = 0xff0000;
				this.cheese3Health--;
				this.time.delayedCall(50, ()=>{
					this.cheese3.tint = 0xffffff;
					this.enemyOw2 = this.sound.add('enemy_ow2');
					this.enemyOw2.play();
				});
			});
			this.physics.add.overlap(this.macaronis, this.cheese3, ()=>{
				this.macaronis.getChildren().map(child => child.destroy());
				this.cheese3.tint = 0xff0000;
				this.cheese3Health--;
				this.time.delayedCall(50, ()=>{
					this.cheese3.tint = 0xffffff;
					this.enemyOw2 = this.sound.add('enemy_ow2');
					this.enemyOw2.play();
				});
			});	
// cheese 4
			this.physics.add.overlap(this.rollingPinWeapon, this.cheese4, ()=>{
				this.cheese4.tint = 0xff0000;
				this.cheese4Health--;
				this.time.delayedCall(50, ()=>{
					this.cheese4.tint = 0xffffff;
					this.enemyOw2 = this.sound.add('enemy_ow2');
					this.enemyOw2.play();
				});
			});
			this.physics.add.overlap(this.macaronis, this.cheese4, ()=>{
				this.macaronis.getChildren().map(child => child.destroy());
				this.cheese4.tint = 0xff0000;
				this.cheese4Health--;
				this.time.delayedCall(50, ()=>{
					this.cheese4.tint = 0xffffff;
					this.enemyOw2 = this.sound.add('enemy_ow2');
					this.enemyOw2.play();
				});
			});
//hotdog boss
			this.physics.add.overlap(this.rollingPinWeapon, this.hotdog, ()=>{
				this.hotdogHealth--;
				this.hotdog.tint = 0xff0000;
				this.time.delayedCall(50, ()=>{
					this.hotdog.tint = 0xffffff;
					this.enemyOw3 = this.sound.add('enemy_hit_dow');
					this.enemyOw3.play();
				});
			});
			this.physics.add.overlap(this.macaronis, this.hotdog, ()=>{
				this.macaronis.getChildren().map(child => child.destroy());
				this.hotdogHealth--;
				this.hotdog.tint = 0xff0000;
				this.time.delayedCall(50, ()=>{
					this.hotdog.tint = 0xffffff;
					this.enemyOw3 = this.sound.add('enemy_hit_dow');
					this.enemyOw3.play();
				});
			});

////////////////////////////////////////////////////////////////////////////////////
////general collisions 
this.physics.add.collider(player, groundLayer);
this.physics.add.collider(player, this.obstacleStatic);
this.physics.add.collider(this.obstacleMoving, player, ()=>{
	player.body.setVelocityX(-250);
});
this.physics.add.collider(this.obstacleMoving, groundLayer);
this.physics.add.collider(this.enemyStatic, this.obstacleMoving);
this.physics.add.collider(this.enemies, groundLayer);
this.physics.add.collider(this.enemyStatic, this.enemyStatic);
this.physics.add.collider(this.enemyMoving, this.enemyMoving);
this.physics.add.collider(this.enemyMoving, this.enemyStatic);
this.physics.add.collider(exit, groundLayer);
this.physics.add.collider(this.macaronis, groundLayer);
this.physics.add.collider(pickups, groundLayer);
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


		//macaroni collision with zones
		this.physics.add.overlap(this.macaronis, this.zoneFront, ()=>{
			this.macaronis.getChildren().map(child => child.destroy());
		});
		this.physics.add.overlap(this.macaronis, this.zoneBack, ()=>{
			this.macaronis.getChildren().map(child => child.destroy());
		});





//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
			////////// health, ammo, and lives text and shit like that ///////////////////////////////////////////////////////
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
		targets: this.health1TextMiddle, alpha: {value: 0.2, duration: 1000, ease: 'Power1'}, repeat: -1, yoyo: true
		});
		this.health1TextTop = this.text = this.add.text(20, 20,  '\u2764', { 	
			fontSize: '30px',fill: '#ffffff'
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
			targets: this.text3, scale: 1.2, ease: 'Linear', duration: 1000, repeat: -1, yoyo: true
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
		targets: this.itemMiddle, alpha: {value:0.2, duration: 1000,	ease: 'Power1'}, duration: 1000, repeat: -1, yoyo: true
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
	


/////////cameras
		this.cameras.main.setBounds(0, 0, map2.widthInPixels, map2.heightInPixels);
		this.cameras.main.startFollow(player);  

//virtual buttons
		this.input.addPointer(1);
		this.leftButtonState = false;
		this.jumpButtonState = false;
		this.rightButtonState = false;
		this.A_buttonState = false;
		this.B_buttonState = false;
		this.C_buttonState = false;
		this.playerFreeze = false;
		//left button	
		this.leftButton = this.add.image(100, 500, 'left_button').setOrigin(0).setName('left_button').setInteractive().setScrollFactor(0);
		this.leftButton.on('pointerover', ()=>{	
		}, this);
		this.leftButton.on('pointerout', ()=>{
		this.leftButton.tint = 0xffffff;	
		this.leftButtonState = false;
		}, this);
		this.leftButton.on('pointerdown', ()=>{	
		this.leftButton.tint = 0xff0000;
		this.leftButtonState = true;
		}, this);
		this.leftButton.on('pointerup', ()=>{
		this.leftButton.tint = 0xffffff;
		this.leftButtonState = false;
		}, this);
		// jump button
		this.jumpButton = this.add.image(540, 500, 'jump_button').setOrigin(0).setName('jump_button').setInteractive().setScrollFactor(0);
		this.jumpButton.on('pointerover', ()=>{
		}, this);
		this.jumpButton.on('pointerout', ()=>{
		this.jumpButton.tint = 0xffffff;	
		this.jumpButtonState = false;
		}, this);
		this.jumpButton.on('pointerdown', ()=>{
		this.jumpButton.tint = 0xff0000;
		this.jumpButtonState = true;
		}, this);
		this.jumpButton.on('pointerup', ()=>{
		this.jumpButton.tint = 0xffffff;
		this.jumpButtonState = false;
		}, this);
		// right button
		this.rightButton = this.add.image(200, 500, 'right_button').setOrigin(0).setName('right_button').setInteractive().setScrollFactor(0);
		this.rightButton.on('pointerover', ()=>{
		}, this);
		this.rightButton.on('pointerout', ()=>{
		this.rightButton.tint = 0xffffff;	
		this.rightButtonState = false;
		}, this);
		this.rightButton.on('pointerdown', ()=>{
		this.rightButton.tint = 0xff0000;
		this.rightButtonState = true;
		}, this);
		this.rightButton.on('pointerup', ()=>{
		this.rightButton.tint = 0xffffff;
		this.rightButtonState = false;
		}, this);    
// A button (rolling pin weapon)
if (miniGame1Won === false)
{
		this.A_button = this.add.image(630, 500, 'A_button').setOrigin(0).setName('A_button').setInteractive().setScrollFactor(0);
		this.A_button.on('pointerover', ()=>{
		});
		this.A_button.on('pointerout', ()=>{
			this.A_button.tint = 0xffffff;
			this.A_buttonState = false;
			if (this.A_buttonState === false){
				this.rollingPinWeapon.getChildren().map(child => child.destroy());					
			}
		});
		this.A_button.on('pointerdown', ()=>{
			this.A_button.tint = 0xff0000;
			this.A_buttonState = true;
			player.anims.play('rolling_pin_loop', true);
			player.setVelocityX(0);
					this.huh = this.sound.add('huh');
					this.huh.play();	
					let weaponX = player.flipX === true ? player.x - 45 : player.x + 45;
					this.rollingPin = this.rollingPinWeapon.create(weaponX , player.y, 'rolling_pin_fr1');
					this.rollingPin.flipX = player.flipX === true;
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
					//breakable bricks
					this.physics.add.overlap(this.rollingPin, this.breakableBrick, ()=>{
						this.breakableBrick.destroy();
					});
					this.physics.add.overlap(this.rollingPin, this.breakableBrick2, ()=>{
						this.breakableBrick2.destroy();
					});
					this.physics.add.overlap(this.rollingPin, this.breakableBrick3, ()=>{
						this.breakableBrick3.destroy();
					});
		
		});
		this.A_button.on('pointerup', ()=>{
			this.A_button.tint = 0xffffff;
			this.A_buttonState = false;
			if (this.A_buttonState === false){
				this.rollingPinWeapon.getChildren().map(child => child.destroy());
			}
		});	
}
if (miniGame1Won === true)
{
	this.A_button = this.add.image(630, 500, 'A_button_upgrade1').setOrigin(0).setName('A_button').setInteractive().setScrollFactor(0);
		this.A_button.on('pointerover', ()=>{
		});
		this.A_button.on('pointerout', ()=>{
			this.A_button.tint = 0xffffff;
			this.A_buttonState = false;
			if (this.A_buttonState === false){
				this.rollingPinWeapon.getChildren().map(child => child.destroy());					
			}
		});
		this.A_button.on('pointerdown', ()=>{
			this.A_button.tint = 0xff0000;
	this.A_buttonState = true;
	player.anims.play('rolling_pin_loop', true);
	player.setVelocityX(0);
			this.huh = this.sound.add('huh');
			this.huh.play();	
			let weaponX = player.flipX === true ? player.x - 65 : player.x + 65;
			this.rollingPinUpgrade1 = this.rollingPinWeapon.create(weaponX , player.y - 10, 'rolling_pin_upgrade1_fr1').play('rolling_pin_upgrade1_loop');
			this.rollingPinUpgrade1.flipX = player.flipX === true;
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
			//breakable bricks
					this.physics.add.overlap(this.rollingPinUpgrade1, this.breakableBrick2, ()=>{
						this.breakableBrick2.destroy();
					});
					this.physics.add.overlap(this.rollingPinUpgrade1, this.breakableBrick3, ()=>{
						this.breakableBrick3.destroy();
					});
		});
		this.A_button.on('pointerup', ()=>{
			this.A_button.tint = 0xffffff;
			this.A_buttonState = false;
			if (this.A_buttonState === false){
				this.rollingPinWeapon.getChildren().map(child => child.destroy());
			}
		});
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	//// B button (macaroni weapon)
		this.B_button = 
		this.add.image(700, 450, 'B_button').setOrigin(0).setInteractive().setScrollFactor(0);
				this.B_button.on('pointerover', ()=>{
		});
		this.B_button.on('pointerout', ()=>{
		this.B_button.tint = 0xffffff;	
		this.B_buttonState = false;
		});
		this.B_button.on('pointerdown', ()=>{
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
		this.B_button.on('pointerup', ()=>{
		this.B_button.tint = 0xffffff;
		this.B_buttonState = false;
		});
		this.C_button = 
		this.add.image(610, 410, 'C_button').setOrigin(0).setInteractive().setScrollFactor(0);


		this.C_button = 
		this.add.image(610, 410, 'C_button').setOrigin(0).setInteractive().setScrollFactor(0);	
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

	////////////////////////////////////////////////////////////////////end virtual controls
	

	// W key weapon 1 rolling pin
	this.input.keyboard.on('keydown_W', ()=>{
		if (miniGame1Won === false)
	{
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
					//breakable bricks
					this.physics.add.overlap(this.rollingPin, this.breakableBrick, ()=>{
						this.breakableBrick.destroy();
					});
					this.physics.add.overlap(this.rollingPin, this.breakableBrick2, ()=>{
						this.breakableBrick2.destroy();
					});
					this.physics.add.overlap(this.rollingPin, this.breakableBrick3, ()=>{
						this.breakableBrick3.destroy();
					});
				  
					// weapon collision with player because apparently I have no idea how to really make it disappear =[
						this.physics.add.overlap(this.rollingPin, player, ()=>{
							this.time.delayedCall(150, ()=>{
								this.rollingPin.destroy();
							});
						});
			}
	if (miniGame1Won === true)
			{
				player.anims.play('rolling_pin_loop', true);
						this.huh = this.sound.add('huh');
						this.huh.play();	
						let weaponX = player.flipX === true ? player.x - 65 : player.x + 65;
						this.rollingPinUpgrade1 = this.rollingPinWeapon.create(weaponX , player.y - 10, 'rolling_pin_upgrade1_fr1').play('rolling_pin_upgrade1_loop');
						if (player.flipX === true)
						{
							this.rollingPinUpgrade1.flipX = true;
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
							//breakable bricks
								this.physics.add.overlap(this.rollingPinUpgrade1, this.breakableBrick2, ()=>{
									this.breakableBrick2.destroy();
								});
								this.physics.add.overlap(this.rollingPinUpgrade1, this.breakableBrick3, ()=>{
									this.breakableBrick3.destroy();
								});
					// weapon collision with player because apparently I have no idea how to really make it disappear =[
						this.physics.add.overlap(this.rollingPinUpgrade1, player, ()=>{
							this.time.delayedCall(150, ()=>{
								this.rollingPinUpgrade1.destroy();
							});
						});
			}
		});


///////
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
						
	});//end weapon (macaroni)

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
		if (this.cheese1.active)
			{
				this.cheese1Tween.stop();
			}
		if (this.cheese2.active)
			{
				this.cheese2Tween.stop();
			}
		if (this.cheese3.active)
			{
				this.cheese3Tween.stop();
			}
		if (this.cheese4.active)
			{
				this.cheese4Tween.stop();
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
			if (this.cheese1.active)
				{
					this.cheese1Tween.play();
				}
			if (this.cheese2.active)
				{
					this.cheese2Tween.play();
				}
			if (this.cheese3.active)
				{
					this.cheese3Tween.play();
				}
			if (this.cheese4.active)
				{
					this.cheese4Tween.play();
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
	});
/////////////////////	
this.timer = false;
this.usePowerup = false;


			////interfaces
		//coffee
		this.coffeeItemsInterface = this.add.sprite(540, 70, 'coffee_fr1').setScrollFactor(0).setScale(0.5).setInteractive();
		this.coffeeItemsInterface2 = this.add.sprite(540, 70, 'coffee_fr1').setScrollFactor(0).setScale(0.5).setInteractive();
		this.tweens.add({
				targets: this.coffeeItemsInterface2, alpha: {value: 0, ease: 'Power1', duration: 1000}, repeat: -1,	yoyo: true
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
			targets: this.shroomItemsInterface2, alpha: {value: 0, ease: 'Power1', duration: 1000},	repeat: -1, yoyo: true
		});
	////buttons
		//coffee
		this.coffeeItemsButton = this.add.sprite(645, 445, 'coffee_fr1').play('coffee_anims').setScrollFactor(0).setInteractive().setScale(0.8);		
		//beer
		this.beerItemsButton = this.add.sprite(650, 450, 'beer').setScrollFactor(0).setInteractive().setScale(0.8);	
		//shroom items buttons
		this.shroomItemsButton = this.add.sprite(650, 450, 'shrooms').setScrollFactor(0).setInteractive();				


		
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
				if (this.cheese1.active)
					{
						this.cheese1Tween.stop();
					}
				if (this.cheese2.active)
					{
						this.cheese2Tween.stop();
					}
				if (this.cheese3.active)
					{
						this.cheese3Tween.stop();
					}
				if (this.cheese4.active)
					{
						this.cheese4Tween.stop();
					}
				//shroom state reset
				this.time.delayedCall(10000, ()=>{
						this.cameras.main.clearRenderToTexture();
						this.tweens.add({
							targets: this.rect,
							alpha: {value: 0, duration: 2000, ease: 'Power1'}	
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
					if (this.cheese1.active)
						{
							this.cheese1Tween.play();
						}
					if (this.cheese2.active)
						{
							this.cheese2Tween.play();
						}
					if (this.cheese3.active)
						{
							this.cheese3Tween.play();
						}
					if (this.cheese4.active)
						{
							this.cheese4Tween.play();
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




}//end create function
//////////////////////////////////////////////////////////////////////////////////////////// update///////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 update(time, delta) {



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




	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	

	if (this.DKey.isDown || this.B_buttonState === true)
	{
		if (this.rightButtonState === false && this.leftButtonState === false && cursors.left.isUp && cursors.right.isUp)
		{
			player.setTexture('player_weapon_fr1', true);
		}	
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

//move left
if (this.playerFreeze === false && this.leftButtonState === true || cursors.left.isDown && this.WKey.isUp)
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
if (this.playerFreeze === false && this.rightButtonState === true || cursors.right.isDown && this.WKey.isUp)
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
//idle
if (player.body.onFloor() && cursors.up.isUp && cursors.right.isUp && cursors.left.isUp
&& this.rightButtonState === false && this.jumpButtonState === false && this.leftButtonState === false
&& this.WKey.isUp && this.A_buttonState === false){

player.setVelocityX(0);
		player.anims.play('idle', true);
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

	// if rolling pin upgrade 1
	if (this.rollingPinUpgrade1)
	{
		if (player.flipX === true)
			{
				this.rollingPinUpgrade1.x = player.x - 65;
				this.rollingPinUpgrade1.y = player.y - 7;
			}
			else{
				this.rollingPinUpgrade1.x = player.x + 65;
				this.rollingPinUpgrade1.y = player.y - 7;
			}
	}
	

	//player can use upgraded rollin pin
			if (miniGame1Won === true) 
			{
				this.A_button.setTexture('A_button_upgrade1');
			} 


///////////////////////////////////////////////////////////////////////////////////////////

//macaroni cut off zones
this.zoneFront.body.x = player.body.x + 600;
this.zoneFront.body.y = player.body.y - 300;
this.zoneBack.body.x = player.body.x - 600;
this.zoneBack.body.y = player.body.y - 300;

////////////////////////////////////////////////////////////////////



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
		   this.scene.stop('PlayState_lv3');
		   this.scene.start('LivesState_lv3');
		   livesAvailable--;
		   livesText.setText(livesAvailable);
		   game.renderer.removePipeline('Custom');
			game.renderer.removePipeline('Custom2');
			game.renderer.removePipeline('Custom3');
			game.renderer.removePipeline('Custom4');
			if (this.beerItemsInterface )
				{
						this.beerItemsInterface.destroy();
						this.beerSelected = false;
						this.coffeeSelected = false;
					}
			else if (this.coffeeItemsInterface)
			{
						this.coffeeItemsInterface.destroy();
						this.coffeeSelected = false;
						this.beerSelected = false;
			}
 }
	   if (livesAvailable <= 2){
	   livesText.setText(livesAvailable);
	   }

//// enemy health update on collision

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
	// cheese
		if (this.cheese1Health <= 0){
			this.cheese1.tint = 0x000000;
			this.time.delayedCall(150, ()=>{
				this.cheese1.destroy();	
				this.dough11.setVisible(true);
			});	
		}
	if (this.cheese2Health <= 0){
		this.cheese2.tint = 0x000000;
		this.time.delayedCall(150, ()=>{
			this.cheese2.destroy();
		})	
	}
	if (this.cheese3Health <= 0){
		this.cheese3.tint = 0x000000;
		this.time.delayedCall(150, ()=>{
			this.cheese3.destroy();
			this.dough12.setVisible(true);
		});	
	}  
	if (this.cheese4Health <= 0){
		this.cheese4.tint = 0x000000;
		this.time.delayedCall(150, ()=>{
			this.cheese4.destroy();
		});	
	} 

	// hotdog boss
	if (this.hotdogHealth === 15){
		this.hotdog.setImmovable(true);
	}

	if (this.hotdogHealth === 14){
		this.hotdog.setImmovable(false);
		this.hotdogActiveState = true;
			if (this.hotdogActiveState === true){ 
				this.hotdogTween.play();
		}
	}
	 if (this.hotdogHealth === 10){
		this.hotdogActiveState = false;
		this.hotdogActiveState2 = true;
			if (this.hotdogActiveState2 === true){ 
				this.hotdogTween.stop();
				this.time.delayedCall(1000, ()=>{
				this.hotdogTween2.play();
			});
		}
	}
	 if(this.hotdogHealth === 0){
		this.hotdogActiveState2 = false;
		this.hotdogTween2.stop();
		this.hotdog.tint = 0x000000;
		this.time.delayedCall(150, ()=>{
		this.hotdog.destroy();
			this.dough5.setVisible(true);
			this.dough6.setVisible(true);
			this.dough7.setVisible(true);
			this.dough8.setVisible(true);
			this.dough9.setVisible(true);
			this.dough10.setVisible(true);	  
	});	
}

		 ////////


	 if(this.dough1.visible === true && this.dough1.active === true)
		 {
			 this.dough1.body.setAllowGravity(true);
		 }
	if(this.dough2.visible === true && this.dough2.active === true)
		 {
			 this.dough2.body.setAllowGravity(true);
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
	 if(this.dough13.visible === true && this.dough13.active === true)
		 {
			 this.dough13.body.setAllowGravity(true);
		 }
	 
			
	if (this.dough11.visible === false && this.cheese1Health >= 1)
		{
			this.dough11.x = this.cheese1.x;
			this.dough11.y = this.cheese1.y;
		} 

	if (this.dough12.visible === false && this.cheese3Health >= 1)
		{
			this.dough12.x = this.cheese3.x;
			this.dough12.y = this.cheese3.y;
		} 

	if (this.dough13.visible === false && this.meatball2)
		{
			this.dough13.x = this.meatball2.x;
			this.dough13.y = this.meatball2.y;
		} 





 }//end update function

 //////////// end state //////////////////
}