<script>
  import { goto } from '$app/navigation';
  import {
    TextSizeSolid,
    PaperClipSolid,
    AnnotationSolid,
    CheckCircleSolid
  } from 'flowbite-svelte-icons';
  import { longpress } from '$lib/helpers';
  import ChecklistIcon from './ChecklistIcon.svelte';

  export let card;
  export let cardDragDisabled;

  function startDrag(e) {
    console.log('start card drag');
    cardDragDisabled = false;
  }

  function handleClick() {
    goto(`/cards/${card.id}`);
  }
</script>

<div
  class="white flex min-w-60 flex-col gap-y-2 rounded-lg border-2 border-slate-500 bg-slate-500 px-2 py-2 hover:border-white"
  on:click={handleClick}
  use:longpress={'cardLong'}
  on:cardLong={startDrag}
>
  <div class="flex flex-row">
    <div class="flex-grow">{card.name}</div>
    {#if card.desc}
      <TextSizeSolid />
    {/if}
    {#if card.attachments.length > 0}
      <PaperClipSolid />
    {/if}
    {#if card.comments.length > 0}
      <AnnotationSolid />
    {/if}
    {#if card.checklists.length > 0}
      <ChecklistIcon checklists={card.checklists} />
    {/if}
  </div>
</div>
