$(document).ready(function()
{
var adm_no=Number(sessionStorage.getItem("adm_no"));
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
		var key_obj=this.result;
		var image=new Image();
		image.src=key_obj.school_logo;
		image.width="100";
		image.height="100";
		$(".user_pic").html(image);
		$(".school_name").html(key_obj.school_name);
		$(".school_tag").html(key_obj.school_tag);
		var image_p=new Image();
		image_p.src=key_obj.principal_sign;
		image_p.width="200";
		image_p.height="40";
		$(".principal").html(image_p);
		var image_d=new Image();
		image_d.src=key_obj.director_sign;
		image_d.width="200";
		image_d.height="40";
		$(".director").html(image_d);
	}
	var adm_per=obj.transaction("admission","readwrite");
	var adm_access=adm_per.objectStore("admission");
	var adm_key=adm_access.get(adm_no);
	adm_key.onsuccess=function()
	{
		var adm_obj=this.result;
		$(".name").html(adm_obj.first_name+" "+adm_obj.last_name);
		$(".invoice_no").html(adm_obj.adm_no);
		$(".father_name").html(adm_obj.father_name);
		$(".invoice_date").html(sessionStorage.getItem("invoice_date"));
		$(".address").html(adm_obj.address+"&nbsp&nbsp&nbsp +91 "+adm_obj.first_mobile_no+" ,&nbsp&nbsp&nbsp+91 "+adm_obj.second_mobile_no);
		var i,j,total=0;
		for(i=0;i<adm_obj.invoice[adm_obj.invoice.length-1].course_name.length;i++)
		{
			document.querySelector(".course_name").innerHTML+=adm_obj.invoice[adm_obj.invoice.length-1].course_name[i]+"<hr>";
		}
		for(j=0;j<adm_obj.invoice[adm_obj.invoice.length-1].course_fee.length;j++)
		{
			document.querySelector(".course_fee").innerHTML+=adm_obj.invoice[adm_obj.invoice.length-1].course_fee[j]+"<hr>";
			total+=Number(adm_obj.invoice[adm_obj.invoice.length-1].course_fee[j]);
		}
		$(".total").html(total);
	}
	adm_key.onerror=function()
	{
		alert("find failed");
	}
}
});