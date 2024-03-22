<script>
  import { enhance } from '$app/forms';
  import { Input, Button, Label } from 'flowbite-svelte';
</script>

<svelte:head>
  <title>Sign-up | BanBan</title>
</svelte:head>

<div class="mx-auto my-4 flex w-72 flex-col gap-4 rounded-lg bg-slate-300 px-4 py-4">
  <h1 class="text-center text-lg font-bold">Sign up</h1>
  <form method="post" use:enhance class="flex flex-col gap-4">
    <div>
      <Label for="email" class="dark:text-gray-900">Email</Label>
      <Input name="email" id="email" />
    </div>
    <div>
      <Label for="name" class="dark:text-gray-900">Name</Label>
      <Input name="name" id="name" />
    </div>
    <div>
      <Label for="password" class="dark:text-gray-900">Password</Label>
      <Input type="password" name="password" id="password" />
    </div>
    <a href="https://xkcd.com/936/" target="_blank" class="text-primary-700 underline">
      How to choose a password?
    </a>
    <Button type="submit">Continue</Button>
  </form>
</div>
