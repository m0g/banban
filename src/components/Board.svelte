<script>
  import { setContext, onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import { dndzone } from 'svelte-dnd-action';
  import NewList from './NewList.svelte';
  import List from './List.svelte';
  import CardModal from './CardModal.svelte';
  import Header from './Header.svelte';
  import NewChecklist from './NewChecklist.svelte';
  import DeleteCardPopover from './DeleteCardPopover.svelte';

  export let board;
  export let card;
  export let user;
  export let scrollLeft;

  const flipDurationMs = 200;
  let dragDisabled = true;
  let cardDragDisabled = true;
  let isMobile = false;

  setContext('ui', { showForm: writable(false), scrollLeft: writable(0) });

  onMount(() => {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      isMobile = true;
    }
  });

  function handleDndConsiderLists(e) {
    board.lists = e.detail.items;
  }

  function handleDndFinalizeLists(e) {
    const lists = e.detail.items;

    board.lists = lists.map((list, i) => {
      if (list.id === e.detail.info.id) {
        let pos = 0;

        if (i === 0) {
          const firstList = lists[0];
          pos = firstList.pos / 2;
        } else if (i === lists.length - 1) {
          const lastList = lists[lists.length - 1];
          pos = lastList.pos + list.pos;
        } else {
          const prevList = lists[i - 1];
          const nextList = lists[i + 1];
          pos = (prevList.pos + nextList.pos) / 2;
        }

        const body = new FormData();

        body.append('pos', pos);
        fetch(`/lists/${list.id}`, { method: 'PUT', body });

        return { ...list, pos };
      }
      return { ...list };
    });

    dragDisabled = true;
  }

  function handleDndConsiderCards(listId, e) {
    const listIndex = board.lists.findIndex((list) => list.id == listId);

    board.lists[listIndex].cards = e.detail.items;
    board.lists = [...board.lists];
  }

  function handleDndFinalizeCards(listId, e) {
    const listIndex = board.lists.findIndex((list) => list.id == listId);
    const cards = e.detail.items;

    board.lists[listIndex].cards = cards.map((card, i) => {
      if (card.id === e.detail.info.id) {
        let pos = 0;

        if (i === 0) {
          const firstCard = cards[0];
          pos = firstCard.pos / 2;
        } else if (i === cards.length - 1) {
          const lastCard = cards[cards.length - 1];
          pos = lastCard.pos + card.pos;
        } else {
          const prevCard = cards[i - 1];
          const nextCard = cards[i + 1];
          pos = (prevCard.pos + nextCard.pos) / 2;
        }

        const listId = board.lists[listIndex].id;
        const body = new FormData();

        body.append('pos', pos);
        body.append('listId', listId);
        fetch(`/cards/${card.id}`, { method: 'PUT', body });

        return { ...card, pos, listId };
      }
      return { ...card };
    });

    board.lists = [...board.lists];
    cardDragDisabled = true;
  }

  onMount(() => {
    const scrollablePart = document.getElementById('scrollable-part');

    if (scrollablePart) {
      scrollablePart.scrollLeft = scrollLeft;
    }
  });
</script>

<div class="page flex flex-grow flex-col bg-gradient-to-r from-cyan-500 to-blue-500">
  <Header name={board.name} />
  <section
    id="scrollable-part"
    class="relative flex flex-grow items-start gap-x-2 overflow-x-auto p-2"
    use:dndzone={{
      items: board.lists,
      flipDurationMs,
      type: 'lists',
      dragDisabled: dragDisabled && isMobile,
      dropTargetStyle: { outline: 'rgba(255, 255, 255, 0.7) solid 2px' }
    }}
    on:consider={handleDndConsiderLists}
    on:finalize={handleDndFinalizeLists}
  >
    {#each board.lists as list (list.id)}
      <List
        {list}
        boardId={board.id}
        {handleDndConsiderCards}
        {handleDndFinalizeCards}
        bind:dragDisabled
        bind:cardDragDisabled
        {isMobile}
      />
    {/each}
    <NewList boardId={board.id} lastPos={board.lists[board.lists.length - 1]?.pos || 0} />
  </section>
</div>
<CardModal {card} boardId={board.id} {user} {scrollLeft} />
{#if card}
  <NewChecklist cardId={card.id} />
  <DeleteCardPopover cardId={card.id} boardId={board.id} />
{/if}

<style>
  .page {
    max-height: calc(100% - 64px);
  }
</style>
