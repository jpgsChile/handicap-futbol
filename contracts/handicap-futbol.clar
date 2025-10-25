;; SPDX-License-Identifier: MIT
;; Handicap futbol MVP on Stacks (Futurofutbol)

(define-data-var contract-owner principal tx-sender)

;; Constantes
(define-constant ERR-NOT-FOUND (err u404))
(define-constant ERR-UNAUTHORIZED (err u401))
(define-constant ERR-BAD-REQUEST (err u400))

;; IDs autoincrementales
(define-data-var next-league-id uint u0)
(define-data-var next-club-id uint u0)

;; Ligas
(define-map ligas
  ((id uint))
  (
    (nombre (string-utf8 64))
    (ubicacion (string-utf8 64))
    (categoria (string-utf8 32))
    (creator principal)
  )
)

;; Clubes
(define-map clubes
  ((id uint))
  (
    (nombre (string-utf8 64))
    (league-id uint)
    (owner principal)
  )
)

;; Helpers
(define-read-only (exists-league (league-id uint)) 
  (is-some (map-get? ligas {id: league-id})))

;; Crear entidades
(define-public (crear-liga (nombre (string-utf8 64)) (ubicacion (string-utf8 64)) (categoria (string-utf8 32)))
  (let ((id (+ (var-get next-league-id) u1)))
    (begin
      (var-set next-league-id id)
      (map-set ligas {id: id} {nombre: nombre, ubicacion: ubicacion, categoria: categoria, creator: tx-sender})
      (ok id)))
)

(define-public (crear-club (nombre (string-utf8 64)) (league-id uint))
  (begin
    (if (not (unwrap! (exists-league league-id) ERR-BAD-REQUEST))
        (err u400)
        (let ((id (+ (var-get next-club-id) u1)))
          (var-set next-club-id id)
          (map-set clubes {id: id} {nombre: nombre, league-id: league-id, owner: tx-sender})
          (ok id))))
)

;; Lecturas
(define-read-only (get-liga (id uint))
  (match (map-get? ligas {id: id})
    some (ok some) ERR-NOT-FOUND)
)

(define-read-only (get-club (id uint))
  (match (map-get? clubes {id: id})
    some (ok some) ERR-NOT-FOUND)
)