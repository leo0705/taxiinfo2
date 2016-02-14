﻿/*! 	
 * 	jMain.js - taxiinfo application (main)
 *  Copyriqht (C) 2013-2015  Leonid L.Voitenko All Rights Reserved  http://www.inet-apps.ru/                          
 *	version: 1.12 (2015-03-18)
 */
angular.module("TaxiInfoApp", ["UniClientBase"])   //  , "ngAnimate"
//.controller("mainCtrl", function ($scope, $http, $timeout, $window, UNIURL, UniWebClient, UniDic) {// , UniWebClient,"ngCommonCtrl"
.controller("mainCtrl",['$scope', '$http', '$timeout', '$window', 'UNIURL', 'UniWebClient', 'UniDic',   function ($scope, $http, $timeout, $window, UNIURL, UniWebClient, UniDic) {// , UniWebClient,"ngCommonCtrl"
	$scope.btnToolbarNorm.imageminsize['paramsinfo'] = '20px';	 	// мин/мах значния для анимации иображений
	$scope.btnToolbarNorm.imagemaxsize['paramsinfo'] = '30px';
	
	$scope.curRegNum = {};	// $scope.curRegNum = {Name:'М0'};
	$scope.curBrand = {};	// $scope.curBrand = {Name:'AUDI'};
	$scope.curModel = {};	// $scope.curModel = {Name:'A4'};
	$scope.curName = {};	// $scope.curName = {Name:'ИВА'};
	
/*
$scope.ToArrayByGroup = function (arrayname,propname,subarray_propname) {	//  
	console.log("ToArrayByGroup: arrayname:'%s'---:---propname:'%s'---subarray_propname:'%s'---->", arrayname,propname,subarray_propname);
	var new_item,      // 	obj ~ row  (table <tr>)
		old_item,			//	old_item = $scope[arrayname][i];
		propname_value,		// 	propname_value = old_item[propname]
		subarray_item,
		rezult = [],    	// array of new_item
		subarray = [], 		// new_item[subarray_propname] = subarray;
		i,   				// cur old_item index            0<= i < $scope[arrayname].length 
		groupvalue;				// 	groupvalue = $scope[arrayname][i][propname]
	for (i = 0; i < $scope[arrayname].length; i++) {
		old_item = $scope[arrayname][i];
		propname_value = old_item[propname];
		subarray_item = old_item;
		delete subarray_item[propname];
		//console.log("i:'%s'     propname_value:'%s'   groupvalue:'%s'    subarray.length:'%s'",i, propname_value, groupvalue,subarray.length);
		switch (true) {
			case i == 0:											// first array item
			groupvalue = propname_value;
			subarray.push(subarray_item); 
			break;
			
			case   groupvalue != propname_value	:
						new_item = {};
						new_item[propname] = groupvalue;
						new_item[subarray_propname] = subarray;
						rezult.push(new_item);
						subarray = [];
					groupvalue = propname_value;
					subarray.push(subarray_item);
					if (i == $scope[arrayname].length - 1) {   //  last array item
						new_item = {};
						new_item[propname] = groupvalue;
						new_item[subarray_propname] = subarray;
						rezult.push(new_item);
						subarray = [];
				}
			break;
			
			case	groupvalue == propname_value :	
				subarray.push(subarray_item);
				if (i == $scope[arrayname].length - 1) {   //  last array item
						new_item = {};
						new_item[propname] = groupvalue;
						new_item[subarray_propname] = subarray;
						rezult.push(new_item);
						subarray = [];
				}
			break;
		}// endswitch	
	}// ends for
	console.log("ToArrayByGroup: <---OK-------");
	return rezult;
};
		
	$scope.toggleHover = function (e) {				//toggleHover(e)
		if (e.target) $this = $(e.target);
		if (e.type == "mouseenter") $this.addClass('hover');
		if (e.type == "mouseleave") $this.removeClass('hover');
		// if (e.type == "mousedown") $this.addClass('mdown');
		// if (e.type == "mouseup") $this.removeClass('mdown');
		// if (e.type == "click") this.popupShow(e.target.id.substr(3));
	};
*/	
	
	/*
	$scope.whereparam = [
	{value:$scope.curBrand.Name,col:'Brand',op:'='},
	{value:$scope.curModel.Name,col:'Model',op:'='},
	{value:$scope.curRegNum.Name,col:'RegNum',op:'%'}];
	*/
	$scope.whereparam = [
	{id:'txtBrand',col:'Brand',op:'='},
	{id:'txtModel',col:'Model',op:'='},
	{id:'txtRegNum',col:'RegNum',op:'%'},
	{id:'txtName',col:'Name',op:'%'}];
	/*
	//$scope.$watch('Brand.Name', function (newValue) {
		//console.log("$scope.$watch:  $scope.curBrand.Name='%s'",newValue);
		//if (newValue) $scope.loadCount();
		//$scope.loadCount();
	//});
	
	//$scope.$watch('curModel.Name', function (newValue) {
	//	console.log("$scope.$watch:  $scope.curModel.Name='%s'",newValue);
		//if (newValue) $scope.loadCount();
		//$scope.loadCount();
	//});
	*/
	$scope.$watch('curRegNum.Name', function (newValue) {
		if ($scope._scope) {
			console.log("$scope.$watch:  $scope.curRegNum.Name='%s'",newValue);
			$scope.arrayname = [];
			$scope.UniPopup.popupShow('RegNum',true);
		}
		if (newValue) $scope.loadCount();
		//$scope.loadCount();
	});
	
	$scope.$watch('curName.Name', function (newValue) {
		if ($scope._scope) {
			console.log("$scope.$watch:  $scope.curName.Name='%s'",newValue);
			$scope.arrayname = [];
			$scope.UniPopup.popupShow('Name',true);
		}
		if (newValue) $scope.loadCount();
		//$scope.loadCount();
	});
	
	/*	
	$scope.$watch('xcurRegNum.Name', function (newValue) {
		console.log("$scope.$watch:  $scope.xcurRegNum.Name='%s'",newValue);
		var retValue;
		if (newValue)  	{
			retValue = $scope.AdjustKeyInput(newValue);
			if (retValue)  	{
				$scope.arrayname = [];
				$scope.curRegNum.Name = retValue;
				$scope.loadRegNum();
			}
		}
	});
	*
	/
	$scope.AdjustKeyInput = function (sTxt) {
		console.log("AdjustKeyInput: ------'%s'-->",sTxt);
		var rezult = false,
			sEn = 'АBCEHMKOPTXY',  
			sRu = 'АВСЕНМКОРТХУ',
			sDi = '0123456789',
			sIn = sTxt.substr(sTxt.length-1,1).toUpperCase(),
			posRu = sRu.indexOf(sIn);
			posEn = sEn.indexOf(sIn);
			switch(true)		{
				case posEn >= 0:       
				rezult = sTxt.substr(0,sTxt.length-1) + sRu.substr(posEn,1);
				break;
				
				case sDi.indexOf(sIn) >= 0:       
				case posRu >= 0:       
				rezult = sTxt;
				break;
			}
		console.log("AdjustKeyInput: <------'%s'--",rezult);
		return rezult;
	};	
	/	*
	$scope.AdjustKeyInput = function (sTxt) {
		console.log("AdjustKeyInput: ------'%s'-->",sTxt);
		var rezult = sTxt.toUpperCase(),
			sEn = 'АBCEHMKOPTXY',  
			sRu = 'АВСЕНМКОРТХУ',
			//sDi = '0123456789',
			sIn = sTxt.substr(sTxt.length-1,1).toUpperCase(),
			//posRu = sRu.indexOf(sIn);
			posEn = sEn.indexOf(sIn);
			//if (posRu >= 0) rezult = sTxt;
			if (posEn >= 0) rezult = sTxt.substr(0,sTxt.length-1) + sRu.substr(posEn,1);
		console.log("AdjustKeyInput: <------'%s'--",rezult);
		return rezult;
	};	
	*/
	$scope.$watch('ajaxSuccess', function (newValue) {
		console.log("$scope.$watch:    $scope.ajaxSuccess='%s'",newValue);  //$scope.ajaxSuccess
		var mstext;
		switch(newValue)
		{
		
			case "Count.load.OK": 
				mstext = ($scope.Count[0]['affected_rows'])? 'найдено {1} зап.'.Format( $scope.Count[0]['affected_rows']):'не найдено НИ ОДНОЙ записи';
				$scope.mesPost(mstext);
			break;
		
			case "DBInfo.load.OK": 
				$scope.displayMode = 'rezult';
				mstext = ($scope.DBInfo.length>0)? 'успешно загружено {1} зап.'.Format( $scope.DBInfo.length):'не загружено НИ ОДНОЙ записи';
				if ($scope.mestext.EndsWith('...')) $scope.mesAdd('<br>' + mstext);
				else $scope.mesPost(mstext);
				$scope.DBInfo = $scope.ToArrayByGroup($scope,'DBInfo','Name','Use');
			break;
		
			case "Brand.load.OK":  
				$scope.UniPopup.popupShow('Brand');
			break;
		
			case "Model.load.OK":  
				$scope.UniPopup.popupShow('Model');
			break;
		
			case "RegNum.load.OK":  
				$scope.UniPopup.popupShow('RegNum');
			break;
		
			case "Name.load.OK":  
				$scope.UniPopup.popupShow('Name');
			break;
		}
});
	
	$scope.selectMode = function (button)	{
		console.log("selectMode: -----button:'%s'---->",button);   //$scope.displayMode:   'params' 	'rezult'
		switch(button)  	{
			
			case 'rezult':   
				$scope.loadDBInfo();
			break;
			
			case 'params':            
				$scope.displayMode = 'params';
				//if ( $scope._scope.from) $scope.UniPopup.popupShow('');	// 	закрыть любое открытое выпадающее окно
				if ( $scope.from) $scope.UniPopup.popupShow('');	// 	закрыть любое открытое выпадающее окно
			break;
			
			case 'params/paramsinfo': 
				var old = $('div#paramsinfo');			
				if ($scope.displayMode=='params/paramsinfo') {old.fadeOut('slow', function(){$scope.displayMode = 'params';});}//скрыть
				/*
				//	old.animate(
				//						{
				//							opacity: 0.1
				//						},
				//						600
				//						,
				//						function()	{
				//							$scope.displayMode = 'params';
				//							old.attr('opacity', '1');
				//						}); // end animate	
				*/							
											
				
					else	{					// показать
						$scope.displayMode = 'params/paramsinfo';
						old.hide().fadeIn('slow');
					}
				//$scope.displayMode = ($scope.displayMode=='params/paramsinfo')?'params':'params/paramsinfo';
			break;
			
		}
	};
	
	$scope.loadDBInfo = function () {
		console.log("loadDBInfo: -------->");
		var opts = {
			eventname:	'DBInfo.load.OK',
			colnames: 	'colnames', 
			arrayname: 	'DBInfo' 	
		};
		var sWhere = $scope.UniPopup.getUniWhere($scope.whereparam);
		var sTop = (sWhere)?'':' limit 1000';									console.log("sTop='%s'",sTop);
		//		SELECT    Name + '   ( ' +OgrnNum + '  ' + OgrnDate + ')' as Name
		var sqlTempl = "select {1} Name + '   ( ' +OgrnNum + ' / ' + OgrnDate + ' )' as Name,Brand,Model,RegNum,Year,LicenseNum,LicenseDate,BlankNum  from `inet-19_guestinfo`.`TaxiInfo` {2} order by Name asc"; 
		var params = {
			Vrwtrace: "True",
			EntryPointName: "DBTableViewer",
			ConKey: "guestinfo",
			mode: 'SP', 
			sqlText: sqlTempl.Format(sTop,sWhere)
		};
		var config = {url: UNIURL};
		if (sTop) $scope.mesPost('Вы не задали параметров поиска, из БД будут загружены первые 1000 записей ...');
		var promise = $scope.send($scope,params,opts,config);
	};
	
	$scope.loadCount = function () {
		console.log("loadCount: -------->");
		var opts = {
			eventname:	'Count.load.OK',
			colnames: 	'colnames', 
			arrayname: 	'Count' 	
		};
		var sWhere = $scope.UniPopup.getUniWhere($scope.whereparam);
		//var sTop = (sWhere)?'':'top 1000';									console.log("sTop='%s'",sTop);
		var sqlTempl = "select Count(TaxiInfoId) as affected_rows  from `inet-19_guestinfo`.`TaxiInfo` {1}"; 
		var params = {
			Vrwtrace: "True",
			EntryPointName: "DBTableViewer",
			ConKey: "guestinfo",
			mode: 'SP', 
			sqlText: sqlTempl.Format(sWhere)
		};
		var config = {url: UNIURL};
		//if (sTop) $scope.mesPost('Вы не задали параметров поиска, из БД будут загружены первые 1000 записей ...');
		var promise = $scope.send($scope,params,opts,config);
	};
	
	$scope.loadName = function () {
		console.log("loadName: -------->");
		var opts = {
			eventname:	'Name.load.OK',	
			arrayname: 	'Name' 	
		};
		var sqlTempl = "select distinct Name from `inet-19_guestinfo`.`TaxiInfo` {1} order by Name asc LIMIT 100"; 
		var params = {
			Vrwtrace: "True",
			EntryPointName: "DBTableViewer",
			ConKey: "guestinfo",
			mode: 'SP', 
			//sqlText: sqlTempl.Format($scope.curRegNum.Name)
			sqlText: sqlTempl.Format($scope.UniPopup.getUniWhere($scope.whereparam))
		};
		var config = {url: UNIURL};
		var promise = $scope.send($scope,params,opts,config);
	};
	
	$scope.loadRegNum = function () {
		console.log("loadRegNum: -------->");
		//$scope.curRegNum.Name = $scope.AdjustKeyInput($scope.curRegNum.Name);
		var opts = {
			eventname:	'RegNum.load.OK',	
			arrayname: 	'RegNum' 	
		};
		//$scope.UniPopup.getUniWhere($scope.whereparam);
		//var sqlTempl = "select distinct top 100 RegNum as Name from [inet-19_guestinfo].[inet-19_student].TaxiInfo where RegNum like '{1}%' order by RegNum asc"; 
		var sqlTempl = "select RegNum as Name from `inet-19_guestinfo`.`TaxiInfo` {1} order by RegNum asc  LIMIT 100"; 
		var params = {
			Vrwtrace: "True",
			EntryPointName: "DBTableViewer",
			ConKey: "guestinfo",
			mode: 'SP', 
			//sqlText: sqlTempl.Format($scope.curRegNum.Name)
			sqlText: sqlTempl.Format($scope.UniPopup.getUniWhere($scope.whereparam))
		};
		var config = {url: UNIURL};
		var promise = $scope.send($scope,params,opts,config);
	};
	
	$scope.loadBrand = function () {
		console.log("loadBrand: -------->");
		//$scope.curBrand.Name = $scope.AdjustKeyInput($scope.curRegNum.Name);
		var opts = {
			eventname:	'Brand.load.OK',	
			arrayname: 	'Brand' 	
		};
		$scope.UniPopup.getUniWhere($scope.whereparam);
		//var sqlTempl = "select distinct Brand as Name from [inet-19_guestinfo].[inet-19_student].TaxiInfo order by Brand asc"; 
		var sqlTempl = "select distinct Brand as Name from `inet-19_guestinfo`.`TaxiInfo` {1} order by Brand asc"; 
		var params = {
			Vrwtrace: "True",
			EntryPointName: "DBTableViewer",
			ConKey: "guestinfo",  // taxiinfo
			mode: 'SP', 
			sqlText: sqlTempl.Format($scope.UniPopup.getUniWhere($scope.whereparam))

		};
		var config = {url: UNIURL};
		var promise = $scope.send($scope,params,opts,config);
	};
	
	$scope.loadModel = function () {
		console.log("loadModel: -------->",$scope.curBrand.Name);
		//$scope.curBrand.Name = $scope.AdjustKeyInput($scope.curRegNum.Name);
		var opts = {
			eventname:	'Model.load.OK',	
			arrayname: 	'Model' 	
		};
		//var sqlTempl = "select distinct Model as Name from [inet-19_guestinfo].[inet-19_student].TaxiInfo where Brand = '{1}' order by Model asc"; 
		var sqlTempl = "select distinct Model as Name from `inet-19_guestinfo`.`TaxiInfo` {1} order by Model asc"; 
		var params = {
			Vrwtrace: "True",
			EntryPointName: "DBTableViewer",
			ConKey: "guestinfo",
			mode: 'SP', 
			//sqlText: sqlTempl.Format($scope.curBrand.Name)
			sqlText: sqlTempl.Format($scope.UniPopup.getUniWhere($scope.whereparam))
		};
		var config = {url: UNIURL};
		var promise = $scope.send($scope,params,opts,config);
	};
	
	/*
	// $scope.loadCity = function() 	{
		// console.log("loadCity:  -------->");
		// $scope.UniPopup.getUniWhere($scope.whereparam);
		// $scope.City = $scope.Cityxxx;
		// $scope.UniPopup.popupShow('City');
	// };	
	*/
	
	$scope.selectedItem = function(item) 	{
		console.log("selectedItem:  from:'%s'  popupValue:'%s'",$scope.from,item['Name']); 
		//angular.element(document.getElementById('txt'+$scope.from)).val(item['Name']);				
		switch($scope.from)	{
			case "Brand":
				$scope.curBrand['Name'] = item['Name'];
				$scope.curModel = {};
				$scope.Model = undefined;
				//if (item.Name == 'SKODA') $timeout(function(){$scope.UniPopup.popupShow('Model');}, 600);
				//$scope.UniPopup.getUniWhere($scope.whereparam);
			break;
			case "Model": 
				$scope.curModel['Name'] = item['Name'];
				//$scope.UniPopup.getUniWhere($scope.whereparam);
			break;
			case "RegNum": 
				$scope.curRegNum['Name'] = item['Name'];
				//$scope.UniPopup.getUniWhere($scope.whereparam);
			break;
			case "Name": 
				$scope.Name['Name'] = item['Name'];
				//$scope.UniPopup.getUniWhere($scope.whereparam);
			break;		
		}//End switch
		$scope.UniPopup.selectedItemBase($scope,item);
		$scope.loadCount();
	};
	
	$scope.unselectBrand = function() 	{		console.log("unselectBrand:  -------->");
				angular.element(document.getElementById('txtBrand')).val('');				
				$scope.curBrand ={};
				$scope.curModel ={};
				$scope.Brand = [];
				$scope.Model = [];
				//$scope.RegNum = [];
				//$scope.Name = [];
				$scope.UniPopup.clearText('Brand');
				$scope.loadCount();
	};
	
	$scope.unselectModel = function() 	{		console.log("unselectModel:  -------->");
				angular.element(document.getElementById('txtModel')).val('');				
				$scope.curModel ={};
				$scope.Model = [];
				//$scope.RegNum = [];
				//$scope.Name = [];
				$scope.UniPopup.clearText('Model');
				$scope.loadCount();
	};
	
	$scope.unselectRegNum = function() 	{		console.log("unselectRegNum:  -------->");
				angular.element(document.getElementById('txtRegNum')).val('');				
				$scope.curRegNum ={};
				$scope.RegNum = [];	
				//$scope.Model = [];
				//$scope.Brand = [];
				//$scope.Name = [];
				$scope.UniPopup.clearText('RegNum');
				$scope.loadCount();
	};
	
	$scope.unselectName = function() 	{		console.log("unselectName:  -------->");
				angular.element(document.getElementById('txtName')).val('');				
				$scope.curName ={};
				$scope.Name = [];
				//$scope.Model = [];
				//$scope.Brand = [];
				//$scope.RegNum = [];
				$scope.UniPopup.clearText('Name');
				$scope.loadCount();
	};
	
	//$scope.loadCount();
	$scope.displayMode = 'params';
	
}]);
