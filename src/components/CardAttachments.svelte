<script>
  import Dropzone from './Dropzone.svelte';
  import Attachment from './Attachment.svelte';

  let { card } = $props();
</script>

<ul class="flex flex-col gap-1">
  {#each card.attachments as attachment}
    <Attachment {attachment} />
  {/each}
</ul>
<Dropzone action="/attachments" cardId={card.id} />
