<script>
  import { goto } from '$app/navigation';
  import { Modal, Button, GradientButton } from 'flowbite-svelte';
  import {
    WindowOutline,
    TextSizeOutline,
    ListSolid,
    PaperClipSolid,
    CheckCircleOutline
  } from 'flowbite-svelte-icons';
  import DeleteCardButton from './DeleteCardButton.svelte';
  import CardName from './CardName.svelte';
  import CardDesc from './CardDesc.svelte';
  import CardAttachments from './CardAttachments.svelte';
  import CardActivities from './CardActivities.svelte';
  import ChecklistButton from './ChecklistButton.svelte';
  import Checklist from './Checklist.svelte';

  export let card;
  export let boardId;
  export let user;
</script>

<Modal
  bind:open={card}
  autoclose
  outsideclose
  placement="center"
  on:close={() => goto(`/boards/${boardId}`)}
  size="lg"
  bodyClass="bg-slate-500 p-4 md:p-5 space-y-4 flex-1 rounded-lg text-white"
  backdropClass="fixed inset-0 z-40 bg-gray-900 bg-opacity-50"
  dialogClass="fixed top-0 md:inset-0 z-50 w-full p-4 flex overflow-y-auto justify-center items-center max-h-full"
  defaultClass=""
>
  <div class="flex flex-row gap-4">
    <div class="flex flex-grow flex-col gap-4">
      <div class="flex flex-grow flex-row gap-2">
        <WindowOutline class="h-8 w-8" />
        <div class="flex flex-col gap-2">
          <CardName {card} />
          <div>In list: {card.list.name}</div>
        </div>
      </div>
      <div class="flex flex-grow flex-row gap-2">
        <TextSizeOutline class="h-8 w-8" />
        <div class="flex flex-grow flex-col gap-2">
          <h3 class="text-xl font-bold">Description</h3>
          <CardDesc {card} />
        </div>
      </div>
      <div class="flex flex-grow flex-row gap-2">
        <PaperClipSolid class="h-8 w-8" />
        <div class="flex flex-grow flex-col gap-2">
          <h3 class="text-xl font-bold">Attachments</h3>
          <CardAttachments {card} />
        </div>
      </div>
      {#each card.checklists as checklist}
        <Checklist {checklist} />
      {/each}
      <div class="flex flex-grow flex-row gap-2">
        <ListSolid class="h-8 w-8" />
        <h3 class="text-xl font-bold">Activity</h3>
      </div>
      <CardActivities {card} {user} />
    </div>

    <div class="flex w-48 flex-none flex-col gap-y-2">
      <div class="font-bold">Actions</div>
      <ChecklistButton />
      <DeleteCardButton />
    </div>
  </div>
</Modal>
