$(document).ready(function(){
	if(sessionStorage.getItem("login")==null)
	{
	window.location="https://www.google.com"
	}
	//add field coding
	$(".add_field_btn").click(function(){
		var all_div='<div class="input-group mb-2"><input type="text" name="course" class="form-control course_name" placeholder="course name"><input type="number" name="fee" class="form-control course_fee" placeholder="course fee"><div class="input-group-append"><span class="input-group-text bg-warning text-light border-warning">monthly</span></div></div>';
		$(".group_box").append(all_div);		
	});
	//end add field coding
	//start set fee coding
	$(".set_field_btn").click(function(){
		var class_name=$(".class_name").val();
		var course_fee=[],course_name=[];
		var i;
		$(".course_name").each(function(i){
			course_name[i]=$(this).val();
		});
		$(".course_fee").each(function(i){
			course_fee[i]=$(this).val();
		});
		var data={
			        class_name:class_name,
					course_name:course_name,
					course_fee:course_fee
		          };
	 var database=sessionStorage.getItem("database");
	 var user=window.indexedDB.open(database);
	 user.onsuccess=function()
	 {
		 var object=this.result;
		 var per=object.transaction("class","readwrite");
		 var access=per.objectStore("class");
		 var key=access.put(data);
		 key.onsuccess=function()
		 {
			 
			 location.reload();
		 }
		 key.onerror=function()
		 {
			 alert("store failed");
		 }
		 
	 }
	});
	//end set fee coding
});

