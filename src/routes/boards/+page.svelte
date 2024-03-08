<script>
	import { Card } from 'flowbite-svelte';
	import NewBoard from '../../components/NewBoard.svelte';
	export let data;
</script>

<h1>Boards</h1>
{#each data.boards as board (board.id)}
	<Card><a href="/boards/{board.id}">{board.name}</a></Card>
{/each}
<NewBoard />
