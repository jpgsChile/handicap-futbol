"use client";

import Link from "next/link";
import { useState } from "react";
import Connect from "./Connect";

export default function Navbar() {
  const [open, setOpen] = useState<string | null>(null);

  const toggle = (menu: string) => {
    setOpen(open === menu ? null : menu);
  };

  const groupStyle = {
    position: "relative" as const,
    display: "inline-block",
    marginRight: "20px",
  };

  const menuStyle = {
    position: "absolute" as const,
    background: "white",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    minWidth: "220px",
    padding: "8px",
    zIndex: 20,
  };

  const linkStyle = {
    display: "block",
    padding: "6px 10px",
    textDecoration: "none",
    color: "#111",
    borderRadius: "6px",
  };

  const linkHover = {
    background: "#f3f4f6",
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        borderBottom: "1px solid #e5e7eb",
        position: "sticky",
        top: 0,
        background: "white",
        zIndex: 50,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <Link href="/" style={{ fontWeight: 600, fontSize: "18px" }}>
          ⚽ FuturoFútbol
        </Link>

        {/* Gestión de Entidades */}
        <div style={groupStyle} onMouseLeave={() => setOpen(null)}>
          <button className="btn secondary" onClick={() => toggle("entidades")}>
            Gestión de Entidades ▾
          </button>
          {open === "entidades" && (
            <div style={menuStyle}>
              <Link href="/entidades/crear-liga" style={linkStyle}>
                Crear nueva liga
              </Link>
              <Link href="/entidades/crear-club" style={linkStyle}>
                Crear nuevo club
              </Link>
              <Link href="/entidades/registrar-jugador" style={linkStyle}>
                Registrar jugador
              </Link>
              <Link href="/entidades/unir-jugador" style={linkStyle}>
                Unir jugador a un club
              </Link>
            </div>
          )}
        </div>

        {/* Gestión de Partidos */}
        <div style={groupStyle} onMouseLeave={() => setOpen(null)}>
          <button className="btn secondary" onClick={() => toggle("partidos")}>
            Gestión de Partidos ▾
          </button>
          {open === "partidos" && (
            <div style={menuStyle}>
              <Link href="/partidos/crear-basico" style={linkStyle}>
                Crear partido básico
              </Link>
              <Link href="/partidos/crear-con-ipfs" style={linkStyle}>
                Crear partido con metadata IPFS
              </Link>
              <Link href="/partidos/finalizar" style={linkStyle}>
                Finalizar partido
              </Link>
            </div>
          )}
        </div>

        {/* Alineaciones y Eventos */}
        <div style={groupStyle} onMouseLeave={() => setOpen(null)}>
          <button className="btn secondary" onClick={() => toggle("alineaciones")}>
            Alineaciones y Eventos ▾
          </button>
          {open === "alineaciones" && (
            <div style={menuStyle}>
              <Link href="/alineaciones/agregar" style={linkStyle}>
                Agregar jugador a alineación
              </Link>
              <Link href="/alineaciones/salida" style={linkStyle}>
                Registrar salida de jugador
              </Link>
              <Link href="/eventos/registrar-basico" style={linkStyle}>
                Registrar evento básico
              </Link>
              <Link href="/eventos/registrar-con-ipfs" style={linkStyle}>
                Registrar evento con evidencia IPFS
              </Link>
              <Link href="/eventos/registrar-y-reputacion" style={linkStyle}>
                Registrar evento y actualizar reputación
              </Link>
            </div>
          )}
        </div>

        {/* Roles y Testificación */}
        <div style={groupStyle} onMouseLeave={() => setOpen(null)}>
          <button className="btn secondary" onClick={() => toggle("roles")}>
            Roles y Testificación ▾
          </button>
          {open === "roles" && (
            <div style={menuStyle}>
              <Link href="/roles/asignar" style={linkStyle}>
                Asignar rol a usuario
              </Link>
              <Link href="/roles/verificar" style={linkStyle}>
                Verificar si usuario tiene rol
              </Link>
              <Link href="/roles/testificar" style={linkStyle}>
                Crear testificación
              </Link>
              <Link href="/roles/elevar-verificacion" style={linkStyle}>
                Elevar nivel de verificación
              </Link>
            </div>
          )}
        </div>

        {/* Lecturas */}
        <div style={groupStyle} onMouseLeave={() => setOpen(null)}>
          <button className="btn secondary" onClick={() => toggle("lecturas")}>
            Funciones de Lectura ▾
          </button>
          {open === "lecturas" && (
            <div style={menuStyle}>
              <Link href="/lecturas/liga" style={linkStyle}>
                Obtener información de liga
              </Link>
              <Link href="/lecturas/club" style={linkStyle}>
                Obtener información de club
              </Link>
              <Link href="/lecturas/jugador" style={linkStyle}>
                Obtener información de jugador
              </Link>
              <Link href="/lecturas/partido" style={linkStyle}>
                Obtener información de partido
              </Link>
              <Link href="/lecturas/alineacion" style={linkStyle}>
                Obtener alineación de jugador
              </Link>
              <Link href="/lecturas/evento" style={linkStyle}>
                Obtener evento específico
              </Link>
            </div>
          )}
        </div>
      </div>

      <Connect />
    </nav>
  );
}
