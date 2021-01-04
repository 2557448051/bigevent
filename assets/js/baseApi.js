$(function() {
    $.ajaxPrefilter(function(options) {
        options.url = 'http://api-breakingnews-web.itheima.net' + options.url;
        // 如果url地址中包括/my/开头的地址则需要配置请求头对象
        if (options.url.indexOf('/my/') !== -1) {
            options.headers = {
                Authorization: localStorage.getItem('token') || ''
            }
        }
        // 不论获取用户信息成功还是失败都需要执行complete，
        // 用户不登录账号无法直接访问内部的后台
        // 在complete回调函数中可以通过responseJSON拿到服务器相应回来的数据
        options.complete = function(res) {
            // console.log(res);
            if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                localStorage.removeItem('token');
                location.href = '/login.html'
            }
        }

    })

})