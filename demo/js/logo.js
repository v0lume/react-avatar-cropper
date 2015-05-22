function init() {

    // heeere we go !

    var blue = new THREE.Color(0x305e94);
    var pink = new THREE.Color(0x305e94);

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);
    var container = document.getElementById('header');

    var renderer = new THREE.WebGLRenderer({
        alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    //THREEx.WindowResize(renderer, camera);
    // 	var shape = [];
    // 	// geometry = new THREE.IcosahedronGeometry(3.5,0);
    // 	var verticesOfCube = [
    //     -1,-1,-1,    1,-1,-1,    1, 1,-1,    -1, 1,-1,
    //     -1,-1, 1,    1,-1, 1,    1, 1, 1,    -1, 1, 1,
    // ];

    // var indicesOfFaces = [
    //     2,1,0,    0,3,2,
    //     0,4,7,    7,3,0,
    //     0,1,5,    5,4,0,
    //     1,2,6,    6,5,1,
    //     2,3,7,    7,6,2,
    //     4,5,6,    6,7,4
    // ];
    var darkMaterial = new THREE.MeshDepthMaterial({
        color: 0xdddddd,
        specular: 0x2b5982,
        shininess: 30,
        shading: THREE.FlatShading
    });
    var wireframeMaterial = new THREE.MeshPhongMaterial({
        color: 0xdddddd,
        specular: 0xa9a9a9,
        shininess: 200,
        shading: THREE.FlatShading
    });
    var multiMaterial = [darkMaterial, wireframeMaterial];
    // var material = new THREE.MeshPhongMaterial( { color: 0xdddddd, specular: 0xa9a9a9, shininess: 30, shading: THREE.FlatShading }  );

    var shape = THREE.SceneUtils.createMultiMaterialObject(
        // radius of entire torus, diameter of tube (less than total radius), 
        // segments around radius, segments around torus ("sides")
        new THREE.TorusGeometry(25, 10, 8, 4),
        multiMaterial);
    shape.position.set(-21, 20, 0);
    scene.add(shape);
    shape.dynamic=true,
    // var geometry = THREE.SceneUtils.createMultiMaterialObject( 
    // 		new THREE.TetrahedronGeometry( 40, 1 ), 
    // 		multiMaterial );
    // 	geometry.position.set(100, 50, 0);
    // var geometry = new THREE.PolyhedronGeometry( verticesOfCube, indicesOfFaces, 6, 2 );
    // 	material = new THREE.MeshPhongMaterial( { color: 0xdddddd, specular: 0xa9a9a9, shininess: 30, shading: THREE.FlatShading }  );
    // 	shape = new THREE.Mesh( geometry, material );
    // shape[1] = new THREE.Mesh( geometry, material );
    // shape[2] = new THREE.Mesh( geometry, material );
    // shape[0].position.set(0,5,0);
    // shape[1].position.set(0,5,0);
    // shape[2].position.set(0,5,0);
    // shape[0].wrapS = THREE.SmoothShading;
    // shape[0].wrapT = THREE.MirroredRepeatWrapping;
    // shape[1].wrapS = THREE.MirroredRepeatWrapping;
    // shape[1].wrapT = THREE.RepeatWrapping;
    // shape[2].wrapS = THREE.RepeatWrapping;
    // shape[2].wrapT = THREE.RepeatWrapping;

    // scene.add(shape[0],shape[1],shape[2]);
    scene.add(shape);

    var light = new THREE.PointLight(0x305e94);
    light.position.set(0, 200, 50);
    scene.add(light);
    var light2 = new THREE.AmbientLight(0x305e94); // soft white light
    scene.add(light);
    camera.position.set(0, 0, 200); // x y z
    shape.position.y = 170;
    var id;

    var state = "state1";

    function render() {
        // shape.position.y = -50;
        if(state=="state1"){
        	id = requestAnimationFrame(render);
        	shape.position.y -= 3;
        	shape.rotation.x -= 0.060;
        }
        if(state=="state2"){
        	id = requestAnimationFrame(render);
        	shape.position.y += .3;
        	shape.rotation.y -= 0.0523;
        }
        if(state=="state3"){
        	id = requestAnimationFrame(render);
        	shape.rotation.y -= 0.0053;
        	shape.rotation.x -= 0.0053;
        }
        
        // if(!state){
        // 	addEffect();
        // }
        // shape.rotation.y += 0.015;
        // shape[0].rotation.y -= 0.010;
        // shape[1].rotation.y += 0.0100;
        // shape[1].rotation.z -= 0.015;
        // shape[2].rotation.z -= 0.0125;
        // shape[2].rotation.x += 0.0120;

        renderer.render(scene, camera);
    }

    render();

    window.setTimeout(function() {
        cancelAnimationFrame(id);
    }, 900);

    window.setTimeout(function() {
    	state = "state2";
    	render();
    }, 900);
    window.setTimeout(function() {
    	state= "state3";
        render();
    }, 2000);	

    //==================================================//
}

init();


