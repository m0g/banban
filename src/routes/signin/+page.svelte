<script>
  import { enhance } from '$app/forms';
  import { Input, Button, Label } from 'flowbite-svelte';
</script>

<svelte:head>
  <title>Sign-in | BanBan</title>
</svelte:head>

<div class="mx-auto my-4 flex w-72 flex-col gap-4 rounded-lg bg-slate-300 px-4 py-4">
  <h1 class="text-center text-lg font-bold">Sign in</h1>
  <form method="post" use:enhance class="flex flex-col gap-4">
    <div>
      <Label for="email">Email</Label>
      <Input name="email" id="email" />
    </div>
    <div>
      <Label for="password">Password</Label>
      <Input type="password" name="password" id="password" />
    </div>
    <Button type="submit">Continue</Button>
  </form>
</div>
