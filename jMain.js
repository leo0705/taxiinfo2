/*! 	
 * 	jMain.js - taxiinfo application (main)
 *  Copyriqht (C) 2013-2016  Leonid L.Voitenko All Rights Reserved  http://www.inet-apps.ru/                          
 */
angular.module("TaxiInfoApp", [ 'ngAnimate','UniClientBase']) 
.controller("mainCtrl",['$scope', '$http', '$timeout', '$window', 'UNIURL', 'UniWebClient', 'UniDic',   function ($scope, $http, $timeout, $window, UNIURL, UniWebClient, UniDic) {// , UniWebClient,"ngCommonCtrl"
	//	test = tracer("--'%s'--'%s'--'%s'--","джентельмены", "предпочитают", "блондинок")  $scope.mesPost('ver 25-11-2016 11:14');
	setTimeout(function () {
			//$scope.mesPost('ver 08-12-2016 18:58');
			pub.notifier('дата сборки: 13-12-2016 12:12');
		}
		, 800);		
	var	rootviewElement = document.getElementById('rootview')
	,	mc = new Hammer(rootviewElement)
	, 	popup_selected_value = ''
	;
//	document.getElementById("txtName").addEventListener("blur", function(){
//			document.getElementById("txtName").setAttribute("readonly", true);
//});					

	// listen to mouse & touch  events...   'div.container'
	mc.on("hammer.input", function(_ev) {
		var item = {}
		, 	id = ''
		,	elem = null
	//	,	mes	= "==>mc.on  isFirst:'{1}'  isFinal:'{2}'  eventType:'{3}'  deltaTime:'{3}'  tag:'{5}'  id:'{6}' "
		,	ms	= "==>mc.on  isFirst:'%s'  isFinal:'%s'  eventType:'%s'  deltaTime:'%s'  tag:'%s'  id:'%s' "
		;
		//console.log(mes.Format(_ev.isFirst, _ev.isFinal,  _ev.eventType,  _ev.deltaTime,  _ev.target.tagName, _ev.target.id));
		//window.jGrowl_helper("  from Main.js OK ");
		//window.jQuery('div.top-left').jGrowl(" window.jQuery('div.top-left').jGrowl(txt)  from Main.js  OK!!! ");
		//return;		
		if ( _ev.isFirst )	{
				pub.itracer(ms, _ev.isFirst, _ev.isFinal,  _ev.eventType,  _ev.deltaTime,  _ev.target.tagName, _ev.target.id);
			switch(true) {
				case _ev.target.tagName == 'SPAN'  && _ev.target.id == 'mestext' :
					$scope.$apply($scope.mesClear());
				break;
				
				case (_ev.target.tagName == 'SPAN' && _ev.target.id == 'show-paramsinfo') || (_ev.target.tagName == 'I'  && _ev.target.className.indexOf('fa-question') >= 0) :
					//$scope.selectMode('show-paramsinfo', function(){ $scope.$apply(); });
					$scope.$apply($scope.selectMode('show-paramsinfo'));
				break;
				
				case (_ev.target.tagName == 'SPAN'  && _ev.target.id == 'hide-paramsinfo') || (_ev.target.tagName == 'I'  && _ev.target.className.indexOf('fa-close') >= 0) :
					//$scope.selectMode('hide-paramsinfo', function(){ $scope.$apply(); });
					$scope.$apply($scope.selectMode('hide-paramsinfo'));
				break;
				
				case  (_ev.target.tagName == 'BUTTON'  && _ev.target.id == 'btnReply') || (_ev.target.tagName == 'I'  && _ev.target.className.indexOf('fa-car') >= 0)  :	
					//$scope.selectMode('rezult');
					$scope.$apply($scope.selectMode('rezult'));
				break;
				
				case  _ev.target.tagName == 'BUTTON'  && _ev.target.id == 'btnParams' :			
					//$scope.selectMode('params');
					$scope.$apply($scope.selectMode('params'));
				break;
				/*--------------------------------------------unselect------------------------------------------------------*/
				case(_ev.target.tagName == 'SPAN'  && _ev.target.id == 'unselectBrand') || (_ev.target.tagName == 'I'  && _ev.target.parentElement.id == 'unselectBrand') :
					$scope.$apply($scope.unselectBrand());
				break;
				
				case(_ev.target.tagName == 'SPAN'  && _ev.target.id == 'unselectModel') || (_ev.target.tagName == 'I'  && _ev.target.parentElement.id == 'unselectModel') :
					$scope.$apply($scope.unselectModel());
				break;
				
				case(_ev.target.tagName == 'SPAN'  && _ev.target.id == 'unselectRegNum') || (_ev.target.tagName == 'I'  && _ev.target.parentElement.id == 'unselectRegNum') :
					$scope.$apply($scope.unselectRegNum());
				break;
				
				case(_ev.target.tagName == 'SPAN'  && _ev.target.id == 'unselectName') || (_ev.target.tagName == 'I'  && _ev.target.parentElement.id == 'unselectName') :
					$scope.$apply($scope.unselectName());
				break;
				/*---------------------------------------------down-------------------------------------------------------*/
				case(_ev.target.tagName == 'SPAN'  && _ev.target.id == 'downBrand') || (_ev.target.tagName == 'I'  && _ev.target.parentElement.id == 'downBrand') :
					$scope.$apply($scope.UniPopup.popupShow('Brand','true' ));
				break;
				
				case(_ev.target.tagName == 'SPAN'  && _ev.target.id == 'downModel') || (_ev.target.tagName == 'I'  && _ev.target.parentElement.id == 'downModel') :
					$scope.$apply($scope.UniPopup.popupShow('Model','true' ));
				break;
				
				case(_ev.target.tagName == 'SPAN'  && _ev.target.id == 'downRegNum') || (_ev.target.tagName == 'I'  && _ev.target.parentElement.id == 'downRegNum') :
					$scope.$apply($scope.UniPopup.popupShow('RegNum','true' ));
				break;
				
				case(_ev.target.tagName == 'SPAN'  && _ev.target.id == 'downName') || (_ev.target.tagName == 'I'  && _ev.target.parentElement.id == 'downName') :
					$scope.$apply($scope.UniPopup.popupShow('Name','true' ));
				break;
				/*---------------------------------------------focus-------------------------------------------------------*/
				case(_ev.target.tagName == 'SPAN'  && _ev.target.id == 'focusRegNum') || (_ev.target.tagName == 'I'  && _ev.target.parentElement.id == 'focusRegNum') :
					if (	document.getElementById("txtRegNum").hasAttribute("readonly")	)  {
						document.getElementById("txtRegNum").removeAttribute("readonly");
						//elem = document.getElementById("txtRegNum");   
						//elem.removeAttribute("readonly");
						setTimeout(function () {
							document.getElementById("txtRegNum").focus();
							//elem.focus();
						}
						, 500);	
					}
				break;
				
				case(_ev.target.tagName == 'SPAN'  && _ev.target.id == 'focusName') || (_ev.target.tagName == 'I'  && _ev.target.parentElement.id == 'focusName') :
					if (	document.getElementById("txtName").hasAttribute("readonly")	)  {
						document.getElementById("txtName").removeAttribute("readonly");
						setTimeout(function () {
							document.getElementById("txtName").focus();
						}
						, 500);		
					}
				break;
				
/*				
				case  _ev.target.tagName == 'INPUT'  && _ev.target.id == 'txtBrand' :	
					//$scope.UniPopup.popupShow('Brand','true' );
					$scope.$apply($scope.UniPopup.popupShow('Brand','true' )); 
				break;
				
				case  _ev.target.tagName == 'INPUT'  && _ev.target.id == 'txtModel' :
					//$scope.UniPopup.popupShow('Model','true');
					$scope.$apply($scope.UniPopup.popupShow('Model','true' ));
				break;
				
				case  _ev.target.tagName == 'INPUT'  && _ev.target.id == 'txtRegNum' :	
					//$scope.UniPopup.popupShow('RegNum','true');
					$scope.$apply($scope.UniPopup.popupShow('RegNum','true' ));
				break;
				
				case  _ev.target.tagName == 'INPUT'  && _ev.target.id == 'txtName' :	
					//$scope.UniPopup.popupShow('Name','true');
					$scope.$apply($scope.UniPopup.popupShow('Name','true' ));
				break;
				
				
				case  _ev.target.tagName == 'TD'  && _ev.target.className.indexOf('tgCell') == 0 :	
					item['Name'] = _ev.target.textContent;
					$scope.$apply($scope.selectedItem(item)); 
				break;
*/				
				
				case  (_ev.target.tagName == 'BUTTON'  && _ev.target.id.substr(0,4) == 'btni') || (_ev.target.tagName == 'I'  && _ev.target.className.indexOf('fa-power-off') >= 0) :	
					id = _ev.target.tagName == 'BUTTON'  ? _ev.target.id
							: _ev.target.tagName == 'I'	 ? 	_ev.target.parentElement.id
								: '';
					if (id)	{
						//document.getElementById(id).setAttribute("style", "background-color:lightsalmon;border:0;");
						console.log("--mc.on   sid:'%s'   innerHTML:'%s'",id,document.getElementById(id).innerHTML );
						document.getElementById(id).disabled = true; 
						//document.getElementById(id).parentElement.setAttribute("style", "background-color:lightsalmon;"); 
						document.getElementById(id).innerHTML = '&nbsp;&nbsp;&nbsp;<i class="fa fa-check"></i>&nbsp;&nbsp;&nbsp;'; 
						
						//console.log("--mc.on   sid:'%s'   innerHTML:'%s'",id,document.getElementById(id).innerHTML );
						id = 'txt' + id.substr(4);		 
						popup_selected_value =	document.getElementById(id).textContent;	console.log("--mc.on   sid:'%s'   popup_selected_value:'%s'",id,popup_selected_value );
						document.getElementById(id).setAttribute("style", "background-color:steelblue;color:#fff;font-weight:600;"); //lightsalmon
						setTimeout(function () {
							item['Name'] = popup_selected_value;//_ev.target.textContent;
							
							$scope.$apply($scope.selectedItem(item)); 
						}
						, 500);		
					}
				break;
					
				}
				//if (UniWebClient.isMes  && $scope.mestext.length == 0)	{ 	$scope.$apply($scope.mesPost(UniWebClient.getMes())); }
		}																																																						
	});
	
/*-----------------------------------------------------------------------------------------------------*/	
	
	
	$scope.displayMode = 'params';								// 	'params' or 'rezult'
	$scope.newWinWidth = $window.innerWidth;
	$scope.currentUrl = 'params/sm-paramsView.html';				// Url for current view for transient animation	
	setTimeout(function () {
		$scope.$apply($scope.selectMode('params1'));
	}, 
	1200);	
	
	
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
			
			case  newValues[0] < 768 &&  (newValues[1] == 'params' || newValues[1] == 'params1'):
				if ( !!document.getElementById('labRegNum'))	{
					document.getElementById('labRegNum').innerHTML = 'Рег. номер:';	
				}
				$scope.currentUrl = 'params/sm-paramsView.html';
			break;
			
			case  newValues[0] >= 768 &&  (newValues[1] == 'params' || newValues[1] == 'params1') :
				if ( !!document.getElementById('labRegNum'))	{
					if ( newValues[0] < 1004) {
						document.getElementById('labRegNum').innerHTML = 'Номер:'; 
					}
						else	{
							document.getElementById('labRegNum').innerHTML = 'Рег. номер:';
						}
				}
				$scope.currentUrl = 'params/sm-paramsView.html';
			break;
			
			case newValues[0] < 768 &&  newValues[1] == 'paramsinfo':
				$scope.currentUrl = 'params/paramsinfo/sm-paramsinfo.html';
			break;
			
			case newValues[0] >= 768 &&  newValues[1] == 'paramsinfo':
				$scope.currentUrl = 'params/paramsinfo/md-paramsinfo.html';
			break;
		}
		console.log("<----$watch   currentUrl:'%s'", $scope.currentUrl );
	});		
	
	$scope.selectMode = function (button, cb)	{
		//console.log("selectMode: -----button:'%s'---->",button);   //$scope.displayMode:   'params' 	'rezult'	'paramsinfo'
		pub.itracer("==>selectMode:     button:'%s' ",button);   //$scope.displayMode:   'params' 	'rezult'	'paramsinfo'
		switch(button)  	{
			
			case 'rezult':   
				$scope.loadDBInfo();	//	for  $scope.displayMode = 'rezult';   see $scope.$watch('ajaxSuccess', .....   
			break;
			
			case 'show-rezult':   
				$scope.displayMode = 'rezult';	    
			break;
			
			case 'params':            
				$scope.displayMode = 'params';
				$scope.from = null;		// 	закрыть любое открытое выпадающее окно
			break;
			
			case 'params1':            
				$scope.displayMode = 'params1';
				$scope.from = null;		// 	закрыть любое открытое выпадающее окно
			break;
			
			case 'show-paramsinfo':
				$scope.displayMode = 'paramsinfo';
			break;
			
			case 'hide-paramsinfo':
				$scope.displayMode = 'params';
			break;
		}
		//console.log("selectMode:     $scope.displayMode:'%s'",$scope.displayMode);
		pub.itracer("<==selectMode:      $scope.displayMode:'%s'",$scope.displayMode);
	};
	
	angular.element($window).bind('resize',function(){
		$scope.$apply(function(){
			$scope.newWinWidth = $window.outerWidth;
		})
	});
	
	$scope.Brand = [];
	$scope.Model = [];
	$scope.RegNum = [];
	$scope.Name = [];

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
		pub.itracer("==>$scope.$watch:  $scope.curRegNum.Name='%s'",newValue);
		if (newValue != undefined) {
			if ($scope._scope.from = 'RegNum') {
				console.log("$scope.$watch:  $scope.curRegNum.Name='%s'",newValue);
				$scope.arrayname = [];
				$scope.UniPopup.popupShow('RegNum',true);
			}
			$scope.loadCount();
		}
	});
	
	$scope.$watch('curName.Name', function (newValue) {
		pub.itracer("==>$scope.$watch:  $scope.curName.Name='%s'",newValue);
		if (newValue != undefined) {
			if ($scope._scope.from = 'Name') {
				console.log("$scope.$watch:  $scope.curName.Name='%s'",newValue);
				$scope.arrayname = [];
				$scope.UniPopup.popupShow('Name',true);
			}
			$scope.loadCount();
		}
	});
	
	$scope.$watch('ajaxSuccess', function (newValue) {
		pub.itracer("==>$scope.$watch:    $scope.ajaxSuccess='%s'",newValue);  //$scope.ajaxSuccess
		console.log("--scope.$watch:    $scope.ajaxSuccess='%s'",newValue);  //$scope.ajaxSuccess
		var mstext;
		switch(newValue)
		{
			case "Count.load.OK": 
				console.log("--scope.$watch:   $scope.Count[0]['affected_rows']='%s'---->",$scope.Count[0]['affected_rows']);
				mstext = (  parseInt( $scope.Count[0]['affected_rows']) )? 'найдено {1} зап.'.Format( $scope.Count[0]['affected_rows']):'не найдено НИ ОДНОЙ записи';
				$scope.mesPost(mstext);
				pub.notifier(mstext);
			break;
		
			case "smDBInfo.load.OK": 
				mstext = ($scope.smDBInfo.length>0)? 'успешно загружено {1} зап.'.Format( $scope.smDBInfo.length) : '';//:'не загружено НИ ОДНОЙ записи';
				//mstext = ($scope.smDBInfo.length>0)? 'успешно загружено {1} зап.'.Format( $scope.smDBInfo.length):'не загружено НИ ОДНОЙ записи';
				if (mstext) {
					//if ($scope.mestext.EndsWith('...')) $scope.mesAdd('<br>' + mstext);
					//else $scope.mesPost(mstext);
					$scope.mesPost(mstext);
					pub.notifier(mstext);
					$scope.DBInfo = $scope.ToArrayByGroup($scope,'smDBInfo','Name','Use');	//if ($scope.newWinWidth >= 768) 
					$scope.selectMode('show-rezult');	
				}		else 	{	pub.itracer("--$scope.$watch('ajaxSuccess'):    $scope.smDBInfo.length:0");	}
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
		$scope['ajaxSuccess'] = '';
});
		
	//$scope.clearArr()  = function() {
				//console.log("==>clearArr");
				//$scope.arrayname = [];
	//};

	
	$scope.loadDBInfo = function () {
		pub.itracer("==>loadDBInfo");
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
		pub.itracer("==>loadCount");
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
		pub.itracer("==>loadName");
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
		pub.itracer("==>loadRegNum");
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
		pub.itracer("==>loadBrand");
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
		pub.itracer("==>loadModel",$scope.curBrand.Name);
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
		pub.itracer("==>selectedItem:  from:'%s'  popupValue:'%s'",$scope.from,item['Name']); 
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
	
	$scope.unselectBrand = function() 	{		pub.itracer("==>unselectBrand");
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
	
	$scope.unselectModel = function() 	{		pub.itracer("==>unselectModel");
				angular.element(document.getElementById('txtModel')).val('');				
				$scope.curModel ={};
				$scope.Model = [];
				$scope.RegNum = [];
				$scope.UniPopup.closeAnyOpenPopup()
				$scope.loadCount();
	};
	
	$scope.unselectRegNum = function() 	{		pub.itracer("==>unselectRegNum");
				angular.element(document.getElementById('txtRegNum')).val('');				
				$scope.curRegNum ={};
				$scope.RegNum = [];	
				$scope.UniPopup.closeAnyOpenPopup()
				$scope.loadCount();
	};
	
	$scope.unselectName = function() 	{		pub.itracer("==>unselectName");
				angular.element(document.getElementById('txtName')).val('');				
				$scope.curName ={};
				$scope.Name = [];
				$scope.UniPopup.closeAnyOpenPopup()
				$scope.loadCount();
	};
	
//	$scope.displayMode = 'params';
	$scope.UniPopup.setChildScope($scope);
		

}]);
