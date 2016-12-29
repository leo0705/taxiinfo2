/*! 	
 * 	jMain.js - taxiinfo application (main)
 *  Copyriqht (C) 2013-2016  Leonid L.Voitenko All Rights Reserved  http://www.inet-apps.ru/                          
 */
angular.module("TaxiInfoApp", [ 'ngAnimate','UniClientBase']) 
.controller("mainCtrl",['$scope', '$http', '$timeout', '$window', 'UNIURL', 'UniWebClient', 'UniDic',   function ($scope, $http, $timeout, $window, UNIURL, UniWebClient, UniDic) {// , UniWebClient,"ngCommonCtrl"
	setTimeout(function () {
			pub.notifier('дата сборки: 29-12-2016 11:43');
		}
		, 800);		
	setTimeout(function () {
			$scope.loadCount();
		}
		, 2800);		
	var	rootviewElement = document.getElementById('rootview')
	,	mc = new Hammer(rootviewElement)
	, 	popup_selected_value = ''	//    popup list selected value for Brand,Model,...
	;

	// listen to mouse & touch  events...   'div.container'
	mc.on("hammer.input", function(_ev) {
		if (!_ev.isFirst) return;
		var item = {}
		, 	id = ''
		,	anim_player = null
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
				
				case (_ev.target.tagName == 'A' && _ev.target.id == 'arrow-up') || (_ev.target.tagName == 'I'  && _ev.target.className.indexOf('fa-arrow-up') >= 0) :
					$(window).scrollTop(0);
				break;
				
				case (_ev.target.tagName == 'SPAN' && _ev.target.id == 'show-paramsinfo') || (_ev.target.tagName == 'I'  && _ev.target.className.indexOf('fa-question') >= 0) :
					$scope.$apply($scope.selectMode('show-paramsinfo'));
				break;
				
				case (_ev.target.tagName == 'SPAN'  && _ev.target.id == 'hide-paramsinfo') || (_ev.target.tagName == 'I'  && _ev.target.className.indexOf('fa-close') >= 0) :
					$scope.$apply($scope.selectMode('hide-paramsinfo'));
				break;
				/*--------------------------------------------show/hide popup element with CSS3 animation----------------------*/
				case  (_ev.target.tagName == 'BUTTON'  && _ev.target.id == 'confirm-go') :
					/*
					elem = document.querySelector("div.confirm");
					anim_player = cssAnimate.zoomOut(elem, 1);
					anim_player.onfinish = function(e) {	// e.isTrusted = "true"
						elem.style.display = 'none';
					};
					*/
					elem = document.querySelector("div.confirm");
					anim_player = cssAnimate.pulse(elem, 1);
					anim_player.onfinish = function(e) {	// e.isTrusted = "true"
						anim_player = cssAnimate.zoomOut(elem, 1);
						anim_player.onfinish = function(e) {	// e.isTrusted = "true"
							elem.style.display = 'none';
						};
					};
								//var re = new RegExp("\\{topValue\\}", "g");
					$scope.params.sqlText = $scope.params.sqlText.replace(new RegExp("\\{topValue\\}", "g"), $scope.topValue);
					console.log("--mc.on:   _ev.target.id:'%s'	sqlText:'%s'",_ev.target.id,$scope.params.sqlText.substr(0,32)); 
					
					$scope.$apply($scope.send($scope,$scope.params,$scope.opts,$scope.config));
				break;
					
				case  (_ev.target.tagName == 'BUTTON'  && _ev.target.id == 'confirm-stop') :
					elem = document.querySelector("div.confirm");
					anim_player = cssAnimate.zoomOut(elem, 1);
					anim_player.onfinish = function(e) {	// e.isTrusted = "true"
						elem.style.display = 'none';
					};
					//document.querySelector("div.confirm").style.display = 'none';
					console.log("--mc.on:   _ev.target.id:'%s'",_ev.target.id); 
				break;
				/*--------------------------------------------change the mode: "set params" <==> "show rezults"----------------*/
				case  (_ev.target.tagName == 'BUTTON'  && _ev.target.id == 'btnReply') || (_ev.target.tagName == 'I'  && _ev.target.className.indexOf('fa-car') >= 0)  :	
					$scope.$apply($scope.selectMode('rezult'));
				break;
				
				case  _ev.target.tagName == 'BUTTON'  && _ev.target.id == 'btnParams' :			
					$scope.$apply($scope.selectMode('params'));
				break;
				/*--------------------------------------------unselect the field value-----------------------------------------*/
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
				/*---------------------------------------------open a popdown list----------------------------------------------*/
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
				/*------------------------------------open a field for keyboard input---------------------------------------------*/
				
				case(_ev.target.tagName == 'SPAN'  && _ev.target.id == 'focusRegNum') || (_ev.target.tagName == 'I'  && _ev.target.parentElement.id == 'focusRegNum') :
					elem = document.getElementById("txtRegNum");
					if ( elem.hasAttribute("readonly")	)  {
						setTimeout(function () {
							elem.removeAttribute("readonly");							
						}
						, 0);		
						setTimeout(function () {
							elem.focus();
						}
						, 0);		
					}  
				break;
				
				case(_ev.target.tagName == 'SPAN'  && _ev.target.id == 'focusName') || (_ev.target.tagName == 'I'  && _ev.target.parentElement.id == 'focusName') :
					elem = document.getElementById("txtName");
					if ( elem.hasAttribute("readonly")	)  {
						setTimeout(function () {
							elem.removeAttribute("readonly");							
						}
						, 0);		
						setTimeout(function () {
							elem.focus();
						}
						, 0);		
					}  
				break;
						/*---------------------------s election from popdown list --------------------------------------------*/	
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
		}																																																						
	});
	
/*-----------------------------------------------------------------------------------------------------*/	
	
	
	$scope.displayMode = 'params';								// 	'params' or 'rezult'
	$scope.newWinWidth = $window.innerWidth;
	$scope.currentUrl = 'params/sm-paramsView.html';				// Url for current view for transient animation	
	
	$scope.params = null;									//  used in send() if user don't set any param values
	$scope.opts = null;										//
	$scope.config = null;									//
	
	$scope.topValue = 1000;			// Number top DB records returned query no params with: 1000, 500, 255, 100
	
	setTimeout(function () {
		$scope.$apply($scope.selectMode('params1'));
	}, 
	1200);	
	
	$scope.well1_style = {};	//		params/paramsinfo/md-paramsinfo.html 	<div class="well"  ng-style="well1_style">
	$scope.well2_style = {};	//		params/paramsinfo/md-paramsinfo.html 	<div class="well"  ng-style="well2_style">
	$scope.panelconfirm_style = {width:'340px'};	//	params/sm-paramsView.html 	<div  class="panel confirm" ng-style="panelconfirm_style">
													
	
	
	
	
	
	$scope.$watchGroup(['newWinWidth', 'displayMode'], function(newValues, oldValues, scope) {
	console.log("---->$watch   	new-newWinWidth:'%s' old-newWinWidth:'%s'   new-displayMode:'%s'   old-displayMode:'%s' ",
								newValues[0],		 oldValues[0],          newValues[1],			oldValues[1] );
		var hi1	=	0	//	$scope.well1_style = {height: hi1 + 'px'};		
		,	hi2	=	0	//	$scope.well2_style = {height: hi2 + 'px'};
		,	elfrom = document.querySelector("input#txtName")
		,	wifrom = 0
		,	elto   = document.querySelector("div.confirm")
		,	wito   = 0	
		,	posfrom = null
		;
		
		//	 Number top DB records returned query no params with: 1000, 500, 255, 100
		if	(newValues[0] < 480 ) {  
			$scope.topValue = 100;  
		} else if (newValues[0] < 768) {
			$scope.topValue = 255; 
		} else if (newValues[0] < 991) {
			$scope.topValue = 500;
		} else {  
			$scope.topValue = 1000; 
		}
		console.log("--$watch   topValue:'%s'", $scope.topValue );
		
		// adjust popup element
		if (elfrom && elto) {
			$scope.setPopupText();
			//document.getElementById("paramstitle").addEventListener("click", function(){
			//	var i =	this.isContentEditable ;
			//});					
			
			// center element elto relatively elfrom 
			wifrom = elfrom.offsetWidth;		
			//wito   = elto.offsetWidth;			console.log("--$watch   elto.offsetWidth:'%s'", elto.offsetWidth );	
			posfrom = $scope.UniPopup.getViewportOffset(elfrom);	// returns { left: left, top: top }
												//console.log("--$watch   elfrom.left:'%s'", posfrom.left );	
												console.log("--$watch   elto.attr-style:'%s'", elto.getAttribute("style") );
			wito   = Number.parseInt($scope.UniPopup.getCssValue(elto.getAttribute('style'), 'width'));
												console.log("--$watch   wito:'%s'", wito );
			$scope.panelconfirm_style['left'] = posfrom.left + (wifrom - wito)/2 + 'px';
			
			console.log("--$watch   elto.style.left:'%s'  	wito:'%s'  	posfrom.left:'%s'  	wifrom:'%s'",
										elto.style.left,	wito,		posfrom.left,		wifrom);
		}
		
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
				if	(newValues[0] <= 1001 ) {  
					hi1 = 940; hi2 = 390;  
				} else if (newValues[0] <= 1210) 	{  
					hi1 = 794; hi2 = 312;  
				} else if (newValues[0] > 1210 ) 	{  
					hi1 = 724; hi2 = 282;
				} 
				$scope.well1_style = {height: hi1 + 'px'};
				$scope.well2_style = {height: hi2 + 'px'};
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
	
	$scope.panelconfirm = {};			//	ng-style="panelconfirm"
	
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
					setTimeout(function () {
						$scope.mesPost(mstext);
						pub.notifier(mstext);
						}
						, 2800);		
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
		
	$scope.setPopupText = function () {
		console.log("==>setPopupText   $scope.topValue:'%s'", $scope.topValue );
		document.querySelector("div.confirm  div.panel-body p")
		.innerHTML = ('Вы не задали никаких параметров поиска, поэтому из БД будут загружены первые {1} записей.'
		.Format($scope.topValue));
	};
	
	$scope.loadDBInfo = function () {
		pub.itracer("==>loadDBInfo");
		var opts = {
			eventname:	'smDBInfo.load.OK',
			colnames: 	'colnames', 
			arrayname: 	'smDBInfo' 	
		}
		, 	sWhere = $scope.UniPopup.getUniWhere($scope, $scope.whereparam)
		//, 	sTop = (sWhere) ? '' : 	$scope.$eval('top ' + $scope.topValue)_ 					
		, 	sTop = (sWhere) ? '' : 	'top ' + '{topValue}' 					
				//  for mySql:  ,	sTop = (sWhere)?'':' limit 1000';		console.log("sTop='%s'",sTop)
				//				, 	sqlTempl = "select CONCAT(Name,' (',OgrnNum,' / ',OgrnDate,')' ) as Name,Brand,Model,RegNum,Year,LicenseNum,LicenseDate,BlankNum  from `inet-19_guestinfo`.`TaxiInfo` {2} order by Name asc{1}"
		, 	sqlTempl = "select {1} Name + '   ( ' + OgrnNum + ' / ' + OgrnDate + ' )' as Name,Brand,Model,RegNum,Year,LicenseNum,LicenseDate,BlankNum  from [inet-19_guestinfo].[inet-19_student].TaxiInfo {2} order by Name asc"
		, 	params = {
				Vrwtrace: "True",
				EntryPointName: "DBTableViewer",
				ConKey: "guestinfo",
				mode: 'SP', 
				sqlText: sqlTempl.Format(sTop,sWhere)	
		}
		, 	config = {url: UNIURL}
		,	elfrom = document.querySelector("input#txtName")
		,	wifrom = elfrom.offsetWidth	
		,	elto   = document.querySelector("div.confirm")
		,	wito   = elto.style.cssText			//elto.offsetWidth
		//,
		,	posfrom = null
		,	anim_player = null
		;
		console.log("--loadDBInfo sTop='%s'",sTop);
		if (sTop) 	{		//$scope.mesPost('Вы не задали параметров поиска, из БД будут загружены первые 1000 записей ...');
			$scope.params = params;
			$scope.opts = opts;
			$scope.config = config;
			
			// отцентрировать popup элемент elto относительно elfrom и показать
			posfrom = $scope.UniPopup.getViewportOffset(elfrom);	// returns { left: left, top: top }
												//console.log("--loadDBInfo   elfrom.left:'%s'", posfrom.left );	
												//console.log("--loadDBInfo   elto.attr-style:'%s'", elto.getAttribute("style") );
			$scope.setPopupText();
			wito   = Number.parseInt($scope.UniPopup.getCssValue(elto.getAttribute('style'), 'width'));												//console.log("--loadDBInfo   wito:'%s'", wito );
			elto.style.left = posfrom.left + (wifrom - wito)/2 + 'px';
			
						//elto = document.querySelector("div.confirm");
						//elto.style.display = 'block';
				//elto.style.display = 'block';
				//window.zoomIn(elto, 1);		// animate show
			elto.style.display = 'block';	
			anim_player = cssAnimate.zoomIn(elto, 1);
			console.log("--loadDBInfo   elto.style.left:'%s'  	wito:'%s'  	posfrom.left:'%s'  	wifrom:'%s'",
										elto.style.left,		wito,		posfrom.left,		wifrom);
			return;
		}
		$scope.send($scope,params,opts,config);
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
