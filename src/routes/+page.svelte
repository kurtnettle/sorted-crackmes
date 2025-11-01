<script lang="ts">
	import CrackMeTable from '$lib/components/custom/table/CrackMeTable.svelte';
	import { columns } from '$lib/components/custom/table/columns.js';

	import Footer from '$lib/components/custom/Footer.svelte';
	import Navbar from '$lib/components/custom/Navbar.svelte';

	let { data } = $props();

	let loading = $state(true);
	let error = $state('');

	$effect(() => {
		if (data) {
			loading = false;
			if (data?.error !== '') error = data.error;
		}
	});
</script>

<Navbar />

<div class="mx-auto w-full grow px-6 py-8 md:px-12 md:py-10">
	{#if loading}
		<div class="text-center">Loading...</div>
	{:else if error}
		<div class="text-center text-red-500">Error: {error}</div>
	{:else}
		<CrackMeTable data={data.data} {columns} />
	{/if}
</div>

<Footer lastScraped={data.data?.last_updated} />
