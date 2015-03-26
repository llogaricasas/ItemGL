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
		core: {object: null, renderer: null, camera: null, scene: null, light: null, canvas: null, spotLight: null},
		items: {wood: null, leather: null},
		geometry: {ground: null, cube: null}
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
	        var cubeGeometry = new THREE.BoxGeometry(15, 15, 15);
	        //var meshMaterial = new THREE.MeshLambertMaterial({color: 0x7777ff});
	        //options.core.object = methods.changeMaterial(cubeGeometry, 'images/Patterns/Leather/LeatherPattern01.jpg');
	        //options.core.object = new THREE.Mesh(cubeGeometry, meshMaterial);
			options.core.object = methods.addMaterial(cubeGeometry, 'images/Resources/UVMap.png');
	        options.core.object.receiveShadow = true;
	        options.core.object.position.x = 8;
	        options.core.object.position.y = 6;
	        options.core.object.position.z = 3;
	        options.core.scene.add(options.core.object);
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
	        
	        /*
		    var loader = new THREE.JSONLoader();
	        loader.load('assets/misc_chair01.js', function (geometry, mat) {
	            options.core.object = new THREE.Mesh(geometry, mat[0]);
	            options.core.object.position.x = 8;
				options.core.object.position.y = 1;
				options.core.object.position.z = 3;
	            options.core.scene.add(options.core.object);
	            methods.setupButtons();
	        });
			*/
		 
			//->DISABLE FOR BUILD VERSION
			methods.setupButtons();
			
			options.core.renderer.render(options.core.scene, options.core.camera);
			
			
		},
		
		setupButtons: function(){
			options.btnLeft.hover(
			  function(){
				var render = function(){  
					requestAnimationFrame(render);  
					options.core.object.rotation.y += 0.05;
					options.core.renderer.render(options.core.scene, options.core.camera);
				}
				render();
			  }, function() {
			    var render = function(){  
					requestAnimationFrame(render);  
					options.core.object.rotation.y -= 0.05;
					options.core.renderer.render(options.core.scene, options.core.camera);
				}
				render();
			  }
			);
			options.btnRight.hover(
			  function(){
				var render = function(){  
					requestAnimationFrame(render);  
					options.core.object.rotation.y -= 0.05;
					options.core.renderer.render(options.core.scene, options.core.camera);
				}
				render();
			  }, function() {
			    var render = function(){  
					requestAnimationFrame(render);  
					options.core.object.rotation.y += 0.05;
					options.core.renderer.render(options.core.scene, options.core.camera);
				}
				render();
			  }
			);
		},
		
		changeItem: function(type, obj){
			switch(type){
				case 'Wood':
					options.items.wood = parseInt(obj.id);
					//var mat = new THREE.MeshPhongMaterial();
					//mat.map = obj.firstChild.src;
					//options.core.object.material = mat;
				break;
				case 'Leather':
					options.items.leather = parseInt(obj.id);
				break;	
			}
		},
		
		addMaterial: function(geom, imageFile){
	            var texture = THREE.ImageUtils.loadTexture(imageFile)
	            var mat = new THREE.MeshPhongMaterial();
	            mat.map = texture;
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
