function bestCharge(selectedItems) {

	let count = [];/*记录数量*/
	let iden = [];/*存储id*/
	let name = [];/*记录名字*/
	let fangan = loadPromotions();/*优惠返回值*/

	selectedItems.forEach((val)=>{
			let temp = val.split(" x ");
			iden.push(temp[0]);
			count.push( parseInt(temp[1]) );
		}
	);

	let pri = [];/*存储对应的价格*/
	let item = loadAllItems();
	for(let i = 0; i < iden.length; i++){
    item.forEach((val)=>{
				if(val.id == iden[i]){
					name.push(val.name);
					pri[i] = val.price;
				}
			}
		);
	}
	/*统计结束,开始计算价格*/

		/*方案一*/
	let total_first = 0;
	for(let i = 0; i < iden.length; i++){
		total_first += (count[i] * pri[i]);
	}
	if(total_first > 30) total_first -= 6;

		/*方案二*/
	let total_second = 0;
	let half_price = fangan[1].items;
	let youhui = 0;

	for(let i = 0; i < iden.length; i++){
		let flag = 0;
		half_price.forEach((val)=>{
				if(val == iden[i]){
					flag = 1;
					total_second += ( (pri[i] * count[i]) / 2 );
					youhui += ( (pri[i] * count[i]) / 2 );
				}
			}
		);
		if(flag == 0) total_second += (pri[i] * count[i]);

	}

	let result = "============= 订餐明细 =============\n";

	for(let i = 0; i < iden.length;i++){
		result += `${name[i]} x ${count[i]} = ${(pri[i] * count[i])}元\n`;
	}

	if(total_second  < total_first){ /*方案二*/
    result +=
`-----------------------------------
使用优惠:
指定菜品半价(黄焖鸡，凉皮)，省${youhui}元
-----------------------------------
总计：${total_second}元
===================================
`;
	}
	else if(total_second  > total_first){/*一*/
    result +=
`-----------------------------------
使用优惠:
满30减6元，省6元
-----------------------------------
总计：${total_first}元
===================================`;
	}
	else{
    result +=
`-----------------------------------
总计：${total_first}元
===================================`;
	}

  return result;
}
