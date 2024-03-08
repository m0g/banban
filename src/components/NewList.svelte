<script>
	import { Input, Button } from 'flowbite-svelte';
	import { enhance } from '$app/forms';
	export let boardId;
</script>

<div class="flex min-w-60 flex-col gap-y-2 rounded-lg bg-slate-400 px-6 py-4">
	<div>New List</div>
	<form class="flex flex-col gap-y-2" action="/lists" method="post" use:enhance>
		<Input type="text" name="name" placeholder="Enter list title" />
		<input type="hidden" name="boardId" value={boardId} />
		<Button type="submit">Add list</Button>
	</form>
</div>
