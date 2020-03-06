/////pastaboss game configuration

var config = {
    type: Phaser.AUTO,
    width: 800,
    height:600,
	scale: {
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH
	},
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 500},
			useTicker: true,
            debug: false
        }
    },
    //array of stages/ minigames within the game
    scene: 
        [BootState, PreloadState_lv1, Preload_IntroState, IntroState, MenuState, PlayState_lv1, LivesState_lv1, RetryState
         ]
   
};
//////////////////////
const game = new Phaser.Game(config);
//global variables
var player;
var cursors;
var macaroniPickupLayer;
var text;
var healthScore = 3;
var macaroniAvailable = 25;
var livesAvailable = 3;
var doughAvailable = 0;
var livesLeft = 3;
var livesText;
var ring;
var continue_button;
var iter = 0;
var tilesprites = [];
var tilesprites2 = [];
var tilesprites3 = [];
var sprites = [];
var introMusic; 
var musicIsPlaying;
var coffees = 0;
var beers = 0;
var shrooms = 0;
var items = 0;
var miniGame1Won = false;
var onBegin;





//custom shader pipeline
var CustomPipeline = new Phaser.Class({

    Extends: Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline,

    initialize:

    function CustomPipeline (game)
    {
        Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline.call(this, {
            game: game,
            renderer: game.renderer,
            fragShader: `
            precision mediump float;
            uniform sampler2D uMainSampler;
            uniform vec2 uResolution;
            uniform float uTime;
            varying vec2 outTexCoord;
            varying vec4 outTint;
            vec4 plasma()
            {
                vec2 pixelPos = gl_FragCoord.xy / uResolution * 20.0;
                float freq = 0.8;
                float value =
                    sin(uTime + pixelPos.x * freq) +
                    sin(uTime + pixelPos.y * freq) +
                    sin(uTime + (pixelPos.x + pixelPos.y) * freq) +
                    cos(uTime + sqrt(length(pixelPos - 0.5)) * freq * 2.0);
                return vec4(
                    cos(value),
                    sin(value),
                    sin(value * 3.16 * 8.0),
                    cos(value)
                );
            }
            void main() 
            {
                vec4 texel = texture2D(uMainSampler, outTexCoord);
                texel *= vec4(outTint.rgb * outTint.a, outTint.a);
                gl_FragColor = texel * plasma();
            }
            `
        });
    } 


});
var CustomPipeline2 = new Phaser.Class({

    Extends: Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline,

    initialize:

    function CustomPipeline2 (game)
    {
        Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline.call(this, {
            game: game,
            renderer: game.renderer,
            fragShader: [
            "precision mediump float;",

            "uniform float     time;",
            "uniform vec2      resolution;",
            "uniform sampler2D uMainSampler;",
            "varying vec2 outTexCoord;",

            "void main( void ) {",

                "vec2 uv = outTexCoord;",
                "//uv.y *= -1.0;",
                "uv.y += (sin((uv.x + (time * 0.5)) * 10.0) * 0.1) + (sin((uv.x + (time * 0.2)) * 32.0) * 0.01);",
                "vec4 texColor = texture2D(uMainSampler, uv);",
                "gl_FragColor = texColor;",

            "}"
            ].join('\n')
        });
    } 

});
var CustomPipeline3 = new Phaser.Class({

    Extends: Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline,

    initialize:

    function CustomPipeline3 (game)
    {
        Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline.call(this, {
            game: game,
            renderer: game.renderer,
            fragShader: `
            precision mediump float;

            uniform sampler2D uMainSampler;
            uniform float time;

            varying vec2 outTexCoord;
            varying vec4 outTint;

            #define SPEED 10.0

            void main(void)
            {
                float c = cos(time * SPEED);
                float s = sin(time * SPEED);

                mat4 hueRotation = mat4(0.299, 0.587, 0.114, 0.0, 0.299, 0.587, 0.114, 0.0, 0.299, 0.587, 0.114, 0.0, 0.0, 0.0, 0.0, 1.0) + mat4(0.701, -0.587, -0.114, 0.0, -0.299, 0.413, -0.114, 0.0, -0.300, -0.588, 0.886, 0.0, 0.0, 0.0, 0.0, 0.0) * c + mat4(0.168, 0.330, -0.497, 0.0, -0.328, 0.035, 0.292, 0.0, 1.250, -1.050, -0.203, 0.0, 0.0, 0.0, 0.0, 0.0) * s;

                vec4 pixel = texture2D(uMainSampler, outTexCoord);

                gl_FragColor = pixel * hueRotation;
            }   
            `
        });
    } 

});
var CustomPipeline4 = new Phaser.Class({

    Extends: Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline,

    initialize:

    function CustomPipeline4 (game)
    {
        Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline.call(this, {
            game: game,
            renderer: game.renderer,
            fragShader: [
            "precision mediump float;",

            "uniform float     time;",
            "uniform vec2      resolution;",
            "uniform sampler2D uMainSampler;",
            "varying vec2 outTexCoord;",

            "void main( void ) {",

                "vec2 uv = outTexCoord;",
                "//uv.y *= -1.0;",
                "uv.y += (sin((uv.x + (time * 0.5)) * 10.0) * 0.1) + (sin((uv.x + (time * 0.2)) * 32.0) * 0.01);",
                "vec4 texColor = texture2D(uMainSampler, uv);",
                "gl_FragColor = texColor;",

            "}"
            ].join('\n')
        });
    } 

});

