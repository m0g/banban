<script>
  import { onMount, onDestroy } from 'svelte';
  import { Editor } from '@tiptap/core';
  import StarterKit from '@tiptap/starter-kit';
  import { Button, GradientButton } from 'flowbite-svelte';

  export let onSubmit;
  export let value;

  let element;
  let editor;
  console.log(value);
  onMount(() => {
    editor = new Editor({
      element: element,
      extensions: [StarterKit],
      editorProps: {
        attributes: {
          class:
            'prose-sm dark:prose-invert sm:prose-base m-5 focus:outline-none prose-ul:list-disc'
        }
      },
      content: value === null ? '' : value,
      onTransaction: () => {
        // force re-render so `editor.isActive` works as expected
        editor = editor;
      }
    });
  });

  onDestroy(() => {
    if (editor) {
      editor.destroy();
    }
  });
</script>

<div class="rounded-lg border-2">
  {#if editor}
    <div class="flex flex-row gap-4 border-b px-4 py-2">
      <GradientButton
        size="xs"
        on:click={(e) => {
          e.stopPropagation();
          editor.chain().focus().toggleHeading({ level: 1 }).run();
        }}
        color="cyan"
        outline={!editor.isActive('heading', { level: 1 })}
      >
        H1
      </GradientButton>
      <GradientButton
        size="xs"
        on:click={(e) => {
          e.stopPropagation();
          editor.chain().focus().toggleHeading({ level: 2 }).run();
        }}
        color="cyan"
        outline={!editor.isActive('heading', { level: 2 })}
      >
        H2
      </GradientButton>
      <GradientButton
        size="xs"
        on:click={(e) => {
          e.stopPropagation();
          editor.chain().focus().setParagraph().run();
        }}
        color="cyan"
        outline={!editor.isActive('paragraph')}
      >
        P
      </GradientButton>
    </div>
  {/if}

  <div bind:this={element} />
</div>
<div class="flex flex-row gap-4">
  <Button
    on:click={(e) => {
      e.stopPropagation();
      onSubmit(editor.getHTML());
    }}>Save</Button
  >
  <Button color="alternative">Cancel</Button>
</div>
