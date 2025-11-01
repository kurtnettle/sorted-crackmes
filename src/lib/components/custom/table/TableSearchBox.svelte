<script lang="ts">
	import { CircleX, Skull } from '@lucide/svelte';

	import { Input } from '$lib/components/ui/input/index.js';

	let { filterValue, onFilter } = $props();
</script>

<div class="group relative">
	<div class="relative ml-auto sm:w-md">
		<!-- Search Icon -->
		<Skull
			class="absolute top-1/2 left-3 size-5 -translate-y-1/2 text-accent transition-colors group-focus-within:text-accent dark:text-accent dark:group-focus-within:text-lime-300"
		/>

		<!-- Input Field -->
		<Input
			type="text"
			placeholder="Filter crackmes..."
			aria-label="Filter crackme by name"
			bind:value={filterValue}
			oninput={(e) => onFilter(e.currentTarget.value)}
			class="rounded-lg bg-zinc-800/60 py-2.5 pr-4 pl-10 transition-all focus-visible:border-accent"
		/>

		<!-- Clear Button -->
		{#if filterValue}
			<button
				onclick={() => onFilter('')}
				class="absolute top-1/2 right-3 -translate-y-1/2 rounded-full p-1 text-lime-400 transition-all hover:bg-lime-100 hover:text-lime-500 dark:hover:bg-lime-700/50 dark:hover:text-lime-400"
				aria-label="Clear filter input"
			>
				<CircleX class="size-4.5 text-current" />
			</button>
		{/if}
	</div>
</div>
