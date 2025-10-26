;; Alineaciones por partido (v1)

(define-constant ERR-NOT-FOUND (err u404))
(define-constant ERR-UNAUTHORIZED (err u401))

(define-map lineup
  { game-id: uint, who: principal }
  { club-id: uint, pos: (string-utf8 4), titular: bool, t0: uint, t1: (optional uint) })

(define-public (alineacion-agregar (game-id uint) (club-id uint) (who principal) (pos (string-utf8 4)) (titular bool) (min-inicio uint))
  (if (is-eq tx-sender who)
      (begin
        (map-set lineup { game-id: game-id, who: who } { club-id: club-id, pos: pos, titular: titular, t0: min-inicio, t1: none })
        (ok true))
      ERR-UNAUTHORIZED))

(define-public (alineacion-salida (game-id uint) (who principal) (min-salida uint))
  (if (is-eq tx-sender who)
      (match (map-get? lineup { game-id: game-id, who: who })
        li (begin (map-set lineup { game-id: game-id, who: who } (merge li { t1: (some min-salida) })) (ok true))
        ERR-NOT-FOUND)
      ERR-UNAUTHORIZED))

(define-read-only (get-alineacion (game-id uint) (who principal))
  (match (map-get? lineup { game-id: game-id, who: who })
    li (ok li)
    ERR-NOT-FOUND))


