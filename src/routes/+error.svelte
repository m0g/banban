<script>
  import { page } from '$app/stores';
</script>

<main class="flex flex-grow flex-col bg-gradient-to-r from-red-500 to-orange-500">
  <div class="mx-auto my-4 flex w-72 flex-col gap-4 rounded-lg bg-slate-300 px-4 py-4 shadow-md">
    <h1 class="text-center text-lg font-bold">{$page.error.message}</h1>
  </div>
</main>
