self.__BUILD_MANIFEST = function(a, s, c, e, t, i, u)
{
	let arr = {}
	arr.__rewrites = {beforeFiles: [],afterFiles: [],fallback: []}
	arr["/"] = [c, a, s, ""]
	arr["/music"] = [a, s, u, ""]
	arr[player] = [a, s, u, ""]
	arr['sortedPages'] = ["/", "/music", player]
	return arr//#播放器
}(), self.__BUILD_MANIFEST_CB && self.__BUILD_MANIFEST_CB();