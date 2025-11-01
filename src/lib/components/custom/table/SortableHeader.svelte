<script lang="ts">
	import * as Table from '$lib/components/ui/table/index.js';
	import { ArrowUpFromDot } from '@lucide/svelte';

	let { columnKey, label, css, table } = $props();

	let sortState = $derived(table.getColumn(columnKey)?.getIsSorted());
</script>

<Table.Head
	class="table-head {css} cursor-pointer"
	onclick={() => table.getColumn(columnKey)?.toggleSorting()}
>
	<div class="flex items-center justify-center gap-1">
		{label}
		<ArrowUpFromDot
			class="h-4 w-4 transition-transform {sortState === 'asc'
				? 'rotate-0 text-white'
				: sortState === 'desc'
					? 'rotate-180 text-white'
					: 'rotate-0 text-gray-500'}"
		/>
	</div>
</Table.Head>
