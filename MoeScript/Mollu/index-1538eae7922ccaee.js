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
					height: "100%"
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
						}, 0), r === n ? 2 * l : l
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
				a = t(8727),
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
							if(selectedList == 'yes' && localStorage['mt-selectedList'])e.sCharacter = JSON.parse(localStorage['mt-selectedList']);
							selectedList = 'no';
							localStorage['mt-selectedList'] = JSON.stringify(e.sCharacter);
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
									if($jquery('.visible').length<1)o(!0), e((0, h.Ks)(d.I))//#
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
									if($jquery('.visible').length<1)e((0, s.Cz)(!1))//#
								},
								children: (0, m.jsx)(b,
								{
									icon: ico.EyR
								})
							})]
						}), (0, m.jsx)(g,
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
								children: (0, m.jsx)(a.Z,
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
											return (0, m.jsx)(j,
											{
												alt: String(e.no),
												width: 252,
												height: 252,
												src: loadhead(e.no,e.index),//#下方快捷角色选择框
												onClick: function()
												{
													_(e)
												},
												onError: function(e)
												{
													var n = e.currentTarget;
													(0, u.Mp)(n, "character")
												},
												className: (0, u.Y)(w.selected, e) ? "selected" : ""
											}, n)
										})
									})
								})
							})
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
								alt: "sensei",
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
				_ = t(721),
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
					return (0, m.jsx)(a.Z,
					{
						children: (0, m.jsx)(k,
						{
							children: n.profile.map(function(e)
							{
								return (0, m.jsx)(c.t_,
								{
									width: 252,
									height: 252,
									alt: "profile",
									src: loadhead(n.no,e),//#左方人物皮肤选择分支
									onError: function(e)
									{
										var n = e.currentTarget;
										(0, u.Mp)(n, "character")
									},
									onClick: function()
									{
										l(e)
									},
									className: 1 === r.filter(function(t)
									{
										return n.no === t.no && e === t.index
									}).length ? "selected" : ""
								}, e)
							})
						})
					})
				},
				k = o.ZP.div.withConfig(
				{
					displayName: "Profiles__PContainer",
					componentId: "sc-6ar1q-0"
				})(["", " padding:1rem 0rem;width:100%;"], function(e)
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
							return e.global.lang
						});
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
									t === n ? r(null) : r(n)
								},
								children: [(0, m.jsxs)(S,
								{
									children: [(0, m.jsx)(c.NZ,
									{
										width: 252,
										height: 252,
										src: loadhead(n.no,n.profile[0]),//#左方选择框
										onError: function(e)
										{
											var n = e.currentTarget;
											(0, u.Mp)(n, "character")
										},
										alt: "profile"
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
													style:{color:'black'},
													children: n.name[a].replaceAll("-", " ")
												})
											})
										}), (0, m.jsx)(F,
										{
											className: "bold",
											children: [(0, m.jsx)(O,
											{
												onClick: function()
												{
													$jquery('#ccus').val(n.no>999?n.no-1000:n.no)
												},
												children:[(0, m.jsx)('span',
												{
													children:'ID：'
												}),(0, m.jsx)('span',
												{
													style:
													{
														fontStyle:'italic',
														color:'black',
													},
													className: "medium",
													children:n.no>999?n.no-1000:n.no 
												})]
											}),(0, m.jsx)(O,
											{
												children: [(0, m.jsx)('span',
												{
													children:(n.club[a] === '自定义角色' ? "size" : mt_text['club'][lang])+'：'
												}),(0, m.jsx)('span',
												{
													className: "medium",
													children:n.club[a] === '自定义角色' ? (JSON.parse(localStorage['mt-head'])[n.no].length/1024).toFixed(0)+'kb' : n.club[a]
												})]
											})]//@显示社团
										})]
									})
									//*添加ID和社团信息
									]
								}), (0, m.jsx)(B,
								{
									width: 252,
									height: 252,
									src: href+"Images/Ui/School/"+(n.school[a] === '自定义' ? '自定义' : mt_characters[n.no].school)+'.webp',//#学校图标
									onError: function(e)
									{
										var n = e.currentTarget;
										(0, u.Mp)(n, "school")
									},
									alt: "school"
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
				})(["padding:0rem 1rem;width:100%;box-sizing:border-box;"]),
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
							return e.global.lang
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
								maxHeight: n ? ($jquery('.LeftScreen__CharContainer-sc-jf2v8s-1').outerHeight())+"px" : "0"//#设置分类框最大高度
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
										club()//@
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
										className: u === e ? "selected medium" : "medium",
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
										children: mt_text['select'][lang]+mt_text['club'][lang]+"："
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
										children: mt_text['clear'][lang]+mt_text['select'][lang]
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
										children: (0, m.jsx)('li',
										{
											children: [(0, m.jsx)('input',
											{
												type: "checkbox",
												className: "club",
												school: "自定义",
												value: "自定义角色"
											}),"自定义角色"]
										})
									})]
								}),
								mt_school.map(function(v, k)
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
												children: mt_schoolname[v][lang] ? mt_schoolname[v][lang] : v
											})]
										}), (0, m.jsx)('ul',
										{
											className: "mutliSelect",
											children: mt_club[v].map(function(value, index)
											{
												return (0, m.jsx)('li',
												{
													children: [(0, m.jsx)('input',
													{
														type: "checkbox",
														className: "club",
														school: v,
														value: value
													}),mt_clubname[value][lang] ? mt_clubname[value][lang] : value]
												})
											})
										})]
									})
								})]
								//*新增社团分类
							}), (0, m.jsx)(A,
							{
								children: (0, m.jsx)(c.Mm,
								{
									className: "medium",
									onClick: function()
									{
										//*储存分类和排序方式
										localStorage['mt-order'] = u
										clubarr = {};
										$jquery(".club:checked").each(function()
										{
											clubarr[$jquery(this).attr('value')] = 'YES'
										})
										localStorage['mt-club'] = JSON.stringify(clubarr);
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
							return e.global.lang
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
											src: href+"Images/Ui/".concat(n.order ? "down" : "up", ".webp")//#排序图标
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
								src: href+"Images/Ui/pen.webp",//#铅笔图标
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
							return e.global.lang
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
						{
							//*更新自定义角色的读取方式
							let arr = JSON.parse(JSON.stringify(_.Z));
							let carr = [];
							$jquery.each(JSON.parse(localStorage['mt-char']),function(k,v)
							{
								if(v !== null)arr.unshift(
								{
									name:
									{
										zh_cn:v,zh_tw:v,en:v,jp:v,kr:v,pinyin:v
									},
									club:
									{
										zh_cn:'自定义角色',zh_tw:'自定义角色',en:'自定义角色',jp:'自定义角色',kr:'自定义角色',pinyin:'自定义角色'
									},
									school : 
									{
										zh_cn:'自定义',zh_tw:'自定义',en:'自定义',jp:'自定义',kr:'自定义',pinyin:'自定义'
									},
									no:k,
									illust : 0,
									profile : [1],
									momotalk : true,
									open : true
								})
							})
							arr.map(function(v, k)
							{
								let club = v.school.zh_cn === '自定义' ? '自定义角色' : mt_characters[v.no].club
								if(mt_name[v.no])arr[k].name[lang] = mt_name[v.no];//@改名
								if(JSON.stringify(clubarr) !== '{}' && !clubarr[club])delete arr[k]
							})
							//*更新自定义角色的读取方式
							return arr.filter(function(e)//#_.Z换为arr
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
							return e.global.lang
						}),
						d = function()
						{
							t(!1), s("")
						};
					return (0, m.jsx)(ea.Xf,
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
										className: "medium",
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
											o("info", l), d()
										},
										children: L.Z.confirm[u]
									})]
								})]
							})]
						})
					})
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
							return e.global.lang
						}),
						x = (0, i.T)(),
						y = function()
						{
							o(!1), f("")
						},
						b = function()
						{
							var e = [],
								n = {
									type: "reply",
									replyNo: p.replyNo+Math.random(),//#随机ID防BUG
									replyGroup: ((null == t ? void 0 : t.replyGroup) || p.replyGroup)+Math.random(),//#随机ID防BUG
									replyDepth: p.sReplyNo,
									sCharacter: d.I,
									content: h,
									isFirst: a
								},
								r = (0, u.ho)(p.chats, n);
							//*新版向上追加消息：选择肢
							e = (0, et.Z)(p.chats);
							let index = $jquery(".dels:checked").attr('index');
							index && a === true > -1 ? e.splice(index,0,n) : e.push(n);
							!r || r && p.chats.indexOf(r) === p.chats.length ? e : p.chats.forEach(function(t, o)
							{
								e, p.chats[o + 1] === r && e
							}), a && x((0, eo.uE)(p.replyGroup + 1)), x((0, eo.U_)(e)), x((0, eo.I0)(p.replyNo + 1)), y(), setTimeout(function()
							{
								a ? nextindex().scrollIntoView(!1) : a;///更新位置
							}, 100)
							//*新版向上追加消息：选择肢
							/*
							!r || r && p.chats.indexOf(r) === p.chats.length ? e.push.apply(e, (0, et.Z)(p.chats).concat([n])) : p.chats.forEach(function(t, o)
							{
								e.push(t), p.chats[o + 1] === r && e.push(n)
							}), a && x((0, eo.uE)(p.replyGroup + 1)), x((0, eo.U_)(e)), x((0, eo.I0)(p.replyNo + 1)), y(), setTimeout(function()
							{
								var e;
								null == l || null === (e = l.current) || void 0 === e || e.scrollIntoView(!1)
							}, 100)
							*/
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
										className: "medium",
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
											b()
										},
										children: L.Z.confirm[g]
									})]
								})]
							})]
						})
					})
				},
				eu = function(e)
				{
					var n = e.show,
						t = e.handleShow,
						r = e.handleDeleteAll,
						o = (0, i.C)(function(e)
						{
							return e.global.lang
						});
					return (0, m.jsx)(m.Fragment,
					{
						children: (0, m.jsx)(ea.Xf,
						{
							className: n ? "visible medium" : "medium",
							onDoubleClick: function()
							{
								t(!1)
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
										children: L.Z.deleteTalk[o]
									}), (0, m.jsx)(ea.ec,
									{
										onClick: function()
										{
											t(!1)
										},
										children: (0, m.jsx)(c.j4,
										{})
									})]
								}), (0, m.jsxs)(ea.$0,
								{
									children: [
									//*批量删除提示
									$jquery(".dels:checked").length > 0 ? (0, m.jsx)("span",
									{
										style:
										{
											fontSize: "1.5rem",
											color: "red",
											marginTop: "1rem"
										},
										children: '你一共选中了'+$jquery(".dels:checked").length+'条数据'
									}) : '',
									//*批量删除提示
									(0, m.jsx)("span",
									{
										children: L.Z.ask_delete[o]
									}), (0, m.jsxs)("span",
									{
										style:
										{
											fontSize: "0.9rem",
											marginTop: "1rem"
										},
										children: ["※ ", L.Z.deleteTalk_comment[o]]
									}), (0, m.jsxs)(ea.$_,
									{
										children: [(0, m.jsx)(ea.Lw,
										{
											className: "bold",
											onClick: function()
											{
												t(!1)
											},
											children: L.Z.cancel[o]
										}), (0, m.jsx)(ea.AZ,
										{
											className: "bold",
											onClick: function()
											{
												r()
											},
											children: L.Z.confirm[o]
										})]
									})]
								})]
							})
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
							return e.global.lang
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
						v = (0, r.useState)((t = {
							watermark: !0,
							title: !1,
							writer: !1
						}, "undefined" != typeof localStorage && (t.watermark = JSON.parse((null === (n = localStorage) || void 0 === n ? void 0 : n.getItem("watermark")) === null ? "true" : localStorage.getItem("watermark") || "false")), t)),
						k = v[0],
						Z = v[1],
						N = (0, r.useState)((a = 1, "undefined" != typeof localStorage && (a = Number.parseInt((null === (o = localStorage) || void 0 === o ? void 0 : o.getItem("imageQaulity")) || "1")), a)),
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
										t = function(e, n)
										{
											e.documentElement.style.fontSize = "16px", n.style.width = "500px";
											var t = L.Z.title[g] + " : " + ("" !== _ ? _ : L.Z.noTitle[g]),
												r = L.Z.writer[g] + " : " + ("" !== R ? R : L.Z.noName[g]),
												o = (0, u.Jx)(k, t, r);
											n.prepend(o)
										}, eg()(n,
										{
											logging: !1,
											allowTaint: !0,
											useCORS: !0,
											width: 500,
											windowWidth: 500,
											scale: 1 === S ? S + .1 : S,
											onclone: t
										}).then(function(e)
										{
											var n, t = e.toDataURL("image/png");
											if(e.height > maxHeight)alert(`图片长度为${e.height}，超过${maxHeight}的部分会变为空白`);
											//*加入水印功能和隐写存档
											let json = [];
											json[0] = {};
											json[0]['title'] = '备份存档';
											json[0]['nickname'] = 'MoeTalk';
											json[0]['date'] = (0, u._3)(!0, !0);
											json[0]['replyNo'] = JSON.parse(localStorage['replyNo']);
											json[0]['replyGroup'] = JSON.parse(localStorage['replyNo']);
											json[1] = JSON.parse(localStorage['chats']);
											if(localStorage['wmark'])
											{
												let arr = JSON.parse(localStorage['wmark']);
												drawWaterMark.init(
												{
													imgpath: t,///图片路径  string类型  [必传]
													rotate: arr[0],///旋转角度   int类型
													fontsize: arr[1],///字体大小
													fontcolor: arr[2]+","+arr[3]+","+arr[4]+","+arr[5],///字体颜色  rgba类型
													density: arr[6],///稠密度
													str: arr[7].split(" "),	///[必传]
													cb: function(base64)
													{
														j(base64), null === (n = I.current) || void 0 === n || n.setAttribute("src",base64), e.toBlob(function(e)
														{
															combineFiles(t.replace('data:image/png;base64,',''),JSON.stringify(json),"MolluTalk_" + ("" !== _ ? _ : L.Z.noTitle[g]));
														})
													}
												})
											}
											else
											{
												j(t), null === (n = I.current) || void 0 === n || n.setAttribute("src", t), e.toBlob(function(e)
												{
													combineFiles(t.replace('data:image/png;base64,',''),JSON.stringify(json),"MolluTalk_" + ("" !== _ ? _ : L.Z.noTitle[g]));
												})
											}
											//*加入水印功能和隐写存档
											/*
											j(t), null === (n = I.current) || void 0 === n || n.setAttribute("src", t), e.toBlob(function(e)
											{
												e && (0, ef.saveAs)(e, "MolluTalk_" + ("" !== _ ? _ : L.Z.noTitle[g] + ".png"))
											})
											*/
										}).catch(function()
										{
											p((0, er.Y2)(
											{
												isAlert: !0,
												title: L.Z.error[g],
												ment: L.Z.error_ment[g]
											}))
										}).finally(function()
										{
											p((0, s.jh)(!1))
										});
									case 6:
									case "end":
										return e.stop()
								}
							}, e)
						})), function()
						{
							return l.apply(this, arguments)
						}),
						E = function(e, n)
						{
							var t = e.target.checked,
								r = {
									watermark: k.watermark,
									title: k.title,
									writer: k.writer
								};
							r[n] = t, "watermark" !== n || (localStorage.setItem("watermark", String(t)), t || (r.title = !1, r.writer = !1)), Z(r)
						};
					return (0, m.jsx)(ea.Xf,
					{
						className: d ? "visible medium" : "medium",
						onDoubleClick: function()
						{
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
									children: L.Z.download_to_image[g]
								}), (0, m.jsx)(ea.ec,
								{
									onClick: function()
									{
										D()
									},
									children: (0, m.jsx)(c.j4,
									{})
								})]
							}), (0, m.jsxs)(ea.$0,
							{
								/*style:
								{
									minHeight: "20rem",
									overflow: "hidden"
								},*/
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
												className: "medium",
												placeholder: L.Z.title_comment[g],
												maxRows: 1,
												value: _,
												maxLength: 14,
												onChange: function(e)
												{
													var n = e.currentTarget.value;
													n.match("\n") || (C(n), Z(
													{
														watermark: !0,
														writer: !0,
														title: !0
													}))
												},
												onKeyDown: function(e) {}
											})
										}), L.Z.writer[g], (0, m.jsx)(c.OP,
										{
											children: (0, m.jsx)(c.Kx,
											{
												className: "medium",
												placeholder: L.Z.nickName_comment[g],
												maxRows: 1,
												value: R,
												maxLength: 9,
												onChange: function(e)
												{
													var n = e.currentTarget.value;
													n.match("\n") || (F(n), Z(
													{
														watermark: !0,
														writer: !0,
														title: !0
													}))
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
											children: [1, 2, 3].map(function(e)
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
														onChange: function()
														{
															P(e)
														},
														value: e
													}), e, "x"]
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
													id: e,
													checked: k[e],
													onChange: function(n)
													{
														return E(n, e)
													},
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
											fontSize: "0.9rem"
										},
										children: L.Z.thanks[g]
									}), (0, m.jsxs)(ea.$_,
									{
										children: [(0, m.jsx)(ea.Lw,
										{
											className: "bold",
											onClick: function()
											{
												D()
											},
											children: L.Z.cancel[g]
										}), (0, m.jsx)(ea.AZ,
										{
											className: "bold",
											disabled: x,
											onClick: function()
											{
												//*加入长度判断
												if(height*(1=== S ? S +.1:S) > maxHeight)
												{
													if(confirm(height+'x'+(1=== S ? S +.1:S)+'=('+(height*(1=== S ? S +.1:S)).toFixed(0)+' > '+maxHeight+')，生成的图片可能会有缺失\n另外此数字可能并不准确，具体请以生成的图片长度为基准'))O();
												}
												else
												{
													O()
												}
												//*加入长度判断
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
										},
										children: [(0, m.jsx)("div",
										{
											style:
											{
												fontSize: "1rem",
												marginBottom: "1rem"
											},
											children: L.Z.image_download[g]
										}), (0, m.jsx)(ev,
										{
											ref: I,
											alt: "download"
										})]
									})
								})]
							})]
						})
					})
				},
				ej = ["watermark", "title", "writer"],
				ew = o.ZP.div.withConfig(
				{
					displayName: "PopupImageDownload__Wrapper",
					componentId: "sc-uicakl-0"
				})(["", ";margin-bottom:1rem;"], function(e)
				{
					return e.theme.common.flexBox(
					{})
				}),
				e_ = o.ZP.div.withConfig(
				{
					displayName: "PopupImageDownload__ImgContainer",
					componentId: "sc-uicakl-1"
				})(["position:relative;width:100%;height:100%;"]),
				eC = o.ZP.div.withConfig(
				{
					displayName: "PopupImageDownload__ImgWrapper",
					componentId: "sc-uicakl-2"
				})(["height:100%;width:100%;text-align:center;position:absolute;"]),
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
							return e.global.lang
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
										return n = [], s.chats.forEach(function(e, t)
										{
											s.chats.findIndex(function(n, t)
											{
												return e.sCharacter.no === n.sCharacter.no
											}) === t && 0 !== e.sCharacter.no && n.push(e.sCharacter.no)
										}), r = [JSON.stringify([t = {
											title: "" !== f ? f : L.Z.noTitle[d],
											nickname: "" !== k ? k : L.Z.noName[d],
											date: (0, u._3)(!0, !0),
											replyNo: s.replyNo,
											replyGroup: s.replyGroup,
											mt_char: JSON.parse(localStorage['mt-char']),//@自创角色
											mt_head: JSON.parse(localStorage['mt-head']),//@自创头像
											chars: n
										}, (0, et.Z)(s.chats)])], e.next = 6, (0, u.rU)(r);
									case 6:
										o = e.sent, (0, ef.saveAs)(o, "MolluTalk_".concat(t.title, ".png")), N();
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
									w(loaddata(JSON.parse(n.result))), y("upload")//#编译存档
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
							a((0, eo.U_)(j[1])), a((0, eo.gW)(
							{
								sReplyNo: 0,
								replyNo: j[0].replyNo,
								replyGroup: j[0].replyGroup
							})), w([
								{
									title: "",
									nickname: "",
									date: "",
									replyNo: 0,
									replyGroup: 0,
									chars: []
								},
								[]
							]), N()
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
							(0, m.jsx)("input",
							{
								hidden: x ? true : false,
								type: "checkbox",
								id: "customchar"
							}),
							(0, m.jsx)("span",
							{
								hidden: x ? true : false,
								className: "bold",
								children: "上传MoeTalk存档内的自定义角色"
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
										accept: "image/png, application/json",
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
											children: L.Z.edit_comment[d]
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
											s.chats.length > 0 && y("download")
										},
										children: [(0, m.jsx)(eI,
										{
											disabled: s.chats.length < 1,
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
												maxLength: 20,
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
												maxLength: 10,
												onChange: function(e)
												{
													e.currentTarget.value.match("\n") || Z(e.currentTarget.value)
												}
											})
										})]
									}), (0, m.jsx)("span",
									{
										style:
										{
											textAlign: "center",
											fontSize: "1rem",
											marginTop: "1rem"
										},
										children: L.Z.thanks[d]
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
												S()
											},
											children: L.Z.confirm[d]
										})]
									})]
								}) : (0, m.jsxs)(m.Fragment,
								{
									children: [(0, m.jsx)("span",
									{
										children: L.Z.up_comment1[d]
									}), (0, m.jsxs)("div",
									{
										style:
										{
											margin: "1.5rem 0"
										},
										children: [(0, m.jsxs)(eT,
										{
											children: [L.Z.title[d], " : ", j[0].title]
										}), (0, m.jsxs)(eT,
										{
											children: [L.Z.writer[d], " : ", j[0].nickname]
										}), (0, m.jsxs)(eT,
										{
											children: [L.Z.date[d], " : ", j[0].date]
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
				})(["", ";flex-direction:column;width:100%;text-align:center;cursor:pointer;"], function(e)
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
				})(["margin-bottom:1rem;width:3rem;color:", ";"], function(e)
				{
					return e.theme.color.rgb45_70_100
				}),
				eB = o.ZP.div.withConfig(
				{
					displayName: "PopupFileShare__StyledForm",
					componentId: "sc-ynp9rx-2"
				})(["", ";line-height:2rem;"], function(e)
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
						return e.global.lang
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
						style: t ?
						{
							maxHeight: "12rem"
						} :
						{
							maxHeight: "0"
						},
						children: [(0, m.jsxs)(eD,
						{
							children: [(0, m.jsx)(eO,
							{
								id: "tool-reply",//@选择肢
								title: "Reply",
								onClick: function()
								{
									v(!0)
								},
								children: (0, m.jsx)(c.xL,
								{
									icon: ico.Lh7
								})
							}), (0, m.jsx)(eO,
							{
								id: "tool-info",//@旁白
								title: "Info",
								onClick: function()
								{
									I(!0)
								},
								children: (0, m.jsx)(c.xL,
								{
									icon: ico.DBf
								})
							}), (0, m.jsx)(eO,
							{
								id: "tool-heart",//@羁绊事件
								disabled: 0 === u.no,
								title: "Relationship Event",
								onClick: function()
								{
									o("heart", "")
								},
								children: (0, m.jsx)(c.xL,
								{
									icon: ico.m6i
								})
							}), (0, m.jsx)(eO,
							{
								id: "tool-delete",//@删除工具
								disabled: d.length < 1,
								title: "Delete ALL",
								onClick: function()
								{
									N(!0)
								},
								children: (0, m.jsx)(c.xL,
								{
									icon: ico.Vui
								})
							})]
						}), (0, m.jsxs)(eD,
						{
							children: [(0, m.jsx)(eO,
							{
								id: "editTools",//@编辑工具
								title: "ScreenShot Mode",
								className: h ? "dot" : "",
								onClick: function()
								{
									a((0, s.Wn)(!h))
								},
								children: (0, m.jsx)(c.xL,
								{
									icon: ico.QY_
								})
							}), (0, m.jsx)(eO,
							{
								id: "tool-image",//@截图工具
								disabled: d.length < 1,
								title: "Image Download",
								onClick: function()
								{
									y(!0)
								},
								children: (0, m.jsx)(c.xL,
								{
									icon: ico.wf8
								})
							}), (0, m.jsx)(eO,
							{
								id: "tool-save",//@存档工具
								title: "Share File",
								onClick: function()
								{
									w(!0)
								},
								children: (0, m.jsx)(c.xL,
								{
									icon: ico.EdJ
								})
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
							isFirst: !0,
							sReply: null,
							scrollRef: n
						}), (0, m.jsx)(eu,
						{
							show: Z,
							handleShow: function(e)
							{
								N(e)
							},
							handleDeleteAll: function()
							{
								//*批量删除
								let arr = [];
								let i = 0;
								let rGroup = 1;
								let rNo = 1;
								if($jquery(".dels:checked").length > 0)
								{
									arr = JSON.parse(JSON.stringify(d));
									rGroup = localStorage['replyGroup'];
									rNo = localStorage['replyNo'];
									$jquery(".dels:checked").each(function()
									{
										arr.splice($jquery(this).attr('index')-i,1);
										i++;
									})
								}
								click('#delsall');click('#delsall');
								//*批量删除
								N(!1), a((0, eo.U_)(arr)), a((0, eo.gW)(//#批量删除支持[]改arr
								{
									replyGroup: 1,
									replyNo: 1,
									sReplyNo: 0
								}))
							}
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
							return e.global.lang
						}),
						s = function()
						{
							t(!1)
						},
						u = function(e)
						{
							var n = [],
								t = (0, et.Z)(a.chats).filter(function(e)
								{
									return e.replyDepth === a.sReplyNo
								}).pop(),
								i = {
									type: "image",
									replyNo: 0,
									replyGroup: 0,
									replyDepth: a.sReplyNo,
									sCharacter: o,
									content: e,
									isFirst: a.chats.length < 1 || a.chats[a.chats.length - 1].sCharacter !== o || a.chats[a.chats.length - 1].replyDepth !== a.sReplyNo
								};
							let index = $jquery(".dels:checked").attr('index');//@获取记录位置
							if(a.chats.length < 1) n.push(i);
							else if(t) a.chats.forEach(function(e)
							{
								n.push(e), e === t && (i.isFirst = "heart" === t.type || t.sCharacter !== o || t.replyDepth !== a.sReplyNo, index > -1 ? n.splice(index,0,i) : n.push(i))
								//#新版向上追加消息：表情
							});
							else
							{
								var c = (0, et.Z)(a.chats).filter(function(e)
								{
									return e.replyNo === a.sReplyNo
								}).pop();
								a.chats.forEach(function(e)
								{
									n.push(e), e === c && n.push(i)
								})
							}
							r((0, eo.U_)(n)), s(), setTimeout(function(){nextindex().scrollIntoView(!1)}, 100)//#更新表情位置
						};
					//*定义差分文件链接
					if(cfemoji != 'NO')
					{
						cf = cfemoji;
						cfemoji = 'NO';//@加入判断
						let emojinum;
						let no = JSON.parse(localStorage['mt-selectedList'])['selected']['no'];

						if(localStorage['CharFaceIndex'] && JSON.parse(localStorage['CharFaceIndex'])[no] != null)
						{
							no = JSON.parse(localStorage['CharFaceIndex'])[no];
						}
						let link;let cflink = null;let cfarr = [];cfarr[0] = 'Images/CharFace';///定义链接
						let charname = no === 0 ? '主角' : '#'+(no-1000);

						if(JSON.parse(localStorage['mt-char'])[no])
						{
							charname = JSON.parse(localStorage['mt-char'])[no];
						}
						if(mt_characters[no])
						{
							charname = mt_characters[no].name[lang] ? mt_characters[no].name[lang] : no
						}

						if(mt_name[no])charname = mt_name[no];//@改名
						let mt_charface = mt_characters[no] ? mt_characters[no].charface : ''
						if(cf == 'CharFace' && mt_charface !== '')
						{
							if(!sessionStorage[no] || sessionStorage[no] < 0 || sessionStorage[no] > mt_charface.split(',').length-1)
							{
								sessionStorage[no] < 0 ? sessionStorage[no] = mt_charface.split(',').length-1 : sessionStorage[no] = 0;
							}
							let arr = mt_charface.split(',')[parseInt(sessionStorage[no])];
							for(let num = 1;num <= arr.split('.')[1];num++)
							{
								cflink = 'Images/CharFace/'+(arr.split('.')[0].replaceAll('_','/'))+'/'+arr.split('.')[0]+'.';
								cfarr.push(href+cflink+num+'.webp')
							}
						}
						if(cf == 'Emoji')
						{
							if(4 <= CFPI)CFPI = 0;
							if(CFPI < 0)CFPI = 3;
							if(CFPI == 0)emojinum = 40;
							if(CFPI == 1)emojinum = 40;
							if(CFPI == 2)emojinum = 64;
							if(CFPI == 3)emojinum = 27;
						}
						let cfnum = cf == 'Emoji' ? emojinum : cfarr.length-1;///差分总数
						
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
										children: [(0, m.jsx)(ea.Dx,
										{
											className: "bold",
											children: cf == 'Emoji' ? L.Z.emoticon[l]+'('+cfnum+')' : charname+'('+cfnum+')'//#加入差分表情
										}), (0, m.jsx)(ea.ec,
										{
											id: 'close',//@
											onClick: function()
											{
												s()
											},
											children: (0, m.jsx)(c.j4,
											{})
										})]
									}),(0, m.jsxs)(ea.h4,
									{
										children: [(0, m.jsx)(c.Bx,
										{
											className: "bold",
											style:
											{
												"width": "auto",
												"color": "black"
											},
											children: '←',
											onClick:function()
											{
												click('#close');
												cf == 'Emoji' ? CFPI = CFPI-1 : sessionStorage[no] = parseInt(sessionStorage[no])-1
											}
										}), (0, m.jsx)(ea.Dx,
										{
											className: "bold",
											style:
											{
												"width": "25%",
												textAlign:"center"
											},
											children: (cf == 'Emoji' ? CFPI+1 : (parseInt(sessionStorage[no])+1))+"/"+(cf !== 'Emoji' && mt_charface ? mt_charface.split(',').length : cf == 'Emoji' ? 4 : 0)
										}), (0, m.jsx)(c.Bx,
										{
											className: "bold",
											style:
											{
												"width": "auto",
												"color": "black"
											},
											children: '→',
											onClick:function()
											{
												click('#close');
												cf == 'Emoji' ? CFPI = CFPI+1 : sessionStorage[no] = parseInt(sessionStorage[no])+1
											}
										})]
									}), (0, m.jsx)(eE,
									{
										children: (0, m.jsxs)(eM,
										{
											children: [Array(cf == 'Emoji' ? emojinum : cfnum)//#加入差分表情
												.fill(0)
												.map(function(e, n)
												{
													if(cf == 'Emoji')link = `${href}Images/${cf}/${CFPI+1}${CFPI<3?(lang=='zh_cn'?'zh_tw':lang):''}${n+1}.webp`;//@原版表情
													if(cf == 'CharFace')link = cfarr[n+1];//@差分表情
													return (0, m.jsx)(ez,
													{
														alt: cf,
														height: 310,
														width: 310,
														onClick: function()
														{
															if(cf == 'Emoji')link = `${href}Images/${cf}/${CFPI+1}${CFPI<3?(lang=='zh_cn'?'zh_tw':lang):''}${n+1}.webp`;//@原版表情
															if(cf == 'CharFace')link = cfarr[n+1];//@差分表情
															u(link)//#表情链接
														},
														src: link//#表情链接
													}, n)
												})
											]
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
				})(["", ";overflow:hidden;overflow-y:auto;max-height:30rem;padding:0.5rem;"], function(e)
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
				})(["", ";flex-wrap:wrap;background-color:", ";border-radius:0.5rem;justify-content:space-between;padding:0.5rem;"], function(e)
				{
					return e.theme.common.flexBox(
					{
						justify: "space-between"
					})
				}, function(e)
				{
					return e.theme.color.rgb216_218_220
				}),
				ez = (0, o.ZP)(c.Yo).withConfig(
				{
					displayName: "PopupEmoticonChat__ImgBox",
					componentId: "sc-vzjcea-2"
				})(["width:32%;border:2px solid ", ";background-color:", ";border-radius:10px;margin-bottom:0.5rem;cursor:pointer;&:active{transform:scale(0.95);}"], function(e)
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
							return e.global.lang
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
							if(13 === (e.which || e.keyCode) && !(e.ctrlKey || e.shiftKey) && "" !== e.currentTarget.value && !localStorage['send'])
							{
								e.preventDefault()
								n()
							}
							if(13 === (e.which || e.keyCode) && (e.ctrlKey || e.shiftKey) && "" !== e.currentTarget.value && localStorage['send'] == 'click')
							{
								e.preventDefault()
								n()
							}
							//*更改文字发送方式
							/*
							13 === (e.which || e.keyCode) && (e.ctrlKey || e.shiftKey) && (e.preventDefault(), "" !== e.currentTarget.value && n())
							*/
						},
						I = (0, r.useCallback)(function(e, r)///发送功能
						{
							var i = {
								type: e,
								content: "",
								replyDepth: a,
								replyNo: 0,
								replyGroup: 0,
								sCharacter: s,
								isFirst: !0
							};
							"image" === e ? i.file = r : "chat" === e ? i.content = r : "info" === e && (i.content = r, i.sCharacter = d.I);
							var c = [],
								l = (0, et.Z)(o).filter(function(e)
								{
									return e.replyDepth === a
								}).pop();
							l && (i.isFirst = !("chat" === l.type && (0, u.Y)(l.sCharacter, s)) || l.replyDepth !== a);
							var h = (0, u.ho)(o, i);
							//*新版向上追加消息：一般消息
							c = (0, et.Z)(o);
							let index = $jquery(".dels:checked").attr('index');
							index > -1 ? c.splice(index,0,i) : c.push(i);
							!h || h && o.indexOf(h) === o.length ? c : o.forEach(function(e, n)
							{
								c, o[n + 1] === h && c
							}), t((0, eo.U_)(c)), setTimeout(function()
							{
								nextindex().scrollIntoView(!1)///更新位置
							}, 100)
							//*新版向上追加消息：一般消息
							/*
							!h || h && o.indexOf(h) === o.length ? c.push.apply(c, (0, et.Z)(o).concat([i])) : o.forEach(function(e, n)
							{
								c.push(e), o[n + 1] === h && c.push(i)
							}), t((0, eo.U_)(c)), setTimeout(function()
							{
								var e;
								null === (e = n.current) || void 0 === e || e.scrollIntoView(!1)
							}, 100)
							*/
						}, [a, s, o, n, t]),
						B = function()
						{
							t((0, er.Y2)(
							{
								isAlert: !0,
								title: L.Z.error[h],
								ment: L.Z.no_support[h]
							}))
						};
					return (0, m.jsxs)(eq,
					{
						children: [(0, m.jsxs)(eG,
						{
							children: [(0, m.jsx)(eU,
							{
								title: "open",
								onClick: function()
								{
									click('#editTools')//#p ? g(!1) : g(!0)
								},
								children: (0, m.jsx)(c.xL,
								{
									icon: ico.QY_//#icon: p ? l.dWM : l.XSi
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
									(0, u.T6)(e, function(e)
									{
										I("image", e)
									}, B)
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
										className: "medium",
										placeholder: L.Z.input_comment[h],
										maxRows: 5,
										value: w,
										ref: Z,
										onFocus: function()
										{
											g(!1), k(!0)
										},
										onKeyDown: function(e)
										{
											P(e, function()
											{
												I('chat', w), _("")///回车发送
											})
										},
										onChange: function(e)
										{
											cfemoji = 'NO';//@输入文字时不读取表情
											_(e.currentTarget.value)
											if($jquery(".dels:checked").attr('index'))$jquery(".dels:checked")[0].scrollIntoView(!1)//@输入文字自动跳到被选处
										}
									}), (0, m.jsx)(eU,
									{
										style:
										{
											padding: "0.2rem",
											width: "2.2rem",
											height: "2.2rem"
										},
										title: "emoticon",
										onClick: function()
										{
											cfemoji = 'Emoji';//@这是原版表情
											S(!0)
										},
										children: (0, m.jsx)(c.xL,
										{
											icon: ei.pkM
										})
									}),
									//*加入差分
									, (0, m.jsx)(eU,
									{
										style:
										{
											padding: "0.2rem",
											width: "2.2rem",
											height: "2.2rem"
										},
										id: "CharFace",
										onClick: function()
										{
											cfemoji = 'CharFace';///这是差分表情
											S(!0)
										},
										children: (0, m.jsx)(c.xL,
										{
											icon: ico.FKd
										})
									})
									//*加入差分
									]
								})
							}), (0, m.jsx)(eU,
							{
								style:
								{},
								title: "send",
								disabled: w.length < 1,
								onClick: function()
								{
									I('chat', w), _("")///单击发送
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
										click('#tool-heart')
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
										click('#tool-save')
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
										click('#tool-image')
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
				})(["padding:0 1rem;width:4rem;height:100%;align-self:center;color:", ";"], function(e)
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
							return e.global.lang
						}),
						p = (0, i.C)(function(e)
						{
							return e.sCharacter.selected
						}),
						g = (0, r.useState)(t.type),
						x = g[0],
						y = g[1],
						b = (0, r.useState)(""),
						j = val === '' ? (b[0] ? b[0] : t.content): !val ? '' : val,//#
						w = b[1],
						_ = (0, r.useRef)(null);
					(0, r.useEffect)(function()
					{
						w("edit" === a && "image" !== t.type ? t.content : "")//#修改变追加
					}, [a, t, w]);
					var C = function e(n)
						{
							var t = [n];
							return h.chats.forEach(function(r)
							{
								n === r.replyDepth && "reply" === r.type && (t = [].concat((0, et.Z)(t), (0, et.Z)(e(r.replyNo))))
							}), t
						},
						v = function()
						{
							var e = [],
								n = !1,
								r = !1,
								o = C(t.replyNo);
							return h.chats.forEach(function(i)
							{
								if(r = o.filter(function(e)
								{
									return e === i.replyDepth
								}).length > 0, t === i || r) n = !0;
								else if(n && t.isFirst)
								{
									var c = eY(
									{}, i);
									c.isFirst = !0, e.push(c), n = !1
								}
								else e.push(i)
							}), e
						},
						//*编辑功能
						k = function()
						{
							var e, n = [],
								r = !1;
							h.chats.forEach(function(r)
							{
								e = eY({}, r)
								if(r === t)
								{
									e.isFirst = true
									e.content = $jquery('.content').val()
									e.name = $jquery('.name').val()
									e.time = $jquery('.time').val()
									e.type = a
									e.sReplyNo = h.sReplyNo,
									e.replyNo = h.replyNo+Math.random()
									e.replyGroup = h.replyGroup+Math.random()
									if(sendChar === true)
									{
										e.sCharacter = p
									}
									if($jquery('.addChat').prop('checked') || (clearImage === true && t.file) || a !== 'image')
									{
										e.file = ''
									}
									if($jquery('.addChat').prop('checked') && !clearImage && e.type !== 'delete')n.push(eY({}, r))
									clearImage = false
								}
								if(e.type !== 'delete')n.push(e)
							}), s((0, eo.U_)(n)), S()
						},
						Z = (0, r.useCallback)(function(e, n)///图片编辑
						{
							var r, i = [],
								c = !1;
							h.chats.forEach(function(o)
							{
								r = eY({}, o)
								if(o === t)
								{
									r.content = r.content
									r.isFirst = !0
									r.type = e
									r.replyNo = 0
									r.replyGroup = 0
									r.replyDepth = h.sReplyNo
									r.file = n
									c = !0
									if(sendChar === true)
									{
										r.sCharacter = p
									}
									if($jquery('.addChat').prop('checked'))i.push(eY({}, o))
								}
								else
								{
									c && (r.isFirst = !0, c = !1)
								}
								i.push(r)
								
							}), s((0, eo.U_)(i)), o(!1, null, "delete"), w("")
						}, [a, h, t, s, p, o]),
						//*编辑功能
						N = function()
						{
							s((0, er.Y2)(
							{
								isAlert: !0,
								title: L.Z.error[f],
								ment: L.Z.no_support[f]
							}))
						},
						S = function()
						{
							o(!1, null, "delete"), w("")
						},
						P = (0, r.useCallback)(function()
						{
							var e = !0;
							return "delete" !== a && "time" !== a ? "heart" !== x ? j.length > 0 && (e = !1) : "add" === a && "heart" === x && 0 !== p.no && (e = !1) : e = !1, e
						}, [a, x, j, p]),
						I = (0, r.useCallback)(function()
						{
							var e = "";
							return "add" !== a ? ("info" !== t.type && (e = (0, u.fY)(t.sCharacter.no, !0, f)), "heart" === t.type ? e += L.Z.go_relationship_event[f] : "image" === t.type ? "edit" === a ? e += " : " + L.Z.add_image[f] : e += " : " + L.Z.image[f] : "time" === a ? e += " : " + L.Z.time_comment[f] : "chat" === t.type ? e += " : " + t.content : e += t.content) : "chat" === x ? e = (0, u.fY)(p.no, !0, f) + " : " + L.Z.input_comment[f] : "image" === x ? e = (0, u.fY)(p.no, !0, f) + " : " + L.Z.add_image[f] : "reply" === x ? e = "Sensei : " + L.Z.input_comment[f] : "heart" === x ? e = 0 === p.no ? L.Z.select_char[f] : (0, u.fY)(p.no, !0, f) + L.Z.go_relationship_event[f] : "info" === x && (e = L.Z.input_comment[f]), e
						}, [a, x, f, t, p]);
					//*编辑界面
					return (0, m.jsx)(ea.Xf,
					{
						className: n ? "visible medium" : "medium",
						style:{position:'absolute'},
						onDoubleClick: function()
						{
							S()
						},
						children: (0, m.jsxs)(ea.F0,
						{
							onDoubleClick: function(e)
							{
								return e.stopPropagation(), !1
							},
							children: [(0, m.jsxs)(ea.h4,
							{
								children: [(0, m.jsx)(c.Bx,
								{
									hidden: !sendChar,
									className: "bold",
									style:
									{
										"width": "auto",
										"color": "black"
									},
									children: '←',
									onClick:function(){selectClick(37)}
								}), (0, m.jsx)(ea.Dx,
								{
									className: "bold",
									children: L.Z[t.type][f]
								}), (0, m.jsx)(c.Bx,
								{
									hidden: !sendChar,
									className: "bold",
									style:
									{
										"width": "auto",
										"color": "black"
									},
									children: '→',
									onClick:function(){selectClick(39)}
								}), (0, m.jsx)(ea.ec,
								{
									onClick: function()
									{
										S()
									},
									children: (0, m.jsx)(c.j4,
									{})
								})]
							}), (0, m.jsxs)(ea.$0,
							{
								style:{gap:"16px"},
								children: [
								(0, m.jsx)('div',
								{
									className: "edit_2",
									children: [(0, m.jsx)('div',
									{
										className:"edit_2_1",
										children:(0, m.jsx)('div',
										{
											className:"edit_2_1_1 bold",
											children:[(0, m.jsx)('input',
											{
												type:'checkbox',
												className:'addChat'
											}),L.Z.add[f]]
										})
									}),(0, m.jsx)('div',
									{
										className:"edit_button",
										children: E.PN.map(function(e, n)
										{
											return (0, m.jsx)(c.Bx,
											{
												style:
												{
													margin: "0 auto",//@改为居中
													width: "23%",
													height: 'auto',
													whiteSpace: 'nowrap',
													overflow: 'hidden'
												},
												className: a === e ? "selected medium" : "medium",
												onClick: function()
												{
													l(e)
												},
												children: L.Z[e][f]
											}, n)
										})
									})]
								}),(0, m.jsx)('div',
								{
									className:"edit_4",
									children:[(0, m.jsx)(c.NZ,
									{
										onClick:function()
										{
											w(sendChar)
											sendChar === false ? sendChar = true : sendChar = false
										},
										style:
										{
											width: '48px',
											height: '48px',
										},
										src:sendChar === false ? loadhead(t.sCharacter.no,t.sCharacter.index) : loadhead(p.no,p.index)
									}), (0, m.jsx)('div',
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
													children: (0, m.jsx)('input',
													{
														className:"edit_3_box3_1_1 name medium",
														placeholder: sendChar === false ? (0, u.fY)(t.sCharacter.no, !0, f) : (0, u.fY)(p.no, !0, f),
														onChange: function(e)
														{
															$jquery('.name').val(e.currentTarget.value)
														}
													})
												}),(0, m.jsx)('div',
												{
													className:"edit_3_box3_2",
													children: (0, m.jsx)('div',
													{
														className:"edit_3_box3_2_1 bold",
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
													children: (0, m.jsx)('input',
													{
														className:"edit_3_box3_1_1 time medium",
														onChange: function(e)
														{
															$jquery('.time').val(e.currentTarget.value)
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
								}), (0, m.jsx)(eN.g4,
								{
									hidden: a !== 'image',
									children: L.Z.add_image[f],
									className: "medium",
									style: 
									{
										"overflow": "hidden",
										"text-overflow": "ellipsis",
										"white-space": "nowrap",
										"width": "70%",
										"padding": "0"
									},
									onClick: function(e)
									{
										_.current.click()
									}
								}), t.file ? (0,m.jsx)('div',
								{
									hidden: a !== 'image',
									width:"64px",
									height:"64px",
									children: (0,m.jsx)('img',
									{
										width:"auto",
										height:"64px",
										src:t.file,
									})
								}) : '',(0, m.jsx)('span',
								{
									hidden: a !== 'image',
									onClick: function()
									{
										if(t.file && confirm('点击确认会清除这张图片，确认吗？'))
										{
											clearImage = true
											k()
										}
									},
									children: t.file ? `图片体积：${parseInt((t.file.length/1024).toFixed(0))}KB` : '无图片文件，可以在下方输入图片链接' 
								}), (0, m.jsx)("input",
								{
									type: "file",
									ref: _,
									style:
									{
										display: "none"
									},
									accept: "image/*",
									onChange: function(e)
									{
										(0, u.T6)(e, function(e)
										{
											Z("image", e)///1
										}, N)
									}
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
														className:"edit_3_box3_1_1 content medium",
														onChange: function(e)
														{
															$jquery('.content').val(e.currentTarget.value)
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
								}),(0, m.jsxs)(ea.$_,
								{
									children: [(0, m.jsx)(eO,
									{
										title: "删除消息",
										onClick: function()
										{
											a = 'delete'
											k()
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
											S()
										},
										children: L.Z.cancel[f]
									}), (0, m.jsx)(ea.AZ,
									{
										className: "bold",
										disabled: !1,//#改名可以设置空值
										onClick: function()
										{
											k()
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
							return e.global.lang
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
							className: "medium",
							onClick: function(){e.click()},//@羁绊事件编辑
							children: n + L.Z.go_relationship_event[t]
						})]
					})
				},
				e$ = o.ZP.div.withConfig(
				{
					displayName: "HeartBox__Container",
					componentId: "sc-cwriov-0"
				})(["", ";padding:0.5rem;font-size:1.1rem;height:auto;border:1px solid ", ";border-radius:1rem;color:", ";background-color:", `;background-image:url('${href}Images/Ui/Favor_Schedule_Deco.webp');background-repeat:no-repeat;background-position:right;background-size:auto 100%;line-height:1.5rem;`], function(e)
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
				eQ = function(e)
				{
					let index = e.index//@加入选择分支索引
					var n = e.chat,
						t = (0, i.T)(),
						o = (0, i.C)(function(e)
						{
							return e.global.isScreenshot
						}),
						a = (0, r.useState)(!1),
						l = a[0],
						s = a[1],
						u = (0, r.useState)("delete"),
						d = u[0],
						h = u[1],
						f = function(e, n, t)
						{
							s(e)
						};
					return (0, m.jsxs)(e0,
					{
						children: [
						// o || (0, m.jsx)(e1,
						// {
						// 	"data-html2canvas-ignore": "true",
						// 	onClick: function()
						// 	{
						// 		f(!0, null, "delete"),h("delete")//#
						// 	},
						// 	children: (0, m.jsx)(c.xL,
						// 	{
						// 		icon: ei.Yai
						// 	})
						// }), 
						(0, m.jsx)(eN.g4,
						{
							// onClick: function()
							// {
							// 	/*t((0, eo.Z8)(n.replyNo))*/
							// 	notice('可以通过换行来分割选择肢',250)//@提示
							// 	val = n.content;//@选择肢给值
							// 	$jquery('.edit_3_box3_1_1').val(n.content)//@
							// 	f(!0, null, n.type),h(n.type)//@加入编辑功能
							// },
							children: (0, m.jsx)(e2,
							{
								className: browser.isFirefox ? "" : "medium",//#判断火狐
								children: n.content.split('\n')[index]//#根据分支索引判断选择肢位置
							})
						}), (0, m.jsx)(eK,
						{
							show: l,
							selectChat: n,
							handleShow: f,
							sChatModeType: d,
							setSChatModeType: function(e)
							{
								h(e)
							}
						})]
					})
				},
				e0 = o.ZP.div.withConfig(
				{
					displayName: "ReplyButtonBox__Container",
					componentId: "sc-15gyqnr-0"
				})(["", ";margin-bottom:0.5rem;height:auto;"], function(e)
				{
					return e.theme.common.flexBox(
					{})
				}),
				e1 = (0, o.ZP)(c.hU).withConfig(
				{
					displayName: "ReplyButtonBox__EditButton",
					componentId: "sc-15gyqnr-1"
				})(["padding:0rem 0.5rem;color:", ";height:1.2rem;"], function(e)
				{
					return e.theme.color.rgb45_70_100
				}),
				e2 = o.ZP.span.withConfig(
				{
					displayName: "ReplyButtonBox__Span",
					componentId: "sc-15gyqnr-2"
				})(["overflow:hidden;word-break:break-all;word-wrap:break-word;white-space:pre-wrap;line-break:loose;"]),
				e5 = function(e)
				{
					var n = e.chat,
						t = (0, i.C)(function(e)
						{
							return e.makeChat.chats
						}),
						o = (0, i.C)(function(e)
						{
							return e.global.lang
						}),
						a = (0, i.C)(function(e)
						{
							return e.global.isScreenshot
						}),
						s = (0, r.useState)(!1),
						u = s[0],
						d = s[1],
						h = function(e)
						{
							d(e)
						};
					return (0, m.jsxs)(e3,
					{
						children: [(0, m.jsxs)(e4,
						{
							style:
							{
								alignItems: "center"
							},
							children: [(0, m.jsx)(e7,
							{}), (0, m.jsx)("span",
							{
								className: "bold",
								children: L.Z.go_reply[o]
							})]
						}), (0, m.jsx)(eN.HR,
						{}), (0, m.jsx)(e4,
						{
							style:
							{
								flexDirection: "column"
							},
							children: t.map(function(e, t)
							{
								return n.replyGroup === e.replyGroup && e.content.split('\n').map(function(v, k){//@换行分割选择肢
									return n.replyGroup === e.replyGroup && (0, m.jsx)(eQ,
									{
										index: k,//@加入选择分支索引
										chat: e
									}, t)
								})//@换行分割选择肢
							})
						}), a || (0, m.jsx)(e9,
						{
							hidden: true,//@隐藏追加选择分支功能
							"data-html2canvas-ignore": "true",
							onClick: function()
							{
								h(!0)
							},
							children: (0, m.jsx)(c.xL,
							{
								icon: ico.r8p
							})
						}), (0, m.jsx)(es,
						{
							show: u,
							handleShow: h,
							isFirst: !1,
							sReply: n
						})]
					})
				},
				e3 = o.ZP.div.withConfig(
				{
					displayName: "ReplyBox__Container",
					componentId: "sc-dwjyi3-0"
				})(["", ";height:auto;padding:0.5rem;font-size:1.1rem;border:1px solid ", ";border-radius:1rem;color:", ";background-color:", `;background-image:url('${href}Images/Ui/Popup_Img_Deco_2.webp');background-repeat:no-repeat;background-position:right top;background-size:auto 10rem;line-height:1.5rem;`], function(e)
				//#背景
				{
					return e.theme.common.flexBox(
					{
						direction: "column"
					})
				}, function(e)
				{
					return e.theme.color.rgb221_210_216
				}, function(e)
				{
					return e.theme.color.rgb76_91_111
				}, function(e)
				{
					return e.theme.color.rgb225_237_240
				}),
				e4 = o.ZP.div.withConfig(
				{
					displayName: "ReplyBox__Flex",
					componentId: "sc-dwjyi3-1"
				})(["", ";height:auto;"], function(e)
				{
					return e.theme.common.flexBox(
					{
						justify: "flex-start"
					})
				}),
				e9 = (0, o.ZP)(c.hU).withConfig(
				{
					displayName: "ReplyBox__PlusButton",
					componentId: "sc-dwjyi3-2"
				})(["margin:0;padding-left:0.05rem;align-self:center;border:2px solid ", ";border-radius:50%;height:1.5rem;width:1.5rem;font-size:1rem;color:", ";&:hover{background-color:", ";}"], function(e)
				{
					return e.theme.color.rgb76_91_111
				}, function(e)
				{
					return e.theme.color.rgb76_91_111
				}, function(e)
				{
					return e.theme.color.rgb202_215_221
				}),
				e7 = o.ZP.div.withConfig(
				{
					displayName: "ReplyBox__Line",
					componentId: "sc-dwjyi3-3"
				})(["border-left:2px solid ", ";height:1.1rem;margin-right:0.3rem;"], function(e)
				{
					return e.theme.color.rgb39_153_228
				}),
				e6 = function(e)
				{
					var n = e.chat,
						t = e.index,
						o = e.handleShow,
						a = (0, i.T)(),
						l = (0, i.C)(function(e)
						{
							return e.makeChat.chats
						}),
						s = (0, i.C)(function(e)
						{
							return e.makeChat.sReplyGroup
						}),
						d = (0, i.C)(function(e)
						{
							return e.global.lang
						}),
						h = (0, i.C)(function(e)
						{
							return e.global.isScreenshot
						}),
						f = (0, r.useRef)(null);
					(0, r.useEffect)(function()
					{
						if(n.replyGroup === s)
						{
							var e;
							null === (e = f.current) || void 0 === e || e.scrollIntoView(!0), a((0, eo.ZZ)(-1))
						}
					}, [s, n, a]);
					var p = function()
					{
						if(0 !== t)
						{
							var e = l[t],
								r = l[t - 1];
							if("heart" !== r.type && (0, u.Y)(e.sCharacter, r.sCharacter) && e.replyDepth === r.replyDepth)
							{
								var o = [];
								l.forEach(function(e)
								{
									n === e ? o.push(
									{
										file: e.file,//@大概原作者忘加了
										time: e.time,//@大概原作者忘加了
										name: e.name,//@新增临时改名
										type: e.type,
										replyNo: e.replyNo,
										replyDepth: e.replyDepth,
										replyGroup: e.replyGroup,
										sCharacter: e.sCharacter,
										content: e.content,
										isFirst: !e.isFirst
									}) : o.push(e)
								}), a((0, eo.U_)(o))
							}
						}
					};
					return (0, m.jsx)(eN.uU,
					{
						ref: f,
						style: n.isFirst || n.sCharacter.no != (t-1 >= 0 ? l[t-1].sCharacter.no : 0) ?//#往上追加防止头像隐藏
						{} :
						{
							padding: "0.5rem 1rem 0 1rem"
						},
						children: 0 === n.sCharacter.no || "reply" === n.type || "info" === n.type ||"heart" === n.type ? (0, m.jsxs)(m.Fragment,
						{
							children: ["info" === n.type || (0, m.jsx)(eN.xu,
							{
								style:
								{
									marginRight: "chat" === n.type || "image" === n.type ? "1.5rem" : "0"
								}
							}), (0, m.jsxs)(e8,
							{
								children: ["reply" === n.type || h || (0, m.jsx)(ne,
								{
									"data-html2canvas-ignore": "true",
									onClick: function()
									{
										o(!0, n, "delete")
									},
									children: (0, m.jsx)(c.xL,
									{
										icon: ei.Yai
									})
								}), "chat" === n.type ? (0, m.jsxs)(m.Fragment,
								{
									children: [n.time && (0, m.jsx)(eN.i9,
									{
										style:
										{
											marginLeft: 0
										},
										children: n.time
									}), (0, m.jsx)(eN.LP,
									{
										onClick: function()
										{
											$jquery('.content').val(n.content)//@
											$jquery('.name').val(n.name)//@
											$jquery('.time').val(n.time)//@
											o(!0, n, n.type)
										},
										children: n.content///右侧对话
									}), (0, m.jsx)(eN.CJ,
									{})]
								}) : "image" === n.type ? [n.time && (0, m.jsx)(eN.i9,{style:{marginLeft:0},children:n.time}),(0, m.jsx)(eN.tG,
								//#[给图片加入时间戳
								{
									style:isJSON(n.content.split('#')[1]) ? JSON.parse(n.content.split('#')[1]) : {"max-width":n.content.indexOf("CharFace") > -1 && !n.file ? localStorage['mt-cfsize'] : ""},//@差分表情宽高百分比
									onClick: function()
									{
										$jquery('.content').val(n.content)//@
										$jquery('.name').val(n.name)//@
										$jquery('.time').val(n.time)//@
										o(!0, n, n.type)
									},
									src: n.file || n.content.split('#')[0]//#图片也支持样式了
								})] : "info" === n.type ? (0, m.jsx)(eN.vD,//@]
								{
									onClick: function()
									{
										$jquery('.content').val(n.content)//@
										$jquery('.name').val(n.name)//@
										$jquery('.time').val(n.time)//@
										o(!0, n, n.type)
									},//@给旁白添加新版修改功能
									children: n.content
								}) : "reply" === n.type ? (0, m.jsx)(eN.vD,
								{
									onClick: function()
									{
										$jquery('.content').val(n.content)//@
										$jquery('.name').val(n.name)//@
										$jquery('.time').val(n.time)//@
										o(!0, n, n.type)
									},
									children:(0, m.jsx)(e5,
									{
										chat: n
									})
								}) : "heart" === n.type ? (0, m.jsx)(eW,
								{
									click: function()
									{
										$jquery('.content').val(n.content)//@
										$jquery('.name').val(n.name)//@
										$jquery('.time').val(n.time)//@
										o(!0, n, n.type)
									},//@给羁绊添加新版修改功能
									character: (0, u.fY)(n.sCharacter.no, !0, d)
								}) : (0, m.jsx)(m.Fragment,
								{})]
							}),h||(0, m.jsx)("input",{"data-html2canvas-ignore":"true",type:"checkbox",index:t,class:"dels"})]//#添加复选框
						}) : (0, m.jsxs)(m.Fragment,
						{
							children: [(0, m.jsx)(eN.xu,
							{
								onClick: function()
								{
									p()
								},
								style:
								{
									cursor: "pointer"
								},
								children: (0, m.jsx)(eN.NZ,
								{
									style:
									{
										display: n.isFirst || n.sCharacter.no != (t-1 >= 0 ? l[t-1].sCharacter.no : 0) ? "block" : "none"//#往上追加防止头像隐藏
									},
									height: 252,
									width: 252,
									src: loadhead(n.sCharacter.no,n.sCharacter.index),//#聊天记录头像
									onError: function(e)
									{
										var n = e.currentTarget;
										(0, u.Mp)(n, "character")
									},
									alt: "profile"
								})
							}), (0, m.jsxs)(eN.Xp,
							{
								children: [(0, m.jsx)("span",
								{
									className: "bold",
									style: n.isFirst || n.sCharacter.no != (t-1 >= 0 ? l[t-1].sCharacter.no : 0) ?//#往上追加防止头像隐藏
									{
										height: "1.8rem",
										lineHeight: "1.5rem"
									} :
									{
										display: "none"
									},
									children: n.name && n.name !== '' ? n.name : (0, u.fY)(n.sCharacter.no, !0, d)//#新增临时名称
								}), (0, m.jsxs)("div",
								{
									style:
									{
										display: "flex"
									},
									children: ["chat" === n.type ? n.isFirst || n.sCharacter.no != (t-1 >= 0 ? l[t-1].sCharacter.no : 0) ? (0, m.jsxs)(m.Fragment,
									//#往上追加防止头像隐藏
									{
										children: [(0, m.jsx)(eN.zC,
										{
											style:isJSON(n.content.split('#')[1]) ? JSON.parse(n.content.split('#')[1]) : null,//@设置文字样式(#带头像)
											onClick: function()
											{
												$jquery('.content').val(n.content)//@
												$jquery('.name').val(n.name)//@
												$jquery('.time').val(n.time)//@
												o(!0, n, n.type)
											},
											children: n.content.split('#')[0]///对话
										})
										/*
										, n.time && (0, m.jsx)(eN.i9,
										{
											style:
											{
												marginRight: 0
											},
											children: n.time
										})
										*/
										]
									}) : (0, m.jsxs)(m.Fragment,
									{
										children: [(0, m.jsx)(eN.Dt,
										{
											style:isJSON(n.content.split('#')[1]) ? JSON.parse(n.content.split('#')[1]) : null,//@设置文字样式(#无头像)
											onClick: function()
											{
												$jquery('.content').val(n.content)//@
												$jquery('.name').val(n.name)//@
												$jquery('.time').val(n.time)//@
												o(!0, n, n.type)
											},
											children: n.content.split('#')[0]//#无头像对话
										})
										/*
										, n.time && (0, m.jsx)(eN.i9,
										{
											style:
											{
												marginRight: 0
											},
											children: n.time
										})
										*/
										]
									}) : (0, m.jsx)(eN.tG,
									{
										style:isJSON(n.content.split('#')[1]) ? JSON.parse(n.content.split('#')[1]) : {"max-width":n.content.indexOf("CharFace") > -1 && !n.file ? localStorage['mt-cfsize'] : ""},//@差分表情宽高百分比
										onClick: function()
										{
											$jquery('.content').val(n.content)//@
											$jquery('.name').val(n.name)//@
											$jquery('.time').val(n.time)//@
											o(!0, n, n.type)
										},
										src: n.file || n.content.split('#')[0]//#图片也支持样式了
									}), n.time && (0, m.jsx)(eN.i9,{style:{marginLeft:0},children:n.time}), h || (0, m.jsx)(ne,//#时间戳放在这
									{
										"data-html2canvas-ignore": "true",
										onClick: function()
										{
											o(!0, n, "delete")
										},
										children: (0, m.jsx)(c.xL,
										{
											icon: ei.Yai
										})
									})]
								})]
							}),h||(0, m.jsx)("input",{"data-html2canvas-ignore":"true",type:"checkbox",index:t,class:"dels"})]//#添加复选框
						})
					})
				},
				e8 = o.ZP.div.withConfig(
				{
					displayName: "Chat__Flex",
					componentId: "sc-5hhx0-0"
				})(["", ";height:auto;"], function(e)
				{
					return e.theme.common.flexBox(
					{
						justify: "flex-end",
						align: "flex-start"
					})
				}),
				ne = (0, o.ZP)(c.hU).withConfig(
				{
					displayName: "Chat__EditButton",
					componentId: "sc-5hhx0-1"
				})(["align-self:end;margin:0rem 0.5rem;color:", ";height:auto;width:1.2rem;flex-shrink:0;"], function(e)
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
							isFirst: !0,
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
								e.replyNo === o && (n = e.replyDepth, r = e.replyGroup)
							}), -1 === e ? a((0, eo.Z8)(n)) : a((0, eo.Z8)(0)), a((0, eo.ZZ)(r))
						};
					return (0, m.jsxs)("div",
					{
						style:
						{
							display: "flex",
							flexDirection: "column",
							width: "100%",
							height: "100%"
						},
						children: [(0, m.jsxs)(no,
						{
							style:
							{
								display: s ? "flex" : "none"
							},
							children: [(0, m.jsx)(ni,
							{
								onClick: function()
								{
									C(-1)
								},
								children: (0, m.jsx)(c.xL,
								{
									icon: ei.O24
								})
							}), t.map(function(e, n)
							{
								return e.replyNo === o && 0 !== e.replyNo && (0, m.jsxs)(nc,
								{
									className: "bold",
									children: ["Re: ", e.content]
								}, n)
							}), (0, m.jsx)(ni,
							{
								onClick: function()
								{
									C(0)
								},
								children: (0, m.jsx)(c.xL,
								{
									icon: ei.WA2
								})
							})]
						}),
						//*
						(0, m.jsxs)(eD,
						{
							className: "tools",
							style:
							{
								padding: "5px 10px",
								width: "auto",
								marginLeft: "auto"
							},
							children: [
								(0, m.jsx)(c.jl,
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
								}),
								(0, m.jsx)(c.jl,
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
								}),
								(0, m.jsx)(c.jl,
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
								}),
								(0, m.jsx)(c.jl,
								{
									style:{height: "auto","width": "auto"},
									id:'cutdata',
									children: (0, m.jsx)(W,
									{
										className: "bold",
										children: (0, m.jsx)(X,
										{
											style:{fontSize: "1.1rem"},
											children: '截取存档'
										})
									})
								}),
								(0, m.jsx)($,
								{
									className: "bold",
									onClick:function(){click('#tool-delete')},
									children: (0, m.jsx)(X,
									{
										style:{fontSize: "1.1rem"},
										children: L.Z['delete'][lang]
									})
								})
								]
						}),
						//*
						(0, m.jsx)(nt,
						{
							children: (0, m.jsx)(nr,
							{
								ref: n,
								children: t.map(function(e, n)
								{
									return e.replyDepth === o && !("reply" === e.type && !1 === e.isFirst) && (0, m.jsx)(e6,
									{
										index: n,
										handleShow: _,
										chat: e
									}, n)
								})
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
					return e.theme.color.rgb255_255_255
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
					return localStorage['mt-style'].split(' ')[0]//#自定义样式
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
						justify: "space-between"
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
				})(["margin:auto 1rem;overflow:hidden;word-break:break-all;white-space:pre-wrap;line-break:loose;"]),
				na = function()
				{
					var e = (0, i.C)(function(e)
						{
							return e.global.lang
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
								display: n.length > 0 ? "none" : "flex"
							},
							children: (0, m.jsx)("span",
							{
								style:
								{
									fontSize: "1.1rem"
								},
								children: L.Z.select_char[e]
							})
						}),
						//*
						(0, m.jsx)(ns,
						{
							style:
							{
								display: n.length > 0 ? "none" : "flex"
							},
							children: (0, m.jsx)("span",
							{
								style:
								{
									fontSize: "1.1rem"
								},
								children: '设置页面可以更改语言'
							})
						}), (0, m.jsx)(ns,
						{
							style:
							{
								display: n.length > 0 ? "none" : "flex"
							},
							children: (0, m.jsx)("span",
							{
								style:
								{
									fontSize: "1.1rem"
								},
								children: '钩选中消息后可以在其上方发送新消息'
							})
						}), (0, m.jsx)(ns,
						{
							style:
							{
								display: n.length > 0 ? "none" : "flex"
							},
							children: (0, m.jsx)("span",
							{
								style:
								{
									fontSize: "1.1rem"
								},
								children: '点击左下按钮可以隐藏或显示工具'
							})
						}), (0, m.jsx)(ns,
						{
							style:
							{
								display: n.length > 0 ? "none" : "flex"
							},
							children: (0, m.jsx)("span",
							{
								style:
								{
									fontSize: "1.1rem"
								},
								children: '手动截取指定长度存档可以用来生成高分辨率图片'
							})
						}),
						//*
						(0, m.jsx)(ns,
						{
							style:
							{
								display: n.length > 0 ? "flex" : "none"
							},
							children: (0, m.jsx)(nn,
							{
								scrollRef: t
							})
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
					return e.theme.color.rgb255_255_255
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
								children: localStorage['MoeTalk']//#自定义标题
							}), (0, m.jsx)("meta",
							{
								name: "description",
								content: "MolluTalk is a Blue Archive Fandom Site. (몰루톡/モルトーク)"
							}), (0, m.jsx)("meta",
							{
								name: "keywords",
								content: "몰루톡, MolluTalk, モルトーク"
							}), (0, m.jsx)("meta",
							{
								property: "og:title",
								content: "MolluTalk"
							}), (0, m.jsx)("meta",
							{
								property: "og:image",
								content: "https://mollutalk.com/ogImage.png"
							}), (0, m.jsx)("meta",
							{
								property: "og:site_name",
								content: "Make"
							}), (0, m.jsx)("meta",
							{
								property: "og:description",
								content: "MolluTalk is a Blue Archive Fandom Site. (몰루톡/モルトーク)"
							}), (0, m.jsx)("meta",
							{
								name: "twitter:title",
								content: "MolluTalk"
							}), (0, m.jsx)("meta",
							{
								name: "twitter:description",
								content: "MolluTalk is a Blue Archive Fandom Site. (몰루톡/モルトーク)"
							}), (0, m.jsx)("meta",
							{
								name: "twitter:image",
								content: "https://mollutalk.com/ogImage.png"
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
				})(["max-width:"+localStorage['mt-size']+";border:2px solid ", ";background-color:"+localStorage['mt-style'].split(' ')[1]+";padding:0.5rem;border-radius:10px;"], function(e)
				//#仿ClosureTalk把90%改成40%，可以考虑自定义
				{
					return localStorage['mt-style'].split(' ')[1]//#自定义样式
				}),
				s = r.ZP.span.withConfig(
				{
					displayName: "talk__TextBox",
					componentId: "sc-eq7cqw-4"
				})(["user-select:text;position:relative;color:white;width:fit-content;border-radius:10px;background:", ";border:1px solid ", ";white-space:pre-wrap;overflow-wrap:break-word;word-break:break-all;word-wrap:break-all;line-break:loose;font-size:1.2rem;padding:0.6rem;line-height:141%;::after{content:'';position:absolute;left:-0.5rem;top:0.6rem;border-top:0.3rem solid transparent;border-right:0.5rem solid ", ";border-bottom:0.3rem solid transparent;}"], function(e)
				//#1.7rem;改为141%
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
				})(["user-select:text;position:relative;color:", ";width:100%;border-radius:10px;background:", ";text-align:center;white-space:pre-wrap;overflow-wrap:break-word;word-break:break-all;word-wrap:break-all;line-break:loose;font-size:1rem;padding:0.2rem 1rem;line-height:1.5rem;"], function(e)
				{
					return e.theme.color.rgb69_78_89
				}, function(e)
				{
					return localStorage['mt-style'].split(' ')[2]//#自定义样式
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