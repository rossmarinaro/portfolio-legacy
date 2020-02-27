////Level 1


class PlayState_lv1 extends Phaser.Scene {
    constructor() {
      super("PlayState_lv1");
    }
    

  
  
  ////create
    
  create() {

        //reset item quantities
        beers = 0;
        coffees = 0;
        shrooms = 0;
        items = 0;

        healthScore = 420;
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

        this.playerSpeedBoost = false;
        this.playerInvincible = false;
        this.playerFreeze = false;
        // this.socket = io();
        // this.socket.emit('points', macaroniAvailable);
        //cursors and keys 'WASD'
        cursors = this.input.keyboard.createCursorKeys();
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);		
        this.WKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.AKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.SKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.DKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
//warp sound
        this.warp = this.sound.add('warp');
        this.warp.play();
          //background      
          this.cameras.main.setBackgroundColor('#E8ED35');
          this.add.image(500, -600, 'pixel').setScale(1410);
          //music
          this.mainTheme = this.sound.add('middle_pastern');
          this.mainTheme.play();
          this.mainTheme.setLoop(true);	
          // load the map 
          let map = this.add.tilemap('map5');
          // tiles for the ground layer, background images  
          
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
		this.add.image(8000, 650, 'clouds').setScale(3);
		this.add.image(9500, 650, 'clouds').setScale(3);
		this.add.image(10000, 650, 'clouds').setScale(3);
        this.add.image(11000, 650, 'clouds').setScale(3);
        //hidden supreme leader in the sky
        this.supremeLeaderFace = this.add.sprite(10900, 790, 'supreme_leader_cropped_fr1').setAlpha(0).setScale(0.7);
          let backdropTiles2 = map.addTilesetImage('tiles7');
          this.backdrop = map.createStaticLayer('bkgnd', backdropTiles2, 0, 0);
          this.rect = new Phaser.Geom.Rectangle(500, 960, 11600, 800);
		this.graphics = this.add.graphics({fillStyle: {color: 0x000000}});
        this.graphics.fillRectShape(this.rect);
        //pyramid
        let backdropTiles3 = map.addTilesetImage('pyramid');
        this.backdrop3 = map.createStaticLayer('bkgnd3', backdropTiles3, 0, 0);
        // trees
        let backdropTiles = map.addTilesetImage('tiles2');
        this.backdrop2 = map.createStaticLayer('bkgnd2', backdropTiles, 0, 0);
          //ground
          let groundTiles = map.addTilesetImage('tiles');
          let groundLayer = map.createStaticLayer('World', groundTiles, 0, 0);
          for (let i = 0; i < 130; i++)
          {
            let x = Phaser.Math.Between(200, 16000);
            this.add.sprite(x, 200, 'cloud2_fr1').play('cloud2_anims', true);
            this.add.sprite(x, 400, 'cloud2_fr1').play('cloud2_anims', true);
            this.add.sprite(x, 650, 'cloud2_fr1').play('cloud2_anims', true);
            this.add.sprite(x, 700, 'cloud2_fr1').play('cloud2_anims', true);
            this.add.sprite(x, 820, 'cloud2_fr1').play('cloud2_anims', true);
          }
          groundLayer.setCollisionByExclusion([-1]);
          let macaroniItemTiles = map.addTilesetImage('coin');   
          macaroniPickupLayer = map.createDynamicLayer('Coins', macaroniItemTiles, 0, 0);
          //world parameters
          this.physics.world.bounds.width = groundLayer.width;   
          this.physics.world.bounds.height = groundLayer.height; 
          //enemies and hazards
          this.enemyStatic = this.physics.add.staticGroup(); 
            this.enemyMoving = this.physics.add.group();
            this.enemyFire = this.physics.add.group();
            this.gpFireballs = this.physics.add.group();
            this.gp2Fireballs = this.physics.add.group();
            this.hazardMoving = this.physics.add.group();
            this.enemies = [
                this.enemyStatic, this.enemyMoving, this.hazardMoving,  this.gpFireballs, this.gp2Fireballs
            ];
          this.obstacle = this.physics.add.group();

         //door
         this.shopDoor = this.add.sprite(3550, 350, 'shop_door');


          // player sprite    
          player = this.physics.add.sprite(200, 920, 'player');
          player.setBounce(0.2); // our player will bounce from items
          player.setCollideWorldBounds(true); // don't go out of the map    
          player.body.setSize(player.width, player.height-8);
          this.drunkBubbles = this.add.sprite(0, 0, 'bubble_fr1').setScale(1.5).play('bubble_anims').setVisible(false);

            /////////cameras
            this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
            this.cameras.main.startFollow(player);  
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
//macaroni cut off zones
    this.zoneFront = this.add.zone(player.x, player.y).setSize(50, 1500);
    this.physics.world.enable(this.zoneFront);
    this.zoneFront.body.setAllowGravity(false).setImmovable(false);
    this.zoneBack = this.add.zone(player.x, player.y).setSize(50, 1500);
    this.physics.world.enable(this.zoneBack);
    this.zoneBack.body.setAllowGravity(false).setImmovable(false);

 //rolling pin
      this.rollingPinWeapon = this.physics.add.group();
  //macaroni
          this.macaronis = this.physics.add.group();
//pickups
    let pickups = this.physics.add.group();
 //player states
        this.playerInvincible = false;
        this.playerSpeedBoost = false;
    //power up
        this.coffee1 = pickups.create(800, 300, 'coffee_fr1').play('coffee_anims');
        this.beer1 =  pickups.create(2750, 500, 'beer');
    //health
        this.healthPickup = pickups.create(5630, 400, 'ikura');
		this.healthPickup2 = pickups.create(2350, 1550, 'salmon');
		this.healthPickup3 = pickups.create(1230, 400, 'ikura');
		this.healthPickup4 = pickups.create(4980, 800, 'ikura');
	    this.healthPickup5 = pickups.create(2400, 1550, 'salmon');
	//dough
        this.dough1 = pickups.create(1950, 940, 'dough').setVisible(false);
        this.dough1.body.setAllowGravity(false);
        this.dough2 = pickups.create(7860, 590, 'dough').setVisible(false);
        this.dough2.body.setAllowGravity(false);
        this.dough3 = pickups.create(9160, 590, 'dough').setVisible(false);
        this.dough3.body.setAllowGravity(false);
        this.dough4 = pickups.create(3000, 895, 'dough').setVisible(false);
        this.dough4.body.setAllowGravity(false);
        this.dough5 = pickups.create(6260, 1390, 'dough').setVisible(false);
        this.dough5.body.setAllowGravity(false);
 

////enemy objects
    //lava
    this.lava = this.enemyStatic.create(6300, 1090, 'sauce_lava4').play('sauce_lava_anims2', true);

