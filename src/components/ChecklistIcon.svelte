<script>
  import { CheckCircleSolid } from 'flowbite-svelte-icons';

  let { checklists } = $props();
  let items = $state(0);
  let completedItems = $state(0);

  for (let checklist of checklists) {
    if (checklist.checkItems.length > 0) {
      items = items + checklist.checkItems.length;

      if (checklist.checkItems.length > 0) {
        for (let checkItem of checklist.checkItems) {
          if (checkItem.state === 'complete') {
            completedItems++;
          }
        }
      }
    }
  }
</script>

<span class="flex gap-1">
  <CheckCircleSolid />
  {#if items > 0}
    <span class="text-xs">{completedItems}/{items}</span>
  {/if}
</span>
