import React, { useState, useEffect } from 'react';
import { 
  Play, 
  RotateCcw, 
  Mic, 
  Volume2, 
  CheckCircle2, 
  Sparkles, 
  TrendingUp, 
  Utensils, 
  Send, 
  Bot, 
  User, 
  BarChart2, 
  Sliders, 
  Check, 
  AlertCircle,
  Box
} from 'lucide-react';
import Analytics3DMesh from './Analytics3DMesh';

/* =========================================================================
   1. AI INTERVIEW PLATFORM SIMULATOR
========================================================================= */
export function InterviewPlatformSimulator() {
  const [role, setRole] = useState('Python Developer');
  const [isDiagnosticRunning, setIsDiagnosticRunning] = useState(false);
  const [diagnosticPassed, setDiagnosticPassed] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [candidateAnswer, setCandidateAnswer] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [rubricResult, setRubricResult] = useState(null);

  const questionsByRole = {
    'Python Developer': [
      "Explain Python's Global Interpreter Lock (GIL) and how memory management & garbage collection work.",
      "How do Python decorators and generators optimize runtime performance and memory efficiency?"
    ],
    'Backend Engineer': [
      "Describe how you design idempotent RESTful APIs and handle distributed database transactions.",
      "How do you implement connection pooling and caching strategies to scale relational databases like MySQL?"
    ],
    'Data Engineer': [
      "What is the difference between Star Schema and Snowflake Schema in analytical data modeling?",
      "How do window functions and indexing accelerate complex time-series queries on large datasets?"
    ]
  };

  const currentQuestions = questionsByRole[role] || questionsByRole['Python Developer'];
  const activeQuestion = currentQuestions[questionIndex % currentQuestions.length];

  const runDiagnostics = () => {
    setIsDiagnosticRunning(true);
    setDiagnosticPassed(false);
    setTimeout(() => {
      setIsDiagnosticRunning(false);
      setDiagnosticPassed(true);
    }, 1200);
  };

  const handleSpeakQuestion = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(activeQuestion);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    } else {
      setIsSpeaking(true);
      setTimeout(() => setIsSpeaking(false), 2000);
    }
  };

  const loadSampleAnswer = () => {
    if (role === 'Python Developer') {
      setCandidateAnswer(
        "Python's GIL is a mutex that prevents multiple native threads from executing Python bytecodes simultaneously. Memory management uses reference counting combined with a generational cyclic garbage collector (Gen 0, 1, 2) to detect reference cycles and deallocate memory."
      );
    } else if (role === 'Backend Engineer') {
      setCandidateAnswer(
        "Idempotent APIs ensure identical requests produce the same state change, typically handled with idempotency keys in headers. For database scaling, connection pooling prevents handshake overhead, while Redis caching offloads frequent read queries."
      );
    } else {
      setCandidateAnswer(
        "Star schema denormalizes dimensions for fast OLAP read queries, while Snowflake normalizes dimension tables. Window functions like ROW_NUMBER() and LAG() process row partitions without collapsing result sets."
      );
    }
  };

  const handleEvaluate = () => {
    if (!candidateAnswer.trim()) return;
    setIsEvaluating(true);
    setTimeout(() => {
      setIsEvaluating(false);
      setRubricResult({
        overallScore: 92,
        ewmaRating: "Strong Candidate (Level 4)",
        rubrics: [
          { name: "Technical Correctness", score: 95 },
          { name: "Relevance & Focus", score: 92 },
          { name: "Structure & Cohesion", score: 88 },
          { name: "Completeness", score: 90 },
          { name: "Clarity & Fluency", score: 94 }
        ],
        remediationFeedback: "Candidate accurately identified core mechanisms (GIL mutex, cyclic generational GC). Excellent response timing and precise architectural terminology."
      });
    }, 1000);
  };

  const handleReset = () => {
    setCandidateAnswer('');
    setRubricResult(null);
    setDiagnosticPassed(false);
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  };

  return (
    <div className="simulator-box interview-sim">
      <div className="sim-header">
        <div className="sim-title-wrap">
          <span className="badge badge-indigo">Live Platform Simulator</span>
          <h4 className="sim-title">AI Mock Interview Cockpit</h4>
        </div>
        <button type="button" className="sim-reset-btn" onClick={handleReset} title="Reset Simulator">
          <RotateCcw size={15} />
          <span>Reset</span>
        </button>
      </div>

      {/* Role Selection & Diagnostic Bar */}
      <div className="sim-controls-row">
        <div className="sim-role-select">
          <label className="sim-label">Select Career Track:</label>
          <select 
            value={role} 
            onChange={(e) => {
              setRole(e.target.value);
              setQuestionIndex(0);
              setRubricResult(null);
            }}
            className="sim-select"
          >
            <option value="Python Developer">Python Developer (Core SWE)</option>
            <option value="Backend Engineer">Backend Engineer (REST &amp; DB)</option>
            <option value="Data Engineer">Data Engineer &amp; Analytics</option>
          </select>
        </div>

        <button 
          type="button" 
          className={`btn btn-sm ${diagnosticPassed ? 'btn-emerald' : 'btn-secondary'}`}
          onClick={runDiagnostics}
          disabled={isDiagnosticRunning}
        >
          <Mic size={15} className={isDiagnosticRunning ? 'spin-icon' : ''} />
          <span>{isDiagnosticRunning ? 'Running Hardware Check...' : diagnosticPassed ? 'Hardware Verified ✓' : 'Run Mic Diagnostic'}</span>
        </button>
      </div>

      {/* Question Card */}
      <div className="sim-question-card glass-card">
        <div className="sim-q-header">
          <span className="badge badge-cyan">Question {questionIndex + 1} of 2</span>
          <button 
            type="button" 
            className="sim-audio-btn" 
            onClick={handleSpeakQuestion}
            title="Read Question Aloud (Text-to-Speech)"
          >
            <Volume2 size={16} className={isSpeaking ? 'text-accent pulse-anim' : ''} />
            <span>{isSpeaking ? 'Speaking...' : 'Listen Aloud'}</span>
          </button>
        </div>
        <p className="sim-question-text">{activeQuestion}</p>
      </div>

      {/* Answer Input Area */}
      <div className="sim-answer-area">
        <div className="answer-header-row">
          <label className="sim-label">Candidate Spoken Response:</label>
          <button type="button" className="sample-answer-btn" onClick={loadSampleAnswer}>
            ⚡ Auto-Fill Model Answer
          </button>
        </div>
        <textarea
          rows={3}
          value={candidateAnswer}
          onChange={(e) => setCandidateAnswer(e.target.value)}
          placeholder="Speak or type your technical answer here..."
          className="sim-textarea"
        />
        <div className="sim-answer-actions">
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={handleEvaluate}
            disabled={!candidateAnswer.trim() || isEvaluating}
          >
            <Sparkles size={16} />
            <span>{isEvaluating ? 'Running 8-Rubric AI Pipeline...' : 'Run 8-Rubric AI Evaluation'}</span>
          </button>
        </div>
      </div>

      {/* Rubric Evaluation Results */}
      {rubricResult && (
        <div className="sim-results-panel glass-card">
          <div className="results-top">
            <div className="overall-score-box">
              <span className="score-num gradient-text">{rubricResult.overallScore}%</span>
              <span className="score-tag">Composite Score</span>
            </div>
            <div className="rating-box">
              <span className="rating-title">{rubricResult.ewmaRating}</span>
              <p className="rating-desc">{rubricResult.remediationFeedback}</p>
            </div>
          </div>

          <div className="rubrics-breakdown-grid">
            {rubricResult.rubrics.map((r, i) => (
              <div key={i} className="rubric-mini-card">
                <span className="rubric-name">{r.name}</span>
                <div className="rubric-bar-wrap">
                  <div className="rubric-bar-fill" style={{ width: `${r.score}%` }} />
                </div>
                <span className="rubric-val">{r.score}%</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* =========================================================================
   2. AI CALLS & EMERGENCY ANALYTICS DASHBOARD SIMULATOR
========================================================================= */
export function CallsDashboardSimulator() {
  const [district, setDistrict] = useState('Visakhapatnam');
  const [forecastActive, setForecastActive] = useState(false);
  const [view3D, setView3D] = useState(false);

  const districtData = {
    'Visakhapatnam': {
      totalCalls: 18450,
      responseTime: '6.8 mins',
      peakHour: '7:00 PM – 9:00 PM',
      medicalPct: 48,
      crimePct: 24,
      trafficPct: 28,
      historicalTrend: [1420, 1580, 1690, 1850, 1920, 2100],
      forecastedVolume: 2280,
      resourcePlan: 'Deploy 4 additional ambulances near Gajuwaka & Madhurawada corridor.'
    },
    'Vijayawada': {
      totalCalls: 16200,
      responseTime: '7.2 mins',
      peakHour: '6:30 PM – 8:30 PM',
      medicalPct: 42,
      crimePct: 31,
      trafficPct: 27,
      historicalTrend: [1300, 1450, 1510, 1620, 1700, 1810],
      forecastedVolume: 1950,
      resourcePlan: 'Pre-position emergency patrol units at Benz Circle & MG Road.'
    },
    'Guntur': {
      totalCalls: 12900,
      responseTime: '8.1 mins',
      peakHour: '8:00 PM – 10:00 PM',
      medicalPct: 45,
      crimePct: 28,
      trafficPct: 27,
      historicalTrend: [1100, 1180, 1250, 1310, 1390, 1440],
      forecastedVolume: 1530,
      resourcePlan: 'Allocate auxiliary trauma response team to Arundelpet junction.'
    },
    'Prakasam': {
      totalCalls: 11400,
      responseTime: '7.9 mins',
      peakHour: '7:30 PM – 9:30 PM',
      medicalPct: 52,
      crimePct: 20,
      trafficPct: 28,
      historicalTrend: [980, 1020, 1110, 1160, 1220, 1290],
      forecastedVolume: 1380,
      resourcePlan: 'Ongole dispatch center requires +2 reserve emergency dispatchers on weekend evenings.'
    },
    'Tirupati': {
      totalCalls: 14700,
      responseTime: '7.5 mins',
      peakHour: '5:00 PM – 8:00 PM',
      medicalPct: 46,
      crimePct: 22,
      trafficPct: 32,
      historicalTrend: [1200, 1290, 1380, 1450, 1520, 1600],
      forecastedVolume: 1720,
      resourcePlan: 'Scale traffic incident units near Alipiri & bypass transit corridors.'
    }
  };

  const data = districtData[district];

  return (
    <div className="simulator-box analytics-sim">
      <div className="sim-header">
        <div className="sim-title-wrap">
          <span className="badge badge-cyan">Andhra Pradesh Emergency Dispatch</span>
          <h4 className="sim-title">District Incident Analytics &amp; Forecasting</h4>
        </div>
        <div className="sim-header-actions-row">
          <button 
            type="button" 
            className={`btn btn-sm ${view3D ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setView3D(!view3D)}
            title="Toggle Three.js 3D Spatial Terrain Mesh"
          >
            <Box size={14} />
            <span>{view3D ? '2D View' : '3D Spatial Mesh'}</span>
            <span className="live-pill">3D</span>
          </button>
          <button 
            type="button" 
            className={`btn btn-sm ${forecastActive ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setForecastActive(!forecastActive)}
          >
            <TrendingUp size={15} />
            <span>{forecastActive ? 'Forecast Active' : 'Run Python ML Forecast'}</span>
          </button>
        </div>
      </div>

      {/* 3D Spatial Mesh View if active */}
      {view3D && (
        <Analytics3DMesh selectedDistrict={district} onSelectDistrict={setDistrict} />
      )}

      {/* District Selector Tabs */}
      <div className="district-pill-tabs" role="tablist">
        {Object.keys(districtData).map((d) => (
          <button
            key={d}
            type="button"
            className={`district-pill ${district === d ? 'active' : ''}`}
            onClick={() => setDistrict(d)}
          >
            {d}
          </button>
        ))}
      </div>

      {/* Metric Cards Row */}
      <div className="analytics-metrics-grid">
        <div className="metric-box glass-card">
          <span className="metric-label">Monthly Call Volume</span>
          <span className="metric-val gradient-text">{data.totalCalls.toLocaleString()}</span>
          <span className="metric-sub">Logged Incident Calls</span>
        </div>
        <div className="metric-box glass-card">
          <span className="metric-label">Avg Response Time</span>
          <span className="metric-val text-emerald">{data.responseTime}</span>
          <span className="metric-sub">Dispatch to On-Scene</span>
        </div>
        <div className="metric-box glass-card">
          <span className="metric-label">Peak Incident Hour</span>
          <span className="metric-val">{data.peakHour}</span>
          <span className="metric-sub">Highest Call Density</span>
        </div>
      </div>

      {/* Categorical Incident Breakdown */}
      <div className="incident-breakdown-card glass-card">
        <span className="breakdown-title">Categorized Incident Distribution</span>
        <div className="incident-stacked-bar">
          <div className="seg seg-medical" style={{ width: `${data.medicalPct}%` }} title={`Medical: ${data.medicalPct}%`} />
          <div className="seg seg-crime" style={{ width: `${data.crimePct}%` }} title={`Crime: ${data.crimePct}%`} />
          <div className="seg seg-traffic" style={{ width: `${data.trafficPct}%` }} title={`Traffic: ${data.trafficPct}%`} />
        </div>
        <div className="incident-legend">
          <div className="legend-item"><span className="legend-dot med"></span> Medical ({data.medicalPct}%)</div>
          <div className="legend-item"><span className="legend-dot crime"></span> Crime ({data.crimePct}%)</div>
          <div className="legend-item"><span className="legend-dot traffic"></span> Traffic Accidents ({data.trafficPct}%)</div>
        </div>
      </div>

      {/* Predictive Time-Series Forecasting View */}
      {forecastActive && (
        <div className="forecast-results-box glass-card">
          <div className="forecast-header">
            <span className="badge badge-indigo">Python Time-Series Model Output</span>
            <span className="forecast-pred-val">
              Estimated Next-Month Volume: <strong>+{data.forecastedVolume.toLocaleString()} calls</strong>
            </span>
          </div>
          <p className="forecast-recommendation">
            <strong>Resource Allocation Insight:</strong> {data.resourcePlan}
          </p>
        </div>
      )}
    </div>
  );
}

/* =========================================================================
   3. LEFTOVER FOOD RECIPE GENERATOR SIMULATOR
========================================================================= */
export function RecipeGeneratorSimulator() {
  const availablePantry = [
    { id: 'tomato', name: '🍅 Tomatoes' },
    { id: 'onion', name: '🧅 Onions' },
    { id: 'garlic', name: '🧄 Garlic' },
    { id: 'rice', name: '🍚 Rice' },
    { id: 'potato', name: '🥔 Potatoes' },
    { id: 'paneer', name: '🧀 Paneer' },
    { id: 'chili', name: '🌶️ Green Chilies' },
    { id: 'carrot', name: '🥕 Carrots' }
  ];

  const [selectedIngredients, setSelectedIngredients] = useState(['tomato', 'onion', 'garlic', 'rice']);
  const [generatedRecipe, setGeneratedRecipe] = useState(null);

  const toggleIngredient = (id) => {
    if (selectedIngredients.includes(id)) {
      setSelectedIngredients(selectedIngredients.filter(i => i !== id));
    } else {
      setSelectedIngredients([...selectedIngredients, id]);
    }
  };

  const handleGenerate = () => {
    // Dynamic matching algorithm simulation
    if (selectedIngredients.includes('rice') && selectedIngredients.includes('tomato')) {
      setGeneratedRecipe({
        name: "Savory Tomato & Garlic Herb Pilaf",
        cookTime: "20 Mins",
        difficulty: "Easy",
        matchScore: "100% Match",
        wasteSaved: "3 Pantry Staples Rescued",
        steps: [
          "Heat 1 tbsp oil in a pan, add chopped garlic and sliced onions until translucent.",
          "Add diced tomatoes, cumin, and a pinch of salt; simmer until a rich sauce forms.",
          "Fold in cooked or leftover rice, toss gently on low flame for 3 minutes, and serve hot."
        ]
      });
    } else if (selectedIngredients.includes('potato')) {
      setGeneratedRecipe({
        name: "Crispy Spiced Garlic Potatoes",
        cookTime: "15 Mins",
        difficulty: "Quick",
        matchScore: "95% Match",
        wasteSaved: "Utilizes Surplus Potatoes & Garlic",
        steps: [
          "Dice leftover potatoes into bite-sized cubes.",
          "Sauté minced garlic and green chilies in hot oil until aromatic.",
          "Add potatoes, turmeric, and chili powder; crisp on medium heat for 7 minutes."
        ]
      });
    } else {
      setGeneratedRecipe({
        name: "Quick Golden Sautéed Veggie Medley",
        cookTime: "12 Mins",
        difficulty: "Very Easy",
        matchScore: "90% Match",
        wasteSaved: "Zero Household Food Waste",
        steps: [
          "Coarsely dice all selected pantry ingredients.",
          "Toss in a skillet with olive oil, salt, and black pepper on high heat.",
          "Garnish with herbs and serve as a nourishing side dish."
        ]
      });
    }
  };

  useEffect(() => {
    handleGenerate();
  }, [selectedIngredients]);

  return (
    <div className="simulator-box recipe-sim">
      <div className="sim-header">
        <div className="sim-title-wrap">
          <span className="badge badge-emerald">Ingredient Matching Engine</span>
          <h4 className="sim-title">Kitchen Pantry Recipe Sandbox</h4>
        </div>
        <span className="sim-sub-tag">Select On-Hand Ingredients</span>
      </div>

      {/* Ingredient Chip Selector */}
      <div className="pantry-chips-wrap">
        {availablePantry.map((item) => {
          const isSelected = selectedIngredients.includes(item.id);
          return (
            <button
              key={item.id}
              type="button"
              className={`pantry-chip ${isSelected ? 'selected' : ''}`}
              onClick={() => toggleIngredient(item.id)}
            >
              {isSelected ? <Check size={14} className="chip-check" /> : null}
              <span>{item.name}</span>
            </button>
          );
        })}
      </div>

      {/* Instant Recipe Output */}
      {generatedRecipe && (
        <div className="generated-recipe-card glass-card">
          <div className="recipe-card-header">
            <div>
              <span className="badge badge-emerald">{generatedRecipe.matchScore}</span>
              <h5 className="recipe-name">{generatedRecipe.name}</h5>
              <div className="recipe-meta-row">
                <span>⏱️ {generatedRecipe.cookTime}</span>
                <span>⚡ {generatedRecipe.difficulty}</span>
                <span className="text-emerald">🌱 {generatedRecipe.wasteSaved}</span>
              </div>
            </div>
          </div>

          <div className="recipe-steps-list">
            <span className="steps-title">Step-by-Step Instructions:</span>
            <ol>
              {generatedRecipe.steps.map((s, idx) => (
                <li key={idx}>{s}</li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </div>
  );
}

/* Master Router Component */
export default function ProjectSimulator({ projectId }) {
  switch (projectId) {
    case 'ai-interview-platform':
      return <InterviewPlatformSimulator />;
    case 'ai-call-dashboard':
      return <CallsDashboardSimulator />;
    case 'leftover-food-recipe-generator':
      return <RecipeGeneratorSimulator />;
    default:
      return null;
  }
}

