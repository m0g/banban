<script>
  import { invalidateAll } from '$app/navigation';
  import { Input } from 'flowbite-svelte';

  let { checklist } = $props();
  let showForm = $state(false);

  async function onSubmit(e) {
    e.preventDefault();
    const body = new FormData();

    body.append('name', checklist.name);

    const res = await fetch(`/checklists/${checklist.id}`, { method: 'PUT', body });
    const data = await res.json();

    if (data.success) {
      showForm = false;
      invalidateAll();
    }
  }
</script>

{#if showForm}
  <form class="flex flex-grow flex-col gap-y-2 text-2xl font-bold" onsubmit={onSubmit}>
    <Input
      type="text"
      name="name"
      placeholder="Enter card title"
      size="lg"
      bind:value={checklist.name}
      autofocus
    />
  </form>
{:else}
  <div class="flex-grow text-xl font-bold" onclick={() => (showForm = !showForm)}>
    {checklist.name}
  </div>
{/if}
