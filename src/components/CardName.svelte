<script>
	import { invalidateAll } from '$app/navigation';
	import { Input } from 'flowbite-svelte';

	export let card;

	let showForm = false;

	async function onSubmit() {
		const body = new FormData();

		body.append('name', card.name);

		const res = await fetch(`/cards/${card.id}`, { method: 'PUT', body });
		const data = await res.json();

		if (data.success) {
			showForm = false;
			invalidateAll();
		}
	}
</script>

{#if showForm}
	<form class="flex flex-col gap-y-2 text-2xl font-bold" on:submit|preventDefault={onSubmit}>
		<Input
			type="text"
			name="name"
			placeholder="Enter card title"
			size="lg"
			bind:value={card.name}
			autofocus
		/>
	</form>
{:else}
	<div class="text-2xl font-bold" on:click={() => (showForm = !showForm)}>{card.name}</div>
{/if}
