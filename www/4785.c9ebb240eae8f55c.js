"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[4785],{4785:(C,i,a)=>{a.r(i),a.d(i,{SelectlanguagePageModule:()=>S});var o=a(6814),m=a(6223),r=a(7331),g=a(5356),d=a(5861),t=a(2029),f=a(2014),v=a(8720),c=a(3999),h=a(8882);function p(e,P){if(1&e){const u=t.EpF();t.TgZ(0,"div",9)(1,"button",10),t.NdJ("click",function(){t.CHM(u);const l=t.oxw();return t.KtG(l.back())}),t._UZ(2,"img",11),t.qZA(),t._UZ(3,"img",12),t.qZA()}}function Z(e,P){1&e&&(t.TgZ(0,"div",9),t._UZ(1,"img",12),t.qZA())}const _=[{path:"",component:(()=>{class e{constructor(u,n,l,s,T){this.storage=u,this.router=n,this.navCtrl=l,this.translateService=s,this.authService=T}ngOnInit(){}back(){this.navCtrl.back()}selectLanguage(u){var n=this;return(0,d.Z)(function*(){n.authService.language=u,yield n.storage.set("language",u),n.translateService.use(u),yield n.router.navigate(["welcome"],{replaceUrl:!0})})()}static#t=this.\u0275fac=function(n){return new(n||e)(t.Y36(f.K),t.Y36(g.F0),t.Y36(v.SH),t.Y36(c.sK),t.Y36(h.$))};static#e=this.\u0275cmp=t.Xpm({type:e,selectors:[["app-selectlanguage"]],decls:17,vars:5,consts:[[1,"ion-padding"],[1,"sel-lang"],["class","logo-wrap",4,"ngIf"],[1,"sel-lang__main"],[1,"sel-lang__label"],[1,"sel-lang__btn","btn",3,"click"],["src","/assets/flags/us.svg","alt","\u041a\u0430\u0440\u0442\u0438\u043d\u043a\u0430"],["src","/assets/flags/tr.svg","alt","\u041a\u0430\u0440\u0442\u0438\u043d\u043a\u0430"],["src","/assets/flags/ru.svg","alt","\u041a\u0430\u0440\u0442\u0438\u043d\u043a\u0430"],[1,"logo-wrap"],[1,"top-back",3,"click"],["src","assets/img/arrow-left.svg","alt",""],["src","assets/logos/tirgo-logo.png","alt","",1,"sel-lang__logo"]],template:function(n,l){1&n&&(t.TgZ(0,"ion-content",0)(1,"main",1),t.YNc(2,p,4,0,"div",2),t.YNc(3,Z,2,0,"div",2),t.TgZ(4,"div",3)(5,"p",4),t._uU(6),t.ALo(7,"translate"),t.qZA(),t.TgZ(8,"button",5),t.NdJ("click",function(){return l.selectLanguage("en")}),t._UZ(9,"img",6),t._uU(10," English "),t.qZA(),t.TgZ(11,"button",5),t.NdJ("click",function(){return l.selectLanguage("tr")}),t._UZ(12,"img",7),t._uU(13," T\xfcrk\xe7e "),t.qZA(),t.TgZ(14,"button",5),t.NdJ("click",function(){return l.selectLanguage("ru")}),t._UZ(15,"img",8),t._uU(16," \u0420\u0443\u0441\u0441\u043a\u0438\u0439 \u044f\u0437\u044b\u043a "),t.qZA()()()()),2&n&&(t.xp6(2),t.Q6J("ngIf",l.authService.isAuthenticated()),t.xp6(1),t.Q6J("ngIf",!l.authService.isAuthenticated()),t.xp6(3),t.Oqu(t.lcZ(7,3,"\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u044f\u0437\u044b\u043a \u0438\u043d\u0442\u0435\u0440\u0444\u0435\u0439\u0441\u0430")))},dependencies:[o.O5,r.W2,c.X$],styles:[".sel-lang__logo[_ngcontent-%COMP%]{margin-top:6.25rem;width:15.625rem}.sel-lang__main[_ngcontent-%COMP%]{margin-top:12.5rem;display:grid;gap:.9375rem}.sel-lang__label[_ngcontent-%COMP%]{color:#fff;font-size:.875rem;margin-bottom:.9375rem}.sel-lang__btn[_ngcontent-%COMP%]{justify-content:flex-start;background:#252333}.sel-lang__btn[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{border-radius:.3125rem;margin-right:.9375rem;width:35px!important}"]})}return e})()}];let A=(()=>{class e{static#t=this.\u0275fac=function(n){return new(n||e)};static#e=this.\u0275mod=t.oAB({type:e});static#n=this.\u0275inj=t.cJS({imports:[g.Bz.forChild(_),g.Bz]})}return e})(),S=(()=>{class e{static#t=this.\u0275fac=function(n){return new(n||e)};static#e=this.\u0275mod=t.oAB({type:e});static#n=this.\u0275inj=t.cJS({imports:[o.ez,m.u5,r.Pc,A,c.aw]})}return e})()}}]);