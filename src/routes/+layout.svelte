<script>
	import {
		Avatar,
		Navbar,
		NavBrand,
		NavHamburger,
		NavUl,
		NavLi,
		DarkMode,
		Dropdown,
		DropdownHeader,
		DropdownItem,
		DropdownDivider
	} from 'flowbite-svelte';
	import { enhance } from '$app/forms';
	import '../app.pcss';
	export let data;
</script>

<div class="flex h-screen flex-col">
	<Navbar color="dark" class="border-b">
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
			<Avatar id="user-drop" />
			<Dropdown triggeredBy="#user-drop">
				<DropdownHeader>
					<span class="block text-sm">Bonnie Green</span>
					<span class="block truncate text-sm font-medium">{data.user.email}</span>
				</DropdownHeader>
				<DropdownItem href={`/users/${data.user.id}`}>Profile</DropdownItem>
				<DropdownItem href="/settings">Settings</DropdownItem>
				<DropdownDivider />
				<DropdownItem>
					<form method="post" use:enhance action="/signout">
						<button type="submit">Sign out</button>
					</form>
				</DropdownItem>
			</Dropdown>
		{/if}
	</Navbar>

	<slot />
</div>
