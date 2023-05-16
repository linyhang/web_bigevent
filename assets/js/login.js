$(function(){
    //点击链接去注册
    $('#link_reg').on('click',function(){
        $('.login-box').hide()
        $('.reg-box').show()
    })

    //点击链接去登录
    $('#link_login').on('click',function(){
        $('.reg-box').hide()
        $('.login-box').show()
    })

    //自定义密码验证
    var form = layui.form
    // 定义layer
    var layer = layui.layer
    form.verify({
        pwd: [/^[\S]{6,12}$/,'密码必须6到12位,且不能出现空格'], 

        repwd:function(value){
            var pwd = $('.reg-box [name=password]').val()
            if(pwd !== value){
                return '两次密码不一致'
            }
        }
    })

    //注册接口请求
    $('#form_reg').on('submit',function(e){
        //阻止默认提交行为
        e.preventDefault()
        var data = {
            username:$('#form_reg [name=usernane]').val(),
            password:$('#form_reg [name=password]').val(),
        }
        $.post('/api/reguser',data,
        function(res){
            if(res.status !== 0){
            return layer.msg(res.message)
        }
        return layer.msg('注册成功')
            // 模拟人为点击
            $('#link_login').click()
        })
        
    })

    // 登录接口请求
    $('#form_login').submit(function(e){
        //阻止默认提交行为
        e.preventDefault()
        // 发起ajax请求
        $.ajax({
            url:'/api/login',
            method:'post',
            data:$(this).serialize(),
            success:function(res){
                if(res.status !==0){
                    return layer.msg(res.message)
                }
                return layer.msg('登录成功')
                // 将token保存在localStorage中
                localStorage.setItem('token',res.token)
                //跳转到后台主页
                location.href = './index.html'
            }
        })
    })
    
    // $('#byloin').on('click',function(){
    //     location.href = './index.html'
    // })

})



