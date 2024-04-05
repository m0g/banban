<script>
  import { GradientButton } from 'flowbite-svelte';
  import { TrashBinSolid } from 'flowbite-svelte-icons';
</script>

<GradientButton color="red" id="deleteCard" on:click={(e) => e.stopPropagation()} class="relative">
  <TrashBinSolid class="absolute left-4 h-4 w-4" /> Delete
</GradientButton>
