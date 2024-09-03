<script>
  import { GradientButton } from 'flowbite-svelte';
  import { CodeSolid } from 'flowbite-svelte-icons';

  export let editor;

  function setLink(editor) {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();

      return;
    }

    // update link
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }
</script>

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
  <GradientButton
    size="xs"
    on:click={(e) => {
      e.stopPropagation();
      editor.chain().focus().toggleStrike().run();
    }}
    color="cyan"
    outline={!editor.isActive('strike')}
  >
    <span class="line-through">S</span>
  </GradientButton>
  <GradientButton
    size="xs"
    on:click={(e) => {
      e.stopPropagation();
      setLink(editor);
    }}
    color="cyan"
    outline={!editor.isActive('link')}
  >
    Link
  </GradientButton>
  <GradientButton
    size="xs"
    on:click={(e) => {
      e.stopPropagation();
      editor.chain().focus().toggleCodeBlock().run();
    }}
    color="cyan"
    outline={editor.isActive('codeBlock')}
  >
    <CodeSolid />
  </GradientButton>
</div>
