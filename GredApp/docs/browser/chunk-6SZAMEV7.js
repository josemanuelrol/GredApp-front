import{a as Y,b as Z}from"./chunk-Y5LGHVFW.js";import{a as X}from"./chunk-OHSN5WVE.js";import"./chunk-UQKURZOD.js";import{$a as K,A as x,Aa as z,Ca as N,E as O,Ia as j,K as M,M as y,Ma as $,Na as V,Ra as W,Sa as q,T as P,Wa as G,Xa as J,bb as Q,f as k,h as _,ha as w,i as I,j as C,l as c,m as T,n as b,na as R,o as g,p as S,pa as B,qa as D,ra as E,s as n,t as a,ta as F,u as h,v,va as U,w as d,x as L,xa as A,y as p,z as f,za as H}from"./chunk-CJIFZG57.js";import"./chunk-A3OJPA2C.js";import"./chunk-7KGURMOZ.js";import"./chunk-C2IFOWZX.js";import"./chunk-GKGVIQI6.js";import"./chunk-A4HLURUV.js";import"./chunk-G3CV3VGG.js";import"./chunk-JGR3S45Q.js";import"./chunk-ZXS6RTUS.js";import"./chunk-RT2Q4DHF.js";import"./chunk-4U6PRYVA.js";import"./chunk-BE36LD5W.js";import"./chunk-JWIEPCRG.js";import"./chunk-QPVVTFFW.js";import"./chunk-J6ICYO4L.js";import"./chunk-LF5XB4YN.js";import{e as u}from"./chunk-XD4PSF4R.js";function tt(r,l){if(r&1){let m=v();n(0,"ion-card",17),d("click",function(){let i=I(m).$implicit,t=L();return C(t.onClick(i))}),n(1,"ion-card-header")(2,"ion-card-title"),h(3,"ion-icon",18),p(4),a()()()}if(r&2){let m=l.$implicit;c(4),x(" ",m.nombre," ")}}function et(r,l){if(r&1&&(n(0,"ion-label"),p(1),a()),r&2){let m=L();c(),f(m.emtpyTasksLists)}}var Mt=(()=>{let l=class l{constructor(e,i){this.loadingController=e,this.alertController=i,this.taskListService=k(Y),this.router=k(P),this.toastService=k(X),this.isActionSheetOpen=!1,this.actionSheetButtons=[{text:"Tareas completadas",role:"completedTasks",data:{action:"completedTasks"}},{text:"Nueva lista",role:"newTaskList",data:{action:"newTaskList"}},{text:"Cancelar",role:"cancel",data:{action:"cancel"}}],this.alertButtons=[{text:"Cancelar",role:"cancel"},{text:"Crear",role:"create",handler:t=>{if(t[0]!=""){let s={nombre:t[0],user_id:this.userID,tareas:[]};this.taskListService.createTaskList(s).then(o=>{this.toastService.presentSuccessToast("top","Lista de tareas creada"),this.taskListService.emitDataUpdatedList()}).catch(o=>{this.toastService.presentErrorToast("top","Ha ocurrido un error")})}}}],this.alertInputs=[{placeholder:"Titulo"}],this.alertButtonsTask=[{text:"Cancelar",role:"cancel"},{text:"Crear",role:"create",handler:t=>{if(t[0]!=""){let s={titulo:t[0],descripcion:t[1]};this.taskListService.addTask(this.mainTaskList._id.$oid,s).then(o=>{this.toastService.presentSuccessToast("top","Tarea creada"),this.taskListService.emitDataUpdateNewTask()}).catch(o=>{this.toastService.presentErrorToast("top","Ha ocurrido un error")})}}}],this.alertInputsTask=[{placeholder:"Titulo"},{placeholder:"Descripci\xF3n (50 caracteres)",attributes:{maxlength:50}}],this.userID=localStorage.getItem("userID"),this.emtpyTasksLists="",this.taskLists=[],this.taskListsResult=[...this.taskLists],this.mainTaskList={},this.taskListService.onDataUpdateList().subscribe(()=>this.loadTaskList()),this.taskListService.onDataUpdateNewTask().subscribe(()=>this.loadTaskList()),this.taskListService.onDataUpdateDeleteTask().subscribe(()=>this.loadTaskList()),this.taskListService.onDataUpdateCheckedTask().subscribe(()=>this.loadTaskListWithOutLoading())}ngOnInit(){this.loadTaskList()}handleRefresh(e){this.taskListService.getTasksByUser(this.userID).then(i=>{i.map(t=>{var s;t.tareas=(s=t.tareas)==null?void 0:s.filter(o=>!o.completed)}),this.mainTaskList=i[0],this.taskLists=i.filter(t=>t.nombre!="Bandeja de entrada"),this.taskListsResult=[...this.taskLists],this.taskListsResult.length==0&&(this.emtpyTasksLists="No tienes listas de tareas"),e.target.complete()}).catch(i=>{e.target.complete(),this.toastService.presentErrorToast("top","Ha ocurrido un error")})}handleInput(e){let i=e.target.value.toLowerCase();this.taskListsResult=this.taskLists.filter(t=>t.nombre.toLowerCase().indexOf(i)>-1)}trackItems(e,i){return i._id}showLoading(){return u(this,null,function*(){(yield this.loadingController.create({message:"Loading..."})).present()})}handleResult(e,i){this.isActionSheetOpen=i,e.detail.role=="completedTasks"?this.router.navigate(["app/tasks/completed-tasks"]):e.detail.role=="newTaskList"&&this.createList()}setOpenActionSheet(e){this.isActionSheetOpen=e}loadTaskList(){this.showLoading(),this.taskListService.getTasksByUser(this.userID).then(e=>{e.map(i=>{var t;i.tareas=(t=i.tareas)==null?void 0:t.filter(s=>!s.completed)}),this.mainTaskList=e[0],this.taskLists=e.filter(i=>i.nombre!="Bandeja de entrada"),this.taskListsResult=[...this.taskLists],this.taskListsResult.length==0&&(this.emtpyTasksLists="No tienes listas de tareas"),this.loadingController.dismiss()}).catch(e=>{this.loadingController.dismiss(),this.toastService.presentErrorToast("top","Ha ocurrido un error")})}loadTaskListWithOutLoading(){this.taskListService.getTasksByUser(this.userID).then(e=>{e.map(i=>{var t;i.tareas=(t=i.tareas)==null?void 0:t.filter(s=>!s.completed)}),this.mainTaskList=e[0],this.taskLists=e.filter(i=>i.nombre!="Bandeja de entrada"),this.taskListsResult=[...this.taskLists],this.taskListsResult.length==0&&(this.emtpyTasksLists="No tienes listas de tareas")}).catch(e=>{this.toastService.presentErrorToast("top","Ha ocurrido un error")})}onClick(e){this.router.navigate(["app/tasks/tasklist",e._id.$oid],{state:{key:e._id.$oid,data:e}})}createList(){return u(this,null,function*(){yield(yield this.alertController.create({header:"Crear lista",buttons:this.alertButtons,inputs:this.alertInputs})).present()})}createTask(){return u(this,null,function*(){yield(yield this.alertController.create({header:"Crear tarea",buttons:this.alertButtonsTask,inputs:this.alertInputsTask})).present()})}};l.\u0275fac=function(i){return new(i||l)(T(J),T(G))},l.\u0275cmp=_({type:l,selectors:[["app-tasks-main"]],standalone:!0,features:[O],decls:23,vars:7,consts:[[1,"ion-no-border"],["color","light",1,"ion-padding-top"],["size","large"],["slot","end"],["shape","round","color","dark",3,"click"],["slot","icon-only","name","ellipsis-horizontal"],["color","light"],["placeholder","Buscar","animated","true","inputmode","search",1,"custom",3,"ionInput"],["slot","fixed","vertical","bottom","horizontal","end"],["size","small","color","danger",3,"click"],["name","add"],["slot","fixed",3,"ionRefresh"],[1,"task-container"],["button","",3,"click",4,"ngFor","ngForOf","ngForTrackBy"],[1,"mainTaskList"],[3,"mainTaskList"],["header","M\xE1s opciones",3,"didDismiss","isOpen","buttons"],["button","",3,"click"],["name","list"]],template:function(i,t){i&1&&(n(0,"ion-header",0)(1,"ion-toolbar",1)(2,"ion-title",2),p(3,"Mis listas"),a(),n(4,"ion-buttons",3)(5,"ion-button",4),d("click",function(){return t.setOpenActionSheet(!0)}),h(6,"ion-icon",5),a()()(),n(7,"ion-toolbar",6)(8,"ion-searchbar",7),d("ionInput",function(o){return t.handleInput(o)}),a()()(),n(9,"ion-content",6)(10,"ion-fab",8)(11,"ion-fab-button",9),d("click",function(){return t.createTask()}),h(12,"ion-icon",10),a()(),n(13,"ion-refresher",11),d("ionRefresh",function(o){return t.handleRefresh(o)}),h(14,"ion-refresher-content"),a(),n(15,"div",12),b(16,tt,5,1,"ion-card",13)(17,et,2,1,"ion-label"),a(),n(18,"div",14)(19,"ion-label"),p(20),a(),h(21,"app-task-list",15),a(),n(22,"ion-action-sheet",16),d("didDismiss",function(o){return t.handleResult(o,!1)}),a()()),i&2&&(c(16),g("ngForOf",t.taskListsResult)("ngForTrackBy",t.trackItems),c(),S(17,t.taskListsResult.length===0?17:-1),c(3),f(t.mainTaskList.nombre),c(),g("mainTaskList",t.mainTaskList),c(),g("isOpen",t.isActionSheetOpen)("buttons",t.actionSheetButtons))},dependencies:[R,D,Z,Q,U,F,E,j,B,K,z,H,V,$,A,N,W,q,y,M,w],styles:[".task-container[_ngcontent-%COMP%]{display:grid;gap:16px;padding:16px;grid-template-columns:repeat(auto-fit,minmax(225px,1fr))}.task-container[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%]{font-size:18px}.mainTaskList[_ngcontent-%COMP%]{display:flex;flex-direction:column}.mainTaskList[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%]:nth-child(1){padding-left:16px;font-size:24px;font-weight:600;margin-bottom:4px}ion-card[_ngcontent-%COMP%]{display:flex;align-items:center;margin:0}ion-card[_ngcontent-%COMP%]   ion-card-header[_ngcontent-%COMP%]{padding:12px}ion-card[_ngcontent-%COMP%]   ion-card-title[_ngcontent-%COMP%]{display:flex;align-items:center;gap:8px;font-size:20px}ion-header[_ngcontent-%COMP%]   ion-toolbar[_ngcontent-%COMP%]   ion-buttons[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%]{padding-right:8px}"]});let r=l;return r})();export{Mt as TasksMainPage};
