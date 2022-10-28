<?php 

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
	  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
	<link rel="stylesheet" href="local-styles.css">
</head>
<body>
	<div id="app"></div>
	<script type="module" defer>

		import index from "./index.js"
		import home from "./js/home.js"
		import routings from "./js/routings.js"
		
		const app = Vue.createApp(await index())
		

		app.use(routings)

		app.mount("#app")

		// console.log(Vue)

	</script>
</body>
</html>