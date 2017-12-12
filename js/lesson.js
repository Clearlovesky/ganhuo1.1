// 页面传值
function subStr(url) {
    var obj = {};
    var str = url.split('?')[1];

    //console.log(str);
    var str2 = str.split('&');
    console.log(str2);
    for (var k in str2) {
        var str3 = str2[k].split('=');
        obj[str3[0]] = str3[1];
    }
    return obj;
}
var href = subStr(window.location.href);
// console.log(href.a);
// console.log(href);
// console.log(decodeURI(href.a));
// 更改头部标题数据decodeURI(乱码值)方法把地址栏中获取到的乱码转换成相应的中文
$(".middle").text(decodeURI(href.a));
// $(".middle").text(decodeURI(href.a)+"强哥");
// $(".middle").text(href.a+"强哥");

/* 课程列表 */
$(".list2").children('li').click(function(){
	window.location.href="lesson_info.html";
})

//// ''''''
$(function(){
    //获取事件源
    //获取 nav下的li
    var navList =$(".nav .navWrap ul li");
    //获取 nav 下的 二级菜单
    var shops = $(".nav .shop");
    var shopid = 0;
    var areaid = 0;

    //获取店铺数据并渲染数据   不限类型
    //获取 nav 下的 二级菜单的ul
    var shoping = $(".nav .shoping ul");
    $.ajax({
        type:"GET",
        url:"http://127.0.0.1:9090/api/getgsshop",
        dataType:"json",
        success:function(data){
            console.log(data);
            var tplStr = template("tplShoping",data);
            //console.log(tplStr);
            shoping.html(tplStr);
            //点击店铺名称,获取对应数据
            var shopingList = $(".shoping li");
            shopingList.each(function(i,v){
                $(v).on("click",function(){
                    shopid = $(this).attr("shopId");
                    render(shopid,areaid);
                     console.log(render(shopid,areaid));
                    //更新菜单中名字
                    navList.eq(0).children("a").text($(this).children("a").text().slice(0,-1));
                    //排他
                    shopingList.children("a").children("span").addClass("hide");
                    //添加选中标志
                    $(this).children("a").children("span").removeClass("hide");
                   //隐藏菜单
                    $(this).parent("ul").parent(".shop").addClass("hide");
                })
                
            })
        },
        error:function(){
            console.log("请求失败!");
        }
    })

    //获取区域数据并渲染数据 //不限部位
    var area = $(".nav .area ul");
    $.ajax({
        type:"GET",
        url:"http://127.0.0.1:9090/api/getgsshoparea",
        dataType:"json",
        success:function(data){
            console.log(data);
            var tplStr = template("tplArea",data);
            //console.log(tplStr);
            area.html(tplStr);
            //点击区域名称,获取对应数据
            var areaList = $(".area li");
            areaList.each(function(i,v){
                $(v).on("click",function(){
                    console.log($(v));
                    areaid = $(this).attr("areaId");
                    render(shopid,areaid);
                    console.log( render(shopid,areaid));
                    //更新区域名称
                    navList.eq(1).children("a").text($(this).children("a").text().slice(0,2));                    
                    //排他
                    areaList.children("a").children("span").addClass("hide");
                    //添加选中标志
                    $(this).children("a").children("span").removeClass("hide");
                   //隐藏菜单
                    $(this).parent("ul").parent(".shop").addClass("hide");
                })
            })
        },
        error:function(){
            console.log("请求失败!");
        }
    })

    //获取商品数据并渲染数据
    // var products = $(".products ul");
    var products = $(".products");
    render();
    //导航点击展示和隐藏功能
    navList.each(function(i,v){
        $(v).on("click",function(){
            var index = $(v).index();
            shops.each(function(i,v){
                //当前显示,其他隐藏
                if(i === index){
                    $(v).toggleClass("hide");
                }else{
                    $(v).addClass("hide");
                }
            })
        })
    })

     //商品信息数据渲染功能
    function render(shopid,areaid){
        $.ajax({
            type:"GET",
            url:"http://127.0.0.1:9090/api/getgsproduct",
            dataType:"json",
            data:{
                shopid :shopid || 0,
                areaid :areaid || 0
            },
            success:function(data){
                //console.log(data);
                var tplStr = template("tplProducts",data);
                //console.log(tplStr);
                products.html(tplStr);            
            },
            error:function(){
                console.log("请求失败!");
            }
        })
    }
})