$(function() {
    $('#link_denglu').on('click', function() {
        $('.zhuce').show();
        $('.denglu').hide();
    })
    $('#link_zhuce').on('click', function() {
        $('.denglu').show();
        $('.zhuce').hide();
    })

    var form = layui.form;
    var layer = layui.layer;
    form.verify({
            pwd: [
                /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
            ],
            // 校验两次密码是否一致
            reg: function(value) {
                // 通过形参拿到的是确认密码框中的内容
                // 还需要拿到密码框中的内容
                // 然后进行一次等于的判断
                // 如果判断失败,则return一个提示消息即可
                var pwd = $('.zhuce [name=password]').val();
                if (pwd !== value) {
                    return '两次密码不一致'
                }
                console.log('你输入的密码正确');
            }
        })
        // 监听注册表单的提交事件
    $('#form_reg').on('submit', function(e) {
            e.preventDefault();
            var data = {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val()
            }
            $.post('/api/reguser', data, function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('注册成功');
                $('#link_zhuce').click();
            })
        })
        // 监听登录表单的提交事件
    $('#dengluId').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登陆失败！')
                }
                layer.msg('登录成功');
                localStorage.setItem('token', res.token);
                location.href = '/index.html'

            }
        })
    })

})