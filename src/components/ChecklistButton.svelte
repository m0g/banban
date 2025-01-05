<script>
  import { Button } from 'flowbite-svelte';
  import { CheckCircleSolid } from 'flowbite-svelte-icons';
</script>

<Button
  color="blue"
  class="relative w-full"
  id="createChecklist"
  on:click={(e) => e.stopPropagation()}
>
  <CheckCircleSolid class="absolute left-4 h-4 w-4" /> Checklist
</Button>
