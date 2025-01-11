<script>
  import { getContext } from 'svelte';
  import { Input, Button } from 'flowbite-svelte';
  import { PlusSolid } from 'flowbite-svelte-icons';
  import { enhance } from '$app/forms';
  import { clickOutside } from '$lib/helpers';

  let { listId, boardId, lastPos = 0 } = $props();
  const step = $state(32);
  const { showForm } = getContext('ui');

  function onEnhance({ formElement }) {
    return async ({ update }) => {
      formElement.reset();
      await update();
      showForm.set(false);
    };
  }
</script>

{#if $showForm === listId}
  <div
    class="flex flex-col gap-y-2 px-4 py-4"
    use:clickOutside={() => {
      showForm.set(false);
    }}
  >
    <div>New Card</div>
    <form class="flex flex-col gap-y-2" action="/cards" method="post" use:enhance={onEnhance}>
      <Input type="text" name="name" placeholder="Enter list title" autofocus />
      <input type="hidden" name="listId" value={listId} />
      <input type="hidden" name="boardId" value={boardId} />
      <input type="hidden" name="pos" value={lastPos + step} />
      <Button type="submit">Add card</Button>
    </form>
  </div>
{:else}
  <div
    class="flex cursor-pointer flex-row gap-x-2 px-4 pt-1"
    onclick={(e) => {
      showForm.set(listId);
      e.stopPropagation();
    }}
  >
    <PlusSolid />
    <span>Add a card</span>
  </div>
{/if}
