/*@MoeData/OldScript/Mollu/INDEX.js@*/
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
	[405],
	{
		3162: function(e, n, t)
		{
			var r, o;
			void 0 !== (r = "function" == typeof(o = function()
			{
				"use strict";

				function n(e, n, t)
				{
					var r = new XMLHttpRequest;
					r.open("GET", e), r.responseType = "blob", r.onload = function()
					{
						a(r.response, n, t)
					}, r.onerror = function()
					{
						console.error("could not download file")
					}, r.send()
				}

				function r(e)
				{
					var n = new XMLHttpRequest;
					n.open("HEAD", e, !1);
					try
					{
						n.send()
					}
					catch (e)
					{}
					return 200 <= n.status && 299 >= n.status
				}

				function o(e)
				{
					try
					{
						e.dispatchEvent(new MouseEvent("click"))
					}
					catch (t)
					{
						var n = document.createEvent("MouseEvents");
						n.initMouseEvent("click", !0, !0, window, 0, 0, 0, 80, 20, !1, !1, !1, !1, 0, null), e.dispatchEvent(n)
					}
				}
				var i = "object" == typeof window && window.window === window ? window : "object" == typeof self && self.self === self ? self : "object" == typeof t.g && t.g.global === t.g ? t.g : void 0,
					c = i.navigator && /Macintosh/.test(navigator.userAgent) && /AppleWebKit/.test(navigator.userAgent) && !/Safari/.test(navigator.userAgent),
					a = i.saveAs || ("object" != typeof window || window !== i ? function() {} : "download" in HTMLAnchorElement.prototype && !c ? function(e, t, c)
					{
						var a = i.URL || i.webkitURL,
							l = document.createElement("a");
						t = t || e.name || "download", l.download = t, l.rel = "noopener", "string" == typeof e ? (l.href = e, l.origin === location.origin ? o(l) : r(l.href) ? n(e, t, c) : o(l, l.target = "_blank")) : (l.href = a.createObjectURL(e), setTimeout(function()
						{
							a.revokeObjectURL(l.href)
						}, 4e4), setTimeout(function()
						{
							o(l)
						}, 0))
					} : "msSaveOrOpenBlob" in navigator ? function(e, t, i)
					{
						if(t = t || e.name || "download", "string" != typeof e)
						{
							var c;
							navigator.msSaveOrOpenBlob((void 0 === (c = i) ? c = {
								autoBom: !1
							} : "object" != typeof c && (console.warn("Deprecated: Expected third argument to be a object"), c = {
								autoBom: !c
							}), c.autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type) ? new Blob(["\uFEFF", e],
							{
								type: e.type
							}) : e), t)
						}
						else if(r(e)) n(e, t, i);
						else
						{
							var a = document.createElement("a");
							a.href = e, a.target = "_blank", setTimeout(function()
							{
								o(a)
							})
						}
					} : function(e, t, r, o)
					{
						if((o = o || open("", "_blank")) && (o.document.title = o.document.body.innerText = "downloading..."), "string" == typeof e) return n(e, t, r);
						var a = "application/octet-stream" === e.type,
							l = /constructor/i.test(i.HTMLElement) || i.safari,
							s = /CriOS\/[\d]+/.test(navigator.userAgent);
						if((s || a && l || c) && "undefined" != typeof FileReader)
						{
							var u = new FileReader;
							u.onloadend = function()
							{
								var e = u.result;
								e = s ? e : e.replace(/^data:[^;]*;/, "data:attachment/file;"), o ? o.location.href = e : location = e, o = null
							}, u.readAsDataURL(e)
						}
						else
						{
							var d = i.URL || i.webkitURL,
								h = d.createObjectURL(e);
							o ? o.location = h : location.href = h, o = null, setTimeout(function()
							{
								d.revokeObjectURL(h)
							}, 4e4)
						}
					});
				i.saveAs = a.saveAs = a, e.exports = a
			}) ? o.apply(n, []) : o) && (e.exports = r)
		},
		8727: function(e, n, t)
		{
			"use strict";
			var r = t(7294),
				o = t(5893),
				i = {
					overflow: "hidden",
					fontSize: "0",
					width: "100%",
					height: "auto"
				};
			n.Z = function(e)
			{
				var n, t, c = e.children,
					a = (0, r.useRef)(null),
					l = !1,
					s = function()
					{
						return l = !1
					},
					u = function(e)
					{
						return a.current.scrollLeft = e
					};
				return (0, o.jsx)("div",
				{
					style: i,
					ref: a,
					onTouchStart: function(e)
					{
						n = e.targetTouches[0].pageX - a.current.offsetLeft, t = a.current.scrollLeft
					},
					onTouchMove: function(e)
					{
						u(t - (e.targetTouches[0].pageX - a.current.offsetLeft - n) * 1)
					},
					onMouseDown: function(e)
					{
						l = !0, n = e.pageX - a.current.offsetLeft, t = a.current.scrollLeft
					},
					onMouseMove: function(e)
					{
						l && (e.preventDefault(), u(t - (e.pageX - a.current.offsetLeft - n) * 1))
					},
					onMouseUp: s,
					onMouseLeave: s,
					children: c
				})
			}
		},
		5615: function(e, n, t)
		{
			"use strict";
			var r = t(6150),
				o = t(7294),
				i = t(9521),
				c = t(5893);
			n.Z = function(e)
			{
				var n = e.childrens,
					t = (0, o.useState)(0),
					i = t[0],
					u = t[1],
					d = (0, r.C)(function(e)
					{
						return e.global.isRight
					}),
					h = (0, r.C)(function(e)
					{
						return e.global.isMobile
					});
				return (0, o.useEffect)(function()
				{
					u(d ? 1 : 0)
				}, [d]), (0, c.jsx)(a,
				{
					children: (0, c.jsx)(l,
					{
						children: n.map(function(e, n)
						{
							return (0, c.jsx)(s,
							{
								style:
								{
									width: h && i !== n ? "0" : "100%"
								},
								children: e
							}, n)
						})
					})
				})
			};
			var a = i.ZP.div.withConfig(
				{
					displayName: "MainSlider__Container",
					componentId: "sc-x1wvnd-0"
				})(["width:100%;height:100%;overflow:hidden;position:relative;"]),
				l = i.ZP.div.withConfig(
				{
					displayName: "MainSlider__Slider",
					componentId: "sc-x1wvnd-1"
				})(["display:flex;width:100%;height:100%;"]),
				s = i.ZP.div.withConfig(
				{
					displayName: "MainSlider__Slide",
					componentId: "sc-x1wvnd-2"
				})(["transition:width 300ms ease-in-out;width:100%;height:100%;overflow:hidden;"])
		},
		8024: function(e, n, t)
		{
			"use strict";
			var r = t(9499),
				o = t(7294),
				i = t(5280),
				c = t(1728),
				a = t(5893);

			function l(e, n)
			{
				var t = Object.keys(e);
				if(Object.getOwnPropertySymbols)
				{
					var r = Object.getOwnPropertySymbols(e);
					n && (r = r.filter(function(n)
					{
						return Object.getOwnPropertyDescriptor(e, n).enumerable
					})), t.push.apply(t, r)
				}
				return t
			}

			function s(e)
			{
				for(var n = 1; n < arguments.length; n++)
				{
					var t = null != arguments[n] ? arguments[n] :
					{};
					n % 2 ? l(Object(t), !0).forEach(function(n)
					{
						(0, r.Z)(e, n, t[n])
					}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : l(Object(t)).forEach(function(n)
					{
						Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(t, n))
					})
				}
				return e
			}
			n.Z = function(e)
			{
				var n = e.listArr,
					t = e.clientHeight,
					r = e.selected,
					l = e.rowHeight,
					u = (0, o.useRef)(null),
					d = (0, o.useState)([]),
					h = d[0],
					m = d[1];
				(0, o.useEffect)(function()
				{
					u.current && n.length > 0 && m(n.map(function(e, n)
					{
						return setTimeout(function()
						{
							var e;
							null == u || null === (e = u.current) || void 0 === e || e.resetAfterIndex(n)
						}, 0), r === n ? l+$$('.gskNYI:eq(0)').outerHeight() : l//#单行改为多行头像分支
					}))
				}, [r, n, u, l, m]);
				var f = function(e)
				{
					var t = e.index,
						r = e.style;
					return (0, a.jsx)("div",
					{
						style: s(s(
						{}, r),
						{},
						{
							transition: "all 300ms ease-in-out"
						}),
						children: n[t]
					})
				};
				return (0, a.jsx)(c.Z,
				{
					defaultHeight: t,
					children: function(e)
					{
						var t = e.width,
							r = e.height;
						return (0, a.jsx)(i.S_,
						{
							ref: u,
							height: r,
							width: t,
							itemCount: n.length,
							itemSize: function(e)
							{
								return h[e] || 0
							},
							overscanCount: 1,
							children: f
						})
					}
				})
			}
		},
		1097: function(e, n, t)
		{
			"use strict";
			t.r(n), t.d(n,
			{
				default: function()
				{
					return nm
				}
			});
			var r = t(7294),
				o = t(9521),
				i = t(6150),
				c = t(1563),
				HList = t(8727),
				ico = t(9417),//#图标库
				s = t(8586),
				u = t(3380),
				d = t(3420),
				h = t(1550),
				m = t(5893),
				f = function()
				{
					var e = (0, i.T)(),
						n = (0, r.useState)(!1),
						t = n[0],
						o = n[1],
						c = (0, i.C)(function(e)
						{
							return e.global.isRight
						}),
						f = (0, i.C)(function(e)
						{
							return e.global.isMobile
						}),
						w = (0, i.C)(function(e)
						{
							//*储存读取快捷角色
							if(选择角色)
							{
								e.sCharacter = {}
								e.sCharacter.selected = {}
								e.sCharacter.selected.no = mt_settings['选择角色'].no
								e.sCharacter.selected.index = mt_settings['选择角色'].index
								e.sCharacter.selectedList = mt_settings['选择角色'].list
							}
							选择角色 = false;
							mt_settings['选择角色'].no = e.sCharacter.selected.no
							mt_settings['选择角色'].index = e.sCharacter.selected.index
							mt_settings['选择角色'].list = e.sCharacter.selectedList
							//*储存读取快捷角色
							return e.sCharacter
						}),
						_ = function(n)
						{
							if(t)
							{
								var r = w.selectedList.filter(function(e)
								{
									return !(n.no === e.no && n.index === e.index)
								});
								e((0, h.F5)(r))
							}
							else e((0, h.Ks)(n))
						};
					return (0, m.jsxs)(p,
					{
						children: [(0, m.jsxs)(g,
						{
							children: [(0, m.jsx)(y,
							{
								style:
								{
									display: f && c || t ? "none" : "block"
								},
								onClick: function()
								{
									if($$('.visible').length<1)o(!0), e((0, h.Ks)(d.I))//#
								},
								children: (0, m.jsx)(b,
								{
									style:
									{
										marginLeft: "0.1rem"
									},
									icon: ico.FKd
								})
							}), (0, m.jsx)(y,
							{
								style:
								{
									display: f && c || !t ? "none" : "block"
								},
								onClick: function()
								{
									o(!1)
								},
								children: (0, m.jsx)(b,
								{
									style:
									{
										marginLeft: "0.1rem"
									},
									icon: ico.k9h
								})
							}), (0, m.jsx)(y,
							{
								style: f && c ?
								{} :
								{
									display: "none"
								},
								onClick: function()
								{
									if($$('.visible').length<1)e((0, s.Cz)(!1))//#
								},
								children: (0, m.jsx)(b,
								{
									icon: ico.EyR
								})
							})]
						}), w.selectedList.length > 0 ? (0, m.jsx)(g,
						{
							style:
							{
								flexGrow: "1",
								overflow: "hidden",
								margin: "0",
								width: "100%"
							},
							children: (0, m.jsx)(x,
							{
								children: mt_characters && mt_char ? (0, m.jsx)(HList.Z,
								{
									children: (0, m.jsx)(g,
									{
										style:
										{
											margin: "0",
											justifyContent: "flex-start"
										},
										children: w.selectedList.map(function(e, n)
										{
											return (0, m.jsx)('img',
											{
												alt: String(e.no),
												title: String(e.index),
												width: 252,
												height: 252,
												src: loadhead(e.no,e.index),//#下方快捷角色选择框
												onClick: function()
												{
													_(e)
												},
												onError: function(e){IMAGE_error(e)},
												className: (0, u.Y)(w.selected, e) ? "eLaCqa fuyFOl fzOyMd selected" : "eLaCqa fuyFOl fzOyMd"
											}, n)
										})
									})
								}) : ''
							})
						}) : (0, m.jsx)("span",
						{
							style:
							{
								fontSize: '1.5rem'
							},
							children:L.Z.select_char[mtlang]+'<'
						}), (0, m.jsxs)(g,
						{
							children: [(0, m.jsx)(j,
							{
								className: (0, u.Y)(w.selected, d.I) ? "selected" : "",
								style:
								{
									display: !f || c ? "block" : "none",
									margin: "0"
								},
								width: 252,
								height: 252,
								alt: String(d.I.no),
								title: String(d.I.index),
								src: loadhead(d.I.no,d.I.index),//#右侧老师本人
								onClick: function()
								{
									e((0, h.Ks)(d.I))
								},
								priority: !0
							}), (0, m.jsx)(y,
							{
								style:
								{
									display: !f || c ? "none" : "block"
								},
								onClick: function()
								{
									e((0, s.Cz)(!0)), o(!1)
								},
								children: (0, m.jsx)(b,
								{
									icon: ico.yOZ
								})
							})]
						})]
					})
				},
				p = o.ZP.div.withConfig(
				{
					displayName: "Footer__Container",
					componentId: "sc-1rjbi2j-0"
				})(["", " flex-shrink:0;height:3.5rem;color:", ";background-color:", ";@media screen and (max-width:768px){height:4rem;}"], function(e)
				{
					return e.theme.common.flexBox(
					{
						justify: "space-between"
					})
				}, function(e)
				{
					return e.theme.color.rgb255_255_255
				}, function(e)
				{
					return e.theme.color.rgb76_91_111
				}),
				g = o.ZP.div.withConfig(
				{
					displayName: "Footer__Flex",
					componentId: "sc-1rjbi2j-1"
				})(["", ";position:relative;width:auto;margin:0 1rem;"], function(e)
				{
					return e.theme.common.flexBox(
					{})
				}),
				x = o.ZP.div.withConfig(
				{
					displayName: "Footer__ProfileContainer",
					componentId: "sc-1rjbi2j-2"
				})(["", ";overflow-x:scroll;position:absolute;"], function(e)
				{
					return e.theme.common.flexBox(
					{
						justify: "flex-start"
					})
				}),
				y = (0, o.ZP)(c.hU).withConfig(
				{
					displayName: "Footer__Circlebutton",
					componentId: "sc-1rjbi2j-3"
				})(["border:2px solid white;border-radius:50%;height:3rem;width:3rem;&:hover{background-color:", ";}"], function(e)
				{
					return e.theme.color.rgb61_75_92
				}),
				b = (0, o.ZP)(c.xL).withConfig(
				{
					displayName: "Footer__StyledIcon2",
					componentId: "sc-1rjbi2j-4"
				})(["height:1.5rem;margin:0.2rem 0rem;color:", ";"], function(e)
				{
					return e.theme.color.rgb255_255_255
				}),
				j = (0, o.ZP)(c.t_).withConfig(
				{
					displayName: "Footer__ProfileClick2",
					componentId: "sc-1rjbi2j-5"
				})(["width:3rem;height:3rem;"]),
				w = t(9499),
				C = t(8024),
				v = function(e)
				{
					var n = e.character,
						t = e.setSelected,
						r = (0, i.C)(function(e)
						{
							return e.sCharacter.selectedList
						}),
						o = (0, i.T)(),
						l = function(e)
						{
							var i, c = {
								no: n.no,
								index: e
							};
							(i = r.filter(function(t)
							{
								return !(n.no === t.no && e === t.index)
							})).length === r.length ? o((0, h.AU)(c)) : o((0, h.F5)(i))//#, t(null)
						};
					return (0, m.jsx)(HList.Z,
					{

						children: (0, m.jsx)(k,
						{
							style:
							{
								display:'block',
								marginLeft: '0.2rem'
							},
							children: n.profile.map(function(e)
							{
								return (0, m.jsx)('img',
								{
									width: 252,
									height: 252,
									alt: e,
									src: loadhead(n.no,e),//#左方人物皮肤选择分支
									style:{margin:'0.2rem'},
									onError: function(e){IMAGE_error(e)},
									onClick: function()
									{
										l(e)
										选择角色 = true
										let selected = mt_settings['选择角色'].list.filter(function(t)
										{
											return n.no == t.no && e == t.index
										})
										if(selected.length === 0)
										{
											mt_settings['选择角色'].no = 0
											mt_settings['选择角色'].index = 1
										}
										else
										{
											mt_settings['选择角色'].no = n.no
											mt_settings['选择角色'].index = e
											setTimeout(function()
											{
												$$('.fzoymd.selected')[0].scrollIntoView()
											}, 1)
										}
										saveStorage('设置选项',mt_settings,'local')
									},
									className: 1 === r.filter(function(t)
									{
										return n.no === t.no && e === t.index
									}).length ? "eLaCqa fuyFOl selected" : "eLaCqa fuyFOl"
								}, e)
							})
						})
					})
				},
				k = o.ZP.div.withConfig(
				{
					displayName: "Profiles__PContainer",
					componentId: "sc-6ar1q-0"
				})(["", ";padding:1rem 0rem;width:100%;height:auto;"], function(e)
				{
					return e.theme.common.flexBox(
					{
						justify: "flex-start"
					})
				}),
				Z = function(e)
				{
					var n = e.character,
						t = e.selected,
						r = e.setSelected,
						o = (0, i.C)(function(e)
						{
							return e.sCharacter.selectedList
						}),
						a = (0, i.C)(function(e)
						{
							return mtlang//#e.global.lang
						});
					let headsize;
					if(n.school[a] === '自定义')
					{
						headsize = mt_head[n.no] ? (mt_head[n.no].length/1024).toFixed(0)+'KB' : '-1KB'
					}
					return (0, m.jsxs)(N,
					{
						children: [(0, m.jsx)(S,
						{
							className: o.filter(function(e)
							{
								return e.no === n.no
							}).length > 0 ? "selected" : "",
							children: (0, m.jsxs)(P,
							{
								onClick: function()
								{
									if(n.club[a] !== '临时角色')t === n ? r(null) : r(n)
								},
								children: [(0, m.jsxs)(S,
								{
									style:{height:'auto'},
									children: [(0, m.jsx)('img',
									{
										className: 'eLaCqa',
										width: 252,
										height: 252,
										src: loadhead(n.no,n.profile[0]),//#左方选择框
										onError: function(e){IMAGE_error(e)},
										alt: n.profile[0]
									}), 
									//*添加ID和社团信息
									(0, m.jsxs)(I,
									{
										children: [(0, m.jsx)("h2",
										{
											children: (0, m.jsx)(F,
											{
												children: (0, m.jsx)(D,
												{
													className: "bold",
													style:{color:'rgb(68, 72, 78)'},
													children: mt_settings['人物改名'][n.no] || n.name[a].replaceAll("-", " ")
												})
											})
										}), (0, m.jsx)(F,
										{
											children: [(0, m.jsx)(O,
											{
												children: [(0, m.jsx)('span',
												{
													children:n.club[a]
												})]
											})]//@显示社团
										})]
									})
									//*添加ID和社团信息
									]
								})]
							})
						}), (0, m.jsxs)(T,
						{
							children: [n === t && (0, m.jsx)(v,
							{
								character: n,
								setSelected: r
							}), (0, m.jsx)(R,
							{})]
						})]
					})
				},
				N = o.ZP.div.withConfig(
				{
					displayName: "Character__Container",
					componentId: "sc-9wktk6-0"
				})(["", " word-break:keep-all;height:auto;background-color:", ";"], function(e)
				{
					return e.theme.common.flexBox(
					{
						direction: "column"
					})
				}, function(e)
				{
					return e.theme.color.rgb243_247_248
				}),
				S = o.ZP.div.withConfig(
				{
					displayName: "Character__Wrapper",
					componentId: "sc-9wktk6-1"
				})(["", " &.selected{background-color:", ";}"], function(e)
				{
					return e.theme.common.flexBox(
					{
						align: "space-around",
						justify: "flex-start"
					})
				}, function(e)
				{
					return e.theme.color.rgb202_215_221
				}),
				P = o.ZP.div.withConfig(
				{
					displayName: "Character__CContainer",
					componentId: "sc-9wktk6-2"
				})(["", " height:auto;padding:1rem;cursor:pointer;box-sizing:border-box;&:hover{background-color:", ";}&:active{background-color:", ";}"], function(e)
				{
					return e.theme.common.flexBox(
					{
						justify: "space-between"
					})
				}, function(e)
				{
					return e.theme.color.rgb218_228_233
				}, function(e)
				{
					return e.theme.color.rgb202_215_221
				}),
				I = o.ZP.div.withConfig(
				{
					displayName: "Character__ProfileText",
					componentId: "sc-9wktk6-3"
				})(["", " height:auto;width:auto;margin:0 0 0 1rem;font-size:1.1rem;max-height:4rem;color:", ";"], function(e)
				{
					return e.theme.common.flexBox(
					{
						direction: "column",
						justify: "space-around",
						align: "flex-start"
					})
				}, function(e)
				{
					return e.theme.color.rgb68_72_78
				}),
				B = (0, o.ZP)(c.Yo).withConfig(
				{
					displayName: "Character__School",
					componentId: "sc-9wktk6-4"
				})(["height:4rem;width:4rem;padding:0;"]),
				T = o.ZP.div.withConfig(
				{
					displayName: "Character__ProfileWrapper",
					componentId: "sc-9wktk6-5"
				})(["width:100%;box-sizing:border-box;"]),//#padding:0rem 1rem;
				R = o.ZP.div.withConfig(
				{
					displayName: "Character__HR",
					componentId: "sc-9wktk6-6"
				})(["position:relative;height:1px;margin-top:-1px;width:100%;background-color:", ";"], function(e)
				{
					return e.theme.color.rgb231_231_231
				}),
				F = o.ZP.div.withConfig(
				{
					displayName: "Character__FontDiv",
					componentId: "sc-9wktk6-7"
				})(["display:table;width:100%;table-layout:fixed;white-space:nowrap;"]),
				D = o.ZP.span.withConfig(
				{
					displayName: "Character__FontSpan",
					componentId: "sc-9wktk6-8"
				})(["display:table-cell;display:block;text-overflow:ellipsis;white-space:nowrap;"]),//#去overflow:hidden;
				O = (0, o.ZP)(D).withConfig(
				{
					displayName: "Character__FontSpan2",
					componentId: "sc-9wktk6-9"
				})(["font-size:1rem;color:", ";"], function(e)
				{
					return e.theme.color.rgb111_119_127
				}),
				L = t(4701),
				E = t(8681),
				M = function(e)
				{
					var n = e.modalShow,
						t = e.handleModalShow,
						o = e.sortCharType,
						a = e.setSearch,
						l = (0, i.C)(function(e)
						{
							return mtlang//#e.global.lang
						}),
						s = (0, r.useState)(o),
						u = s[0],
						d = s[1];
					return (0, r.useEffect)(function()
					{
						d(o)
					}, [n, o]), (0, m.jsx)("div",
					{
						style:
						{
							width: "100%",
							position: "relative"
						},
						children: (0, m.jsxs)(z,
						{
							style:
							{
								maxHeight: n ? ($$('.LeftScreen__CharContainer-sc-jf2v8s-1').outerHeight())+"px" : "0"//#设置分类框最大高度
							},
							children: [(0, m.jsxs)(A,
							{
								children: [(0, m.jsx)(G,
								{
									className: "bold",
									children: L.Z.sort[l]
								}), (0, m.jsx)(c.hU,
								{
									onClick: function()
									{
										t()
										club(true)
									},
									children: (0, m.jsx)(U,
									{})
								})]
							}), (0, m.jsx)(q,
							{
								//*新增社团分类
								style:{overflow:'scroll',display:'block'},//@滚动支持
								children: [E.h5.map(function(e, n)
								{
									return (0, m.jsx)(c.Bx,
									{
										style: {padding: 0},
										className: u === e ? "selected" : "",
										onClick: function()
										{
											d(e)
										},
										children: L.Z[e][l]
									}, n)
								}), (0, m.jsxs)(A,
								{
									children: [(0, m.jsx)(G,
									{
										className: "bold",
										children: mt_text['select'][mtlang]+mt_text['club'][mtlang]+"："
									}), (0, m.jsx)(c.Bx,
									{
										className:"bold",
										style:
										{
											color: 'black'
										},
										onClick: function()
										{
											club(true)
										},
										children: mt_text['clear'][mtlang]+mt_text['select'][mtlang]
									})]
								}), 
								(0, m.jsx)('dl',
								{
									className: "dropdown",
									children: [(0, m.jsx)('button',
									{
										className: "common__Button-sc-1ojome3-8 common__GroupButton-sc-1ojome3-10 cVRiXh kwhiZC medium",
										children: [(0, m.jsx)('p',
										{
											className: "multiSel 自定义"
										}), (0, m.jsx)('span',
										{
											className: "hida",
											children: '自定义'
										})]
									}), (0, m.jsx)('ul',
									{
										className: "mutliSelect",
										children: [mt_clubs.map(function(v,k)
										{
											return (0, m.jsx)('li',
											{
												children: [(0, m.jsx)('input',
												{
													type: "checkbox",
													className: "club",
													school: "自定义",
													value: v
												}),v]//
											})
										}), (0, m.jsx)('li',
										{
											children: [(0, m.jsx)('input',
											{
												type: "checkbox",
												className: "club",
												school: "自定义",
												value: "临时角色"
											}),"临时角色"]
										})]
									})]
								}),
								mt_club && mt_school ? Object.keys(mt_school).map(function(v, k)
								{
									return (0, m.jsx)('dl',
									{
										className: "dropdown",
										children: [(0, m.jsx)('button',
										{
											className: "common__Button-sc-1ojome3-8 common__GroupButton-sc-1ojome3-10 cVRiXh kwhiZC medium",
											children: [(0, m.jsx)('p',
											{
												className: "multiSel "+v
											}), (0, m.jsx)('span',
											{
												className: "hida",
												children: mt_school[v][mtlang] ? mt_school[v][mtlang] : v
											})]
										}), (0, m.jsx)('ul',
										{
											className: "mutliSelect",
											children: Object.keys(mt_club[v]).map(function(value, index)
											{
												return (0, m.jsx)('li',
												{
													children: [(0, m.jsx)('input',
													{
														type: "checkbox",
														className: "club",
														school: v,
														value: value
													}),mt_club[v][value][mtlang] ? mt_club[v][value][mtlang] : value]
												})
											})
										})]
									})
								}) : '']
								//*新增社团分类
							}), (0, m.jsx)(A,
							{
								children: (0, m.jsx)(c.Mm,
								{
									className: "medium",
									onClick: function()
									{
										//*储存分类和排序方式
										mt_settings['排序方式'] = u
										if(saveClub)saveclub()
										custom_chars(mt_char,mt_schar)
										//*储存分类和排序方式
										t(), a(
										{
											sortCharType: u
										})
									},
									children: L.Z.confirm[l]
								})
							})]
						})
					})
				},
				z = o.ZP.div.withConfig(
				{
					displayName: "GroupModal__Container",
					componentId: "sc-123a00a-0"
				})(["", ";background-color:", ";border:1px solid ", ";border-radius:10px;position:absolute;transition:max-height 0.3s ease-in-out;height:auto;z-index:1;overflow:hidden;box-sizing:border-box;"], function(e)
				{
					return e.theme.common.flexBox(
					{
						direction: "column"
					})
				}, function(e)
				{
					return e.theme.color.rgb255_255_255
				}, function(e)
				{
					return e.theme.color.rgb224_226_228
				}),
				A = o.ZP.div.withConfig(
				{
					displayName: "GroupModal__Header",
					componentId: "sc-123a00a-1"
				})(["", ";padding:0.6rem;box-sizing:border-box;"], function(e)
				{
					return e.theme.common.flexBox(
					{
						justify: "space-between"
					})
				}),
				q = o.ZP.div.withConfig(
				{
					displayName: "GroupModal__Body",
					componentId: "sc-123a00a-2"
				})(["", ";border-top:1px solid ", ";border-bottom:1px solid ", ";padding:0.6rem;box-sizing:border-box;"], function(e)
				{
					return e.theme.common.flexBox(
					{
						justify: "space-between"
					})
				}, function(e)
				{
					return e.theme.color.rgb239_240_241
				}, function(e)
				{
					return e.theme.color.rgb239_240_241
				}),
				G = o.ZP.span.withConfig(
				{
					displayName: "GroupModal__FontSpan",
					componentId: "sc-123a00a-3"
				})(["font-size:1.2rem;color:", ";"], function(e)
				{
					return e.theme.color.rgb63_68_74
				}),
				U = (0, o.ZP)(c.j4).withConfig(
				{
					displayName: "GroupModal__ExitI",
					componentId: "sc-123a00a-4"
				})(["width:1.5rem;height:1.5rem;&:before,&:after{content:'';width:1.5rem;height:2px;left:40%;background:", ";}"], function(e)
				{
					return e.theme.color.rgb15_33_64
				}),
				H = function(e)
				{
					var n = e.search,
						t = e.setSearch,
						o = e.characterLength,
						a = (0, r.useState)(!1),
						l = a[0],
						s = a[1],
						u = (0, i.C)(function(e)
						{
							return mtlang//#e.global.lang
						});
					return (0, m.jsxs)(Y,
					{
						children: [(0, m.jsxs)(K,
						{
							children: [(0, m.jsx)("h1",
							{
								children: (0, m.jsxs)(X,
								{
									className: "bold",
									children: [L.Z.student[u], " ", (0, m.jsxs)("span",
									{
										style:
										{
											fontSize: "1.2rem"
										},
										children: ["(", o, ")"]
									})]
								})
							}), (0, m.jsxs)(W,
							{
								style:
								{
									width: "auto"
								},
								children: [(0, m.jsx)($,
								{
									className: "medium",
									onClick: function()
									{
										s(!l)
										club()//@
									},
									children: (0, m.jsx)(X,
									{
										style:
										{
											fontSize: "1.1rem"
										},
										children: L.Z[n.sortCharType][u]
									})
								}), (0, m.jsx)(c.jl,
								{
									onClick: function()
									{
										t(
										{
											order: !n.order
										})
									},
									children: (0, m.jsx)(W,
									{
										children: (0, m.jsx)(c.Yo,
										{
											style:
											{
												width: "2rem",
												height: "1rem",
												marginLeft: "0.4rem"
											},
											width: 110,
											height: 60,
											alt: "order",
											src: href+"MoeData/Ui/".concat(n.order ? "down" : "up", ".webp")//#排序图标
										})
									})
								})]
							})]
						}), (0, m.jsxs)(W,
						{
							children: [(0, m.jsx)(c.II,
							{
								type: "text",
								value: n.text,
								maxLength: 30,
								className: "medium",
								placeholder: L.Z.search_comment[u],
								onChange: function(e)
								{
									t(
									{
										text: e.currentTarget.value
									})
								}
							}), (0, m.jsx)(c.lR,
							{
								width: 40,
								height: 40,
								onClick: function()
								{
									t(
									{
										text: ""
									})
								},
								src: href+"MoeData/Ui/pen.webp",//#铅笔图标
								alt: "pen"
							})]
						}), (0, m.jsx)(M,
						{
							modalShow: l,
							handleModalShow: function()
							{
								s(!1)
							},
							sortCharType: n.sortCharType,
							setSearch: t
						})]
					})
				},
				Y = o.ZP.div.withConfig(
				{
					displayName: "SearchBar__Container",
					componentId: "sc-1mvis42-0"
				})(["", " height:auto;padding:1rem 1rem 0rem 1rem;box-sizing:border-box;"], function(e)
				{
					return e.theme.common.flexBox(
					{
						direction: "column"
					})
				}),
				K = o.ZP.div.withConfig(
				{
					displayName: "SearchBar__Sort",
					componentId: "sc-1mvis42-1"
				})(["", " text-align:center;height:auto;"], function(e)
				{
					return e.theme.common.flexBox(
					{
						justify: "space-between"
					})
				}),
				X = o.ZP.span.withConfig(
				{
					displayName: "SearchBar__FontSpan",
					componentId: "sc-1mvis42-2"
				})(["font-size:1.5rem;color:", ";"], function(e)
				{
					return e.theme.color.rgb63_68_74
				}),
				W = o.ZP.div.withConfig(
				{
					displayName: "SearchBar__Flex",
					componentId: "sc-1mvis42-3"
				})(["", " height:auto;position:relative;"], function(e)
				{
					return e.theme.common.flexBox(
					{})
				}),
				$ = (0, o.ZP)(c.jl).withConfig(
				{
					displayName: "SearchBar__Parallelogram1",
					componentId: "sc-1mvis42-4"
				})(["width:7.5rem;height:2.5rem;&:after{content:'';right:0.5rem;position:absolute;transform:skew(-10deg);border-bottom:0.45rem solid transparent;border-left:0.45rem solid transparent;border-top:0.45rem solid ", ";border-right:0.45rem solid ", ";}&:active:before{width:7.46rem;height:2.46rem;}"], function(e)
				{
					return e.theme.color.rgb73_111_143
				}, function(e)
				{
					return e.theme.color.rgb73_111_143
				});

			function J(e, n)
			{
				var t = Object.keys(e);
				if(Object.getOwnPropertySymbols)
				{
					var r = Object.getOwnPropertySymbols(e);
					n && (r = r.filter(function(n)
					{
						return Object.getOwnPropertyDescriptor(e, n).enumerable
					})), t.push.apply(t, r)
				}
				return t
			}

			function V(e)
			{
				for(var n = 1; n < arguments.length; n++)
				{
					var t = null != arguments[n] ? arguments[n] :
					{};
					n % 2 ? J(Object(t), !0).forEach(function(n)
					{
						(0, w.Z)(e, n, t[n])
					}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : J(Object(t)).forEach(function(n)
					{
						Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(t, n))
					})
				}
				return e
			}
			var Q = function()
				{
					var e, n = (0, i.C)(function(e)
						{
							return e.global.isMobile
						}),
						t = (0, i.C)(function(e)
						{
							return mtlang//#e.global.lang
						}),
						o = (0, r.useState)(
						{
							text: "",
							order: !0,
							sortCharType: "name"
						}),
						c = o[0],
						a = o[1],
						l = (0, r.useState)(null),
						s = l[0],
						d = l[1],
						h = (0, r.useState)(0),
						f = h[0],
						p = h[1],
						g = (0, r.useRef)(null),
						x = (0, r.useMemo)(function()
						{//@新版角色列表读取
							if(!mt_chars)return [];
							let chars = []
							chars = [...mt_schars,...mt_chars,...CHAR_CharList].filter(function(char)
							{
								return mt_settings['社团列表'][char.club.id]
							})
							return (chars.length < 1 ? [...mt_schars,...mt_chars,...CHAR_CharList] : chars).filter(function(e)
							{
								return null !== (0, u.oG)(e, c.text)
							}).sort(function(e, n)
							{
								return (0, u.ur)(e, n, c, t)
							})
						}, [t, c]),
						y = (null == g ? void 0 : null === (e = g.current) || void 0 === e ? void 0 : e.clientHeight) || 0;
					return (0, r.useEffect)(function()
					{
						null != g && g.current && setTimeout(function()
						{
							p(6 * parseInt(document.documentElement.style.fontSize.replace("px", "")) || 0)
						}, 500)
					}, [g, n]), (0, m.jsxs)(ee,
					{
						children: [(0, m.jsx)(H,
						{
							search: c,
							setSearch: function(e)
							{
								a(function(n)
								{
									return V(V(
									{}, n), e)
								})
							},
							characterLength: x.length
						}), (0, m.jsx)(en,
						{
							ref: g,
							style:
							{
								opacity: f > 0 ? 1 : 0
							},
							children: (0, m.jsx)(C.Z,
							{
								listArr: x.map(function(e, n)
								{
									return (0, m.jsx)(Z,
									{
										character: e,
										selected: s,
										setSelected: function(e)
										{
											d(e)
										}
									}, n)
								}),
								clientHeight: y,
								selected: s ? x.indexOf(s) : void 0,
								rowHeight: f
							})
						})]
					})
				},
				ee = o.ZP.div.withConfig(
				{
					displayName: "LeftScreen__Container",
					componentId: "sc-jf2v8s-0"
				})(["", " background-color:", ";border-right:2px solid ", ";min-width:340px;@media screen and (max-width:768px){min-width:100vw;}"], function(e)
				{
					return e.theme.common.flexBox(
					{
						direction: "column"
					})
				}, function(e)
				{
					return e.theme.color.rgb243_247_248
				}, function(e)
				{
					return e.theme.color.rgb230_233_235
				}),
				en = o.ZP.div.withConfig(
				{
					displayName: "LeftScreen__CharContainer",
					componentId: "sc-jf2v8s-1"
				})(["width:100%;height:100%;overflow-y:scroll !important;"]);
			o.ZP.div.withConfig(
			{
				displayName: "LeftScreen__AruDiv",
				componentId: "sc-jf2v8s-2"
			})(["position:absolute;z-index:10;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;width:100%;height:100%;background-color:rgb(244,247,248);color:rgb(226,116,108);"]);
			var et = t(7812),
				er = t(5781),
				eo = t(5740),
				ei = t(4288),
				ec = t(6835),
				ea = t(4685),
				el = function(e)
				{
					var n = e.show,
						t = e.handleShow,
						o = e.sendChat,
						a = (0, r.useState)(""),
						l = a[0],
						s = a[1],
						u = (0, i.C)(function(e)
						{
							return mtlang//#e.global.lang
						}),
						d = function()
						{
							t(!1), s("")
						};
					let cancel = function(enter = false)
					{
						if(enter && TOP_confirm !== '')TOP_confirm()
						$$('.notice pre').html('')
						$$('.notice').removeClass('visible')
						$$('.notice .title').text('通知')
						$$('.notice .confirm').text(L.Z.confirm[l]).removeAttr('disabled')
						TOP_confirm = ''
					}
					return [(0, m.jsx)(ea.Xf,
					{
						className: "medium notice",
						style: {zIndex: 2000},
						onDoubleClick: function()
						{
							cancel()
						},
						children: (0, m.jsxs)(ea.F0,
						{
							onDoubleClick: function(e)
							{
								return e.stopPropagation(), !1
							},
							children: [(0, m.jsxs)(ea.h4,
							{
								children: [(0, m.jsx)(ea.Dx,
								{
									className: "bold title",
									children: '通知'
								}), (0, m.jsx)(ea.ec,
								{
									onClick: function()
									{
										cancel()
									},
									children: (0, m.jsx)(c.j4,
									{})
								})]
							}), (0, m.jsxs)(ea.$0,
							{
								children: [(0, m.jsx)('pre',
								{
									style: 
									{
										lineHeight: '150%',
										whiteSpace: 'pre-wrap',
										wordBreak: 'break-word',
										textAlign: 'left'
									}
								}), (0, m.jsxs)(ea.$_,
								{
									children: [(0, m.jsx)(ea.Lw,
									{
										className: "bold cancel",
										onClick: function()
										{
											cancel()
										},
										children: L.Z.cancel[u]
									}), (0, m.jsx)(ea.AZ,
									{
										className: "bold confirm",
										onClick: function()
										{
											cancel(true)
										},
										children: L.Z.confirm[u]
									})]
								})]
							})]
						})
					}), (0, m.jsx)(ea.Xf,
					{
						className: n ? "visible medium" : "medium",
						onDoubleClick: function()
						{
							d()
						},
						children: (0, m.jsxs)(ea.F0,
						{
							onDoubleClick: function(e)
							{
								return e.stopPropagation(), !1
							},
							children: [(0, m.jsxs)(ea.h4,
							{
								children: [(0, m.jsx)(ea.Dx,
								{
									className: "bold",
									children: L.Z.info[u]
								}), (0, m.jsx)(ea.ec,
								{
									onClick: function()
									{
										d()
									},
									children: (0, m.jsx)(c.j4,
									{})
								})]
							}), (0, m.jsxs)(ea.$0,
							{
								children: [(0, m.jsx)(c.OP,
								{
									children: (0, m.jsx)(c.Kx,
									{
										className: "medium chatText",
										placeholder: L.Z.input_comment[u],
										maxRows: 3,
										value: l,
										onChange: function(e)
										{
											s(e.currentTarget.value)
										}
									})
								}), (0, m.jsxs)(ea.$_,
								{
									children: [(0, m.jsx)(ea.Lw,
									{
										className: "bold",
										onClick: function()
										{
											d()
										},
										children: L.Z.cancel[u]
									}), (0, m.jsx)(ea.AZ,
									{
										className: "bold",
										disabled: l.length < 1,
										onClick: function()
										{
											sendMessage({content: l},'info'), d()
										},
										children: L.Z.confirm[u]
									})]
								})]
							})]
						})
					}), (0, m.jsx)(ea.Xf,
					{
						id: 'custom-char',
						onDoubleClick: function()
						{
							char_info = []
							$$('#custom-char').removeClass('visible')//S()
						},
						children: (0, m.jsxs)(ea.F0,
						{
							onDoubleClick: function(e)
							{
								return e.stopPropagation(), !1
							},
							children: [(0, m.jsxs)(ea.h4,
							{
								children: [(0, m.jsx)(ea.Dx,
								{
									className: "typeTitle bold"
								}), (0, m.jsx)(ea.ec,
								{
									onClick: function()
									{
										char_info = []
										$$('#custom-char').removeClass('visible')//S()
									},
									children: (0, m.jsx)(c.j4,{})
								})]
							}), (0, m.jsx)('h1',
							{
								style:{whiteSpace: 'pre'},
								children: `学校：########\nID：########`
							}), (0, m.jsx)('input',
							{
								type: 'checkbox',
								className: 'rightSend'
							}), '默认右侧发言',(0, m.jsxs)(ea.$0,
							{
								children: [(0, m.jsx)('div',
								{
									className: "edit_2",
									children: [(0, m.jsx)('div',
									{
										className:"edit_4",
										children:[(0, m.jsx)('div',
										{
											className:"edit_3_box1",
											style:{border: 0},
											children:(0, m.jsx)('div',
											{
												className:"edit_3_box2",
												children:(0, m.jsx)('div',
												{
													className:"edit_3_box3",
													children:[(0, m.jsx)('div',
													{
														className:"edit_3_box3_1",
														children: (0, m.jsx)('input',
														{
															className:"edit_3_box3_1_1 charname bold",
															onChange: function(e)
															{
																$$('.charname').val(e.currentTarget.value)
															}
														})
													}),(0, m.jsx)('div',
													{
														className:"edit_3_box3_2",
														children: (0, m.jsx)('div',
														{
															className:"edit_3_box3_2_1",
															children: mt_text.name[mtlang]
														})
													})]
												})
											})
										}), (0, m.jsx)('div',
										{
											className:"edit_3_box1",
											style:{border: 0},
											children:(0, m.jsx)('div',
											{
												className:"edit_3_box2",
												children:(0, m.jsx)('div',
												{
													className:"edit_3_box3",
													children:[(0, m.jsx)('div',
													{
														className:"edit_3_box3_1",
														children: (0, m.jsx)('input',
														{
															className:"edit_3_box3_1_1 clubname bold",
															onChange: function(e)
															{
																$$('.clubname').val(e.currentTarget.value)
															}
														})
													}),(0, m.jsx)('div',
													{
														className:"edit_3_box3_2",
														children: (0, m.jsx)('div',
														{
															className:"edit_3_box3_2_1",
															children: mt_text.club[mtlang]
														})
													})]
												})
											})
										}), (0, m.jsx)('div',
										{
											className: 'edithead',
											style:
											{
												fontSize:'12px',
												display: 'inline-grid',
												whiteSpace: "nowrap",
												justifyItems: 'center',
												cursor: 'pointer'
											},
											children:['添加头像',(0, m.jsx)('img',
											{
												style:
												{
													width: '40px',
													height: '40px'
												},
												src:href+'MoeData/Ui/School/RECYCLE.webp'
											})],
											onClick:function()
											{
												$$("#custom").attr('title','head').attr('alt','add').click()
											}
										})]
									}), (0, m.jsx)('div',{
										className:"edit_3_box3_2_1",
										children: '分支头像：'
									}),(0, m.jsx)(HList.Z,
									{
										children: (0, m.jsx)(k,
										{
											style:{padding:0},
											className: 'heads'
										})
									})]
								}), (0, m.jsx)('span',
								{
									style: {whiteSpace: 'pre-wrap'},
									className: 'edit_3_box3_2_1',
									children: '名称显示优先级：发言人名字 > 分支头像名字 > 角色名字'
								}), (0, m.jsx)('div',
								{
									className: "edit_2",
									children: [(0, m.jsx)('div',
									{
										className:"edit_4 headinfo",
										children:[(0, m.jsx)('div',
										{
											className:"edit_3_box1",
											style:{border: 0},
											children:(0, m.jsx)('div',
											{
												className:"edit_3_box2",
												children:(0, m.jsx)('div',
												{
													className:"edit_3_box3",
													children:[(0, m.jsx)('div',
													{
														className:"edit_3_box3_1",
														children: (0, m.jsx)('input',
														{
															className:"edit_3_box3_1_1 bold headname",
															placeholder: '默认',
															onChange: function(e)
															{
																char_info.names[$$(".heads .selected").attr('title')] = e.currentTarget.value
																$$('.headname').val(e.currentTarget.value)
															}
														})
													}), (0, m.jsx)('div',
													{
														className:"edit_3_box3_2",
														children: (0, m.jsx)('div',
														{
															className:"edit_3_box3_2_1",
															children: '分支头像名称：'
														})
													})]
												})
											})
										}), (0, m.jsx)('div',
										{
											className: 'edithead',
											style:
											{
												fontSize:'12px',
												display: 'inline-grid',
												whiteSpace: "nowrap",
												justifyItems: 'center',
												cursor: 'pointer'
											},
											children:['删除头像',(0, m.jsx)('img',
											{
												style:
												{
													width: '40px',
													height: '40px'
												},
												src:href+'MoeData/Ui/School/CUSTOM.webp'
											})],
											onClick:function()
											{
												delete char_info.names[$$(".heads .selected").remove().attr('title')]
												$$('.headinfo').hide()
											}
										}), (0, m.jsx)('div',
										{
											className: 'edithead',
											style:
											{
												fontSize:'12px',
												display: 'inline-grid',
												whiteSpace: "nowrap",
												justifyItems: 'center',
												cursor: 'pointer'
											},
											children:['更改头像',(0, m.jsx)('img',
											{
												style:
												{
													width: '40px',
													height: '40px'
												},
												src:href+'MoeData/Ui/edit.png'
											})],
											onClick:function()
											{
												$$("#custom").attr('title','head').attr('alt','edit').click()
											}
										})]
									})]
								}), (0, m.jsxs)(ea.$_,
								{
									children: [(0, m.jsx)(ea.Lw,
									{
										className: "bold",
										onClick: function()
										{
											char_info = []
											$$('#custom-char').removeClass('visible')//S()
										},
										children: mt_text.cancel[mtlang]
									}), (0, m.jsx)(ea.AZ,
									{
										className: "bold confirm",
										onClick: function()
										{
											edit_char()
										},
										children: mt_text.confirm[mtlang]
									})]
								})]
							})]
						})
					})]
				},
				es = function(e)
				{
					var n = e.show,
						t = e.sReply,
						o = e.handleShow,
						a = e.isFirst,
						l = e.scrollRef,
						s = (0, r.useState)(""),
						h = s[0],
						f = s[1],
						p = (0, i.C)(function(e)
						{
							return e.makeChat
						}),
						g = (0, i.C)(function(e)
						{
							return mtlang//#e.global.lang
						}),
						x = (0, i.T)(),
						y = function()
						{
							o(!1), f("")
						};
					return (0, m.jsx)(ea.Xf,
					{
						className: n ? "visible medium" : "medium",
						onDoubleClick: function()
						{
							y()
						},
						children: (0, m.jsxs)(ea.F0,
						{
							onDoubleClick: function(e)
							{
								return e.stopPropagation(), !1
							},
							children: [(0, m.jsxs)(ea.h4,
							{
								children: [(0, m.jsx)(ea.Dx,
								{
									className: "bold",
									children: a ? L.Z.go_reply[g] : L.Z.add_reply[g]
								}), (0, m.jsx)(ea.ec,
								{
									onClick: function()
									{
										y()
									},
									children: (0, m.jsx)(c.j4,
									{})
								})]
							}), (0, m.jsxs)(ea.$0,
							{
								children: [(0, m.jsx)(c.OP,
								{
									children: (0, m.jsx)(c.Kx,
									{
										className: "medium chatText",
										placeholder: L.Z.input_comment[g],
										maxRows: 3,
										value: h,
										onChange: function(e)
										{
											f(e.currentTarget.value)
										}
									})
								}), (0, m.jsxs)(ea.$_,
								{
									children: [(0, m.jsx)(ea.Lw,
									{
										className: "bold",
										onClick: function()
										{
											y()
										},
										children: L.Z.cancel[g]
									}), (0, m.jsx)(ea.AZ,
									{
										className: "bold",
										disabled: h.length < 1,
										onClick: function()
										{
											sendMessage({content: h},'reply'), y()
										},
										children: L.Z.confirm[g]
									})]
								})]
							})]
						})
					})
				},
				ed = t(29),
				eh = t(7794),
				em = t.n(eh),
				ef = t(3162),
				ep = t(1120),
				eg = t.n(ep),
				ex = t(4306),
				ey = function()
				{
					var e, n = (0, ex.vC)(
						{
							fixedCacheKey: "account"
						}),
						t = (0, ec.Z)(n, 2),
						o = null === (e = (t[0], t[1]).data) || void 0 === e ? void 0 : e.NICKNAME,
						c = (0, i.C)(function(e)
						{
							return e.global.gameName
						}),
						a = (0, r.useState)("Mollu"),
						l = a[0],
						s = a[1];
					return (0, r.useEffect)(function()
					{
						s(o || c)
					}, [c, o, s]), [l, function(e)
					{
						s(e)
					}]
				},
				eb = function(e)
				{
					var n, t, o, a, l, d = e.show,
						h = e.handleShow,
						f = e.scrollRef,
						p = (0, i.T)(),
						g = (0, i.C)(function(e)
						{
							return mtlang//#e.global.lang
						}),
						x = (0, i.C)(function(e)
						{
							return e.global.isLoading
						}),
						y = (0, r.useState)(""),
						b = y[0],
						j = y[1],
						w = (0, r.useState)(""),
						_ = w[0],
						C = w[1],
						N = (0, r.useState)(1.1),
						S = N[0],
						P = N[1],
						I = (0, r.useRef)(null),
						B = ey(),
						T = (0, ec.Z)(B, 2),
						R = T[0],
						F = T[1],
						D = function()
						{
							C(""), b && (URL.revokeObjectURL(b), j("")), h(!1)
						},
						O = (l = (0, ed.Z)(em().mark(function e()
						{
							var n, t;
							return em().wrap(function(e)
							{
								for(;;) switch (e.prev = e.next)
								{
									case 0:
										if(p((0, s.jh)(!0)), null !== (n = f.current))
										{
											e.next = 4;
											break
										}
										return e.abrupt("return");
									case 4:
										$$('.imageSave').remove()
										$$('.mt_capture').click()
									case 6:
									case "end":
										return e.stop()
								}
							}, e)
						})), function()
						{
							return l.apply(this, arguments)
						});
					return (0, m.jsx)(ea.Xf,
					{
						id:"download_to_image",
						className: d ? "visible medium" : "medium",
						onDoubleClick: function()
						{
							srceenMode()
							D()
						},
						children: (0, m.jsxs)(ea.F0,
						{
							onDoubleClick: function(e)
							{
								return e.stopPropagation(), !1
							},
							children: [(0, m.jsxs)(ea.h4,
							{
								children: [(0, m.jsx)(ea.Dx,
								{
									className: "bold",
									children: [`${$$('.dels:checked').length ? '区域截图' : L.Z.download_to_image[g]}`,'(',(0, m.jsx)('span',
									{
										className: "截图数量",
										children: imageArr.length
									}),')']
								}), (0, m.jsx)(ea.ec,
								{
									onClick: function()
									{
										srceenMode()
										D()
									},
									children: (0, m.jsx)(c.j4,
									{})
								}), (0, m.jsx)('截图',{
									hidden: true,
									className: 'mt_capture',
									onClick: function()
									{
										mt_capture(S,eg,j,(0, u._3)(!0, !0),$$('#mt_title').text().split(':').pop().trim())//新版截图
									}
								})]
							}), (0, m.jsx)("pre",
							{
								style:
								{
									display: b ? "block" : "none",
									whiteSpace: 'pre-wrap'
								},
								className: 'INDEX_CaptureTips'
							}),(0, m.jsxs)(ea.$0,
							{
								style:
								{
									maxHeight: `${($$('body').height())*0.75}px`,
									overflow: "scroll"
								},
								children: [0 === b.length && (0, m.jsxs)(m.Fragment,
								{
									children: [(0, m.jsxs)(ew,
									{
										style:
										{
											flexDirection: "column",
											alignItems: "flex-start",
											lineHeight: "2rem"
										},
										children: [L.Z.title[g], (0, m.jsx)(c.OP,
										{
											style:
											{
												marginBottom: "1rem"
											},
											children: (0, m.jsx)(c.Kx,
											{
												className: "medium mt_title",
												placeholder: L.Z.title_comment[g],
												maxRows: 1,
												//maxLength: 14,
												onChange: function(e)
												{
													if(!$$(".截图选项").eq(1).prop('checked'))$$(".截图选项").eq(1).click()
													$$('#mt_title').text(mt_text.title[mtlang]+" : "+(e.currentTarget.value ? e.currentTarget.value : mt_text.noTitle[mtlang]))
													mt_settings['截图选项'].titleStr = $$('#mt_title').text()
													$$('.INDEX_imageLength').text(INIT_state(S))
												},
												onKeyDown: function(e) {}
											})
										}), L.Z.writer[g], (0, m.jsx)(c.OP,
										{
											children: (0, m.jsx)(c.Kx,
											{
												className: "medium mt_writer",
												placeholder: L.Z.nickName_comment[g],
												maxRows: 1,
												//maxLength: 9,
												onChange: function(e)
												{
													if(!$$(".截图选项").eq(2).prop('checked'))$$(".截图选项").eq(2).click()
													$$('#mt_writer').text(mt_text.writer[mtlang]+" : "+(e.currentTarget.value ? e.currentTarget.value : mt_text.noName[mtlang]))
													mt_settings['截图选项'].writerStr = $$('#mt_writer').text()
													$$('.INDEX_imageLength').text(INIT_state(S))
												}
											})
										})]
									}), (0, m.jsxs)(ew,
									{
										style:
										{
											fontSize: "1rem"
										},
										children: [(0, m.jsx)("span",
										{
											children: L.Z.image_qaulity[g]
										}), (0, m.jsx)("div",
										{
											style:
											{
												display: "flex",
												fontSize: "0.9rem",
												marginLeft: "1rem"
											},
											children: [1.1, 2, 3].map(function(e)
											{
												return (0, m.jsxs)(c.Jg,
												{
													style:
													{
														marginRight: "1rem"
													},
													htmlFor: "iq_".concat(e),
													children: [(0, m.jsx)("input",
													{
														type: "checkbox",
														id: "iq_".concat(e),
														checked: S === e,
														className: "scale",
														onChange: function()
														{
															截屏预览(e)
															P(e)
														},
														value: e
													}), "x", e]
												}, e)
											})
										})]
									}), (0, m.jsx)(ew,
									{
										children: ej.map(function(e, n)
										{
											return (0, m.jsxs)(c.Jg,
											{
												style:
												{
													fontSize: "1rem",
													margin: "0 1rem"
												},
												htmlFor: e,
												children: [(0, m.jsx)("input",
												{
													type: "checkbox",
													className: '截图选项',
													title: e,
													value: n
												}), L.Z[e][g]]
											}, n)
										})
									}), (0, m.jsx)("span",
									{
										style:
										{
											textAlign: "center",
											fontSize: "0.9rem",
											marginBottom: "0.5rem"
										},
										children: L.Z.down_comment1[g]
									}), (0, m.jsx)("span",
									{
										style:
										{
											textAlign: "center",
											fontSize: "0.9rem",
											marginBottom: "0.5rem",
											cursor: 'pointer'
										},
										onClick: function()
										{
											$$('#size').click()
										},
										children: [$$('.dels:checked').length ? '已选中' : '共', (0, m.jsx)("span",
										{
											className:'bold red',
											children: $$('.dels:checked').length || chats.length
										}), '条消息，长', (0, m.jsx)("span",
										{
											className:'INDEX_imageLength bold red',
											children: INIT_state(S)
										}), '，将生成', (0, m.jsx)("span",
										{
											className:'bold red',
											children: imageArr.length
										}), '张',(0, m.jsx)("span",
										{
											id:'mt-image',
											className:'bold blue',
											style: {fontSize:'1.1rem'},
											children:mt_settings['图片格式'].split('/')[1]
										}), '图片']
									}), (0, m.jsx)("button",
									{
										style:
										{
											textAlign: "center",
											fontSize: "0.9rem",
											marginBottom: "0.5rem"
										},
										className: "bold",
										children: '点击更改生成图片的格式',//L.Z.thanks[g]
										onClick: function()
										{
											let image = prompt("请输入生成图片的格式：（不要乱输入）\npng（默认，质量最好体积最大）\njpeg（体积小，注意不是jpg）\nwebp（体积更小，不推荐火狐）", mt_settings['图片格式'].split('/')[1]);
											if(image != null)
											{
												alert('更改完成，如果图片生成错误请尝试改为其它参数');
												mt_settings['图片格式'] = 'image/'+image;
												saveStorage('设置选项',mt_settings,'local')
												$$('#mt-image').text(image)
											}
										}
									}), (0, m.jsxs)(ea.$_,
									{
										children: [(0, m.jsx)(ea.Lw,
										{
											className: "bold",
											onClick: function()
											{
												srceenMode()
												D()
											},
											children: L.Z.cancel[g]
										}), (0, m.jsx)(ea.AZ,
										{
											className: "bold",
											disabled: chats.length < 1,
											onClick: function()
											{
												O()
												DATA_NowTime = new Date().toLocaleString().replaceAll('/','').replaceAll(' ','-').replaceAll(':','');
											},
											children: L.Z.confirm[g]
										})]
									})]
								}), (0, m.jsx)(e_,
								{
									children: (0, m.jsxs)(eC,
									{
										style:
										{
											display: b ? "block" : "none"
										}
									})
								})]
							})]
						})
					})
				},
				ej = ["watermark", "title", "writer", "archive"],//#加入包含存档选项
				ew = o.ZP.div.withConfig(
				{
					displayName: "PopupImageDownload__Wrapper",
					componentId: "sc-uicakl-0"
				})(["", ";height:auto;margin-bottom:1rem;"], function(e)
				{
					return e.theme.common.flexBox(
					{})
				}),
				e_ = o.ZP.div.withConfig(
				{
					displayName: "PopupImageDownload__ImgContainer",
					componentId: "sc-uicakl-1"
				})(["position:relative;width:100%;height:auto;"]),
				eC = o.ZP.div.withConfig(
				{
					displayName: "PopupImageDownload__ImgWrapper",
					componentId: "sc-uicakl-2"
				})(["height:100%;width:100%;text-align:center;"]),
				ev = o.ZP.img.withConfig(
				{
					displayName: "PopupImageDownload__DownloadImg",
					componentId: "sc-uicakl-3"
				})(["width:100%;"]),
				ek = t(5733),
				eZ = t.n(ek),
				eN = t(83),
				eS = function(e)
				{
					var n, t = e.show,
						o = e.handleShow,
						a = (0, i.T)(),
						s = (0, i.C)(function(e)
						{
							return e.makeChat
						}),
						d = (0, i.C)(function(e)
						{
							return mtlang//#e.global.lang
						}),
						h = (0, r.useState)(""),
						f = h[0],
						p = h[1],
						g = (0, r.useState)(""),
						x = g[0],
						y = g[1],
						b = (0, r.useState)([
							{
								title: "",
								nickname: "",
								date: "",
								replyNo: 0,
								replyGroup: 0,
								chars: []
							},
							[]
						]),
						j = b[0],
						w = b[1],
						_ = (0, r.useRef)(null),
						C = ey(),
						v = (0, ec.Z)(C, 2),
						k = v[0],
						Z = v[1],
						N = function()
						{
							o(!1), p(""), y("")
						},
						S = (n = (0, ed.Z)(em().mark(function e()
						{
							var n, t, r, o;
							return em().wrap(function(e)
							{
								for(;;) switch (e.prev = e.next)
								{
									case 0:
										return r = [JSON.stringify([t = {
											title: "" !== f ? f : L.Z.noTitle[d],
											nickname: "" !== k ? k : L.Z.noName[d],
											date: (0, u._3)(!0, !0),
											mt_char: mt_char,//@自创角色
											mt_head: mt_head,//@自创头像
											'选择角色': mt_settings['选择角色']//@
										}, [...chats,...otherChats]],null,4)], e.next = 6, (0, u.rU)(r);
									case 6:
										if(Html5Plus)
										{
											saveServerDatatoFile(`MoeTalk${L.Z.sharedFile[d]}_${t.title}_${(0, u._3)(!0, !0)}_${INIT_state()}`, r[0] ,'json');
										}
										else
										{
											o = e.sent, (0, ef.saveAs)(o,`MoeTalk${L.Z.sharedFile[d]}_${t.title}_${INIT_state()}.png`), blobToBase64(o,function(base64)
											{
												$$('#downImg').html(`<h1>${L.Z.image_download[d]}</h1><h1>可当做压缩文件打开</h1><img src='data:image/png;base64,${base64}'>`)
											});
										}
									case 9:
									case "end":
										return e.stop()
								}
							}, e)
						})), function()
						{
							return n.apply(this, arguments)
						}),
						P = function(e)
						{
							if(null !== e.currentTarget.files)
							{
								var n = new FileReader,
									t = e.currentTarget.files[0];
								n.onloadend = function()
								{
									if("string" != typeof n.result) return a((0, er.Y2)(
									{
										isAlert: !0,
										ment: L.Z.error[d],
										title: L.Z.no_support[d]
									}));
									w(loaddata(n.result)), y("upload")//#编译存档
								}, eZ().loadAsync(t).then(function(e)
								{
									e.forEach(function(e, t)
									{
										t.dir || t.async("blob").then(function(e)
										{
											n.readAsText(e)
										})
									})
								}, function(e)
								{
									t ? n.readAsText(t) : a((0, er.Y2)(
									{
										isAlert: !0,
										ment: L.Z.error[d],
										title: L.Z.no_support[d]
									}))
								})
							}
						},
						I = function()
						{
							chats = []
							otherChats = []
							j.CHAT.map(function(v,k)
							{
								if(v.replyDepth !== 0)otherChats.push(v)
								else chats.push(v)
							})
							if($$('.INDEX_LoadChar:checked').length)
							{
								mt_char = {...mt_char,...j.CHAR.id}
								mt_head = {...mt_head,...j.CHAR.image}
								saveStorage('mt-char',mt_char,'local')
								saveStorage('mt-head',mt_head,'local')
							}
							if($$('.INDEX_LoadEmoji:checked').length)
							{
								if(j.EMOJI.id)
								{
									j.EMOJI.Emoji = j.EMOJI.id
									delete j.EMOJI.id
								}
								$$.each(j.EMOJI,function(id,obj)
								{
									if(!EMOJI_CustomEmoji[id])EMOJI_CustomEmoji[id] = obj
									else EMOJI_CustomEmoji[id] = {...EMOJI_CustomEmoji[id],...obj}
								})
								saveStorage('DB_EMOJI',EMOJI_CustomEmoji,'local')
							}
							mt_settings = j.SETTING
							CHAR_UpdateChar()
							log(true)//清除历史记录
							replyDepth(0,'home')//清除跳转记录
							saveStorage('设置选项',mt_settings,'local')
							saveStorage('chats',[...chats,...otherChats],'local')
							N()
						};
					return (0, m.jsx)(ea.Xf,
					{
						className: t ? "visible medium" : "medium",
						onDoubleClick: function()
						{
							N()
						},
						children: (0, m.jsxs)(ea.F0,
						{
							onDoubleClick: function(e)
							{
								return e.stopPropagation(), !1
							},
							children: [(0, m.jsxs)(ea.h4,
							{
								children: [(0, m.jsx)(ea.Dx,
								{
									className: "bold",
									children: L.Z.sharedFile[d]
								}), (0, m.jsx)(ea.ec,
								{
									onClick: function()
									{
										N()
									},
									children: (0, m.jsx)(c.j4,
									{})
								})]
							}),
							//*
							
							(0, m.jsx)("span",
							{
								hidden: x !== "download",
								children: [(0, m.jsx)("input",
								{
									type: "checkbox",
									className: "INDEX_Closure",
								}),"下载closuretalk存档"]
							}),
							//*
							(0, m.jsx)(ea.$0,
							{
								children: "" === x ? (0, m.jsxs)(m.Fragment,
								{
									children: [(0, m.jsx)("input",
									{
										type: "file",
										ref: _,
										style:
										{
											display: "none"
										},
										accept: mt_settings['图片存档'] ? 'image/png' : 'application/json',
										onChange: function(e)
										{
											P(e)
										}
									}), (0, m.jsxs)(eP,
									{
										onClick: function()
										{
											var e;
											null === (e = _.current) || void 0 === e || e.click()
										},
										children: [(0, m.jsx)(eI,
										{
											children: (0, m.jsx)(c.xL,
											{
												icon: ico.cf$
											})
										}), (0, m.jsx)("span",
										{
											className: "bold",
											children: L.Z.upload[d]
										}), (0, m.jsx)("span",
										{
											style:
											{
												margin: "1rem",
												fontSize: "1rem"
											},
											children: L.Z.edit_comment[d]+'支持ClosureTalk存档'
										}), (0, m.jsx)("span",
										{
											style:
											{
												margin: "1rem",
												fontSize: "1rem"
											},
											children: '上传图片存档需在设置页面开启“旧版图片存档”选项'
										})]
									}), (0, m.jsx)(eN.HR,
									{
										style:
										{
											margin: "1rem 0"
										}
									}), (0, m.jsxs)(eP,
									{
										onClick: function()
										{
											[...chats,...otherChats].length > 0 && y("download")
										},
										children: [(0, m.jsx)(eI,
										{
											disabled: [...chats,...otherChats].length < 1,
											children: (0, m.jsx)(c.xL,
											{
												icon: ico.q7m
											})
										}), (0, m.jsx)("span",
										{
											className: "bold",
											children: L.Z.download[d]
										}), (0, m.jsx)("span",
										{
											style:
											{
												margin: "1rem",
												fontSize: "1rem"
											},
											children: L.Z.down_comment2[d]
										}), (0, m.jsx)("span",
										{
											style:
											{
												fontSize: "1rem"
											},
											children: L.Z.down_comment3[d]
										})]
									})]
								}) : "download" === x ? (0, m.jsxs)(m.Fragment,
								{
									children: [(0, m.jsxs)(eB,
									{
										children: [L.Z.title[d], (0, m.jsx)(c.OP,
										{
											style:
											{
												marginBottom: "1rem"
											},
											children: (0, m.jsx)(c.Kx,
											{
												className: "medium",
												placeholder: L.Z.title_comment[d],
												maxRows: 1,
												value: f,
												onChange: function(e)
												{
													e.currentTarget.value.match("\n") || p(e.currentTarget.value)
												}
											})
										}), L.Z.writer[d], (0, m.jsx)(c.OP,
										{
											children: (0, m.jsx)(c.Kx,
											{
												className: "medium",
												placeholder: L.Z.nickName_comment[d],
												maxRows: 1,
												value: k,
												onChange: function(e)
												{
													e.currentTarget.value.match("\n") || Z(e.currentTarget.value)
												}
											})
										})]
									}), (0, m.jsx)("pre",
									{
										id:'downImg',
										style:
										{
											whiteSpace: 'pre-wrap',
											wordBreak: 'break-all'
										},
									}), (0, m.jsxs)(ea.$_,
									{
										children: [(0, m.jsx)(ea.Lw,
										{
											className: "bold",
											onClick: function()
											{
												N()
											},
											children: L.Z.cancel[d]
										}), (0, m.jsx)(ea.AZ,
										{
											className: "bold",
											onClick: function()
											{
												if($$('.INDEX_Closure').prop('checked') === true)
												{
													MoeToClosure()
												}
												else
												{
													if(mt_settings['图片存档'])
													{
														S()
														return
													}
													f = f ? f : "无题"
													k = k ? k : "佚名"
													let time = new Date().toLocaleString().replaceAll('/','').replaceAll(' ','-').replaceAll(':','');
													let json = {}
													json.MoeTalk = 本地版本
													json.INFO = {}//存档信息
													json.INFO.title = f
													json.INFO.nickname = k
													json.INFO.date = time
													json.CHAR = {}//自定义角色
													json.CHAR.id = mt_char
													json.CHAR.image = mt_head
													json.EMOJI = EMOJI_CustomEmoji//自定义表情
													json.SETTING = mt_settings//设置信息
													json.CHAT = [...chats,...otherChats]//MMT数据
													download(`MoeTalk_${f}_${time}.JSON`,json)
												}
											},
											children: L.Z.download[d]
										})]
									})]
								}) : (0, m.jsxs)(m.Fragment,
								{
									children: [(0, m.jsx)("span",
									{
										children: L.Z.up_comment1[d]
									}), (0, m.jsx)("span",
									{
										children: [(0, m.jsx)("input",
										{
											className: "INDEX_LoadChar",
											style:
											{
												width: '1rem',
												height: '1rem'
											},
											type: 'checkbox',
										}),`同时并添加存档内的自定义角色${Object.keys(j.CHAR.id).length}名`]
									}), (0, m.jsx)("span",
									{
										children: [(0, m.jsx)("input",
										{
											className: "INDEX_LoadEmoji",
											style:
											{
												width: '1rem',
												height: '1rem'
											},
											type: 'checkbox'
										}),`和自定义表情${Object.keys(j.EMOJI.image).length}张`]
									}), (0, m.jsxs)("div",
									{
										style:
										{
											margin: "1.5rem 0"
										},
										children: [(0, m.jsxs)(eT,
										{
											children: [L.Z.title[d], " : ", j.INFO.title]
										}), (0, m.jsxs)(eT,
										{
											children: [L.Z.writer[d], " : ", j.INFO.nickname]
										}), (0, m.jsxs)(eT,
										{
											children: [L.Z.date[d], " : ", j.INFO.date]
										})]
									}), (0, m.jsxs)("span",
									{
										style:
										{
											fontSize: "1rem"
										},
										children: ["※", L.Z.up_comment2[d]]
									}), (0, m.jsxs)(ea.$_,
									{
										children: [(0, m.jsx)(ea.Lw,
										{
											className: "bold",
											onClick: function()
											{
												N()
											},
											children: L.Z.cancel[d]
										}), (0, m.jsx)(ea.AZ,
										{
											className: "bold",
											onClick: function()
											{
												I()
											},
											children: L.Z.confirm[d]
										})]
									})]
								})
							})]
						})
					})
				},
				eP = o.ZP.div.withConfig(
				{
					displayName: "PopupFileShare__IconBox",
					componentId: "sc-ynp9rx-0"
				})(["", ";height:auto;flex-direction:column;width:100%;text-align:center;cursor:pointer;"], function(e)
				{
					return e.theme.common.flexBox(
					{
						direction: "column"
					})
				}),
				eI = (0, o.ZP)(c.hU).withConfig(
				{
					displayName: "PopupFileShare__ShareButton",
					componentId: "sc-ynp9rx-1"
				})(["margin-bottom:1rem;width:3rem;height:3rem;color:", ";"], function(e)
				{
					return e.theme.color.rgb45_70_100
				}),
				eB = o.ZP.div.withConfig(
				{
					displayName: "PopupFileShare__StyledForm",
					componentId: "sc-ynp9rx-2"
				})(["", ";height:auto;line-height:2rem;"], function(e)
				{
					return e.theme.common.flexBox(
					{
						direction: "column",
						align: "flex-start"
					})
				}),
				eT = o.ZP.span.withConfig(
				{
					displayName: "PopupFileShare__InfoSpan",
					componentId: "sc-ynp9rx-3"
				})(["display:block;text-align:left;font-size:1.1rem;margin-bottom:1rem;"]),
				eR = function(e)
				{
					var n = e.scrollRef,
						t = e.show,
						o = e.sendChat,
						a = (0, i.T)(),
						u = (0, i.C)(function(e)
						{
							return e.sCharacter.selected
						}),
						d = (0, i.C)(function(e)
						{
							return e.makeChat.chats
						}),
						h = (0, i.C)(function(e)
						{
							return e.global.isScreenshot
						});
					(0, i.C)(function(e)
					{
						return mtlang//#e.global.lang
					});
					var f = (0, ex.vC)(
						{
							fixedCacheKey: "account"
						}),
						p = (0, ec.Z)(f, 2);
					p[0], p[1];
					var g = (0, r.useState)(!1),
						x = g[0],
						y = g[1],
						b = (0, r.useState)(!1),
						j = b[0],
						w = b[1],
						_ = (0, r.useState)(!1),
						C = _[0],
						v = _[1],
						k = (0, r.useState)(!1),
						Z = k[0],
						N = k[1],
						S = (0, r.useState)(!1),
						P = S[0],
						I = S[1];
					return (0, m.jsxs)(eF,
					{
						style:{height:0},
						children: [(0, m.jsxs)(eD,
						{
							children: [(0, m.jsx)(eO,
							{
								id: "tool-reply",//@选择肢
								title: "Reply",
								onClick: function()
								{
									v(!0)
								}
							}), (0, m.jsx)(eO,
							{
								id: "tool-info",//@旁白
								title: "Info",
								onClick: function()
								{
									I(!0)
								}
							})]
						}), (0, m.jsxs)(eD,
						{
							children: [(0, m.jsx)(eO,
							{
								id: "tool-image",//@截图工具
								title: "Image Download",
								onClick: function()
								{
									imageArrL = 0
									截屏预览()
									y(!0)
								}
							}), (0, m.jsx)(eO,
							{
								id: "tool-save",//@存档工具
								title: "Share File",
								onClick: function()
								{
									w(!0)
								}
							})]
						}), (0, m.jsx)(el,
						{
							show: P,
							handleShow: function(e)
							{
								I(e)
							},
							sendChat: o
						}), (0, m.jsx)(es,
						{
							show: C,
							handleShow: function(e)
							{
								v(e)
							},
							isFirst: !1,
							sReply: null,
							scrollRef: n
						}), (0, m.jsx)(eb,
						{
							show: x,
							handleShow: function(e)
							{
								y(e)
							},
							scrollRef: n
						}), (0, m.jsx)(eS,
						{
							show: j,
							handleShow: function(e)
							{
								w(e)
							}
						})]
					})
				},
				eF = o.ZP.div.withConfig(
				{
					displayName: "ToolBox__Container",
					componentId: "sc-1ssk4pv-0"
				})(["", ";height:auto;border-top:2px solid ", ";transition:max-height 0.3s ease-in-out;overflow:hidden;box-sizing:border-box;"], function(e)
				{
					return e.theme.common.flexBox(
					{
						direction: "column"
					})
				}, function(e)
				{
					return e.theme.color.rgb230_233_235
				}),
				eD = o.ZP.div.withConfig(
				{
					displayName: "ToolBox__Wrapper",
					componentId: "sc-1ssk4pv-1"
				})(["", ";height:auto;"], function(e)
				{
					return e.theme.common.flexBox(
					{
						justify: "space-around"
					})
				}),
				eO = (0, o.ZP)(c.hU).withConfig(
				{
					displayName: "ToolBox__ToolButton",
					componentId: "sc-1ssk4pv-2"
				})(["width:2.5rem;height:2.5rem;margin:1.5rem 0;color:", ";&.dot:after{content:'';display:block;background-color:red;width:0.5rem;height:0.5rem;transform:translate(500%,-550%);border-radius:50%;}"], function(e)
				{
					return e.theme.color.rgb45_70_100
				}),
				eL = function(e)
				{
					var n = e.show,
						t = e.handleShow,
						r = (0, i.T)(),
						o = (0, i.C)(function(e)
						{
							return e.sCharacter.selected
						}),
						a = (0, i.C)(function(e)
						{
							return e.makeChat
						}),
						l = (0, i.C)(function(e)
						{
							return mtlang//#e.global.lang
						}),
						s = function()
						{
							EMOJI.pages[EMOJI.id].scrollTop = $$('.PopupEmoticonChat__Section2-sc-vzjcea-0').scrollTop()
							t(!1)
						};
					//*定义差分文件链接
					if(EMOJI.io != 'NO')
					{
						EMOJI.type = EMOJI.io;
						EMOJI.io = 'NO';//@加入判断
						return (0, m.jsx)(m.Fragment,
						{
							children: (0, m.jsx)(ea.Xf,
							{
								id:'emoji',//@
								className: n ? "visible medium" : "medium",
								onDoubleClick: function()
								{
									s()
								},
								children: (0, m.jsxs)(ea.F0,
								{
									onDoubleClick: function(e)
									{
										return e.stopPropagation(), !1
									},
									children: [(0, m.jsxs)(ea.h4,
									{
										children: [EMOJI.type === 'CharFace' ? (0, m.jsx)(c.Bx,
										{
											style:
											{
												"width": "auto",
												height: '100%',
												color: '#3f51b5',
												position: 'absolute',
												left: 0,
												color: 差分映射 ? 'red' : 'rgb(63, 81, 181)'
											},
											className: "bold",
											children: 差分映射 ? '默认角色' : '切换角色',
											onClick:function()
											{
												if(差分映射)
												{
													差分映射 = false
												}
												else
												{
													差分映射 = []
													差分映射.id = mt_settings.选择角色.no
													差分映射.index = mt_settings.选择角色.index
												}
												$$('.INDEX_Emoji').click()
											}
										}) : (0, m.jsx)(c.Bx,
										{
											style:
											{
												"width": "auto",
												height: '100%',
												color: '#3f51b5',
												position: 'absolute',
												left: 0,
												color: 'rgb(63, 81, 181)'
											},
											className: "bold",
											hidden: EMOJI.type === 'CharFace',
											children: '切换表情',
											onClick:function()
											{
												if(EMOJI.type === 'Emoji')
												{
													alert('点击表情窗口的顶部标题可以快速切换表情或差分\n设置页面可以设置隐藏差分按钮')
												}
											}
										}), (0, m.jsx)(c.Bx,
										{
											className: "bold",
											style: 
											{
												padding: "revert",
												width: "auto",
												fontSize: '1.5rem',
												border: '3px solid rgb(63, 81, 181)',
												color: 差分映射 && EMOJI.type === 'CharFace' ? "red" : "rgb(63, 81, 181)"
											},
											onClick: function()
											{
												EMOJI.type = EMOJI.type === 'CharFace' ? 'Emoji' : 'CharFace'
												$$('.INDEX_Emoji').click()
											},
											children: EMOJI.title//#加入差分表情
										}), (0, m.jsx)(ea.ec,
										{
											onClick: function()
											{
												s()
											},
											children: (0, m.jsx)(c.j4,
											{})
										}), (0, m.jsx)(ea.ec,
										{
											className: 'INDEX_Emoji',hidden: !0,
											onClick: function(){s()}
										})]
									}), (0, m.jsxs)(ea.h4,
									{
										children: [(0, m.jsx)(c.Bx,
										{
											style:
											{
												"width": "auto",
												height: '100%',
												color: EMOJI.custom.title ? '#3f51b5' : '',
												position: 'absolute',
												left: 0
											},
											className: "bold",
											disabled: !EMOJI.custom.title,
											children: EMOJI.custom.title ? EMOJI.custom.title : '切换内置',
											onClick:function()
											{
												let type = ''
												if(EMOJI.custom.io)
												{
													type = 'origin'
												}
												else
												{
													type = 'custom'
												}
												mt_emojis(type,EMOJI.type)
												$$('.INDEX_Emoji').click()
												EMOJI.pages[EMOJI.id].scrollTop = 0
											}
										}), (0, m.jsx)(c.Bx,
										{
											className: "bold",
											style:
											{
												"width": "auto",
												"color": "rgb(63, 81, 181)"
											},
											children: '◀',
											hidden: EMOJI.pageindex == '0 / 0' || EMOJI.pageindex == '1 / 1',
											onClick:function()
											{
												mt_emojis('-',EMOJI.type)
												$$('.INDEX_Emoji').click()
												EMOJI.pages[EMOJI.id].scrollTop = 0
											}
										}), (0, m.jsx)(ea.Dx,
										{
											className: "bold",
											style:
											{
												textAlign:"center",
												color: EMOJI.custom.io ? 'rgb(63, 81, 181)' : EMOJI.custom.from ? 'red' : mt_charface[EMOJI.id] && mt_charface[EMOJI.id].filter(function(item){return item[0][0].indexOf('CFID') > -1}).length ? 'green' : ''
											},
											children: EMOJI.pageindex
										}), (0, m.jsx)(c.Bx,
										{
											className: "bold",
											style:
											{
												"width": "auto",
												"color": "rgb(63, 81, 181)"
											},
											children: '▶',
											hidden: EMOJI.pageindex == '0 / 0' || EMOJI.pageindex == '1 / 1',
											onClick:function()
											{
												mt_emojis('+',EMOJI.type)
												$$('.INDEX_Emoji').click()
												EMOJI.pages[EMOJI.id].scrollTop = 0
											}
										})]
									}), (0, m.jsxs)(ea.h4,
									{
										style: {height: '4rem'},
										hidden: !差分映射 || EMOJI.type === 'Emoji',
										children: !差分映射 || EMOJI.type === 'Emoji' ? '' : (0, m.jsx)(HList.Z,
										{
											children: (0, m.jsx)(k,
											{
												style: {padding:0},
												children: mt_settings['选择角色'].list.concat({no:'0',index:'1'}).map(function(e, n)
												{
													return (0, m.jsx)(c.t_,
													{
														alt: String(e.no),
														title: String(e.index),
														src: loadhead(e.no,e.index),
														onError: function(e){IMAGE_error(e)},
														className: '差分映射 '+ (e.no == 差分映射.id && e.index == 差分映射.index ? 'selected' : '')
													}, n)
												})
											})
										})
									}), (0, m.jsx)(eE,
									{
										children: (0, m.jsxs)(eM,
										{
											children: [EMOJI.images.map(function(v,k)
											{
												let link = EMOJI.path+v+'.webp'
												let 前缀 = href+''
												let EmojiInfo = mt_settings['表情信息'][v] ? mt_settings['表情信息'][v] : CFInfo[v] ? CFInfo[v] : v
												EmojiInfo = EmojiInfo === undefined ? '' : EmojiInfo
												if(EMOJI.custom.io)
												{
													前缀 = ''
													link = v
												}
												return (0, m.jsx)('div',
												{
													style: 
													{
														width: '32%',
														border: '2px solid rgb(230, 233, 235)',
														backgroundColor: 'rgb(255, 255, 255)',
														borderRadius: '10px',
														marginBottom: '0.5rem',
														cursor: 'pointer',
														position: 'relative'
													},
													children: [mt_settings['表情信息'][v] || v.substring(v.lastIndexOf('/')+1),(0, m.jsx)('img',
													{
														alt: EMOJI.type,
														height: 310,
														width: 310,
														style:
														{
															color: 'transparent',
															width: '100%',
															height: 'auto'
														},
														src: 前缀+link,
														onError: function(e){IMAGE_error(e)},
														onClick: function()
														{
															sendMessage({file: link,content: EMOJI.type},'image'), s()
														},
													}), (0, m.jsx)('span',
													{
														className: 'INDEX_EmojiIfno',
														style:
														{
															width: '100%',
															whiteSpace: 'pre-wrap',
															wordWrap: 'break-word',
															position: 'absolute',
															top: 0,
															left: 0,
															display: 'none',
															color: 'red',
															backgroundColor:'white',
															overflow: 'hidden',
															maxHeight: '100%'
														},
														children: [(0, m.jsx)('span',
														{
															className: "bold",
															style:
															{
																"width": "auto",
																"color": "rgb(63, 81, 181)"
															},
															children: (EMOJI.custom.from ? EMOJI.custom.from.name : '点击编辑表情')+'\n',
															hidden: !link
														}),EmojiInfo]
													})]
												}, n)
											})]
										})
									})]
								})
							})
						})
					}
					//*定义差分文件链接
				},
				eE = (0, o.ZP)(ea.$0).withConfig(
				{
					displayName: "PopupEmoticonChat__Section2",
					componentId: "sc-vzjcea-0"
				})(["", `;overflow:hidden;overflow-y:auto;max-height:${browser.isMobile ? '30' : '45'}rem;padding:0.5rem;`], function(e)
				{
					return e.theme.common.flexBox(
					{
						justify: "space-between",
						align: "flex-start"
					})
				}),
				eM = o.ZP.div.withConfig(
				{
					displayName: "PopupEmoticonChat__Body",
					componentId: "sc-vzjcea-1"
				})(["", ";flex-wrap:wrap;background-color:", ";border-radius:0.5rem;justify-content:space-between;padding:0.5rem;height:auto;"], function(e)
				//#height:auto;
				{
					return e.theme.common.flexBox(
					{
						justify: "space-between",
						align: "flex-start"
					})
				}, function(e)
				{
					return e.theme.color.rgb216_218_220
				}),
				ez = (0, o.ZP)(c.Yo).withConfig(
				{
					displayName: "PopupEmoticonChat__ImgBox",
					componentId: "sc-vzjcea-2"
				})(["width:32%;height:32%;border:2px solid ", ";background-color:", ";border-radius:10px;margin-bottom:0.5rem;cursor:pointer;&:active{transform:scale(0.95);}"], function(e)
				{
					return e.theme.color.rgb230_233_235
				}, function(e)
				{
					return e.theme.color.rgb255_255_255
				}),
				eA = function(e)
				{
					var n = e.scrollRef,
						t = (0, i.T)(),
						o = (0, i.C)(function(e)
						{
							return e.makeChat.chats
						}),
						a = (0, i.C)(function(e)
						{
							return e.makeChat.sReplyNo
						}),
						s = (0, i.C)(function(e)
						{
							return e.sCharacter.selected
						}),
						h = (0, i.C)(function(e)
						{
							return mtlang//#e.global.lang
						}),
						f = (0, r.useState)(!1),
						p = f[0],
						g = f[1],
						x = (0, r.useState)(!1),
						y = x[0],
						b = x[1],
						j = (0, r.useState)(" "),
						w = j[0],
						_ = j[1],
						C = (0, r.useState)(!1),
						v = C[0],
						k = C[1],
						Z = (0, r.useRef)(null),
						N = (0, r.useRef)(null);
					(0, r.useEffect)(function()
					{
						setTimeout(function()
						{
							_("")
						}, 500)
					}, []);
					var S = function(e)
					{
						b(e)
					};
					(0, r.useEffect)(function()
					{
						var e;
						"" === w && Z.current && v && (null === (e = Z.current) || void 0 === e || e.focus())
					}, [w, Z, v]);
					var P = function(e, n)
						{
							//*更改文字发送方式
							if(13 === (e.which || e.keyCode) && !(e.ctrlKey || e.shiftKey) && "" !== e.currentTarget.value && mt_settings['发送方式'] === '回车')
							{
								e.preventDefault()
								n()
							}
							if(13 === (e.which || e.keyCode) && (e.ctrlKey || e.shiftKey) && "" !== e.currentTarget.value && mt_settings['发送方式'] === '点击')
							{
								e.preventDefault()
								n()
							}
							//*更改文字发送方式
							/*
							13 === (e.which || e.keyCode) && (e.ctrlKey || e.shiftKey) && (e.preventDefault(), "" !== e.currentTarget.value && n())
							*/
						};
					return (0, m.jsxs)(eq,
					{
						children: [(0, m.jsxs)(eG,
						{
							children: [(0, m.jsx)(eU,
							{
								style:
								{
									paddingLeft: "0",
									width: "3rem"
								},
								className:'Screenshot_Mode',
								children: (0, m.jsx)(c.xL,
								{
									icon: ico.QY_
								})
							}), (0, m.jsx)("input",
							{
								type: "file",
								ref: N,
								style:
								{
									display: "none"
								},
								accept: "image/*",
								onChange: function(e)
								{
									var file = e.target.files[0]
									var ready = new FileReader()
									ready.readAsDataURL(file);
									ready.onload = function(e)
									{
										var base64Img = e.target.result;
										compress(base64Img,'image')
									}
								}
							}), (0, m.jsx)(eU,
							{
								style:
								{
									paddingLeft: "0",
									width: "3rem"
								},
								title: "Image",
								onClick: function()
								{
									var e;
									null === (e = N.current) || void 0 === e || e.click()
								},
								children: (0, m.jsx)(c.xL,
								{
									icon: ei.VmB
								})
							}), (0, m.jsx)("div",
							{
								style:
								{
									width: "100%",
									padding: "0.5rem 0"
								},
								children: (0, m.jsxs)(c.OP,
								{
									children: [(0, m.jsx)(c.Kx,
									{
										className: "medium chatText",
										placeholder: L.Z.input_comment[h],
										maxRows: 5,
										onKeyDown: function(e)
										{
											P(e, function()
											{
												if($$('.chatText').val() !== '')
												{
													sendMessage({content: $$('.chatText').val()},'chat')//#回车发送
												}
											})
										},
									}), (0, m.jsx)(eU,
									{
										style:
										{
											padding: "0.2rem",
											width: "2.2rem",
											height: "2.2rem"
										},
										className: "INDEX_EmojiButton",
										onClick: function()
										{
											if(mt_settings['隐藏差分'])
											{
												if(EMOJI.type === 'NO')EMOJI.type = 'Emoji'
											}
											else EMOJI.type = 'Emoji'
											EMOJI.io = EMOJI.type;
											mt_emojis(S,EMOJI.type)
										},
										children: (0, m.jsx)(c.xL,
										{
											icon: ei.pkM
										})
									}), !mt_settings['隐藏差分'] ? (0, m.jsx)(eU,
									{
										style:
										{
											padding: "0.2rem",
											width: "2.2rem",
											height: "2.2rem"
										},
										className: "INDEX_CharFaceButton",
										onClick: function()
										{
											EMOJI.io = EMOJI.type = 'CharFace';
											mt_emojis(S,EMOJI.type)
										},
										children: (0, m.jsx)(c.xL,
										{
											style: {color: 'rgb(139, 187, 233)'},
											icon: ico.FKd
										})
									}) : '']
								})
							}), (0, m.jsx)(eU,
							{
								style:
								{},
								title: "send",
								//disabled: w.length < 1,
								onClick: function()
								{
									if($$('.chatText').val() !== '')
									{
										sendMessage({content: $$('.chatText').val()},'chat')//#单击发送
									}
								},
								children: (0, m.jsx)(c.xL,
								{
									icon: ico.FQ0
								})
							})]
						}), (0, m.jsx)(eR,
						{
							show: p,
							scrollRef: n,
							sendChat: I
						}), (0, m.jsx)(eL,
						{
							show: y,
							handleShow: S
						})
						//**
						, (0, m.jsxs)(eD,
						{
							className: "tools",
							style:
							{
								padding: "5px 0",
							},
							children: [
								(0, m.jsx)(eU,
								{
									style:
									{
										padding: "0.2rem",
										width: "2.2rem",
										height: "2.2rem"
									},
									title: "选项",
									onClick: function()
									{
										click('#tool-reply')
									},
									children: (0, m.jsx)(c.xL,
									{
										icon: ico.Lh7
									})
								}),
								(0, m.jsx)(eU,
								{
									style:
									{
										padding: "0.2rem",
										width: "2.2rem",
										height: "2.2rem"
									},
									title: "旁白",
									onClick: function()
									{
										click('#tool-info')
									},
									children: (0, m.jsx)(c.xL,
									{
										icon: ico.DBf
									})
								}),
								(0, m.jsx)(eU,
								{
									style:
									{
										padding: "0.2rem",
										width: "2.2rem",
										height: "2.2rem"
									},
									title: "羁绊",
									onClick: function()
									{
										sendMessage({content: ''},'heart')
									},
									children: (0, m.jsx)(c.xL,
									{
										icon: ico.m6i
									})
								}),
								(0, m.jsx)(eU,
								{
									style:
									{
										padding: "0.2rem",
										width: "2.2rem",
										height: "2.2rem"
									},
									title: "存档",
									onClick: function()
									{
										alert('请通过新版MoeTalk上传或下载存档')
										// click('#tool-save')
									},
									children: (0, m.jsx)(c.xL,
									{
										icon: ico.EdJ
									})
								}),
								(0, m.jsx)(eU,
								{
									style:
									{
										padding: "0.2rem",
										width: "2.2rem",
										height: "2.2rem"
									},
									onClick: function()
									{
										alert('请通过新版MoeTalk生成截图')
										// mt_title()
									},
									children: (0, m.jsx)(c.xL,
									{
										icon: ico.wf8
									})
								})
								]
						})
						//**
						]
					})
				},
				eq = o.ZP.div.withConfig(
				{
					displayName: "InputBar__Container",
					componentId: "sc-1fvyhr8-0"
				})(["", ";height:auto;background-color:", ";border-top:2px solid ", ";"], function(e)
				{
					return e.theme.common.flexBox(
					{
						direction: "column"
					})
				}, function(e)
				{
					return e.theme.color.rgb243_247_248
				}, function(e)
				{
					return e.theme.color.rgb230_233_235
				}),
				eG = o.ZP.div.withConfig(
				{
					displayName: "InputBar__Wrapper",
					componentId: "sc-1fvyhr8-1"
				})(["display:flex;width:100%;height:auto;padding:0;"]),
				eU = (0, o.ZP)(c.hU).withConfig(
				{
					displayName: "InputBar__InputButton",
					componentId: "sc-1fvyhr8-2"
				})(["padding:0 1rem;width:4rem;height:3rem;align-self:center;color:", ";"], function(e)
				{
					return e.theme.color.rgb45_70_100
				});

			function eH(e, n)
			{
				var t = Object.keys(e);
				if(Object.getOwnPropertySymbols)
				{
					var r = Object.getOwnPropertySymbols(e);
					n && (r = r.filter(function(n)
					{
						return Object.getOwnPropertyDescriptor(e, n).enumerable
					})), t.push.apply(t, r)
				}
				return t
			}

			function eY(e)
			{
				for(var n = 1; n < arguments.length; n++)
				{
					var t = null != arguments[n] ? arguments[n] :
					{};
					n % 2 ? eH(Object(t), !0).forEach(function(n)
					{
						(0, w.Z)(e, n, t[n])
					}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : eH(Object(t)).forEach(function(n)
					{
						Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(t, n))
					})
				}
				return e
			}
			var eK = function(e)
				{
					var n = e.show,
						t = e.selectChat,
						o = e.handleShow,
						a = e.sChatModeType,
						l = e.setSChatModeType,
						s = (0, i.T)(),
						h = (0, i.C)(function(e)
						{
							return e.makeChat
						}),
						f = (0, i.C)(function(e)
						{
							return mtlang//#e.global.lang
						}),
						p = (0, i.C)(function(e)
						{
							return e.sCharacter.selected
						}),
						g = (0, r.useState)(t.type),
						x = g[0],
						y = g[1],
						b = (0, r.useState)(""),
						j = b[0],
						w = b[1],
						_ = (0, r.useRef)(null);
					//*编辑界面
					return (0, m.jsx)(ea.Xf,
					{
						className: n ? "editMessage medium visible" : "editMessage medium",
						style:{position:'absolute'},
						onDoubleClick: function()
						{
							$$('.editMessage').removeClass('visible').find('input:checkbox').prop('checked',false)//S()
							CHAT_HeadList = false
						},
						children: (0, m.jsxs)(ea.F0,
						{
							onDoubleClick: function(e)
							{
								return e.stopPropagation(), !1
							},
							children: [(0, m.jsxs)(ea.h4,
							{
								children: [(0, m.jsx)(ea.Dx,
								{
									className: "typeTitle bold"
								}), (0, m.jsx)(ea.ec,
								{
									onClick: function()
									{
										$$('.editMessage').removeClass('visible').find('input:checkbox').prop('checked',false)//S()
										CHAT_HeadList = false
									},
									children: (0, m.jsx)(c.j4,{})
								})]
							}), (0, m.jsxs)(ea.$0,
							{
								children: [(0, m.jsx)('div',
								{
									className: "edit_2",
									children: [(0, m.jsx)('div',
									{
										className:"edit_2_1",
										children:(0, m.jsx)('div',
										{
											style:{textAlign: 'left'},
											className:"edit_2_1_1 bold",
											children:[(0, m.jsx)('label',
											{
												children:[(0, m.jsx)('input',
												{
													type:'checkbox',
													className:'editType'
												}),'修改类型']
											}),(0, m.jsx)('label',
											{
												children:[(0, m.jsx)('input',
												{
													type:'checkbox',
													className:'editTalk'
												}),'修改显示']
											}),(0, m.jsx)('label',
											{
												children:[(0, m.jsx)('input',
												{
													type:'checkbox',
													className:'addChat'
												}),L.Z.add[f]]
											}),(0, m.jsx)('label',
											{
												style:{color:'blue'},
												children:[(0, m.jsx)('input',
												{
													type:'checkbox',
													className:'isFirst',
													onClick: function()
													{
														$$('.isCenter').prop('checked',false)
													}
												}),(0, m.jsx)('span',{children:'显示头像'})],
											}),(0, m.jsx)('label',
											{
												children:[(0, m.jsx)('input',
												{
													type:'checkbox',
													className:'isRight',
													onClick: function()
													{
														$$('.isCenter').prop('checked',false)
													}
												}),(0, m.jsx)('span',{children:'右侧发言'})],
											}),(0, m.jsx)('label',
											{
												children:[(0, m.jsx)('input',
												{
													type:'checkbox',
													className:'is_breaking'
												}),'截图时在此处分割'],
												style:{color:'red'}
											}),(0, m.jsx)('label',
											{
												children:[(0, m.jsx)('input',
												{
													type:'checkbox',
													className:'isCenter',
													onClick: function()
													{
														$$('.isFirst').prop('checked',false)
														$$('.isRight').prop('checked',false)
													}
												}),'图片中央显示']
											})]
										})
									}),(0, m.jsx)('div',
									{
										className:"edit_button",
										children: E.PN.map(function(e, n)
										{
											return (0, m.jsx)(c.Bx,
											{
												hidden: $$('.dels:checked').length > 1 && !$$('.editType').prop('checked'),
												style:
												{
													margin: "0 auto",//@改为居中
													width: "23%",
													height: 'auto',
													whiteSpace: 'nowrap',
													overflow: 'hidden'
												},
												className: a === e ? `${e} bold medium selected` : `${e} bold medium`,
												title :e,
												children: L.Z[e][f]
											}, n)
										})
									})]
								}), (0, m.jsx)('div',
								{
									className:"edit_3",
									children:(0, m.jsx)('div',
									{
										className:"edit_3_box1",
										children:(0, m.jsx)('div',
										{
											className:"edit_3_box2",
											children:(0, m.jsx)('div',
											{
												className:"edit_3_box3",
												children:[(0, m.jsx)('div',
												{
													className:"edit_3_box3_1",
													children: (0, m.jsx)(c.Kx,
													{
														maxRows: 10,
														className:"edit_3_box3_1_1 content medium",
														onChange: function(e)
														{
															$$('.content').val(e.currentTarget.value)
														}
													})
												}),(0, m.jsx)('div',
												{
													className:"edit_3_box3_2",
													children: (0, m.jsx)('div',
													{
														className:"edit_3_box3_2_1",
														children: L.Z.input_comment[f]
													})
												})]
											})
										})
									})
								}), (0, m.jsx)("div",
								{
									className:"图片选项 edit_4",
									style:{justifyContent: 'center'},
									children: [(0, m.jsx)(eN.g4,
									{
										children: '上传图片',
										style: 
										{
											"overflow": "hidden",
											"text-overflow": "ellipsis",
											"white-space": "nowrap",
											"width": "30%",
											"padding": "0"
										},
										onClick: function(e)
										{
											_.current.click()
										}
									}), (0, m.jsx)(eN.g4,
									{
										children: '选择表情',
										style: 
										{
											"overflow": "hidden",
											"text-overflow": "ellipsis",
											"white-space": "nowrap",
											"width": "30%",
											"padding": "0"
										},
										onClick: function(e)
										{
											$$('.INDEX_EmojiButton').click()
										}
									}), !mt_settings['隐藏差分'] ? (0, m.jsx)(eN.g4,
									{
										children: '选择差分',
										style: 
										{
											"overflow": "hidden",
											"text-overflow": "ellipsis",
											"white-space": "nowrap",
											"width": "30%",
											"padding": "0"
										},
										onClick: function(e)
										{
											$$('.INDEX_CharFaceButton').click()
										}
									}) : '']
								}), (0, m.jsx)("input",
								{
									className: "上传图片",
									type: "file",
									ref: _,
									hidden: 1,
									accept: "image/*",
									onChange: function(e)
									{
										var file = e.target.files[0]
										var ready = new FileReader()
										ready.readAsDataURL(file);
										ready.onload = function(e)
										{
											var base64Img = e.target.result;
											compress(base64Img,'image','edit')
										}
									}
								}), (0,m.jsx)('img',
								{
									className: "图片选项 图片文件",
									width:"auto",
									height:"128px",
									onError: function(e){IMAGE_error(e)}
								}), (0, m.jsx)('div',
								{
									className:"edit_4",
									children:[(0, m.jsx)('div',
									{
										style:
										{
											fontSize:'12px',
											display: 'inline-grid',
											whiteSpace: "nowrap",
											justifyItems: 'center',
											cursor: 'pointer'
										},
										children:[(0,m.jsx)('span',
										{
											children: '角色'
										}), (0, m.jsx)('img',
										{
											className:'头像',
											style:
											{
												width: '40px',
												height: '40px',
											},
											onError: function(e){IMAGE_error(e)},
											onClick: function(e)
											{
												$$('.title').text('头像列表')
												let HeadList = {direction:'row',list:[]}
												if(CHAT_HeadList)
												{
													HeadList = CHAT_HeadList
												}
												let str = ''
												str += '<label>头像排列：<input class="radio row" type="radio" name="direction" value="row">横向（注意排版）</label>\n'
												str += `<label>　　　　　<input class="radio column" type="radio" name="direction" value="column">竖向</label><input type="checkbox" class="fullHeight" ${HeadList.fullHeight ? 'checked' : ''}>文字消息自动铺满\n`
												str += `头像间距：<input style="font-size:1.2rem;" class="margin text" placeholder="默认值为 -1.5rem" value="${toString(HeadList.margin)}">\n\n`

												str += '发言角色：<label><input class="radio" type="radio" name="mode" value="change">通过【待选列表】切换角色</label>\n'
												str += `<img class="头像 N_char" src="${e.target.title ? loadhead(e.target.alt,e.target.title) : href+'MoeData/Ui/setting.webp'}" alt="${e.target.alt}" title="${e.target.title}" onerror="IMAGE_error(this)">`
												str += `名称：<input style="font-size:1.2rem;color:red;" class="text" placeholder="${$$('.name').attr('placeholder')}" value="${$$('.name').val()}">\n`
												str += `\n头像列表：（点击删除指定头像）\n<div class="N_list">`
												HeadList.list.map(function(index,k)
												{
													str += `<img class="头像" src="${loadhead('LIST',index)}" title="${index}" style="cursor:pointer;" onclick="this.remove()" onerror="IMAGE_error(this)">`
												})
												str += '</div>\n\n待选列表：<label><input class="radio" type="radio" name="mode" value="add" checked>为【头像列表】添加新头像</label>\n'
												let str1 = '$(".N_char").attr("src",loadhead(this.alt,this.title)).attr("alt",this.alt).attr("title",this.title).next().attr("placeholder",loadname(this.alt,this.title))'
												let str2 = '$(".N_list").append(`<img class="头像" src="${loadhead("LIST",this.title)}" title="${this.title}" style="cursor:pointer;" onclick="this.remove()" onerror="IMAGE_error(this)">`)'
												mt_settings['选择角色'].list.concat({no:'0',index:'1'}).map(function(v,k)
												{
													str += `<img class='头像' src='${loadhead(v.no,v.index)}' alt='${v.no}' title='${v.index}' style='cursor:pointer;' onclick='$(".radio:checked")[1].value === "change" ? ${str1} : ${str2}' onerror='IMAGE_error(this)'>`
												})
												str += '\n'
												
												alert(str)
												$$(`.${HeadList.direction}`).click()
												TOP_confirm = function()
												{
													HeadList.direction = $$('.radio:checked')[0].value
													HeadList.margin = $$('.margin').val()
													HeadList.fullHeight = $$('.fullHeight:checked').length ? true : false
													HeadList.list = []
													$$('.fullHeight:checked').length ? HeadList.fullHeight = true : ''

													$$('.N_list img[title]').map(function(k,v)
													{
														HeadList.list[k] = v.title
													})
													CHAT_HeadList = HeadList
													let img = $$('.N_char')
													let name = img.next()[0]
													$$('.name').attr('placeholder',name.placeholder).val(name.value)
													if(img[0].title)
													{
														e.target.src = img[0].src
														e.target.alt = img[0].alt
														e.target.title = img[0].title
													}
												}
											},
											src:href+'MoeData/Ui/setting.webp'
										})]
									}), (0, m.jsx)('div',
									{
										className:"edit_3_box1",
										style:{border: 0},
										children:(0, m.jsx)('div',
										{
											className:"edit_3_box2",
											children:(0, m.jsx)('div',
											{
												className:"edit_3_box3",
												children:[(0, m.jsx)('div',
												{
													className:"edit_3_box3_1",
													children: (0, m.jsx)('input',
													{
														className:"edit_3_box3_1_1 name bold",
														onChange: function(e)
														{
															$$('.name').val(e.currentTarget.value)
														}
													})
												}),(0, m.jsx)('div',
												{
													className:"edit_3_box3_2",
													children: (0, m.jsx)('div',
													{
														className:"edit_3_box3_2_1",
														children: L.Z.name[f]
													})
												})]
											})
										})
									}),(0, m.jsx)('div',
									{
										className:"edit_3_box1",
										children:(0, m.jsx)('div',
										{
											className:"edit_3_box2",
											children:(0, m.jsx)('div',
											{
												className:"edit_3_box3",
												children:[(0, m.jsx)('div',
												{
													className:"edit_3_box3_1",
													children: (0, m.jsx)(c.Kx,
													{
														className:"edit_3_box3_1_1 time medium",
														style:{color:'blue'},
														maxRows: 5,
														onChange: function(e)
														{
															$$('.time').val(e.currentTarget.value)
														}
													})
												}),(0, m.jsx)('div',
												{
													className:"edit_3_box3_2",
													children: (0, m.jsx)('div',
													{
														className:"edit_3_box3_2_1",
														children: L.Z.time[f]
													})
												})]
											})
										})
									})]
								}), (0, m.jsxs)(ea.$_,
								{
									children: [(0, m.jsx)(eO,
									{
										title: "删除消息",
										onClick: function()
										{
											$$('.dels:checked').length > 1 ? $$('.INDEX_delete').click() : sendMessage({},'','delete',[chatIndex])
										},
										children: (0, m.jsx)(c.xL,
										{
											icon: ico.Vui
										})
									}), (0, m.jsx)(ea.Lw,
									{
										className: "bold",
										onClick: function()
										{
											$$('.editMessage').removeClass('visible').find('input:checkbox').prop('checked',false)//S()
											CHAT_HeadList = false
										},
										children: L.Z.cancel[f]
									}), (0, m.jsx)(ea.AZ,
									{
										className: "bold",
										onClick: function()
										{
											let type = ''
											if($$('.dels:checked').length > 1)
											{
												let data = {}
												data.heads = CHAT_HeadList ? CHAT_HeadList : {direction:'row',list:[]}
												if($$('.edit_button .selected').attr('title'))
												{
													type = $$('.edit_button .selected').attr('title')
												}

												if($$('.name').val() && $$('.name').val() !== ' ')data.name = $$('.name').val()
												if($$('.name').val() === ' ')data.name = ''
												if($$('.time').val() && $$('.time').val() !== ' ')data.time = $$('.time').val()
												if($$('.time').val() === ' ')data.time = ''
												if($$('.content').val() && $$('.content').val() !== ' ')data.content = $$('.content').val()
												if($$('.content').val() === ' ')data.content = ''

												if(type === 'image' && $$('.图片文件').attr('src') !== '')
												{
													data.content = $$('.图片文件').attr('title')
													data.file = $$('.图片文件').attr('src')
												}

												if($$('.editTalk').prop('checked'))
												{
													data.isFirst = $$('.isFirst').prop('checked')
													data.isRight = $$('.isRight').prop('checked')
													data.isCenter = $$('.isCenter').prop('checked')
												}
												
												if($$('.editMessage .头像').attr('alt'))
												{
													data.sCharacter = {no: $$('.editMessage .头像').attr('alt'),index: $$('.editMessage .头像').attr('title')}
												}
												
												let indexs = []
												$$('.dels:checked').each(function(k,v)
												{
													indexs.push($$('.dels').index(v))
												})
												alert(`※注意!!!\n只输入一个空格会判断为清空该内容\n图片转为其它类型时会清除文件\n发言人为空时则不修改发言人\n点击【${mt_text.confirm[mtlang]}】开始批量修改`)
												TOP_confirm = function()
												{
													sendMessage(data,type,'edit',indexs)
												}
											}
											else
											{
												type = $$('.edit_button .selected').attr('title')
												let data = 
												{
													type: type,
													name: $$('.name').val(),
													time: $$('.time').val(),
													content: type === 'image' ? $$('.图片文件').attr('title') : $$('.content').val(),
													isFirst: $$('.isFirst').prop('checked'),
													isCenter: type === 'image' && $$('.isCenter').prop('checked'),
													isRight: $$('.isRight').prop('checked'),
													is_breaking: $$('.is_breaking').prop('checked'),
													file: type === 'image' ? $$('.图片文件').attr('src') : '',
													sCharacter: {no: $$('.editMessage .头像').attr('alt'),index: $$('.editMessage .头像').attr('title')},
													heads: CHAT_HeadList ? CHAT_HeadList : {direction:'row',list:[]}
												}
												sendMessage(data,type,$$('.addChat').prop('checked') ? 'add' : 'edit',[chatIndex])
											}
											CHAT_HeadList = false
											$$('.editMessage :checkbox').prop('checked',false)
										},
										children: L.Z.confirm[f]
									})]
								})]
							})]
						})
					})
					//*编辑界面
				},
				eX = o.ZP.div.withConfig(
				{
					displayName: "PopupChatChange__Wrapper",
					componentId: "sc-11i0qdg-0"
				})(["", " height:auto;padding-bottom:1rem;"], function(e)
				{
					return e.theme.common.flexBox(
					{})
				}),
				eW = function(e)
				{
					var n = e.character,
						t = (0, i.C)(function(e)
						{
							return mtlang//#e.global.lang
						});
					return (0, m.jsxs)(e$,
					{
						children: [(0, m.jsxs)(eJ,
						{
							style:
							{
								alignItems: "center"
							},
							children: [(0, m.jsx)(eV,
							{}), (0, m.jsx)("span",
							{
								className: "bold",
								children: L.Z.relationship_event[t]
							})]
						}), (0, m.jsx)(eN.HR,
						{}), (0, m.jsx)(eN._x,
						{
							style:e.style,
							className: "medium 编辑",
							children: n
						})]
					})
				},
				e$ = o.ZP.div.withConfig(
				{
					displayName: "HeartBox__Container",
					componentId: "sc-cwriov-0"
				})(["", ";padding:0.5rem;font-size:1.1rem;height:auto;border:1px solid ", ";border-radius:1rem;color:", ";background-color:", `;background-image:url('${href}MoeData/Ui/Favor_Schedule_Deco.webp');background-repeat:no-repeat;background-position:right;background-size:auto 100%;line-height:1.5rem;`], function(e)
				//#心形背景
				{
					return e.theme.common.flexBox(
					{
						direction: "column",
						align: "flex-start"
					})
				}, function(e)
				{
					return e.theme.color.rgb221_210_216
				}, function(e)
				{
					return e.theme.color.rgb76_91_111
				}, function(e)
				{
					return e.theme.color.rgb252_238_240
				}),
				eJ = o.ZP.div.withConfig(
				{
					displayName: "HeartBox__Flex",
					componentId: "sc-cwriov-1"
				})(["", ";height:auto;"], function(e)
				{
					return e.theme.common.flexBox(
					{
						justify: "flex-start"
					})
				}),
				eV = o.ZP.div.withConfig(
				{
					displayName: "HeartBox__Border",
					componentId: "sc-cwriov-2"
				})(["border-left:2px solid ", ";height:1.1rem;margin-right:0.3rem;"], function(e)
				{
					return e.theme.color.rgb252_142_155
				}),
				//*这是消息界面
				e6 = function(e)
				{
					var n = e.chat,//{...e.chat,...{}},
						t = e.index,
						o = e.handleShow,
						a = (0, i.T)(),
						l = (0, i.C)(function(e)
						{
							return e.makeChat.chats
						}),
						d = (0, i.C)(function(e)
						{
							return mtlang//#e.global.lang
						}),
						h = (0, i.C)(function(e)
						{
							return e.global.isScreenshot
						}),
						f = (0, r.useRef)(null);
					let isFirst = isfirst(t,l)
					let style = mt_settings['文字样式'][n.type] ? mt_settings['文字样式'][n.type] : {}
					delete style.textAlign
					style = {...style,...{}}//防止连带修改设置属性
					if(n.type === 'info')
					{
						n.isFirst && !n.isRight ? style.textAlign = 'left' : ''
						n.isRight && !n.isFirst ? style.textAlign = 'right' : ''
					}
					if(n.heads && (!n.heads.list || n.heads.list.length < 1))delete n.heads
					return (0, m.jsx)('div',
					{
						className: '消息',
						title: n.is_breaking === true ? 'red' : n.isFirst === true ? 'blue' : 'transparent',
						ref: f,
						style: {padding: isFirst ? "" : "0.5rem 1rem 0 1rem"},
						children: [(0, m.jsxs)(m.Fragment,
						{
							children: "chat" === n.type || "image" === n.type ? (0, m.jsxs)(m.Fragment,
							{//整体图文消息
								children: (0, m.jsxs)('div',
								{//整体图文消息
									className: '聊天',
									children: [!n.isCenter && !n.isRight ? (0, m.jsx)('div',
									{//左侧头像框
										className: '头像框',
										style: n.sCharacter.no != 0 ? 
										{
											cursor: "pointer",
											minWidth: n.heads && isFirst ? "max-content" : "5rem",
											paddingRight: n.heads && isFirst ? "1rem" : "auto",
											flexDirection: n.heads ? n.heads.direction : ""
										} : {marginRight: '1.5rem'},
										children: isFirst && n.sCharacter.no != 0 ? [(0, m.jsx)('img',
										{//左侧头像
											className: '头像',
											style: {zIndex: n.heads ? n.heads.list.length : ''},
											src: loadhead(n.sCharacter.no,n.sCharacter.index),
											onError: function(e){IMAGE_error(e)},
											alt: n.sCharacter.index
										}), n.heads ? n.heads.list.map(function(index,k)
										{
											return (0, m.jsx)('img',
											{//左侧头像
												className: '头像',
												src: loadhead('LIST',index),
												style: 
												{
													zIndex: n.heads.list.length-k-1,
													marginTop: n.heads.direction === 'column' ? n.heads.margin ? n.heads.margin : "-1.5rem" : '',
													marginLeft: n.heads.direction === 'row' ? n.heads.margin ? n.heads.margin : "-1.5rem" : ''
												},
												onError: function(e){IMAGE_error(e)}
											})
										}) : ''] : ''
									}) : '', (0, m.jsxs)("div",
									{//图文消息
										className: "对话",
										style: 
										{
											alignItems: n.isCenter ? 'center' : n.isRight || n.sCharacter.no == 0 ? 'flex-end' : 'flex-start',
											height: n.heads && n.heads.fullHeight ? '100%' : ''
										},
										children: [!n.isCenter && isFirst && n.sCharacter.no != 0 ? (0, m.jsx)("span",
										{//人物名称
											className: "名称 bold",
											children: n.name || loadname(n.sCharacter.no,n.sCharacter.index)
										}) : '' , (0, m.jsxs)("div",
										{//消息内容
											style:
											{
												display: "flex",
												height: "100%",
												justifyContent: n.isCenter ? 'center' : n.isRight || n.sCharacter.no == 0 ? 'flex-end' : '',
											},
											children: [n.time ? (0, m.jsx)('div',
											{//左侧时间戳
												className: '时间戳',
												hidden: (!n.time || n.sCharacter.no != 0) && !n.isRight,
												children: n.time
											}) : '', "chat" === n.type ? [(0, m.jsx)('span',
											{//文本消息
												className: (n.sCharacter.no == 0 ? '文本' : !n.isRight && isFirst ? '文本 左角' : '文本')+' 编辑',
												style: n.isRight || n.sCharacter.no == 0 ? {...{background: 'rgb(74, 138, 202)',border: '1px solid rgb(74, 138, 202)'},...style} : style,
												children: n.content
											}), (n.isRight && isFirst) || n.sCharacter.no == 0 ? (0, m.jsx)(eN.CJ,{}) : '' ] : (0, m.jsx)('img',
											{//图片消息
												className: '图片 编辑',
												style:
												{
													maxHeight: (n.content || n.file).indexOf("Face") > -1 ? '360px' : "",
													maxWidth: (n.content || n.file).indexOf("Face") > -1 ? mt_settings['差分比例'] : mt_settings['图片比例']
												},//@差分表情宽高百分比
												src: n.file.indexOf(":image") > -1 ? n.file : href+n.file,
												title: n.file.indexOf(":image") > -1 ? '' : n.file,
												onError: function(e){IMAGE_error(e)}
											}) ,n.time ? (0, m.jsx)('div',
											{//右侧时间戳
												className: '时间戳',
												hidden: !n.time || n.sCharacter.no == 0 || n.isRight || n.isCenter,
												children: n.time
											}) : '']
										})]
									}), !n.isCenter && n.isRight && n.sCharacter.no != 0 ? (0, m.jsx)('div',
									{//右侧头像框
										className: '头像框',
										style:
										{
											justifyContent:'flex-end',
											cursor: "pointer",
											minWidth: n.heads && isFirst ? "max-content" : "5rem",
											paddingLeft: n.heads && isFirst ? "1rem" : "auto",
											flexDirection: n.heads ? n.heads.direction : ""
										},
										children: isFirst && n.sCharacter.no != 0 ? [(0, m.jsx)('img',
										{//右侧头像
											className: '头像',
											src: loadhead(n.sCharacter.no,n.sCharacter.index),
											style: {zIndex: n.heads ? n.heads.list.length : ''},
											onError: function(e){IMAGE_error(e)},
											alt: n.sCharacter.index
										}), n.heads ? n.heads.list.map(function(index,k)
										{
											return (0, m.jsx)('img',
											{//右侧头像
												className: '头像',
												src: loadhead('LIST',index),
												style: 
												{
													zIndex: n.heads.list.length-k-1,
													marginTop: n.heads.direction === 'column' ? "-1.5rem" : '',
													marginLeft: n.heads.direction === 'row' ? "-1.5rem" : ''
												},
												onError: function(e){IMAGE_error(e)},
											})
										}) : ''] : ''
									}) : '']
								})
							}) : "reply" === n.type ? [(0, m.jsx)("div",
							{//回复
								className: '头像框',
								children: (0, m.jsx)(ne,
								{
									className: '编辑',
									children: (0, m.jsx)(c.xL,{icon: ei.Yai}),
									"data-html2canvas-ignore": "true"
								})
							}),(0, m.jsx)('div',
							{
								className: '回复',
								style:{backgroundImage:`url(${href}MoeData/Ui/Popup_Img_Deco_2.webp)`},
								children: [(0, m.jsx)('div',
								{
									className: '消息标题',
									children: [(0, m.jsx)('div',
									{
										className: '竖线',
										style: {borderLeft: '2px solid rgb(39, 153, 228)'}
									}),(0, m.jsx)('span',
									{
										className: 'bold',
										children: L.Z['reply'][mtlang]
									})]
								}), (0, m.jsx)(eN.HR,{}), n.content.split('\n').map(function(v,k)
								{
									return (0, m.jsx)('div',
									{
										className: '选择肢 跳转',
										style: style,
										children: v
									})
								})]
							})] : "heart" === n.type ? [(0, m.jsx)("div",
							{className: '头像框'}),(0, m.jsx)(eW,
							{//羁绊
								className: '编辑',
								style: style,
								character: n.content || ((n.name || loadname(n.sCharacter.no,n.sCharacter.index))+mt_text.go_relationship_event[mtlang])
							})] : "info" === n.type ? (0, m.jsx)(eN.vD,
							{//旁白
								className: '编辑',
								style: style,
								children: n.content
							}) : (0, m.jsx)(m.Fragment,{})
						}), h || (0, m.jsx)("input",
						{//复选框
							"data-html2canvas-ignore":"true",
							style:{backgroundColor:n.is_breaking === true ? 'red' : n.isFirst === true ? 'blue' : 'transparent'},
							type: "checkbox",
							className:"dels"
						})]
					})
				},
				//*这是消息界面
				e8 = o.ZP.div.withConfig(
				{
					displayName: "Chat__Flex",
					componentId: "sc-5hhx0-0"
				})(["", ";height:auto;"], function(e)
				{
					return e.theme.common.flexBox(
					{
						justify: "flex-end",
						align: "flex-start"//#
					})
				}),
				ne = (0, o.ZP)(c.hU).withConfig(
				{
					displayName: "Chat__EditButton",
					componentId: "sc-5hhx0-1"
				})(["align-self:end;margin:0rem 0.5rem;color:", ";height:1.2rem;width:1.2rem;flex-shrink:0;"], function(e)
				//#height:auto;防止编辑按钮下移
				{
					return e.theme.color.rgb45_70_100
				}),
				nn = function(e)
				{
					var n = e.scrollRef,
						t = (0, i.C)(function(e)
						{
							return e.makeChat.chats
						}),
						o = (0, i.C)(function(e)
						{
							return e.makeChat.sReplyNo
						}),
						a = (0, i.T)(),
						l = (0, r.useState)(!1),
						s = l[0],
						u = l[1],
						h = (0, r.useState)("delete"),
						f = h[0],
						p = h[1],
						g = (0, r.useState)(!1),
						x = g[0],
						y = g[1];
					(0, r.useEffect)(function()
					{
						u(0 !== o)
					}, [o]);
					var b = (0, r.useState)(
						{
							type: "chat",
							isFirst: !1,
							replyNo: 0,
							replyDepth: 0,
							replyGroup: 0,
							sCharacter: d.I,
							content: ""
						}),
						j = b[0],
						w = b[1],
						_ = function(e, n, t)
						{
							p(t), y(e), null !== n && w(n)
						},
						C = function(e)
						{
							var n = 0,
								r = 0;
							t.forEach(function(e)
							{

								e.type === 'reply' && e.content.split('\n').indexOf(o) > -1 && (n = e.replyDepth, r = e.replyGroup)
							}), -1 === e ? a((0, eo.Z8)(n)) : a((0, eo.Z8)(0)), a((0, eo.ZZ)(r))
						};
						let newchats = []
						chats.map(function(v,k){newchats[k] = v})
						chats = newchats
					return (0, m.jsxs)("div",
					{
						style:
						{
							display: "flex",
							flexDirection: "column",
							width: "100%",
							height: "100%"
						},
						children: [(0, m.jsxs)(eD,
						{
							className: "tools",
							style:
							{
								padding: "5px 10px",
								width: "100%",
								marginLeft: "auto",
								backgroundColor: 'rgb(243, 247, 248)'
							},
							children: [(0, m.jsx)('span',
							{
								className:'delsNum',
								children: ''
							}), (0, m.jsx)(c.jl,
							{
								style:{height: "auto","width": "auto"},
								className: 'operate',
								children: (0, m.jsx)(W,
								{
									className: "bold",
									children: (0, m.jsx)(X,
									{
										style:{fontSize: "1.1rem",color: "rgb(139, 187, 233)"},
										children: '操作'
									})
								})
							}), (0, m.jsx)(c.jl,
							{
								style:{height: "auto","width": "auto"},
								id:'delsall',
								children: (0, m.jsx)(W,
								{
									className: "bold",
									children: (0, m.jsx)(X,
									{
										style:{fontSize: "1.1rem"},
										children: '全选'
									})
								})
							}), (0, m.jsx)(c.jl,
							{
								style:{height: "auto","width": "auto"},
								id:'rdelsall',
								children: (0, m.jsx)(W,
								{
									className: "bold",
									children: (0, m.jsx)(X,
									{
										style:{fontSize: "1.1rem"},
										children: '反选'
									})
								})
							}), (0, m.jsx)(c.jl,
							{
								style:{height: "auto","width": "auto"},
								id:'delsto',
								children: (0, m.jsx)(W,
								{
									className: "bold",
									children: (0, m.jsx)(X,
									{
										style:{fontSize: "1.1rem"},
										children: '区间选择'
									})
								})
							}), (0, m.jsx)($,
							{
								className: "bold INDEX_delete",
								children: (0, m.jsx)(X,
								{
									style:{fontSize: "1.1rem"},
									children: L.Z['delete'][mtlang]
								})
							})]
						}), (0, m.jsxs)(eD,
						{
							className: "operateTools",
							style:
							{
								display: 'none',
								padding: "5px 10px",
								width: "100%",
								backgroundColor: 'rgb(243, 247, 248)'
							},
							children: [(0, m.jsx)(c.jl,
							{
								hidden: !0,
								style:{height: "auto","width": "auto"},
								className: '撤销',
								children: (0, m.jsx)(W,
								{
									className: "bold",
									children: (0, m.jsx)(X,
									{
										style:{fontSize: "1.1rem"},
										children: '撤销'
									})
								}),
								onClick: function(){撤销('撤销')}
							}), (0, m.jsx)(c.jl,
							{
								hidden: !0,
								style:{height: "auto","width": "auto"},
								className: '前进',
								children: (0, m.jsx)(W,
								{
									className: "bold",
									children: (0, m.jsx)(X,
									{
										style:{fontSize: "1.1rem"},
										children: '前进'
									})
								}),onClick: function(){撤销('前进')}
							}), (0, m.jsx)(c.jl,
							{
								style:{height: "auto","width": "auto"},
								className: '复制',
								children: (0, m.jsx)(W,
								{
									className: "bold",
									children: (0, m.jsx)(X,
									{
										style:{fontSize: "1.1rem"},
										children: '复制'
									})
								}),
								onClick: function(){复制()}
							}), (0, m.jsx)(c.jl,
							{
								hidden: !粘贴板,
								style:{height: "auto","width": "auto"},
								className: '粘贴',
								children: (0, m.jsx)(W,
								{
									className: "bold",
									children: (0, m.jsx)(X,
									{
										style:{fontSize: "1.1rem"},
										children: '粘贴'
									})
								}),
								onClick: function(){粘贴()}
							}), (0, m.jsx)(c.jl,
							{
								style:{height: "auto","width": "auto"},
								id: 'cutdata',
								children: (0, m.jsx)(W,
								{
									className: "bold",
									children: (0, m.jsx)(X,
									{
										style:{fontSize: "1.1rem"},
										children: '截取存档'
									})
								})
							})]
						}), (0, m.jsxs)(no,
						{
							className: 'reply',
							children: [(0, m.jsx)(ni,
							{
								className: 'replyBack',
								style:{display:"none"},
								children: (0, m.jsx)(c.xL,
								{
									icon: ei.O24
								})
							}), (0, m.jsxs)('div',
							{
								className: "选择肢 replyText",
								style: 
								{
									maxWidth:'80%',
									margin: 'auto 1rem',
									overflow: 'hidden',
									wordBreak: 'break-word',
									whiteSpace: 'pre-wrap',
									lineBreak: 'loose'
								},
								onClick: function()
								{
									TOP_replyEdit()
								},
								children: "项目管理"
							}, n), (0, m.jsx)(ni,
							{
								className: 'replyHome',
								style:{display:"none"},
								children: (0, m.jsx)(c.xL,
								{
									icon: ei.WA2
								})
							})]
						}), (0, m.jsx)(nt,
						{
							children: (0, m.jsx)(nr,
							{
								ref: n,
								children: [(0, m.jsx)('div',
								{
									onClick: function()
									{
										a((0, eo.U_)(chats))
									},
									id:"mt_watermark",
									style:
									{
										display: "none",
										backgroundColor: mt_settings['标题颜色'] ? mt_settings['标题颜色'] : '#8BBBE9',
									},
									children: [(0, m.jsx)('div',
									{
										style:
										{
											display:"flex",
											alignItems:"center",
											marginRight:"1rem"
										},
										children: (0, m.jsx)('span',
										{
											className:'mt_watermark',
											style:
											{
												fontSize:"2rem",
												fontFamily:/[\u4e00-\u9fff]/.test(mt_settings['顶部标题']) ? "moetalk" : "title",
												fontWeight:700
											},
											children: mt_settings['顶部标题']
										})
									}),(0, m.jsx)('div',
									{
										style:
										{
											display:"flex",
											textAlign:"right",
											flexDirection:"column",
											alignItems:"flex-end",
											justifyContent:"center",
											wordBreak: 'break-word'
										},
										children: [(0, m.jsx)('span',
										{
											id:"mt_title",
											style:{textShadow:"1px 1px 0px rgb(34, 37, 41)"},
											children: ''
										}),(0, m.jsx)('span',
										{
											id:"mt_writer",
											style:{textShadow:"1px 1px 0px rgb(34, 37, 41)"},
											children: ''
										})]
									})]
								}),t.map(function(e, n)
								{
									return e.replyDepth === o && (0, m.jsx)(e6,
									{
										index: n,
										handleShow: _,
										chat: e
									}, n)
								}), (0, m.jsx)('div',
								{
									className: '消息底座',
									style: {height: '1rem'},
									children: ''
								})]
							})
						}), (0, m.jsx)(eK,
						{
							show: x,
							handleShow: _,
							selectChat: j,
							sChatModeType: f,
							setSChatModeType: function(e)
							{
								p(e)
							}
						})]
					})
				},
				nt = o.ZP.div.withConfig(
				{
					displayName: "Talk__Container",
					componentId: "sc-1uzn66i-0"
				})(["display:inline-block;height:100%;width:100%;background-color:", ";overflow-y:auto;overflow-y:overlay;overflow-x:hidden;position:relative;&::-webkit-scrollbar{display:inline-block;width:0.4rem;}&::-webkit-scrollbar-thumb{height:17%;background-color:", ";border-radius:1rem;}"], function(e)
				{
					return ''//#自定义样式
				}, function(e)
				{
					return e.theme.color.rgb210_210_210
				}),
				nr = o.ZP.div.withConfig(
				{
					displayName: "Talk__CContainer",
					componentId: "sc-1uzn66i-1"
				})(["", ";position:absolute;flex-direction:column;height:max-content;padding-bottom:1rem;background-color:", ";color:", ";"], function(e)
				{
					return e.theme.common.flexBox(
					{
						direction: "column"
					})
				}, function(e)
				{
					return MikuTalk ? '' : mt_settings['风格样式'][1]//#自定义样式
				}, function(e)
				{
					return e.theme.color.rgb255_255_255
				}),
				no = o.ZP.div.withConfig(
				{
					displayName: "Talk__Header",
					componentId: "sc-1uzn66i-2"
				})(["", ";background-color:", ";border-bottom:2px solid ", ";height:4rem;padding:0 1rem;"], function(e)
				{
					return e.theme.common.flexBox(
					{
						justify: "space-around"
					})
				}, function(e)
				{
					return e.theme.color.rgb243_247_248
				}, function(e)
				{
					return e.theme.color.rgb230_233_235
				}),
				ni = (0, o.ZP)(c.hU).withConfig(
				{
					displayName: "Talk__BackButton",
					componentId: "sc-1uzn66i-3"
				})(["color:", ";width:2.5rem;"], function(e)
				{
					return e.theme.color.rgb45_70_100
				}),
				nc = o.ZP.span.withConfig(
				{
					displayName: "Talk__Span",
					componentId: "sc-1uzn66i-4"
				})(["margin:auto 1rem;overflow:hidden;word-break:break-word;white-space:pre-wrap;line-break:loose;"]),
				na = function()
				{
					var e = (0, i.C)(function(e)
						{
							return mtlang//#e.global.lang
						}),
						n = (0, i.C)(function(e)
						{
							return e.makeChat.chats
						}),
						t = (0, r.useRef)(null);
					return (0, m.jsxs)(nl,
					{
						children: [(0, m.jsx)(ns,
						{
							style:
							{
								display: "flex"
							},
							children: (0, m.jsx)(nn,
							{
								scrollRef: t
							})
						}), (0, m.jsx)(ns,
						{
							className: "INDEX_tips",
							children: [(0, m.jsx)("span",
							{
								style:
								{
									fontSize: "1.1rem"
								},
								children: [(0, m.jsx)(c.xL,
								{
									style:
									{
										width: "1.1rem",
										height: "1.1rem",
										color:'rgb(45, 70, 100)'
									},
									icon: ico.QY_
								}),'隐藏工具',(0, m.jsx)(c.xL,
								{
									style:
									{
										width: "1.1rem",
										height: "1.1rem",
										color:'rgb(45, 70, 100)'
									},
									icon: ei.VmB
								}),'上传图片']
							}), (0, m.jsx)("span",
							{
								style:
								{
									fontSize: "1.1rem"
								},
								children: [(0, m.jsx)(c.xL,
								{
									style:
									{
										width: "1.1rem",
										height: "1.1rem",
										color:'rgb(45, 70, 100)'
									},
									icon: ei.pkM
								}),'表情图片',(0, m.jsx)(c.xL,
								{
									style:
									{
										width: "1.1rem",
										height: "1.1rem",
										color:'rgb(139, 187, 233)'
									},
									icon: ico.FKd
								}),'表情差分',(0, m.jsx)(c.xL,
								{
									style:
									{
										width: "1.1rem",
										height: "1.1rem",
										color:'rgb(45, 70, 100)'
									},
									icon: ico.FQ0
								}),'发送消息']
							}), (0, m.jsx)("span",
							{
								style:
								{
									fontSize: "1.1rem"
								},
								children: [(0, m.jsx)(c.xL,
								{
									style:
									{
										width: "1.1rem",
										height: "1.1rem",
										color:'rgb(45, 70, 100)'
									},
									icon: ico.Lh7
								}),'选择肢',(0, m.jsx)(c.xL,
								{
									style:
									{
										width: "1.1rem",
										height: "1.1rem",
										color:'rgb(45, 70, 100)'
									},
									icon: ico.DBf
								}),'旁白',(0, m.jsx)(c.xL,
								{
									style:
									{
										width: "1.1rem",
										height: "1.1rem",
										color:'rgb(45, 70, 100)'
									},
									icon: ico.m6i
								}),'羁绊事件']
							}), (0, m.jsx)("span",
							{
								style:
								{
									fontSize: "1.1rem"
								},
								children: [(0, m.jsx)(c.xL,
								{
									style:
									{
										width: "1.1rem",
										height: "1.1rem",
										color:'rgb(45, 70, 100)'
									},
									icon: ico.EdJ
								}),'传输存档',(0, m.jsx)(c.xL,
								{
									style:
									{
										width: "1.1rem",
										height: "1.1rem",
										color:'rgb(45, 70, 100)'
									},
									icon: ico.wf8
								}),'生成图片']
							}), (0, m.jsx)("span",
							{
								style:
								{
									fontSize: "1.1rem"
								},
								children: [(0, m.jsx)(c.xL,
								{
									style:
									{
										width: "1.1rem",
										height: "1.1rem",
										color:'rgb(45, 70, 100)'
									},
									icon: ico.FKd
								}),'添加角色',(0, m.jsx)(c.xL,
								{
									style:
									{
										width: "1.1rem",
										height: "1.1rem",
										color:'rgb(45, 70, 100)'
									},
									icon: ico.k9h
								}),'移除角色']
							}), (0, m.jsx)(c.Bx,
							{
								className: "selected medium",
								style:
								{
									width: 'auto',
									height: 'auto',
									fontSize: "1.1rem"
								},
								children: 'click to change language',
								onClick: function()
								{
									let language = prompt("Please enter the language\nzh_cn（简体中文）\nzh_tw（繁體中文）\njp（日本語）\nen（English）\nkr（한국어）",mtlang);
									if (langarr.indexOf(language) > -1)
									{
										mt_settings['语言选项'] = language
										saveStorage('设置选项',mt_settings,'local')
										location.reload(true)
									}
								}
							})]
						}), (0, m.jsx)(eA,
						{
							scrollRef: t
						})]
					})
				},
				nl = o.ZP.div.withConfig(
				{
					displayName: "RightScreen__Container",
					componentId: "sc-1fwinj2-0"
				})(["", " flex-shrink:1;min-width:340px;@media screen and (max-width:768px){min-width:100vw;}"], function(e)
				{
					return e.theme.common.flexBox(
					{
						direction: "column"
					})
				}),
				ns = o.ZP.div.withConfig(
				{
					displayName: "RightScreen__Box",
					componentId: "sc-1fwinj2-1"
				})(["", " background-color:", ";color:", ";"], function(e)
				{
					return e.theme.common.flexBox(
					{
						direction: "column"
					})
				}, function(e)
				{
					return ''//#自定义样式
				}, function(e)
				{
					return e.theme.color.rgb111_119_127
				}),
				nu = t(9008),
				nd = t.n(nu),
				nh = t(5615),
				nm = function()
				{
					return (0, m.jsxs)(nf,
					{
						children: [(0, m.jsxs)(nd(),
						{
							children: [(0, m.jsx)("title",
							{
								children: MikuTalk ? 'MikuTalk' : 'MoeTalk'
							}), (0, m.jsx)("meta",
							{
								name: "description",
								content: "MoeTalk is a Blue Archive Fandom Site. (몰루톡/モルトーク)"
							}), (0, m.jsx)("meta",
							{
								name: "keywords",
								content: "몰루톡, MoeTalk, モルトーク"
							}), (0, m.jsx)("meta",
							{
								property: "og:title",
								content: "MoeTalk"
							}), (0, m.jsx)("meta",
							{
								property: "og:image",
								content: MoeTalkURL+"MoeData/Ui/Favor_Schedule_Deco.webp"
							}), (0, m.jsx)("meta",
							{
								property: "og:site_name",
								content: "Make"
							}), (0, m.jsx)("meta",
							{
								property: "og:description",
								content: "MoeTalk is a Blue Archive Fandom Site. (몰루톡/モルトーク)"
							}), (0, m.jsx)("meta",
							{
								name: "twitter:title",
								content: "MoeTalk"
							}), (0, m.jsx)("meta",
							{
								name: "twitter:description",
								content: "MoeTalk is a Blue Archive Fandom Site. (몰루톡/モルトーク)"
							}), (0, m.jsx)("meta",
							{
								name: "twitter:image",
								content: MoeTalkURL+"MoeData/Ui/Favor_Schedule_Deco.webp"
							}), (0, m.jsx)("meta",
							{
								name: "twitter:card",
								content: "summary_large_image"
							})]
						}), (0, m.jsx)(nh.Z,
						{
							childrens: [(0, m.jsx)(Q,
							{}, 0), (0, m.jsx)(na,
							{}, 1)]
						}), (0, m.jsx)(f,
						{})]
					})
				},
				nf = o.ZP.div.withConfig(
				{
					displayName: "pages__Container",
					componentId: "sc-ll9qpl-0"
				})(["", ""], function(e)
				{
					return e.theme.common.flexBox(
					{
						direction: "column"
					})
				})
		},
		83: function(e, n, t)
		{
			"use strict";
			t.d(n,
			{
				CJ: function()
				{
					return h
				},
				Dt: function()
				{
					return u
				},
				HR: function()
				{
					return p
				},
				LP: function()
				{
					return d
				},
				NZ: function()
				{
					return b
				},
				Xp: function()
				{
					return a
				},
				YJ: function()
				{
					return y
				},
				_x: function()
				{
					return f
				},
				g4: function()
				{
					return g
				},
				i9: function()
				{
					return x
				},
				tG: function()
				{
					return l
				},
				uU: function()
				{
					return i
				},
				vD: function()
				{
					return m
				},
				xu: function()
				{
					return c
				},
				zC: function()
				{
					return s
				}
			});
			var r = t(9521),
				o = t(1563),
				i = r.ZP.div.withConfig(
				{
					displayName: "talk__ChatContainer",
					componentId: "sc-eq7cqw-0"
				})(["", ";padding:1rem 1rem 0 1rem;font-size:1.1rem;height:auto;"], function(e)
				{
					return e.theme.common.flexBox(
					{
						align: "stretch"
					})
				}),
				c = r.ZP.div.withConfig(
				{
					displayName: "talk__Box",
					componentId: "sc-eq7cqw-1"
				})(["display:flex;width:6rem;"]),
				a = r.ZP.div.withConfig(
				{
					displayName: "talk__ChatWrapper",
					componentId: "sc-eq7cqw-2"
				})(["", ";height:auto;font-size:1.2rem;color:", ";"], function(e)
				{
					return e.theme.common.flexBox(
					{
						direction: "column",
						align: "flex-start"
					})
				}, function(e)
				{
					return e.theme.color.rgb34_37_41
				}),
				l = r.ZP.img.withConfig(
				{
					displayName: "talk__ImgBox",
					componentId: "sc-eq7cqw-3"
				})([`max-width:${mt_settings['图片比例']};border:2px solid `, ";background-color:rgb(255,255,255);padding:0.5rem;border-radius:10px;"], function(e)
				{
					return e.theme.color.rgb255_255_255
				}),
				s = r.ZP.span.withConfig(
				{
					displayName: "talk__TextBox",
					componentId: "sc-eq7cqw-4"
				})(["user-select:text;position:relative;color:white;width:fit-content;border-radius:10px;background:", ";border:1px solid ", ";white-space:pre-wrap;overflow-wrap:break-word;word-break:break-word;word-wrap:break-word;line-break:loose;font-size:1.2rem;padding:0.6rem;line-height:1.7rem;::after{content:'';position:absolute;left:-0.5rem;top:0.6rem;border-top:0.3rem solid transparent;border-right:0.5rem solid ", ";border-bottom:0.3rem solid transparent;}"], function(e)
				{
					return e.theme.color.rgb76_91_111
				}, function(e)
				{
					return e.theme.color.rgb76_91_111
				}, function(e)
				{
					return e.theme.color.rgb76_91_111
				}),
				u = (0, r.ZP)(s).withConfig(
				{
					displayName: "talk__NTextBox",
					componentId: "sc-eq7cqw-5"
				})(["::after{content:none;}"]),
				d = (0, r.ZP)(s).withConfig(
				{
					displayName: "talk__STextBox",
					componentId: "sc-eq7cqw-6"
				})(["background:", ";border:1px solid ", ";::after{content:none;}"], function(e)
				{
					return e.theme.color.rgb74_138_202
				}, function(e)
				{
					return e.theme.color.rgb74_138_202
				}),
				h = r.ZP.div.withConfig(
				{
					displayName: "talk__Triangle",
					componentId: "sc-eq7cqw-7"
				})(["position:relative;::after{content:'';position:absolute;left:0;top:0.6rem;height:0;border-top:0.3rem solid transparent;border-bottom:0.3rem solid transparent;border-left:0.5rem solid ", ";}"], function(e)
				{
					return e.theme.color.rgb74_138_202
				}),
				m = r.ZP.span.withConfig(
				{
					displayName: "talk__InfoBox",
					componentId: "sc-eq7cqw-8"
				})(["user-select:text;position:relative;color:", ";width:100%;border-radius:10px;background:", ";text-align:center;white-space:pre-wrap;overflow-wrap:break-word;word-break:break-word;word-wrap:break-word;line-break:loose;font-size:1rem;padding:0.2rem 1rem;line-height:1.5rem;"], function(e)
				{
					return e.theme.color.rgb69_78_89
				}, function(e)
				{
					return mt_settings['风格样式'][2]//#自定义样式
				}),
				f = (0, r.ZP)(o.Mm).withConfig(
				{
					displayName: "talk__HeartButton",
					componentId: "sc-eq7cqw-9"
				})(["padding:0.5rem;height:max-content;color:white;background-color:", ";border-radius:0.5rem;border:none;border-bottom:0.1rem solid ", ";box-shadow:0rem 0.05rem 0.2rem ", ";line-height:1.5rem;&:hover{background-color:", ";}"], function(e)
				{
					return e.theme.color.rgb252_135_155
				}, function(e)
				{
					return e.theme.color.rgb169_136_136
				}, function(e)
				{
					return e.theme.color.rgb215_165_165
				}, function(e)
				{
					return e.theme.color.rgb223_109_128
				}),
				p = r.ZP.hr.withConfig(
				{
					displayName: "talk__HR",
					componentId: "sc-eq7cqw-10"
				})(["border:0;height:1px;background:", ";width:100%;"], function(e)
				{
					return e.theme.color.rgb218_225_229
				}),
				g = (0, r.ZP)(o.Mm).withConfig(
				{
					displayName: "talk__ReplyButton",
					componentId: "sc-eq7cqw-11"
				})(["text-align:center;height:100%;width:100%;padding:0.7rem 0.5rem;border:none;border-bottom:0.1rem solid ", ";box-shadow:0rem 0.05rem 0.2rem ", ";border-radius:0.5rem;line-height:1.5rem;"], function(e)
				{
					return e.theme.color.rgb174_174_174
				}, function(e)
				{
					return e.theme.color.rgb180_188_192
				}),
				x = r.ZP.span.withConfig(
				{
					displayName: "talk__TimeSpan",
					componentId: "sc-eq7cqw-12"
				})(["color :", ";font-size :0.9rem;margin:auto 0.5rem 0 0.5rem;flex-shrink:0;"], function(e)
				{
					return e.theme.color.rgb69_78_89
				}),
				y = (0, r.ZP)(o.xL).withConfig(
				{
					displayName: "talk__CheckedIcon",
					componentId: "sc-eq7cqw-13"
				})(["width:1.1rem;height:1.1rem;margin-right:0.5rem;"]),
				b = r.ZP.img.withConfig(
				{
					displayName: "talk__Profile",
					componentId: "sc-eq7cqw-14"
				})(["box-sizing:border-box;margin:0rem;width:4rem;height:4rem;object-fit:contain;border-radius:50%;"])
		},
		8312: function(e, n, t)
		{
			(window.__NEXT_P = window.__NEXT_P || []).push(["/", function()
			{
				return t(1097)
			}])
		}
	},
	function(e)
	{
		e.O(0, [443, 288, 876, 774, 888, 179], function()
		{
			return e(e.s = 8312)
		}), _N_E = e.O()
	}
]);