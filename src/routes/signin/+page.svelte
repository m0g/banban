<script>
  import { enhance } from '$app/forms';
  import { Input, Button, Label } from 'flowbite-svelte';
</script>

<svelte:head>
  <title>Sign-in | BanBan</title>
</svelte:head>

<main class="flex flex-grow flex-col bg-gradient-to-r from-emerald-500 to-teal-500">
  <div class="mx-auto my-4 flex w-72 flex-col gap-4 rounded-lg bg-slate-300 px-4 py-4 shadow-md">
    <h1 class="text-center text-lg font-bold">Sign in</h1>
    <form method="post" use:enhance class="flex flex-col gap-4">
      <div>
        <Label for="email" class="dark:text-gray-900">Email</Label>
        <Input name="email" id="email" />
      </div>
      <div>
        <Label for="password" class="dark:text-gray-900">Password</Label>
        <Input type="password" name="password" id="password" />
      </div>
      <Button type="submit">Continue</Button>
    </form>
  </div>
</main>
