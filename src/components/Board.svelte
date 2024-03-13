<script>
	import { dndzone } from 'svelte-dnd-action';
	import NewList from './NewList.svelte';
	import List from './List.svelte';

	export let board;
	export let focusedCardId;

	const flipDurationMs = 200;

	function handleDndConsiderLists(e) {
		board.lists = e.detail.items;
	}

	function handleDndFinalizeLists(e) {
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

	function handleDndConsiderCards(listId, e) {
		const listIndex = board.lists.findIndex((list) => list.id == listId);

		board.lists[listIndex].cards = e.detail.items;
		board.lists = [...board.lists];

		console.log(listIndex, e.detail);
	}

	function handleDndFinalizeCards(listId, e) {
		const listIndex = board.lists.findIndex((list) => list.id == listId);
		const cards = e.detail.items;

		board.lists[listIndex].cards = cards.map((card, i) => {
			if (card.id === e.detail.info.id) {
				let pos = 0;
				console.log(card.id, e.detail.info.id);

				if (i === 0) {
					const firstCard = cards[0];
					pos = firstCard.pos / 2;
				} else if (i === cards.length - 1) {
					const lastCard = cards[cards.length - 1];
					pos = lastCard.pos + card.pos;
				} else {
					const prevCard = cards[i - 1];
					const nextCard = cards[i + 1];
					pos = (prevCard.pos + nextCard.pos) / 2;
				}

				const listId = board.lists[listIndex].id;
				const body = new FormData();

				body.append('pos', pos);
				body.append('listId', listId);
				fetch(`/cards/${card.id}`, { method: 'PUT', body });

				return { ...card, pos, listId };
			}
			return { ...card };
		});

		board.lists = [...board.lists];

		console.log('finalize cards', e);
	}
</script>

<section
	class="relative flex flex-grow items-start gap-x-2 overflow-x-auto bg-white p-2"
	use:dndzone={{ items: board.lists, flipDurationMs, type: 'lists' }}
	on:consider={handleDndConsiderLists}
	on:finalize={handleDndFinalizeLists}
>
	<div
		class="pattern-isometric pattern-blue-500 pattern-bg-transparent pattern-opacity-60 pattern-size-8 absolute bottom-0 left-0 right-0 top-0 z-0"
	></div>
	{#each board.lists as list (list.id)}
		<List
			{list}
			boardId={board.id}
			on:click={() => console.log('start drag')}
			{handleDndConsiderCards}
			{handleDndFinalizeCards}
			{focusedCardId}
		/>
	{/each}
	<NewList boardId={board.id} lastPos={board.lists[board.lists.length - 1]?.pos || 0} />
</section>
