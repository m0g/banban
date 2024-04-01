<script>
  // import { Input, Button, Popover } from 'flowbite-svelte';
  // import { CheckCircleSolid } from 'flowbite-svelte-icons';
  import { Popover, Separator, Toggle } from 'bits-ui';
  // import { ImageSquare, LinkSimpleHorizontalBreak } from '$icons/index.js';

  let width = 1024;
  let height = 768;

  export let cardId;
  export let boardId;
  export let lastPos = 0;

  const step = 32;
</script>

<!-- <div class="relative">
  <Button color="blue" class="relative w-full" id="click" on:click={(e) => e.stopPropagation()}>
    <CheckCircleSolid class="absolute left-4 h-4 w-4" /> Checklist
  </Button>
  <Popover
    class="fixed z-10 w-64 text-sm font-light"
    title="Add checklist"
    triggeredBy="#click"
    trigger="click"
    arrow={false}
  >
    <form class="flex flex-col gap-y-2" action="/checklists" method="post" use:enhance={onEnhance}>
      <Input type="text" name="name" placeholder="Enter list title" autofocus />
      <input type="hidden" name="cardId" value={cardId} />
      <input type="hidden" name="pos" value={lastPos + step} />
      <Button type="submit">Add checklist</Button>
    </form>
  </Popover>
</div> -->

<Popover.Root>
  <Popover.Trigger
    class="rounded-input bg-dark
  text-background shadow-mini hover:bg-dark/95 active:scale-98 inline-flex h-10 items-center justify-center whitespace-nowrap px-[21px] text-[15px] font-medium transition-all hover:cursor-pointer"
  >
    Resize
  </Popover.Trigger>
  <Popover.Content
    class="border-dark-10 bg-background shadow-popover z-30 w-full max-w-[328px] rounded-[12px] border p-4"
    sideOffset={8}
  >
    <div class="flex items-center">
      <div class="bg-muted mr-3 flex size-12 items-center justify-center rounded-full"></div>
      <div class="flex flex-col">
        <h4 class="text-[17px] font-semibold leading-5 tracking-[-0.01em]">Resize image</h4>
        <p class="text-muted-foreground text-sm font-medium">Resize your photos easily</p>
      </div>
    </div>
    <Separator.Root class="bg-dark-10 -mx-4 mb-6 mt-[17px] block h-px" />
    <div class="flex items-center pb-2">
      <div class="mr-2 flex items-center">
        <div class="relative mr-2">
          <span class="sr-only">Width</span>
          <span aria-hidden class="text-xxs text-muted-foreground absolute left-5 top-4">W</span>
          <input
            type="number"
            class="h-input rounded-10px border-border-input bg-background text-foreground w-[119px] border pl-10 pr-2 text-sm"
            bind:value={width}
          />
        </div>
        <div class="relative">
          <span class="sr-only">Height</span>
          <span aria-hidden class="text-xxs text-muted-foreground absolute left-5 top-4">H</span>
          <input
            type="number"
            class="h-input rounded-10px border-border-input bg-background text-foreground w-[119px] border pl-10 pr-2 text-sm"
            bind:value={height}
          />
        </div>
      </div>
      <Toggle.Root
        aria-label="toggle constrain portions"
        class="bg-background hover:bg-muted active:scale-98 data-[state=on]:bg-muted inline-flex size-10 items-center justify-center rounded-[9px] transition-all"
      ></Toggle.Root>
    </div>
  </Popover.Content>
</Popover.Root>
