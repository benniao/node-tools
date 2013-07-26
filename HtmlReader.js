var http = require('http');
var cheerio = require('cheerio');
var fs = require('fs');

var ary = ["/17517/4152",
	"/17517/4153", 
	"/17517/4154", 
	"/17517/4162", 
	"/17517/4165", 
	"/17517/4167", 
	"/17517/4175", 
	"/17517/4180", 
	"/17517/4188", 
	"/17517/4195", 
	"/17517/4241", 
	"/17517/4260", 
	"/17517/4274",
	"/17517/4297",
	"/17517/4307",
	"/17517/4327", 
	"/17517/4344", 
	"/17517/4356", 
	"/17517/4395", 
	"/17517/4473", 
	"/17517/4486", 
	"/17517/4550", 
	"/17517/4571", 
	"/17517/4604", 
	"/17517/4635", 
	"/17517/4663", 
	"/17517/4687", 
	"/17517/4757", 
	"/17517/4817", 
	"/17517/4938", 
	"/17517/5104", 
	"/17517/5813", 
	"/17517/5900", 
	"/17517/6307", 
	"/17517/6771", 
	"/17517/6939",
	"/17517/7302", 
	"/17517/7325",
	"/17517/10999", 
	"/17517/11062", 
	"/17517/11357", 
	"/17517/11442", 
	"/17517/11822", 
	"/17517/12183"];

var length = ary.length;
var index = 0;

function getTheBook(){
	getChapter(index);
}

function getChapter(index){
	console.log('geting ' + index + ' chapter......');

	sendRequest({
		host : 'article.yeeyan.org',
		port : 80,
		path : '/view' + ary[index]
	}, function(title,content){
		console.log('chapter ' + index + ' done.\n');

		writeChapter(index,title,content);

		index ++;
		if(index < length){
			getChapter(index);
		} else {
			console.log('Congratulations!!!!');
		}
	});
}

function writeChapter(index,title,content){
	var html = ['<!DOCTYPE html><head><meta charset="utf-8"><title>'];
	html.push(title);
	html.push('</title><link href="css/css.css" type="text/css" /></head><body>');
	html.push('<h1>' + title + '</h1>');
	html.push(content);
	html.push('<p class="nav">')
	if(index < length - 1){
		html.push('<a href="' + (index + 1) + '.html">下一章</a>');
	}
	html.push('</p></body></html>');

	fs.writeFile(index+'.html', html.join(''));
}

function sendRequest(site_to_read, callback){
	http.get(site_to_read,function(res){

		var buffers = '';

		res.on('data',function(buffer){
			buffers += buffer;
		});

		res.on('end',function(){
			var $ = cheerio.load(buffers);

			var title = $('.y_l h1').html();
			var content = $('.y_article_content').html();
			callback(title, content);
		});

	});
}

getTheBook();




