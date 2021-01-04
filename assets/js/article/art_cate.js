$(function() {
    var layer = layui.layer;
    var form = layui.form;
    initArtCateList();
    // 获取文章分类请求列表
    function initArtCateList() {
        $.ajax({
            type: "GET",
            url: "/my/article/cates",
            success: function(res) {
                var htmlStr = template('tpl', res)
                $('tbody').html(htmlStr);
            }
        });
    }
    // $('#btnAdd').on('click', function() {
    //     var indexAdd = null;
    //     indexAdd = layer.open({
    //         // 页面层为1
    //         type: 1,
    //         // 宽高
    //         area: ['500px', '250px'],
    //         title: '添加文章分类',
    //         content: $('#dialog-add').html()
    //     });

    // })
    // 为添加按钮绑定点击事件并弹出弹出框
    var indexAdd = null
    $('#btnAdd').on('click', function() {
            indexAdd = layer.open({
                type: 1,
                area: ['500px', '250px'],
                title: '添加文章分类',
                content: $('#dialog-add').html()
            })
        })
        // 对添加文章分类弹出框表单中的数据进行提交，
    $('body').on('submit', '#form-add', function(e) {
            e.preventDefault();

            $.ajax({
                type: "POST",
                url: "/my/article/addcates",
                data: $(this).serialize(),
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('新增文章失败!')
                    }
                    // 更新文章分类列表
                    initArtCateList();
                    layer.msg('新增文件成功');
                    layer.close(indexAdd);
                }
            });


        })
        // 通过代理的形式为btn-edit绑定表单弹出事件
    var indexEdit = null;
    $('tbody').on('click', '.btn-edit', function() {
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#dialog-edit').html()
        })
        var id = $(this).attr('data-id')
        $.ajax({
            type: "GET",
            url: "/my/article/cates/" + id,
            success: function(res) {
                // 为lay-filter的属性值，设置其对应的数据
                form.val('form-edit', res.data)
            }
        });
    })

    // 更新文章分类的数据
    $('body').on('submit', '#form-edit', function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/my/article/updatecate",
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更新分类失败')

                }
                layer.msg('更新分类成功');
                layer.close(indexEdit);
                initArtCateList();

            }
        });

    })
    $('tbody').on('click', '.btn-delete', function() {
        var id = $(this).attr('data-id');
        layer.confirm('is not?', { icon: 3, title: '提示' }, function(index) {
            //do something
            $.ajax({
                type: "GET",
                url: "/my/article/deletecate/" + id,
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('删除文章分类失败')
                    }
                    layer.msg('删除文章分类成功')
                    layer.close(index);
                    initArtCateList();
                }
            });

        });
    })


})