    //cheese pits
    this.cheese_pit1 = this.enemyStatic.create(1470, 1020, 'cheese_pit1').play('cheese_pit_anims').setOffset(0, 40).setScale(0.65, 0.7);
    this.cheese_pit2 = this.enemyStatic.create(1610, 1020, 'cheese_pit1').play('cheese_pit_anims').setOffset(0, 40).setScale(0.65, 0.7);
    this.cheese_pit3 = this.enemyStatic.create(2570, 1055, 'cheese_pit1').play('cheese_pit_anims').setScale(1.1);	
    this.cheese_pit4 = this.enemyStatic.create(2795, 1055, 'cheese_pit1').play('cheese_pit_anims').setScale(1.1);
    this.cheese_pit5 = this.enemyStatic.create(3030, 1055, 'cheese_pit1').play('cheese_pit_anims').setScale(1.1);
  

//chilis and fireballs
this.chili = this.enemyStatic.create(1950, 940, 'chili_fr1').play('chili_loop');	 
this.chili2 = this.enemyStatic.create(3800, 940, 'chili_fr1').play('chili_loop');
this.chili3 = this.enemyStatic.create(7860, 590, 'chili_fr1').play('chili_loop');
this.chili4 = this.enemyStatic.create(9160, 590, 'chili_fr1').play('chili_loop');
this.chili3.flipX = true;
// chili fireballs
this.fireBall1 = this.enemyFire.create(1950, 940, 'fire_fr1').play('fireball_anims').setScale(0.4);
this.fireBall1.angle = 90;
this.fireBall1.body.setAllowGravity(false).setImmovable(true);
this.fireBall1Tween = this.tweens.add({
    targets: this.fireBall1, x: 1850, y: 940, ease: 'Linear', duration: 1000, repeat: -1, yoyo: false
});
this.fireBall2 = this.enemyFire.create(3800, 940, 'fire_fr1').play('fireball_anims').setScale(0.4);
this.fireBall2.angle = 90;
this.fireBall2.body.setAllowGravity(false);
this.fireBall2Tween = this.tweens.add({
    targets: this.fireBall2, x: 3700, y: 940, ease: 'Linear', duration: 1000, repeat: -1, yoyo: false
});
this.fireBall3 = this.enemyFire.create(7860, 590, 'fire_fr1').play('fireball_anims').setScale(0.4);
this.fireBall3.angle = 90;
this.fireBall3.flipY = true;
this.fireBall3.body.setAllowGravity(false);
this.fireBall3Tween = this.tweens.add({
    targets: this.fireBall3, x: 7960, y: 590, ease: 'Linear', duration: 1000, repeat: -1, yoyo: false
});
this.fireBall4 = this.enemyFire.create(9160, 590, 'fire_fr1').play('fireball_anims').setScale(0.4);
this.fireBall4.angle = 90;
this.fireBall4.body.setAllowGravity(false);
this.fireBall4Tween = this.tweens.add({
    targets: this.fireBall4, x: 9060, y: 590, ease: 'Linear', duration: 1000, repeat: -1, yoyo: false
});
    
// chili health points
this.chiliHealth = 3;
this.chili2Health = 3;
this.chili3Health = 3;
this.chili4Health = 3;



////ghost pepper1
    this.ghostPepperBody = this.enemyMoving.create(6500, 650, 'ghost_pepper_body').setSize(150, 180).setScale(0.5).setImmovable(true);
    this.ghostPepperBody.body.setAllowGravity(false);
    this.ghostPepperArms = this.add.sprite(6500, 650, 'ghost_pepper_arms_fr1').play('ghost_pepper_arms_anims').setSize(150, 150).setScale(0.5);
    this.ghostPepperStem = this.add.sprite(6500, 650, 'ghost_pepper_stem_fr').play('ghost_pepper_stem_anims').setSize(150, 150).setScale(0.5);
    this.ghostPepper1 = {
      body: this.ghostPepperBody, arms: this.ghostPepperArms, stem: this.ghostPepperStem
    }
    //fireballs
        this.ghostPepperFireBall1 = this.gpFireballs.create(this.ghostPepper1.body.x, this.ghostPepper1.body.y, 'fire_fr1').setScale(0.4).play('fireball_anims').setVisible(false);
        this.ghostPepperFireBall2 = this.gpFireballs.create(this.ghostPepper1.body.x, this.ghostPepper1.body.y, 'fire_fr1').setScale(0.4).play('fireball_anims').setVisible(false);
        this.ghostPepperFireBall3 = this.gpFireballs.create(this.ghostPepper1.body.x , this.ghostPepper1.body.y, 'fire_fr1').setScale(0.4).play('fireball_anims').setVisible(false);
        this.ghostPepperFireBall1.body.setAllowGravity(false);
        this.ghostPepperFireBall2.body.setAllowGravity(false);
        this.ghostPepperFireBall3.body.setAllowGravity(false);
      this.ghostPepper1Tween = this.tweens.add({
        targets: [this.ghostPepper1.body, this.ghostPepper1.arms, this.ghostPepper1.stem], x: 6000, ease: 'Linear', duration: 6000, yoyo: true, repeat: -1
    });
    this.physics.add.collider(this.gpFireballs, groundLayer, ()=>{
        this.fireFx = this.sound.add('fire_fx', {volume: 3});
        this.fireFx.play();
        this.gpFireballs.getChildren().map(child => child.destroy());
        this.ghostPepperFireBall1.setVisible(false);
        this.ghostPepperFireBall2.setVisible(false);
        this.ghostPepperFireBall3.setVisible(false);
    });
//ghost pepper health points
    this.ghostPepper1Health = 5;

////ghost pepper2
    this.ghostPepper2Body = this.enemyMoving.create(8500, 350, 'ghost_pepper_body').setSize(150, 180).setScale(0.5).setImmovable(true);
    this.ghostPepper2Body.body.setAllowGravity(false);
    this.ghostPepper2Arms = this.add.sprite(8500, 350, 'ghost_pepper_arms_fr1').play('ghost_pepper_arms_anims').setSize(150, 150).setScale(0.5);
    this.ghostPepper2Stem = this.add.sprite(8500, 350, 'ghost_pepper_stem_fr').play('ghost_pepper_stem_anims').setSize(150, 150).setScale(0.5);
    this.ghostPepper2 = {
    body: this.ghostPepper2Body, arms: this.ghostPepper2Arms, stem: this.ghostPepper2Stem
    }
    //fireballs
        this.ghostPepper2FireBall1 = this.gp2Fireballs.create(this.ghostPepper2.body.x, this.ghostPepper2.body.y, 'fire_fr1').setScale(0.4).play('fireball_anims').setVisible(false);
        this.ghostPepper2FireBall2 = this.gp2Fireballs.create(this.ghostPepper2.body.x, this.ghostPepper2.body.y, 'fire_fr1').setScale(0.4).play('fireball_anims').setVisible(false);
        this.ghostPepper2FireBall3 = this.gp2Fireballs.create(this.ghostPepper2.body.x , this.ghostPepper2.body.y, 'fire_fr1').setScale(0.4).play('fireball_anims').setVisible(false);
        this.ghostPepper2FireBall1.body.setAllowGravity(false);
        this.ghostPepper2FireBall2.body.setAllowGravity(false);
        this.ghostPepper2FireBall3.body.setAllowGravity(false);
    this.ghostPepper2Tween = this.tweens.add({
        targets: [this.ghostPepper2.body, this.ghostPepper2.arms, this.ghostPepper2.stem], x: 8000, ease: 'Linear', duration: 7500, yoyo: true, repeat: -1
    });
    this.physics.add.collider(this.gp2Fireballs, groundLayer, ()=>{
        this.fireFx = this.sound.add('fire_fx', {volume: 3});
        this.fireFx.play();
        this.gp2Fireballs.getChildren().map(child => child.destroy());
        this.ghostPepper2FireBall1.setVisible(false);
        this.ghostPepper2FireBall2.setVisible(false);
        this.ghostPepper2FireBall3.setVisible(false);
    });
    //ghost pepper 2 health points
    this.ghostPepper2Health = 5;

