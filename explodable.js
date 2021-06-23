/*
Rowbottom Jan 2021 Added to allow something to allow children either appear or disappear based on mouseover
Rowbottom Jan 23 2021 Changes bind mediaPanel and background their click event to this reset function 
*/

AFRAME.registerComponent('focusable', {
  
  //similar to a mixin but more optimized
  init: function() {
    var el = this.el;//reference to the entity
    var scene = el.sceneEl; //reference to the scene of the entity
    const primitive = el.getAttribute('geometry').primitive;//reference to the geometry of the entity
    log('primitive:'+primitive);
    var frame = addFrame(scene, el, primitive);//this is a frame around the entity, a function is called to add an entity and then return its reference
    //var frame = el.children[0];//querySelector('.poi-background');
    var background = scene.querySelector('#background');//the background of the media panel
    var mediaPanel = scene.querySelector('#mediaPanel');//reference to the media panel
    var videoDom = {};//

    el.setAttribute('look-at',"#camera");//make the objects point at the user---glitchy
    //log('background: '+ background);

    //bind global this events to this instance
    //this.onClick = this.onClick.bind(this);
    //this.onMouseEnter = this.onMouseEnter.bind(this);
    //this.onMouseLeave = this.onMouseLeave.bind(this);
    //bind the click function for the media panel to reset function here
   // this.reset = this.reset.bind(this);

    //add a click event
    el.addEventListener('stateadded', (event) =>{
      log('state added'+event.detail);
      if (el.is('clicked')){
        //make the background and media panel visible
        background.setAttribute('visible', true);
        mediaPanel.setAttribute('visible', true);
        //get the video that matches to the entity
        var video = el.getAttribute('video-id');
        log('stateAdded video : '+video);
        mediaPanel.setAttribute('material', {
          'src': '#'+video
        });
        //give the video reference to the videoDom
        videoDom = $('#'+video).get(0);
        
        log('stateAdded video : '+video);
        //videoDom.load();
        //play the video
        videoDom.play();
        //fetchVideoAndPlay(videoDom, '#'+video);
       // mediaPanel.play();
      }
    });

    //when we remove a state from the entity
    el.addEventListener('stateremoved', (event) =>{
      log('state removed'+event.detail);
      if (!el.is('clicked')){
        background.setAttribute('visible', false);
        mediaPanel.setAttribute('visible', false);
        if (!videoDom.paused){
          if (videoDom){
            try{
              videoDom.pause();
              videoDom.load();//added to replay videos on click off  
            }
            catch(e){
              log('got error on videoDom.pause or load due to the video source not being opened yet');
            }
            
          }
          
        }
        
      }
    });


    //mediaPanel.addEventListener('click', this.reset(mediaPanel));


    //event listener for when the mouse passes over this
    el.addEventListener('mouseenter', (e) => {
      //make is slightly larger
      el.setAttribute('scale', '1.2 1.2 1.2');
      frame.setAttribute('visible', true);
      log("mouse entered poi");
      //logProperties(el.children[0]);
      //el.play();
    });


    el.addEventListener('mouseleave', (e) => {
      el.setAttribute('scale', '1. 1. 1.');
      frame.setAttribute('visible', false);
      el.removeState('clicked');
      log("mouse left poi");//el.children[0].setAttribute('visible', 'false');
      el.pause();
    });

    el.addEventListener('click', (event) => {
      //el = event.target; DONT NEED
      var clickState = el.is('clicked');
      
      log(el.is('clicked'));
      toggleState(el, 'clicked');
 
    });
    /*
----------------------------------------------------------
    //bind all the events to the ones for this object
    this.onClick = this.onClick.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.reset = this.reset.bind(this);

    //add eventlisteners for the poi and background
    backgroundEl.addEventListener('click', this.reset);
    for (var i = 0; i < poiEls.length; ++i) {
      poiEls[i].addEventListener('mouseenter', this.onMouseEnter);
      poiEls[i].addEventListener('mouseleave', this.onMouseLeave);
      poiEls[i].addEventListener('click', this.onClick);
    }
  },--------------------------------------




      }*/
      

    
  },

  //called when ever an attribute is changed via setAttribute
  update: function(event){
    log('updated'+event.data);
  },

  //similar to draw function or update in Unity
  tick: function(){
    //var data = this.data;
    //var el = this.el;
   // log (el.getAttribute('scale').y += 0.1);
  },

  //like tick but after the scene rendered. 
  tock: function(){

  },

  //called after init and whenever it is restarted
  play: function(){
    log("playing");
    //log("isPlaying: " + el.isPlaying);
  },

  //called whenever the entity is paused
  pause: function(){
    log('paused');
      //  log("isPlaying: " + el.isPlaying);
  },

  remove: function(){
    log('paused');
  },

  reset: function(_media){
   /* log('resetting media'+_media);
    var el = this.el;
    if(el.is('clicked')){
      toggleState(el, 'clicked');
      _media.children[0].setAttribute('visible', false);
      _media.setAttribute('visible', false);
    }*/
  },

});

