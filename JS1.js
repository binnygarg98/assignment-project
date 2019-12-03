var id='4629df7d'
var key='a04da6cfd96bad9e15d82c5ce59d012a'
var q;
function srch()
{
	q=document.getElementById('query').value
	var url='https://api.edamam.com/search?app_id='+id+'&app_key='+key+'&q='+q+''
	console.log(url)
	var xhr=new XMLHttpRequest()
	xhr.open('GET',url)
	xhr.onreadystatechange=test
	var content=""
	$(".recipe-data").html("");
	var rowcount=0;
	function test()
	{
		content+="<div class='row'>"
		if(this.status==200&&this.readyState==4)
		{
			var res_data=JSON.parse(this.responseText)
			console.log(res_data)
			for(j in res_data.hits)
			{
				rowcount++;
				content+="<div class='col-md-3 recipe'><a target='_blank' href="+res_data.hits[j].recipe.url+"<center><img src="+res_data.hits[j].recipe.image+"></center></a><center><p><h3>"+res_data.hits[j].recipe.label+"</h3></p></center><center><p>Time: "+res_data.hits[j].recipe.totalTime+"</p></center><p>Calories: "+res_data.hits[j].recipe.calories+"</p></center></div>"
				if(rowcount%3==0)
					{
						content+="</div>"
						break;
					}

			}
		    
		

	}$(".recipe-data").append(content)

		
}
xhr.send()
}