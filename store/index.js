// export const getters = {
//   isAuthenticated(state) {
//     return state.auth.loggedIn; // auth object as default will be added in vuex state, when you initialize nuxt auth
//   },
//   getUserInfo(state) {
//     return state.auth.user;
//   }
// };


import Cookie from "js-cookie";
import Vuex from "vuex";
const store = () => {
  return new Vuex.Store({

    state:{
      token: null,
      userInfo:null,
      phone: null
    },
    mutations:{
      setToken(state, token) {
        state.token = token;
     },
      setUserInfo(state, user) {
        state.userInfo = user;
      },
      setPhoneNumber (state, phone) {
        state.phone = phone
      }
    },
    actions:{
      storeUser(vuexContext,user){
        if(process.browser){
           this.$auth.$storage.setLocalStorage("token", user.token);
           this.$auth.$storage.setLocalStorage("user", JSON.stringify(user));
        }
        Cookie.set("jwt", user.token)
        Cookie.set("user",JSON.stringify(user))

        vuexContext.commit('setToken',user.token)
        vuexContext.commit('setUserInfo',user)

        this.$router.push('/profile')
      },
      initAuth(vuexContext, req) {
        let token;

        if (req) {
          if (!req.headers.cookie) {
            return;
          }
          const jwtCookie = req.headers.cookie
            .split(";")
            .find(c => c.trim().startsWith("jwt="));
          if (!jwtCookie) {
            return;
          }
          token = jwtCookie.split("=")[1];
        }
        else if(process.client) {
          token = localStorage.getItem("auth.token");
        }

        vuexContext.commit("setToken", token);
      },
      fetchUser(vuexContext, req){
        let user;

        if (req) {
          if (!req.headers.cookie) {
            return;
          }
          const jwtCookie = req.headers.cookie
            .split(";")
            .find(c => c.trim().startsWith("user="));
          if (!jwtCookie) {
            return;
          } 
          user = JSON.parse(jwtCookie.split("=")[1]);
        }
        else if(process.client) {
          user = JSON.parse(localStorage.getItem("auth.user"));
        }
        if(!vuexContext.state.userInfo){
          vuexContext.commit("setUserInfo", user);
        }
          
      },        
      
    },
    getters:{
      isAuthenticated(state) {
        return state.token != null;
      },
      getToken(state){
        return state.token
      },
      getUser(state){
        return state.userInfo
      },
      getPhone (state) {
        return state.phone
      }
    }
  })
}
export default store;