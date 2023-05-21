$(function(){
    // getUserinto()

    //退出
    $('#btnLogout').on('click',function(){
        var layer = layui.layer
        layer.confirm('是否确认退出?', {icon: 3, title:'提示'}, function(index){
            //清空缓存中的token
            localStorage.removeItem('token')
            //重新跳转至登录页面
            location.href = './login.html'
            
            layer.close(index);
          });
    })

})

//发起请求
function getUserinto(){
    $.ajax({
        methon:'GET',
        url:'/my/userinfo',
        headers:{
            Authorization:localStorage.getItem('token')||''
        },
        success:function(res){
            if(res.status !==0){
                return layui.layer.msg('获取信息失败！')
            }
            //获取用户信息
            renderAvatar(res.data)
        }
    })    
}
function renderAvatar(user){
    var name = user.username || user.nickname
    $('#welcome').html('欢迎&nbsp;&nbsp' + name)
    if(user_pic !== null){
        $('.layui-nav-img').attr('src',user.user_pic).show()
        $('.text-avatar').hide()
    }else{
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
        $('.layui-nav-img').hide()
    }
}



    

