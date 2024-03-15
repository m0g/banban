<script>
	import { Banner } from 'flowbite-svelte';

	export let name;
</script>

<Banner dismissable={false} class="bg-backdrop-blur z-10 flex justify-between bg-gray-700/30 p-4">
	<h1 class="text-white font-bold">{name}</h1>
</Banner>
