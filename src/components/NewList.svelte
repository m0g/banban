<script>
  import { Input, Button } from 'flowbite-svelte';
  import { PlusSolid } from 'flowbite-svelte-icons';
  import { enhance } from '$app/forms';
  import { clickOutside } from '$lib/helpers';

  export let boardId;
  export let lastPos;

  const step = 32;
  let showForm = false;

  function onEnhance({ formElement }) {
    return async ({ update }) => {
      formElement.reset();
      await update();
      showForm = false;
    };
  }
</script>

{#if showForm}
  <div
    class="z-10 flex min-w-60 flex-col gap-y-2 rounded-lg bg-slate-400 px-6 py-4"
    use:clickOutside={() => {
      showForm = false;
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
  <div
    class="z-10 flex min-w-60 shrink cursor-pointer flex-row gap-x-2 rounded-lg bg-slate-200 px-6 py-4"
    on:click={(e) => {
      showForm = !showForm;
      e.stopPropagation();
    }}
  >
    <PlusSolid />
    <span>Add another list</span>
  </div>
{/if}
