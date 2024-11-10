<script>
	import { Router, Link, Route } from "svelte-routing";
	import Home from "./pages/Home.svelte";
	import Map from "./pages/Map.svelte";
  
	export let url = "";
  </script>
  
  <Router {url}>
	<main>
	  <Route path="/" component={Home} />
	  <Route path="/map" component={Map} />
	  <Route path="*" component={Home} />
	</main>
  </Router>
  
  <style>
	main {
	  width: 100%;
	  height: 100%;
	}
  </style>