//start show fee coding
$(document).ready(function(){
	$("#fee_menu").click(function(){
		$("#body_box").html("");
	var store=sessionStorage.getItem("database");
	var datas=window.indexedDB.open(store);
	datas.onsuccess=function()
	{
		var result=this.result;
		var per=result.transaction("class","readwrite");
		var access=per.objectStore("class");
		var key=access.getAllKeys();
		key.onsuccess=function()
		{
					var i,j,k;
					var x=this.result;
					for(i=0;i<x.length;i++)
					{
						var keys=access.get(x[i]);
						keys.onsuccess=function()
						{
							var key_data=this.result;
							var box=$("#body_box");
						   var ul=document.createElement("UL");
						   ul.className="nav nav-tabs";
						   var ul_li=document.createElement("LI");
						   ul_li.className="nav-item";
						   var li_a=document.createElement("A");						   
						   li_a.className="nav-link active";
						   li_a.href="#";
						   li_a.innerHTML="class:"+key_data.class_name;
						   ul_li.append(li_a);
						   ul.append(ul_li);
						    box.append(ul);
							//table creating
						   var table=document.createElement("TABLE");
						   table.className="table text-center border-left border-right border-bottom";
						   var tr_of_th=document.createElement("TR");
						   for(j=0;j<key_data.course_name.length;j++)
						   {
							   var th=document.createElement("TH");
							   th.innerHTML=key_data.course_name[j];
							   th.className="border-0"
							   tr_of_th.append(th);
						   }
						   var th_edit=document.createElement("TH");
						   th_edit.className="border-0";
						   th_edit.innerHTML="edit";
						   tr_of_th.append(th_edit);
						    var th_delete=document.createElement("TH");
							th_delete.className="border-0";
						   th_delete.innerHTML="delete";
						   tr_of_th.append(th_delete);
						   table.append(tr_of_th);						   
						   var tr_of_td=document.createElement("TR");
                          for(j=0;j<key_data.course_fee.length;j++)
						   {
							   var td=document.createElement("TD");
							   td.className="border-0"
							   td.innerHTML=key_data.course_fee[j];
							   tr_of_td.append(td);
						   }
                            var td_edit=document.createElement("TD");
							td_edit.className="border-0";
						   td_edit.innerHTML="<i class='fa fa-edit'></i>";
						   tr_of_td.append(td_edit);
						   td_edit.onclick=function()
						   {
							   var k;
							   var parent=this.parentElement.parentElement.previousSibling;
							   var table=this.parentElement.parentElement;
							   var tr=table.getElementsByTagName("TR");
							   var an=parent.getElementsByTagName("A");							   
							   var x=an[0].innerHTML.split(":");							   
							   $(".class_name").val(x[1]);
							   var th=tr[0].getElementsByTagName("TH");
							   var course_name=document.getElementsByClassName("course_name");
							   var course_fee=document.getElementsByClassName("course_fee");
							   var s=course_name[0].parentElement.remove();
							   var td=tr[1].getElementsByTagName("TD");
							   for(k=0;k<th.length-2;k++)
							   {
								  $(".add_field_btn").click();
								  course_name[k].value=th[k].innerHTML;
								   course_fee[k].value=td[k].innerHTML;
                                   $("#child_modal").modal("hide");								 
							   }								
							   
						   }
						    var td_delete=document.createElement("TD");
							td_delete.className="border-0";
						   td_delete.innerHTML="<i class='fa fa-trash rem'></i>";
						   tr_of_td.append(td_delete);
                                 				 //start delete coding
												 td_delete.onclick=function(){
													 var par=this.parentElement.parentElement.previousSibling;
													 var a=par.getElementsByTagName("A");
													 var a_text=a[0].innerHTML.split(":");
													 var base=sessionStorage.getItem("database");
													 var db=window.indexedDB.open(base);
													 db.onsuccess=function()
													 {
														 var ob=this.result;
														 var p=ob.transaction("class","readwrite");
														 var acc=p.objectStore("class");
														 var con=confirm("do you sure want");
														 if(con==true)
														 {
															 var k=acc.delete(a_text[1]);
															 k.onsuccess=function()
															 {
																 td_delete.parentElement.parentElement.previousSibling.remove();
																 td_delete.parentElement.parentElement.remove();
															 }
														 }
													 }
												 }
											   //end delete coding						   
												 table.append(tr_of_td);						   
											   box.append(table);
											   //end table creating

						}
			        }
		}
	}
});
});
//end show fee coding
//upload pic coding
$(document).ready(function(){
	$(".upload_pic").click(function(){
		var file=document.createElement("INPUT");
		file.type="file";
		file.accept="image/*";
		file.click();
		file.onchange=function()
		{
			var adrs=this.files[0];
			var url=URL.createObjectURL(adrs);
			$(".upload_pic").attr("src",url);
			var reader=new FileReader();
			reader.readAsDataURL(adrs);
			reader.onload=function()
			{
				var pic=this.result;
				sessionStorage.setItem("user_pic",pic);
			}
		}
	});
	var database=sessionStorage.getItem("database");
	var open=window.indexedDB.open(database);
	open.onsuccess=function()
	{
		var object=this.result;
		var per=object.transaction("class","readwrite");
		var access=per.objectStore("class");
		var key=access.getAllKeys();
		key.onsuccess=function()
		{
			var data=this.result;
			var i;
			for(i=0;i<data.length;i++)
			{
				var opt=document.createElement("OPTION");
				opt.innerHTML=data[i];
				$(".cls").append(opt);
			}
		}
	}
	
});
//end pic coding
//start admission data store coding
$(document).ready(function(){
	var adm_no,i,max=0;
	
	  $(".adm-form").submit(function()
	  {
		var database=sessionStorage.getItem("database");
		var open=window.indexedDB.open(database);
		open.onsuccess=function()
		{
			var n_data=this.result;
			var n_per=n_data.transaction("admission","readwrite");
			var n_access=n_per.objectStore("admission");
			n_key=n_access.getAllKeys();
			n_key.onsuccess=function()
			{
				var array_obj=this.result;
				if(array_obj.length==0)
				{
					adm_no=1;
				}
				else
				{
					for(i=0;i<array_obj.length;i++)
					{
						var number=Number(array_obj[i]);
						if(number>max)
						{
							max=number;
						}
					}
					adm_no=max+1;
				}
				//assamble data in object
								var first_name=$(".f-name").val();
								var last_name=$(".l-name").val();
								var mother_name=$(".mother-name").val();
								var father_name=$(".father-name").val();
								var first_name=$(".f-name").val();
								var first_mobile_no=$(".f-m-no").val();
								var second_mobile_no=$(".s-m-no").val();
								var dob=new Date($(".date").val());
								var dob_date=dob.getDate();
								var dob_month=dob.getMonth()+1;
								var dob_year=dob.getFullYear();
								var DOB=dob_date+"/"+dob_month+"/"+dob_year;
								var doa=new Date();
								var doa_date=doa.getDate();
								var doa_month=doa.getMonth()+1;
								var doa_year=doa.getFullYear();
								var DOA=doa_date+"/"+doa_month+"/"+doa_year;
								var ct=doa.toLocaleTimeString();
								var gender=$(".gender").val();
								var cls=$(".cls").val();
								var admit=$(".hostel").val();
								var address=$(".address").val();								
								if(sessionStorage.getItem("user_pic")!=null)
							  {
								 
								var admission={
									adm_no : adm_no,
										   first_name:first_name,
										   last_name:last_name,
										   mother_name:mother_name,
										   father_name:father_name,
										   first_mobile_no:first_mobile_no,
										   second_mobile_no:second_mobile_no,
										   dob:DOB,
										   doa:DOA,
										   current_date:ct,
										   gender:gender,
										   choose_class:cls,
										   admit:admit,						   
										   address:address,
										   invoice:[],
										   pic:sessionStorage.getItem("user_pic")
										 };
								sessionStorage.removeItem("user_pic");
								var database=sessionStorage.getItem("database");
								var open=window.indexedDB.open(database);
								open.onsuccess=function()
								{
									var obj=this.result;
									
									var per=obj.transaction("admission","readwrite");
									var access=per.objectStore("admission");
									var ke=access.add(admission);
									ke.onsuccess=function()
									{
										
										$(".adm-form").trigger("reset");
										$(".pic_box").html("");
										var x='<img src="images/upload_pic.png" class="w-100 upload_pic" title="upload pic" style="cursor:pointer;">';
										$(".pic_box").html(x);
										var alert_box="<div class='alert alert-success' style='width:100%;'><b>successfully registered</b>&nbsp&nbsp<a href='receipt.html'>get receipt</a><i class='fa fa-close close' data-dismiss='alert'></i></div>";
										$(".alert_box").html(alert_box);
										check();
									}
									ke.onerror=function()
									{
										var alert_box="<div class='alert alert-success' style='width:100%;'><b>registered failed</b><i class='fa fa-close close' data-dismiss='alert'></i></div>";
										$(".alert_box").html(alert_box);
									}
								}
								
						   }  
					  else
					  {
						alert("please upload pic");  
						
					  } 
						  
						
				//end assamble data in object
			}
		}
	    
			return false;	
	  });
	
});
//end admission data store coding
//start student no coding
function check(){
	var database=sessionStorage.getItem("database");
	var open=window.indexedDB.open(database);
	open.onsuccess=function()
	{
		var result=this.result;
		var per=result.transaction("admission","readwrite");
		var access=per.objectStore("admission");
		var key=access.getAllKeys();
		key.onsuccess=function()
		{
			var obj=this.result;
			var i,x,y=0;
			for(i=0;i<obj.length;i++)
			{
				x=Number(obj[i]);
				if(x>y)
				{
					y=x;
				}
			}
			$(".account").html("Account-No:"+(y+1));
			sessionStorage.setItem("account",y);
		}
	}
}
check();
//end student no coding
//find student
$(document).ready(function(){
	var date;
	$(".find_btn").click(function(){
		
		date=new Date($("#find_date").val());
          var d=date.getDate();
          var m=date.getMonth()+1;
          var y=date.getFullYear();
         var find_d=d+"/"+m+"/"+y;
          sessionStorage.setItem("find",find_d);	
		var database=sessionStorage.getItem("database");
		var open=window.indexedDB.open(database);
		open.onsuccess=function()
		{
			var result=this.result;
			var per=result.transaction("admission","readwrite");
			var access=per.objectStore("admission");
			var key=access.getAllKeys();
			key.onsuccess=function()
			{
				var re=this.result;
				var i;
				for(i=0;i<re.length;i++)
				{
					var all_key=access.get(re[i]);
					all_key.onsuccess=function()
					{ 
					    var x=this.result;
					    var pre_d=(x.dob);						
						if(find_d==pre_d)
						{
                           						
						    window.location="find-date.html";
                                							
							
						}
						else
						{
							return false;
						}
                        						 
					}					
				}
			}
		}
		return false;
	});
});
//end find student
//start sidebar coding
$(document).ready(function(){
	var database=sessionStorage.getItem("database");
	$(".clg_name").html(database);
	$(".clg_name").css({"textTransform":"Uppercase"});
	var open=window.indexedDB.open(database);
	open.onsuccess=function()
	{
		var obj=this.result;
		var per=obj.transaction("student","readwrite");
		var access=per.objectStore("student");
		var key=access.get(database);
		key.onsuccess=function()
		{
			var x=this.result;
			$(".clg_tag").html(x.school_tag);
		}
	}
});
//end sidebar coding
// start director coding
$(document).ready(function(){
	var dir;
	$(".director").on("change",function(){
		var file=this.files[0];
		var reader=new FileReader();
		reader.readAsDataURL(file);
		reader.onload=function()
		{
			dir=this.result;	
		}
		var database=sessionStorage.getItem("database");
		var open=window.indexedDB.open(database);
		open.onsuccess=function()
		{
			var obj=this.result;
			var per=obj.transaction("student","readwrite");
			var access=per.objectStore("student");
			var key=access.get(database);
			key.onsuccess=function()
			{
				var st=this.result;
				st.director_sign=dir;
				var update=access.put(st);
				update.onsuccess=function()
				{
				 window.location=location.href;	
				}
                update.onerror=function()
				{
					alert("update failed");
				}					
				
			}
		}
	});
});
//end director coding
//access director sign coding
$(document).ready(function(){
	   var database=sessionStorage.getItem("database");
		var open=window.indexedDB.open(database);
		open.onsuccess=function()
		{
			var obj=this.result;
			var per=obj.transaction("student","readwrite");
			var access=per.objectStore("student");
			var key=access.get(database);
			key.onsuccess=function()
			{
				var st=this.result;
				
			    if(st.director_sign!="")
				{	
                    $(".director_box").removeClass("d-none");			
                     var img=st.director_sign;                      	
					var image= new Image();
					image.src=img;
					image.width="200";
					image.height="40";
					$(".director_sign").html(image);				
				}
				else
				{
					$(".input_box").removeClass("d-none");
				}
			}
		}
		
});
//end director_sign coding
//director sign trash coding
$(document).ready(function()
{
		$(".dir").click(function(){
			 var database=sessionStorage.getItem("database");
		     var open=window.indexedDB.open(database);
		 	open.onsuccess=function()
		  {
			var obj=this.result;
			var per=obj.transaction("student","readwrite");
			var access=per.objectStore("student");
			var key=access.get(database);
			key.onsuccess=function()
			{
				var st=this.result;
				st.director_sign="";
				var update=access.put(st);
				update.onsuccess=function()
				{
				 window.location=location.href;	
				}
                update.onerror=function()
				{
					alert("update failed");
				}					
				
			}
		 }
		});
});
//end director sign trash coding
//start principal sign update and delete coding

