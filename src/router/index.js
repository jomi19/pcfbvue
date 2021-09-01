import { createRouter, createWebHistory } from 'vue-router'
import ProjectList from "@/views/Projectlist.vue"
import View from "@/views/project/View.vue"
import Archive from "@/views/project/Archive.vue"
import NewProject from "@/views/project/New.vue"
import NewFollowUp from "@/views/followup/New.vue"
import ViewFollowUp from "@/views/followup/View.vue"
import EditFollowUp from "@/views/followup/Edit.vue"

const routes = [
  {
    path: '/',
    url: "/",
    name: 'Home',
    component: ProjectList,
  },
  {
    path: "/project",
    url: "/project",
    name: "Project list",
    component: ProjectList,
    navbar: true
  },
  {
    path: "/project/view/:id?",
    url: "/project/view",
    name: "Hem",
    component: View,
  }, 
  {
    path: "/project/new",
    url: "/project/new",
    name: "Nytt project",
    component: NewProject,
    navbar: true
  },
  {
    path: "/project/archive",
    url: "/project/archive",
    name: "Arkiv",
    component: Archive,
    navbar: true
  },
  {
    path: "/followup/new/:id",
    url: "/followup/new/",
    name: "Nytt Efterkontroll",
    component: NewFollowUp,
  },
  {
    path: "/followup/edit/:id",
    url: "/followup/new/",
    name: "Redigera efterkontroll",
    component: EditFollowUp,
  },
  {
    path: "/followup/view/:id",
    url: "/followup/view/",
    name: "Efterkontroll",
    component: ViewFollowUp
  }
    
  
]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
