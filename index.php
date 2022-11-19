<?php 
header("Cache-Control: no-cache, must-revalidate");
header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
$no_log = "";
// $no_log = "window.console.log = function ()  {}";
?>

<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>vue person list</title>
	 <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
	 <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
	 <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.41/vue.global.min.js"></script>
	 <script src="https://cdnjs.cloudflare.com/ajax/libs/vue-router/4.1.6/vue-router.global.js"></script>
	 <script defer src="https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js"></script>
	<script defer src="https://www.gstatic.com/firebasejs/8.10.1/firebase-auth.js"></script>
	<script defer src="https://www.gstatic.com/firebasejs/8.10.1/firebase-firestore.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/vue-demi/0.13.11/index.iife.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/pinia/2.0.23/pinia.iife.js"></script>

	  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
	<link rel="stylesheet" href="local-styles.css">
</head>
<body>
	<div id="loading" style="height: 100vh" class="center-xy">
		<div class="preloader-wrapper small active">
		    <div class="spinner-layer spinner-green-only">
		      <div class="circle-clipper left">
		        <div class="circle"></div>
		      </div><div class="gap-patch">
		        <div class="circle"></div>
		      </div><div class="circle-clipper right">
		        <div class="circle"></div>
		      </div>
		    </div>
		  </div>
	</div>
	<div id="app"></div>
	<script type="module" defer>

		<?php echo $no_log; ?>

		import index from "./index.js"
		import routings from "./js/routings.js"
		
		const app = Vue.createApp(await index())
		const pinia = Pinia.createPinia();

		app.use(routings)
		app.use(pinia)
		app.mount("#app")



	</script>
</body>
</html>