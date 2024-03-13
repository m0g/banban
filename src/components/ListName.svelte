<script>
	import { enhance } from '$app/forms';
	import { Input, Button } from 'flowbite-svelte';

	export let list;

	let showForm = false;

	async function onSubmit() {
		const body = new FormData();

		body.append('name', list.name);

		const res = await fetch(`/lists/${list.id}`, { method: 'PUT', body });
		const data = await res.json();

		if (data.success) {
			showForm = false;
		}
	}
</script>

{#if showForm}
	<form class="flex flex-col gap-y-2" on:submit|preventDefault={onSubmit}>
		<Input
			type="text"
			name="name"
			placeholder="Enter list title"
			bind:value={list.name}
			autofocus
		/>
	</form>
{:else}
	<div class="flex-grow" on:click={() => (showForm = !showForm)}>{list.name}</div>
{/if}
