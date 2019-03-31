import Vue from 'vue'
import MyWorld from '@/components/MyWorld'

describe('MyWorld.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(MyWorld)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.world h1').textContent)
      .to.equal('Welcome to My World!!!')
  })
})
