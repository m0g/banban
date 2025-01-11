<script>
  import { Avatar } from 'flowbite-svelte';
  import Activity from './Activity.svelte';
  import CommentText from './CommentText.svelte';

  let { card, user } = $props();
</script>

<div class="flex flex-col gap-3">
  <div>
    <div class="flex flex-row items-center gap-2">
      {#if user.avatar}
        <Avatar src={`/images/${user.avatar}`} class="h-8 w-8" />
      {:else}
        <Avatar class="h-8 w-8" />
      {/if}
      <CommentText {card} />
    </div>
  </div>
  {#each card.actions as action}
    <Activity {action} />
  {/each}
</div>
