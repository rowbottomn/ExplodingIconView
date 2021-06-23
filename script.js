const DEBUG = false;


//always need a reference to the scene
var scene = {};

let pois = [];
let icons = [];
var scene = {};
var circle = {};

function onload(){
  log("starting onload");
  pois = $('.pois');//document.getElementsByClassName('poi');
  scene = document.getElementById('scene');

  //get a list of all the assets
  //go through each one and fill an array of arrays where they belong to each poi

  //for each poi complete
    //make the icon-circle with the media array
    //add the click handlers to poi
  
  pois.each((i)=>{
    pois[i].addEventListener('click', (e)=>{
      log("click started "+pois[i].id);
      explodeIcons(pois[i]);
      log("click ending "+pois[i].id);
    });
  });
  log("leaving onload");
}

function makeIcons(item, mediaType, mediaArray, mediaNum){
  
  let num = parseFloat(item.getAttribute(mediaType));
  log("entering makeicons "+mediaNum);

  for (let i = 0; i < num; i++){
    let temp = document.createElement("a-image");
    temp.setAttribute("src", `assets/icons/${mediaType}_icon.svg`);
    temp.setAttribute("scale", "0.5 0.5 0.5");
    temp.setAttribute("position", "0 0 0");
    temp.setAttribute("transparent", "true");
    temp.setAttribute("material.opacity", "0.0");
    let x = (0.85*Math.sin(2.0*mediaArray.length*Math.PI / mediaNum)).toFixed(3);
    let y = (0.85*Math.cos(2.0*mediaArray.length*Math.PI / mediaNum)).toFixed(3);
    temp.setAttribute("animation", `property: position; to: ${x} ${y} 2; dur: 400; easing: linear;`);
    temp.setAttribute("animation__opacity", "property: material.opacity; to: 0.9; dur: 600; easing: linear;");
    log(`count = ${icons.length}, x: ${x}, y:${y}`);
    mediaArray.push(temp);
    item.appendChild(temp);
  }
}

function makeCircle(){
  log('entering makeCircle');
  circle = document.createElement("a-circle");
  
  circle.setAttribute("id", "poi_circle");
  //console.log(circle.id);
  //circle.setAttribute("color", "white");
  circle.setAttribute("radius", "0.4");
  circle.setAttribute("transparent", "true");
  circle.setAttribute("material.opacity", "0.0");
  circle.setAttribute("position", "0 0 1");
  circle.setAttribute("animation", `property: position; to: 0 0 1.99; dur: 400; easing: linear;`);

  circle.classList.add('poi');
  circle.setAttribute('poi');
  circle.setAttribute("animation__opacity", "property: material.opacity; to: 0.6; dur: 600; easing: linear;");
  circle.setAttribute("animation__radius", "property: scale; to: 3.0 3.0 1; dur: 400; easing: linear;");
  log('leaving makeCircle');
  return circle;
}

function explodeIcons(item){
  log("starting explode "+item.id);
  //let scene = item.sceneEl;
  
  //make the circle background for the icons
  circle = makeCircle(item);
  
  circle.addEventListener('click', (e)=>{
    log('hello');
    circle = e.target;
    /*let item = circle.parent;
    let children = item.children;
    console.log(`eventhandler click ${e.target} , ${circle.classList}, ${item.id} `);
    //let circle = document.getElementById('poi_circle');
    circle.setAttribute("animation", `property: position; to: 0 0 0; dur: 400; easing: linear;`);
    circle.setAttribute("animation__opacity", "property: material.opacity; to: 0.0; dur: 600; easing: linear;");
    circle.setAttribute("animation__radius", "property: scale; to: 0.4 0.4 1; dur: 400; easing: linear;");

    for (let i = 0; i < children.length; i++){
      let child = children[i];
      log(i);
      item.removeChild(child);
      icons.slice(icons.indexOf(child),1);
    }
    */
  });
  item.appendChild(circle);

  
  //make all the video references
  //console.log(item.getAttribute("videos"));
  let vidNum = parseFloat(item.getAttribute("videos"));
  let audNum = parseFloat(item.getAttribute("audios"));
  let imgNum = parseFloat(item.getAttribute("images"));
    
  let mediaNum = vidNum + audNum + imgNum;
  log(`mediaNum = ${mediaNum}`);
  //let mediaCount = 0;*/
  
  makeIcons(item, "videos", icons, mediaNum);
  makeIcons(item, "audios", icons, mediaNum);
  makeIcons(item, "images", icons, mediaNum);
  //item should be an a-entity. 
  //add item's children to a list 
  //add children objects to item
  log("leaving explode");
}

function implodeIcons(item, circle){

}

//if the document has loaded
  //get a list of all the poi
  //get a list of all the video files
  //get a list of all the media content
  //get a list of all the galleries

    //for each poi:
      //add the clickHandlers
    
    //for each media file
      //load the low or high res versions
      //create an video icon attached as a child of the POI
        //attach click event to the icon

    //for each media file
      //load the low or high res version


