;; Modulo de Jugadores (v1)

(define-constant ERR-NOT-FOUND (err u404))

(define-map players
  { who: principal }
  { nombre: (string-utf8 64), apodo: (string-utf8 32), pos1: (string-utf8 8), pos2: (string-utf8 8), pos3: (string-utf8 8), minor: bool, guardian: (optional principal), visibility: (string-utf8 16) })

(define-map player-club
  { who: principal }
  { club-id: uint })

(define-public (registrar-jugador-ff (nombre (string-utf8 64)) (apodo (string-utf8 32)) (pos1 (string-utf8 8)) (pos2 (string-utf8 8)) (pos3 (string-utf8 8)) (minor bool) (guardian (optional principal)) (visibility (string-utf8 16)))
  (begin
    (map-set players { who: tx-sender } { nombre: nombre, apodo: apodo, pos1: pos1, pos2: pos2, pos3: pos3, minor: minor, guardian: guardian, visibility: visibility })
    (ok true)))

(define-read-only (get-jugador (who principal))
  (match (map-get? players { who: who })
    p (ok p)
    ERR-NOT-FOUND))

(define-public (jugador-unir-a-club (club-id uint))
  (begin
    (map-set player-club { who: tx-sender } { club-id: club-id })
    (ok true)))


