<script lang="ts">
	import ApplicationWindow from './ApplicationWindow.svelte';
</script>

<ApplicationWindow {...$$restProps}>
	<slot />
	<slot slot="title" name="title" />
	<slot slot="header-actions" name="header-actions" />
	<slot slot="nav-header" name="nav-header" />
	<slot slot="nav-footer" name="nav-footer" />
</ApplicationWindow>
