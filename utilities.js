const log = (msg) => {
  if (DEBUG){
    console.log(""+msg);
  }
  
}

const logArray = (_array, _attribute)=>{
  for (var i = 0; i < _array.length; i++){
    //log("log array");
    if ( typeof _attribute !== 'undefined'){
      log(_attribute + _array[i].getAttribute(_attribute));
    }
    else {
      log("logArray"+_array[i]);
    }
  }
}

const logProperties = (_object)=>{
  
    for (const property in _object) {
      log(`${property}: ${_object[property]}`);
    }
}

var randInt = (max, min) =>{
  return Math.floor(randDbl(max,min));
}

var randDbl = (max, min) => {
  const range = max - min;
//  log("range is "+range);
  const value = Math.random() * range + min;
 // log("value is "+value); 
  return value;
}

/*Rowbottom Jan 22 2021 Used to remove elements easily out of an array*/
var removeElement = (_array, element)=>{
  var index = _array.indexOf(element);
  if (index !== -1) _array.splice(index, 1);
}

var removeSelf = (self)=>{
  self.parentNode.removeChild(self);
}

var toggleState = (_el, state) =>{
  if (_el.is(state)){
    _el.removeState(state);
  }
  else{
    _el.addState(state);
  }
}


/* Rowbottom Jan 23 2021 Makes a frame around a poi
TODO
need to change to allow it to match dimensions properly
*/
var addFrame = (_scene, _el, _primitive)=>{
  var prim = 'a-circle';
  if(_primitive === "plane"||_primitive === "box"){
    prim = 'a-plane';
  }
  
  var frame = document.createElement(prim); 
  _el.appendChild(frame);
  frame.setAttribute('color','#077');
  frame.setAttribute('position', '0 0 -0.1');
  frame.setAttribute('scale', '1.2 1.2 1');
  frame.setAttribute('visible', false);
  frame.setAttribute('look-at', '#camera');
  return frame;
}

/*Rowbottom Jan 25 2021 Used to satisfy the async promise properly
*/

function fetchVideoAndPlay(video) {
  fetch(video.src)
  .then(response => response.blob())
  .then(blob => {
    video.srcObject = blob;
    return video.play();
  })
  .then(_ => {
    // Video playback started ;)
    log('video is playing');
  })
  .catch(e => {
    // Video playback failed ;(
      log('video playback failed');
  })
}