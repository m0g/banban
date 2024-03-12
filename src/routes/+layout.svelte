<script>
	import { Navbar, NavBrand, NavHamburger, NavUl, NavLi, DarkMode } from 'flowbite-svelte';
	import { enhance } from '$app/forms';
	import '../app.pcss';
	export let data;
</script>

<div class="flex h-screen flex-col">
	<Navbar>
		<NavBrand href="/">
			<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
				BanBan
			</span>
		</NavBrand>
		<NavHamburger />
		<NavUl>
			<NavLi href="/">Home</NavLi>
			<NavLi href="/boards">Boards</NavLi>
			{#if !data.isLoggedIn}
				<NavLi href="/signin">Sign in</NavLi>
				<NavLi href="/signup">Sign up</NavLi>
			{/if}
		</NavUl>
		<DarkMode />
		{#if data.isLoggedIn}
			<form method="post" use:enhance action="/signout">
				<button>Sign out</button>
			</form>
		{/if}
	</Navbar>

	<slot />
</div>

<style>
</style>
