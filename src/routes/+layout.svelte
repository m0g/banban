<script>
	import { Navbar, NavBrand, NavHamburger, NavUl, NavLi } from 'flowbite-svelte';
	import '../app.pcss';
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
		</NavUl>
	</Navbar>

	<slot />
</div>

<style>
</style>
