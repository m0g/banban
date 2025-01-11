<script>
  import { ExclamationCircleOutline, TrashBinSolid } from 'flowbite-svelte-icons';
  import { invalidateAll } from '$app/navigation';
  import { Button, Modal } from 'flowbite-svelte';

  let { attachment } = $props();

  let deleteModal = $state(false);

  function onOpenModal(e) {
    e.preventDefault();
    e.stopPropagation();
    deleteModal = true;
  }

  async function onConfirm(e) {
    e.stopPropagation();
    const response = await fetch(`/attachments/${attachment.id}`, { method: 'DELETE' });

    if (response.ok) {
      invalidateAll();
    }
  }

  function onCancel(e) {
    e.preventDefault();
    e.stopPropagation();
    deleteModal = false;
  }
</script>

<li class="flex flex-row items-center justify-between rounded-sm bg-gray-600 px-2 py-1">
  <a href={`/attachments/${attachment.url}`} target="_blank">{attachment.filename}</a>
  <Button size="xs" outline color="alternative" on:click={onOpenModal}><TrashBinSolid /></Button>
</li>

<Modal bind:open={deleteModal} autoclose size="xs">
  <div class="text-center">
    <ExclamationCircleOutline class="mx-auto mb-4 h-12 w-12 text-gray-400 dark:text-gray-200" />
    <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
      Are you sure you want to remove this attachment
    </h3>
    <Button color="red" class="me-2" on:click={onConfirm}>Yes, I'm sure</Button>
    <Button color="alternative" on:click={onCancel}>No, cancel</Button>
  </div>
</Modal>
