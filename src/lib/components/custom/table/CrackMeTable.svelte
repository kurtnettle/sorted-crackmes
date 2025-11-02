<script lang="ts" generics="TData, TValue">
	import {
		type ColumnDef,
		type ColumnFiltersState,
		type PaginationState,
		type SortingState,
		getCoreRowModel,
		getFilteredRowModel,
		getPaginationRowModel,
		getSortedRowModel
	} from '@tanstack/table-core';
	import { ChevronLeft, ChevronRight } from '@lucide/svelte';
	import { createSvelteTable, FlexRender } from '$lib/components/ui/data-table/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Table from '$lib/components/ui/table/index.js';
	import SortableHeader from '$lib/components/custom/table/SortableHeader.svelte';
	import TableSearchBox from '$lib/components/custom/table/TableSearchBox.svelte';

	type DataTableProps<TData, TValue> = {
		columns: ColumnDef<TData, TValue>[];
		data: TData[];
	};

	let { data, columns }: DataTableProps<TData, TValue> = $props();

	let pagination = $state<PaginationState>({ pageIndex: 0, pageSize: 50 });
	let columnFilters = $state<ColumnFiltersState>([]);
	let sorting = $state<SortingState>([
		{
			id: 'date',
			desc: true
		}
	]);

	const table = createSvelteTable({
		get data() {
			return data.challs ?? [];
		},
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getSortedRowModel: getSortedRowModel(),
		onPaginationChange: (updater) => {
			pagination = typeof updater === 'function' ? updater(pagination) : updater;
		},
		onColumnFiltersChange: (updater) => {
			columnFilters = typeof updater === 'function' ? updater(columnFilters) : updater;
		},
		onSortingChange: (updater) => {
			sorting = typeof updater === 'function' ? updater(sorting) : updater;
		},
		state: {
			get pagination() {
				return pagination;
			},
			get sorting() {
				return sorting;
			},
			get columnFilters() {
				return columnFilters;
			}
		}
	});

	function format_date(isoString: string): string {
		const date = new Date(isoString);

		const timeStr = date.toLocaleString('en-UK', {
			hour: 'numeric',
			minute: '2-digit',
			hour12: true
		});

		const dateStr = date.toLocaleString('en-UK', {
			month: 'numeric',
			day: 'numeric',
			year: 'numeric'
		});

		return `${timeStr}\n${dateStr}`;
	}
</script>

<div class="flex flex-row justify-end py-1.5 sm:py-2">
	<TableSearchBox
		filterValue={table.getColumn('problem_name')?.getFilterValue() as string}
		onFilter={(value: string) => table.getColumn('problem_name')?.setFilterValue(value)}
	/>
</div>

<div class="rounded-md border">
	<Table.Root class="w-full text-center text-base xl:table-fixed xl:text-lg">
		<Table.Header>
			<Table.Row>
				<SortableHeader columnKey="problem_name" label="Name" css="w-1/5" {table} />
				<SortableHeader columnKey="author" label="Author" css="w-1/6" {table} />
				<SortableHeader columnKey="lang" label="Language" css="w-auto" {table} />
				<SortableHeader columnKey="arch" label="Arch" css="w-auto" {table} />
				<SortableHeader columnKey="difficulty" label="Difficulty" css="w-auto" {table} />
				<SortableHeader columnKey="quality" label="Quality" css="w-auto" {table} />
				<SortableHeader columnKey="platform" label="Platform" css="w-auto" {table} />
				<SortableHeader columnKey="date" label="Date" css="w-[9%]" {table} />
				<SortableHeader columnKey="writeups" label="Writeups" css="w-auto" {table} />
				<SortableHeader columnKey="comments" label="Comments" css="w-auto" {table} />
			</Table.Row>
		</Table.Header>

		<Table.Body>
			{#each table.getRowModel().rows as row (row.id)}
				<Table.Row class="border-0 odd:bg-[#313131]">
					{#each row.getVisibleCells() as cell (cell.id)}
						<Table.Cell class="text-center whitespace-normal">
							{#if cell.column.id === 'problem_name'}
								<a
									href={`https://crackmes.one/${row.original.problem.link}`}
									class="hover:underline focus:underline"
									target="_blank"
								>
									{cell.getValue()}
								</a>
							{:else if cell.column.id === 'author'}
								<a
									href={`https://crackmes.one/user/${row.original.author}`}
									class="hover:underline focus:underline"
									target="_blank"
								>
									{cell.getValue()}
								</a>
							{:else if cell.column.id === 'date'}
								{format_date(cell.getValue())}
							{:else}
								<FlexRender content={cell.column.columnDef.cell} context={cell.getContext()} />
							{/if}
						</Table.Cell>
					{/each}
				</Table.Row>
			{:else}
				<Table.Row>
					<Table.Cell colspan={columns.length} class="h-24 text-center">No results.</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</div>

<!-- Selected Rows Info -->
<div class="pt-2 text-base text-gray-600 dark:text-gray-400">
	Showing
	<span class="font-semibold text-gray-800 dark:text-gray-200"
		>{table.getFilteredRowModel().rows.length}</span
	>
	of
	<span class="font-semibold text-gray-800 dark:text-gray-200"
		>{table.getPreFilteredRowModel().rows.length}</span
	> crackme(s).
</div>

<div class="flex items-center justify-center pt-2">
	<div class="flex flex-row items-center space-x-2">
		<Button
			variant="default"
			onclick={() => table.setPageIndex(0)}
			disabled={!table.getCanPreviousPage()}
		>
			First
		</Button>
		<Button
			variant="default"
			onclick={() => table.previousPage()}
			disabled={!table.getCanPreviousPage()}
		>
			<ChevronLeft />
		</Button>

		<span class="px-3 font-medium">
			Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
		</span>

		<Button variant="default" onclick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
			<ChevronRight />
		</Button>
		<Button
			variant="default"
			onclick={() => table.setPageIndex(table.getPageCount() - 1)}
			disabled={!table.getCanNextPage()}
		>
			Last
		</Button>
	</div>
</div>
