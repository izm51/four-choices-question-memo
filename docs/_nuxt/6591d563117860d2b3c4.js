(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{189:function(t,e,n){var content=n(192);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(15).default)("08d1db0a",content,!0,{sourceMap:!1})},190:function(t,e,n){var content=n(194);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(15).default)("1347dd96",content,!0,{sourceMap:!1})},191:function(t,e,n){"use strict";var o=n(189);n.n(o).a},192:function(t,e,n){(t.exports=n(14)(!1)).push([t.i,".stopwatch{display:flex}.stopwatch .time{margin:0 5px;height:23px;line-height:23px}.stopwatch .reset-button{border:1px solid #ccc;border-radius:25px;padding:0 5px;height:23px;line-height:21px}",""])},193:function(t,e,n){"use strict";var o=n(190);n.n(o).a},194:function(t,e,n){(t.exports=n(14)(!1)).push([t.i,"#top{display:flex;overflow:hidden;max-width:100vw;align-items:center;justify-content:space-between}#top input#section-input{background:#fff;border-style:inset;width:100%}div#main{max-width:100vw;overflow:hidden}div.question{margin:10px 0;font-size:130%;display:flex}div.question input.check{display:none}div.question h2{height:26px;line-height:26px;width:45px;flex-shrink:0}div.question input.check:checked+label h2{color:red}div.question div.options{display:flex}div.question div.options .option{margin-left:5px}div.question div.options .option input[type=radio]{display:none}div.question div.options .option div.radio-button{border:1px solid #333;width:-webkit-fit-content;width:-moz-fit-content;width:fit-content;border-radius:45%;height:26px;line-height:24px;box-sizing:border-box}div.question div.options .option input[type=radio].radio:checked+label div.radio-button{background:#333;color:#fff}div.question .memo{background:#fff;border-style:inset;width:100%;resize:none;margin-top:1px;margin-left:10px}input.mode{display:none}#bottom a{text-decoration:none}div.bottom-button{border:1px solid #333;width:-webkit-fit-content;width:-moz-fit-content;width:fit-content;padding:2px 10px;font-weight:700;margin:10px auto;color:#000}.result #top{font-weight:700;font-size:150%}.result #top .reset-button{display:none}.result .question{display:none;font-size:100%;margin:5px 0}.result .question h2{height:22px;line-height:22px;width:30px;font-weight:400}.result .question div.options .option div.radio-button{height:22px;line-height:20px}.result .question.marked{display:flex}.result input[type=text],.result textarea{background:transparent!important;border-style:none!important}",""])},195:function(t,e,n){"use strict";n.r(e);n(31);var o={data:function(){return{state:"paused",time:0,interval:null}},mounted:function(){},destroyed:function(){clearInterval(this.interval)},computed:{dispTime:function(){return this.hours+":"+this.minutes+":"+this.seconds+"."+this.milliseconds},milliseconds:function(){return this.time%10},hours:function(){var t=Math.floor(this.time/10/60/60);return t>=10?t:"0"+t},minutes:function(){var t=Math.floor(this.time/10/60%60);return t>=10?t:"0"+t},seconds:function(){var t=Math.ceil(this.time/10%60);return t>=10?t:"0"+t}},methods:{reset:function(){this.pause(),this.time=0},start:function(){this.interval=setInterval(this.updateCurrentTime,100),this.state="started"},pause:function(){clearInterval(this.interval),this.state="paused"},updateCurrentTime:function(){this.time++},click:function(){"paused"==this.state?this.start():this.pause()}}},r=(n(191),n(40)),c={components:{Stopwatch:Object(r.a)(o,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"stopwatch"},[n("span",{staticClass:"time",domProps:{innerHTML:t._s(t.dispTime)},on:{click:function(e){return t.click()}}}),t._v(" "),n("div",{staticClass:"reset-button",on:{click:function(e){return t.reset()}}},[t._v("Reset")])])},[],!1,null,null,null).exports},data:function(){return{result:!1,questions:20,check:[],memo:["","","","","","","","","","","","","","","","","","","","",""]}},computed:{rows:function(){return this.memo.map(function(t){return Math.max(t.split("\n").length,1)})}},created:function(){window.addEventListener("beforeunload",function(t){t.returnValue="reload"},!1)}},l=(n(193),n(110)),d=n.n(l),h=(n(117),n(111)),m=Object(h.a)("layout"),f=Object(r.a)(c,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-layout",{class:{result:t.result},attrs:{column:""}},[n("div",{attrs:{id:"top"}},[n("input",{attrs:{type:"text",name:"section",id:"section-input",placeholder:"Title"}}),t._v(" "),n("stopwatch",{ref:"stopwatch"})],1),t._v(" "),n("div",{attrs:{id:"main"}},t._l(t.questions,function(i){return n("div",{key:i,staticClass:"question",class:{marked:t.check[i]||t.memo[i]}},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.check[i],expression:"check[i]"}],staticClass:"check",attrs:{type:"checkbox",name:"check-"+i,id:"check-"+i},domProps:{checked:Array.isArray(t.check[i])?t._i(t.check[i],null)>-1:t.check[i]},on:{change:function(e){var n=t.check[i],o=e.target,r=!!o.checked;if(Array.isArray(n)){var c=t._i(n,null);o.checked?c<0&&t.$set(t.check,i,n.concat([null])):c>-1&&t.$set(t.check,i,n.slice(0,c).concat(n.slice(c+1)))}else t.$set(t.check,i,r)}}}),t._v(" "),n("label",{attrs:{for:"check-"+i}},[n("h2",[t._v(t._s(i)+".")])]),t._v(" "),n("div",{staticClass:"options"},t._l(["A","B","C","D"],function(option){return n("div",{key:option,staticClass:"option"},[n("input",{staticClass:"radio",attrs:{type:"radio",name:i,id:i+"-"+option}}),t._v(" "),n("label",{attrs:{for:i+"-"+option}},[n("div",{staticClass:"radio-button"},[t._v(t._s(option))])])])}),0),t._v(" "),n("textarea",{directives:[{name:"model",rawName:"v-model",value:t.memo[i],expression:"memo[i]"}],staticClass:"memo",attrs:{name:"memo-"+i,id:"memo-"+i,rows:t.rows[i]},domProps:{value:t.memo[i]},on:{input:function(e){e.target.composing||t.$set(t.memo,i,e.target.value)}}})])}),0),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.result,expression:"result"}],staticClass:"mode",attrs:{type:"checkbox",name:"mode",id:"mode"},domProps:{checked:Array.isArray(t.result)?t._i(t.result,null)>-1:t.result},on:{change:function(e){var n=t.result,o=e.target,r=!!o.checked;if(Array.isArray(n)){var c=t._i(n,null);o.checked?c<0&&(t.result=n.concat([null])):c>-1&&(t.result=n.slice(0,c).concat(n.slice(c+1)))}else t.result=r}}}),t._v(" "),n("v-layout",{attrs:{"justify-center":"",id:"bottom"}},[n("label",{attrs:{for:"mode"}},[n("div",{staticClass:"bottom-button",on:{click:function(e){return t.$refs.stopwatch.pause()}}},[t._v("表示切り替え")])]),t._v(" "),n("nuxt-link",{directives:[{name:"scroll-to",rawName:"v-scroll-to",value:{el:"#top",offset:-100},expression:"{el:'#top',offset: -100}"}],attrs:{to:""}},[n("div",{staticClass:"bottom-button"},[t._v("TOPへ")])])],1)],1)},[],!1,null,null,null);e.default=f.exports;d()(f,{VLayout:m})}}]);