<script>
  import { Button, Dropdown, DropdownItem } from 'flowbite-svelte';
  import { ChevronDownSolid } from 'flowbite-svelte-icons';

  export let boards;
</script>

<Button size="xs" id="recent-drop" color="alternative">
  Recent <ChevronDownSolid class="ms-2 h-5 w-5 text-white dark:text-white" />
</Button>
<Dropdown triggeredBy="#recent-drop" class="min-w-28 rounded-lg border border-gray-500">
  {#each boards as board}
    <DropdownItem href={`/boards/${board.id}`}>{board.name}</DropdownItem>
  {/each}
</Dropdown>
