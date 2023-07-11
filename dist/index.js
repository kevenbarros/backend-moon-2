"use strict";var be=Object.create;var G=Object.defineProperty;var _e=Object.getOwnPropertyDescriptor;var Ge=Object.getOwnPropertyNames;var Ie=Object.getPrototypeOf,ve=Object.prototype.hasOwnProperty;var De=(t,e)=>{for(var n in e)G(t,n,{get:e[n],enumerable:!0})},O=(t,e,n,r)=>{if(e&&typeof e=="object"||typeof e=="function")for(let o of Ge(e))!ve.call(t,o)&&o!==n&&G(t,o,{get:()=>e[o],enumerable:!(r=_e(e,o))||r.enumerable});return t};var R=(t,e,n)=>(n=t!=null?be(Ie(t)):{},O(e||!t||!t.__esModule?G(n,"default",{value:t,enumerable:!0}):n,t)),Se=t=>O(G({},"__esModule",{value:!0}),t);var Ue={};De(Ue,{app:()=>w});module.exports=Se(Ue);var F=R(require("express")),we=R(require("mongoose")),xe=R(require("cors")),E=R(require("body-parser"));var Re=require("express");var I=require("mongoose"),qe=new I.Schema({email:String,picture:String,name:String,id_google:String,creationDate:Date,updateDate:Date,locale:String,given_name:String,family_name:String,wage:Number}),f=(0,I.model)("Users",qe);var U=R(require("jsonwebtoken"));function k(t){return U.default.sign(t,"admin",{expiresIn:"1d"})}var L=async(t,e)=>{try{let{id_google:n}=t.body;if(!await f.findOne({id_google:n}))return e.status(201).json({checkUser:!1});e.status(201).json({checkUser:!0})}catch{}},B=async(t,e,n)=>{try{let r=await f.find();return e.status(200).json(r)}catch(r){return e.status(500).json({error:r})}},A=async(t,e,n)=>{let{email:r,picture:o,name:s,id_google:i,locale:c,given_name:a,family_name:l}=t.body;try{if(await f.findOne({id_google:i}))throw"user already exists";return await f.create({email:r,picture:o,name:s,id_google:i,locale:c,given_name:a,family_name:l,creationDate:new Date,updateDate:new Date,wage:0}),e.status(201).json({message:"Person added!"})}catch(d){return e.status(500).json({error:d})}},P=async(t,e)=>{let{id_google:n}=t.body;try{let r=await f.findOne({id_google:n});if(!r)throw"email of user is not correct";let o=k({sub:r._id,id_google:r.id_google});return e.status(201).send({person:r,token:o})}catch(r){return e.status(500).json({error:r})}},T=async(t,e)=>{let{user_id:n,wage:r}=t.body;try{if(console.log(r,"wage"),console.log(n,"user_id "),!r)return e.status(500).json({error:"wage required"});if(!n)return e.status(500).json({error:"user required"});let o=await f.findOneAndUpdate({_id:n},{wage:r}),s=await f.findOne({_id:n});return e.status(201).send({people:s})}catch{return e.status(500).json({error:"err"})}};var $=R(require("jsonwebtoken"));var Me=async(t,e)=>{let n=String(t?.headers?.token||"");if(n)$.default.verify(n,"admin",async(r,o)=>{if(r)return e.status(403).json({message:r.message,error:r});if(!await f.findOne({_id:o?.sub}))return e.status(403).json({messagem:"forBidden"});t.headers.user=o?.sub});else return e.status(401).json({messagem:"Unauthorized"})},u=Me;function W(t){t.get("/user/getall",B),t.post("/user/check",L),t.post("/user/register",A),t.post("/user/login",P),t.post("/user/save/wage",T),t.post("/token",u)}var v=require("mongoose"),Ce=new v.Schema({description:String,value:Number,date:Date,paymentConditions:String,paidGain:{type:Boolean,required:!1},category:String,observation:String,qtdInstallments:Number,valueRecurrence:Number,id_user:String}),m=(0,v.model)("Gain",Ce);var H=async(t,e)=>{let{id:n,data:r}=t.body;try{u(t,e);let o=await m.findByIdAndUpdate(n,r),s=await m.findById(n);return e.status(201).json(s)}catch(o){return e.status(500).json({error:o})}},z=async(t,e)=>{let{id:n}=t.body;try{u(t,e);let r=await m.findById(n);if(!r?._id)return e.status(500).json({error:"Ganho n\xE3o encontrado"});let o=await m.deleteOne({_id:n}),s=await m.find({id_user:r?.id_user});return e.status(201).json(s)}catch(r){return e.status(500).json({error:r})}},Y=async(t,e)=>{let{id_user:n}=t.body;try{u(t,e);let r=await m.find({id_user:n});return e.status(201).json(r)}catch(r){return e.status(500).json({error:r})}},J=async(t,e)=>{try{u(t,e);let{id:n}=t.body,r=await m.findOne({_id:n});return e.status(201).json(r)}catch(n){return e.status(500).json({error:n})}},K=async(t,e,n)=>{u(t,e);let{description:r,value:o,date:s,paymentConditions:i,paidGain:c,category:a,observation:l,id_user:d,valueRecurrence:y,qtdInstallments:g}=t.body;if(!r||!o||!s||!i||!d)return e.status(500).json({error:"H\xE1 obrigatorios campos n\xE3o preenchidos"});a||(a="no information"),l||(l=""),l||(l=""),c||(c=!1),y||(y=0),g||(g=0);try{return await m.create({description:r,value:o,date:s,paymentConditions:i,paidGain:c,id_user:d,valueRecurrence:y,qtdInstallments:g}),e.status(201).json({message:"Ganho criado com sucesso!"})}catch(j){return e.status(500).json({error:j})}};function Q(t){t.get("/gain/all",Y),t.post("/gain/get",J),t.put("/gain/update",H),t.delete("/gain/delete",z),t.post("/gain/create",K)}var D=require("mongoose"),Fe=new D.Schema({description:String,value:Number,date:Date,paymentConditions:String,expensePayment:Boolean,category:String,local:String,qtdInstallments:Number,buyer:String,observation:String,id_goal:String,id_user:String,valueRecurrence:Number}),p=(0,D.model)("Expense",Fe);var V=async(t,e)=>{let{id:n,data:r}=t.body;try{u(t,e);let o=await p.findByIdAndUpdate(n,r),s=await p.findById(n);return e.status(201).json(s)}catch(o){return e.status(500).json({error:o})}},X=async(t,e)=>{let{id:n}=t.body;try{u(t,e);let r=await p.findById(n);if(!r?._id)return e.status(500).json({error:"Gasto n\xE3o encontrado"});let o=await p.deleteOne({_id:n}),s=await p.find({id_user:r?.id_user});return e.status(201).json(s)}catch(r){return e.status(500).json({error:r})}},Z=async(t,e)=>{let{id_user:n}=t.body;try{u(t,e);let r=await p.find({id_user:n});return e.status(201).json(r)}catch(r){return e.status(500).json({error:r})}},ee=async(t,e)=>{try{u(t,e);let{id:n}=t.body,r=await p.findOne({_id:n});return e.status(201).json(r)}catch(n){return e.status(500).json({error:n})}},te=async(t,e,n)=>{u(t,e);let{description:r,value:o,date:s,paymentConditions:i,expensePayment:c,category:a,local:l,qtdInstallments:d,buyer:y,observation:g,id_goal:j,id_user:N,valueRecurrence:C}=t.body;if(!r||!o||!s||!i||!N||c===void 0)return e.status(500).json({error:"H\xE1 obrigatorios campos n\xE3o preenchidos"});C||(C=0),a||(a="no information"),g||(g=""),l||(g=""),j||(j=""),y||(y=""),d||(d=0);try{return await p.create({description:r,value:o,date:s,paymentConditions:i,expensePayment:c,category:a,local:l,qtdInstallments:d,buyer:y,observation:g,id_goal:j,id_user:N,valueRecurrence:C}),e.status(201).json({message:"Gasto cadastrado com sucesso!"})}catch(je){return e.status(500).json({error:je})}};function re(t){t.post("/expense/all",Z),t.get("/expense/get",ee),t.put("/expense/update",V),t.delete("/expense/delete",X),t.post("/expense/create",te)}var ne=async(t,e)=>{let{id_user:n,date:r}=t.body;try{u(t,e),console.log(n,"id_userid_user");let o=[];r||(r=new Date);let s=new Date(r);if(!n)return e.status(500).json({error:"user required"});let i=await m.find({id_user:n}),c=await p.find({id_user:n});return i.forEach((a,l)=>{if(a.paymentConditions==="Despesa recorrente"){o.push(a);return}if(new Date(a.date).getMonth()==s.getMonth()){o.push(a);return}if(a.paymentConditions==="Parcelado"&&a.qtdInstallments){let d=new Date(a.date);if(d.setMonth(d.getMonth()+a.qtdInstallments),new Date(a.date).getMonth()<=s.getMonth()&&d.getMonth()>=s.getMonth()){o.push(a);return}}}),c.forEach(a=>{if(a.paymentConditions==="Despesa recorrente"){o.push(a);return}if(new Date(a.date).getMonth()==s.getMonth()){o.push(a);return}if(a.paymentConditions==="Parcelado"&&a.qtdInstallments){let l=new Date(a.date);if(l.setMonth(l.getMonth()+a.qtdInstallments),new Date(a.date).getMonth()<=s.getMonth()&&l.getMonth()>=s.getMonth()){o.push(a);return}}}),e.status(201).json(o.sort((a,l)=>new Date(a.date).getMilliseconds()-new Date(l.date).getMilliseconds()))}catch(o){return e.status(500).json({error:o})}};function oe(t){t.post("/generalList/all",ne)}var S=require("mongoose"),Ee=new S.Schema({title:String,value:String,id_user:String,color:String,icon:String}),q=(0,S.model)("Categories",Ee);var se=async(t,e)=>{let{title:n,color:r,icon:o,id_user:s}=t.body;try{if(!s)return e.status(500).json({error:"id user required"});if(!n)return e.status(500).json({error:"title required"});r=r||"",o=o||"",await q.create({id_user:s,title:n,color:r,icon:o});let i=await q.find({id_user:s});return e.status(201).json(i)}catch{return e.status(500).json({error:"err"})}},ae=async(t,e)=>{let{id_user:n}=t.body;try{let r=await q.find({id_user:n});return e.status(201).json(r)}catch(r){return e.status(500).json({error:r})}};function ie(t){t.post("/category/all",ae),t.post("/category/create",se)}var M=require("mongoose"),Ne=new M.Schema({name:String,valueFinal:Number,dateInitial:Date,dateFinal:Date,valueRaised:Number,valueInitial:Number,complete:Boolean,id_user:String}),b=(0,M.model)("goal",Ne);var ue=R(require("mongoose")),ce=async(t,e)=>{let{name:n,valueFinal:r,dateFinal:o,valueRaised:s,valueInitial:i,id_user:c}=t.body;try{if(Object.values([n,r,o,s,i,c]).some(g=>!g))return e.status(500).json({error:"there are empty fields"});let l=new Date,d=!1;await b.create({name:n,valueFinal:r,dateFinal:o,valueRaised:s,valueInitial:i,id_user:c,dateInitial:l,complete:d});let y=await b.find({id_user:c});return e.status(201).json(y)}catch{return e.status(500).json({error:"err"})}},le=async(t,e)=>{let n=t.params.id;try{u(t,e);let r=ue.default.Types.ObjectId(n),o=await b.aggregate([{$match:{_id:r}},{$lookup:{from:"goalrecurrences",localField:"_id",foreignField:"id_goal",as:"recurrence"}}]).exec(function(s,i){if(s)return console.error(s),e.status(500).json({error:"Ocorreu um erro ao consultar o banco de dados."});if(i.length===0)return e.status(404).json({error:"Goal n\xE3o encontrado."});let c=i[0];e.json(c)})}catch(r){return e.status(500).json({error:r})}},de=async(t,e)=>{let{id_user:n}=t.body;try{let r=await b.aggregate([{$match:{id_user:n}},{$lookup:{from:"goalrecurrences",localField:"_id",foreignField:"id_goal",as:"recurrence"}}]).exec();return e.status(201).json(r)}catch(r){return e.status(500).json({error:r})}};function me(t){t.post("/goal/all",de),t.post("/goal/create",ce),t.get("/goal/:id",le)}var x=R(require("mongoose")),Oe=new x.Schema({value:Number,date:Date,id_user:String,id_goal:{type:x.default.Schema.Types.ObjectId,required:!0,ref:"goal"}}),_=(0,x.model)("goalrecurrence",Oe);var pe=async(t,e)=>{let{value:n,date:r,id_goal:o,id_user:s}=t.body;try{if(Object.values([n,r,o,s]).some(a=>!a))return e.status(500).json({error:"there are empty fields"});await _.create({value:n,date:r,id_goal:o,id_user:s});let c=await _.find({id_goal:o});return e.status(201).json(c)}catch{return e.status(500).json({error:"err"})}},ge=async(t,e)=>{let n=t.params.id;try{u(t,e);let r=await _.findOne({id:n});return e.status(201).json(r)}catch(r){return e.status(500).json({error:r})}},fe=async(t,e)=>{let{id_goal:n}=t.body;try{let r=await _.find({id_goal:n});return e.status(201).json(r)}catch(r){return e.status(500).json({error:r})}};function ye(t){t.post("/goal/recurrence/all",fe),t.get("/goal/recurrence/:id",ge),t.post("/goal/recurrence/create",pe)}var h=(0,Re.Router)();function he(){return W(h),Q(h),re(h),oe(h),ie(h),me(h),ye(h),h}var w=(0,F.default)();w.use((0,xe.default)());w.use(F.default.json());w.use(E.default.urlencoded({extended:!0}));w.use(E.default.json());w.use(he());we.default.connect("mongodb+srv://admin:12345@moon.p6ongcq.mongodb.net/?retryWrites=true&w=majority").then(()=>{console.log("mongoDB conection is working"),w.listen(9002)}).catch(t=>console.log(t,"deu erro :( (miado)"));0&&(module.exports={app});
