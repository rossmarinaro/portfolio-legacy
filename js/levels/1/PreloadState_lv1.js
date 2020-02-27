////Pastaboss game lv1 preload assets


class PreloadState_lv1 extends Phaser.Scene {
  constructor() {
    super("PreloadState_lv1");
  }
   
 //////preload//////

  preload(){
	//loading text
	this.loadingTextBase = this.add.text(300, 300, "Loading...", {font: "35px Digitizer", fill: '#00FF2A'}).setStroke("#ff0000", 4);
	this.loadingText =  this.add.text(300, 300, "Loading...", {font: "35px Digitizer", fill: '#ffff00'}).setStroke("#ff0000", 4);
	 	//tween alpha loading pulse
		this.pulseTween = this.tweens.add({
				targets: this.loadingText, alpha: {value: 0.2, duration: 1000, ease: 'Power1'}, yoyo: true, repeat: -1
			});
		//////////////////////////////////////////////////////////////////////
		///// player 
		this.load.image('ulooked', 'assets/images/ulooked.png');
		this.load.atlas('player', 'assets/player/sober/player.png', 'assets/player/sober/player.json');
		this.load.atlas('player_drunk_map', 'assets/player/drunk/playermap.png', 'assets/player/sober/player.json');
		this.load.atlas('player_drunk_idle', 'assets/player/drunk/playermap.png', 'assets/player/sober/player.json');
		this.load.atlas('player_coffee_map', 'assets/player/coffee/playermap.png', 'assets/player/sober/player.json');
		this.load.image('player_drunk_idle_fr1', 'assets/player/drunk/1.png');
		this.load.image('player_coffee_idle_fr1', 'assets/player/coffee/1.png');
		this.load.image('player_trippin_fr1', 'assets/player/trippin/1.png');
		this.load.image('player_trippin_fr2', 'assets/player/trippin/2.png');
		this.load.image('player_trippin_fr3', 'assets/player/trippin/3.png');
		this.load.image('player_trippin_fr4', 'assets/player/trippin/4.png');
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

		////map, environment, and background
		this.load.image('pixel', 'assets/backgrounds/pixel.png');
		this.load.tilemapTiledJSON('map5',  'assets/maps/map5.json');
		this.load.image('map5',  'assets/maps/map5.png'); 
		this.load.spritesheet('tiles', 'assets/maps/tile_sheet_files/tiles.png', {frameWidth: 70, frameHeight: 70});
		this.load.spritesheet('tiles2', 'assets/maps/tile_sheet_files/tiles2.png', {frameWidth: 70, frameHeight: 70});
		this.load.spritesheet('tiles4', 'assets/maps/tile_sheet_files/tiles4.png', {frameWidth: 70, frameHeight: 70});
        this.load.spritesheet('tiles5', 'assets/maps/tile_sheet_files/tiles5.png', {frameWidth: 70, frameHeight: 70});
        this.load.spritesheet('tiles7', 'assets/maps/tile_sheet_files/tiles7.png', {frameWidth: 70, frameHeight: 70});
        this.load.image('pyramid', 'assets/backgrounds/pyramid.png', {frameWidth: 70, frameHeight: 70});
		//cloud/mist
		this.load.image('clouds',  'assets/maps/cloud.png'); 
		this.load.image('cloud2_fr1',  'assets/maps/cloud2/1.png'); 
		this.load.image('cloud2_fr2',  'assets/maps/cloud2/2.png'); 
		this.load.image('cloud2_fr3',  'assets/maps/cloud2/3.png'); 

        //sauce lava
        this.load.image('sauce_lava4', 'assets/hazards/sauce_lava/4.png');
        this.load.image('sauce_lava5', 'assets/hazards/sauce_lava/5.png');
        this.load.image('sauce_lava6', 'assets/hazards/sauce_lava/6.png');
        //cheese pits
        this.load.image('cheese_pit1', 'assets/hazards/cheese_pits/1.png');
        this.load.image('cheese_pit2', 'assets/hazards/cheese_pits/2.png');
        this.load.image('cheese_pit3', 'assets/hazards/cheese_pits/3.png');

		//ghost pepper
		this.load.image('ghost_pepper_body', 'assets/enemies/ghost_pepper/body/1.png');
		this.load.image('ghost_pepper_arms_fr1', 'assets/enemies/ghost_pepper/arms/1.png');
		this.load.image('ghost_pepper_arms_fr2', 'assets/enemies/ghost_pepper/arms/2.png');
		this.load.image('ghost_pepper_arms_fr3', 'assets/enemies/ghost_pepper/arms/3.png');
		this.load.image('ghost_pepper_stem_fr1', 'assets/enemies/ghost_pepper/stem/1.png');
		this.load.image('ghost_pepper_stem_fr2', 'assets/enemies/ghost_pepper/stem/2.png');
		this.load.image('ghost_pepper_stem_fr3', 'assets/enemies/ghost_pepper/stem/3.png');

		//walking spaghetti monster mummy
		this.load.image('wsm_mummy_body', 'assets/enemies/walking_spaghetti_monster_mummy/body/1.png');
		this.load.image('wsm_mummy_arm1_fr1', 'assets/enemies/walking_spaghetti_monster_mummy/arm1/1.png');
		this.load.image('wsm_mummy_arm1_fr2', 'assets/enemies/walking_spaghetti_monster_mummy/arm1/2.png');
		this.load.image('wsm_mummy_arm1_fr3', 'assets/enemies/walking_spaghetti_monster_mummy/arm1/3.png');
		this.load.image('wsm_mummy_arm2_fr1', 'assets/enemies/walking_spaghetti_monster_mummy/arm2/1.png');
		this.load.image('wsm_mummy_arm2_fr2', 'assets/enemies/walking_spaghetti_monster_mummy/arm2/2.png');
		this.load.image('wsm_mummy_arm2_fr3', 'assets/enemies/walking_spaghetti_monster_mummy/arm2/3.png');
		this.load.image('wsm_mummy_legs_fr1', 'assets/enemies/walking_spaghetti_monster_mummy/legs/1.png');
		this.load.image('wsm_mummy_legs_fr2', 'assets/enemies/walking_spaghetti_monster_mummy/legs/2.png');
		this.load.image('wsm_mummy_legs_fr3', 'assets/enemies/walking_spaghetti_monster_mummy/legs/3.png');
		this.load.image('wsm_mummy_legs_fr4', 'assets/enemies/walking_spaghetti_monster_mummy/legs/4.png');
		this.load.image('wsm_mummy_legs_fr5', 'assets/enemies/walking_spaghetti_monster_mummy/legs/5.png');
		this.load.image('wsm_mummy_legs_fr6', 'assets/enemies/walking_spaghetti_monster_mummy/legs/6.png');
		this.load.image('wsm_mummy_legs_fr7', 'assets/enemies/walking_spaghetti_monster_mummy/legs/7.png');

            //chili peppers
            this.load.image('chili_fr1', 'assets/enemies/chili/1.png');
            this.load.image('chili_fr2', 'assets/enemies/chili/2.png');
            this.load.image('chili_fr3', 'assets/enemies/chili/3.png');

            //scorpion pepper
            //body
            this.load.image('scorpion_pepper_body_fr1', 'assets/enemies/bosses/scorpion_pepper/body/1.png');
			this.load.image('scorpion_pepper_body_fr2', 'assets/enemies/bosses/scorpion_pepper/body/2.png');
			this.load.image('scorpion_pepper_body_fr3', 'assets/enemies/bosses/scorpion_pepper/body/3.png');
            //claws
            this.load.image('scorpion_pepper_claw1_fr1', 'assets/enemies/bosses/scorpion_pepper/claw1/1.png');
            this.load.image('scorpion_pepper_claw2_fr1', 'assets/enemies/bosses/scorpion_pepper/claw2/1.png');
            //fire
            this.load.image('scorpion_pepper_fire_fr1', 'assets/enemies/bosses/scorpion_pepper/fire/1.png');
            //lava
            this.load.image('scorpion_pepper_lava_fr1', 'assets/enemies/bosses/scorpion_pepper/lava/1.png');

            //supreme leader
            this.load.image('supreme_leader_body_fr1', 'assets/enemies/bosses/supreme_leader/sprite/body/1.png');
            this.load.image('supreme_leader_eyes_fr1', 'assets/enemies/bosses/supreme_leader/sprite/eyes/1.png');
            this.load.image('supreme_leader_gun_fr1', 'assets/enemies/bosses/supreme_leader/sprite/gun/1.png');
            this.load.image('supreme_leader_hands_fr1', 'assets/enemies/bosses/supreme_leader/sprite/hands/1.png');
            //speech bub
            this.load.image('speech_bub_fr1', 'assets/swanky_velvet/speech_bubble/1.png');
            this.load.image('speech_bub_fr2', 'assets/swanky_velvet/speech_bubble/2.png');
            this.load.image('speech_bub_fr3', 'assets/swanky_velvet/speech_bubble/3.png');
            this.load.image('speech_bub_fr4', 'assets/swanky_velvet/speech_bubble/4.png');
			//cropped
			this.load.image('supreme_leader_cropped_fr1', 'assets/enemies/bosses/supreme_leader/cropped/1.png');
			this.load.image('supreme_leader_cropped_fr2', 'assets/enemies/bosses/supreme_leader/cropped/2.png');
			this.load.image('supreme_leader_cropped_fr3', 'assets/enemies/bosses/supreme_leader/cropped/3.png');
			this.load.image('supreme_leader_cropped_fr4', 'assets/enemies/bosses/supreme_leader/cropped/4.png');
			this.load.image('supreme_leader_cropped_fr5', 'assets/enemies/bosses/supreme_leader/cropped/5.png');
			this.load.image('hitbox', 'assets/hitbox/2.png');
			//door 
			this.load.image('shop_door', 'assets/doors/shop.png');
         //audio
			//music
			this.load.audio('middle_pastern', 'assets/audio/music/middlepastern.ogg');
			this.load.audio('midyeast', 'assets/audio/music/midyeast.ogg');
			this.load.audio('menu', 'assets/audio/music/pastafarimon.ogg');
			this.load.audio('game_over', 'assets/audio/music/game_over.ogg');
			this.load.audio('menu_music', 'assets/audio/music/pastafarimon.ogg');
			this.load.audio('dead', 'assets/audio/music/dead.ogg');
			this.load.audio('midyeast3', 'assets/audio/music/midyeast3.ogg');
			//sound effects
			this.load.audio('ring', 'assets/audio/sounds/ring.mp3');
			this.load.audio('supreme_leader_laugh', 'assets/audio/sounds/supreme_leader_laugh.ogg');
			this.load.audio('ghost_pepper_hit', 'assets/audio/sounds/ghost_pepper_hit.ogg');
			this.load.audio('fire_fx', 'assets/audio/sounds/fire.ogg');
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
			this.load.audio('gulp', 'assets/audio/sounds/gulp.ogg');
			this.load.audio('frigyeah', 'assets/audio/sounds/frigyeah.ogg');
			this.load.audio('barf', 'assets/audio/sounds/barf.ogg');
			//warp
			this.load.audio('warp', 'assets/audio/sounds/warp.ogg');

	//// gamepad buttons
    this.load.image('left_button', 'assets/buttons/left_button.png',64,64);
	this.load.image('jump_button', 'assets/buttons/jump_button.png',96,64);
	this.load.image('down_button', 'assets/buttons/down_button.png',96,64);
    this.load.image('right_button', 'assets/buttons/right_button.png',64,64);
	this.load.image('A_button', 'assets/buttons/a_button.png',96,64);
	this.load.image('B_button', 'assets/buttons/b_button.png',96,64);
	this.load.image('C_button', 'assets/buttons/c_button.png',96,64);
	this.load.image('C_button', 'assets/buttons/c_button.png',96,64);
	this.load.image('toggle_button', 'assets/buttons/toggle_button.png',96,64);
	//start, retry
	this.load.image('continue', 'assets/buttons/continue.png',96,64); 
//// text/image
	this.load.image('logo', 'assets/images/logo.png');
	this.load.image('pastaboss_text', 'assets/images/pastaboss_text.png');

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
	this.load.image('rolling_pin_fr2', 'assets/weapons/rolling_pin/2.png');
	this.load.image('rolling_pin_fr3', 'assets/weapons/rolling_pin/3.png');
	this.load.image('rolling_pin_fr4', 'assets/weapons/rolling_pin/4.png');
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
    this.load.image('pixel2', 'assets/backgrounds/pixel2.png');
	this.load.tilemapTiledJSON('map3',  'assets/maps/map3.json');
	this.load.image('map3',  'assets/maps/map3.png'); 
	this.load.spritesheet('tiles', 'assets/maps/tile_sheet_files/tiles.png', {frameWidth: 70, frameHeight: 70});
	this.load.spritesheet('tiles2', 'assets/maps/tile_sheet_files/tiles2.png', {frameWidth: 70, frameHeight: 70});
	this.load.spritesheet('tiles4', 'assets/maps/tile_sheet_files/tiles4.png', {frameWidth: 70, frameHeight: 70});
	//particles
	this.load.image('snow',  'assets/particles/snow.png'); 
	this.load.image('rubble_fr1', 'assets/particles/rubble/1.png');
	this.load.image('rubble_fr2', 'assets/particles/rubble/2.png');
	this.load.image('rubble_fr3', 'assets/particles/rubble/3.png');
////// enemies
	//ice cream cone
	this.load.image('icecream_fr1', 'assets/enemies/icecream/1.png');
	this.load.image('icecream_fr2', 'assets/enemies/icecream/2.png');
	this.load.image('icecream_fr3', 'assets/enemies/icecream/3.png');
	this.load.image('icecream_fr4', 'assets/enemies/icecream/4.png');
	//pickles
	this.load.image('pickle_fr1', 'assets/enemies/pickle/1.png');
	this.load.image('pickle_fr2', 'assets/enemies/pickle/2.png');
	this.load.image('pickle_fr3', 'assets/enemies/pickle/3.png');
	this.load.image('pickle_fr4', 'assets/enemies/pickle/4.png');
	this.load.image('pickle_fr5', 'assets/enemies/pickle/5.png');
	//pickle juice
	this.load.image('pickle_juice_fr1', 'assets/enemies/pickle/pickle_juice/1.png');
	this.load.image('pickle_juice_fr2', 'assets/enemies/pickle/pickle_juice/2.png');
	this.load.image('pickle_juice_fr3', 'assets/enemies/pickle/pickle_juice/3.png');
	//splat
	this.load.image('pickle_juice_splat_fr1', 'assets/enemies/pickle/pickle_juice/splat/1.png');
	this.load.image('pickle_juice_splat_fr2', 'assets/enemies/pickle/pickle_juice/splat/2.png');
	//cupcakes
	this.load.image('cupcake_fr1', 'assets/enemies/cupcakes/1.png');
	this.load.image('cupcake_fr2', 'assets/enemies/cupcakes/2.png');
	this.load.image('cupcake_fr3', 'assets/enemies/cupcakes/3.png');
	//level 2 boss
	this.load.image('cake_boss_fr1', 'assets/enemies/bosses/cake_boss/1.png');
	this.load.image('cake_boss_fr2', 'assets/enemies/bosses/cake_boss/2.png');
	this.load.image('cake_boss_fr3', 'assets/enemies/bosses/cake_boss/3.png');	
	this.load.image('cake_boss_weapon', 'assets/enemies/bosses/cake_boss/piece_of_cake.png');	
////// hazards                                                                                    
	//ice block
	this.load.image('ice_block_fr1', 'assets/hazards/ice_block/1.png');
	this.load.image('ice_block_fr2', 'assets/hazards/ice_block/2.png');
	this.load.image('ice_block_fr3', 'assets/hazards/ice_block/3.png');
	//icicle
	this.load.image('icicle_fr1', 'assets/hazards/icicle/1.png');
	this.load.image('icicle_fr2', 'assets/hazards/icicle/2.png');
	//ice
	this.load.image('ice', 'assets/hazards/ice/1.png');
/////sound effects
	//misc
	this.load.audio('ring', 'assets/audio/sounds/ring.mp3');
	this.load.audio('ice_break', 'assets/audio//sounds/ice_break.ogg');
	//items
	this.load.audio('macaroni_ring', 'assets/audio/sounds/macaroni_ring.ogg');
	this.load.audio('health_ring', 'assets/audio/sounds/ring.mp3');
	this.load.audio('extra_life_sound', 'assets/audio/sounds/record_scratch.ogg');	
	////music
	this.load.audio('level2', 'assets/audio/music/level2.ogg');

  }

