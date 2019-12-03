var s
var s1
function a()
{
  	s=document.getElementById('search').value
  	s1=s.substring(0,1).toUpperCase()+s.substring(1,s.length);
	var url="https://developers.zomato.com/api/v2.1/locations?query="+s1+"&apikey=f1d3f307c8c6887ae10fb54d513c5584"
	var xhr= new XMLHttpRequest()
	xhr.open('GET',url)
	xhr.onreadystatechange=test
	function test()
	{

		var e;
		if(this.readyState==4&&this.status==200)
		{
			var res_data=JSON.parse(this.responseText)
			e=res_data.location_suggestions[0].city_id
			console.log(e)
			var url1='https://developers.zomato.com/api/v2.1/search?entity_id='+e+'&entity_type=city&apikey=f1d3f307c8c6887ae10fb54d513c5584'	
			var xhr1=new XMLHttpRequest()
			xhr1.open('GET',url1)
			xhr1.onreadystatechange=test1
			var content="";
			$(".hotel_data").html("");
			var rowcount=0;
			function test1()
			{
				content+="<div class='row'>";
				if(this.status==200&&this.readyState==4)
				{
					var res_data1=JSON.parse(this.responseText)
					for(j in res_data1.restaurants)
					{
						var c_id=res_data1.restaurants[j].restaurant.location.city_id
						var city=res_data1.restaurants[j].restaurant.location.city
						if(e==c_id&&city==s1)
						{
							rowcount++;
							content+="<div class='col-md-3 hotel'><a target='_blank' href="+res_data1.restaurants[j].restaurant.menu_url+"><img src='"+res_data1.restaurants[j].restaurant.thumb+"'></a><p><h3>"+res_data1.restaurants[j].restaurant.name+"</h3></p><p>"+res_data1.restaurants[j].restaurant.location.address+"</p><p>Rating : "+res_data1.restaurants[j].restaurant.user_rating.aggregate_rating+"</div>";
							if(rowcount%3==0)
							{
								content+="</div><div class='row'>";
							}
						}
					}
					content+="</div>";
				}
				$(".hotel_data").append(content);
			}
			xhr1.send()
	}
	
}
xhr.send()

}