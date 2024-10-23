<script>
  import { dndzone } from 'svelte-dnd-action';
  import { invalidateAll } from '$app/navigation';
  import { Dropdown, DropdownItem } from 'flowbite-svelte';
  import { DotsHorizontalOutline } from 'flowbite-svelte-icons';
  import NewCard from './NewCard.svelte';
  import Card from './Card.svelte';
  import ListName from './ListName.svelte';
  import { longpress } from '$lib/helpers';

  export let list;
  export let boardId;
  export let handleDndConsiderCards;
  export let handleDndFinalizeCards;
  export let dragDisabled;
  export let cardDragDisabled;
  export let isMobile;

  const flipDurationMs = 200;

  $: cards = list.cards || [];

  async function deleteList() {
    await fetch(`/boards/${boardId}/lists/${list.id}`, { method: 'delete' });
    invalidateAll();
  }

  function startDrag() {
    dragDisabled = false;
  }
</script>

<div
  class="white relative z-[1] flex max-h-full w-72 min-w-72 cursor-pointer flex-col gap-y-2 rounded-lg bg-gray-100 py-4 dark:bg-gray-700 dark:text-white"
  use:longpress
  on:long={startDrag}
>
  <div class="flex flex-row px-6">
    <ListName {list} />
    {#if list.cards.length === 0}
      <DotsHorizontalOutline class="dots-menu dark:text-white" />
      <Dropdown triggeredBy=".dots-menu">
        <DropdownItem on:click={deleteList}>Delete</DropdownItem>
      </Dropdown>
    {/if}
  </div>
  <div
    use:dndzone={{
      items: cards,
      flipDurationMs,
      type: 'cards',
      dragDisabled: cardDragDisabled && isMobile,
      dropTargetStyle: { outline: 'rgba(255, 255, 255, 0.7) solid 2px' }
    }}
    on:consider={(e) => handleDndConsiderCards(list.id, e)}
    on:finalize={(e) => handleDndFinalizeCards(list.id, e)}
    class="flex min-h-16 flex-col gap-y-2 overflow-y-auto overflow-x-hidden px-2"
  >
    {#each cards as card (card.id)}
      <Card {card} {boardId} {list} bind:cardDragDisabled />
    {/each}
  </div>
  <NewCard listId={list.id} {boardId} lastPos={cards[cards.length - 1]?.pos || 0} />
</div>