  //////create///////
  
  create() {

//animations


//supreme leader cropped image in clouds
this.anims.create({
    key: 'supreme_leader_cropped_anims',
    frames: [
            {key: 'supreme_leader_cropped_fr1'},
				{key: 'supreme_leader_cropped_fr2'},
					{key: 'supreme_leader_cropped_fr3'},
				{key: 'supreme_leader_cropped_fr2'},
			{key: 'supreme_leader_cropped_fr1'}, 
			{key: 'supreme_leader_cropped_fr4'},
			{key: 'supreme_leader_cropped_fr5', duration: 300}
    ],
    frameRate: 8,
    repeat: 0
});

//scorpion pepper
this.anims.create({
    key: 'scorpion_pepper_anims',
    frames: [
            {key: 'scorpion_pepper_body_fr1'},
				{key: 'scorpion_pepper_body_fr2'},
					{key: 'scorpion_pepper_body_fr3'},
				{key: 'scorpion_pepper_body_fr2'},
			{key: 'scorpion_pepper_body_fr1', duration: 300}
    ],
    frameRate: 8,
    repeat: -1
});


this.anims.create({
    key: 'speech_bub_anims',
    frames: [
            {key: 'speech_bub_fr1'},
                {key: 'speech_bub_fr2'},
                    {key: 'speech_bub_fr3'},
                        {key: 'speech_bub_fr4', duration: 300}
    ],
    frameRate: 8,
    repeat: 0
});


	//cloud/mist anims
	this.anims.create({
		key: 'cloud2_anims',
		frames:[
		{ key: 'cloud2_fr1' },
			{ key: 'cloud2_fr2' },
				{ key: 'cloud2_fr3'},
			{ key: 'cloud2_fr2' },
		{ key: 'cloud2_fr1', duration: 1000 }
	],
	frameRate: 5,
	repeat: -1
});


	//sauce lava
    this.anims.create({
        key: 'sauce_lava_anims2',
        frames:[
        { key: 'sauce_lava4' },
            { key: 'sauce_lava5' },
                { key: 'sauce_lava6', duration: 50 }
    ],
    frameRate: 8,
    repeat: -1
});


//cheese pits
this.anims.create({
	key: 'cheese_pit_anims',
	frames:[
	{ key: 'cheese_pit1' },
		{ key: 'cheese_pit2' },
			{ key: 'cheese_pit3', duration: 50 }
],
frameRate: 8,
repeat: -1
});

		//////////
		//animations

		//wsm mummy arm1 anims
		this.anims.create({
			key: 'wsm_mummy_arm1_anims',
			frames: [
				{key: 'wsm_mummy_arm1_fr1'},
					{key: 'wsm_mummy_arm1_fr2'},
						{key: 'wsm_mummy_arm1_fr3'},
					{key: 'wsm_mummy_arm1_fr2'},
				{key: 'wsm_mummy_arm1_fr1' , duration: 200}
			],
			frameRate: 8,
			repeat: -1
		});

	//wsm mummy arm2anims
	this.anims.create({
		key: 'wsm_mummy_arm2_anims',
		frames: [
			{key: 'wsm_mummy_arm2_fr1'},
				{key: 'wsm_mummy_arm2_fr2'},
					{key: 'wsm_mummy_arm2_fr3'},
				{key: 'wsm_mummy_arm2_fr2'},
			{key: 'wsm_mummy_arm2_fr1' , duration: 200}
		],
		frameRate: 8,
		repeat: -1
	});

	
	//wsm mummy leg anims
	this.anims.create({
		key: 'wsm_mummy_leg_anims',
		frames: [
			{key: 'wsm_mummy_legs_fr1'},
				{key: 'wsm_mummy_legs_fr2'},
					{key: 'wsm_mummy_legs_fr3'},
						{key: 'wsm_mummy_legs_fr4'},
							{key: 'wsm_mummy_legs_fr5'},
								{key: 'wsm_mummy_legs_fr6'},
									{key: 'wsm_mummy_legs_fr7'},
									{key: 'wsm_mummy_legs_fr6'},
				{key: 'wsm_mummy_legs_fr5'},
					{key: 'wsm_mummy_legs_fr4'},
						{key: 'wsm_mummy_legs_fr3'},
							{key: 'wsm_mummy_legs_fr2'},
								{key: 'wsm_mummy_legs_fr1' ,duration: 20}
		],
		frameRate: 8,
		repeat: -1
	});

	this.anims.create({
		key: 'player_coffee_idle',
		frames:[
				{ key: 'player_coffee_idle_fr1', duration: 50 }
	],
	frameRate: 8,
	repeat: -1
	});
	this.anims.create({
		key: 'player_drunk_idle',
		frames:[
				{ key: 'player_drunk_idle_fr1', duration: 50 }
	],
	frameRate: 8,
	repeat: -1
	});
		//fire
		this.anims.create({
			key: 'fireball_anims',
			frames:[
			{ key: 'fire_fr1' },
				{ key: 'fire_fr2' },
					{ key: 'fire_fr3' },
						{ key: 'fire_fr4' }, 
							{ key: 'fire_fr5' , duration: 5 }
			],
			frameRate: 8,
			repeat: -1
			});
			this.anims.create({
				key: 'oven_anims',
				frames:[
				{ key: 'pizza_oven_fr1' },
					{ key: 'pizza_oven_fr2' },
						{ key: 'pizza_oven_fr3' },
							{ key: 'pizza_oven_fr4' },
								{ key: 'pizza_oven_fr3' },
									{ key: 'pizza_oven_fr2' },
										{ key: 'pizza_oven_fr1'}, 
											{ key: 'pizza_oven_fr2' },
												{ key: 'pizza_oven_fr3' },
													{ key: 'pizza_oven_fr4' },
														{ key: 'pizza_oven_fr3' },
															{ key: 'pizza_oven_fr2' },
																{ key: 'pizza_oven_fr1'}, 
												{ key: 'pizza_oven_fr5' },
												{ key: 'pizza_oven_fr6'}, 
												{ key: 'pizza_oven_fr7' },
												{ key: 'pizza_oven_fr8'}, 
												{ key: 'pizza_oven_fr9' },
												{ key: 'pizza_oven_fr10'}, 
												{ key: 'pizza_oven_fr11' },
												{ key: 'pizza_oven_fr12', duration: 1000 }
												
										
			],
			frameRate: 30
		});	
	
	//coffee 
	this.anims.create({
		key: 'coffee_anims',
		frames: [
			{key: 'coffee_fr1'},
				{key: 'coffee_fr2'},
					{key: 'coffee_fr3'},
						{key: 'coffee_fr2'},
							{key: 'coffee_fr1', duration: 200}
		],
		frameRate: 8,
		repeat: -1
	});
		
	// player drinking coffee
	
	
	this.anims.create({
		key: 'drinking_coffee_anims',
		frames: [
			{key: 'player_drinking_coffee_fr1'},
				 {key: 'player_drinking_coffee_fr2'},
					 {key: 'player_drinking_coffee_fr3'},
						 {key: 'player_drinking_coffee_fr2'},
							 {key: 'player_drinking_coffee_fr1', duration: 200}
		],
		frameRate: 8,
		repeat: -1
	});
	
	
	//////////	player animations
	
	// walk		
	this.anims.create({
		key: 'walk',
		frames: this.anims.generateFrameNames('player', {prefix: 'p1_walk', start: 8, end: 3, zeroPad: 2}),
		frameRate: 8,
		repeat: -1
	});
	this.anims.create({
		key: 'speed_walk',
		frames: this.anims.generateFrameNames('player_coffee_map', {prefix: 'p1_walk', start: 8, end: 3, zeroPad: 2}),
		frameRate: 8,
		repeat: -1
	});
	this.anims.create({
		key: 'drunk_walk',
		frames: this.anims.generateFrameNames('player_drunk_map', {prefix: 'p1_walk', start: 10, end: 4, zeroPad: 2}),
		frameRate: 8,
		repeat: -1
	});
	  // jump 
	this.anims.create({
		key: 'fall',
		frames: this.anims.generateFrameNames('player', {prefix: 'p1_walk', start: 10, end: 10, zeroPad: 2}),
		frameRate: 10,
		repeat: -1
	});
	  //speed jump 
	  this.anims.create({
		key: 'speed_fall',
		frames: this.anims.generateFrameNames('player_coffee_map', {prefix: 'p1_walk', start: 10, end: 10, zeroPad: 2}),
		frameRate: 10,
		repeat: -1
	});
	  //drunk jump 
	  this.anims.create({
		key: 'drunk_fall',
		frames: this.anims.generateFrameNames('player_drunk_map', {prefix: 'p1_walk', start: 10, end: 10, zeroPad: 2}),
		frameRate: 10,
		repeat: -1
	});
	// idle 
	this.anims.create({
			key: 'idle',
			frames:[
			{ key: 'idle1' },
				{ key: 'idle2' },
					{ key: 'idle3' },
						{ key: 'idle4', duration: 50 }
		],
		frameRate: 8,
		repeat: -1
	});
	
	//player trippin
	this.anims.create({
		key: 'player_trippin',
		frames:[
		{ key: 'player_trippin_fr1' },
			{ key: 'player_trippin_fr2' },
				{ key: 'player_trippin_fr3' },
					{ key: 'player_trippin_fr4', duration: 50 }
	],
	frameRate: 8,
	repeat: -1
	});
	
	//bubbles (drunk mode)
	this.anims.create({
		key: 'bubble_anims',
		frames: [
			{key: 'bubble_fr1'},
				{key: 'bubble_fr2'},
					{key: 'bubble_fr3', duration: 30}
		],
		frameRate: 10,
		repeat: -1
	});
	// player rolling pin 
	this.anims.create({
			key: 'rolling_pin_loop',
			frames:[
					{ key: 'player_weapon_fr1' },
						{ key: 'player_weapon_fr2' },
							{ key: 'player_weapon_fr3' },
								{ key: 'player_weapon_fr4'},
									{ key: 'player_weapon_fr3' },
										{ key: 'player_weapon_fr2' },
											{ key: 'player_weapon_fr1'},
												{ key: 'idle1' , duration: 50 }
		],
		frameRate: 25,
		repeat: 0
	}); 
	this.anims.create({
		key: 'rolling_pin_coffee_loop',
		frames:[
				{ key: 'player_weapon_coffee_fr1' },
					{ key: 'player_weapon_coffee_fr2' },
						{ key: 'player_weapon_coffee_fr3' },
							{ key: 'player_weapon_coffee_fr4', duration: 50 }
	],
	frameRate: 25,
	repeat: -1
	}); 
	this.anims.create({
		key: 'rolling_pin_beer_loop',
		frames:[
				{ key: 'player_weapon_drunk_fr1' },
					{ key: 'player_weapon_drunk_fr2' },
						{ key: 'player_weapon_drunk_fr3' },
							{ key: 'player_weapon_drunk_fr4', duration: 50 }
	],
	frameRate: 25,
	repeat: -1
	}); 

///////enemy animations//////

//chili peppers facing left
	this.anims.create({
		key: 'chili_loop',
		frames:[
		{ key: 'chili_fr1' },
			{ key: 'chili_fr2' },
				{ key: 'chili_fr3', duration: 25 }
	],
	frameRate: 8,
	repeat: -1
});

//meatballs facing right
	this.anims.create({
		key: 'meatball_loop',
		frames:[
		{ key: 'meatball_fr1' },
			{ key: 'meatball_fr2' },
				{ key: 'meatball_fr3', duration: 50 }
	],
	frameRate: 8,
	repeat: -1
});	
// level 1 boss
this.anims.create({
		key: 'boss_idle',
		frames:[
		{ key: 'boss1' },
			{ key: 'boss2' },
				{ key: 'boss3' },
					{ key: 'boss4' },
						{ key: 'boss5' },
							{ key: 'boss6' },
								{ key: 'boss7', duration: 3000 }
	],
	frameRate: 3000,
	repeat: -1
});
//destroy boss
   this.anims.create({
	key: 'boss_hit_anim',
	frames: [{key: 'boss8'}],
	frameRate: 0
});


this.anims.create({
	key: 'ghost_pepper_arms_anims',
	frames: [
		{key: 'ghost_pepper_arms_fr1'},
			{key: 'ghost_pepper_arms_fr2'},
				{key: 'ghost_pepper_arms_fr3'},
					{key: 'ghost_pepper_arms_fr2'},
						{key: 'ghost_pepper_arms_fr1', duration: 500}
	],
	frameRate: 8,
	repeat: -1
});
this.anims.create({
	key: 'ghost_pepper_stem_anims',
	frames: [
		{key: 'ghost_pepper_stem_fr1'},
			{key: 'ghost_pepper_stem_fr2'},
				{key: 'ghost_pepper_stem_fr3', duration: 500}
	],
	frameRate: 8,
	repeat: -1
});

	/////start scene
		this.scene.start('Preload_IntroState');
	}
 
}

/////////////////
