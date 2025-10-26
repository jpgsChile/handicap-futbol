;; Gestion de Clubes (v1)

(define-constant ERR-NOT-FOUND (err u404))

(define-data-var next-club-id uint u0)

(define-map clubs
  { id: uint }
  { nombre: (string-utf8 64), league-id: uint, gk-fijo: bool })

(define-map club-by-league
  { league-id: uint, club-id: uint }
  { ok: bool })

(define-public (crear-club (nombre (string-utf8 64)) (league-id uint) (gk-fijo bool))
  (let ((id (+ (var-get next-club-id) u1)))
    (begin
      (var-set next-club-id id)
      (map-set clubs { id: id } { nombre: nombre, league-id: league-id, gk-fijo: gk-fijo })
      (map-set club-by-league { league-id: league-id, club-id: id } { ok: true })
      (ok id))))

(define-read-only (get-club (id uint))
  (match (map-get? clubs { id: id })
    club (ok club)
    ERR-NOT-FOUND))



