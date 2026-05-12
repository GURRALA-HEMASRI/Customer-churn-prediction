// import React, { useState, useEffect } from 'react'
// import axios from 'axios'

// export default function App(){

//   const [form, setForm] = useState({
//     TenureMonths: 5,
//     MonthlyCharges: 70,
//     TotalCharges: 350,
//     Contract: "Month-to-month",
//     InternetService: "DSL",
//     PaymentMethod: "Electronic check",
//     OnlineSecurity: "No",
//     TechSupport: "No"
//   })

//   const [result, setResult] = useState(null)
//   const [importance, setImportance] = useState({})

//   const API = "http://127.0.0.1:8000"

//   const handleChange = (e)=>{
//     let value = e.target.value

//     if (["TenureMonths","MonthlyCharges","TotalCharges"].includes(e.target.name)) {
//       value = Number(value)
//     }

//     setForm({...form, [e.target.name]: value})
//   }

//   const predict = async ()=>{
//     try {
//       const payload = {
//         TenureMonths: Number(form.TenureMonths),
//         MonthlyCharges: Number(form.MonthlyCharges),
//         TotalCharges: Number(form.TotalCharges),
//         Contract: form.Contract,
//         InternetService: form.InternetService,
//         PaymentMethod: form.PaymentMethod,
//         OnlineSecurity: form.OnlineSecurity,
//         TechSupport: form.TechSupport
//       }

//       console.log("Sending:", payload)

//       const res = await axios.post(API+"/predict", payload)
//       setResult(res.data)

//     } catch (err) {
//       console.error(err.response?.data || err.message)
//       alert(JSON.stringify(err.response?.data))
//     }
//   }

//   const loadImportance = async ()=>{
//     const res = await axios.get(API+"/feature-importance")
//     setImportance(res.data)
//   }

//   useEffect(()=>{
//     loadImportance()
//   },[])

//   return (
//     <div style={{padding:20}}>
//       <h2>🔥 Churn Prediction Dashboard</h2>

//       <input type="number" name="TenureMonths" value={form.TenureMonths} onChange={handleChange} placeholder="Tenure (Months)" /><br/>

//       <input type="number" name="MonthlyCharges" value={form.MonthlyCharges} onChange={handleChange} placeholder="Monthly Charges" /><br/>

//       <input type="number" name="TotalCharges" value={form.TotalCharges} onChange={handleChange} placeholder="Total Charges" /><br/>

//       <select name="Contract" onChange={handleChange}>
//         <option>Month-to-month</option>
//         <option>One year</option>
//         <option>Two year</option>
//       </select><br/>

//       <select name="InternetService" onChange={handleChange}>
//         <option>DSL</option>
//         <option>Fiber optic</option>
//         <option>No</option>
//       </select><br/>

//       <select name="PaymentMethod" onChange={handleChange}>
//         <option>Electronic check</option>
//         <option>Mailed check</option>
//         <option>Bank transfer (automatic)</option>
//         <option>Credit card (automatic)</option>
//       </select><br/>

//       <select name="OnlineSecurity" onChange={handleChange}>
//         <option>No</option>
//         <option>Yes</option>
//         <option>No internet service</option>
//       </select><br/>

//       <select name="TechSupport" onChange={handleChange}>
//         <option>No</option>
//         <option>Yes</option>
//         <option>No internet service</option>
//       </select><br/><br/>

//       <button onClick={predict}>🚀 Predict</button>

//       {result && (
//         <div>
//           <h3>Churn: {result.churn}</h3>
//           <h3>Probability: {result.probability.toFixed(2)}</h3>
//         </div>
//       )}

