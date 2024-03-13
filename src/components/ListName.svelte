<script>
	import { enhance } from '$app/forms';
	import { Input, Button } from 'flowbite-svelte';

	export let list;

	let showForm = false;
</script>

{#if showForm}
	<form class="flex flex-col gap-y-2" action={`/lists/${list.id}`} method="PUT">
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
