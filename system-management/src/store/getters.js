const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  addFundDialog: state => list.addFundDialog,
  menuList: state => state.user.menuList,

}
export default getters