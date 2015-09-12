# ItemGL

<p>The ItemGL plugin implements an application that simply lets the user customize an item using WebGL and ThreeJS.</p>
<h2>Live Demo</h2>
<p>A live demo of the plugin can be seen here: <a href="http://digitalmediafinalproject.kaleidoscop.net/" target="_blank">http://digitalmediafinalproject.kaleidoscop.net/</a></p>
![alt tag](http://digitalmediafinalproject.kaleidoscop.net/img/Demo.png)
<h2>Documentation</h2>
<h3>Requirements</h3>
<pre>
  &lt;script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"&gt;&lt;/script&gt;
  &lt;script src="https://ajax.googleapis.com/ajax/libs/threejs/r69/three.min.js"&gt;&lt;/script&gt;
  
  &lt;script src="../js/ItemGL.min.js"&gt;&lt;/script&gt;
</pre>
<h3>Initialization</h3>
<p>To initialize the plugin call the constructor after $(document).ready() as below:</p>
<pre>  
  $(document).ready(function(e) {
	$("#canvas").ItemGL();
  });
</pre>
<h3>Options</h3>
<ul>
	<li><b>width</b> (int: 960)<br /><i>Width for the container</i></li>
	<li><b>height</b> (int: 540)<br /><i>Height for the container</i></li>
	<li><b>clearColor</b> (threeJSColor: 0xEEEEEE)<br /><i>Canvas background Color</i></li>
	<li><b>btnLeft</b> (Selector: '#btnPrevious')<br /><i>Turn Left button</i></li>
	<li><b>btnRight</b> (Selector: '#btnNext')<br /><i>Turn Right button</i></li>
</ul>
<h3>Methods</h3>
<ul>
	<li><b>init</b> (void)<br /><i>Initializes the plugin</i></li>
	<li><b>render</b> (void)<br /><i>Renders the scene</i></li>
</ul>
<ul>
	<li><b>translateObject</b><br /><i>Translates an object to the user selected point</i></li>
	<li><b>rotateObject</b><br /><i>Rotates an object to the user selected point</i></li>
	<li><b>hideObject</b><br /><i></i></li>
	<li><b>deleteObject</b><br /><i></i></li>
</ul>
<ul>
	<li><b>addCamera</b><br /><i></i></li>
	<li><b>addLight</b><br /><i></i></li>
	<li><b>addMaterial</b><br /><i></i></li>
</ul>
<ul>
	<li><b>exportScene</b><br /><i></i></li>
	<li><b>importScene</b><br /><i></i></li>
	<li><b>executeScript</b><br /><i></i></li>
</ul>
<h2>The ItemGL Creator</h2>
<p>ItemGL is maintained by <a href="https://github.com/llogaricasas" target="_blank">Llogari Casas</a></p>
<h2>Thank you!</h2>
<p>I really appreciate all kind of feedback and contributions. Thanks for using and supporting ItemGL!</p>
