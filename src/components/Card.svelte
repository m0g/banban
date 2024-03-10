<script>
	import { invalidateAll } from '$app/navigation';
	import { Dropdown, DropdownItem } from 'flowbite-svelte';
	import { DotsVerticalOutline } from 'flowbite-svelte-icons';
	import NewCard from './NewCard.svelte';

	export let card;
	export let boardId;
</script>

<div class="white flex min-w-60 flex-col gap-y-2 rounded-lg bg-slate-300 px-6 py-4">
	<div class="flex flex-row">
		<div class="flex-grow">{card.name} (pos: {card.pos})</div>
	</div>
</div>
