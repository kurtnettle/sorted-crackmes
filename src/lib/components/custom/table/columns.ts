import type { ColumnDef } from '@tanstack/table-core';

export type Challenge = {
	problem: {
		name: string;
		link: string;
	};
	author: string;
	lang: string;
	arch: string;
	difficulty: number;
	quality: number;
	platform: string;
	date: string;
	writeups: number;
	comments: number;
};

export const columns: ColumnDef<Challenge>[] = [
	{
		accessorKey: 'problem.name',
		header: 'Name',
		enableSorting: true
	},
	{
		accessorKey: 'author',
		header: 'Author',
		enableSorting: true
	},
	{
		accessorKey: 'lang',
		header: 'Language',
		enableSorting: true
	},
	{
		accessorKey: 'arch',
		header: 'Arch',
		enableSorting: true
	},
	{
		accessorKey: 'difficulty',
		header: 'Difficulty',
		enableSorting: true
	},
	{
		accessorKey: 'quality',
		header: 'Quality',
		enableSorting: true
	},
	{
		accessorKey: 'platform',
		header: 'Platform',
		enableSorting: true
	},
	{
		accessorKey: 'date',
		header: 'Date',
		enableSorting: true
	},
	{
		accessorKey: 'writeups',
		header: 'Writeups',
		enableSorting: true
	},
	{
		accessorKey: 'comments',
		header: 'Comments',
		enableSorting: true
	}
];
