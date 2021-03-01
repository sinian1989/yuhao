
const state = {
	addFundDialog: {
	   title:'添加',
	   type:'add'
	},
  idArrs :[]
}
const getters = {
	addFundDialog: state => state.addFundDialog,
  idArrs: state => state.idArrs,
}
const actions={

}

const mutations={
	SET_DIALOG_TITLE: (state, type) => {
		if(type == 'add'){
			state.addFundDialog.title = '添加';
			state.addFundDialog.type = 'add';
		}else{
			state.addFundDialog.title = '修改';
			state.addFundDialog.type = 'edit';
			console.log(state.addFundDialog.title);
			console.log(state.addFundDialog.type);
		}
		
	},
  SET_TREE_ARR:(state,data)=>{
    state.idArrs = [...data]
  }
}
export default {
	namespaced:true,
	state,
  getters,
	actions,
	mutations
}
