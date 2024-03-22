<script>
  import Activity from './Activity.svelte';
  export let card;
</script>

<div class="flex flex-col gap-2">
  {#each card.actions as action}
    <Activity {action} />
  {/each}
</div>
