
var pullRefresh = function () {

};

var html = document.createElement('div');
html.innerHTML='<p>1111</p>';
console.log(html)

var viewHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

var app = document.getElementById('app');
app.onscroll=function () {
  var app_dom = document.getElementById('app');
  var app_scroll_top = app_dom.scrollTop;
  console.log(app_scroll_top);
  var wrapper = document.querySelector('.wrapper');
  var wrapper_h=wrapper.offsetHeight || wrapper.scrollHeight || wrapper.clientHeight;
  let scroll_y = app_scroll_top + viewHeight;
  if(scroll_y === wrapper_h){
    wrapper.appendChild(html)
    console.log('true')
  }
  //debugger;
};
//debugger;


