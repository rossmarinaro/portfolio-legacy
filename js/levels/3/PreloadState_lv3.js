////Pastaboss game preload assets lv 3


class PreloadState_lv3 extends Phaser.Scene {
  constructor() {
    super("PreloadState_lv3");
  }
   
 //////preload//////
  preload(){
	//loading text
	this.loadingTextBase = this.add.text(300, 300, "Loading...", {font: "35px Digitizer", fill: '#00FF2A'}).setStroke("#ff0000", 4);
	this.loadingText =  this.add.text(300, 300, "Loading...", {font: "35px Digitizer", fill: '#ffff00'}).setStroke("#ff0000", 4);
	 	//tween alpha loading pulse
		this.pulseTween = this.tweens.add({
		  	targets: this.loadingText, alpha: {value: 0.2, duration: 1000, ease: 'Power1'}, yoyo: true,	repeat: -1
		});
	this.load.tilemapTiledJSON('map2',  'assets/maps/map2.json');
	this.load.image('map2',  'assets/maps/map.png'); 
	this.load.spritesheet('tiles3', 'assets/maps/tile_sheet_files/tiles3.png', {frameWidth: 70, frameHeight: 70});
	this.load.spritesheet('tiles2', 'assets/maps/tile_sheet_files/tiles2.png', {frameWidth: 70, frameHeight: 70});
	this.load.spritesheet('tiles4', 'assets/maps/tile_sheet_files/tiles4.png', {frameWidth: 70, frameHeight: 70});
	//cloud/mist
	this.load.image('cloud2_fr1',  'assets/maps/cloud2/1.png'); 
	this.load.image('cloud2_fr2',  'assets/maps/cloud2/2.png'); 
	this.load.image('cloud2_fr3',  'assets/maps/cloud2/3.png'); 
	//objects
	this.load.image('breakable_brick', 'assets/objects/breakable_brick.png');
	this.load.image('platform', 'assets/objects/platforms/1.png');
	//// items to pick up
////// hazards
	//sauce lava
	this.load.image('sauce_lava1', 'assets/hazards/sauce_lava/1.png');	
	this.load.image('sauce_lava2', 'assets/hazards/sauce_lava/2.png');
	this.load.image('sauce_lava3', 'assets/hazards/sauce_lava/3.png');
////// enemies
	//cheese
	this.load.image('cheese_fr1', 'assets/enemies/cheese/1.png');
	this.load.image('cheese_fr2', 'assets/enemies/cheese/2.png');
	this.load.image('cheese_fr3', 'assets/enemies/cheese/3.png');
	//level 2 boss
	this.load.image('boss_fr1', 'assets/enemies/bosses/hotdog/1.png');
	this.load.image('boss_fr2', 'assets/enemies/bosses/hotdog/2.png');
	this.load.image('boss_fr3', 'assets/enemies/bosses/hotdog/3.png');	
	// boss attack
	this.load.image('boss_attack_fr1', 'assets/enemies/bosses/hotdog/attack/1.png');
	this.load.image('boss_attack_fr2', 'assets/enemies/bosses/hotdog/attack/2.png');
	this.load.image('boss_attack_fr3', 'assets/enemies/bosses/hotdog/attack/3.png');
	this.load.image('boss_attack_fr4', 'assets/enemies/bosses/hotdog/attack/4.png');
////// hazards                                                                                    

/////sound effects
	//misc
	//items
	this.load.audio('extra_life_sound', 'assets/audio/sounds/record_scratch.ogg');
	//collision sounds
	this.load.audio('boss_hit', 'assets/audio/sounds/boss_hit.ogg');
	this.load.audio('enemy_ow1', 'assets/audio/sounds/enemy_ow1.ogg');
	this.load.audio('enemy_ow2', 'assets/audio/sounds/enemy_ow2.ogg');
	this.load.audio('enemy_hit_dow', 'assets/audio/sounds/enemy_hit_dow.ogg');
	////music
	this.load.audio('lv2ext', 'assets/audio/music/lv2ext.ogg');
	//hitbox
	this.load.image('hitbox', 'assets/hitbox/1.png');
	//exit door
	this.load.image('exit', 'assets/doors/exit.png');
	this.load.image('minigame_door_open', 'assets/doors/minigame_door/1.png');
	this.load.image('minigame_door_closed', 'assets/doors/minigame_door/2.png');	
  
	this.load.image('A_button_upgrade1', 'assets/buttons/a_button_upgrade1.png',96,64);














  this.load.image('left_button', 'assets/buttons/left_button.png',64,64);
  this.load.image('jump_button', 'assets/buttons/jump_button.png',96,64);
  this.load.image('down_button', 'assets/buttons/down_button.png',96,64);
  this.load.image('right_button', 'assets/buttons/right_button.png',64,64);
  this.load.image('A_button', 'assets/buttons/a_button.png',96,64);
  this.load.image('B_button', 'assets/buttons/b_button.png',96,64);
  this.load.image('C_button', 'assets/buttons/c_button.png',96,64);
  this.load.image('toggle_button', 'assets/buttons/toggle_button.png',96,64);
  //start, retry
  this.load.image('continue', 'assets/buttons/continue.png',96,64); 
//// text/image
  this.load.image('logo', 'assets/images/logo.png');
  this.load.image('pastaboss_text', 'assets/images/pastaboss_text.png');
////map, environment, and background
  this.load.image('pixel', 'assets/backgrounds/pixel.png');
  this.load.tilemapTiledJSON('map',  'assets/maps/map.json');
  this.load.image('map',  'assets/maps/map.png'); 
  this.load.spritesheet('tiles', 'assets/maps/tile_sheet_files/tiles.png', {frameWidth: 70, frameHeight: 70});
  this.load.spritesheet('tiles2', 'assets/maps/tile_sheet_files/tiles2.png', {frameWidth: 70, frameHeight: 70});
  this.load.spritesheet('tiles3', 'assets/maps/tile_sheet_files/tiles3.png', {frameWidth: 70, frameHeight: 70});
  this.load.image('clouds', 'assets/maps/cloud.png');
  //level 1 end background
  this.load.atlas('bkgnd', 'assets/images/bkgnd.png', 'assets/images/bkgnd.json');
  this.load.atlas('bkgnd2', 'assets/images/bkgnd2.png', 'assets/images/bkgnd2.json');
  this.load.image('exit', 'assets/doors/exit.png');
  this.load.image('pizza_oven_fr1', 'assets/objects/pizza_oven/1.png');
  this.load.image('pizza_oven_fr2', 'assets/objects/pizza_oven/2.png');
  this.load.image('pizza_oven_fr3', 'assets/objects/pizza_oven/3.png');
  this.load.image('pizza_oven_fr4', 'assets/objects/pizza_oven/4.png');
  this.load.image('pizza_oven_fr5', 'assets/objects/pizza_oven/5.png');
  this.load.image('pizza_oven_fr6', 'assets/objects/pizza_oven/6.png');
  this.load.image('pizza_oven_fr7', 'assets/objects/pizza_oven/7.png');
  this.load.image('pizza_oven_fr8', 'assets/objects/pizza_oven/8.png');
  this.load.image('pizza_oven_fr9', 'assets/objects/pizza_oven/9.png');
  this.load.image('pizza_oven_fr10', 'assets/objects/pizza_oven/10.png');
  this.load.image('pizza_oven_fr11', 'assets/objects/pizza_oven/11.png');
  this.load.image('pizza_oven_fr12', 'assets/objects/pizza_oven/12.png');
  //hitbox
  this.load.image('hitbox', 'assets/hitbox/1.png');
  ////lives icon
  this.load.image('player_interface', 'assets/images/player_interface.png');
  this.load.image('items_interface', 'assets/images/items_interface.png');
  this.load.image('lives', 'assets/images/lives.png');
  this.load.image('lives2', 'assets/images/lives2.png');
  //// health items
  this.load.image('coin', 'assets/items/coinGold.png'); //macaroni ammo
  this.load.image('ikura', 'assets/items/ikura_maki.png');
  this.load.image('salmon', 'assets/items/salmon_nigiri.png');
  //item
  this.load.image('spatula', 'assets/items/spatula.png');
  //power ups
  this.load.image('coffee_fr1', 'assets/items/coffee/1.png');
  this.load.image('coffee_fr2', 'assets/items/coffee/2.png');
  this.load.image('coffee_fr3', 'assets/items/coffee/3.png');
  //beer
  this.load.image('beer', 'assets/items/beer.png');
  //shrooms
  this.load.image('shrooms', 'assets/items/shrooms.png');
  //dough
  this.load.image('dough', 'assets/items/dough.png');
////// enemies
  //meatballs 
  this.load.image('meatball_fr1', 'assets/enemies/meatball/1.png');
  this.load.image('meatball_fr2', 'assets/enemies/meatball/2.png');
  this.load.image('meatball_fr3', 'assets/enemies/meatball/3.png');
  //chili peppers facing left
  this.load.image('chili_fr1', 'assets/enemies/chili/1.png');
  this.load.image('chili_fr2', 'assets/enemies/chili/2.png');
  this.load.image('chili_fr3', 'assets/enemies/chili/3.png');
  //level 1 boss
  this.load.image('boss1', 'assets/enemies/bosses/pizza_boss/1.png');
  this.load.image('boss2', 'assets/enemies/bosses/pizza_boss/2.png');
  this.load.image('boss3', 'assets/enemies/bosses/pizza_boss/3.png');	
  this.load.image('boss4', 'assets/enemies/bosses/pizza_boss/4.png');
  this.load.image('boss5', 'assets/enemies/bosses/pizza_boss/5.png');
  this.load.image('boss6', 'assets/enemies/bosses/pizza_boss/6.png');
  this.load.image('boss7', 'assets/enemies/bosses/pizza_boss/7.png');
  this.load.image('boss8', 'assets/enemies/bosses/pizza_boss/8.png');
  this.load.image('pepperoni', 'assets/enemies/bosses/pizza_boss/pepperoni.png');
////// hazards
  //cheese pits
  this.load.image('cheese_pit1', 'assets/hazards/cheese_pits/1.png');
  this.load.image('cheese_pit2', 'assets/hazards/cheese_pits/2.png');
  this.load.image('cheese_pit3', 'assets/hazards/cheese_pits/3.png');
  //fire
  this.load.image('fire_fr1', 'assets/hazards/fire/1.png');
  this.load.image('fire_fr2', 'assets/hazards/fire/2.png');
  this.load.image('fire_fr3', 'assets/hazards/fire/3.png');	
  this.load.image('fire_fr4', 'assets/hazards/fire/4.png');
  this.load.image('fire_fr5', 'assets/hazards/fire/5.png');
////// weapons
  //rolling pin
  this.load.image('rolling_pin_fr1', 'assets/weapons/rolling_pin/1.png');
  this.load.image('rolling_pin_upgrade1_fr1', 'assets/weapons/rolling_pin/2_1.png');
  this.load.image('rolling_pin_upgrade1_fr2', 'assets/weapons/rolling_pin/2_2.png');
  this.load.image('macaroni', 'assets/weapons/macaroni/1.png');
///// player 
  this.load.image('ulooked', 'assets/images/ulooked.png');
  this.load.atlas('player', 'assets/player/sober/player.png', 'assets/player/sober/player.json');
  this.load.atlas('player_drunk_map', 'assets/player/drunk/playermap.png', 'assets/player/sober/player.json');
  this.load.atlas('player_drunk_idle', 'assets/player/drunk/playermap.png', 'assets/player/sober/player.json');
  this.load.atlas('player_coffee_map', 'assets/player/coffee/playermap.png', 'assets/player/sober/player.json');
  this.load.image('player_drunk_idle_fr1', 'assets/player/drunk/1.png');
  this.load.image('player_coffee_idle_fr1', 'assets/player/coffee/1.png');
  this.load.image('bubble_fr1', 'assets/particles/bubbles/1.png');
  this.load.image('bubble_fr2', 'assets/particles/bubbles/2.png');
  this.load.image('bubble_fr3', 'assets/particles/bubbles/3.png');
  //player weapon
  this.load.image('player_weapon_fr1', 'assets/player/player_weapon/1.png');
  this.load.image('player_weapon_fr2', 'assets/player/player_weapon/2.png');
  this.load.image('player_weapon_fr3', 'assets/player/player_weapon/3.png');
  this.load.image('player_weapon_fr4', 'assets/player/player_weapon/4.png');    
  //
  //player weapon coffee
  this.load.image('player_weapon_coffee_fr1', 'assets/player/player_weapon/coffee/1.png');
  this.load.image('player_weapon_coffee_fr2', 'assets/player/player_weapon/coffee/2.png');
  this.load.image('player_weapon_coffee_fr3', 'assets/player/player_weapon/coffee/3.png');
  this.load.image('player_weapon_coffee_fr4', 'assets/player/player_weapon/coffee/4.png');
  //
  this.load.image('player_drinking_coffee_fr1', 'assets/player/coffee/animation/1.png');
  this.load.image('player_drinking_coffee_fr2', 'assets/player/coffee/animation/2.png');
  this.load.image('player_drinking_coffee_fr3', 'assets/player/coffee/animation/3.png');
  //player weapon beer
  this.load.image('player_weapon_drunk_fr1', 'assets/player/player_weapon/drunk/1.png');
  this.load.image('player_weapon_drunk_fr2', 'assets/player/player_weapon/drunk/2.png');
  this.load.image('player_weapon_drunk_fr3', 'assets/player/player_weapon/drunk/3.png');
  this.load.image('player_weapon_drunk_fr4', 'assets/player/player_weapon/drunk/4.png');
  //
  this.load.image('player_drinking_beer', 'assets/player/drunk/drinking.png');
  //idle
  this.load.image('idle1', 'assets/player/sober/idle/1.png');
  this.load.image('idle2', 'assets/player/sober/idle/2.png');
  this.load.image('idle3', 'assets/player/sober/idle/3.png');
  this.load.image('idle4', 'assets/player/sober/idle/4.png');
/////sound effects
  //misc
  this.load.audio('ring', 'assets/audio/sounds/ring.mp3');
  //items
  this.load.audio('macaroni_ring', 'assets/audio/sounds/macaroni_ring.ogg');
  this.load.audio('health_ring', 'assets/audio/sounds/ring.mp3');
  this.load.audio('sick', 'assets/audio/sounds/sick.ogg');
  this.load.audio('dough_sound', 'assets/audio/sounds/dough.ogg');
  //collision sounds
  this.load.audio('huh', 'assets/audio/sounds/huh.mp3');
  this.load.audio('player_hit', 'assets/audio/sounds/ouch.ogg');
  this.load.audio('chili_hit', 'assets/audio/sounds/chili_hit.ogg');
  this.load.audio('meatball_hit', 'assets/audio/sounds/meatball_hit.ogg');
  this.load.audio('boss_hit', 'assets/audio/sounds/boss_hit.ogg');
  ////music
  this.load.audio('level1', 'assets/audio/music/deep_in_the_sauce.ogg');
  this.load.audio('menu', 'assets/audio/music/pastafarimon.ogg');
  this.load.audio('game_over', 'assets/audio/music/game_over.ogg');
  this.load.audio('menu_music', 'assets/audio/music/pastafarimon.ogg');
  this.load.audio('dead', 'assets/audio/music/dead.ogg');
  this.load.audio('gulp', 'assets/audio/sounds/gulp.ogg');
  this.load.audio('frigyeah', 'assets/audio/sounds/frigyeah.ogg');












	}