 //walking spaghetti monster mummy1
    this.wsmleg =  this.add.sprite(5000, 940, 'wsm_mummy_legs_fr1').play('wsm_mummy_leg_anims', true).setScale(0.5).setSize(0, 0);
    this.wsmarm1 = this.add.sprite(5000, 940, 'wsm_mummy_arm1_fr1').play('wsm_mummy_arm1_anims', true).setScale(0.5).setSize(0, 0);
    this.wsmbody = this.enemyMoving.create(5000, 840, 'wsm_mummy_body').setScale(0.55).setSize(300, 300).setOffset(0, 0);
    this.wsmbody.body.setAllowGravity(false).setImmovable(true);    
    this.wsmarm2 = this.add.sprite(5000, 940, 'wsm_mummy_arm2_fr1').play('wsm_mummy_arm2_anims', true).setScale(0.5).setSize(0, 0);  
      this.wsmMummy1 = {
        legs: this.wsmleg, arm1: this.wsmarm1, body: this.wsmbody, arm2: this.wsmarm2
      }
      //mummy 1 tween
      this.wsmMummy1Tween = this.tweens.add({
        targets: [this.wsmMummy1.legs, this.wsmMummy1.arm1, this.wsmMummy1.body, this.wsmMummy1.arm2], x:4500, ease: 'Linear', duration: 3000, yoyo: true, repeat: -1,
        onRepeat: ()=>{
            this.wsmMummy1.body.flipX = false;
            this.wsmMummy1.arm1.flipX = false;
            this.wsmMummy1.arm2.flipX = false;
            this.wsmMummy1.legs.flipX = false;
            this.time.delayedCall(3000, ()=>{
                this.wsmMummy1.body.flipX = true;
                 this.wsmMummy1.arm1.flipX = true;
                 this.wsmMummy1.arm2.flipX = true;
                 this.wsmMummy1.legs.flipX = true;
         });
        }, onRepeatScope: this, onRepeatParams: [], repeatDelay: 0,
        onYoyo: ()=>{
            this.wsmMummy1.body.flipX = true;
            this.wsmMummy1.arm1.flipX = true;
            this.wsmMummy1.arm2.flipX = true;
            this.wsmMummy1.legs.flipX = true;
        }
    });
//mummy 1 health
this.wsmMummy1Health = 5;

 //walking spaghetti monster mummy2
    this.wsm2leg =  this.add.sprite(10000, 940, 'wsm_mummy_legs_fr1').play('wsm_mummy_leg_anims', true).setScale(0.5).setSize(0, 0);
    this.wsm2arm1 = this.add.sprite(10000, 940, 'wsm_mummy_arm1_fr1').play('wsm_mummy_arm1_anims', true).setScale(0.5).setSize(0, 0);
    this.wsm2body = this.enemyMoving.create(10000, 840, 'wsm_mummy_body').setScale(0.55).setSize(300, 300).setOffset(0, 0);
    this.wsm2body.body.setAllowGravity(false).setImmovable(true);    
    this.wsm2arm2 = this.add.sprite(10000, 940, 'wsm_mummy_arm2_fr1').play('wsm_mummy_arm2_anims', true).setScale(0.5).setSize(0, 0); 
    this.wsmMummy2 = {
        legs: this.wsm2leg, arm1: this.wsm2arm1, body: this.wsm2body, arm2: this.wsm2arm2
    }
   //mummy 2 tween
   this.wsmMummy2Tween = this.tweens.add({
     targets: [this.wsmMummy2.legs, this.wsmMummy2.arm1, this.wsmMummy2.body, this.wsmMummy2.arm2], x: 9500, ease: 'Linear', duration: 3000, yoyo: true, repeat: -1,
     onRepeat: ()=>{
         this.wsmMummy2.body.flipX = false;
         this.wsmMummy2.arm1.flipX = false;
         this.wsmMummy2.arm2.flipX = false;
         this.wsmMummy2.legs.flipX = false;
         this.time.delayedCall(3000, ()=>{
             this.wsmMummy2.body.flipX = true;
              this.wsmMummy2.arm1.flipX = true;
              this.wsmMummy2.arm2.flipX = true;
              this.wsmMummy2.legs.flipX = true;
      });
     }, onRepeatScope: this, onRepeatParams: [], repeatDelay: 0,
     onYoyo: ()=>{
         this.wsmMummy2.body.flipX = true;
         this.wsmMummy2.arm1.flipX = true;
         this.wsmMummy2.arm2.flipX = true;
         this.wsmMummy2.legs.flipX = true;
     }
 });
    this.wsmMummy2Health = 5;


