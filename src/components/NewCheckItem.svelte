<script>
  import { Input, Button } from 'flowbite-svelte';
  import { enhance } from '$app/forms';
  import { clickOutside } from '$lib/helpers';

  export let checklist;
  export let card;

  let showForm = false;

  function onEnhance({ formElement }) {
    return async ({ update }) => {
      formElement.reset();
      await update();
      showForm = false;
    };
  }

  function toggleForm(e) {
    showForm = !showForm;
    e.stopPropagation();
  }
</script>

{#if showForm}
  <form
    class="flex flex-col items-start gap-y-2"
    action="/checkitems"
    method="post"
    use:enhance={onEnhance}
    use:clickOutside={() => {
      showForm = false;
    }}
  >
    <Input type="text" name="name" placeholder="Enter list title" autofocus />
    <input type="hidden" name="checkListId" value={checklist.id} />
    <input type="hidden" name="cardId" value={card.id} />
    <input type="hidden" name="state" value="incomplete" />
    <div>
      <Button type="submit" color="dark" on:click={(e) => e.stopPropagation()}>Add item</Button>
      <Button color="alternative" on:click={toggleForm}>Cancel</Button>
    </div>
  </form>
{:else}
  <div>
    <Button color="alternative" on:click={toggleForm}>Add an item</Button>
  </div>
{/if}
