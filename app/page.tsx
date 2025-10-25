import "./globals.css";

export default function Page() {
  return (
    <div style={{maxWidth:980, margin:"0 auto", padding:24}}>
      <header style={{marginBottom:32}}>
        <h1>⚽ FuturoFútbol — Handicap Fútbol MVP</h1>
        <p style={{fontSize: "1.1rem", color: "#666", marginBottom: 24}}>
          Sistema completo de gestión de ligas de fútbol con handicap sobre Stacks blockchain.
          Utiliza la navegación superior para acceder a todas las funcionalidades del contrato inteligente.
        </p>
      </header>

      <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24}}>
        <div className="form">
          <h3>🏆 Gestión de Entidades</h3>
          <p>Crear y gestionar ligas, clubes y jugadores del sistema.</p>
          <ul style={{paddingLeft: 20}}>
            <li>Crear nueva liga</li>
            <li>Crear nuevo club</li>
            <li>Registrar jugador</li>
            <li>Unir jugador a un club</li>
          </ul>
        </div>

        <div className="form">
          <h3>⚽ Gestión de Partidos</h3>
          <p>Crear y gestionar partidos con metadata IPFS.</p>
          <ul style={{paddingLeft: 20}}>
            <li>Crear partido básico</li>
            <li>Crear partido con metadata IPFS</li>
            <li>Finalizar partido</li>
          </ul>
        </div>

        <div className="form">
          <h3>📋 Alineaciones y Eventos</h3>
          <p>Gestionar alineaciones y registrar eventos en tiempo real.</p>
          <ul style={{paddingLeft: 20}}>
            <li>Agregar jugador a alineación</li>
            <li>Registrar salida de jugador</li>
            <li>Registrar eventos con evidencia</li>
            <li>Actualizar reputación</li>
          </ul>
        </div>

        <div className="form">
          <h3>🔐 Sistema de Roles</h3>
          <p>Gestionar roles y sistema de testificaciones.</p>
          <ul style={{paddingLeft: 20}}>
            <li>Asignar roles a usuarios</li>
            <li>Verificar roles</li>
            <li>Crear testificaciones</li>
            <li>Elevar verificación</li>
          </ul>
        </div>

        <div className="form">
          <h3>📖 Funciones de Lectura</h3>
          <p>Consultar información del contrato inteligente.</p>
          <ul style={{paddingLeft: 20}}>
            <li>Información de ligas</li>
            <li>Información de clubes</li>
            <li>Información de jugadores</li>
            <li>Información de partidos</li>
            <li>Alineaciones y eventos</li>
          </ul>
        </div>

        <div className="form">
          <h3>🔗 Enlaces Útiles</h3>
          <p>Recursos del entorno de desarrollo.</p>
          <ul style={{paddingLeft: 20}}>
            <li><a href="http://localhost:3999/doc" target="_blank">Stacks API</a></li>
            <li><a href="http://localhost:8000" target="_blank">Stacks Explorer</a></li>
            <li><a href="http://localhost:8001" target="_blank">Bitcoin Explorer</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