 ////supreme leader
    this.slGun = this.enemyStatic.create(11200, 870, 'supreme_leader_gun_fr1').setScale(0.6).setSize(200, 300).setOffset(100, 140);
    this.slBody = this.enemyStatic.create(11200, 870, 'supreme_leader_body_fr1').setScale(0.6).setSize(200, 300).setOffset(100, 140);
    this.slEyes = this.enemyStatic.create(11200, 870, 'supreme_leader_eyes_fr1').setScale(0.6).setSize(200, 300).setOffset(100, 140);
    this.slHands = this.enemyStatic.create(11200, 870, 'supreme_leader_hands_fr1').setScale(0.6).setSize(200, 300).setOffset(100, 140);
    this.supremeLeader = {
        gun: this.slGun, body: this.slBody, eyes: this.slEyes, hands: this.slHands
    }
    this.zoneTrigger = this.add.zone(11100, 870).setSize(350, 100);
    this.physics.world.enable(this.zoneTrigger);
    this.zoneTrigger.body.setAllowGravity(false).setImmovable(true);
    this.physics.add.collider(player, this.zoneTrigger, ()=>{
        this.zoneTrigger.destroy();
        //camera fixed
       this.cameras.main.setBounds(10480, 50, 1000, 1200);
        this.bounds = this.add.zone(10460, 300).setSize(50, 10000);
        this.physics.world.enable(this.bounds);
        this.bounds.body.setAllowGravity(false).setImmovable(true);
        this.physics.add.collider(player, this.bounds);
        this.physics.add.overlap(player, this.bounds, ()=>{
            player.setVelocityX(250);
        });
        this.time.delayedCall(3000, ()=>{
    //speech bubble
            this.speechBub = this.add.sprite(11000, 750, 'speech_bub').play('speech_bub_anims');
            this.slTxt = this.add.text(10900, 730, `GOING SOMEWHERE?` ,	{font: "25px Bangers", fill: '#000', align: "center"}).setAlpha(0);
            this.tweens.add({
            targets: this.slTxt, alpha: {value: 1, ease: 'Power1', duration: 1200}, repeat: 0
        });		
    //fade out music
        this.tweens.add({
            targets: this.mainTheme, volume: {value: 0, ease: 'Power1', duration: 1200}, repeat: 0
        });	
        this.time.delayedCall(2000, ()=>{
    //fade in music
         this.bossTheme = this.sound.add('midyeast3', {volume: 0});
         this.bossTheme.play();
        this.tweens.add({
            targets: this.bossTheme, volume: {value: 1.5, ease: 'Power1', duration: 3000}, repeat: 0
        });	
            this.tweens.add({
                targets: this.slTxt,alpha: {value: 0, ease: 'Power1', duration: 500}, repeat: 0
            });	
            this.slTxt2 = this.add.text(10900, 730, `Time to spice things up!` , {font: "25px Bangers", fill: '#000', align: "center"}).setAlpha(0);
            this.tweens.add({
                targets: this.slTxt2,alpha: {value: 1, ease: 'Power1', duration: 500}, repeat: 0
            });	
        });
//supreme leader laugh
    this.supremeLeaderLaugh = this.sound.add('supreme_leader_laugh').setDetune(-220, -600).setVolume(2);
    this.supremeLeaderLaugh.play();
 //fade out supreme leader
        this.time.delayedCall(5000, ()=>{
            this.tweens.add({
                targets: [this.supremeLeader.body, this.supremeLeader.gun, this.supremeLeader.eyes, this.supremeLeader.hands, this.speechBub, this.slTxt2],
              alpha: {value: 0, ease: 'Power1', duration: 1200}, repeat: 0
            });	
//// scorpion pepper boss
        this.time.delayedCall(2000, ()=>{
            this.supremeLeader.body.destroy();
            this.supremeLeader.gun.destroy();
            this.supremeLeader.eyes.destroy();
            this.supremeLeader.hands.destroy();
             this.spClaw2 = this.enemyMoving.create(11400, 850, 'scorpion_pepper_claw2_fr1');
                this.spBody = this.enemyMoving.create(11400, 850, 'scorpion_pepper_body_fr1').play('scorpion_pepper_anims', true);
                this.spClaw1 = this.enemyMoving.create(11400, 850, 'scorpion_pepper_claw1_fr1');   
                this.spClaw1.body.setAllowGravity(false).setImmovable(true);
                this.spBody.body.setAllowGravity(false).setImmovable(true);
                this.spClaw2.body.setAllowGravity(false).setImmovable(true);
                this.scorpionPepper = {
                    body: this.spBody,  claws: [this.spClaw1, this.spClaw2]
                } 
                this.scorpionPepperHealth = 10;
                this.scorpTween1State = true;
              this.scorpTween1 = this.tweens.add({
                    targets: this.scorpionPepper.body, x: 11100, y: 850, ease: 'Linear', duration: 1500, repeat: 0
                });
        //weapon collision with scorpion pepper
//player wins level
                this.physics.add.overlap(this.rollingPinWeapon, this.scorpionPepper.body, ()=>{
                    this.spBody.setTint(0x470A09);
                    this.time.delayedCall(150, ()=>{
                        this.spBody.clearTint();
                        this.scorpionPepperHealth--;
                        this.enemyHit = this.sound.add('chili_hit');
                        this.chiliHit.play();
                        if (this.scorpionPepperHealth <= 0)
                        {
                            this.tweens.add({
                                targets: this.supremeLeaderFace, alpha: {value: 1, ease: 'Power1', duration: 1200}, onComplete: ()=>{
                                    this.supremeLeaderFace.play('supreme_leader_cropped_anims', true);
                                    this.supremeLeaderLaugh.play();
                                    this.cameras.main.setRenderToTexture(this.customPipeline3);
                                    this.time.delayedCall(5000, ()=>{
                                        this.cameras.main.fade(300, 0, 0, 0, false, function(camera, progress){
                                            if(progress > .9){
                                                this.scene.stop('PlayState_lv1');
                                                 this.scene.start('PreloadState_lv2');
                                                this.sound.stopAll();
                                                game.renderer.removePipeline('Custom');
                                                game.renderer.removePipeline('Custom2');
                                                game.renderer.removePipeline('Custom3');
                                                game.renderer.removePipeline('Custom4');
                                            }
                                        });	
                                    });
                                }, onCompleteScope: this
                            });
                        }
                    });
                });
                this.physics.add.overlap(this.macaronis, this.scorpionPepper.body, ()=>{
                    this.macaronis.getChildren().map(child => child.destroy());
                    this.scorpionPepper.body.setTint(0x470A09);
                    this.time.delayedCall(150, ()=>{
                        this.scorpionPepper.body.clearTint();
                        this.scorpionPepperHealth--;
                        this.enemyHit = this.sound.add('chili_hit');
                        this.chiliHit.play();
                        if (this.scorpionPepperHealth <= 0)
                        {
                            this.tweens.add({
                                targets: this.supremeLeaderFace,  alpha: {value: 1, ease: 'Power1', duration: 1200}, onComplete: ()=>{
                                    this.supremeLeaderFace.play('supreme_leader_cropped_anims', true);
                                    this.supremeLeaderLaugh.play();
                                    this.cameras.main.setRenderToTexture(this.customPipeline3);
                                    this.time.delayedCall(5000, ()=>{
                                        this.cameras.main.fade(300, 0, 0, 0, false, function(camera, progress){
                                            if(progress > .9){
                                                this.scene.stop('PlayState_lv1');
                                                 this.scene.start('PreloadState_lv2');
                                                this.sound.stopAll();
                                                game.renderer.removePipeline('Custom');
                                                game.renderer.removePipeline('Custom2');
                                                game.renderer.removePipeline('Custom3');
                                                game.renderer.removePipeline('Custom4');
                                            }
                                        });	
                                    });
                                }, onCompleteScope: this
                            });
                        }
                    });
                });
         //time until fires fireball
                this.time.delayedCall(2000, ()=>{
                    this.scorpTween1.stop();
                    this.scorpTween1State = false;
                //fireball
                   this.scorpTween2 = this.tweens.add({
                        targets: this.spClaw2, duration: 2000, ease: 'Linear', repeat: -1, y: 820, onRepeat: ()=>{
                                  this.fireFx = this.sound.add('fire_fx', {volume: 3});
                                  this.fireFx.play();
                        }, onRepeatScope: this
                    });
                    this.fireball = this.enemyFire.create(this.spClaw2.x - 150, this.spClaw1.y + 50 ,'fire_fr1').play('fireball_anims').setScale(0.7);
                    this.fireball.body.setAllowGravity(false);
                    this.fireball.angle = 90;
                    this.physics.add.collider(player, this.fireBall, ()=>{
                        this.fireBall.destroy();
                    });
                   this.scorpFireballTween = this.tweens.add({
                        targets: this.fireball, x: 10000, y: 900, ease: 'Power1', duration: 3200, repeat: -1, yoyo: false
                    });
                });
            }); 
        });	
     });
 });
 
/////////////////////////////////////////////////////////////////////////

/////weapon collisions with enemies

