<script>
	import { Banner } from 'flowbite-svelte';
	import NewList from '../../../components/NewList.svelte';
	import List from '../../../components/List.svelte';

	export let data;
</script>

<Banner dismissable={false}>
	<h1>{data.board.name}</h1>
</Banner>

<div class="flex gap-x-2 p-2">
	{#each data.board.lists as list (list.id)}
		<List {list} boardId={data.board.id} />
	{/each}
	<NewList boardId={data.board.id} />
</div>
