import{a as O}from"./chunk-JYU3FD7Z.js";import{a as H}from"./chunk-OHSN5WVE.js";import"./chunk-UQKURZOD.js";import{$ as h,$a as R,Ca as M,E as I,M as D,Sa as F,T as N,Wa as P,Y as m,Z as k,ca as x,cb as G,f as l,h as f,ha as y,i as C,ia as T,j as g,l as s,la as E,m as v,n as _,o as d,p as S,pa as V,s as r,t as n,u as c,v as w,w as u,x as b,xa as B}from"./chunk-CJIFZG57.js";import"./chunk-A3OJPA2C.js";import"./chunk-7KGURMOZ.js";import"./chunk-C2IFOWZX.js";import"./chunk-GKGVIQI6.js";import"./chunk-A4HLURUV.js";import"./chunk-G3CV3VGG.js";import"./chunk-JGR3S45Q.js";import"./chunk-ZXS6RTUS.js";import"./chunk-RT2Q4DHF.js";import"./chunk-4U6PRYVA.js";import"./chunk-BE36LD5W.js";import"./chunk-JWIEPCRG.js";import"./chunk-QPVVTFFW.js";import"./chunk-J6ICYO4L.js";import"./chunk-LF5XB4YN.js";import{e as p}from"./chunk-XD4PSF4R.js";function q(i,o){if(i&1){let j=w();r(0,"ion-button",9),u("click",function(){C(j);let t=b();return g(t.onDelete())}),c(1,"ion-icon",10),n()}}var ot=(()=>{let o=class o{constructor(e){this.alertCtrl=e,this.router=l(N),this.notesService=l(O),this.toastService=l(H),this.note={titulo:"",contenido:""},this.alertButtons=[],this.tituloControl=new h("",m.required),this.contenidoControl=new h("",m.required),this.alertButtons=[{text:"Cancelar",role:"cancel"},{text:"Eliminar",role:"delete",handler:()=>{this.notesService.deleteNote(this.note._id.$oid).then(t=>{this.notesService.emitDataUpdated(),this.router.navigate(["app/notes"])}).catch(t=>{this.toastService.presentErrorToast("top","Ha ocurrido un error")})}}]}ngOnInit(){let e=this.router.getCurrentNavigation().extras.state;this.note=e.data,this.tituloControl.setValue(this.note.titulo),this.contenidoControl.setValue(this.note.contenido)}onBack(){let e={user_id:localStorage.getItem("userID"),titulo:this.tituloControl.getRawValue(),contenido:this.contenidoControl.getRawValue()};this.note.titulo==""&&this.note.contenido==""?this.tituloControl.valid&&this.notesService.createNote(e).then(t=>{this.notesService.emitDataUpdated()}).catch(t=>{this.toastService.presentErrorToast("top","Ha ocurrido un error")}):this.note.titulo!=""&&(this.note.titulo!=this.tituloControl.getRawValue()||this.note.contenido!=this.contenidoControl.getRawValue())&&this.notesService.updateNote(this.note._id.$oid,e).then(t=>{this.notesService.emitDataUpdated()}).catch(t=>{this.toastService.presentErrorToast("top","Ha ocurrido un error")})}onDelete(){return p(this,null,function*(){yield(yield this.alertCtrl.create({header:"\xBFDesea eliminar esta nota?",message:"Esta nota ser\xE1 eliminada permanentemente",buttons:this.alertButtons})).present()})}};o.\u0275fac=function(t){return new(t||o)(v(P))},o.\u0275cmp=f({type:o,selectors:[["app-note-detail"]],standalone:!0,features:[I],decls:10,vars:5,consts:[["collapse","condense",1,"ion-no-border"],["color","light"],["slot","start","color","dark",3,"click"],["slot","end","fill","clear","color","danger"],[1,"container","ion-padding"],[1,"titleNote"],["placeholder","Titulo de la nota...",3,"formControl","autoGrow"],[1,"bodyNote"],["placeholder","Escribe algo aqui...",3,"formControl","autoGrow"],["slot","end","fill","clear","color","danger",3,"click"],["slot","icon-only","name","trash-outline"]],template:function(t,a){t&1&&(r(0,"ion-header",0)(1,"ion-toolbar",1)(2,"ion-back-button",2),u("click",function(){return a.onBack()}),n(),_(3,q,2,0,"ion-button",3),n()(),r(4,"ion-content",1)(5,"div",4)(6,"div",5),c(7,"ion-textarea",6),n(),r(8,"div",7),c(9,"ion-textarea",8),n()()()),t&2&&(s(3),S(3,a.note.titulo!==""?3:-1),s(4),d("formControl",a.tituloControl)("autoGrow",!0),s(2),d("formControl",a.contenidoControl)("autoGrow",!0))},dependencies:[E,T,k,x,R,V,G,B,M,F,D,y],styles:[".container[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:flex-start;justify-content:center}.titleNote[_ngcontent-%COMP%]{font-size:32px;font-weight:800}.bodyNote[_ngcontent-%COMP%]{padding:0;margin:0}"]});let i=o;return i})();export{ot as NoteDetailPage};
