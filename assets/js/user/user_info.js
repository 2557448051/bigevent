$(function() {
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        nicheng: function(value) {
            if (value.length > 6) {
                return layer.msg('请输入1-6位的昵称')
            }
        }
    })

    inforUser();

    function inforUser() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败！')
                }
                // console.log(res);
                form.val('formUserInfo', res.data)

            }
        })
    }
    // 点击重置按钮
    $('#btnReset').on('click', function() {
            e.preventDefault();
            inforUser()
        })
        // 监听表单的提交事件
    $('.layui-form').on('submit', function(e) {
        // 阻止表单的默认提交行为
        e.preventDefault()
            // 发起 ajax 数据请求
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败！')
                }
                layer.msg('更新用户信息成功！')
                    // 调用父页面中的方法，重新渲染用户的头像和用户的信息
                    // getUserInfo()是之前定义的函数目的是重新渲染页面
                window.parent.getUserInfo()
            }
        })
    })
})