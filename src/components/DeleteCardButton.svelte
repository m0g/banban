<script>
	import { goto } from '$app/navigation';
	import { GradientButton, Button, Modal } from 'flowbite-svelte';
	import { ExclamationCircleOutline, TrashBinSolid } from 'flowbite-svelte-icons';

	export let cardId;
	export let boardId;

	let deleteModal = false;

	function onOpenModal(e) {
		e.preventDefault();
		e.stopPropagation();
		deleteModal = true;
	}

	async function onConfirm(e) {
		e.stopPropagation();
		const response = await fetch(`/cards/${cardId}`, { method: 'DELETE' });

		if (response.ok) {
			goto(`/boards/${boardId}`);
		}
	}

	function onCancel(e) {
		e.preventDefault();
		e.stopPropagation();
		deleteModal = false;
	}
</script>

<GradientButton color="red" on:click={onOpenModal} class="relative">
	<TrashBinSolid class="absolute left-4 h-4 w-4" /> Delete
</GradientButton>

<Modal bind:open={deleteModal} autoclose size="xs">
	<div class="text-center">
		<ExclamationCircleOutline class="mx-auto mb-4 h-12 w-12 text-gray-400 dark:text-gray-200" />
		<h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
			Are you sure you want to delete this card?
		</h3>
		<Button color="red" class="me-2" on:click={onConfirm}>Yes, I'm sure</Button>
		<Button color="alternative" on:click={onCancel}>No, cancel</Button>
	</div>
</Modal>
