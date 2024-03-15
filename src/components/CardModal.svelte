<script>
  import { goto } from '$app/navigation';
  import { Modal, Button } from 'flowbite-svelte';
  import { WindowSolid, TextSizeSolid, ListSolid } from 'flowbite-svelte-icons';
  import DeleteCardButton from './DeleteCardButton.svelte';
  import CardName from './CardName.svelte';
  import CardDesc from './CardDesc.svelte';

  export let card;
  export let boardId;
  console.log(card);
</script>

<Modal
  bind:open={card}
  autoclose
  outsideclose
  placement="center"
  on:close={() => goto(`/boards/${boardId}`)}
  size="lg"
  bodyClass="bg-slate-500 p-4 md:p-5 space-y-4 flex-1 rounded-lg text-white mb-4"
  backdropClass="fixed inset-0 z-40 bg-gray-900 bg-opacity-40"
  dialogClass="fixed top-0 md:inset-0 z-50 w-full p-4 flex overflow-y-scroll justify-center items-center max-h-full"
  defaultClass=""
>
  <div class="flex flex-row gap-4">
    <div class="flex flex-grow flex-col gap-4">
      <div class="flex flex-grow flex-row gap-2">
        <WindowSolid class="h-8 w-8" />
        <div class="flex flex-col gap-2">
          <CardName {card} />
          <div>In list: {card.list.name}</div>
        </div>
      </div>
      <div class="flex flex-grow flex-row gap-2">
        <TextSizeSolid class="h-8 w-8" />
        <div class="flex flex-grow flex-col gap-2">
          <h3 class="text-xl font-bold">Description</h3>
          <CardDesc {card} />
        </div>
      </div>
      <div class="flex flex-grow flex-row gap-2">
        <ListSolid class="h-8 w-8" />
        <div class="flex flex-grow flex-col gap-2">
          <h3 class="text-xl font-bold">Activity</h3>
        </div>
      </div>
    </div>

    <div class="flex w-48 flex-none flex-col gap-y-2">
      <div class="font-bold">Actions</div>
      <DeleteCardButton cardId={card.id} {boardId} />
    </div>
  </div>
</Modal>
