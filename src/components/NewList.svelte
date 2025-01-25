<script>
  import { getContext } from 'svelte';
  import { Input, Button } from 'flowbite-svelte';
  import { PlusSolid } from 'flowbite-svelte-icons';
  import { enhance } from '$app/forms';
  import { clickOutside } from '$lib/helpers';

  let { boardId, lastPos } = $props();
  const { showForm } = getContext('ui');
  const step = 32;

  function onEnhance({ formElement }) {
    return async ({ update }) => {
      formElement.reset();
      await update();
      showForm.set(false);
    };
  }

  function onClick(e) {
    showForm.set('new-list');
    e.stopPropagation();
  }
</script>

{#if $showForm === 'new-list'}
  <div
    class="z-10 flex min-w-60 flex-col gap-y-2 rounded-lg bg-slate-400 px-6 py-4"
    use:clickOutside={() => {
      showForm.set(false);
    }}
  >
    <div>New List</div>
    <form class="flex flex-col gap-y-2" action="/lists" method="post" use:enhance={onEnhance}>
      <Input type="text" name="name" placeholder="Enter list title" autofocus />
      <input type="hidden" name="boardId" value={boardId} />
      <input type="hidden" name="pos" value={lastPos + step} />
      <Button type="submit">Add list</Button>
    </form>
  </div>
{:else}
  <button
    class="z-10 flex min-w-60 shrink cursor-pointer flex-row gap-x-2 rounded-lg bg-slate-200 px-6 py-4"
    onclick={onClick}
  >
    <PlusSolid />
    <span>Add another listttt</span>
  </button>
{/if}