$(document).ready(function(){
	var dir;
	$(".principal").on("change",function(){
		var file=this.files[0];
		var reader=new FileReader();
		reader.readAsDataURL(file);
		reader.onload=function()
		{
			dir=this.result;	
		}
		var database=sessionStorage.getItem("database");
		var open=window.indexedDB.open(database);
		open.onsuccess=function()
		{
			var obj=this.result;
			var per=obj.transaction("student","readwrite");
			var access=per.objectStore("student");
			var key=access.get(database);
			key.onsuccess=function()
			{
				var st=this.result;
				st.principal_sign=dir;
				var update=access.put(st);
				update.onsuccess=function()
				{
				 window.location=location.href;	
				}
                update.onerror=function()
				{
					alert("update failed");
				}					
				
			}
		}
	});
});
$(document).ready(function(){
	   var database=sessionStorage.getItem("database");
		var open=window.indexedDB.open(database);
		open.onsuccess=function()
		{
			var obj=this.result;
			var per=obj.transaction("student","readwrite");
			var access=per.objectStore("student");
			var key=access.get(database);
			key.onsuccess=function()
			{
				var st=this.result;
				
			    if(st.principal_sign!="")
				{	
                    $(".principal_box").removeClass("d-none");			
                     var img=st.principal_sign;                      	
					var image= new Image();
					image.src=img;
					image.width="200";
					image.height="40";
					$(".principal_sign").html(image);				
				}
				else
				{
					$(".input-box").removeClass("d-none");
				}
			}
		}
		
});

