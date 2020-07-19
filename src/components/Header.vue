<template>
	<div id='header-outer'>
		<!-- header -->
		<div class="header">
			<i class="fa fa-book"></i>
			LMS
		</div>

		<!-- header options -->
		<div class ="option-outer">
			<div v-for="(item, index) in data" :key="index" class="options">
				<router-link class="link" active-class="link" :to="item.link">{{item.name}}</router-link>
			</div>
		</div>	
		<!-- <div class="button-outer">
			<button class="submitButton" @click="logout">Logout</button>
		</div> -->
		<div class="icons">
			<i class="fa fa-bell" aria-hidden="true"></i>
			<!-- <i class="fa fa-ellipsis-v" aria-hidden="true"></i> -->
		</div>		
	</div>    
</template>

<script>
export default {
	name: 'Header',
	props: {data : Array},
	methods: {
		openAddBookForm() {
			this.$router.push({ path: '/dashboard/addNewBook'})
		}
	}	
}
</script>

<style scoped>
#header-outer {
	width: 100%;
	height: 70px;
	justify-content: left;
	background-color: #3d3f47;
	color: #fff;
	align-items: center;
	display: flex;
}
.router-link-exact-active{
	margin-top: 2px;
	border-bottom: 2px solid gray;
}

#header-outer .header {
	font-size: -webkit-xxx-large;
	font-weight: 500;
	font-family: monospace;
	color: white;
	align-items: center;
	justify-content: space-evenly;
	display: flex;
	width: 170px;
}	

#header-outer .link {
	color: #fff !important;
  text-decoration: none !important;
}

#header-outer .option-outer {
	margin: 10px 30px;
	display: flex;
	margin-left: 35px;
	align-items: center;
}

#header-outer .options{
	color: white;
	font-size: 18px;
	padding: 0px 15px;
	margin: 25px 0px;
	cursor: pointer;
}

#header-outer .submitButton {
  color: #fff;
  border: none;
  margin: 10px 10px;
  border-radius: 5px;
  background-color:gray;
  padding: 10px;
  cursor: pointer;
}

#header-outer .icons {
	margin-left: auto;
}

#header-outer .icons > i {
	margin: 0px 15px;
}

#header-outer .button-outer {
	margin-left: auto;
}
</style>