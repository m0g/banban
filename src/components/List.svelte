<script>
	import { dndzone } from 'svelte-dnd-action';
	import { invalidateAll } from '$app/navigation';
	import { Dropdown, DropdownItem } from 'flowbite-svelte';
	import { DotsVerticalOutline } from 'flowbite-svelte-icons';
	import NewCard from './NewCard.svelte';
	import Card from './Card.svelte';

	export let list;
	export let boardId;
	export let handleDndConsiderCards;
	export let handleDndFinalizeCards;
	export let focusedCardId;

	const flipDurationMs = 200;

	$: cards = list.cards || [];

	async function deleteList() {
		await fetch(`/boards/${boardId}/lists/${list.id}`, { method: 'delete' });
		invalidateAll();
	}
</script>

<div class="white flex w-72 flex-col gap-y-2 rounded-lg bg-slate-500 px-4 py-4">
	<div class="flex flex-row">
		<div class="flex-grow">{list.name}</div>
		<DotsVerticalOutline class="dots-menu dark:text-white" />
		<Dropdown triggeredBy=".dots-menu">
			<DropdownItem on:click={deleteList}>Delete</DropdownItem>
		</Dropdown>
	</div>
	<div
		use:dndzone={{ items: cards, flipDurationMs, type: 'cards' }}
		on:consider={(e) => handleDndConsiderCards(list.id, e)}
		on:finalize={(e) => handleDndFinalizeCards(list.id, e)}
		class="flex min-h-16 flex-col gap-y-2"
	>
		{#each cards as card (card.id)}
			<Card {card} {boardId} {list} {focusedCardId} />
		{/each}
	</div>
	<NewCard listId={list.id} {boardId} lastPos={cards[cards.length - 1]?.pos || 0} />
</div>
