<script>
  import { Input, Button, Popover } from 'flowbite-svelte';
  import { enhance } from '$app/forms';
  import { invalidateAll } from '$app/navigation';

  export let cardId;

  function onEnhance({ formElement }) {
    return async ({ update }) => {
      document.querySelector('#createChecklist')?.click();
      invalidateAll();
    };
  }
</script>

<Popover
  class="z-60 fixed w-64 text-sm font-light"
  title="Add checklist"
  triggeredBy="#createChecklist"
  trigger="click"
  placement="bottom"
  arrow={false}
>
  <form class="flex flex-col gap-y-2" action="/checklists" method="post" use:enhance={onEnhance}>
    <Input type="text" name="name" placeholder="Enter checklist title" autofocus />
    <input type="hidden" name="cardId" value={cardId} />
    <Button type="submit">Add checklist</Button>
  </form>
</Popover>
