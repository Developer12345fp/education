//receipt coding
$(document).ready(function(){
	var session=Number(sessionStorage.getItem("account"));
	var database=sessionStorage.getItem("database");	
	$(".college").html(database);
	$(".college").css({"textTransform":"Uppercase","textAlign":"center","fontSize":"35px"});
	var open=window.indexedDB.open(database)
	open.onsuccess=function()
	{
		var obj=this.result;
		var per=obj.transaction("student","readwrite");
		var access=per.objectStore("student");
		var key=access.get(database);
		key.onsuccess=function()
		{
			var key_obj=this.result;
			$(".school_tag").html(key_obj.school_tag);
			$(".school_tag").css({"textTransform":"Uppercase","textAlign":"center","fontSize":"10px"});
		}
		var per_pic=obj.transaction("admission","readwrite");
		var access_pic=per_pic.objectStore("admission");
		var key_pic=access_pic.get(session);
		key_pic.onsuccess=function()
		{
			var data=this.result;
			var img=new Image();
			img.src=data.pic;			
			$(".user_pic").append(img);
			$(".candidate").html(data.first_name+" "+data.last_name);
			$(".dob").html(data.dob);
			$(".gender").html(data.gender);
			$(".adm_date").html(data.doa);
			$(".father").html(data.father_name);
			$(".admit").html(data.admit);
			$(".mother").html(data.mother_name);
			$(".time").html(data.current_date);
			$(".class").html(data.choose_class);
			$(".mobile").html(data.first_mobile_no);
			$(".address").html(data.address+"&nbsp&nbsp&nbsp +91 "+data.first_mobile_no+" ,&nbsp&nbsp&nbsp+91 "+data.second_mobile_no);
			
		}
	}
	$(".print").click(function(){
		
		print();
	});
});
//end receipt coding
