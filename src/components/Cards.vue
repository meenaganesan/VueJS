<template>
	<div id="card">
		<div>{{message}} : {{count}}</div>
	</div>	
</template>

<script>
export default {
	name:'Cards',
	props: {
		message: String,
		count: Number
	}
}
</script>

<style scoped>
#card{
	width: 260px;
	height: 15px;
	padding: 16px 24px;
	margin-top: 19px;
	margin-left: 12px;
	border: 1px solid gray;
	/* color: #fff;
	background-color: gray; */
	border-radius: .375rem;
}
</style>