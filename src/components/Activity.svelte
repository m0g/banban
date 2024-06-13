<script>
  import { Avatar } from 'flowbite-svelte';
  import dayjs from 'dayjs';
  import relativeTime from 'dayjs/plugin/relativeTime';
  import Comment from './Comment.svelte';

  export let action;

  dayjs.extend(relativeTime);
</script>

<div>
  <div class="flex flex-row items-start gap-2">
    {#if action.user.avatar}
      <Avatar src={`/images/${action.user.avatar}`} class="mt-2 h-8 w-8" />
    {:else}
      <Avatar class="mt-2 h-8 w-8" />
    {/if}
    <div class="flex flex-col">
      <div>
        <b class="font-bold">{action.user.name}</b>
        {#if action.type == 'addAttachmentToCard'}
          <span>attached <b class="font-bold">{action.attachment.filename}</b> to this card</span>
        {:else if action.type == 'moveCard'}
          <span>moved this card to XXX</span>
        {:else if action.type == 'commentCard'}
          <Comment comment={action.comment} />
        {:else if action.type == 'addCheckListToCard'}
          <span>
            added a checklist <b class="font-bold">{action.checkList.name}</b> to this card
          </span>
        {:else if action.type == 'deleteCheckListFromCard'}
          <span>{@html action.text}</span>
        {:else}
          <span>added this card</span>
        {/if}
      </div>
      <em class="text-sm">{dayjs(action.date).fromNow()}</em>
    </div>
  </div>
</div>
