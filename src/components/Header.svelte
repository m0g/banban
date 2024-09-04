<script>
  import { Button } from 'flowbite-svelte';
  import { UserAddSolid } from 'flowbite-svelte-icons';
  import ShareBoardModal from './ShareBoardModal.svelte';
  export let name;
  let showModal = false;

  function handleClick() {
    showModal = true;
  }
</script>

<div class="bg-backdrop-blur z-10 flex justify-between bg-gray-700/30 p-4">
  <div class="flex flex-grow items-center justify-center">
    <h1 class="font-bold text-white">{name}</h1>
  </div>
  <div>
    <Button on:click={handleClick}><UserAddSolid class="me-1 h-5 w-5" /> Share</Button>
  </div>
</div>

<ShareBoardModal {showModal} handleClose={() => (showModal = false)} />
