<script>
  import { Avatar } from 'flowbite-svelte';
  import dayjs from 'dayjs';
  import relativeTime from 'dayjs/plugin/relativeTime';

  export let action;

  dayjs.extend(relativeTime);
  console.log(action);
</script>

<div>
  <div class="flex flex-row items-center gap-2">
    <Avatar id="user-drop" src={`/images/${action.user.avatar}`} class="h-8 w-8" />
    <div class="flex flex-col">
      <div>
        <b class="font-bold">{action.user.name}</b>
        {#if action.type == 'addAttachmentToCard'}
          <span>attached {action.attachment.filename} to this card</span>
        {:else if action.type == 'moveCard'}
          <span>moved this card to XXX</span>
        {:else}
          <span>added this card</span>
        {/if}
      </div>
      <em class="text-sm">{dayjs(action.date).fromNow()}</em>
    </div>
  </div>
</div>
