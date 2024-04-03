<script>
  import { Card } from 'flowbite-svelte';
  import NewBoard from '../components/NewBoard.svelte';
  import Header from '../components/Header.svelte';
  export let data;
</script>

<svelte:head>
  <title>Boards | BanBan</title>
</svelte:head>

<main class="flex flex-grow flex-col bg-gradient-to-r from-amber-500 to-yellow-500">
  <Header name="Boards" />
  <div class="flex flex-wrap gap-4 p-2">
    {#each data.boards as board (board.id)}
      <a href="/boards/{board.id}">
        <Card class="h-48 w-72">{board.name}</Card>
      </a>
    {/each}
    <NewBoard />
  </div>
</main>
