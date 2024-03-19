<script>
  // If you are using JavaScript/ECMAScript modules:
  import Dropzone from 'dropzone';
  import 'dropzone/dist/dropzone.css';
  import { onMount } from 'svelte';

  export let action;
  let dropzone;

  onMount(() => {
    dropzone = new Dropzone('#dropzone');

    dropzone.on('addedfile', (file) => {
      console.log(`File added: ${file.name}`);
    });
  });
</script>

<form {action} method="post" enctype="multipart/form-data" id="dropzone" class="dropzone"></form>