    // chili 1
            this.physics.add.overlap(this.rollingPinWeapon, this.chili, ()=>{
                this.chili.setTint(0xff0000);
                this.chiliHealth--;
                this.chiliHit = this.sound.add('chili_hit');
                this.time.delayedCall(50, ()=>{
                    this.chili.clearTint();
                        this.chiliHit.play();
                    });	
                });
                this.physics.add.overlap(this.macaronis, this.chili, ()=>{
                    this.macaronis.getChildren().map(child => child.destroy());
                    this.chili.setTint(0xff0000);
                    this.chiliHealth--;
                    this.chiliHit = this.sound.add('chili_hit');
                    this.time.delayedCall(50, ()=>{
                        this.chili.clearTint();
                        this.chiliHit.play();
                        });		
                    });
    // chili 2
                this.physics.add.overlap(this.rollingPinWeapon, this.chili2, ()=>{
                this.chili2.setTint(0xff0000);
                this.chili2Health--;
                this.macaronis.getChildren().map(child => child.destroy());
                this.chiliHit = this.sound.add('chili_hit');
                this.time.delayedCall(50, ()=>{
                    this.chili2.clearTint();
                        this.chiliHit.play();
                    });				
                });
                this.physics.add.overlap(this.macaronis, this.chili2, ()=>{
                    this.macaronis.getChildren().map(child => child.destroy());
                    this.chili2.setTint(0xff0000);
                    this.chili2Health--;
                    this.chiliHit = this.sound.add('chili_hit');
                    this.time.delayedCall(50, ()=>{
                        this.chili2.clearTint();
                        this.chiliHit.play();
                        });		
                    });
    // chili 3
                this.physics.add.overlap(this.rollingPinWeapon, this.chili3, ()=>{
                this.chili3.setTint(0xff0000);
                this.chili3Health--;
                this.chiliHit = this.sound.add('chili_hit');
                this.time.delayedCall(50, ()=>{
                    this.chili3.clearTint();
                    this.chiliHit.play();
                    });		
                });
                this.physics.add.overlap(this.macaronis, this.chili3, ()=>{
                    this.macaronis.getChildren().map(child => child.destroy());
                    this.chili3.setTint(0xff0000);
                    this.chili3Health--;
                    this.chiliHit = this.sound.add('chili_hit');
                    this.time.delayedCall(50, ()=>{
                        this.chili3.clearTint();
                        this.chiliHit.play();
                        });		
                    });
    // chili 4
                this.physics.add.overlap(this.rollingPinWeapon, this.chili4, ()=>{
                    this.chili4.setTint(0xff0000);
                    this.chili4Health--;
                    this.chiliHit = this.sound.add('chili_hit');
                    this.time.delayedCall(50, ()=>{
                        this.chili4.clearTint();
                        this.chiliHit.play();
                        });		
                    });
                    this.physics.add.overlap(this.macaronis, this.chili4, ()=>{
                        this.macaronis.getChildren().map(child => child.destroy());
                        this.chili4.setTint(0xff0000);
                        this.chili4Health--;
                        this.chiliHit = this.sound.add('chili_hit');
                        this.time.delayedCall(50, ()=>{
                            this.chili4.clearTint();
                            this.chiliHit.play();
                            });		
                        });
 //ghost pepper 1
       this.physics.add.overlap(this.rollingPinWeapon, this.ghostPepper1.body, ()=>{
        this.ghostPepper1.body.setTint(0xff0000);
        this.ghostPepper1.stem.setTint(0xff0000);
        this.ghostPepper1.arms.setTint(0xff0000);
        this.ghostPepper1Health--;
        this.enemyHit = this.sound.add('ghost_pepper_hit');
        this.time.delayedCall(50, ()=>{
            this.ghostPepper1.body.clearTint();
            this.ghostPepper1.stem.clearTint();
            this.ghostPepper1.arms.clearTint();
            this.enemyHit.play();
            });		
        });
        this.physics.add.overlap(this.macaronis, this.ghostPepper1.body, ()=>{
            this.macaronis.getChildren().map(child => child.destroy());
            this.ghostPepper1.body.setTint(0xff0000);
            this.ghostPepper1.stem.setTint(0xff0000);
            this.ghostPepper1.arms.setTint(0xff0000);
            this.ghostPepper1Health--;
            this.enemyHit = this.sound.add('ghost_pepper_hit');
            this.time.delayedCall(50, ()=>{
                this.ghostPepper1.body.clearTint();
                this.ghostPepper1.stem.clearTint();
                this.ghostPepper1.arms.clearTint();
                this.enemyHit.play();
                });		
            });
  //ghost pepper 2
            this.physics.add.overlap(this.rollingPinWeapon, this.ghostPepper2.body, ()=>{
                this.ghostPepper2.body.setTint(0xff0000);
                this.ghostPepper2.stem.setTint(0xff0000);
                this.ghostPepper2.arms.setTint(0xff0000);
                this.ghostPepper2Health--;
                this.enemyHit = this.sound.add('ghost_pepper_hit');
                this.time.delayedCall(50, ()=>{
                    this.ghostPepper2.body.clearTint();
                    this.ghostPepper2.stem.clearTint();
                    this.ghostPepper2.arms.clearTint();
                    this.enemyHit.play();
                    });		
                });
                this.physics.add.overlap(this.macaronis, this.ghostPepper2.body, ()=>{
                    this.macaronis.getChildren().map(child => child.destroy());
                    this.ghostPepper2.body.setTint(0xff0000);
                    this.ghostPepper2.stem.setTint(0xff0000);
                    this.ghostPepper2.arms.setTint(0xff0000);
                    this.ghostPepper2Health--;
                    this.enemyHit = this.sound.add('ghost_pepper_hit');
                    this.time.delayedCall(50, ()=>{
                        this.ghostPepper2.body.clearTint();
                        this.ghostPepper2.stem.clearTint();
                        this.ghostPepper2.arms.clearTint();
                        this.enemyHit.play();
                        });		
                    });
     //mummy1
                this.physics.add.overlap(this.rollingPinWeapon, this.wsmMummy1.body, ()=>{
                if (this.wsmMummy1Health >= 1)
                {
                        this.wsmMummy1.body.setTint(0xff0000);
                        this.wsmMummy1.arm1.setTint(0xff0000);
                        this.wsmMummy1.arm2.setTint(0xff0000);
                        this.wsmMummy1.legs.setTint(0xff0000);
                        this.wsmMummy1Health--;
                        this.enemyHit = this.sound.add('barf');
                        this.enemyHit.setDetune(220, 800).setVolume(2);
                        this.time.delayedCall(50, ()=>{
                                this.wsmMummy1.body.clearTint();
                                this.wsmMummy1.arm1.clearTint();
                                this.wsmMummy1.arm2.clearTint();
                                this.wsmMummy1.legs.clearTint();
                                this.enemyHit.play();
                        });
                    }				
                });
                this.physics.add.overlap(this.macaronis, this.wsmMummy1.body, ()=>{
                    if (this.wsmMummy1Health >= 1)
                    {
                        this.macaronis.getChildren().map(child => child.destroy());
                        this.wsmMummy1.body.setTint(0xff0000);
                        this.wsmMummy1.arm1.setTint(0xff0000);
                        this.wsmMummy1.arm2.setTint(0xff0000);
                        this.wsmMummy1.legs.setTint(0xff0000);
                        this.wsmMummy1Health--;
                        this.enemyHit = this.sound.add('barf');
                        this.enemyHit.setDetune(220, 800).setVolume(2);
                        this.time.delayedCall(50, ()=>{
                                this.wsmMummy1.body.clearTint();
                                this.wsmMummy1.arm1.clearTint();
                                this.wsmMummy1.arm2.clearTint();
                                this.wsmMummy1.legs.clearTint();
                                this.enemyHit.play();
                            });		
                        }		
                    });
            //mummy 2
                        this.physics.add.overlap(this.rollingPinWeapon, this.wsmMummy2.body, ()=>{
                        if (this.wsmMummy2Health >= 1)
                        {
                            this.wsmMummy2.body.setTint(0xff0000);
                            this.wsmMummy2.arm1.setTint(0xff0000);
                            this.wsmMummy2.arm2.setTint(0xff0000);
                            this.wsmMummy2.legs.setTint(0xff0000);
                            this.wsmMummy2Health--;
                            this.enemyHit = this.sound.add('barf');
                            this.enemyHit.setDetune(220, 800).setVolume(2);
                            this.time.delayedCall(50, ()=>{
                                    this.wsmMummy2.body.clearTint();
                                    this.wsmMummy2.arm1.clearTint();
                                    this.wsmMummy2.arm2.clearTint();
                                    this.wsmMummy2.legs.clearTint();
                                    this.enemyHit.play();
                            });
                            }				
                        });
                        this.physics.add.overlap(this.macaronis, this.wsmMummy2.body, ()=>{
                            if (this.wsmMummy2Health >= 1)
                            {
                                this.macaronis.getChildren().map(child => child.destroy());
                                this.wsmMummy2.body.setTint(0xff0000);
                                this.wsmMummy2.arm1.setTint(0xff0000);
                                this.wsmMummy2.arm2.setTint(0xff0000);
                                this.wsmMummy2.legs.setTint(0xff0000);
                                this.wsmMummy2Health--;
                                this.enemyHit = this.sound.add('barf');
                                this.enemyHit.setDetune(220, 800).setVolume(2);
                                this.time.delayedCall(50, ()=>{
                                        this.wsmMummy2.body.clearTint();
                                        this.wsmMummy2.arm1.clearTint();
                                        this.wsmMummy2.arm2.clearTint();
                                        this.wsmMummy2.legs.clearTint();
                                        this.enemyHit.play();
                                    });		
                                }		
                            });
                            
                

/////////////////////////////////////////////////
  //// general collisions
    this.physics.add.collider(player, groundLayer);
    this.physics.add.collider(this.enemies, groundLayer);
    this.physics.add.collider(this.macaronis, groundLayer);
    this.physics.add.collider(pickups, groundLayer);			
    this.physics.add.collider(this.macaronis, player, ()=>{
        this.macaroniRing = this.sound.add('macaroni_ring');
        this.macaroniRing.play();
        macaroniAvailable++;
        this.macaroniText2.setText(macaroniAvailable);
        this.macaronis.getChildren().map(child => child.destroy());
        });	
//    this.physics.add.collider(player, this.gpFireballs, ()=>{
//     this.gpFireballs.getChildren().map(child => child.destroy());
//     this.ghostPepperFireBall1.setVisible(false);
//     this.ghostPepperFireBall2.setVisible(false);
//     this.ghostPepperFireBall3.setVisible(false);
//    });
//   this.physics.add.collider(player, this.gp2Fireballs, ()=>{
//     this.gp2Fireballs.getChildren().map(child => child.destroy());
//     this.ghostPepper2FireBall1.setVisible(false);
//     this.ghostPepper2FireBall2.setVisible(false);
//     this.ghostPepper2FireBall3.setVisible(false);
//    });

