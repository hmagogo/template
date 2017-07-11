/**
 *  Created by HMX on 2015/7/14.
 *  请求URL统一配制
 **/
var requestUrl = new Map();

requestUrl.put('query', '/backstage/query');

/** --------------------------- icinga的请求路径 --------------------------- **/
requestUrl.put('getCommands', '/Icinga/commands/getCommandByPage');
requestUrl.put('addCommand', '/Icinga/commands/addCommand');
requestUrl.put('updateCommand', '/Icinga/commands/updateCommand');
requestUrl.put('deleteCommand', '/Icinga/commands/deleteCommand');

/** --------------------------- table 请求路径 --------------------------- **/
requestUrl.put('jf1', '/table/jf1');