$(document).ready(function()
{
		$(".pri").click(function(){
			 var database=sessionStorage.getItem("database");
		     var open=window.indexedDB.open(database);
		 	open.onsuccess=function()
		  {
			var obj=this.result;
			var per=obj.transaction("student","readwrite");
			var access=per.objectStore("student");
			var key=access.get(database);
			key.onsuccess=function()
			{
				var st=this.result;
				st.principal_sign="";
				var update=access.put(st);
				update.onsuccess=function()
				{
				 window.location=location.href;	
				}
                update.onerror=function()
				{
					alert("update failed");
				}					
				
			}
		 }
		});
});

//end principal sign update and delete coding
//start college logo coding
$(document).ready(function(){
	var result;
	$(".input_logo").on("change",function(){
		var file=this.files[0];
		var reader=new FileReader();
		reader.readAsDataURL(file);
		reader.onload=function()
		{
		result=this.result;			
		}
		var database=sessionStorage.getItem("database");
		var open=window.indexedDB.open(database);
		open.onsuccess=function()
		{
			var obj=this.result;
			var per=obj.transaction("student","readwrite");
			var access=per.objectStore("student");
			var key=access.get(database);
			key.onsuccess=function()
			{
				var st=this.result;
				st.school_logo=result;
				var update=access.put(st);
				update.onsuccess=function()
				{
				 window.location=location.href;	
				}
                update.onerror=function()
				{
					alert("update failed");
				}					
				
			}
		}
	});
});
$(document).ready(function(){
	   var database=sessionStorage.getItem("database");
		var open=window.indexedDB.open(database);
		open.onsuccess=function()
		{
			var obj=this.result;
			var per=obj.transaction("student","readwrite");
			var access=per.objectStore("student");
			var key=access.get(database);
			key.onsuccess=function()
			{
				var st=this.result;
				
			    if(st.school_logo!="")
				{	  
                     			
                     var img=st.school_logo;                      	
					var image= new Image();
					image.src=img;
					image.width="190";
					image.height="190";
					$(".child").html(image);
                    $(".input_logo").addClass("d-none");					
				}
				
			}
		}
		
});
//end college logo coding
//update invoice coding
$(document).ready(function(){
	$(".find_form").submit(function(){
		var adm_no=Number($(".invoice_no").val());
		var date=new Date($("#invoice_date").val());
		var date_d=date.getDate();
		var date_m=date.getMonth()+1;
		var date_y=date.getFullYear();
		var invoice_date=date_d+"/"+date_m+"/"+date_y;
		sessionStorage.setItem("invoice_date",invoice_date);
		var database=sessionStorage.getItem("database");
		var open=window.indexedDB.open(database);
		open.onsuccess=function()
		{
			var data_obj=this.result;
			var per=data_obj.transaction("admission","readwrite");
			var access=per.objectStore("admission");
			var key=access.get(adm_no);
			
			key.onsuccess=function()
			{
				var data_result=this.result;
				if(data_result)
				{
				    var cls=data_result.choose_class;	
                    var class_per=data_obj.transaction("class","readwrite");
                    var class_access=class_per.objectStore("class");
                     var class_key=class_access.get(cls);
                     class_key.onsuccess=function()
				     {
					      class_obj=this.result					 
					    if(class_obj)
						{
								   var update={course_fee:class_obj.course_fee,course_name:class_obj.course_name};
							 var pe=data_obj.transaction("admission","readwrite");
							var acces=pe.objectStore("admission");
							var ke=acces.get(adm_no);
							ke.onsuccess=function()
							{
								var a=this.result;
								a.invoice.push(update);
								acces.put(a);
								
								sessionStorage.setItem("adm_no",adm_no);
								window.location="invoice.html";
							}
							ke.onerror=function()
							{
								alert("update failed");
							}
						}
						else
						{
							alert("student class not found");
						}
				     }	
			    }
                else
				{
					alert("student not found");
				}					
			}
		}
		return false;
	});
});
//end update invoice coding