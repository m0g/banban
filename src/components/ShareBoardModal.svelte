<script>
  import { invalidateAll } from '$app/navigation';
  import { Modal, MultiSelect, Avatar, Button } from 'flowbite-svelte';
  import { getContext } from 'svelte';

  export let showModal;
  export let handleClose;

  const users = getContext('users');
  const board = getContext('board');

  let selected = [];

  async function handleClick(e) {
    e.stopPropagation();
    const body = new FormData();
    body.append('user_ids', selected);

    const res = await fetch(`/boards/${board.id}`, { method: 'PUT', body });
    const data = await res.json();
    console.log(data);

    if (data.success) {
      invalidateAll();
    }
  }
</script>

<Modal
  bind:open={showModal}
  autoclose
  outsideclose
  on:close={handleClose}
  bodyClass="bg-slate-500 p-4 md:p-5 space-y-4 flex-1 rounded-lg text-white min-h-96"
  backdropClass="fixed inset-0 z-40 bg-gray-900 bg-opacity-50"
  dialogClass="fixed top-0 md:inset-0 z-50 w-full p-4 flex overflow-y-auto justify-center items-center max-h-full"
  defaultClass=""
>
  <h2 class="mt-0 text-lg font-bold">Share board</h2>
  <div class="flex gap-2">
    <MultiSelect
      class="flex-grow"
      name="users"
      items={users.map(({ id, name }) => ({ value: id, name }))}
      bind:value={selected}
    />
    <Button on:click={handleClick}>Share</Button>
  </div>
  <h3>Board members</h3>
  <div class="flex flex-col gap-2">
    {#each board.users as user (user.id)}
      <div class="flex flex-row items-center gap-2">
        {#if user.avatar}
          <Avatar src={`/images/${user.avatar}`} class="h-8 w-8" />
        {:else}
          <Avatar class="h-8 w-8" />
        {/if}
        <span>{user.name}</span>
      </div>
    {/each}
  </div>
</Modal>
