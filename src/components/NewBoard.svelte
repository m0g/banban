<script>
	import { Input, Button } from 'flowbite-svelte';
</script>

<form method="POST" action="/boards">
	<div>
		<Input type="text" placeholder="Enter new board name" name="name" />
	</div>
	<Button type="submit">Submit</Button>
</form>
