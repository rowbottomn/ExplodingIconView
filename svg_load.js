AFRAME.registerComponent('svg-load', {
    init: function() {
        let file_name = this.el.getAttribute("src");
        console.log("made it here");
        // grab the canvas element
        var canvas = document.getElementById('my-canvas')
        var ctx = canvas.getContext('2d');

        // create an image, which will contain the svg data
        var img = new Image();

        // this will be triggered when the provided .svg is loaded
        img.onload = () => {
          // draw the image on the canvas
          ctx.drawImage(img, 0, 0, 256, 256);

          // create the texture and material
          let texture = new THREE.Texture(canvas);
          texture.needsUpdate = true;
          let material = new THREE.MeshBasicMaterial({ map: texture });

          // grab the mesh, replace the material, dispose the old one
          let mesh = this.el.getObject3D("mesh")
          let tmp = mesh.material
          mesh.material = material
          tmp.dispose()
          }
        // provide the .svg file as the image source 
        img.src = file_name+".svg";
    }
    
});