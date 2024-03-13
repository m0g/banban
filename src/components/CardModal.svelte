<script>
	import { goto } from '$app/navigation';
	import { Modal } from 'flowbite-svelte';
	import { WindowSolid, TextSizeSolid } from 'flowbite-svelte-icons';
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
	bodyClass="bg-slate-500 p-4 md:p-5 space-y-4 flex-1 overflow-y-auto overscroll-contain rounded-lg text-white"
	backdropClass="fixed inset-0 z-40 bg-gray-900 bg-opacity-40"
>
	<div class="flex flex-row gap-4">
		<div class="flex flex-grow flex-col gap-4">
			<div class="flex flex-grow flex-row gap-2">
				<WindowSolid class="h-8 w-8" />
				<div class="flex flex-col gap-2">
					<div class="text-2xl font-bold">{card.name}</div>
					<div>In list: {card.list.name}</div>
				</div>
			</div>
			<div class="flex flex-grow flex-row gap-2">
				<TextSizeSolid class="h-8 w-8" />
				<div class="flex flex-grow flex-col gap-2">
					<h3 class="text-xl font-bold">Description</h3>
					<TipTap element={card.desc} />
				</div>
			</div>
		</div>

		<div class="flex w-48 flex-col gap-y-2">
			<div class="font-bold">Actions</div>
			<DeleteCardButton />
		</div>
	</div>
</Modal>
