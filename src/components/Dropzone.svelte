<script>
  import { invalidateAll } from '$app/navigation';

  import Dropzone from 'dropzone';
  import 'dropzone/dist/dropzone.css';
  import { onMount } from 'svelte';

  export let action;
  export let cardId;
  let dropzone;

  onMount(() => {
    dropzone = new Dropzone('#dropzone');

    dropzone.on('complete', (file) => {
      dropzone.removeFile(file);
      invalidateAll();
    });
  });
</script>

<form
  {action}
  method="post"
  enctype="multipart/form-data"
  id="dropzone"
  class="dropzone"
  on:click={(e) => e.stopPropagation()}
>
  {#if cardId}
    <input type="hidden" name="cardId" value={cardId} />
  {/if}
</form>
