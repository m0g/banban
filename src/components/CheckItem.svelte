<script>
  import { invalidateAll } from '$app/navigation';
  import { Checkbox } from 'flowbite-svelte';
  export let checkItem;

  $: isChecked = checkItem.state === 'complete';

  async function onClick(e) {
    const body = new FormData();

    checkItem.state = isChecked ? 'incomplete' : 'complete';
    body.append('state', checkItem.state);

    const res = await fetch(`/checkitems/${checkItem.id}`, { method: 'PUT', body });
    const data = await res.json();

    console.log(data);
  }

  async function onClickDelete(e) {
    e.stopPropagation();

    const res = await fetch(`/checkitems/${checkItem.id}`, { method: 'DELETE' });
    const data = await res.json();

    if (data.success === true) {
      invalidateAll();
    }
  }
</script>

<Checkbox
  on:click={onClick}
  checked={isChecked}
  class={`${isChecked && 'line-through'} relative hover:bg-slate-400`}
>
  <span class={isChecked && 'line-through'}>{checkItem.name}</span>
  <button class="absolute right-5" on:click={onClickDelete}>Delete</button>
</Checkbox>
