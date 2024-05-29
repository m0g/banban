<script>
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
</script>

<Checkbox on:click={onClick} checked={isChecked} class={isChecked && 'line-through'}>
  {checkItem.name}
</Checkbox>
