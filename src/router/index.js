import { createRouter, createWebHistory } from 'vue-router'

import HelloPage from "../pages/HelloPage.vue";
import LoginPage from "../pages/LoginPage.vue";
import UserCabinetPage from "../pages/UserCabinetPage.vue";
import {useAuthStore} from "../stores/authStore.js";
import RegistrationPage from "../pages/RegistrationPage.vue";
import UserInfoPage from "../pages/UserInfoPage.vue";


const routes = [
    {
        path: '/',
        name: 'HelloPage',
        component: HelloPage
    },
    {
        path: '/login',
        name: 'LoginPage',
        component: LoginPage
    },
    {
        path: '/cabinet',
        name: 'UserCabinetPage',
        component: UserCabinetPage
    },
    {
        path: '/registration',
        name: 'RegistrationPage',
        component: RegistrationPage
    },
    {
        path: '/user-info',
        name: 'UserInfoPage',
        component: UserInfoPage
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

function isToGuestPage(pageName) {
    const guestPages = [
        'HelloPage',
        'LoginPage',
        'RegistrationPage',
        'UserInfoPage'
    ]

    return guestPages.includes(pageName)
}


router.beforeEach( async (to, from, next) => {
    const authStore = useAuthStore()

    if(!authStore.isAuthResolved) {
        await authStore.restoreAuth()
    }

    if(!authStore.isAuth() && !isToGuestPage(to.name)) {
        next({ name: 'LoginPage' })
    } else if(authStore.isAuth() && isToGuestPage(to.name)) {
        next({ name: 'UserCabinetPage' })
    } else {
        next()
    }
})

export default router
