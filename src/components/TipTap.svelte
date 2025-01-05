<script>
  import { onMount, onDestroy } from 'svelte';
  import { Editor } from '@tiptap/core';
  import StarterKit from '@tiptap/starter-kit';
  import Link from '@tiptap/extension-link';
  import CodeBlock from '@tiptap/extension-code-block';
  import { Button } from 'flowbite-svelte';
  import TipTapToolbar from './TipTapToolbar.svelte';

  export let onSubmit;
  export let value;

  let element;
  let editor;

  onMount(() => {
    editor = new Editor({
      element: element,
      extensions: [StarterKit, Link, CodeBlock],
      editorProps: {
        attributes: {
          class: 'editor-prose mx-4 my-2'
        }
      },
      content: value === null ? '' : value,
      onTransaction: () => {
        // force re-render so `editor.isActive` works as expected
        editor = editor;
      }
    });
    editor.commands.focus();
  });

  onDestroy(() => {
    if (editor) {
      editor.destroy();
    }
  });
</script>

<div class="rounded-lg border-2">
  {#if editor}
    <TipTapToolbar {editor} />
  {/if}

  <div bind:this={element}></div>
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
