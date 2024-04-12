<script>
  import { CheckCircleOutline } from 'flowbite-svelte-icons';
  import { Button, Popover } from 'flowbite-svelte';
  import { invalidateAll } from '$app/navigation';
  import ChecklistName from './ChecklistName.svelte';
  import NewCheckItem from './NewCheckItem.svelte';
  import CheckItem from './CheckItem.svelte';

  export let checklist;
  export let card;

  async function onConfirm(e) {
    e.stopPropagation();
    const response = await fetch(`/checklists/${checklist.id}`, { method: 'DELETE' });

    if (response.ok) {
      invalidateAll();
      document.querySelector(`#deleteChecklist-${checklist.id}`)?.click();
    }
  }
  console.log(checklist);
</script>

<div class="flex flex-grow flex-row gap-2">
  <CheckCircleOutline class="h-8 w-8" />
  <div class="flex flex-grow flex-col gap-2">
    <div class="flex">
      <ChecklistName {checklist} />
      <Button
        color="alternative"
        id={`deleteChecklist-${checklist.id}`}
        on:click={(e) => e.stopPropagation()}
      >
        Delete
      </Button>
      <Popover
        class="fixed z-60 w-64 text-sm font-light"
        title="Delete checklist?"
        triggeredBy={`#deleteChecklist-${checklist.id}`}
        trigger="click"
        placement="bottom"
        arrow={false}
      >
        <div class="flex flex-col gap-2">
          <div>Deleting a checklist is permanent and there is no way to get it back.</div>
          <Button color="red" class="me-2" on:click={onConfirm}>Yes, I'm sure</Button>
        </div>
      </Popover>
    </div>
    {#each checklist.checkItems as checkItem}
      <CheckItem {checkItem} />
    {/each}
    <NewCheckItem {checklist} {card} />
  </div>
</div>
