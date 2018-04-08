function bestCharge(selectedItems) {
	
	var count = [];/*记录数量*/
	var iden = [];/*存储id*/
	var name = [];/*记录名字*/
	var fangan = loadPromotions();/*优惠返回值*/
	
	selectedItems.forEach(
		function(val){
			var temp = val.split(" x ");
			iden.push(temp[0]);
			count.push( parseInt(temp[1]) );
		}
	);
	
	var pri = [];/*存储对应的价格*/
	var item = loadAllItems();
	for(var i = 0; i < iden.length; i++){
		item.forEach(
			function(val){
				if(val.id == iden[i]){
					name.push(val.name);
					pri[i] = val.price;
				}
			}
		);
	}
	/*统计结束,开始计算价格*/
	
		/*方案一*/
	var total_first = 0;
	for(var i = 0; i < iden.length; i++){
		total_first += (count[i] * pri[i]);
	}
	if(total_first > 30) total_first -= 6;
	
		/*方案二*/
	var total_second = 0;
	var half_price = fangan[1].items;
	var youhui = 0;
	
	for(var i = 0; i < iden.length; i++){
		var flag = 0;
		half_price.forEach(
			function(val){
				if(val == iden[i]){
					flag = 1;
					total_second += ( (pri[i] * count[i]) / 2 );
					youhui += ( (pri[i] * count[i]) / 2 );
				}
			}
		);
		if(flag == 0) total_second += (pri[i] * count[i]);
		
	}
	
	var result = "============= 订餐明细 =============\n";
	
	for(var i = 0; i < iden.length;i++){
		result += name[i] + " x " + count[i] + " = " +(pri[i] * count[i]) + "元\n";
	}
	
	if(total_second  < total_first){ /*方案二*/
		result += "-----------------------------------\n使用优惠:\n" + "指定菜品半价(黄焖鸡，凉皮)，省"
				+ youhui+"元\n" + "-----------------------------------\n总计："+
				total_second+"元\n===================================\n";
	}
	else if(total_second  > total_first){/*一*/
		result += "-----------------------------------\n使用优惠:\n" + "满30减6元，省"
				+ 6 +"元\n" + "-----------------------------------\n总计："+
				total_first+"元\n===================================\n";
	}
	else{
		result += "-----------------------------------\n总计："+
				total_first+"元\n===================================\n";
	}
	
  return result;
}
