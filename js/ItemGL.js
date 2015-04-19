/**
* The ItemGL plugin implements an application that
* simply lets the user customize an item using WebGL and ThreeJs.
*
* @author  Llogari Casas
* @version 1.0
* @since   2015-02-21 
*/

(function($){
	
	var options =  $.extend({
		id: 'canvas',
		width: 1110,
		height: 650,
		clearColor: 0xEEEEEE,
		btnLeft: $('#btnPrevious'),
		btnRight: $('#btnNext'),
		imagesLeather: ('.imageWood'),
		imagesWood: ('.imageWood'),
		core: {object: [], renderer: null, camera: null, scene: null, light: null, canvas: null, spotLight: null, group: null, interval: null},
		items: {wood: null, leather: null},
		geometry: {ground: null, cube: null},
		numObj: 7,
		objGeometry: [{x: 15, y: 1, z: 15}, {x: 2, y: 16, z: 2}, {x: 2, y: 16, z: 2}, {x: 2, y: 32, z: 2}, {x: 2, y: 32, z: 2},{x: 12, y: 3, z: 1},{x: 12, y: 3, z: 1}],
		objPosition: [{x: 8, y: 6, z: 3}, {x: 1, y: -2, z: 10}, {x: 15, y: -2, z: 10}, {x: 1, y: 6, z: -5}, {x: 15, y: 6, z: -5}, {x: 8, y: 20, z: -5}, {x: 8, y: 15, z: -5}],
		objType: ['Leather', 'Wood', 'Wood', 'Wood', 'Wood','Leather','Leather']
	}, options);
	
  	var methods = {
		
		init: function(settings){
			
			if(typeof settings === 'object'){
				$.extend(settings, this.options);
			}
			
	        options.core.scene = new THREE.Scene();
	        options.core.camera = new THREE.PerspectiveCamera(50, options.width/options.height, 0.1, 1000);
	        options.core.renderer = new THREE.WebGLRenderer();
	        options.core.renderer.setClearColor(new THREE.Color(0xEEEEEE, 1.0));
	        options.core.renderer.setSize(options.width, options.height);
	        options.core.renderer.shadowMapEnabled = true;
	        options.core.group = new THREE.Object3D();		        
	        for(var i=0; i<options.numObj; i++){
		        var cubeGeometry = new THREE.BoxGeometry(options.objGeometry[i].x, options.objGeometry[i].y, options.objGeometry[i].z);
		        options.core.object[i] = methods.addMaterial(cubeGeometry, 'images/Resources/UVMap.png');
		        options.core.object[i].receiveShadow = true;
		        options.core.object[i].position.x = options.objPosition[i].x;
				options.core.object[i].position.y = options.objPosition[i].y;
				options.core.object[i].position.z = options.objPosition[i].z;
				options.core.group.add(options.core.object[i]);
	        }
	        options.core.scene.add(options.core.group);
	        options.core.camera.position.x = 10;
	        options.core.camera.position.y = 30;
	        options.core.camera.position.z = 60;
	        options.core.camera.lookAt(new THREE.Vector3(10, 0, 0));
	        options.core.light = new THREE.AmbientLight(0x0c0c0c);
	        options.core.scene.add(options.core.light);
	        options.core.spotLight = new THREE.SpotLight(0xffffff);
	        options.core.spotLight.position.set(-30, 60, 60);
	        options.core.spotLight.castShadow = true;
	        options.core.scene.add(options.core.spotLight);
	        $("#"+options.id).append(options.core.renderer.domElement);
			methods.render();
			methods.setupButtons();			
			options.core.renderer.render(options.core.scene, options.core.camera);
		},
		
		setupButtons: function(){
			options.btnLeft.hover(
			  function(){
				options.core.interval = window.setInterval(function(){
					options.core.group.rotation.y += 0.05;
					options.core.renderer.render(options.core.scene, options.core.camera);
				}, 15);
			  }, function() {
			    window.clearInterval(options.core.interval);
			  }
			);
			options.btnRight.hover(
			  function(){
				options.core.interval = window.setInterval(function(){
					options.core.group.rotation.y -= 0.05;
					options.core.renderer.render(options.core.scene, options.core.camera);
				}, 15);
			  }, function() {
			    window.clearInterval(options.core.interval);
			  }
			);
		},
		
		render: function(){
			requestAnimationFrame(methods.render);  
			options.core.renderer.render(options.core.scene, options.core.camera);
		},
		
		changeItem: function(type, obj){
			var texture = THREE.ImageUtils.loadTexture(obj.firstChild.src);
			for(var i=0; i<options.numObj; i++){
				if(options.objType[i] == type){
					options.core.object[i].material.map = texture;
				}			
			}
		},
		
		addMaterial: function(geom, imageFile){
	            var texture = THREE.ImageUtils.loadTexture(imageFile)
	            var mat = new THREE.MeshPhongMaterial();
	            mat.map = texture;
	            mat.needsUpdate = true;
	            var mesh = new THREE.Mesh(geom, mat);
	            return mesh;
	        }

	};
  	
	$.fn.ItemGL = function(method){

		if(typeof method === 'undefined'){
			method = 'init';	
		}
		if(methods[method]){
			return methods[ method ].apply(this, Array.prototype.slice.call(arguments, 1));
		}else if(typeof method === 'object' || !method){
			return methods.init.apply(this, arguments);
		}else{
			$.error('Method '+ method+' does not exist on jQuery');
		}    
  	};
	
})(jQuery);
