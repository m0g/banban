<script>
  import { invalidateAll } from '$app/navigation';
  import { Checkbox, Input } from 'flowbite-svelte';
  import { clickOutside } from '$lib/helpers';

  let showForm = $state(false);
  let { checkItem } = $props();
  const isChecked = $derived(checkItem.state === 'complete');

  async function onClick() {
    const body = new FormData();
    const newState = isChecked ? 'incomplete' : 'complete';

    body.append('state', newState);

    const res = await fetch(`/checkitems/${checkItem.id}`, { method: 'PUT', body });
    const data = await res.json();

    if (data.success === true) {
      checkItem.state = newState;
    }
  }

  async function onSubmitName(e) {
    e.preventDefault();
    e.stopPropagation();

    const body = new FormData();

    body.append('name', checkItem.name);

    const res = await fetch(`/checkitems/${checkItem.id}`, { method: 'PUT', body });
    const data = await res.json();

    if (data.success) {
      showForm = false;
      invalidateAll();
    }
  }

  function toggleForm(e) {
    e.stopPropagation();
    e.preventDefault();
    showForm = !showForm;
  }

  async function onClickDelete(e) {
    e.stopPropagation();

    const res = await fetch(`/checkitems/${checkItem.id}`, { method: 'DELETE' });
    const data = await res.json();

    if (data.success === true) {
      invalidateAll();
    }
  }
</script>

<Checkbox
  on:click={onClick}
  checked={isChecked}
  class={`${isChecked && 'line-through'} relative hover:bg-slate-400`}
>
  {#if showForm}
    <form
      class="flex flex-col gap-y-2 text-2xl font-bold"
      use:clickOutside={() => {
        showForm = false;
      }}
      on:submit|preventDefault={onSubmitName}
    >
      <Input
        type="text"
        name="name"
        placeholder="Enter card title"
        size="lg"
        bind:value={checkItem.name}
        autofocus
      />
    </form>
  {:else}
    <span class={isChecked && 'line-through'} on:click={toggleForm}>
      {checkItem.name}
    </span>
  {/if}
  <button class="absolute right-5" on:click={onClickDelete}>Delete</button>
</Checkbox>
