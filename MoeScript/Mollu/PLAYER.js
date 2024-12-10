(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
	[333],
	{
		3162: function(e, t, n)
		{
			var r, o;
			void 0 !== (r = "function" == typeof(o = function()
			{
				"use strict";

				function t(e, t, n)
				{
					var r = new XMLHttpRequest;
					r.open("GET", e), r.responseType = "blob", r.onload = function()
					{
						c(r.response, t, n)
					}, r.onerror = function()
					{
						console.error("could not download file")
					}, r.send()
				}

				function r(e)
				{
					var t = new XMLHttpRequest;
					t.open("HEAD", e, !1);
					try
					{
						t.send()
					}
					catch (e)
					{}
					return 200 <= t.status && 299 >= t.status
				}

				function o(e)
				{
					try
					{
						e.dispatchEvent(new MouseEvent("click"))
					}
					catch (n)
					{
						var t = document.createEvent("MouseEvents");
						t.initMouseEvent("click", !0, !0, window, 0, 0, 0, 80, 20, !1, !1, !1, !1, 0, null), e.dispatchEvent(t)
					}
				}
				var i = "object" == typeof window && window.window === window ? window : "object" == typeof self && self.self === self ? self : "object" == typeof n.g && n.g.global === n.g ? n.g : void 0,
					a = i.navigator && /Macintosh/.test(navigator.userAgent) && /AppleWebKit/.test(navigator.userAgent) && !/Safari/.test(navigator.userAgent),
					c = i.saveAs || ("object" != typeof window || window !== i ? function() {} : "download" in HTMLAnchorElement.prototype && !a ? function(e, n, a)
					{
						var c = i.URL || i.webkitURL,
							l = document.createElement("a");
						n = n || e.name || "download", l.download = n, l.rel = "noopener", "string" == typeof e ? (l.href = e, l.origin === location.origin ? o(l) : r(l.href) ? t(e, n, a) : o(l, l.target = "_blank")) : (l.href = c.createObjectURL(e), setTimeout(function()
						{
							c.revokeObjectURL(l.href)
						}, 4e4), setTimeout(function()
						{
							o(l)
						}, 0))
					} : "msSaveOrOpenBlob" in navigator ? function(e, n, i)
					{
						if(n = n || e.name || "download", "string" != typeof e)
						{
							var a;
							navigator.msSaveOrOpenBlob((void 0 === (a = i) ? a = {
								autoBom: !1
							} : "object" != typeof a && (console.warn("Deprecated: Expected third argument to be a object"), a = {
								autoBom: !a
							}), a.autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type) ? new Blob(["\uFEFF", e],
							{
								type: e.type
							}) : e), n)
						}
						else if(r(e)) t(e, n, i);
						else
						{
							var c = document.createElement("a");
							c.href = e, c.target = "_blank", setTimeout(function()
							{
								o(c)
							})
						}
					} : function(e, n, r, o)
					{
						if((o = o || open("", "_blank")) && (o.document.title = o.document.body.innerText = "downloading..."), "string" == typeof e) return t(e, n, r);
						var c = "application/octet-stream" === e.type,
							l = /constructor/i.test(i.HTMLElement) || i.safari,
							s = /CriOS\/[\d]+/.test(navigator.userAgent);
						if((s || c && l || a) && "undefined" != typeof FileReader)
						{
							var d = new FileReader;
							d.onloadend = function()
							{
								var e = d.result;
								e = s ? e : e.replace(/^data:[^;]*;/, "data:attachment/file;"), o ? o.location.href = e : location = e, o = null
							}, d.readAsDataURL(e)
						}
						else
						{
							var h = i.URL || i.webkitURL,
								u = h.createObjectURL(e);
							o ? o.location = u : location.href = u, o = null, setTimeout(function()
							{
								h.revokeObjectURL(u)
							}, 4e4)
						}
					});
				i.saveAs = c.saveAs = c, e.exports = c
			}) ? o.apply(t, []) : o) && (e.exports = r)
		},
		5615: function(e, t, n)
		{
			"use strict";
			var r = n(6150),
				o = n(7294),
				i = n(9521),
				a = n(5893);
			t.Z = function(e)
			{
				var t = e.childrens,
					n = (0, o.useState)(0),
					i = n[0],
					d = n[1],
					h = (0, r.C)(function(e)
					{
						return e.global.isRight
					}),
					u = (0, r.C)(function(e)
					{
						return e.global.isMobile
					});
				return (0, o.useEffect)(function()
				{
					d(h ? 1 : 0)
				}, [h]), (0, a.jsx)(c,
				{
					children: (0, a.jsx)(l,
					{
						children: t.map(function(e, t)
						{
							return (0, a.jsx)(s,
							{
								style:
								{
									width: u && i !== t ? "0" : "100%"
								},
								children: e
							}, t)
						})
					})
				})
			};
			var c = i.ZP.div.withConfig(
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
		330: function(e, t, n)
		{
			"use strict";
			n.d(t,
			{
				Z: function()
				{
					return N
				}
			});
			var r = n(29),
				o = n(7794),
				i = n.n(o),
				a = n(5733),
				c = n.n(a),
				l = n(7294),
				s = n(3162),
				d = n(1120),
				h = n.n(d),
				u = n(6150),
				m = n(5781),
				f = n(4701),
				p = n(4212),
				g = n(3380),
				x = n(8586),
				b = n(9521),
				_ = n(1563),
				y = n(9417),
				w = n(4288),
				C = n(7451),
				v = n(4685),
				j = n(6453),
				k = n(5893),
				eo = n(5740),
				P = function(e)
				{
					var t = e.show,
						n = e.header,
						r = e.handleShow,
						o = e.handleFileUpload,
						i = (0, u.C)(function(e)
						{
							return e.global.lang
						});
					return (0, k.jsx)(v.Xf,
					{
						className: t ? "visible medium" : "medium",
						onDoubleClick: function()
						{
							r()
						},
						children: (0, k.jsxs)(v.F0,
						{
							onDoubleClick: function(e)
							{
								return e.stopPropagation(), !1
							},
							children: [(0, k.jsxs)(v.h4,
							{
								children: [(0, k.jsx)(v.Dx,
								{
									className: "bold",
									children: f.Z.sharedFile[i]
								}), (0, k.jsx)(v.ec,
								{
									onClick: function()
									{
										r()
									},
									children: (0, k.jsx)(_.j4,
									{})
								})]
							}), (0, k.jsxs)(v.$0,
							{
								style:
								{
									lineHeight: "1.5rem"
								},
								children: [(0, k.jsx)("span",
								{
									children: f.Z.up_comment1[i]
								}), (0, k.jsxs)("div",
								{
									style:
									{
										display: "flex",
										flexDirection: "column",
										margin: "1rem 0"
									},
									children: [(0, k.jsxs)(j.Dr,
									{
										children: [f.Z.title[i], " : ", n.title]
									}), (0, k.jsxs)(j.Dr,
									{
										children: [f.Z.writer[i], " : ", n.nickname]
									}), (0, k.jsxs)(j.Dr,
									{
										children: [f.Z.date[i], " : ", n.date]
									})]
								}), (0, k.jsxs)(j.Dr,
								{
									children: ["※", f.Z.up_comment2[i]]
								}), (0, k.jsxs)(j.Dr,
								{
									children: ["※", f.Z.deleteTalk_comment[i]]
								}), (0, k.jsxs)(v.$_,
								{
									children: [(0, k.jsx)(v.Lw,
									{
										className: "bold",
										onClick: function()
										{
											r()
										},
										children: f.Z.cancel[i]
									}), (0, k.jsx)(v.AZ,
									{
										className: "bold",
										onClick: function()
										{
											o()
										},
										children: f.Z.confirm[i]
									})]
								})]
							})]
						})
					})
				},
				N = function(e)
				{
					var t, n = e.scrollRef,
						o = (0, u.C)(function(e)
						{
							return e.global.isMobile
						}),
						a = (0, u.C)(function(e)
						{
							return e.global.isRight
						}),
						d = (0, u.C)(function(e)
						{
							return e.global.isLoading
						}),
						b = (0, u.C)(function(e)
						{
							return e.global.lang
						}),
						_ = (0, u.C)(function(e)
						{
							return e.playChat.chats
						}),
						v = (0, u.C)(function(e)
						{
							return e.playChat.header
						}),
						j = (0, u.C)(function(e)
						{
							return e.playChat.board_no
						}),
						N = (0, u.C)(function(e)
						{
							return e.playChat.chatSpeed
						}),
						S = (0, l.useRef)(null),
						B = (0, l.useState)(!1),
						A = B[0],
						D = B[1],
						M = (0, l.useState)(!1),
						R = M[0],
						q = M[1],
						F = (0, l.useState)({
							INFO: {
								title: "",
								nickname: "",
								date: "",
							},
							CHAT: []
						}),
						z = F[0],
						G = F[1],
						L = (0, u.T)(),
						O = function(e)
						{
							if(null !== e.currentTarget.files)
							{
								var t = new FileReader,
									n = e.currentTarget.files[0];
								t.onloadend = function()
								{
									"string" == typeof t.result && ("[" === t.result[0] || "{" === t.result[0]) ? (G(loaddata(t.result,'play')), q(!0)) : L((0, m.Y2)(//#编译存档
									{
										isAlert: !0,
										title: f.Z.error[b],
										ment: f.Z.no_support[b]
									}))
								}, c().loadAsync(e.currentTarget.files[0]).then(function(e)
								{
									e.forEach(function(e, n)
									{
										n.dir || n.async("blob").then(function(e)
										{
											t.readAsText(e)
										})
									})
								}, function(e)
								{
									n ? t.readAsText(n) : L((0, m.Y2)(
									{
										isAlert: !0,
										title: f.Z.error[b],
										ment: f.Z.no_support[b]
									}))
								})
							}
						},
						Y = function()
						{
							var e = {
								nowChats: [],
								replyDepth: 0,
								chats: [],
								chatSpeed: (0, g.zP)(),
								header:
								{},
								board_no: j
							};
							L((0, p.Fe)(e)), D(!1), setTimeout(function()
							{
								var e = {
									nowChats: [],
									replyDepth: 0,
									chats: _,
									chatSpeed: (0, g.zP)(),
									header: v,
									board_no: j
								};
								L((0, p.Fe)(e))
							}, 1e3)
						},
						H = (t = (0, r.Z)(i().mark(function e()
						{
							var t, r, o;
							return i().wrap(function(e)
							{
								for(;;) switch (e.prev = e.next)
								{
									case 0:
										if(L((0, x.jh)(!0)), null !== (t = n.current))
										{
											e.next = 4;
											break
										}
										return e.abrupt("return");
									case 4:
										r = function(e, t)
										{
											e.documentElement.style.fontSize = "16px", t.style.width = "500px";
											var n = f.Z.title[b] + " : " + v.title,
												r = f.Z.writer[b] + " : " + v.nickname,
												o = (0, g.Jx)(
												{
													watermark: !0,
													title: !0,
													writer: !0
												}, n, r);
											t.prepend(o)
										}, o = parseInt(localStorage.getItem("imageQaulity") || "1"), h()(t,
										{
											logging: !1,
											allowTaint: !0,
											useCORS: !0,
											width: 500,
											windowWidth: 500,
											scale: 1 === o ? o + .1 : o,
											onclone: r
										}).then(function(e)
										{
											e.toBlob(function(e)
											{
												e && (0, s.saveAs)(e, "MoeTalk_" + v.title + ".png")
											})
										}).catch(function()
										{
											L((0, m.Y2)(
											{
												isAlert: !0,
												title: f.Z.error[b],
												ment: f.Z.error_ment[b]
											}))
										}).finally(function()
										{
											L((0, x.jh)(!1))
										});
									case 7:
									case "end":
										return e.stop()
								}
							}, e)
						})), function()
						{
							return t.apply(this, arguments)
						});
						L((0, eo.U_)(chats))
					return (0, k.jsxs)(Z,
					{
						children: [(0, k.jsxs)(E,
						{
							style:
							{
								justifyContent: "space-between",
								width: "100%",
								position: "relative"
							},
							children: [(0, k.jsxs)(E,
							{
								style:
								{
									margin: "auto 1rem"
								},
								children: [(0, k.jsx)("input",
								{
									type: "file",
									ref: S,
									style:
									{
										display: "none"
									},
									accept: mt_settings['图片存档'] ? 'image/png' : 'application/json',
									onChange: function(e)
									{
										let json = {
											nowChats: [],
											replyDepth: 0,
											chats: [],
											chatSpeed: (0, g.zP)(),
											header: {},
											board_no: 0
										}
										L((0, p.Fe)(json))
										L((0, x.Cz)(!0))
										nowChapter[0] = ''
										nowChapter[1] = {}
										nowChapter[1].chapter = []
										$$('.nowChapter').text('')
										O(e)
									}
								}), (0, k.jsx)(T,
								{
									style: o && a ?
									{
										display: "none"
									} :
									{},
									title: "MakingFile Upload",
									onClick: function()
									{
										var e;
										null === (e = S.current) || void 0 === e || e.click()
									},
									children: (0, k.jsx)(I,
									{
										icon: y.cf$
									})
								}), (0, k.jsx)(T,
								{
									style: o && a ?
									{} :
									{
										display: "none"
									},
									onClick: function()
									{
										L((0, x.Cz)(!1))
									},
									children: (0, k.jsx)(I,
									{
										icon: y.EyR
									})
								}),
								//*速度设置按钮
								(0, k.jsx)(T,
								{
									title: "速度设置按钮",
									onClick: function()
									{
										if(!localStorage['chatSpeed'])localStorage['chatSpeed'] = 1;
										let chatSpeed = prompt("请输入消息播放速度（纯数字）：",localStorage['chatSpeed']);
										if(chatSpeed)localStorage['chatSpeed'] = chatSpeed
									},
									children: (0, k.jsx)('img',
									{
										className: "SideBar__Img-sc-v5z5y3-2 hWDtZg",
										style:{width: "75%",height: "75%"},
										src: href+"Images/Ui/setting.webp"
									})
								})
								//*速度设置按钮
								]
							}), (0, k.jsx)('span',
							{
								style:
								{
									//fontSize: '1.5rem'
								},
								className: 'nowChapter',
								children: ''
							}), (0, k.jsxs)(E,
							{
								style:
								{
									margin: "auto 1rem"
								},
								children: [(0, k.jsx)(T,
								{
									style: o && !a ?
									{} :
									{
										display: "none"
									},
									onClick: function()
									{
										L((0, x.Cz)(!0))
									},
									children: (0, k.jsx)(I,
									{
										icon: y.yOZ
									})
								}), /*(0, k.jsx)(T,
								{
									style: o && !a ?
									{
										display: "none"
									} :
									{
										marginRight: "1rem"
									},
									title: "Image Download",
									disabled: _.length < 1 || d,
									onClick: function()
									{
										H()
									},
									children: (0, k.jsx)(I,
									{
										icon: w.Oi0
									})
								}),*/ (0, k.jsx)(T,
								{
									style: o && !a ?
									{
										display: "none"
									} :
									{
										marginRight: "1rem"
									},
									title: "skip",
									disabled: _.length < 1,
									onClick: function()
									{
										_.length < 1 || 100 === N || L((0, p.eS)(100))
									},
									children: (0, k.jsx)(I,
									{
										style:
										{
											marginLeft: "0.7rem"
										},
										icon: y.irl
									})
								}), (0, k.jsx)(T,
								{
									style: o && !a ?
									{
										display: "none"
									} :
									{},
									title: "reset",
									disabled: _.length < 1,
									onClick: function()
									{
										D(!0)
									},
									children: (0, k.jsx)(I,
									{
										style:
										{
											marginLeft: "0.7rem"
										},
										icon: y.T80
									})
								})]
							})]
						}), (0, k.jsx)(C.Z,
						{
							show: A,
							handleShow: function()
							{
								D(!1)
							},
							type: "reset",
							handleTalk: function()
							{
								Y()
							}
						}), (0, k.jsx)(P,
						{
							show: R,
							handleShow: function()
							{
								q(!1)
							},
							header: z.INFO,
							handleFileUpload: function()
							{
								var e = {
									nowChats: [],
									replyDepth: 0,
									chats: [],
									chatSpeed: 1,
									header:
									{},
									board_no: 0
								};
								L((0, p.Fe)(e)), setTimeout(function()
								{
									e = {
										nowChats: [],
										replyDepth: 0,
										chats: z.CHAT,
										chatSpeed: (0, g.zP)(),
										header: z.INFO,
										board_no: 0
									}, L((0, p.Fe)(e)), q(!1), L((0, x.Cz)(!0))
								}, 1e3)
							}
						})]
					})
				},
				Z = b.ZP.div.withConfig(
				{
					displayName: "Footer__Container",
					componentId: "sc-188q0i6-0"
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
				E = b.ZP.div.withConfig(
				{
					displayName: "Footer__Flex",
					componentId: "sc-188q0i6-1"
				})(["", ";position:relative;width:auto;"], function(e)
				{
					return e.theme.common.flexBox(
					{})
				}),
				T = (0, b.ZP)(_.hU).withConfig(
				{
					displayName: "Footer__Circlebutton",
					componentId: "sc-188q0i6-2"
				})(["border:2px solid white;border-radius:50%;height:3rem;width:3rem;display:flex;align-items:center;justify-content:center;&:hover{background-color:", ";}"], function(e)
				{
					return e.theme.color.rgb61_75_92
				}),
				I = (0, b.ZP)(_.xL).withConfig(
				{
					displayName: "Footer__StyledIcon2",
					componentId: "sc-188q0i6-3"
				})(["height:1.5rem;width :1.5rem;color:", ";"], function(e)
				{
					return e.theme.color.rgb255_255_255
				})
		},
		939: function(e, t, n)
		{
			"use strict";
			n.d(t,
			{
				Z: function()
				{
					return S
				}
			});
			var r = n(4701),
				o = n(6150),
				i = n(4212),
				a = n(7294),
				c = n(9521),
				l = n(3380),
				s = n(83),
				d = n(3420),
				h = n(8681),
				u = n(8586),
				m = n(5893),
				f = function()
				{
					var e = (0, o.T)(),
						t = (0, o.C)(function(e)
						{
							return e.global.lang
						}),
						n = function()
						{
							var t = {
								nowChats: [],
								replyDepth: 0,
								chats: [],
								chatSpeed: (0, l.zP)(),
								header:
								{},
								board_no: 0
							};
							e((0, i.Fe)(t)), e((0, u.Cz)(!1))
						};
					return (0, m.jsxs)(p,
					{
						className: "image-ignore",
						"data-html2canvas-ignore": "true",
						children: [(0, m.jsxs)(g,
						{
							style:
							{
								alignItems: "center"
							},
							children: [(0, m.jsx)(x,
							{}), (0, m.jsx)("span",
							{
								className: "bold",
								children: r.Z.msg_end[t]
							})]
						}), (0, m.jsx)(s.HR,
						{}), (0, m.jsx)(s.g4,
						{
							className: "medium",
							onClick: function()
							{
								n()
								let nextindex = nowChapter[0]+1
								let chapterlist = nowChapter[1].chapter
								if(chapterlist[nextindex])
								{
									//if(isNaN(nextindex))return;
									INIT_loading()
									XHR(`${href}${LibraryURL}/${nowChapter[1].authorid}/${nowChapter[1].bookid}/${chapterlist[nextindex]}.json`,function(data)
									{
										data = loaddata(data,'palyer')
										nowChapter[0] = nextindex
										let playChat = 
										{
											nowChats: [],
											replyDepth: 0,
											chats: data.CHAT,
											chatSpeed: (0, l.zP)(),
											header: data.INFO,
											board_no: 0
										}
										// m((0, S.Cz)(!0))
										INIT_loading()
										e((0, i.Fe)(playChat))
										e((0, u.Cz)(!0))
										$$('.nowChapter').text(`${nowChapter[1].name}_${nextindex}：${nowChapter[1].chapter[nextindex]}`)
									})
								}
								else
								{
									$$('.nowChapter').text('')
								}
							},
							children: nowChapter[1].chapter[nowChapter[0]+1] ? '点击前往下一章' : r.Z.end[t]
						})]
					})
				},
				p = c.ZP.div.withConfig(
				{
					displayName: "EndBox__Container",
					componentId: "sc-1bnhokl-0"
				})(["", ";height:auto;padding:0.5rem;font-size:1.1rem;border:1px solid ", ";border-radius:1rem;color:", ";background-color:", `;background-image:url('${href}Images/Ui/Popup_Img_Deco_2.webp');background-repeat:no-repeat;background-position:right top;background-size:auto 10rem;line-height:1.5rem;`], function(e)
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
				g = c.ZP.div.withConfig(
				{
					displayName: "EndBox__Flex",
					componentId: "sc-1bnhokl-1"
				})(["", ";height:auto;"], function(e)
				{
					return e.theme.common.flexBox(
					{
						justify: "flex-start"
					})
				}),
				x = c.ZP.div.withConfig(
				{
					displayName: "EndBox__Line",
					componentId: "sc-1bnhokl-2"
				})(["border-left:2px solid ", ";height:1.1rem;margin-right:0.3rem;"], function(e)
				{
					return e.theme.color.rgb39_153_228
				}),
				b = function(e)
				{
					var t = e.chat,
						style = e.style,
						n = (0, o.T)(),
						c = (0, o.C)(function(e)
						{
							return e.playChat
						}),
						d = (0, o.C)(function(e)
						{
							return e.global.lang
						}),
						u = (0, a.useState)(!1),
						f = u[0],
						p = u[1],
						g = function()
						{
							var e = c.chats.indexOf(t),
								r = c.chats[e + 1];
							if(r && r.replyDepth === c.replyDepth) "{end}" === r.content.trim() && r.replyDepth === t.replyDepth ? n((0, i.e$)(
							{
								chat: h.Nl
							})) : n((0, i.e$)(
							{
								chat: r
							}));
							else
							{
								for(var o = -1, a = e + 1; a < c.chats.length; a++)
								{
									if(c.chats[a].replyDepth === c.replyDepth)
									{
										o = a;
										break
									}
									if(-1 === o)
									{
										var s = c.chats.filter(function(e)
										{
											return e.replyNo === t.replyDepth && "reply" === e.type
										});
										if(s.length > 0)
										{
											var d = (0, l.G_)(c.chats, s[0]);
											if(null !== d && "{end}" !== d.content.trim())
											{
												n((0, i.e$)(
												{
													chat: d,
													depth: d.replyDepth
												}));
												return
											}
										}
										n((0, i.e$)(
										{
											chat: h.Nl
										}))
									}
									else "{end}" !== c.chats[o].content.trim() && n((0, i.e$)({chat: c.chats[o]}))
								}
							}
						};
					return (0, m.jsxs)(_,
					{
						children: [(0, m.jsxs)(y,
						{
							style:
							{
								alignItems: "center"
							},
							children: [(0, m.jsx)(w,
							{}), (0, m.jsx)("span",
							{
								className: "bold",
								children: r.Z.relationship_event[d]
							})]
						}), (0, m.jsx)(s.HR,
						{}), (0, m.jsx)(s._x,
						{
							className: "medium",
							style:style,//@
							disabled: f,
							onClick: function()
							{
								g(), p(!0)
							},
							children: t.content || ((t.name || loadname(t.sCharacter.no,t.sCharacter.index))+r.Z.go_relationship_event[d])
						})]
					})
				},
				_ = c.ZP.div.withConfig(
				{
					displayName: "HeartBox__Container",
					componentId: "sc-1gwqj71-0"
				})(["", ";padding:0.5rem;font-size:1.1rem;height:auto;border:1px solid ", ";border-radius:1rem;color:", ";background-color:", `;background-image:url('${href}Images/Ui/Favor_Schedule_Deco.webp');background-repeat:no-repeat;background-position:right;background-size:auto 100%;line-height:1.5rem;`], function(e)
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
				y = c.ZP.div.withConfig(
				{
					displayName: "HeartBox__Flex",
					componentId: "sc-1gwqj71-1"
				})(["", ";height:auto;"], function(e)
				{
					return e.theme.common.flexBox(
					{
						justify: "flex-start"
					})
				}),
				w = c.ZP.div.withConfig(
				{
					displayName: "HeartBox__Border",
					componentId: "sc-1gwqj71-2"
				})(["border-left:2px solid ", ";height:1.1rem;margin-right:0.3rem;"], function(e)
				{
					return e.theme.color.rgb252_142_155
				}),
				C = function(e)
				{
					var t = e.chat,
						index = e.index,//@
						n = e.handleContent,
						r = (0, o.T)(),
						a = (0, o.C)(function(e)
						{
							return e.playChat.chats
						}),
						c = (0, o.C)(function(e)
						{
							return e.global.gameName
						}),
						d = function()
						{
							//console.log(h)
							//console.log(a)
							var e = a.filter(function(e)
							{
								return e.replyDepth === t.content.split('\n')[index]//
							});
							//console.log(e)
							if(0 === e.length)
							{
								var n = (0, l.G_)(a, t);
								//console.log(n)
								if(null !== n && "{end}" !== n.content.trim())
								{
									r((0, i.e$)(
									{
										chat: n,
										depth: n.replyDepth
									}));
									return
								}
								r((0, i.e$)(
								{
									chat: h.Nl
								}))
							}
							else "{end}" === e[0].content.trim() ? r((0, i.e$)(
							{
								chat: h.Nl
							})) : r((0, i.e$)(
							{
								chat: e[0],
								depth: t.content.split('\n')[index]//
							}))
						};
					return (0, m.jsx)(v,
					{
						children: (0, m.jsx)(s.g4,
						{
							onClick: function()
							{
								d(), n(t.content.split('\n')[index])//
							},
							children: (0, m.jsx)(j,
							{
								className: "bold",
								children: t.content.replaceAll("{name}", c).split('\n')[index]//
							})
						})
					})
				},
				v = c.ZP.div.withConfig(
				{
					displayName: "ReplyButtonBox__Container",
					componentId: "sc-17coljc-0"
				})(["", ";margin-bottom:0.5rem;height:auto;"], function(e)
				{
					return e.theme.common.flexBox(
					{})
				}),
				j = c.ZP.span.withConfig(
				{
					displayName: "ReplyButtonBox__Span",
					componentId: "sc-17coljc-1"
				})(["overflow:hidden;word-break:break-word;word-wrap:break-word;white-space:pre-wrap;line-break:loose;"]),
				k = function(e)
				{
					var t = e.chat,
						n = (0, o.C)(function(e)
						{
							return e.playChat
						}),
						c = (0, o.C)(function(e)
						{
							return e.global.gameName
						}),
						l2 = (0, a.useState)(!1),//
						d = l2[0],
						h = l2[1],
						u = (0, a.useState)(""),
						f = u[0],
						p = u[1],
						rr = (0, o.T)(),
						aa = n.chats,
						dd = function(v)
						{
							let end = {content:"끝",isFirst:true,replyDepth:0,sCharacter:{no:0,index:1},type:"end"}
							var e = aa.filter(function(e)
							{
								return e.replyDepth === v
							});
							if(0 === e.length)
							{
								var n = (0, l.G_)(aa, t);
								if(null !== n && "{end}" !== n.content.trim())
								{
									rr((0, i.e$)(
									{
										chat: n,
										depth: n.replyDepth
									}));
									return
								}
								rr((0, i.e$)(
								{
									chat: end
								}))
							}
							else "{end}" === e[0].content.trim() ? rr((0, i.e$)(
							{
								chat: end
							})) : rr((0, i.e$)(
							{
								chat: e[0],
								depth: v
							}))
						};
					let isFirst = isfirst(n.chats.indexOf(t),n.chats,'play')
					let style = mt_settings['文字样式'][t.type] ? mt_settings['文字样式'][t.type] : {}
					delete style.textAlign
					style = {...style,...{}}//防止连带修改设置属性
					return [(0, m.jsxs)(m.Fragment,
					{
						children: d ? (0, m.jsxs)(m.Fragment,
						{
							children: (0, m.jsxs)('div',
							{//整体图文消息
								className: '聊天',
								children: [!t.isCenter && !t.isRight ? (0, m.jsx)('div',
								{//左侧头像框
									className: '头像框',
									style: t.sCharacter.no != 0 ? 
									{
										pointerEvents: 'none',
										minWidth: t.heads && isFirst ? "auto" : "5rem",
										paddingRight: t.heads && isFirst ? "1rem" : "auto",
										flexDirection: t.heads ? t.heads.direction : ""
									} : {marginRight: '1.5rem'},
									children: isFirst && t.sCharacter.no != 0 ? [(0, m.jsx)('img',
									{//左侧头像
										className: '头像',
										style: {zIndex: t.heads ? t.heads.list.length : ''},
										src: loadhead(t.sCharacter.no,t.sCharacter.index),
										onError: function(e)
										{
											e.currentTarget.src = href+'Images/Ui/error.webp';
										},
										alt: t.sCharacter.index
									}), t.heads ? t.heads.list.map(function(index,k)
									{
										return (0, m.jsx)('img',
										{//左侧头像
											className: '头像',
											src: loadhead('LIST',index),
											style: 
											{
												zIndex: t.heads.list.length-k-1,
												marginTop: t.heads.direction === 'column' ? t.heads.margin ? t.heads.margin : "-1.5rem" : '',
												marginLeft: t.heads.direction === 'row' ? t.heads.margin ? t.heads.margin : "-1.5rem" : ''
											},
											onError: function(e)
											{
												e.currentTarget.src = href+'Images/Ui/error.webp';
											}
										})
									}) : ''] : ''
								}) : '', (0, m.jsxs)("div",
								{//图文消息
									className: "对话",
									style: 
									{
										alignItems: t.isCenter ? 'center' : t.isRight || t.sCharacter.no == 0 ? 'flex-end' : 'flex-start',
										height: t.heads && t.heads.fullHeight ? '100%' : ''
									},
									children: [!t.isCenter && isFirst && t.sCharacter.no != 0 ? (0, m.jsx)("span",
									{//人物名称
										className: "名称 bold",
										children: t.name || loadname(t.sCharacter.no,t.sCharacter.index)
									}) : '' , (0, m.jsxs)("div",
									{//消息内容
										style:
										{
											display: "flex",
											height: "100%",
											justifyContent: t.isCenter ? 'center' : t.isRight || t.sCharacter.no == 0 ? 'flex-end' : '',
										},
										children: [t.time ? (0, m.jsx)(eN.i9,
										{//左侧时间戳
											className: '时间戳',
											hidden: (!t.time || t.sCharacter.no != 0) && !t.isRight,
											children: t.time
										}) : '', [(0, m.jsx)('span',
										{//文本消息
											className: (t.sCharacter.no == 0 ? '文本' : !t.isRight && isFirst ? '文本 左角' : '文本'),
											style: t.isRight || t.sCharacter.no == 0 ? {...{background: 'rgb(74, 138, 202)',border: '1px solid rgb(74, 138, 202)'},...style} : style,
											children: f
										}), (t.isRight && isFirst) || t.sCharacter.no == 0 ? (0, m.jsx)(s.CJ,{}) : '' ], t.time ? (0, m.jsx)(s.i9,
										{//右侧时间戳
											className: '时间戳',
											hidden: !t.time || t.sCharacter.no == 0 || t.isRight,
											children: t.time
										}) : '']
									})]
								}), !t.isCenter && t.isRight && t.sCharacter.no != 0 ? (0, m.jsx)('div',
								{//右侧头像框
									className: '头像框',
									style:
									{
										pointerEvents: 'none',
										justifyContent:'flex-end',
										minWidth: t.heads && isFirst ? "auto" : "5rem",
										paddingLeft: t.heads && isFirst ? "1rem" : "auto",
										flexDirection: t.heads ? t.heads.direction : ""
									},
									children: isFirst && t.sCharacter.no != 0 ? [(0, m.jsx)('img',
									{
										className: '头像',
										src: loadhead(t.sCharacter.no,t.sCharacter.index),
										onError: function(e)
										{
											e.currentTarget.src = href+'Images/Ui/error.webp';
										},
										alt: t.sCharacter.index
									}), t.heads ? t.heads.list.map(function(index,k)
									{
										return (0, m.jsx)('img',
										{//右侧头像
											className: '头像',
											src: loadhead('LIST',index),
											style: 
											{
												zIndex: t.heads.list.length-k-1,
												marginTop: t.heads.direction === 'column' ? "-1.5rem" : '',
												marginLeft: t.heads.direction === 'row' ? "-1.5rem" : ''
											},
											onError: function(e)
											{
												e.currentTarget.src = href+'Images/Ui/error.webp';
											}
										})
									}) : ''] : ''
								}) : '']
							})
						}) : (0, m.jsxs)(P,
						{//选择肢
							children: [(0, m.jsxs)(N,
							{
								style:
								{
									alignItems: "center"
								},
								children: [(0, m.jsx)(Z,
								{}), (0, m.jsx)("span",
								{
									className: "bold",
									children: r.Z.go_reply[mtlang]
								})]
							}), (0, m.jsx)(s.HR,
							{}), t.content.split('\n').map(function(v,k)
							{
								return (0, m.jsx)('div',
								{
									className: '选择肢 跳转',
									style: style,
									children: v,
									onClick: function()
									{
										dd(v), p(v), h(!0)
									}
								})
							})]
						})
					})]
				},
				P = c.ZP.div.withConfig(
				{
					displayName: "ReplyBox__Container",
					componentId: "sc-14pasys-0"
				})(["", ";height:auto;padding:0.5rem;font-size:1.1rem;border:1px solid ", ";border-radius:1rem;color:", ";background-color:", `;background-image:url('${href}Images/Ui/Popup_Img_Deco_2.webp');background-repeat:no-repeat;background-position:right top;background-size:auto 10rem;line-height:1.5rem;`], function(e)
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
				N = c.ZP.div.withConfig(
				{
					displayName: "ReplyBox__Flex",
					componentId: "sc-14pasys-1"
				})(["", ";height:auto;"], function(e)
				{
					return e.theme.common.flexBox(
					{
						justify: "flex-start"
					})
				}),
				Z = c.ZP.div.withConfig(
				{
					displayName: "ReplyBox__Line",
					componentId: "sc-14pasys-2"
				})(["border-left:2px solid ", ";height:1.1rem;margin-right:0.3rem;"], function(e)
				{
					return e.theme.color.rgb39_153_228
				}),
				E = function(e)
				{
					var t = e.chat,
						n = e.handleScroll,
						r = (0, o.T)(),
						c = (0, o.C)(function(e)
						{
							return e.playChat
						}),
						u = (0, o.C)(function(e)
						{
							return e.global.gameName
						}),
						p = (0, o.C)(function(e)
						{
							return e.global.lang
						}),
						g = (0, a.useState)(!0),
						x = g[0],
						_ = g[1],
						y = (0, a.useCallback)(function(e, t)
						{
							var n = e.chats.indexOf(t),
								o = e.chats[n + 1];
							if("end" === t.type || "reply" === t.type || "heart" === t.type) r((0, i.eS)((0, l.zP)()));
							else if(o && o.replyDepth === e.replyDepth) "{end}" === toString(o.content).trim() && o.replyDepth === t.replyDepth ? (r((0, i.eS)((0, l.zP)())), r((0, i.e$)(
							{
								chat: h.Nl
							}))) : r((0, i.e$)(
							{
								chat: o
							}));
							else
							{
								for(var a = -1, c = n + 1; c < e.chats.length; c++)
									if(e.replyDepth === e.chats[c].replyDepth)
									{
										a = c;
										break
									} if(-1 === a)
								{
									var s = e.chats.filter(function(e)
									{
										return "reply" === e.type && e.content.split('\n').indexOf(t.replyDepth) > -1//
									});
									if(s.length > 0)
									{
										var d = (0, l.G_)(e.chats, s[0]);
										if(null !== d && "{end}" !== d.content.trim())
										{
											r((0, i.e$)(
											{
												chat: d,
												depth: d.replyDepth
											}));
											return
										}
									}
								}
								else if("{end}" !== e.chats[a].content.trim())
								{
									r((0, i.e$)(
									{
										chat: e.chats[a]
									}));
									return
								}
								r((0, i.eS)((0, l.zP)())), r((0, i.e$)(
								{
									chat: h.Nl
								}))
							}
						}, [r]);
					let isFirst = isfirst(c.chats.indexOf(t),c.chats,'play')
					let style = mt_settings['文字样式'][t.type] ? mt_settings['文字样式'][t.type] : {}
					delete style.textAlign
					style = {...style,...{}}//防止连带修改设置属性
					if(t.type === 'info')
					{
						t.isFirst && !t.isRight ? style.textAlign = 'left' : ''
						t.isRight && !t.isFirst ? style.textAlign = 'right' : ''
					}
					return (0, a.useEffect)(function()
					{
						if(n(), x && !(c.chats.length < 1))
						{
							var e = 100;
							"chat" === t.type && t.sCharacter.no !== d.I.no ? e = 50 * t.content.length > 4e3 ? 4e3 : 50 * t.content.length + 500 : ("image" === t.type || "chat" === t.type && t.sCharacter.no === d.I.no) && (e = 300);
							var r = setTimeout(function()
							{
								_(!1);
								var e = setTimeout(function()
								{
									y(c, t)
								}, 800 / c.chatSpeed);
								if(!(c.chats.length < 1)) return function()
								{
									return clearTimeout(e)
								}
							}, e / c.chatSpeed);
							return function()
							{
								return clearTimeout(r)
							}
						}
					}, [c, x, t, n, y]), (0, m.jsx)('div',
					{
						className: '消息',
						style: {padding: isFirst ? "" : "0.5rem 1rem 0 1rem"},
						children: [(0, m.jsxs)(m.Fragment,
						{
							children: "chat" === t.type || "image" === t.type ? (0, m.jsxs)(m.Fragment,
							{
								children: (0, m.jsxs)('div',
								{//整体图文消息
									className: '聊天',
									children: [!t.isCenter && !t.isRight ? (0, m.jsx)('div',
									{//左侧头像框
										className: '头像框',
										style: t.sCharacter.no != 0 ? 
										{
											pointerEvents: 'none',
											minWidth: t.heads && isFirst ? "auto" : "5rem",
											paddingRight: t.heads && isFirst ? "1rem" : "auto",
											flexDirection: t.heads ? t.heads.direction : ""
										} : {marginRight: '1.5rem'},
										children: isFirst && t.sCharacter.no != 0 ? [(0, m.jsx)('img',
										{//左侧头像
											className: '头像',
											style: {zIndex: t.heads ? t.heads.list.length : ''},
											src: loadhead(t.sCharacter.no,t.sCharacter.index),
											onError: function(e)
											{
												e.currentTarget.src = href+'Images/Ui/error.webp';
											},
											alt: t.sCharacter.index
										}), t.heads ? t.heads.list.map(function(index,k)
										{
											return (0, m.jsx)('img',
											{//左侧头像
												className: '头像',
												src: loadhead('LIST',index),
												style: 
												{
													zIndex: t.heads.list.length-k-1,
													marginTop: t.heads.direction === 'column' ? t.heads.margin ? t.heads.margin : "-1.5rem" : '',
													marginLeft: t.heads.direction === 'row' ? t.heads.margin ? t.heads.margin : "-1.5rem" : ''
												},
												onError: function(e)
												{
													e.currentTarget.src = href+'Images/Ui/error.webp';
												}
											})
										}) : ''] : ''
									}) : '', (0, m.jsxs)("div",
									{//图文消息
										className: "对话",
										style: 
										{
											alignItems: t.isCenter ? 'center' : t.isRight || t.sCharacter.no == 0 ? 'flex-end' : 'flex-start',
											height: t.heads && t.heads.fullHeight ? '100%' : ''
										},
										children: [!t.isCenter && isFirst && t.sCharacter.no != 0 ? (0, m.jsx)("span",
										{//人物名称
											className: "名称 bold",
											children: t.name || loadname(t.sCharacter.no,t.sCharacter.index)
										}) : '' , (0, m.jsxs)("div",
										{//消息内容
											style:
											{
												display: "flex",
												height: "100%",
												justifyContent: t.isCenter ? 'center' : t.isRight || t.sCharacter.no == 0 ? 'flex-end' : '',
											},
											children: [t.time ? (0, m.jsx)(s.i9,
											{//左侧时间戳
												className: '时间戳',
												hidden: (!t.time || t.sCharacter.no != 0) && !t.isRight,
												children: t.time
											}) : '', "chat" === t.type ? [(0, m.jsx)('span',
											{//文本消息
												className: (t.sCharacter.no == 0 ? '文本' : !t.isRight && isFirst ? '文本 左角' : '文本'),
												style: t.isRight || t.sCharacter.no == 0 ? {...{background: 'rgb(74, 138, 202)',border: '1px solid rgb(74, 138, 202)'},...style} : style,
												children: x ? (0, m.jsx)(I,{}) : t.content
											}), (t.isRight && isFirst) || t.sCharacter.no == 0 ? (0, m.jsx)(s.CJ,{}) : '' ] : (0, m.jsx)('img',
											{//图片消息
												className: '图片',
												style:
												{
													maxHeight: (t.content || t.file).indexOf("Face") > -1 ? '360px' : "",
													maxWidth: (t.content || t.file).indexOf("Face") > -1 ? mt_settings['差分比例'] : mt_settings['图片比例']
												},//@差分表情宽高百分比
												src: t.file.indexOf(":image") > -1 ? t.file : href+t.file,
												title: t.file.indexOf(":image") > -1 ? '' : t.file,
												onError: function(e)
												{
													e.currentTarget.src = href+'Images/Ui/error.webp';
												},
											}), t.time ? (0, m.jsx)(s.i9,
											{//右侧时间戳
												className: '时间戳',
												hidden: !t.time || t.sCharacter.no == 0 || t.isRight || t.isCenter,
												children: t.time
											}) : '']
										})]
									}), !t.isCenter && t.isRight && t.sCharacter.no != 0 ? (0, m.jsx)('div',
									{//右侧头像框
										className: '头像框',
										style:
										{
											pointerEvents: 'none',
											justifyContent:'flex-end',
											minWidth: t.heads && isFirst ? "auto" : "5rem",
											paddingLeft: t.heads && isFirst ? "1rem" : "auto",
											flexDirection: t.heads ? t.heads.direction : ""
										},
										children: isFirst && t.sCharacter.no != 0 ? [(0, m.jsx)('img',
										{
											className: '头像',
											src: loadhead(t.sCharacter.no,t.sCharacter.index),
											onError: function(e)
											{
												e.currentTarget.src = href+'Images/Ui/error.webp';
											},
											alt: t.sCharacter.index
										}), t.heads ? t.heads.list.map(function(index,k)
										{
											return (0, m.jsx)('img',
											{//右侧头像
												className: '头像',
												src: loadhead('LIST',index),
												style: 
												{
													zIndex: t.heads.list.length-k-1,
													marginTop: t.heads.direction === 'column' ? "-1.5rem" : '',
													marginLeft: t.heads.direction === 'row' ? "-1.5rem" : ''
												},
												onError: function(e)
												{
													e.currentTarget.src = href+'Images/Ui/error.webp';
												}
											})
										}) : ''] : ''
									}) : '']
								})
							}) : "reply" === t.type ? [(0, m.jsx)('div',
							{
								style: {width: "100%"},
								children: (0, m.jsx)(k,
								{
									style: style,
									chat: t
								})
							})] : "heart" === t.type ? [(0, m.jsx)(s.xu,
							{}),(0, m.jsx)(b,
							{
								style: style,
								chat: t
							})] : "info" === t.type ? (0, m.jsx)(s.vD,
							{
								style: style,
								children: t.content
							}) : "end" === t.type ? (0, m.jsx)(f,
							{}) : (0, m.jsx)(m.Fragment,{})
						})]
					})
				},
				e8 = c.ZP.div.withConfig(
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
				}),//
				T = c.ZP.div.withConfig(
				{
					displayName: "Chat__Flex",
					componentId: "sc-1k7dquv-0"
				})(["", ";height:auto;"], function(e)
				{
					return e.theme.common.flexBox(
					{
						justify: "flex-end",
						align: "flex-start"
					})
				}),
				I = c.ZP.div.withConfig(
				{
					displayName: "Chat__LoadingDiv",
					componentId: "sc-1k7dquv-1"
				})(["&,&:before,&:after{color:#ffffff;top:-2.7rem;border-radius:50%;width:0.5rem;height:0.5rem;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation:load7 3s infinite ease-in-out;animation:load7 3s infinite ease-in-out;}&{margin:1.2rem 2rem 0rem 2rem;position:relative;text-indent:-9999rem;-webkit-transform:translateZ(0);-ms-transform:translateZ(0);transform:translateZ(0);-webkit-animation-delay:-0.2s;animation-delay:-0.2s;}&:before,&:after{content:'';position:absolute;top:0;}&:before{left:-1.2rem;-webkit-animation-delay:-0.4s;animation-delay:-0.4s;}&:after{left:1.2rem;}@-webkit-keyframes load7{0%,80%,100%{box-shadow:0 2rem 0 -1rem;}40%{box-shadow:0 2rem 0 0;}}@keyframes load7{0%,80%,100%{box-shadow:0 2rem 0 -1rem;}40%{box-shadow:0 2rem 0 0;}}"]),
				S = function(e)
				{
					var t = e.scrollRef,
						n = (0, o.T)(),
						c = (0, o.C)(function(e)
						{
							return e.global.lang
						}),
						l = (0, o.C)(function(e)
						{
							return e.playChat.nowChats
						}),
						s = (0, o.C)(function(e)
						{
							return e.playChat.chats
						}),
						d = (0, a.useCallback)(function()
						{
							var e;
							null === (e = t.current) || void 0 === e || e.scrollIntoView(!1)
						}, [t]);
					return (0, a.useEffect)(function()
					{
						0 === l.length && s.length > 0 && n((0, i.e$)(
						{
							chat: s[0]
						}))
					}, [n, l, s]), (0, m.jsx)(B,
					{
						children: (0, m.jsx)(A,
						{
							children: s.length < 1 ? (0, m.jsx)(M,
							{
								children: (0, m.jsx)("span",
								{
									style:
									{
										fontSize: "1.1rem"
									},
									children: r.Z.select_msg[c]
								})
							}) : (0, m.jsx)(D,
							{
								ref: t,
								children: l.map(function(e, t)
								{
									return (0, m.jsx)(E,
									{
										chat: e,
										handleScroll: d
									}, t)
								})
							})
						})
					})
				},
				B = c.ZP.div.withConfig(
				{
					displayName: "RightScreen__Box",
					componentId: "sc-14j003s-0"
				})(["display:flex;height:100%;width:100%;flex-direction:column;background-color:", ";min-width:340px;@media screen and (max-width:768px){min-width:100vw;}"], function(e)
				{
					return ''//#自定义样式
				}),
				A = c.ZP.div.withConfig(
				{
					displayName: "RightScreen__Container",
					componentId: "sc-14j003s-1"
				})(["display:inline-block;height:100%;background-color:", ";overflow-y:auto;overflow-y:overlay;overflow-x:hidden;&::-webkit-scrollbar{display:inline-block;width:0.4rem;}&::-webkit-scrollbar-thumb{height:17%;background-color:", ";border-radius:1rem;}"], function(e)
				{
					return ''//#
				}, function(e)
				{
					return e.theme.color.rgb210_210_210
				}),
				D = c.ZP.div.withConfig(
				{
					displayName: "RightScreen__CContainer",
					componentId: "sc-14j003s-2"
				})(["display:flex;flex-direction:column;width:100%;height:max-content;padding-bottom:1rem;background-color:", ";"], function(e)
				{
					return ''//#自定义样式
				}),
				M = c.ZP.div.withConfig(
				{
					displayName: "RightScreen__Span",
					componentId: "sc-14j003s-3"
				})(["", ";background-color:", ";color:", ";"], function(e)
				{
					return e.theme.common.flexBox(
					{})
				}, function(e)
				{
					return ''//#
				}, function(e)
				{
					return e.theme.color.rgb111_119_127
				})
		},
		6696: function(e, t, n)
		{
			"use strict";
			var r = n(3380),
				o = n(1664),
				i = n.n(o),
				a = n(7294),
				c = n(9521),
				l = n(5893);
			t.Z = function(e)
			{
				var t = e.rowCount,
					n = e.option,
					o = e.changeOption,
					i = (0, a.useState)([]),
					c = i[0],
					h = i[1],
					u = (0, a.useState)(0),
					m = u[0],
					f = u[1];
				(0, a.useEffect)(function()
				{
					for(var e = [], r = 0 === Math.floor(n.PAGE / 5) ? 1 : n.PAGE % 5 == 0 ? n.PAGE - 4 : 5 * Math.floor(n.PAGE / 5) + 1, o = Math.floor(t % 10 == 0 ? t / 10 : t / 10 + 1), i = r; i <= o && i <= r + 4; i++) e.push(i);
					f(o), h(e)
				}, [n, t, f, h]);
				var p = function(e)
					{
						return {
							PAGE: e,
							M_TYPE: n.M_TYPE,
							O_TYPE: n.O_TYPE,
							B_TYPE: n.B_TYPE,
							C_TYPE: n.C_TYPE,
							CONTENT: n.CONTENT,
							LANG: n.LANG,
							MEMBER_NO: n.MEMBER_NO
						}
					},
					g = function(e)
					{
						var t = "/" + (0, r.sk)(e.M_TYPE) + "/" + e.LANG + "/" + e.PAGE.toString();
						return (e.O_TYPE || e.B_TYPE || e.C_TYPE || e.CONTENT) && (t += "?" + (0 !== e.O_TYPE ? "o_type=" + e.O_TYPE : "") + (0 !== e.B_TYPE ? "&b_type=" + e.B_TYPE : "") + (0 !== e.C_TYPE ? "&c_type=" + e.C_TYPE : "") + (0 !== e.C_TYPE ? "&content=" + e.CONTENT : "")), t
					};
				return (0, l.jsx)("div",
				{
					style:
					{
						display: "flex",
						justifyContent: "center",
						marginTop: "auto"
					},
					children: (0, l.jsx)(s,
					{
						children: (0, l.jsxs)("ul",
						{
							children: [n.PAGE > 5 && (0, l.jsxs)(l.Fragment,
							{
								children: [(0, l.jsxs)("li",
								{
									onClick: function(e)
									{
										o(p(1))
									},
									children: ["<<", (0, l.jsx)(d,
									{
										href: g(p(1)),
										children: "<<"
									})]
								}), (0, l.jsxs)("li",
								{
									onClick: function(e)
									{
										o(p(0 === Math.floor(n.PAGE % 5) ? 5 * Math.floor(n.PAGE / 5) - 5 : 5 * Math.floor(n.PAGE / 5)))
									},
									children: ["<", (0, l.jsx)(d,
									{
										href: g(p(0 === Math.floor(n.PAGE % 5) ? 5 * Math.floor(n.PAGE / 5) - 5 : 5 * Math.floor(n.PAGE / 5))),
										children: "<"
									})]
								})]
							}), c.map(function(e)
							{
								return (0, l.jsxs)("li",
								{
									onClick: function()
									{
										o(p(e))
									},
									className: e === n.PAGE ? "active" : "",
									children: [e, (0, l.jsx)(d,
									{
										href: g(p(e)),
										children: e
									})]
								}, e)
							}), n.PAGE < 5 * Math.floor((m - 1) / 5) + 1 && (0, l.jsxs)(l.Fragment,
							{
								children: [(0, l.jsxs)("li",
								{
									onClick: function()
									{
										o(p(0 === Math.floor(n.PAGE % 5) ? 5 * Math.floor(n.PAGE / 5) + 1 : 5 * Math.floor(n.PAGE / 5) + 6))
									},
									children: [">", (0, l.jsx)(d,
									{
										href: g(p(0 === Math.floor(n.PAGE % 5) ? 5 * Math.floor(n.PAGE / 5) + 1 : 5 * Math.floor(n.PAGE / 5) + 6)),
										children: ">"
									})]
								}), (0, l.jsxs)("li",
								{
									onClick: function()
									{
										o(p(m))
									},
									children: [">>", (0, l.jsx)(d,
									{
										href: g(p(m)),
										children: ">>"
									})]
								})]
							})]
						})
					})
				})
			};
			var s = c.ZP.div.withConfig(
				{
					displayName: "Paging__Pagination",
					componentId: "sc-1r5t0xh-0"
				})(["text-align:center;padding :2rem 0;height :auto;width :100%;ul{width:auto;padding:0;margin:0;display:flex;justify-content:center;align-items:center;}li{display:flex;justify-content:center;align-items:center;cursor:pointer;padding:0 5px;color:", ";border-radius:50%;-webkit-transition:background-color 0.3s;transition:background-color 0.3s;width:2.5rem;height:2.5rem;margin:0 0.2rem;border:2px solid ", ";}li.active{background-color:", ";color:#fff;pointer-events:none;}li:hover:not(.active){background-color:", ";}"], function(e)
				{
					return e.theme.color.rgb0_0_0
				}, function(e)
				{
					return e.theme.color.rgb223_226_228
				}, function(e)
				{
					return e.theme.color.rgb149_186_229
				}, function(e)
				{
					return e.theme.color.rgb202_215_221
				}),
				d = (0, c.ZP)(i()).withConfig(
				{
					displayName: "Paging__HideLink",
					componentId: "sc-1r5t0xh-1"
				})(["overflow:hidden;width :0;height :0;"])
		},
		1208: function(e, t, n)
		{
			"use strict";
			n.d(t,
			{
				m: function()
				{
					return r
				}
			});
			var r = (0, n(5648).lX)() || void 0
		},
		6453: function(e, t, n)
		{
			"use strict";
			n.d(t,
			{
				AZ: function()
				{
					return d
				},
				Dr: function()
				{
					return s
				},
				HR: function()
				{
					return l
				},
				OP: function()
				{
					return c
				},
				Qj: function()
				{
					return h
				},
				W2: function()
				{
					return a
				}
			});
			var r = n(9521),
				o = n(1563),
				i = n(4685),
				a = r.ZP.div.withConfig(
				{
					displayName: "setting__Container",
					componentId: "sc-o80z4-0"
				})(["", ";height:fit-content;user-select:text;"], function(e)
				{
					return e.theme.common.flexBox(
					{
						direction: "column"
					})
				}),
				c = r.ZP.div.withConfig(
				{
					displayName: "setting__TextWrapper",
					componentId: "sc-o80z4-1"
				})(["display:flex;flex-direction:column;background-color:white;padding:1rem 0.5rem;margin-bottom:0.5rem;width:100%;line-height:1.5rem;flex-wrap:wrap;"]),
				l = r.ZP.div.withConfig(
				{
					displayName: "setting__HR",
					componentId: "sc-o80z4-2"
				})(["border-top:0.15rem dashed ", ";margin:1rem 0;"], function(e)
				{
					return e.theme.color.rgb207_212_215
				}),
				s = r.ZP.span.withConfig(
				{
					displayName: "setting__Span",
					componentId: "sc-o80z4-3"
				})(["white-space:pre-wrap;word-break:keep-all;font-size:1rem;&.bold{font-size:1.3rem;}color:", ";"], function(e)
				{
					return e.theme.color.rgb34_37_41
				}),
				d = (0, r.ZP)(i.Lw).withConfig(
				{
					displayName: "setting__CommitButton",
					componentId: "sc-o80z4-4"
				})(["width:auto;min-width:6em;height:3rem;line-height:2rem;margin:auto 1rem;color:", ";font-size:1.2rem;&:before{background-color:", ";border:none;box-shadow:0.05rem 0.2rem 0.2rem ", ";width:100%;}&:hover:before{background-color:", ";}&:active:before{box-shadow:0.04rem 0.15rem 0.2rem ", ";width:100%;height:2.9rem;}@media screen and (max-width:768px){margin :auto 0 auto auto;}"], function(e)
				{
					return e.theme.color.rgb45_80_100
				}, function(e)
				{
					return e.theme.color.rgb118_220_255
				}, function(e)
				{
					return e.theme.color.rgb171_193_204
				}, function(e)
				{
					return e.theme.color.rgb77_197_237
				}, function(e)
				{
					return e.theme.color.rgb171_193_204
				}),
				h = (0, r.ZP)(o.zx).withConfig(
				{
					displayName: "setting__LinkButton",
					componentId: "sc-o80z4-5"
				})(["color:", ";font-size:1rem;line-height:1rem;height :auto;margin :0 1rem;border:2px solid ", ";a{text-decoration:none;color:", ";}"], function(e)
				{
					return e.theme.color.rgb48_150_245
				}, function(e)
				{
					return e.theme.color.rgb48_150_245
				}, function(e)
				{
					return e.theme.color.rgb48_150_245
				})
		},
		83: function(e, t, n)
		{
			"use strict";
			n.d(t,
			{
				CJ: function()
				{
					return u
				},
				Dt: function()
				{
					return d
				},
				HR: function()
				{
					return p
				},
				LP: function()
				{
					return h
				},
				NZ: function()
				{
					return _
				},
				Xp: function()
				{
					return c
				},
				YJ: function()
				{
					return b
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
					return a
				},
				zC: function()
				{
					return s
				}
			});
			var r = n(9521),
				o = n(1563),
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
				a = r.ZP.div.withConfig(
				{
					displayName: "talk__Box",
					componentId: "sc-eq7cqw-1"
				})(["display:flex;width:6rem;"]),
				c = r.ZP.div.withConfig(
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
				})([`max-width:${mt_settings['图片比例']};border:2px solid ", ";background-color:rgb(255,255,255);padding:0.5rem;border-radius:10px;`], function(e)
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
				d = (0, r.ZP)(s).withConfig(
				{
					displayName: "talk__NTextBox",
					componentId: "sc-eq7cqw-5"
				})(["::after{content:none;}"]),
				h = (0, r.ZP)(s).withConfig(
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
				u = r.ZP.div.withConfig(
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
				b = (0, r.ZP)(o.xL).withConfig(
				{
					displayName: "talk__CheckedIcon",
					componentId: "sc-eq7cqw-13"
				})(["width:1.1rem;height:1.1rem;margin-right:0.5rem;"]),
				_ = r.ZP.img.withConfig(
				{
					displayName: "talk__Profile",
					componentId: "sc-eq7cqw-14"
				})(["box-sizing:border-box;margin:0rem;width:4rem;height:4rem;object-fit:contain;border-radius:50%;"])
		}
	}
]);