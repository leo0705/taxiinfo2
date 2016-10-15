﻿/*! 	
 * 	jMain.js - taxiinfo application (main)
 *  Copyriqht (C) 2013-2016  Leonid L.Voitenko All Rights Reserved  http://www.inet-apps.ru/                          
 */
angular.module("TaxiInfoApp", [ 'ngTouch','ngAnimate','UniClientBase']) 
.controller("mainCtrl",['$scope', '$http', '$timeout', '$window', 'UNIURL', 'UniWebClient', 'UniDic',   function ($scope, $http, $timeout, $window, UNIURL, UniWebClient, UniDic) {// , UniWebClient,"ngCommonCtrl"
	
	$scope.displayMode = 'params';
	$scope.newWinWidth = $window.innerWidth;
	$scope.currentUrl = 'params/paramsView.html';				// Url for current view for transient animation	
	
	
	$scope.$watchGroup(['newWinWidth', 'displayMode'], function(newValues, oldValues, scope) {
	console.log("---->$watch   	new-newWinWidth:'%s' old-newWinWidth:'%s'   new-displayMode:'%s'   old-displayMode:'%s' ",
							newValues[0],		 oldValues[0],          newValues[1],			oldValues[1] );
		
		switch(true) {
			case newValues[0] < 768 &&  newValues[1] == 'rezult':
				$scope.currentUrl = 'rezult/sm-tableView.html';
			break;
			
			case newValues[0] >= 768 &&  newValues[1] == 'rezult':
				$scope.currentUrl = 'rezult/md-tableView.html';
			break;
			
			case  newValues[1] == 'params' :
				$scope.currentUrl = 'params/paramsView.html';
			break;
			
			case newValues[0] < 768 &&  newValues[1] == 'params/paramsinfo':
				$scope.currentUrl = 'params/paramsinfo/sm-paramsinfo.html';
			break;
			
			case newValues[0] >= 768 &&  newValues[1] == 'params/paramsinfo':
				$scope.currentUrl = 'params/paramsinfo/md-paramsinfo.html';
			break;
		}
		console.log("<----$watch   currentUrl:'%s'", $scope.currentUrl );
	});		
	
	angular.element($window).bind('resize',function(){
		$scope.$apply(function(){
			$scope.newWinWidth = $window.outerWidth;
		})
	});
	
	$scope.curRegNum = {};	// $scope.curRegNum = {Name:'М0'};
	$scope.curBrand = {};	// $scope.curBrand = {Name:'AUDI'};
	$scope.curModel = {};	// $scope.curModel = {Name:'A4'};
	$scope.curName = {};	// $scope.curName = {Name:'ИВА'};
	
	$scope.whereparam = [
	{id:'txtBrand',col:'Brand',op:'='},
	{id:'txtModel',col:'Model',op:'='},
	{id:'txtRegNum',col:'RegNum',op:'%'},
	{id:'txtName',col:'Name',op:'%'}];
	
	$scope.$watch('curRegNum.Name', function (newValue) {
		console.log("-->$scope.$watch:  $scope.curRegNum.Name='%s'",newValue);
		if (newValue) {
			if ($scope._scope.from = 'RegNum') {
				console.log("$scope.$watch:  $scope.curRegNum.Name='%s'",newValue);
				$scope.arrayname = [];
				$scope.UniPopup.popupShow('RegNum',true);
			}
			$scope.loadCount();
		}
	});
	
	$scope.$watch('curName.Name', function (newValue) {
		console.log("-->$scope.$watch:  $scope.curName.Name='%s'",newValue);
		if (newValue) {
			if ($scope._scope.from = 'Name') {
				console.log("$scope.$watch:  $scope.curName.Name='%s'",newValue);
				$scope.arrayname = [];
				$scope.UniPopup.popupShow('Name',true);
			}
			$scope.loadCount();
		}
	});
	
	$scope.$watch('ajaxSuccess', function (newValue) {
		console.log("$scope.$watch:    $scope.ajaxSuccess='%s'",newValue);  //$scope.ajaxSuccess
		var mstext;
		switch(newValue)
		{
			case "Count.load.OK": 
				mstext = ($scope.Count[0]['affected_rows'])? 'найдено {1} зап.'.Format( $scope.Count[0]['affected_rows']):'не найдено НИ ОДНОЙ записи';
				$scope.mesPost(mstext);
			break;
		
			case "smDBInfo.load.OK": 
				mstext = ($scope.smDBInfo.length>0)? 'успешно загружено {1} зап.'.Format( $scope.smDBInfo.length):'не загружено НИ ОДНОЙ записи';
				if ($scope.mestext.EndsWith('...')) $scope.mesAdd('<br>' + mstext);
				else $scope.mesPost(mstext);
				$scope.DBInfo = $scope.ToArrayByGroup($scope,'smDBInfo','Name','Use');	//if ($scope.newWinWidth >= 768) 
				$scope.displayMode = 'rezult';
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
				$scope.from = null;		// 	закрыть любое открытое выпадающее окно
			break;
			
			case 'params/paramsinfo':
				$scope.displayMode = ($scope.displayMode=='params')?'params/paramsinfo':'params';
			break;
			
		}
	};
	
	$scope.loadDBInfo = function () {
		console.log("loadDBInfo: -------->");
		var opts = {
			eventname:	'smDBInfo.load.OK',
			colnames: 	'colnames', 
			arrayname: 	'smDBInfo' 	
		};
		var sWhere = $scope.UniPopup.getUniWhere($scope, $scope.whereparam);
		var sTop = (sWhere)?'':'top 1000';	
		var sqlTempl = "select {1} Name + '   ( ' +OgrnNum + ' / ' + OgrnDate + ' )' as Name,Brand,Model,RegNum,Year,LicenseNum,LicenseDate,BlankNum  from [inet-19_guestinfo].[inet-19_student].TaxiInfo {2} order by Name asc"; 
		//var sTop = (sWhere)?'':' limit 1000';									console.log("sTop='%s'",sTop);
		//var sqlTempl = "select CONCAT(Name,' (',OgrnNum,' / ',OgrnDate,')' ) as Name,Brand,Model,RegNum,Year,LicenseNum,LicenseDate,BlankNum  from `inet-19_guestinfo`.`TaxiInfo` {2} order by Name asc{1}"; 
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
		var sWhere = $scope.UniPopup.getUniWhere($scope, $scope.whereparam);
		//var sTop = (sWhere)?'':' top 1000';									console.log("sTop='%s'",sTop);
		var sqlTempl = "select Count(TaxiInfoId) as affected_rows  from [inet-19_guestinfo].[inet-19_student].TaxiInfo {1}"; 

		//var sqlTempl = "select Count(TaxiInfoId) as affected_rows  from `inet-19_guestinfo`.`TaxiInfo` {1}"; 
		//var sqlTempl = "select Count(TaxiInfoId) as affected_rows  from `inet-19_guestinfo`.`TaxiInfo`"; 
		var params = {
			Vrwtrace: "True",
			EntryPointName: "DBTableViewer",
			ConKey: "guestinfo",
			mode: 'SP', 
			sqlText: sqlTempl.Format(sWhere)
		};
		var config = {url: UNIURL};
		var promise = $scope.send($scope,params,opts,config);
	};
	
	$scope.loadName = function () {
		console.log("loadName: -------->");
		var opts = {
			eventname:	'Name.load.OK',	
			arrayname: 	'Name' 	
		};
		//var sqlTempl = "select distinct Name from `inet-19_guestinfo`.`TaxiInfo` {1} order by Name asc LIMIT 100"; 
		var sqlTempl = "select distinct top 100 Name from [inet-19_guestinfo].[inet-19_student].TaxiInfo {1} order by Name asc"; 
		var params = {
			Vrwtrace: "True",
			EntryPointName: "DBTableViewer",
			ConKey: "guestinfo",
			mode: 'SP', 
			sqlText: sqlTempl.Format($scope.UniPopup.getUniWhere($scope,$scope.whereparam))
		};
		var config = {url: UNIURL};
		var promise = $scope.send($scope,params,opts,config);
	};
	
	$scope.loadRegNum = function () {
		console.log("loadRegNum: -------->");
		var opts = {
			eventname:	'RegNum.load.OK',	
			arrayname: 	'RegNum' 	
		};
		//var sqlTempl = "select distinct top 100 RegNum as Name from [inet-19_guestinfo].[inet-19_student].TaxiInfo {1} order by RegNum asc"; 
		var sqlTempl = "select distinct top 100 RegNum as Name from [inet-19_guestinfo].[inet-19_student].TaxiInfo {1} order by RegNum asc"; 
		//var sqlTempl = "select RegNum as Name from `inet-19_guestinfo`.`TaxiInfo` {1} order by RegNum asc  LIMIT 100"; 
		var params = {
			Vrwtrace: "True",
			EntryPointName: "DBTableViewer",
			ConKey: "guestinfo",
			mode: 'SP', 
			sqlText: sqlTempl.Format($scope.UniPopup.getUniWhere($scope,$scope.whereparam))
		};
		var config = {url: UNIURL};
		var promise = $scope.send($scope,params,opts,config);
	};
	
	$scope.loadBrand = function () {
		console.log("loadBrand: -------->");
		var opts = {
			eventname:	'Brand.load.OK',	
			arrayname: 	'Brand' 	
		};
		var sqlTempl = "select distinct Brand as Name from [inet-19_guestinfo].[inet-19_student].TaxiInfo  {1} order by Brand asc"; 
		var params = {
			Vrwtrace: "True",
			EntryPointName: "DBTableViewer",
			ConKey: "guestinfo",  // taxiinfo
			mode: 'SP', 
			sqlText: sqlTempl.Format($scope.UniPopup.getUniWhere($scope, $scope.whereparam))

		};
		var config = {url: UNIURL};
		var promise = $scope.send($scope,params,opts,config);
	};
	
	$scope.loadModel = function () {
		console.log("loadModel: -------->",$scope.curBrand.Name);
		var opts = {
			eventname:	'Model.load.OK',	
			arrayname: 	'Model' 	
		};
		var sqlTempl = "select distinct Model as Name from [inet-19_guestinfo].[inet-19_student].TaxiInfo {1} order by Model asc"; 
		var params = {
			Vrwtrace: "True",
			EntryPointName: "DBTableViewer",
			ConKey: "guestinfo",
			mode: 'SP', 
			sqlText: sqlTempl.Format($scope.UniPopup.getUniWhere($scope, $scope.whereparam))
		};
		var config = {url: UNIURL};
		var promise = $scope.send($scope,params,opts,config);
	};
	
	$scope.selectedItem = function(item) 	{
		console.log("selectedItem:  from:'%s'  popupValue:'%s'",$scope.from,item['Name']); 
		//angular.element(document.getElementById('txt'+$scope.from)).val(item['Name']);				
		switch($scope.from)	{
			case "Brand":
				$scope.curBrand['Name'] = item['Name'];
				$scope.curModel = {};
				$scope.Model = undefined;
				//if (item.Name == 'SKODA') $timeout(function(){$scope.UniPopup.popupShow('Model');}, 600);
			break;
			case "Model": 
				$scope.curModel['Name'] = item['Name'];
			break;
			case "RegNum": 
				$scope.curRegNum['Name'] = item['Name'];
			break;
			case "Name": 
				$scope.Name['Name'] = item['Name'];
			break;		
		}//End switch
		$scope.UniPopup.selectedItemBase($scope,item);
		$scope.loadCount();
	};
	
	$scope.unselectBrand = function() 	{		console.log("unselectBrand:  -------->");
				angular.element(document.getElementById('txtBrand')).val('');				
				$scope.curBrand ={};
				$scope.Brand = [];
				$scope.curModel ={};
				$scope.Model = [];
				$scope.curRegNum ={};
				$scope.RegNum = [];	
				$scope.UniPopup.closeAnyOpenPopup()
				$scope.loadCount();
	};
	
	$scope.unselectModel = function() 	{		console.log("unselectModel:  -------->");
				angular.element(document.getElementById('txtModel')).val('');				
				$scope.curModel ={};
				$scope.Model = [];
				$scope.RegNum = [];
				$scope.UniPopup.closeAnyOpenPopup()
				$scope.loadCount();
	};
	
	$scope.unselectRegNum = function() 	{		console.log("unselectRegNum:  -------->");
				angular.element(document.getElementById('txtRegNum')).val('');				
				$scope.curRegNum ={};
				$scope.RegNum = [];	
				$scope.UniPopup.closeAnyOpenPopup()
				$scope.loadCount();
	};
	
	$scope.unselectName = function() 	{		console.log("unselectName:  -------->");
				angular.element(document.getElementById('txtName')).val('');				
				$scope.curName ={};
				$scope.Name = [];
				$scope.UniPopup.closeAnyOpenPopup()
				$scope.loadCount();
	};
	
//	$scope.displayMode = 'params';
	$scope.UniPopup.setChildScope($scope);
}]);
