<script>
	import { goto } from '$app/navigation';
	import { Modal } from 'flowbite-svelte';
	import TipTap from './TipTap.svelte';
	import DeleteCardButton from './DeleteCardButton.svelte';

	export let card;
	export let boardId;
	export let list;
	export let focusedCardId;

	let clickOutsideModal = focusedCardId == card.id ? true : false;
</script>

<div
	class="white flex min-w-60 flex-col gap-y-2 rounded-lg bg-slate-300 px-6 py-4"
	on:click={() => goto(`/cards/${card.id}`)}
>
	<div class="flex flex-row">
		<div class="flex-grow">{card.name}</div>
	</div>
</div>

<Modal
	bind:open={clickOutsideModal}
	autoclose
	outsideclose
	placement="center"
	on:close={() => goto(`/boards/${boardId}`)}
	size="lg"
>
	<div class="text-2xl font-bold">{card.name}</div>
	<div class="flex flex-row">
		<div class="flex-grow">
			<div>In list: {list.name}</div>
			<div class="flex flex-col">
				<h3 class="text-xl font-bold">Description</h3>
				<TipTap />
			</div>
		</div>
		<div class="flex w-48 flex-col gap-y-2">
			<div class="font-bold">Actions</div>
			<DeleteCardButton />
		</div>
	</div>
</Modal>
