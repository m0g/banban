<script>
	import { Banner } from 'flowbite-svelte';

	export let name;
</script>

<Banner dismissable={false}>
	<h1 class="text-white">{name}</h1>
</Banner>
