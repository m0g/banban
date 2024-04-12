<script>
  import { Checkbox } from 'flowbite-svelte';
  export let checkItem;
</script>

<Checkbox>
  {checkItem.name}
</Checkbox>
