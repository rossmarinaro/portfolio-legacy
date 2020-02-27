// Preload_IntroState
class Preload_IntroState extends Phaser.Scene{	
	constructor(){
		super('Preload_IntroState');
	}
	preload(){
		
		//text
		this.loadingTextBase = this.add.text(300, 300, "Loading...", {font: "35px Digitizer", fill: '#00FF2A'}).setStroke("#ff0000", 4);
		this.loadingText = this.add.text(300, 300, "Loading...", {font: "35px Digitizer", fill: '#ffff00'}).setStroke("#ff0000", 4);
			//tween alpha loading pulse
		this.pulseTween = this.tweens.add({
				targets: this.loadingText,
				alpha: {value: 0.2, duration: 1000, ease: 'Power1'},
				yoyo: true,
				repeat: -1
			});
		this.startText = this.add.text(320, 300, "Play", {font: "50px Digitizer", fill: '#ffff00'}).setStroke("#ff0000", 4).setAlpha(0);
		this.load.image('pixel', 'assets/backgrounds/pixel.png');
		// "Bangers" font
		this.load.spritesheet('font', 'fonts/bangers-regular-webfont.woff', {frameWidth: 32, frameHeight: 25});
		//supreme leader
		this.load.image('sl_blinking_fr1', 'assets/enemies/bosses/supreme_leader/idle/1.png');
		this.load.image('sl_blinking_fr2', 'assets/enemies/bosses/supreme_leader/idle/2.png');
		this.load.image('sl_blinking_fr3', 'assets/enemies/bosses/supreme_leader/idle/3.png');
		this.load.image('sl_blinking_fr4', 'assets/enemies/bosses/supreme_leader/idle/4.png');
		//hand guestures
		this.load.image('hands_intro_fr1', 'assets/enemies/bosses/supreme_leader/hands/1.png');
		this.load.image('hands_intro_fr2', 'assets/enemies/bosses/supreme_leader/hands/2.png');
		this.load.image('hands_intro_fr3', 'assets/enemies/bosses/supreme_leader/hands/3.png');
		this.load.image('hands_intro_fr4', 'assets/enemies/bosses/supreme_leader/hands/4.png');
		this.load.image('hands_intro_fr5', 'assets/enemies/bosses/supreme_leader/hands/5.png');
		this.load.image('hands_intro_fr6', 'assets/enemies/bosses/supreme_leader/hands/6.png');
		//hand pulling out jar
		this.load.image('hands_jar_fr1', 'assets/enemies/bosses/supreme_leader/hands/pulljar/1.png');
		this.load.image('hands_jar_fr2', 'assets/enemies/bosses/supreme_leader/hands/pulljar/2.png');
		this.load.image('hands_jar_fr3', 'assets/enemies/bosses/supreme_leader/hands/pulljar/3.png');
		this.load.image('hands_jar_fr4', 'assets/enemies/bosses/supreme_leader/hands/pulljar/4.png');
		this.load.image('hands_jar_fr5', 'assets/enemies/bosses/supreme_leader/hands/pulljar/5.png');
		this.load.image('hands_jar_fr6', 'assets/enemies/bosses/supreme_leader/hands/pulljar/6.png');
		this.load.image('hands_jar_fr7', 'assets/enemies/bosses/supreme_leader/hands/pulljar/7.png');
		//spaghentity jar
		this.load.image('spaghentity_jar_fr1', 'assets/items/spaghentity_jar/1.png');
		this.load.image('spaghentity_jar_fr2', 'assets/items/spaghentity_jar/2.png');
		this.load.image('spaghentity_jar_fr3', 'assets/items/spaghentity_jar/3.png');
		//spaghentity
		this.load.image('spaghentity_fr1', 'assets/items/spaghentity/1.png');
		this.load.image('spaghentity_fr2', 'assets/items/spaghentity/2.png');
		this.load.image('spaghentity_fr3', 'assets/items/spaghentity/3.png');
		//images
		this.load.image('roe', 'assets/images/intro_roe.png');
		this.load.image('img1', 'assets/images/slideshow/img1.png');
		this.load.image('img2', 'assets/images/slideshow/img2.png');
		this.load.image('img3', 'assets/images/slideshow/img3.png');
		this.load.image('img4', 'assets/images/slideshow/img4.png');
		this.load.image('fsm_pb', 'assets/images/intro_fsm_pb.png');
		this.load.image('pb_profile', 'assets/images/pb_profile.png');
		//audio, music for the intro
		this.load.audio('intro_track', 'assets/audio/music/introscene.mp3');
		//animated pastaboss bass
		this.load.image('pbb_fr1', 'assets/player/batch/pastabossbass_00001.png');
		this.load.image('pbb_fr2', 'assets/player/batch/pastabossbass_00002.png');
		this.load.image('pbb_fr3', 'assets/player/batch/pastabossbass_00003.png');
		this.load.image('pbb_fr4', 'assets/player/batch/pastabossbass_00004.png');
		this.load.image('pbb_fr5', 'assets/player/batch/pastabossbass_00005.png');
		this.load.image('pbb_fr6', 'assets/player/batch/pastabossbass_00006.png');
		this.load.image('pbb_fr7', 'assets/player/batch/pastabossbass_00007.png');
		this.load.image('pbb_fr8', 'assets/player/batch/pastabossbass_00008.png');
		this.load.image('pbb_fr9', 'assets/player/batch/pastabossbass_00009.png');
		this.load.image('pbb_fr10', 'assets/player/batch/pastabossbass_00010.png');
		this.load.image('pbb_fr11', 'assets/player/batch/pastabossbass_00011.png');
		this.load.image('pbb_fr12', 'assets/player/batch/pastabossbass_00012.png');
		
	}
	create(){


////animations
	//supreme leader idle anims
	this.anims.create({
		key: 'sl_blink_anims',
		frames:[
		{ key: 'sl_blinking_fr1' }, 
			{ key: 'sl_blinking_fr2' },
				{ key: 'sl_blinking_fr3' },
					{ key: 'sl_blinking_fr4' },
						{ key: 'sl_blinking_fr3' },
							{ key: 'sl_blinking_fr2' },
								{ key: 'sl_blinking_fr1', duration: 3000 }
				
	],
	frameRate: 20,
	repeat: -1
});

//supreme leader hand guestures
this.anims.create({
		key: 'hand_guesture_anims',
		frames:[
		{ key: 'hands_intro_fr1' }, 
			{ key: 'hands_intro_fr2' },
				{ key: 'hands_intro_fr3' },
					{ key: 'hands_intro_fr4' },
						{ key: 'hands_intro_fr5' },
							{ key: 'hands_intro_fr6' }, // idles for a minute before pulling out jar
							{ key: 'hands_intro_fr6' },
							{ key: 'hands_intro_fr6' },
							{ key: 'hands_intro_fr6' },
							{ key: 'hands_intro_fr6' },
							{ key: 'hands_intro_fr6' },
							{ key: 'hands_intro_fr6' },
							{ key: 'hands_intro_fr6' },
							{ key: 'hands_intro_fr6' },
							{ key: 'hands_intro_fr6' },
								{ key: 'hands_intro_fr5' },
									{ key: 'hands_intro_fr4' },
										{ key: 'hands_intro_fr3' },
											{ key: 'hands_intro_fr2' },
												{ key: 'hands_intro_fr1' , duration: 3000 }
				
	],
	frameRate: 6,
	repeat: 0
});
	//spaghentity jar appears after the pastafather pulls it out
	this.anims.create({
		key: 'spaghentity_jar_anims',
		frames: [
			{key: 'spaghentity_jar_fr1'},
				{key: 'spaghentity_jar_fr2'},
					{key: 'spaghentity_jar_fr3'},
						{key: 'spaghentity_jar_fr2'},
							{key: 'spaghentity_jar_fr1', duration: 50}
		],
		frameRate: 8,
		repeat: -1
	});
	//supreme leader pulling out jar of spaghentity
	this.anims.create({
		key: 'sl_jar_anims',
		frames: [
			{key: 'hands_jar_fr1'},
				{key: 'hands_jar_fr2'},
					{key: 'hands_jar_fr3'},
						{key: 'hands_jar_fr4'},
							{key: 'hands_jar_fr5'},
								{key: 'hands_jar_fr6'},
									{key: 'hands_jar_fr7', duration: 3000}
		],
		frameRate: 8,
		repeat: 0
	});
		//spaghentity 
		this.anims.create({
			key: 'spaghentity_anims',
			frames: [
				{key: 'spaghentity_fr1'},
					{key: 'spaghentity_fr2'},
						{key: 'spaghentity_fr3'},
							{key: 'spaghentity_fr2'},
								{key: 'spaghentity_fr1', duration: 50}
			],
			frameRate: 8,
			repeat: -1
		});

///////////////////////////////////////////////////////////
	//start scene
		//pulse tween stop
		this.pulseTween.stop();	
		//start intro preload
		this.tweens.add({
			targets: this.loadingTextBase,
			alpha: {value: 0, duration: 2000, ease: 'Power1'}
		});
		this.tweens.add({
			targets: this.loadingText,
			alpha: {value: 0, duration: 2000, ease: 'Power1'}
		});
		this.tweens.add({
			targets: this.startText,
			alpha: {value: 1, duration: 2000, ease: 'Power1'}
		});
		//initiate state
		this.input.once('pointerdown', ()=>{
			this.ring = this.sound.add('ring');
			this.ring.play();
			this.scene.start('IntroState');
		});
		this.input.keyboard.once('keydown', ()=>{
			this.ring = this.sound.add('ring');
			this.ring.play();
			this.scene.start('IntroState');
		});
	}
}