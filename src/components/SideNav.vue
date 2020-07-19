<template>
	<div id='sideNav-outer'>
		<!-- profile icon	 -->
		<div class="profile-outer">
			<div class="profile-icon"></div>
			<div class="submitButton" @click="openDropDown">
				<div><i class="fa fa-user fa-fw"></i> {{data.name}}</div>
				<span class="fa fa-caret-down" title="Toggle dropdown menu"></span>
			</div>
			<div class ="dropDown" v-if="showDropDown">
				<div class="dropDownOptions" @click="openChangePassword">Change Password</div>
				<div class="divider"/>
				<div class="dropDownOptions" @click="logout">Logout</div>
			</div>
		</div>
		<div class="read-only">
			<div> Books Taken: {{data.booksTaken.length}}</div>
			<div> Returned books: {{data.returnedBooks.length}}</div>
		</div>  	
	</div>    
</template>

<script>
export default {
	name: 'SideNav',
	data () {
		return {
			showDropDown: false
		}
	},
	props: {data : Object},	
	methods: {
		openDropDown () {
			this.showDropDown = !this.showDropDown
		},
		openChangePassword () {
			this.$router.push({ path: '/changePassword'})
		},
		logout () {
			localStorage.clear()
			this.$router.push({ path:'/login'})
		}
	}
}
</script>

<style scoped>
#sideNav-outer {
	height: 89vh;
	width: 250px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: #3d3f47;
	color: white;
}

#sideNav-outer .submitButton {
  color: #fff;
  border: none;
  margin: 10px 10px;
  border-radius: 5px;
  background-color:gray;
  padding: 10px;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
}

#sideNav-outer .profile-icon {
	width: 100px;
	height: 100px;
	border-radius: 50%;
	background-color: gray;
}

#sideNav-outer .divider {
	border-bottom: 1px solid white;
	margin:6px;
}

#sideNav-outer .name {
	text-transform: capitalize;
}

#sideNav-outer .read-only {
	text-align: center;
	padding: 20px 15px;
}

#sideNav-outer .dropDownOptions {
	margin:7px;
	padding-top: 3px;
	cursor: pointer;
	font-size: 14px;
	padding-bottom: 3px;
}

#sideNav-outer .dropDown{
	position: absolute;
	bottom: 197px;
	height: 75px;
	width: 150px;
	padding: auto;
	background-color: gray;
}    

#sideNav-outer .read-only > div {
	margin: 15px 0px;
}

#sideNav-outer .profile-outer {
	width: 150px;
	height: 150px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-evenly;
}

</style>