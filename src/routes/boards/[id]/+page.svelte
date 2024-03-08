<script>
	import { Banner } from 'flowbite-svelte';
	import { dndzone } from 'svelte-dnd-action';
	import NewList from '../../../components/NewList.svelte';
	import List from '../../../components/List.svelte';

	export let data;

	const flipDurationMs = 200;

	function handleDndConsiderColumns(e) {
		console.log('consider', e);
		data.board.lists = e.detail.items;
	}

	function handleDndFinalizeColumns(e) {
		console.log('finalize', e);
		data.board.lists = e.detail.items.map((item, i) => ({
			...item,
			pos: i + 1
		}));
	}
</script>

<Banner dismissable={false}>
	<h1>{data.board.name}</h1>
</Banner>

<section
	class="flex gap-x-2 p-2"
	use:dndzone={{ items: data.board.lists, flipDurationMs, type: 'columns' }}
	on:consider={handleDndConsiderColumns}
	on:finalize={handleDndFinalizeColumns}
>
	{#each data.board.lists as list (list.id)}
		<List {list} boardId={data.board.id} />
	{/each}
	<NewList
		boardId={data.board.id}
		lastPos={data.board.lists[data.board.lists.length - 1]?.pos || 0}
	/>
</section>
