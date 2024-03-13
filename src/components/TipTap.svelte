<script>
	import { onMount, onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import { Button } from 'flowbite-svelte';

	let element;
	let editor;

	onMount(() => {
		editor = new Editor({
			element: element,
			extensions: [StarterKit],
			editorProps: {
				attributes: {
					class:
						'prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none'
				}
			},
			content: '',
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
			<Button
				size="xs"
				on:click={(e) => {
					e.stopPropagation();
					editor.chain().focus().toggleHeading({ level: 1 }).run();
				}}
				color="blue"
				outline={!editor.isActive('heading', { level: 1 })}
			>
				H1
			</Button>
			<Button
				size="xs"
				on:click={(e) => {
					e.stopPropagation();
					editor.chain().focus().toggleHeading({ level: 2 }).run();
				}}
				color="blue"
				outline={!editor.isActive('heading', { level: 2 })}
			>
				H2
			</Button>
			<Button
				size="xs"
				on:click={(e) => {
					e.stopPropagation();
					editor.chain().focus().setParagraph().run();
				}}
				color="blue"
				outline={!editor.isActive('paragraph')}
			>
				P
			</Button>
		</div>
	{/if}

	<div bind:this={element} />
</div>
<div class="flex flex-row gap-4">
	<Button>Save</Button>
	<Button color="alternative">Cancel</Button>
</div>
