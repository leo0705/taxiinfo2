/*! 	
 * 	jUniClientBase.js - taxiinfo application (AngularJS base code)
 *  Copyriqht (C) 2013-2015  Leonid L.Voitenko All Rights Reserved  http://www.inet-apps.ru/                          
 *	version: 1.12 (2015-03-18)
 */
angular.module("UniClientBase", [])
	//.constant("UNIURL", "http://localhost/site/www/Engine/PHP/SimplQueryEngineJS.php")
	//.constant("UNIURL", "../../SimplQueryEngineJS.ashx")
	.constant("UNIURL", "http://localhost:3000/Engine")
	.factory("UniWebClient", function () {							// --------------------UniWebClient	
/*
/////////////////////////////////////////////////////////////////////////////Math 
Методы:                                   
Math.abs
Math.acos
Math.asin
Math.atan
Math.atan2
Math.exp
Math.min
Math.random
Math.sqrt
Math.log
Math.round
Math.floor
Math.ceil
Math.sin
Math.cos
Math.tan
Math.pow
Math.max

Свойства:
Math.E
Math.LN2
Math.LOG2E
Math.LOG10E
Math.PI
Math.SQRT12
Math.SQRT2
Math.LN10
/////////////////////////////////////////////////////////////////////////// String 
// стандартные методы:
// 		s.length		get the number of characters in the string
//		s.toUpperCase()
//		s.toLowerCase()
//		s.indexOf('string to look for')   returns 0,1,2,...   or -1 (not found)
//		s.lastIndexOf('string to look for')
//		s.slice(0,5)  		первые 5 символов (позиции 0 - 4)
//		s.slice(-5)			последние 5 символов (отсчет позиций от конца строки назад: -1,-2,...)
//		s.slice(-6,-1)  	последние 5 символов, начиная с предпоследнего    
// добавленные методы: 
//      s.Contains(s2)			Returns a value indicating whether the specified substring occurs within this string  
//      s.EndsWith(s2)			Определяет, совпадает ли конец данного экземпляра строки с указанной строкой
//      s.StartsWith(s2)		Определяет, совпадает ли начало данного экземпляра строки с указанной строкой
//      s.TrimStart(s2)			Удаляет указанную подстроку, если она находится  в начале строки
//      s.TrimEnd(s2)			Удаляет указанную подстроку, если она находится  в конце строки
//      s.Trim()				removes white spaces from the beginning and end of a string
//      s.Count(s2)				counts how many times one string occurs within another
//      s.IsEmailAddress(s2)	Returns a value indicating whether the specified string is a valid email address
//      s.ToDate(datestring)	Возвращает объект datetime, построенный по символьной строке
//		s.Format				Aналог функции С sprinf: подставляет в строку значения произвольного числа указанных параметров (либо массив)
//
// аналог Format:
// var value = "INSERT INTO {1} ({2}) VALUES ({3})";  
// value = value.replace(/\{1\}/g, opt.tableId)
// 				.replace(/\{2\}/g, colnamelist.substring(1))
// 				.replace(/\{3\}/g, colvaluelist.substring(1));
// console.log(value);  // logs  INSERT INTO buying (buy_id,brand,model,buydate) VALUES (0,'','','0000-00-00')
//
//var s = '123456789abcdef'; console.log(s.slice(-6,-1)); 	//logs abcde
//var s = '123456789abcdef'; console.log(s.slice(-5)); 		//logs bcdef
//var s = '123456789abcdef'; console.log(s.slice(-"abcdef".length)); 		//logs abcdef
//
// var s = '123456789abcdef';
// for (var item in s) {
// console.log("item: '%s'",s[item]);
// }
//
// 		var age = '20 years';
// 		age = parseInt(age,10); //20//
*/
	//	Format - аналог функции С sprinf: подставляет в строку значения произвольного числа указанных параметров (либо массив)
	String.prototype.Format = function () { 
		//console.log("Format:--'%s'-->",this);
		var rezult = this;
		for (var i = 0; i < arguments.length; i++) 
		{
			var re = new RegExp("\\{" + (i+1) +"\\}", "g");
			//console.log("re='%s' ",re);
			rezult = rezult.replace(re, arguments[i]);
		}
		return rezult; 
	};
	//var f20 = "--{1}--{2}--{3}--".Format("джентельмены", "предпочитают", "блондинок");
	//console.log("f20: '%s'",f20);  // logs f20: '--джентельмены--предпочитают--блондинок--'
 
	//  Contains - Returns a value indicating whether the specified substring occurs within this string
	String.prototype.Contains = function(s2) { return (this.indexOf(s2)>0)?true:false; };
	//var t20 = "      джентельмены предпочитают блондинок     "; console.log(t20.Contains(' блондинок'));  // logs true

	// EndsWith - Определяет, совпадает ли конец данного экземпляра строки с указанной строкой
	String.prototype.EndsWith = function(s2) { return (this.indexOf(s2)+s2.length==this.length)?true:false; };
	//var t20 = "джентельмены предпочитают блондинок"; console.log(t20.Contains(' блондинок'));

	// startsWith - Определяет, совпадает ли начало данного экземпляра строки с указанной строкой
	String.prototype.StartsWith = function(s2) { return (this.indexOf(s2)==0)?true:false; };
	//var t20 = "джентельмены предпочитают блондинок"; console.log(t20.StartsWith("StartsWith:'%s'",'джентельмены'));

	// TrimStart - Удаляет указанную подстроку, если она находится  в начале строки
	String.prototype.TrimStart = function(s2) { return  (this.StartsWith(s2))?this.slice(s2.length) :this};
	//var t20 = "джентельмены предпочитают блондинок"; console.log("TrimStart:'%s'",t20.TrimStart('джентельмены '));

	// TrimEnd - Удаляет указанную подстроку, если она находится  в конце строки
	String.prototype.TrimEnd = function(s2) { return  (this.EndsWith(s2))?this.slice(0,this.length-(s2.length)) :this};
	//var t20 = "джентельмены предпочитают блондинок"; console.log("TrimEnd:'%s'",t20.TrimEnd(' блондинок'));

	// Trim - removes white spaces from the beginning and end of a string
	String.prototype.Trim = function() { return this.replace(/^\s+|\s+$/g, ""); };
	//var t20 = "      джентельмены предпочитают блондинок     "; console.log(t20.Trim());

	
        return {
		                        //   mySQL field flags:
NOT_NULL_FLAG 		: 1, 		// Field can't be NULL
PRI_KEY_FLAG		: 2, 		// Field is part of a primary key
UNIQUE_KEY_FLAG 	: 4, 		// Field is part of a unique key0100
MULTIPLE_KEY_FLAG 	: 8, 		// Field is part of a key
BLOB_FLAG 			: 16,     	// Field is a blob  or text
UNSIGNED_FLAG 		: 32, 		// Field is unsigned
ZEROFILL_FLAG 		: 64, 		// Field is zerofill
BINARY_FLAG 		: 128, 		// Field is an enum
ENUM_FLAG 			: 256, 		// Field is a enum field
AUTO_INCREMENT_FLAG : 512, 		// Field is a autoincrement field
TIMESTAMP_FLAG 		: 1024, 	// Field is a timestamp
table_col_names: [],
		
addPostParam : function (sParams, sParamName, sParamValue) {
	if (sParams.length > 0) {sParams += "&";}
	return sParams + encodeURIComponent(sParamName) +  "=" + encodeURIComponent(sParamValue);
},

toPostParams : function (objParams) {
//  objParams ===>  sParams: "mode=SP&ConKey=guestinfo&sqlText=select * from `world`.city limit 0,30"
	console.log("toPostParams:------->");
	var sParams = '';
	angular.forEach(objParams, function (value, key) {
		if (sParams.length > 0) {sParams += "&";}
		sParams += encodeURIComponent(key) +  "=" + encodeURIComponent(value);//console.log(toPostParams:  "Name: " + key + " Value: " + value);
	});
	console.log("toPostParams:<---'%s'----", sParams);
	return sParams;
},
	
toCsv: function (obj, sDelimF, sDelimL) {
	console.log("tosv:--- sDelimF:'%s'-----sDelimL:'%s'------>", sDelimF, sDelimL);
  var csvKey = sDelimL;
  var csvValue = sDelimL;
  for (prop in obj) {
	csvKey += sDelimF + '@' + prop;
	csvValue += sDelimF + obj[prop];
  }
  return csvKey + csvValue;
},

Csv2ArrayRows : function (sCsv) {
	console.log("Csv2ArrayRows:---sCsv.charAt(0):'%s'---sCsv.charAt(1):'%s'--->",sCsv.charAt(0),sCsv.charAt(1));
   if (sCsv.charAt(0)==sCsv.charAt(1)) 
    {                         // разделитель строк 2 символа:   sCsv = "???brand?model?selldate??? ? ? ????????????????????????";
        //console.log("Csv2ArrayRows:разделитель строк 2 символа");
		return sCsv.substring(2).split(sCsv.substring(0, 2)); 
    }
    else 
    {                         // разделитель строк 1 символ:    sCsv = "??brand?model?selldate?? ? ? ?????????????????????";
        //console.log("Csv2ArrayRows:разделитель строк 1 символ");
		return sCsv.substring(1).split(sCsv.substring(0, 1));
    }
	
},
  
Csv2ArrayFields : function (sRowCsv) {
		//console.log("Csv2ArrayFields:---sRowCsv:'%s'---->", sRowCsv);
		return sRowCsv.substring(1).split(sRowCsv.substring(0, 1));
},
  
addDefualts : function (objExt,objDefualt) {
		console.log("addDefualts:----->");
		angular.forEach(objDefualt, function (value, key) {
			if ( !(key in objExt) )  objExt[key] = value;
			console.log("addDefualts: objExt." + key + " = '" + objExt[key] +"'");
		})
},

csvToJson : function (sCsv) {		//sCsv.substr(4)
	//if (sCsv.indexOf('&quot;')>0)  sCsv = sCsv.replace(/&quot;/g, '\"');	//  14.12.2014
	var ArrayRows = this.Csv2ArrayRows(sCsv);              		console.log("csvToJson: ArrayRows.length:'%s'---->", ArrayRows.length);
	this.table_col_names = this.Csv2ArrayFields(ArrayRows[0]);  	console.log("csvToJson: this.table_col_names:'%s'---->", this.table_col_names.length);// DB field names
	var item,               // obj ~ row  (DB record)
		rezult = [],    	// array of items
		i,   				// cur item index            1<= i < ArrayColTitles.length 
		j;  				// cur item prop index       0<= j < ArrayColTitles.length  	
	
	for (i = 1; i < ArrayRows.length; i++) {
	  new_item = {};
	  var ArrayPropValues = this.Csv2ArrayFields(ArrayRows[i]);
	  for (j = 0; j < ArrayPropValues.length; j++) {
		new_item[this.table_col_names[j]] = ArrayPropValues[j];  
		//console.log("csvToJson:   i:'%s'  j:'%s'  name:'%s'  value:'%s'  ",i,j, this.table_col_names[j],  ArrayPropValues[j]);
	  }
	  rezult.push(new_item);
	}
	return rezult;
},
        };
    })
    .factory("UniDic", function () {								// --------------------UniDic
        return {
en2ru : function (input, objDict) {	//	UniDic.en2ru
   	//var input = (inputsp.EndsWith(' '))?inputsp.Trim():inputsp;						
	//console.log("en2ru: ----input:'%s'---->",input);
	var output = input;
	for (var prop in objDict) {
		//console.log("prop:'%s'   input:'%s' objDict[prop]:'%s'",prop,input,objDict[prop]);
		if (input == prop  && objDict[prop] != '???') {
		//if (input.StartsWith(prop) && objDict[prop] != '???') {
			output = objDict[prop];
			break;
		}
	}
	if (output == input) console.log('"%s":"???",',input);
	//console.log("'en2ru: <---output:'%s'------'",output);
	return output;
},
		
colname : {							//	UniDic.colname continent
	ID: "БД инд.",
	Name: "Город",
	CountryCode: "Код страны",
	District: "Регион страны",
	Population: "Население"
},

		};
    })
	.directive("contenteditable", function() {						// --------------------contenteditable
	 return {
		 restrict: "A",
		 require: "ngModel",
		 link: function(scope, element, attrs, ngModel) {

				 function read() {
				 ngModel.$setViewValue(element.html());
				 }

				 ngModel.$render = function() {
				 element.html(ngModel.$viewValue || "");
				 };

				 element.bind("blur keyup change", function() {
				 scope.$apply(read);
				 });
			 }//link
		 };
	})
	.directive("unipopupbtn", function (UniWebClient) { //Table 16-2. The Properties Defined by Directive Definition Objects p.415
		//   <div unipopupbtn="City" placeholder="Город" size="32"  clearimgsrc ="../../images/clear12button.PNG"></div>
		//   <img id="btnClearText" class="imgToolbarNorm" src="/images/clear12button.PNG"  width="12"  height="12" title="удалить комментируемый текст" alt=""/>
	return {
			restrict: "A",
			replace: true,
			template: function (element, attrs) {
						var arrname = attrs["unipopupbtn"];
						var clearimgsrc = attrs["clearimgsrc"]||'';												 
						var clearimghtml = (clearimgsrc.length>0)?'<img id="img' + arrname + '" class="imgToolbarNorm unipopupbtn" src="' + clearimgsrc + '"  width="12"  height="12" title="очистить поле (сбросить введенное значение параметра запроса)" alt="" ng-click="unselect' + arrname + '()" ng-mouseenter="btnToolbarNorm.handleEvent($event)" ng-mouseleave="btnToolbarNorm.handleEvent($event)" />' : '';
						var placehld = attrs["placeholder"];
						var title = attrs["title"] || '';
						var titlehtml = (title.length>0)?' title="' + title + '" ' : '';
						var sz = attrs["size"] || '32';
						var model = attrs["model"] || 'cur'+arrname+'.Name';					//console.log("***unipopupkey error: не задан параметр:'%s'",'model');
						var tmp = '<div><input id="txt{1}" type="text" class="unipopupbtn" placeholder="{2}" size="{3}" ng-model="{4}" readonly="true"/><input type="button" id="btn{1}" class="btnPopup" {6}  ng-click="UniPopup.handleEvent($event)" ng-mouseenter="UniPopup.handleEvent($event)" ng-mouseleave="UniPopup.handleEvent($event)"  ng-mousedown="UniPopup.handleEvent($event)" ng-mouseup="UniPopup.handleEvent($event)"/>{5}</div>';
						tmp = tmp.Format(arrname,placehld,sz,model,clearimghtml,titlehtml); 	//console.log("unipopupbtn:    tmp:'%s'",tmp);
						return tmp;
						}
		}
	})
	.directive("unipopupkey", function (UniWebClient) { 
//   <div unipopupkey="CityByName" placeholder="Город по имени" size="32" model="countrybyname.Name"></div>
		return {
			restrict: "A",
			replace: true,
			template: function (element, attrs) {
						var arrname = attrs["unipopupkey"] || '????????';
						var clearimgsrc = attrs["clearimgsrc"]||'';												 
						var clearimghtml = (clearimgsrc.length>0)?'<img id="img' + arrname + '" class="imgToolbarNorm unipopupkey" src="' + clearimgsrc + '"  width="12"  height="12" title="очистить поле (сбросить введенное значение параметра запроса)" alt="" ng-click="unselect' + arrname + '()" ng-mouseenter="btnToolbarNorm.handleEvent($event)" ng-mouseleave="btnToolbarNorm.handleEvent($event)" />' : '';
						var placehld = attrs["placeholder"] || '????????';
						var title = attrs["title"] || '';
						var titlehtml = (title.length>0)?' title="' + title + '" ' : '';
						var sz = attrs["size"] || '32'; //if (!sz) sz = '32';
						var model = attrs["model"] || 'cur'+arrname+'.Name';					//console.log("***unipopupkey error: не задан параметр:'%s'",'model');
						var tmp = '<div><input id="txt{1}" type="text" class="unipopupkey" placeholder="{2}" size="{3}" ng-model="{4}" {6}  ng-click="UniPopup.handleEvent($event)" ng-focus="UniPopup.handleEvent($event)"/>{5}</div>';
						tmp = tmp.Format(arrname,placehld,sz,model,clearimghtml,titlehtml); 	//console.log("unipopupkey:    tmp:'%s'",tmp);
						return tmp;
						}
		}
	})
	.directive("unipopupdiv", function (UniWebClient) { 
//   unipopupdiv
		return {
			restrict: "A",
			replace: true,
			template: function () {
						var tmp =
'<div id="tgPopup" class="uniPopup"><table class="tgTable"><tbody ><tr ng-repeat="item in arrayname">'+
'<td class="tgCell" ng-click="selectedItem(item)" ng-mouseenter="UniPopup.handleEvent($event)" ng-mouseleave="UniPopup.handleEvent($event)">'+'{{item.Name}}</td></tr></tbody></table></div>';
						//console.log("unipopupdiv:    tmp:'%s'",tmp);
						return tmp;
						}
		}
	})
