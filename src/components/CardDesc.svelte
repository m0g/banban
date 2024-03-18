<script>
  import TipTap from './TipTap.svelte';
  export let card;

  let showForm = false;

  async function handleSubmit(value) {
    console.log(value);
    const body = new FormData();

    body.append('desc', value);

    const res = await fetch(`/cards/${card.id}`, { method: 'PUT', body });
    const data = await res.json();

    console.log(data);
    if (data.success) {
      showForm = false;
      card.desc = value;
    }
  }
</script>

{#if showForm}
  <TipTap value={card.desc} onSubmit={handleSubmit} />
{:else}
  <div
    class="editor-prose"
    on:click={() => (showForm = !showForm)}
  >
    {@html card.desc}
  </div>
{/if}
