<script>
  import { Input, Button, Popover } from 'flowbite-svelte';
  import { CheckCircleSolid } from 'flowbite-svelte-icons';
  import { enhance } from '$app/forms';

  export let cardId;
  export let boardId;
  export let lastPos = 0;

  const step = 32;
</script>

<div class="relative">
  <Button color="blue" class="relative w-full" id="click" on:click={(e) => e.stopPropagation()}>
    <CheckCircleSolid class="absolute left-4 h-4 w-4" /> Checklist
  </Button>
  <Popover
    class="fixed z-10 w-64 text-sm font-light"
    title="Add checklist"
    triggeredBy="#click"
    trigger="click"
    placement="bottom"
    arrow={false}
  >
    <form class="flex flex-col gap-y-2" action="/checklists" method="post" use:enhance>
      <Input type="text" name="name" placeholder="Enter checklist title" autofocus />
      <input type="hidden" name="cardId" value={cardId} />
      <input type="hidden" name="pos" value={lastPos + step} />
      <Button type="submit">Add checklist</Button>
    </form>
  </Popover>
</div>
