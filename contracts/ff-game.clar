;; Modulo de Partidos (v1)

(define-constant ERR-NOT-FOUND (err u404))

(define-data-var next-game-id uint u0)

(define-map games
  { id: uint }
  { league-id: uint, club-local: uint, club-visit: uint, fecha: uint, cid: (string-utf8 128), cerrado: bool })

(define-public (crear-juego-ff (league-id uint) (club-local uint) (club-visit uint) (fecha uint) (cid (string-utf8 128)))
  (let ((id (+ (var-get next-game-id) u1)))
    (begin
      (var-set next-game-id id)
      (map-set games { id: id } { league-id: league-id, club-local: club-local, club-visit: club-visit, fecha: fecha, cid: cid, cerrado: false })
      (ok id))))

(define-public (cerrar-juego (id uint))
  (match (map-get? games { id: id })
    g (begin (map-set games { id: id } (merge g { cerrado: true })) (ok true))
    ERR-NOT-FOUND))

(define-read-only (get-juego (id uint))
  (match (map-get? games { id: id })
    g (ok g)
    ERR-NOT-FOUND))



