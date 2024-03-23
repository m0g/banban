<script>
  import Board from '../../../components/Board.svelte';

  export let data;
</script>

<svelte:head>
  <title>{data.card.name} on {data.board.name} | BanBan</title>
</svelte:head>

<Board board={data.board} card={data.card} user={data.user} />
