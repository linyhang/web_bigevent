$.ajaxPrefilter(function(options){
    options.url = 'http://www.liulongbin.top:3007' + options.url
    // options.url = 'http://ajax.frontend.itheima.net' + options.url
    if(url.indexof('/my/') !== -1){
        options.headers={
            Authorization:localStorage.getItem('token') || ""
        }
    }

    options.complete=function(){
        if((res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败!'){
            // 1. 强制清空 token
            localStorage.removeItem('token')
            // 2. 强制跳转到登录页面
            location.href = '/login.html'

        }
    }    
})