//.controller("commonCtrl", function ($scope, $http, $document,$timeout,$window,UNIURL,UniWebClient,UniDic) {
.controller("commonCtrl", ['$scope', '$http', '$document','$timeout','$window','UNIURL','UniWebClient','UniDic',function ($scope, $http, $document,$timeout,$window,UNIURL,UniWebClient,UniDic) {

/*
/////////////////////////////////////////////////////////////////////////    form validation
// params=[	
//			{sel:'input#Population',type:'req',textlifetime:1000,text:'<p id="errmes">Требуется ввод значения</p>'},
//			{sel:'input#Population',type:'interval',min:10,max:1000,textlifetime:4000,text:'<p id="errmes">Разрешены числа в интервале от 100 до 20000000 </p>'},
//			{sel:'input#Name',type:'req',textlifetime:1000,text:'<p id="errmes">Требуется ввод значения</p>'},
//			{sel:'input#Name',type:'regx',regx:/^([a-zA-Z\s]{1,32})$/,textlifetime:4000,textlifetime=1000,text:'<p id="errmes">Разрешены символы: a-z,A-Z и пробел (макс. 32)</p>'},
//			{sel:'input#District',type:'req',textlifetime:1000,text:'<p id="errmes">Требуется ввод значения</p>'},
//			{sel:'input#District',type:'regx',regx:/^([a-zA-Z\s]{1,32})$/,textlifetime:4000,text:'<p id="errmes">Разрешены символы: a-z,A-Z и пробел (макс. 32)</p>'}
//			{sel:'input#Password2',type:'req',textlifetime:1000,text:'<p id="errmes">Требуется ввод значения</p>'},
//			{sel:'input#Password2',type:'pass2',pass1:'input#Password1',textlifetime:4000,,text:'<p id="errmes">В обоих полях "Пароль" значения должны совпадать</p>'}
//		  ]
$scope.validFldAll = function (params)  {  //$scope.validFldAll(params);
	console.log("validFldAll:----params.length:'%s'---->",params.length);
	var item,i,rezult = true; 
	for(i=0;i<params.length;i++)    {
		var item = $(params[i].sel);
		console.log("validFldAll:    params[i].sel:'%s'   ",params[i].sel,item.attr('id'));
		switch(params[i].type)  {
			case 'req':
				rezult &= $scope.validFn_req(item,params[i]);
				if (rezult) $scope.setBorderColor(item, true);	
			break;
			
			case 'interval':
				rezult &= $scope.validFn_interval(item,params[i]);
				if (rezult) $scope.setBorderColor(item, true);	
			break;
			
			case 'regx':
				rezult &= $scope.validFn_regx(item,params[i]);
				if (rezult) $scope.setBorderColor(item, true);	
			break;
		}//switch
		if (!rezult) break;
	}//for
	if (!rezult)	{
		$scope.setBorderColor(item, false);	
		$timeout(function(){
			$scope.validMessage(item, params[i].text, params[i].textlifetime);
		}, 1000);
		
	}
	console.log("validFldAll:<----rezult:'%s'----",rezult);
	return rezult;
};
	
$scope.validFn_req = function (item, param) {   // $scope.validFn_req(item,params[i])
		console.log("validFn_req: ---------item.id='%s'--text='%s'----->", item.attr('id'), param.text);
		var value = item.val();
		return (value.length == 0) ? false : true; 
};
	
$scope.validFn_regx = function (item, param) {   // $scope.validFn_regx(item,params[i])
		console.log("validFn_regx: ---------item.id='%s'--text='%s'----->", item.attr('id'), param.text);
		var value = item.val();
		return ((value.search(param.regx) == -1) ? false : true);
	};	
	
$scope.validFn_interval = function (item, param) {   // $scope.validFn_interval(item,params[i])
		console.log("validFn_interval: ---------item.id='%s'--text='%s'--param.min='%s'--param.max='%s'--->", item.attr('id'),param.text,param.min,param.max);
		var value = item.val();		// angular.isNumber(value)
		return ( isNaN(value) || Number(value) < param.min  || Number(value) > param.max) ? false : true;
	};	
	
$scope.validFn_pass2 = function (item, param) {   // $scope.validFn_pass2(item,params[i])
		console.log("validFn_pass2: ---------item.id='%s'--text='%s'----->", item.attr('id'), param.text);
		var valpass2=item.val();
		var valpass1=$(param.pass1).val();
		return (valpass1!=valpass2)?false:true;
	};	
*/	
/////////////////////////////////////////////////////////////////////////    form validation
// params=[	
//	{popname:'Population',type:'req',textlifetime:1000,text:'<p id="errmes">Требуется ввод значения</p>'},
//	{popname:'Population',type:'interval',min:10,max:1000,textlifetime:4000,text:'<p id="errmes">Разрешены числа в интервале от 100 до 20000000 </p>'},
//	{popname:'Name',type:'req',textlifetime:1000,text:'<p id="errmes">Требуется ввод значения</p>'},
//	{popname:'Name',type:'regx',regx:/^([a-zA-Z\s]{1,32})$/,textlifetime:4000,textlifetime=1000,text:'<p id="errmes">Разрешены символы: a-z,A-Z и пробел (макс. 32)</p>'},
//	{popname:'District',type:'req',textlifetime:1000,text:'<p id="errmes">Требуется ввод значения</p>'},
//	{popname:'Password2',type:'req',textlifetime:1000,text:'<p id="errmes">Требуется ввод значения</p>'},
//	{popname:'Password2',type:'pass2',pass1:'Password1',textlifetime:4000,,text:'<p id="errmes">В обоих полях "Пароль" значения должны совпадать</p>'}
//		  ]
$scope.validFldAll = function (params)  {  //$scope.validFldAll(params);
	console.log("validFldAll:----params.length:'%s'---->",params.length);
	var item,i,rezult = true; 
	for(i=0;i<params.length;i++)    {
		var item = $(params[i].sel);
		console.log("validFldAll:    params[i].sel:'%s'   ",params[i].sel,item.attr('id'));
		switch(params[i].type)  {
			case 'req':
				rezult &= $scope.validFn_req(item,params[i]);
				if (rezult) $scope.setBorderColor(item, true);	
			break;
			
			case 'interval':
				rezult &= $scope.validFn_interval(item,params[i]);
				if (rezult) $scope.setBorderColor(item, true);	
			break;
			
			case 'regx':
				rezult &= $scope.validFn_regx(item,params[i]);
				if (rezult) $scope.setBorderColor(item, true);	
			break;
		}//switch
		if (!rezult) break;
	}//for
	if (!rezult)	{
		$scope.setBorderColor(item, false);	
		$timeout(function(){
			$scope.validMessage(item, params[i].text, params[i].textlifetime);
		}, 1000);
		
	}
	console.log("validFldAll:<----rezult:'%s'----",rezult);
	return rezult;
};
	
$scope.validFn_req = function (_obj,_param) {   // $scope.validFn_req(item,params[i])
		console.log("validFn_req: ---------item.id='%s'--text='%s'----->", item.attr('id'), param.text);
		var value = item.val();
		return (value.length == 0) ? false : true; 
};
	
$scope.validFn_regx = function (item, param) {   // $scope.validFn_regx(item,params[i])
		console.log("validFn_regx: ---------item.id='%s'--text='%s'----->", item.attr('id'), param.text);
		var value = item.val();
		return ((value.search(param.regx) == -1) ? false : true);
	};	
	
$scope.validFn_interval = function (item, param) {   // $scope.validFn_interval(item,params[i])
		console.log("validFn_interval: ---------item.id='%s'--text='%s'--param.min='%s'--param.max='%s'--->", item.attr('id'),param.text,param.min,param.max);
		var value = item.val();		// angular.isNumber(value)
		return ( isNaN(value) || Number(value) < param.min  || Number(value) > param.max) ? false : true;
	};	
	
$scope.validFn_pass2 = function (item, param) {   // $scope.validFn_pass2(item,params[i])
		console.log("validFn_pass2: ---------item.id='%s'--text='%s'----->", item.attr('id'), param.text);
		var valpass2=item.val();
		var valpass1=$(param.pass1).val();
		return (valpass1!=valpass2)?false:true;
	};	

$scope.setBorderColor  = function (item, checkrezult) {    //  $scope.setBorderColor(item, checkrezult);
		console.log("setErrBorder: ---------item.id='%s'--error='%s'----->", item.attr('id'), checkrezult);
		if (checkrezult)   	{item.removeClass("invalidValue")}//noerror
		else {item.addClass("invalidValue").effect("shake", {direction:"left", distance: 4, times: 3}, 600);}//error
		console.log("setErrBorder: <-----------");
		//return rezult;
};

$scope.validMessage = function (item,text,timeout) {   // $scope.validMessage(item,text,timeout)
		console.log("validMessage: ---------item.id='%s'--text='%s'--timeout='%s'----->", item.attr('id'), text,timeout);
		
		item.after('<div id="diverr">{1}</div>'.Format(text));
		var errmesscontainer = $('#diverr');
		//errmesscontainer.hide().fadeIn('slow');
		//errmesscontainer.html(text);
		errmesscontainer.hide().fadeIn('slow');
				setTimeout(function () {  
						errmesscontainer.animate(
								{
									opacity: 0.1
								},
								2900
								,
								function()
								{
									//errmesscontainer.html('').attr({style:"opacity:1;"});
									item.removeClass("invalidValue");
									errmesscontainer.remove();
									
								}); // end animate
					}
		,timeout);
	};	
	
	
	
/////////////////////////////////////////////////////////////////////////    ajax
//	var opts = {
//		eventname:	'cyties.load.OK',		// * opts['eventname'] 
//		//id:			'mainCtrl',			// * opts['id']  sender controller's element id (which scope has to be used)
//		//curitemname:'currentCity',		// ins  opts['curitemname'] scope name which id prop is set to data.insert_id (AUTO_INCREMENT)
//		arrayname: 	'city', 				// *	opts['arrayname'] scope array name (table body or select param options) which has to be created
//		arrayitemprop: 'Name',				// tr	opts['arrayitemprop'] array item prop name (in arrayname) which has to be translated
//      arraynameDic: UniDic['countryAsia']	// 		opts['arrayDic'] a dictionary for tanslating arrayname to russian
//		colnames: 	'colnames', 			// tr	opts['colnames'] scope array name (table colnames) which has to be translated
//		colnamesDic:UniDic.colnames 		// tr	opts['colnamesDic'] a dictionary for translating colnames to russian
//	}

$scope.configDefualt = {
	url: UNIURL,
	method: "post"
};
$scope.paramDefualt = {
	mode: 'SE',				// SP
	ConKey: 'taxiinfo',
	sqlText: "tra-ta-ta"  
};
$scope.mestext = '';		// содержимое <div id="mes" >

$scope.mesClear = function()  {
	console.log("mesClear: -------->");
	$scope.mestext = '';
	$scope.mesPost($scope.mestext);
};

$scope.mesPost = function(text)  {
	console.log("mesPost: ----'%s'---->",text);
	$scope.mestext = text;
	angular.element(document.getElementById('mestext')).html($scope.mestext);				// document.querySelector("#mes")
};

$scope.mesAdd = function(text)  {
	console.log("mesAdd: -------->");
	$scope.mestext += text;
	$scope.mesPost($scope.mestext);
};


$scope.ToArrayByGroup = function (_scope,arrayname,propname,subarray_propname) {	//  
	console.log("ToArrayByGroup: arrayname:'%s'---:---propname:'%s'---subarray_propname:'%s'---->", arrayname,propname,subarray_propname);
	var new_item,      // 	obj ~ row  (table <tr>)
		old_item,			//	old_item = _scope[arrayname][i];
		propname_value,		// 	propname_value = old_item[propname]
		subarray_item,
		rezult = [],    	// array of new_item
		subarray = [], 		// new_item[subarray_propname] = subarray;
		i,   				// cur old_item index            0<= i < _scope[arrayname].length 
		groupvalue;				// 	groupvalue = $scope[arrayname][i][propname]
	for (i = 0; i < _scope[arrayname].length; i++) {
		old_item = _scope[arrayname][i];
		propname_value = old_item[propname];
		subarray_item = old_item;
		delete subarray_item[propname];
		console.log("i:'%s'     propname_value:'%s'   groupvalue:'%s'    subarray.length:'%s'",i, propname_value, groupvalue,subarray.length);
		switch (true) {
			case i == 0:											// first array item
				groupvalue = propname_value;
				subarray.push(subarray_item); 
				if (i == _scope[arrayname].length - 1) {   //  last array item
						new_item = {};
						new_item[propname] = groupvalue;
						new_item[subarray_propname] = subarray;
						rezult.push(new_item);
						subarray = [];
				}
			break;
			
			case   groupvalue != propname_value	:
				new_item = {};
				new_item[propname] = groupvalue;
				new_item[subarray_propname] = subarray;
				rezult.push(new_item);
				subarray = [];
				groupvalue = propname_value;
				subarray.push(subarray_item);
				if (i == _scope[arrayname].length - 1) {   //  last array item
					new_item = {};
					new_item[propname] = groupvalue;
					new_item[subarray_propname] = subarray;
					rezult.push(new_item);
					subarray = [];
				}
			break;
			
			case	groupvalue == propname_value :	
				subarray.push(subarray_item);
				if (i == _scope[arrayname].length - 1) {   //  last array item
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

$scope.getDBtableName = function (sqlSelectText)  {
	console.log("getDBtableName:---'%s'--->",sqlSelectText);											
	// select ID,Name,CountryCode,District,Population from `inet-19_world`.city where CountryCode = 'BGR' limit 0,230
	var sel = sqlSelectText.split(' '); 
	do {var word = sel.shift();} while(word!='from');   console.log("getDBtableName:---'%s'---",sel[0]);
	return sel[0];
};

$scope.getPrimKeyValues = function(face,objOld)		{
		console.log("getPrimKeyValues:------>"); 
		var j,values = [];
		for (j = 0; j < face.Face.primkeyInds.length; j++)
		{
			angular.forEach(objOld, function (value, key) {
				values[values.length] = objOld[face.primkeyInds[j]];
			});
		}		
		console.log("getPrimKeyValues<---values.length=%s---",values.length);                                                                
		return values;
}

$scope.getWHERE = function(face,objOld)		{    // $scope.getWHERE(Face,objOld)
		console.log("getWHERE:------>");                                                                
		var j,text = " WHERE ";
		if (face.id) 		{
			text += face.id + ' = ' + objOld[face.id];
		} 
		else  
		{
			
			var names = face.primkeyNames;
			var values = $scope.getPrimKeyValues(face,objOld);     // objOld содержит не измененные значения ключей 
			for (j = 0; j < face.primkeyInds.length; j++)
			{
				text += (j>0)?" AND ":" ";
				text += names[j] + " = '" + values[j] + "'";
			}
		}
		console.log("getWHERE<---%s---",text);                                                                
		return text;
}; 

$scope.getDeleteSQLtext = function(face,obj)		{  		    // $scope.getDeleteSQLtext(Face,obj)
		console.log("getInsertSQLtext: ------------>");
		//DELETE FROM table  WHERE condition 
		var sqlDelete = "DELETE FROM {1} {2}".Format(face.DBtableName, $scope.getWHERE(face,obj));  
		console.log("getDeleteSQLtext: <---'%s'---",sqlDelete);
		return sqlDelete;
};	

$scope.getInsertSQLtext = function(face,objNew)		{  		    // $scope.getInsertSQLtext(Face,objNew)
		console.log("getInsertSQLtext: ------------>");
		//	MySQL =>	INSERT table SET name1='value1',name2='value2',...   
		//	MSSQL =>	INSERT INTO "table" ("name1","name2",...) VALUES  ('value1','value2',...)
		var sqlInsert;
		if (UNIURL.EndsWith('.php')) {
			sqlInsert = "INSERT {1} SET {2}".Format(face.DBtableName, $scope.getSQLvalueList(face,objNew));  
		}
			else {
			sqlInsert = "INSERT INTO {1} ({2}) VALUES ({3})".Format(face.DBtableName, $scope.getSQLColNameList(face), $scope.getSQLvalueList(face,objNew));  
			}
		
		console.log("getInsertSQLtext: <---'%s'---",sqlInsert);
		return sqlInsert;
};	

$scope.getUpdateSQLtext = function(face,objNew,objOld)		{  		    // $scope.getUpdateSQLtext(Face,objNew,objOld)
		console.log("getUpdateSQLtext: ------------>");
		// UPDATE table SET name1='value1',name2='value2',...   WHERE condition 
		var sqlUpdate = "UPDATE {1} SET {2} {3}".Format(face.DBtableName, $scope.getSQLkeyValueList(face,objNew), $scope.getWHERE(face,objOld));  
		console.log("getUpdateSQLtext: <---'%s'---",sqlUpdate);
		return sqlUpdate;
};

$scope.getSQLColNameList = function(face)		{  		    // $scope.getSQLColNameList(face)
		console.log("getSQLColNameList: ------------>");
		var name_list = '';
		var dublqw =  (UNIURL.EndsWith('.php'))?'':'"';
		for (var j = 0; j < face.cols.length; j++) {
			if (face.cols[j].id != face.id)	{
				name_list += ',' + dublqw + face.cols[j].id + dublqw;
			}
		}
		name_list = name_list.substr(1);
		console.log("getSQLColNameList: <---'%s'---",name_list);
		return name_list;
};	

$scope.getSQLkeyValueList = function(face,obj)		{  		    // $scope.getSQLkeyValueList(face,obj)
		console.log("getSQLkeyValueList: ------------>");
		var value,name_value_list = '';
		for (var j = 0; j < face.cols.length; j++) {
			value = $('input#' + face.cols[j].id).val();
			console.log("getSQLkeyValueList:    j:'%s'   value:'%s'",j,value);
			if (face.cols[j].id != face.id)	{
				if (UNIURL.EndsWith('.php')) 	{
					name_value_list += ",{1}='{2}' ".Format(face.cols[j].id,value);
				}	
					else {
					name_value_list += ",{3}{1}{3}='{2}' ".Format(face.cols[j].id,value,'"');
					}
			}
		}
		name_value_list = name_value_list.substr(1);
		console.log("getSQLkeyValueList: <---'%s'---",name_value_list);
		return name_value_list;
};	

$scope.getSQLvalueList = function(face,obj)		{  		    // $scope.getSQLvalueList(face,obj)
		console.log("getSQLvalueList: ------------>");
		var value,name_value_list = '';
		for (var j = 0; j < face.cols.length; j++) {
			value = $('input#' + face.cols[j].id).val();
			console.log("getSQLvalueList:    j:'%s'   value:'%s'",j,value);
			if (face.cols[j].id != face.id)	{
				if (UNIURL.EndsWith('.php')) 	{
					name_value_list += ",'{2}' ".Format(value);
				}	
					else {
					name_value_list += ",'{1}' ".Format(value);
					}
			}
		}
		name_value_list = name_value_list.substr(1);
		console.log("getSQLvalueList: <---'%s'---",name_value_list);
		return name_value_list;
};	

$scope.getItemFace = function(obj,face)		{			// $scope.getItemFace(obj) 
		console.log("getItemFace: ------------>");
		var j,text = '';
		if (face.id) 		{
			text += face.id + ' = ' + obj[face.id];
		} 
		else  
		{
			
			//var names = _scope.Face.primkeyNames;
			//var values = $scope.getPrimKeyValues(_scope,objOld);     // objOld содержит не измененные значения ключей 
			//for (j = 0; j < _scope.Face.primkeyInds.length; j++)
			//{
			//	text += (j>0)?" AND ":" ";
			//	text += names[j] + " = '" + values[j] + "'";
			//}
		}
		console.log("getItemFace<---%s---",text);                                                                
		return text;
}

$scope.logFace  = function(_scope)			{
	console.log("-----------------logFace-------------");
	console.log("DBtableName:'%s'  cols.length:'%s'   id:'%s'  primkeyInds.length:'%s'  primkeyNames.length:'%s'",
	_scope.Face.DBtableName, _scope.Face.cols.length,_scope.Face.id,_scope.Face.primkeyInds.length,_scope.Face.primkeyNames.length);
	console.log("-------------------------------------");
};

$scope.createFace = function (_scope,data)  {
	console.log("createFace:---->");
	var j, new_item;
	_scope.Face = {};
	_scope.Face.DBtableName = $scope.getDBtableName(data.sqlText);
	_scope.Face.cols = [];				// 	cols:[{id:"ID", datatype:"int",	flags:49667, readonly :true}] 
	_scope.Face.primkeyInds = [];		// массив индексов столбцов, входящих в PRIMARY KEY
	_scope.Face.primkeyNames = [];		// массив имен столбцов, входящих в PRIMARY KEY
	var datatypes = UniWebClient.Csv2ArrayFields(data.types);
	var dataflags = UniWebClient.Csv2ArrayFields(data.flags);
	for (j = 0; j < UniWebClient.table_col_names.length; j++) {	
		new_item = {};
		new_item['id'] = UniWebClient.table_col_names[j];
		new_item['datatype'] = datatypes[j];
		new_item['flags'] = dataflags[j];
		if ( new_item.flags & UniWebClient.PRI_KEY_FLAG ) 
		{
			_scope.Face.primkeyInds[_scope.Face.primkeyInds.length] = j;
			_scope.Face.primkeyNames[_scope.Face.primkeyNames.length] = new_item.id;
		}  
		_scope.Face.cols.push(new_item);
	}

	// _scope.Face.id = cols[0].id  если  (cols[0].flags & AUTO_INCREMENT_FLAG) == true
	if (_scope.Face.cols[0].flags & UniWebClient.AUTO_INCREMENT_FLAG )   {
		_scope.Face.id = _scope.Face.cols[0].id;
		_scope.Face.cols[0].readonly = true;
	}
	$scope.logFace(_scope);
};

$scope.TranslateToRU = function (_scope,arrname,dictname,prop) {
				console.log("TranslateToRU:--arrname='%s'---dictname='%s'---prop='%s'---->",arrname,dictname,prop);
				angular.forEach(_scope[arrname], function (en_item, index) {		
					((_scope[arrname])[index])[prop] = UniDic.en2ru(en_item[prop],UniDic[dictname]);  // UniDic !!!
				});
};

$scope.ajaxSuccessInner = function (data,paramExt,opts,_scope) {		/////////////////////////////////////////////////	ajaxSuccessInner
	console.log("ajaxSuccessInner:---->");
	//$scope.Name1 = [ //  select Name,Code as CountryCode,Continent from `world`.country  limit 0,130
	//	{ Name: "Russian \"ooo\" Federation", CountryCode: "RUS",Continent:"Europe" },
	//	{ Name: "Sweden", CountryCode: "SWE",Continent:"Europe" },
	//	{ Name: "Brazil", CountryCode: "BRA",Continent:"South America" },
	//	{ Name: "Egypt", CountryCode: "EGY",Continent:"Africa"},
	//	{ Name: "Venezuela", CountryCode: "VEN",Continent:"South America"}];
	
		console.log("opts['arrayname']:'%s'  ", opts['arrayname']);
		if (opts['arrayname'])  { 
		_scope[opts['arrayname']] = UniWebClient.csvToJson(data.csv.substr(4));		// set json array to $scope
						//_scope[opts['arrayname']] = $scope.Name1;

		console.log("opts['arrayname'].length:'%s'", _scope[opts['arrayname']].length);
			console.log("opts['arraynameDic']:'%s'      opts['arrayitemprop']:'%s'", opts['arraynameDic'], opts['arrayitemprop']);
			if (opts['arraynameDic']  && opts['arrayitemprop']) 	{			// translate to russian
				console.log("opts['arraynameDic']:'%s'      opts['arrayitemprop']:'%s'", opts['arraynameDic'], opts['arrayitemprop']);
				$scope.TranslateToRU(_scope,opts['arrayname'],opts['arraynameDic'],opts['arrayitemprop']);
			}// Endsif translate to russian
		}// Endsif opts['arrayname']
		if (opts['colnames']) {
			_scope[opts['colnames']] = angular.copy(UniWebClient.table_col_names);  			// set colnames to DB fieldnames
						//console.log("send:-----$scope[opts['colnames']]:'%s'--", _scope[opts['colnames']]);
			if (opts['colnamesDic']) 											// translate to russian
				angular.forEach(_scope[opts['colnames']], function (en_colname, index) {		
							//console.log("--'%s'--'%s'--",index, _scope[opts['colnames']][index]);
				_scope[opts['colnames']][index] = UniDic.en2ru(en_colname,opts['colnamesDic']);
			});
		}
		
		if (data.mode == 'SE') $scope.createFace(_scope,data);
		
		_scope['ajaxSuccess'] = opts['eventname'];
	};									//////////////////////////////////////////////////     ajaxSuccessInner
  
$scope.send = function (controller_scope,paramExt, opts, configExt) {
	console.log("send:---paramExt.sqlText:'%s'----->", paramExt.sqlText);
	var _scope = controller_scope,
		hrs = {}, 
		url=$scope.configDefualt.url;
	//var _scope = angular.element(document.getElementById(opts['id'])).scope();
	_scope['ajaxSuccess'] = '...';
    if (paramExt.sqlText.StartsWith("enum:"))		{								// 'enum:'
		var enumdata = {csv:'@SSC'+paramExt.sqlText.TrimStart("enum:"),mode:'SP'};
		$scope.ajaxSuccessInner(enumdata,paramExt,opts,_scope);
	}
    else  {  																		//real query to server
		UniWebClient.addDefualts(paramExt, $scope.paramDefualt);
		
  		hrs["Content-Type"] = "application/x-www-form-urlencoded; charset=UTF-8";
		$scope.configDefualt.headers = hrs;
		
		
		if (configExt) url=configExt.url;
		console.log("send:   url:'%s'", url);
			//nodejs+mySQL	url.TrimEnd('/Engine') =>data = "mode=SP&ConKey=guestinfo&sqlText=select * from `world`.city limit 0,20"
			//Apache+mySQL	url.TrimEnd('.php')    =>data = "mode=SP&ConKey=guestinfo&sqlText=select * from `world`.city limit 0,20"
			//ASP.NET+MSSQL	url.TrimEnd('.ashx')   =>data = "@@@mode@ConKey@sqlText@@SPguestinfoselect * from `world`.city limit 0,20"	"\x7F"~	\u03a3~Σ
		//$scope.configDefualt.data = (url.EndsWith('.php'))?UniWebClient.toPostParams(paramExt):UniWebClient.Json2Csv(paramExt,	"\x7F","@@");
		$scope.configDefualt.data = (url.EndsWith('.ashx'))?UniWebClient.toCsv(paramExt,	"\x7F","@@"):UniWebClient.toPostParams(paramExt);
		if (!configExt) configExt = angular.copy($scope.configDefualt);
		else UniWebClient.addDefualts(configExt, $scope.configDefualt);
		//console.log("send:---paramExt.sqlText:'%s'----config.url:'%s'----", paramExt.sqlText, configExt.url);
		$http.post(configExt.url,configExt.data,configExt)
		.success(function (data) {
			//console.log("success: -----data.error:'%s'--data.affected_rows:'%s'---->",data.error, data.affected_rows);
			//if (data.affected_rows < 32) console.log("success: data.csv:'%s'",data.csv);
			//if (data.error == 'noerror') ajaxSuccessInner(data.csv.substr(4));
			//$("#loading").removeClass("Waiting");
			var mstext;
			if (data.error == 'noerror')
			{
				console.log("send.success:---data.mode='%s'---->",data.mode);   // insert_id 
				console.log("send.success:---data.sqlText=%s---->",data.sqlText);   
				console.log("send.success:---data.affected_rows='%s'---->",data.affected_rows);  
				switch (true) 
				{
					case data.mode == 'SE' || data.mode == 'SP': 						////// SE,SP  //////
						console.log("send.success:---data.types='%s'---->",data.types);   
						console.log("send.success:---data.flags='%s'---->",data.flags);   
						console.log("send.success:---data.csv='%s'---->",data.csv);
						// mstext = (data.affected_rows>0)? 'успешно загружено {1} зап.'.Format( data.affected_rows):'не загружено НИ ОДНОЙ записи';
						// if ($scope.mestext.EndsWith('...')) $scope.mesAdd('<br>' + mstext);
						// else $scope.mesPost(mstext);
						$scope.ajaxSuccessInner(data,paramExt,opts,_scope);		
					break;
						
					case data.mode == 'D'  && data.affected_rows == 1:  				////// D  //////
						_scope['ajaxSuccess'] = opts['eventname'];
					break;
						
					case data.mode == 'U'  && data.affected_rows == 1:  				////// U  //////
						_scope['ajaxSuccess'] = opts['eventname'];
					break;
						
					case data.mode == 'A'  && data.affected_rows == 1:  				////// A  //////
						console.log("send.success:---data.insert_id='%s'---->",data.insert_id);
						if (_scope.Face.id) _scope[opts['curitemname']][_scope.Face.id] = data.insert_id;
						_scope[opts['arrayname']].push(_scope[opts['curitemname']]);
						_scope['ajaxSuccess'] = opts['eventname'];

						//var selector = "#{1} #td{2}-0".replace(/\{1\}/g, DBTableEditor.tableOpts.tableId)
						//								.replace(/\{2\}/g, (this.tableRowsCount).toString());
						//								//.replace(/\{3\}/g, (this.getKeyColNum()).toString())
						//if (DBTableEditor.tableOpts.cols[0].flags & AUTO_INCREMENT_FLAG   && 
						//											data.insert_id > 0    ) $(selector).text(data.insert_id);
						//else $(selector).text("*");
						//this.tableRowsCount++;
						//SimleToolBar.enable('#btnInsertRow');
					break;
					
					//case data.mode == 'DESC': 											////// DESC  //////
					//	console.log("DBTableEditor.ajaxsuccess:---data.types='%s'---->",data.types);  // logs  ?varchar?text?varchar?varchar?text?varchar
					//	console.log("DBTableEditor.ajaxsuccess:---data.flags='%s'---->",data.flags);  // logs  ?1?17?1?1?16?1
					//	console.log("DBTableEditor.ajaxsuccess:---data.csv='%s'---->",data.csv);   	// logs  @SSC???Field?Type?Null?Key?Default?Extra???Continent?enum('Asia','Europe','North America','Africa','Oceania','Antarctica','South America')?NO??Asia?
					//	DBTableEditor.createEnumDescription(data.sqlText, data.types, data.flags,data.csv);
					//break;
				}  
			}	
			else
			{
				$scope.mestext = 'server error: '+data.error;
				console.log("data.error:%s",data.error);                                                                
			}
		});
	}//real query to server
}//$scope.send

/////////////////////////////////////////////////////////////////////////////////  button animation
$scope.btnToolbarNorm = {
	idToolbarTimer: null,
	localDiction:	[],
	imageminsize: [],		// 	$scope.btnToolbarNorm.imageminsize['paramsinfo'] = '48px';	 		
	imagemaxsize: [],		// 	$scope.btnToolbarNorm.imagemaxsize['paramsinfo'] = '64px';			
	defaultminsize: '12px',
	defaultmaxsize: '20px',
	
	handleEvent: function (e) {			//	btnToolbarNorm.handleEvent(e)
		$this = $(e.target);
		if (e.type == "mouseenter") this.mouseoverToolbar($this);
		if (e.type == "mouseleave") this.mouseoutToolbar($this);
		if (e.type == "mousedown") 	this.mousedownToolbar($this);
		if (e.type == "mouseup") 	this.mouseupToolbar($this);
	},

    enable: function (_id){         // btnToolbarNorm.enable(_id);
				console.log("btnToolbarNorm.enable: _id='%s'", _id);
				var $this = $('.btnToolbarNorm#'+_id);
				$this.removeAttr('disabled').css({"background-position":"0px -28px", "color":"#000"});
	},		
	
    disable: function (_id)		{		//	btnToolbarNorm.disable(_id);
				console.log("btnToolbarNorm.disable: _id='%s'", _id);
				var $this = $('.btnToolbarNorm#'+_id);
				$this.attr('disabled','disabled').css({"background-position":"0px 0px", "color":"#999"});
	},		
	
	mouseoverToolbar: function ($this)	{
		var thisid = $($this).attr('id'),	
			maxsize = (this.imagemaxsize[thisid])?this.imagemaxsize[thisid]:this.defaultmaxsize;
		console.log("mouseoverToolbar:--thisid='%s'---maxsize='%s'----->",thisid,maxsize);
		this.idToolbarTimer = window.setTimeout(function()			// setTimeout
		{
			if ($this.hasClass("btnToolbarNorm"))
			{
				$this.addClass("btnToolbarHover").css("background-position","0 -56px").animate(
								{
									fontSize: '17px',
								},
								300
								, 
								function () 
								{
								  //$this.addClass("btnToolbarHover");
								  this.idToolbarTimer = null;
								}	
							);
			}// End btnToolbarNorm
			if ($this.hasClass("imgToolbarNorm"))
			{
				$this.addClass("btnToolbarHover").animate(
														{
															width: maxsize, //,this.imagemaxwidth'20px',
															height:maxsize
														},
														300
													);
			}// End imgToolbarNorma
		},
	400);//setTimeout
		
		//this.idToolbarTimer
						//console.log("mouseoverToolbar:-------%s-------",this.idToolbarTimer );

	},		

    mouseoutToolbar: function ($this)	{
		var that = this.localDiction,
			thisid = $($this).attr('id'),	
			minsize = (this.imageminsize[thisid])?this.imageminsize[thisid]:this.defaultminsize;
		console.log("mouseoutToolbar:--thisid='%s'---minsize='%s'----->",thisid,minsize);
		if (this.idToolbarTimer != null)
		{
			clearTimeout(this.idToolbarTimer);
			this.idToolbarTimer = null;
		}
		if ($this.hasClass("btnToolbarHover"))
		{
			if ($this.hasClass("btnToolbarNorm"))
			{
					$this.animate(
									{
									fontSize: '12px'
									},
									300, 
										function () //если требуется, то сделать кнопку Disabled
										{
											$this.removeClass("btnToolbarHover").css("background-position","0 -28px"); 
											if(that[this.id + 'DisableAfterMouseOut'])	{
												window.setTimeout(function()	{	
													this.disable(id);
													this.localDiction[id + 'DisableAfterMouseOut'] = false;
												},400);
											}
										}								  
									)
			}// End btnToolbarNorm
			
			if ($this.hasClass("imgToolbarNorm"))
			{
					$this.animate(
									{
										width: minsize, //,this.imageminwidth'12px',
										height: minsize
									},
									300,
										function () //если требуется, то сделать кнопку Disabled
										{
											$this.removeClass("btnToolbarHover");
										}								  
									);
			}// End imgToolbarNorm
		}
	},
	
    mousedownToolbar: function ($this){
				//var $this = $(this);
				//if ($this.hasClass("btnToolbarDis")) return;
				$this.css("background-position","0 -84px"); 

	},		

    mouseupToolbar: function ($this){
				//var $this = $(this);
				//if ($this.hasClass("btnToolbarDis")) return;
				$this.css("background-position","0 -56px"); 
				
	}
};

//////////////////////////////////////////////////////////////////////////////////     UniPopup   
$scope.UniPopup = {	
popupHeight: 341,    	//  20 x 17px = 340 +1 = 341px
localDiction: [],
	
	handleEvent: function (e) {				//  UniPopup.handleEvent(e)
		//console.log("UniPopup.handleEvent:--------e.type='%s'---------------->", e.type);
		// ng-controller="mainCtrl"  $(e.target).parents("div[ng-controller]")[0]
		if (e.target) $this = $(e.target);
		if (!$scope._scope) {
			$scope._scope = angular.element(  $this.parents("div[ng-controller]")[0]  ).scope();
			console.log("UniPopup.handleEvent:  $scope._scope created");
		}
		if (e.type == "mouseenter") $this.addClass('hover');
		if (e.type == "mouseleave") $this.removeClass('hover');
		if (e.type == "mousedown") $this.addClass('mdown');
		if (e.type == "mouseup") $this.removeClass('mdown');
		if (e.type == "click") this.popupShow(e.target.id.substr(3),true);
	},
	
	clearText: function (_from) {				//  $scope.UniPopup.clearText(_from);
		this.localDiction['txt' + _from] = '';	console.log("UniPopup.clearText:------  _from='%s'----->",_from);
		this.closeAnyOpenPopup();
		//var sid = '#txt' + e.target.id.substr(3);		console.log("UniPopup.clearText:   sid='%s'",sid);
		//$(sid).val('');
	},

	closeAnyOpenPopup: function()			{	//	$scope.UniPopup.closeAnyOpenPopup() 	закрыть любое открытое выпадающее окно
		console.log("UniPopup.closeAnyOpenPopup:----------->");
		var _from = this.getOpenPopup();
		if (_from)	this.closeOpenPopup(_from);
		console.log("UniPopup.closeAnyOpenPopup:<------ _from='%s'-----",_from);
	},
	
	closeOpenPopup: function(_from) 		{	// 	$scope.UniPopup.closeOpenPopup(_from) 	закрыть выпадающее окно для _from
		console.log("UniPopup.closeOpenPopup:----- _from='%s' ------>",_from);
		if ($scope._scope.arrayname && $scope._scope.arrayname.length && $scope._scope.from == _from)	 {
			$scope._scope.arrayname = [];
			$scope._scope.from = '';	console.log("закрыто выпадающее окно");
			return true;
		}
		return false;
	},
	
	getOpenPopup: function()				{	//	$scope.UniPopup.getOpenPopup()      	возврашает from - открытое выпадающее окно	
		var _from;
		if ($scope._scope.arrayname && $scope._scope.arrayname.length )	{
			_from = $scope._scope.from;
		}
		console.log("UniPopup.getOpenPopup:<------ _from='%s'-----",_from);
		return _from;
	},
	
	popupShow: function(_from, refresh) 	{	
//	$scope.UniPopup.popupShow(from) 	- использовать массив с именем from если он существует, если нет - загрузить из БД
//	$scope.UniPopup.popupShow(from,true)- загрузить массив из БД даже если он существует ( существует - значит уже загружен)
		console.log("popupShow:  _from:'%s'  arrayname.length:'%s'  from:'%s'   refresh:'%s'",_from,(($scope._scope.arrayname)?($scope._scope.arrayname.length):('$scope.arrayname undefined')),$scope._scope.from, refresh);
		
		//	закрыть показанный чужой список
		if ($scope._scope.arrayname && $scope._scope.arrayname.length && $scope._scope.from != _from) {$scope._scope.arrayname = [];	console.log("закрыть показанный чужой список");}
		
		//	закрыть показанный свой список
		if ($scope._scope.arrayname && $scope._scope.arrayname.length && $scope._scope.from == _from)	 {
			$scope._scope.arrayname = [];				// закрыть показанный  свой список
			$scope._scope.from = '';			console.log("закрыть показанный свой список");
			return;
		}
		
		// проверить, загружен ли массив  
		if (_from) $scope._scope.from = _from;
				//console.log("popupShow:  from:'%s'",$scope._scope.from); 
		if ($scope._scope[$scope._scope.from] && !refresh) $scope._scope.arrayname = $scope._scope[$scope._scope.from];
		else
		{
			$scope._scope.$eval('load'+_from)(); // загрузить массив из БД
			return; 
		}
		
		// показать массив в окне   (если массив содержит только одно значение - особый случай)
		var $th = $('#txt'+$scope._scope.from);
				console.log("popupShow: arrayname.length:'%s' from:'%s'",$scope._scope.arrayname.length, $scope._scope.from); 
		if ($scope._scope.arrayname.length == 1)  	{
				console.log("popupShow: $th.val():'%s'",$th.val()); 
			if ($th.val() == $scope._scope.arrayname[0].Name  &&  !$th.hasClass('unipopupbtn')) {
				$scope._scope.arrayname = [];
				$scope._scope.from = '';
				return;
			}
		}
		var popupPos = this.getPopupPosition($th);
		var style = "position:absolute;z-index:1001;outline:0px;width:{1}px;height:auto;top:{2}px;left:{3}px;".Format(popupPos[2],popupPos[1],popupPos[0]);
		$('#tgPopup').attr('style',style).show();
	},

	selectedItemBase: function(_scope,item) 	{
		console.log("selectedItemBase:  from:'%s'  popupValue:'%s'",$scope._scope.from,item['Name']);
		$scope._scope['cur' + $scope._scope.from].Name = item['Name'];
		this.localDiction['txt' + $scope._scope.from] = item['Name']; 	console.log("selectedItemBase: from:'%s'   value='%s'",'txt' + $scope._scope.from, this.localDiction['txt' + $scope._scope.from]);
		$scope._scope.arrayname = [];
		$scope._scope.from = '';
		////$this.slideUp('fast', function() {
		////					$scope._scope.arrayname = [];	// arrayname ????
		////					$scope._scope.from = '';		// from ????
							//$this.removeClass('open');
		////			});
	},
	getPopupPosition: function ($this) {
		var popupPos = []; // возвращаем [left,top,width,height]           // [left,top,width,height]
		//var $this = $("#" + UniPopup.Opts.target);
		var id = $this.attr('id');
		var targetPos = $this.offset();
		var targetH = $this.outerHeight();
		var targetW = $this.outerWidth();
		//popupPos[0] = targetPos.left;
		popupPos[2] = targetW;
		popupPos[3] = this.popupHeight;
		//screenW = $(window).width();
		// documentH = $(document).height();
		var scrollLeft = $(document).scrollLeft();
		var scrollTop = $(document).scrollTop(); console.log("id='%s' targetPos.top=%s targetH=%s scrollTop=%s",id, targetPos.top, targetH, scrollTop);

		//if (scrollTop > 0 ) {
		//  popupPos[1] = targetPos.top - UniPopup._Height - scrollTop - 10;   //console.log("delta:%s ",popupPos[1], targetPos.top + targetH);
		if (scrollTop > 0 && targetPos.top - scrollTop > this.popupHeight) {
		  popupPos[1] = targetPos.top - this.popupHeight - scrollTop - 10;   //console.log("delta:%s ",popupPos[1], targetPos.top + targetH);
		} else {
		  popupPos[1] = targetPos.top + targetH - scrollTop; //+10 ;
		}
		if (scrollLeft > 0) {
		  popupPos[0] = targetPos.left - scrollLeft; // - 10;
		} else {
		  popupPos[0] = targetPos.left;
		}
		console.log("getPopupPosition:<--left=%s  top=%s  wi=%s hi=%s",popupPos[0],popupPos[1],popupPos[2],popupPos[3]);
		return popupPos;
	},

	getParamValue: function(_scope, colname) {	      // вызов из getUniWhere: this.getParamValue(_scope, arr[i])
		return _scope.$eval('cur' + colname + '.Name');
	},
	
	getUniWhere: function(_scope, arr) 	{		//UniPopup.getUniWhere($scope, $scope.whereparam);
	//$scope.whereparam = [
	//{id:'txtBrand',col:'Brand',op:'='},
	//{id:'txtModel',col:'Model',op:'='},
	//{id:'txtRegNum',col:'RegNum',op:'%'}];
		console.log("getUniWhere:--arr.length=%s---->",arr.length);
            var i,name,value, sWhere = "where ";
			for (i=0; i< arr.length; i++){
				value = this.getParamValue(_scope, arr[i].col);
				console.log("getUniWhere: i:%s id:'%s'    col:'%s'      op:'%s' 	getParamValue:'%s'",
										  i,  arr[i].id,  arr[i].col,    arr[i].op, value);
				if (value)	{
					if (sWhere.length > "where ".length) sWhere += " and ";
					switch(arr[i].op)	{
						case "%":
							sWhere += " {1} like '{2}%'".Format(arr[i].col, value);
						break;
						
						case "=": 
							sWhere += " {1} = '{2}'".Format(arr[i].col, value);
						break;
					}//switch
				}//if (value)
			}//for 
		sWhere = (sWhere=="where ")?'':sWhere;
		console.log("getUniWhere:<--sWhere='%s'----",sWhere);
		return sWhere;
	}
};//scope.UniPopup

}]);