  //macaroni collision with zones
        this.physics.add.overlap(this.macaronis, this.zoneFront, ()=>{
            this.macaronis.getChildren().map(child => child.destroy());
        });
        this.physics.add.overlap(this.macaronis, this.zoneBack, ()=>{
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
    //enemy fire collision
      this.physics.add.collider(player, this.enemyFire, ()=>{
            this.fireBall1Tween.stop();
            this.fireBall2Tween.stop();
            this.fireBall3Tween.stop();
            this.fireBall4Tween.stop();
            this.scorpFireballTween ? this.scorpFireballTween.stop() : null;
            this.fireBall1.destroy();
            this.fireBall2.destroy();
            this.fireBall3.destroy();
            this.fireBall4.destroy();
            this.fireball ?  this.fireball.destroy() : null;
            this.time.delayedCall(1000, ()=>{
            this.fireBall1 = this.enemyFire.create(1950, 940, 'fire_fr1').play('fireball_anims').setScale(0.4);
            this.fireBall1.angle = 90;
            this.fireBall1.body.setAllowGravity(false).setImmovable(true);
            this.fireBall1Tween = this.tweens.add({
                targets: this.fireBall1, x: 1850, y: 940, ease: 'Linear', duration: 1000, repeat: -1, yoyo: false
            });
            this.fireBall2 = this.enemyFire.create(3800, 940, 'fire_fr1').play('fireball_anims').setScale(0.4);
            this.fireBall2.angle = 90;
            this.fireBall2.body.setAllowGravity(false);
            this.fireBall2Tween = this.tweens.add({
                targets: this.fireBall2, x: 3700, y: 940, ease: 'Linear', duration: 1000, repeat: -1, yoyo: false
            });
            this.fireBall3 = this.enemyFire.create(7860, 590, 'fire_fr1').play('fireball_anims').setScale(0.4);
            this.fireBall3.angle = 90;
            this.fireBall3.flipY = true;
            this.fireBall3.body.setAllowGravity(false);
            this.fireBall3Tween = this.tweens.add({
                targets: this.fireBall3, x: 7960, y: 590, ease: 'Linear', duration: 1000, repeat: -1, yoyo: false
            });
            this.fireBall4 = this.enemyFire.create(9160, 590, 'fire_fr1').play('fireball_anims').setScale(0.4);
            this.fireBall4.angle = 90;
            this.fireBall4.body.setAllowGravity(false);
            this.fireBall4Tween = this.tweens.add({
                targets: this.fireBall4, x: 9060, y: 590, ease: 'Linear', duration: 1000, repeat: -1, yoyo: false
            });
            if (this.scorpionPepper)
            {
                this.fireball = this.enemyFire.create(this.spClaw2.x - 150, this.spClaw1.y + 50 ,'fire_fr1').play('fireball_anims').setScale(0.7);
                this.fireball.body.setAllowGravity(false);
                this.fireball.angle = 90;
                this.physics.add.collider(player, this.fireBall, ()=>{
                    this.fireBall.destroy();
                });
            this.scorpFireballTween = this.tweens.add({
                    targets: this.fireball, x: 10000, y: 900, ease: 'Power1', duration: 3200, repeat: -1, yoyo: false
                });
            }
        });
        if (this.playerInvincible === false && this.fireBall1.visible === false)
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
  ///////////////////////////////////////////////////////////////////////////////////////////////
     //power up collisions

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
        this.physics.add.collider(player, this.dough4, ()=>{
            this.dough4.destroy();
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
       
            
  /////////////////////////////////////////////////////////////   LEVEL COMPLETE!  ///////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////// health, ammo, and lives text  ///////////////////////////////////////////////////////
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
			targets: this.health1TextMiddle, alpha: {value: 0.2, duration: 1000, ease: 'Power1'}, repeat: -1,	yoyo: true
		});
		this.health1TextTop = this.text = this.add.text(20, 20,  '\u2764', { 	
			fontSize: '30px', fill: '#ffffff'
		}).setScrollFactor(0).setShadow(2, 2, '#000000', true, false);
		this.text2 = this.add.text(25, 60,  healthScore, {
            fontSize: '20px', fontFamily: 'Digitizer', fill: '#ffffff'
		}).setScrollFactor(0).setShadow(2, 2, '#000000', true, false);
		// macaroni available
		this.macaroniText = this.add.text(110, 15, 'Macaroni :', {
			fontSize: '25px', fontFamily: 'Bangers',	fill: '#ffffff'
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
			targets: this.text3, scale: 1.2,	ease: 'Linear', duration: 1000, repeat: -1, yoyo: true
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
	this.doughQuantity = this.add.text(740, 60, '0', {
		fontSize: '25px', fontFamily: 'Digitizer', fill: '#ffffff'
	}).setScrollFactor(0).setShadow(2, 2, '#000000', true, false);
          
  /////////// game controls  /////////////////
  
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
		this.leftButton = this.add.image(100, 500, 'left_button').setOrigin(0).setName('left_button').setInteractive().setScrollFactor(0);
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
		this.jumpButton = this.add.image(540, 500, 'jump_button').setOrigin(0).setName('jump_button').setInteractive().setScrollFactor(0);
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
		this.rightButton = this.add.image(200, 500, 'right_button').setOrigin(0).setName('right_button').setInteractive().setScrollFactor(0);
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
		this.A_button = 
		this.add.image(630, 500, 'A_button').setOrigin(0).setName('A_button').setInteractive().setScrollFactor(0);
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
		this.B_button =  this.add.image(700, 450, 'B_button').setOrigin(0).setInteractive().setScrollFactor(0);
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
		}, this);
		this.B_button.on('pointerup', ()=>{
		this.B_button.tint = 0xffffff;
		this.B_buttonState = false;
		});	
    //power ups
	this.C_button =   this.add.image(610, 410, 'C_button').setOrigin(0).setInteractive().setScrollFactor(0);	
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

    //control pad
    this.controlPad = {
        left: this.leftButton, right: this.rightButton, jump: this.jumpButton, A: this.A_button, B: this.B_button, C: this.C_button, toggle: this.toggleButton
    } 


///////////////////////////////////////////////////////////////////////////////////keyboard
//weapon keyboard (macaroni)	
this.input.keyboard.on('keydown_D', ()=>{				
            if (macaroniAvailable >=1)
            {
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
                    rotation: 360, duration: 20000,  targets: this.macaroni, repeat: -1
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
                targets: this.rect,
                alpha: {value: 0, duration: 2000, ease: 'Power1'}	
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
        targets: this.shroomItemsInterface2, alpha: {value: 0, ease: 'Power1', duration: 1000}, repeat: -1, yoyo: true
    });
    //spatula
    this.spatulaItemsInterface = this.add.sprite(655, 70, 'spatula').setScale(0.3).setScrollFactor(0).setInteractive();
    this.spatulaItemsInterface2 = this.add.sprite(655, 70, 'spatula').setScale(0.3).setScrollFactor(0).setInteractive();
    this.tweens.add({
        targets: this.spatulaItemsInterface2, alpha: {value: 0, ease: 'Power1', duration: 1000}, repeat: -1, yoyo: true
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
                                targets: this.rect,
                                alpha: {value: 0, duration: 2000, ease: 'Power1'}	
                            }, this);
                    });
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

 
//pipeline update	

this.customPipeline3.setFloat1('time', this.pipelineTime);
this.pipelineTime += 0.005;

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

// //if special item
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

//macaroni cut off zones
this.zoneFront.body.x = player.body.x + 600;
this.zoneFront.body.y = player.body.y - 300;
this.zoneBack.body.x = player.body.x - 600;
this.zoneBack.body.y = player.body.y - 300;
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
      this.scene.stop('PlayState_lv1');
      this.scene.start('LivesState_lv1');
      livesAvailable--;
      livesText.setText(livesAvailable);
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
  }
  if (livesAvailable <= 2){
  livesText.setText(livesAvailable);
  }		


/////////////////////////////////////////////////////////////////////////


//enemies


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
          this.dough1.visible === true && this.dough1.active ? this.dough1.body.setAllowGravity(true) : null;
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
	 });	
	}