  //////create///////
  
  create() {
	  
	//create anims
	   
	//cloud/mist anims
	this.anims.create({
		key: 'cloud2_anims',
		frames:[
		{ key: 'cloud2_fr1' },
			{ key: 'cloud2_fr2' },
				{ key: 'cloud2_fr3'},
			{ key: 'cloud2_fr2' },
		{ key: 'cloud2_fr1', duration: 5000 }
	],
	frameRate: 8,
	repeat: -1
});

	//sauce lava
			this.anims.create({
				key: 'sauce_lava_anims',
				frames:[
				{ key: 'sauce_lava1' },
					{ key: 'sauce_lava2' },
						{ key: 'sauce_lava3', duration: 50 }
			],
			frameRate: 8,
			repeat: -1
	});
	// cheese
		this.anims.create({
				key: 'cheese_loop',
				frames:[
				{ key: 'cheese_fr1' },
					{ key: 'cheese_fr2' },
						{ key: 'cheese_fr1' , duration: 50 }
			],
			frameRate: 8,
			repeat: -1
		});
	// level 2 boss
		this.anims.create({
				key: 'boss_loop',
				frames:[
				{ key: 'boss_fr1' },
					{ key: 'boss_fr2' },
						{ key: 'boss_fr3' },
							{ key: 'boss_fr2' },
								{ key: 'boss_fr1', duration: 50 }
			],
			frameRate: 8,
			repeat: -1
		});
	// boss attack
			this.anims.create({
				key: 'boss_attack_loop',
				frames:[
					{ key: 'boss_attack_fr1' },
						{ key: 'boss_attack_fr2' },
							{ key: 'boss_attack_fr3' },			
								{ key: 'boss_attack_fr4', duration: 50 }
			],
			frameRate: 8,
			repeat: -1
		});
		// rubble
					this.anims.create({
				key: 'rubble_anims',
				frames:[
				{ key: 'rubble_fr1' },
					{ key: 'rubble_fr2' },
						{ key: 'rubble_fr3' , duration: 5 }
			],
			frameRate: 8,
			repeat: -1
	});


	this.anims.create({
		key: 'rolling_pin_upgrade1_loop',
		frames:[
				{ key: 'rolling_pin_upgrade1_fr1' },
					{ key: 'rolling_pin_upgrade1_fr2' , duration: 50 }
	],
	frameRate: 25,
	repeat: 0
	}); 



	onBegin = true;
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


	//start scene
	  this.scene.start('PlayState_lv3');
	
	}

 
}


/////////////////
