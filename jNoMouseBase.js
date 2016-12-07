/*! 	
 * 	jUniClientBase.js - taxiinfo application (AngularJS base code)
 *  Copyriqht (C) 2013-2016  Leonid L.Voitenko All Rights Reserved  http://www.inet-apps.ru/                          
 */
angular.module("UniClientBase", [])
	//.constant("UNIURL", "http://localhost/site/www/Engine/PHP/SimplQueryEngineJS.php")
	.constant("UNIURL", "../../SimplQueryEngineJS.ashx")
	//.constant("UNIURL", "http://localhost:3000/Engine")
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
	//	Format - аналог функции С sprintf: подставляет в строку значения произвольного числа указанных параметров (либо массив)
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
trace_arr: [],


tracer: function() { 		//UniWebClient.tracer(txt)
	console.log("===>UniWebClient.tracer");
	/*
	var rezult = arguments[0]		
	,	regexp = new RegExp("%s")
	//,	opt = (arguments[1])?{group: '556d3c'}:{ group: 'bc-teal' }	// arguments[1],'bc-teal' - css class for background setting
	,	isTouchDevice = ('ontouchstart' in document.documentElement)
	//,	mesElement = document.getElementById('mestext')
	,	txt = ''
	;
	//console.log("===>tracer   arguments[1]['group']:'%s'   ",arguments[1]['group']);
	for (var i = 1; i < arguments.length; i++) 			{
		rezult = rezult.replace(regexp, arguments[i]);
	}
	if (!isTouchDevice)  {  console.log("jGrowl(rezult) ... "); //$('div.top-right').jGrowl(rezult);//  window.jGrowl_helper(rezult);      }
		//if ( rezult.substr(0,1) == '!')  {
		//	//$('div.top-right').jGrowl(rezult,{group: '556d3c'});
		//	//txt = (mesElement.textContent.length > 2) ? (mesElement.textContent + '\n' +  rezult) : rezult; 
		//	$('#mestext').text(rezult);		//mesElement.textContent = rezult;
		//}
		//else	this.addMes(rezult);						$('div.top-right').jGrowl(rezult);	
	//}
	else				{	console.log(rezult);	}
	return rezult; 
	*/
},


/*
addMes: function (_mes) {
	console.log("===>UniWebClient.addMes: _mes:'%s'",_mes);
	this.trace_arr.unshift(_mes);
},
	
isMes: function (_mes) {		//   if (UniWebClient.isMes())  UniWebClient.tracer(txt)
	console.log("===>UniWebClient.isMes: _mes:'%s'",_mes);
	return (this.trace_arr.length) ? true : false;
},
	
getMes: function (_mes) {								//	UniWebClient.getMes();
	console.log("===>UniWebClient.getMes: _mes:'%s'",_mes);
	return (this.trace_arr.length) ? this.trace_arr.shift() : '';
},
*/
getExecutionMsc: function (strtDate) {
	console.log("UniWebClient.getExecutionMsc: ---strtDate:'%s'---->",strtDate);
	var today = new Date();
	var diff = today.valueOf() - strtDate;
	console.log("UniWebClient.getExecutionMsc: <---Math.floor(diff):'%s'----",Math.floor(diff));
	return Math.floor(diff);
},

getExecutionTime: function () 	{
	console.log("UniWebClient.getExecutionTime: ------->");
	if (this.startDate == null) return "";
	var ms = this.getExecutionMsc(this.startDate),	days, hrs, mins, secs,output = "";
	if (ms >= 0) 
	{
	  days = Math.floor(ms / this.oneDay);
		ms -= this.oneDay * days;
		hrs = Math.floor(ms / this.oneHour);
		ms -= this.oneHour * hrs;
		mins = Math.floor(ms / this.oneMinute);
		ms -= this.oneMinute * mins;
		secs = Math.floor(ms/1000);
		ms -= 1000 * secs;
		output += hrs + ":" + mins + ":" + secs + "." + ms;
	} 
		else 
		{
			output += "The time is < 1 msc";
		}
	if (output.StartsWith('0:0:'))	output = output.slice(4);
	console.log("UniWebClient.getExecutionTime: <---output:'%s'----",output);
	return output;
},

