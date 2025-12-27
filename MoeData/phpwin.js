<?php /*@MoeData/phpwin.js@*/?>
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
<h1 class='更新应用'>安装应用中，长时间无响应请刷新</h1>
<h1 class='安装应用'></h1>
<script>
var 网址列表 = []
var MoeTalkURL = 'https://ggg555ttt.github.io/MoeTalk'
async function file_exists(filePath)
{
	return await $.ajax(
	{
		url: '/index.php',
		type: 'POST',
		data:
		{
			getfile: filePath,
			exists: 'true'
		},
		dataType:'text'
	});
}
function 校验文件(str,url,ext)
{
	if(typeof str !== 'string')return false;
	if(ext === 'json' && ['[','{'].includes(str[0]))return true;
	for(let i=0,l=str.length;i<l;i++)
	{
		const code = str.charCodeAt(i);//\n(10)\r(13)\u2028(8232)\u2029(8233)
		if(code === 10 || code === 13 || code === 8232 || code === 8233)
		{
			str = str.slice(0, i).toLowerCase().split('@');
			if(str.length === 3 && url.toLowerCase().includes(str[1]))return true;
			break;
		}
	}
	return false
}
function getfile(url)
{
	let filename = url.split('/').pop().split('?').shift()
	$('.安装应用').html(`下载：<span style='color:red;'>${filename}</span>`)
	return new Promise(function(resolve)
	{
		let ext = url.split('?')[0].split('.').pop()
		let xhr = new XMLHttpRequest();
		if(ext === 'html' && url.includes('https://moetalk.netlify.app'))url = url.toLowerCase()
		xhr.open("GET",url);
		url = url.split(url.includes('#') ? '#' : '?')[0]
		if(!['js','css','json','html'].includes(ext))xhr.responseType = 'blob';
		xhr.addEventListener('progress', function(e)
		{
			$('.安装应用').html(`下载：<span style='color:red;'>${filename}</span>${parseInt(e.loaded/1000)}KB`)
		});
		xhr.onload = function()
		{
			if(this.status === 200 && decodeURIComponent(this.responseURL).includes(url))
			{
				if(!this.responseType || !this.response.type.includes('text'))resolve(this.response)//成功
				else resolve(false)
			}
			else resolve(false)
		}
		xhr.onerror = function(){resolve(false)}
		xhr.send();
	})
}
async function $ajax(url)
{
	let arr = ['js','css','json','html']
	let ext = url.split('?')[0].split('.').pop()

	let data = await getfile(url)
	if(arr.includes(ext) && !校验文件(data,url,ext))data = '';
	if(data)return data//重要
	if(网址列表.length === 0)
	{
		let urls = await getfile('https://api.akams.cn/github#.json')
		urls = urls ? JSON.parse(urls).data : []
		网址列表.push('https://moetalk.netlify.app')
		网址列表.push('https://ggg555ttt.github.io/MoeTalk')
		网址列表.push('https://raw.githubusercontent.com/ggg555ttt/MoeTalk/main')
		for(let i=0,l=urls.length;i<l;i++)
		{
			网址列表.push(urls[i].url+'/https://raw.githubusercontent.com/ggg555ttt/MoeTalk/main')
		}
	}
	while(!data)
	{
		let newurl = 网址列表[Math.floor(Math.random()*网址列表.length)] 
		data = await getfile(url.replace(MoeTalkURL,newurl))
		if(arr.includes(ext) && !校验文件(data,url,ext))data = '';
	}
	return data
}
async function 复制目录(src,dst)
{
	return await $.ajax(
	{
		url: '/index.php',
		type: 'POST',
		data: {copydir: [src,dst]}
	})
}
function 保存文件(file,data)
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
				$('.安装应用').html(`<span style='color:red;'>${filename}</span>保存中：${percent}%`)
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

	let 应用版本 = JSON.parse(await $ajax(`${MoeTalkURL}/MoeData/Version/Version.json?time=${Math.random()}`))
	let 本地列表 = JSON.parse(await $ajax(`${MoeTalkURL}/MoeData/Version/MoeTalk.json?ver=${应用版本[0]}`))

	let 更新补丁 = `更新补丁/MoeTalk_${应用版本[0]}`
	await 保存文件(`${更新补丁}/MoeData/Version/MoeTalk.json`,JSON.stringify(应用版本))
	await 保存文件(`${更新补丁}/MoeData/Version/Version.json`,JSON.stringify(本地列表))
	
	let 文件列表 = Object.keys(本地列表)
	for(let i=0,l=文件列表.length;i<l;i++)
	{
		let file = 文件列表[i];
		if(!await file_exists(`${更新补丁}/${file}`))//检测文件
		{
			let data = await $ajax(`${MoeTalkURL}/${file}`)
			await 保存文件(`${更新补丁}/${file}`,data)
		}
		$('.更新应用').html(`安装应用中，长时间无响应请刷新<br>剩余文件：${l-i-1}`)

	}
	$('.更新应用').html('应用安装完成！<br>即将刷新页面！')
	await 复制目录(更新补丁,'')
	await 保存文件('phpwin.txt','moetalk')
	location.replace('index.html')
}
安装应用()
</script>