//chili3
	if (this.chili3Health <= 0){
		this.chili3.tint = 0x000000;
		this.fireBall3Tween.stop();
		this.fireBall3.destroy();
		this.time.delayedCall(150, ()=>{
			this.chili3.destroy();
			if(this.dough2)
			{
              this.dough2.setVisible(true);
              this.dough2.visible === true && this.dough2.active ? this.dough2.body.setAllowGravity(true) : null;
			}
		});		
	}
//chili4
if (this.chili4Health <= 0){
    this.chili4.tint = 0x000000;
    this.fireBall3Tween.stop();
    this.fireBall4.destroy();
    this.time.delayedCall(150, ()=>{
        this.chili4.destroy();
        if(this.dough3)
        {
          this.dough3.setVisible(true);
          this.dough3.visible === true && this.dough3.active ? this.dough3.body.setAllowGravity(true) : null;
        }
    });		
}

//wsm Mummy1
if (this.wsmMummy1Health >= 1)
{
   this.wsmbody.flipX === true ?  this.wsmarm1.x = this.wsmbody.x + 60 : this.wsmarm1.x = this.wsmbody.x - 60;
   this.wsmbody.flipX === true ?  this.wsmarm2.x = this.wsmbody.x + 60 : this.wsmarm2.x = this.wsmbody.x - 60;
   this.wsmarm1.y = this.wsmbody.y + 10;
   this.wsmarm2.y = this.wsmbody.y + 10;
   if (this.dough4.active && this.dough5.active)
   {
       this.dough4.body.x = this.wsmbody.x;
       this.dough4.body.y = this.wsmbody.y;
       this.dough5.body.x = this.wsmbody.x + 40;
       this.dough5.body.y = this.wsmbody.y;
   }
}
if (this.wsmMummy1Health <= 0){
        this.physics.world.enable(this.wsmMummy1.body);
        this.physics.world.enable(this.wsmMummy1.arm1);
        this.physics.world.enable(this.wsmMummy1.legs);
        this.physics.world.enable(this.wsmMummy1.arm2);
        this.time.delayedCall(200, ()=>{
            this.wsmMummy1.body.setTint(0x000000);
            this.wsmMummy1.arm1.setTint(0x000000);
            this.wsmMummy1.legs.setTint(0x000000);
            this.wsmMummy1.arm2.setTint(0x000000);
            this.time.delayedCall(200, ()=>{
                this.wsmMummy1.body.destroy();
                this.wsmMummy1.arm1.destroy();
                this.wsmMummy1.legs.destroy();
                this.wsmMummy1.arm2.destroy();
            });
        if(this.dough4 && this.dough5)
        {
          this.dough4.setVisible(true);
          this.dough5.setVisible(true);
          this.dough4.visible === true && this.dough4.active ? this.dough4.body.setAllowGravity(true) : null;
          this.dough5.visible === true && this.dough5.active ? this.dough5.body.setAllowGravity(true) : null;
        }
    });		
}

