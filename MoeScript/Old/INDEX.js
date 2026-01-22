/*@MoeScript/Old/INDEX.js@*/
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
	[405],
	{
		8727: function(e, n, t)
		{
			"use strict";
			var r = t(7294),
				o = t(5893),
				i = {
					overflowX: "scroll",
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
					className: 'scrollbar',
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
					onWheel: function(e)
					{
						u(a.current.scrollLeft + e.deltaY * 0.5);
					},
					onMouseUp: s,
					onMouseLeave: s,
					children: c
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
								style: {overflow: "hidden"},
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
												style: {zIndex: 200},
												alt: String(e.no),
												title: String(e.index),
												width: 252,
												height: 252,
												src: loadhead(e.no,e.index),//#下方快捷角色选择框
												onClick: function(img)
												{
													if($$('.编辑界面').hasClass('visible'))
													{
														let no = img.target.alt
														let index = img.target.title
														$$('.角色头像').attr(
														{
															alt: no,
															title: index,
															src: loadhead(no, index)
														})
														$$('.角色ID').text('ID：'+no)
														$$('.角色名称').attr('placeholder',loadname(no, index))
														显示位置_说明($$('.内容类型').attr('title'),$$('.显示位置').attr('title'))
														return
													}
													_(e)
													$$('.chatText').click()
													saveStorage('设置选项',mt_settings,'local')
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
									margin: "0rem",
									zIndex: 200
								},
								width: 252,
								height: 252,
								alt: String(d.I.no),
								title: String(d.I.index),
								src: loadhead(d.I.no,d.I.index),//#右侧老师本人
								onClick: function(img)
								{
									if($$('.编辑界面').hasClass('visible'))
									{
										let no = img.target.alt
										let index = img.target.title
										$$('.角色头像').attr(
										{
											alt: no,
											title: index,
											src: loadhead(no, index)
										})
										$$('.角色ID').text('ID：'+no)
										$$('.角色名称').attr('placeholder',loadname(no, index))
										显示位置_说明($$('.内容类型').attr('title'),$$('.显示位置').attr('title'))
										return
									}
									e((0, h.Ks)(d.I))
									$$('.chatText').click()
									saveStorage('设置选项',mt_settings,'local')
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
				})(["", ";position:relative;width:auto;margin:0.5rem;"], function(e)
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
									}), (0, m.jsxs)(I,
									{
										children: [(0, m.jsx)(D,
										{
											className: "bold",
											style:{color:'rgb(68, 72, 78)'},
											children: mt_settings['人物改名'][n.no] || n.name[a].replaceAll("-", " ")
										}), (0, m.jsx)('span',
										{
											style: {color:'rgb(111, 119, 127)'},
											children:[n.club[a],(0, m.jsx)(c.xL,
											{
												style:
												{
													width: "1rem",
													height: "1rem"
												},
												icon: ei.Yai,
												onClick: function()
												{
													custom_char(n);
												}
											})]
										})]
									})]
								}), (0, m.jsx)(B,
								{
									width: 252,
									height: 252,
									src: href+"MoeData/Ui/School/"+(!mt_school[n.school.id] ? n.club['zh_cn'] === '临时角色' ? 'RECYCLE' : 'CUSTOM' : mt_school[n.school.id].en || 'none')+'.webp',//#学校图标
									onError: function(e){IMAGE_error(e)},
									onClick: function()
									{
										if(n.school['zh_cn'] === '自定义' || n.club['zh_cn'] === '临时角色')removeChar(n);
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
							children: [(0, m.jsxs)(X,
							{
								style: {fontSize: '1.2rem'},
								className: "bold",
								children: [L.Z.student[u],`(${o})`]
							}), (0, m.jsxs)('button',
							{
								id: 'makecus',
								children: '添加角色'
							}), (0, m.jsxs)(W,
							{
								style:
								{
									width: "auto"
								},
								children: [(0, m.jsx)($,
								{
									className: "medium",
									style: {width: "4.5rem"},
									onClick: function()
									{
										s(!l)
										club()//@
									},
									children: (0, m.jsx)(X,
									{
										style: {fontSize: "1.1rem"},
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
				})(["width:100%;height:100%;"]);
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
					return [(0, m.jsx)(ea.Xf,
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
							})]
						})
					}), (0, m.jsx)(ea.Xf,
					{
						id: 'custom-char',
						style: {zIndex: 300},
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
								style:
								{
									justifyContent: 'space-between',
									alignItems: 'center',
									height:'auto'
								},
								children: [(0, m.jsx)(c.Bx,
								{
									style:
									{
										width: "auto",
										height: 'auto',
										fontSize: '1.5rem',
										marginInline: '0.5rem',
										padding: '0',
										color: 'rgb(45, 70, 100)'
									},
									className: "bold",
									children: '提示',
									onClick:function()
									{
										alert('名称显示优先级：发言者名称 > 头像名称 > 角色名称')
									}
								}), (0, m.jsx)(ea.Dx,
								{
									className: "typeTitle bold"
								}), (0, m.jsx)(ea.ec,
								{
									style:
									{
										position: 'unset',
										marginInline: '0.5rem'
									},
									onClick: function()
									{
										char_info = []
										$$('#custom-char').removeClass('visible')//S()
									},
									children: (0, m.jsx)(c.j4,{})
								})]
							}), (0, m.jsx)('input',
							{
								type: 'checkbox',
								className: 'rightSend'
							}), '默认右侧发言', (0, m.jsx)('span',
							{
								className: "charid"
							}), (0, m.jsxs)(ea.$0,
							{
								style:{padding: '0.5rem'},
								children: [(0, m.jsx)('div',
								{
									children: [mt_text.student[mtlang], mt_text.name[mtlang], (0, m.jsx)('input',
									{
										className:"charname bold",
										onChange: function(e)
										{
											$$('.charname').val(e.currentTarget.value)
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
									}), (0, m.jsx)('br',{}), mt_text.club[mtlang], (0, m.jsx)('input',
									{
										className:"clubname bold",
										onChange: function(e)
										{
											$$('.clubname').val(e.currentTarget.value)
										}
									})]
								}), (0, m.jsx)('div',
								{
									className: 'headinfo',
									style: {width: '100%'},
									children: [(0, m.jsx)(HList.Z,
									{
										children: (0, m.jsx)(k,
										{
											style: {padding: 0},
											className: 'heads',
										})
									}), '头像名称', (0, m.jsx)('input',
									{
										className:"bold headname",
										placeholder: '默认',
										onChange: function(e)
										{
											char_info.names[$$(".heads .selected").attr('title')] = e.currentTarget.value
											$$('.headname').val(e.currentTarget.value)
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
											let index = $$(".heads .selected").index()
											let length = $$(".heads img").length
											if(length === index+1)index--
											delete char_info.names[$$(".heads .selected").remove().attr('title')]
											$$(`.heads img:eq(${index})`).click()
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
										className: "bold yes",
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
									children: '请选择类型'
								}), (0, m.jsx)(ea.ec,
								{
									onClick: function()
									{
										y()
									},
									children: (0, m.jsx)(c.j4,
									{})
								})]
							}), '选择肢可以换行分割', (0, m.jsxs)(ea.$0,
							{
								children: [(0, m.jsx)('div',
								{
									style:
									{
										width: '100%',
										display: 'flex',
										justifyContent: 'space-between'
									},
									children: [(0, m.jsx)('button',
									{
										className: '开关 cVRiXh eIEKpg evqKja kwhiZC bold',
										style:
										{
											width: 'auto',
											height: 'auto',
											fontSize: '1.5rem',
											padding: '0.5rem'
										},
										children: '回复',
										value: 'reply',
										onClick: function(e)
										{
											$$('.开关').css('color','').removeClass('selected')
											e.target.style.color = 'red'
											e.target.classList.add('selected');
										}
									}), (0, m.jsx)('button',
									{
										className: '开关 cVRiXh eIEKpg evqKja kwhiZC bold selected',
										style:
										{
											width: 'auto',
											height: 'auto',
											fontSize: '1.5rem',
											padding: '0.5rem',
											color: 'red'
										},
										children: '旁白',
										value: 'info',
										onClick: function(e)
										{
											$$('.开关').css('color','').removeClass('selected')
											e.target.style.color = 'red'
											e.target.classList.add('selected');  
										}
									}), (0, m.jsx)('button',
									{
										className: '开关 cVRiXh eIEKpg evqKja kwhiZC bold',
										style:
										{
											width: 'auto',
											height: 'auto',
											fontSize: '1.5rem',
											padding: '0.5rem'
										},
										children: '羁绊',
										value: 'heart',
										onClick: function(e)
										{
											$$('.开关').css('color','').removeClass('selected')
											e.target.style.color = 'red'
											e.target.classList.add('selected');  
										}
									})]
								}), (0, m.jsx)(c.OP,
								{
									children: (0, m.jsx)(c.Kx,
									{
										className: "medium chatText",
										placeholder: L.Z.input_comment[g],
										maxRows: 5,
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
										onClick: function()
										{
											sendMessage({content: h},$$('.开关.selected').val()), y()
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
							if(正在截图)
							{
								$$('#download_to_image').css({zIndex:'',opacity:0,visibility:'hidden'})
							}
							else
							{
								C(""), b && (URL.revokeObjectURL(b), j("")), h(!1)
							}
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
										saveStorage('imageArr',[...imageArr,...[]],'local')
										localStorage['imageArrL'] = imageArrL
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
						let arr = []
					return (0, m.jsx)(ea.Xf,
					{
						id: "download_to_image",
						className: d ? "visible" : "",
						onDoubleClick: function()
						{
							$$('.关闭截图').click()
						},
						children: (0, m.jsxs)(ea.F0,
						{
							onDoubleClick: function(e)
							{
								return e.stopPropagation(), !1
							},
							children: [(0, m.jsxs)(ea.h4,
							{
								style:
								{
									justifyContent: 'space-between',
									alignItems: 'center',
									height:'auto'
								},
								children: [(0, m.jsx)(c.Bx,
								{
									style:
									{
										width: "auto",
										height: 'auto',
										fontSize: '1.5rem',
										marginInline: '0.5rem',
										padding: '0',
										color: 'rgb(45, 70, 100)'
									},
									className: "bold",
									children: '提示',
									onClick:function()
									{
										let str = ''
										str += '	1。MoeTalk的默认截图工具对特殊样式的支持有限，'
										str += '如果你的文档中含有较复杂的特殊样式，'
										str += '建议在“修改截图设置”中更换截图工具（snapdom）。\n'
										str += '	2。多张图片连续下载建议开启“打包下载”（上限2G）\n'
										str += '	3。若下载失败，图片可手动保存，手动保存失败请尝试将“图片格式”改为webp\n'
										alert(str)
									}
								}), (0, m.jsx)(ea.Dx,
								{
									className: "bold",
									children: [`${$$('.dels:checked').length ? '区域截图' : L.Z.download_to_image[g]}`,'(',(0, m.jsx)('span',
									{
										className: "截图数量",
										children: imageArr.length
									}),')']
								}), (0, m.jsx)(ea.ec,
								{
									style:
									{
										position: 'unset',
										marginInline: '0.5rem'
									},
									onClick: function()
									{
										$$('.关闭截图').click()
									},
									children: (0, m.jsx)(c.j4,{})
								}), (0, m.jsx)('截图',{
									hidden: true,
									className: 'mt_capture',
									onClick: function()
									{
										DATA_NowTime = getNowDate();
										mt_capture(S,j,$$('#mt_title').text().split(':').pop().trim())//新版截图
									}
								}), (0, m.jsx)('预览',{
									hidden: true,
									className: '内容预览',
									onClick: function(){内容预览()}
								}), (0, m.jsx)('预览',{
									hidden: true,
									className: '生成图片',
									onClick: function(){j(1)}
								}), (0, m.jsx)('取消',{
									hidden: true,
									className: '关闭截图',
									onClick: function(){srceenMode(),D(),$$('.截图区域').hide()}
								})]
							}), (0, m.jsx)("div",
							{
								style: {display: b ? "block" : "none"},
								children: [(0, m.jsx)('div',
								{
									className: '截图区域',
									style:
									{
										width: '100%',
										display: 'flex',
										justifyContent: 'space-around'
									},
									children: [(0, m.jsx)("button",
									{
										style:
										{
											width: 'auto',
											height: 'auto',
											fontSize: '1rem',
											color: 'black',
											padding: '0.5rem',
										},
										className: 'cVRiXh eIEKpg evqKja kwhiZC',
										children: '此处截取单图',
										onClick: function(e)
										{
											imageArr = [上次截图[$$('.上次截图').val()]]
											imageArrL = localStorage['imageArrL'] || imageArr.length
											$$('.mt_capture').click()
										}
									}), (0, m.jsx)("select",
									{
										style: {fontSize: '2rem'},
										className: '上次截图',
										onChange: function()
										{
											let arr = 上次截图[$$('.上次截图').val()]
											let html = ''
											截图区域.outerWidth(mt_settings['宽度限制']).css('background-color',mt_settings.风格样式.bgColor)
											foreach(arr.chats,function(k,v)
											{
												v.isFirst = isfirst(k,arr.chats)
												html += makeMessage(v.type,v,k,'预览')
											})
											截图区域.html(html)
										}
									}), (0, m.jsx)("button",
									{
										style:
										{
											width: 'auto',
											height: 'auto',
											fontSize: '1rem',
											color: 'black',
											padding: '0.5rem',
										},
										className: 'cVRiXh eIEKpg evqKja kwhiZC',
										children: '此处连续截图',
										onClick: function(e)
										{
											imageArr = 上次截图.slice($$('.上次截图').val(),上次截图.length)
											imageArrL = localStorage['imageArrL'] || imageArr.length
											if((browser.isIos || browser.isiPhone || mt_settings['打包下载']) && imageArrL > 1)imageZip = false;
											if(客户端 === 'phpwin' && !mt_settings['打包下载'])imageZip = null
											if(imageZip === false)imageZip = new JSZip();
											$$('.mt_capture').click()
										}
									})]
								}), '遇到问题或',(0, m.jsx)("span",
								{
									style: {color: 'blue'},
									children: '下载失败'
								}),'请先查看“提示”',(0, m.jsx)("pre",
								{
									style: {whiteSpace: 'pre-wrap',fontFamily:'Blueaka'},
									className: 'INDEX_CaptureTips'
								}), (0, m.jsx)('div',
								{
									className: '图片预览',
									style: {overflow: 'scroll'}
								}), (0, m.jsx)('iframe',
								{
									src: `${href}capture.html?ver=`+本地应用版本[0],
									style: 
									{
										// height: '0px'
										width: '100%'
									},
									onLoad: function(e)
									{
										截图区域 = e.target.contentDocument || e.target.contentWindow.document;
										截图区域.documentElement.style.fontSize = '16px'
										const style = 截图区域.createElement('style');
										style.textContent = FontList
										if(!mt_settings['禁止字体'])截图区域.head.appendChild(style);
										截图区域 = $$(截图区域).find('.截图区域')
										截图区域.outerWidth(mt_settings['宽度限制'])
									}
								})]
							}), (0, m.jsxs)(ea.$0,
							{
								style:
								{
									maxHeight: `${($$('body').height())*0.75}px`,
									overflow: "scroll",
									padding: '0.5rem',
									gap: '0rem'
								},
								children: [0 === b.length && (0, m.jsxs)(m.Fragment,
								{
									children: [(0, m.jsxs)(ew,
									{
										style:
										{
											flexDirection: "column",
											alignItems: "flex-start"
										},
										children: [L.Z.title[g], (0, m.jsx)(c.OP,
										{
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
												}
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
												whiteSpace: 'pre'
											},
											children: [1.1, 2, 3].map(function(e)
											{
												return (0, m.jsxs)(c.Jg,
												{
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
										style:
										{
											fontSize: "1rem",
											whiteSpace: 'pre'
										},
										children: ej.map(function(e, n)
										{
											return (0, m.jsxs)(c.Jg,
											{
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
									}), (0, m.jsx)("div",
									{
										style:
										{
											width: '100%',
											display: 'flex',
											justifyContent: 'space-evenly'
										},
										children: [(0, m.jsx)("button",
										{
											style:
											{
												width: 'auto',
												height: 'auto',
												fontSize: '1rem',
												color: 'black',
												padding: '0.5rem',
												marginBottom: '0.5rem'
											},
											className: 'cVRiXh eIEKpg evqKja kwhiZC',
											children: '修改截图设置',
											onClick: function()
											{
												let option = ''
												option += `<option value="image/png" ${mt_settings['图片格式'] == 'image/png' ? 'selected' : ''}>png</option>`
												option += `<option value="image/jpeg" ${mt_settings['图片格式'] == 'image/jpeg' ? 'selected' : ''}>jpeg</option>`
												option += `<option value="image/webp" ${mt_settings['图片格式'] == 'image/webp'? 'selected' : ''}>webp</option>`
												option += `<option value="image/bmp" ${mt_settings['图片格式'] == 'image/bmp' ? 'selected' : ''}>bmp</option>`
												option += `<option value="image/gif" ${mt_settings['图片格式'] == 'image/gif' ? 'selected' : ''}">gif</option>`
												let str = ''
												str += `<input class='打包下载' type='checkbox' ${mt_settings['打包下载'] ? 'checked' : ''}>打包下载\n`
												str += `<input class='隐藏前缀' type='checkbox' ${mt_settings['隐藏前缀'] ? 'checked' : ''}>隐藏下载文件名前缀\n`
												str += `图片宽度：（默认500，上限需测试）\n<input class='宽度限制' type="number" value="${mt_settings['宽度限制']}">\n`
												str += `图片最大高度：（默认16384，上限需测试）\n<input class='高度限制' type="number" value="${mt_settings['高度限制']}">\n`
												str += `图片格式：（默认png，其它格式需测试）\n`
												str += `<select class='图片格式' style='font-size: 1.5rem;'>${option}</select>\n`
												option = `<option value="html2canvas" ${mt_settings['截图工具'] != 'snapdom' ? 'selected' : ''}>html2canvas（默认）</option>`
												option += `<option value="snapdom" ${mt_settings['截图工具'] == 'snapdom' ? 'selected' : ''}>snapdom（测试）</option>`
												str += `截图工具：\n`
												str += `<select class='截图工具' style='font-size: 1.5rem;'>${option}</select>\n`
												let config = {}
												config.title = '截图设置'
												config.confirm = '提交'
												config.id = Math.random().toString().replace('0.','')
												config.yes = function()
												{
													mt_settings['宽度限制'] = $$(`.alert_${config.id} .宽度限制`).val() || 500
													mt_settings['高度限制'] = $$(`.alert_${config.id} .高度限制`).val() || 16384
													mt_settings['图片格式'] = $$(`.alert_${config.id} .图片格式`).val()
													mt_settings['截图工具'] = $$(`.alert_${config.id} .截图工具`).val()
													mt_settings['打包下载'] = $$(`.alert_${config.id} .打包下载`).prop('checked')
													mt_settings['隐藏前缀'] = $$(`.alert_${config.id} .隐藏前缀`).prop('checked')
													saveStorage('设置选项',mt_settings,'local')
												}
												alert(str,config)
											}
										})
										, (0, m.jsx)("button",
										{
											style:
											{
												width: 'auto',
												height: 'auto',
												fontSize: '1rem',
												color: 'black',
												padding: '0.5rem',
												marginBottom: '0.5rem',
												display: !localStorage['imageArrL'] ? 'none' : ''
											},
											className: 'cVRiXh eIEKpg evqKja kwhiZC',
											children: '返回上次截图',
											onClick: function(e)
											{
												let option = ''
												截图区域.html('')
												$$('.图片预览').html('')
												$$('.截图区域').show()
												数据操作('Sg','imageArr',function(err, data)
												{	
													上次截图 = data
													foreach(data,function(k,v)
													{
														option += `<option value="${k}">第${v.index}/${上次截图.length}段</option>`
													})
													$$('.截图区域 select').html(option)
													let arr = 上次截图[0]
													let html = ''
													截图区域.outerWidth(mt_settings['宽度限制']).css('background-color',mt_settings.风格样式.bgColor)
													foreach(arr.chats,function(k,v)
													{
														v.isFirst = isfirst(k,arr.chats)
														html += makeMessage(v.type,v,k,'预览')
													})
													截图区域.html(html)
												})
												j("1")
											}
										})
										]
									}), (0, m.jsxs)(ea.$_,
									{
										children: [(0, m.jsx)(ea.Lw,
										{
											className: "bold",
											onClick: function()
											{
												$$('.关闭截图').click()
											},
											children: L.Z.cancel[g]
										}), (0, m.jsx)(ea.AZ,
										{
											className: "bold",
											disabled: chats.length < 1,
											onClick: function()
											{
												截屏预览(S)
												O()
											},
											children: L.Z.confirm[g]
										})]
									})]
								})]
							})]
						})
					})
				},
				ej = ["watermark", "title", "writer"],//#加入包含存档选项archive
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
								}, JSZip.loadAsync(t).then(function(e)
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
						I = async function()
						{//编译过的存档
							await 读取存档(j)
							N()
						};
					return (0, m.jsx)(ea.Xf,
					{
						className: t ? "visible" : "",
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
							}), (0, m.jsx)("p",
							{
								hidden: x !== "download",
								children: ['存档格式：', (0, m.jsx)("select",
								{
									className: '存档格式',
									children: [(0, m.jsx)("option",
									{
										value: 'json',
										children: 'JSON'
									}), (0, m.jsx)("option",
									{
										value: 'image',
										children: '图片'
									})]
								}),'无法下载请将格式改为图片后手动保存']
							}), (0, m.jsx)("p",
							{
								hidden: x !== "download",
								children: [(0, m.jsx)("input",
								{
									className: '包含自定义数据',
									type: 'checkbox'
								}),'包含自定义数据']
							}), (0, m.jsx)(ea.$0,
							{
								style: {padding: '0.5rem'},
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
										onChange: function(e)
										{
											INIT_loading('加载存档')
											P(e)
										}
									}), (0, m.jsx)('div',
									{
										style:
										{
											display: 'flex',
											width: '100%'
										},
										children: [(0, m.jsxs)(eP,
										{
											children: [(0, m.jsx)(eI,
											{
												style: {width: 'auto'},
												onClick: function()
												{
													_.current.accept = 'application/json'
													var e;
													null === (e = _.current) || void 0 === e || e.click()
												},
												children: (0, m.jsx)(c.xL,
												{
													icon: ico.cf$
												})
											}), (0, m.jsx)("span",
											{
												className: "bold",
												children: '上传JSON存档'
											})]
										}), (0, m.jsxs)(eP,
										{
											children: [(0, m.jsx)(eI,
											{
												style: {width: 'auto'},
												onClick: function()
												{
													_.current.accept = 'image/png'
													var e;
													null === (e = _.current) || void 0 === e || e.click()
												},
												children: (0, m.jsx)(c.xL,
												{
													icon: ico.cf$
												})
											}), (0, m.jsx)("span",
											{
												className: "bold",
												children: '上传图片存档'
											})]
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
											setTimeout(function()
											{
												let title = mt_settings['截图选项'].titleStr || ''
												let writer = mt_settings['截图选项'].writerStr || ''
												$$('.mt_title').text(title.split(' : ').pop())
												$$('.mt_writer').text(writer.split(' : ').pop())
											})
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
											children: '导出存档'
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
												className: "mt_title",
												placeholder: L.Z.title_comment[d],
												maxRows: 1
											})
										}), L.Z.writer[d], (0, m.jsx)(c.OP,
										{
											children: (0, m.jsx)(c.Kx,
											{
												className: "mt_writer",
												placeholder: L.Z.nickName_comment[d],
												maxRows: 1
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
											onClick: async function()
											{
												let cus = false
												let info = {}
												info.title = mt_settings['截图选项'].titleStr = $$('.mt_title:eq(-1)').val()
												info.nickname = mt_settings['截图选项'].writerStr = $$('.mt_writer:eq(-1)').val()
												info.date = getNowDate();
												if($$('.包含自定义数据').prop('checked'))cus = true
												let filename = 'MoeTalk存档'+info.date+'_'
												if(mt_settings['隐藏前缀'])filename = ''
												导出存档(`${filename}${info.title || '无题'}`,await 生成存档(info,cus))
											},
											children: L.Z.download[d]
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
											children: [L.Z.title[d], " : ", j.INFO.title]
										}), (0, m.jsxs)(eT,
										{
											children: [L.Z.writer[d], " : ", j.INFO.nickname]
										}), (0, m.jsxs)(eT,
										{
											children: [L.Z.date[d], " : ", j.INFO.date]
										}), (0, m.jsxs)(eT,
										{
											style: {'color': 'red'},
											children: j.CUSTOM ? ['包含自定义数据', (0, m.jsxs)('button',
											{
												children: '统计',
												onClick: function()
												{
													let c = Object.keys(j.CUSTOM.CHAR).length
													let n = Object.keys(j.CUSTOM.IMAGE).length
													alert(`角色总数：${c}\n图片总数：${n}`)
												}
											})] : ''
										})]
									}), (0, m.jsxs)("span",
									{
										style:
										{
											fontSize: "1rem"
										},
										children: '当前项目将自动备份'
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
				})(["", ";height:auto;flex-direction:column;width:100%;text-align:center;"], function(e)
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
									$$('#download_to_image').css({zIndex:300,opacity:'',visibility:''})
									if(正在截图)y(!0)
									else
									{
										$$('.关闭截图').click()
										imageArrL = 0
										mt_title()
										setTimeout(function(){截屏预览(),y(!0)},1)
									}
									
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
								style: {zIndex: 300},
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
										}), (0, m.jsx)(c.Bx,
										{
											className: "bold",
											style:
											{
												"width": "auto",
												height: '100%',
												color: EMOJI.custom.from ? 'red' : '#3f51b5',
												position: 'absolute',
												right: 0
											},
											hidden: EMOJI.type === 'Emoji' && !EMOJI.custom.io,
											children: EMOJI.type === 'Emoji' ? EMOJI.custom.io ? '编辑' : '管理' : EMOJI.custom.from ? '❗声明' : '信息',
											onClick: function()
											{
												$$('.INDEX_EmojiIfno:visible').length ? $$('.INDEX_EmojiIfno').hide() : $$('.INDEX_EmojiIfno').show()
												if(EMOJI.custom.from)
												{
													let config = {}
													config.title = '版权声明'
													config.style = 'text-align:center;'
													let str = ''
													str += `作者：${EMOJI.custom.from.name}\n`
													str += `<a href='${EMOJI.custom.from.link}'><u>${EMOJI.custom.from.link}</u></a>\n`
													str += '<span style="color:red;">请尊重作者的劳动成果\n严禁用本套立绘差分进行牟利和商业用途\n违者将追究法律责任！\n</span>'
													if($$('.INDEX_EmojiIfno:visible').length > 0)str += '现在点击表情将编辑信息\n'
													else str += '现在点击表情将发送表情\n'
													alert(str,config)
												}
												
											}
										})]
									}), (0, m.jsxs)(ea.h4,
									{
										hidden: !差分映射 || EMOJI.type === 'Emoji',
										children: !差分映射 || EMOJI.type === 'Emoji' ? '' : (0, m.jsx)(HList.Z,
										{
											children: (0, m.jsx)(k,
											{
												style: {padding:0},
												children: mt_settings['选择角色'].list.concat({no:'0',index:'1'}).map(function(e, n)
												{
													return (0, m.jsx)('img',
													{
														alt: String(e.no),
														title: String(e.index),
														src: loadhead(e.no,e.index),
														onError: function(e){IMAGE_error(e)},
														style: {width: '3rem',height: '3rem'},
														className: '差分映射 '+ (e.no == 差分映射.id && e.index == 差分映射.index ? 'eLaCqa fuyFOl selected' : 'eLaCqa fuyFOl')
													}, n)
												})
											})
										})
									}), (0, m.jsx)(eE,
									{
										className: 'scrollbar',
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
													children: [(0, m.jsx)('span',
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
															backgroundColor:'white',
															overflow: 'hidden',
															maxHeight: '100%'
														},
														children: [v != 'ADD' ? (0, m.jsx)('span',
														{
															className: "bold",
															style:
															{
																"width": "auto",
																"color": "rgb(63, 81, 181)"
															},
															children: '点击编辑\n',
															hidden: !link
														}) : '',EmojiInfo],
														title: v,
														onClick:function(e)
														{
															if(!EMOJI.custom.io)return
															if(e.target.innerText === '点击编辑\n')
															{
																e.target.innerText = '已选中\n'
																e.target.style.color = "red"
																e.target.parentElement.classList.add('selected')
															}
															else if(e.target.innerText === '已选中\n')
															{
																e.target.innerText = '点击编辑\n'
																e.target.style.color = "rgb(63, 81, 181)"
																e.target.parentElement.classList.remove('selected')
															}
															else e.target.nextElementSibling.click()
														}
													}), mt_settings['表情信息'][v] || v.substring(v.lastIndexOf('/')+1),(0, m.jsx)('img',
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
														src: v === 'ADD' ? href+'MoeData/Ui/School/RECYCLE.webp' : 前缀+link,//#表情链接
														onError: function(e){IMAGE_error(e)},
														onClick: function(e)
														{
															let config = {}
															config.id = Math.random().toString().replace('0.','')
															let selectNum = $$('.INDEX_EmojiIfno.selected').length
															if(v === 'ADD')
															{
																let str = '<input type="checkbox" style="width:1rem;height:1rem;"><span onclick="$(this).prev().click()">添加到新的分页</span>\n'
																str += '<button onclick=\'$("#custom").attr("title","image").attr("alt","emoji").click()\'>点击上传图片（支持批量添加，点击图片可删除）</button>\n'
																str += `<div class="Emojis" title="${v}"></div>\n`
																config.title = '添加表情'
																config.confirm = '提交'
																config.yes = async function()
																{
																	if($$(`.alert_${config.id} input:checked`).length)EMOJI.pages[EMOJI.id].custom = parseInt(EMOJI.pageindex.split(' / ')[1])//添加到新的分页
																	else EMOJI.pages[EMOJI.id].custom = parseInt(EMOJI.pageindex.split(' / ')[0]-1)
																	let imgs = $$('.Emojis img')
																	for(let i=0,l=imgs.length;i<l;i++)
																	{
																		let id = `${EMOJI.type}-${getNowDate()}_${i}`
																		if(!EMOJI_CustomEmoji[EMOJI.id])EMOJI_CustomEmoji[EMOJI.id] = {}
																		EMOJI_CustomEmoji[EMOJI.id][id] = EMOJI.pages[EMOJI.id].custom
																		await 数据操作('Is',id,imgs[i].src)
																	}
																	$$('.INDEX_Emoji').click()
																	saveStorage('DB_EMOJI',EMOJI_CustomEmoji,'local')
																}
																alert(str,config)
																return
															}
															if($$('.INDEX_EmojiIfno:visible').length && EmojiInfo !== '')
															{
																if(selectNum > 1)
																{
																	config.title = '批量删除'
																	config.confirm = '提交'
																	let str = `已选中${selectNum}个数据\n`
																	str += '<input type="checkbox" style="width:1rem;height:1rem;">确认删除表情\n'
																	config.yes = function()
																	{
																		if(!$$(`.alert_${config.id} input:checked`).length)return
																		$$.each($$('.INDEX_EmojiIfno.selected'),function(k,v)
																		{
																			v = v.title
																			数据操作('Ir',v)
																			delete EMOJI_CustomEmoji[EMOJI.id][v]
																			delete mt_settings['表情信息'][v]
																		})
																		saveStorage('设置选项',mt_settings,'local')
																		saveStorage('DB_EMOJI',EMOJI_CustomEmoji,'local')
																		$$('.INDEX_Emoji').click()
																	}
																	alert(str,config)
																	return
																}
																config.title = '编辑表情'
																config.confirm = '提交'
																let str = ''
																let img = `<img class="Emojis" src='${前缀+link}' style='width:100%;' onerror='IMAGE_error(this)'>`
																let now = parseInt(EMOJI.pageindex.split(' / ')[0])//当前页
																let end = parseInt(EMOJI.pageindex.split(' / ')[1])//终点页
																if(EMOJI.custom.io)
																{
																	let select = ''
																	
																	for(n=1;n<=end;n++)
																	{
																		select += `<option ${n === now ? "selected style='color:red;'" : ""}>${n}</option>`
																	}
																	select += `<option>${end+1}</option>`
																	str += '<input type="checkbox" style="width:1rem;height:1rem;"><span onclick="$(this).prev().click()">只删除表情</span>\n'
																	str += `移动到：第<select style='font-size:1.2rem;'>${select}</select>页`
																	img = `<button onclick='$("#custom").attr("title","image").attr("alt","emoji").click()'>点击更改图片\n${img}</button>`
																}
																str += '\n'
																let info = `<input style='font-size:1.2rem;' class='text' placeholder='${toString(CFInfo[v])}' value='${mt_settings['表情信息'][v] || ''}'>`
																config.yes = function()
																{
																	if(EMOJI.custom.io)
																	{//编辑自定义表情
																		EMOJI_CustomEmoji[EMOJI.id][v] = parseInt($$(`.alert_${config.id} select`).val()-1)
																		数据操作('Is',v,$$('.Emojis').attr('src'))
																		if($$(`.alert_${config.id} input:checked`).length)
																		{//只删除表情
																			数据操作('Ir',v)
																			delete EMOJI_CustomEmoji[EMOJI.id][v]
																			if(!Object.keys(EMOJI_CustomEmoji[EMOJI.id]).length)delete EMOJI_CustomEmoji[EMOJI.id]
																			$$(`.alert_${config.id} .text`).val('')
																		}
																		//存入数据库
																		saveStorage('DB_EMOJI',EMOJI_CustomEmoji,'local')
																	}
																	if($$(`.alert_${config.id} .text`).val())
																	{
																		mt_settings['表情信息'][v] = $$(`.alert_${config.id} .text`).val()
																	}
																	else
																	{
																		delete mt_settings['表情信息'][v]
																	}
																	saveStorage('设置选项',mt_settings,'local')
																	$$('.INDEX_Emoji').click()
																}
																alert(`${str}ID：${v}\n信息：${info}\n\n${img}`,config)
																return
															}
															if($$('.editMessage').hasClass('visible'))
															{
																$$('.图片文件').attr('src',link)
																s()
															}
															else
															{
																if(e.target.src.startsWith('data:'))link = e.target.src
																sendMessage({file: link,content: EMOJI.type},'image'), s()
															}
														},
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
												let text = $$('.chatText')[0]
												if(text.value !== '')
												{
													sendMessage({content: text.value},'chat')//#单击发送
													text.value = ''
													text.click()
												}
											})
										},
									})]
								})
							}), (0, m.jsx)(eU,
							{
								title: "send",
								//disabled: w.length < 1,
								onClick: function()
								{
									let text = $$('.chatText')[0]
									if(text.value !== '')
									{
										sendMessage({content: text.value},'chat')//#单击发送
										text.value = ''
										text.click()
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
						}), (0, m.jsxs)(eD,
						{
							className: "tools",
							style:
							{
								padding: "5px 0",
							},
							children: [(0, m.jsx)(eU,
							{
								style:
								{
									padding: "0.2rem",
									width: "2.2rem",
									height: "2.2rem"
								},
								title: "Image",
								onClick: function()
								{
									var e;
									null === (e = N.current) || void 0 === e || e.click()
								},
								children: [(0, m.jsx)(c.xL,
								{
									icon: ei.VmB
								}), (0, m.jsx)("input",
								{
									type: "file",
									ref: N,
									style: {display: "none"},
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
								})]
							}), (0, m.jsx)(eU,
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
									icon: ico.DBf
								})
							}), (0, m.jsx)(eU,
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
									$$('.包含自定义数据').prop('checked',false)
								},
								children: (0, m.jsx)(c.xL,
								{
									icon: ico.EdJ
								})
							}), (0, m.jsx)(eU,
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
						})]
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
												let no = e.target.alt
												let index = e.target.title
												let HeadList = {direction:'row',list:[]}
												let checked = $$('.dels:checked').length
												if(CHAT_HeadList)
												{
													HeadList = CHAT_HeadList
												}
												let str = ''
												str += '<label>头像排列：<input class="radio row" type="radio" name="direction" value="row">横向（注意排版）</label>\n'
												str += `<label>　　　　　<input class="radio column" type="radio" name="direction" value="column">竖向</label><input type="checkbox" class="fullHeight" ${HeadList.fullHeight ? 'checked' : ''}>文字消息自动铺满\n`
												str += `头像间距：<input style="font-size:1.2rem;" class="margin text" placeholder="默认值为 -1.5rem" value="${toString(HeadList.margin)}">\n\n`

												str += '<label><input class="radio" type="radio" name="mode" value="add">添加头像</label>'
												str += '<label><input class="radio" type="radio" name="mode" value="change" checked>切换角色</label>\n'
												str += `<img class="头像 N_char" src="${index ? loadhead(no,index) : href+'MoeData/Ui/error.webp'}" ${no ? `alt="${no}"` : ''}" ${index ? `title="${index}"` : ''}" onerror="IMAGE_error(this)">`
												str += `发言者名称：<input style="font-size:1.2rem;color:red;" class="text" placeholder="${$$('.name').attr('placeholder')}" value="${$$('.name').val()}"><div class="N_list">`
												HeadList.list.map(function(index,k)
												{
													str += `<img class="头像" src="${loadhead('LIST',index)}" title="${index}" style="cursor:pointer;" onclick="this.remove()" onerror="IMAGE_error(this)">`
												})
												str += '</div>\n'

												str += '头像列表：（点击选择）\n'
												let str1 = '$(".N_char").attr("src",loadhead(this.alt,this.title)).attr("alt",this.alt).attr("title",this.title).next().attr("placeholder",loadname(this.alt,this.title))'
												let str2 = '$(".N_list").append(`<img class="头像" src="${loadhead("LIST",this.title)}" title="${this.title}" style="cursor:pointer;" onclick="this.remove()" onerror="IMAGE_error(this)">`)'
												mt_settings['选择角色'].list.concat({no:'0',index:'1'}).map(function(v,k)
												{
													str += `<img class='头像' src='${loadhead(v.no,v.index)}' alt='${v.no}' title='${v.index}' style='cursor:pointer;' onclick='$(".radio:checked")[1].value === "change" ? ${str1} : ${str2}' onerror="IMAGE_error(this)">`
												})

												$$(`.${HeadList.direction}`).click()
												let config = {}
												config.title = '设置头像'
												config.yes = function()
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
													let hl = CHAT_HeadList.list.length
													let name = img.next()[0]
													$$('.name').attr('placeholder',name.placeholder).val(name.value)
													// $('.角色头像_列表').text(hl ? `+${hl}头像` : '')
													// $('.角色ID').text(img[0].alt ? 'ID：'+img[0].alt : '不更改角色')
													// $('.设置头像').css('color',CHAT_HeadList.list.length || checked > 1 ? 'red' : 'rgb(75, 105, 137)')
													if(img[0].title)
													{
														e.target.src = img[0].src
														e.target.alt = img[0].alt
														e.target.title = img[0].title
													}
												}
												alert(str,config)
												if(HeadList.direction === "column")$$(".radio.column").click()
												else $$(".radio.row").click()
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
							dangerouslySetInnerHTML:{__html:n}
							// children: n
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
				e6 = function(e)
				{//消息界面
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
					// let html = makeMessage(n.type,n,t,'index')
					// return (0, m.jsx)('div',
					// {
					// 	className: '消息',
					// 	title: n.is_breaking === true ? 'red' : n.isFirst === true ? 'blue' : 'transparent',
					// 	style: {padding: html[1] ? "" : "0.5rem 1rem 0 1rem"},
					// 	dangerouslySetInnerHTML: {__html: html[0]}
					// })
					let isFirst = isfirst(t,l)
					let isCenter = n.isCenter && n.type === 'image'
					let style = mt_settings['文字样式'][n.type] ? mt_settings['文字样式'][n.type] : {}
					delete style.textAlign,style = {...style,...{}}//防止连带修改设置属性
					foreach([...mt_settings.风格样式[n.type] || [],...n.style || []],function(k,v)
					{
						style[v[0]] = v[1]
					})
					if(n.type === 'info')
					{
						n.isLeft ? style.textAlign = 'left' : ''
						n.isRight ? style.textAlign = 'right' : ''
					}
					if(n.heads && (!n.heads.list || n.heads.list.length < 1))delete n.heads
					if(!n.content)n.content = ''
					if(!n.file)n.file = ''
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
									children: [!isCenter && !n.isRight ? (0, m.jsx)('div',
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
											alignItems: isCenter ? 'center' : n.isRight || n.sCharacter.no == 0 ? 'flex-end' : 'flex-start',
											height: n.heads && n.heads.fullHeight ? '100%' : ''
										},
										children: [!isCenter && isFirst && n.sCharacter.no != 0 ? (0, m.jsx)("span",
										{//人物名称
											className: "名称 bold",
											dangerouslySetInnerHTML: {__html: n.name || loadname(n.sCharacter.no,n.sCharacter.index)}
										}) : '' , (0, m.jsxs)("div",
										{//消息内容
											style:
											{
												display: "flex",
												height: "100%",
												justifyContent: isCenter ? 'center' : n.isRight || n.sCharacter.no == 0 ? 'flex-end' : '',
											},
											children: [n.time ? (0, m.jsx)('div',
											{//左侧时间戳
												className: '时间戳',
												hidden: (!n.time || n.sCharacter.no != 0) && !n.isRight,
												dangerouslySetInnerHTML:{__html:n.time}// children: n.time
											}) : '', "chat" === n.type ? [!n.isRight && isFirst && n.sCharacter.no != 0 ? (0, m.jsx)('div',
											{className: '左角',style:{borderRightColor:style['background-color']}}) : '', (0, m.jsx)('span',
											{//文本消息
												className: '文本 编辑',
												style: n.isRight || n.sCharacter.no == 0 ? {...{background: 'rgb(74, 138, 202)'},...style} : style,
												dangerouslySetInnerHTML:{__html:n.content}
												// children: n.content
											}), (n.isRight && isFirst) || n.sCharacter.no == 0 ? (0, m.jsx)('div',
											{className: '右角',style:{borderLeftColor:style['background-color']}}) : ''] : (0, m.jsx)('img',
											{//图片消息
												className: '图片 编辑',
												style:
												{...{
													maxHeight: n.content.indexOf("Face")>=0 || n.file.indexOf("Face")>=0 ? '360px' : "",
													maxWidth: n.content.indexOf("Face")>=0 || n.file.indexOf("Face")>=0 ? mt_settings['差分比例'] : mt_settings['图片比例']
												},...style},//@差分表情宽高百分比
												src: n.file.indexOf(":image") > -1 ? n.file : href+n.file,
												title: n.file.indexOf(":image") > -1 ? '' : n.file,
												onError: function(e){IMAGE_error(e)}
											}) ,n.time ? (0, m.jsx)('div',
											{//右侧时间戳
												className: '时间戳',
												hidden: !n.time || n.sCharacter.no == 0 || n.isRight || isCenter,
												dangerouslySetInnerHTML:{__html:n.time}// children: n.time
											}) : '']
										})]
									}), !isCenter && n.isRight && n.sCharacter.no != 0 ? (0, m.jsx)('div',
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
												onError: function(e){IMAGE_error(e)}
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
										dangerouslySetInnerHTML:{__html:v}
										// children: v
									})
								})]
							})] : "heart" === n.type ? [(0, m.jsx)("div",
							{className: '头像框'}),(0, m.jsx)(eW,
							{//羁绊
								className: '编辑',
								style: style,
								character: n.content || ((n.name || loadname(n.sCharacter.no,n.sCharacter.index))+mt_text.go_relationship_event[mtlang])
							})] : "info" === n.type ? (0, m.jsx)('span',//eN.vD,
							{//旁白
								className: '旁白 编辑',
								style: style,
								dangerouslySetInnerHTML:{__html:n.content}
								// children: n.content
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
										style:{color: "rgb(139, 187, 233)"},
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
										children: '区间选择'
									})
								})
							}), (0, m.jsx)($,
							{
								className: "bold INDEX_delete",
								children: (0, m.jsx)(X,
								{
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
								children: "选择肢管理"
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
										color: 'white',
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
												fontFamily:/[\u4e00-\u9fff]/.test(mt_settings['顶部标题']) ? "Blueaka" : "Jalnan"
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
										}), (0, m.jsx)('span',
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
				})(["", ";position:absolute;flex-direction:column;height:max-content;background-color:", ";color:", ";"], function(e)
				{
					return e.theme.common.flexBox(
					{
						direction: "column"
					})
				}, function(e)
				{
					return MikuTalk ? '' : mt_settings.风格样式.bgColor//#自定义样式
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
							style:
							{
								justifyContent: 'space-around',
								height: '50%'
							},
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
								}),'发送图片',(0, m.jsx)(c.xL,
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
									icon: ico.DBf
								}),'选择肢、旁白、羁绊事件']
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
								}),'生成截图']
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
								}),'表情差分']
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
								content: `${MoeTalkURL}/MoeData/Ui/Favor_Schedule_Deco.webp`
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
								content: `${MoeTalkURL}/MoeData/Ui/Favor_Schedule_Deco.webp`
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
		e.O(0, [288, 876, 774, 888, 179], function()
		{
			return e(e.s = 8312)
		}), _N_E = e.O()
	}
]);
// "use strict";
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
						}, 0), o === t ? l+$$('.gskNYI:eq(0)').outerHeight() : l//#单行改为多行头像分支
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
							display: 'flex',
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
							className: 'scrollbar',
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
										onError: function(e){IMAGE_error(e)}
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
									src: href+"MoeData/Ui/School/"+(t.school[mtlang] === '自定义' ? '自定义' : mt_characters[t.no].school)+'.webp',//#学校图标
									onError: function(e){IMAGE_error(e)},
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
								style: {lineHeight: "2rem"},
								children: `${i.Z.momotalk[d]} ${i.Z.library[d]}`
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
								}), (0, b.jsxs)(K,
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
												src: href+"MoeData/Ui/".concat(n.order ? "down" : "up", ".webp")//#排序图标
											})
										})
									})]
								})*/]
							})]
						}), (0, b.jsxs)(H,
						{
							style: 
							{
								userSelect: 'text',
								lineHeight: '3rem',
								color: 'red'
							},
							children: 'QQ反馈交流群：922392676'
						}), year+month+day < '250921' ? (0, b.jsxs)(H,
						{
							style: 
							{
								userSelect: 'text',
								lineHeight: '125%',
								whiteSpace: 'pre-wrap',
    							textAlign: 'center'
							},
							dangerouslySetInnerHTML:{__html:'（9/21日截止）【征文活动】秘密岛屿探索计划正在进行中\n详情请见：<a style="text-decoration:underline;" title="https://www.bilibili.com/opus/1098333887621234708" class="INIT_href">链接</a>'}
						}) : '', (0, b.jsxs)(K,
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
									src: href+"MoeData/Ui/pen.webp",//#铅笔图标
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
									children: '播放章节'
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
								children: [(0, b.jsx)(H,
								{
									children: `${h.名称}`
								}), (0, b.jsx)("select",
								{
									style: {fontSize: '1.5rem'},
									children: Array(h.章节+1).fill(0).map(function(v,k)
									{
										return (0, b.jsx)("option",
										{
											value: k,
											selected: k == e.index,
											children: `第${k+1}/${h.章节+1}章`
										})
									})
								}), (0, b.jsx)('button',
								{
									onClick: function(e)
									{
										$$(`.播放${h.ID}-${e.target.previousSibling.value}`).click()
										u(!1)
									},
									children: '▶️点击播放'
								}), (0, b.jsx)(eb,
								{
									children: ['转载已获作者',MMT目录.作者[h.作者] ?(0, b.jsx)('a',
									{
										style:
										{
											color: 'rgb(48, 150, 245)',
											cursor: 'pointer'
										},
										children: `${h.作者}`,
										href: MMT目录.作者[h.作者],
										target: '_blank'
									}) : '','授权']
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
							children: [MMT目录.作者[l.作者] ? (0, b.jsxs)(eh,
							{
								children: (0, b.jsxs)('a',
								{
									style:
									{
										color: "rgb(48, 150, 245)",
										cursor: "pointer"
									},
									href: MMT目录.作者[l.作者],
									children: '【作者主页】',
									target: '_blank'
								})
							}) : '', Array(l.章节+1).fill(0).map(function(v,k)
							{
								return (0, b.jsxs)(eh,
								{
									children: [(0, b.jsx)(ep,
									{
										className: `${l.ID}-${k}`,//弹窗
										onClick: function()
										{
											L([!0,k])
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
									}), `第${k+1}/${l.章节+1}章`, (0, b.jsx)('span',
									{
										hidden: true,
										className: `播放${l.ID}-${k}`,//播放
										onClick: async function()
										{
											INIT_loading()
											skip = false
											$$('.nowChapter').text('读取中。。')
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

											let filename = `GameData/${mt_settings['选择游戏']}/Library/${l.ID}`
											if(本地 && 客户端 && !await file_exists(`${filename}.zip`))
											{
												let zip = await $ajax(`${MoeTalkURL}/${filename}.zip?md5=${l.MD5}`)
												await 保存文件(`${filename}.zip`,zip)
											}
											if(本地 && 客户端 && !await file_exists(`${filename}-${k}.zip`))
											{
												let zip = await $ajax(`${MoeTalkURL}/${filename}-${k}.zip?md5=${l.MD5}`)
												await 保存文件(`${filename}-${k}.zip`,zip)
											}

											if(!MMT目录.当前 || MMT目录.当前[0] !== l.ID)
											{
												MMT目录.数据 = loaddata(await ZipToJson(`${href}${filename}.zip`),'player')
												if(MMT目录.数据.CHAR)
												{
													mt_schar = {...mt_schar,...MMT目录.数据.CHAR.id}
													for(let id in MMT目录.数据.CHAR.image)
													{
														let img = MMT目录.数据.CHAR.image[id]
														await 数据操作('Ts',id,img)
													}
													数据操作('Ts','临时角色',mt_schar)
												}
												delete MMT目录.数据
											}
											MMT目录.当前 = [l.ID,k]
											let data = loaddata(await ZipToJson(`${href}${filename}-${k}.zip?md5=${l.MD5}`),'player')
											playChat.chats = data.CHAT
											playChat.header = data.INFO
											playChat.chatSpeed = data.CHAT.length < 2 ? 1000 : (0, a.zP)()
											if(l.备注 && MMT目录.备注[l.备注] && k == 0)data.CHAT.unshift(MMT目录.备注[l.备注])
											let 章节 = `${MMT目录.当前[1]+1}/${MMT目录.作品[MMT目录.当前[0]].章节+1}`
											$$('#size').text(`章节:${章节}\n进度:1/${data.CHAT.length}`)
											setTimeout(function(){p((0, ee.Fe)(playChat))}, 1e3)
											p((0, S.Cz)(!0))
											$$('.nowChapter').text(`${l.名称}：第${k+1}/${l.章节+1}章`)
											$$('.PLAYER_play').click()
											INIT_loading(false)
										},
										children: '播放'
									})]
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
													children: r.名称
												})
											})
										}), (0, b.jsx)(ew,
										{
											children: [r.备注 ? (0, b.jsxs)(eb,
											{
												children: r.备注
											}) : '', (0, b.jsxs)(eb,
											{
												children: [i.Z.writer[g], " : ", (0, b.jsx)("span",{children: r.作者})]
											})]
										})]
									})]
								})
							}), (0, b.jsx)(ej,
							{
								onClick: function()
								{
									$$(`.${r.ID}-0`).click()
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
				})(["position:absolute;right:1rem;top:1.8rem;width:2.5rem;height:2.5rem;color:", ";"], function(e)
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
							S(CHAR_CharList), I(6 * parseInt(document.documentElement.style.fontSize.replace("px", "")) || 0)
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
								content: `${MoeTalkURL}/MoeData/Ui/Favor_Schedule_Deco.webp`
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
								content: `${MoeTalkURL}/MoeData/Ui/Favor_Schedule_Deco.webp`
							})]
						}), (0, b.jsx)(F,
						{
							option: g,
							characterList: CHAR_CharList,
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
								
								children: MMT目录.作品.map(function(e, t)
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
									children: '作品收录条件：无明显违规或争议内容\n您可以在交流群或反馈页面向我提交您的作品\n推荐带上您的主页和昵称'
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
									"string" == typeof t.result && ("[" === t.result[0] || "{" === t.result[0]) ? (G(loaddata(t.result,'player')), q(!0)) : L((0, m.Y2)(//#编译存档
									{
										isAlert: !0,
										title: f.Z.error[b],
										ment: f.Z.no_support[b]
									}))
								}, JSZip.loadAsync(e.currentTarget.files[0]).then(function(e)
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
							let 章节 = '1/1'
							if(MMT目录.当前)章节 = `${MMT目录.当前[1]+1}/${MMT目录.作品[MMT目录.当前[0]].章节+1}`
							$$('#size').text(`章节:${章节}\n进度:1/${_.length}`)
						};
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
									accept: 'image/png,application/json',
									onChange: function(e)
									{
										skip = false
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
										MMT目录.数据 = MMT目录.当前 = null
										$$('.nowChapter').text('')
										O(e)
										$$('.PLAYER_play').click()
									}
								}), (0, k.jsx)(T,
								{
									style: o && a ?
									{
										display: "none"
									} :
									{},
									title: "上传存档",
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
										$$('.PLAYER_play').hide().next().hide()
									},
									children: (0, k.jsx)(I,
									{
										icon: y.EyR
									})
								}),
								//*速度设置按钮
								(0, k.jsx)(T,
								{
									style: o && a ?
									{
										display: "none"
									} :
									{},
									title: "设置速度",
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
										src: href+"MoeData/Ui/setting.webp"
									})
								})
								//*速度设置按钮
								]
							}), (0, k.jsx)('span',
							{
								style: o && a ?
								{
									display: "none"
								} :
								{},
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
								}), (0, k.jsx)(T,
								{
									style: o && !a ?
									{
										display: "none"
									} :
									{
										marginRight: "1rem"
									},
									title: "跳过",
									disabled: _.length < 1,
									onClick: function()
									{
										$$('.PLAYER_play').click()
										skip = true
										let chat = [..._,...[{content:"끝",isFirst:true,replyDepth:0,sCharacter:{no:0,index:1},type:"end"}]]
										let json = {
											nowChats: chat,
											replyDepth: 0,
											chats: chat,
											chatSpeed: (0, g.zP)(),
											header: {},
											board_no: 0
										}
										L((0, p.Fe)(json))
										let 章节 = '1/1'
										if(MMT目录.当前)章节 = `${MMT目录.当前[1]+1}/${MMT目录.作品[MMT目录.当前[0]].章节+1}`
										$$('#size').text(`章节:${章节}\n进度:${chat.length}/${chat.length}`)
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
									{
										marginRight: "1rem"
									},
									title: "上一章",
									disabled: _.length < 1,
									onClick: function()
									{
										if(!MMT目录.当前)return;
										let 当前作品 = MMT目录.作品[MMT目录.当前[0]]
										if(MMT目录.当前[1]-1 < 0)return;
										else MMT目录.当前[1]--
										$$(`.播放${MMT目录.当前[0]}-${MMT目录.当前[1]}`).click()
									},
									children: (0, k.jsx)(I,
									{
										style:
										{
											marginLeft: "0.7rem"
										},
										icon: y.J0P
									})
								}), (0, k.jsx)(T,
								{
									style: o && !a || !pause ?
									{
										display: "none"
									} :
									{
										marginRight: "1rem"
									},
									title: '播放',
									className: "PLAYER_play",
									onClick: function()
									{
										$$('.PLAYER_play').hide().next().show().css('marginRight','1rem')
										pause = false
										if(!skip)
										{
											_.length < 1 || 100 === N || L((0, p.eS)(100))
											L((0, p.eS)(1))
											L((0, p.eS)((0, g.zP)()))
										}
										
									},
									children: (0, k.jsx)(I,
									{
										style:
										{
											marginLeft: "0.7rem"
										},
										icon: y.zc
									})
								}), (0, k.jsx)(T,
								{
									style: o && !a || pause ?
									{
										display: "none"
									} :
									{
										marginRight: "1rem"
									},
									title: '暂停',
									className: "PLAYER_pause",
									onClick: function(e)
									{
										$$('.PLAYER_pause').hide().prev().show().css('marginRight','1rem')
										pause = true
										
									},
									children: (0, k.jsx)(I,
									{
										style:
										{
											marginLeft: "0.7rem"
										},
										icon: y.XQY
									})
								}), (0, k.jsx)(T,
								{
									style: o && !a ?
									{
										display: "none"
									} :
									{
										marginRight: "1rem"
									},
									title: "下一章",
									disabled: _.length < 1,
									onClick: function()
									{
										if(!MMT目录.当前)return;
										let 当前作品 = MMT目录.作品[MMT目录.当前[0]]
										if(MMT目录.当前[1]+1 > 当前作品.章节)return;
										else MMT目录.当前[1]++
										$$(`.播放${MMT目录.当前[0]}-${MMT目录.当前[1]}`).click()
									},
									children: (0, k.jsx)(I,
									{
										style:
										{
											marginLeft: "0.7rem"
										},
										icon: y.Jwg
									})
								}), (0, k.jsx)(T,
								{
									style: o && !a ?
									{
										display: "none"
									} :
									{},
									title: "重新加载",
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
									chatSpeed: (0, g.zP)(),
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
								if(!MMT目录.当前 || MMT目录.当前[1]+1 > MMT目录.作品[MMT目录.当前[0]].章节)
								{
									n()
									MMT目录.当前 = null
									$$('.nowChapter').text('')
									return;
								}
								MMT目录.当前[1]++
								$$(`.播放${MMT目录.当前[0]}-${MMT目录.当前[1]}`).click()
							},
							children: MMT目录.当前 && MMT目录.当前[1] < MMT目录.作品[MMT目录.当前[0]].章节 ? '点击前往下一章' : r.Z.end[t]
						})]
					})
				},
				p = c.ZP.div.withConfig(
				{
					displayName: "EndBox__Container",
					componentId: "sc-1bnhokl-0"
				})(["", ";height:auto;padding:0.5rem;font-size:1.1rem;border:1px solid ", ";border-radius:1rem;color:", ";background-color:", `;background-image:url('${href}MoeData/Ui/Popup_Img_Deco_2.webp');background-repeat:no-repeat;background-position:right top;background-size:auto 10rem;line-height:1.5rem;`], function(e)
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
							// children: t.content || ((t.name || loadname(t.sCharacter.no,t.sCharacter.index))+r.Z.go_relationship_event[d])
							dangerouslySetInnerHTML: {__html: t.content || ((t.name || loadname(t.sCharacter.no,t.sCharacter.index))+r.Z.go_relationship_event[d])}
						})]
					})
				},
				_ = c.ZP.div.withConfig(
				{
					displayName: "HeartBox__Container",
					componentId: "sc-1gwqj71-0"
				})(["", ";padding:0.5rem;font-size:1.1rem;height:auto;border:1px solid ", ";border-radius:1rem;color:", ";background-color:", `;background-image:url('${href}MoeData/Ui/Favor_Schedule_Deco.webp');background-repeat:no-repeat;background-position:right;background-size:auto 100%;line-height:1.5rem;`], function(e)
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
								// children: t.content.replaceAll("{name}", c).split('\n')[index]//
								dangerouslySetInnerHTML: {__html: t.content.replaceAll("{name}", c).split('\n')[index]}
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
				{//播放器页面
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
					let isFirst = isfirst(n.chats.indexOf(t),n.chats,'player')
					let isCenter = t.isCenter && t.type === 'image'
					let style = MMT目录.设置['文字样式'][t.type] ? MMT目录.设置['文字样式'][t.type] : {}
					delete style.textAlign
					style = {...style,...{}}//防止连带修改设置属性
					foreach([...MMT目录.设置.风格样式[t.type] || [],...t.style || []],function(k,v)
					{
						style[v[0]] = v[1]
					})
					if(t.heads && (!t.heads.list || t.heads.list.length < 1))delete t.heads
					if(!t.content)t.content = ''
					if(!t.file)t.file = ''
					return [(0, m.jsxs)(m.Fragment,
					{
						children: d ? (0, m.jsxs)(m.Fragment,
						{
							children: (0, m.jsxs)('div',
							{//整体图文消息
								className: '聊天',
								children: [!isCenter && !t.isRight ? (0, m.jsx)('div',
								{//左侧头像框
									className: '头像框',
									style: t.sCharacter.no != 0 ? 
									{
										pointerEvents: 'none',
										minWidth: t.heads && isFirst ? "max-content" : "5rem",
										paddingRight: t.heads && isFirst ? "1rem" : "auto",
										flexDirection: t.heads ? t.heads.direction : ""
									} : {marginRight: '1.5rem'},
									children: isFirst && t.sCharacter.no != 0 ? [(0, m.jsx)('img',
									{//左侧头像
										className: '头像',
										style: {zIndex: t.heads ? t.heads.list.length : ''},
										src: loadhead(t.sCharacter.no,t.sCharacter.index),
										onError: function(e){IMAGE_error(e)},
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
											onError: function(e){IMAGE_error(e)}
										})
									}) : ''] : ''
								}) : '', (0, m.jsxs)("div",
								{//图文消息
									className: "对话",
									style: 
									{
										alignItems: isCenter ? 'center' : t.isRight || t.sCharacter.no == 0 ? 'flex-end' : 'flex-start',
										height: t.heads && t.heads.fullHeight ? '100%' : ''
									},
									children: [!isCenter && isFirst && t.sCharacter.no != 0 ? (0, m.jsx)("span",
									{//人物名称
										className: "名称 bold",
										dangerouslySetInnerHTML: {__html: t.name || loadname(t.sCharacter.no,t.sCharacter.index)}
									}) : '' , (0, m.jsxs)("div",
									{//消息内容
										style:
										{
											display: "flex",
											height: "100%",
											justifyContent: isCenter ? 'center' : t.isRight || t.sCharacter.no == 0 ? 'flex-end' : '',
										},
										children: [t.time ? (0, m.jsx)(eN.i9,
										{//左侧时间戳
											className: '时间戳',
											hidden: (!t.time || t.sCharacter.no != 0) && !t.isRight,
											dangerouslySetInnerHTML: {__html: t.time}// children: t.time
										}) : '', [!t.isRight && isFirst && t.sCharacter.no != 0 ? (0, m.jsx)('div',
										{className: '左角',style:{borderRightColor:style['background-color']}}) : '',(0, m.jsx)('span',
										{//文本消息
											className: '文本',
											style: t.isRight || t.sCharacter.no == 0 ? {...{background: 'rgb(74, 138, 202)'},...style} : style,
											// children: f
											dangerouslySetInnerHTML: {__html: f}
										}), (t.isRight && isFirst) || t.sCharacter.no == 0 ? (0, m.jsx)('div',
										{className: '右角',style:{borderLeftColor:style['background-color']}}) : '' ], t.time ? (0, m.jsx)(s.i9,
										{//右侧时间戳
											className: '时间戳',
											hidden: !t.time || t.sCharacter.no == 0 || t.isRight,
											dangerouslySetInnerHTML: {__html: t.time}// children: t.time
										}) : '']
									})]
								}), !isCenter && t.isRight && t.sCharacter.no != 0 ? (0, m.jsx)('div',
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
										onError: function(e){IMAGE_error(e)},
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
											onError: function(e){IMAGE_error(e)}
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
									// children: v,
									dangerouslySetInnerHTML: {__html: v},
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
				})(["", ";height:auto;padding:0.5rem;font-size:1.1rem;border:1px solid ", ";border-radius:1rem;color:", ";background-color:", `;background-image:url('${href}MoeData/Ui/Popup_Img_Deco_2.webp');background-repeat:no-repeat;background-position:right top;background-size:auto 10rem;line-height:1.5rem;`], function(e)
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
							let 章节 = '1/1'
							if(MMT目录.当前)章节 = `${MMT目录.当前[1]+1}/${MMT目录.作品[MMT目录.当前[0]].章节+1}`
							$$('#size').text(`章节:${章节}\n进度:${(n+1) ? (n+1) : e.chats.length}/${e.chats.length}`)
							if("end" === t.type || "reply" === t.type || "heart" === t.type)r((0, i.eS)((0, l.zP)()));
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
					let isFirst = isfirst(c.chats.indexOf(t),c.chats,'player')
					let isCenter = t.isCenter && t.type === 'image'
					let style = MMT目录.设置['文字样式'][t.type] ? MMT目录.设置['文字样式'][t.type] : {}
					delete style.textAlign,style = {...style,...{}}//防止连带修改设置属性
					foreach([...MMT目录.设置.风格样式[t.type] || [],...t.style || []],function(k,v)
					{
						style[v[0]] = v[1]
					})
					if(t.type === 'info')
					{
						t.isLeft ? style.textAlign = 'left' : ''
						t.isRight ? style.textAlign = 'right' : ''
					}
					if(t.heads && (!t.heads.list || t.heads.list.length < 1))delete t.heads
					if(!t.content)t.content = ''
					if(!t.file)t.file = ''
					return (0, a.useEffect)(function()
					{
						if(!pause)
						{
							if(n(), x && !(c.chats.length < 1))
							{
								var e = 100;
								// "chat" === t.type && t.sCharacter.no !== d.I.no ? e = 50 * t.content.length > 4e3 ? 4e3 : 50 * t.content.length + 500 : ("image" === t.type || "chat" === t.type && t.sCharacter.no === d.I.no) && (e = 300);
								"chat" === t.type || "info" === t.type ? e = 50 * t.content.length > 4e3 ? 4e3 : 50 * t.content.length + 500 : ("image" === t.type || "chat" === t.type) && (e = 300);
								var r = setTimeout(function()
								{
									_(!1);
									var e = setTimeout(function()
									{
										if(!skip)y(c, t)
									}, !skip ? (800 / c.chatSpeed) : 0);
									if(!(c.chats.length < 1)) return function()
									{
										return clearTimeout(e)
									}
								}, !skip ? (e / c.chatSpeed) : 0);
								return function()
								{
									return clearTimeout(r)
								}
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
									children: [!isCenter && !t.isRight ? (0, m.jsx)('div',
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
											onError: function(e){IMAGE_error(e)},
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
												onError: function(e){IMAGE_error(e)}
											})
										}) : ''] : ''
									}) : '', (0, m.jsxs)("div",
									{//图文消息
										className: "对话",
										style: 
										{
											alignItems: isCenter ? 'center' : t.isRight || t.sCharacter.no == 0 ? 'flex-end' : 'flex-start',
											height: t.heads && t.heads.fullHeight ? '100%' : ''
										},
										children: [!isCenter && isFirst && t.sCharacter.no != 0 ? (0, m.jsx)("span",
										{//人物名称
											className: "名称 bold",
											dangerouslySetInnerHTML: {__html: t.name || loadname(t.sCharacter.no,t.sCharacter.index)}
										}) : '' , (0, m.jsxs)("div",
										{//消息内容
											style:
											{
												display: "flex",
												height: "100%",
												justifyContent: isCenter ? 'center' : t.isRight || t.sCharacter.no == 0 ? 'flex-end' : '',
											},
											children: [t.time ? (0, m.jsx)(s.i9,
											{//左侧时间戳
												className: '时间戳',
												hidden: (!t.time || t.sCharacter.no != 0) && !t.isRight,
												dangerouslySetInnerHTML: {__html: t.time}// children: t.time
											}) : '', "chat" === t.type ? [!t.isRight && isFirst && t.sCharacter.no != 0 ? (0, m.jsx)('div',
											{className: '左角',style:{borderRightColor:style['background-color']}}) : '', (0, m.jsx)('span',
											{//文本消息
												className: '文本',
												style: t.isRight || t.sCharacter.no == 0 ? {...{background: 'rgb(74, 138, 202)'},...style} : style,
												// children: x ? (0, m.jsx)(I,{}) : t.content
												dangerouslySetInnerHTML: {__html: x ? '<div class="PLAYER_Loading"></div>' : t.content}
											}), (t.isRight && isFirst) || t.sCharacter.no == 0 ? (0, m.jsx)('div',
											{className: '右角',style:{borderLeftColor:style['background-color']}}) : '' ] : (0, m.jsx)('img',
											{//图片消息
												className: '图片',
												style:
												{
													maxHeight: t.content.indexOf("Face")>=0 || t.file.indexOf("Face")>=0 ? '360px' : "",
													maxWidth: t.content.indexOf("Face")>=0 || t.file.indexOf("Face")>=0 ? MMT目录.设置['差分比例'] : MMT目录.设置['图片比例']
												},//@差分表情宽高百分比
												src: t.file.indexOf(":image") > -1 ? t.file : href+t.file,
												title: t.file.indexOf(":image") > -1 ? '' : t.file,
												onError: function(e){IMAGE_error(e)},
											}), t.time ? (0, m.jsx)(s.i9,
											{//右侧时间戳
												className: '时间戳',
												hidden: !t.time || t.sCharacter.no == 0 || t.isRight || isCenter,
												dangerouslySetInnerHTML: {__html: t.time}// children: t.time
											}) : '']
										})]
									}), !isCenter && t.isRight && t.sCharacter.no != 0 ? (0, m.jsx)('div',
									{//右侧头像框
										className: '头像框',
										style:
										{
											pointerEvents: 'none',
											justifyContent:'flex-end',
											minWidth: t.heads && isFirst ? "max-content" : "5rem",
											paddingLeft: t.heads && isFirst ? "1rem" : "auto",
											flexDirection: t.heads ? t.heads.direction : ""
										},
										children: isFirst && t.sCharacter.no != 0 ? [(0, m.jsx)('img',
										{
											className: '头像',
											src: loadhead(t.sCharacter.no,t.sCharacter.index),
											onError: function(e){IMAGE_error(e)},
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
												onError: function(e){IMAGE_error(e)}
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
								// children: t.content
								dangerouslySetInnerHTML: {__html: t.content}
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
					return e.theme.color.rgb220_229_232
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
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
	[435],
	{
		3836: function(t, e, n)
		{
			"use strict";
			n.r(e);
			var a = n(5615),
				i = n(330),
				o = n(5563),
				r = n(939),
				s = n(9008),
				l = n.n(s),
				c = n(7294),
				m = n(9521),
				u = n(5893);
			e.default = function()
			{
				var t = (0, c.useRef)(null);
				return (0, u.jsxs)(u.Fragment,
				{
					children: [(0, u.jsxs)(l(),
					{
						children: [(0, u.jsx)("title",
						{
							children: "MomoTalk Player"
						}), (0, u.jsx)("meta",
						{
							name: "description",
							content: "This is the MoeTalk MomoTalk Player Page. (몰루톡/モルトーク)"
						}), (0, u.jsx)("meta",
						{
							name: "keywords",
							content: "몰루톡, MoeTalk, モルトーク, MomoTalk Player, 비공개톡"
						}), (0, u.jsx)("meta",
						{
							property: "og:title",
							content: "MomoTalk Player"
						}), (0, u.jsx)("meta",
						{
							property: "og:image",
							content: `${MoeTalkURL}/Images/Ui/Favor_Schedule_Deco.webp`
						}), (0, u.jsx)("meta",
						{
							property: "og:site_name",
							content: "MomoTalk Player"
						}), (0, u.jsx)("meta",
						{
							property: "og:description",
							content: "This is the MoeTalk MomoTalk Player Page. (몰루톡/モルトーク)"
						}), (0, u.jsx)("meta",
						{
							name: "twitter:title",
							content: "MomoTalk Player"
						}), (0, u.jsx)("meta",
						{
							name: "twitter:description",
							content: "This is the MoeTalk MomoTalk Player Page. (몰루톡/モルトーク)"
						}), (0, u.jsx)("meta",
						{
							name: "twitter:image",
							content: `${MoeTalkURL}/Images/Ui/Favor_Schedule_Deco.webp`
						}), (0, u.jsx)("meta",
						{
							name: "twitter:card",
							content: "summary_large_image"
						})]
					}), (0, u.jsxs)(p,
					{
						children: [(0, u.jsx)(a.Z,
						{
							childrens: [(0, u.jsx)(o.Z,
							{
								ssrBoard: null
							}, 0), (0, u.jsx)(r.Z,
							{
								scrollRef: t
							}, 1)]
						}), (0, u.jsx)(i.Z,
						{
							scrollRef: t
						})]
					})]
				})
			};
			var p = m.ZP.div.withConfig(
			{
				displayName: "pageNum__Container",
				componentId: "sc-889ogc-0"
			})(["", ""], function(t)
			{
				return t.theme.common.flexBox(
				{
					direction: "column"
				})
			})
		},
		8334: function(t, e, n)
		{
			(window.__NEXT_P = window.__NEXT_P || []).push([player, function()
			{
				return n(3836)
			}])
		}
	},
	function(t)
	{
		t.O(0, [288, 876, 648, 333, 563, 774, 888, 179], function()
		{
			return t(t.s = 8334)
		}), _N_E = t.O()
	}
]);