<script>
  import { goto } from '$app/navigation';
  import { GradientButton, Button, Modal, Popover } from 'flowbite-svelte';
  import { ExclamationCircleOutline, TrashBinSolid } from 'flowbite-svelte-icons';

  export let cardId;
  export let boardId;

  async function onConfirm(e) {
    e.stopPropagation();
    const response = await fetch(`/cards/${cardId}`, { method: 'DELETE' });

    if (response.ok) {
      goto(`/boards/${boardId}`);
    }
  }
</script>

<Popover
  class="z-60 fixed w-80 text-sm font-light"
  title="Add checklist"
  triggeredBy="#deleteCard"
  trigger="click"
  placement="bottom"
  arrow={false}
>
  <div class="py-4 text-center">
    <ExclamationCircleOutline class="mx-auto mb-4 h-12 w-12 text-gray-400 dark:text-gray-200" />
    <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
      Are you sure you want to delete this card?
    </h3>
    <Button color="red" class="me-2" on:click={onConfirm}>Yes, I'm sure</Button>
  </div>
</Popover>
