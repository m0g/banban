<script>
  import '../app.pcss';
  import NavBar from '../components/NavBar.svelte';
  import { dev } from '$app/environment';

  let { data, children } = $props();
  let devClass = $derived(dev ? 'border-4 border-red-500' : '');
</script>

<div class="flex h-screen w-full flex-col {devClass}">
  <NavBar {data} />
  {@render children?.()}
</div>
