<script>
	import { Card } from 'flowbite-svelte';
	import NewBoard from '../../components/NewBoard.svelte';
	export let data;
</script>

<main class="p-4">
	<h1 class="text-xl font-bold">Boards</h1>
	<div class="flex flex-wrap gap-4">
		{#each data.boards as board (board.id)}
			<a href="/boards/{board.id}">
				<Card class="h-48 w-72">{board.name}</Card>
			</a>
		{/each}
		<NewBoard />
	</div>
</main>
