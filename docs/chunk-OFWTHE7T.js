import{a as Y}from"./chunk-ZDRTFGTT.js";import{a as A}from"./chunk-OHSN5WVE.js";import{a as V}from"./chunk-RUXB5BZI.js";import"./chunk-UQKURZOD.js";import{$ as f,Ba as D,Da as N,E as I,Ia as R,M as v,Oa as z,T as S,Xa as k,Y as p,Ya as B,Z as w,_ as b,ab as U,ba as y,ca as F,da as x,ea as T,f as a,ga as M,h,ia as P,l,m as c,o as s,pa as _,ra as j,s as o,sa as q,t as n,ta as E,u,ua as G,w as C,wa as L,xa as O,y as d}from"./chunk-CJIFZG57.js";import"./chunk-A3OJPA2C.js";import"./chunk-7KGURMOZ.js";import"./chunk-C2IFOWZX.js";import"./chunk-GKGVIQI6.js";import"./chunk-A4HLURUV.js";import"./chunk-G3CV3VGG.js";import"./chunk-JGR3S45Q.js";import"./chunk-ZXS6RTUS.js";import"./chunk-RT2Q4DHF.js";import"./chunk-4U6PRYVA.js";import"./chunk-BE36LD5W.js";import"./chunk-JWIEPCRG.js";import"./chunk-QPVVTFFW.js";import"./chunk-J6ICYO4L.js";import"./chunk-LF5XB4YN.js";import{e as m}from"./chunk-XD4PSF4R.js";var de=(()=>{let r=class r{get usernameControl(){return this.loginForm.get("username")}get passwordControl(){return this.loginForm.get("password")}constructor(e,i,t){this.formBuilder=e,this.toastController=i,this.loadingController=t,this.authService=a(V),this.userService=a(Y),this.router=a(S),this.toastService=a(A),this.loginForm=e.group({username:new f("",p.required),password:new f("",p.required)})}ngOnInit(){console.log("")}login(){return m(this,null,function*(){this.showLoading(),yield this.authService.login(this.loginForm.value).then(e=>{e.login&&(localStorage.setItem("userID",e.user_id),localStorage.setItem("token",e.token),this.router.navigate(["/app"]),this.loadingController.dismiss())}).catch(e=>m(this,null,function*(){localStorage.clear(),this.loadingController.dismiss(),this.toastService.presentErrorToast("top",e.error.error)}))})}showLoading(){return m(this,null,function*(){(yield this.loadingController.create({message:"Loading..."})).present()})}};r.\u0275fac=function(i){return new(i||r)(c(M),c(B),c(k))},r.\u0275cmp=h({type:r,selectors:[["app-login"]],standalone:!0,features:[I],decls:25,vars:4,consts:[["scrollY","true","scrollX","false"],["fixed","true",1,"mainGrid"],[1,"ion-justify-content-center"],["size","12","sizeLg","8"],["size","12","sizeSm","6"],[1,"ion-text-center"],[1,"ion-margin-top"],["alt","logo","src","../../../assets/logo/logo.png",2,"height","8rem","width","8rem"],[3,"ngSubmit","formGroup"],["type","text","fill","solid","inputmode","text","label","Usuario","labelPlacement","floating","helperText","Introduce tu usuario","errorText","Usuario requerido","required","true","clearInput","true",3,"formControl"],["type","password","fill","solid","inputmode","password","label","Contrase\xF1a","labelPlacement","floating","helperText","Introduce tu contrase\xF1a","errorText","Contrase\xF1a requerida","required","true",3,"formControl"],["color","dark","slot","end"],["color","danger","type","submit",1,"ion-margin-top","ion-padding-top",3,"disabled"],["href","auth/register",2,"color","brown"]],template:function(i,t){i&1&&(o(0,"ion-content",0)(1,"ion-grid",1)(2,"ion-row",2)(3,"ion-col",3)(4,"ion-card")(5,"ion-grid")(6,"ion-row")(7,"ion-col",4)(8,"ion-card-header",5)(9,"ion-card-subtitle",6),d(10,"Iniciar Sesi\xF3n"),n(),u(11,"img",7),n()(),o(12,"ion-col",4)(13,"ion-card-content")(14,"form",8),C("ngSubmit",function(){return t.login()}),u(15,"ion-input",9),o(16,"ion-input",10),u(17,"ion-input-password-toggle",11),n(),o(18,"div",5)(19,"ion-button",12),d(20,"Entrar"),n()()()()()()()(),o(21,"ion-label",6),d(22,"\xBFNo tienes cuenta? "),o(23,"a",13),d(24,"Registrate"),n()()()()()()),i&2&&(l(14),s("formGroup",t.loginForm),l(),s("formControl",t.usernameControl),l(),s("formControl",t.passwordControl),l(3),s("disabled",t.loginForm.invalid))},dependencies:[N,R,_,U,D,L,z,q,G,E,j,O,v,P,y,w,b,T,F,x],styles:["ion-col[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:center;align-items:center}.mainGrid[_ngcontent-%COMP%]{position:absolute;left:0;right:0;top:50%;transform:translateY(-50%)}ion-card[_ngcontent-%COMP%]{width:80%;border-radius:24px;margin-bottom:-2px}img[_ngcontent-%COMP%]{width:clamp(40%,100%,500px)}ion-card-header[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center}"]});let g=r;return g})();export{de as LoginPage};