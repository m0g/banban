<script>
  import { invalidateAll } from '$app/navigation';
  import { Button, Modal } from 'flowbite-svelte';
  import { ExclamationCircleOutline } from 'flowbite-svelte-icons';

  export let comment;

  let deleteModal = false;

  function onOpenModal(e) {
    e.preventDefault();
    e.stopPropagation();
    deleteModal = true;
  }
  async function onConfirm(e) {
    e.stopPropagation();
    const response = await fetch(`/comments/${comment.id}`, { method: 'DELETE' });

    if (response.ok) {
      deleteModal = false;
      invalidateAll();
    }
  }

  function onCancel(e) {
    e.preventDefault();
    e.stopPropagation();
    deleteModal = false;
  }
</script>

<div>
  <div class="white flex-grow rounded-lg bg-gray-600 px-2 py-1">
    {@html comment.text}
  </div>
  <button class="text-sm underline underline-offset-2" on:click={onOpenModal}> Delete </button>
</div>

<Modal bind:open={deleteModal} autoclose size="xs">
  <div class="text-center">
    <ExclamationCircleOutline class="mx-auto mb-4 h-12 w-12 text-gray-400 dark:text-gray-200" />
    <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
      Are you sure you want to delete this comment?
    </h3>
    <Button color="red" class="me-2" on:click={onConfirm}>Yes, I'm sure</Button>
    <Button color="alternative" on:click={onCancel}>No, cancel</Button>
  </div>
</Modal>
