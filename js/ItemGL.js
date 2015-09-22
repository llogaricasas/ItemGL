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
		width: window.innerWidth-350,
		height: window.innerHeight-100,
		clearColor: 0xEEEEEE,
		core: {object: [], renderer: null, camera: null, scene: null, light: null, controls: null, canvas: null, spotLight: null, group: null, interval: null, mouse: null},
		numObj: 7,
		objGeometry:[{x: 15, y: 1, z: 15}, {x: 2, y: 16, z: 2}, {x: 2, y: 16, z: 2}, {x: 2, y: 32, z: 2}, {x: 2, y: 32, z: 2},{x: 12, y: 3, z: 1},{x: 12, y: 3, z: 1}],
		objPosition:[{x: 8, y: 6, z: 3},{x: 1, y: -2, z: 10}, {x: 15, y: -2, z: 10}, {x: 1, y: 6, z: -5}, {x: 15, y: 6, z: -5}, {x: 8, y: 20, z: -5}, {x: 8, y: 15, z: -5}],
		buttonLeft: ['pointer-div','move-div','rotate-div','view-div','delete-div','camera-div','light-div','cube-div','sphere-div','scale-div','plane-div'],
		currentAction: null,
		currentObject: null,
		textFile: null,
		isMobile: false
	}, options);
	
  	var methods = {
		
		init: function(settings){
			
			if(typeof settings === 'object'){
				$.extend(settings, this.options);
			}
			
	        options.core.scene = new THREE.Scene();
	        options.core.mouse = new THREE.Vector2();
	        options.core.camera = new THREE.PerspectiveCamera(50, options.width/options.height, 0.1, 1000);
	        options.core.renderer = new THREE.WebGLRenderer();
	        options.core.renderer.setClearColor(new THREE.Color(0xEEEEEE, 1.0));
	        options.core.renderer.setSize(options.width, options.height);
	        options.core.renderer.shadowMapEnabled = true;
	        
			var plane = new THREE.Mesh(new THREE.PlaneGeometry(500, 500, 50, 50), new THREE.MeshBasicMaterial({color: 0x000000, wireframe: true}));
			plane.rotation.x = Math.PI/2;
			plane.isSelectable = false;
			options.core.scene.add(plane);
	        
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
	        options.core.controls = new THREE.TrackballControls(options.core.camera);
			options.core.controls.rotateSpeed = 3.0;
			options.core.controls.zoomSpeed = 1.0;
			options.core.controls.panSpeed = 1.0;
			options.core.controls.staticMoving = true;
	        
	        $("#"+options.id).append(options.core.renderer.domElement);
	        document.getElementById("pointer-div").style.backgroundColor = "#E1B20E";
	        options.currentAction = 'pointer';
			methods.render();
			methods.initListeners();		
			options.core.renderer.render(options.core.scene, options.core.camera);
			
			var isiPad = navigator.userAgent.match(/iPad/i) != null;
	        var isiPhone = navigator.userAgent.match(/iPhone/i) != null;
	        if(isiPad || isiPhone){
		        options.isMobile = true;
		        var obj = document.getElementById(options.id);
		        obj.addEventListener("touchstart", methods.onDocumentMouseDown);
	        } else {
		        options.isMobile = false;
				document.addEventListener("mousedown", methods.onDocumentMouseDown);
			}
			document.addEventListener("keydown", methods.onDocumentKeyDown);
		},
		
		onDocumentMouseDown: function(event){
			var raycaster = new THREE.Raycaster();
			var realPointer = {x:0, y:0};
			
			if(options.isMobile){
				if(event.changedTouches[0].pageX<51){realPointer.x = null;}
				else if(event.changedTouches[0].pageX>50 && event.changedTouches[0].pageX<window.innerWidth-300){realPointer.x = event.changedTouches[0].pageX-50;}
				else{realPointer.x = null;}
				
				if(event.changedTouches[0].pageY<51){realPointer.y = null;}
				else if(event.changedTouches[0].pageY>50 && event.changedTouches[0].pageY<window.innerHeight-50){realPointer.y = event.changedTouches[0].pageY-50;}
				else{realPointer.y = null;}	
			} else {
				event.preventDefault();
			
				if(event.clientX<51){realPointer.x = null;}
				else if(event.clientX>50 && event.clientX<window.innerWidth-300){realPointer.x = event.clientX-50;}
				else{realPointer.x = null;}
				
				if(event.clientY<51){realPointer.y = null;}
				else if(event.clientY>50 && event.clientY<window.innerHeight-50){realPointer.y = event.clientY-50;}
				else{realPointer.y = null;}
			}
			
			if(realPointer.x != null && realPointer.y != null){
				options.core.mouse.x = (realPointer.x/options.core.renderer.domElement.clientWidth) * 2 - 1;
				options.core.mouse.y = - (realPointer.y/options.core.renderer.domElement.clientHeight) * 2 + 1;
				raycaster.setFromCamera(options.core.mouse, options.core.camera);

				var intersects = raycaster.intersectObjects(options.core.scene.children, true);
				if(intersects.length>0){
					switch(options.currentAction){
						case 'delete':
							if(intersects[0].object.isSelectable){
								intersects[0].object.isSelectable = false;
								intersects[0].object.material.transparent = true;
								intersects[0].object.material.opacity = 0;
								intersects[0].object.material.needsUpdate = true;
								options.core.scene.remove(intersects[0].object);
							}
						break;
						case 'hide':
							if(intersects[0].object.isSelectable){
								if(!intersects[0].object.isHidden){
									intersects[0].object.material.transparent = true;
									intersects[0].object.material.opacity = 0.3;
									intersects[0].object.material.needsUpdate = true;
									intersects[0].object.isHidden = true;
								} else {
									intersects[0].object.material.transparent = true;
									intersects[0].object.material.opacity = 1;
									intersects[0].object.material.needsUpdate = true;
									intersects[0].object.isHidden = false;								
								}
							}
						break;
					}
					if(intersects[0].object.isSelectable){
						options.currentObject = intersects[0].object; 
						document.getElementById('item-id').innerHTML = intersects[0].object.id;
						document.getElementById('item-material').innerHTML = intersects[0].object.material.type;
						document.getElementById('item-color').innerHTML = 'R: '+intersects[0].object.material.color.r+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;G: '+intersects[0].object.material.color.g+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;B: '+intersects[0].object.material.color.b+'';
						document.getElementById('item-position').innerHTML = 'X: '+parseInt(intersects[0].point.x)+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Y: '+parseInt(intersects[0].point.y)+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Z: '+parseInt(intersects[0].point.z);
						document.getElementById('item-geometry').innerHTML = intersects[0].object.geometry.type;
					}
	    		} else {
		    		var vector = new THREE.Vector3();
		    		vector.set(options.core.mouse.x, options.core.mouse.y,0.5);
					vector.unproject(options.core.camera);
					var dir = vector.sub(options.core.camera.position).normalize();
					var distance = -options.core.camera.position.z/dir.z;
					var pos = options.core.camera.position.clone().add(dir.multiplyScalar(distance));
					
		    		switch(options.currentAction){
			    		case 'light':
							var light = new THREE.SpotLight(0xffffff);
							light.position.set(pos.x, pos.y, pos.z);
							light.castShadow = true;
							light.isHidden = false;
							light.isSelectable = true;
							options.core.scene.add(light);
							var map = THREE.ImageUtils.loadTexture("sprite/Light.png");
							var material = new THREE.SpriteMaterial({map: map, color:0xffffff, fog:false});
							var sprite = new THREE.Sprite(material);
							sprite.position.set(pos.x, pos.y, pos.z);
							sprite.isHidden = false;
							sprite.isSelectable = true;
							options.core.scene.add(sprite);
						break;
						case 'camera':
							var camera = new THREE.PerspectiveCamera(50, options.width/options.height, 0.1, 1000);
							camera.position.set(pos.x, pos.y, pos.z);
							camera.isHidden = false;
							camera.isSelectable = true;
							options.core.scene.add(camera);
							var map = THREE.ImageUtils.loadTexture("sprite/Camera.png");
							var material = new THREE.SpriteMaterial({map: map, color:0xffffff, fog:false});
							var sprite = new THREE.Sprite(material);
							sprite.position.set(pos.x, pos.y, pos.z);
							sprite.isHidden = false;
							sprite.isSelectable = true;
							options.core.scene.add(sprite);
						break;
						case 'cube':
							var cubeGeometry = new THREE.BoxGeometry(15, 15, 15);
							var mat = new THREE.MeshPhongMaterial();
							mat.needsUpdate = true;
							mat.side = THREE.DoubleSide;
							var mesh = new THREE.Mesh(cubeGeometry, mat);
							mesh.position.x = pos.x;
							mesh.position.y = pos.y;
							mesh.position.z = pos.z;
							mesh.isHidden = false;
							mesh.isSelectable = true;
							options.core.scene.add(mesh);
						break;
						case 'sphere':
							var cubeGeometry = new THREE.SphereGeometry(5, 32, 32);
							var mat = new THREE.MeshPhongMaterial();
							mat.needsUpdate = true;
							mat.side = THREE.DoubleSide;
							var mesh = new THREE.Mesh(cubeGeometry, mat);
							mesh.position.x = pos.x;
							mesh.position.y = pos.y;
							mesh.position.z = pos.z;
							mesh.isHidden = false;
							mesh.isSelectable = true;
							options.core.scene.add(mesh);
						break;
						case 'plane':
							var planeGeometry = new THREE.PlaneGeometry(50, 50);
							var mat = new THREE.MeshPhongMaterial();
							mat.needsUpdate = true;
							mat.side = THREE.DoubleSide;
							var plane = new THREE.Mesh(planeGeometry, mat);
							plane.rotation.x = Math.PI/2;
							plane.position.x = pos.x;
							plane.position.y = pos.y;
							plane.position.z = pos.z;
							plane.isSelectable = true;
							plane.isHidden = false;
							options.core.scene.add(plane);
						break;
						case 'translate':
							options.currentObject.position.set(pos.x, pos.y, pos.z);
						break;
		    		}
		    		document.getElementById('item-id').innerHTML = "--";
		    		document.getElementById('item-material').innerHTML = "--";
		    		document.getElementById('item-color').innerHTML = "--";
		    		document.getElementById('item-position').innerHTML = "--";
		    		document.getElementById('item-geometry').innerHTML = "--";
	    		}
	    	}
		},
		
		onDocumentKeyDown: function(event){
			if(options.currentAction=='rotate'){
				switch(event.keyCode){
					case 37:
						options.currentObject.rotation.y+=20;
					break;
					case 38:
						options.currentObject.rotation.x+=20;
					break;
					case 39:
						options.currentObject.rotation.y-=20;
					break;
					case 40:
						options.currentObject.rotation.x-=20;
					break;
				}
			}
			if(options.currentAction=='scale'){
				switch(event.keyCode){
					case 49:
						options.currentObject.scale.x+=0.1;
						options.currentObject.scale.y+=0.1;
						options.currentObject.scale.z+=0.1;
					break;
					case 50:
						options.currentObject.scale.x-=0.1;
						options.currentObject.scale.y-=0.1;
						options.currentObject.scale.z-=0.1;
					break;
				}
			}
		},
		
		arrowLeft: function(){
			if(options.currentAction=='rotate'){
	        	options.currentObject.rotation.y+=20;
	        }
        },
        
        arrowRight: function(){
	        if(options.currentAction=='rotate'){
	        	options.currentObject.rotation.y-=20;
	        }
        },
        
        arrowUp: function(){
	        if(options.currentAction=='rotate'){
	        	options.currentObject.rotation.x+=20;
	        }
        },
        
        arrowDown: function(){
	        if(options.currentAction=='rotate'){
	        	options.currentObject.rotation.x-=20;
	        }
        },
		
		computeOffset: function(){
			var maxTrans  = {x:0, y:0, z:0};
			var minTrans  = {x:0, y:0, z:0};
			var translate2Center = {x:0, y:0, z:0};
			
			for(var i=0; i<options.objPosition.length; i++) {
			    var temp = options.objPosition[i];		    
			    if(temp.x > maxTrans.x){maxTrans.x = temp.x;}
			    else if (temp.x < minTrans.x){ minTrans.x = temp.x;}
			    if (temp.y > maxTrans.y){ maxTrans.y = temp.y;}
			    else if (temp.y < minTrans.y){ minTrans.y = temp.y; }
			    if (temp.z > maxTrans.z){ maxTrans.z = temp.z; }
			    else if (temp.z < minTrans.z){ minTrans.z = temp.z; }
			}
			translate2Center.x = minTrans.x + (maxTrans.x-minTrans.x)/2;
			translate2Center.y = minTrans.y + (maxTrans.y-minTrans.y)/2;
			translate2Center.z = minTrans.z + (maxTrans.z-minTrans.z)/2;
			
			return translate2Center;			
		},

		render: function(){
			requestAnimationFrame(methods.render);
			options.core.controls.update();  
			options.core.renderer.render(options.core.scene, options.core.camera);
		},
		
		addMaterial: function(geom, imageFile){
            var texture = THREE.ImageUtils.loadTexture(imageFile)
            var mat = new THREE.MeshPhongMaterial();
            mat.map = texture;
            mat.side = THREE.DoubleSide;
            mat.needsUpdate = true;
            var mesh = new THREE.Mesh(geom, mat);
            return mesh;
        },
        
        clearBackground: function(){
	    	for(var i=0;i<options.buttonLeft.length;i++){
		    	document.getElementById(options.buttonLeft[i]).style.backgroundColor = '#222';	
	    	}
	    	document.getElementsByTagName("body")[0].style.cursor = 'auto';
        },
        
        hideMobileGUI: function(){
	        document.getElementById('minus-btn').style.display = 'none';
		    document.getElementById('plus-btn').style.display = 'none';
		    document.getElementById('arrow-left').style.display = 'none';
		    document.getElementById('arrow-right').style.display = 'none';
		    document.getElementById('arrow-down').style.display = 'none';
		    document.getElementById('arrow-up').style.display = 'none';
        },
        
        translateObject: function(){
	    	methods.clearBackground();
	    	document.getElementById('move-div').style.backgroundColor = "#E1B20E";
	    	document.getElementsByTagName("body")[0].style.cursor = "url('cursor/Move.png'), auto";  
	    	options.currentAction = 'translate';
	    	if(options.isMobile){
		    	methods.hideMobileGUI();
	    	}
        },
        
        rotateObject: function(){
	        methods.clearBackground();
	    	document.getElementById('rotate-div').style.backgroundColor = "#E1B20E";
	    	document.getElementsByTagName("body")[0].style.cursor = "url('cursor/Rotate.png'), auto";
	    	options.currentAction = 'rotate';
	    	if(options.isMobile){
		    	document.getElementById('minus-btn').style.display = 'none';
				document.getElementById('plus-btn').style.display = 'none';
		    	document.getElementById('arrow-left').style.display = 'block';
			    document.getElementById('arrow-right').style.display = 'block';
			    document.getElementById('arrow-down').style.display = 'block';
			    document.getElementById('arrow-up').style.display = 'block';			    
	    	}
        },
        
        scaleObject: function(){
	        methods.clearBackground();
	    	document.getElementById('scale-div').style.backgroundColor = "#E1B20E";
	    	document.getElementsByTagName("body")[0].style.cursor = "url('cursor/Scale.png'), auto";
	    	options.currentAction = 'scale';
	    	if(options.isMobile){
		    	document.getElementById('arrow-left').style.display = 'none';
			    document.getElementById('arrow-right').style.display = 'none';
			    document.getElementById('arrow-down').style.display = 'none';
			    document.getElementById('arrow-up').style.display = 'none';
		    	document.getElementById('minus-btn').style.display = 'block';
		    	document.getElementById('plus-btn').style.display = 'block';
	    	}
        },
        
        hideObject: function(){
	      	methods.clearBackground();
	      	document.getElementById('view-div').style.backgroundColor = "#E1B20E";
	      	options.currentAction = 'hide';
	      	if(options.isMobile){
		    	methods.hideMobileGUI();
	    	}  
        },
        
        deleteObject: function(){
	      	methods.clearBackground();
	      	document.getElementById('delete-div').style.backgroundColor = "#E1B20E";
	      	options.currentAction = 'delete';
	      	if(options.isMobile){
		    	methods.hideMobileGUI();
	    	}  
        },
        
        addCamera: function(){
	        methods.clearBackground();
	      	document.getElementById('camera-div').style.backgroundColor = "#E1B20E";
	      	options.currentAction = 'camera';
	      	if(options.isMobile){
		    	methods.hideMobileGUI();
	    	}  
        },
        
        addLight: function(){
	    	methods.clearBackground();    
	      	document.getElementById('light-div').style.backgroundColor = "#E1B20E";
	      	options.currentAction = 'light';
	      	if(options.isMobile){
		    	methods.hideMobileGUI();
	    	}	        
        },
        
        addCube: function(){
	        methods.clearBackground();    
	      	document.getElementById('cube-div').style.backgroundColor = "#E1B20E";
	      	options.currentAction = 'cube';
	      	if(options.isMobile){
		    	methods.hideMobileGUI();
	    	}
        },
        
        addSphere: function(){
	        methods.clearBackground();    
	      	document.getElementById('sphere-div').style.backgroundColor = "#E1B20E";
	      	options.currentAction = 'sphere';
	      	if(options.isMobile){
		    	methods.hideMobileGUI();
	    	}
        },
        
        addPlane: function(){
	        methods.clearBackground();    
	      	document.getElementById('plane-div').style.backgroundColor = "#E1B20E";
	      	options.currentAction = 'plane';
	      	if(options.isMobile){
		    	methods.hideMobileGUI();
	    	}
        },
        
        moveView: function(){
	    	methods.clearBackground();
	    	document.getElementById('pointer-div').style.backgroundColor = "#E1B20E";
	    	options.currentAction = 'pointer';
	    	if(options.isMobile){
		    	methods.hideMobileGUI();
	    	}    
        },
        
        addScaleGUIObject: function(){
	        if(options.currentAction=='scale'){
				options.currentObject.scale.x+=0.1;
				options.currentObject.scale.y+=0.1;
				options.currentObject.scale.z+=0.1;
			}
        },
        
        substractScaleGUIObject: function(){
	       if(options.currentAction=='scale'){
				options.currentObject.scale.x-=0.1;
				options.currentObject.scale.y-=0.1;
				options.currentObject.scale.z-=0.1;
			} 
        },
        
        changeMaterialColor: function(event){
	        if(options.currentObject != null){
		        var color = new THREE.Color(event.target.style.backgroundColor);
		        var mat = new THREE.MeshPhongMaterial();
				mat.map = null;
				mat.side = THREE.DoubleSide;
				mat.color = color;
				mat.needsUpdate = true;
				options.currentObject.material = mat;
	        }
        },
        
        changeMaterialTexture: function(event){
	        if(options.currentObject != null){
		        var string = event.target.style.backgroundImage;
		        var image = string.substring(4, string.length-1);
		        var texture = THREE.ImageUtils.loadTexture(image);
		        var mat = new THREE.MeshPhongMaterial();
				mat.map = texture;
				mat.side = THREE.DoubleSide;
		        options.currentObject.material = mat;
	        }
        },
        
        resetScene: function(){
	        window.location.href = ".";
        },
        
        exportScene: function(){
	        var result = options.core.scene.toJSON();
            localStorage.setItem("json", JSON.stringify(result)); 
	        
	        $.ajax({
				type: "POST",
				url: "http://digitalmediafinalproject.kaleidoscop.net/demo/upload/export.php",
				data: {jsonfile: result},
				success: function(response){
					window.open(response, 'Exported Scene');
				}
			});
        },
        
		makeTextFile: function(text){
			var data = new Blob([text], {type: 'text/plain'});

		    if (options.textFile !== null) {
		      window.URL.revokeObjectURL(options.textFile);
		    }
			options.textFile = window.URL.createObjectURL(data);
			return options.textFile;
  		},
        
        executeScript: function(){
			var el = document.getElementById('scriptText');
			var scriptText = el.value;
			var oldScript = document.getElementById('scriptContainer');
			var newScript;

		    if(oldScript){
		      oldScript.parentNode.removeChild(oldScript);
		    }

		    newScript = document.createElement('script');
		    newScript.id = 'scriptContainer';
		    newScript.text = el.value;
		    document.body.appendChild(newScript);
		    
		    $('#scriptModal').modal('hide');  
        },
        
        initListeners: function(){
	        document.getElementById('move-div').addEventListener('click', methods.translateObject);
	        document.getElementById('pointer-div').addEventListener('click', methods.moveView);
	        document.getElementById('scale-div').addEventListener('click', methods.scaleObject);
	        document.getElementById('rotate-div').addEventListener('click', methods.rotateObject);
	        document.getElementById('view-div').addEventListener('click', methods.hideObject);
	        document.getElementById('delete-div').addEventListener('click', methods.deleteObject);
	        document.getElementById('camera-div').addEventListener('click', methods.addCamera);
	        document.getElementById('light-div').addEventListener('click', methods.addLight);
	        document.getElementById('light-div').addEventListener('click', methods.addLight);
	        document.getElementById('cube-div').addEventListener('click', methods.addCube);
	        document.getElementById('sphere-div').addEventListener('click', methods.addSphere);
	        document.getElementById('plane-div').addEventListener('click', methods.addPlane);
	        
	        document.getElementById('resetScene').addEventListener('click', methods.resetScene);
	        document.getElementById('executeScript').addEventListener('click', methods.executeScript);
	        document.getElementById('exportFile').addEventListener('click', methods.exportScene);
	        
	        document.getElementById('minus-btn').addEventListener('click', methods.substractScaleGUIObject);
	        document.getElementById('plus-btn').addEventListener('click', methods.addScaleGUIObject);
	        
	        document.getElementById('arrow-left').addEventListener('click', methods.arrowLeft);
			document.getElementById('arrow-right').addEventListener('click', methods.arrowRight);
			document.getElementById('arrow-down').addEventListener('click', methods.arrowDown);
			document.getElementById('arrow-up').addEventListener('click', methods.arrowUp);
	        
	        var colorWrappers = document.getElementsByClassName('color-div');
	        for(var i=0;i<colorWrappers.length;i++){
		        colorWrappers[i].addEventListener('click', methods.changeMaterialColor);
	        }
	        var imageWrappers = document.getElementsByClassName('image-div');
	        for(var i=0;i<imageWrappers.length;i++){
		        imageWrappers[i].addEventListener('click', methods.changeMaterialTexture);
	        }
	        
	        $('#scriptModal').on('show.bs.modal', function(e){
				window.setTimeout(function(){
					document.getElementById('scriptText').focus();
				}, 1000);
			});
			
			$('#saveModal').on('show.bs.modal', function(e){
				window.setTimeout(function(){
					document.getElementById('sceneName').focus();
				}, 1000);
			});
			
			$('#contactModal').on('show.bs.modal', function(e){
				window.setTimeout(function(){
					document.getElementById('name').focus();
				}, 1000);
			});
			$("#importFile").unbind("click").bind("click", function(){
			   $("#uploadFile").click();
			   
			});
			$('#uploadFile').fileupload({
		        url: 'http://digitalmediafinalproject.kaleidoscop.net/demo/upload/index.php',
		        dataType: 'json',
		        done: function (e, data) {
			        if(parseInt(data.result.response)==1){
				     	switch(data.result.type.toUpperCase()){
					     	case 'DAE':
								var loader = new THREE.ColladaLoader();
								loader.options.convertUpAxis = true;
								loader.load(data.result.url, function(collada){
									var dae = collada.scene;
									dae.traverse(function(child){
										child.isSelectable = true;
										child.isHidden = false;
																			
										var color = new THREE.Color('#FFFFFF');
										var mat = new THREE.MeshPhongMaterial();
										mat.map = null;
										mat.side = THREE.DoubleSide;
										mat.color = color;
										mat.needsUpdate = true;
										child.material = mat;
										
										if(child instanceof THREE.SkinnedMesh){
											var animation = new THREE.Animation(child, child.geometry.animation);
											animation.play();
										}
									});
									dae.scale.x = dae.scale.y = dae.scale.z = 0.02;
									dae.updateMatrix();
									options.core.object[options.numObj] = dae;
									options.core.scene.add(options.core.object[options.numObj]);
									options.numObj++;				
								});
					     	break;
					     	case 'JSON':
					     	case 'JS':
					     		var loader = new THREE.JSONLoader();
						 		loader.load(data.result.url, function(geometry, materials){
						 			var material = new THREE.MeshFaceMaterial(materials);
						 			var object = new THREE.Mesh(geometry, material);
						 			object.scale.x = object.scale.y = object.scale.z = 0.02;
						 			object.isSelectable = true;
									object.isHidden = false;
									var color = new THREE.Color('#FFFFFF');
									var mat = new THREE.MeshPhongMaterial();
									mat.map = null;
									mat.color = color;
									mat.needsUpdate = true;
									mat.side = THREE.DoubleSide;
									object.material = mat;
						 			options.core.scene.add(object);
								});
					     	break;
					     	case 'OBJ':
					     		var loader = new THREE.OBJLoader();
						 		loader.load(data.result.url, function(object){
						 			object.traverse(function(child){
										var color = new THREE.Color('#FFFFFF');
										var mat = new THREE.MeshPhongMaterial();
										mat.map = null;
										mat.side = THREE.DoubleSide;
										mat.color = color;
										mat.needsUpdate = true;
										child.material = mat;
									});
									object.isSelectable = true;
									object.isHidden = false;
									object.scale.x = object.scale.y = object.scale.z = 0.1;
									options.core.scene.add(object);
								});
					     	break;
				     	}   
			        } else {
				        alert('File type not compatible');
			        }
		        }
		    });
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