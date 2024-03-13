<script>
	import Board from '../../../components/Board.svelte';
	import Header from '../../../components/Header.svelte';

	export let data;
</script>

<Header name={data.board.name} />
<Board board={data.board} card={data.card} />
