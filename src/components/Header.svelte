<script>
  import { Button } from 'flowbite-svelte';
  import { UserAddSolid } from 'flowbite-svelte-icons';
  import ShareBoardModal from './ShareBoardModal.svelte';

  export let name;
  export let shareDisabled = false;

  let showModal = false;

  function handleClick() {
    showModal = true;
  }
</script>

<div class="bg-backdrop-blur z-10 flex justify-between bg-gray-700/30 p-4">
  <div class="flex flex-grow items-center justify-center">
    <h1 class="font-bold text-white">{name}</h1>
  </div>
  {#if !shareDisabled}
    <div>
      <Button on:click={handleClick}><UserAddSolid class="me-1 h-5 w-5" /> Share</Button>
    </div>
  {/if}
</div>

<ShareBoardModal {showModal} handleClose={() => (showModal = false)} />
