<script>
  import { Avatar } from 'flowbite-svelte';
  import Activity from './Activity.svelte';

  export let card;
  export let user;
</script>

<div class="flex flex-col gap-2">
  <div>
    <div class="flex flex-row items-center gap-2">
      <Avatar id="user-drop" src={`/images/${user.avatar}`} class="h-8 w-8" />
      <div class="white flex-grow rounded-lg bg-gray-600 px-2 py-1">Write a comment...</div>
    </div>
  </div>
  {#each card.actions as action}
    <Activity {action} />
  {/each}
</div>
