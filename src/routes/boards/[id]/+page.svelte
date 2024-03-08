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
		console.log(e.detail.info.id);
		data.board.lists = e.detail.items;

		data.board.lists.forEach(async (list, i) => {
			if (list.id === e.detail.info.id) {
				let pos = 0;

				if (i === 0) {
					const firstList = data.board.lists[0];
					pos = firstList.pos / 2;
				} else if (i === data.board.lists.length - 1) {
					const lastList = data.board.lists[data.board.list.length - 1];
					pos = lastList * 2;
				} else {
					const prevList = data.board.lists[i - 1];
					const nextList = data.board.lists[i + 1];
					pos = (prevList.pos + nextList.pos) / 2;
				}

				const body = new FormData();

				body.append('pos', pos);
				await fetch(`/lists/${list.id}`, { method: 'PUT', body });
			}
		});
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
		<List {list} boardId={data.board.id} on:click={() => console.log('start drag')} />
	{/each}
	<NewList
		boardId={data.board.id}
		lastPos={data.board.lists[data.board.lists.length - 1]?.pos || 0}
	/>
</section>
