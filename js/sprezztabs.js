

  $(document).on("click", "#tablist li:not(#add)", function(e){
    e.preventDefault();
    $('#tablist').find('li.active').removeClass('active');
 
    $(this).addClass('active');

    $('#tab_contents').find('div.active').removeClass('active').addClass('inactive');
  

    $($(this).find('a').attr("rel")).addClass('active');
  });
  

  $(document).on("click", "#add-tab", function(en){
    en.preventDefault();

    var num_tabs = $("#tablist li").length;

    $('#tablist').find('li.active').removeClass('active');
    
    $("<li class=\"active\"><a href=\"#\" rel=\"#tab" 
      + num_tabs + "\" class=\"tab\">Tab" + num_tabs 
      + " </a> <a href=\"#\" class=\"deltab\"><i class=\"icon-remove\"></i></li>").insertAfter('#add');


    $('#tab_contents').find('div.active').removeClass('active').addClass('inactive');

    $("#tab_contents").append("<div id=\"tab" + num_tabs + "\" class=\"active\"><textarea id=\"code"  + num_tabs + "\" class=\"code\"></textarea></div>");
    // var cmify = "#tab" + num_tabs;
    // editr(cmify);
    // alert(cmify);
  });    


  $(document).on("click", ".deltab", function(ed){
    ed.preventDefault();
    // var prev = $(this).parent().next();
    $('#tab_contents').find($(this).parent().find('a').attr('rel')).remove();//finds the tab contents with matching the tab and deletes
    $(this).parent().remove();
    // alert(prev.html());
    // prev.find('a:not(.deltab)').click();
// 
    });