obj2arrobj : function (obj, outpropname,novaluerepeat) {		//   UniWebClient.obj2arrobj(obj,'Name');
	console.log("UniWebClient.obj2arrobj: ---obj.length:'%s'---outpropname:'%s'--->",obj.length, outpropname);

//	{														
//		"Амьен":"Пикардия",			outpropname = 'Name'	   [{"Name":"Пикардия"},
//		"Анже":"Долина Луары",	========================>		{"Name":"Долина Луары"},
//		"Аржантьер":"Рона-Альпы",								{"Name":"Рона-Альпы"},
//		"Безансон":"Франш-Конте",								{"Name":"Франш-Конте"},
//		"Бордо":"Аквитания"										{"Name":"Аквитания"}]
//															
//	}
	var output=[], newobj,norepeat=[];
	for (var prop in obj) {
		//if ( String(obj[prop]) == "–" ) continue;
		if ( /*String(obj[prop]) != "–"   &&*/  prop!=obj[prop]  &&    ( !novaluerepeat  || norepeat.indexOf(obj[prop])<0 )  )	{
		newobj = {};
		newobj[outpropname] = obj[prop]; 
		output.push(newobj);
		norepeat.push(obj[prop]);
		}
	}
	console.log("UniWebClient.obj2arrobj: <---output.length:'%s'------",output.length);
	return output;

},

printarr: function (arr, arrname) {				//	UniWebClient.printarr(arr, arrname);
	console.log("printarr:-------------------name:%s-----length:%s--------------------->",arrname,arr.length);
	arr.forEach(function(item, index, array)	{
	console.log("%s",item);
		});
	console.log("printarr:<------------------name:%s-----length:%s---------------------",arrname,arr.length);
},

printobj: function (obj, objname) {				//	UniWebClient.printobj(obj, objname);
	console.log("printobj:-------------------name:%s---------------------->",objname);
	for (var prop in obj) {
		console.log('"' + prop + '" = "' + obj[prop] + '"');
	}
	arr.forEach(function(item, index, array)	{
	console.log("%s",item);
		});
	console.log("printobj:<------------------name:%s----------------------",objname);
},

printarrobj: function (arr, arrname) {				//	UniWebClient.printarrobj(arr, arrname);
	console.log("printarrobj:-------------------name:%s-----length:%s--------------------->",arrname,arr.length);
	var row,newobj;
	arr.forEach(function(item, index, array)	{
			row = '';
			for (var prop in item) {
				row += ',"' + prop + '" = "' + item[prop] + '"';
				//newobj[outpropname] = obj[prop]; 
				//output.push(newobj);
			}
			console.log(row.substr(1));
		});
	console.log("printarrobj:<------------------name:%s-----length:%s---------------------",arrname,arr.length);
},
		
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
	var output = input;
	for (var prop in objDict) {
		//console.log("prop:'%s'   input:'%s' objDict[prop]:'%s'",prop,input,objDict[prop]);
		if (input == prop  && objDict[prop] != '???') {
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
	.directive("unipopupbtn", function (UniWebClient) { 
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
						//<input type="button" id="btn{1}" class="btnPopup" {6}  ng-click="UniPopup.handleEvent($event)" ng-mouseenter="UniPopup.handleEvent($event)" ng-mouseleave="UniPopup.handleEvent($event)"  ng-mousedown="UniPopup.handleEvent($event)" ng-mouseup="UniPopup.handleEvent($event)"/>
						
						//var tmp = '<div><input id="txt{1}" type="text" class="unipopupbtn" placeholder="{2}" size="{3}" ng-model="{4}" readonly="true"/><span class="fa fa-cog fa-circle-o  fa-chevron-down						fa-spin" style="margin-left: -15px;margin-right: 8px;opacity: 0.5"></span>{5}</div>';
						var tmp = '<div><input id="txt{1}" type="text" class="unipopupbtn" placeholder="{2}" size="{3}" ng-model="{4}" ng-mousedown="UniPopup.handleEvent($event)" ng-click="UniPopup.handleEvent($event)" readonly="true"/><span class="fa fa-fw fa-caret-down" style="margin-left: -15px;margin-right: 2px;opacity: 0.6"></span>{5}</div>';
						tmp = tmp.Format(arrname,placehld,sz,model,clearimghtml,titlehtml); 	//console.log("unipopupbtn:    tmp:'%s'",tmp);
						return tmp;
						}
		}
	})
	.directive("unipopupkey", function (UniWebClient) { 
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
		return {
			restrict: "A",
			replace: true,
			template: function () {
						var tmp =
		'<div id="tgPopup" class="uniPopup"><table class="tgTable"><tbody >' +
		'<tr ng-repeat="item in arrayname track by $index"><td  class="tgCell">' +
			//'<img  id="btn{{$index}}" src="power-off-44x23.PNG"  alt = "кликни для выбора значения" style="width:44px; border:0;" />' +			
			//'<img  id="btn{{$index}}" src="empty-44x23.PNG"  alt = "кликни для выбора значения" style="width:44px; border:0;" />' +			
			//'<img  id="btn{{$index}}" src="check-44x23.PNG"  alt = "кликни для выбора значения" style="width:44px; border:0;" />' +			
			
			
			
			
		//'<a class="ai btn-xs" href="#">&nbsp;&nbsp;&nbsp;<i class="fa fa-power-off"></i> &nbsp;&nbsp;&nbsp;</a>' +			
		'<button type="button"  id="btni{{$index}}" class="btn-xs ai">&nbsp;&nbsp;&nbsp;<i class="fa fa-power-off"></i>&nbsp;&nbsp;&nbsp;</button>' +			
			
			
			//'<button type="button" class="btn btn-xs btni"><i class="fa fa-power-off"></i></button>' +
			//'<span id="btn{{$index}}" class="badge hasi" title="кликни для выбора значения" >&nbsp;<i class="fa fa-power-off"  ></i>&nbsp;</span>' +
			'<span id="txt{{$index}}" class="selvalue" title="выбираемое значение" >{{item.Name}}</span>' +
		'</td></tr></tbody></table></div>';
						return tmp;
						}
		}
	})
