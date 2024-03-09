<script>
	import { dndzone } from 'svelte-dnd-action';
	import NewList from './NewList.svelte';
	import List from './List.svelte';

	export let board;

	const flipDurationMs = 200;

	function handleDndConsiderColumns(e) {
		board.lists = e.detail.items;
	}

	function handleDndFinalizeColumns(e) {
		const lists = e.detail.items;

		board.lists = lists.map((list, i) => {
			if (list.id === e.detail.info.id) {
				let pos = 0;

				if (i === 0) {
					const firstList = lists[0];
					pos = firstList.pos / 2;
				} else if (i === lists.length - 1) {
					const lastList = lists[lists.length - 1];
					console.log(lastList.pos);
					pos = lastList.pos + list.pos;
				} else {
					const prevList = lists[i - 1];
					const nextList = lists[i + 1];
					pos = (prevList.pos + nextList.pos) / 2;
				}

				const body = new FormData();

				body.append('pos', pos);
				fetch(`/lists/${list.id}`, { method: 'PUT', body });

				return { ...list, pos };
			}
			return { ...list };
		});
	}
</script>

<section
	class="flex gap-x-2 p-2"
	use:dndzone={{ items: board.lists, flipDurationMs, type: 'columns' }}
	on:consider={handleDndConsiderColumns}
	on:finalize={handleDndFinalizeColumns}
>
	{#each board.lists as list (list.id)}
		<List {list} boardId={board.id} on:click={() => console.log('start drag')} />
	{/each}
	<NewList boardId={board.id} lastPos={board.lists[board.lists.length - 1]?.pos || 0} />
</section>
