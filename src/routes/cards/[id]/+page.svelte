<script>
	import { Banner } from 'flowbite-svelte';
	import Board from '../../../components/Board.svelte';

	export let data;
</script>

<Banner dismissable={false}>
	<h1>{data.board.name}</h1>
</Banner>

<Board board={data.board} focusedCardId={data.card.id} />
