<script>
	import { Input, Button } from 'flowbite-svelte';
	import { enhance } from '$app/forms';
	export let boardId;
	export let lastPos;
</script>

<div class="flex min-w-60 flex-col gap-y-2 rounded-lg bg-slate-400 px-6 py-4">
	<div>New List (pos: {lastPos + 1})</div>
	<form class="flex flex-col gap-y-2" action="/lists" method="post" use:enhance>
		<Input type="text" name="name" placeholder="Enter list title" />
		<input type="hidden" name="boardId" value={boardId} />
		<input type="hidden" name="pos" value={lastPos + 1} />
		<Button type="submit">Add list</Button>
	</form>
</div>