/*Rowbottom Jan 23 2021 Created to allow poi to play videos by adding them as a component to the mediaPanel entity

TODO:
Play video
PLay video and pause on click
Dblclick to dismiss 
Arrow keys to control video
load up videos from array and match with array of poi using indices to coordinate the playing
Ensure proper clean up of resources
Ensure mobile plays correctly
*/
AFRAME.registerComponent('watchable', {
  
  init: function() {
    var el = this.el;
    var scene = el.sceneEl;
    //var mediaPanel = scene.querySelector('#mediaPanel');
    var videos = scene.querySelector('video');
    logArray(videos, 'src');
    var videoSource = el.getAttribute('src');
    var video = document.querySelector('#'+videoSource);
   // var videoDom = video.get(0);

    el.addEventListener('stateadded', (event) =>{
      log('state added'+event.detail);

    });

    el.addEventListener('stateremoved', (event) =>{
      log('state removed'+event.detail);
    });
   
   //This could be the way to clean , move responsibility to the POI
    //mediaPanel.addEventListener('click', this.reset(mediaPanel));

   //not needed as the mouse can't leave or enter
    el.addEventListener('mouseenter', (event) => {
    });


    el.addEventListener('mouseleave', (event) => {
      
    });

   /* el.addEventListener('click', (event) => {
      //el = event.target; DONT NEED
      var clickState = el.is('clicked');
      log(el.is('clicked'));
      toggleState(el, 'clicked');
 
    });*/
       
  },

  //called when ever an attribute is changed via setAttribute
  update: function(event){
    log('updated'+event.data);
  },

  //similar to draw function or update in Unity
  tick: function(){
    //var data = this.data;
    //var el = this.el;
   // log (el.getAttribute('scale').y += 0.1);
  },

  //like tick but after the scene rendered. 
  tock: function(){

  },

  //called after init and whenever it is restarted
  play: function(){
    log("watchable playing");
    
    //log("isPlaying: " + el.isPlaying);
  },

  //called whenever the entity is paused
  pause: function(){
    log('watchable paused');
      //  log("isPlaying: " + el.isPlaying);
  },

  remove: function(){
    log('removed');
  },

  reset: function(){
   /* log('resetting media'+_media);
    var el = this.el;
    if(el.is('clicked')){
      toggleState(el, 'clicked');
      _media.children[0].setAttribute('visible', false);
      _media.setAttribute('visible', false);
    }*/
  },



});

AFRAME.registerComponent('ortho', {
  init: function () {
    var sceneEl = this.el.sceneEl;
    sceneEl.addEventListener('render-target-loaded', () => {
      this.originalCamera = sceneEl.camera;
      this.cameraParent = sceneEl.camera.parent;
      this.orthoCamera = new THREE.OrthographicCamera(-1, 1, 1, -1);
      log('ortho camera added');
      this.cameraParent.add(this.orthoCamera);
      sceneEl.camera = this.orthoCamera;
    });
  },
  remove: function () {
    this.cameraParent.remove(this.orthoCamera);
    sceneEl.camera = this.originalCamera;
  }
});


/*Jan 22 2021 Rowbottom removed arrow keys from wasd controls to allow arrow keys to be used for video playback--------------------------------------------------------------------*/
//var utils = require('https://github.com/aframevr/aframe/blob/master/src/utils/');
//var bind = utils.bind;
//var shouldCaptureKeyEvent = utils.shouldCaptureKeyEvent;

var CLAMP_VELOCITY = 0.00001;
var MAX_DELTA = 0.2;
var KEYS = [
  'KeyW', 'KeyA', 'KeyS', 'KeyD',
];

/**
 * 
 * WASD component to control entities using WASD keys only.
 * This frees up the srrow keys for video controls if need be.
 */
