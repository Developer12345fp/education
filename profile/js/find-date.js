$(document).ready(function(){	
        var session=Number(sessionStorage.getItem("account"));
	    var database=sessionStorage.getItem("database");
        $(".college").html(database);
	     $(".college").css({"textTransform":"Uppercase","textAlign":"center","fontSize":"35px"});		
		var database=sessionStorage.getItem("database");
		var open=window.indexedDB.open(database);
		open.onsuccess=function()
		{
			var result=this.result;
			var pe=result.transaction("student","readwrite");
				var acces=pe.objectStore("student");
				var ke=acces.get(database);
				ke.onsuccess=function()
				{
					var key_obj=this.result;
					$(".school_tag").html(key_obj.school_tag);
					$(".school_tag").css({"textTransform":"Uppercase","textAlign":"center","fontSize":"10px"});
				}
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
						if(sessionStorage.getItem("find")==pre_d)
						{                  						
						    							
							var img=new Image();
							img.src=x.pic;			
							$(".user_pic").append(img);
							$(".candidate").html(x.first_name+" "+x.last_name);
							$(".dob").html(x.dob);
							$(".gender").html(x.gender);
							$(".adm_date").html(x.doa);
							$(".father").html(x.father_name);
							$(".admit").html(x.admit);
							$(".mother").html(x.mother_name);
							$(".time").html(x.current_date);
							$(".class").html(x.choose_class);
							$(".mobile").html(x.first_mobile_no);
							$(".address").html(x.address+"&nbsp&nbsp&nbsp +91 "+x.first_mobile_no+" ,&nbsp&nbsp&nbsp+91 "+x.second_mobile_no);
						}
						
                        						 
					}					
				}
			}
		}
		return false;
		$(".print").click(function(){
		
		print();
	});
	
});