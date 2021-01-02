$(function() {
    var layer = layui.layer;
    // 调用 getUserInfo 获取用户基本信息
    getUserInfo()

    // 退出弹出框
    $('#tuichu').on('click', function() {
            layer.confirm('确定退出吗？', { icon: 3, title: '提示' }, function(index) {
                // 清空本地的token
                localStorage.removeItem('token')
                location.href = '/login.html'
                layer.close(index);
            });
        })
        // 获取用户的基本信息
    function getUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败！')
                }
                //    渲染用户的头像
                renderAvatar(res.data)
            }
        })
    }
    // 渲染用户的头像
    function renderAvatar(user) {
        // 1. 获取用户的名称
        // 用户的名称可能是用户名也可能是自己设置的昵称
        var name = user.nickname || user.username
            // 2. 设置欢迎的文本
        $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
            // 3. 按需渲染用户的头像
            // 如果user里边的有头像
        if (user.user_pic !== null) {
            // 3.1 渲染图片头像

            // 设置图片地址的值
            $('.layui-nav-img').attr('src', user.user_pic).show()
            $('.text-avatar').hide()
        } else {
            // 3.2 渲染文本头像
            // 让图片标签隐藏
            $('.layui-nav-img').hide()
                // 并让用户名的第一个首字母大写
            var first = name[0].toUpperCase()
                // 文本标签span显示
            $('.text-avatar').html(first).show()
        }
    }


})