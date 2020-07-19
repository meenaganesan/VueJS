<template>
  <div id="dashboard">
    <Header :data="options"></Header>
    <div style="display: flex;">
      <SideNav :data="item"></SideNav>
      <router-view />
    </div>  
  </div>  
</template>

<script>
// @ is an alias to /src
import SideNav from '@/components/SideNav.vue'
import Header from '@/components/Header.vue'

export default {
  name: 'Dashboard',
  data () {
    var item = JSON.parse(localStorage.getItem('data'))
    var selectedOptions = item.role && item.role === 'admin' ? [{name: 'Dashboard', link: '/dashboard'}, {name: 'Users', link: '/dashboard/userList'}, {name: 'Add New Book', link:'/dashboard/addNewBook'}] : [{name: 'Dashboard', link: '/dashboard'}, {name: 'My History', link:'/dashboard/myHistory'}]
    return {
    "item": item,
    "options": selectedOptions
    }
  },

  components : {
    SideNav,
    Header
  }
}
</script>


