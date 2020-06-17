import Toast from './Toast.vue'

let toast = {}
toast.install = function (Vue) {
  const toastContructor = Vue.extend(Toast)
  const t = new toastContructor()
  t.$mount(document.createElement('div'))
  document.body.appendChild(t.$el)
  Vue.prototype.$toast = t
}

export default toast