<script>
  import Dropzone from '../../components/Dropzone.svelte';
  import Header from '../../components/Header.svelte';
  import { Button, Input, Label } from 'flowbite-svelte';

  export let data;
  console.log(data);
</script>

<main class="flex flex-grow flex-col bg-gradient-to-r from-lime-500 to-green-500">
  <Header name="Settings" />
  <div class="flex flex-grow place-content-center py-10">
    <div class="flex flex-col">
      <img src={`/images/${data.user.avatar}`} alt="profile" class="w-96" />
      <Dropzone action="?/avatar" />
      <form method="POST" class="flex flex-col gap-2">
        <div>
          <Label for="name">Your name</Label>
          <Input name="name" />
        </div>
        <div>
          <Button type="submit">Save</Button>
        </div>
      </form>
    </div>
  </div>
</main>
