<script>
  import { Input } from 'flowbite-svelte';

  let { list } = $props();
  let showForm = $state(false);

  async function onSubmit(e) {
    e.preventDefault();
    const body = new FormData();

    body.append('name', list.name);

    const res = await fetch(`/lists/${list.id}`, { method: 'PUT', body });
    const data = await res.json();

    if (data.success) {
      showForm = false;
    }
  }
</script>

{#if showForm}
  <form class="flex flex-col gap-y-2" onsubmit={onSubmit}>
    <Input
      type="text"
      name="name"
      placeholder="Enter list title"
      bind:value={list.name}
      autofocus
    />
  </form>
{:else}
  <div class="flex-grow" onclick={() => (showForm = !showForm)}>{list.name}</div>
{/if}
