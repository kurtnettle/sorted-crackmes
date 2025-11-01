<script lang="ts">
	let { lastScraped = '0000-00-00T00:00:00' } = $props();
	let finalLastScraped = $derived(lastScraped?.trim() === '' ? '0000-00-00T00:00:00' : lastScraped);
</script>

<footer class="bg-[#171717] py-4">
	<div class="text-center">
		<!-- <div class="flex flex-row items-center justify-center gap-4"> -->
		<!-- <span class="text-base">
				Built by
				<a
					href="https://github.com/kurtnettle"
					class="font-medium transition-colors duration-200 hover:underline"
				>
					kurtnettle
				</a>
			</span>

			<div class="hidden h-4 w-px bg-gray-600 sm:block"></div> -->

		<span class="text-base">
			Last scraped:
			<span class="rounded-md border border-gray-600 bg-zinc-800 p-1.5 font-mono text-sm">
				{finalLastScraped}
			</span>
		</span>
	</div>
	<!-- </div> -->
</footer>
