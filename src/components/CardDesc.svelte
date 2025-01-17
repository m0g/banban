<script>
  import TipTap from './TipTap.svelte';

  let { card } = $props();
  let showForm = $state(false);

  async function handleSubmit(value) {
    const body = new FormData();

    body.append('desc', value);

    const res = await fetch(`/cards/${card.id}`, { method: 'PUT', body });
    const data = await res.json();

    if (data.success) {
      showForm = false;
      card.desc = value;
    }
  }

  function handleCancel(e) {
    e.stopPropagation();
    showForm = false;
  }
</script>

{#if showForm}
  <TipTap value={card.desc} onSubmit={handleSubmit} onCancel={handleCancel} />
{:else}
  <div class="editor-prose" onclick={() => (showForm = !showForm)}>
    {#if card.desc}
      {@html card.desc}
    {:else}
      <span>Add a more detailed description...</span>
    {/if}
  </div>
{/if}
