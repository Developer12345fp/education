//database compatbility
window.indexedDB=window.indexedDB||window.webkitIndexedDB||window.mozIndexedDB||window.msIndexedDB;
window.IDBTransaction=window.IDBTransaction||window.webkitIDBTransaction||window.msIDBTransaction;
window.IDBKeyRange=window.IDBKeyRange||window.webkitIDBKeyRange||window.msIDBKeyRange;
if(!window.indexedDB)
{
	document.write("please update your browser");
}
else
{
	$(document).ready(function()
	{
		$("#form").submit(function()
		{
			var check_database=window.indexedDB.databases();
			check_database.then(function(database_list){
				var len=database_list.length;
				if(len==0)
				{
					register();
				}
				else
				{
					$(".icon-box").html("");
					$(".icon-box").removeClass("d-none");
				    $(".icon-box").addClass("alert-success animated slideInDown faster");
				    $(".icon-box").append("registration failed<i class='fa fa-trash close delete' style='color:red;' data-toggle='modal' data-target='#new_modal'></i>");
					$(".delete").tooltip({
						title:"if you want to register new school data then you first delete previous recard for this click delete button",
					});
					$(".delete_database").click(function(){
						var data_delete=window.indexedDB.databases();
						data_delete.then(function(pend){
						var deleted=window.indexedDB.deleteDatabase(pend[0].name);
							deleted.onsuccess=function(){
								$("#modal_text").html("<h1 style='color:red;padding-left:20px;'>successfully deleted</h1>");
								setTimeout(function(){$("#new_modal").fadeOut();},2000);
							
							}
						});
					});
					
					$(".icon").css({"display":"none","color":"red"});
					 $(".icon-box").css({"background":"white","border":"1px solid red","color":"red"});
					$("#form").trigger('reset');
				}
			});
			
			return false;
        });	
     //start register coding
	 function register()
	 {
		 var school_name=$("#school_name").val();
				var school_tag=$("#school_tag").val();
				var email=$("#email").val();
				var website=$("#website").val();
				var mobile=$("#mobile").val();
				var phone=$("#phone").val();
				var address=$("#address").val();
				var password=$("#password").val();
			var command=window.indexedDB.open(school_name);
			command.onsuccess=function()
			{
				$(".icon-box").html("");
				$(".icon-box").removeClass("d-none");
				$(".icon-box").addClass("alert-success");
				$(".icon-box").append("successfully register");
				setTimeout(function(){
									$(".icon-box").addClass("d-none");
									$("#form").trigger('reset');	
									},2000);
			}
			command.onerror=function()
			{
				$(".icon-box").removeClass("d-none");
				$(".icon-box").addClass("alert-success");
				$(".icon-box").append("whoops ! you are not registered try again");
			}
			command.onupgradeneeded=function(){
				
				var data={
					       school_name:school_name,
						   school_tag:school_tag,
						   password:password,
						   email:email,
						   website:website,
						   phone:phone,
						   mobile:mobile,
						   address:address,
						   school_logo:"",
						   principal_sign:"",
						   director_sign:""
				         };
						 var idb=this.result;
						 var object=idb.createObjectStore("student",{keyPath:"school_name"});
						 var cls=idb.createObjectStore("class",{keyPath:"class_name"});
						  var adm=idb.createObjectStore("admission",{keyPath:"adm_no"});
						 object.add(data);
			}
	 }
     //end register coding	 
	});
}
//find database
$(document).ready(function(){
	$("#login_form").submit(function()
	{
    		
			var email=$("#login_email").val();
			var password=$("#login_password").val();
			var data={email:email,password:password};
			var store=JSON.stringify(data);
			sessionStorage.setItem("login",store);
			if(sessionStorage.getItem("login")!=null)
			{
				 var index=window.indexedDB.databases();
			    index.then(function(pending_object)
				{
				 var i;
				 for(i=0;i<pending_object.length;i++)
				 {
					 var data_object=pending_object[i].name;
					 sessionStorage.setItem("database",data_object);
					 var database=window.indexedDB.open(data_object);
					 
					 database.onsuccess=function()
					 {
						 var idb=this.result;
						 var per=idb.transaction("student","readwrite");
						 var access=per.objectStore("student");
						 var key=access.get(data_object);
						 key.onsuccess=function()
						 {
								 var user_detail=this.result;
								 if(user_detail)
								 {
									 var user_name=user_detail.email;
									 var user_password=user_detail.password;
									var x=sessionStorage.getItem("login");
									var y=JSON.parse(x);
									var login_email=y.email;
									var login_pwd=y.password;									
									 if(user_name==login_email)
									 {
										 if(user_password==login_pwd)
										 {
										   window.location="profile/index.html";
										 }
										 else
										 {
											 alert("password incorrect");
										 }
									 }
									 else
									 {
										alert("user not found"); 
									 }
								 }
								 else
								 {
									 $("#login_alert").html("");
									$("#login_alert").removeClass("d-none");
									$("#login_alert").css({"border":"1px solid red","background":"white","color":"blue"});
									$("#login_alert").append("<b style='color:red;'>user not found plase sign up</b>");
									setTimeout(function(){
									$("#login_alert").addClass("d-none");
									$("#login_form").trigger('reset');	
									},2000);
								 }
						 }
					 }
				 }
				});
			}
			else
			{
				alert("fail");
			}
			return false
	 });	
	
	});
