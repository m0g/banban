<script>
  import { invalidateAll } from '$app/navigation';
  import { Checkbox } from 'flowbite-svelte';
  let { checkItem } = $props();
  const isChecked = $derived(checkItem.state === 'complete');

  async function onClick() {
    const body = new FormData();
    const newState = isChecked ? 'incomplete' : 'complete';

    body.append('state', newState);

    const res = await fetch(`/checkitems/${checkItem.id}`, { method: 'PUT', body });
    const data = await res.json();

    if (data.success === true) {
      checkItem.state = newState;
    }
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
