/**
 * author: MinXuan.Wong
 * Date: 2016-04-05T19:26Z
 */



var module1 = (function ($) {
    var form_data = new FormData();
    form_data.append("upgradePackage", $('#upgradePackage')[0].files[0]);


    $('#up').on('click', function() {
        console.log($('#upgradePackage'))
    })

})(jQuery);

