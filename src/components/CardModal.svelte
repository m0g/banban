<script>
	import { goto } from '$app/navigation';
	import { Modal } from 'flowbite-svelte';
	import TipTap from './TipTap.svelte';
	import DeleteCardButton from './DeleteCardButton.svelte';

	export let card;
	export let boardId;
	console.log(card);
</script>

<Modal
	bind:open={card}
	autoclose
	outsideclose
	placement="center"
	on:close={() => goto(`/boards/${boardId}`)}
	size="lg"
	class="relative z-20 cursor-default"
	backdropClass="fixed inset-0 z-40 bg-gray-900 bg-opacity-40"
>
	<div class="text-2xl font-bold">{card.name}</div>
	<div class="flex flex-row gap-4">
		<div class="flex-grow gap-2">
			<div>In list: {card.list.name}</div>
			<div class="flex flex-col gap-2">
				<h3 class="text-xl font-bold">Description</h3>
				<TipTap element={card.desc} />
			</div>
		</div>
		<div class="flex w-48 flex-col gap-y-2">
			<div class="font-bold">Actions</div>
			<DeleteCardButton />
		</div>
	</div>
</Modal>
