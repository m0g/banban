<script>
	import { Input, Button } from 'flowbite-svelte';
	import { PlusSolid } from 'flowbite-svelte-icons';
	import { enhance } from '$app/forms';

	export let listId;
	export let boardId;
	export let lastPos = 0;

	const step = 32;
	let showForm = false;
</script>

{#if showForm}
	<div class="flex flex-col gap-y-2 py-4">
		<div>New Card (pos: {lastPos + step})</div>
		<form class="flex flex-col gap-y-2" action="/cards" method="post" use:enhance>
			<Input type="text" name="name" placeholder="Enter list title" />
			<input type="hidden" name="listId" value={listId} />
			<input type="hidden" name="boardId" value={boardId} />
			<input type="hidden" name="pos" value={lastPos + step} />
			<Button type="submit">Add card</Button>
		</form>
	</div>
{:else}
	<div class="flex cursor-pointer flex-row gap-x-2 py-4" on:click={() => (showForm = !showForm)}>
		<PlusSolid />
		<span>Add a card</span>
	</div>
{/if}
