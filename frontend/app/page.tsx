import "./globals.css";
import Connect from "@/components/Connect";
import FormsBasics from "@/components/FormsBasics";
import FormsGame from "@/components/FormsGame";

export default function Page() {
  return (
    <main style={{maxWidth:980, margin:"0 auto", padding:24}}>
      <header style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16}}>
        <h1>FuturoFútbol — Handicap Fútbol (Stacks Testnet)</h1>
        <Connect />
      </header>

      <p style={{marginBottom:24}}>
        MVP para registro de ligas, clubes, jugadores (con protección a menores),
        creación de partidos con evidencia (IPFS), alineaciones, eventos con minuto y reputación,
        attestations multi-rol y verificación "auto → club → oficial".
      </p>

      <h2>🧱 Básicos</h2>
      <FormsBasics />

      <h2>⚽ Partido</h2>
      <FormsGame />
    </main>
  );
}
