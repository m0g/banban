<script>
	import { invalidateAll } from '$app/navigation';
	import { Dropdown, DropdownItem } from 'flowbite-svelte';
	import { DotsVerticalOutline } from 'flowbite-svelte-icons';

	export let list;
	export let boardId;

	async function deleteList() {
		await fetch(`/boards/${boardId}/lists/${list.id}`, { method: 'delete' });
		invalidateAll();
	}
</script>

<div class="white flex min-w-60 flex-col gap-y-2 rounded-lg bg-slate-500 px-6 py-4">
	<div class="flex flex-row">
		<div class="flex-grow">{list.name} (pos: {list.pos})</div>
		<DotsVerticalOutline class="dots-menu dark:text-white" />
		<Dropdown triggeredBy=".dots-menu">
			<DropdownItem on:click={deleteList}>Delete</DropdownItem>
		</Dropdown>
	</div>
</div>
