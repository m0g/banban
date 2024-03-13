<script>
	import { goto } from '$app/navigation';

	export let card;
</script>

<div
	class="white flex min-w-60 flex-col gap-y-2 rounded-lg bg-slate-500 px-6 py-4"
	on:click={() => goto(`/cards/${card.id}`)}
>
	<div class="flex flex-row">
		<div class="flex-grow">{card.name}</div>
	</div>
</div>
