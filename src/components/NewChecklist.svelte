<script>
  import { Input, Button, Popover } from 'flowbite-svelte';
  import { enhance } from '$app/forms';

  export let cardId;
  export let lastPos = 0;

  const step = 32;
</script>

<Popover
  class="z-60 fixed w-64 text-sm font-light"
  title="Add checklist"
  triggeredBy="#createChecklist"
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
