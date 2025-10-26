# Mapa de módulos y despliegue

## Módulos on-chain (Clarity)
- ff-league: ligas (crear-liga, get-liga)
- ff-club: clubes (crear-club, get-club)
- ff-player: jugadores (registrar-jugador-ff, jugador-unir-a-club, get-jugador)
- ff-game: partidos (crear-juego-ff, cerrar-juego, get-juego)
- ff-lineup: alineaciones (alineacion-agregar, alineacion-salida, get-alineacion)
- ff-event: eventos (registrar-evento-ff, get-evento, get-contador)
- ff-roles: roles (asignar-rol, tiene-rol)
- ff-attest: testificaciones/verificación (attest, attest-resumen, elevar-verificacion, get-verificacion-juego)
- ff-views: fachada de lecturas (liga-detalle, club-detalle, jugador-detalle, juego-detalle, alineacion-detalle, evento-detalle, evento-contador, attest-resumen, verificacion-juego)

## Rutas UI → Módulos
- Entidades
  - Crear liga → ff-league.crear-liga
  - Crear club → ff-club.crear-club
  - Registrar jugador → ff-player.registrar-jugador-ff
  - Unir jugador a club → ff-player.jugador-unir-a-club
- Partidos
  - Crear básico/IPFS → ff-game.crear-juego-ff
  - Finalizar → ff-game.cerrar-juego
- Alineaciones
  - Agregar → ff-lineup.alineacion-agregar
  - Salida → ff-lineup.alineacion-salida
- Eventos
  - Registrar básico/IPFS/y reputación → ff-event.registrar-evento-ff
- Roles
  - Asignar → ff-roles.asignar-rol
  - Elevar verificación → ff-attest.elevar-verificacion
- Lecturas (todas via ff-views)
  - Liga/Club/Jugador/Juego/Alineación/Evento/Contadores/Attest/Verificación

## Variables de entorno por red
- NEXT_PUBLIC_CONTRACT_ADDRESS: dirección base (sin .contract)
- NEXT_PUBLIC_CN_*: nombres de módulos (por defecto ya configurados)
- NEXT_PUBLIC_VERIFY_MIN_SUM / NEXT_PUBLIC_VERIFY_MIN_COUNT: umbrales UI

## Checklist de despliegue
1) Compilar y testear con Clarinet.
2) Desplegar módulos en orden sugerido: roles → league → club → player → game → lineup → event → attest → views.
3) Registrar NEXT_PUBLIC_CONTRACT_ADDRESS y confirmar que los nombres CN_* coinciden.
4) Verificar lecturas en ff-views (ej. liga-detalle).
5) Probar UI en Dev y Wallet.

