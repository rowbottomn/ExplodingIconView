
/*Rowbottom Jun 9 2021 Creating to allow poi to make objects for media files attached to it.

TODO:
detect mouseover event
  get larger
detect mouseleave event
  get smaller
detect click event
  spawn entity

store media references in objects
  load entities

explode icons on click

play media on click on icons

create gallery component

*/
/*
AFRAME.registerComponent('clickable', {
  
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

function isEmptyObject (keys) {
  var key;
  for (key in keys) { return false; }
  return true;
}

*/