<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
ini_set("memory_limit",-1);
ini_set('precision', -1);
ini_set('serialize_precision', -1);
set_time_limit(0);
$host = 'localhost';
$browser = 'Safari';
if($_SERVER['HTTP_HOST'] !== $host || !strpos($_SERVER['HTTP_USER_AGENT'], $browser))
{
	echo "<h1 style='word-wrap: break-word;text-indent: 2em;'>在【phpwin】界面点击左上角【三】横杠，点击【Settings】进入设置页面：</h1>";
	if($_SERVER['HTTP_HOST'] !== $host)echo "<h2 style='word-wrap: break-word;text-indent: 2em;'>在【Default host】一栏将【127.0.0.1】改为【localhost】</h2>";
	if(!strpos($_SERVER['HTTP_USER_AGENT'], $browser))echo "<h2 style='word-wrap: break-word;text-indent: 2em;'>将【Use in-App Safari】选项改为开启状态</h2>";
	exit;
}
if(isset($_POST['backDown']))exit('phpwin');
if(isset($_POST['checkfiles']))
{
	$arr = json_decode($_POST['checkfiles'], true);
	$files = [];
	foreach($arr as $filename)
	{
		if($filename[0] === '/')$filename = substr($filename, 1);
		$stat = @stat($filename);
		if($stat === false)$files[] = $filename;//不存在
		else
		{
			$isFile = ($stat['mode'] & 0170000) === 0100000;
			if(!$isFile || $stat['size'] === 0)$files[] = $filename;//错误文件
		}
	}
	header('Content-Type: application/json; charset=utf-8');
	exit(json_encode($files));
}
if(isset($_POST['getfile']))
{
	$filename = $_POST['getfile'];
	if($filename[0] === '/')$filename = substr($filename, 1);
	if(file_exists($filename))
	{
		if(isset($_POST['exists']))exit("$filename 存在");
		$file = file_get_contents($filename);
		$istext = in_array(pathinfo($filename,PATHINFO_EXTENSION),['js','css','json','html']);
		if($istext)exit($file);
		else exit(base64_encode($file));
	}
	else exit('');
}
if(isset($_POST['copydir']))
{
	function copydir($src, $dst)
	{
		if(!is_dir($dst) && $dst !== '')mkdir($dst, 0755, true);
		$dir = opendir($src);
		while(($file = readdir($dir)) !== false)
		{
			if($file == '.' || $file == '..')continue;
			$srcPath = "$src/$file";
			if($dst === '')$dstPath = $file;
			else $dstPath = "$dst/$file";
			if (is_dir($srcPath))copydir($srcPath, $dstPath);
			else copy($srcPath, $dstPath);
		}
		closedir($dir);
	}
	copydir($_POST['copydir'][0], $_POST['copydir'][1]);
	exit($_POST['copydir'][0].' 已复制到 '.$_POST['copydir'][1]);
}
if(isset($_FILES['file']))
{
	$filename = $_POST['filename'];//直接使用前端传的文件名（含路径）
	$dir = dirname($filename);
	if(!is_dir($dir))mkdir($dir, 0755, true);//自动创建多级目录
	move_uploaded_file($_FILES['file']['tmp_name'],$filename);
	exit("$filename 已创建");//移动文件
}
if(file_exists('phpwin.txt'))exit("<script>location.replace('index.html')</script>");
?>
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
<h1 class='更新应用'></h1>
<script>
function $ajax(url,type = null)
{
	return new Promise(function(resolve)
	{
		let ext = url.split('?')[0].split('.').pop()
		if(ext === 'html')url = url.toLowerCase()
		let xhr = new XMLHttpRequest();
		xhr.open("GET",url);
		url = url.split('?')[0]
		if(typeof type === 'string')ext = type
		if(!['js','css','json','html'].includes(ext))xhr.responseType = 'blob';
		xhr.addEventListener('progress', function(event)
		{
			if (event.lengthComputable)
			{
				let filename = url.split('/').pop()
				let percent = ((event.loaded / event.total) * 100).toFixed(1);
				$(`[title="${filename}"]`).html(`<span style='color:red;'>${filename}</span>下载中：${percent}%`)
			}
		});
		xhr.onload = function()
		{
			if(this.status === 200 && decodeURIComponent(this.responseURL).includes(url))
			{
				resolve(this.response)//成功
			}
			else resolve(false)
		}
		xhr.onerror = function(){resolve(false)}
		xhr.send();
	})
}
function 保存文件(file, data, type = 2)
{
	if(typeof data === 'string')data = new Blob([data],{type:'application/octet-stream'});
	data = new File([data], file, {type: data.type});
	return new Promise(function(resolve)
	{
		let formData = new FormData();
		formData.append('file', data);//创建FormData
		formData.append('filename', file);//创建FormData
		let xhr = new XMLHttpRequest();//创建XHR
		xhr.open('POST', 'index.php', true);
		xhr.upload.onprogress = function(e)
		{
			if(e.lengthComputable)
			{
				let filename = file.split('/').pop()
				let percent = Math.round((e.loaded / e.total) * 100)
				$(`[title="${filename}"]`).html(`<span style='color:red;'>${filename}</span>保存中：${percent}%`)
			}
		};
		xhr.onload = function()
		{
			if(xhr.status === 200)resolve(file)
			else resolve(false)
		};
		xhr.onerror = function(){resolve(false)}
		xhr.send(formData);//发送请求
	})
	
}
async function 安装应用()
{
	let href = 'https://moetalk.netlify.app/'
	let time = Math.random()
	let 本地列表 = JSON.parse(await $ajax(`${href}MoeData/Version/MoeTalk.json?time=${time}`))
	本地列表['MoeData/Version/MoeTalk.json'] = 1
	本地列表['MoeData/Version/Version.json'] = 1
	let 文件列表 = Object.keys(本地列表)
	async function 下载线程()
	{
		while(文件列表.length > 0)
		{
			let file = 文件列表.shift();
			let filename = file.split('/').pop()
			$('body').append(`<h1 title='${filename}'></h1>`)
			let data = await $ajax(`${href}${file}`)
			
			await 保存文件(file,data)
			$(`[title="${filename}"]`).remove()
			$('.更新应用').text(`安装应用中，请不要退出或刷新\n剩余文件：${文件列表.length}`)
		}
	}
	await Promise.all(Array.from({length:5},下载线程));
	$('.更新应用').text('应用安装完成！\n即将刷新页面！')
	await 保存文件('phpwin.txt','moetalk')
	location.replace('index.html')
}
安装应用()
</script>