"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
	[117],
	{
		5615: function(e, t, n)
		{
			var r = n(6150),
				i = n(7294),
				o = n(9521),
				c = n(5893);
			t.Z = function(e)
			{
				var t = e.childrens,
					n = (0, i.useState)(0),
					o = n[0],
					u = n[1],
					m = (0, r.C)(function(e)
					{
						return e.global.isRight
					}),
					d = (0, r.C)(function(e)
					{
						return e.global.isMobile
					});
				return (0, i.useEffect)(function()
				{
					u(m ? 1 : 0)
				}, [m]), (0, c.jsx)(s,
				{
					children: (0, c.jsx)(a,
					{
						children: t.map(function(e, t)
						{
							return (0, c.jsx)(l,
							{
								style:
								{
									width: d && o !== t ? "0" : "100%"
								},
								children: e
							}, t)
						})
					})
				})
			};
			var s = o.ZP.div.withConfig(
				{
					displayName: "MainSlider__Container",
					componentId: "sc-x1wvnd-0"
				})(["width:100%;height:100%;overflow:hidden;position:relative;"]),
				a = o.ZP.div.withConfig(
				{
					displayName: "MainSlider__Slider",
					componentId: "sc-x1wvnd-1"
				})(["display:flex;width:100%;height:100%;"]),
				l = o.ZP.div.withConfig(
				{
					displayName: "MainSlider__Slide",
					componentId: "sc-x1wvnd-2"
				})(["transition:width 300ms ease-in-out;width:100%;height:100%;overflow:hidden;"])
		},
		8024: function(e, t, n)
		{
			var r = n(9499),
				i = n(7294),
				o = n(5280),
				c = n(1728),
				s = n(5893);

			function a(e, t)
			{
				var n = Object.keys(e);
				if(Object.getOwnPropertySymbols)
				{
					var r = Object.getOwnPropertySymbols(e);
					t && (r = r.filter(function(t)
					{
						return Object.getOwnPropertyDescriptor(e, t).enumerable
					})), n.push.apply(n, r)
				}
				return n
			}

			function l(e)
			{
				for(var t = 1; t < arguments.length; t++)
				{
					var n = null != arguments[t] ? arguments[t] :
					{};
					t % 2 ? a(Object(n), !0).forEach(function(t)
					{
						(0, r.Z)(e, t, n[t])
					}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : a(Object(n)).forEach(function(t)
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
					r = e.selected,
					a = e.rowHeight,
					u = (0, i.useRef)(null),
					m = (0, i.useState)([]),
					d = m[0],
					h = m[1];
				(0, i.useEffect)(function()
				{
					u.current && t.length > 0 && h(t.map(function(e, t)
					{
						return setTimeout(function()
						{
							var e;
							null == u || null === (e = u.current) || void 0 === e || e.resetAfterIndex(t)
						}, 0), r === t ? 2 * a : a
					}))
				}, [r, t, u, a, h]);
				var p = function(e)
				{
					var n = e.index,
						r = e.style;
					return (0, s.jsx)("div",
					{
						style: l(l(
						{}, r),
						{},
						{
							transition: "all 300ms ease-in-out"
						}),
						children: t[n]
					})
				};
				return (0, s.jsx)(c.Z,
				{
					defaultHeight: n,
					children: function(e)
					{
						var n = e.width,
							r = e.height;
						return (0, s.jsx)(o.S_,
						{
							ref: u,
							height: r,
							width: n,
							itemCount: t.length,
							itemSize: function(e)
							{
								return d[e] || 0
							},
							overscanCount: 1,
							children: p
						})
					}
				})
			}
		},
		9406: function(e, t, n)
		{
			n.d(t,
			{
				Z: function()
				{
					return v
				}
			});
			var r = n(9499),
				i = n(3380),
				o = n(6150),
				c = n(7792),
				s = n(9436),
				a = n(1563),
				l = n(9417),
				u = n(7294),
				m = n(9521),
				d = n(5893);

			function h(e, t)
			{
				var n = Object.keys(e);
				if(Object.getOwnPropertySymbols)
				{
					var r = Object.getOwnPropertySymbols(e);
					t && (r = r.filter(function(t)
					{
						return Object.getOwnPropertyDescriptor(e, t).enumerable
					})), n.push.apply(n, r)
				}
				return n
			}

			function p(e)
			{
				for(var t = 1; t < arguments.length; t++)
				{
					var n = null != arguments[t] ? arguments[t] :
					{};
					t % 2 ? h(Object(n), !0).forEach(function(t)
					{
						(0, r.Z)(e, t, n[t])
					}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : h(Object(n)).forEach(function(t)
					{
						Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
					})
				}
				return e
			}
			var f = function()
				{
					var e = (0, u.useState)(!1),
						t = e[0],
						n = e[1],
						r = (0, o.T)(),
						s = (0, o.C)(function(e)
						{
							return e.music
						}),
						m = function()
						{
							var e = s.isLoop + 1 === 3 ? 0 : s.isLoop + 1;
							r((0, c.J9)(e)), localStorage.setItem("music", JSON.stringify(p(p(
							{}, s),
							{},
							{
								isLoop: e
							})))
						},
						h = function()
						{
							n(function(e)
							{
								return !e
							}), r((0, c.jA)(0)), localStorage.setItem("music", JSON.stringify(p(p(
							{}, s),
							{},
							{
								volume: 0
							})))
						},
						f = function()
						{
							var e, t = s.musics;
							s.playlistNo > 0 && (t = null === (e = s.playlists.filter(function(e)
							{
								return s.playlistNo === e.no
							})[0]) || void 0 === e ? void 0 : e.musics, s.isRandom || (t = (0, i.Sy)(t)));
							var n = {
								isRandom: !s.isRandom,
								musics: t
							};
							r((0, c.S9)(n)), localStorage.setItem("music", JSON.stringify(p(p(
							{}, s), n)))
						};
					return (0, d.jsxs)("div",
					{
						style:
						{
							display: "flex"
						},
						children: [(0, d.jsxs)(g,
						{
							volume: 100 * s.volume,
							mute: t,
							children: [(0, d.jsx)(w,
							{
								onClick: function()
								{
									h()
								},
								children: (0, d.jsx)(a.xL,
								{
									icon: t ? l.YLJ : l.AQZ
								})
							}), (0, d.jsx)("input",
							{
								type: "range",
								min: 0,
								max: 1,
								step: .05,
								value: s.volume || 0,
								onChange: function(e)
								{
									var t = e.currentTarget.valueAsNumber;
									r((0, c.jA)(t)), n(!1), localStorage.setItem("music", JSON.stringify(p(p(
									{}, s),
									{},
									{
										volume: t
									})))
								}
							})]
						}), (0, d.jsxs)(b,
						{
							children: [(0, d.jsx)(w,
							{
								className: 0 === s.isLoop ? "disable" : 1 === s.isLoop ? "" : "oneLoop",
								style:
								{
									height: "1.2rem"
								},
								onClick: function()
								{
									m()
								},
								children: (0, d.jsx)(a.xL,
								{
									icon: l.jHE
								})
							}), (0, d.jsx)(w,
							{
								className: s.isRandom ? "" : "disable",
								onClick: function()
								{
									f()
								},
								children: (0, d.jsx)(a.xL,
								{
									icon: l.a_u
								})
							})]
						})]
					})
				},
				g = m.ZP.div.withConfig(
				{
					displayName: "VolumeControler__VolumeControl",
					componentId: "sc-1oqv2si-0"
				})(["display:flex;align-items:center;width:100%;input[type='range']{-webkit-appearance:none;height:100%;width:5rem;background:transparent;&:focus{outline:none;}&::-webkit-slider-thumb{-webkit-appearance:none;height:0.8rem;width:0.8rem;border-radius:50%;background:rgb(16,125,250);margin-top:-3px;cursor:pointer;}&::-webkit-slider-runnable-track{height:0.4rem;background:", ";opacity:", ";border-radius:3rem;transition:all 0.5s;cursor:pointer;}}"], function(e)
				{
					return "linear-gradient(to right, #79c3f5 ".concat(e.volume, "%, rgb(224, 226, 228) ").concat(e.volume, "% 100%)")
				}, function(e)
				{
					return e.volume && e.mute ? "0.5" : "1"
				}),
				b = m.ZP.div.withConfig(
				{
					displayName: "VolumeControler__Wrapper",
					componentId: "sc-1oqv2si-1"
				})(["display:flex;align-items:center;justify-content:flex-end;margin:0 auto;width:100%;"]),
				w = (0, m.ZP)(a.hU).withConfig(
				{
					displayName: "VolumeControler__VolumeButton",
					componentId: "sc-1oqv2si-2"
				})(["height:1.3rem;width:1.3rem;margin:0 0.5rem;color:", ";position:relative;&.disable{filter:grayscale(70%) brightness(250%);}&.oneLoop:after{content:'1';position:absolute;left:0.5rem;top:0.3rem;font-size:0.5rem;font-family:'bold';}"], function(e)
				{
					return e.theme.color.rgb45_70_100
				}),
				_ = n(1163);

			function y(e, t)
			{
				var n = Object.keys(e);
				if(Object.getOwnPropertySymbols)
				{
					var r = Object.getOwnPropertySymbols(e);
					t && (r = r.filter(function(t)
					{
						return Object.getOwnPropertyDescriptor(e, t).enumerable
					})), n.push.apply(n, r)
				}
				return n
			}

			function x(e)
			{
				for(var t = 1; t < arguments.length; t++)
				{
					var n = null != arguments[t] ? arguments[t] :
					{};
					t % 2 ? y(Object(n), !0).forEach(function(t)
					{
						(0, r.Z)(e, t, n[t])
					}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : y(Object(n)).forEach(function(t)
					{
						Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
					})
				}
				return e
			}
			var v = function()
				{
					var e = (0, o.C)(function(e)
						{
							return e.music
						}),
						t = (0, o.C)(function(e)
						{
							return e.musicTime
						}),
						n = (0, o.T)(),
						r = (0, u.useState)(!1),
						m = r[0],
						h = r[1],
						p = (0, _.useRouter)();
					(0, u.useEffect)(function()
					{
						"/music" === p.asPath && e.isPlaying && h(!0)
					}, [p, e.isPlaying]);
					var g = t.currentTime / t.totalTime,
						b = function()
						{
							var t = e.musics.indexOf(e.musicNo) - 1; - 1 === t ? (n((0, c.AL)(e.musics[e.musics.length - 1])), localStorage.setItem("music", JSON.stringify(x(x(
							{}, e),
							{},
							{
								musicNo: e.musics[e.musics.length - 1]
							})))) : (n((0, c.AL)(e.musics[t])), localStorage.setItem("music", JSON.stringify(x(x(
							{}, e),
							{},
							{
								musicNo: e.musics[t]
							}))))
						},
						w = function()
						{
							var t = e.musics.indexOf(e.musicNo) + 1;
							if(e.musics.length > t) n((0, c.AL)(e.musics[t])), localStorage.setItem("music", JSON.stringify(x(x(
							{}, e),
							{},
							{
								musicNo: e.musics[t]
							})));
							else
							{
								var r = e.musics;
								e.isRandom && (r = (0, i.Sy)(r), n((0, c.S9)(
								{
									isRandom: !0,
									musics: r
								}))), n((0, c.AL)(r[0])), localStorage.setItem("music", JSON.stringify(x(x(
								{}, e),
								{},
								{
									musicNo: r[0],
									musics: r
								})))
							}
						},
						y = function()
						{
							e.musicNo ? n((0, c.sB)(!e.isPlaying)) : n((0, c.AL)(e.musics[0]))
						};
					return (0, d.jsx)(j,
					{
						style:
						{
							height: m ? "17rem" : "2.5rem"
						},
						children: (0, d.jsxs)(P,
						{
							children: [(0, d.jsx)(C,
							{
								onClick: function()
								{
									h(function(e)
									{
										return !e
									})
								},
								children: (0, d.jsx)(a.xL,
								{
									style:
									{
										height: "1.5rem"
									},
									icon: m ? l.eW2 : l.l1h
								})
							}), (0, d.jsxs)(k,
							{
								style:
								{
									marginBottom: "1rem"
								},
								children: [(0, d.jsx)(a.NZ,
								{
									style:
									{
										borderRadius: "0.5rem",
										width: "7.5rem",
										height: "7.5rem",
										marginRight: "1rem"
									},
									width: 400,
									height: 400,
									src: (0, i.dZ)(e.musicNo).cover || "/image/music/arona_400x400.png",
									onError: function(e)
									{
										var t = e.currentTarget;
										(0, i.Mp)(t, "albumCover")
									},
									alt: "albumCover"
								}), (0, d.jsxs)(Z,
								{
									children: [(0, d.jsx)(S,
									{
										children: e.musicNo < 1 ? "No Music" : (e.musicNo < 1e3 ? e.musicNo + " - " : "") + (0, i.dZ)(e.musicNo).name
									}), (0, d.jsx)(q,
									{
										children: (0, i.dZ)(e.musicNo).artist.toString() || "-"
									}), (0, d.jsx)(q,
									{
										children: (0, i.dZ)(e.musicNo).album
									})]
								})]
							}), (0, d.jsxs)(k,
							{
								children: [(0, d.jsx)(I,
								{
									disabled: e.musics.length < 2,
									onClick: function()
									{
										b()
									},
									children: (0, d.jsx)(a.xL,
									{
										icon: l.J0P
									})
								}), (0, d.jsx)(I,
								{
									style:
									{
										height: "2.5rem"
									},
									disabled: e.musics.length < 1,
									onClick: function()
									{
										y()
									},
									children: (0, d.jsx)(a.xL,
									{
										icon: e.isPlaying ? l.XQY : l.zc
									})
								}), (0, d.jsx)(I,
								{
									disabled: e.musics.length < 2,
									onClick: function()
									{
										w()
									},
									children: (0, d.jsx)(a.xL,
									{
										icon: l.Jwg
									})
								}), (0, d.jsxs)(O,
								{
									children: [(0, d.jsx)(N,
									{
										children: (0, d.jsx)("input",
										{
											type: "range",
											min: 0,
											max: 1,
											step: .005,
											value: g || 0,
											onChange: function(e)
											{
												var r = e.currentTarget.valueAsNumber;
												n((0, s.GL)(r * t.totalTime))
											}
										})
									}), (0, d.jsxs)("div",
									{
										style:
										{
											display: "flex",
											width: "100%",
											justifyContent: "space-between"
										},
										children: [(0, d.jsx)("span",
										{
											children: new Date(1e3 * t.currentTime).toISOString().slice(14, 19)
										}), (0, d.jsx)("span",
										{
											children: new Date(1e3 * t.totalTime).toISOString().slice(14, 19)
										})]
									})]
								})]
							}), (0, d.jsx)(f,
							{})]
						})
					})
				},
				j = m.ZP.div.withConfig(
				{
					displayName: "MusicPlayer__Accordion",
					componentId: "sc-odl2jb-0"
				})(["transition:height 300ms ease-in-out;"]),
				P = m.ZP.div.withConfig(
				{
					displayName: "MusicPlayer__Container",
					componentId: "sc-odl2jb-1"
				})(["border-top:2px solid ", ";width:100%;padding:0 1rem 1rem 1rem;color:", ";"], function(e)
				{
					return e.theme.color.rgb230_233_235
				}, function(e)
				{
					return e.theme.color.rgb68_72_78
				}),
				C = m.ZP.div.withConfig(
				{
					displayName: "MusicPlayer__AccordionButton",
					componentId: "sc-odl2jb-2"
				})(["width:100%;padding:0.5rem 0;cursor:pointer;"]),
				N = m.ZP.div.withConfig(
				{
					displayName: "MusicPlayer__TimeControl",
					componentId: "sc-odl2jb-3"
				})(["display:flex;align-items:center;width:100%;input[type='range']{width:100%;}"]),
				k = m.ZP.div.withConfig(
				{
					displayName: "MusicPlayer__Wrapper",
					componentId: "sc-odl2jb-4"
				})(["display:flex;align-items:center;justify-content:center;margin:0 auto 1rem auto;width:100%;"]),
				O = m.ZP.div.withConfig(
				{
					displayName: "MusicPlayer__TimeWrapper",
					componentId: "sc-odl2jb-5"
				})(["display:flex;flex-direction:column;width:100%;"]),
				I = (0, m.ZP)(a.hU).withConfig(
				{
					displayName: "MusicPlayer__PlayButton",
					componentId: "sc-odl2jb-6"
				})(["flex-shrink:0;height:1.5rem;width:1.5rem;margin-right:1.5rem;color:", ";position:relative;&.selected:after{content:'';position:absolute;top:0;left:30%;height:100%;transform:rotate(20deg);border-right:10px double ", ";}"], function(e)
				{
					return e.theme.color.rgb45_70_100
				}, function(e)
				{
					return e.theme.color.rgb45_70_100
				}),
				Z = m.ZP.div.withConfig(
				{
					displayName: "MusicPlayer__FontDiv",
					componentId: "sc-odl2jb-7"
				})(["display:table;width:100%;table-layout:fixed;white-space:nowrap;"]),
				S = m.ZP.li.withConfig(
				{
					displayName: "MusicPlayer__FontSpan",
					componentId: "sc-odl2jb-8"
				})(["display:table-cell;display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;text-align:center;font-size:1.5rem;line-height:2rem;"]),
				q = (0, m.ZP)(S).withConfig(
				{
					displayName: "MusicPlayer__FontSpan2",
					componentId: "sc-odl2jb-9"
				})(["font-size:1rem;color :", ";"], function(e)
				{
					return e.theme.color.rgb111_119_127
				})
		},
		4330: function(e, t, n)
		{
			n.d(t,
			{
				HR: function()
				{
					return s
				},
				H_: function()
				{
					return c
				},
				TG: function()
				{
					return l
				},
				Tx: function()
				{
					return u
				},
				W2: function()
				{
					return i
				},
				im: function()
				{
					return o
				},
				vR: function()
				{
					return a
				}
			});
			var r = n(9521),
				i = r.ZP.div.withConfig(
				{
					displayName: "music__Container",
					componentId: "sc-1oemv01-0"
				})(["display:flex;height:auto;width:100%;position:relative;cursor:pointer;&:hover{background-color:", ";}&:active{background-color:", ";}&.selected{background-color:", ";}"], function(e)
				{
					return e.theme.color.rgb218_228_233
				}, function(e)
				{
					return e.theme.color.rgb202_215_221
				}, function(e)
				{
					return e.theme.color.rgb202_215_221
				}),
				o = r.ZP.div.withConfig(
				{
					displayName: "music__Wrapper",
					componentId: "sc-1oemv01-1"
				})(["display:flex;padding:1rem;justify-content:space-between;width:100%;"]),
				c = r.ZP.div.withConfig(
				{
					displayName: "music__MusicText",
					componentId: "sc-1oemv01-2"
				})(["display:flex;flex-direction:column;justify-content:space-around;width:100%;margin:0 0 0 1rem;padding-right:3rem;font-size:1.1rem;color:", ";"], function(e)
				{
					return e.theme.color.rgb68_72_78
				}),
				s = r.ZP.hr.withConfig(
				{
					displayName: "music__HR",
					componentId: "sc-1oemv01-3"
				})(["border:0;height:1px;background:", ";width:100%;margin:0px;"], function(e)
				{
					return e.theme.color.rgb218_225_229
				}),
				a = r.ZP.div.withConfig(
				{
					displayName: "music__FontDiv",
					componentId: "sc-1oemv01-4"
				})(["display:table;width:100%;table-layout:fixed;white-space:nowrap;"]),
				l = r.ZP.span.withConfig(
				{
					displayName: "music__FontSpan",
					componentId: "sc-1oemv01-5"
				})(["display:table-cell;display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;line-height:2rem;"]),
				u = (0, r.ZP)(l).withConfig(
				{
					displayName: "music__FontSpan2",
					componentId: "sc-1oemv01-6"
				})(["font-size:1rem;color:", ";"], function(e)
				{
					return e.theme.color.rgb111_119_127
				})
		},
		83: function(e, t, n)
		{
			n.d(t,
			{
				CJ: function()
				{
					return d
				},
				Dt: function()
				{
					return u
				},
				HR: function()
				{
					return f
				},
				LP: function()
				{
					return m
				},
				NZ: function()
				{
					return _
				},
				Xp: function()
				{
					return s
				},
				YJ: function()
				{
					return w
				},
				_x: function()
				{
					return p
				},
				g4: function()
				{
					return g
				},
				i9: function()
				{
					return b
				},
				tG: function()
				{
					return a
				},
				uU: function()
				{
					return o
				},
				vD: function()
				{
					return h
				},
				xu: function()
				{
					return c
				},
				zC: function()
				{
					return l
				}
			});
			var r = n(9521),
				i = n(1563),
				o = r.ZP.div.withConfig(
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
				s = r.ZP.div.withConfig(
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
				a = r.ZP.img.withConfig(
				{
					displayName: "talk__ImgBox",
					componentId: "sc-eq7cqw-3"
				})([`max-width:${mt_settings['图片比例']};border:2px solid ", ";background-color:rgb(255,255,255);padding:0.5rem;border-radius:10px;`], function(e)
				{
					return e.theme.color.rgb255_255_255
				}),
				l = r.ZP.span.withConfig(
				{
					displayName: "talk__TextBox",
					componentId: "sc-eq7cqw-4"
				})(["user-select:text;position:relative;color:white;width:fit-content;border-radius:10px;background:", ";border:1px solid ", ";white-space:pre-wrap;overflow-wrap:break-word;word-break:break-all;word-wrap:break-all;line-break:loose;padding:0.6rem;line-height:1.42;::after{content:'';position:absolute;left:-0.5rem;top:0.6rem;border-top:0.3rem solid transparent;border-right:0.5rem solid ", ";border-bottom:0.3rem solid transparent;}"], function(e)
				{//#文字样式
					return e.theme.color.rgb76_91_111
				}, function(e)
				{
					return e.theme.color.rgb76_91_111
				}, function(e)
				{
					return e.theme.color.rgb76_91_111
				}),
				u = (0, r.ZP)(l).withConfig(
				{
					displayName: "talk__NTextBox",
					componentId: "sc-eq7cqw-5"
				})(["::after{content:none;}"]),
				m = (0, r.ZP)(l).withConfig(
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
				d = r.ZP.div.withConfig(
				{
					displayName: "talk__Triangle",
					componentId: "sc-eq7cqw-7"
				})(["position:relative;::after{content:'';position:absolute;left:0;top:0.6rem;height:0;border-top:0.3rem solid transparent;border-bottom:0.3rem solid transparent;border-left:0.5rem solid ", ";}"], function(e)
				{
					return e.theme.color.rgb74_138_202
				}),
				h = r.ZP.span.withConfig(
				{
					displayName: "talk__InfoBox",
					componentId: "sc-eq7cqw-8"
				})(["user-select:text;position:relative;color:", ";width:100%;border-radius:10px;background:", ";text-align:center;white-space:pre-wrap;overflow-wrap:break-word;word-break:break-all;word-wrap:break-all;line-break:loose;padding:0.2rem 1rem;line-height:1.42;"], function(e)
				{//#
					return e.theme.color.rgb69_78_89
				}, function(e)
				{
					return mt_settings['风格样式'] === 'rgb(255,255,255)' ? 'rgb(220,229,232)' : 'transparent'//#自定义样式
				}),
				p = (0, r.ZP)(i.Mm).withConfig(
				{
					displayName: "talk__HeartButton",
					componentId: "sc-eq7cqw-9"
				})(["padding:0.5rem;height:max-content;color:white;background-color:", ";border-radius:0.5rem;border:none;border-bottom:0.1rem solid ", ";box-shadow:0rem 0.05rem 0.2rem ", ";line-height:1.42;&:hover{background-color:", ";}"], function(e)
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
				f = r.ZP.hr.withConfig(
				{
					displayName: "talk__HR",
					componentId: "sc-eq7cqw-10"
				})(["border:0;height:1px;background:", ";width:100%;"], function(e)
				{
					return e.theme.color.rgb218_225_229
				}),
				g = (0, r.ZP)(i.Mm).withConfig(
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
				b = r.ZP.span.withConfig(
				{
					displayName: "talk__TimeSpan",
					componentId: "sc-eq7cqw-12"
				})(["color :", ";font-size :0.9rem;margin:auto 0.5rem 0 0.5rem;flex-shrink:0;white-space: pre;"], function(e)
				{
					return e.theme.color.rgb69_78_89
				}),
				w = (0, r.ZP)(i.xL).withConfig(
				{
					displayName: "talk__CheckedIcon",
					componentId: "sc-eq7cqw-13"
				})(["width:1.1rem;height:1.1rem;margin-right:0.5rem;"]),
				_ = r.ZP.img.withConfig(
				{
					displayName: "talk__Profile",
					componentId: "sc-eq7cqw-14"
				})(["box-sizing:border-box;margin:0rem;width:4rem;height:4rem;object-fit:cover;border-radius:50%;"])//#
		}
	}
]);