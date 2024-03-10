<script>
	import { invalidateAll } from '$app/navigation';
	import { Dropdown, DropdownItem } from 'flowbite-svelte';
	import { DotsVerticalOutline } from 'flowbite-svelte-icons';
	import NewCard from './NewCard.svelte';
	import Card from './Card.svelte';

	export let list;
	export let boardId;

	async function deleteList() {
		await fetch(`/boards/${boardId}/lists/${list.id}`, { method: 'delete' });
		invalidateAll();
	}
</script>

<div class="white flex min-w-60 flex-col gap-y-2 rounded-lg bg-slate-500 px-4 py-4">
	<div class="flex flex-row">
		<div class="flex-grow">{list.name} (pos: {list.pos})</div>
		<DotsVerticalOutline class="dots-menu dark:text-white" />
		<Dropdown triggeredBy=".dots-menu">
			<DropdownItem on:click={deleteList}>Delete</DropdownItem>
		</Dropdown>
	</div>
	{#each list.cards as card}
		<Card {card} {boardId} />
	{/each}
	<NewCard listId={list.id} {boardId} />
</div>
