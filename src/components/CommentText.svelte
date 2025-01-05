<script>
  import { invalidateAll } from '$app/navigation';
  import TipTap from './TipTap.svelte';

  let { card } = $props();
  let showForm = $state(false);

  async function handleSubmit(value) {
    const body = new FormData();

    body.append('text', value);
    body.append('cardId', card.id);

    const res = await fetch('/comments', { method: 'POST', body });
    const data = await res.json();

    if (data.success) {
      showForm = false;
      invalidateAll();
    }
  }
</script>

{#if showForm}
  <div class="flex flex-col gap-2" action="/comments" method="post">
    <TipTap value="" onSubmit={handleSubmit} />
  </div>
{:else}
  <div
    class="white flex-grow rounded-lg bg-gray-600 px-2 py-1 text-gray-400"
    onclick={() => (showForm = !showForm)}
  >
    Write a comment...
  </div>
{/if}