//       <h3>📊 Feature Importance</h3>
//       <ul>
//         {Object.entries(importance).map(([k,v])=>(
//           <li key={k}>{k}: {v.toFixed(3)}</li>
//         ))}
//       </ul>
//     </div>
//   )
// }
import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function App() {

  const [form, setForm] = useState({
    TenureMonths: 5,
    MonthlyCharges: 70,
    TotalCharges: 350,
    Contract: "Month-to-month",
    InternetService: "DSL",
    PaymentMethod: "Electronic check",
    OnlineSecurity: "No",
    TechSupport: "No"
  })

  const [result, setResult] = useState(null)
  const [importance, setImportance] = useState({})
  const [darkMode, setDarkMode] = useState(true)

  const API = "http://127.0.0.1:8000"

  const handleChange = (e) => {
    let value = e.target.value

    if (["TenureMonths", "MonthlyCharges", "TotalCharges"].includes(e.target.name)) {
      value = Number(value)
    }

    setForm({ ...form, [e.target.name]: value })
  }

  const predict = async () => {
    try {
      const payload = {
        TenureMonths: Number(form.TenureMonths),
        MonthlyCharges: Number(form.MonthlyCharges),
        TotalCharges: Number(form.TotalCharges),
        Contract: form.Contract,
        InternetService: form.InternetService,
        PaymentMethod: form.PaymentMethod,
        OnlineSecurity: form.OnlineSecurity,
        TechSupport: form.TechSupport
      }

      const res = await axios.post(API + "/predict", payload)
      setResult(res.data)

    } catch (err) {
      console.error(err.response?.data || err.message)
      alert(JSON.stringify(err.response?.data))
    }
  }

  const loadImportance = async () => {
    const res = await axios.get(API + "/feature-importance")
    setImportance(res.data)
  }

  useEffect(() => {
    loadImportance()
  }, [])

  const theme = {
    background: darkMode
      ? "linear-gradient(135deg, #0f172a, #1e293b)"
      : "linear-gradient(135deg, #dbeafe, #f8fafc)",

    card: darkMode ? "#1e293bcc" : "#ffffffcc",

    text: darkMode ? "#ffffff" : "#0f172a",

    input: darkMode ? "#334155" : "#f1f5f9"
  }

  const inputStyle = {
    width: "100%",
    padding: "14px",
    marginBottom: "15px",
    borderRadius: "12px",
    border: "none",
    background: theme.input,
    color: theme.text,
    fontSize: "15px",
    outline: "none",
    transition: "0.3s"
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: theme.background,
        padding: "30px",
        transition: "0.5s ease"
      }}
    >

      <div
        style={{
          width: "100%",
          maxWidth: "650px",
          background: theme.card,
          backdropFilter: "blur(12px)",
          padding: "35px",
          borderRadius: "24px",
          boxShadow: "0 8px 30px rgba(0,0,0,0.25)",
          color: theme.text,
          animation: "fadeIn 0.8s ease"
        }}
      >

        {/* Toggle */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "25px"
          }}
        >
          <h1 style={{ margin: 0 }}>
            🔥 Churn Prediction Dashboard
          </h1>

          <button
            onClick={() => setDarkMode(!darkMode)}
            style={{
              padding: "10px 18px",
              borderRadius: "30px",
              border: "none",
              cursor: "pointer",
              background: darkMode ? "#facc15" : "#0f172a",
              color: darkMode ? "#000" : "#fff",
              fontWeight: "bold",
              transition: "0.3s"
            }}
          >
            {darkMode ? "☀ Light" : "🌙 Dark"}
          </button>
        </div>

        {/* Inputs */}
        <input
          type="number"
          name="TenureMonths"
          value={form.TenureMonths}
          onChange={handleChange}
          placeholder="Tenure (Months)"
          style={inputStyle}
        />

        <input
          type="number"
          name="MonthlyCharges"
          value={form.MonthlyCharges}
          onChange={handleChange}
          placeholder="Monthly Charges"
          style={inputStyle}
        />

        <input
          type="number"
          name="TotalCharges"
          value={form.TotalCharges}
          onChange={handleChange}
          placeholder="Total Charges"
          style={inputStyle}
        />

        <select
          name="Contract"
          onChange={handleChange}
          style={inputStyle}
        >
          <option>Month-to-month</option>
          <option>One year</option>
          <option>Two year</option>
        </select>

        <select
          name="InternetService"
          onChange={handleChange}
          style={inputStyle}
        >
          <option>DSL</option>
          <option>Fiber optic</option>
          <option>No</option>
        </select>

        <select
          name="PaymentMethod"
          onChange={handleChange}
          style={inputStyle}
        >
          <option>Electronic check</option>
          <option>Mailed check</option>
          <option>Bank transfer (automatic)</option>
          <option>Credit card (automatic)</option>
        </select>

        <select
          name="OnlineSecurity"
          onChange={handleChange}
          style={inputStyle}
        >
          <option>No</option>
          <option>Yes</option>
          <option>No internet service</option>
        </select>

        <select
          name="TechSupport"
          onChange={handleChange}
          style={inputStyle}
        >
          <option>No</option>
          <option>Yes</option>
          <option>No internet service</option>
        </select>

        {/* Button */}
        <button
          onClick={predict}
          style={{
            width: "100%",
            padding: "16px",
            borderRadius: "14px",
            border: "none",
            background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
            color: "#fff",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "0.3s",
            marginTop: "10px",
            boxShadow: "0 6px 20px rgba(59,130,246,0.4)"
          }}
        >
          🚀 Predict Churn
        </button>

        {/* Result */}
        {result && (
          <div
            style={{
              marginTop: "25px",
              padding: "20px",
              borderRadius: "16px",
              background: darkMode ? "#334155" : "#e0f2fe",
              animation: "fadeIn 0.5s ease"
            }}
          >
            <h2>Prediction Result</h2>
            <h3>Churn: {result.churn}</h3>
            <h3>Probability: {result.probability.toFixed(2)}</h3>
          </div>
        )}

        {/* Feature Importance */}
        <div style={{ marginTop: "30px" }}>
          <h2>📊 Feature Importance</h2>

          {Object.entries(importance).map(([k, v]) => (
            <div
              key={k}
              style={{
                marginBottom: "15px"
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "6px"
                }}
              >
                <span>{k}</span>
                <span>{v.toFixed(3)}</span>
              </div>

              <div
                style={{
                  width: "100%",
                  height: "10px",
                  background: "#475569",
                  borderRadius: "10px",
                  overflow: "hidden"
                }}
              >
                <div
                  style={{
                    width: `${v * 100}%`,
                    height: "100%",
                    background: "linear-gradient(90deg,#3b82f6,#8b5cf6)",
                    transition: "1s ease"
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>
        {`
          *{
            font-family: Arial, sans-serif;
            box-sizing: border-box;
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0px);
            }
          }

          input:focus, select:focus {
            transform: scale(1.02);
          }

          button:hover {
            transform: translateY(-2px) scale(1.01);
          }
        `}
      </style>

    </div>
  )
}