//.controller("commonCtrl", function ($scope, $http, $document,$timeout,$window,UNIURL,UniWebClient,UniDic) {
.controller("commonCtrl", ['$scope', '$http', '$document','$timeout','$window','UNIURL','UniWebClient','UniDic',function ($scope, $http, $document,$timeout,$window,UNIURL,UniWebClient,UniDic) {
/*
tracer = function() { 
			var rezult = arguments[0]		
			,	regexp = new RegExp("%s")
			//,	opt = (arguments[1])?{group: '556d3c'}:{ group: 'bc-teal' }	// arguments[1],'bc-teal' - css class for background setting
			,	isTouchDevice = ('ontouchstart' in document.documentElement)
			;
			//console.log("===>tracer   arguments[1]['group']:'%s'   ",arguments[1]['group']);
			for (var i = 1; i < arguments.length; i++) 			{
				rezult = rezult.replace(regexp, arguments[i]);
			}
			if (!isTouchDevice)  {	$('div.top-right').jGrowl(rezult);	}
			else				{	console.log(rezult);	}
				return rezult; 
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

/*	
//	use the window.onresize API to manage a responsive state
//----------------------------------------------------------------------	
$scope.getWidth = function () {		//	get width of browser window
	var x = 0;
	if (typeof(document.body.clientWidth) == 'number') {	// Newer generation of browsers
		x = document.body.clientWidth;
	}
	else if( typeof( window.innerWidth ) == 'number' ) {	//None Internet Explorer
				x = window.innerWidth;
			}
			else if( document.documentElement && document.documentElement.clientWidth ) {
				x = document.documentElement.clientWidth;	//Internet Explorer 6 and above in 'standards compliant mode'
			}
	return x;
};	
*/	
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
		//delete subarray_item[propname];							// !!!!!    24.02.2016
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
};

$scope.getDBtableName = function (sqlSelectText)  {
	console.log("getDBtableName:---'%s'--->",sqlSelectText);											
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

$scope.ajaxSuccessInner = function (data,paramExt,opts,_scope) {/////////////////////////////////////////	ajaxSuccessInner
		console.log("==>ajaxSuccessInner  opts['arrayname']:'%s'  ", opts['arrayname']);
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
		itracer("==>ajaxSuccessInner  '%s'  '%s'",opts['arrayname'], _scope[opts['arrayname']].length );
		if (data.mode == 'SE') $scope.createFace(_scope,data);
		
		_scope['ajaxSuccess'] = opts['eventname'];
	};									//////////////////////////////////////////////////     ajaxSuccessInner
  
$scope.send = function (controller_scope,paramExt, opts, configExt) {
	//itracer("==>send   paramExt.sqlText:'%s'", paramExt.sqlText);
	var _scope = controller_scope,
		hrs = {}, 
		url=$scope.configDefualt.url;
	//var _scope = angular.element(document.getElementById(opts['id'])).scope();
	//_scope['ajaxSuccess'] = '...';
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
						//mstext = (data.affected_rows>0)? 'успешно загружено {1} зап.'.Format( data.affected_rows):'не загружено НИ ОДНОЙ записи';
						//if ($scope.mestext.EndsWith('...')) $scope.mesAdd('<br>' + mstext);
						//else $scope.mesPost(mstext);
						if (data.affected_rows == 0)	{
							mstext = 'не загружено НИ ОДНОЙ записи';
							$scope.mesPost(mstext);
						}
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
					break;
					
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

//////////////////////////////////////////////////////////////////////////////////     UniPopup   
$scope.UniPopup = {	
popupHeight: 460,    	   //  20 x 17px = 340 +1 = 341px    20 x 23px + 1 = 461px
lastWhere: '',
$this: null,
	
	setChildScope: function (_childScope) {				//  UniPopup.setChildScope($scope);
		if (!$scope._scope) {
			$scope._scope = _childScope;
			console.log("UniPopup.setChildScope:  $scope._scope created");
		}
		return $scope;
	},
	
	closeAnyOpenPopup: function()	{	//	$scope.UniPopup.closeAnyOpenPopup() 	закрыть любое открытое выпадающее окно
		console.log("UniPopup.closeAnyOpenPopup:----------->");
		var _from = this.getOpenPopup();
		if (_from)	this.closeOpenPopup(_from);
		console.log("UniPopup.closeAnyOpenPopup:<------ _from='%s'-----",_from);
	},
	
	closeOpenPopup: function(_from) {	// 	$scope.UniPopup.closeOpenPopup(_from) 	закрыть выпадающее окно для _from
		console.log("UniPopup.closeOpenPopup:----- _from='%s' ------>",_from);
		if ($scope._scope.arrayname && $scope._scope.arrayname.length && $scope._scope.from == _from)	 {
			$scope._scope.arrayname = [];
			$scope._scope.from = '';	console.log("закрыто выпадающее окно");
			return true;
		}
		return false;
	},

	closAlienOpenPopup: function(_from) {	// 	$scope.UniPopup.closAlienOpenPopup(_from) 	закрыть выпадающее окно для from != _from
		console.log("UniPopup.closAlienOpenPopup:----- _from='%s' ------>",_from);
		var from = this.getOpenPopup()
		,	rezult; 
		if ( _from && from && from != _from) {
			rezult = $scope.UniPopup.closeOpenPopup(_from);
		}
		console.log("UniPopup.closAlienOpenPopup:<-----rezult='%s' ------>",rezult);
		return rezult;
	},
	
	getOpenPopup: function()		{	//	$scope.UniPopup.getOpenPopup()   возврашает from - открытое выпадающее окно	
		var _from;
		if ($scope._scope.arrayname && $scope._scope.arrayname.length )	{
			_from = $scope._scope.from;
		}
		console.log("UniPopup.getOpenPopup:<------ _from='%s'-----",_from);
		return _from;
	},
	
	popupShow: function(_from, refresh) 	{
/*		
 *	$scope.UniPopup.popupShow('') 	- использовать массив с именем $scope._scope.from если он существует, если нет - загрузить из БД
 *	$scope.UniPopup.popupShow(from) 	- использовать массив с именем from если он существует, если нет - загрузить из БД
 *	$scope.UniPopup.popupShow(from,true)- загрузить массив из БД даже если он существует ( существует - значит уже загружен)
 */		
		
		console.log("popupShow:  $scope._scope created?  %s",($scope._scope)?true:false);
		itracer("==>popupShow:  _from:'%s'  arrayname.length:'%s'  from:'%s'   refresh:'%s'",_from,(($scope._scope.arrayname)?($scope._scope.arrayname.length):('$scope.arrayname undefined')),$scope._scope.from, refresh);
		
		//	закрыть показанный чужой список
		//this.closAlienOpenPopup(_from);
		if ($scope._scope.arrayname && $scope._scope.arrayname.length && $scope._scope.from != _from) {
			$scope._scope.arrayname = [];			   //   ********************************************* hide popup
			console.log("popupShow: закрыть показанный чужой список");
		}
		
		//	закрыть показанный свой список
		if ($scope._scope.arrayname && $scope._scope.arrayname.length && $scope._scope.from == _from)	 {
			$('div.uniPopup').css({'max-height': '0px'});
			//$scope._scope.clearArr();
			$scope._scope.arrayname = [];				
			$scope._scope.from = '';			
			console.log("popupShow: закрыть показанный свой список   arr.length:'%s'",$scope._scope.arrayname.length);
			return;
		}
				

		// проверить, загружен ли массив  
		if (_from) $scope._scope.from = _from;
				//console.log("popupShow:  from:'%s'",$scope._scope.from); 
		if ($scope._scope[$scope._scope.from] && !refresh) $scope._scope.arrayname = $scope._scope[$scope._scope.from];
		else  		{
			$scope._scope.$eval('load'+_from)(); // загрузить массив из БД
			return; 
		}
		
		// показать массив в окне   (если массив содержит только одно значение - особый случай)
		var $th = $('#txt'+$scope._scope.from)
		,	$tgPopup = $('#tgPopup');

				console.log("popupShow: arrayname.length:'%s' from:'%s'",$scope._scope.arrayname.length, $scope._scope.from); 
		if ($scope._scope.arrayname.length == 1)  	{
				console.log("popupShow: $th.val():'%s'",$th.val()); 
			if ($th.val() == $scope._scope.arrayname[0].Name  &&  !$th.hasClass('unipopupbtn')) {
				$scope._scope.arrayname = [];			//   ********************************************* hide popup
				$scope._scope.from = '';
				return;
			}
		}
		var popupPos = this.getViewportOffset($th[0])  //  have got popupPos.left, popupPos.top
		,	style = "position:absolute;z-index:1001;outline:0px;width:{1}px;height:{4}px;top:{2}px;left:{3}px;overflow-y:auto;overflow-x:hidden;"
					.Format($th.outerWidth(), popupPos.top + $th.outerHeight(), popupPos.left,this.popupHeight);

		$tgPopup.attr('style',style).show();    //   ********************************************* show popup
		// show popup
		style += 'max-height: 460px;';
		$tgPopup.attr('style',style);
		//$scope.animateCss('.uniPopup','open-down',$scope.done_open_down);
	},

	getViewportOffset: function (element) {   	//  OK, this is the best !!!
		var node = element
		,   left = node.offsetLeft		
		,   top = node.offsetTop
		;

		node = node.parentNode;

		do {
		var styles = getComputedStyle(node);

		if (styles) {
		  var position = styles.getPropertyValue('position');

		  left -= node.scrollLeft;
		  top -= node.scrollTop;

		  if (/relative|absolute|fixed/.test(position)) {
			left += parseInt(styles.getPropertyValue('border-left-width'), 10);
			top += parseInt(styles.getPropertyValue('border-top-width'), 10);
			
			left += node.offsetLeft;
			top += node.offsetTop;
		  }

		  node = position === 'fixed' ? null : node.parentNode;
		} else {
		  node = node.parentNode;
		}
		//console.log("node.nodeName:'%s'",node.nodeName);// 'DIV' 'FIELDSET'  'BODY' 'HTML'	
		} while (node.nodeName == 'DIV' || node.nodeName == 'FIELDSET' || node.nodeName == 'BODY');	// element.nodeName == "TD"
		itracer("<===getViewportOffset:  left:'%s'  top:'%s'", left, top);
		return { left: left, top: top };
	},

	selectedItemBase: function(_scope,item) {
		console.log("selectedItemBase:  from:'%s'  popupValue:'%s'",$scope._scope.from,item['Name']);
		$scope._scope['cur' + $scope._scope.from].Name = item['Name'];
		//$scope._scope.arrayname = [];	    //   ********************* item selected ************************ hide popup
		$scope._scope.$eval($scope._scope.arrayname = []);
		$scope._scope.from = '';
		$('div.uniPopup').css({'max-height': '0px'});
		//		$scope.animateCss('.uniPopup','close_up',$scope.done_close_up_self);
		
		
	},
	
	getParamValue: function(_scope, colname) {	// вызов из getUniWhere: this.getParamValue(_scope, arr[i])
		return _scope.$eval('cur' + colname + '.Name');
	},
	
	getUniWhere: function(_scope, arr) 	{		//UniPopup.getUniWhere($scope, $scope.whereparam);
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
		this.lastWhere = sWhere;
		return sWhere;
	}
};//scope.UniPopup


/*--------------------------------------------- animation ------------------------------------------------------------*/

$scope.animateCss = function (_se, _cname,_cb) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend'
		   ,$th = $(_se).addClass(_cname).one(animationEnd, function() {
															  console.log("==>animateCss.function: _se:'%s'",_se);
															  if (_cb) {_cb(_se);}
															  $(this).removeClass(_cname); 
															});
		console.log("==>animateCss: _cname:'%s'  _se:'%s'  hasClass:'%s'",_cname,_se,$th.hasClass(_cname));
};

$scope.done_open_down = function(_se) {
	console.log("==>done_open_down _se:'%s'",_se);
	$(_se).css({'max-height': '460px'});
};
$scope.done_close_up_self = function(_se) {
	console.log("==>done_close_up_self   _se:'%s'  _arrayname:'%s'", _se);
	$(_se).css({'max-height': '0px'});
	$scope._scope.arrayname = [];	  
	$scope._scope.from = '';
};
}]);

