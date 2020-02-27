// Intro State

class 
	IntroState extends Phaser.Scene{	
	constructor(){
		super('IntroState');
	}

	create(){
	
		//fade in
		this.cameras.main.fadeIn(2000);
		//music
		musicIsPlaying = true;
		this.introMusic = this.sound.add('intro_track');	
		this.introMusic.play();

/////////////////////////////////////////////////////////////////////////////////////////////////////
		//background
		this.bkgnd = this.add.image(500, 200, 'pixel').setScale(270);
		//particles
		for (var i = 0; i < 300; i++)
			{	
				var x = Phaser.Math.Between(-64, 800);
				var y = Phaser.Math.Between(-64, 600);
				var particleImg = this.add.image(x, y, 'spaghentity_fr1');
				particleImg.setBlendMode(Phaser.BlendModes.SCREEN).setScale(0.3);
				sprites.push({ s: particleImg, r: 2 + Math.random() * 6 });	
			}
		//rectange mask
		this.rect = new Phaser.Geom.Rectangle(0, 0, 1800, 1800);
		this.graphics = this.add.graphics({fillStyle: {color: 0x000000}});
		this.graphics.fillRectShape(this.rect).setAlpha(0);
		//pastaboss /fsm image
		this.fsmPB = this.add.image(400, 300, 'fsm_pb').setAlpha(0);
		//images scrolling and fading in/out
		this.img1 = this.add.image(300, 400, 'img1').setScale(0.5).setAlpha(0);
		this.img2 = this.add.image(300, 400, 'img2').setScale(0.5).setAlpha(0);
		this.img3 = this.add.image(300, 400, 'img3').setScale(0.5).setAlpha(0);
		this.img4 = this.add.image(300, 400, 'img4').setScale(0.5).setAlpha(0);
		//idling boss with eyes blinking, giving premise to the game
		this.spaghentity = this.add.sprite(400, 450, 'spaghentity_fr1').play('spaghentity_anims');
		this.pastafather = {
			body: this.add.sprite(400, 350, 'sl_blinking_fr1').play('sl_blink_anims', true).setAlpha(0),
			//hands animating guestures
			hands: this.add.sprite(400, 350, 'hands_intro_fr1').play('hand_guesture_anims', true).setAlpha(0)
		}
		//plot text block 1
		this.plotText1 = {
			block1: this.add.text(280, 50, "In an alternate dimension", {fill: '#ffff00', font: '25px Bangers'}).setStroke('#ff0000', 4).setShadow(2, 2, '#000000', true, false).setAlpha(0),
			block2: this.add.text(200, 100, "somewhere in the endless loop of time and space...", {fill: '#ffff00', font: '25px Bangers'}).setStroke('#ff0000', 4).setShadow(2, 2, '#000000', true, false).setAlpha(0), 
			block3: this.add.text(130, 150, "a flying spaghetti monster held together the framework", {fill: '#ffff00', font: '25px Bangers'}).setStroke('#ff0000', 4).setShadow(2, 2, '#000000', true, false).setAlpha(0),
			block4: this.add.text(220, 200, "of the universe, and all things saucey.", {fill: '#ffff00', font: '25px Bangers'}).setStroke('#ff0000', 4).setShadow(2, 2, '#000000', true, false).setAlpha(0),
			block5: this.add.text(320, 250, "until one day...", {fill: '#ffff00', font: '25px Bangers'}).setStroke('#ff0000', 4).setShadow(2, 2, '#000000', true, false).setAlpha(0),
			block6: this.add.text(260, 300, "a dark force came to light.", {fill: '#ffff00', font: '25px Bangers'}).setStroke('#ff0000', 4).setShadow(2, 2, '#000000', true, false).setAlpha(0)
		}
		//plot text block 2
		this.plotText2 = {
			block1: this.add.text(300, 50, "Once a noble cleric", {fill: '#ffff00', font: '25px Bangers'}).setStroke('#ff0000', 4).setShadow(2, 2, '#000000', true, false).setAlpha(0),
			block2: this.add.text(150, 100, "preaching the messages of the flying spaghetti monster,", {fill: '#ffff00', font: '25px Bangers'}).setStroke('#ff0000', 4).setShadow(2, 2, '#000000', true, false).setAlpha(0), 
			block3: this.add.text(280, 150, "he grew too powerful...", {fill: '#ffff00', font: '25px Bangers'}).setStroke('#ff0000', 4).setShadow(2, 2, '#000000', true, false).setAlpha(0),
			block4: this.add.text(250, 200, "The secret was in the sauce.", {fill: '#ffff00', font: '25px Bangers'}).setStroke('#ff0000', 4).setShadow(2, 2, '#000000', true, false).setAlpha(0),
			block5: this.add.text(100, 250, "A sauce so delicious, not even the purest of pastafarians could resist.", {fill: '#ffff00', font: '25px Bangers'}).setStroke('#ff0000', 4).setShadow(2, 2, '#000000', true, false).setAlpha(0),
			block6: this.add.text(140, 300, "In a world full of flavor, a good sauce is truly the boss.", {fill: '#ffff00', font: '25px Bangers'}).setStroke('#ff0000', 4).setShadow(2, 2, '#000000', true, false).setAlpha(0),
			block7: this.add.text(200, 350, "The sauce could be used for good, or evil...", {fill: '#ffff00', font: '25px Bangers'}).setStroke('#ff0000', 4).setShadow(2, 2, '#000000', true, false).setAlpha(0)
		}
		//plot text block 3
		this.content = [
			`The food grade realm became unstable, with the Supreme Leader
			growing ever stronger. In the wake of seizure, of thine noodly appendages,
			the flying spaghetti monster was reduced to fragments, or "Spaghentities."
			Holy pirates, succumbed to the temptation of unlimited beer in return for
			achieving many twisted wishes. Corruption prevailed, and chaos ensued. `
		];
		this.content2 = [
			`All food groups were at risk of harsh consequences for denying pastafariansim; especially fish,
			due to their highly beneficial omega-3 fatty acids and delicate texture.
			After brainwashing the holy pirates into joining him on this inter-dimensional take over, 
			he turned on his only son, and condemned him into a form more suitable for his malicious plans.
			`
		];
		this.content3 = [
			`A most spicy sauce, capable of transforming a normally	bland carbohydrate 
			based lifeforms into a full flavored entity. The Supreme Leader knew this, combining core
			 principles of his idealist agenda, a mutant belligerent was born.Pursuit to take over the 
			 food grade realm is now in full effect, further extending to a new dimension
			for all the universe to bear with...Pastaboss, the spaghetti teddy!`
		];
		this.plotText3 = this.add.text(50, 10, this.content, {font: "21px Bangers", fill: "#ffff00", lineSpacing: 10, letterSpacing: 4}).setStroke('#ff0000', 4).setAlpha(0);
		this.plotText4 = this.add.text(20, 10, this.content2, {font: "21px Bangers", fill: "#ffff00", lineSpacing: 10, letterSpacing: 4}).setStroke('#ff0000', 4).setAlpha(0);
		this.plotText5 = this.add.text(50, 10, this.content3, {font: "21px Bangers", fill: "#ffff00", lineSpacing: 10, letterSpacing: 4}).setStroke('#ff0000', 4).setAlpha(0);
		//timers for text block 1
		this.time.addEvent({
			delay: 100,
			callback: onEvent,
			callbackScope: this
		});
		//event 1
		function onEvent(){
			this.tweens.add({
				targets: this.plotText1.block1,
				alpha: { value: 1, duration: 5000, ease:'Power1' }
			}, this);
		}
		this.time.addEvent({
			delay: 2050,
			callback: onEvent2,
			callbackScope: this
		});
		////event 2
		function onEvent2(){			
			this.tweens.add({
				targets: this.plotText1.block2,
				alpha: { value: 1, duration: 5000, ease:'Power1' }
			}, this);
		}
		this.time.addEvent({
			delay: 4000,
			callback: onEvent3,
			callbackScope: this
		});
		////event 3
		function onEvent3(){
			this.tweens.add({
				targets: this.plotText1.block3,
				alpha: { value: 1, duration: 5000, ease:'Power1' }
			}, this);
		}
		this.time.addEvent({
			delay: 6000,
			callback: onEvent4,
			callbackScope: this
		});
		////event 4
		function onEvent4(){
			this.tweens.add({
				targets: this.plotText1.block4,
				alpha: { value: 1, duration: 5000, ease:'Power1' }
			}, this);
		}
		this.time.addEvent({
			delay: 8000,
			callback: onEvent5,
			callbackScope: this
		});
		////event 5
		function onEvent5(){
			this.tweens.add({
				targets: this.plotText1.block5,
				alpha: { value: 1, duration: 5000, ease:'Power1' }
			}, this);
		}
		this.time.addEvent({
			delay: 9000,
			callback: onEvent6,
			callbackScope: this
		});
		////event 6
		function onEvent6(){
			this.tweens.add({
				targets: this.plotText1.block6,
				alpha: { value: 1, duration: 5000, ease:'Power1' }
			}, this);
		}
		///////////////////////////////////////////////////////////
		////timer for pastafather idle
		this.time.addEvent({
			delay: 11000,
			callback: onEvent7,
			callbackScope: this
		});
		////////////////////////// timer text block 1
		////event 7
		function onEvent7(){
			this.tweens.add({
				targets: this.plotText1.block1,
				alpha: { value: 0, duration: 3000, ease:'Power1' }
			}, this);
			this.tweens.add({
				targets: this.plotText1.block2,
				alpha: { value: 0, duration: 3000, ease:'Power1' }
			}, this);
			this.tweens.add({
				targets: this.plotText1.block3,
				alpha: { value: 0, duration: 3000, ease:'Power1' }
			}, this);
			this.tweens.add({
				targets: this.plotText1.block4,
				alpha: { value: 0, duration: 3000, ease:'Power1' }
			}, this);
			this.tweens.add({
				targets: this.plotText1.block5,
				alpha: { value: 0, duration: 3000, ease:'Power1' }
			}, this);
			this.tweens.add({
				targets: this.plotText1.block6,
				alpha: { value: 0, duration: 3000, ease:'Power1'},
				duration: 3000,
				onComplete: ()=>{
					this.plotText1.block6.destroy();
				} 
			}, this);
			//spaghentity
			this.tweens.add({
				targets: this.spaghentity,
				alpha: { value: 0, duration: 5000, ease:'Power1' }
			}, this);
			//pastafather
			this.tweens.add({
				targets: this.pastafather.body,
				alpha: { value: 1, duration: 5000, ease:'Power1' }
			}, this);
			this.tweens.add({
				targets: this.pastafather.hands,
				alpha: { value: 1, duration: 3000, ease:'Power1' }
			}, this);	
		}
		//timer for pastafathers hands
		this.time.addEvent({
			delay: 15000,
			callback: onEvent8,
			callbackScope: this
		});
		////event 8
		function onEvent8(){
			 this.pastafather.hands.setTexture('hands_jar_fr1').play('sl_jar_anims');
			 this.time.addEvent({
				delay: 750,
				callback: onEvent9,
				callbackScope: this
			});
		}
		////event 9
		function onEvent9(){
			this.spaghentity = this.add.sprite(400, 350, 'spaghentity_jar_fr1').play('spaghentity_jar_anims');
		}
		/////////////////////////////////timer for plot text block 2
		this.time.addEvent({
			delay: 17000,
			callback: onEvent10,
			callbackScope: this
		});
		////event 10
		function onEvent10(){
			this.tweens.add({
				targets: this.plotText2.block1,
				alpha: { value: 1, duration: 3000, ease:'Power1' }
			}, this);
			this.tweens.add({
				targets: this.plotText2.block2,
				alpha: { value: 1, duration: 3000, ease:'Power1' }
			}, this);
			this.tweens.add({
				targets: this.plotText2.block3,
				alpha: { value: 1, duration: 3000, ease:'Power1' }
			}, this);
			this.tweens.add({
				targets: this.plotText2.block4,
				alpha: { value: 1, duration: 3000, ease:'Power1' }
			}, this);
			this.tweens.add({
				targets: this.plotText2.block5,
				alpha: { value: 1, duration: 3000, ease:'Power1' }
			}, this);
			this.tweens.add({
				targets: this.plotText2.block6,
				alpha: { value: 1, duration: 3000, ease:'Power1' }
			}, this);
			this.tweens.add({
				targets: this.plotText2.block7,
				alpha: { value: 1, duration: 3000, ease:'Power1' }
			}, this);
			this.tweens.add({
				targets: this.pastafather.body,
				alpha: { value: 0, duration: 3000, ease:'Power1' }
			}, this);
			this.tweens.add({
				targets: this.pastafather.hands,
				alpha: { value: 0, duration: 3000, ease:'Power1' }
			}, this);
			this.tweens.add({
				targets: this.spaghentity,
				alpha: { value: 0, duration: 3000, ease:'Power1' }
			}, this);
		}
		//images fading in and out
		this.time.addEvent({
			delay: 24000,
			callback: onEvent11,
			callbackScope: this
		});
		////event 11
		function onEvent11(){
			this.tweens.add({
				targets: this.img1,
				x: 1400,
				duration: 60000,
				ease: 'Linear'
			}, this);
			this.tweens.add({
				targets: this.img1,
				alpha: {value: 1, duration: 3000, ease: 'Power1'}
			}, this);
			//fade out plot text block 2
			this.tweens.add({
				targets: this.plotText2.block1,
				alpha: {value: 0, duration: 3000, ease: 'Power1'}
			}, this);
			this.tweens.add({
				targets: this.plotText2.block2,
				alpha: {value: 0, duration: 3000, ease: 'Power1'}
			}, this);
			this.tweens.add({
				targets: this.plotText2.block3,
				alpha: {value: 0, duration: 3000, ease: 'Power1'}
			}, this);
			this.tweens.add({
				targets: this.plotText2.block4,
				alpha: {value: 0, duration: 3000, ease: 'Power1'}
			}, this);
			this.tweens.add({
				targets: this.plotText2.block5,
				alpha: {value: 0, duration: 3000, ease: 'Power1'}
			}, this);
			this.tweens.add({
				targets: this.plotText2.block6,
				alpha: {value: 0, duration: 3000, ease: 'Power1'}
			}, this);
			this.tweens.add({
				targets: this.plotText2.block7,
				alpha: { value: 0, duration: 3000, ease:'Power1' }
			}, this);
		}
		this.time.addEvent({
			delay: 25000,
			callback: onEvent12,
			callbackScope: this
		});
		////event 12
		function onEvent12(){
			this.tweens.add({
				targets: this.graphics,
				alpha: {value: 1, duration: 3000, ease: 'Power1'},
				duration: 3000
			}, this);
			this.tweens.add({
				targets: this.plotText3,
				alpha: {value: 1, duration: 3000, ease: 'Power1'},
				duration: 3000
			}, this);
			this.tweens.add({
				targets: this.bkgnd,
				alpha: {value: 0, duration: 3000, ease: 'Power1'},
				duration: 3000
			}, this);
		}
						//image 2 
		this.time.addEvent({
			delay: 35000,
			callback: onEvent13,
			callbackScope: this
		});
		////event 13
		function onEvent13(){
						//image 2 moving
			this.tweens.add({
				targets: this.img2,
				x: 1400,
				duration: 60000,
				ease: 'Linear'
			}, this);
			this.tweens.add({
				targets: this.img2,
				alpha: {value: 1, duration: 6000, ease: 'Power1'},
				duration: 3000
			}, this);
			this.tweens.add({
				targets: this.plotText3,
				alpha: {value: 0, duration: 3000, ease: 'Power1'},
				duration: 3000
			}, this);
			this.tweens.add({
				targets: this.plotText4,
				alpha: {value: 1, duration: 3000, ease: 'Power1'},
				duration: 3000
			}, this);
			this.img1.destroy();
		}
		//image 3
			this.time.addEvent({
				delay: 43000,
				callback: onEvent14,
				callbackScope: this
			});
			////event 14
			function onEvent14(){
				this.tweens.add({
					targets: this.img3,
					x: 1400,
					duration: 60000,
					ease: 'Linear'
				}, this);
				//img 2 disappear
				this.tweens.add({
					targets: this.img2,
					alpha: {value: 0, duration: 4000, ease: 'Power1'},
					duration: 3000
				}, this);
				//img 3 appear
				this.tweens.add({
					targets: this.img3,
					alpha: {value: 1, duration: 6000, ease: 'Power1'}
				}, this);
			}
				//event 15
				this.time.addEvent({
					delay: 44000,
					callback: onEvent15,
					callbackScope: this
				});
				//plot text 5
				function onEvent15(){
					this.tweens.add({
						targets: this.plotText5,
						alpha: {value: 1, duration: 3000, ease: 'Power1'}
					}, this);
					this.tweens.add({
						targets: this.plotText4,
						alpha: {value: 0, duration: 3000, ease: 'Power1'}
					}, this);
				}
			//img 4 timer
			this.time.addEvent({
				delay: 49000,
				callback: onEvent16,
				callbackScope: this
			});
			////event 16
			function onEvent16(){
				this.tweens.add({
					targets: this.img4,
					x: 1400,
					duration: 60000,
					ease: 'Linear'
				}, this);
					//img 3 disappear
					this.tweens.add({
						targets: this.img3,
						alpha: {value: 0, duration: 4000, ease: 'Power1'},
						duration: 3000
					}, this);
					//img 4 appear
					this.tweens.add({
						targets: this.img4,
						alpha: {value: 1, duration: 6000, ease: 'Power1'}
					}, this);
			}
			////event 17
				this.time.addEvent({
					delay: 52000,
					callback: onEvent17,
					callbackScope: this
				});
				function onEvent17(){
				//fsm image
				this.tweens.add({
					targets: this.fsmPB,
					alpha: {value: 1, duration: 1000, ease: 'Power1'}
				}, this);
				this.tweens.add({
					targets: this.plotText5,
					alpha: {value: 0, duration: 4000, ease: 'Power1'}
				}, this);
				this.img4.destroy();
			}
			////event 18
			this.time.addEvent({
				delay: 54000,
				callback: onEvent18,
				callbackScope: this
			});
			function onEvent18(){
			this.tweens.add({
					targets: this.fsmPB,
					alpha: {value: 0, duration: 1000, ease: 'Power1'}
				}, this);
				this.plotText3.destroy();
				this.fsmPB.destroy();
				this.blocks = this.add.group({ key:'player', repeat: 300 });
				Phaser.Actions.GridAlign(this.blocks.getChildren(), {
					width: 16,
					cellWidth: 50, cellHeight: 50, x: 15, y: 0
				});
				this.pbProfile = this.add.image(400, 300, 'pb_profile').setAlpha(0);
				this.introEndText = this.add.text(230, 300, 'Spaghet about it!', {fill: '#ff0000', font: '60px Bangers'}).setStroke('#ffff00', 4).setAlpha(0);
				this.tweens.add({
					targets: this.pbProfile,
					alpha: {value: 1, duration: 500, ease: 'Power1'}
				}, this);
				this.tweens.add({
					targets: this.introEndText,
					alpha: {value: 1, duration: 2000, ease: 'Power1'}
				}, this);
			}	
		//event 19
			this.time.addEvent({
				delay: 55000,
				callback: onEvent19,
				callbackScope: this
			});
			function onEvent19(){
				this.tweens.add({
					targets: this.pbProfile,
					alpha: {value: 0, duration: 3000, ease: 'Power1'}
				}, this);
				this.tweens.add({
					targets: this.introEndText,
					alpha: {value: 0, duration: 3000, ease: 'Power1'}
				}, this);
			}
		//event 20
			this.time.addEvent({
				delay: 56000,
				callback: onEvent20,
				callbackScope: this
			});
			function onEvent20(){
				this.scene.stop('IntroState');
				this.scene.start('MenuState');
			}
	//////////////////////////////////////////////////////////////////////////////////////	
		//user inputs to skip the intro animations
		this.input.keyboard.on('keydown', ()=>{
			this.scene.start('MenuState');
		});
		this.input.on('pointerdown', ()=>{
			this.scene.start('MenuState');
		});
	
	}//end create method
	
	update(){
		for (var i = 0; i < sprites.length; i++)
		{
			var sprite = sprites[i].s;
	
			sprite.y -= sprites[i].r;
	
			if (sprite.y < -256)
			{
				sprite.y = 700;
			}
		}
	}//end update method
}