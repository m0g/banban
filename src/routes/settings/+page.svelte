<script>
	import Header from '../../components/Header.svelte';
	import { Button, Input, Label } from 'flowbite-svelte';

	export let data;
	console.log(data);
</script>

<main class="flex flex-grow flex-col bg-gradient-to-r from-lime-500 to-green-500">
	<Header name="Settings" />
	<div class="flex flex-grow place-content-center py-10">
		<form method="POST" class="flex flex-col gap-2">
			<div>
				<Label for="name">Your name</Label>
				<Input name="name" />
			</div>
			<div>
				<Button type="submit">Save</Button>
			</div>
		</form>
	</div>
</main>
