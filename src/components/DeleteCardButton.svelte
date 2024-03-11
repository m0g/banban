<script>
	import { GradientButton, Button, Modal } from 'flowbite-svelte';
	import { ExclamationCircleOutline } from 'flowbite-svelte-icons';

	let deleteModal = false;

	function onClick(e) {
		e.preventDefault();
		e.stopPropagation();
		deleteModal = true;
	}
</script>

<GradientButton shadow color="red" on:click={onClick}>Delete</GradientButton>

<Modal bind:open={deleteModal} autoclose size="xs">
	<div class="text-center">
		<ExclamationCircleOutline class="mx-auto mb-4 h-12 w-12 text-gray-400 dark:text-gray-200" />
		<h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
			Are you sure you want to delete this card?
		</h3>
		<Button color="red" class="me-2">Yes, I'm sure</Button>
		<Button color="alternative">No, cancel</Button>
	</div>
</Modal>
