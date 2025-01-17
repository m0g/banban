<script>
  import { onMount, onDestroy } from 'svelte';
  import { Editor } from '@tiptap/core';
  import StarterKit from '@tiptap/starter-kit';
  import Link from '@tiptap/extension-link';
  import CodeBlock from '@tiptap/extension-code-block';
  import { Button } from 'flowbite-svelte';
  import TipTapToolbar from './TipTapToolbar.svelte';

  let { onSubmit, onCancel, value } = $props();
  let element = $state();
  let editor = $state();

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

  function handleKeyboard(e) {
    if (e.keyCode === 27) {
      e.stopPropagation();
      onCancel(e);
    } else if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.stopPropagation();
      onSubmit(editor.getHTML());
    }
  }
</script>

<div class="rounded-lg border-2" onkeydown={handleKeyboard}>
  {#if editor}
    <TipTapToolbar {editor} />
  {/if}

  <div bind:this={element}></div>
</div>
<div class="flex flex-row gap-4">
  <Button
    onclick={(e) => {
      e.stopPropagation();
      onSubmit(editor.getHTML());
    }}>Save</Button
  >
  <Button color="alternative" onclick={onCancel}>Cancel</Button>
</div>
