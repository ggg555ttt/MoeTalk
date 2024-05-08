"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
	[563],
	{
		2985: function(e, t, n)
		{
			var o = n(4701),
				r = n(6150),
				i = n(7294);
			n(210);
			var a = n(5893);
			t.Z = function(e)
			{
				var t = (0, r.C)(function(e)
				{
					return e.global.lang
				});
				return (0, i.useEffect)(function()
				{
					try
					{
						(window.adsbygoogle = window.adsbygoogle || []).push(
						{})
					}
					catch (e)
					{}
				}, []), (0, a.jsxs)(a.Fragment,
				{
					children: (0, a.jsx)("ins",
					{
						className: "adsbygoogle",
						style:
						{
							width: e.width,
							height: e.height,
							position: "absolute",
							overflowX: "auto",
							overflowY: "hidden",
							display: "block",
							zIndex: "1",
							textAlign: "center"
						},
						"data-ad-client": e.client,
						"data-ad-slot": e.slot,
						"data-ad-format": e.format,
						"data-full-width-responsive": e.responsive,
						"data-ad-layout-key": e.layoutKey
					})
				})
			}
		},
		5654: function(e, t, n)
		{
			var o = n(4701),
				r = n(6150),
				i = n(1563),
				a = n(9417),
				c = n(7294),
				l = n(9521),
				s = n(5893);
			t.Z = function(e)
			{
				var t = e.items,
					n = e.selected,
					l = e.setSelected,
					p = (0, c.useState)(!1),
					f = p[0],
					_ = p[1],
					g = (0, c.useState)(""),
					x = g[0],
					y = g[1],
					b = (0, r.C)(function(e)
					{
						return e.global.lang
					}),
					E = t.length > 0 ? t.filter(function(e)
					{
						return e.title.toLowerCase().match(x.toLowerCase())
					}) : [];
				return (0, c.useEffect)(function()
				{
					f ? y("") : y(n.title)
				}, [f, n, y]), (0, s.jsx)(d,
				{
					children: (0, s.jsxs)("div",
					{
						style:
						{
							position: "relative",
							width: "100%"
						},
						children: [(0, s.jsxs)(i.OP,
						{
							style:
							{
								padding: "0 0.5rem",
								zIndex: "2",
								position: "relative",
								height: "2rem"
							},
							onClick: function()
							{
								_(!0)
							},
							children: [(0, s.jsx)(i.Kx,
							{
								className: "medium",
								style:
								{
									padding: "0",
									overflow: "hidden"
								},
								placeholder: o.Z.filter_selectBox[b],
								maxRows: 1,
								value: x,
								maxLength: 20,
								onChange: function(e)
								{
									!f || e.currentTarget.value.match("\n") || y(e.currentTarget.value)
								}
							}), (0, s.jsx)(i.xL,
							{
								style:
								{
									width: "0.7rem",
									margin: "0 0 0 0.2rem"
								},
								icon: f ? a.l1h : a.eW2
							})]
						}), (0, s.jsx)(u,
						{
							style:
							{
								display: f ? "block" : "none"
							},
							children: E.map(function(e, t)
							{
								return (0, s.jsx)("li",
								{
									children: (0, s.jsx)(h,
									{
										className: e.no === n.no ? "medium selected" : "medium",
										onClick: function()
										{
											l(e), _(!1)
										},
										children: e.title || "-"
									})
								}, t)
							})
						}), (0, s.jsx)(m,
						{
							style:
							{
								display: f ? "block" : "none"
							},
							onClick: function()
							{
								_(!1)
							}
						})]
					})
				})
			};
			var d = l.ZP.div.withConfig(
				{
					displayName: "SelectBox__Container",
					componentId: "sc-1p70i56-0"
				})(["width :100%;"]),
				u = l.ZP.ul.withConfig(
				{
					displayName: "SelectBox__UL",
					componentId: "sc-1p70i56-1"
				})(["position:absolute;width:100%;max-height:15rem;z-index:2;border:2px solid ", ";border-radius:0.5rem;background-color:", ";overflow-y:auto;overflow-y:overlay;overflow-x:hidden;&::-webkit-scrollbar{display:inline-block;width:0.4rem;}&::-webkit-scrollbar-thumb{height:17%;background-color:", ";border-radius:1rem;}"], function(e)
				{
					return e.theme.color.rgb139_187_233
				}, function(e)
				{
					return e.theme.color.rgb255_255_255
				}, function(e)
				{
					return e.theme.color.rgb210_210_210
				}),
				h = (0, l.ZP)(i.zx).withConfig(
				{
					displayName: "SelectBox__ItemButton",
					componentId: "sc-1p70i56-2"
				})(["width :100%;padding:auto 0.5rem;text-align:left;border-radius:0;&.selected{color:", ";background-color:", ";pointer-events:none;}"], function(e)
				{
					return e.theme.color.rgb255_255_255
				}, function(e)
				{
					return e.theme.color.rgb139_187_233
				}),
				m = l.ZP.div.withConfig(
				{
					displayName: "SelectBox__BG",
					componentId: "sc-1p70i56-3"
				})(["position:fixed;top:0;left:0;width:100%;height:100%;z-index:1;"])
		},
		8024: function(e, t, n)
		{
			var o = n(9499),
				r = n(7294),
				i = n(5280),
				a = n(1728),
				c = n(5893);

			function l(e, t)
			{
				var n = Object.keys(e);
				if(Object.getOwnPropertySymbols)
				{
					var o = Object.getOwnPropertySymbols(e);
					t && (o = o.filter(function(t)
					{
						return Object.getOwnPropertyDescriptor(e, t).enumerable
					})), n.push.apply(n, o)
				}
				return n
			}

			function s(e)
			{
				for(var t = 1; t < arguments.length; t++)
				{
					var n = null != arguments[t] ? arguments[t] :
					{};
					t % 2 ? l(Object(n), !0).forEach(function(t)
					{
						(0, o.Z)(e, t, n[t])
					}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : l(Object(n)).forEach(function(t)
					{
						Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
					})
				}
				return e
			}
			t.Z = function(e)
			{
				var t = e.listArr,
					n = e.clientHeight,
					o = e.selected,
					l = e.rowHeight,
					d = (0, r.useRef)(null),
					u = (0, r.useState)([]),
					h = u[0],
					m = u[1];
				(0, r.useEffect)(function()
				{
					d.current && t.length > 0 && m(t.map(function(e, t)
					{
						return setTimeout(function()
						{
							var e;
							null == d || null === (e = d.current) || void 0 === e || e.resetAfterIndex(t)
						}, 0), o === t ? 2 * l : l
					}))
				}, [o, t, d, l, m]);
				var p = function(e)
				{
					var n = e.index,
						o = e.style;
					return (0, c.jsx)("div",
					{
						style: s(s(
						{}, o),
						{},
						{
							transition: "all 300ms ease-in-out"
						}),
						children: t[n]
					})
				};
				return (0, c.jsx)(a.Z,
				{
					defaultHeight: n,
					children: function(e)
					{
						var n = e.width,
							o = e.height;
						return (0, c.jsx)(i.S_,
						{
							ref: d,
							height: o,
							width: n,
							itemCount: t.length,
							itemSize: function(e)
							{
								return h[e] || 0
							},
							overscanCount: 1,
							children: p
						})
					}
				})
			}
		},
		5563: function(e, t, n)
		{
			n.d(t,
			{
				Z: function()
				{
					return eT
				}
			});
			var o = n(6835),
				r = n(721),
				i = n(4701),
				a = n(3380),
				c = n(6150),
				l = n(1208),
				s = n(4306),
				d = n(1163),
				u = n(7294),
				h = function(e)
				{
					var t, n, r, i = e.ssrBoard,
						c = (0, d.useRouter)(),
						h = (0, s.vC)(
						{
							fixedCacheKey: "account"
						}),
						m = (0, o.Z)(h, 2),
						p = (m[0], m[1]),
						f = (0, u.useState)(i),
						_ = f[0],
						g = f[1],
						x = (0, u.useState)(
						{
							PAGE: 1,
							M_TYPE: (0, a.MY)(c.pathname.split("/")[1]),
							O_TYPE: 0,
							B_TYPE: 0,
							C_TYPE: 0,
							CONTENT: "",
							LANG: "jp",
							MEMBER_NO: (null === (t = p.data) || void 0 === t ? void 0 : t.MEMBER_NO) || 0
						}),
						y = x[0],
						b = x[1],
						E = (0, s.ND)(y,
						{
							skip: null !== _
						}),
						w = E.data,
						j = E.isSuccess;
					return (0, u.useEffect)(function()
					{
						var e;
						b(
						{
							PAGE: "string" == typeof c.query.pageNum ? parseInt(c.query.pageNum) : 1,
							LANG: "string" == typeof c.query.lang ? c.query.lang : "en",
							M_TYPE: (0, a.MY)(c.pathname.split("/")[1]),
							O_TYPE: "string" == typeof c.query.o_type ? parseInt(c.query.o_type) : 0,
							B_TYPE: "string" == typeof c.query.b_type ? parseInt(c.query.b_type) : 0,
							C_TYPE: "string" == typeof c.query.c_type ? parseInt(c.query.c_type) : 0,
							CONTENT: "string" == typeof c.query.content ? c.query.content : "",
							MEMBER_NO: (null === (e = p.data) || void 0 === e ? void 0 : e.MEMBER_NO) || 0
						})
					}, [null === (n = p.data) || void 0 === n ? void 0 : n.MEMBER_NO, c.query, c.pathname]), (0, u.useEffect)(function()
					{
						var e = function()
						{
							var e, t = location.pathname.split("/"),
								n = decodeURIComponent(location.search),
								o = {
									PAGE: parseInt(t[3]) || 1,
									LANG: t[2] || "en",
									M_TYPE: (0, a.MY)(t[1]),
									O_TYPE: 0,
									B_TYPE: 0,
									C_TYPE: 0,
									CONTENT: "",
									MEMBER_NO: (null === (e = p.data) || void 0 === e ? void 0 : e.MEMBER_NO) || 0
								};
							n.split("&").forEach(function(e)
							{
								e.match("o_type") ? o.O_TYPE = Number.parseInt(e.split("=")[1]) || 0 : e.match("b_type") ? o.B_TYPE = Number.parseInt(e.split("=")[1]) || 0 : e.match("c_type") ? o.C_TYPE = Number.parseInt(e.split("=")[1]) || 0 : e.match("content") && (o.CONTENT = e.split("=")[1] || "")
							}), b(o)
						};
						return null === l.m || void 0 === l.m ? void 0 : l.m.listen(function(t)
						{
							"POP" === t.action && e()
						})
					}, [null === (r = p.data) || void 0 === r ? void 0 : r.MEMBER_NO]), [w || i || [], j, y, function(e)
					{
						var t = player;//#播放器
						(e.O_TYPE || e.B_TYPE || e.C_TYPE || e.CONTENT) && (t += "?" + (0 !== e.O_TYPE ? "o_type=" + e.O_TYPE + "&" : "") + (0 !== e.B_TYPE ? "b_type=" + e.B_TYPE + "&" : "") + (0 !== e.C_TYPE ? "c_type=" + e.C_TYPE + "&" : "") + ("" !== e.CONTENT ? "content=" + e.CONTENT : "")), window.history.pushState(null, (0, a.sk)(e.M_TYPE), t), null !== _ && g(null), b(e)
					}]
				},
				m = n(9008),
				p = n.n(m),
				f = n(5675),
				_ = n.n(f),
				g = n(9521),
				x = n(1563),
				y = n(2985),
				b = n(5893),
				E = function(e)
				{
					var t = e.show,
						n = (0, u.useState)(!0),
						o = n[0],
						r = n[1];
					return (0, b.jsx)(b.Fragment,
					{
						children: t && o && (0, b.jsxs)(x.bI,
						{
							children: [(0, b.jsx)(x.dh,
							{
								onClick: function()
								{
									return r(!1)
								},
								children: "x"
							}), (0, b.jsx)(y.Z,
							{
								client: "ca-pub-3260842116764000",
								slot: "7838710652",
								format: "fluid",
								responsive: "true",
								layoutKey: "",
								height: "100%",
								width: "100%"
							})]
						})
					})
				},
				w = n(8024),
				j = function(e)
				{
					var t = e.character,
						n = e.option,
						o = e.changeOption,
						r = (0, c.C)(function(e)
						{
							return e.global.lang
						}),
						i = function()
						{
							o(
							{
								PAGE: 1,
								M_TYPE: n.M_TYPE,
								O_TYPE: n.O_TYPE,
								B_TYPE: n.B_TYPE,
								C_TYPE: n.C_TYPE,
								CONTENT: t.no.toString(),
								LANG: n.LANG,
								MEMBER_NO: (null == n ? void 0 : n.MEMBER_NO) || 0
							})
						};
					return (0, b.jsx)(T,
					{
						children: (0, b.jsx)(v,
						{
							children: (0, b.jsxs)(N,
							{
								onClick: function()
								{
									i()
								},
								children: [(0, b.jsxs)(v,
								{
									children: [(0, b.jsx)(x.NZ,
									{
										width: 252,
										height: 252,
										alt: "profile",
										src: loadhead(t.no,t.profile[0]),//#左方选择框
										onError: function(e)
										{
											var t = e.currentTarget;
											(0, a.Mp)(t, "character")
										}
									}), (0, b.jsxs)(C,
									{
										children: [(0, b.jsx)("h2",
										{
											className: "bold",
											children: t.name[r].replaceAll("-", " ")
										}), (0, b.jsx)(O,
										{
											children: t.club[r]
										})]
									})]
								}), (0, b.jsx)(P,
								{
									width: 252,
									height: 252,
									src: href+"Images/Ui/School/"+(t.school[mtlang] === '自定义' ? '自定义' : mt_characters[t.no].school)+'.webp',//#学校图标
									onError: function(e)
									{
										var t = e.currentTarget;
										(0, a.Mp)(t, "school")
									},
									alt: "school"
								})]
							})
						})
					})
				},
				T = g.ZP.div.withConfig(
				{
					displayName: "Character__Container",
					componentId: "sc-1nibxky-0"
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
				v = g.ZP.div.withConfig(
				{
					displayName: "Character__Wrapper",
					componentId: "sc-1nibxky-1"
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
				N = g.ZP.div.withConfig(
				{
					displayName: "Character__CContainer",
					componentId: "sc-1nibxky-2"
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
				C = g.ZP.div.withConfig(
				{
					displayName: "Character__ProfileText",
					componentId: "sc-1nibxky-3"
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
				O = g.ZP.span.withConfig(
				{
					displayName: "Character__FontSpan",
					componentId: "sc-1nibxky-4"
				})(["font-size:1rem;color:", ";"], function(e)
				{
					return e.theme.color.rgb111_119_127
				}),
				P = (0, g.ZP)(x.Yo).withConfig(
				{
					displayName: "Character__School",
					componentId: "sc-1nibxky-5"
				})(["height:4rem;width:4rem;padding:0;"]),
				k = n(6696),
				M = n(5654),
				S = n(8586),
				B = n(4288),
				Z = n(9417),
				I = n(4685),
				R = function(e)
				{
					var t = e.show,
						n = e.option,
						o = e.handleModalShow,
						r = e.changeOption,
						l = (0, c.C)(function(e)
						{
							return e.global.lang
						}),
						s = (0, u.useState)((0, a.FQ)(n.O_TYPE)),
						d = s[0],
						h = s[1];
					(0, u.useEffect)(function()
					{
						h((0, a.FQ)(n.O_TYPE))
					}, [t, n, h]);
					var m = function()
					{
						var e = {
							PAGE: 1,
							M_TYPE: n.M_TYPE,
							O_TYPE: n.O_TYPE,
							B_TYPE: n.B_TYPE,
							C_TYPE: n.C_TYPE,
							CONTENT: "",
							LANG: n.LANG,
							MEMBER_NO: n.MEMBER_NO
						};
						switch (d)
						{
							case "recent":
								e.O_TYPE = 0;
								break;
							case "best":
								e.O_TYPE = 2;
								break;
							case "view":
								e.O_TYPE = 4
						}
						r(e)
					};
					return (0, b.jsx)("div",
					{
						style:
						{
							width: "100%",
							position: "relative"
						},
						children: (0, b.jsxs)(Y,
						{
							style: t ?
							{
								maxHeight: "12rem"
							} :
							{
								maxHeight: "0"
							},
							children: [(0, b.jsxs)(A,
							{
								children: [(0, b.jsx)(D,
								{
									className: "bold",
									children: i.Z.sort[l]
								}), (0, b.jsx)(I.ec,
								{
									onClick: function()
									{
										o(!1)
									},
									children: (0, b.jsx)(z,
									{})
								})]
							}), (0, b.jsx)(L,
							{
								children: ["recent", "best", "view"].map(function(e, t)
								{
									return (0, b.jsx)(x.Bx,
									{
										onClick: function()
										{
											h(e)
										},
										className: d === e ? "selected medium" : "medium",
										children: i.Z[e][l]
									}, t)
								})
							}), (0, b.jsx)(A,
							{
								children: (0, b.jsx)(x.Mm,
								{
									className: "medium",
									onClick: function()
									{
										m(), o(!1)
									},
									children: i.Z.confirm[l]
								})
							})]
						})
					})
				},
				Y = g.ZP.div.withConfig(
				{
					displayName: "GroupModal__Container",
					componentId: "sc-1czdr7s-0"
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
				A = g.ZP.div.withConfig(
				{
					displayName: "GroupModal__Header",
					componentId: "sc-1czdr7s-1"
				})(["", ";padding:0.6rem;box-sizing:border-box;"], function(e)
				{
					return e.theme.common.flexBox(
					{
						justify: "space-between"
					})
				}),
				L = g.ZP.div.withConfig(
				{
					displayName: "GroupModal__Body",
					componentId: "sc-1czdr7s-2"
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
				D = g.ZP.span.withConfig(
				{
					displayName: "GroupModal__FontSpan",
					componentId: "sc-1czdr7s-3"
				})(["font-size:1.2rem;color:", ";"], function(e)
				{
					return e.theme.color.rgb63_68_74
				}),
				z = (0, g.ZP)(x.j4).withConfig(
				{
					displayName: "GroupModal__ExitI",
					componentId: "sc-1czdr7s-4"
				})(["width:1.5rem;height:1.5rem;&:before,&:after{content:'';width:1.5rem;height:2px;left:40%;background:", ";}"], function(e)
				{
					return e.theme.color.rgb15_33_64
				}),
				F = function(e)
				{
					var t = e.characterList,
						n = e.option,
						o = e.handleSelectList,
						r = e.rowCount,
						l = e.changeOption,
						s = (0, c.T)(),
						d = (0, c.C)(function(e)
						{
							return e.global.lang
						}),
						h = (0, u.useState)(!1),
						m = h[0],
						p = h[1],
						f = (0, u.useState)(""),
						_ = f[0],
						g = f[1],
						y = function(e, r)
						{
							var i = {
								PAGE: 1,
								M_TYPE: n.M_TYPE,
								O_TYPE: n.O_TYPE,
								B_TYPE: n.B_TYPE,
								C_TYPE: n.C_TYPE,
								CONTENT: "",
								LANG: n.LANG,
								MEMBER_NO: n.MEMBER_NO
							};
							switch (e)
							{
								case "content":
									i.CONTENT = 2 === n.C_TYPE ? "" : _;
									break;
								case "o_type":
									i.CONTENT = n.CONTENT, i.O_TYPE = i.O_TYPE % 2 == 0 ? i.O_TYPE + 1 : i.O_TYPE - 1;
									break;
								case "c_type":
									2 === r && o(t.filter(function(e)
									{
										return e.open
									})), i.C_TYPE = r || 0;
									break;
								case "b_type":
									i.MEMBER_NO ? i.B_TYPE = 1 === i.B_TYPE ? 0 : 1 : s((0, S.Aj)(!0))
							}
							l(i)
						},
						E = function()
						{
							var e = "title";
							switch (n.C_TYPE)
							{
								case 0:
									e = "title";
									break;
								case 1:
									e = "writer";
									break;
								case 2:
									e = "student";
									break;
								case 3:
									e = "series"
							}
							return e
						},
						w = function(e)
						{
							g(e), 2 === n.C_TYPE && o(t.filter(function(t)
							{
								return t.open && null !== (0, a.oG)(t, e)
							}))
						};
					return (0, b.jsxs)(q,
					{
						children: [(0, b.jsxs)(G,
						{
							children: [(0, b.jsx)(H,
							{
								className: "bold",
								style:
								{
									lineHeight: "2rem"
								},
								children: (0, b.jsxs)("h1",
								{
									children: [`${i.Z.momotalk[d]} ${i.Z.library[d]}`, (0, b.jsxs)("span",
									{
										style:
										{
											fontSize: "1.2rem"
										},
										children: ["(", r, ")"]
									})]
								})
							}), (0, b.jsxs)(K,
							{
								style:
								{
									flexWrap: "wrap",
									justifyContent: "flex-end"
								},
								children: [/*(0, b.jsx)(K,
								{
									style:
									{
										justifyContent: "flex-end",
										marginBottom: "0.5rem"
									},
									children: (0, b.jsx)(x.jl,
									{
										onClick: function()
										{
											y("b_type", null)
										},
										children: (0, b.jsx)(X,
										{
											icon: 0 === n.B_TYPE ? B.xVw : Z.xVw
										})
									})
								}),*/(0, b.jsxs)(K,
								{
									style:
									{
										marginBottom: "0.5rem"
									},
									children: [(0, b.jsx)(U,
									{
										className: "medium",
										onClick: function()
										{
											p(!m)
										},
										children: (0, b.jsx)(H,
										{
											style:
											{
												fontSize: "1.1rem"
											},
											children: i.Z[(0, a.FQ)(n.O_TYPE)][d]
										})
									}), (0, b.jsx)(x.jl,
									{
										onClick: function()
										{
											y("o_type", null)
										},
										children: (0, b.jsx)(K,
										{
											children: (0, b.jsx)(x.Yo,
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
							})]
						}), (0, b.jsxs)(H,
						{
							children: 'QQ反馈交流群：922392676'
						}), (0, b.jsxs)(K,
						{
							style:
							{
								display: 'none',
								width: "100%"
							},
							children: [(0, b.jsx)("div",
							{
								style:
								{
									width: "9rem",
									marginRight: "0.5rem"
								},
								children: (0, b.jsx)(M.Z,
								{
									items: ["title", "writer", "student", "series"].map(function(e, t)
									{
										return {
											title: i.Z[e][d],
											no: t
										}
									}),
									selected:
									{
										title: i.Z[E()][d],
										no: function(e)
										{
											var t = 0;
											switch (e)
											{
												case "title":
													t = 0;
													break;
												case "writer":
													t = 1;
													break;
												case "student":
													t = 2;
													break;
												case "series":
													t = 3
											}
											return t
										}(E())
									},
									setSelected: function(e)
									{
										g(""), y("c_type", e.no)
									}
								})
							}), (0, b.jsxs)(K,
							{
								style:
								{
									width: "100%"
								},
								children: [(0, b.jsx)(x.II,
								{
									type: "text",
									value: _,
									maxLength: 30,
									className: "medium",
									placeholder: i.Z.input_comment[d],
									onChange: function(e)
									{
										w(e.currentTarget.value)
									}
								}), (0, b.jsx)(x.lR,
								{
									width: 40,
									height: 40,
									style:
									{
										right: "0.5rem"
									},
									onClick: function()
									{
										g(""), y("", null)
									},
									src: href+"Images/Ui/pen.webp",//#铅笔图标
									alt: "pen"
								})]
							}), (0, b.jsx)(W,
							{
								className: "medium",
								onClick: function()
								{
									y("content", null)
								},
								children: i.Z.search[d]
							})]
						}), (0, b.jsx)(R,
						{
							show: m,
							option: n,
							changeOption: l,
							handleModalShow: function(e)
							{
								p(e)
							}
						})]
					})
				},
				q = g.ZP.div.withConfig(
				{
					displayName: "SearchBar__Container",
					componentId: "sc-uf78kh-0"
				})(["", " height:auto;padding:1rem 1rem 0rem 1rem;box-sizing:border-box;"], function(e)
				{
					return e.theme.common.flexBox(
					{
						direction: "column"
					})
				}),
				G = g.ZP.div.withConfig(
				{
					displayName: "SearchBar__Sort",
					componentId: "sc-uf78kh-1"
				})(["", " text-align:center;height:auto;"], function(e)
				{
					return e.theme.common.flexBox(
					{
						justify: "space-between"
					})
				}),
				H = g.ZP.span.withConfig(
				{
					displayName: "SearchBar__FontSpan",
					componentId: "sc-uf78kh-2"
				})(["font-size:1.5rem;color:", ";"], function(e)
				{
					return e.theme.color.rgb63_68_74
				}),
				K = g.ZP.div.withConfig(
				{
					displayName: "SearchBar__Flex",
					componentId: "sc-uf78kh-3"
				})(["", " height:auto;width:auto;position:relative;"], function(e)
				{
					return e.theme.common.flexBox(
					{})
				}),
				U = (0, g.ZP)(x.jl).withConfig(
				{
					displayName: "SearchBar__Parallelogram1",
					componentId: "sc-uf78kh-4"
				})(["width:7.5rem;height:2.5rem;&:after{content:'';right:0.5rem;position:absolute;transform:skew(-10deg);border-bottom:0.45rem solid transparent;border-left:0.45rem solid transparent;border-top:0.45rem solid ", ";border-right:0.45rem solid ", ";}&:active:before{width:7.46rem;height:2.46rem;}"], function(e)
				{
					return e.theme.color.rgb73_111_143
				}, function(e)
				{
					return e.theme.color.rgb73_111_143
				}),
				W = (0, g.ZP)(x.zx).withConfig(
				{
					displayName: "SearchBar__SearchButton",
					componentId: "sc-uf78kh-5"
				})(["height:2rem;width:5rem;margin:auto;margin-left:0.5rem;font-size:1rem;padding:0;border:2px solid ", ";color:", ";"], function(e)
				{
					return e.theme.color.rgb230_233_235
				}, function(e)
				{
					return e.theme.color.rgb63_68_74
				}),
				X = (0, g.ZP)(x.xL).withConfig(
				{
					displayName: "SearchBar__BookMarkIcon",
					componentId: "sc-uf78kh-6"
				})(["width:1rem;color:", ";"], function(e)
				{
					return e.theme.color.rgb45_70_100
				}),
				V = n(29),
				$ = n(7794),
				Q = n.n($),
				J = n(7451),
				ee = n(4212),
				/*et = function(e)
				{
					var t = e.show,
						n = e.handleShow,
						o = e.handleSend,
						r = (0, c.C)(function(e)
						{
							return e.global.lang
						}),
						a = (0, u.useState)(""),
						l = a[0],
						s = a[1],
						d = function()
						{
							s(""), n(!1)
						};
					return (0, b.jsx)(I.Xf,
					{
						className: t ? "visible medium" : "medium",
						onDoubleClick: function()
						{
							d()
						},
						children: (0, b.jsxs)(I.F0,
						{
							onDoubleClick: function(e)
							{
								return e.stopPropagation(), !1
							},
							children: [(0, b.jsxs)(I.h4,
							{
								children: [(0, b.jsx)(I.Dx,
								{
									className: "bold",
									children: i.Z.report[r]
								}), (0, b.jsx)(I.ec,
								{
									onClick: function()
									{
										d()
									},
									children: (0, b.jsx)(x.j4,
									{})
								})]
							}), (0, b.jsxs)(I.$0,
							{
								children: [(0, b.jsx)(x.OP,
								{
									children: (0, b.jsx)(x.Kx,
									{
										className: "medium",
										placeholder: i.Z.report_comment1[r],
										maxRows: 1,
										value: l,
										maxLength: 20,
										onChange: function(e)
										{
											e.currentTarget.value.match("\n") || s(e.currentTarget.value)
										}
									})
								}), (0, b.jsxs)("span",
								{
									style:
									{
										fontSize: "0.9rem",
										marginTop: "1rem",
										textAlign: "center"
									},
									children: ["※", i.Z.report_comment2[r]]
								}), (0, b.jsxs)(I.$_,
								{
									children: [(0, b.jsx)(I.Lw,
									{
										className: "bold",
										onClick: function()
										{
											d()
										},
										children: i.Z.cancel[r]
									}), (0, b.jsx)(I.AZ,
									{
										className: "bold",
										disabled: l.length < 1,
										onClick: function()
										{
											o("M_REPORT", l), d()
										},
										children: i.Z.confirm[r]
									})]
								})]
							})]
						})
					})
				},*/
				en = n(3162),
				eo = function(e)
				{
					var t, n, r, l = e.show,
						u = e.handleShow,
						h = e.board,
						m = (0, c.T)(),
						p = (0, c.C)(function(e)
						{
							return e.global.lang
						}),
						f = (0, s.vC)(
						{
							fixedCacheKey: "account"
						}),
						_ = (0, o.Z)(f, 2),
						g = (_[0], _[1]),
						y = (0, s.ej)(),
						E = (0, o.Z)(y, 1)[0],
						w = (0, s.TR)(),
						j = (0, o.Z)(w, 1)[0],
						T = (0, d.useRouter)(),
						v = (t = (0, V.Z)(Q().mark(function e()
						{
							var t, n, o, r;
							return Q().wrap(function(e)
							{
								for(;;) switch (e.prev = e.next)
								{
									case 0:
										return e.next = 2, E(h.M_PATH);
									case 2:
										if("data" in (t = e.sent))
										{
											e.next = 5;
											break
										}
										return e.abrupt("return");
									case 5:
										return o = [JSON.stringify(n = t.data)], e.next = 9, (0, a.rU)(o);
									case 9:
										r = e.sent, (0, en.saveAs)(r, "MoeTalk_".concat(n[0].title, ".png"));
									case 11:
									case "end":
										return e.stop()
								}
							}, e)
						})), function()
						{
							return t.apply(this, arguments)
						}),
						N = (n = (0, V.Z)(Q().mark(function e()
						{
							var t, n;
							return Q().wrap(function(e)
							{
								for(;;) switch (e.prev = e.next)
								{
									case 0:
										if(!((null === (t = g.data) || void 0 === t ? void 0 : t.MEMBER_NO) !== h.MEMBER_NO))
										{
											e.next = 2;
											break
										}
										return e.abrupt("return");
									case 2:
										return m((0, S.jh)(!0)), e.next = 5, j(
										{
											BOARD_NO: h.BOARD_NO,
											MEMBER_NO: (null === (n = g.data) || void 0 === n ? void 0 : n.MEMBER_NO) || 0,
											STATUS: 2
										});
									case 5:
										m((0, S.jh)(!1)), u(!1);
									case 7:
									case "end":
										return e.stop()
								}
							}, e)
						})), function()
						{
							return n.apply(this, arguments)
						}),
						C = (r = (0, V.Z)(Q().mark(function e(t)
						{
							var n, o;
							return Q().wrap(function(e)
							{
								for(;;) switch (e.prev = e.next)
								{
									case 0:
										if(!((null === (n = g.data) || void 0 === n ? void 0 : n.MEMBER_NO) !== h.MEMBER_NO))
										{
											e.next = 2;
											break
										}
										return e.abrupt("return");
									case 2:
										return m((0, S.jh)(!0)), e.next = 5, j(
										{
											BOARD_NO: h.BOARD_NO,
											MEMBER_NO: (null === (o = g.data) || void 0 === o ? void 0 : o.MEMBER_NO) || 0,
											M_TYPE: t
										});
									case 5:
										m((0, S.jh)(!1)), u(!1), T.push(player);
									case 8:
									case "end":
										return e.stop()
								}
							}, e)
						})), function(e)
						{
							return r.apply(this, arguments)
						});
					return (0, b.jsx)(I.Xf,
					{
						className: l ? "visible medium" : "medium",
						onDoubleClick: function()
						{
							u(!1)
						},
						children: (0, b.jsxs)(I.F0,
						{
							onDoubleClick: function(e)
							{
								return e.stopPropagation(), !1
							},
							children: [(0, b.jsxs)(I.h4,
							{
								children: [(0, b.jsx)(I.Dx,
								{
									className: "bold",
									children: `${h.name} ${e.index+1}`
									//children: i.Z.setting[p]
								}), (0, b.jsx)(I.ec,
								{
									onClick: function()
									{
										u(!1)
									},
									children: (0, b.jsx)(x.j4,
									{})
								})]
							}), (0, b.jsx)(I.$0,
							{
								children: [(0, b.jsxs)(er,
								{
									children: [(0, b.jsxs)(ei,
									{
										children: [(0, b.jsx)(ec,
										{
											onClick: function()
											{
												if(isNaN(e.index+1))return;
												$$('.dDBXxQ').show()
												fetch(`${href}${LibraryURL}/${h.authorid}/${h.bookid}/${h.chapter[e.index]}.json`).then(function(response)
												{
													return response.json();
												}).then(function(data)
												{
													u(!1)
													data = loaddata(data,'palyer','arr')[1]
													nowChapter[0] = e.index
													nowChapter[1] = h
													let playChat = 
													{
														nowChats: [],
														replyDepth: 0,
														chats: data,
														chatSpeed: (0, a.zP)(),
														header: data[0],
														board_no: 0
													}
													$$('.dDBXxQ').hide()
													m((0, ee.Fe)(playChat))
													m((0, S.Cz)(!0))
													$$('.nowChapter').text(`${h.name}_${e.index+1}：${h.chapter[e.index]}`)
												});
											},
											children: (0, b.jsx)(x.xL,
											{
												icon: B.iiS
											})
										}), (0, b.jsx)(ea,
										{
											style:
											{
												marginTop: "0.5rem"
											},
											children: i.Z.play[p]
										})]
									})]
								}), (0, b.jsx)(H,
								{
									style:
									{
										marginTop: "0.5rem"
									},
									children: '转载已获作者授权'
								})]
							})]
						})
					})
				},
				er = g.ZP.div.withConfig(
				{
					displayName: "PopupTalkSetting__Body",
					componentId: "sc-1aqo1uc-0"
				})(["display:flex;justify-content:space-around;"]),
				ei = g.ZP.div.withConfig(
				{
					displayName: "PopupTalkSetting__Ibox",
					componentId: "sc-1aqo1uc-1"
				})(["display:flex;flex-direction:column;align-items:center;text-align:center;margin:0.8rem 0rem;width:6.5rem;"]),
				ea = g.ZP.span.withConfig(
				{
					displayName: "PopupTalkSetting__FontSpan",
					componentId: "sc-1aqo1uc-2"
				})(["display:table-cell;display:block;font-size:1rem;line-height:2rem;color:rgb(111,119,127);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;"]),
				ec = (0, g.ZP)(x.hU).withConfig(
				{
					displayName: "PopupTalkSetting__SettingButton",
					componentId: "sc-1aqo1uc-3"
				})(["width:2.5rem;height:2.5rem;color:", ";"], function(e)
				{
					return e.theme.color.rgb45_70_100
				}),
				el = function(e)
				{
					var t, n, r, l = e.board,
						h = e.show,
						m = e.changeOption,
						p = (0, c.T)(),
						f = (0, c.C)(function(e)
						{
							return e.global.lang
						}),
						Y = (0, u.useState)(!1),
						A = Y[0],
						L = Y[1];
					return (0, b.jsxs)(ed,
					{
						style: h ?
						{
							maxHeight: "11rem",
							overflow: 'scroll',
							flexDirection: 'row'
						} :
						{
							maxHeight: "0"
						},
						children: [(0, b.jsxs)(eu,
						{
							children: [(0, b.jsxs)(eh,
							{
								children: (0, b.jsxs)("a",
								{
									style:
									{
										color: "rgb(48, 150, 245)",
										cursor: "pointer"
									},
									children: '【作者主页】',
									href: l.home,
									target: '_blank'
								})
							}), l.chapter.map(function(v,k)
							{
								return (0, b.jsxs)(eh,
								{
									children: [(0, b.jsx)(ep,
									{
										onClick: function()
										{
											$$('.nowChapter').text('')
											L([!0,k])
											let playChat = 
											{
												nowChats: [],
												replyDepth: 0,
												chats: [],
												chatSpeed: (0, a.zP)(),
												header: {},
												board_no: 0
											}
											p((0, ee.Fe)(playChat))
											p((0, S.Cz)(!0))
										},
										style: 
										{
											width: '1rem',
											height: '1rem',
											marginRight: '1rem'
										},
										children: (0, b.jsx)(x.xL,
										{
											icon: B.iiS
										})
									}),`${k+1}. ${v}`]
								})
							})]
						}), (0, b.jsx)(eo,
						{
							show: A[0],
							index: A[1],
							board: l,
							handleShow: function(e)
							{
								L(e)
							}
						})]
					})
				},
				es = g.ZP.div.withConfig(
				{
					displayName: "TalkInfo__Flex",
					componentId: "sc-t2x262-0"
				})(["display:flex;"]),
				ed = (0, g.ZP)(es).withConfig(
				{
					displayName: "TalkInfo__ProfileText",
					componentId: "sc-t2x262-1"
				})(["flex-direction:column;justify-content:space-around;width:100%;margin:0;font-size:1.1rem;color:rgb(68,72,78);transition:max-height 0.5s ease-in-out;overflow:hidden;"]),
				eu = g.ZP.div.withConfig(
				{
					displayName: "TalkInfo__FontDiv",
					componentId: "sc-t2x262-2"
				})(["display:table;width:100%;table-layout:fixed;white-space:nowrap;"]),
				eh = g.ZP.span.withConfig(
				{
					displayName: "TalkInfo__FontSpan",
					componentId: "sc-t2x262-3"
				})(["display:table-cell;display:block;font-size:1rem;color:rgb(111,119,127);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;line-height:1.5rem;"]),
				em = (0, g.ZP)(es).withConfig(
				{
					displayName: "TalkInfo__Ibox",
					componentId: "sc-t2x262-4"
				})(["flex-direction:column;align-items:center;text-align:center;margin:0.8rem 0rem;width:6.5rem;"]),
				ep = (0, g.ZP)(x.hU).withConfig(
				{
					displayName: "TalkInfo__ActionButton",
					componentId: "sc-t2x262-5"
				})(["width:2.5rem;height:2.5rem;color:", ";"], function(e)
				{
					return e.theme.color.rgb45_70_100
				}),
				ef = function(e)
				{
					var t, n, r = e.board,
						l = e.selected,
						d = e.setSelected,
						h = e.isTalk,
						m = e.setIsTalk,
						p = e.changeOption,
						f = (0, c.T)(),
						_ = (0, c.C)(function(e)
						{
							return e.playChat
						}),
						g = (0, c.C)(function(e)
						{
							return e.global.lang
						}),
						y = (0, u.useState)(!1),
						E = y[0],
						w = y[1],
						j = (0, s.ej)(),
						T = (0, o.Z)(j, 1)[0],
						v = (0, s.$X)(),
						N = (0, o.Z)(v, 1)[0];
					return (0, b.jsxs)(b.Fragment,
					{
						children: [(0, b.jsxs)(e_,
						{
							children: [(0, b.jsx)(eg,
							{
								onClick: function()
								{
									d(l === r ? null : r)
								},
								children: (0, b.jsxs)("div",
								{
									style:
									{
										display: "flex",
										width: "100%"
									},
									children: [(0, b.jsxs)(ex,
									{
										children: [(0, b.jsx)("h2",
										{
											children: (0, b.jsx)(ew,
											{
												className: "bold",
												children: (0, b.jsxs)(ey,
												{
													children: r.name
												})
											})
										}), (0, b.jsx)(ew,
										{
											children: (0, b.jsxs)(eb,
											{
												children: [i.Z.writer[g], " : ", (0, b.jsx)("span",{children: r.author})]
											})
										})]
									})]
								})
							}), (0, b.jsx)(ej,
							{
								onClick: function()
								{
									$$('.nowChapter').text('')
									w([!0,0])
									let playChat = 
									{
										nowChats: [],
										replyDepth: 0,
										chats: [],
										chatSpeed: (0, a.zP)(),
										header: {},
										board_no: 0
									}
									f((0, ee.Fe)(playChat))
									f((0, S.Cz)(!0))
								},
								children: (0, b.jsx)(x.xL,
								{
									icon: B.iiS
								})
							})]
						}), (0, b.jsxs)("div",
						{
							style:
							{
								padding: "0rem 1rem"
							},
							children: [(0, b.jsx)(el,
							{
								board: r,
								show: l === r,
								changeOption: p
							}), (0, b.jsx)(eE,
							{})]
						}), (0, b.jsx)(eo,
						{
							show: E[0],
							index: E[1],
							board: r,
							handleShow: function()
							{
								w(!1)
							}
						})]
					})
				},
				e_ = g.ZP.div.withConfig(
				{
					displayName: "Talk__Wrapper",
					componentId: "sc-1340qk3-0"
				})(["display:flex;height:auto;width:100%;position:relative;"]),
				eg = g.ZP.div.withConfig(
				{
					displayName: "Talk__CContainer",
					componentId: "sc-1340qk3-1"
				})(["display:flex;padding:1rem;justify-content:space-between;width:100%;cursor:pointer;&:hover{background-color:", ";}&:active{background-color:", ";}"], function(e)
				{
					return e.theme.color.rgb218_228_233
				}, function(e)
				{
					return e.theme.color.rgb202_215_221
				}),
				ex = g.ZP.div.withConfig(
				{
					displayName: "Talk__ProfileText",
					componentId: "sc-1340qk3-2"
				})(["display:flex;flex-direction:column;justify-content:space-around;width:100%;margin:0 0 0 1rem;padding-right:3rem;font-size:1.1rem;color:", ";"], function(e)
				{
					return e.theme.color.rgb68_72_78
				}),
				ey = g.ZP.span.withConfig(
				{
					displayName: "Talk__FontSpan",
					componentId: "sc-1340qk3-3"
				})(["display:table-cell;display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;line-height:2rem;"]),
				eb = (0, g.ZP)(ey).withConfig(
				{
					displayName: "Talk__FontSpan2",
					componentId: "sc-1340qk3-4"
				})(["font-size:1rem;color:", ";"], function(e)
				{
					return e.theme.color.rgb111_119_127
				}),
				eE = g.ZP.hr.withConfig(
				{
					displayName: "Talk__HR",
					componentId: "sc-1340qk3-5"
				})(["border:0;height:1px;background:", ";width:100%;margin:0px;"], function(e)
				{
					return e.theme.color.rgb218_225_229
				}),
				ew = g.ZP.div.withConfig(
				{
					displayName: "Talk__FontDiv",
					componentId: "sc-1340qk3-6"
				})(["display:table;width:90%;table-layout:fixed;white-space:nowrap;"]),
				ej = (0, g.ZP)(x.hU).withConfig(
				{
					displayName: "Talk__PlayButton",
					componentId: "sc-1340qk3-7"
				})(["position:absolute;right:1rem;top:1.8rem;width:2.5rem;color:", ";"], function(e)
				{
					return e.theme.color.rgb45_70_100
				}),
				eT = function(e)
				{
					var t, n = e.ssrBoard,
						l = (0, c.C)(function(e)
						{
							return e.global.isMobile
						}),
						s = (0, c.C)(function(e)
						{
							return e.global.lang
						}),
						d = h(
						{
							ssrBoard: n
						}),
						m = (0, o.Z)(d, 4),
						f = m[0],
						_ = m[1],
						g = m[2],
						xx = m[3],
						y = (0, u.useState)(!1),
						T = y[0],
						v = y[1],
						N = (0, u.useState)(null),
						C = N[0],
						O = N[1],
						P = (0, u.useState)([]),
						M = P[0],
						S = P[1],
						B = (0, u.useState)(0),
						ZZ = B[0],
						I = B[1],
						R = (0, u.useRef)(null),
						Y = (null == R ? void 0 : null === (t = R.current) || void 0 === t ? void 0 : t.clientHeight) || 0;
					(0, u.useEffect)(function()
					{
						2 === g.C_TYPE && setTimeout(function()
						{
							S(r.Z), I(6 * parseInt(document.documentElement.style.fontSize.replace("px", "")) || 0)
						}, 500)
					}, [g.C_TYPE, l]);
					var A = (0, a.sk)(g.M_TYPE).replace(/^[a-z]/, function(e)
					{
						return e.toUpperCase()
					});

					return (0, b.jsxs)(ev,
					{
						children: [_ && (0, b.jsxs)(p(),
						{
							children: [(0, b.jsx)("title",
							{
								children: A
							}), (0, b.jsx)("meta",
							{
								name: "description",
								content: "This is the MoeTalk ".concat(A, " Page. (몰루톡/モルトーク)")
							}), (0, b.jsx)("meta",
							{
								property: "og:title",
								content: A
							}), (0, b.jsx)("meta",
							{
								property: "og:image",
								content: "https://moetalk-ggg555ttt-57a86c1abdf06b5ebe191f38161beddd1d0768c27e1a2.gitlab.io/Images/Ui/Favor_Schedule_Deco.webp"
							}), (0, b.jsx)("meta",
							{
								property: "og:description",
								content: "This is the MoeTalk ".concat(A, " Page. (몰루톡/モルトーク)")
							}), (0, b.jsx)("meta",
							{
								name: "twitter:title",
								content: A
							}), (0, b.jsx)("meta",
							{
								name: "twitter:description",
								content: "This is the MoeTalk ".concat(A, " Page. (몰루톡/モルトーク)")
							}), (0, b.jsx)("meta",
							{
								name: "twitter:image",
								content: "https://moetalk-ggg555ttt-57a86c1abdf06b5ebe191f38161beddd1d0768c27e1a2.gitlab.io/Images/Ui/Favor_Schedule_Deco.webp"
							})]
						}), (0, b.jsx)(F,
						{
							option: g,
							characterList: r.Z,
							handleSelectList: function(e)
							{
								S(e)
							},
							rowCount: f && f[0] ? f[0].COUNT : 0,
							changeOption: xx
						}), (0, b.jsxs)(eN,
						{
							children: [(0, b.jsx)("div",
							{
								ref: R,
								style:
								{
									display: 2 !== g.C_TYPE || g.CONTENT ? "none" : "block",
									width: "100%",
									height: "100%"
								},
								children: (0, b.jsx)(w.Z,
								{
									rowHeight: ZZ,
									clientHeight: Y,
									selected: void 0,
									listArr: M.filter(function(e)
									{
										return 0 !== g.M_TYPE || e.momotalk
									}).map(function(e, t)
									{
										return (0, b.jsx)(j,
										{
											character: e,
											option: g,
											changeOption: xx
										}, t)
									})
								})
							}), (0, b.jsx)("div",
							{
								style:
								{
									//display: f && f.length > 0 && !(2 === g.C_TYPE && !g.CONTENT) ? "block" : "none",
									display: "block",
									width: "100%",
									height: "auto"
								},
								//children: null == f ? void 0 : f.map(function(e, t)
								
								children: directory.map(function(e, t)
								{
									return (0, b.jsx)(ef,
									{
										board: e,
										selected: C,
										setSelected: function(e)
										{
											O(e)
										},
										isTalk: T,
										changeOption: xx,
										setIsTalk: function(e)
										{
											v(e)
										}
									}, t)
								})
							}), (0, b.jsxs)("div",
							{
								style:
								{
									display: "flex",
									margin: "auto",
									flexDirection: "column",
									alignItems: "center"
								},
								children: [ (0, b.jsx)("span",
								{
									children: ['点击',(0, b.jsx)(ep,
									{
										style: 
										{
											width: '1rem',
											height: '1rem',
										},
										children: (0, b.jsx)(x.xL,
										{
											icon: Z.cf$
										}),
										onClick: function()
										{
											$$('[title="MakingFile Upload"]').click()
										}
									}),'上传存档']//#
								}), (0, b.jsx)("span",
								{
									style:
									{
										whiteSpace: 'break-spaces',
										textAlign: 'center'
									},
									children: '（支持ClosureTalk存档）\n作品收录条件：无明显违规或争议内容\n您可以在交流群或反馈页面向我提交您的作品\n推荐带上您的主页和昵称'
								})]//#
							}, "noSearch"), 2 === g.C_TYPE && !g.CONTENT || (0, b.jsx)(k.Z,
							{
								rowCount: f && f[0] ? f[0].COUNT : 0,
								option: g,
								changeOption: xx
							}), (0, b.jsx)(E,
							{
								show: !0
							})]
						})]
					})
				},
				ev = g.ZP.div.withConfig(
				{
					displayName: "LeftScreen__Container",
					componentId: "sc-1whfk05-0"
				})(["display:flex;flex-direction:column;width:100%;min-height:100%;height:100%;background-color:", ";border-right:2px solid ", ";min-width:340px;@media screen and (max-width:768px){min-width:100vw;}"], function(e)
				{
					return e.theme.color.rgb243_247_248
				}, function(e)
				{
					return e.theme.color.rgb230_233_235
				}),
				eN = g.ZP.div.withConfig(
				{
					displayName: "LeftScreen__CContainer",
					componentId: "sc-1whfk05-1"
				})(["width:100%;height:100%;display:flex;flex-direction:column;overflow-y:scroll !important;"]),
				eC = (0, g.ZP)(_()).withConfig(
				{
					displayName: "LeftScreen__Img",
					componentId: "sc-1whfk05-2"
				})(["width:80%;height:auto;max-width:250px;margin:5rem 1rem 1rem 0;"])
		},
		8453: function(e, t, n)
		{
			Object.defineProperty(t, "__esModule",
			{
				value: !0
			}), t.default = void 0;
			var o = function(e)
			{
				if(e && e.__esModule) return e;
				if(null === e || "object" != typeof e && "function" != typeof e) return {
					default: e
				};
				var t = r();
				if(t && t.has(e)) return t.get(e);
				var n = {},
					o = Object.defineProperty && Object.getOwnPropertyDescriptor;
				for(var i in e)
					if(Object.prototype.hasOwnProperty.call(e, i))
					{
						var a = o ? Object.getOwnPropertyDescriptor(e, i) : null;
						a && (a.get || a.set) ? Object.defineProperty(n, i, a) : n[i] = e[i]
					} return n.default = e, t && t.set(e, n), n
			}(n(7294));

			function r()
			{
				if("function" != typeof WeakMap) return null;
				var e = new WeakMap;
				return r = function()
				{
					return e
				}, e
			}
			let i = e => ((0, o.useEffect)(() =>
			{
				window && (window.adsbygoogle = window.adsbygoogle || []).push(
				{})
			}), o.default.createElement("ins",
			{
				className: `adsbygoogle ${e.className}`,
				style: e.style,
				"data-ad-client": e.adClient,
				"data-ad-slot": e.adSlot,
				"data-ad-layout": e.adLayout,
				"data-ad-layout-key": e.adLayoutKey,
				"data-ad-format": e.adFormat,
				"data-full-width-responsive": e.fullWidthResponsive
			}));
			i.defaultProps = {
				className: "",
				style:
				{
					display: "block"
				},
				adLayout: "",
				adLayoutKey: "",
				adFormat: "auto",
				fullWidthResponsive: "false"
			}, t.default = i
		},
		210: function(e, t, n)
		{
			var o;
			((o = n(8453)) && o.__esModule ? o :
			{
				default: o
			}).default
		}
	}
]);