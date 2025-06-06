(self.webpackChunk_N_E = self.webpackChunk_N_E || [])
.push([
	[621],
	{
		5654: function(e, t, n)
		{
			"use strict";
			var r = n(4701),
				i = n(6150),
				o = n(1563),
				c = n(9417),
				l = n(7294),
				s = n(9521),
				a = n(5893);
			t.Z = function(e)
			{
				var t = e.items,
					n = e.selected,
					s = e.setSelected,
					p = (0, l.useState)(!1),
					f = p[0],
					g = p[1],
					x = (0, l.useState)(""),
					y = x[0],
					j = x[1],
					b = (0, i.C)(function(e)
					{
						return e.global.lang
					}),
					w = [];
				return (0, l.useEffect)(function()
				{
					f ? j("") : j(n.title)
				}, [f, n, j]), (0, a.jsx)(u,
				{
					children: (0, a.jsxs)("div",
					{
						style:
						{
							position: "relative",
							width: "100%"
						},
						children: [(0, a.jsxs)(o.OP,
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
								g(!0)
							},
							children: [(0, a.jsx)(o.Kx,
							{
								className: "medium",
								style:
								{
									padding: "0",
									overflow: "hidden"
								},
								placeholder: r.Z.filter_selectBox[b],
								maxRows: 1,
								value: y,
								maxLength: 20,
								onChange: function(e)
								{
									!f || e.currentTarget.value.match("\n") || j(e.currentTarget.value)
								}
							}), (0, a.jsx)(o.xL,
							{
								style:
								{
									width: "0.7rem",
									margin: "0 0 0 0.2rem"
								},
								icon: f ? c.l1h : c.eW2
							})]
						}), (0, a.jsx)(m,
						{
							style:
							{
								display: f ? "block" : "none"
							},
							children: w.map(function(e, t)
							{
								return (0, a.jsx)("li",
								{
									children: (0, a.jsx)(d,
									{
										className: e.no === n.no ? "medium selected" : "medium",
										onClick: function()
										{
											s(e), g(!1)
										},
										children: e.title || "-"
									})
								}, t)
							})
						}), (0, a.jsx)(h,
						{
							style:
							{
								display: f ? "block" : "none"
							},
							onClick: function()
							{
								g(!1)
							}
						})]
					})
				})
			};
			var u = s.ZP.div.withConfig(
				{
					displayName: "SelectBox__Container",
					componentId: "sc-1p70i56-0"
				})(["width :100%;"]),
				m = s.ZP.ul.withConfig(
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
				d = (0, s.ZP)(o.zx)
				.withConfig(
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
				h = s.ZP.div.withConfig(
				{
					displayName: "SelectBox__BG",
					componentId: "sc-1p70i56-3"
				})(["position:fixed;top:0;left:0;width:100%;height:100%;z-index:1;"])
		},
		1524: function(e, t, n)
		{
			"use strict";
			n.r(t), n.d(t,
			{
				default: function()
				{
					return eS
				}
			});
			var r = n(5615),
				i = n(6150),
				o = n(8586),
				c = n(1563),
				l = n(9417),
				s = n(7294),
				a = n(9521),
				u = n(5893),
				m = function()
				{
					var e = (0, i.C)(function(e)
						{
							return e.global.isMobile
						}),
						t = (0, i.C)(function(e)
						{
							return e.global.isRight
						}),
						n = (0, i.T)();
					return (0, u.jsx)(d,
					{
						children: (0, u.jsxs)(h,
						{
							style:
							{
								justifyContent: "space-between",
								width: "100%",
								position: "relative"
							},
							children: [(0, u.jsx)(h,
							{
								style:
								{
									margin: "auto 1rem"
								},
								children: (0, u.jsx)(p,
								{
									style: e && t ?
									{} :
									{
										display: "none"
									},
									onClick: function()
									{
										n((0, o.Cz)(!1))
									},
									children: (0, u.jsx)(f,
									{
										icon: l.EyR
									})
								})
							}), (0, u.jsx)(h,
							{
								style:
								{
									margin: "auto 1rem"
								},
								children: (0, u.jsx)(p,
								{
									style: e && !t ?
									{} :
									{
										display: "none"
									},
									onClick: function()
									{
										n((0, o.Cz)(!0))
									},
									children: (0, u.jsx)(f,
									{
										icon: l.yOZ
									})
								})
							})]
						})
					})
				},
				d = a.ZP.div.withConfig(
				{
					displayName: "Footer__Container",
					componentId: "sc-19y0rgz-0"
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
				h = a.ZP.div.withConfig(
				{
					displayName: "Footer__Flex",
					componentId: "sc-19y0rgz-1"
				})(["", ";position:relative;width:auto;"], function(e)
				{
					return e.theme.common.flexBox(
					{})
				}),
				p = (0, a.ZP)(c.hU)
				.withConfig(
				{
					displayName: "Footer__Circlebutton",
					componentId: "sc-19y0rgz-2"
				})(["border:2px solid white;border-radius:50%;height:3rem;width:3rem;display:flex;align-items:center;justify-content:center;&:hover{background-color:", ";}"], function(e)
				{
					return e.theme.color.rgb61_75_92
				}),
				f = (0, a.ZP)(c.xL)
				.withConfig(
				{
					displayName: "Footer__StyledIcon2",
					componentId: "sc-19y0rgz-3"
				})(["height:1.5rem;width :1.5rem;color:", ";"], function(e)
				{
					return e.theme.color.rgb255_255_255
				}),
				g = n(7812),
				x = n(9499),
				y = n(8024),
				j = n(4701),
				b = n(3380),
				w = n(7792),
				v = n(4288),
				_ = n(1163);

			function C(e, t)
			{
				var n = Object.keys(e);
				if(Object.getOwnPropertySymbols)
				{
					var r = Object.getOwnPropertySymbols(e);
					t && (r = r.filter(function(t)
					{
						return Object.getOwnPropertyDescriptor(e, t)
							.enumerable
					})), n.push.apply(n, r)
				}
				return n
			}

			function P(e)
			{
				for(var t = 1; t < arguments.length; t++)
				{
					var n = null != arguments[t] ? arguments[t] :
					{};
					t % 2 ? C(Object(n), !0)
						.forEach(function(t)
						{
							(0, x.Z)(e, t, n[t])
						}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : C(Object(n))
						.forEach(function(t)
						{
							Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
						})
				}
				return e
			}
			var O = function(e)
				{
					var t, n, r = e.playlist,
						o = (0, i.T)(),
						l = (0, i.C)(function(e)
						{
							return e.global.lang
						}),
						s = (0, i.C)(function(e)
						{
							return e.music
						}),
						a = (0, i.C)(function(e)
						{
							return e.music.playlists
						}),
						m = (0, i.C)(function(e)
						{
							return e.music.isRandom
						}),
						d = (0, _.useRouter)(),
						h = function()
						{
							var e = r.musics;
							m && (e = (0, b.Sy)(e));
							var t = {
								musics: e,
								musicNo: e[0],
								playlistNo: r.no,
								isPlaying: !0
							};
							o((0, w.eY)(t)), localStorage.setItem("music", JSON.stringify(P(P(
							{}, s), t)))
						},
						p = function()
						{
							var e = a.filter(function(e)
							{
								return e.no !== r.no
							});
							o((0, w.XX)(e)), localStorage.setItem("music", JSON.stringify(P(P(
							{}, s),
							{},
							{
								playlists: e
							})))
						};
					return (0, u.jsx)(Z,
					{
						children: (0, u.jsxs)(S,
						{
							children: [(0, u.jsxs)(N,
							{
								onClick: function()
								{
									d.push("/music/playlist?no=".concat(r.no))
								},
								children: [(0, u.jsx)("h2",
								{
									children: (0, u.jsx)(B,
									{
										className: "bold",
										children: (0, u.jsx)(k,
										{
											children: r.title
										})
									})
								}), (0, u.jsx)(B,
								{
									children: (0, u.jsxs)(I,
									{
										children: [j.Z.music_count[l], " : ", (null === (t = r.musics) || void 0 === t ? void 0 : t.length) || 0]
									})
								})]
							}), (0, u.jsx)(z,
							{
								style:
								{
									right: "4rem"
								},
								disabled: null === (n = r.musics) || void 0 === n || !n.length,
								onClick: function(e)
								{
									h()
								},
								children: (0, u.jsx)(c.xL,
								{
									icon: v.iiS
								})
							}), (0, u.jsx)(z,
							{
								disabled: 0 === r.no,
								onClick: function(e)
								{
									p()
								},
								children: (0, u.jsx)(c.xL,
								{
									icon: v.WA2
								})
							}), (0, u.jsx)(L,
							{})]
						})
					})
				},
				Z = a.ZP.div.withConfig(
				{
					displayName: "PlayListItem__Container",
					componentId: "sc-1vnktdz-0"
				})(["", " word-break:keep-all;height:100%;background-color:", ";&.selected{background-color:", ";}&:hover{background-color:", ";}"], function(e)
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
					return e.theme.color.rgb202_215_221
				}, function(e)
				{
					return e.theme.color.rgb218_228_233
				}),
				S = a.ZP.div.withConfig(
				{
					displayName: "PlayListItem__Wrapper",
					componentId: "sc-1vnktdz-1"
				})(["display:flex;flex-direction:column;width:100%;height:100%;box-sizing:border-box;"]),
				N = a.ZP.div.withConfig(
				{
					displayName: "PlayListItem__TextWrapper",
					componentId: "sc-1vnktdz-2"
				})(["display:flex;flex-direction:column;justify-content:center;width:100%;height:100%;padding:0 7rem 0 1rem;font-size:1.1rem;color:", ";"], function(e)
				{
					return e.theme.color.rgb68_72_78
				}),
				k = a.ZP.li.withConfig(
				{
					displayName: "PlayListItem__FontSpan",
					componentId: "sc-1vnktdz-3"
				})(["display:table-cell;display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;line-height:2rem;"]),
				I = (0, a.ZP)(k)
				.withConfig(
				{
					displayName: "PlayListItem__FontSpan2",
					componentId: "sc-1vnktdz-4"
				})(["font-size:1rem;color:", ";"], function(e)
				{
					return e.theme.color.rgb111_119_127
				}),
				L = a.ZP.hr.withConfig(
				{
					displayName: "PlayListItem__HR",
					componentId: "sc-1vnktdz-5"
				})(["border:0;height:1px;background:", ";width:100%;margin:0px;"], function(e)
				{
					return e.theme.color.rgb218_225_229
				}),
				B = a.ZP.div.withConfig(
				{
					displayName: "PlayListItem__FontDiv",
					componentId: "sc-1vnktdz-6"
				})(["display:table;width:90%;table-layout:fixed;white-space:nowrap;"]),
				z = (0, a.ZP)(c.hU)
				.withConfig(
				{
					displayName: "PlayListItem__PlayButton",
					componentId: "sc-1vnktdz-7"
				})(["position:absolute;right:1rem;top:1.2rem;width:2.5rem;color:", ";"], function(e)
				{
					return e.theme.color.rgb45_70_100
				}),
				D = n(7579),
				T = n(4685),
				E = n(5654);

			function R(e, t)
			{
				var n = Object.keys(e);
				if(Object.getOwnPropertySymbols)
				{
					var r = Object.getOwnPropertySymbols(e);
					t && (r = r.filter(function(t)
					{
						return Object.getOwnPropertyDescriptor(e, t)
							.enumerable
					})), n.push.apply(n, r)
				}
				return n
			}

			function F(e)
			{
				for(var t = 1; t < arguments.length; t++)
				{
					var n = null != arguments[t] ? arguments[t] :
					{};
					t % 2 ? R(Object(n), !0)
						.forEach(function(t)
						{
							(0, x.Z)(e, t, n[t])
						}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : R(Object(n))
						.forEach(function(t)
						{
							Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
						})
				}
				return e
			}
			var A = Array.from(new Set(D.Z.map(function(e)
				{
					return e.album
				}))),
				M = Array.from(new Set(D.Z.map(function(e)
					{
						return e.artist
					})
					.flat())),
				X = function(e)
				{
					var t = e.show,
						n = e.hide,
						r = (0, i.C)(function(e)
						{
							return e.global.lang
						}),
						o = (0, i.C)(function(e)
						{
							return e.music
						}),
						l = (0, i.C)(function(e)
						{
							return e.music.playlists
						}),
						a = (0, i.T)(),
						m = (0, s.useState)(""),
						d = m[0],
						h = m[1],
						p = (0, s.useState)(""),
						f = p[0],
						x = p[1],
						y = (0, s.useState)(0),
						b = y[0],
						v = y[1],
						_ = (0, s.useState)([]),
						C = _[0],
						P = _[1];
					(0, s.useEffect)(function()
					{
						2 === b ? P([]) : x("")
					}, [b]);
					var O = function()
						{
							var e, t = [];
							if(2 === b) f.split("&")
								.forEach(function(e)
								{
									e.match("musics") && (t = Array.from(new Set(e.split("=")[1].split(",")
										.map(function(e)
										{
											return parseInt(e)
										}))))
								});
							else
							{
								var n = C.map(function(e)
								{
									return 0 === e.option ? D.Z.filter(function(t)
										{
											return t.artist.toString()
												.match(e.title)
										})
										.map(function(e)
										{
											return e.no
										}) : D.Z.filter(function(t)
										{
											return t.album === e.title
										})
										.map(function(e)
										{
											return e.no
										})
								});
								t = Array.from(new Set(n.flat()))
							}
							var r = [].concat((0, g.Z)(l), [
							{
								no: (null == l ? void 0 : null === (e = l.slice(-1)[0]) || void 0 === e ? void 0 : e.no) + 1 || 1,
								musics: t,
								title: d.trim()
							}]);
							a((0, w.XX)(r)), localStorage.setItem("music", JSON.stringify(F(F(
							{}, o),
							{},
							{
								playlists: r
							}))), h("")
						},
						Z = function(e, t)
						{
							var n = C.filter(function(n)
							{
								return n.title !== e || n.option !== t
							});
							n.length === C.length ? P(function(n)
							{
								return [].concat((0, g.Z)(n), [
								{
									title: e,
									option: t
								}])
							}) : P(n)
						};
					return (0, u.jsx)(T.Xf,
					{
						className: t ? "visible medium" : "medium",
						onDoubleClick: function()
						{
							n()
						},
						children: (0, u.jsxs)(T.F0,
						{
							onDoubleClick: function(e)
							{
								e.stopPropagation()
							},
							children: [(0, u.jsxs)(T.h4,
							{
								children: [(0, u.jsx)(T.Dx,
								{
									className: "bold",
									children: j.Z.add_playlist[r]
								}), (0, u.jsx)(T.ec,
								{
									onClick: function()
									{
										n()
									},
									children: (0, u.jsx)(c.j4,
									{})
								})]
							}), (0, u.jsxs)(T.$0,
							{
								children: [(0, u.jsxs)(H,
								{
									children: [(0, u.jsx)("span",
									{
										children: j.Z.title[r]
									}), (0, u.jsx)(c.II,
									{
										type: "text",
										style:
										{
											marginTop: 0
										},
										value: d,
										maxLength: 20,
										className: "medium",
										placeholder: j.Z.title_comment[r],
										onChange: function(e)
										{
											h(e.currentTarget.value)
										}
									}), (0, u.jsx)("span",
									{
										children: j.Z.preset[r] + " (" + j.Z.option[r] + ")"
									}), (0, u.jsxs)(q,
									{
										children: [(0, u.jsx)("div",
										{
											style:
											{
												display: "flex"
											},
											children: ["artist", "album"].map(function(e, t)
											{
												return (0, u.jsxs)(c.Jg,
												{
													style:
													{
														marginRight: "1rem"
													},
													htmlFor: "preset_".concat(t),
													children: [(0, u.jsx)("input",
													{
														type: "checkbox",
														id: "preset_".concat(t),
														checked: b === t,
														onChange: function()
														{
															v(t)
														},
														value: t + 1
													}), j.Z[e][r]]
												}, t + 1)
											})
										}), (0, u.jsxs)(c.Jg,
										{
											style:
											{
												marginRight: "0.5rem"
											},
											htmlFor: "preset_2",
											children: [(0, u.jsx)("input",
											{
												type: "checkbox",
												id: "preset_2",
												checked: 2 === b,
												onChange: function()
												{
													v(2)
												}
											}), j.Z.url[r]]
										})]
									}), 0 === b ? (0, u.jsx)(E.Z,
									{
										items: M.map(function(e, t)
										{
											return {
												title: e,
												no: t
											}
										}),
										selected:
										{
											title: "",
											no: -1
										},
										setSelected: function(e)
										{
											Z(e.title, 0)
										}
									}) : 1 === b ? (0, u.jsx)(E.Z,
									{
										items: A.map(function(e, t)
										{
											return {
												title: e,
												no: t
											}
										}),
										selected:
										{
											title: "",
											no: -1
										},
										setSelected: function(e)
										{
											Z(e.title, 1)
										}
									}) : 2 === b ? (0, u.jsx)(c.II,
									{
										type: "text",
										style:
										{
											margin: 0
										},
										value: f,
										className: "medium",
										placeholder: j.Z.input_comment[r],
										onChange: function(e)
										{
											x(e.currentTarget.value)
										}
									}) : (0, u.jsx)(u.Fragment,
									{}), (0, u.jsx)(J,
									{
										children: C.map(function(e, t)
										{
											return (0, u.jsx)(W,
											{
												onClick: function()
												{
													Z(e.title, e.option)
												},
												children: e.title
											}, t)
										})
									})]
								}), (0, u.jsxs)(T.$_,
								{
									children: [(0, u.jsx)(T.Lw,
									{
										className: "bold",
										onClick: function()
										{
											n()
										},
										children: j.Z.cancel[r]
									}), (0, u.jsx)(T.AZ,
									{
										disabled: d.length < 1,
										className: "bold",
										onClick: function()
										{
											O(), n()
										},
										children: j.Z.confirm[r]
									})]
								})]
							})]
						})
					})
				},
				H = a.ZP.div.withConfig(
				{
					displayName: "PopupNewPlaylistAdd__Wrapper",
					componentId: "sc-1g0uv3b-0"
				})(["", ";flex-direction:column;align-items:flex-start;line-height:2rem;"], function(e)
				{
					return e.theme.common.flexBox(
					{})
				}),
				q = a.ZP.div.withConfig(
				{
					displayName: "PopupNewPlaylistAdd__CBWrapper",
					componentId: "sc-1g0uv3b-1"
				})(["", ";width:100%;font-size:0.9rem;margin-bottom:0.5rem;"], function(e)
				{
					return e.theme.common.flexBox(
					{
						justify: "space-between"
					})
				}),
				J = a.ZP.div.withConfig(
				{
					displayName: "PopupNewPlaylistAdd__PresetsWrapper",
					componentId: "sc-1g0uv3b-2"
				})(["display:flex;flex-wrap:wrap;"]),
				W = a.ZP.div.withConfig(
				{
					displayName: "PopupNewPlaylistAdd__Preset",
					componentId: "sc-1g0uv3b-3"
				})(["font-size:1rem;padding:0.5rem;line-height:1rem;border:2px solid ", ";border-radius:0.5rem;margin:0.5rem 0.5rem 0 0;background-color:", ";cursor:pointer;"], function(e)
				{
					return e.theme.color.rgb230_233_235
				}, function(e)
				{
					return e.theme.color.rgb255_255_255
				}),
				U = n(83),
				Y = function(e)
				{
					var t = e.search,
						n = e.setSearch,
						r = e.playlistLength,
						o = (0, i.C)(function(e)
						{
							return e.global.lang
						}),
						l = (0, s.useState)(!1),
						a = l[0],
						m = l[1];
					return (0, u.jsxs)($,
					{
						children: [(0, u.jsxs)(G,
						{
							children: [(0, u.jsx)(K,
							{
								className: "bold",
								children: (0, u.jsxs)("h1",
								{
									children: [j.Z.playlist[o] + " ", (0, u.jsxs)("span",
									{
										style:
										{
											fontSize: "1.2rem"
										},
										children: ["(", r, ")"]
									})]
								})
							}), (0, u.jsx)(V,
							{
								style:
								{
									width: "auto"
								},
								children: (0, u.jsx)(Q,
								{
									onClick: function()
									{
										m(!0)
									},
									children: (0, u.jsx)(c.xL,
									{
										icon: v.g6h
									})
								})
							})]
						}), (0, u.jsx)("div",
						{
							style:
							{
								display: "flex",
								width: "100%"
							},
							children: (0, u.jsxs)(V,
							{
								children: [(0, u.jsx)(c.II,
								{
									type: "text",
									value: t.text,
									maxLength: 30,
									className: "medium",
									placeholder: j.Z.search_comment[o],
									onChange: function(e)
									{
										n(
										{
											text: e.currentTarget.value
										})
									}
								}), (0, u.jsx)(c.lR,
								{
									width: 40,
									height: 40,
									style:
									{
										right: "0.5rem"
									},
									onClick: function()
									{
										n(
										{
											text: ""
										})
									},
									src: "/image/ui/searchbar/pen.png",
									alt: "pen"
								})]
							})
						}), (0, u.jsx)(U.HR,
						{
							style:
							{
								height: "2px",
								margin: "0"
							}
						}), (0, u.jsx)(X,
						{
							show: a,
							hide: function()
							{
								m(!1)
							}
						})]
					})
				},
				$ = a.ZP.div.withConfig(
				{
					displayName: "SearchBar__Container",
					componentId: "sc-2mqss4-0"
				})(["", " height:auto;padding:1rem 1rem 0rem 1rem;box-sizing:border-box;"], function(e)
				{
					return e.theme.common.flexBox(
					{
						direction: "column"
					})
				}),
				G = a.ZP.div.withConfig(
				{
					displayName: "SearchBar__Sort",
					componentId: "sc-2mqss4-1"
				})(["", " text-align:center;height:auto;"], function(e)
				{
					return e.theme.common.flexBox(
					{
						justify: "space-between"
					})
				}),
				K = a.ZP.span.withConfig(
				{
					displayName: "SearchBar__FontSpan",
					componentId: "sc-2mqss4-2"
				})(["font-size:1.5rem;color:", ";"], function(e)
				{
					return e.theme.color.rgb63_68_74
				}),
				V = a.ZP.div.withConfig(
				{
					displayName: "SearchBar__Flex",
					componentId: "sc-2mqss4-3"
				})(["", " height:auto;position:relative;"], function(e)
				{
					return e.theme.common.flexBox(
					{})
				}),
				Q = (0, a.ZP)(c.hU)
				.withConfig(
				{
					displayName: "SearchBar__AddButton",
					componentId: "sc-2mqss4-4"
				})(["width:1.8rem;height:2.5rem;color:", ";"], function(e)
				{
					return e.theme.color.rgb63_68_74
				}),
				ee = n(9406);

			function et(e, t)
			{
				var n = Object.keys(e);
				if(Object.getOwnPropertySymbols)
				{
					var r = Object.getOwnPropertySymbols(e);
					t && (r = r.filter(function(t)
					{
						return Object.getOwnPropertyDescriptor(e, t)
							.enumerable
					})), n.push.apply(n, r)
				}
				return n
			}

			function en(e)
			{
				for(var t = 1; t < arguments.length; t++)
				{
					var n = null != arguments[t] ? arguments[t] :
					{};
					t % 2 ? et(Object(n), !0)
						.forEach(function(t)
						{
							(0, x.Z)(e, t, n[t])
						}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : et(Object(n))
						.forEach(function(t)
						{
							Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
						})
				}
				return e
			}
			var er = function(e)
			{
				var t = e.show,
					n = e.hide,
					r = e.playlist,
					o = (0, i.C)(function(e)
					{
						return e.global.lang
					}),
					l = (0, i.C)(function(e)
					{
						return e.music
					}),
					a = (0, i.C)(function(e)
					{
						return e.music.playlists
					}),
					m = (0, i.T)(),
					d = (0, s.useState)(""),
					h = d[0],
					p = d[1],
					f = function()
					{
						var e, t = [].concat((0, g.Z)(a), [
						{
							no: (null == a ? void 0 : null === (e = a.slice(-1)[0]) || void 0 === e ? void 0 : e.no) + 1 || 1,
							musics: r.musics,
							title: h || r.title
						}]);
						m((0, w.XX)(t)), localStorage.setItem("music", JSON.stringify(en(en(
						{}, l),
						{},
						{
							playlists: t
						})))
					};
				return (0, u.jsx)(T.Xf,
				{
					className: t ? "visible medium" : "medium",
					onDoubleClick: function()
					{
						n()
					},
					children: (0, u.jsxs)(T.F0,
					{
						onDoubleClick: function(e)
						{
							e.stopPropagation()
						},
						children: [(0, u.jsxs)(T.h4,
						{
							children: [(0, u.jsx)(T.Dx,
							{
								className: "bold",
								children: j.Z.add_playlist[o]
							}), (0, u.jsx)(T.ec,
							{
								onClick: function()
								{
									n()
								},
								children: (0, u.jsx)(c.j4,
								{})
							})]
						}), (0, u.jsxs)(T.$0,
						{
							children: [(0, u.jsxs)(ei,
							{
								children: [(0, u.jsx)("span",
								{
									children: j.Z.title[o]
								}), (0, u.jsx)(c.II,
								{
									type: "text",
									style:
									{
										marginTop: 0
									},
									value: h,
									maxLength: 20,
									className: "medium",
									placeholder: (null == r ? void 0 : r.title) || j.Z.title_comment[o],
									onChange: function(e)
									{
										p(e.currentTarget.value)
									}
								}), j.Z.music_count[o], (0, u.jsx)(c.II,
								{
									type: "text",
									style:
									{
										marginTop: 0
									},
									value: (null == r ? void 0 : r.musics.length) || 0,
									maxLength: 20,
									readOnly: !0,
									className: "medium"
								})]
							}), (0, u.jsxs)(T.$_,
							{
								children: [(0, u.jsx)(T.Lw,
								{
									className: "bold",
									onClick: function()
									{
										n()
									},
									children: j.Z.cancel[o]
								}), (0, u.jsx)(T.AZ,
								{
									className: "bold",
									onClick: function()
									{
										f(), n()
									},
									children: j.Z.confirm[o]
								})]
							})]
						})]
					})
				})
			};
			a.ZP.div.withConfig(
			{
				displayName: "PopupPlaylistAdd__Flex",
				componentId: "sc-12b6bhl-0"
			})(["", " height:auto;position:relative;font-size:1.2rem;"], function(e)
			{
				return e.theme.common.flexBox(
				{})
			});
			var ei = a.ZP.div.withConfig(
			{
				displayName: "PopupPlaylistAdd__Wrapper",
				componentId: "sc-12b6bhl-1"
			})(["", ";margin-bottom:1rem;flex-direction:column;align-items:flex-start;line-height:2rem;"], function(e)
			{
				return e.theme.common.flexBox(
				{})
			});

			function eo(e, t)
			{
				var n = Object.keys(e);
				if(Object.getOwnPropertySymbols)
				{
					var r = Object.getOwnPropertySymbols(e);
					t && (r = r.filter(function(t)
					{
						return Object.getOwnPropertyDescriptor(e, t)
							.enumerable
					})), n.push.apply(n, r)
				}
				return n
			}

			function ec(e)
			{
				for(var t = 1; t < arguments.length; t++)
				{
					var n = null != arguments[t] ? arguments[t] :
					{};
					t % 2 ? eo(Object(n), !0)
						.forEach(function(t)
						{
							(0, x.Z)(e, t, n[t])
						}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : eo(Object(n))
						.forEach(function(t)
						{
							Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
						})
				}
				return e
			}
			var el = function()
				{
					var e, t = (0, _.useRouter)();
					(0, i.C)(function(e)
					{
						return e.global.lang
					}), (0, i.C)(function(e)
					{
						return e.global.isMobile
					}), (0, i.C)(function(e)
					{
						return e.global.isRight
					});
					var n = (0, i.C)(function(e)
						{
							return e.music.playlists
						}),
						r = (0, s.useState)(
						{
							text: "",
							order: !0
						}),
						o = r[0],
						c = r[1],
						l = (0, s.useState)(0),
						a = l[0],
						m = l[1],
						d = (0, s.useState)(
						{
							title: "",
							musics: []
						}),
						h = d[0],
						p = d[1],
						f = (0, s.useState)(!1),
						x = f[0],
						j = f[1],
						b = (0, s.useRef)(null),
						w = (null == b ? void 0 : null === (e = b.current) || void 0 === e ? void 0 : e.clientHeight) || 0;
					return (0, s.useEffect)(function()
					{
						"string" == typeof t.query.title && "string" == typeof t.query.musics && (p(
						{
							title: t.query.title || "No Playlist",
							musics: t.query.musics.split(",")
								.map(function(e)
								{
									return parseInt(e)
								})
						}), setTimeout(function()
						{
							j(!0)
						}, 1e3))
					}, [t.query]), (0, s.useEffect)(function()
					{
						null != b && b.current && setTimeout(function()
						{
							m(5 * parseInt(document.documentElement.style.fontSize.replace("px", "")) || 0)
						}, 500)
					}, [b, n]), (0, u.jsxs)(es,
					{
						children: [(0, u.jsx)(Y,
						{
							search: o,
							setSearch: function(e)
							{
								c(function(t)
								{
									return ec(ec(
									{}, t), e)
								})
							},
							playlistLength: n.length
						}), (0, u.jsx)(ea,
						{
							ref: b,
							style:
							{
								opacity: a > 0 ? 1 : 0
							},
							children: (0, u.jsx)(y.Z,
							{
								listArr: (0, g.Z)(n)
									.filter(function(e)
									{
										return e.title.toLowerCase()
											.match(o.text.toLowerCase()) || String(e.no)
											.match(o.text)
									})
									.map(function(e, t)
									{
										return (0, u.jsx)(O,
										{
											playlist: e
										}, t)
									}),
								clientHeight: w,
								selected: void 0,
								rowHeight: a
							})
						}), (0, u.jsx)(ee.Z,
						{}), (0, u.jsx)(er,
						{
							show: x,
							hide: function()
							{
								j(!1), t.replace("/music")
							},
							playlist: h
						})]
					})
				},
				es = a.ZP.div.withConfig(
				{
					displayName: "LeftScreen__Container",
					componentId: "sc-1l8s5bd-0"
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
				ea = a.ZP.div.withConfig(
				{
					displayName: "LeftScreen__CContainer",
					componentId: "sc-1l8s5bd-1"
				})(["width:100%;height:100%;display:flex;flex-direction:column;overflow-y:scroll !important;"]),
				eu = function(e)
				{
					var t = e.search,
						n = e.setSearch,
						r = e.playlistLength,
						o = (0, i.C)(function(e)
						{
							return e.global.lang
						});
					return (0, u.jsxs)(em,
					{
						children: [(0, u.jsxs)(ed,
						{
							children: [(0, u.jsx)(eh,
							{
								className: "bold",
								children: (0, u.jsxs)("h3",
								{
									children: [j.Z.music[o] + " ", (0, u.jsxs)("span",
									{
										style:
										{
											fontSize: "1.2rem"
										},
										children: ["(", r, ")"]
									})]
								})
							}), (0, u.jsx)(ep,
							{
								style:
								{
									width: "auto"
								},
								children: (0, u.jsx)(c.jl,
								{
									onClick: function()
									{
										n(
										{
											order: !t.order
										})
									},
									children: (0, u.jsx)(ep,
									{
										children: (0, u.jsx)(c.Yo,
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
											src: "/image/ui/searchbar/".concat(t.order ? "down" : "up", ".png")
										})
									})
								})
							})]
						}), (0, u.jsx)("div",
						{
							style:
							{
								display: "flex",
								width: "100%"
							},
							children: (0, u.jsxs)(ep,
							{
								children: [(0, u.jsx)(c.II,
								{
									type: "text",
									value: t.text,
									maxLength: 30,
									className: "medium",
									placeholder: j.Z.search_comment[o],
									onChange: function(e)
									{
										n(
										{
											text: e.currentTarget.value
										})
									}
								}), (0, u.jsx)(c.lR,
								{
									width: 40,
									height: 40,
									style:
									{
										right: "0.5rem"
									},
									onClick: function()
									{
										n(
										{
											text: ""
										})
									},
									src: "/image/ui/searchbar/pen.png",
									alt: "pen"
								})]
							})
						}), (0, u.jsx)(U.HR,
						{
							style:
							{
								height: "2px",
								margin: "0"
							}
						})]
					})
				},
				em = a.ZP.div.withConfig(
				{
					displayName: "SearchBar__Container",
					componentId: "sc-1hu9ra7-0"
				})(["", " height:auto;padding:1rem 1rem 0rem 1rem;box-sizing:border-box;"], function(e)
				{
					return e.theme.common.flexBox(
					{
						direction: "column"
					})
				}),
				ed = a.ZP.div.withConfig(
				{
					displayName: "SearchBar__Sort",
					componentId: "sc-1hu9ra7-1"
				})(["", " text-align:center;height:auto;"], function(e)
				{
					return e.theme.common.flexBox(
					{
						justify: "space-between"
					})
				}),
				eh = a.ZP.span.withConfig(
				{
					displayName: "SearchBar__FontSpan",
					componentId: "sc-1hu9ra7-2"
				})(["font-size:1.5rem;color:", ";"], function(e)
				{
					return e.theme.color.rgb63_68_74
				}),
				ep = a.ZP.div.withConfig(
				{
					displayName: "SearchBar__Flex",
					componentId: "sc-1hu9ra7-3"
				})(["", " height:auto;position:relative;"], function(e)
				{
					return e.theme.common.flexBox(
					{})
				}),
				ef = n(4330);

			function eg(e, t)
			{
				var n = Object.keys(e);
				if(Object.getOwnPropertySymbols)
				{
					var r = Object.getOwnPropertySymbols(e);
					t && (r = r.filter(function(t)
					{
						return Object.getOwnPropertyDescriptor(e, t)
							.enumerable
					})), n.push.apply(n, r)
				}
				return n
			}

			function ex(e)
			{
				for(var t = 1; t < arguments.length; t++)
				{
					var n = null != arguments[t] ? arguments[t] :
					{};
					t % 2 ? eg(Object(n), !0)
						.forEach(function(t)
						{
							(0, x.Z)(e, t, n[t])
						}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : eg(Object(n))
						.forEach(function(t)
						{
							Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
						})
				}
				return e
			}
			var ey = function(e)
				{
					var t = e.music;
					(0, i.C)(function(e)
					{
						return e.global.lang
					});
					var n = (0, i.C)(function(e)
						{
							return e.music
						}),
						r = (0, i.T)(),
						o = n.musicNo === t.no && -1 === n.playlistNo,
						s = function()
						{
							var e = D.Z.map(function(e)
							{
								return e.no
							});
							n.isRandom && (e = (0, b.Sy)(e));
							var i = {
								musics: e,
								musicNo: t.no,
								playlistNo: -1,
								isPlaying: !0
							};
							r((0, w.eY)(i)), localStorage.setItem("music", JSON.stringify(ex(ex(
							{}, n), i)))
						},
						a = function()
						{
							var e = [];
							n.playlists.forEach(function(n)
							{
								var r = !0,
									i = [];
								0 === n.no ? (n.musics.forEach(function(e, n)
								{
									e === t.no ? r = !1 : i.push(e)
								}), (0 === n.musics.length || r) && i.push(t.no)) : i = n.musics, e.push(ex(ex(
								{}, n),
								{},
								{
									musics: i
								}))
							}), r((0, w.XX)(e)), localStorage.setItem("music", JSON.stringify(ex(ex(
							{}, n),
							{},
							{
								playlists: e
							})))
						};
					return (0, u.jsxs)(u.Fragment,
					{
						children: [(0, u.jsxs)(ef.W2,
						{
							className: o ? "selected" : "",
							children: [(0, u.jsx)(ef.im,
							{
								onClick: function()
								{
									s()
								},
								children: (0, u.jsxs)("div",
								{
									style:
									{
										display: "flex",
										width: "100%"
									},
									children: [(0, u.jsx)('div',
									{
										style:{height: "4rem"}
									}), (0, u.jsxs)(ef.H_,
									{
										children: [(0, u.jsx)("h4",
										{
											children: (0, u.jsx)(ef.vR,
											{
												className: "bold",
												children: (0, u.jsxs)(ef.TG,
												{
													children: [o && (0, u.jsx)(U.YJ,
													{
														icon: l.fV7
													}), t.name]
												})
											})
										})]
									})]
								})
							}), (0, u.jsx)(ej,
							{
								onClick: function()
								{
									a()
								},
								children: (0, u.jsx)(c.xL,
								{
									icon: 1 === n.playlists[0].musics.filter(function(e)
										{
											return e === t.no
										})
										.length ? l.m6i : v.m6i
								})
							})]
						}), (0, u.jsx)("div",
						{
							style:
							{
								padding: "0rem 1rem"
							},
							children: (0, u.jsx)(ef.HR,
							{})
						})]
					})
				},
				ej = (0, a.ZP)(c.hU)
				.withConfig(
				{
					displayName: "MusicItem__PlayButton",
					componentId: "sc-14ldren-0"
				})(["position:absolute;right:0;height:6rem;padding:2rem 1rem;color:", ";"], function(e)
				{
					return e.theme.color.rgb45_70_100
				});

			function eb(e, t)
			{
				var n = Object.keys(e);
				if(Object.getOwnPropertySymbols)
				{
					var r = Object.getOwnPropertySymbols(e);
					t && (r = r.filter(function(t)
					{
						return Object.getOwnPropertyDescriptor(e, t)
							.enumerable
					})), n.push.apply(n, r)
				}
				return n
			}

			function ew(e)
			{
				for(var t = 1; t < arguments.length; t++)
				{
					var n = null != arguments[t] ? arguments[t] :
					{};
					t % 2 ? eb(Object(n), !0)
						.forEach(function(t)
						{
							(0, x.Z)(e, t, n[t])
						}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : eb(Object(n))
						.forEach(function(t)
						{
							Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
						})
				}
				return e
			}
			var ev = function()
				{
					var e, t = (0, s.useState)(
						{
							text: "",
							order: !0
						}),
						n = t[0],
						r = t[1],
						o = (0, i.C)(function(e)
						{
							return e.global.isRight
						}),
						c = (0, s.useState)(0),
						l = c[0],
						a = c[1],
						m = (0, s.useRef)(null),
						d = (null == m ? void 0 : null === (e = m.current) || void 0 === e ? void 0 : e.clientHeight) || 0,
						h = (0, s.useMemo)(function()
						{
							return D.Z.filter(function(e)
								{
									return !(n.text.trim()
											.length > 0) || e.name.toLowerCase()
										.match(n.text.replaceAll("\\", "")
											.trim()
											.toLowerCase()) || e.artist.toString()
										.toLowerCase()
										.match(n.text.replaceAll("\\", "")
											.trim()
											.toLowerCase()) || String(e.no)
										.match(n.text)
								})
								.sort(function(e, t)
								{
									return n.order ? e.no - t.no : t.no - e.no
								})
						}, [n]);
					return (0, s.useEffect)(function()
					{
						null != m && m.current && setTimeout(function()
						{
							a(6 * parseInt(document.documentElement.style.fontSize.replace("px", "")) || 0), r(
							{
								text: "",
								order: !0
							})
						}, 500)
					}, [m, o, o]), (0, u.jsx)(e_,
					{
						children: (0, u.jsxs)(eC,
						{
							children: [(0, u.jsx)(eu,
							{
								search: n,
								setSearch: function(e)
								{
									r(function(t)
									{
										return ew(ew(
										{}, t), e)
									})
								},
								playlistLength: h.length
							}), (0, u.jsx)(eP,
							{
								ref: m,
								style:
								{
									opacity: l > 0 ? 1 : 0
								},
								children: (0, u.jsx)(y.Z,
								{
									listArr: h.map(function(e, t)
									{
										return (0, u.jsx)(ey,
										{
											music: e
										}, t)
									}),
									clientHeight: d,
									selected: void 0,
									rowHeight: l
								})
							})]
						})
					})
				},
				e_ = a.ZP.div.withConfig(
				{
					displayName: "RightScreen__Container",
					componentId: "sc-unvj7-0"
				})(["display:flex;height:100%;width:100%;flex-direction:column;min-width:340px;@media screen and (max-width:768px){min-width:100vw;}"]),
				eC = a.ZP.div.withConfig(
				{
					displayName: "RightScreen__Box",
					componentId: "sc-unvj7-1"
				})(["display:flex;flex-direction:column;height:100%;background-color:", ";"], function(e)
				{
					return e.theme.color.rgb243_247_248
				}),
				eP = a.ZP.div.withConfig(
				{
					displayName: "RightScreen__CContainer",
					componentId: "sc-unvj7-2"
				})(["width:100%;height:100%;display:flex;flex-direction:column;overflow-y:scroll !important;"]),
				eO = n(9008),
				eZ = n.n(eO),
				eS = function()
				{
					return (0, u.jsxs)(eN,
					{
						children: [(0, u.jsxs)(eZ(),
						{
							children: [(0, u.jsx)("title",
							{
								children: "Music"
							}), (0, u.jsx)("meta",
							{
								name: "description",
								content: "This is the MolluTalk Music Page. (몰루톡/モルトーク)"
							}), (0, u.jsx)("meta",
							{
								name: "keywords",
								content: "몰루톡, MolluTalk, モルトーク, music"
							}), (0, u.jsx)("meta",
							{
								property: "og:title",
								content: "Music"
							}), (0, u.jsx)("meta",
							{
								property: "og:image",
								content: "https://mollutalk.com/ogImage.png"
							}), (0, u.jsx)("meta",
							{
								property: "og:site_name",
								content: "Music"
							}), (0, u.jsx)("meta",
							{
								property: "og:description",
								content: "This is the MolluTalk Music Page. (몰루톡/モルトーク)"
							}), (0, u.jsx)("meta",
							{
								name: "twitter:title",
								content: "Music"
							}), (0, u.jsx)("meta",
							{
								name: "twitter:description",
								content: "This is the MolluTalk Music Page. (몰루톡/モルトーク)"
							}), (0, u.jsx)("meta",
							{
								name: "twitter:image",
								content: "https://mollutalk.com/ogImage.png"
							}), (0, u.jsx)("meta",
							{
								name: "twitter:card",
								content: "summary_large_image"
							})]
						}), (0, u.jsx)(r.Z,
						{
							childrens: [(0, u.jsx)(el,
							{}, 0), (0, u.jsx)(ev,
							{}, 1)]
						}), (0, u.jsx)(m,
						{})]
					})
				},
				eN = a.ZP.div.withConfig(
				{
					displayName: "music__Container",
					componentId: "sc-1p8umcn-0"
				})(["", ""], function(e)
				{
					return e.theme.common.flexBox(
					{
						direction: "column"
					})
				})
		},
		2095: function(e, t, n)
		{
			(window.__NEXT_P = window.__NEXT_P || [])
			.push(["/music", function()
			{
				return n(1524)
			}])
		}
	},
	function(e)
	{
		e.O(0, [288, 876, 117, 774, 888, 179], function()
		{
			return e(e.s = 2095)
		}), _N_E = e.O()
	}
]);