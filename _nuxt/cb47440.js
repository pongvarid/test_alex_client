(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{793:function(t,e,n){"use strict";n.r(e);var r=n(657),c=n(623),o=n(649),l=(n(30),n(214),n(2)),d=(n(61),n(37),n(46),{name:"IndexPage",data:function(){return{response:!1,lists:[],search:"",headers:[{text:"No",value:"no"},{text:"Product",value:"product_data"},{text:"Commission",value:"total"},{text:"Customer",value:"customer_data"},{text:"My Child Refferer",value:"my_child_account_data"},{text:"Remark",value:"remark"},{text:"Date",value:"created_at"}]}},created:function(){var t=this;return Object(l.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.run();case 2:case"end":return e.stop()}}),e)})))()},methods:{run:function(){var t=this;return Object(l.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$core.getHttp("/api/account/commission/?account=".concat(t.$auth.user.id));case 2:t.lists=e.sent,t.lists=t.$_.map(t.lists,(function(e,n){return e.no=n+1,e.total="".concat(e.total,"$  (").concat(e.percent,"%)"),e.created_at=t.$kit.dateTTH(e.created_at),e})),t.response=!0;case 5:case"end":return e.stop()}}),e)})))()}}}),m=n(88),component=Object(m.a)(d,(function(){var t=this,e=t._self._c;return e("div",[e("div",{staticClass:"flex"},[t._m(0),t._v(" "),e(c.a),t._v(" "),e("Commission-Add",{on:{refresh:t.run}})],1),t._v(" "),e("div",[e(o.a,{attrs:{label:"Search"},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}}),t._v(" "),e(r.a,{attrs:{headers:t.headers,items:t.lists,search:t.search},scopedSlots:t._u([{key:"item.product_data",fn:function(n){var r=n.item;return[e("span",{staticClass:"font-semibold"},[t._v(t._s(r.product_data))])]}},{key:"item.total",fn:function(n){var r=n.item;n.index;return[e("span",{staticClass:"font-semibold text-orange-500"},[t._v(t._s(r.total))])]}}])})],1)])}),[function(){var t=this,e=t._self._c;return e("div",{staticClass:"flex flex-col"},[e("span",{staticClass:"font-semibold text-xl"},[t._v("List Data")]),t._v(" "),e("span",[t._v("Manage my commission")])])}],!1,null,null,null);e.default=component.exports}}]);