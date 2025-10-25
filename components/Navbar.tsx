"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Connect from "./Connect";

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname.startsWith(path);

  return (
    <nav style={{
      backgroundColor: "#1a1a1a",
      color: "white",
      padding: "1rem 2rem",
      borderBottom: "2px solid #333",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap"
    }}>
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <Link href="/" style={{ 
          textDecoration: "none", 
          color: "white", 
          fontSize: "1.5rem", 
          fontWeight: "bold" 
        }}>
          ⚽ FuturoFútbol
        </Link>
      </div>

      {/* Navigation Menu */}
      <div style={{ 
        display: "flex", 
        gap: "2rem", 
        alignItems: "center",
        flexWrap: "wrap"
      }}>
        {/* Gestión de Entidades */}
        <div style={{ position: "relative" }}>
          <div style={{
            padding: "0.5rem 1rem",
            backgroundColor: isActive("/entidades") ? "#333" : "transparent",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: isActive("/entidades") ? "bold" : "normal"
          }}>
            Gestión de Entidades
          </div>
          <div style={{
            position: "absolute",
            top: "100%",
            left: 0,
            backgroundColor: "#2a2a2a",
            minWidth: "200px",
            borderRadius: "4px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            display: "none",
            zIndex: 1000
          }}>
            <Link href="/entidades/crear-liga" style={{
              display: "block",
              padding: "0.75rem 1rem",
              color: "white",
              textDecoration: "none",
              borderBottom: "1px solid #333"
            }}>
              Crear nueva liga
            </Link>
            <Link href="/entidades/crear-club" style={{
              display: "block",
              padding: "0.75rem 1rem",
              color: "white",
              textDecoration: "none",
              borderBottom: "1px solid #333"
            }}>
              Crear nuevo club
            </Link>
            <Link href="/entidades/registrar-jugador" style={{
              display: "block",
              padding: "0.75rem 1rem",
              color: "white",
              textDecoration: "none",
              borderBottom: "1px solid #333"
            }}>
              Registrar jugador
            </Link>
            <Link href="/entidades/unir-jugador" style={{
              display: "block",
              padding: "0.75rem 1rem",
              color: "white",
              textDecoration: "none"
            }}>
              Unir jugador a un club
            </Link>
          </div>
        </div>

        {/* Gestión de Partidos */}
        <div style={{ position: "relative" }}>
          <div style={{
            padding: "0.5rem 1rem",
            backgroundColor: isActive("/partidos") ? "#333" : "transparent",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: isActive("/partidos") ? "bold" : "normal"
          }}>
            Gestión de Partidos
          </div>
          <div style={{
            position: "absolute",
            top: "100%",
            left: 0,
            backgroundColor: "#2a2a2a",
            minWidth: "200px",
            borderRadius: "4px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            display: "none",
            zIndex: 1000
          }}>
            <Link href="/partidos/crear-basico" style={{
              display: "block",
              padding: "0.75rem 1rem",
              color: "white",
              textDecoration: "none",
              borderBottom: "1px solid #333"
            }}>
              Crear partido básico
            </Link>
            <Link href="/partidos/crear-con-ipfs" style={{
              display: "block",
              padding: "0.75rem 1rem",
              color: "white",
              textDecoration: "none",
              borderBottom: "1px solid #333"
            }}>
              Crear partido con metadata IPFS
            </Link>
            <Link href="/partidos/finalizar" style={{
              display: "block",
              padding: "0.75rem 1rem",
              color: "white",
              textDecoration: "none"
            }}>
              Finalizar partido
            </Link>
          </div>
        </div>

        {/* Alineaciones y Eventos */}
        <div style={{ position: "relative" }}>
          <div style={{
            padding: "0.5rem 1rem",
            backgroundColor: isActive("/alineaciones") || isActive("/eventos") ? "#333" : "transparent",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: isActive("/alineaciones") || isActive("/eventos") ? "bold" : "normal"
          }}>
            Alineaciones y Eventos
          </div>
          <div style={{
            position: "absolute",
            top: "100%",
            left: 0,
            backgroundColor: "#2a2a2a",
            minWidth: "250px",
            borderRadius: "4px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            display: "none",
            zIndex: 1000
          }}>
            <Link href="/alineaciones/agregar" style={{
              display: "block",
              padding: "0.75rem 1rem",
              color: "white",
              textDecoration: "none",
              borderBottom: "1px solid #333"
            }}>
              Agregar jugador a alineación
            </Link>
            <Link href="/alineaciones/salida" style={{
              display: "block",
              padding: "0.75rem 1rem",
              color: "white",
              textDecoration: "none",
              borderBottom: "1px solid #333"
            }}>
              Registrar salida de jugador
            </Link>
            <Link href="/eventos/registrar-basico" style={{
              display: "block",
              padding: "0.75rem 1rem",
              color: "white",
              textDecoration: "none",
              borderBottom: "1px solid #333"
            }}>
              Registrar evento básico
            </Link>
            <Link href="/eventos/registrar-con-ipfs" style={{
              display: "block",
              padding: "0.75rem 1rem",
              color: "white",
              textDecoration: "none",
              borderBottom: "1px solid #333"
            }}>
              Registrar evento con evidencia IPFS
            </Link>
            <Link href="/eventos/registrar-y-reputacion" style={{
              display: "block",
              padding: "0.75rem 1rem",
              color: "white",
              textDecoration: "none"
            }}>
              Registrar evento y actualizar reputación
            </Link>
          </div>
        </div>

        {/* Sistema de Roles y Testificación */}
        <div style={{ position: "relative" }}>
          <div style={{
            padding: "0.5rem 1rem",
            backgroundColor: isActive("/roles") ? "#333" : "transparent",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: isActive("/roles") ? "bold" : "normal"
          }}>
            Sistema de Roles
          </div>
          <div style={{
            position: "absolute",
            top: "100%",
            left: 0,
            backgroundColor: "#2a2a2a",
            minWidth: "200px",
            borderRadius: "4px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            display: "none",
            zIndex: 1000
          }}>
            <Link href="/roles/asignar" style={{
              display: "block",
              padding: "0.75rem 1rem",
              color: "white",
              textDecoration: "none",
              borderBottom: "1px solid #333"
            }}>
              Asignar rol a usuario
            </Link>
            <Link href="/roles/verificar" style={{
              display: "block",
              padding: "0.75rem 1rem",
              color: "white",
              textDecoration: "none",
              borderBottom: "1px solid #333"
            }}>
              Verificar si usuario tiene rol
            </Link>
            <Link href="/roles/testificar" style={{
              display: "block",
              padding: "0.75rem 1rem",
              color: "white",
              textDecoration: "none",
              borderBottom: "1px solid #333"
            }}>
              Crear testificación
            </Link>
            <Link href="/roles/elevar-verificacion" style={{
              display: "block",
              padding: "0.75rem 1rem",
              color: "white",
              textDecoration: "none"
            }}>
              Elevar nivel de verificación
            </Link>
          </div>
        </div>

        {/* Funciones de Lectura */}
        <div style={{ position: "relative" }}>
          <div style={{
            padding: "0.5rem 1rem",
            backgroundColor: isActive("/lecturas") ? "#333" : "transparent",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: isActive("/lecturas") ? "bold" : "normal"
          }}>
            Funciones de Lectura
          </div>
          <div style={{
            position: "absolute",
            top: "100%",
            left: 0,
            backgroundColor: "#2a2a2a",
            minWidth: "200px",
            borderRadius: "4px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            display: "none",
            zIndex: 1000
          }}>
            <Link href="/lecturas/liga" style={{
              display: "block",
              padding: "0.75rem 1rem",
              color: "white",
              textDecoration: "none",
              borderBottom: "1px solid #333"
            }}>
              Obtener información de liga
            </Link>
            <Link href="/lecturas/club" style={{
              display: "block",
              padding: "0.75rem 1rem",
              color: "white",
              textDecoration: "none",
              borderBottom: "1px solid #333"
            }}>
              Obtener información de club
            </Link>
            <Link href="/lecturas/jugador" style={{
              display: "block",
              padding: "0.75rem 1rem",
              color: "white",
              textDecoration: "none",
              borderBottom: "1px solid #333"
            }}>
              Obtener información de jugador
            </Link>
            <Link href="/lecturas/partido" style={{
              display: "block",
              padding: "0.75rem 1rem",
              color: "white",
              textDecoration: "none",
              borderBottom: "1px solid #333"
            }}>
              Obtener información de partido
            </Link>
            <Link href="/lecturas/alineacion" style={{
              display: "block",
              padding: "0.75rem 1rem",
              color: "white",
              textDecoration: "none",
              borderBottom: "1px solid #333"
            }}>
              Obtener alineación de jugador
            </Link>
            <Link href="/lecturas/evento" style={{
              display: "block",
              padding: "0.75rem 1rem",
              color: "white",
              textDecoration: "none"
            }}>
              Obtener evento específico
            </Link>
          </div>
        </div>

        {/* Connect Wallet */}
        <Connect />
      </div>
    </nav>
  );
}
