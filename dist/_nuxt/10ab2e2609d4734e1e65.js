(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{188:function(t,e,o){var content=o(191);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(15).default)("1347dd96",content,!0,{sourceMap:!1})},189:function(t,e,o){"use strict";o(116);var n=o(87);e.a=Object(n.a)("layout")},190:function(t,e,o){"use strict";var n=o(188);o.n(n).a},191:function(t,e,o){(t.exports=o(14)(!1)).push([t.i,"input#section-input{background:#fff;border-style:inset}div#main{max-width:100vw;overflow:hidden}div.question{margin:10px 0;font-size:130%;display:flex}div.question input.check{display:none}div.question h2{height:26px;line-height:26px;width:45px;flex-shrink:0}div.question input.check:checked+label h2{color:red}div.question div.options{display:flex}div.question div.options .option{margin-left:5px}div.question div.options .option input[type=radio]{display:none}div.question div.options .option div.radio-button{border:1px solid #333;width:-webkit-fit-content;width:-moz-fit-content;width:fit-content;border-radius:45%;height:26px;line-height:24px;box-sizing:border-box}div.question div.options .option input[type=radio].radio:checked+label div.radio-button{background:#333;color:#fff}div.question .memo{background:#fff;border-style:inset;width:100%;resize:none;margin-top:1px;margin-left:10px}input.mode{display:none}div.mode-button{border:1px solid #333;width:-webkit-fit-content;width:-moz-fit-content;width:fit-content;padding:2px 10px;font-weight:700;margin:10px auto}.result #top{font-weight:700;font-size:150%}.result .question{display:none;font-size:100%;margin:5px 0}.result .question h2{height:22px;line-height:22px;width:30px;font-weight:400}.result .question div.options .option div.radio-button{height:22px;line-height:20px}.result .question.marked{display:flex}.result input[type=text],.result textarea{background:transparent!important;border-style:none!important}",""])},192:function(t,e,o){"use strict";o.r(e);o(32);var n={data:function(){return{result:!1,questions:20,check:[],memo:["","","","","","","","","","","","","","","","","","","","",""]}},computed:{rows:function(){return this.memo.map(function(t){return Math.max(t.split("\n").length,1)})}},mounted:function(){}},r=(o(190),o(40)),c=o(88),d=o.n(c),l=o(189),component=Object(r.a)(n,function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("v-layout",{class:{result:t.result},attrs:{column:""}},[o("div",{attrs:{id:"top"}},[o("input",{attrs:{type:"text",name:"section",id:"section-input",placeholder:"Title"}})]),t._v(" "),o("div",{attrs:{id:"main"}},t._l(t.questions,function(i){return o("div",{key:i,staticClass:"question",class:{marked:t.check[i]||t.memo[i]}},[o("input",{directives:[{name:"model",rawName:"v-model",value:t.check[i],expression:"check[i]"}],staticClass:"check",attrs:{type:"checkbox",name:"check-"+i,id:"check-"+i},domProps:{checked:Array.isArray(t.check[i])?t._i(t.check[i],null)>-1:t.check[i]},on:{change:function(e){var o=t.check[i],n=e.target,r=!!n.checked;if(Array.isArray(o)){var c=t._i(o,null);n.checked?c<0&&t.$set(t.check,i,o.concat([null])):c>-1&&t.$set(t.check,i,o.slice(0,c).concat(o.slice(c+1)))}else t.$set(t.check,i,r)}}}),t._v(" "),o("label",{attrs:{for:"check-"+i}},[o("h2",[t._v(t._s(i)+".")])]),t._v(" "),o("div",{staticClass:"options"},t._l(["A","B","C","D"],function(option){return o("div",{key:option,staticClass:"option"},[o("input",{staticClass:"radio",attrs:{type:"radio",name:i,id:i+"-"+option}}),t._v(" "),o("label",{attrs:{for:i+"-"+option}},[o("div",{staticClass:"radio-button"},[t._v(t._s(option))])])])}),0),t._v(" "),o("textarea",{directives:[{name:"model",rawName:"v-model",value:t.memo[i],expression:"memo[i]"}],staticClass:"memo",attrs:{name:"memo-"+i,id:"memo-"+i,rows:t.rows[i]},domProps:{value:t.memo[i]},on:{input:function(e){e.target.composing||t.$set(t.memo,i,e.target.value)}}})])}),0),t._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:t.result,expression:"result"}],staticClass:"mode",attrs:{type:"checkbox",name:"mode",id:"mode"},domProps:{checked:Array.isArray(t.result)?t._i(t.result,null)>-1:t.result},on:{change:function(e){var o=t.result,n=e.target,r=!!n.checked;if(Array.isArray(o)){var c=t._i(o,null);n.checked?c<0&&(t.result=o.concat([null])):c>-1&&(t.result=o.slice(0,c).concat(o.slice(c+1)))}else t.result=r}}}),t._v(" "),o("label",{attrs:{for:"mode"}},[o("div",{staticClass:"mode-button"},[t._v("表示切り替え")])])])},[],!1,null,null,null);e.default=component.exports;d()(component,{VLayout:l.a})}}]);