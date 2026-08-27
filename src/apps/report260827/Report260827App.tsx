import { useNavigate } from 'react-router-dom';
import './report260827.css';

// 甲状腺癌术后检查可视化报告（2026-08-27）
// 内容为静态移植自独立 HTML 页面，仅做展示，无数据交互
function Report260827App() {
  const navigate = useNavigate();

  return (
    <div>
      <header className="bg-white shadow-sm print:hidden">
        <div className="max-w-[1100px] mx-auto px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => navigate('/')}
            className="p-2 -ml-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-600 hover:text-gray-900"
            title="返回主屏幕"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="min-w-0">
            <div className="text-base font-bold text-gray-800 truncate">report260827</div>
            <p className="text-xs text-gray-500 truncate mt-0.5">
              甲状腺癌术后检查可视化报告 · 2026-08-27
            </p>
          </div>
        </div>
      </header>

      <div className="report260827-app">
        <div className="wrap">
          <section className="hero">
            <div className="eyebrow">2026-08-27 · 甲状腺术后随访</div>
            <h1>甲状腺癌术后检查可视化报告</h1>
            <div className="sub">
              基于本次甲状腺功能/肿瘤相关化验及颈部超声整理。用于辅助理解检查结果，不替代专科医生结合既往病理、手术范围及连续随访作出的判断。
            </div>
          </section>

          <section className="section">
            <div className="grid grid-3">
              <div className="card metric">
                <div className="label">总体影像信号</div>
                <div className="value">未见明确复发描述</div>
                <div className="note">超声未报告明确局灶复发灶或典型转移性淋巴结征象。</div>
              </div>
              <div className="card metric">
                <div className="label">最需确认</div>
                <div className="value">TSH 0.036 ↓</div>
                <div className="note">
                  明显抑制；术后可能为治疗目的，但目标值应结合复发风险及当前治疗反应。
                </div>
              </div>
              <div className="card metric">
                <div className="label">解读关键</div>
                <div className="value">TgAb 139 ↑</div>
                <div className="note">
                  TgAb 阳性时，Tg 可能被干扰而偏低，因此 Tg&lt;0.04 不能单独判断“完全没有病灶”。
                </div>
              </div>
            </div>
          </section>

          <section className="section">
            <h2>一、化验指标总览</h2>
            <table>
              <thead>
                <tr>
                  <th>项目</th>
                  <th>结果</th>
                  <th>参考区间</th>
                  <th>状态</th>
                  <th>解读</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>FT3 游离三碘甲状腺原氨酸</td>
                  <td>
                    <strong>5.51 pmol/L</strong>
                  </td>
                  <td>3.10–6.80</td>
                  <td>
                    <span className="tag tag-ok">正常</span>
                  </td>
                  <td>在参考范围内。</td>
                </tr>
                <tr>
                  <td>FT4 游离甲状腺素</td>
                  <td>
                    <strong>20.00 pmol/L</strong>
                  </td>
                  <td>12.00–22.00</td>
                  <td>
                    <span className="tag tag-ok">正常</span>
                  </td>
                  <td>处于正常范围偏高端。</td>
                </tr>
                <tr>
                  <td>TSH 促甲状腺激素</td>
                  <td>
                    <strong>0.036 mIU/L</strong>
                  </td>
                  <td>0.270–4.200</td>
                  <td>
                    <span className="tag tag-danger">明显降低</span>
                  </td>
                  <td>若正在使用左甲状腺素进行术后 TSH 抑制，这可能是治疗造成；不建议自行减药。</td>
                </tr>
                <tr>
                  <td>TgAb / A-TG 抗甲状腺球蛋白抗体</td>
                  <td>
                    <strong>139 IU/mL</strong>
                  </td>
                  <td>0–115</td>
                  <td>
                    <span className="tag tag-warn">升高</span>
                  </td>
                  <td>
                    轻度升高，最重要的是与既往结果比较趋势：下降、稳定还是持续升高。
                  </td>
                </tr>
                <tr>
                  <td>TPOAb / A-TPO 抗甲状腺过氧化物酶抗体</td>
                  <td>
                    <strong>12.50 IU/mL</strong>
                  </td>
                  <td>0–34.00</td>
                  <td>
                    <span className="tag tag-ok">正常</span>
                  </td>
                  <td>在参考范围内。</td>
                </tr>
                <tr>
                  <td>Tg 甲状腺球蛋白</td>
                  <td>
                    <strong>&lt;0.04 ng/mL</strong>
                  </td>
                  <td>3.50–77.00</td>
                  <td>
                    <span className="tag tag-info">术后需特殊解读</span>
                  </td>
                  <td>术后 Tg 很低通常是期望结果之一，但本次 TgAb 阳性，Tg 可能被低估。</td>
                </tr>
              </tbody>
            </table>
          </section>

          <section className="section">
            <h2>二、关键指标可视化</h2>
            <div className="grid grid-2">
              <div className="card">
                <h3>FT3</h3>
                <div className="muted small">5.51 / 参考 3.10–6.80</div>
                <div className="bar">
                  <div className="fill fill-ok" style={{ width: '65%' }}></div>
                </div>
              </div>
              <div className="card">
                <h3>FT4</h3>
                <div className="muted small">20.00 / 参考 12.00–22.00</div>
                <div className="bar">
                  <div className="fill fill-ok" style={{ width: '80%' }}></div>
                </div>
              </div>
              <div className="card">
                <h3>TSH</h3>
                <div className="muted small">0.036 / 参考 0.270–4.200</div>
                <div className="bar">
                  <div className="fill fill-danger" style={{ width: '8%' }}></div>
                </div>
                <div className="small" style={{ marginTop: '8px', color: 'var(--danger)' }}>
                  明显低于参考下限
                </div>
              </div>
              <div className="card">
                <h3>TgAb</h3>
                <div className="muted small">139 / 上限 115</div>
                <div className="bar">
                  <div className="fill fill-warn" style={{ width: '87%' }}></div>
                </div>
                <div className="small" style={{ marginTop: '8px', color: 'var(--warn)' }}>
                  轻度高于上限，建议看趋势
                </div>
              </div>
            </div>
          </section>

          <section className="section">
            <h2>三、颈部超声结果</h2>
            <div className="figure">
              <svg viewBox="0 0 760 360" width="100%" role="img" aria-label="甲状腺术后超声结构示意图">
                <rect x="0" y="0" width="760" height="360" rx="16" fill="#fbfcfe" />
                <text x="24" y="32" fontSize="13" fill="#667085">
                  结构示意图（非解剖比例）
                </text>
                <path
                  d="M380 50 C350 85 338 120 338 175 C338 235 352 280 380 316 C408 280 422 235 422 175 C422 120 410 85 380 50Z"
                  fill="none"
                  stroke="#cfd4dc"
                  strokeWidth="4"
                />
                <path
                  d="M398 125 C443 112 485 127 494 161 C503 199 477 229 434 231 C403 232 391 200 398 125Z"
                  fill="#cfe8df"
                  stroke="#0f9f6e"
                  strokeWidth="3"
                />
                <text x="446" y="264" textAnchor="middle" fontSize="16" fill="#182230">
                  残余右侧甲状腺叶
                </text>
                <text x="446" y="288" textAnchor="middle" fontSize="13" fill="#667085">
                  约 2.0 × 0.9 × 1.1 cm
                </text>

                <circle cx="275" cy="214" r="22" fill="#fde7ce" stroke="#d97706" strokeWidth="3" />
                <circle cx="240" cy="245" r="16" fill="#fff2df" stroke="#d97706" strokeWidth="2" />
                <circle cx="300" cy="252" r="14" fill="#fff2df" stroke="#d97706" strokeWidth="2" />
                <text x="246" y="300" fontSize="16" fill="#182230">
                  左侧颈部 IV 区多发淋巴结
                </text>
                <text x="246" y="324" fontSize="13" fill="#667085">
                  最大约 0.8 × 0.5 × 0.5 cm；淋巴门可见
                </text>
              </svg>
              <div className="legend">
                <span>
                  <span className="dot" style={{ background: '#0f9f6e' }}></span>残余右侧叶
                </span>
                <span>
                  <span className="dot" style={{ background: '#d97706' }}></span>左侧 IV 区淋巴结
                </span>
              </div>
            </div>

            <div className="grid grid-3" style={{ marginTop: '16px' }}>
              <div className="card">
                <h3>残余右侧叶</h3>
                <div className="muted small">约 2.0 × 0.9 × 1.1 cm</div>
                <p>实质回声不均匀、质地偏软，可见多处小片状低回声区，报告提示“弥漫性病变”。</p>
              </div>
              <div className="card">
                <h3>左侧 IV 区淋巴结</h3>
                <div className="muted small">最大约 0.8 × 0.5 × 0.5 cm</div>
                <p>
                  淋巴门可见、皮质增厚。保留淋巴门是相对较令人放心的表现，但因有甲状腺癌病史仍建议连续复查比较。
                </p>
              </div>
              <div className="card">
                <h3>右侧颈部</h3>
                <p>报告未探及明确异常形态淋巴结。</p>
              </div>
            </div>
          </section>

          <section className="section">
            <h2>四、综合解读</h2>
            <div className="callout ok">
              <strong>相对令人放心：</strong>
              FT3、FT4 正常；右侧颈部未见明确异常淋巴结；左侧 IV 区小淋巴结仍可见淋巴门；超声没有描述明确的局灶性复发病灶。
            </div>
            <div className="callout warn" style={{ marginTop: '12px' }}>
              <strong>需要重点追踪：</strong>
              TgAb 139 IU/mL 阳性，会影响 Tg 的解释。比单次绝对值更重要的是过去几次 TgAb
              是否持续下降、稳定还是持续升高。
            </div>
            <div className="callout danger" style={{ marginTop: '12px' }}>
              <strong>需要确认治疗目标：</strong>
              TSH 0.036 mIU/L 已处于明显抑制状态。甲状腺癌术后有时会有意将 TSH
              压低，但压到什么程度应结合最初病理、分期、是否有淋巴结转移、是否接受碘-131，以及当前是否存在疾病证据来决定。
            </div>
          </section>

          <section className="section">
            <h2>五、下一步建议</h2>
            <div className="card">
              <ol>
                <li>
                  <strong>不要自行调整左甲状腺素剂量。</strong>
                  先向甲乳外科或内分泌科确认当前个体化 TSH 目标。
                </li>
                <li>
                  <strong>把以前的 Tg + TgAb 一起找出来。</strong>
                  最好比较同一家医院、同一检测方法下的连续趋势。
                </li>
                <li>
                  <strong>把本次左侧 IV 区淋巴结与上次超声逐个比较。</strong>
                  重点看短径、形态、淋巴门、钙化、囊性变和血流是否变化。
                </li>
                <li>
                  若淋巴结后续明显增大或出现高危超声特征，由专科医生判断是否需要超声引导穿刺，必要时可结合穿刺液 Tg。
                </li>
                <li>
                  如果长期维持较强 TSH 抑制，建议医生同时评估心率/心律及骨量等长期风险。
                </li>
              </ol>
            </div>
          </section>

          <section className="section">
            <div className="callout">
              <strong>一句话总结：</strong>
              这次检查没有直接提示明确复发，但并不能只凭 “Tg 很低”
              就下结论；当前最有价值的是结合既往病理和历次 TgAb、超声趋势来判断整体风险。
            </div>
          </section>

          <div className="footer">
            医疗提示：本报告由 AI 根据用户上传的检查单进行结构化整理，仅用于辅助阅读与就诊沟通，不构成诊断或治疗建议。如出现快速增大的颈部包块、持续声音嘶哑、吞咽/呼吸困难等新症状，请提前就医。
          </div>
        </div>
      </div>
    </div>
  );
}

export default Report260827App;
