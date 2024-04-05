<script>
  import { CheckCircleOutline } from 'flowbite-svelte-icons';
  import { Button } from 'flowbite-svelte';

  export let checklist;
</script>

<div class="flex flex-grow flex-row gap-2">
  <CheckCircleOutline class="h-8 w-8" />
  <div class="flex flex-grow flex-col gap-2">
    <div class="flex">
      <h3 class="flex-grow text-xl font-bold">{checklist.name}</h3>
      <Button color="alternative">Delete</Button>
    </div>
    <div>Add an item</div>
  </div>
</div>
