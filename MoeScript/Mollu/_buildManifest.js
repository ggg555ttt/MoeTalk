self.__BUILD_MANIFEST = function(a, s, c, e, t, i, u)
{
	return {
		__rewrites:
		{
			beforeFiles: [],
			afterFiles: [],
			fallback: []
		},
		"/": [c, a, s, ""],
		"/music": [a, s, u, ""],
		"/private/[lang]/[pageNum]": [c, a, s, e, t, i, ""],
		sortedPages: ["/", "/music", "/private/[lang]/[pageNum]"]
	}
}(), self.__BUILD_MANIFEST_CB && self.__BUILD_MANIFEST_CB();