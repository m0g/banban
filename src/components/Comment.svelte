<script>
  export let comment;
</script>

<div>
  <div class="white flex-grow rounded-lg bg-gray-600 px-2 py-1">
    {@html comment.text}
  </div>
  <button class="text-sm underline underline-offset-2">Delete</button>
</div>
