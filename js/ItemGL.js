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
		width: 960,
		height: 650,
		clearColor: 0xFFFFFF,
		btnLeft: $('#btnPrevious'),
		btnRight: $('#btnNext'),
		imagesLeather: ('.imageWood'),
		imagesWood: ('.imageWood'),
		core: {object: null, renderer: null, camera: null, scene: null, light: null}
	}, options);
	
  	var methods = {
		
		init: function(settings){
			
			if(typeof settings === 'object'){
				$.extend(settings, this.options);
			}
			var wrapper = document.getElementById(options.id);
			options.core.scene = new THREE.Scene();
			options.core.camera = new THREE.PerspectiveCamera(75, options.width/options.height, 0.1, 1000);			
			options.core.renderer = new THREE.WebGLRenderer();			
			options.core.renderer.setSize(options.width, options.height);
			options.core.renderer.setClearColor(options.clearColor);
			wrapper.appendChild(options.core.renderer.domElement);
			methods.setupButtons();
			
			/* TESTING */
			var geometry = new THREE.BoxGeometry(2, 3, 2);
			var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
			options.core.object = new THREE.Mesh(geometry, material);
			options.core.scene.add(options.core.object);
			/* END TESTING */

			options.core.camera.position.z = 5;
			options.core.renderer.render(options.core.scene, options.core.camera);
			
			options.core.light = new THREE.AmbientLight(0x000000);
			options.core.scene.add(options.core.light);
			var lights = [];
			lights[0] = new THREE.PointLight(0xffffff, 1, 0);
			lights[1] = new THREE.PointLight(0xffffff, 1, 0);
			lights[2] = new THREE.PointLight(0xffffff, 1, 0);
			
			lights[0].position.set(0, 200, 0);
			lights[1].position.set(100, 200, 100);
			lights[2].position.set(-100, -200, -100);

			options.core.scene.add(lights[0]);
			options.core.scene.add(lights[1]);
			options.core.scene.add(lights[2]);
			
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
