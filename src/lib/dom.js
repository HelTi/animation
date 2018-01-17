import _ from 'lodash'

var $dom= function (selector) {
    return new $dom.prototype.init(selector);
}

$dom.prototype={
    constructor:$dom,
    length:0,
    selector: '',
    init(selector){
        if(!selector) return this;
        let eles;
        if(typeof selector === 'object'){
            let i=0;
            if(isNode(selector)){
                this[0] = selector;
                this.length=1;
            }else if(isNodeList(selector)){
                selector.forEach(ele=>{
                    this[i]=ele;
                    i++;
                });
                this.length=i;
            }
            return this;
        }else if(typeof selector === 'string'){
            if(selector.charAt(0)==='#' && !selector.match('\\s')){
                this.selector=selector;
                selector=selector.substring(1);
                this[0]= document.getElementById(selector);
                this.length=1;
                return this;
            }else{
                eles=document.querySelectorAll(selector);
                this.length = eles.length;
                for(let i = 0; i<this.length;i++){
                    this[i]=eles[i];
                }
                this.selector=selector;
                return this;
            }
        }
    },
    css(attr,val){
        let atr_lenth = arguments.length;
        for (let i = 0; i < this.length; i++) {
            if (atr_lenth === 2) {
                this[i].style[attr] = val;
            } else {
                let _this = this[i];
                _.forEach(attr, (val, attr) => {
                    console.log(attr,val);
                    _this.style.cssText += '' + attr + ':' + val + ';'
                })
            }
        }
        return this;
    }
};
$dom.prototype.init.prototype = $dom.prototype;

//使用document.querySelectorAll(),返回NodeList
function isNodeList(val) {
    return val instanceof window.NodeList || val instanceof NodeList || val instanceof window.HTMLCollection || val instanceof Array
}

//单个节点，常见的是document.getElementById返回的类型
function isNode(val) {
    return val instanceof window.Node;
}

export default $dom;

