<script>
	import { Input, Button } from 'flowbite-svelte';
</script>

<div class="flex min-w-60 flex-col gap-y-2 rounded-lg bg-slate-400 px-6 py-4">
	<div>New Board</div>
	<form method="POST" action="/boards" class="flex flex-col gap-y-2">
		<div>
			<Input type="text" placeholder="Enter new board name" name="name" />
		</div>
		<Button type="submit">Submit</Button>
	</form>
</div>
