<script>
  import { setContext } from 'svelte';
  import Board from '../../../components/Board.svelte';

  export let data;

  setContext('users', data.users);
  setContext('board', data.board);
</script>

<svelte:head>
  <title>{data.board.name} | BanBan</title>
</svelte:head>

<Board board={data.board} />