//wsm Mummy 2
if (this.wsmMummy2Health >= 1)
{
   this.wsm2body.flipX === true ?  this.wsm2arm1.x = this.wsm2body.x + 60 : this.wsm2arm1.x = this.wsm2body.x - 60;
   this.wsm2body.flipX === true ?  this.wsm2arm2.x = this.wsm2body.x + 60 : this.wsm2arm2.x = this.wsm2body.x - 60;
   this.wsm2arm1.y = this.wsm2body.y + 10;
   this.wsm2arm2.y = this.wsm2body.y + 10;
}
if (this.wsmMummy2Health <= 0){
        this.physics.world.enable(this.wsmMummy2.body);
        this.physics.world.enable(this.wsmMummy2.arm1);
        this.physics.world.enable(this.wsmMummy2.legs);
        this.physics.world.enable(this.wsmMummy2.arm2);
        this.time.delayedCall(200, ()=>{
            this.wsmMummy2.body.setTint(0x000000);
            this.wsmMummy2.arm1.setTint(0x000000);
            this.wsmMummy2.legs.setTint(0x000000);
            this.wsmMummy2.arm2.setTint(0x000000);
            this.time.delayedCall(200, ()=>{
                this.wsmMummy2.body.destroy();
                this.wsmMummy2.arm1.destroy();
                this.wsmMummy2.legs.destroy();
                this.wsmMummy2.arm2.destroy();
            });
        if(this.dough3)
        {
        this.dough3.setVisible(true);
        }
    });		
}

//ghost pepper1

if (this.ghostPepper1Health >= 1)
{
    if (this.gpFireballs)
    {
        this.ghostPepperFireBall1.body.x = this.ghostPepper1.body.x - 50;
        this.ghostPepperFireBall1.body.y = this.ghostPepper1.body.y - 50;

        this.ghostPepperFireBall2.body.x = this.ghostPepper1.body.x;
        this.ghostPepperFireBall2.body.y = this.ghostPepper1.body.y - 50;
 
        this.ghostPepperFireBall3.body.x = this.ghostPepper1.body.x + 50;
        this.ghostPepperFireBall3.body.y = this.ghostPepper1.body.y - 50;
    }
}
if (this.ghostPepper1Health <= 0){
    this.ghostPepper1.body.setTint(0x000000);
    this.ghostPepper1.arms.setTint(0x000000);
    this.ghostPepper1.stem.setTint(0x000000);
    this.time.delayedCall(150, ()=>{
        this.ghostPepper1.body.destroy();
        this.ghostPepper1.stem.destroy();
        this.ghostPepper1.arms.destroy();
        this.ghostPepperFireBall1.setVisible(true);
        this.ghostPepperFireBall2.setVisible(true);
        this.ghostPepperFireBall3.setVisible(true);
        if(this.dough3)
        {
          this.dough3.setVisible(true);
        }
        if (this.ghostPepperFireBall1 && this.ghostPepperFireBall2 && this.ghostPepperFireBall3)
            {
                if (this.ghostPepperFireBall1.visible === true && this.ghostPepperFireBall1.active)
                {
                    this.ghostPepperFireBall1.body.setAllowGravity(true);
                }
                if (this.ghostPepperFireBall2.visible === true && this.ghostPepperFireBall2.active)
                {
                    this.ghostPepperFireBall2.body.setAllowGravity(true);
                } 
                if (this.ghostPepperFireBall3.visible === true && this.ghostPepperFireBall3.active)
                {
                     this.ghostPepperFireBall3.body.setAllowGravity(true);
                }
            }
    });		
}
//ghost pepper 2
if (this.ghostPepper2Health >= 1)
{
    if (this.gp2Fireballs)
    {
        this.ghostPepper2FireBall1.body.x = this.ghostPepper2.body.x - 50;
        this.ghostPepper2FireBall1.body.y = this.ghostPepper2.body.y - 50;

        this.ghostPepper2FireBall2.body.x = this.ghostPepper2.body.x;
        this.ghostPepper2FireBall2.body.y = this.ghostPepper2.body.y - 50;
 
        this.ghostPepper2FireBall3.body.x = this.ghostPepper2.body.x + 50;
        this.ghostPepper2FireBall3.body.y = this.ghostPepper2.body.y - 50;
    }
}
if (this.ghostPepper2Health <= 0){
    this.ghostPepper2.body.setTint(0x000000);
    this.ghostPepper2.arms.setTint(0x000000);
    this.ghostPepper2.stem.setTint(0x000000);
    this.time.delayedCall(150, ()=>{
        this.ghostPepper2.body.destroy();
        this.ghostPepper2.stem.destroy();
        this.ghostPepper2.arms.destroy();
        this.ghostPepper2FireBall1.setVisible(true);
        this.ghostPepper2FireBall2.setVisible(true);
        this.ghostPepper2FireBall3.setVisible(true);
        if(this.dough3)
        {
          this.dough3.setVisible(true);
        }
        if (this.ghostPepper2FireBall1 && this.ghostPepper2FireBall2 && this.ghostPepper2FireBall3)
            {
                if (this.ghostPepper2FireBall1.visible === true && this.ghostPepper2FireBall1.active)
                {
                    this.ghostPepper2FireBall1.body.setAllowGravity(true);
                }
                if (this.ghostPepper2FireBall2.visible === true && this.ghostPepper2FireBall2.active)
                {
                    this.ghostPepper2FireBall2.body.setAllowGravity(true);
                } 
                if (this.ghostPepper2FireBall3.visible === true && this.ghostPepper2FireBall3.active)
                {
                     this.ghostPepper2FireBall3.body.setAllowGravity(true);
                }
            }
    });		
}
 
 //scorpion pepper
        if (this.scorpionPepperHealth <= 0)
        {
            this.scorpTween1State = false;
            this.scorpTween2.stop();
            this.scorpFireballTween.stop();
            this.fireball.destroy();
            this.enemyFire.getChildren().map(child => child.destroy());
            if (this.spBody.active && this.spClaw1.active && this.spClaw2.active)
            {       
                this.spClaw1.body.setAllowGravity(true).setImmovable(false);
                this.spClaw2.body.setAllowGravity(true).setImmovable(false);
                this.spBody.setTint(0x000000);
                this.spClaw1.setTint(0x000000);
                this.spClaw2.setTint(0x000000);
            }
                this.time.delayedCall(1000, ()=>{
                    this.spBody.destroy();
                    this.spClaw1.destroy();
                    this.spClaw2.destroy();
                });
            
        }
        if (this.scorpTween1State === true)
        {
            this.spClaw1.x = this.spBody.x;
            this.spClaw2.x = this.spBody.x;
            this.spClaw1.y = this.spBody.y;
            this.spClaw2.y = this.spBody.y;
        }



 }//end update function
   
  


  // end state 
  }
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////