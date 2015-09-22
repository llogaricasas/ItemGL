<html lang="en">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<meta name="author" content="Llogari Casas" />
		<meta name="description" content="The ItemGL plugin implements an application that simply lets the user customize an item using WebGL and ThreeJS." />
		<meta name="keywords" content="3D, jQuery, Javascript, ItemGL, Llogari, Casas, threeJS, WebGL, Kingston, University, GitHub" />
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>ItemGL - WebApp</title>
		<link href="css/style.css" rel="stylesheet" type="text/css" />
		<link href="bootstrap/css/bootstrap.css" rel="stylesheet" type="text/css" />
		<link href="img/favicon.ico" rel="icon" />
	</head>
	<body>
		<div class="logobar"></div>
		<div class="topbar">
			<div class="section">
				<ul class="nav navbar-nav navbar-left">
					<li class="dropdown">
						<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">File <span class="caret"></span></a>
				        <ul class="dropdown-menu">
					        <li><a id="resetScene">Reset Scene</a></li>
					        <li class="divider"></li>
					        <li><a data-toggle="modal" data-target="#scriptModal">Execute Script</a></li>
					        <li class="divider"></li>
				        	<li><a id="importFile">Import <span class="fileType">(*.obj, *.dae, *.json)</span></a></li>
				            <li><a id="exportFile">Export <span class="fileType">(*.json)</span></a></li>
				        </ul>
				    </li>
					<li><a data-toggle="modal" data-target="#helpModal">Help</a></li>
					<li><a href="https://github.com/llogaricasas/ItemGL" target="_blank">API</a></li>
					<li><a data-toggle="modal" data-target="#contactModal">Contact</a></li>
				</ul>
				<div class="tool-wrapper" id="cube-div">
					<a class="tool" id="cube">
						<img src="img/Cube.png" alt="Cube" />
					</a>
				</div>
				<div class="tool-wrapper" id="sphere-div">
					<a class="tool" id="sphere">
						<img src="img/Sphere.png" alt="Sphere" />
					</a>
				</div>
				<div class="tool-wrapper" id="plane-div">
					<a class="tool" id="plane">
						<img src="img/Plane.png" alt="Plane" />
					</a>
				</div>
			</div>
		</div>
		<div class="leftbar">
			<div class="section">
				<div class="tool-wrapper" id="pointer-div">
					<a class="tool" id="pointer">
						<img src="img/Pointer.png" alt="Pointer" />
					</a>
				</div>
				<div class="tool-wrapper" id="move-div">
					<a class="tool" id="move">
						<img src="img/Move.png" alt="Translate" />
					</a>
				</div>
				<div class="tool-wrapper" id="rotate-div">
					<a class="tool" id="rotate">
						<img src="img/Rotate.png" alt="Rotate" />
					</a>
				</div>
				<div class="tool-wrapper" id="scale-div">
					<a class="tool" id="scale">
						<img src="img/Scale.png" alt="Scale" />
					</a>
				</div>
			</div>
			<div class="section">
				<div class="tool-wrapper" id="view-div">
					<a class="tool" id="view">
						<img src="img/Hide.png" alt="View" />
					</a>
				</div>
				<div class="tool-wrapper" id="delete-div">
					<a class="tool" id="delete">
						<img src="img/Delete.png" alt="Delete" />
					</a>
				</div>
			</div>
			<div class="section">
				<div class="tool-wrapper" id="camera-div">
					<a class="tool" id="camera">
						<img src="img/Camera.png" alt="Add New Camera" />
					</a>
				</div>
				<div class="tool-wrapper" id="light-div">
					<a class="tool" id="light">
						<img src="img/Light.png" alt="Add New Light" />
					</a>
				</div>
			</div>
		</div>
		<div class="rightbar">
			<div class="section">
				<h2>Properties</h2>
				<div id="properties-wrapper">
					<div class="item">
						<b>ID:</b>
						<span id="item-id">--</span>
					</div>
					<div class="item">
						<b>Geometry:</b>
						<span id="item-geometry">--</span>
					</div>
					<div class="item">
						<b>Color:</b>
						<span id="item-color">--</span>
					</div>
					<div class="item">
						<b>Material:</b>
						<span id="item-material">--</span>
					</div>
					<div class="item">
						<b>Position:</b>
						<span id="item-position">--</span>
					</div>
				</div>
			</div>
			<div class="section">
				<h2>Color</h2>
				<div id="color-wrapper">
					<div class="color-div" style="background-color: #800000;"></div>
					<div class="color-div" style="background-color: #FF0000;"></div>
					<div class="color-div" style="background-color: #FFA500;"></div>
					<div class="color-div" style="background-color: #FFFF00;"></div>
					<div class="color-div" style="background-color: #808000;"></div>
					<div class="color-div" style="background-color: #800080;"></div>
					<div class="color-div" style="background-color: #FF00FF;"></div>
					<div class="color-div" style="background-color: #FFFFFF;"></div>
					<div class="color-div" style="background-color: #00FF00;"></div>
					<div class="color-div" style="background-color: #008000;"></div>
					<div class="color-div" style="background-color: #000080;"></div>
					<div class="color-div" style="background-color: #0000FF;"></div>
					<div class="color-div" style="background-color: #00FFFF;"></div>
					<div class="color-div" style="background-color: #008080;"></div>
					<div class="color-div" style="background-color: #000000;"></div>
					<div class="color-div" style="background-color: #C0C0C0;"></div>
					<div class="color-div" style="background-color: #808080;"></div>
					<div class="color-div" style="background-color: #999999;"></div>
				</div>
			</div>
			<div class="section">
				<h2>Materials</h2>
				<div id="color-wrapper">
					<div class="image-div" style="background-image: url(materials/LeatherPattern01.jpg);"></div>
					<div class="image-div" style="background-image: url(materials/LeatherPattern02.jpg);"></div>
					<div class="image-div" style="background-image: url(materials/LeatherPattern03.jpg);"></div>
					<div class="image-div" style="background-image: url(materials/LeatherPattern04.jpg);"></div>
					<div class="image-div" style="background-image: url(materials/WoodPattern01.jpg);"></div>
					<div class="image-div" style="background-image: url(materials/WoodPattern02.jpg);"></div>
					<div class="image-div" style="background-image: url(materials/WoodPattern03.jpg);"></div>
					<div class="image-div" style="background-image: url(materials/WoodPattern04.jpg);"></div>
					<div class="image-div" style="background-image: url(materials/MetalPattern01.jpg);"></div>
					<div class="image-div" style="background-image: url(materials/MetalPattern02.jpg);"></div>
					<div class="image-div" style="background-image: url(materials/MetalPattern03.jpg);"></div>
					<div class="image-div" style="background-image: url(materials/MetalPattern04.jpg);"></div>
					<div class="image-div" style="background-image: url(materials/CeramicPattern01.jpg);"></div>
					<div class="image-div" style="background-image: url(materials/CeramicPattern02.jpg);"></div>
					<div class="image-div" style="background-image: url(materials/CeramicPattern03.jpg);"></div>
					<div class="image-div" style="background-image: url(materials/CeramicPattern04.jpg);"></div>
					<div class="image-div" style="background-image: url(materials/GrassPattern01.jpg);"></div>
					<div class="image-div" style="background-image: url(materials/GrassPattern02.jpg);"></div>
				</div>
			</div>
		</div>
		<div class="bottombar"></div>
		<div id="canvas"></div>
		<a id="minus-btn"></a>
		<a id="plus-btn"></a>
		<a id="arrow-left"></a>
		<a id="arrow-up"></a>
		<a id="arrow-down"></a>
		<a id="arrow-right"></a>
		<div class="modal fade" id="helpModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
		  <div class="modal-dialog">
		    <div class="modal-content">
		      <div class="modal-header">
		        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
		        <h4 class="modal-title">Help</h4>
		      </div>
		      <div class="modal-body">
			      <div class="row">
			        <div class="col-sm-1">
				        <img src="help/Pointer.png" alt="Pointer" />
			        </div>
			        <div class="col-sm-9">
					    <b>Pointer Tool: </b><span>Selects objects when you click the objects or drag a selection area around them.</span>
			        </div>
			      </div>
			      <div class="row">
			        <div class="col-sm-1">
				        <img src="help/Move.png" alt="Translate" />
			        </div>
			        <div class="col-sm-9">
					    <b>Translate Tool: </b><span>Moves geometry in three different planes in a 3D environment.</span>
			        </div>
			      </div>
			      <div class="row">
			        <div class="col-sm-1">
				        <img src="help/Rotate.png" alt="Rotate" />
			        </div>
			        <div class="col-sm-9">
					    <b>Rotate Tool: </b><span>Rotates geometry in three different planes in a 3D environment using the keyboard arrows.</span>
			        </div>
			      </div>
			      <div class="row">
			        <div class="col-sm-1">
				        <img src="help/Scale.png" alt="Scale" />
			        </div>
			        <div class="col-sm-9">
					    <b>Scale Tool: </b><span>Scales geometry using the keyboard <b>1</b> and <b>2</b> keys.</span>
			        </div>
			      </div>
			      <hr />
			      <div class="row">
			        <div class="col-sm-1">
				        <img src="help/Hide.png" alt="Hide" />
			        </div>
			        <div class="col-sm-9">
					    <b>Hide Tool: </b><span>Hides an object of the scene</span>
			        </div>
			      </div>
			      <div class="row">
			        <div class="col-sm-1">
				        <img src="help/Delete.png" alt="Delete" />
			        </div>
			        <div class="col-sm-9">
					    <b>Delete Tool: </b><span>Deletes an object of the scene</span>
			        </div>
			      </div>
			      <hr />
			      <div class="row">
			        <div class="col-sm-1">
				        <img src="help/Camera.png" alt="Camera" />
			        </div>
			        <div class="col-sm-9">
					    <b>Camera Tool: </b><span>Adds a camera to the Scene.</span>
			        </div>
			      </div>
			      <div class="row">
			        <div class="col-sm-1">
				        <img src="help/Light.png" alt="Light" />
			        </div>
			        <div class="col-sm-9">
					    <b>Light Tool: </b><span>Adds a Point Light to the Scene.</span>
			        </div>
			      </div>
			      <hr />
			      <div class="row">
			        <div class="col-sm-1">
				        <img src="help/Color.png" alt="Color" />
			        </div>
			        <div class="col-sm-9">
					    <b>Color Tool: </b><span>Changes the color of the selected object.</span>
			        </div>
			      </div>
			      <div class="row">
			        <div class="col-sm-1">
				        <img src="help/Material.png" alt="Material" />
			        </div>
			        <div class="col-sm-9">
					    <b>Material Tool: </b><span>Changes the material of the selected object.</span>
			        </div>
			      </div>
		      </div>
		      <div class="modal-footer">
		        <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
		      </div>
		    </div>
		  </div>
		</div>
		<div class="modal fade" id="contactModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
		  <div class="modal-dialog">
		    <div class="modal-content">
		      <div class="modal-header">
		        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
		        <h4 class="modal-title">Contact</h4>
		      </div>
		      <div class="modal-body">
		        <form class="form-horizontal" role="form" method="post" action="index.php">
				    <div class="form-group">
				        <label for="name" class="col-sm-2 control-label">Name</label>
				        <div class="col-sm-8">
				            <input type="text" class="form-control" id="name" name="name" placeholder="First & Last Name" value="" tabindex="1">
				        </div>
				    </div>
				    <div class="form-group">
				        <label for="email" class="col-sm-2 control-label">Email</label>
				        <div class="col-sm-8">
				            <input type="email" class="form-control" id="email" name="email" placeholder="example@domain.com" value="" tabindex="2">
				        </div>
				    </div>
				    <div class="form-group">
				        <label for="message" class="col-sm-2 control-label">Message</label>
				        <div class="col-sm-8">
				            <textarea class="form-control" rows="4" name="message" tabindex="3"></textarea>
				        </div>
				    </div>
				    <div class="form-group">
				        <div class="col-sm-10 col-sm-offset-2"></div>
				    </div>
				</form>
		      </div>
		      <div class="modal-footer">
		        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
		        <button type="button" class="btn btn-primary">Send</button>
		      </div>
		    </div>
		  </div>
		</div>
		<div class="modal fade" id="saveModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
		  <div class="modal-dialog">
		    <div class="modal-content">
		      <div class="modal-header">
		        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
		        <h4 class="modal-title">Save Scene</h4>
		      </div>
		      <div class="modal-body">
		        <input type="text" name="sceneName" id="sceneName" placeholder="Name" class="fullWidth"/>
		      </div>
		      <div class="modal-footer">
		        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
		        <button type="button" class="btn btn-primary">Save changes</button>
		      </div>
		    </div>
		  </div>
		</div>
		<div class="modal fade" id="scriptModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
		  <div class="modal-dialog">
		    <div class="modal-content">
		      <div class="modal-header">
		        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
		        <h4 class="modal-title">Execute Script</h4>
		      </div>
		      <div class="modal-body">
		        <textarea id="scriptText" name="scriptText"></textarea>
		      </div>
		      <div class="modal-footer">
		        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
		        <button type="button" class="btn btn-primary" id="executeScript">Execute</button>
		      </div>
		    </div>
		  </div>
		</div>
		<div class="hidden">
			<form name="uploadItem" name="uploadItem" enctype="multipart/form-data">
				<input type="file" name="uploadFile" id="uploadFile" />
			</form>
		</div>
		<script type="text/javascript" src="js/jquery-1.11.2.min.js"></script>
		<script type="text/javascript" src="js/jquery.mobile-1.4.5.min.js"></script>
		<script type="text/javascript" src="bootstrap/js/bootstrap.js"></script>
		<script type="text/javascript" src="js/jquery.ui.widget.js"></script>
		<script type="text/javascript" src="js/jquery.fileupload.js"></script>
		<script type="text/javascript" src="js/three.min.js"></script>
		<script type="text/javascript" src="js/ColladaLoader.js"></script>
		<script type="text/javascript" src="js/OBJLoader.js"></script>
		<script type="text/javascript" src="js/SceneExporter.js"></script>
		<script type="text/javascript" src="js/TrackballControls.js"></script>
		<script type="text/javascript" src="js/threex.domevent.js"></script>
		<script type="text/javascript" src="js/ItemGL.js"></script>
		<script type="text/javascript" src="js/init.js"></script>
	</body>
</html>