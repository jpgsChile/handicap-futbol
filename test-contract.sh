#!/bin/bash

# Validación rápida de módulos (devnet) para Handicap Fútbol
set -euo pipefail

# Modo estricto (1=por defecto, detiene al primer error). Usar VALIDATE_STRICT=0 para continuar.
STRICT=${VALIDATE_STRICT:-1}
FAILS=()
PASS=0

echo "🛠️ Iniciando validación de módulos..."

# Detectar Clarinet
if ! command -v clarinet &>/dev/null; then
  echo "❌ Clarinet no está instalado"
  exit 1
fi

# Dirección base desde .env.local (opcional)
BASE_ADDR=${NEXT_PUBLIC_CONTRACT_ADDRESS:-}
if [ -z "$BASE_ADDR" ] && [ -f ./.env.local ]; then
  BASE_ADDR=$(grep -E '^NEXT_PUBLIC_CONTRACT_ADDRESS=' ./.env.local | head -1 | cut -d= -f2 | tr -d '\r')
fi
BASE_ADDR=${BASE_ADDR:-ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM}

# Nombres de contratos (permiten override por env)
CN_LEAGUE=${NEXT_PUBLIC_CN_LEAGUE:-ff-league}
CN_CLUB=${NEXT_PUBLIC_CN_CLUB:-ff-club}
CN_PLAYER=${NEXT_PUBLIC_CN_PLAYER:-ff-player}
CN_GAME=${NEXT_PUBLIC_CN_GAME:-ff-game}
CN_LINEUP=${NEXT_PUBLIC_CN_LINEUP:-ff-lineup}
CN_EVENT=${NEXT_PUBLIC_CN_EVENT:-ff-event}
CN_ATTEST=${NEXT_PUBLIC_CN_ATTEST:-ff-attest}
CN_VIEWS=${NEXT_PUBLIC_CN_VIEWS:-ff-views}

league_id="u1"
club_id="u1"
game_id="u1"
principal="'${BASE_ADDR}"

# Asegurar devnet
echo "🔍 Verificando devnet..."
if ! curl -s http://localhost:3999/v2/info >/dev/null; then
  echo "⚠️ Devnet no disponible, iniciando..."
  clarinet devnet start > /tmp/clarinet_devnet.log 2>&1 &
  sleep 8
else
  echo "✅ Devnet ejecutándose"
fi

run() {
  local label="$1"; shift
  local code="$*"
  local f="/tmp/clar_$(date +%s%3N)_$RANDOM.clar"
  echo "$code" > "$f"
  echo "\n▶ $label"
  out=$(clarinet console < "$f" 2>&1 || true)
  echo "$out"
  if echo "$out" | grep -qi "errors detected"; then
    echo "❌ Falló: $label"
    if [ "$STRICT" = "1" ]; then
      exit 1
    else
      FAILS+=("$label")
    fi
  else
    PASS=$((PASS+1))
  fi
  rm -f "$f"
}

echo "✅ Dirección base: $BASE_ADDR"

# 1) Crear liga
run "Crear liga" "(contract-call? '.$CN_LEAGUE crear-liga \"Liga Test\" \"Santiago\" \"barrial\")"

# 2) Lectura liga via views
run "Leer liga (views)" "(contract-call? '.$CN_VIEWS liga-detalle $league_id)"

# 3) Crear club
run "Crear club" "(contract-call? '.$CN_CLUB crear-club \"Club Test\" $league_id true)"

# 4) Registrar jugador y unir a club
run "Registrar jugador" "(contract-call? '.$CN_PLAYER registrar-jugador-ff \"Juan\" \"Toro\" \"ST\" \"\" \"\" false none \"public\")"
run "Unir jugador a club" "(contract-call? '.$CN_PLAYER jugador-unir-a-club $club_id)"

# 5) Crear partido
run "Crear partido" "(contract-call? '.$CN_GAME crear-juego-ff $league_id $club_id $club_id u123456 \"\")"

# 6) Alineación y evento
run "Alinear jugador" "(contract-call? '.$CN_LINEUP alineacion-agregar $game_id $club_id $principal \"ST\" true u0)"
run "Registrar evento" "(contract-call? '.$CN_EVENT registrar-evento-ff $game_id $club_id $principal \"goal\" u15 \"\" \"\")"

# 7) Lecturas views: juego, alineación, evento, contador
run "Juego (views)" "(contract-call? '.$CN_VIEWS juego-detalle $game_id)"
run "Alineación (views)" "(contract-call? '.$CN_VIEWS alineacion-detalle $game_id $principal)"
run "Evento (views)" "(contract-call? '.$CN_VIEWS evento-detalle $game_id u1)"
run "Contador goal (views)" "(contract-call? '.$CN_VIEWS evento-contador $game_id \"goal\")"

# 8) Attest + verificación
run "Attest juego" "(contract-call? '.$CN_ATTEST attest \"juego\" $game_id u5 \"ok\" \"\")"
run "Resumen attest (views)" "(contract-call? '.$CN_VIEWS attest-resumen \"juego\" $game_id)"
run "Elevar verificación" "(contract-call? '.$CN_ATTEST elevar-verificacion $game_id \"club\")"
run "Verificación juego (views)" "(contract-call? '.$CN_VIEWS verificacion-juego $game_id)"

# 9) Cerrar partido
run "Cerrar partido" "(contract-call? '.$CN_GAME cerrar-juego $game_id)"

echo "\n✅ Validación completa"

if [ ${#FAILS[@]} -gt 0 ]; then
  echo "\nResumen: ${PASS} pasos OK, ${#FAILS[@]} con fallas"
  for f in "${FAILS[@]}"; do echo " - ❌ $f"; done
  if [ "$STRICT" = "1" ]; then
    exit 1
  fi
else
  echo "\nResumen: ${PASS} pasos OK, 0 fallas"
fi
