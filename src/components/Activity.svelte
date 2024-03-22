<script>
  import { Avatar } from 'flowbite-svelte';
  import dayjs from 'dayjs';
  import relativeTime from 'dayjs/plugin/relativeTime';

  export let action;

  dayjs.extend(relativeTime);
  console.log(dayjs(action.date).fromNow());
</script>

<div>
  <div class="flex flex-row items-center gap-2">
    <Avatar id="user-drop" src={`/images/${action.user.avatar}`} class="h-8 w-8" />
    <div class="flex flex-col">
      <span>{action.type}</span>
      <em class="text-sm">{dayjs(action.date).fromNow()}</em>
    </div>
  </div>
</div>
