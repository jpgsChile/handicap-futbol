;; SPDX-License-Identifier: MIT
;; Handicap futbol MVP on Stacks (Futurofutbol)

(define-data-var contract-owner principal tx-sender)

;; Constantes
(define-constant ERR-NOT-FOUND (err u404))
(define-constant ERR-UNAUTHORIZED (err u401))
(define-constant ERR-BAD-REQUEST (err u400))

;; IDs autoincrementales
(define-data-var next-league-id uint u0)

;; Crear entidades
(define-public (crear-liga (nombre (string-utf8 64)) (ubicacion (string-utf8 64)) (categoria (string-utf8 32)))
  (let ((id (+ (var-get next-league-id) u1)))
    (begin
      (var-set next-league-id id)
      (ok id)))
)

;; Lecturas
(define-read-only (get-liga (id uint))
  (ok id)
)
