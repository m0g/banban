<script>
  import {
    Avatar,
    Navbar,
    NavBrand,
    NavHamburger,
    NavUl,
    NavLi,
    Button,
    Dropdown,
    DropdownHeader,
    DropdownItem,
    DropdownDivider
  } from 'flowbite-svelte';
  import { ChevronDownSolid } from 'flowbite-svelte-icons';
  import { enhance } from '$app/forms';
  import '../app.pcss';
  import RecentBoards from '../components/RecentBoards.svelte';
  export let data;
</script>

<div class="flex h-screen flex-col">
  <Navbar color="dark" class="border-b">
    <div class="flex gap-2">
      <NavBrand href="/" class="flex gap-2">
        <img src="/favicon.svg" alt="BanBan logo" class="w-8" />
        <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          BanBan
        </span>
      </NavBrand>
      <NavHamburger />
      {#if data.isLoggedIn && data.user.boards.length > 0}
        <RecentBoards boards={data.user.boards} />
      {/if}
      <NavUl>
        {#if !data.isLoggedIn}
          <NavLi href="/signin">Sign in</NavLi>
          <NavLi href="/signup">Sign up</NavLi>
        {/if}
      </NavUl>
    </div>
    {#if data.isLoggedIn}
      {#if data.user.avatar}
        <Avatar id="user-drop" src={`/images/${data.user.avatar}`} class="cursor-pointer" />
      {:else}
        <Avatar id="user-drop" class="cursor-pointer" />
      {/if}
      <Dropdown triggeredBy="#user-drop">
        <DropdownHeader>
          <span class="block text-sm">{data.user.name}</span>
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
