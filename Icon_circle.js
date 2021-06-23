class IconCircle{
  //owner is an a-frame element that is used as the parent
  //media is an array of media files

  constructor(parent, media) {
    this.parent = parent;
    this.media = media;
  }

  makeIcons(){
    //for each item in the media array
      //make each item
      //set their attributes
      //add the clickhandler
      //append to the parent
      //addEvent handlers for the animation pause/stop

    media.forEach((value)=>{
      
    }
  }

  showIcons(){
    //remove old Animations
    //add new animations

  }

  hideIcons(){
    //remove old Animations
    //add new animations

  }

  
}

AFRAME.registerComponent('poi-circle', {
  
  init: function() {
    var el = this.el;
    var scene = el.sceneEl;
    var parent = this.getAttribute('parent');
    //var mediaPanel = scene.querySelector('#mediaPanel');
    var videos = scene.querySelector('video');
    var audios = scene.querySelector('audio');
    var images = scene.querySelector('image');
    //logArray(videos, 'src');
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
      //make icons
    });


    el.addEventListener('mouseleave', (event) => {
      //remove icons
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
    log('poi_circle paused');
      //  log("isPlaying: " + el.isPlaying);
  },

  remove: function(){
    log('poi_circle removed');
  },

  reset: function(){
    log('poi_circle reset');
   /* log('resetting media'+_media);
    var el = this.el;
    if(el.is('clicked')){
      toggleState(el, 'clicked');
      _media.children[0].setAttribute('visible', false);
      _media.setAttribute('visible', false);
    }*/
  },
});