AFRAME.registerComponent('wasd-only-controls', {
  schema: {
    acceleration: {default: 65},
    adAxis: {default: 'x', oneOf: ['x', 'y', 'z']},
    adEnabled: {default: true},
    adInverted: {default: false},
    enabled: {default: true},
    fly: {default: false},
    wsAxis: {default: 'z', oneOf: ['x', 'y', 'z']},
    wsEnabled: {default: true},
    wsInverted: {default: false}
  },

  init: function () {
    // To keep track of the pressed keys.
    this.keys = {};
    this.easing = 1.1;

    this.velocity = new THREE.Vector3();

    // Bind methods and add event listeners.
    this.onBlur = this.onBlur.bind(this);
    this.onContextMenu = this.onContextMenu.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.onVisibilityChange = this.onVisibilityChange.bind(this);
    this.attachVisibilityEventListeners();
  },

  tick: function (time, delta) {
    var data = this.data;
    var el = this.el;
    var velocity = this.velocity;

    if (!velocity[data.adAxis] && !velocity[data.wsAxis] &&
        isEmptyObject(this.keys)) { return; }

    // Update velocity.
    delta = delta / 1000;
    this.updateVelocity(delta);

    if (!velocity[data.adAxis] && !velocity[data.wsAxis]) { return; }

    // Get movement vector and translate position.
    el.object3D.position.add(this.getMovementVector(delta));
  },

  remove: function () {
    this.removeKeyEventListeners();
    this.removeVisibilityEventListeners();
  },

  play: function () {
    this.attachKeyEventListeners();
  },

  pause: function () {
    this.keys = {};
    this.removeKeyEventListeners();
  },

  updateVelocity: function (delta) {
    var acceleration;
    var adAxis;
    var adSign;
    var data = this.data;
    var keys = this.keys;
    var velocity = this.velocity;
    var wsAxis;
    var wsSign;

    adAxis = data.adAxis;
    wsAxis = data.wsAxis;

    // If FPS too low, reset velocity.
    if (delta > MAX_DELTA) {
      velocity[adAxis] = 0;
      velocity[wsAxis] = 0;
      return;
    }

    // https://gamedev.stackexchange.com/questions/151383/frame-rate-independant-movement-with-acceleration
    var scaledEasing = Math.pow(1 / this.easing, delta * 60);
    // Velocity Easing.
    if (velocity[adAxis] !== 0) {
      velocity[adAxis] = velocity[adAxis] * scaledEasing;
    }
    if (velocity[wsAxis] !== 0) {
      velocity[wsAxis] = velocity[wsAxis] * scaledEasing;
    }

    // Clamp velocity easing.
    if (Math.abs(velocity[adAxis]) < CLAMP_VELOCITY) { velocity[adAxis] = 0; }
    if (Math.abs(velocity[wsAxis]) < CLAMP_VELOCITY) { velocity[wsAxis] = 0; }

    if (!data.enabled) { return; }

    // Update velocity using keys pressed.
    acceleration = data.acceleration;
    if (data.adEnabled) {
      adSign = data.adInverted ? -1 : 1;
      if (keys.KeyA ) { velocity[adAxis] -= adSign * acceleration * delta; }
      if (keys.KeyD ) { velocity[adAxis] += adSign * acceleration * delta; }
    }
    if (data.wsEnabled) {
      wsSign = data.wsInverted ? -1 : 1;
      if (keys.KeyW ) { velocity[wsAxis] -= wsSign * acceleration * delta; }
      if (keys.KeyS ) { velocity[wsAxis] += wsSign * acceleration * delta; }
    }
  },

  getMovementVector: (function () {
    var directionVector = new THREE.Vector3(0, 0, 0);
    var rotationEuler = new THREE.Euler(0, 0, 0, 'YXZ');

    return function (delta) {
      var rotation = this.el.getAttribute('rotation');
      var velocity = this.velocity;
      var xRotation;

      directionVector.copy(velocity);
      directionVector.multiplyScalar(delta);

      // Absolute.
      if (!rotation) { return directionVector; }

      xRotation = this.data.fly ? rotation.x : 0;

      // Transform direction relative to heading.
      rotationEuler.set(THREE.Math.degToRad(xRotation), THREE.Math.degToRad(rotation.y), 0);
      directionVector.applyEuler(rotationEuler);
      return directionVector;
    };
  })(),

  attachVisibilityEventListeners: function () {
    window.oncontextmenu = this.onContextMenu;
    window.addEventListener('blur', this.onBlur);
    window.addEventListener('focus', this.onFocus);
    document.addEventListener('visibilitychange', this.onVisibilityChange);
  },

  removeVisibilityEventListeners: function () {
    window.removeEventListener('blur', this.onBlur);
    window.removeEventListener('focus', this.onFocus);
    document.removeEventListener('visibilitychange', this.onVisibilityChange);
  },

  attachKeyEventListeners: function () {
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);
  },

  removeKeyEventListeners: function () {
    window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('keyup', this.onKeyUp);
  },

  onContextMenu: function () {
    var keys = Object.keys(this.keys);
    for (var i = 0; i < keys.length; i++) {
      delete this.keys[keys[i]];
    }
  },

  onBlur: function () {
    this.pause();
  },

  onFocus: function () {
    this.play();
  },

  onVisibilityChange: function () {
    if (document.hidden) {
      this.onBlur();
    } else {
      this.onFocus();
    }
  },

  onKeyDown: function (event) {
    var code;
    //if (!shouldCaptureKeyEvent(event)) { return; }
    code = event.code || KEYCODE_TO_CODE[event.keyCode];
    if (KEYS.indexOf(code) !== -1) { this.keys[code] = true; }
  },

  onKeyUp: function (event) {
    var code;
    code = event.code || KEYCODE_TO_CODE[event.keyCode];
    delete this.keys[code];
  }
});

function isEmptyObject (keys) {
  var key;
  for (key in keys) { return false; }
  return true;
}